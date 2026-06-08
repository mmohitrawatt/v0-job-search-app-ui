import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, college, city, year, branch, linkedin, instagram, campus_role, why_lead } = body

    if (!name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 })
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
    if (!phone?.trim() || phone.replace(/\D/g, "").length < 10)
      return NextResponse.json({ error: "A valid 10-digit phone number is required." }, { status: 400 })
    if (!college?.trim()) return NextResponse.json({ error: "College name is required." }, { status: 400 })
    if (!city?.trim()) return NextResponse.json({ error: "City is required." }, { status: 400 })
    if (!year?.trim()) return NextResponse.json({ error: "Year of study is required." }, { status: 400 })
    if (!branch?.trim()) return NextResponse.json({ error: "Branch is required." }, { status: 400 })
    if (!why_lead?.trim()) return NextResponse.json({ error: "Please tell us why you want to lead Jobingen Club." }, { status: 400 })

    const supabase = createServerClient()

    const { error } = await supabase.from("jobingen_club_applications").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      college: college.trim(),
      city: city.trim(),
      year: year.trim(),
      branch: branch.trim(),
      linkedin: linkedin?.trim() || null,
      instagram: instagram?.trim() || null,
      campus_role: campus_role?.trim() || null,
      why_lead: why_lead.trim(),
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Jobingen Club route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
