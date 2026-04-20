import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || !url.includes("linkedin.com/in/")) {
      return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 })
    }

    // Normalize URL
    const profileUrl = url.split("?")[0].replace(/\/$/, "")

    const res = await fetch(profileUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
      },
      redirect: "follow",
    })

    const html = await res.text()

    function getMeta(property: string): string {
      const match = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"))
        || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`, "i"))
      return match?.[1] ? decodeHTMLEntities(match[1].trim()) : ""
    }

    function decodeHTMLEntities(str: string): string {
      return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    }

    const ogTitle = getMeta("og:title")       // "Sonic Payeng - Software Engineer II at Dell | LinkedIn"
    const ogDesc = getMeta("og:description")  // "View Sonic Payeng's profile..."
    const ogImage = getMeta("og:image")

    // Parse name: everything before first " - " or " | "
    let full_name = ""
    let job_title = ""
    let company = ""

    if (ogTitle) {
      // Remove " | LinkedIn" suffix
      const cleaned = ogTitle.replace(/\s*\|\s*LinkedIn\s*$/i, "").trim()
      const dashIdx = cleaned.indexOf(" - ")
      if (dashIdx !== -1) {
        full_name = cleaned.slice(0, dashIdx).trim()
        const roleRaw = cleaned.slice(dashIdx + 3).trim()
        // Try to split "Role at Company"
        const atMatch = roleRaw.match(/^(.+?)\s+(?:at|@)\s+(.+)$/i)
        if (atMatch) {
          job_title = atMatch[1].trim()
          company = atMatch[2].trim()
        } else {
          job_title = roleRaw
        }
      } else {
        full_name = cleaned
      }
    }

    // Parse experience from description
    let experience = ""
    const expMatch = ogDesc.match(/(\d+)\+?\s*(?:years?|yrs?)/i)
    if (expMatch) {
      const y = parseInt(expMatch[1])
      if (y <= 2) experience = "0–2 years"
      else if (y <= 5) experience = "3–5 years"
      else if (y <= 10) experience = "5–10 years"
      else experience = "10+ years"
    }

    // Bio: extract meaningful part from og:description (skip "View X's profile..." boilerplate)
    let bio = ""
    const bioMatch = ogDesc.match(/(?:See[^.]+\.|View[^.]+\.)\s*(.+)/i)
    bio = bioMatch ? bioMatch[1].trim() : ogDesc

    return NextResponse.json({
      full_name,
      job_title,
      company,
      experience,
      linkedin: profileUrl,
      photo: ogImage || "",
      bio,
      raw_title: ogTitle,
    })
  } catch (err) {
    console.error("LinkedIn import error:", err)
    return NextResponse.json({ error: "Could not fetch profile. LinkedIn may require login for this profile." }, { status: 422 })
  }
}
