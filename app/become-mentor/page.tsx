"use client"

import { useState, useRef, useCallback, ChangeEvent, DragEvent } from "react"
import Link from "next/link"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

/* ─── Constants ──────────────────────────────────────────── */

const DOMAINS = [
  { l: "Software Development", e: "💻" },
  { l: "Data Science / AI",    e: "📊" },
  { l: "Product Management",   e: "🗂️" },
  { l: "Finance",              e: "💹" },
  { l: "Marketing",            e: "📣" },
  { l: "Design / UI UX",       e: "🎨" },
  { l: "Consulting",           e: "🏛️" },
  { l: "Government Exams",     e: "📝" },
]

const INDUSTRIES = [
  "Technology", "Banking & Finance", "E-Commerce", "Healthcare",
  "EdTech", "Consulting", "Manufacturing", "Media & Entertainment",
  "Telecom", "Logistics", "Government / PSU", "Other",
]

const EXP_OPTS = ["0–2 years", "3–5 years", "5–10 years", "10+ years"]

const SKILL_SUGGESTIONS = [
  "Artificial Intelligence", "Machine Learning", "Data Science",
  "Java", "Python", "C++", "React", "Next.js", "Node.js",
  "UI/UX Design", "Product Design", "Product Management",
  "Marketing", "Finance", "Sales", "Operations", "Human Resources",
  "Cloud Computing", "Cyber Security", "System Design",
  "DSA", "Interview Preparation", "Career Guidance", "Resume Review",
  "DevOps", "Docker", "AWS", "TypeScript", "Angular", "Vue.js",
  "SQL", "MongoDB", "PostgreSQL", "Django", "Spring Boot",
]

const TOPICS = [
  "Resume Review", "Mock Interviews", "Interview Preparation",
  "Career Guidance", "Skill Roadmap", "Portfolio Review",
  "LinkedIn Optimization", "Salary Negotiation", "Job Switching",
  "System Design", "DSA Practice", "Project Guidance",
]

const AUDIENCE_OPTS = [
  "College Students", "Freshers", "Working Professionals",
  "Founders", "Career Switchers",
]

const FORMAT_OPTS = [
  { l: "1:1 Video Session",   d: "Google Meet / Zoom" },
  { l: "Group Sessions",      d: "Multiple students together" },
  { l: "Online Workshops",    d: "Structured topic sessions" },
  { l: "Career Consultation", d: "Strategy & roadmap calls" },
]

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

/* ─── Completion Weights ─────────────────────────────────── */

function calcCompletion(s: {
  photo: File | null; name: string; email: string; phone: string
  resume: File | null; skills: string[]; company: string
  experience: string; bio: string; domain: number; topics: string[]
}) {
  let p = 0
  if (s.photo)               p += 10
  if (s.name.trim())         p += 8
  if (s.email.trim())        p += 8
  if (s.phone.trim())        p += 7
  if (s.resume)              p += 15
  if (s.skills.length >= 3)  p += 12
  if (s.company.trim())      p += 8
  if (s.experience)          p += 7
  if (s.bio.trim().length > 50) p += 10
  if (s.domain >= 0)         p += 8
  if (s.topics.length > 0)   p += 7
  return p
}

const COMPLETION_ITEMS = [
  { key: "photo",      label: "Upload Profile Photo",  weight: 10 },
  { key: "resume",     label: "Upload Resume",         weight: 15 },
  { key: "skills",     label: "Add Skills (min 3)",    weight: 12 },
  { key: "name",       label: "Complete Basic Info",   weight: 8  },
  { key: "experience", label: "Add Experience",        weight: 7  },
  { key: "bio",        label: "Write Professional Bio",weight: 10 },
]

/* ─── SVG Icons ──────────────────────────────────────────── */

const IconCheck = () => (
  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
)
const IconArrow = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
)
const IconUpload = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.6" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
)
const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#1d3a8f" stroke="#1d3a8f" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
)
const IconBrain = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
)
const IconShield = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
)
const IconTarget = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
)
const IconTrendUp = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
)
const IconDocument = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
)

/* ─── Sub-components ─────────────────────────────────────── */

function Field({ label, value, onChange, placeholder, required, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; required?: boolean; type?: string
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 7 }}>
        {label} {required && <span style={{ color: "#f43f5e" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 14, color: "#0f172a", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
        onFocus={e => { e.currentTarget.style.borderColor = "#1d3a8f"; e.currentTarget.style.background = "#fff" }}
        onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc" }}
      />
    </div>
  )
}

function SectionCard({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div id={id} style={{ background: "#ffffff", borderRadius: 20, border: "1.5px solid #e8ecf4", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", padding: "28px 28px", marginBottom: 20 }}>
      {children}
    </div>
  )
}

function SectionTitle({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: "#eff4ff", border: "1px solid #bfcfff", display: "flex", alignItems: "center", justifyContent: "center", color: "#1d3a8f", flexShrink: 0 }}>
          {icon}
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>{title}</h3>
      </div>
      {subtitle && <p style={{ fontSize: 12.5, color: "#64748b", marginLeft: 44, lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  )
}

/* ─── Main Page ──────────────────────────────────────────── */

export default function BecomeMentorPage() {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  /* Basic info */
  const [photo, setPhoto]           = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState("")
  const photoRef = useRef<HTMLInputElement>(null)
  const [name, setName]             = useState("")
  const [email, setEmail]           = useState("")
  const [phone, setPhone]           = useState("")
  const [location, setLocation]     = useState("")
  const [linkedin, setLinkedin]     = useState("")
  const [github, setGithub]         = useState("")

  /* LinkedIn import */
  const [liOpen, setLiOpen]         = useState(false)
  const [liUrl, setLiUrl]           = useState("")
  const [liLoading, setLiLoading]   = useState(false)
  const [liError, setLiError]       = useState("")
  const [liResult, setLiResult]     = useState<Record<string, string | Record<string, boolean>> | null>(null)

  /* Professional experience */
  const [company, setCompany]       = useState("")
  const [jobTitle, setJobTitle]     = useState("")
  const [industry, setIndustry]     = useState("")
  const [experience, setExperience] = useState("")
  const [prevCompanies, setPrevCompanies] = useState("")
  const [bio, setBio]               = useState("")

  /* AI bio */
  const [aiOpen, setAiOpen]         = useState(false)
  const [aiDraft, setAiDraft]       = useState("")
  const [aiGenerating, setAiGenerating] = useState(false)

  /* Resume */
  const [resume, setResume]         = useState<File | null>(null)
  const [resumeDragging, setResumeDragging] = useState(false)
  const resumeRef = useRef<HTMLInputElement>(null)

  /* Skills */
  const [skills, setSkills]         = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")

  /* Domain + topics */
  const [domain, setDomain]         = useState(-1)
  const [topics, setTopics]         = useState<string[]>([])

  /* Mentorship preferences */
  const [audience, setAudience]     = useState<string[]>([])
  const [formats, setFormats]       = useState<string[]>([])

  /* Session */
  const [price, setPrice]           = useState(149)
  const [duration, setDuration]     = useState(30)
  const [days, setDays]             = useState<string[]>([])

  /* ── Computed ── */

  const completion = calcCompletion({ photo, name, email, phone, resume, skills, company, experience, bio, domain, topics })

  const completionItems = [
    { label: "Upload Profile Photo",  done: !!photo     },
    { label: "Upload Resume",         done: !!resume    },
    { label: "Add Skills (min 3)",    done: skills.length >= 3 },
    { label: "Complete Basic Info",   done: !!(name.trim() && email.trim() && phone.trim()) },
    { label: "Add Experience",        done: !!(company.trim() && experience) },
    { label: "Write Professional Bio",done: bio.trim().length > 50 },
  ]

  /* ── Handlers ── */

  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setPhoto(f)
    setPhotoPreview(URL.createObjectURL(f))
  }

  function handleResumeDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setResumeDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f && (f.type === "application/pdf" || f.name.endsWith(".docx") || f.name.endsWith(".doc"))) {
      setResume(f)
    }
  }

  function handleResumeInput(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) setResume(f)
  }

  function toggleSkill(s: string) {
    setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  function addCustomSkill() {
    const s = skillInput.trim()
    if (s && !skills.includes(s)) { setSkills(prev => [...prev, s]); setSkillInput("") }
  }

  async function handleLinkedInImport() {
    if (!liUrl.trim()) return
    setLiLoading(true); setLiError(""); setLiResult(null)
    try {
      const res = await fetch("/api/linkedin-import", {
        method: "POST", headers: { "Content-Type": "application/json" },
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
    const r = liResult as Record<string, string>
    if (r.full_name  && !name)       setName(r.full_name)
    if (r.job_title  && !jobTitle)   setJobTitle(r.job_title)
    if (r.company    && !company)    setCompany(r.company)
    if (r.experience && !experience) setExperience(r.experience)
    if (r.linkedin)                  setLinkedin(r.linkedin)
    if (r.bio        && !bio)        setBio(r.bio.slice(0, 1200))
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

  async function submit() {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in your name, email, and phone number."); return
    }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append("data", JSON.stringify({
        full_name: name, email, phone, location, linkedin, github,
        job_title: jobTitle, company, industry, experience, previous_companies: prevCompanies,
        domain: DOMAINS[domain]?.l,
        skills,
        mentorship_topics: topics,
        mentorship_format: formats,
        preferred_audience: audience,
        professional_bio: bio,
        session_price: price,
        session_duration: `${duration} min`,
        available_days: days,
      }))
      if (photo)  fd.append("photo", photo)
      if (resume) fd.append("resume", resume)
      const res = await fetch("/api/become-mentor", { method: "POST", body: fd })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Server error (${res.status})`)
      }
      setDone(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch { alert("Something went wrong. Please try again.") }
    finally { setLoading(false) }
  }

  /* ── Success State ── */

  if (done) return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>
      <Navbar />
      <div style={{ height: 100 }} />
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
        {/* Animated checkmark */}
        <div style={{ position: "relative", width: 88, height: 88, margin: "0 auto 28px" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#1d3a8f", opacity: 0.15, animation: "bm-ping 2s ease-in-out infinite" }} />
          <div style={{ position: "relative", width: 88, height: 88, borderRadius: "50%", background: "#1d3a8f", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 28px rgba(29,58,143,0.35)" }}>
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px", background: "#eff4ff", border: "1px solid #bfcfff", borderRadius: 99, marginBottom: 18, fontSize: 11, fontWeight: 700, color: "#1d3a8f", textTransform: "uppercase", letterSpacing: ".06em" }}>
          Application Submitted
        </div>

        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", marginBottom: 14, lineHeight: 1.15 }}>
          Welcome to the<br />Jobingen Mentor Network
        </h1>

        <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8, marginBottom: 36 }}>
          Thank you{name ? `, ${name.split(" ")[0]}` : ""}! Our team will review your profile within <strong style={{ color: "#0f172a" }}>2–3 business days</strong>. Approved mentors receive full access to the Jobingen Mentor Dashboard.
        </p>

        {/* What happens next */}
        <div style={{ background: "white", borderRadius: 20, border: "1.5px solid #e0e7ff", padding: "24px 26px", marginBottom: 32, textAlign: "left" }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>What happens next</p>
          {[
            { step: "1", title: "Profile Review", desc: "Our team reviews your application within 2–3 business days." },
            { step: "2", title: "Approval & Onboarding", desc: "Approved mentors receive onboarding instructions via email." },
            { step: "3", title: "Mentor Dashboard Access", desc: "Start receiving mentorship requests matched to your expertise." },
          ].map(s => (
            <div key={s.step} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1d3a8f", color: "white", fontSize: 12, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.step}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 26px", borderRadius: 12, background: "#1d3a8f", color: "white", fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 16px rgba(29,58,143,0.3)" }}>
            Back to Home
          </Link>
          <Link href="/mentors" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 24px", borderRadius: 12, background: "white", border: "1.5px solid #e0e7ff", color: "#1d3a8f", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            View Mentors
          </Link>
        </div>
      </div>
      <Footer />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes bm-ping { 0%,100%{opacity:.15;transform:scale(1)} 50%{opacity:.3;transform:scale(1.15)} }` }} />
    </div>
  )

  /* ── Main render ── */
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>
      <Navbar />
      <div style={{ height: 90 }} />

      {/* ── INFO HERO SECTION ── */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #eef1f6", padding: "56px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 16px", background: "white", border: "1.5px solid #bfcfff", borderRadius: 99, marginBottom: 24, boxShadow: "0 2px 10px rgba(29,58,143,0.08)" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1d3a8f" }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: "#1d3a8f", letterSpacing: ".07em", textTransform: "uppercase" }}>AI-Powered Mentor Onboarding</span>
          </div>

          <h1 style={{ fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 18 }}>
            Why Your Profile<br />
            <span style={{ color: "#1d3a8f" }}>Matters</span>
          </h1>

          <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 48px" }}>
            At Jobingen, we are building one of India&apos;s fastest-growing mentor communities. Every profile is reviewed and matched with students, professionals, bootcamps, and workshops using our AI-powered recommendation system. <strong style={{ color: "#0f172a" }}>The more complete your profile, the better we recommend you.</strong>
          </p>

          {/* How We Match card */}
          <div style={{ background: "white", borderRadius: 22, border: "1.5px solid #e0e7ff", boxShadow: "0 4px 24px rgba(29,58,143,0.08)", padding: "32px 36px", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
              <div style={{ width: 40, height: 40, borderRadius: 13, background: "#1d3a8f", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(29,58,143,0.25)" }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" /></svg>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em" }}>How We Match Mentors</h2>
            </div>

            <div className="bm-match-grid">
              {[
                { icon: <IconDocument />, color: "#1d3a8f", bg: "#eff4ff", border: "#bfcfff", title: "Resume Analysis", desc: "Your uploaded resume helps us understand your technical skills, work experience, projects, certifications, and career journey." },
                { icon: <IconTarget />,   color: "#1d3a8f", bg: "#eff4ff", border: "#bfcfff", title: "Skills Matching",  desc: "Your skills are matched with students looking for guidance in those specific domains and technologies." },
                { icon: <IconShield />,   color: "#0f766e", bg: "#f0fdfa", border: "#a7f3d0", title: "Experience Matching", desc: "Your years of experience help us recommend the right mentorship requests at the right seniority level." },
                { icon: <IconTrendUp />,  color: "#b45309", bg: "#fffbeb", border: "#fde68a", title: "Better Visibility",  desc: "Complete profiles receive higher visibility within the Jobingen mentor ecosystem and are recommended more often." },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 18px", borderRadius: 14, background: item.bg, border: `1.5px solid ${item.border}` }}>
                  <div style={{ color: item.color, flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>✓ {item.title}</div>
                    <div style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT: 2-column layout ── */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "40px 20px 80px" }}>
        <div className="bm-layout">

          {/* ── LEFT: FORM ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Profile Completion */}
            <div style={{ background: "white", borderRadius: 20, border: "1.5px solid #e8ecf4", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", padding: "24px 24px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 2 }}>Profile Completion</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>A complete profile gets 3x more recommendations</div>
                </div>
                <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#e8ecf4" strokeWidth="6" />
                    <circle cx="32" cy="32" r="26" fill="none"
                      stroke={completion >= 80 ? "#16a34a" : completion >= 50 ? "#1d3a8f" : "#f59e0b"}
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 26}`}
                      strokeDashoffset={`${2 * Math.PI * 26 * (1 - completion / 100)}`}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset .5s ease, stroke .3s" }}
                    />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: "#0f172a" }}>{completion}%</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, marginBottom: 16, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${completion}%`, background: completion >= 80 ? "linear-gradient(90deg,#16a34a,#22c55e)" : "#1d3a8f", borderRadius: 99, transition: "width .5s ease" }} />
              </div>

              {/* Checklist */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {completionItems.map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 99, background: item.done ? "#f0fdf4" : "#f8fafc", border: `1.5px solid ${item.done ? "#86efac" : "#e2e8f0"}`, transition: "all .2s" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: item.done ? "#16a34a" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0, transition: "background .2s" }}>
                      {item.done && <IconCheck />}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: item.done ? "#15803d" : "#64748b", whiteSpace: "nowrap" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── SECTION 1: Basic Info ── */}
            <SectionCard>
              <SectionTitle
                icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                title="Basic Information"
                subtitle="Your public profile identity on Jobingen"
              />

              {/* LinkedIn import */}
              <div style={{ borderRadius: 14, border: "1.5px solid rgba(0,119,181,0.2)", background: "#f0f8ff", overflow: "hidden", marginBottom: 22 }}>
                {!liOpen ? (
                  <button type="button" onClick={() => { setLiOpen(true); setLiResult(null); setLiUrl("") }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer", background: "transparent", border: "none", textAlign: "left", fontFamily: "inherit" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: "#0077b5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0077b5" }}>Import from LinkedIn</div>
                      <div style={{ fontSize: 11, color: "#475569" }}>Auto-fill your name, role & photo from LinkedIn URL</div>
                    </div>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#0077b5" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                ) : (
                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#0077b5" }}>Paste your LinkedIn URL</span>
                      <button type="button" onClick={() => { setLiOpen(false); setLiResult(null) }} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0, fontFamily: "inherit" }}>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                      </button>
                    </div>
                    {!liResult ? (
                      <>
                        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                          <input type="url" value={liUrl} onChange={e => { setLiUrl(e.target.value); setLiError("") }}
                            onKeyDown={e => e.key === "Enter" && handleLinkedInImport()}
                            placeholder="https://linkedin.com/in/your-profile"
                            style={{ flex: 1, padding: "10px 13px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "white", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
                          <button type="button" onClick={handleLinkedInImport} disabled={!liUrl.trim() || liLoading}
                            style={{ padding: "10px 18px", borderRadius: 10, background: "#0077b5", color: "white", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", opacity: liLoading ? 0.7 : 1, display: "flex", alignItems: "center", gap: 6 }}>
                            {liLoading
                              ? <><div style={{ width: 13, height: 13, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", animation: "bm-spin .7s linear infinite" }} />Fetching…</>
                              : "Import"}
                          </button>
                        </div>
                        {liError && (
                          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 8, padding: "8px 12px", fontSize: 11.5, color: "#9a3412", lineHeight: 1.5 }}>
                            ⚠ {liError}
                          </div>
                        )}
                        <p style={{ fontSize: 10.5, color: "#94a3b8", marginTop: 6, lineHeight: 1.5 }}>
                          We extract name, photo, role, company &amp; bio from your public profile.
                        </p>
                      </>
                    ) : (
                      (() => {
                        const r = liResult as Record<string, string>
                        const found = (liResult._found || {}) as Record<string, boolean>
                        const fields: { label: string; value: string; key: string }[] = [
                          { key: "name",      label: "Name",       value: r.full_name  },
                          { key: "job_title", label: "Role",       value: r.job_title  },
                          { key: "company",   label: "Company",    value: r.company    },
                          { key: "bio",       label: "Bio",        value: r.bio ? r.bio.slice(0, 80) + (r.bio.length > 80 ? "…" : "") : "" },
                          { key: "experience",label: "Experience", value: r.experience },
                        ].filter(f => f.value)
                        return (
                          <>
                            <div style={{ background: "white", borderRadius: 12, border: "1.5px solid #86efac", padding: "14px 16px", marginBottom: 10 }}>
                              {/* Header row */}
                              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid #f1f5f9" }}>
                                {r.photo ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={r.photo} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0", flexShrink: 0 }} />
                                ) : (
                                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0077b5", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 900, flexShrink: 0 }}>
                                    {r.full_name?.charAt(0) || "?"}
                                  </div>
                                )}
                                <div>
                                  <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>{r.full_name || "Profile found"}</div>
                                  <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                                    {fields.length} field{fields.length !== 1 ? "s" : ""} extracted successfully
                                  </div>
                                </div>
                              </div>

                              {/* Field rows */}
                              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                                {fields.map(f => (
                                  <div key={f.key} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                                      <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                                    </div>
                                    <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>
                                      <span style={{ fontWeight: 700, color: "#64748b", marginRight: 6 }}>{f.label}</span>
                                      {f.value}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Missing fields note */}
                              {!found.job_title && !found.company && (
                                <div style={{ marginTop: 10, fontSize: 11, color: "#94a3b8", lineHeight: 1.5, borderTop: "1px solid #f1f5f9", paddingTop: 8 }}>
                                  💡 Role &amp; company not extracted (LinkedIn may have blocked full access). You can fill these manually.
                                </div>
                              )}
                            </div>

                            <div style={{ display: "flex", gap: 8 }}>
                              <button type="button" onClick={applyLinkedIn}
                                style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "linear-gradient(135deg,#16a34a,#22c55e)", color: "white", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                                Apply to Form
                              </button>
                              <button type="button" onClick={() => { setLiResult(null); setLiUrl("") }}
                                style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "white", color: "#64748b", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>
                                Re-try
                              </button>
                            </div>
                          </>
                        )
                      })()
                    )}
                  </div>
                )}
              </div>

              {/* Photo upload */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                <input ref={photoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
                <button type="button" onClick={() => photoRef.current?.click()} style={{ position: "relative", cursor: "pointer", background: "transparent", border: "none", padding: 0, flexShrink: 0 }}>
                  {photoPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photoPreview} alt="" style={{ width: 72, height: 72, borderRadius: 16, objectFit: "cover", border: "2.5px solid #bfcfff" }} />
                  ) : (
                    <div style={{ width: 72, height: 72, borderRadius: 16, border: "2px dashed #cbd5e1", background: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer" }}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                    </div>
                  )}
                  <div style={{ position: "absolute", bottom: -5, right: -5, width: 22, height: 22, borderRadius: "50%", background: "#1d3a8f", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white" }}>
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  </div>
                </button>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 3 }}>Profile Photo <span style={{ color: "#f43f5e" }}>*</span></div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Shown on your mentor card. Use a clear, professional photo.</div>
                </div>
              </div>

              {/* Name, Email */}
              <div className="bm-grid2" style={{ marginBottom: 16 }}>
                <Field label="Full Name" required value={name} onChange={setName} placeholder="e.g. Priya Sharma" />
                <Field label="Email" type="email" required value={email} onChange={setEmail} placeholder="you@email.com" />
              </div>

              {/* Phone, Location */}
              <div className="bm-grid2" style={{ marginBottom: 16 }}>
                <Field label="Phone" required value={phone} onChange={setPhone} placeholder="+91 98765 43210" />
                <Field label="City / Location" value={location} onChange={setLocation} placeholder="e.g. Bangalore" />
              </div>

              {/* LinkedIn, GitHub */}
              <div className="bm-grid2">
                <Field label="LinkedIn URL" value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/your-profile" />
                <Field label="GitHub / Portfolio" value={github} onChange={setGithub} placeholder="github.com/username" />
              </div>
            </SectionCard>

            {/* ── SECTION 2: Resume Upload ── */}
            <SectionCard>
              <SectionTitle
                icon={<IconDocument />}
                title="Resume Upload"
                subtitle="Your resume powers our AI matching engine"
              />

              {/* Strongly Recommended badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "#eff4ff", border: "1.5px solid #bfcfff", borderRadius: 99, marginBottom: 16 }}>
                <IconStar />
                <span style={{ fontSize: 11, fontWeight: 800, color: "#1d3a8f", textTransform: "uppercase", letterSpacing: ".06em" }}>Strongly Recommended</span>
              </div>

              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, marginBottom: 18 }}>
                Uploading your latest resume <strong style={{ color: "#0f172a" }}>significantly improves our AI matching accuracy</strong> and increases your chances of being recommended to students looking for mentors in your domain.
              </p>

              {/* Drop zone */}
              <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={handleResumeInput} />
              {!resume ? (
                <div
                  onDragOver={e => { e.preventDefault(); setResumeDragging(true) }}
                  onDragLeave={() => setResumeDragging(false)}
                  onDrop={handleResumeDrop}
                  onClick={() => resumeRef.current?.click()}
                  style={{
                    border: `2px dashed ${resumeDragging ? "#1d3a8f" : "#cbd5e1"}`,
                    borderRadius: 16,
                    background: resumeDragging ? "#eff4ff" : "#f8fafc",
                    padding: "36px 24px",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                    cursor: "pointer", transition: "all .2s",
                  }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: "#eff4ff", border: "1.5px solid #bfcfff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconUpload />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Drop your resume here or <span style={{ color: "#1d3a8f", textDecoration: "underline" }}>browse files</span></div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>Supported formats: PDF, DOCX · Max 5 MB</div>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 14, background: "#f0fdf4", border: "1.5px solid #86efac" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resume.name}</div>
                    <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>✓ Resume uploaded · {(resume.size / 1024).toFixed(0)} KB</div>
                  </div>
                  <button type="button" onClick={() => { setResume(null); if (resumeRef.current) resumeRef.current.value = "" }}
                    style={{ padding: "6px 12px", borderRadius: 8, border: "1.5px solid #86efac", background: "white", color: "#64748b", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit", flexShrink: 0 }}>
                    Remove
                  </button>
                </div>
              )}
            </SectionCard>

            {/* ── SECTION 3: Professional Experience ── */}
            <SectionCard>
              <SectionTitle
                icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /></svg>}
                title="Professional Experience"
                subtitle="Help us understand your background so we can place you accurately"
              />

              <div className="bm-grid2" style={{ marginBottom: 16 }}>
                <Field label="Current Company" value={company} onChange={setCompany} placeholder="e.g. Google" />
                <Field label="Current Designation" value={jobTitle} onChange={setJobTitle} placeholder="e.g. Senior Software Engineer" />
              </div>

              <div className="bm-grid2" style={{ marginBottom: 16 }}>
                {/* Industry */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 7 }}>Industry</label>
                  <select value={industry} onChange={e => setIndustry(e.target.value)}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 14, color: industry ? "#0f172a" : "#94a3b8", outline: "none", fontFamily: "inherit", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 38 }}>
                    <option value="">Select industry...</option>
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>

                {/* Years of Experience */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 7 }}>Years of Experience</label>
                  <select value={experience} onChange={e => setExperience(e.target.value)}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 14, color: experience ? "#0f172a" : "#94a3b8", outline: "none", fontFamily: "inherit", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 38 }}>
                    <option value="">Select...</option>
                    {EXP_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <Field label="Previous Companies" value={prevCompanies} onChange={setPrevCompanies} placeholder="e.g. Infosys, Wipro, Startup XYZ (optional)" />
              </div>

              {/* Professional Bio */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".05em" }}>Professional Summary</label>
                  {!aiOpen && (
                    <button type="button" onClick={() => { setAiOpen(true); setAiDraft(""); generateAiDraft() }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 8, background: "#eff4ff", border: "1px solid #bfcfff", color: "#1d3a8f", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                      <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L9.5 8.5 3 9.27l5 4.87L6.82 21 12 17.77 17.18 21 16 14.14l5-4.87-6.5-.77L12 2z" /></svg>
                      Write with AI
                    </button>
                  )}
                </div>
                {aiOpen && (
                  <div style={{ borderRadius: 14, border: "1.5px solid #bfcfff", background: "#faf5ff", padding: "16px", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#1d3a8f" }}>✨ AI Draft</span>
                      <button type="button" onClick={() => { setAiOpen(false); setAiDraft("") }} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0, fontFamily: "inherit" }}>
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                      </button>
                    </div>
                    {aiGenerating ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #bfcfff", borderTopColor: "#1d3a8f", animation: "bm-spin .7s linear infinite" }} />
                        <span style={{ fontSize: 12, color: "#64748b" }}>Generating your bio...</span>
                      </div>
                    ) : (
                      <>
                        <textarea value={aiDraft} onChange={e => setAiDraft(e.target.value)} rows={4}
                          style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #bfcfff", background: "white", fontSize: 13, lineHeight: 1.7, outline: "none", fontFamily: "inherit", resize: "none", boxSizing: "border-box", marginBottom: 10 }} />
                        <div style={{ display: "flex", gap: 8 }}>
                          <button type="button" onClick={() => { setBio(aiDraft); setAiOpen(false); setAiDraft("") }}
                            style={{ flex: 1, padding: "9px", borderRadius: 10, background: "#1d3a8f", color: "white", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Use this</button>
                          <button type="button" onClick={generateAiDraft}
                            style={{ padding: "9px 14px", borderRadius: 10, border: "1.5px solid #bfcfff", background: "white", color: "#1d3a8f", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Regenerate</button>
                        </div>
                      </>
                    )}
                  </div>
                )}
                <textarea value={bio} onChange={e => { if (e.target.value.length <= 1200) setBio(e.target.value) }} rows={4}
                  placeholder="Describe your professional journey, key achievements, and what kind of mentoring you offer..."
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 14, color: "#0f172a", lineHeight: 1.7, outline: "none", fontFamily: "inherit", resize: "none", boxSizing: "border-box" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#1d3a8f"; e.currentTarget.style.background = "#fff" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc" }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: bio.length > 1100 ? "#f59e0b" : "#cbd5e1" }}>{bio.length}/1200</span>
                </div>
              </div>
            </SectionCard>

            {/* ── SECTION 4: Skills & Expertise ── */}
            <SectionCard>
              <SectionTitle
                icon={<IconBrain />}
                title="Skills & Expertise"
                subtitle="Select skills you can mentor in. These are matched with students looking for guidance."
              />

              {/* Suggestions */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 10 }}>Popular Skills — click to add</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {SKILL_SUGGESTIONS.map(s => {
                    const sel = skills.includes(s)
                    return (
                      <button key={s} type="button" onClick={() => toggleSkill(s)}
                        style={{
                          padding: "6px 14px", borderRadius: 99, border: `1.5px solid ${sel ? "#1d3a8f" : "#e2e8f0"}`,
                          background: sel ? "#eff4ff" : "#f8fafc", color: sel ? "#1d3a8f" : "#475569",
                          fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                          display: "flex", alignItems: "center", gap: 5, transition: "all .15s",
                        }}>
                        {sel && <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>}
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Custom skill input */}
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addCustomSkill() } }}
                  placeholder="Add a custom skill..."
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", background: "#f8fafc", fontSize: 13, outline: "none", fontFamily: "inherit" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#1d3a8f"; e.currentTarget.style.background = "#fff" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc" }}
                />
                <button type="button" onClick={addCustomSkill} disabled={!skillInput.trim()}
                  style={{ padding: "10px 18px", borderRadius: 12, background: "#1d3a8f", color: "white", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit", opacity: skillInput.trim() ? 1 : 0.4 }}>
                  Add
                </button>
              </div>

              {/* Selected skills */}
              {skills.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8 }}>Selected ({skills.length})</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {skills.map(s => (
                      <div key={s} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px 6px 14px", borderRadius: 99, background: "#eff4ff", border: "1.5px solid #bfcfff", color: "#1d3a8f" }}>
                        <span style={{ fontSize: 12.5, fontWeight: 700 }}>{s}</span>
                        <button type="button" onClick={() => toggleSkill(s)}
                          style={{ background: "transparent", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0, display: "flex", fontFamily: "inherit" }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>

            {/* ── SECTION 5: Mentorship Preferences ── */}
            <SectionCard>
              <SectionTitle
                icon={<IconTarget />}
                title="Mentorship Preferences"
                subtitle="Tell us how you prefer to mentor and who you want to work with"
              />

              {/* Domain */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 12 }}>Domain of Expertise <span style={{ color: "#f43f5e" }}>*</span></label>
                <div className="bm-domain-grid">
                  {DOMAINS.map((d, i) => (
                    <button key={i} type="button" onClick={() => setDomain(i)}
                      style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "14px 10px",
                        borderRadius: 14, border: `2px solid ${domain === i ? "#1d3a8f" : "#e2e8f0"}`,
                        background: domain === i ? "#eff4ff" : "#f8fafc",
                        cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
                      }}>
                      <span style={{ fontSize: 24 }}>{d.e}</span>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: domain === i ? "#1d3a8f" : "#475569", textAlign: "center", lineHeight: 1.4 }}>{d.l}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>Topics You Can Help With <span style={{ color: "#f43f5e" }}>*</span></label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TOPICS.map(t => {
                    const sel = topics.includes(t)
                    return (
                      <button key={t} type="button"
                        onClick={() => setTopics(p => sel ? p.filter(x => x !== t) : [...p, t])}
                        style={{ padding: "7px 14px", borderRadius: 99, border: `1.5px solid ${sel ? "#1d3a8f" : "#e2e8f0"}`, background: sel ? "#eff4ff" : "#f8fafc", color: sel ? "#1d3a8f" : "#475569", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>
                        {t}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Preferred Audience */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>Preferred Audience</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {AUDIENCE_OPTS.map(a => {
                    const sel = audience.includes(a)
                    return (
                      <button key={a} type="button"
                        onClick={() => setAudience(p => sel ? p.filter(x => x !== a) : [...p, a])}
                        style={{ padding: "7px 16px", borderRadius: 99, border: `1.5px solid ${sel ? "#1d3a8f" : "#e2e8f0"}`, background: sel ? "#eff4ff" : "#f8fafc", color: sel ? "#1d3a8f" : "#475569", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>
                        {a}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Preferred Format */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>Preferred Mentoring Format</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {FORMAT_OPTS.map(f => {
                    const sel = formats.includes(f.l)
                    return (
                      <button key={f.l} type="button"
                        onClick={() => setFormats(p => sel ? p.filter(x => x !== f.l) : [...p, f.l])}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 14, border: `1.5px solid ${sel ? "#1d3a8f" : "#e2e8f0"}`, background: sel ? "#eff4ff" : "#f8fafc", cursor: "pointer", transition: "all .15s", fontFamily: "inherit", textAlign: "left" }}>
                        <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${sel ? "#1d3a8f" : "#cbd5e1"}`, background: sel ? "#1d3a8f" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .15s" }}>
                          {sel && <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: sel ? "#1d3a8f" : "#0f172a" }}>{f.l}</div>
                          <div style={{ fontSize: 11, color: "#64748b" }}>{f.d}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </SectionCard>

            {/* ── SECTION 6: Session Details ── */}
            <SectionCard>
              <SectionTitle
                icon={<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>}
                title="Session Details"
                subtitle="Set your pricing, duration, and availability"
              />

              {/* Price */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Session Price</label>
                  <span style={{ fontSize: 26, fontWeight: 900, color: "#16a34a" }}>₹{price}</span>
                </div>
                <input type="range" min={49} max={2000} step={10} value={price} onChange={e => setPrice(Number(e.target.value))}
                  style={{ width: "100%", height: 5, borderRadius: 99, appearance: "none", background: `linear-gradient(to right,#16a34a ${((price - 49) / (2000 - 49)) * 100}%,#e2e8f0 0%)`, cursor: "pointer", outline: "none", accentColor: "#16a34a" }} />
                <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
                  {[99, 149, 299, 499, 999].map(p => (
                    <button key={p} type="button" onClick={() => setPrice(p)}
                      style={{ flex: 1, padding: "7px 0", borderRadius: 10, border: `1.5px solid ${price === p ? "#16a34a" : "#e2e8f0"}`, background: price === p ? "#f0fdf4" : "transparent", color: price === p ? "#16a34a" : "#94a3b8", fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>
                      ₹{p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Session Duration</label>
                  <span style={{ fontSize: 26, fontWeight: 900, color: "#1d3a8f" }}>{duration}<span style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", marginLeft: 3 }}>min</span></span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[15, 30, 45, 60, 90].map(m => (
                    <button key={m} type="button" onClick={() => setDuration(m)}
                      style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: `2px solid ${duration === m ? "#1d3a8f" : "#e2e8f0"}`, background: duration === m ? "#eff4ff" : "transparent", color: duration === m ? "#1d3a8f" : "#94a3b8", fontSize: 12.5, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>
                      {m}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>Availability <span style={{ color: "#f43f5e" }}>*</span></label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {DAYS.map(d => {
                    const sel = days.includes(d)
                    return (
                      <button key={d} type="button" onClick={() => setDays(p => sel ? p.filter(x => x !== d) : [...p, d])}
                        style={{ padding: "10px 16px", borderRadius: 12, border: `2px solid ${sel ? "#1d3a8f" : "#e2e8f0"}`, background: sel ? "#eff4ff" : "#f8fafc", color: sel ? "#1d3a8f" : "#475569", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>
                        {d}
                      </button>
                    )
                  })}
                </div>
              </div>
            </SectionCard>

            {/* ── SUBMIT ── */}
            <div style={{ background: "white", borderRadius: 20, border: "1.5px solid #e8ecf4", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", padding: "28px 28px", textAlign: "center" }}>

              {/* Completion reminder */}
              {completion < 60 && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: 10, marginBottom: 20 }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#b45309" strokeWidth="2" strokeLinecap="round"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e" }}>Profile {completion}% complete — a fuller profile gets more recommendations</span>
                </div>
              )}

              <button type="button" onClick={submit} disabled={loading}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                  padding: "15px 48px", borderRadius: 14, border: "none", cursor: "pointer",
                  background: "#1d3a8f",
                  color: "white", fontSize: 16, fontWeight: 800, fontFamily: "inherit",
                  boxShadow: "0 6px 24px rgba(29,58,143,0.35)", transition: "all .2s",
                  opacity: loading ? 0.7 : 1, width: "100%", maxWidth: 340,
                }}>
                {loading ? (
                  <><div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", animation: "bm-spin .7s linear infinite" }} />Submitting...</>
                ) : (
                  <>Become a Mentor <IconArrow /></>
                )}
              </button>

              <p style={{ fontSize: 12.5, color: "#94a3b8", marginTop: 14, lineHeight: 1.6 }}>
                Our team will review your profile before approving your mentor account. · Free to apply.
              </p>
            </div>

          </div>

          {/* ── RIGHT: Sticky Info Panel ── */}
          <aside className="bm-aside">
            <div style={{ position: "sticky", top: 24 }}>

              {/* AI Mentor Matching card */}
              <div style={{ background: "#0c1a35", borderRadius: 20, padding: "26px 24px", marginBottom: 16, boxShadow: "0 8px 32px rgba(12,26,53,0.22)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>AI Mentor Matching</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 1 }}>Powered by Jobingen AI</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 20 }}>
                  Jobingen uses AI to analyze your resume, skills, expertise, and experience to recommend you to students looking for mentors in your domain.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: <IconDocument />, label: "AI Resume Analysis" },
                    { icon: <IconBrain />,    label: "Smart Skill Matching" },
                    { icon: <IconTarget />,   label: "Domain-Based Recommendations" },
                    { icon: <IconTrendUp />,  label: "Higher Visibility for Complete Profiles" },
                  ].map(f => (
                    <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.10)" }}>
                      <div style={{ color: "rgba(255,255,255,0.65)", flexShrink: 0 }}>{f.icon}</div>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile completion mini card */}
              <div style={{ background: "white", borderRadius: 18, border: "1.5px solid #e8ecf4", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", padding: "20px 20px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>Your Completion</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: completion >= 80 ? "#16a34a" : "#1d3a8f" }}>{completion}%</span>
                </div>
                <div style={{ height: 6, background: "#f1f5f9", borderRadius: 99, overflow: "hidden", marginBottom: 14 }}>
                  <div style={{ height: "100%", width: `${completion}%`, background: completion >= 80 ? "linear-gradient(90deg,#16a34a,#22c55e)" : "#1d3a8f", borderRadius: 99, transition: "width .5s ease" }} />
                </div>
                {completionItems.filter(i => !i.done).slice(0, 3).map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#f59e0b", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#64748b" }}>{item.label}</span>
                  </div>
                ))}
                {completionItems.filter(i => !i.done).length === 0 && (
                  <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 700, textAlign: "center" }}>✓ Profile looking great!</div>
                )}
              </div>

              {/* Trust card */}
              <div style={{ background: "#f8fafc", borderRadius: 18, border: "1.5px solid #e8ecf4", padding: "20px 20px" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>Trusted by Professionals from</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {["KPMG", "Dell", "SAP", "PhonePe", "Zepto", "HCLTech", "Wabtec", "Cograd"].map(c => (
                    <span key={c} style={{ fontSize: 11, fontWeight: 700, color: "#334155", padding: "4px 10px", background: "white", border: "1px solid #e0e7ff", borderRadius: 99 }}>{c}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 14 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#1d3a8f" }}>24+</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".05em" }}>Mentors</div>
                  </div>
                  <div style={{ width: 1, background: "#e2e8f0" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#1d3a8f" }}>12K+</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".05em" }}>Students</div>
                  </div>
                  <div style={{ width: 1, background: "#e2e8f0" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#1d3a8f" }}>4.8★</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".05em" }}>Rating</div>
                  </div>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bm-spin { to { transform: rotate(360deg) } }
        @keyframes bm-ping { 0%,100%{opacity:.15;transform:scale(1)} 50%{opacity:.3;transform:scale(1.15)} }

        .bm-layout {
          display: flex;
          gap: 28px;
          align-items: flex-start;
        }
        .bm-aside {
          width: 300px;
          flex-shrink: 0;
        }
        .bm-grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .bm-domain-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .bm-match-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        @media (max-width: 1024px) {
          .bm-aside { display: none; }
          .bm-layout { flex-direction: column; }
        }
        @media (max-width: 640px) {
          .bm-grid2 { grid-template-columns: 1fr; }
          .bm-domain-grid { grid-template-columns: repeat(2, 1fr); }
          .bm-match-grid { grid-template-columns: 1fr; }
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #16a34a;
          border: 2.5px solid white;
          box-shadow: 0 1px 6px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #16a34a;
          border: 2.5px solid white;
          cursor: pointer;
        }
      `}} />
    </div>
  )
}
