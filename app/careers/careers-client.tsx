"use client"

import { useState, useRef, useEffect } from "react"
import React from "react"

/* ─────────────────────────────────────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────────────────────────────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("cr-visible"); obs.unobserve(el) } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollReveal()
  return <div ref={ref} className="cr-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const ROLES = [
  {
    id: "frontend-engineering-intern",
    title: "Frontend Engineering Intern",
    dept: "Engineering",
    duration: "3–6 months",
    tags: ["Next.js", "TypeScript", "React"],
    desc: "Build user-facing features shipped to thousands of students daily. You'll work directly in the production codebase from day one.",
  },
  {
    id: "backend-engineering-intern",
    title: "Backend Engineering Intern",
    dept: "Engineering",
    duration: "3–6 months",
    tags: ["Node.js", "Supabase", "Postgres"],
    desc: "Design APIs and data pipelines that power Jobingen's job matching, resume parsing, and AI features.",
  },
  {
    id: "ai-ml-intern",
    title: "AI / ML Engineering Intern",
    dept: "AI & Data",
    duration: "3–6 months",
    tags: ["LLMs", "Python", "RAG", "Embeddings"],
    desc: "Work on Vibe AI, resume tailoring, and job-matching models. You'll experiment with LLMs and ship AI features students use daily.",
  },
  {
    id: "ai-content-engine-intern",
    title: "AI Content Engineer Intern",
    dept: "AI & Data",
    duration: "6–8 weeks",
    tags: ["Python", "Claude API", "Puppeteer", "n8n"],
    desc: "Win the Open Hackathon to unlock this role. Build Jobingen's AI-powered brand automation engine — daily pipeline generating on-brand social posts fully automatically.",
    badge: "HACKATHON",
  },
  {
    id: "uiux-design-intern",
    title: "UI/UX Design Intern",
    dept: "Design",
    duration: "3–6 months",
    tags: ["Figma", "User Research", "Prototyping"],
    desc: "Design screens, flows, and components that go directly into production. Real user testing, real feedback, real impact.",
  },
  {
    id: "product-management-intern",
    title: "Product Management Intern",
    dept: "Product",
    duration: "3 months",
    tags: ["PRDs", "Roadmap", "Data-driven"],
    desc: "Write PRDs, shape the roadmap, and work directly with the founding team. Ideal if you want to understand what building a product really means.",
  },
  {
    id: "marketing-growth-intern",
    title: "Marketing & Growth Intern",
    dept: "Marketing",
    duration: "3 months",
    tags: ["SEO", "Paid Ads", "Analytics"],
    desc: "Run campaigns, A/B tests, and SEO experiments to grow Jobingen's user base. You own channels end-to-end.",
  },
  {
    id: "content-social-intern",
    title: "Content & Social Media Intern",
    dept: "Marketing",
    duration: "3 months",
    tags: ["LinkedIn", "Writing", "Instagram"],
    desc: "Own Jobingen's voice on LinkedIn and Instagram. Write career guides, company breakdowns, and newsletters that students actually read.",
  },
  {
    id: "hr-operations-intern",
    title: "HR & Operations Intern",
    dept: "Operations",
    duration: "3 months",
    tags: ["Hiring", "Coordination", "Ops"],
    desc: "Manage candidate pipelines, coordinate interviews, and improve internal processes. Great for students interested in people & culture.",
  },
]

const DEPTS = ["All", "Engineering", "AI & Data", "Design", "Product", "Marketing", "Operations"]

const YEAR_OPTIONS = [
  "1st Year", "2nd Year", "3rd Year", "4th Year",
  "Postgrad (MBA / M.Tech / MCA)", "PhD", "Recent Graduate",
]

const PERKS = [
  { icon: "🚀", title: "Ship real products", desc: "Your code, design, or content goes live to real users. No busywork, no fake tasks." },
  { icon: "🧑‍💻", title: "Work with founders", desc: "Direct access to the founding team. Get feedback, mentorship, and the full picture." },
  { icon: "📜", title: "Certificate + LOR", desc: "Official Jobingen certificate and a strong Letter of Recommendation on completion." },
  { icon: "📈", title: "Career growth", desc: "Build real experience, grow your skills, and add meaningful work to your portfolio." },
  { icon: "⚡", title: "PPO for top interns", desc: "Top performers get a Pre-Placement Offer consideration at the end of 3 months." },
  { icon: "🌐", title: "100% remote", desc: "Work from anywhere in India. Async-friendly culture, flexible hours." },
]

const STEPS = [
  { num: "01", title: "Browse & pick a role", desc: "Go through the open roles below. Click Apply on any card — the form auto-selects that role for you." },
  { num: "02", title: "Fill the common form", desc: "One form for all roles. Select your role, fill in your details, upload your resume, and submit." },
  { num: "03", title: "We reach out in 5–7 days", desc: "Our team reviews every application personally. Shortlisted candidates get a quick intro call with the team." },
]

const TESTIMONIALS = [
  {
    quote: "I shipped a full AI resume tailoring feature in my first two weeks. Jobingen treats interns like actual engineers — no coffee runs, just real code.",
    name: "Arjun Mehta",
    role: "Frontend Engineering Intern",
    college: "BITS Pilani",
    avatar: "AM",
    color: "#1d3a8f",
  },
  {
    quote: "The LOR I got from Jobingen's founders opened doors at three top startups. Best 3 months of my college life — I learned more here than in a semester.",
    name: "Priya Sharma",
    role: "Product Management Intern",
    college: "IIT Bombay",
    avatar: "PS",
    color: "#0f766e",
  },
  {
    quote: "I went from theory to production ML in week one. Built an embedding pipeline used by thousands of students. The scope here is unreal for a student.",
    name: "Rohit Verma",
    role: "AI / ML Engineering Intern",
    college: "NIT Trichy",
    avatar: "RV",
    color: "#7c3aed",
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   ROLE CARD
───────────────────────────────────────────────────────────────────────────── */
const DEPT_ICONS: Record<string, React.ReactNode> = {
  "Engineering": (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  "AI & Data": (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.93 4.93l2.12 2.12m9.9 9.9 2.12 2.12M4.93 19.07l2.12-2.12m9.9-9.9 2.12-2.12"/>
    </svg>
  ),
  "Design": (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  "Product": (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  ),
  "Marketing": (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  "Operations": (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
}

function RoleCard({ role, onApply }: { role: typeof ROLES[number]; onApply: (id: string) => void }) {
  const isNew = "badge" in role && role.badge === "NEW"
  return (
    <div className={`cr-role-card${isNew ? " cr-role-card-featured" : ""}`}>
      {isNew && <div className="cr-role-featured-bar" />}
      <div className="cr-role-top">
        <div className="cr-role-icon">
          {DEPT_ICONS[role.dept] ?? DEPT_ICONS["Engineering"]}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {isNew && (
            <span className="cr-new-badge">NEW</span>
          )}
          <div className="cr-hiring-badge">
            <span className="cr-live-dot" />
            Hiring Now
          </div>
        </div>
      </div>
      <div className="cr-role-body">
        <span className="cr-dept-chip">{role.dept}</span>
        <h3 className="cr-role-title">{role.title}</h3>
        <p className="cr-role-desc">{role.desc}</p>
        <div className="cr-tags">
          {role.tags.map(t => <span key={t} className="cr-tag">{t}</span>)}
        </div>
      </div>
      <div className="cr-role-footer">
        <div className="cr-role-meta">
          <span className="cr-duration">{role.duration}</span>
          <span className="cr-dot-sep">·</span>
          <span className="cr-mode">Remote</span>
        </div>
        <button className="cr-apply-btn" onClick={() => onApply(role.id)}>
          Apply
          <svg width="11" height="11" fill="none" viewBox="0 0 16 16">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FORM PRIMITIVES
───────────────────────────────────────────────────────────────────────────── */
function FLabel({ children }: { children: React.ReactNode }) {
  return <label className="cr-label">{children}</label>
}
function FInput({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <input
      type={type} value={value} placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      className="cr-input"
    />
  )
}
function FSelect({ value, onChange, children }: {
  value: string; onChange: (v: string) => void; children: React.ReactNode
}) {
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={e => onChange(e.target.value)} className="cr-input cr-select">
        {children}
      </select>
      <div className="cr-select-arrow">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   APPLY DRAWER
───────────────────────────────────────────────────────────────────────────── */
function ApplyDrawer({ initialRole, onClose }: { initialRole: string; onClose: () => void }) {
  const [role, setRole]           = useState(initialRole)
  const [name, setName]           = useState("")
  const [email, setEmail]         = useState("")
  const [phone, setPhone]         = useState("")
  const [college, setCollege]     = useState("")
  const [year, setYear]           = useState("")
  const [linkedin, setLinkedin]   = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [why, setWhy]             = useState("")
  const [file, setFile]           = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]         = useState("")
  const [success, setSuccess]     = useState(false)
  const fileRef                   = useRef<HTMLInputElement>(null)
  const roleData                  = ROLES.find(r => r.id === role)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!role)         return setError("Please select a role.")
    if (!name.trim())  return setError("Please enter your full name.")
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email.")
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10)       return setError("Please enter a valid phone number.")
    if (!college.trim()) return setError("Please enter your college / university.")
    if (!year)           return setError("Please select your year of study.")
    if (!file)           return setError("Please upload your resume.")
    if (!why.trim())     return setError("Please tell us why you want to join Jobingen.")

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append("role_id",    role)
      fd.append("role_title", roleData?.title ?? role)
      fd.append("name",       name.trim())
      fd.append("email",      email.trim().toLowerCase())
      fd.append("phone",      phone.trim())
      fd.append("college",    college.trim())
      fd.append("year",       year)
      fd.append("linkedin",   linkedin.trim())
      fd.append("portfolio",  portfolio.trim())
      fd.append("why",        why.trim())
      fd.append("resume",     file)

      const res  = await fetch("/api/careers/apply", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed.")
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="cr-backdrop" onClick={onClose} />
      <div className="cr-drawer">
        <div className="cr-drawer-header">
          <div>
            <div className="cr-drawer-eyebrow">
              <span className="cr-live-dot" />
              Internship Application
            </div>
            <h2 className="cr-drawer-title">Apply at Jobingen</h2>
            <p className="cr-drawer-sub">One form · all roles · reviewed personally</p>
          </div>
          <button className="cr-close-btn" onClick={onClose}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="cr-drawer-body">
          {success ? (
            <div className="cr-success">
              <div className="cr-success-icon">
                <svg width="28" height="28" fill="none" viewBox="0 0 40 40">
                  <path d="M10 20L16 26L30 12" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="cr-success-title">Application Submitted!</h3>
              <p className="cr-success-body">
                We&apos;ve received your application for <strong>{roleData?.title}</strong>.
                Our team will review it and reach out within 5–7 days.
              </p>
              <button className="cr-btn-primary" onClick={onClose}>Done</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="cr-form">
              {error && <div className="cr-error">{error}</div>}

              <div className="cr-field">
                <FLabel>Role you&apos;re applying for <span className="cr-req">*</span></FLabel>
                <FSelect value={role} onChange={setRole}>
                  <option value="" disabled>Select a role…</option>
                  {ROLES.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                </FSelect>
                {roleData && (
                  <div className="cr-role-chips">
                    <span className="cr-chip-gray">{roleData.duration}</span>
                    <span className="cr-chip-gray">{roleData.dept}</span>
                  </div>
                )}
              </div>

              <div className="cr-divider" />

              <div className="cr-grid-2">
                <div className="cr-field">
                  <FLabel>Full Name <span className="cr-req">*</span></FLabel>
                  <FInput value={name} onChange={setName} placeholder="Rahul Sharma" />
                </div>
                <div className="cr-field">
                  <FLabel>Email <span className="cr-req">*</span></FLabel>
                  <FInput type="email" value={email} onChange={setEmail} placeholder="rahul@email.com" />
                </div>
              </div>

              <div className="cr-grid-2">
                <div className="cr-field">
                  <FLabel>Phone <span className="cr-req">*</span></FLabel>
                  <FInput type="tel" value={phone} onChange={setPhone} placeholder="+91 98765 43210" />
                </div>
                <div className="cr-field">
                  <FLabel>College / University <span className="cr-req">*</span></FLabel>
                  <FInput value={college} onChange={setCollege} placeholder="IIT Delhi, BITS…" />
                </div>
              </div>

              <div className="cr-field">
                <FLabel>Year of Study <span className="cr-req">*</span></FLabel>
                <FSelect value={year} onChange={setYear}>
                  <option value="" disabled>Select year…</option>
                  {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                </FSelect>
              </div>

              <div className="cr-divider" />

              <div className="cr-grid-2">
                <div className="cr-field">
                  <FLabel>LinkedIn <span className="cr-opt">(optional)</span></FLabel>
                  <FInput value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/rahul" />
                </div>
                <div className="cr-field">
                  <FLabel>Portfolio / GitHub <span className="cr-opt">(optional)</span></FLabel>
                  <FInput value={portfolio} onChange={setPortfolio} placeholder="github.com/rahul" />
                </div>
              </div>

              <div className="cr-field">
                <FLabel>Why Jobingen? <span className="cr-req">*</span></FLabel>
                <textarea
                  value={why} onChange={e => setWhy(e.target.value)}
                  placeholder="What excites you about this role and what you'd like to build here…"
                  rows={3} className="cr-textarea"
                />
              </div>

              <div className="cr-field">
                <FLabel>
                  Resume <span className="cr-req">*</span>
                  <span className="cr-opt"> — PDF, DOC or DOCX · max 10MB</span>
                </FLabel>
                <div
                  className={`cr-upload${file ? " cr-upload-done" : ""}`}
                  onClick={() => fileRef.current?.click()}
                >
                  <input
                    ref={fileRef} type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    style={{ display: "none" }}
                    onChange={e => setFile(e.target.files?.[0] ?? null)}
                  />
                  {file ? (
                    <div className="cr-upload-file">
                      <div className="cr-upload-file-icon">
                        <svg width="16" height="16" fill="none" viewBox="0 0 22 22" stroke="#15803d" strokeWidth="1.5">
                          <rect x="4" y="2" width="14" height="18" rx="2"/>
                          <path d="M7.5 7.5H14.5M7.5 11H12M7.5 14.5H13" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="cr-upload-name">{file.name}</div>
                        <div className="cr-upload-size">{(file.size / 1024).toFixed(1)} KB · click to change</div>
                      </div>
                    </div>
                  ) : (
                    <div className="cr-upload-empty">
                      <div className="cr-upload-icon-wrap">
                        <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </div>
                      <div className="cr-upload-text">Click to upload your resume</div>
                      <div className="cr-upload-hint">PDF, DOC, DOCX accepted</div>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" disabled={submitting} className="cr-submit-btn">
                {submitting ? (
                  <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cr-spinner"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Submitting…</>
                ) : (
                  <>Submit Application <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                )}
              </button>
              <p className="cr-form-note">We review every application personally — no spam, ever.</p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export function CareersClient() {
  const [applyRole, setApplyRole] = useState<string | null>(null)
  const [activeDept, setActiveDept] = useState("All")
  const filtered = activeDept === "All" ? ROLES : ROLES.filter(r => r.dept === activeDept)

  return (
    <div className="cr">
      <style>{`
        /* ── BASE ── */
        .cr * { box-sizing: border-box; margin: 0; padding: 0; }
        .cr {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          color: #0f172a;
        }

        /* ── ANIMATIONS ── */
        @keyframes cr-fade-up   { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:none } }
        @keyframes cr-fade-in   { from { opacity:0 } to { opacity:1 } }
        @keyframes cr-pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }
        @keyframes cr-marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes cr-slide-in  { from{transform:translateX(100%)} to{transform:translateX(0)} }
        @keyframes cr-fade-bg   { from{opacity:0} to{opacity:1} }
        @keyframes cr-spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes cr-slide-up  { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @keyframes cr-float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .cr-reveal { opacity:0; transform:translateY(22px); transition:opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1); }
        .cr-visible { opacity:1!important; transform:none!important; }

        /* ── LIVE DOT ── */
        .cr-live-dot { display:inline-block; width:6px; height:6px; border-radius:50%; background:#16a34a; box-shadow:0 0 6px rgba(22,163,74,.55); animation:cr-pulse 2s infinite; flex-shrink:0; }

        /* ══════════════════════════════════════════════════
           HERO
        ══════════════════════════════════════════════════ */
        .cr-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #eef2ff 0%, #e8edff 50%, #f4f7ff 100%);
          padding: 190px 24px 96px;
          text-align: center;
          border-bottom: 1px solid #e0e7ff;
        }

        /* decorative blobs */
        .cr-hero-blob1 {
          position:absolute; top:-10%; right:2%; width:500px; height:500px; border-radius:50%;
          background:radial-gradient(circle,rgba(29,58,143,0.09) 0%,transparent 65%);
          pointer-events:none;
        }
        .cr-hero-blob2 {
          position:absolute; bottom:-8%; left:0%; width:380px; height:380px; border-radius:50%;
          background:radial-gradient(circle,rgba(59,91,219,0.07) 0%,transparent 65%);
          pointer-events:none;
        }
        .cr-hero-blob3 {
          position:absolute; top:30%; left:5%; width:200px; height:200px; border-radius:50%;
          background:radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 65%);
          pointer-events:none;
        }
        .cr-hero-grid {
          position:absolute; inset:0;
          background-image:radial-gradient(rgba(29,58,143,0.045) 1px,transparent 1px);
          background-size:36px 36px; pointer-events:none;
        }

        .cr-hero-inner { position:relative; max-width:820px; margin:0 auto; }

        .cr-hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          padding:7px 20px; background:white; border:1.5px solid #dde5ff;
          border-radius:99px; margin-bottom:30px;
          box-shadow:0 2px 14px rgba(29,58,143,0.1);
          animation:cr-fade-up .55s cubic-bezier(.16,1,.3,1) both;
        }
        .cr-hero-badge-text { font-size:11.5px; font-weight:800; color:#1d3a8f; letter-spacing:.065em; text-transform:uppercase; }

        .cr-hero-h1 {
          font-size: clamp(36px, 5.8vw, 66px);
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.045em;
          line-height: 1.04;
          margin-bottom: 22px;
          animation: cr-fade-up .65s cubic-bezier(.16,1,.3,1) .07s both;
        }
        .cr-grad {
          background: linear-gradient(135deg, #1d3a8f 0%, #3b5bdb 55%, #6070f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cr-hero-sub {
          font-size: 17px; color: #4b5563; line-height: 1.78;
          max-width: 540px; margin: 0 auto 44px;
          animation: cr-fade-up .75s cubic-bezier(.16,1,.3,1) .13s both;
        }

        .cr-hero-actions {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; flex-wrap: wrap;
          animation: cr-fade-up .85s cubic-bezier(.16,1,.3,1) .19s both;
        }
        .cr-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #1a3585, #2d4fd4 55%, #4668f5);
          color: #fff; padding: 14px 32px; border-radius: 13px; border: none;
          font-size: 15px; font-weight: 700; cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 22px rgba(29,58,143,0.32);
          transition: all .28s cubic-bezier(.16,1,.3,1);
          font-family: inherit; letter-spacing: -0.01em;
        }
        .cr-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(29,58,143,0.42); }
        .cr-btn-secondary {
          display: inline-flex; align-items: center; gap: 7px;
          background: white; color: #1d3a8f; padding: 14px 28px; border-radius: 13px;
          font-size: 14.5px; font-weight: 700; text-decoration: none; cursor: pointer;
          border: 1.5px solid #c7d2fe; box-shadow: 0 2px 10px rgba(29,58,143,0.07);
          transition: all .22s; font-family: inherit;
        }
        .cr-btn-secondary:hover { border-color: #1d3a8f; background: #f5f7ff; transform: translateY(-1px); }

        /* stats strip */
        .cr-hero-stats {
          display: inline-flex; align-items: stretch; background: white;
          border: 1.5px solid #e0e7ff; border-radius: 18px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(29,58,143,0.09);
          animation: cr-fade-up .95s cubic-bezier(.16,1,.3,1) .25s both;
          margin-top: 56px;
        }
        .cr-stat { padding: 20px 32px; text-align: center; border-right: 1px solid #f1f5f9; }
        .cr-stat:last-child { border-right: none; }
        .cr-stat-val { font-size: 24px; font-weight: 900; color: #1d3a8f; letter-spacing: -0.035em; line-height: 1; }
        .cr-stat-label { font-size: 11px; font-weight: 600; color: #94a3b8; margin-top: 5px; text-transform: uppercase; letter-spacing: .04em; }

        /* ══════════════════════════════════════════════════
           HACKATHON SECTION
        ══════════════════════════════════════════════════ */
        .cr-hack {
          background: linear-gradient(135deg, #060d1f 0%, #0d1f4d 45%, #1a3585 100%);
          padding: 72px 24px;
          position: relative;
          overflow: hidden;
        }
        .cr-hack::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .cr-hack-glow1 {
          position: absolute; top: -20%; right: -5%; width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(70,104,245,0.22) 0%, transparent 65%);
          pointer-events: none;
        }
        .cr-hack-glow2 {
          position: absolute; bottom: -30%; left: -5%; width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%);
          pointer-events: none;
        }
        .cr-hack-inner {
          max-width: 1100px; margin: 0 auto; position: relative;
        }

        /* top badge */
        .cr-hack-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 99px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.9);
          letter-spacing: .08em; text-transform: uppercase;
          margin-bottom: 24px;
        }
        .cr-hack-fire { font-size: 14px; }

        /* heading */
        .cr-hack-h2 {
          font-size: clamp(30px, 4.5vw, 56px);
          font-weight: 900; color: white;
          letter-spacing: -0.04em; line-height: 1.05;
          margin-bottom: 16px;
        }
        .cr-hack-accent {
          background: linear-gradient(90deg, #60a5fa, #a78bfa, #60a5fa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cr-shimmer 4s linear infinite;
        }
        @keyframes cr-shimmer {
          from { background-position: 0% center; }
          to   { background-position: 200% center; }
        }

        .cr-hack-sub {
          font-size: 16px; color: rgba(255,255,255,0.58);
          line-height: 1.75; max-width: 560px;
          margin-bottom: 40px;
        }

        /* layout: left content + right prize box */
        .cr-hack-layout {
          display: grid; grid-template-columns: 1fr 340px;
          gap: 40px; align-items: start;
        }
        @media(max-width:900px){ .cr-hack-layout { grid-template-columns: 1fr; } }

        /* challenge chips */
        .cr-hack-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 36px; }
        .cr-hack-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 14px; border-radius: 10px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.8);
        }
        .cr-hack-chip-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #60a5fa; flex-shrink: 0;
        }

        /* CTA row */
        .cr-hack-cta { display: flex; gap: 12px; flex-wrap: wrap; }
        .cr-btn-hack-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; border-radius: 13px; border: none;
          background: white; color: #1a3585;
          font-size: 14.5px; font-weight: 800; cursor: pointer;
          font-family: inherit; text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          transition: all .25s cubic-bezier(.16,1,.3,1);
          letter-spacing: -0.01em;
        }
        .cr-btn-hack-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        .cr-btn-hack-secondary {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 14px 24px; border-radius: 13px;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.2);
          color: white; font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: inherit; text-decoration: none;
          transition: all .22s;
        }
        .cr-btn-hack-secondary:hover { background: rgba(255,255,255,0.17); border-color: rgba(255,255,255,0.35); }

        /* prize box */
        .cr-hack-prize {
          border-radius: 22px;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.13);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }
        .cr-hack-prize-header {
          padding: 18px 22px;
          background: linear-gradient(135deg, rgba(70,104,245,0.35), rgba(124,58,237,0.25));
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; gap: 10px;
        }
        .cr-hack-prize-icon {
          font-size: 22px;
          width: 42px; height: 42px; border-radius: 12px;
          background: rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cr-hack-prize-tag {
          font-size: 10px; font-weight: 800; color: rgba(255,255,255,0.55);
          letter-spacing: .08em; text-transform: uppercase; margin-bottom: 3px;
        }
        .cr-hack-prize-title {
          font-size: 15px; font-weight: 900; color: white; letter-spacing: -0.02em;
        }
        .cr-hack-prize-body { padding: 20px 22px; display: flex; flex-direction: column; gap: 12px; }
        .cr-hack-prize-item {
          display: flex; align-items: flex-start; gap: 10px;
        }
        .cr-hack-prize-bullet {
          width: 20px; height: 20px; border-radius: 6px;
          background: linear-gradient(135deg, #4668f5, #7c3aed);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }
        .cr-hack-prize-text {
          font-size: 13px; color: rgba(255,255,255,0.75); line-height: 1.55;
        }
        .cr-hack-prize-text strong { color: white; font-weight: 700; }
        .cr-hack-prize-footer {
          padding: 16px 22px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; gap: 8px;
        }
        .cr-hack-spots {
          display: flex; align-items: center; gap: 6px;
          font-size: 11.5px; font-weight: 700; color: rgba(255,255,255,0.5);
        }
        .cr-hack-spots-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #f59e0b; box-shadow: 0 0 6px rgba(245,158,11,.6);
          animation: cr-pulse 2s infinite; flex-shrink: 0;
        }

        /* mobile adjustments */
        @media(max-width:600px){
          .cr-hack { padding: 52px 18px; }
          .cr-hack-h2 { font-size: clamp(26px,7vw,40px); }
          .cr-hack-sub { font-size: 14.5px; margin-bottom: 28px; }
          .cr-hack-cta { flex-direction: column; }
          .cr-btn-hack-primary, .cr-btn-hack-secondary { width: 100%; justify-content: center; }
        }

        /* ══════════════════════════════════════════════════
           TICKER
        ══════════════════════════════════════════════════ */
        .cr-ticker { background: white; border-bottom: 1px solid #f0f4ff; padding: 13px 0; overflow: hidden; }
        .cr-ticker-track { display: flex; gap: 0; width: max-content; animation: cr-marquee 34s linear infinite; }
        .cr-ticker-item { display: inline-flex; align-items: center; gap: 8px; padding: 0 30px; font-size: 12.5px; font-weight: 700; color: #334155; white-space: nowrap; }
        .cr-ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: #c7d2fe; }

        /* ══════════════════════════════════════════════════
           LAYOUT
        ══════════════════════════════════════════════════ */
        .cr-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .cr-sec     { padding: 80px 24px; }
        .cr-sec-alt { padding: 80px 24px; background: #f8faff; }

        .cr-eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 11px; font-weight: 800; color: #1d3a8f;
          letter-spacing: .09em; text-transform: uppercase; margin-bottom: 14px;
        }
        .cr-eyebrow-line { display: inline-block; width: 22px; height: 2.5px; background: linear-gradient(90deg,#1d3a8f,#4668f5); border-radius: 2px; }
        .cr-sec-title { font-size: clamp(26px,3.5vw,42px); font-weight: 900; color: #0f172a; letter-spacing: -0.038em; line-height: 1.08; margin-bottom: 14px; }
        .cr-sec-sub { font-size: 16px; color: #64748b; line-height: 1.78; max-width: 560px; }

        /* ══════════════════════════════════════════════════
           ROLES GRID
        ══════════════════════════════════════════════════ */
        .cr-roles-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; margin-top: 36px; }
        @media(max-width:720px){ .cr-roles-grid { grid-template-columns: 1fr; } }

        .cr-role-card {
          background: white; border-radius: 20px; border: 1.5px solid #eaecf4;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          display: flex; flex-direction: column;
          transition: box-shadow .28s cubic-bezier(.16,1,.3,1), transform .28s cubic-bezier(.16,1,.3,1), border-color .22s;
          overflow: hidden; position: relative;
        }
        .cr-role-card:hover { box-shadow: 0 14px 40px rgba(29,58,143,0.13); transform: translateY(-4px); border-color: #c7d2fe; }
        .cr-role-card-featured { border-color: #c7d2fe; box-shadow: 0 4px 20px rgba(29,58,143,0.1); }
        .cr-role-featured-bar { height: 3px; background: linear-gradient(90deg,#1d3a8f,#4668f5); }

        .cr-new-badge {
          font-size: 9px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase;
          background: linear-gradient(135deg,#1d3a8f,#4668f5); color: white;
          padding: 3px 8px; border-radius: 99px;
        }

        .cr-role-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 22px 0; margin-bottom: 16px;
        }
        .cr-role-icon {
          width: 46px; height: 46px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          background: #eef2ff; border: 1.5px solid #c7d2fe; color: #1d3a8f;
          transition: transform .28s cubic-bezier(.16,1,.3,1);
        }
        .cr-role-card:hover .cr-role-icon { transform: scale(1.1) rotate(-3deg); }

        .cr-hiring-badge {
          display: flex; align-items: center; gap: 6px;
          background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 99px;
          padding: 4px 12px; font-size: 10px; font-weight: 700; color: #15803d;
        }

        .cr-role-body { padding: 0 22px 0; flex: 1; }
        .cr-dept-chip { font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 99px; display: inline-block; margin-bottom: 10px; letter-spacing: .04em; text-transform: uppercase; color: #1d3a8f; background: #eef2ff; border: 1px solid #c7d2fe; }
        .cr-role-title { font-size: 16px; font-weight: 800; color: #0f172a; letter-spacing: -0.022em; line-height: 1.3; margin-bottom: 8px; }
        .cr-role-desc { font-size: 13px; color: #64748b; line-height: 1.72; margin-bottom: 14px; }

        .cr-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 18px; }
        .cr-tag { font-size: 11px; font-weight: 600; color: #334155; background: #f4f6fb; border: 1px solid #e8ecf5; padding: 3px 10px; border-radius: 99px; }

        .cr-role-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 22px; border-top: 1px solid #f1f5f9; background: #fafbff;
          gap: 10px; flex-wrap: wrap;
        }
        .cr-role-meta { display: flex; align-items: center; gap: 6px; }
        .cr-dot-sep { font-size: 10px; color: #cbd5e1; }
        .cr-duration, .cr-mode { font-size: 12px; color: #94a3b8; font-weight: 500; }

        .cr-apply-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 8px 17px; border-radius: 10px; font-size: 12.5px; font-weight: 700;
          background: white; color: #1d3a8f; border: 1.5px solid #c7d2fe;
          cursor: pointer; transition: all .22s; font-family: inherit; white-space: nowrap;
        }
        .cr-apply-btn:hover { background: #1d3a8f; color: white; border-color: #1d3a8f; box-shadow: 0 4px 16px rgba(29,58,143,0.24); }

        /* ══════════════════════════════════════════════════
           DEPT FILTERS
        ══════════════════════════════════════════════════ */
        .cr-filters { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 28px; }
        .cr-dept-btn {
          padding: 7px 18px; border-radius: 99px; font-size: 12.5px; font-weight: 700;
          cursor: pointer; transition: all .18s; font-family: inherit; border: 1.5px solid transparent;
        }
        .cr-dept-btn-inactive { background: white; color: #4b5563; border-color: #e0e7ff; }
        .cr-dept-btn-inactive:hover { border-color: #1d3a8f; color: #1d3a8f; background: #f5f7ff; }
        .cr-dept-btn-active { background: #1d3a8f; color: white; border-color: #1d3a8f; box-shadow: 0 2px 10px rgba(29,58,143,0.22); }

        /* ══════════════════════════════════════════════════
           PERKS GRID
        ══════════════════════════════════════════════════ */
        .cr-perks-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 48px; }
        @media(max-width:900px){ .cr-perks-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:540px){ .cr-perks-grid { grid-template-columns: 1fr; } }

        .cr-perk-card {
          background: white; border-radius: 18px; border: 1.5px solid #eaecf4;
          padding: 26px 22px; box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          transition: box-shadow .22s, border-color .22s, transform .22s;
        }
        .cr-perk-card:hover { box-shadow: 0 8px 28px rgba(29,58,143,0.1); border-color: #c7d2fe; transform: translateY(-3px); }
        .cr-perk-icon-wrap { width: 48px; height: 48px; border-radius: 14px; background: #eef2ff; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 22px; }
        .cr-perk-title { font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 8px; letter-spacing: -0.018em; }
        .cr-perk-desc { font-size: 13px; color: #64748b; line-height: 1.72; }

        /* ══════════════════════════════════════════════════
           TESTIMONIALS
        ══════════════════════════════════════════════════ */
        .cr-testimonials-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 48px; }
        @media(max-width:900px){ .cr-testimonials-grid { grid-template-columns: 1fr; } }

        .cr-testi-card {
          background: white; border-radius: 20px; border: 1.5px solid #eaecf4;
          padding: 28px 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          display: flex; flex-direction: column; gap: 20px;
          transition: box-shadow .22s, border-color .22s, transform .22s;
        }
        .cr-testi-card:hover { box-shadow: 0 10px 32px rgba(29,58,143,0.1); border-color: #c7d2fe; transform: translateY(-3px); }

        .cr-testi-quote-icon { color: #c7d2fe; flex-shrink: 0; }
        .cr-testi-quote { font-size: 14px; color: #334155; line-height: 1.78; font-style: italic; flex: 1; }
        .cr-testi-footer { display: flex; align-items: center; gap: 12px; }
        .cr-testi-avatar {
          width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 800; color: white;
        }
        .cr-testi-name { font-size: 13px; font-weight: 800; color: #0f172a; letter-spacing: -0.015em; }
        .cr-testi-meta { font-size: 11.5px; color: #94a3b8; margin-top: 2px; }

        /* ══════════════════════════════════════════════════
           PROCESS CARDS
        ══════════════════════════════════════════════════ */
        .cr-process { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 48px; }
        @media(max-width:700px){ .cr-process { grid-template-columns: 1fr; } }

        .cr-process-card {
          background: white; border-radius: 20px; border: 1.5px solid #e0e7ff;
          padding: 34px 28px; position: relative; overflow: hidden;
          box-shadow: 0 2px 16px rgba(29,58,143,0.06);
        }
        .cr-process-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#1d3a8f,#4668f5); }
        .cr-process-num {
          width: 46px; height: 46px; border-radius: 13px;
          background: linear-gradient(135deg,#1a3585,#3b5bdb);
          color: white; font-size: 18px; font-weight: 900;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 22px; box-shadow: 0 4px 14px rgba(29,58,143,0.28);
          font-family: inherit;
        }
        .cr-process-title { font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 10px; letter-spacing: -0.022em; }
        .cr-process-desc { font-size: 13px; color: #64748b; line-height: 1.72; }

        /* ══════════════════════════════════════════════════
           CTA BANNER
        ══════════════════════════════════════════════════ */
        .cr-cta-banner {
          background: linear-gradient(135deg, #0a1628 0%, #1a3585 60%, #2d4fd4 100%);
          border-radius: 24px; padding: 52px 44px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 28px; flex-wrap: wrap;
          box-shadow: 0 16px 56px rgba(15,23,42,0.22);
          position: relative; overflow: hidden;
        }
        .cr-cta-banner::before {
          content: ''; position: absolute; top: -40%; right: -5%; width: 400px; height: 400px;
          border-radius: 50%; background: radial-gradient(circle, rgba(70,104,245,0.3) 0%, transparent 65%);
          pointer-events: none;
        }
        .cr-cta-content { position: relative; }
        .cr-cta-title { font-size: 28px; font-weight: 900; color: white; letter-spacing: -0.035em; margin-bottom: 10px; }
        .cr-cta-sub { font-size: 15px; color: rgba(255,255,255,0.62); line-height: 1.68; max-width: 480px; }
        .cr-cta-actions { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; position: relative; }
        .cr-btn-white {
          display: inline-flex; align-items: center; gap: 8px;
          background: white; color: #1d3a8f; padding: 14px 28px; border-radius: 13px; border: none;
          font-size: 14px; font-weight: 700; cursor: pointer; transition: all .22s;
          box-shadow: 0 4px 18px rgba(0,0,0,0.16); font-family: inherit;
        }
        .cr-btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.22); }
        .cr-btn-outline-white {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.1); color: white; padding: 14px 24px; border-radius: 13px;
          font-size: 14px; font-weight: 700; cursor: pointer; transition: all .22s; font-family: inherit;
          border: 1.5px solid rgba(255,255,255,0.2); text-decoration: none;
        }
        .cr-btn-outline-white:hover { background: rgba(255,255,255,0.17); border-color: rgba(255,255,255,0.35); }

        /* open cta strip */
        .cr-open-cta {
          margin-top: 28px; background: white; border-radius: 16px; border: 1.5px solid #e0e7ff;
          padding: 20px 24px; display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap; box-shadow: 0 2px 10px rgba(29,58,143,0.05);
        }
        .cr-open-cta-title { font-size: 14.5px; font-weight: 800; color: #0f172a; margin-bottom: 3px; letter-spacing: -0.015em; }
        .cr-open-cta-sub { font-size: 12.5px; color: #64748b; }
        .cr-btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 10px; font-size: 13px; font-weight: 700;
          background: white; color: #1d3a8f; border: 1.5px solid #c7d2fe; cursor: pointer;
          font-family: inherit; flex-shrink: 0; transition: all .18s;
        }
        .cr-btn-ghost:hover { background: #eef2ff; border-color: #1d3a8f; }

        /* ══════════════════════════════════════════════════
           DRAWER / FORM
        ══════════════════════════════════════════════════ */
        .cr-backdrop { position:fixed; inset:0; z-index:998; background:rgba(10,22,40,0.5); backdrop-filter:blur(4px); animation:cr-fade-bg .22s ease both; }
        .cr-drawer {
          position:fixed; top:0; right:0; bottom:0; z-index:999;
          width:min(560px,100vw); background:white;
          box-shadow:-10px 0 56px rgba(10,22,40,0.16);
          display:flex; flex-direction:column;
          animation:cr-slide-in .3s cubic-bezier(.16,1,.3,1) both;
        }
        .cr-drawer-header {
          padding:22px 26px 20px; border-bottom:1px solid #f1f5f9; flex-shrink:0;
          display:flex; align-items:flex-start; justify-content:space-between; gap:14px;
        }
        .cr-drawer-eyebrow { display:flex; align-items:center; gap:7px; font-size:11px; font-weight:800; color:#15803d; letter-spacing:.065em; text-transform:uppercase; margin-bottom:5px; }
        .cr-drawer-title { font-size:20px; font-weight:900; color:#0f172a; letter-spacing:-0.03em; margin-bottom:3px; }
        .cr-drawer-sub { font-size:12.5px; color:#94a3b8; font-weight:500; }
        .cr-close-btn {
          width:34px; height:34px; border-radius:10px; border:1.5px solid #e2e8f0;
          background:white; cursor:pointer; display:flex; align-items:center; justify-content:center;
          color:#94a3b8; flex-shrink:0; transition:all .16s;
        }
        .cr-close-btn:hover { background:#f8fafc; border-color:#cbd5e1; color:#374151; }
        .cr-drawer-body { flex:1; overflow-y:auto; padding:22px 26px 36px; scrollbar-width:thin; scrollbar-color:#e2e8f0 transparent; }
        .cr-drawer-body::-webkit-scrollbar { width:4px; }
        .cr-drawer-body::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:99px; }

        .cr-form { display:flex; flex-direction:column; gap:16px; }
        .cr-field { display:flex; flex-direction:column; gap:6px; }
        .cr-label { font-size:12px; font-weight:700; color:#374151; }
        .cr-req { color:#ef4444; }
        .cr-opt { font-size:11px; font-weight:500; color:#94a3b8; }
        .cr-input {
          width:100%; border:1.5px solid #e2e8f0; border-radius:10px;
          padding:10px 13px; font-size:13.5px; color:#0f172a;
          outline:none; background:#fff; font-family:inherit;
          transition:border-color .16s, box-shadow .16s;
        }
        .cr-input:focus { border-color:#1d3a8f; box-shadow:0 0 0 3px rgba(29,58,143,0.08); }
        .cr-select { appearance:none; cursor:pointer; padding-right:36px; }
        .cr-select-arrow { position:absolute; right:12px; top:50%; transform:translateY(-50%); pointer-events:none; color:#94a3b8; }
        .cr-textarea {
          width:100%; border:1.5px solid #e2e8f0; border-radius:10px; padding:10px 13px;
          font-size:13.5px; color:#0f172a; outline:none; background:#fff; font-family:inherit;
          resize:vertical; line-height:1.65; transition:border-color .16s, box-shadow .16s;
        }
        .cr-textarea:focus { border-color:#1d3a8f; box-shadow:0 0 0 3px rgba(29,58,143,0.08); }
        .cr-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .cr-divider { height:1px; background:#f1f5f9; }
        .cr-role-chips { display:flex; gap:5px; flex-wrap:wrap; margin-top:8px; }
        .cr-chip-gray { font-size:10.5px; font-weight:600; color:#6b7280; background:#f4f6fb; border:1px solid #e8ecf5; padding:2px 9px; border-radius:99px; }

        /* upload */
        .cr-upload { border:2px dashed #e2e8f0; border-radius:12px; padding:22px 16px; text-align:center; cursor:pointer; background:#fafbff; transition:all .18s; }
        .cr-upload:hover { border-color:#c7d2fe; background:#f0f4ff; }
        .cr-upload-done { border-color:#86efac; background:#f0fdf4; }
        .cr-upload-done:hover { border-color:#4ade80; }
        .cr-upload-file { display:flex; align-items:center; justify-content:center; gap:10px; }
        .cr-upload-file-icon { width:36px; height:36px; border-radius:10px; background:#dcfce7; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .cr-upload-name { font-size:13px; font-weight:700; color:#166534; text-align:left; }
        .cr-upload-size { font-size:11px; color:#4ade80; text-align:left; }
        .cr-upload-icon-wrap { width:38px; height:38px; border-radius:11px; background:#f1f5f9; display:flex; align-items:center; justify-content:center; margin:0 auto 8px; }
        .cr-upload-text { font-size:13px; font-weight:600; color:#374151; }
        .cr-upload-hint { font-size:11.5px; color:#9ca3af; margin-top:3px; }

        /* submit */
        .cr-submit-btn {
          background:linear-gradient(135deg,#1a3585,#2d4fd4 55%,#4668f5);
          color:white; border:none; border-radius:12px;
          padding:13.5px 20px; font-size:14.5px; font-weight:800;
          cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
          font-family:inherit; letter-spacing:-0.015em;
          transition:opacity .18s, transform .18s; margin-top:4px;
          box-shadow:0 4px 18px rgba(29,58,143,0.3);
        }
        .cr-submit-btn:hover { opacity:.9; transform:translateY(-1px); }
        .cr-submit-btn:disabled { background:#93c5fd; cursor:not-allowed; transform:none; box-shadow:none; }
        .cr-spinner { animation:cr-spin .7s linear infinite; }
        .cr-form-note { font-size:11px; color:#cbd5e1; text-align:center; }

        /* error / success */
        .cr-error { background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; padding:11px 14px; color:#be123c; font-size:13px; font-weight:600; }
        .cr-success { text-align:center; padding:56px 16px; }
        .cr-success-icon { width:64px; height:64px; border-radius:50%; background:#f0fdf4; border:2px solid #bbf7d0; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
        .cr-success-title { font-size:21px; font-weight:900; color:#0f172a; margin-bottom:12px; letter-spacing:-0.025em; }
        .cr-success-body { font-size:14px; color:#64748b; line-height:1.78; max-width:320px; margin:0 auto 30px; }

        /* ══════════════════════════════════════════════════
           RESPONSIVE — MOBILE
        ══════════════════════════════════════════════════ */
        @media(max-width:600px){
          .cr-hero { padding: 100px 18px 56px; }
          .cr-hero-sub { font-size:15.5px; margin-bottom:30px; }
          .cr-hero-actions { flex-direction:column; width:100%; gap:10px; }
          .cr-hero-actions .cr-btn-primary,
          .cr-hero-actions .cr-btn-secondary { width:100%; justify-content:center; }
          .cr-hero-stats { display:grid; grid-template-columns:1fr 1fr; width:100%; margin-top:36px; }
          .cr-stat { padding:16px 12px; border-right:none; border-bottom:1px solid #f1f5f9; }
          .cr-stat:nth-child(odd) { border-right:1px solid #f1f5f9; }
          .cr-stat:nth-last-child(-n+2) { border-bottom:none; }
          .cr-sec, .cr-sec-alt { padding: 52px 16px; }
          .cr-inner { padding: 0 16px; }
          .cr-sec-title { font-size:clamp(22px,6.5vw,34px); }
          .cr-filters { flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none; -webkit-overflow-scrolling:touch; padding-bottom:6px; margin-bottom:22px; }
          .cr-filters::-webkit-scrollbar { display:none; }
          .cr-dept-btn { flex-shrink:0; }
          .cr-perks-grid { grid-template-columns:1fr; margin-top:28px; gap:12px; }
          .cr-testimonials-grid { grid-template-columns:1fr; gap:12px; }
          .cr-open-cta { flex-direction:column; align-items:stretch; gap:12px; }
          .cr-btn-ghost { width:100%; justify-content:center; }
          .cr-cta-banner { padding:30px 20px; flex-direction:column; align-items:center; text-align:center; border-radius:20px; }
          .cr-cta-title { font-size:22px; }
          .cr-cta-sub { font-size:13.5px; max-width:100%; }
          .cr-cta-actions { flex-direction:column; width:100%; }
          .cr-btn-white, .cr-btn-outline-white { width:100%; justify-content:center; }
          .cr-drawer { top:auto; left:0; right:0; bottom:0; width:100%; height:92vh; border-radius:22px 22px 0 0; animation:cr-slide-up .3s cubic-bezier(.16,1,.3,1) both; }
          .cr-drawer::before { content:''; display:block; width:40px; height:4px; background:#e2e8f0; border-radius:99px; margin:12px auto 0; flex-shrink:0; }
          .cr-drawer-header { padding:10px 18px 16px; }
          .cr-drawer-body { padding:16px 18px 52px; }
        }
        @media(max-width:480px){
          .cr-grid-2 { grid-template-columns:1fr; }
          .cr-hero { padding:88px 14px 44px; }
          .cr-hero-badge { margin-bottom:18px; }
          .cr-stat-val { font-size:20px; }
          .cr-role-card { border-radius:16px; }
          .cr-process-card { padding:26px 20px; }
          .cr-perk-card { padding:22px 18px; }
          .cr-testi-card { padding:22px 18px; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="cr-hero">
        <div className="cr-hero-blob1" />
        <div className="cr-hero-blob2" />
        <div className="cr-hero-blob3" />
        <div className="cr-hero-grid" />

        <div className="cr-hero-inner">
          <div className="cr-hero-badge">
            <span className="cr-live-dot" />
            <span className="cr-hero-badge-text">We&apos;re hiring — {ROLES.length} open internship roles</span>
          </div>

          <h1 className="cr-hero-h1">
            Come build something<br />
            <span className="cr-grad">real at Jobingen.</span>
          </h1>

          <p className="cr-hero-sub">
            Not a sit-and-shadow internship. You ship code, design, or content to real users
            from week one — with direct mentorship from founders.
          </p>

          <div className="cr-hero-actions">
            <button className="cr-btn-primary" onClick={() => setApplyRole(ROLES[0].id)}>
              Apply Now
              <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#open-roles" className="cr-btn-secondary">
              Browse Roles
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </a>
          </div>

          <div className="cr-hero-stats">
            {[
              { val: `${ROLES.length}`,  label: "Open Roles" },
              { val: "100%",             label: "Remote" },
              { val: "LOR",              label: "On Exit" },
              { val: "PPO",              label: "Top Interns" },
            ].map((s, i) => (
              <div className="cr-stat" key={i}>
                <div className="cr-stat-val">{s.val}</div>
                <div className="cr-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HACKATHON SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="cr-hack">
        <div className="cr-hack-glow1" />
        <div className="cr-hack-glow2" />
        <div className="cr-hack-inner">
          <Reveal>
            <div className="cr-hack-badge">
              <span className="cr-hack-fire">🔥</span>
              Open Hackathon — Internship Offer Inside
            </div>

            <h2 className="cr-hack-h2">
              Ye open hackathon hai.<br />
              <span className="cr-hack-accent">Jeeto, intern bano.</span>
            </h2>

            <p className="cr-hack-sub">
              Normal apply mat karo — <strong style={{ color: "rgba(255,255,255,0.85)" }}>hackathon mein participate karo.</strong> Jobingen ka
              AI Content Creation Engine banao, best performers ko seedha <strong style={{ color: "rgba(255,255,255,0.85)" }}>AI Engineer Intern ka offer</strong> milega.
              No resume screening. Code se prove karo.
            </p>
          </Reveal>

          <div className="cr-hack-layout">
            {/* Left — challenge + CTA */}
            <div>
              <Reveal delay={60}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: ".09em", textTransform: "uppercase", marginBottom: 12 }}>
                  Challenge: Build all 8 modules
                </div>
                <div className="cr-hack-chips">
                  {[
                    "🤖 Persona Engine",
                    "📅 Content Planner",
                    "✍️ Copy Generator",
                    "🔍 Critic / QA Pass",
                    "🎨 Design Renderer",
                    "🗄️ Content Store",
                    "📤 Approval Queue",
                    "⚙️ Orchestrator",
                  ].map(c => (
                    <span key={c} className="cr-hack-chip">
                      <span className="cr-hack-chip-dot" />
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="cr-hack-cta">
                  <a href="/hackathon" className="cr-btn-hack-primary">
                    Register for Hackathon
                    <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href="/hackathon" className="cr-btn-hack-secondary">
                    View Problem Statement
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right — prize box */}
            <Reveal delay={80}>
              <div className="cr-hack-prize">
                <div className="cr-hack-prize-header">
                  <div className="cr-hack-prize-icon">🏆</div>
                  <div>
                    <div className="cr-hack-prize-tag">Grand Prize</div>
                    <div className="cr-hack-prize-title">AI Engineer Intern Offer</div>
                  </div>
                </div>

                <div className="cr-hack-prize-body">
                  {[
                    { icon: "⏱️", text: "<strong>6–8 weeks</strong> paid internship — work directly with the founding team" },
                    { icon: "🌐", text: "<strong>100% remote</strong> — work from anywhere in India, flexible hours" },
                    { icon: "📜", text: "<strong>Certificate + LOR</strong> — strong letter of recommendation on exit" },
                    { icon: "⚡", text: "<strong>PPO consideration</strong> — top performers get a pre-placement offer" },
                    { icon: "🚀", text: "Your code ships to <strong>real users</strong> from Week 1 — no busywork" },
                  ].map((item, i) => (
                    <div key={i} className="cr-hack-prize-item">
                      <div className="cr-hack-prize-bullet">
                        <svg width="10" height="10" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="cr-hack-prize-text" dangerouslySetInnerHTML={{ __html: item.text }} />
                    </div>
                  ))}
                </div>

                <div className="cr-hack-prize-footer">
                  <span className="cr-hack-spots">
                    <span className="cr-hack-spots-dot" />
                    Limited spots — best 2–3 participants get the offer
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TICKER
      ══════════════════════════════════════════════════════ */}
      <div className="cr-ticker">
        <div className="cr-ticker-track">
          {[...Array(2)].flatMap(() => [
            "🚀 Ship real products",
            "📜 Certificate + LOR",
            "⚡ PPO for top interns",
            "🧑‍💻 Work with founders",
            "🌐 100% Remote",
            "💬 1-on-1 mentorship",
            "🕐 Flexible hours",
            "🤖 AI-first projects",
          ]).map((item, i) => (
            <span key={i} className="cr-ticker-item">
              <span className="cr-ticker-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          OPEN ROLES
      ══════════════════════════════════════════════════════ */}
      <section className="cr-sec" id="open-roles">
        <div className="cr-inner">
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 6 }}>
              <div>
                <div className="cr-eyebrow"><span className="cr-eyebrow-line" /> Open Positions</div>
                <h2 className="cr-sec-title">Internship Roles</h2>
                <p className="cr-sec-sub">One common form for all roles — pick your role, apply once.</p>
              </div>
              <button
                className="cr-btn-primary"
                onClick={() => setApplyRole(ROLES[0].id)}
                style={{ flexShrink: 0, padding: "10px 22px", fontSize: "13px" }}
              >
                Common Apply Form
                <svg width="12" height="12" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="cr-filters">
              {DEPTS.map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDept(d)}
                  className={`cr-dept-btn ${activeDept === d ? "cr-dept-btn-active" : "cr-dept-btn-inactive"}`}
                >
                  {d}&nbsp;({d === "All" ? ROLES.length : ROLES.filter(r => r.dept === d).length})
                </button>
              ))}
            </div>
          </Reveal>

          <div className="cr-roles-grid">
            {filtered.map((role, i) => (
              <Reveal key={role.id} delay={i * 55}>
                <RoleCard role={role} onApply={id => setApplyRole(id)} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="cr-open-cta">
              <div>
                <div className="cr-open-cta-title">Don&apos;t see your role? Apply anyway.</div>
                <div className="cr-open-cta-sub">Open applications always welcome — we reach out when the right fit opens up.</div>
              </div>
              <button className="cr-btn-ghost" onClick={() => setApplyRole(ROLES[0].id)}>
                Open Application
                <svg width="11" height="11" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY JOBINGEN
      ══════════════════════════════════════════════════════ */}
      <section className="cr-sec-alt">
        <div className="cr-inner">
          <Reveal>
            <div className="cr-eyebrow"><span className="cr-eyebrow-line" /> Intern Life</div>
            <h2 className="cr-sec-title">Why intern at Jobingen?</h2>
            <p className="cr-sec-sub">Not your average internship. We treat interns like early employees from day one.</p>
          </Reveal>

          <div className="cr-perks-grid">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={i * 55}>
                <div className="cr-perk-card">
                  <div className="cr-perk-icon-wrap">{p.icon}</div>
                  <div className="cr-perk-title">{p.title}</div>
                  <div className="cr-perk-desc">{p.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="cr-sec">
        <div className="cr-inner">
          <Reveal>
            <div className="cr-eyebrow"><span className="cr-eyebrow-line" /> Intern Stories</div>
            <h2 className="cr-sec-title">Straight from our interns</h2>
            <p className="cr-sec-sub">Real experiences from people who built real things here.</p>
          </Reveal>

          <div className="cr-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <div className="cr-testi-card">
                  <svg className="cr-testi-quote-icon" width="28" height="20" fill="currentColor" viewBox="0 0 28 20">
                    <path d="M0 20V12.4C0 5.467 3.733.8 11.2 0l1.4 2.4C9.2 3.333 7.467 5.2 7 8h5V20H0zm16 0V12.4C16 5.467 19.733.8 27.2 0l1.4 2.4C25.2 3.333 23.467 5.2 23 8h5V20H16z"/>
                  </svg>
                  <p className="cr-testi-quote">{t.quote}</p>
                  <div className="cr-testi-footer">
                    <div className="cr-testi-avatar" style={{ background: t.color }}>{t.avatar}</div>
                    <div>
                      <div className="cr-testi-name">{t.name}</div>
                      <div className="cr-testi-meta">{t.role} · {t.college}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW TO APPLY
      ══════════════════════════════════════════════════════ */}
      <section className="cr-sec-alt">
        <div className="cr-inner">
          <Reveal>
            <div className="cr-eyebrow"><span className="cr-eyebrow-line" /> Process</div>
            <h2 className="cr-sec-title">How to apply</h2>
            <p className="cr-sec-sub">Three simple steps. Takes less than 5 minutes.</p>
          </Reveal>

          <div className="cr-process">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <div className="cr-process-card">
                  <div className="cr-process-num">{s.num}</div>
                  <div className="cr-process-title">{s.title}</div>
                  <div className="cr-process-desc">{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="cr-sec">
        <div className="cr-inner">
          <Reveal>
            <div className="cr-cta-banner">
              <div className="cr-cta-content">
                <div className="cr-cta-title">Ready to build something real?</div>
                <div className="cr-cta-sub">
                  Apply today — our team reads every single application.
                  If you&apos;re shortlisted, you&apos;ll hear back within 5–7 days for a quick intro call.
                </div>
              </div>
              <div className="cr-cta-actions">
                <button className="cr-btn-white" onClick={() => setApplyRole(ROLES[0].id)}>
                  Apply Now
                  <svg width="13" height="13" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <a href="#open-roles" className="cr-btn-outline-white">View Roles</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {applyRole && <ApplyDrawer initialRole={applyRole} onClose={() => setApplyRole(null)} />}
    </div>
  )
}
