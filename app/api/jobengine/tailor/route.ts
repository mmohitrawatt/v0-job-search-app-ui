import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { emailOk, findUserId, getResumeText } from "@/lib/jobengine/db"
import { tailorResume } from "@/lib/jobengine/tailoring"
import { activeProvider } from "@/lib/jobengine/llm"
import type { CandidateJob } from "@/lib/jobengine/matching"

export const maxDuration = 60
export const dynamic = "force-dynamic"

/**
 * POST /api/jobengine/tailor
 * Body: { email, jobId }
 *
 * Layer 3: tailors the user's stored resume to one job and returns the tailored
 * text + an explicit change list for the Layer 4 diff/approval view. Nothing is
 * persisted here — it only becomes an application once the user approves + applies.
 */
export async function POST(req: NextRequest) {
  try {
    if (!activeProvider()) {
      return NextResponse.json(
        { error: "No LLM configured. Add GROQ_API_KEY (free) or ANTHROPIC_API_KEY." },
        { status: 503 },
      )
    }

    const body = await req.json().catch(() => null)
    const email = String(body?.email || "").trim().toLowerCase()
    const jobId = String(body?.jobId || "").trim()
    if (!emailOk(email)) return NextResponse.json({ error: "Valid email is required." }, { status: 400 })
    if (!jobId) return NextResponse.json({ error: "jobId is required." }, { status: 400 })

    const supabase = createServerClient()

    const userId = await findUserId(supabase, email)
    if (!userId) return NextResponse.json({ error: "Upload a resume first." }, { status: 404 })

    const resumeText = await getResumeText(supabase, userId)
    if (!resumeText) return NextResponse.json({ error: "No resume on file. Upload one first." }, { status: 404 })

    const { data: job } = await supabase
      .from("jobengine_jobs")
      .select("id, company, title, location, description, apply_url")
      .eq("id", jobId)
      .maybeSingle()
    if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 })

    const result = await tailorResume(resumeText, job as CandidateJob)

    // Include the match reason for this job so the approval screen can show it.
    const { data: match } = await supabase
      .from("jobengine_matches")
      .select("score, reason")
      .eq("user_id", userId)
      .eq("job_id", jobId)
      .maybeSingle()

    return NextResponse.json({
      ok: true,
      job: { id: job.id, company: job.company, title: job.title, location: job.location, applyUrl: job.apply_url },
      match: match ? { score: match.score, reason: match.reason } : null,
      original: resumeText,
      structured: result.structured,
      tailored: result.tailored,
      changes: result.changes,
      summary: result.summary,
      coverLetter: result.coverLetter,
    })
  } catch (err) {
    console.error("[jobengine/tailor] error:", err)
    return NextResponse.json({ error: "Something went wrong while tailoring." }, { status: 500 })
  }
}
