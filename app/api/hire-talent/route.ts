import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      company_name, website_url, contact_name, work_email, phone,
      talent_type, role_title, domain, required_skills, num_hires,
      work_model, additional_details,
    } = body

    if (!company_name || !contact_name || !work_email || !phone) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error } = await supabase.from("hiring_requests").insert({
      company_name,
      website_url: website_url || null,
      contact_name,
      work_email,
      phone,
      talent_type,
      role_title,
      domain,
      required_skills: required_skills || null,
      num_hires: num_hires ? parseInt(num_hires) : null,
      work_model,
      additional_details: additional_details || null,
    })

    if (error) {
      console.error("Hire talent insert error:", error)
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Hire talent route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
