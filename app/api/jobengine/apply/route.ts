import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { emailOk, findUserId } from "@/lib/jobengine/db"

export const dynamic = "force-dynamic"

const STATUSES = ["opened", "submitted", "replied"] as const
type Status = (typeof STATUSES)[number]

/**
 * POST /api/jobengine/apply
 * Body: { email, jobId, status, tailoredResume?, tailorSummary?, matchScore?, matchReason? }
 *
 * Layer 5-6: logs / advances an application. We never submit to the ATS from the
 * server (bot detection) — the client opens the real apply URL and the user
 * submits there, then advances the status here.
 *   - status 'opened'    → created when the user approves the tailored resume
 *   - status 'submitted' → user confirms they submitted on the company site
 *   - status 'replied'   → user got a response
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const email = String(body?.email || "").trim().toLowerCase()
    const jobId = String(body?.jobId || "").trim()
    const status = String(body?.status || "opened").trim() as Status

    if (!emailOk(email)) return NextResponse.json({ error: "Valid email is required." }, { status: 400 })
    if (!jobId) return NextResponse.json({ error: "jobId is required." }, { status: 400 })
    if (!STATUSES.includes(status)) return NextResponse.json({ error: "Invalid status." }, { status: 400 })

    const supabase = createServerClient()
    const userId = await findUserId(supabase, email)
    if (!userId) return NextResponse.json({ error: "Upload a resume first." }, { status: 404 })

    const now = new Date().toISOString()
    const row: Record<string, unknown> = {
      user_id: userId,
      job_id: jobId,
      status,
      updated_at: now,
    }
    // Stamp the lifecycle timestamp for whichever status we're setting.
    if (status === "opened") row.opened_at = now
    if (status === "submitted") row.submitted_at = now
    if (status === "replied") row.replied_at = now

    // Only set these on the initial 'opened' write (when they're provided).
    if (body?.tailoredResume) row.tailored_resume = String(body.tailoredResume).slice(0, 20000)
    if (body?.coverLetter) row.cover_letter = String(body.coverLetter).slice(0, 4000)
    if (body?.tailorSummary) row.tailor_summary = String(body.tailorSummary).slice(0, 200)
    if (typeof body?.matchScore === "number") row.match_score = Math.max(0, Math.min(100, Math.round(body.matchScore)))
    if (body?.matchReason) row.match_reason = String(body.matchReason).slice(0, 300)

    const { data, error } = await supabase
      .from("jobengine_applications")
      .upsert(row, { onConflict: "user_id,job_id" })
      .select("id, status")
      .single()

    if (error) {
      console.error("[jobengine/apply] upsert failed:", error)
      return NextResponse.json({ error: "Could not save your application." }, { status: 500 })
    }

    return NextResponse.json({ ok: true, application: data })
  } catch (err) {
    console.error("[jobengine/apply] error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
