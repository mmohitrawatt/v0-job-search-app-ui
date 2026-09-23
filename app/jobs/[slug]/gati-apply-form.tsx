"use client"

import { useState } from "react"
import { ArrowRight, FileText, FileVideo } from "lucide-react"

const choices = ["Junior Innovation Challenge (VI–VIII)", "Emerging Innovator Challenge (IX–X)", "Advanced Innovation Challenge (XI–XII)"]

export default function GatiApplyForm() {
  const [tracks, setTracks] = useState<string[]>([])
  const [resume, setResume] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    if (!tracks.length) return setError("Please select at least one curriculum track.")
    if (!resume) return setError("Please upload your CV or resume.")
    const form = new FormData(event.currentTarget)
    form.set("tracks", JSON.stringify(tracks))
    setSubmitting(true)
    try {
      const response = await fetch("/api/jobs/gati-video-educator", { method: "POST", body: form })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not submit your application.")
      setSuccess(true)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not submit your application. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) return <div className="gj-form-success" role="status"><strong>Application submitted!</strong><br />Gati Shiksha will review your CV and preferred track(s){" "}along with your sample video, if provided.</div>

  return <form className="gj-form" onSubmit={submit}>
    {error && <div className="gj-form-error" role="alert">{error}</div>}
    <div className="gj-form-row"><div className="gj-field"><label htmlFor="gj-name">Full Name *</label><input id="gj-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required /></div><div className="gj-field"><label htmlFor="gj-email">Email Address *</label><input id="gj-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required /></div></div>
    <div className="gj-field"><label htmlFor="gj-phone">Phone Number *</label><input id="gj-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" required /></div>
    <fieldset className="gj-field gj-fieldset"><legend>Preferred Curriculum Track(s) *</legend><div className="gj-track-options">{choices.map(choice => <label key={choice}><input type="checkbox" checked={tracks.includes(choice)} onChange={event => setTracks(current => event.target.checked ? [...current, choice] : current.filter(track => track !== choice))} />{choice}</label>)}</div><small>Choose one or more tracks that match your skills.</small></fieldset>
    <div className="gj-field"><label htmlFor="gj-resume">Upload Resume * <small>PDF, DOC or DOCX — max 10 MB</small></label><label className={`gj-upload${resume ? " has-file" : ""}`} htmlFor="gj-resume"><FileText size={23} /><span><strong>{resume ? resume.name : "Click to upload your resume"}</strong><small>{resume ? "Click to change file" : "PDF, DOC or DOCX accepted"}</small></span><input id="gj-resume" name="resume" type="file" accept=".pdf,.doc,.docx" required onChange={event => setResume(event.target.files?.[0] ?? null)} /></label></div>
    <div className="gj-field"><label htmlFor="gj-video">2–3 Minute Sample Teaching Video <small>(optional)</small></label><div className="gj-video-field"><FileVideo size={19} /><input id="gj-video" name="sample_video_url" type="url" placeholder="Paste your shareable video link, if available" /></div><small>If you add a video, explain any one curriculum topic and ensure the hiring team can view the link.</small></div>
    <button type="submit" className="gj-primary gj-form-submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit Application"}<ArrowRight size={17} /></button>
  </form>
}
