import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { emailOk, findUserId } from "@/lib/jobengine/db"

export const dynamic = "force-dynamic"

/**
 * GET /api/jobengine/applications?email=...
 *
 * Layer 6 tracker: the user's applications joined with job details, newest
 * first. Returns an empty list (not an error) for a user with no applications.
 */
export async function GET(req: NextRequest) {
  try {
    const email = String(req.nextUrl.searchParams.get("email") || "").trim().toLowerCase()
    if (!emailOk(email)) return NextResponse.json({ error: "Valid email is required." }, { status: 400 })

    const supabase = createServerClient()
    const userId = await findUserId(supabase, email)
    if (!userId) return NextResponse.json({ ok: true, applications: [] })

    const { data, error } = await supabase
      .from("jobengine_applications")
      .select(
        "job_id, status, match_score, match_reason, tailor_summary, tailored_resume, cover_letter, opened_at, submitted_at, replied_at, updated_at",
      )
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })

    if (error) {
      console.error("[jobengine/applications] query failed:", error)
      return NextResponse.json({ error: "Could not load your applications." }, { status: 500 })
    }

    // JS-side join (avoids PostgREST embedded-resource schema-cache fragility).
    const jobIds = [...new Set((data ?? []).map((r) => r.job_id))]
    const jobMap = new Map<string, any>()
    if (jobIds.length) {
      const { data: jobs } = await supabase
        .from("jobengine_jobs")
        .select("id, company, title, location, apply_url")
        .in("id", jobIds)
      for (const j of jobs ?? []) jobMap.set(j.id, j)
    }

    const applications = (data ?? []).map((r: any) => {
      const j = jobMap.get(r.job_id)
      return {
        jobId: r.job_id,
        status: r.status,
        matchScore: r.match_score,
        matchReason: r.match_reason,
        tailorSummary: r.tailor_summary,
        tailoredResume: r.tailored_resume,
        coverLetter: r.cover_letter,
        openedAt: r.opened_at,
        submittedAt: r.submitted_at,
        repliedAt: r.replied_at,
        updatedAt: r.updated_at,
        company: j?.company ?? "—",
        title: j?.title ?? "—",
        location: j?.location ?? null,
        applyUrl: j?.apply_url ?? null,
      }
    })

    return NextResponse.json({ ok: true, applications })
  } catch (err) {
    console.error("[jobengine/applications] error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
