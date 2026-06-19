import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const full_name          = (formData.get("full_name")          as string | null)?.trim() ?? ""
    const email              = (formData.get("email")              as string | null)?.trim().toLowerCase() ?? ""
    const phone              = (formData.get("phone")              as string | null)?.trim() ?? ""
    const college            = (formData.get("college")            as string | null)?.trim() ?? ""
    const status             = (formData.get("status")             as string | null)?.trim() ?? ""
    const skill_level        = (formData.get("skill_level")        as string | null)?.trim() ?? ""
    const motivation         = (formData.get("motivation")         as string | null)?.trim() ?? ""
    const upi_transaction_id = (formData.get("upi_transaction_id") as string | null)?.trim() ?? ""
    const screenshot         = formData.get("screenshot") as File | null

    const errors: string[] = []
    if (!full_name)                                                      errors.push("Name is required.")
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))           errors.push("Valid email is required.")
    if (!phone || phone.replace(/\D/g, "").length < 10)                 errors.push("Valid phone number is required.")
    if (!college)                                                        errors.push("College / University is required.")
    if (!status)                                                         errors.push("Current status is required.")
    if (!skill_level)                                                    errors.push("Skill level is required.")
    if (!upi_transaction_id)                                             errors.push("UPI Transaction ID is required.")
    if (!screenshot || screenshot.size === 0)                           errors.push("Payment screenshot is required.")

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }

    const supabase = createServerClient()

    let payment_screenshot_url: string | null = null

    if (screenshot && screenshot.size > 0) {
      const ext      = screenshot.name.split(".").pop() ?? "jpg"
      const fileName = `screenshots/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const buffer   = new Uint8Array(await screenshot.arrayBuffer())

      const { error: uploadError } = await supabase.storage
        .from("hackathon-screenshots")
        .upload(`flagship-training/${fileName}`, buffer, {
          contentType: screenshot.type || "image/jpeg",
          upsert: false,
        })

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("hackathon-screenshots")
          .getPublicUrl(`flagship-training/${fileName}`)
        payment_screenshot_url = urlData.publicUrl
      } else {
        console.error("Flagship training screenshot upload error:", uploadError)
      }
    }

    const { error } = await supabase.from("flagship_training_registrations").insert({
      full_name,
      email,
      phone,
      college,
      status,
      skill_level,
      motivation,
      upi_transaction_id,
      payment_screenshot_url,
    })

    if (error) {
      console.error("Flagship training insert error:", JSON.stringify(error))
      return NextResponse.json({ error: `Registration failed: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Flagship training route error:", err)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}
