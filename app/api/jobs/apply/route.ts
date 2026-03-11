import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = (formData.get("name") as string | null)?.trim() ?? ""
    const email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? ""
    const phone = (formData.get("phone") as string | null)?.trim() ?? ""
    const linkedin = (formData.get("linkedin") as string | null)?.trim() ?? ""
    const job_slug = (formData.get("job_slug") as string | null)?.trim() ?? ""
    const resume = formData.get("resume") as File | null

    // Validate required fields
    const errors: string[] = []
    if (!name) errors.push("Name is required.")
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.")
    if (!phone || phone.replace(/\D/g, "").length < 10) errors.push("Valid 10-digit phone number is required.")
    if (!job_slug) errors.push("Job slug is missing.")

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }

    const supabase = createServerClient()

    // Upload resume to Supabase storage
    let resume_url: string | null = null
    if (resume && resume.size > 0) {
      const ext = resume.name.split(".").pop() ?? "pdf"
      const fileName = `${job_slug}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const arrayBuffer = await resume.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, buffer, {
          contentType: resume.type || "application/pdf",
          upsert: false,
        })

      if (uploadError) {
        console.error("Resume upload error:", uploadError)
        // Non-fatal: save application without resume URL
      } else {
        const { data: urlData } = supabase.storage
          .from("resumes")
          .getPublicUrl(fileName)
        resume_url = urlData.publicUrl
      }
    }

    // Insert application
    const { error } = await supabase.from("job_applications").insert({
      name,
      email,
      phone,
      linkedin: linkedin || null,
      resume_url,
      job_slug,
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Apply route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
