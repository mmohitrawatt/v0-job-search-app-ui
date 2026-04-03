import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, college, email,
      current_situation, career_stuck_at,
      resume_frustrations, job_search_methods,
      interview_confidence, skill_blockers, open_answer,
      problem_categories, skill_rating, resume_problem, student_insight_text,
    } = body

    if (!problem_categories?.length && !skill_rating && !resume_problem && !student_insight_text?.trim()) {
      return NextResponse.json({ error: "Please fill at least one field." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("student_insights").insert({
      name: name || null,
      college: college || null,
      email: email || null,
      current_situation: current_situation || null,
      career_stuck_at: career_stuck_at || null,
      resume_frustrations: resume_frustrations || [],
      job_search_methods: job_search_methods || [],
      interview_confidence: interview_confidence ?? null,
      skill_blockers: skill_blockers || [],
      open_answer: open_answer || null,
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
