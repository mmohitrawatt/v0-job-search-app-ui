import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

const TOTAL = 60

export async function GET() {
  try {
    const supabase = createServerClient()
    const { count, error } = await supabase
      .from("early_apply")
      .select("*", { count: "exact", head: true })

    if (error) throw error

    const filled = count ?? 0
    return NextResponse.json({ total: TOTAL, filled, remaining: Math.max(0, TOTAL - filled) })
  } catch {
    return NextResponse.json({ total: TOTAL, filled: 0, remaining: TOTAL })
  }
}
