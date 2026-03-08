import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Server misconfigured: ADMIN_PASSWORD not set" }, { status: 500 })
  }
  const auth = req.headers.get("authorization")
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createServerClient()

  const [ea, hr, ca] = await Promise.all([
    supabase.from("early_access").select("*").order("created_at", { ascending: false }),
    supabase.from("hackathon_registrations").select("*").order("created_at", { ascending: false }),
    supabase.from("campus_ambassador_applications").select("*").order("created_at", { ascending: false }),
  ])

  return NextResponse.json({
    earlyAccess: ea.data || [],
    hackathon: hr.data || [],
    campusAmbassadors: ca.data || [],
  })
}
