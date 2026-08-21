/**
 * Shared shape every ATS fetcher normalizes into.
 * Column names are snake_case because these rows go straight into Supabase
 * via upsert — same convention as `JobRow` in app/jobs/adzuna.ts.
 */
export type NormalizedJob = {
  id: string // `${source}:${source_id}`
  source: string // "greenhouse" | "lever"
  source_id: string
  company: string
  title: string
  location: string | null
  description: string | null
  apply_url: string
  posted_at: string | null // ISO 8601
}

export type CompanyToken = {
  id: string
  ats: "greenhouse" | "lever"
  token: string
  company: string
}

/** Per-board outcome, surfaced by the crawl endpoint so bad tokens can be pruned. */
export type BoardResult = {
  ats: string
  token: string
  company: string
  jobs: number
  error: string | null
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#x2F;/gi, "/")
    .replace(/&rsquo;|&#8217;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/&ndash;|&mdash;/gi, "-")
    .replace(/&amp;/gi, "&") // last — otherwise &amp;lt; decodes to "<"
}

function stripTags(s: string): string {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    // Keep block boundaries as spaces so words don't run together.
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
}

/**
 * Turn an ATS description blob into plain text.
 *
 * Greenhouse returns markup that is *entity-escaped* (`&lt;div&gt;`), so
 * entities must be decoded BEFORE tags are stripped — stripping first leaves
 * the escaped tags untouched, and decoding then re-introduces them as literal
 * `<div>` text. Two passes cover both escaped and raw markup.
 */
export function cleanDescription(html: string | null | undefined, max = 4000): string | null {
  if (!html) return null
  const text = decodeEntities(stripTags(decodeEntities(stripTags(html))))
    .replace(/\s+/g, " ")
    .trim()
  if (!text) return null
  return text.length > max ? text.slice(0, max) : text
}

/**
 * Shared fetch with a UA + timeout — public ATS APIs rate-limit anonymous clients.
 * 45s because the biggest boards (Databricks ~2.4k postings with full content)
 * return multi-megabyte payloads that comfortably exceed a 15s budget.
 */
export async function getJson<T>(url: string, timeoutMs = 45000): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; JobingenBot/1.0)" },
      signal: controller.signal,
      cache: "no-store",
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as T
  } finally {
    clearTimeout(timer)
  }
}
