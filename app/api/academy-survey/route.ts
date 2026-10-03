import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const name              = (body.name as string | null)?.trim() ?? ""
    const email             = (body.email as string | null)?.trim().toLowerCase() ?? ""
    const college           = (body.college as string | null)?.trim() ?? ""
    const specialization    = (body.specialization as string | null)?.trim() ?? ""
    const ai_topics         = Array.isArray(body.ai_topics) ? (body.ai_topics as string[]).filter(Boolean) : []
    const ai_topics_other   = (body.ai_topics_other as string | null)?.trim() ?? ""
    const biggest_challenge = (body.biggest_challenge as string | null)?.trim() ?? ""
    const session_type      = (body.session_type as string | null)?.trim() ?? ""
    const build_goal        = (body.build_goal as string | null)?.trim() ?? ""
    const specific_topic    = (body.specific_topic as string | null)?.trim() ?? ""

    if (!college)                           return NextResponse.json({ error: "Please tell us your college or university." }, { status: 400 })
    if (!specialization)                    return NextResponse.json({ error: "Please tell us your specialization and year." }, { status: 400 })
    if (!ai_topics.length)                  return NextResponse.json({ error: "Please pick at least one topic you want to learn." }, { status: 400 })
    if (!biggest_challenge)                 return NextResponse.json({ error: "Please tell us your biggest challenge." }, { status: 400 })
    if (!session_type)                      return NextResponse.json({ error: "Please pick a session type." }, { status: 400 })
    if (!build_goal)                        return NextResponse.json({ error: "Please tell us what you'd like to build or learn." }, { status: 400 })

    const supabase = createServerClient()

    const { error } = await supabase.from("academy_survey_responses").insert({
      name: name || null,
      email: email || null,
      college,
      specialization,
      ai_topics,
      ai_topics_other: ai_topics_other || null,
      biggest_challenge,
      session_type,
      build_goal,
      specific_topic: specific_topic || null,
    })

    if (error) {
      console.error("Academy survey insert error:", JSON.stringify(error))
      return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error("Academy survey route error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
