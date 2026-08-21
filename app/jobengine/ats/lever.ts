import { cleanDescription, getJson, type NormalizedJob } from "./types"

const ENDPOINT = (site: string) =>
  `https://api.lever.co/v0/postings/${encodeURIComponent(site)}?mode=json`

type LeverPosting = {
  id: string
  text: string
  hostedUrl?: string
  applyUrl?: string
  createdAt?: number
  descriptionPlain?: string
  description?: string
  categories?: { location?: string; team?: string; commitment?: string }
}

/**
 * Fetch every open posting from one Lever site.
 * Throws on an unreachable or invalid site — the caller handles the skip.
 */
export async function fetchLeverSite(site: string, company: string): Promise<NormalizedJob[]> {
  // Lever returns a bare array, not an envelope.
  const postings = await getJson<LeverPosting[]>(ENDPOINT(site))
  if (!Array.isArray(postings)) return []

  return postings
    .filter((p) => p.id && p.text && (p.hostedUrl || p.applyUrl))
    .map((p) => ({
      id: `lever:${p.id}`,
      source: "lever",
      source_id: p.id,
      company,
      title: p.text.trim(),
      location: p.categories?.location?.trim() || null,
      // descriptionPlain is already stripped; description is HTML.
      description: p.descriptionPlain
        ? cleanDescription(p.descriptionPlain)
        : cleanDescription(p.description),
      apply_url: (p.hostedUrl || p.applyUrl)!,
      posted_at: p.createdAt ? new Date(p.createdAt).toISOString() : null,
    } satisfies NormalizedJob))
}
