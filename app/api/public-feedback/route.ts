import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("bootcamp_feedback")
      .select("name, overall_rating, liked, recommend")
      .eq("bootcamp", "bootcamp_1")
      .gte("overall_rating", 3)
      .not("liked", "eq", "")
      .order("created_at", { ascending: false })
      .limit(20)

    if (error) throw error

    // Sanitise: only first name + last initial
    const sanitised = (data ?? []).map((r: { name: string; overall_rating: number; liked: string; recommend: string }) => ({
      name: (() => {
        const parts = r.name.trim().split(" ")
        return parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0]
      })(),
      rating: r.overall_rating,
      quote: r.liked,
      recommend: r.recommend,
    }))

    return NextResponse.json({ feedback: sanitised }, {
      headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300" }
    })
  } catch {
    return NextResponse.json({ feedback: [] })
  }
}
