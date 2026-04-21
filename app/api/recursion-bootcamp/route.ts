import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = (formData.get("name") as string | null)?.trim() ?? ""
    const email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? ""
    const phone = (formData.get("phone") as string | null)?.trim() ?? ""
    const college = (formData.get("college") as string | null)?.trim() ?? ""
    const upi_transaction_id = (formData.get("upi_transaction_id") as string | null)?.trim() ?? ""
    const screenshot = formData.get("screenshot") as File | null

    const errors: string[] = []
    if (!name) errors.push("Name is required.")
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.")
    if (!phone || phone.replace(/\D/g, "").length < 10) errors.push("Valid 10-digit phone number is required.")
    if (!college) errors.push("College / Institution name is required.")
    if (!upi_transaction_id) errors.push("UPI Transaction ID is required.")

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }

    const supabase = createServerClient()

    let payment_screenshot_url: string | null = null

    if (screenshot && screenshot.size > 0) {
      const ext = screenshot.name.split(".").pop() ?? "jpg"
      const fileName = `screenshots/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const arrayBuffer = await screenshot.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      const { error: uploadError } = await supabase.storage
        .from("hackathon-screenshots")
        .upload(`recursion-bootcamp/${fileName}`, buffer, {
          contentType: screenshot.type || "image/jpeg",
          upsert: false,
        })

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("hackathon-screenshots")
          .getPublicUrl(`recursion-bootcamp/${fileName}`)
        payment_screenshot_url = urlData.publicUrl
      } else {
        console.error("Screenshot upload error:", uploadError)
      }
    }

    const { error } = await supabase.from("hackathon_registrations").insert({
      name,
      email,
      phone,
      college,
      team_name: "Individual",
      upi_transaction_id,
      payment_screenshot_url,
      bootcamp: "recursion_bootcamp",
    })

    if (error) {
      console.error("Recursion bootcamp insert error:", JSON.stringify(error))
      return NextResponse.json({ error: `Registration failed: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Recursion bootcamp route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
