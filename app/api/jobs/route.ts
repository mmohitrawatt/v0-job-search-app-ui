import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from("jobs")
    .select("id, title, company, location, slug, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: "Failed to fetch jobs." }, { status: 500 })
  }

  return NextResponse.json({ jobs: data ?? [] })
}
