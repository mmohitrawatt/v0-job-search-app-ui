import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export const dynamic = "force-dynamic"
export const revalidate = 0

/**
 * GET /api/jobengine/stats
 * Live counts for the hero — real trust signal (jobs watched, companies,
 * freshness). Cheap: two count-head queries + one ordered row.
 */
export async function GET() {
  try {
    const supabase = createServerClient()

    const [jobs, companies, latest, names] = await Promise.all([
      supabase.from("jobengine_jobs").select("*", { count: "exact", head: true }),
      supabase.from("jobengine_company_tokens").select("*", { count: "exact", head: true }).eq("active", true),
      supabase.from("jobengine_jobs").select("updated_at").order("updated_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("jobengine_company_tokens").select("company").eq("active", true).order("company"),
    ])

    return NextResponse.json({
      ok: true,
      jobs: jobs.count ?? 0,
      companies: companies.count ?? 0,
      lastCrawl: latest.data?.updated_at ?? null,
      // Names power the hero's "watching … career pages" scanning ticker.
      companyNames: (names.data ?? []).map((r: any) => r.company),
    })
  } catch (err) {
    console.error("[jobengine/stats] error:", err)
    return NextResponse.json({ ok: false, jobs: 0, companies: 0, lastCrawl: null })
  }
}
