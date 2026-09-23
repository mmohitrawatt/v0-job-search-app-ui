import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

const validTracks = new Set([
  "Junior Innovation Challenge (VI–VIII)",
  "Emerging Innovator Challenge (IX–X)",
  "Advanced Innovation Challenge (XI–XII)",
])
const resumeTypes = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"])

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const name = String(form.get("name") ?? "").trim()
    const email = String(form.get("email") ?? "").trim().toLowerCase()
    const phone = String(form.get("phone") ?? "").trim()
    const sampleVideoUrl = String(form.get("sample_video_url") ?? "").trim()
    const resume = form.get("resume")
    let tracks: unknown
    try { tracks = JSON.parse(String(form.get("tracks") ?? "[]")) } catch { tracks = null }

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Enter your name, a valid email address and phone number." }, { status: 400 })
    }
    if (!Array.isArray(tracks) || tracks.length === 0 || tracks.some(track => typeof track !== "string" || !validTracks.has(track))) {
      return NextResponse.json({ error: "Choose at least one valid curriculum track." }, { status: 400 })
    }
    let videoUrl: URL | null = null
    if (sampleVideoUrl) {
      try { videoUrl = new URL(sampleVideoUrl) } catch { return NextResponse.json({ error: "Enter a valid sample video link." }, { status: 400 }) }
      if (!["http:", "https:"].includes(videoUrl.protocol)) return NextResponse.json({ error: "Enter an http or https sample video link." }, { status: 400 })
    }
    if (!(resume instanceof File) || resume.size === 0 || resume.size > 10 * 1024 * 1024 || !resumeTypes.has(resume.type)) {
      return NextResponse.json({ error: "Attach a PDF, DOC or DOCX resume under 10 MB." }, { status: 400 })
    }

    const supabase = createServerClient()
    const extension = resume.name.split(".").pop()?.toLowerCase()
    if (!extension || !["pdf", "doc", "docx"].includes(extension)) return NextResponse.json({ error: "Attach a PDF, DOC or DOCX resume." }, { status: 400 })
    const path = `ai-trainer-gati-shiksha/${crypto.randomUUID()}.${extension}`
    const { error: uploadError } = await supabase.storage.from("resumes").upload(path, await resume.arrayBuffer(), { contentType: resume.type, upsert: false })
    if (uploadError) {
      console.error("Gati application resume upload failed:", uploadError)
      return NextResponse.json({ error: "Could not upload your resume. Please try again." }, { status: 500 })
    }

    const { data } = supabase.storage.from("resumes").getPublicUrl(path)
    const application = {
      name, email, phone, preferred_tracks: tracks, sample_video_url: videoUrl?.toString() ?? null, resume_url: data.publicUrl,
    }
    let { error: insertError } = await supabase.from("gati_video_educator_applications").insert(application)
    // Older deployments of this table still require a value for sample_video_url.
    // An empty string represents no video until the nullable-column migration is applied.
    if (insertError?.code === "23502" && !videoUrl) {
      const retry = await supabase.from("gati_video_educator_applications").insert({ ...application, sample_video_url: "" })
      insertError = retry.error
    }
    if (insertError) {
      console.error("Gati application insert failed:", insertError)
      await supabase.storage.from("resumes").remove([path])
      return NextResponse.json({ error: "Could not submit your application. Please try again." }, { status: 500 })
    }
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Gati application request failed:", error)
    return NextResponse.json({ error: "Could not submit your application. Please try again." }, { status: 500 })
  }
}
