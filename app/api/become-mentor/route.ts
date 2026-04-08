import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      full_name, email, phone, location,
      domain, job_title, experience, linkedin,
      short_intro, professional_bio,
      mentorship_topics, session_price, session_duration,
      mentorship_format, motivation,
      portfolio_url, additional_note,
    } = body

    if (!full_name || !email || !phone || !domain || !job_title || !experience) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("mentor_applications").insert({
      full_name,
      email,
      phone,
      location: location || null,
      domain,
      job_title,
      experience,
      linkedin: linkedin || null,
      short_intro: short_intro || null,
      professional_bio: professional_bio || null,
      mentorship_topics: mentorship_topics || [],
      session_price: session_price || null,
      session_duration: session_duration || null,
      mentorship_format: mentorship_format || [],
      motivation: motivation || null,
      portfolio_url: portfolio_url || null,
      additional_note: additional_note || null,
    })

    if (error) {
      console.error("Mentor application insert error:", error)
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Mentor application route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
