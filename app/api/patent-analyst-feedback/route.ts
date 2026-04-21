import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      full_name, college, current_status,
      reached_interview, interview_experience,
      interview_insights, jobingen_support,
      candidate_quote, allow_publish,
    } = body

    if (!full_name?.trim() || !college?.trim() || !current_status || !reached_interview || !interview_experience) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("patent_analyst_feedback").insert({
      full_name: full_name.trim(),
      college: college.trim(),
      current_status,
      reached_interview,
      interview_experience,
      interview_insights: interview_insights?.trim() || null,
      jobingen_support: jobingen_support || null,
      candidate_quote: candidate_quote?.trim() || null,
      allow_publish: allow_publish ?? false,
    })

    if (error) {
      console.error("Patent analyst feedback insert error:", error)
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Patent analyst feedback route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
