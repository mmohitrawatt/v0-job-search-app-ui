import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("bootcamp_feedback")
      .select("name, overall_rating, liked, recommend, created_at")
      .eq("bootcamp", "flagship_2026")
      .gte("overall_rating", 3)
      .not("liked", "eq", "")
      .order("created_at", { ascending: false })
      .limit(30)

    if (error) throw error

    const rows = data ?? []

    const sanitised = rows.map((r: { name: string; overall_rating: number; liked: string; recommend: string; created_at: string }) => ({
      name: (() => {
        const parts = r.name.trim().split(" ")
        return parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0]
      })(),
      rating: r.overall_rating,
      quote: r.liked,
      recommend: r.recommend,
      created_at: r.created_at,
    }))

    const total = rows.length
    const avgRating = total > 0
      ? Math.round((rows.reduce((s: number, r: { overall_rating: number }) => s + r.overall_rating, 0) / total) * 10) / 10
      : 0
    const recommendCount = rows.filter((r: { recommend: string }) => r.recommend?.toLowerCase().includes("yes")).length
    const recommendPct = total > 0 ? Math.round((recommendCount / total) * 100) : 0

    return NextResponse.json({
      reviews: sanitised,
      stats: { total, avgRating, recommendPct },
    }, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" }
    })
  } catch {
    return NextResponse.json({ reviews: [], stats: { total: 0, avgRating: 0, recommendPct: 0 } })
  }
}
