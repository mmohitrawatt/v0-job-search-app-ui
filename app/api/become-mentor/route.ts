import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const raw = formData.get("data") as string | null
    if (!raw) return NextResponse.json({ error: "Missing form data." }, { status: 400 })

    const {
      full_name, email, phone, location,
      domain, job_title, experience, linkedin,
      short_intro, professional_bio,
      mentorship_topics, session_price, session_duration,
      pricing_expectation,
      mentorship_format, available_days, motivation,
      portfolio_url, additional_note,
    } = JSON.parse(raw)

    const photo = formData.get("photo") as File | null

    if (!full_name || !phone) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 })
    }

    const supabase = createServerClient()

    // Upload profile photo
    let photo_url: string | null = null
    if (photo && photo.size > 0) {
      const ext = photo.name.split(".").pop() ?? "jpg"
      const fileName = `photos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const buffer = new Uint8Array(await photo.arrayBuffer())
      const { error: uploadError } = await supabase.storage
        .from("mentor-photos")
        .upload(fileName, buffer, { contentType: photo.type || "image/jpeg", upsert: false })
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("mentor-photos").getPublicUrl(fileName)
        photo_url = urlData.publicUrl
      }
    }

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
      pricing_expectation: pricing_expectation || null,
      mentorship_format: mentorship_format || [],
      available_days: available_days || [],
      motivation: motivation || null,
      portfolio_url: portfolio_url || null,
      additional_note: additional_note || null,
      photo_url,
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
