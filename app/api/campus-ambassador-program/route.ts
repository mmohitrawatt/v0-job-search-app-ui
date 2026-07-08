import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { campusAmbassadorSchema } from "@/lib/campus-ambassador/schema"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = campusAmbassadorSchema.safeParse(body)

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]
      return NextResponse.json(
        { error: firstIssue?.message || "Invalid application data." },
        { status: 400 },
      )
    }

    const data = parsed.data
    const supabase = createServerClient()

    const { error } = await supabase.from("campus_ambassadors").insert({
      full_name: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      gender: data.gender || null,
      city: data.city || null,
      state: data.state || null,
      linkedin: data.linkedin || null,
      instagram: data.instagram || null,
      college: data.college,
      university: data.university || null,
      degree: data.degree || null,
      branch: data.branch || null,
      year: data.year,
      graduation_year: data.graduationYear || null,
      clubs: data.clubs.includes("Other") && data.clubOther
        ? [...data.clubs.filter((c) => c !== "Other"), data.clubOther]
        : data.clubs,
      leadership_experience: data.leadershipExperience || null,
      instagram_followers: data.instagramFollowers || null,
      linkedin_followers: data.linkedinFollowers || null,
      content_creator: data.contentCreator,
      student_reach: data.studentReach,
      motivation: data.motivation,
      availability: data.availability,
      communication: data.communication,
      agreed_performance_based: data.agreedPerformanceBased,
      agreed_communication: data.agreedCommunication,
      status: "Pending",
    })

    if (error) {
      console.error("Supabase insert error (campus_ambassadors):", error)
      return NextResponse.json({ error: "Failed to submit your application. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Campus Ambassador route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
