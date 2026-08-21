import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

const BUCKET = "site-content"

// Hands the admin browser a short-lived signed upload URL so the image goes
// straight to Supabase Storage. Routing the file through this function instead
// would hit Vercel's ~4.5MB request body limit (phone photos are bigger).
export async function POST(req: NextRequest) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Server misconfigured: ADMIN_PASSWORD not set" }, { status: 500 })
  }
  if (req.headers.get("authorization") !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let fileName = "upload.png"
  try {
    const body = (await req.json()) as { fileName?: string }
    if (body?.fileName) fileName = body.fileName
  } catch {
    /* keep default */
  }

  const ext = (fileName.split(".").pop() ?? "png").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "png"
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const supabase = createServerClient()
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path)
  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Could not create upload URL" }, { status: 500 })
  }

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return NextResponse.json({ path: data.path, token: data.token, publicUrl: pub.publicUrl })
}
