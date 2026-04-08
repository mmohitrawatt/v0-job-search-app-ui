import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, rating, quote, recommend } = body

    if (!name?.trim() || !quote?.trim() || quote.trim().length < 10 || !rating) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 })
    }

    if (quote.trim().length > 500) {
      return NextResponse.json({ error: "Review must be under 500 characters." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("community_reviews").insert({
      name: name.trim(),
      rating,
      quote: quote.trim(),
      recommend: recommend || "Definitely Yes",
    })

    if (error) {
      console.error("Review insert error:", error)
      return NextResponse.json({ error: "Submission failed." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Review route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
