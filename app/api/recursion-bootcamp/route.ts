import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { full_name, email, phone, college, current_year, experience_level, preferred_language } = body

    if (!full_name?.trim() || !email?.trim() || !phone?.trim() || !college?.trim() || !current_year || !experience_level) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("recursion_bootcamp_registrations").insert({
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college: college.trim(),
      current_year,
      experience_level,
      preferred_language: preferred_language || "C++",
    })

    if (error) {
      console.error("Recursion bootcamp insert error:", error)
      return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Recursion bootcamp route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
