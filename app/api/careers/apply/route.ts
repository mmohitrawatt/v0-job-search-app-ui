import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const role_id    = (formData.get("role_id")    as string | null)?.trim() ?? ""
    const role_title = (formData.get("role_title") as string | null)?.trim() ?? ""
    const name       = (formData.get("name")       as string | null)?.trim() ?? ""
    const email      = (formData.get("email")      as string | null)?.trim().toLowerCase() ?? ""
    const phone      = (formData.get("phone")      as string | null)?.trim() ?? ""
    const college    = (formData.get("college")    as string | null)?.trim() ?? ""
    const year       = (formData.get("year")       as string | null)?.trim() ?? ""
    const linkedin   = (formData.get("linkedin")   as string | null)?.trim() ?? ""
    const portfolio  = (formData.get("portfolio")  as string | null)?.trim() ?? ""
    const why        = (formData.get("why")        as string | null)?.trim() ?? ""
    const resume     = formData.get("resume") as File | null

    const errors: string[] = []
    if (!role_id)  errors.push("Role is required.")
    if (!name)     errors.push("Name is required.")
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.")
    if (!phone || phone.replace(/\D/g, "").length < 10) errors.push("Valid 10-digit phone number is required.")
    if (!college)  errors.push("College / university is required.")
    if (!year)     errors.push("Year of study is required.")

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }

    const supabase = createServerClient()

    let resume_url: string | null = null
    if (resume && resume.size > 0) {
      const ext = resume.name.split(".").pop() ?? "pdf"
      const fileName = `careers/${role_id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const buffer = new Uint8Array(await resume.arrayBuffer())

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, buffer, {
          contentType: resume.type || "application/pdf",
          upsert: false,
        })

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(fileName)
        resume_url = urlData.publicUrl
      } else {
        console.error("Resume upload error:", uploadError)
      }
    }

    const { error } = await supabase.from("careers_applications").insert({
      role_id,
      role_title,
      name,
      email,
      phone,
      college,
      year,
      linkedin: linkedin || null,
      portfolio: portfolio || null,
      why: why || null,
      resume_url,
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Careers apply route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
