"use client"

import { useState, useRef, ChangeEvent } from "react"
import Link from "next/link"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

const DOMAINS = [
  { l: "Software Development", e: "💻" },
  { l: "Data Science / AI", e: "📊" },
  { l: "Product Management", e: "🗂️" },
  { l: "Finance", e: "💹" },
  { l: "Marketing", e: "📣" },
  { l: "Design / UI UX", e: "🎨" },
  { l: "Consulting", e: "🏛️" },
  { l: "Government Exams", e: "📝" },
]

const TOPICS = [
  "Resume Review", "Mock Interviews", "Interview Preparation",
  "Career Guidance", "Skill Roadmap", "Portfolio Review",
  "LinkedIn Optimization", "Salary Negotiation", "Job Switching",
]

const FORMATS = [
  { l: "1:1 Video Session", d: "Google Meet / Zoom" },
  { l: "Group Session", d: "Multiple students together" },
  { l: "Chat Mentorship", d: "Async text guidance" },
]

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const EXP_OPTS = ["0–2 years", "3–5 years", "5–10 years", "10+ years"]

/* ── Page ── */

export default function BecomeMentorPage() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  // Step 0 — Profile
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState("")
  const photoRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [experience, setExperience] = useState("")
  const [linkedin, setLinkedin] = useState("")

  // LinkedIn import
  const [liOpen, setLiOpen] = useState(false)
  const [liUrl, setLiUrl] = useState("")
  const [liLoading, setLiLoading] = useState(false)
  const [liError, setLiError] = useState("")
  const [liResult, setLiResult] = useState<Record<string, string> | null>(null)

  // Step 1 — Expertise
  const [domain, setDomain] = useState(-1)
  const [topics, setTopics] = useState<string[]>([])
  const [formats, setFormats] = useState<string[]>([])
  const [bio, setBio] = useState("")

  // AI Write
  const [aiOpen, setAiOpen] = useState(false)
  const [aiDraft, setAiDraft] = useState("")
  const [aiGenerating, setAiGenerating] = useState(false)

  // Step 2 — Session
  const [price, setPrice] = useState(149)
  const [duration, setDuration] = useState(30)
  const [days, setDays] = useState<string[]>([])
  const [note, setNote] = useState("")

  /* ── Handlers ── */

  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setPhoto(f)
    setPhotoPreview(URL.createObjectURL(f))
  }

  async function handleLinkedInImport() {
    if (!liUrl.trim()) return
    setLiLoading(true); setLiError(""); setLiResult(null)
    try {
      const res = await fetch("/api/linkedin-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: liUrl.trim() }),
      })
      const data = await res.json()
      if (!res.ok) setLiError(data.error || "Could not fetch profile.")
      else setLiResult(data)
    } catch { setLiError("Network error. Please try again.") }
    finally { setLiLoading(false) }
  }

  function applyLinkedIn() {
    if (!liResult) return
    if (liResult.full_name && !name) setName(liResult.full_name)
    if (liResult.job_title && !jobTitle) setJobTitle(liResult.job_title)
    if (liResult.company && !company) setCompany(liResult.company)
    if (liResult.experience && !experience) setExperience(liResult.experience)
    if (liResult.linkedin) setLinkedin(liResult.linkedin)
    if (liResult.bio && !bio) setBio(liResult.bio.slice(0, 1200))
    setLiOpen(false); setLiUrl(""); setLiResult(null)
  }

  function generateAiDraft() {
    setAiGenerating(true)
    setTimeout(() => {
      const n = name || "I"
      const r = jobTitle || "a professional"
      const e = experience ? ` with ${experience} of experience` : ""
      const d = DOMAINS[domain]?.l || "my field"
      setAiDraft(
        `${n === "I" ? "I'm" : `I'm ${n},`} ${r}${e} specialising in ${d}.\n\nI've worked on real-world problems and seen first-hand where students struggle — the gap between college theory and industry expectations is massive. I want to help close that gap.\n\nWhether it's resume reviews, mock interviews, or just figuring out where to start — I give honest, practical guidance with no fluff.`
      )
      setAiGenerating(false)
    }, 1000)
  }

  const step0Valid = !!name.trim() && !!email.trim() && !!phone.trim() && !!photo
  const step1Valid = domain >= 0 && topics.length > 0
  const step2Valid = days.length > 0

  async function submit() {
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append("data", JSON.stringify({
        full_name: name, email, phone, location,
        job_title: jobTitle, company, experience, linkedin,
        domain: DOMAINS[domain]?.l,
        mentorship_topics: topics,
        mentorship_format: formats,
        professional_bio: bio,
        session_price: price,
        session_duration: `${duration} min`,
        available_days: days,
        additional_note: note,
      }))
      if (photo) fd.append("photo", photo)
      await fetch("/api/become-mentor", { method: "POST", body: fd })
      setDone(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch { alert("Something went wrong. Please try again.") }
    finally { setLoading(false) }
  }

  /* ── Done ── */
  if (done) return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "linear-gradient(135deg, #faf5ff 0%, #f0f4ff 100%)" }}>
      <div className="max-w-[440px] w-full text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full opacity-20 animate-ping" style={{ background: "linear-gradient(135deg,#7c3aed,#3b5bdb)" }} />
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7c3aed,#3b5bdb)" }}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
        </div>
        <h1 className="text-[26px] font-black text-slate-900 tracking-[-0.03em] mb-2">Application Submitted!</h1>
        <p className="text-[14px] text-slate-500 leading-relaxed mb-8">Thank you {name.split(" ")[0]}! Our team will review your profile and get back to you within 2–3 business days.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="px-6 py-3 rounded-xl text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg,#7c3aed,#3b5bdb)" }}>Back to Home</Link>
          <Link href="/mentors" className="px-6 py-3 rounded-xl text-[13px] font-bold text-slate-700 border border-slate-200 bg-white">View Mentors</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#fafbff] font-sans">
      <Navbar />
      <div style={{ height: 88 }} />

      <div className="max-w-[600px] mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
            <span className="text-[11px] font-bold text-[#7c3aed] uppercase tracking-wide">Mentor Program</span>
          </div>
          <h1 className="text-[28px] font-black text-slate-900 tracking-[-0.03em] mb-2">Apply as a Mentor</h1>
          <p className="text-[14px] text-slate-500">Takes 3–4 minutes. Your experience is someone&apos;s shortcut.</p>
        </div>

        {/* Step tabs */}
        <div className="flex items-center gap-0 mb-8">
          {["Your Profile", "Your Expertise", "Session Details"].map((label, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black mb-1 transition-all"
                  style={{
                    background: i < step ? "#7c3aed" : i === step ? "#7c3aed" : "#e2e8f0",
                    color: i <= step ? "white" : "#94a3b8",
                  }}
                >
                  {i < step
                    ? <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    : i + 1}
                </div>
                <span className={`text-[10px] font-semibold text-center leading-tight ${i === step ? "text-[#7c3aed]" : "text-slate-400"}`}>{label}</span>
              </div>
              {i < 2 && <div className="h-[2px] flex-1 mx-1 mb-5 rounded-full" style={{ background: i < step ? "#7c3aed" : "#e2e8f0" }} />}
            </div>
          ))}
        </div>

        {/* ── STEP 0: Profile ── */}
        {step === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-sm space-y-5">

            {/* LinkedIn Import */}
            <div className="rounded-xl border border-[#0077b5]/20 bg-[#f0f7ff] overflow-hidden">
              {!liOpen ? (
                <button type="button" onClick={() => { setLiOpen(true); setLiResult(null); setLiUrl("") }}
                  className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer bg-transparent border-none text-left hover:bg-[#e8f2ff] transition-colors font-[inherit]">
                  <div className="w-8 h-8 rounded-lg bg-[#0077b5] flex items-center justify-center flex-shrink-0">
                    <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-[#0077b5]">Import from LinkedIn</div>
                    <div className="text-[11px] text-slate-500">Auto-fill your name &amp; photo from LinkedIn URL</div>
                  </div>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#0077b5" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              ) : (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-bold text-[#0077b5]">Paste your LinkedIn URL</span>
                    <button type="button" onClick={() => { setLiOpen(false); setLiResult(null) }} className="text-slate-400 bg-transparent border-none cursor-pointer p-0 font-[inherit]">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                  {!liResult ? (
                    <>
                      <div className="flex gap-2 mb-2">
                        <input type="url" value={liUrl} onChange={e => { setLiUrl(e.target.value); setLiError("") }}
                          onKeyDown={e => e.key === "Enter" && handleLinkedInImport()}
                          placeholder="https://linkedin.com/in/your-profile"
                          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-[13px] outline-none focus:border-[#0077b5] font-[inherit]" />
                        <button type="button" onClick={handleLinkedInImport} disabled={!liUrl.trim() || liLoading}
                          className="px-4 py-2 rounded-lg text-[12px] font-bold text-white border-none cursor-pointer disabled:opacity-50 font-[inherit] flex items-center gap-1.5"
                          style={{ background: "#0077b5" }}>
                          {liLoading ? <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full" style={{ animation: "spin .6s linear infinite" }} /> : "Import"}
                        </button>
                      </div>
                      {liError && <p className="text-[11px] text-red-500">{liError}</p>}
                    </>
                  ) : (
                    <>
                      <div className="bg-white rounded-lg border border-green-200 p-3 mb-3 space-y-1.5">
                        <p className="text-[11px] font-bold text-green-700 mb-2">✓ Profile found:</p>
                        {liResult.photo && <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={liResult.photo} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                          <span className="text-[12px] font-bold text-slate-700">{liResult.full_name}</span>
                        </div>}
                        {[["Role", liResult.job_title], ["Company", liResult.company], ["Experience", liResult.experience]].filter(([, v]) => v).map(([k, v]) => (
                          <div key={k} className="flex gap-2"><span className="text-[10px] font-bold text-slate-400 uppercase w-20 shrink-0 pt-0.5">{k}</span><span className="text-[12px] text-slate-700">{v}</span></div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={applyLinkedIn} className="flex-1 py-2 rounded-lg text-[12px] font-bold text-white border-none cursor-pointer font-[inherit]" style={{ background: "#16a34a" }}>Apply to Form</button>
                        <button type="button" onClick={() => setLiResult(null)} className="px-3 py-2 rounded-lg text-[12px] font-bold text-slate-500 border border-slate-200 bg-white cursor-pointer font-[inherit]">Re-try</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Photo */}
            <div className="flex items-center gap-4">
              <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              <button type="button" onClick={() => photoRef.current?.click()} className="relative cursor-pointer bg-transparent border-none p-0 font-[inherit]">
                {photoPreview
                  ? <img src={photoPreview} alt="" className="w-16 h-16 rounded-xl object-cover border-2 border-purple-200" />
                  : <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1 hover:border-[#7c3aed] hover:bg-purple-50 transition-colors">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    </div>
                }
              </button>
              <div>
                <p className="text-[13px] font-semibold text-slate-700">Profile Photo <span className="text-red-400">*</span></p>
                <p className="text-[11px] text-slate-400">Shown on your mentor card</p>
              </div>
            </div>

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" required value={name} onChange={setName} placeholder="e.g. Priya Sharma" />
              <Field label="Email" value={email} required onChange={setEmail} placeholder="you@email.com" />
            </div>

            {/* Phone + Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Phone" required value={phone} onChange={setPhone} placeholder="+91 98765 43210" />
              <Field label="City / Location" value={location} onChange={setLocation} placeholder="e.g. Bangalore" />
            </div>

            {/* Job title + Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Current Role" value={jobTitle} onChange={setJobTitle} placeholder="e.g. Senior SWE at Google" />
              <Field label="Company" value={company} onChange={setCompany} placeholder="e.g. Google" />
            </div>

            {/* Experience + LinkedIn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Experience</label>
                <select value={experience} onChange={e => setExperience(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none focus:bg-white focus:border-[#7c3aed] font-[inherit] cursor-pointer appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36 }}>
                  <option value="">Select...</option>
                  {EXP_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <Field label="LinkedIn URL" value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/your-profile" />
            </div>
          </div>
        )}

        {/* ── STEP 1: Expertise ── */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-sm space-y-6">

            {/* Domain */}
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-3">Domain of Expertise <span className="text-red-400">*</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DOMAINS.map((d, i) => (
                  <button key={i} type="button" onClick={() => setDomain(i)}
                    className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border-2 transition-all font-[inherit] cursor-pointer text-center"
                    style={{ borderColor: domain === i ? "#7c3aed" : "#e2e8f0", background: domain === i ? "#f5f3ff" : "#fafbff" }}>
                    <span className="text-[22px]">{d.e}</span>
                    <span className="text-[10px] font-semibold leading-tight" style={{ color: domain === i ? "#7c3aed" : "#64748b" }}>{d.l}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-3">Topics You Can Help With <span className="text-red-400">*</span></label>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map(t => {
                  const sel = topics.includes(t)
                  return (
                    <button key={t} type="button"
                      onClick={() => setTopics(p => sel ? p.filter(x => x !== t) : [...p, t])}
                      className="px-3.5 py-2 rounded-full border-2 text-[12px] font-semibold transition-all font-[inherit] cursor-pointer"
                      style={{ borderColor: sel ? "#7c3aed" : "#e2e8f0", background: sel ? "#f5f3ff" : "#fafbff", color: sel ? "#7c3aed" : "#475569" }}>
                      {t}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Session Format */}
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-3">Session Format</label>
              <div className="flex flex-col gap-2">
                {FORMATS.map(f => {
                  const sel = formats.includes(f.l)
                  return (
                    <button key={f.l} type="button"
                      onClick={() => setFormats(p => sel ? p.filter(x => x !== f.l) : [...p, f.l])}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all font-[inherit] cursor-pointer"
                      style={{ borderColor: sel ? "#7c3aed" : "#e2e8f0", background: sel ? "#f5f3ff" : "#fafbff" }}>
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${sel ? "border-[#7c3aed] bg-[#7c3aed]" : "border-slate-300"}`}>
                        {sel && <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold" style={{ color: sel ? "#7c3aed" : "#0f172a" }}>{f.l}</div>
                        <div className="text-[11px] text-slate-400">{f.d}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Short Bio */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-bold text-slate-700">Short Bio <span className="text-slate-400 font-normal text-[12px]">(optional)</span></label>
                {!aiOpen && (
                  <button type="button" onClick={() => { setAiOpen(true); setAiDraft(""); generateAiDraft() }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-violet-200 bg-violet-50 text-[11px] font-bold text-[#7c3aed] cursor-pointer border-none font-[inherit] hover:bg-violet-100 transition-colors">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L9.5 8.5 3 9.27l5 4.87L6.82 21 12 17.77 17.18 21 16 14.14l5-4.87-6.5-.77L12 2z"/></svg>
                    Write with AI
                  </button>
                )}
              </div>
              {aiOpen && (
                <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-bold text-[#7c3aed]">✨ AI Draft</span>
                    <button type="button" onClick={() => { setAiOpen(false); setAiDraft("") }} className="text-slate-400 bg-transparent border-none cursor-pointer font-[inherit] p-0">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                  {aiGenerating
                    ? <div className="flex items-center gap-2 py-2"><span className="w-4 h-4 border-2 border-violet-300 border-t-[#7c3aed] rounded-full" style={{ animation: "spin .6s linear infinite" }} /><span className="text-[12px] text-slate-500">Generating…</span></div>
                    : <>
                        <textarea value={aiDraft} onChange={e => setAiDraft(e.target.value)} rows={4}
                          className="w-full p-3 rounded-lg border border-violet-200 bg-white text-[13px] outline-none focus:border-[#7c3aed] font-[inherit] resize-none leading-[1.7] mb-2" />
                        <div className="flex gap-2">
                          <button type="button" onClick={() => { setBio(aiDraft); setAiOpen(false); setAiDraft("") }}
                            className="flex-1 py-2 rounded-lg bg-[#7c3aed] text-white text-[12px] font-bold border-none cursor-pointer font-[inherit]">Use this</button>
                          <button type="button" onClick={generateAiDraft}
                            className="px-3 py-2 rounded-lg border border-violet-200 bg-white text-[12px] font-bold text-[#7c3aed] cursor-pointer font-[inherit]">Regenerate</button>
                        </div>
                      </>
                  }
                </div>
              )}
              <textarea value={bio} onChange={e => { if (e.target.value.length <= 1200) setBio(e.target.value) }} rows={4}
                placeholder="Brief professional background — what you've done and what kind of mentoring you offer..."
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none focus:bg-white focus:border-[#7c3aed] placeholder:text-slate-400 font-[inherit] resize-none leading-[1.7]" />
              <div className="flex justify-end mt-1"><span className={`text-[11px] font-semibold ${bio.length > 1100 ? "text-amber-500" : "text-slate-300"}`}>{bio.length}/1200</span></div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Session Details ── */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-sm space-y-6">

            {/* Price */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[13px] font-bold text-slate-700">Session Price</label>
                <span className="text-[22px] font-black text-[#16a34a]">₹{price}</span>
              </div>
              <input type="range" min={49} max={2000} step={10} value={price} onChange={e => setPrice(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#16a34a", background: `linear-gradient(to right,#16a34a ${((price-49)/(2000-49))*100}%,#e2e8f0 0%)` }} />
              <div className="flex gap-2 mt-3">
                {[99, 149, 299, 499, 999].map(p => (
                  <button key={p} type="button" onClick={() => setPrice(p)}
                    className="flex-1 py-1.5 rounded-lg border text-[11px] font-bold font-[inherit] cursor-pointer transition-all"
                    style={{ borderColor: price===p ? "#16a34a" : "#e2e8f0", background: price===p ? "#f0fdf4" : "transparent", color: price===p ? "#16a34a" : "#94a3b8" }}>
                    ₹{p}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[13px] font-bold text-slate-700">Session Duration</label>
                <span className="text-[22px] font-black text-[#7c3aed]">{duration}<span className="text-[13px] font-bold text-slate-400 ml-1">min</span></span>
              </div>
              <div className="flex gap-2">
                {[15, 30, 45, 60, 90].map(m => (
                  <button key={m} type="button" onClick={() => setDuration(m)}
                    className="flex-1 py-2.5 rounded-xl border-2 text-[12px] font-bold font-[inherit] cursor-pointer transition-all"
                    style={{ borderColor: duration===m ? "#7c3aed" : "#e2e8f0", background: duration===m ? "#f5f3ff" : "transparent", color: duration===m ? "#7c3aed" : "#94a3b8" }}>
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-3">Availability <span className="text-red-400">*</span></label>
              <div className="flex gap-2 flex-wrap">
                {DAYS.map(d => {
                  const sel = days.includes(d)
                  return (
                    <button key={d} type="button" onClick={() => setDays(p => sel ? p.filter(x => x !== d) : [...p, d])}
                      className="px-4 py-2.5 rounded-xl border-2 text-[12px] font-bold font-[inherit] cursor-pointer transition-all"
                      style={{ borderColor: sel ? "#7c3aed" : "#e2e8f0", background: sel ? "#f5f3ff" : "#fafbff", color: sel ? "#7c3aed" : "#64748b" }}>
                      {d}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Anything else? <span className="text-slate-400 font-normal">(optional)</span></label>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                placeholder="Portfolio link, personal website, or any other details..."
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none focus:bg-white focus:border-[#7c3aed] placeholder:text-slate-400 font-[inherit] resize-none leading-[1.7]" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          {step > 0
            ? <button type="button" onClick={() => { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 text-[13px] font-bold text-slate-600 bg-white cursor-pointer font-[inherit] hover:bg-slate-50 transition-colors">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back
              </button>
            : <div />
          }

          {step < 2
            ? <button type="button"
                disabled={step === 0 ? !step0Valid : !step1Valid}
                onClick={() => { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-bold text-white cursor-pointer font-[inherit] border-none disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                style={{ background: "linear-gradient(135deg,#7c3aed,#3b5bdb)", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}>
                Continue
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            : <button type="button" onClick={submit} disabled={!step2Valid || loading}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-bold text-white cursor-pointer font-[inherit] border-none disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg,#7c3aed,#1d4ed8)", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}>
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" style={{ animation: "spin .6s linear infinite" }} />Submitting...</>
                  : <>Submit Application <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg></>
                }
              </button>
          }
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { to { transform: rotate(360deg) } }` }} />
      <Footer />
    </div>
  )
}

/* ── Reusable field ── */
function Field({ label, value, onChange, placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none focus:bg-white focus:border-[#7c3aed] placeholder:text-slate-400 font-[inherit]" />
    </div>
  )
}
