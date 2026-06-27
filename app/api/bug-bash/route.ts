import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const tester_name  = (formData.get("tester_name")  as string | null)?.trim() ?? ""
    const tester_email = (formData.get("tester_email") as string | null)?.trim() || null
    const tester_phone = (formData.get("tester_phone") as string | null)?.trim() || null
    const team_name    = (formData.get("team_name")    as string | null)?.trim() || null
    const bugsRaw      = (formData.get("bugs")         as string | null) ?? "[]"

    if (!tester_name) {
      return NextResponse.json({ error: "Tester name is required" }, { status: 400 })
    }

    type BugData = {
      page_url: string; feature_area: string; category: string; severity: string
      what_tried: string; steps: [string, string, string]
      expected: string; actual: string; screenshot_note: string
    }

    let bugs: BugData[] = []
    try { bugs = JSON.parse(bugsRaw) } catch {
      return NextResponse.json({ error: "Invalid bug data" }, { status: 400 })
    }

    if (!bugs.length) {
      return NextResponse.json({ error: "At least one bug is required" }, { status: 400 })
    }

    const supabase = createServerClient()

    const bugsWithUrls = await Promise.all(
      bugs.map(async (bug, i) => {
        const file = formData.get(`screenshot_${i}`) as File | null

        // no file uploaded for this bug
        if (!file || file.size === 0) return bug

        try {
          const ext      = file.name.split(".").pop()?.toLowerCase() ?? "jpg"
          const fileName = `bug-bash/${Date.now()}-${Math.random().toString(36).slice(2)}-bug${i}.${ext}`
          const buffer   = new Uint8Array(await file.arrayBuffer())

          const { error: uploadError } = await supabase.storage
            .from("bug-bash")
            .upload(fileName, buffer, {
              contentType: file.type || "application/octet-stream",
              upsert: false,
            })

          if (uploadError) {
            console.error(`[bug-bash] upload error bug ${i}:`, JSON.stringify(uploadError))
            return { ...bug, screenshot_note: bug.screenshot_note || `[Upload failed: ${uploadError.message}]` }
          }

          const { data: urlData } = supabase.storage
            .from("bug-bash")
            .getPublicUrl(fileName)

          return { ...bug, screenshot_note: urlData.publicUrl }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err)
          console.error(`[bug-bash] upload exception bug ${i}:`, msg)
          return { ...bug, screenshot_note: bug.screenshot_note || `[Upload exception: ${msg}]` }
        }
      })
    )

    const { error } = await supabase.from("bug_bash_reports").insert({
      tester_name,
      tester_email,
      tester_phone,
      team_name,
      bugs: bugsWithUrls,
    })

    if (error) {
      console.error("[bug-bash] insert error:", JSON.stringify(error))
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[bug-bash] POST error:", err)
    return NextResponse.json({ error: "Failed to submit report. Please try again." }, { status: 500 })
  }
}
