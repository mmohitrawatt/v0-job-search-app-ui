import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = (formData.get("name") as string | null)?.trim() ?? ""
    const email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? ""
    const phone = (formData.get("phone") as string | null)?.trim() ?? ""
    const college = (formData.get("college") as string | null)?.trim() ?? ""
    const team_name = (formData.get("team_name") as string | null)?.trim() ?? "Individual"
    const learning_cluster = (formData.get("learning_cluster") as string | null)?.trim() ?? ""
    const upi_transaction_id = (formData.get("upi_transaction_id") as string | null)?.trim() ?? ""
    const screenshot = formData.get("screenshot") as File | null

    // Validate required fields
    const errors: string[] = []
    if (!name) errors.push("Name is required.")
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.")
    if (!phone || phone.replace(/\D/g, "").length < 10) errors.push("Valid 10-digit phone number is required.")
    if (!college) errors.push("College / Company name is required.")
    if (!upi_transaction_id) errors.push("UPI Transaction ID is required.")

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }

    const supabase = createServerClient()

    // Upload screenshot if provided
    let payment_screenshot_url: string | null = null
    if (screenshot && screenshot.size > 0) {
      const ext = screenshot.name.split(".").pop() ?? "jpg"
      const fileName = `screenshots/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
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
        // Non-fatal: proceed without screenshot URL
      } else {
        const { data: urlData } = supabase.storage
          .from("hackathon-screenshots")
          .getPublicUrl(fileName)
        payment_screenshot_url = urlData.publicUrl
      }
    }

    // Insert registration
    const { error } = await supabase.from("hackathon_registrations").insert({
      name,
      email,
      phone,
      college,
      team_name,
      learning_cluster: learning_cluster || null,
      upi_transaction_id,
      payment_screenshot_url,
      bootcamp: "bootcamp_2",
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Hackathon register route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
