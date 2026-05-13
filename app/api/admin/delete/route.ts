import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

const ALLOWED_TABLES = [
  "early_access",
  "hackathon_registrations",
  "bootcamp_feedback",
  "campus_ambassador_applications",
  "job_applications",
  "hackathon_submissions",
  "student_insights",
  "interview_feedback",
  "mentor_applications",
  "creator_community_applications",
  "hiring_requests",
]

export async function DELETE(req: NextRequest) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Server misconfigured: ADMIN_PASSWORD not set" }, { status: 500 })
  }

  const auth = req.headers.get("authorization")
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { table?: string; id?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { table, id } = body

  if (!table || !id) {
    return NextResponse.json({ error: "Missing required fields: table, id" }, { status: 400 })
  }

  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: `Table "${table}" is not allowed` }, { status: 403 })
  }

  const supabase = createServerClient()

  const { error } = await supabase.from(table).delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
