import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, college, status, domain, why, portfolio } = await req.json()

    if (!name?.trim() || !email?.trim() || !college?.trim() || !status || !domain || !why?.trim()) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("early_apply").insert({
      name:      name.trim(),
      email:     email.trim().toLowerCase(),
      phone:     phone?.trim() || null,
      college:   college.trim(),
      status,
      domain,
      why:       why.trim(),
      portfolio: portfolio?.trim() || null,
    })

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "You've already submitted an application with this email." }, { status: 409 })
      }
      console.error("early-apply insert error:", error)
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("early-apply route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
