import { NextRequest, NextResponse } from "next/server"
import { createHash } from "crypto"
import { createServerClient } from "@/lib/supabase"
import { isAzaadiLive } from "@/lib/campaign"

/* Azaadi Freedom Wall — "What are you breaking free from?"
   Public read of visible entries, server-side write with a light rate limit.
   Anonymous by design: we hash the IP with a salt purely to throttle, and
   never store or return the raw address. */

const MAX_LEN = 140
const MIN_LEN = 3
const WINDOW_MS = 10 * 60 * 1000 // one entry per 10 minutes per person
const PAGE_SIZE = 60

/** Coarse guard so the wall can't be turned into a slur board unattended.
 *  Deliberately small — real moderation is the `hidden` flag in Supabase. */
const BLOCKED = /\b(fuck|shit|bitch|bhosdi|madarchod|behenchod|chutiy|randi|gaand|lauda)\w*/i
const URL_LIKE = /(https?:\/\/|www\.|\.com|\.in\b|@[a-z0-9_]{3,})/i

function ipHash(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for") ?? ""
  const ip = fwd.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown"
  const salt = process.env.AZAADI_IP_SALT ?? "jobingen-azaadi"
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32)
}

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("azaadi_wall")
      .select("id, text, name, city, created_at")
      .eq("hidden", false)
      .order("created_at", { ascending: false })
      .limit(PAGE_SIZE)

    if (error) throw error

    const { count } = await supabase
      .from("azaadi_wall")
      .select("id", { count: "exact", head: true })
      .eq("hidden", false)

    return NextResponse.json(
      { entries: data ?? [], total: count ?? (data?.length ?? 0) },
      { headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=120" } },
    )
  } catch (err) {
    console.error("Azaadi wall read error:", err)
    return NextResponse.json({ entries: [], total: 0 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Prod only accepts writes inside the campaign window; local dev always
    // accepts so the wall can be built and tested before 14 Aug.
    if (!isAzaadiLive() && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "The Freedom Wall is closed." }, { status: 403 })
    }

    const body = await req.json()
    const text = String(body?.text ?? "").trim().replace(/\s+/g, " ")
    const name = String(body?.name ?? "").trim().slice(0, 24)
    const city = String(body?.city ?? "").trim().slice(0, 32)

    if (text.length < MIN_LEN || text.length > MAX_LEN) {
      return NextResponse.json({ error: `Keep it between ${MIN_LEN} and ${MAX_LEN} characters.` }, { status: 400 })
    }
    if (BLOCKED.test(text) || BLOCKED.test(name)) {
      return NextResponse.json({ error: "Let's keep the wall clean. Try rephrasing." }, { status: 400 })
    }
    if (URL_LIKE.test(text)) {
      return NextResponse.json({ error: "Links and handles aren't allowed here." }, { status: 400 })
    }

    const supabase = createServerClient()
    const hash = ipHash(req)

    const { data: recent } = await supabase
      .from("azaadi_wall")
      .select("created_at")
      .eq("ip_hash", hash)
      .gte("created_at", new Date(Date.now() - WINDOW_MS).toISOString())
      .limit(1)

    if (recent && recent.length > 0) {
      return NextResponse.json({ error: "You've already posted. Give someone else a turn 🙂" }, { status: 429 })
    }

    const { data, error } = await supabase
      .from("azaadi_wall")
      .insert({ text, name: name || null, city: city || null, ip_hash: hash })
      .select("id, text, name, city, created_at")
      .single()

    if (error) {
      console.error("Azaadi wall insert error:", error)
      return NextResponse.json({ error: "Couldn't post that. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ entry: data }, { status: 201 })
  } catch (err) {
    console.error("Azaadi wall route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
