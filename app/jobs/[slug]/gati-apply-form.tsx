"use client"

import { useState } from "react"
import { ArrowRight, ArrowUpRight, Check, FileText, FileVideo, Sparkles } from "lucide-react"

const choices = ["Junior Innovation Challenge (VI–VIII)", "Emerging Innovator Challenge (IX–X)", "Advanced Innovation Challenge (XI–XII)"]

export default function GatiApplyForm() {
  const [tracks, setTracks] = useState<string[]>([])
  const [resume, setResume] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [fieldError, setFieldError] = useState<"tracks" | "resume" | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setFieldError(null)
    if (!tracks.length) {
      setFieldError("tracks")
      document.getElementById("gj-tracks-field")?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    if (!resume || resume.size > 10 * 1024 * 1024) {
      setFieldError("resume")
      document.getElementById("gj-resume-field")?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    const form = new FormData(event.currentTarget)
    form.set("tracks", JSON.stringify(tracks))
    setSubmitting(true)
    try {
      const response = await fetch("/api/jobs/gati-video-educator", { method: "POST", body: form })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not submit your application.")
      setSuccess(true)
      requestAnimationFrame(() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" }))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not submit your application. Please try again.")
      requestAnimationFrame(() => document.getElementById("gj-form-error")?.scrollIntoView({ behavior: "smooth", block: "center" }))
    } finally {
      setSubmitting(false)
    }
  }

  if (success) return <div className="gj-form-success" role="status">
    <div className="gj-success-icon"><Check size={23} strokeWidth={2.8} /></div>
    <h3>Application submitted</h3>
    <p>Your application for Gati Shiksha&apos;s AI Trainer role has been received.</p>
    <a className="gj-promo-card" href="https://ai.jobingen.com">
      <div className="gj-promo-brand"><span><Sparkles size={18} /></span> JOBINGEN AI</div>
      <h4>Get ready for what&apos;s next</h4>
      <p>Practice with an AI interview, work on your resume, and explore more opportunities on Jobingen.</p>
      <div className="gj-promo-features"><span>AI interview</span><span>Resume tools</span><span>Job search</span></div>
      <span className="gj-promo-link">Explore Jobingen AI <ArrowUpRight size={17} /></span>
    </a>
  </div>

  return <form className="gj-form" onSubmit={submit}>
    {error && <div className="gj-form-error" id="gj-form-error" role="alert">{error}</div>}
    <div className="gj-form-row"><div className="gj-field"><label htmlFor="gj-name">Full Name *</label><input id="gj-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required /></div><div className="gj-field"><label htmlFor="gj-email">Email Address *</label><input id="gj-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required /></div></div>
    <div className="gj-field"><label htmlFor="gj-phone">Phone Number *</label><input id="gj-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" required /></div>
    <fieldset className="gj-field gj-fieldset" id="gj-tracks-field" aria-invalid={fieldError === "tracks"}><legend>Preferred Curriculum Track(s) *</legend><div className="gj-track-options">{choices.map(choice => <label key={choice}><input type="checkbox" checked={tracks.includes(choice)} onChange={event => { setTracks(current => event.target.checked ? [...current, choice] : current.filter(track => track !== choice)); setFieldError(null) }} />{choice}</label>)}</div><small>Choose one or more tracks that match your skills. <a href="#tracks">View track topics</a></small>{fieldError === "tracks" && <span className="gj-field-error" role="alert">Select at least one track to continue.</span>}</fieldset>
    <div className="gj-field" id="gj-resume-field"><label htmlFor="gj-resume">Upload Resume * <small>PDF, DOC or DOCX — max 10 MB</small></label><label className={`gj-upload${resume ? " has-file" : ""}`} htmlFor="gj-resume"><FileText size={23} /><span><strong>{resume ? resume.name : "Choose your resume"}</strong><small>{resume ? "Choose a different file" : "PDF, DOC or DOCX accepted"}</small></span><input id="gj-resume" name="resume" type="file" accept=".pdf,.doc,.docx" aria-required="true" aria-invalid={fieldError === "resume"} onChange={event => { setResume(event.target.files?.[0] ?? null); setFieldError(null) }} /></label>{fieldError === "resume" && <span className="gj-field-error" role="alert">Attach a PDF, DOC or DOCX resume under 10 MB.</span>}</div>
    <div className="gj-field"><label htmlFor="gj-video">2–3 Minute Sample Teaching Video <small>(optional)</small></label><div className="gj-video-field"><FileVideo size={19} /><input id="gj-video" name="sample_video_url" type="url" placeholder="Paste your shareable video link, if available" /></div><small>If you add a video, explain any one curriculum topic and ensure the hiring team can view the link.</small></div>
    <button type="submit" className="gj-primary gj-form-submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit Application"}<ArrowRight size={17} /></button>
  </form>
}
