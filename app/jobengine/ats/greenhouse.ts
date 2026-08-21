import { cleanDescription, getJson, type NormalizedJob } from "./types"

const ENDPOINT = (token: string) =>
  `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(token)}/jobs?content=true`

type GreenhouseJob = {
  id: number
  title: string
  absolute_url: string
  updated_at?: string
  content?: string
  location?: { name?: string }
  offices?: Array<{ name?: string }>
}

/**
 * Fetch every open posting from one Greenhouse board.
 * Throws on an unreachable or invalid board — the caller decides whether that
 * kills the crawl (it shouldn't) or just skips this company.
 */
export async function fetchGreenhouseBoard(token: string, company: string): Promise<NormalizedJob[]> {
  const data = await getJson<{ jobs?: GreenhouseJob[] }>(ENDPOINT(token))
  const jobs = data.jobs ?? []

  return jobs
    .filter((j) => j.id && j.title && j.absolute_url)
    .map((j) => {
      const location =
        j.location?.name?.trim() ||
        j.offices?.map((o) => o.name).filter(Boolean).join(", ") ||
        null

      return {
        id: `greenhouse:${j.id}`,
        source: "greenhouse",
        source_id: String(j.id),
        company,
        title: j.title.trim(),
        location: location || null,
        // Greenhouse returns HTML-escaped markup in `content`.
        description: cleanDescription(j.content),
        apply_url: j.absolute_url,
        posted_at: j.updated_at ? new Date(j.updated_at).toISOString() : null,
      } satisfies NormalizedJob
    })
}
