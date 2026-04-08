import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email,
      user_type, domain, role_position, company_type,
      interview_types, difficulty_level,
      questions_asked, interview_process, advice,
      company_name, interview_location,
    } = body

    if (!user_type || !domain || !role_position || !company_type || !interview_types?.length || !questions_asked || !interview_process) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("interview_feedback").insert({
      name: name || null,
      email: email || null,
      user_type,
      domain,
      role_position,
      company_type,
      interview_types: interview_types || [],
      difficulty_level: difficulty_level || 3,
      questions_asked,
      interview_process,
      advice: advice || null,
      company_name: company_name || null,
      interview_location: interview_location || null,
    })

    if (error) {
      console.error("Interview feedback insert error:", error)
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Interview feedback route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
