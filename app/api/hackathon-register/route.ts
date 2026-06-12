import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name       = (formData.get("name")       as string | null)?.trim() ?? ""
    const email      = (formData.get("email")      as string | null)?.trim().toLowerCase() ?? ""
    const phone      = (formData.get("phone")      as string | null)?.trim() ?? ""
    const college    = (formData.get("college")    as string | null)?.trim() ?? ""
    const year       = (formData.get("year")       as string | null)?.trim() ?? ""
    const team_name  = (formData.get("team_name")  as string | null)?.trim() ?? "Solo"
    const github     = (formData.get("github")     as string | null)?.trim() ?? ""
    const tech_stack = (formData.get("tech_stack") as string | null)?.trim() ?? ""
    const why        = (formData.get("why")        as string | null)?.trim() ?? ""

    const errors: string[] = []
    if (!name)    errors.push("Full name is required.")
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.")
    if (!phone || phone.replace(/\D/g, "").length < 10) errors.push("Valid 10-digit phone number is required.")
    if (!college) errors.push("College / institution is required.")
    if (!year)    errors.push("Year of study is required.")

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("hackathon_registrations").insert({
      name,
      email,
      phone,
      college,
      team_name: team_name || "Solo",
      year_of_study:       year       || null,
      github_url:          github     || null,
      tech_stack:          tech_stack || null,
      why_participate:     why        || null,
      bootcamp: "ai_content_engine_hackathon",
    })

    if (error) {
      console.error("Supabase insert error:", JSON.stringify(error))
      return NextResponse.json({ error: `Registration failed: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Hackathon register route error:", err)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
