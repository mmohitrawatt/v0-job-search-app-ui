import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import {
  buildProfile,
  buildFtsQuery,
  prefilter,
  scoreShortlist,
  activeModel,
  type CandidateJob,
} from "@/lib/jobengine/matching"
import { activeProvider } from "@/lib/jobengine/llm"
import { extractContact } from "@/lib/jobengine/contact"

// Prefilter + one LLM call; comfortably under 60s but give headroom.
export const maxDuration = 60
export const dynamic = "force-dynamic"

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

// How many FTS candidates to pull before the heuristic prefilter trims to top 20.
const CANDIDATE_LIMIT = 300
const SHORTLIST = 20

/**
 * POST /api/jobengine/match
 * Body: { email: string, resumeText: string, filename?: string }
 *
 * The cost-aware two-step match:
 *   1. FTS + heuristic prefilter narrows ~5k jobs → top 20 (free, no LLM)
 *   2. One LLM call scores those 20 (0-100 + reason)
 * Persists the user, their resume/profile, and the scored matches, then returns
 * the ranked matches joined with job details.
 */
export async function POST(req: NextRequest) {
  try {
    if (!activeProvider()) {
      return NextResponse.json(
        { error: "No LLM configured. Add GROQ_API_KEY (free) or ANTHROPIC_API_KEY to .env.local." },
        { status: 503 },
      )
    }

    const body = await req.json().catch(() => null)
    const email = String(body?.email || "").trim().toLowerCase()
    const resumeText = String(body?.resumeText || "").trim()
    const filename = body?.filename ? String(body.filename).slice(0, 200) : null

    // Optional explicit preferences the candidate typed (Tsenta-style).
    const prefs = {
      role: body?.preferences?.role ? String(body.preferences.role).slice(0, 120) : "",
      location: body?.preferences?.location ? String(body.preferences.location).slice(0, 120) : "",
      workType: body?.preferences?.workType ? String(body.preferences.workType).slice(0, 60) : "",
    }
    const hasPrefs = !!(prefs.role || prefs.location || prefs.workType)

    if (!emailOk(email)) return NextResponse.json({ error: "Valid email is required." }, { status: 400 })
    if (resumeText.length < 80)
      return NextResponse.json({ error: "Resume text is too short to match on." }, { status: 400 })

    const supabase = createServerClient()
    const profile = buildProfile(resumeText)

    // A typed location preference augments the resume-derived locations so the
    // prefilter favours it too.
    if (prefs.location) {
      const loc = prefs.location.toLowerCase()
      if (!profile.locations.includes(loc)) profile.locations.push(loc)
    }

    // ── Upsert user (email identity) ──────────────────────────────────────
    const { data: user, error: userErr } = await supabase
      .from("jobengine_users")
      .upsert({ email }, { onConflict: "email" })
      .select("id")
      .single()
    if (userErr || !user) {
      console.error("[jobengine/match] user upsert failed:", userErr)
      return NextResponse.json({ error: "Could not save your profile." }, { status: 500 })
    }

    // ── Store the resume + derived profile (one current resume per user) ──
    await supabase
      .from("jobengine_resumes")
      .upsert(
        {
          user_id: user.id,
          filename,
          resume_text: resumeText.slice(0, 20000),
          // contact powers the Chrome extension's auto-fill; email identity wins.
          profile: { ...profile, ...(hasPrefs ? { preferences: prefs } : {}), contact: { ...extractContact(resumeText), email } },
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      )

    // ── Step 1a: pull candidates via FTS (falls back to recent jobs) ──────
    const ftsQuery = buildFtsQuery(profile)
    let candidates: CandidateJob[] = []

    if (ftsQuery) {
      const { data } = await supabase
        .from("jobengine_jobs")
        .select("id, company, title, location, description, apply_url")
        .textSearch("search", ftsQuery, { type: "websearch" })
        .limit(CANDIDATE_LIMIT)
      candidates = (data as CandidateJob[]) ?? []
    }

    // Sparse resume or thin FTS hit → top up with the most recent postings.
    if (candidates.length < SHORTLIST * 2) {
      const { data } = await supabase
        .from("jobengine_jobs")
        .select("id, company, title, location, description, apply_url")
        .order("posted_at", { ascending: false, nullsFirst: false })
        .limit(CANDIDATE_LIMIT)
      const seen = new Set(candidates.map((c) => c.id))
      for (const row of (data as CandidateJob[]) ?? []) if (!seen.has(row.id)) candidates.push(row)
    }

    if (candidates.length === 0)
      return NextResponse.json({ error: "No jobs available to match. Run the crawl first." }, { status: 404 })

    // ── Step 1b: heuristic prefilter → top 20 ────────────────────────────
    const shortlist = prefilter(candidates, profile, SHORTLIST)

    // ── Step 2: one LLM call scores the shortlist ────────────────────────
    const scored = await scoreShortlist(resumeText, profile, shortlist, hasPrefs ? prefs : undefined)
    const model = activeModel()

    // ── Persist matches (replace this user's previous set) ───────────────
    await supabase.from("jobengine_matches").delete().eq("user_id", user.id)
    if (scored.length > 0) {
      await supabase.from("jobengine_matches").insert(
        scored.map((m) => ({
          user_id: user.id,
          job_id: m.id,
          score: m.score,
          reason: m.reason,
          model,
        })),
      )
    }

    // ── Return matches joined with job details, best first ───────────────
    const jobById = new Map(shortlist.map((j) => [j.id, j]))
    const matches = scored
      .map((m) => {
        const job = jobById.get(m.id)
        return job
          ? {
              id: job.id,
              company: job.company,
              title: job.title,
              location: job.location,
              applyUrl: job.apply_url,
              score: m.score,
              reason: m.reason,
            }
          : null
      })
      .filter(Boolean)
      .sort((a, b) => (b!.score - a!.score))

    return NextResponse.json({
      ok: true,
      email,
      profile: { role: profile.role, seniority: profile.seniority, skills: profile.skills },
      model,
      candidates: candidates.length,
      scored: matches.length,
      matches,
    })
  } catch (err) {
    console.error("[jobengine/match] error:", err)
    return NextResponse.json({ error: "Something went wrong while matching." }, { status: 500 })
  }
}
