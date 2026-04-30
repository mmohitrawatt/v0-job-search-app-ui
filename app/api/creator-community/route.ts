import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      fullName, email, phone, city,
      instagram, linkedin, youtube, followerCount,
      contentTypes, bestPosts, audienceDescription,
      contentIdea, collaborationModel, postsPerWeek,
    } = body

    if (!fullName?.trim()) return NextResponse.json({ error: "Full name is required." }, { status: 400 })
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
    if (!phone?.trim()) return NextResponse.json({ error: "Phone number is required." }, { status: 400 })
    if (!city?.trim()) return NextResponse.json({ error: "City is required." }, { status: 400 })
    if (!instagram?.trim()) return NextResponse.json({ error: "Instagram handle is required." }, { status: 400 })
    if (!linkedin?.trim()) return NextResponse.json({ error: "LinkedIn profile is required." }, { status: 400 })
    if (!followerCount) return NextResponse.json({ error: "Follower count is required." }, { status: 400 })
    if (!contentTypes?.length) return NextResponse.json({ error: "Select at least one content type." }, { status: 400 })
    if (!bestPosts?.trim()) return NextResponse.json({ error: "Best posts are required." }, { status: 400 })
    if (!audienceDescription?.trim()) return NextResponse.json({ error: "Audience description is required." }, { status: 400 })
    if (!contentIdea?.trim()) return NextResponse.json({ error: "Content idea is required." }, { status: 400 })
    if (!collaborationModel) return NextResponse.json({ error: "Collaboration model is required." }, { status: 400 })
    if (!postsPerWeek) return NextResponse.json({ error: "Posts per week is required." }, { status: 400 })

    const supabase = createServerClient()

    const { error } = await supabase.from("creator_community_applications").insert({
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: city.trim(),
      instagram: instagram.trim(),
      linkedin: linkedin.trim(),
      youtube: youtube?.trim() || null,
      follower_count: followerCount,
      content_types: contentTypes,
      best_posts: bestPosts.trim(),
      audience_description: audienceDescription.trim(),
      content_idea: contentIdea.trim(),
      collaboration_model: collaborationModel,
      posts_per_week: postsPerWeek,
    })

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Creator community route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
