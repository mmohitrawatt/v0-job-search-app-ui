import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

function checkAuth(req: NextRequest): NextResponse | null {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Server misconfigured: ADMIN_PASSWORD not set" }, { status: 500 })
  }
  const auth = req.headers.get("authorization")
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return null
}

// Load current config for editing
export async function GET(req: NextRequest) {
  const fail = checkAuth(req)
  if (fail) return fail
  const supabase = createServerClient()
  const { data } = await supabase
    .from("site_content")
    .select("popup, statuses, updated_at")
    .eq("id", "main")
    .maybeSingle()
  return NextResponse.json(data ?? { popup: {}, statuses: [] })
}

// Save popup + statuses. Images are already in Storage by this point — the
// browser uploads them directly via /api/admin/site-content/upload-url, so this
// body stays small JSON and never hits Vercel's request size limit.
export async function POST(req: NextRequest) {
  const fail = checkAuth(req)
  if (fail) return fail

  try {
    const { popup, statuses } = (await req.json()) as {
      popup: Record<string, unknown>
      statuses: Array<Record<string, unknown>>
    }
    if (!popup || !Array.isArray(statuses)) {
      return NextResponse.json({ error: "Missing popup or statuses" }, { status: 400 })
    }

    const supabase = createServerClient()
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: "main", popup, statuses, updated_at: new Date().toISOString() })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ ok: true, popup, statuses })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Save failed" },
      { status: 500 }
    )
  }
}
