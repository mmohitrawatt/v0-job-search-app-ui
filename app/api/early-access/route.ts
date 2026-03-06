import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email } = body

    // Validate
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 })
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
    }

    const supabase = createServerClient()

    // Check for duplicate email
    const { data: existing } = await supabase
      .from("early_access")
      .select("id")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: "This email is already on the early access list." },
        { status: 409 }
      )
    }

    const { error } = await supabase.from("early_access").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Early access route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
