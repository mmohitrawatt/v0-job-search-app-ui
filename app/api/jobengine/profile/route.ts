import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { emailOk, findUserId } from "@/lib/jobengine/db"

export const dynamic = "force-dynamic"

// Allow the Chrome extension (running on greenhouse.io / lever.co) to read this.
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

/**
 * GET /api/jobengine/profile?email=...
 * Returns the candidate's contact details for the auto-fill extension.
 * Read-only, contact info the user already provided — no secrets.
 */
export async function GET(req: NextRequest) {
  try {
    const email = String(req.nextUrl.searchParams.get("email") || "").trim().toLowerCase()
    if (!emailOk(email)) return NextResponse.json({ error: "Valid email required." }, { status: 400, headers: CORS })

    const supabase = createServerClient()
    const userId = await findUserId(supabase, email)
    if (!userId) return NextResponse.json({ ok: true, profile: null }, { headers: CORS })

    const { data } = await supabase.from("jobengine_resumes").select("profile").eq("user_id", userId).maybeSingle()
    const p = (data?.profile || {}) as any
    const contact = p.contact || {}

    return NextResponse.json(
      {
        ok: true,
        profile: {
          name: contact.name || "",
          email: contact.email || email,
          phone: contact.phone || "",
          linkedin: contact.linkedin || "",
          github: contact.github || "",
          location: contact.location || (p.locations?.[0] || ""),
          role: p.role || "",
        },
      },
      { headers: CORS },
    )
  } catch (err) {
    console.error("[jobengine/profile] error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500, headers: CORS })
  }
}
