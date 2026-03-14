import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const name              = (body.name as string | null)?.trim() ?? ""
    const email             = (body.email as string | null)?.trim().toLowerCase() ?? ""
    const overall_rating    = Number(body.overall_rating) || 0
    const content_rating    = Number(body.content_rating) || 0
    const mentor_rating     = Number(body.mentor_rating) || 0
    const liked             = (body.liked as string | null)?.trim() ?? ""
    const improve           = (body.improve as string | null)?.trim() ?? ""
    const recommend         = (body.recommend as string | null) ?? ""
    const next_topic        = (body.next_topic as string | null)?.trim() ?? ""

    if (!name)           return NextResponse.json({ error: "Name is required." }, { status: 400 })
    if (!overall_rating) return NextResponse.json({ error: "Please give an overall rating." }, { status: 400 })
    if (!liked)          return NextResponse.json({ error: "Please tell us what you liked." }, { status: 400 })

    const supabase = createServerClient()

    const { error } = await supabase.from("bootcamp_feedback").insert({
      name,
      email,
      overall_rating,
      content_rating,
      mentor_rating,
      liked,
      improve,
      recommend,
      next_topic,
      bootcamp: "bootcamp_1",
    })

    if (error) {
      console.error("Supabase feedback insert error:", error)
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Feedback route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
