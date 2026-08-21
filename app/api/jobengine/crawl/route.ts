import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { fetchGreenhouseBoard } from "@/app/jobengine/ats/greenhouse"
import { fetchLeverSite } from "@/app/jobengine/ats/lever"
import type { BoardResult, CompanyToken, NormalizedJob } from "@/app/jobengine/ats/types"

// Crawling 25+ boards takes time; matches the /api/ingest ceiling.
export const maxDuration = 120
export const dynamic = "force-dynamic"

const CONCURRENCY = 6

async function runConcurrent<T>(items: T[], fn: (t: T) => Promise<void>, conc = CONCURRENCY) {
  for (let i = 0; i < items.length; i += conc) {
    await Promise.all(items.slice(i, i + conc).map(fn))
  }
}

/**
 * GET /api/jobengine/crawl
 *
 * Pulls live postings from every active Greenhouse/Lever board in
 * jobengine_company_tokens and upserts them into jobengine_jobs.
 * Runs on a schedule (vercel.json) — never on page load.
 *
 * Auth, either of:
 *   - `?secret=JOBENGINE_CRON_SECRET`      (manual runs, matches /api/ingest)
 *   - `Authorization: Bearer <CRON_SECRET>` (what Vercel Cron actually sends —
 *     it can't append a query string, and putting the secret in vercel.json
 *     would commit it to the repo)
 *
 * A board that is unreachable or invalid is recorded and skipped; it never
 * aborts the crawl. Boards that 404 are deactivated so the next run is faster.
 */
export async function GET(req: Request) {
  const querySecret = new URL(req.url).searchParams.get("secret")
  const bearer = req.headers.get("authorization")

  const manualOk =
    !!process.env.JOBENGINE_CRON_SECRET && querySecret === process.env.JOBENGINE_CRON_SECRET
  const cronOk = !!process.env.CRON_SECRET && bearer === `Bearer ${process.env.CRON_SECRET}`

  if (!manualOk && !cronOk) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const supabase = createServerClient()

  const { data: tokens, error: tokensError } = await supabase
    .from("jobengine_company_tokens")
    .select("id, ats, token, company")
    .eq("active", true)

  if (tokensError) {
    console.error("[jobengine/crawl] token fetch failed:", tokensError)
    return NextResponse.json({ error: "Failed to load company boards." }, { status: 500 })
  }
  if (!tokens || tokens.length === 0) {
    return NextResponse.json(
      { error: "No active company boards. Seed jobengine_company_tokens first." },
      { status: 400 },
    )
  }

  const results: BoardResult[] = []
  const jobs: NormalizedJob[] = []

  await runConcurrent(tokens as CompanyToken[], async (t) => {
    try {
      const found =
        t.ats === "greenhouse"
          ? await fetchGreenhouseBoard(t.token, t.company)
          : await fetchLeverSite(t.token, t.company)

      jobs.push(...found)
      results.push({ ats: t.ats, token: t.token, company: t.company, jobs: found.length, error: null })

      await supabase
        .from("jobengine_company_tokens")
        .update({ last_ok_at: new Date().toISOString(), last_error: null })
        .eq("id", t.id)
    } catch (err) {
      const message = err instanceof Error ? err.message : "unknown error"
      results.push({ ats: t.ats, token: t.token, company: t.company, jobs: 0, error: message })

      // A 404 means the token is wrong — stop wasting a request on it each run.
      const isMissing = message.includes("404")
      await supabase
        .from("jobengine_company_tokens")
        .update({ last_error: message, ...(isMissing ? { active: false } : {}) })
        .eq("id", t.id)
    }
  })

  if (jobs.length === 0) {
    return NextResponse.json(
      { ok: false, message: "No jobs fetched from any board.", boards: results },
      { status: 502 },
    )
  }

  // Two boards can't collide (id is prefixed by source), but a board listing the
  // same posting twice would — dedupe so the upsert doesn't fail.
  const unique = [...new Map(jobs.map((j) => [j.id, j])).values()]

  let upserted = 0
  for (let i = 0; i < unique.length; i += 500) {
    const batch = unique.slice(i, i + 500).map((j) => ({ ...j, updated_at: new Date().toISOString() }))
    const { error } = await supabase
      .from("jobengine_jobs")
      .upsert(batch, { onConflict: "source,source_id" })
    if (error) {
      console.error("[jobengine/crawl] upsert failed:", error)
      return NextResponse.json({ ok: false, error: error.message, upserted }, { status: 500 })
    }
    upserted += batch.length
  }

  const failed = results.filter((r) => r.error)
  return NextResponse.json({
    ok: true,
    boards: tokens.length,
    boardsOk: results.length - failed.length,
    boardsFailed: failed.length,
    fetched: unique.length,
    upserted,
    // Sorted so the biggest contributors — and every failure — are easy to spot.
    results: results.sort((a, b) => b.jobs - a.jobs),
  })
}
