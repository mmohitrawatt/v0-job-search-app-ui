import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { problem_categories, skill_rating, resume_problem, student_insight_text } = body

    if (!problem_categories?.length && !skill_rating && !resume_problem && !student_insight_text?.trim()) {
      return NextResponse.json({ error: "Please fill at least one field." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("student_insights").insert({
      problem_categories: problem_categories || [],
      skill_rating: skill_rating || null,
      resume_problem: resume_problem || null,
      student_insight_text: student_insight_text?.trim() || null,
    })

    if (error) {
      console.error("Student insights insert error:", error)
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Student insights route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
