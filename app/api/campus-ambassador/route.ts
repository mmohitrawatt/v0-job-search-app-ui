import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, college, course_year, email, phone, linkedin, instagram, why_ambassador } = body

    if (!name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 })
    if (!college?.trim()) return NextResponse.json({ error: "College name is required." }, { status: 400 })
    if (!course_year?.trim()) return NextResponse.json({ error: "Course / Year is required." }, { status: 400 })
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
    }
    if (!phone?.trim() || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "A valid 10-digit phone number is required." }, { status: 400 })
    }
    if (!why_ambassador?.trim()) {
      return NextResponse.json({ error: "Please tell us why you want to become a Campus Ambassador." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("campus_ambassador_applications").insert({
      name: name.trim(),
      college: college.trim(),
      course_year: course_year.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      linkedin: linkedin?.trim() || null,
      instagram: instagram?.trim() || null,
      why_ambassador: why_ambassador.trim(),
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Campus ambassador route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
