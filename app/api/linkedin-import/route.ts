import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || !url.includes("linkedin.com/in/")) {
      return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 })
    }

    const profileUrl = url.split("?")[0].replace(/\/$/, "")

    // ── Strategy 1: LinkedIn oEmbed API (public, always works) ──
    // Returns: author_name, thumbnail_url
    let full_name = ""
    let photo = ""
    try {
      const oembedRes = await fetch(
        `https://www.linkedin.com/oembed?url=${encodeURIComponent(profileUrl)}&format=json`,
        {
          headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" },
          signal: AbortSignal.timeout(6000),
        }
      )
      if (oembedRes.ok) {
        const data = await oembedRes.json()
        if (data.author_name) full_name = data.author_name.trim()
        if (data.thumbnail_url) photo = data.thumbnail_url
      }
    } catch { /* continue */ }

    // ── Strategy 2: Guess name from URL slug ──
    // linkedin.com/in/sonic-payeng-7ab8a8212 → "Sonic Payeng"
    if (!full_name) {
      const handle = profileUrl.match(/linkedin\.com\/in\/([^/?]+)/i)?.[1] || ""
      const cleaned = handle.replace(/-[a-z0-9]{6,}$/i, "") // strip numeric suffix
      full_name = cleaned
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .slice(0, 3)
        .join(" ")
    }

    return NextResponse.json({
      full_name,
      photo,
      linkedin: profileUrl,
      // role/company/bio left empty — user fills these
    })

  } catch (err) {
    console.error("LinkedIn import error:", err)
    return NextResponse.json(
      { error: "Could not fetch LinkedIn profile." },
      { status: 422 }
    )
  }
}
