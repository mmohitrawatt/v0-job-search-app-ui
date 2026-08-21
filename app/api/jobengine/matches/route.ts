import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { emailOk, findUserId } from "@/lib/jobengine/db"

export const dynamic = "force-dynamic"

/**
 * GET /api/jobengine/matches?email=...
 *
 * Returning users: reload the saved match set (from the last run) joined with
 * job details, so they don't have to re-upload. Empty list if none yet.
 */
export async function GET(req: NextRequest) {
  try {
    const email = String(req.nextUrl.searchParams.get("email") || "").trim().toLowerCase()
    if (!emailOk(email)) return NextResponse.json({ error: "Valid email is required." }, { status: 400 })

    const supabase = createServerClient()
    const userId = await findUserId(supabase, email)
    if (!userId) return NextResponse.json({ ok: true, matches: [], profile: null })

    const [{ data: matches }, { data: resume }] = await Promise.all([
      supabase
        .from("jobengine_matches")
        .select("job_id, score, reason")
        .eq("user_id", userId)
        .order("score", { ascending: false }),
      supabase.from("jobengine_resumes").select("profile").eq("user_id", userId).maybeSingle(),
    ])

    // JS-side join (avoids PostgREST embedded-resource schema-cache fragility).
    const jobIds = [...new Set((matches ?? []).map((r) => r.job_id))]
    const jobMap = new Map<string, any>()
    if (jobIds.length) {
      const { data: jobs } = await supabase
        .from("jobengine_jobs")
        .select("id, company, title, location, apply_url")
        .in("id", jobIds)
      for (const j of jobs ?? []) jobMap.set(j.id, j)
    }

    const out = (matches ?? []).map((r: any) => {
      const j = jobMap.get(r.job_id)
      return {
        id: r.job_id,
        company: j?.company ?? "—",
        title: j?.title ?? "—",
        location: j?.location ?? null,
        applyUrl: j?.apply_url ?? null,
        score: r.score,
        reason: r.reason,
      }
    })

    const p = resume?.profile as { role?: string; seniority?: string | null; skills?: string[] } | null
    return NextResponse.json({
      ok: true,
      matches: out,
      profile: p ? { role: p.role, seniority: p.seniority ?? null, skills: p.skills ?? [] } : null,
    })
  } catch (err) {
    console.error("[jobengine/matches] error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
