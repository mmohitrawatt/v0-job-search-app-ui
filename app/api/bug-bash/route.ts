import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tester_name, tester_email, team_name, bugs } = body

    if (!tester_name?.trim()) {
      return NextResponse.json({ error: "Tester name is required" }, { status: 400 })
    }
    if (!bugs || bugs.length === 0) {
      return NextResponse.json({ error: "At least one bug is required" }, { status: 400 })
    }

    const supabase = createServerClient()
    const { error } = await supabase.from("bug_bash_reports").insert({
      tester_name: tester_name.trim(),
      tester_email: tester_email || null,
      team_name: team_name || null,
      bugs,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("bug-bash POST error:", err)
    return NextResponse.json({ error: "Failed to submit report. Please try again." }, { status: 500 })
  }
}
