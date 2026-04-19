import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json()

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid name and email are required." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("waitlist").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
    })

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "You're already on the waitlist!" }, { status: 409 })
      }
      console.error("Waitlist insert error:", error)
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Waitlist route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
