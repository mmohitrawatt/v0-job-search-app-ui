import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name               = (formData.get("name")               as string | null)?.trim() ?? ""
    const email              = (formData.get("email")              as string | null)?.trim().toLowerCase() ?? ""
    const phone              = (formData.get("phone")              as string | null)?.trim() ?? ""
    const college            = (formData.get("college")            as string | null)?.trim() ?? ""
    const experience         = (formData.get("experience")         as string | null)?.trim() ?? ""
    const upi_transaction_id = (formData.get("upi_transaction_id") as string | null)?.trim() ?? ""
    const stripe_session_id  = (formData.get("stripe_session_id")  as string | null)?.trim() ?? ""
    const payment_method     = (formData.get("payment_method")     as string | null)?.trim() ?? "upi"
    const screenshot         = formData.get("screenshot") as File | null

    const errors: string[] = []
    if (!name)                                                         errors.push("Name is required.")
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))         errors.push("Valid email is required.")
    if (!phone || phone.replace(/\D/g, "").length < 10)               errors.push("Valid 10-digit phone number is required.")
    if (!college)                                                      errors.push("College / Company name is required.")
    if (!experience)                                                   errors.push("Experience level is required.")
    if (payment_method === "upi") {
      if (!upi_transaction_id)                                         errors.push("UPI Transaction ID is required.")
      if (!screenshot || screenshot.size === 0)                        errors.push("Payment screenshot is required.")
    } else if (payment_method === "stripe") {
      if (!stripe_session_id)                                          errors.push("Stripe session ID is required.")
    }

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
        .upload(`ml-masterclass/${fileName}`, buffer, {
          contentType: screenshot.type || "image/jpeg",
          upsert: false,
        })

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("hackathon-screenshots")
          .getPublicUrl(`ml-masterclass/${fileName}`)
        payment_screenshot_url = urlData.publicUrl
      } else {
        console.error("ML masterclass screenshot upload error:", uploadError)
      }
    }

    const { error } = await supabase.from("ml_masterclass_registrations").insert({
      name,
      email,
      phone,
      college,
      experience,
      upi_transaction_id: payment_method === "stripe" ? `stripe_${stripe_session_id}` : upi_transaction_id,
      payment_screenshot_url,
    })

    if (error) {
      console.error("ML masterclass insert error:", JSON.stringify(error))
      return NextResponse.json({ error: `Registration failed: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("ML masterclass route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
