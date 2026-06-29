import { NextRequest, NextResponse } from "next/server"

/* ─────────────────────────────────────────────────────────────────
   LinkedIn Import API  — 4-layer extraction strategy
   ─────────────────────────────────────────────────────────────────
   Layer 1  oEmbed        → name, photo          (most reliable)
   Layer 2  HTML scrape   → JSON-LD Person       → job_title, company, bio
   Layer 3  HTML scrape   → Open Graph meta tags → job_title, company, bio
   Layer 4  URL slug      → name fallback
   ─────────────────────────────────────────────────────────────────
   LinkedIn's og:title format: "Name | Title at Company"
   LinkedIn's og:description: short bio / headline
   LinkedIn's JSON-LD type "Person": has jobTitle, worksFor, description
   ───────────────────────────────────────────────────────────────── */

const BROWSER_HEADERS: Record<string, string> = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "no-cache",
  "Pragma": "no-cache",
  "Sec-Ch-Ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
}

/* ── helpers ── */

function clean(s: string | undefined | null): string {
  if (!s) return ""
  return s.replace(/\s+/g, " ").trim()
}

function extractMeta(html: string, property: string): string {
  // Handles both property="" and name="" variants, single and double quotes
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
    "i"
  )
  const m = html.match(re)
  if (m) return clean(decodeHtmlEntities(m[1]))

  // Also try content-first ordering
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
    "i"
  )
  const m2 = html.match(re2)
  return m2 ? clean(decodeHtmlEntities(m2[1])) : ""
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
}

/* ── Parse LinkedIn's og:title  e.g. "Priya Sharma | Senior SWE at Google" ── */
function parseOgTitle(title: string): { name: string; job_title: string; company: string } {
  // Format 1: "Name | Title at Company"
  // Format 2: "Name - Title - Company"
  // Format 3: "Name | Company"
  // Format 4: "Name"

  let name = ""
  let job_title = ""
  let company = ""

  const pipe = title.split("|")
  if (pipe.length >= 2) {
    name = clean(pipe[0])
    const rest = clean(pipe[1])
    // "Senior SWE at Google" or "Google" or "Senior SWE, Google"
    const atMatch = rest.match(/^(.+?)\s+at\s+(.+)$/i)
    if (atMatch) {
      job_title = clean(atMatch[1])
      company   = clean(atMatch[2])
    } else {
      // Could be just company, or "Title - Company"
      const dashMatch = rest.match(/^(.+?)\s*[-–]\s*(.+)$/)
      if (dashMatch) {
        job_title = clean(dashMatch[1])
        company   = clean(dashMatch[2])
      } else {
        job_title = rest
      }
    }
  } else {
    const dash = title.split("-")
    if (dash.length >= 2) {
      name      = clean(dash[0])
      job_title = clean(dash[1])
      if (dash.length >= 3) company = clean(dash[2])
    } else {
      name = clean(title)
    }
  }

  // Strip " | LinkedIn" suffix if present
  const linkedinSuffix = / \| LinkedIn$/i
  name      = name.replace(linkedinSuffix, "")
  job_title = job_title.replace(linkedinSuffix, "")
  company   = company.replace(linkedinSuffix, "")

  return { name, job_title, company }
}

/* ── Extract JSON-LD blocks from HTML ── */
function parseJsonLd(html: string): Record<string, unknown>[] {
  const results: Record<string, unknown>[] = []
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1])
      if (Array.isArray(parsed)) results.push(...parsed)
      else results.push(parsed)
    } catch { /* malformed JSON, skip */ }
  }
  return results
}

function findPersonSchema(blocks: Record<string, unknown>[]) {
  for (const block of blocks) {
    if (block["@type"] === "Person") return block
    // Sometimes nested inside @graph
    if (Array.isArray(block["@graph"])) {
      const found = (block["@graph"] as Record<string, unknown>[]).find(
        (n) => n["@type"] === "Person"
      )
      if (found) return found
    }
  }
  return null
}

/* ── Name from URL slug fallback ── */
function nameFromSlug(profileUrl: string): string {
  const handle = profileUrl.match(/linkedin\.com\/in\/([^/?#]+)/i)?.[1] ?? ""
  const cleaned = handle.replace(/-[a-z0-9]{6,}$/i, "")
  return cleaned
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .slice(0, 3)
    .join(" ")
}

/* ── Fetch HTML safely ── */
async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: BROWSER_HEADERS,
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
    })
    // LinkedIn returns 999 for bot-blocked requests
    if (!res.ok || res.status === 999) return null
    const ct = res.headers.get("content-type") ?? ""
    if (!ct.includes("html")) return null
    return await res.text()
  } catch {
    return null
  }
}

/* ═══════════════════════════════════════════════════════════
   Main handler
   ═══════════════════════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url || !url.includes("linkedin.com/in/")) {
      return NextResponse.json({ error: "Please paste a valid LinkedIn profile URL (linkedin.com/in/...)" }, { status: 400 })
    }

    const profileUrl = url.split("?")[0].replace(/\/$/, "")

    let full_name  = ""
    let photo      = ""
    let job_title  = ""
    let company    = ""
    let bio        = ""
    let experience = ""

    /* ── Layer 1: oEmbed ── (most stable, gives name + photo) */
    try {
      const oRes = await fetch(
        `https://www.linkedin.com/oembed?url=${encodeURIComponent(profileUrl)}&format=json`,
        {
          headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" },
          signal: AbortSignal.timeout(5000),
        }
      )
      if (oRes.ok) {
        const od = await oRes.json()
        if (od.author_name) full_name = clean(od.author_name)
        if (od.thumbnail_url) photo   = od.thumbnail_url
      }
    } catch { /* continue */ }

    /* ── Layer 2 & 3: HTML scrape ── */
    const html = await fetchHtml(profileUrl)

    if (html) {
      /* Layer 2: JSON-LD Person schema */
      const jsonBlocks = parseJsonLd(html)
      const person = findPersonSchema(jsonBlocks)
      if (person) {
        if (!full_name  && person.name)                           full_name = clean(String(person.name))
        if (!job_title  && person.jobTitle)                       job_title = clean(String(person.jobTitle))
        if (!company    && (person.worksFor as Record<string,unknown>)?.name)
          company = clean(String((person.worksFor as Record<string,unknown>).name))
        if (!bio        && person.description)                    bio = clean(String(person.description)).slice(0, 800)
        if (!photo      && (person.image as Record<string,unknown>)?.url)
          photo   = String((person.image as Record<string,unknown>).url)
      }

      /* Layer 3: Open Graph meta tags */
      const ogTitle       = extractMeta(html, "og:title")
      const ogDescription = extractMeta(html, "og:description")
      const ogImage       = extractMeta(html, "og:image")

      if (ogTitle) {
        const parsed = parseOgTitle(ogTitle)
        if (!full_name && parsed.name)      full_name = parsed.name
        if (!job_title && parsed.job_title) job_title = parsed.job_title
        if (!company   && parsed.company)   company   = parsed.company
      }

      // og:description on LinkedIn is typically the headline/bio
      if (!bio && ogDescription && ogDescription.length > 10) {
        bio = ogDescription.slice(0, 800)
      }

      if (!photo && ogImage) photo = ogImage

      /* Also try twitter meta as backup */
      if (!full_name) {
        const twTitle = extractMeta(html, "twitter:title")
        if (twTitle) {
          const parsed = parseOgTitle(twTitle)
          if (parsed.name)      full_name = parsed.name
          if (!job_title && parsed.job_title) job_title = parsed.job_title
          if (!company   && parsed.company)   company   = parsed.company
        }
      }
    }

    /* ── Layer 4: URL slug fallback for name ── */
    if (!full_name) {
      full_name = nameFromSlug(profileUrl)
    }

    /* ── Post-process ── */
    // Strip " | LinkedIn" etc. from job_title
    job_title = job_title.replace(/\s*\|.*$/, "").trim()
    company   = company.replace(/\s*\|.*$/, "").trim()

    // Guess experience from bio if present
    if (bio) {
      const expMatch = bio.match(/(\d{1,2})\+?\s*years? (?:of )?experience/i)
      if (expMatch) {
        const yrs = parseInt(expMatch[1])
        if (yrs <= 2)       experience = "0–2 years"
        else if (yrs <= 5)  experience = "3–5 years"
        else if (yrs <= 10) experience = "5–10 years"
        else                experience = "10+ years"
      }
    }

    const result = {
      full_name,
      photo,
      job_title,
      company,
      bio,
      experience,
      linkedin: profileUrl,
      /* signal what was actually found so UI can show partial success */
      _found: {
        name:       !!full_name,
        photo:      !!photo,
        job_title:  !!job_title,
        company:    !!company,
        bio:        !!bio,
        experience: !!experience,
      },
    }

    // If we got at least a name, it's a success
    if (!full_name) {
      return NextResponse.json(
        { error: "LinkedIn profile not accessible. This is normal — LinkedIn blocks automated access. Please fill in your details manually." },
        { status: 422 }
      )
    }

    return NextResponse.json(result)

  } catch (err) {
    console.error("LinkedIn import error:", err)
    return NextResponse.json(
      { error: "Could not reach LinkedIn. Please fill in your details manually." },
      { status: 422 }
    )
  }
}
