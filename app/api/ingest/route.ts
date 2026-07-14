import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { fetchAllAdzuna, enrichLogos, resolveCompanyDomains } from "@/app/jobs/adzuna"

// Allow a longer run — fetching + logo resolution takes time.
export const maxDuration = 120
export const dynamic = "force-dynamic"

async function runConcurrent<T>(items: T[], fn: (t: T) => Promise<void>, conc = 10) {
  for (let i = 0; i < items.length; i += conc) {
    await Promise.all(items.slice(i, i + conc).map(fn))
  }
}

/**
 * GET /api/ingest?secret=INGEST_SECRET
 * Fetches real jobs from Adzuna India and upserts them into Supabase.
 * Called manually or by a scheduled cron.
 */
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams
  const secret = params.get("secret")
  if (!secret || secret !== process.env.INGEST_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  // ── Logos mode: (re-)resolve + VERIFY real logos for existing jobs ──
  //   ?logos=1          → verify stored domains only (fast)
  //   ?logos=1&full=1   → re-resolve domains via Clearbit first (slower)
  if (params.get("logos") === "1") {
    const supabase = createServerClient()
    const [p1, p2] = await Promise.all([
      supabase.from("jobs").select("company,company_domain").range(0, 999),
      supabase.from("jobs").select("company,company_domain").range(1000, 2999),
    ])
    const rows = [...(p1.data || []), ...(p2.data || [])]

    // company → domain to test
    let map: Map<string, string | null>
    if (params.get("full") === "1") {
      map = await resolveCompanyDomains(rows.map((r: any) => r.company))
    } else {
      map = new Map()
      for (const r of rows as any[]) if (!map.has(r.company)) map.set(r.company, r.company_domain)
    }

    let withLogo = 0, cleared = 0
    const entries = [...map.entries()]
    await runConcurrent(entries, async ([company, domain]) => {
      // DuckDuckGo 404s cleanly when a domain has no real icon.
      let logoUrl: string | null = null
      if (domain) {
        try {
          const r = await fetch(`https://icons.duckduckgo.com/ip3/${domain}.ico`)
          if (r.ok) logoUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`
        } catch { /* ignore */ }
      }
      if (logoUrl) withLogo++; else cleared++
      await supabase
        .from("jobs")
        .update({ company_domain: logoUrl ? domain : null, logo_url: logoUrl })
        .eq("company", company)
    }, 16)

    return NextResponse.json({ ok: true, companies: entries.length, withLogo, cleared })
  }

  // India-focused: only Adzuna India.
  const rows = await fetchAllAdzuna()
  if (rows.length === 0) {
    return NextResponse.json({ ok: false, message: "No jobs fetched (check Adzuna keys)." }, { status: 502 })
  }

  // Resolve real company logos before saving.
  await enrichLogos(rows)

  const supabase = createServerClient()

  // Remove previously-ingested non-Indian (foreign) sources.
  await supabase.from("jobs").delete().neq("source", "adzuna")

  let upserted = 0
  for (let i = 0; i < rows.length; i += 500) {
    const batch = rows.slice(i, i + 500)
    const { error } = await supabase.from("jobs").upsert(batch, { onConflict: "source,source_id" })
    if (error) {
      return NextResponse.json({ ok: false, error: error.message, upserted }, { status: 500 })
    }
    upserted += batch.length
  }

  const withLogo = rows.filter((r) => r.logo_url).length
  return NextResponse.json({ ok: true, fetched: rows.length, upserted, withLogo })
}
