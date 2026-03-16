import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Server misconfigured: ADMIN_PASSWORD not set" }, { status: 500 })
  }
  const auth = req.headers.get("authorization")
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createServerClient()

  const [ea, hr1, hr2, fb, ca, ja, jobsRes, hs] = await Promise.all([
    supabase.from("early_access").select("*").order("created_at", { ascending: false }),
    supabase.from("hackathon_registrations").select("*").eq("bootcamp", "bootcamp_1").order("created_at", { ascending: false }),
    supabase.from("hackathon_registrations").select("*").eq("bootcamp", "bootcamp_2").order("created_at", { ascending: false }),
    supabase.from("bootcamp_feedback").select("*").order("created_at", { ascending: false }),
    supabase.from("campus_ambassador_applications").select("*").order("created_at", { ascending: false }),
    supabase.from("job_applications").select("*").order("created_at", { ascending: false }),
    supabase.from("jobs").select("slug, title"),
    supabase.from("hackathon_submissions").select("*").order("created_at", { ascending: false }),
  ])

  // Build slug → title lookup for enriching job applications
  const jobTitleMap: Record<string, string> = Object.fromEntries(
    (jobsRes.data ?? []).map((j: { slug: string; title: string }) => [j.slug, j.title])
  )
  const jobApplications = (ja.data ?? []).map((a: Record<string, unknown>) => ({
    ...a,
    job_title: jobTitleMap[a.job_slug as string] ?? (a.job_slug as string),
  }))

  return NextResponse.json({
    earlyAccess: ea.data || [],
    bootcamp1: hr1.data || [],
    bootcamp2: hr2.data || [],
    feedback: fb.data || [],
    campusAmbassadors: ca.data || [],
    jobApplications,
    hackathonSubmissions: hs.data || [],
  })
}
