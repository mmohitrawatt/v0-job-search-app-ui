import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const full_name = (formData.get("full_name") as string)?.trim()
    const email = (formData.get("email") as string)?.trim().toLowerCase()
    const phone = (formData.get("phone") as string)?.trim()
    const college = (formData.get("college") as string)?.trim()
    const current_year = formData.get("current_year") as string
    const experience_level = formData.get("experience_level") as string
    const preferred_language = (formData.get("preferred_language") as string) || "C++"
    const upi_transaction_id = (formData.get("upi_transaction_id") as string)?.trim()
    const screenshotFile = formData.get("screenshot") as File | null

    if (!full_name || !email || !phone || !college || !current_year || !experience_level || !upi_transaction_id) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 })
    }

    const supabase = createServerClient()

    let screenshot_url: string | null = null

    if (screenshotFile && screenshotFile.size > 0) {
      const buffer = Buffer.from(await screenshotFile.arrayBuffer())
      const ext = screenshotFile.name.split(".").pop() || "jpg"
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(`recursion-bootcamp/${fileName}`, buffer, {
          contentType: screenshotFile.type || "image/jpeg",
          upsert: false,
        })

      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage
          .from("payment-screenshots")
          .getPublicUrl(`recursion-bootcamp/${fileName}`)
        screenshot_url = urlData.publicUrl
      }
    }

    const { error } = await supabase.from("recursion_bootcamp_registrations").insert({
      full_name,
      email,
      phone,
      college,
      current_year,
      experience_level,
      preferred_language,
      upi_transaction_id,
      screenshot_url,
    })

    if (error) {
      console.error("Recursion bootcamp insert error:", error)
      return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Recursion bootcamp route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
