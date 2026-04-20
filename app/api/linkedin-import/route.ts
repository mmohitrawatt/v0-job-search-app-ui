import { NextRequest, NextResponse } from "next/server"

function decode(str: string): string {
  return str
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, c) => String.fromCharCode(Number(c)))
    .replace(/\\u([\dA-Fa-f]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
}

function getMeta(html: string, property: string): string {
  const r1 = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']{1,800})["']`, "i"))
  const r2 = html.match(new RegExp(`<meta[^>]+content=["']([^"']{1,800})["'][^>]+(?:property|name)=["']${property}["']`, "i"))
  return r1?.[1] ? decode(r1[1].trim()) : r2?.[1] ? decode(r2[1].trim()) : ""
}

function parseTitle(ogTitle: string) {
  let full_name = "", job_title = "", company = ""
  if (!ogTitle) return { full_name, job_title, company }
  const cleaned = ogTitle.replace(/\s*\|\s*LinkedIn\s*$/i, "").trim()
  const dashIdx = cleaned.indexOf(" - ")
  if (dashIdx !== -1) {
    full_name = cleaned.slice(0, dashIdx).trim()
    const roleRaw = cleaned.slice(dashIdx + 3).trim()
    const atMatch = roleRaw.match(/^(.+?)\s+(?:at|@|·)\s+(.+)$/i)
    if (atMatch) { job_title = atMatch[1].trim(); company = atMatch[2].trim() }
    else job_title = roleRaw
  } else {
    full_name = cleaned
  }
  return { full_name, job_title, company }
}

function parseExp(text: string) {
  const m = text.match(/(\d+)\+?\s*(?:years?|yrs?)/i)
  if (!m) return ""
  const y = parseInt(m[1])
  if (y <= 2) return "0–2 years"
  if (y <= 5) return "3–5 years"
  if (y <= 10) return "5–10 years"
  return "10+ years"
}

// Try to parse JSON-LD structured data that LinkedIn embeds
function parseJsonLd(html: string) {
  const result: Record<string, string> = {}
  try {
    const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    for (const s of scripts) {
      const data = JSON.parse(s[1])
      const person = Array.isArray(data) ? data.find((d: { "@type": string }) => d["@type"] === "Person") : data["@type"] === "Person" ? data : null
      if (person) {
        if (person.name) result.full_name = person.name
        if (person.jobTitle) result.job_title = person.jobTitle
        if (person.worksFor?.name) result.company = person.worksFor.name
        if (person.description) result.bio = person.description.slice(0, 600)
        if (person.image?.contentUrl || person.image) result.photo = person.image?.contentUrl || person.image
        break
      }
    }
  } catch { /* ignore */ }
  return result
}

async function tryFetch(url: string, ua: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": ua,
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "Upgrade-Insecure-Requests": "1",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(8000),
  })
  return res.text()
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || !url.includes("linkedin.com/in/")) {
      return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 })
    }

    const profileUrl = url.split("?")[0].replace(/\/$/, "")

    // Try multiple user agents — mobile UA sometimes bypasses blocks
    const UAS = [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      "LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)",
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    ]

    let html = ""
    for (const ua of UAS) {
      try {
        html = await tryFetch(profileUrl, ua)
        // If we got meaningful content (not just login redirect with no data), break
        if (html.includes("og:title") || html.includes('"@type":"Person"') || html.includes("application/ld+json")) break
      } catch { /* try next */ }
    }

    if (!html) {
      return NextResponse.json({ error: "LinkedIn is blocking requests. Please fill manually." }, { status: 422 })
    }

    // 1. Try JSON-LD structured data first (most reliable)
    const jsonLd = parseJsonLd(html)

    // 2. Fall back to og: meta tags
    const ogTitle = getMeta(html, "og:title")
    const ogDesc  = getMeta(html, "og:description")
    const ogImage = getMeta(html, "og:image")

    const { full_name: parsedName, job_title: parsedRole, company: parsedCompany } = parseTitle(ogTitle)

    const full_name  = jsonLd.full_name  || parsedName   || ""
    const job_title  = jsonLd.job_title  || parsedRole   || ""
    const company    = jsonLd.company    || parsedCompany || ""
    const photo      = jsonLd.photo      || ogImage       || ""
    const experience = parseExp(ogDesc + " " + (jsonLd.bio || ""))

    // Bio: prefer JSON-LD description; otherwise strip boilerplate from og:description
    const rawBio = jsonLd.bio || ogDesc || ""
    const bio = rawBio.replace(/^View .+?'s? (?:full )?profile on LinkedIn[^.]*\.\s*/i, "").trim()

    if (!full_name && !job_title) {
      return NextResponse.json(
        { error: "LinkedIn blocked this request. Try making your profile public, or fill manually." },
        { status: 422 }
      )
    }

    return NextResponse.json({ full_name, job_title, company, experience, linkedin: profileUrl, photo, bio })

  } catch (err) {
    console.error("LinkedIn import error:", err)
    return NextResponse.json(
      { error: "Could not fetch profile. Make sure the LinkedIn profile is public." },
      { status: 422 }
    )
  }
}
