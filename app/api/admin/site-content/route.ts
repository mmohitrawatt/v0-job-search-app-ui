import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

const BUCKET = "site-content"

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

async function uploadImage(
  supabase: ReturnType<typeof createServerClient>,
  file: File
): Promise<string | null> {
  if (!file || file.size === 0) return null
  const ext = file.name.split(".").pop() ?? "png"
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = new Uint8Array(await file.arrayBuffer())
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, buffer, { contentType: file.type || "image/png", upsert: false })
  if (error) return null
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
  return data.publicUrl
}

// Save popup + statuses (with optional image uploads)
export async function POST(req: NextRequest) {
  const fail = checkAuth(req)
  if (fail) return fail

  try {
    const form = await req.formData()
    const raw = form.get("data") as string | null
    if (!raw) return NextResponse.json({ error: "Missing data" }, { status: 400 })

    const { popup, statuses } = JSON.parse(raw) as {
      popup: Record<string, unknown>
      statuses: Array<Record<string, unknown>>
    }

    const supabase = createServerClient()

    // Popup image upload (field: popup_image)
    const popupImage = form.get("popup_image") as File | null
    if (popupImage && popupImage.size > 0) {
      const url = await uploadImage(supabase, popupImage)
      if (url) popup.image = url
    }

    // Per-status image uploads (field: status_image_<index>)
    for (let i = 0; i < statuses.length; i++) {
      const f = form.get(`status_image_${i}`) as File | null
      if (f && f.size > 0) {
        const url = await uploadImage(supabase, f)
        if (url) statuses[i].image = url
      }
    }

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
