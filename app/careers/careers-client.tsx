"use client"

import { useState, useRef } from "react"
import React from "react"

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
const ROLES = [
  {
    id: "frontend-engineering-intern",
    title: "Frontend Engineering Intern",
    dept: "Engineering",
    deptColor: "#1d3a8f", deptBg: "#eff6ff",
    stipend: "₹8k–15k/mo", duration: "3–6 months", mode: "Remote",
    desc: "Build user-facing features in Next.js + TypeScript. Your code ships to thousands of students daily.",
    tags: ["Next.js", "TypeScript", "React"],
  },
  {
    id: "backend-engineering-intern",
    title: "Backend Engineering Intern",
    dept: "Engineering",
    deptColor: "#1d3a8f", deptBg: "#eff6ff",
    stipend: "₹8k–15k/mo", duration: "3–6 months", mode: "Remote",
    desc: "Design APIs and data pipelines that power Jobingen's job matching and AI features.",
    tags: ["Node.js", "Supabase", "Postgres"],
  },
  {
    id: "ai-ml-intern",
    title: "AI / ML Engineering Intern",
    dept: "AI & Data",
    deptColor: "#0891b2", deptBg: "#ecfeff",
    stipend: "₹10k–18k/mo", duration: "3–6 months", mode: "Remote",
    desc: "Work on LLMs, RAG pipelines, resume AI, and job-matching models that help students land jobs.",
    tags: ["LLMs", "Python", "RAG"],
  },
  {
    id: "uiux-design-intern",
    title: "UI/UX Design Intern",
    dept: "Design",
    deptColor: "#7c3aed", deptBg: "#f5f3ff",
    stipend: "₹6k–12k/mo", duration: "3–6 months", mode: "Remote",
    desc: "Design screens and flows in Figma. Your designs go directly into production.",
    tags: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: "product-management-intern",
    title: "Product Management Intern",
    dept: "Product",
    deptColor: "#b45309", deptBg: "#fffbeb",
    stipend: "₹6k–10k/mo", duration: "3 months", mode: "Remote",
    desc: "Write PRDs and shape Jobingen's roadmap working directly with the founding team.",
    tags: ["PRDs", "Roadmap", "Strategy"],
  },
  {
    id: "marketing-growth-intern",
    title: "Marketing & Growth Intern",
    dept: "Marketing",
    deptColor: "#dc2626", deptBg: "#fef2f2",
    stipend: "₹5k–8k/mo", duration: "3 months", mode: "Remote",
    desc: "Run campaigns, SEO experiments, and A/B tests to grow Jobingen's user base.",
    tags: ["SEO", "Growth", "Analytics"],
  },
  {
    id: "content-social-intern",
    title: "Content & Social Media Intern",
    dept: "Marketing",
    deptColor: "#dc2626", deptBg: "#fef2f2",
    stipend: "₹4k–7k/mo", duration: "3 months", mode: "Remote",
    desc: "Own Jobingen's voice on LinkedIn and Instagram. Write guides, threads, and newsletters.",
    tags: ["LinkedIn", "Writing", "Instagram"],
  },
  {
    id: "hr-operations-intern",
    title: "HR & Operations Intern",
    dept: "Operations",
    deptColor: "#be185d", deptBg: "#fdf2f8",
    stipend: "₹4k–6k/mo", duration: "3 months", mode: "Remote",
    desc: "Manage candidate pipelines, coordinate interviews, and improve internal ops processes.",
    tags: ["Hiring", "Ops", "Coordination"],
  },
]

const DEPTS = ["All", "Engineering", "AI & Data", "Design", "Product", "Marketing", "Operations"]

const YEAR_OPTIONS = [
  "1st Year", "2nd Year", "3rd Year", "4th Year",
  "Postgrad (MBA/M.Tech/MCA)", "PhD", "Recent Graduate",
]

/* ─────────────────────────────────────────────────────────────────────────────
   APPLY DRAWER
───────────────────────────────────────────────────────────────────────────── */
function ApplyDrawer({ initialRole, onClose }: { initialRole: string; onClose: () => void }) {
  const [selectedRole, setSelectedRole] = useState(initialRole)
  const [name, setName]         = useState("")
  const [email, setEmail]       = useState("")
  const [phone, setPhone]       = useState("")
  const [college, setCollege]   = useState("")
  const [year, setYear]         = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [why, setWhy]           = useState("")
  const [file, setFile]         = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]       = useState("")
  const [success, setSuccess]   = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const role = ROLES.find(r => r.id === selectedRole)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!selectedRole) return setError("Please select a role.")
    if (!name.trim()) return setError("Please enter your full name.")
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email.")
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) return setError("Enter a valid phone number.")
    if (!college.trim()) return setError("Please enter your college.")
    if (!year) return setError("Please select your year of study.")
    if (!file) return setError("Please upload your resume.")

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append("role_id", selectedRole)
      fd.append("role_title", role?.title ?? selectedRole)
      fd.append("name", name.trim())
      fd.append("email", email.trim().toLowerCase())
      fd.append("phone", phone.trim())
      fd.append("college", college.trim())
      fd.append("year", year)
      fd.append("linkedin", linkedin.trim())
      fd.append("portfolio", portfolio.trim())
      fd.append("why", why.trim())
      fd.append("resume", file)

      const res = await fetch("/api/careers/apply", { method: "POST", body: fd })
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 998,
          background: "rgba(15,23,42,0.4)",
          backdropFilter: "blur(3px)",
          animation: "fadeBg 0.22s ease both",
        }}
      />

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 999,
        width: "min(540px, 100vw)",
        background: "white",
        boxShadow: "-8px 0 48px rgba(15,23,42,0.14)",
        display: "flex", flexDirection: "column",
        animation: "slideInRight 0.3s cubic-bezier(0.16,1,0.3,1) both",
      }}>

        {/* Drawer header */}
        <div style={{
          padding: "20px 24px 18px",
          borderBottom: "1px solid #f1f5f9",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: "0.06em", textTransform: "uppercase" }}>Internship Application</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-0.025em" }}>Apply at Jobingen</h2>
            </div>
            <button onClick={onClose} style={{
              width: 34, height: 34, borderRadius: 9, border: "1.5px solid #e2e8f0",
              background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#94a3b8", transition: "all .15s", flexShrink: 0,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1" }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e2e8f0" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 32px" }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "48px 16px" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#f0fdf4", border: "2px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                <svg width="26" height="26" fill="none" viewBox="0 0 40 40"><path d="M10 20L16 26L30 12" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 900, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.025em" }}>Application Sent!</h3>
              <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.75, margin: "0 0 28px", maxWidth: 320, marginLeft: "auto", marginRight: "auto" }}>
                We&apos;ve received your application for <strong style={{ color: "#0f172a" }}>{role?.title}</strong>. Our team reviews every application personally and will reach out within 5–7 days.
              </p>
              <button onClick={onClose} style={{ padding: "11px 26px", borderRadius: 10, background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)", color: "white", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "-0.01em" }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {error && (
                <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 9, padding: "10px 14px", color: "#be123c", fontSize: 13, fontWeight: 600 }}>
                  {error}
                </div>
              )}

              {/* Role select */}
              <FormGroup label="Role you're applying for" required>
                <NativeSelect value={selectedRole} onChange={setSelectedRole}>
                  <option value="" disabled>Select a role…</option>
                  {ROLES.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                </NativeSelect>
                {role && (
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 7 }}>
                    <Chip color={role.deptColor} bg={role.deptBg}>{role.dept}</Chip>
                    <Chip color="#15803d" bg="#f0fdf4">{role.stipend}</Chip>
                    <Chip color="#6b7280" bg="#f4f6fb">{role.duration}</Chip>
                  </div>
                )}
              </FormGroup>

              <Divider />

              {/* Personal info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <FormGroup label="Full Name" required>
                  <TextInput value={name} onChange={setName} placeholder="Rahul Sharma" />
                </FormGroup>
                <FormGroup label="Email" required>
                  <TextInput type="email" value={email} onChange={setEmail} placeholder="rahul@email.com" />
                </FormGroup>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <FormGroup label="Phone" required>
                  <TextInput type="tel" value={phone} onChange={setPhone} placeholder="+91 98765 43210" />
                </FormGroup>
                <FormGroup label="College / University" required>
                  <TextInput value={college} onChange={setCollege} placeholder="IIT Delhi, BITS…" />
                </FormGroup>
              </div>

              <FormGroup label="Year of Study" required>
                <NativeSelect value={year} onChange={setYear}>
                  <option value="" disabled>Select…</option>
                  {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                </NativeSelect>
              </FormGroup>

              <Divider />

              {/* Optional links */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <FormGroup label="LinkedIn">
                  <TextInput value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/rahul" />
                </FormGroup>
                <FormGroup label="Portfolio / GitHub">
                  <TextInput value={portfolio} onChange={setPortfolio} placeholder="github.com/rahul" />
                </FormGroup>
              </div>

              {/* Why */}
              <FormGroup label="Why Jobingen?" note="optional, but it helps">
                <textarea
                  value={why}
                  onChange={e => setWhy(e.target.value)}
                  placeholder="What excites you about this role and what you want to build here…"
                  rows={3}
                  style={{
                    width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 10,
                    padding: "9px 13px", fontSize: 13.5, color: "#0f172a",
                    outline: "none", background: "#fff", boxSizing: "border-box",
                    fontFamily: "inherit", resize: "vertical", lineHeight: 1.6,
                    transition: "border-color .16s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#1d3a8f"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                />
              </FormGroup>

              {/* Resume */}
              <FormGroup label="Resume" required note="PDF, DOC or DOCX · max 10MB">
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: `2px dashed ${file ? "#86efac" : "#e2e8f0"}`,
                    borderRadius: 10, padding: "18px 14px",
                    textAlign: "center", cursor: "pointer",
                    background: file ? "#f0fdf4" : "#fafafa",
                    transition: "all .18s",
                  }}
                  onMouseEnter={e => { if (!file) { (e.currentTarget as HTMLDivElement).style.borderColor = "#c7d2fe"; (e.currentTarget as HTMLDivElement).style.background = "#f5f7ff" } }}
                  onMouseLeave={e => { if (!file) { (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLDivElement).style.background = "#fafafa" } }}
                >
                  <input ref={fileRef} type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    style={{ display: "none" }}
                    onChange={e => setFile(e.target.files?.[0] ?? null)}
                  />
                  {file ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 22 22" stroke="#15803d" strokeWidth="1.5"><rect x="4" y="2" width="14" height="18" rx="2"/><path d="M7.5 7.5H14.5M7.5 11H12M7.5 14.5H13" strokeLinecap="round"/></svg>
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>{file.name}</div>
                        <div style={{ fontSize: 11, color: "#4ade80" }}>{(file.size / 1024).toFixed(1)} KB · tap to change</div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Click to upload resume</div>
                      <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 3 }}>PDF, DOC, DOCX</div>
                    </div>
                  )}
                </div>
              </FormGroup>

              {/* Submit */}
              <button
                type="submit" disabled={submitting}
                style={{
                  background: submitting ? "#93c5fd" : "linear-gradient(135deg,#1d3a8f,#3b5bdb)",
                  color: "white", border: "none", borderRadius: 11,
                  padding: "13px 20px", fontSize: 14.5, fontWeight: 800,
                  cursor: submitting ? "not-allowed" : "pointer",
                  letterSpacing: "-0.015em", marginTop: 4,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "opacity .18s",
                }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.opacity = "0.88" }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
              >
                {submitting ? (
                  <><Spinner /> Submitting…</>
                ) : (
                  <>Submit Application <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                )}
              </button>
              <p style={{ fontSize: 11, color: "#cbd5e1", textAlign: "center", margin: 0 }}>
                We review every application personally. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SMALL REUSABLE PIECES
───────────────────────────────────────────────────────────────────────────── */
function FormGroup({ label, required, note, children }: { label: string; required?: boolean; note?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
        {label}
        {required && <span style={{ color: "#ef4444" }}>*</span>}
        {note && <span style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8" }}>— {note}</span>}
      </label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{
        width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 10,
        padding: "9px 13px", fontSize: 13.5, color: "#0f172a",
        outline: "none", background: "#fff", boxSizing: "border-box",
        fontFamily: "inherit", transition: "border-color .16s",
      }}
      onFocus={e => e.target.style.borderColor = "#1d3a8f"}
      onBlur={e => e.target.style.borderColor = "#e2e8f0"}
    />
  )
}

function NativeSelect({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: "100%", border: `1.5px solid ${focused ? "#1d3a8f" : "#e2e8f0"}`,
          borderRadius: 10, padding: "9px 34px 9px 13px",
          fontSize: 13.5, fontWeight: value ? 500 : 400,
          color: value ? "#0f172a" : "#94a3b8",
          outline: "none", background: "#fff", appearance: "none",
          cursor: "pointer", fontFamily: "inherit", transition: "border-color .16s",
        }}
      >{children}</select>
      <div style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8" }}>
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    </div>
  )
}

function Chip({ children, color, bg }: { children: React.ReactNode; color: string; bg: string }) {
  return (
    <span style={{ fontSize: 10.5, fontWeight: 700, color, background: bg, border: `1px solid ${color}22`, padding: "2px 8px", borderRadius: 99 }}>
      {children}
    </span>
  )
}

function Divider() {
  return <div style={{ height: 1, background: "#f1f5f9", margin: "2px 0" }} />
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.7s linear infinite" }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROLE ROW
───────────────────────────────────────────────────────────────────────────── */
function RoleRow({ role, onApply, index }: { role: typeof ROLES[0]; onApply: (id: string) => void; index: number }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white",
        borderRadius: 14,
        border: hov ? `1.5px solid ${role.deptColor}30` : "1.5px solid #eef0f6",
        padding: "18px 20px",
        display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
        boxShadow: hov ? `0 8px 28px ${role.deptColor}10` : "0 1px 4px rgba(0,0,0,0.03)",
        transform: hov ? "translateX(3px)" : "translateX(0)",
        transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
        cursor: "default",
        animation: `fadeUp 0.38s ease ${index * 0.055}s both`,
      }}
    >
      {/* Left accent */}
      <div style={{ position: "absolute", left: 0, top: 12, bottom: 12, width: 3, borderRadius: 99, background: `linear-gradient(180deg,${role.deptColor},${role.deptColor}55)`, opacity: hov ? 1 : 0, transition: "opacity 0.22s" }} />

      {/* Icon */}
      <div style={{
        width: 42, height: 42, borderRadius: 11, flexShrink: 0,
        background: role.deptBg, border: `1.5px solid ${role.deptColor}20`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: role.deptColor,
        transform: hov ? "scale(1.06)" : "scale(1)",
        transition: "transform 0.22s",
      }}>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {role.dept === "Engineering" && <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>}
          {role.dept === "AI & Data"   && <><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.93 4.93l2.12 2.12m9.9 9.9 2.12 2.12M4.93 19.07l2.12-2.12m9.9-9.9 2.12-2.12"/></>}
          {role.dept === "Design"      && <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></>}
          {role.dept === "Product"     && <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>}
          {role.dept === "Marketing"   && <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>}
          {role.dept === "Operations"  && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>}
        </svg>
      </div>

      {/* Title + desc */}
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: "#0f172a", marginBottom: 3, letterSpacing: "-0.015em" }}>
          {role.title}
        </div>
        <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.55 }}>{role.desc}</div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", flexShrink: 0 }} className="role-tags">
        {role.tags.map(t => (
          <span key={t} style={{ fontSize: 10.5, fontWeight: 600, color: "#6b7280", background: "#f4f6fb", border: "1px solid #e8ecf5", padding: "3px 9px", borderRadius: 99 }}>
            {t}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }} className="role-meta">
        <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>{role.stipend}</span>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>{role.duration} · {role.mode}</span>
      </div>

      {/* Apply button */}
      <button
        onClick={() => onApply(role.id)}
        style={{
          padding: "9px 18px", borderRadius: 9, flexShrink: 0,
          background: hov ? `linear-gradient(135deg,${role.deptColor},${role.deptColor}cc)` : "white",
          color: hov ? "white" : role.deptColor,
          border: `1.5px solid ${role.deptColor}35`,
          fontSize: 12.5, fontWeight: 700, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 5,
          transition: "all 0.22s ease",
          boxShadow: hov ? `0 4px 14px ${role.deptColor}28` : "none",
          whiteSpace: "nowrap",
        }}
      >
        Apply
        <svg width="11" height="11" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────────────────────── */
export function CareersClient() {
  const [applyRole, setApplyRole] = useState<string | null>(null)
  const [activeDept, setActiveDept] = useState("All")

  const filtered = activeDept === "All" ? ROLES : ROLES.filter(r => r.dept === activeDept)

  return (
    <>
      <style>{`
        @keyframes fadeUp       { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeBg       { from{opacity:0} to{opacity:1} }
        @keyframes slideInRight { from{transform:translateX(100%)} to{transform:translateX(0)} }
        @keyframes pulseDot     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.7)} }
        @keyframes spin         { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .role-row { position: relative; }
        @media(max-width:640px) {
          .role-tags { display: none !important; }
          .role-meta { display: none !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO — clean white with blue accent
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "white", borderBottom: "1px solid #eef0f6", paddingTop: 140 }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "52px 24px 56px", textAlign: "center" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 20, padding: "5px 14px", borderRadius: 99, background: "#f0fdf4", border: "1.5px solid #bbf7d0", animation: "fadeUp 0.4s ease both" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "#15803d", letterSpacing: "0.03em" }}>We&apos;re hiring — {ROLES.length} open internship roles</span>
          </div>

          <h1 style={{ fontSize: "clamp(30px,5vw,54px)", fontWeight: 900, color: "#0f172a", margin: "0 0 14px", letterSpacing: "-0.04em", lineHeight: 1.07, animation: "fadeUp 0.4s ease 0.08s both" }}>
            Come build with us at<br />
            <span style={{ background: "linear-gradient(135deg,#1d3a8f 0%,#3b5bdb 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Jobingen.</span>
          </h1>

          <p style={{ fontSize: 16, color: "#64748b", maxWidth: 460, margin: "0 auto 32px", lineHeight: 1.75, fontWeight: 400, animation: "fadeUp 0.4s ease 0.15s both" }}>
            Paid internships, real projects, direct mentorship from founders. 100% remote. Every intern ships something real.
          </p>

          {/* Stats row */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 0, background: "#f8fafc", border: "1.5px solid #eef0f6", borderRadius: 14, overflow: "hidden", animation: "fadeUp 0.4s ease 0.22s both" }}>
            {[
              { val: "8", label: "Open roles" },
              { val: "100%", label: "Remote" },
              { val: "Paid", label: "Stipend" },
              { val: "LOR", label: "On exit" },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div style={{ width: 1, height: 36, background: "#eef0f6" }} />}
                <div style={{ padding: "10px 22px", textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#1d3a8f", letterSpacing: "-0.025em" }}>{s.val}</div>
                  <div style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 600 }}>{s.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PERKS STRIP
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f7f8fc", borderBottom: "1px solid #eef0f6" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 24px", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: "🚀", text: "Ship real products" },
            { icon: "🧑‍💻", text: "Work with founders" },
            { icon: "📜", text: "Certificate + LOR" },
            { icon: "⚡", text: "PPO for top interns" },
            { icon: "💬", text: "1-on-1 mentorship" },
            { icon: "🕐", text: "Flexible hours" },
          ].map(p => (
            <div key={p.text} style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: "1.5px solid #eef0f6", borderRadius: 99, padding: "7px 16px", fontSize: 12.5, fontWeight: 600, color: "#374151", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
              <span>{p.icon}</span>{p.text}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OPEN ROLES
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f4f6fb", padding: "44px 24px 80px", minHeight: "60vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Section header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 19, fontWeight: 900, color: "#0f172a", margin: "0 0 3px", letterSpacing: "-0.025em" }}>Open Roles</h2>
              <p style={{ fontSize: 12.5, color: "#94a3b8", margin: 0 }}>{filtered.length} positions · single common form for all roles</p>
            </div>
            <button
              onClick={() => setApplyRole(ROLES[0].id)}
              style={{
                padding: "9px 18px", borderRadius: 9,
                background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)",
                color: "white", border: "none", fontSize: 12.5, fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                boxShadow: "0 4px 14px rgba(29,58,143,0.22)",
                transition: "opacity .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Apply Now
              <svg width="11" height="11" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Dept filter tabs */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
            {DEPTS.map(d => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                style={{
                  padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700,
                  border: `1.5px solid ${activeDept === d ? "#1d3a8f" : "#e0e7ff"}`,
                  background: activeDept === d ? "#1d3a8f" : "white",
                  color: activeDept === d ? "white" : "#4b5563",
                  cursor: "pointer", transition: "all .15s",
                }}
              >
                {d}
                {d === "All" ? ` (${ROLES.length})` : ` (${ROLES.filter(r => r.dept === d).length})`}
              </button>
            ))}
          </div>

          {/* Role list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
            {filtered.map((role, i) => (
              <div key={role.id} style={{ position: "relative" }}>
                <RoleRow role={role} index={i} onApply={id => setApplyRole(id)} />
              </div>
            ))}
          </div>

          {/* Open application CTA */}
          <div style={{
            marginTop: 32, borderRadius: 16,
            background: "white", border: "1.5px solid #e0e7ff",
            padding: "20px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 14,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 3, letterSpacing: "-0.015em" }}>Don&apos;t see your role? Apply anyway.</div>
              <div style={{ fontSize: 12.5, color: "#64748b" }}>Open applications are always welcome — we reach out when the right fit opens.</div>
            </div>
            <button
              onClick={() => setApplyRole(ROLES[0].id)}
              style={{
                padding: "9px 18px", borderRadius: 9,
                background: "white", color: "#1d3a8f",
                border: "1.5px solid #c7d2fe",
                fontSize: 12.5, fontWeight: 700, cursor: "pointer", flexShrink: 0,
                display: "flex", alignItems: "center", gap: 6,
                transition: "all .15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#1d3a8f" }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#c7d2fe" }}
            >
              Open Application
              <svg width="11" height="11" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Drawer */}
      {applyRole && <ApplyDrawer initialRole={applyRole} onClose={() => setApplyRole(null)} />}
    </>
  )
}
