import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const team_name = (formData.get("team_name") as string | null)?.trim() ?? ""
    const leader_name = (formData.get("leader_name") as string | null)?.trim() ?? ""
    const email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? ""
    const project_title = (formData.get("project_title") as string | null)?.trim() ?? ""
    const description = (formData.get("description") as string | null)?.trim() ?? ""
    const tech_stack = (formData.get("tech_stack") as string | null)?.trim() ?? ""
    const github_link = (formData.get("github_link") as string | null)?.trim() ?? ""
    const demo_link = (formData.get("demo_link") as string | null)?.trim() ?? ""
    const screenshot = formData.get("screenshot") as File | null

    // Validate required fields
    const errors: string[] = []
    if (!team_name) errors.push("Team name is required.")
    if (!leader_name) errors.push("Team leader name is required.")
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.")
    if (!project_title) errors.push("Project title is required.")
    if (!description) errors.push("Project description is required.")
    if (!tech_stack) errors.push("Tech stack is required.")
    if (!github_link) errors.push("GitHub repo link is required.")

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }

    const supabase = createServerClient()

    // Upload screenshot if provided
    let screenshot_url: string | null = null
    if (screenshot && screenshot.size > 0) {
      const ext = screenshot.name.split(".").pop() ?? "jpg"
      const fileName = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const arrayBuffer = await screenshot.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      const { error: uploadError } = await supabase.storage
        .from("hackathon-screenshots")
        .upload(fileName, buffer, {
          contentType: screenshot.type || "image/jpeg",
          upsert: false,
        })

      if (uploadError) {
        console.error("Screenshot upload error:", uploadError)
      } else {
        const { data: urlData } = supabase.storage
          .from("hackathon-screenshots")
          .getPublicUrl(fileName)
        screenshot_url = urlData.publicUrl
      }
    }

    // Insert project submission
    const { error } = await supabase.from("hackathon_submissions").insert({
      team_name,
      leader_name,
      email,
      project_title,
      description,
      tech_stack,
      github_link,
      demo_link: demo_link || null,
      screenshot_url,
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Hackathon submit route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
