import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("mentor_applications")
      .select("id, full_name, job_title, domain, experience, linkedin, short_intro, professional_bio, mentorship_topics, photo_url, location, session_price, session_duration, mentorship_format, available_days")
      .eq("is_published", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json([])
  }
}
