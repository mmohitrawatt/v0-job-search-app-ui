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
    color: "#1d3a8f",
    bg: "#eff6ff",
    stipend: "₹8,000–15,000/mo",
    duration: "3–6 months",
    mode: "Remote",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    perks: ["Ship real features", "Mentorship", "Certificate"],
    desc: "Build user-facing features for Jobingen's web platform — job cards, search, AI tools, and more. You'll work in Next.js + TypeScript and ship production code that thousands of students use daily.",
  },
  {
    id: "backend-engineering-intern",
    title: "Backend Engineering Intern",
    dept: "Engineering",
    color: "#0f766e",
    bg: "#f0fdfa",
    stipend: "₹8,000–15,000/mo",
    duration: "3–6 months",
    mode: "Remote",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    perks: ["APIs & infra", "Supabase + Postgres", "Certificate"],
    desc: "Design and build APIs, data pipelines, and integrations that power Jobingen's job matching and AI features. Great for students who love working close to the data layer.",
  },
  {
    id: "ai-ml-intern",
    title: "AI / ML Engineering Intern",
    dept: "AI & Data",
    color: "#0891b2",
    bg: "#ecfeff",
    stipend: "₹10,000–18,000/mo",
    duration: "3–6 months",
    mode: "Remote",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.93 4.93l2.12 2.12m9.9 9.9 2.12 2.12M4.93 19.07l2.12-2.12m9.9-9.9 2.12-2.12"/>
      </svg>
    ),
    perks: ["LLMs & RAG", "Resume AI", "Certificate"],
    desc: "Work on Vibe AI, resume tailoring, and job matching models. You'll experiment with LLMs, build retrieval pipelines, and ship AI features that help students land jobs faster.",
  },
  {
    id: "uiux-design-intern",
    title: "UI/UX Design Intern",
    dept: "Design",
    color: "#7c3aed",
    bg: "#f5f3ff",
    stipend: "₹6,000–12,000/mo",
    duration: "3–6 months",
    mode: "Remote",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    perks: ["Figma prototypes", "Real user testing", "Portfolio-worthy"],
    desc: "Design screens, components, and flows for Jobingen's mobile and web app. You'll do user research, create wireframes, and hand off Figma designs that devs ship directly.",
  },
  {
    id: "product-management-intern",
    title: "Product Management Intern",
    dept: "Product",
    color: "#b45309",
    bg: "#fffbeb",
    stipend: "₹6,000–10,000/mo",
    duration: "3 months",
    mode: "Remote",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    perks: ["Work with founders", "PRDs & roadmap", "Certificate"],
    desc: "Define features, write PRDs, and work directly with the founding team to shape Jobingen's roadmap. You'll learn what it means to make product decisions under real constraints.",
  },
  {
    id: "marketing-growth-intern",
    title: "Marketing & Growth Intern",
    dept: "Marketing",
    color: "#dc2626",
    bg: "#fef2f2",
    stipend: "₹5,000–8,000/mo",
    duration: "3 months",
    mode: "Remote",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    perks: ["SEO & paid ads", "Growth experiments", "Certificate"],
    desc: "Run campaigns, A/B tests, and SEO experiments to grow Jobingen's user base. You'll own channels end-to-end and see the direct impact of your work in the dashboards.",
  },
  {
    id: "content-social-intern",
    title: "Content & Social Media Intern",
    dept: "Content",
    color: "#0891b2",
    bg: "#ecfeff",
    stipend: "₹4,000–7,000/mo",
    duration: "3 months",
    mode: "Remote",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    perks: ["LinkedIn & Instagram", "Blog & newsletters", "Build following"],
    desc: "Create content that helps students navigate careers — interview tips, company breakdowns, salary guides. You'll own the voice of Jobingen across LinkedIn, Instagram, and our blog.",
  },
  {
    id: "hr-operations-intern",
    title: "HR & Operations Intern",
    dept: "HR & Ops",
    color: "#be185d",
    bg: "#fdf2f8",
    stipend: "₹4,000–6,000/mo",
    duration: "3 months",
    mode: "Remote",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    perks: ["Hiring & screening", "Ops processes", "Certificate"],
    desc: "Help us build the team. You'll manage candidate pipelines, coordinate interviews, and improve internal ops processes. Ideal for students interested in people & culture or business operations.",
  },
]

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgrad (MBA/M.Tech/MCA)", "PhD", "Recent Graduate (within 1 year)"]

/* ─────────────────────────────────────────────────────────────────────────────
   ROLE CARD
───────────────────────────────────────────────────────────────────────────── */
function RoleCard({ role, onApply, index }: {
  role: typeof ROLES[0]; onApply: (roleId: string) => void; index: number
}) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white",
        borderRadius: 20,
        border: hov ? `1.5px solid ${role.color}35` : "1.5px solid #eef0f6",
        boxShadow: hov ? `0 20px 56px ${role.color}14` : "0 2px 12px rgba(0,0,0,0.05)",
        overflow: "hidden",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        animation: `fadeUp 0.45s ease ${index * 0.07}s both`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top band */}
      <div style={{
        height: 80,
        background: `linear-gradient(135deg,${role.color}15 0%,${role.color}06 100%)`,
        borderBottom: `1px solid ${role.color}12`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `linear-gradient(135deg,${role.color}22,${role.color}10)`,
          border: `1.5px solid ${role.color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: role.color,
          boxShadow: `0 4px 14px ${role.color}20`,
          transform: hov ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
          flexShrink: 0,
        }}>
          {role.icon}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 99, padding: "4px 11px" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: "#15803d" }}>Hiring Now</span>
        </div>
        {/* Decorative circle */}
        <div style={{ position: "absolute", bottom: -24, right: -16, width: 70, height: 70, borderRadius: "50%", background: `${role.color}08` }} />
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: role.color, background: role.bg, border: `1px solid ${role.color}20`, padding: "3px 9px", borderRadius: 99, display: "inline-block", marginBottom: 10, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {role.dept}
        </span>

        <h3 style={{ fontSize: 15.5, fontWeight: 800, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          {role.title}
        </h3>

        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, margin: "0 0 14px", flex: 1 }}>
          {role.desc}
        </p>

        {/* Meta chips */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#15803d", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "3px 9px", borderRadius: 99 }}>
            {role.stipend}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", background: "#f4f6fb", border: "1px solid #eef0f6", padding: "3px 9px", borderRadius: 99 }}>
            {role.duration}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#0891b2", background: "#ecfeff", border: "1px solid #a5f3fc", padding: "3px 9px", borderRadius: 99 }}>
            {role.mode}
          </span>
        </div>

        {/* Perks */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
          {role.perks.map(p => (
            <span key={p} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#374151", background: "#f8fafc", border: "1px solid #eef0f6", padding: "3px 9px", borderRadius: 99 }}>
              <svg width="8" height="8" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {p}
            </span>
          ))}
        </div>

        <button
          onClick={() => onApply(role.id)}
          style={{
            width: "100%", padding: "12px 0", borderRadius: 12,
            background: hov ? `linear-gradient(135deg,${role.color},${role.color}cc)` : "white",
            color: hov ? "white" : role.color,
            border: `1.5px solid ${role.color}35`,
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            transition: "all 0.25s ease",
            boxShadow: hov ? `0 6px 20px ${role.color}28` : "none",
            letterSpacing: "-0.01em",
          }}
        >
          Apply for this Role
          <svg width="12" height="12" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FORM FIELD
───────────────────────────────────────────────────────────────────────────── */
function Field({ label, value, onChange, placeholder, type = "text", required = false }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{ fontSize: 12.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6, letterSpacing: "-0.005em" }}>
        {label}{required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          border: `1.5px solid ${focused ? "#1d3a8f" : "#e2e8f0"}`,
          borderRadius: 10,
          padding: "10px 14px",
          fontSize: 14,
          color: "#0f172a",
          outline: "none",
          background: "#fff",
          boxSizing: "border-box",
          fontFamily: "inherit",
          transition: "border-color .18s",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   APPLY MODAL
───────────────────────────────────────────────────────────────────────────── */
function ApplyModal({ initialRole, onClose }: { initialRole: string; onClose: () => void }) {
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
  const [whyFocused, setWhyFocused] = useState(false)
  const [yearFocused, setYearFocused] = useState(false)
  const [roleFocused, setRoleFocused] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const selectedRoleData = ROLES.find(r => r.id === selectedRole)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!selectedRole) return setError("Please select a role.")
    if (!name.trim()) return setError("Please enter your full name.")
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.")
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) return setError("Please enter a valid phone number.")
    if (!college.trim()) return setError("Please enter your college / university.")
    if (!year) return setError("Please select your year of study.")
    if (!file) return setError("Please upload your resume.")

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append("role_id", selectedRole)
      fd.append("role_title", selectedRoleData?.title ?? selectedRole)
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
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    /* Backdrop */
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        animation: "fadeIn 0.18s ease both",
      }}
    >
      <div style={{
        background: "white",
        borderRadius: 22,
        width: "100%",
        maxWidth: 620,
        maxHeight: "92vh",
        overflowY: "auto",
        boxShadow: "0 32px 96px rgba(15,23,42,0.22)",
        animation: "slideUp 0.28s cubic-bezier(0.16,1,0.3,1) both",
        scrollbarWidth: "thin",
        scrollbarColor: "#e2e8f0 transparent",
      }}>
        {/* Header */}
        <div style={{
          padding: "24px 28px 20px",
          borderBottom: "1px solid #f1f5f9",
          position: "sticky", top: 0, background: "white",
          borderRadius: "22px 22px 0 0",
          zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.06em" }}>Internship Application</span>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-0.03em" }}>
                Apply at Jobingen
              </h2>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0", fontWeight: 500 }}>
                One form — all roles. Select your preferred role below.
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: 10, border: "1.5px solid #e2e8f0",
                background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#94a3b8", transition: "all .15s", flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#374151" }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#94a3b8" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        {success ? (
          <div style={{ padding: "48px 28px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#f0fdf4", border: "2px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none"><path d="M10 20L16 26L30 12" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.025em" }}>Application Submitted!</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, maxWidth: 360, margin: "0 auto 28px" }}>
              We&apos;ve received your application for <strong style={{ color: "#0f172a" }}>{selectedRoleData?.title}</strong>. Our team will review it and reach out within 5–7 days.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: "12px 28px", borderRadius: 12,
                background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)",
                color: "white", border: "none", fontSize: 14, fontWeight: 700,
                cursor: "pointer", letterSpacing: "-0.01em",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
            {error && (
              <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 10, padding: "11px 16px", color: "#be123c", fontSize: 13.5, fontWeight: 600 }}>
                {error}
              </div>
            )}

            {/* Role selector */}
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6, letterSpacing: "-0.005em" }}>
                Role you&apos;re applying for <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <select
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value)}
                  onFocus={() => setRoleFocused(true)}
                  onBlur={() => setRoleFocused(false)}
                  style={{
                    width: "100%",
                    border: `1.5px solid ${roleFocused ? "#1d3a8f" : "#e2e8f0"}`,
                    borderRadius: 10,
                    padding: "10px 36px 10px 14px",
                    fontSize: 14, fontWeight: 600,
                    color: selectedRole ? "#0f172a" : "#94a3b8",
                    outline: "none",
                    background: "#fff",
                    appearance: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "border-color .18s",
                  }}
                >
                  <option value="" disabled>Select a role…</option>
                  {ROLES.map(r => (
                    <option key={r.id} value={r.id}>{r.title} — {r.dept}</option>
                  ))}
                </select>
                <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>

              {/* Inline meta of selected role */}
              {selectedRoleData && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#15803d", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "2px 9px", borderRadius: 99 }}>{selectedRoleData.stipend}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", background: "#f4f6fb", border: "1px solid #eef0f6", padding: "2px 9px", borderRadius: 99 }}>{selectedRoleData.duration}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#0891b2", background: "#ecfeff", border: "1px solid #a5f3fc", padding: "2px 9px", borderRadius: 99 }}>{selectedRoleData.mode}</span>
                </div>
              )}
            </div>

            <div style={{ height: 1, background: "#f1f5f9" }} />

            {/* Name + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Full Name" value={name} onChange={setName} placeholder="Rahul Sharma" required />
              <Field label="Email Address" value={email} onChange={setEmail} placeholder="rahul@email.com" type="email" required />
            </div>

            {/* Phone + College */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Phone Number" value={phone} onChange={setPhone} placeholder="+91 98765 43210" type="tel" required />
              <Field label="College / University" value={college} onChange={setCollege} placeholder="IIT Delhi, BITS Pilani…" required />
            </div>

            {/* Year of Study */}
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>
                Year of Study <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <select
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  onFocus={() => setYearFocused(true)}
                  onBlur={() => setYearFocused(false)}
                  style={{
                    width: "100%",
                    border: `1.5px solid ${yearFocused ? "#1d3a8f" : "#e2e8f0"}`,
                    borderRadius: 10,
                    padding: "10px 36px 10px 14px",
                    fontSize: 14, fontWeight: year ? 500 : 400,
                    color: year ? "#0f172a" : "#94a3b8",
                    outline: "none",
                    background: "#fff",
                    appearance: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "border-color .18s",
                  }}
                >
                  <option value="" disabled>Select year…</option>
                  {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* LinkedIn + Portfolio */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="LinkedIn Profile" value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/rahul" />
              <Field label="Portfolio / GitHub" value={portfolio} onChange={setPortfolio} placeholder="github.com/rahul" />
            </div>

            {/* Why Jobingen? */}
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>
                Why do you want to intern at Jobingen?
                <span style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8", marginLeft: 6 }}>optional — but helps a lot</span>
              </label>
              <textarea
                value={why}
                onChange={e => setWhy(e.target.value)}
                placeholder="Tell us what excites you about the role and how you can contribute…"
                rows={3}
                onFocus={() => setWhyFocused(true)}
                onBlur={() => setWhyFocused(false)}
                style={{
                  width: "100%",
                  border: `1.5px solid ${whyFocused ? "#1d3a8f" : "#e2e8f0"}`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 14,
                  color: "#0f172a",
                  outline: "none",
                  background: "#fff",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  resize: "vertical",
                  lineHeight: 1.6,
                  transition: "border-color .18s",
                }}
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label style={{ fontSize: 12.5, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>
                Upload Resume <span style={{ color: "#ef4444" }}>*</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8", marginLeft: 6 }}>PDF, DOC or DOCX — max 10MB</span>
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `2px dashed ${file ? "#bbf7d0" : "#e2e8f0"}`,
                  borderRadius: 12,
                  padding: "20px 16px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: file ? "#f0fdf4" : "#fafafa",
                  transition: "all .2s",
                }}
                onMouseEnter={e => { if (!file) { (e.currentTarget as HTMLDivElement).style.borderColor = "#1d3a8f40"; (e.currentTarget as HTMLDivElement).style.background = "#f5f7ff" } }}
                onMouseLeave={e => { if (!file) { (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLDivElement).style.background = "#fafafa" } }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  style={{ display: "none" }}
                  onChange={e => setFile(e.target.files?.[0] ?? null)}
                />
                {file ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 22 22" fill="none" style={{ color: "#15803d" }}><rect x="4" y="2" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 7.5H14.5M7.5 11H12M7.5 14.5H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "#166534" }}>{file.name}</div>
                      <div style={{ fontSize: 11, color: "#15803d" }}>{(file.size / 1024).toFixed(1)} KB · Click to change</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#374151" }}>Click to upload your resume</div>
                    <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 3 }}>PDF, DOC, or DOCX accepted · Max 10MB</div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: submitting ? "#93c5fd" : "linear-gradient(135deg,#1d3a8f 0%,#3b5bdb 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 800,
                cursor: submitting ? "not-allowed" : "pointer",
                letterSpacing: "-0.015em",
                transition: "opacity .2s",
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onMouseEnter={e => { if (!submitting) e.currentTarget.style.opacity = "0.88" }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
            >
              {submitting ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
                  <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </>
              )}
            </button>

            <p style={{ fontSize: 11.5, color: "#94a3b8", textAlign: "center", margin: "4px 0 0", lineHeight: 1.6 }}>
              By submitting, you agree to Jobingen storing your application data. We review every application personally.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────────────────────── */
export function CareersClient() {
  const [applyRole, setApplyRole] = useState<string | null>(null)

  return (
    <>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes slideUp  { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.7)} }
        @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatOrb { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }

        .ji-careers-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        @media(max-width:1100px){ .ji-careers-grid{ grid-template-columns: repeat(3,1fr) !important; } }
        @media(max-width:780px) { .ji-careers-grid{ grid-template-columns: repeat(2,1fr) !important; } }
        @media(max-width:520px) { .ji-careers-grid{ grid-template-columns: 1fr !important; } }

        .ji-hero-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media(max-width:560px) { .ji-hero-form-grid{ grid-template-columns: 1fr !important; } }

        .ji-apply-modal::-webkit-scrollbar { width: 4px; }
        .ji-apply-modal::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg,#0f172a 0%,#1d3a8f 55%,#1e3a8a 100%)",
        position: "relative", overflow: "hidden",
        paddingTop: 164, paddingBottom: 0,
      }}>
        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "10%", right: "12%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,134,255,0.18) 0%,transparent 70%)", animation: "floatOrb 8s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "8%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,91,219,0.14) 0%,transparent 70%)", animation: "floatOrb 10s ease-in-out 2s infinite", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "60px 24px 72px", textAlign: "center" }}>
          {/* Pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, padding: "6px 18px", borderRadius: 99, background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.14)", animation: "fadeUp 0.5s ease both" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulseDot 2s infinite", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "0.04em" }}>WE&apos;RE HIRING — {ROLES.length} OPEN ROLES</span>
          </div>

          <h1 style={{ fontSize: "clamp(32px,5.5vw,58px)", fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.04em", lineHeight: 1.07, animation: "fadeUp 0.5s ease 0.1s both" }}>
            Build the future of<br />
            <span style={{ background: "linear-gradient(135deg,#a5b4fc 0%,#818cf8 50%,#6366f1 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              hiring in India.
            </span>
          </h1>

          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", fontWeight: 400, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.75, animation: "fadeUp 0.5s ease 0.18s both" }}>
            Join Jobingen as an intern and help millions of students land their dream jobs. Real work. Real impact. Remote-friendly.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.5s ease 0.26s both" }}>
            <button
              onClick={() => setApplyRole(ROLES[0].id)}
              style={{
                padding: "13px 28px", borderRadius: 12,
                background: "white", color: "#1d3a8f",
                border: "none", fontSize: 14, fontWeight: 800,
                cursor: "pointer", letterSpacing: "-0.01em",
                display: "flex", alignItems: "center", gap: 7,
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                transition: "all .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Apply Now
              <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <a
              href="#open-roles"
              style={{
                padding: "13px 28px", borderRadius: 12,
                background: "rgba(255,255,255,0.1)", color: "white",
                border: "1.5px solid rgba(255,255,255,0.2)",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                letterSpacing: "-0.01em", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 7,
                transition: "all .2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.16)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)" }}
            >
              Browse Roles
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
            </a>
          </div>
        </div>

        {/* Wave divider */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
            <path d="M0 56L1440 56L1440 12C1200 52 960 -8 720 8C480 24 240 60 0 12L0 56Z" fill="#f7f8fc"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY JOIN JOBINGEN
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f7f8fc", borderBottom: "1px solid #eef0f6", padding: "52px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.03em" }}>Why intern at Jobingen?</h2>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>Not your average internship. We treat interns like early employees.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
            {[
              { icon: "🚀", title: "Ship real products", body: "Your code, design, or content goes live. Real users, real feedback." },
              { icon: "🧑‍💻", title: "Mentorship from founders", body: "Work directly with the founding team and get unfiltered guidance." },
              { icon: "🌐", title: "100% remote", body: "Work from anywhere in India. Async-friendly, flexible hours." },
              { icon: "📜", title: "Certificate + LOR", body: "Earn a completion certificate and Letter of Recommendation on exit." },
              { icon: "💰", title: "Paid stipend", body: "Competitive stipend based on your role — ₹4k–18k per month." },
              { icon: "⚡", title: "Fast-track to PPO", body: "Top performers get Pre-Placement Offer consideration after 3 months." },
            ].map((item, i) => (
              <div key={item.title} style={{
                background: "white", borderRadius: 16, border: "1.5px solid #eef0f6",
                padding: "20px 18px", animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 5, letterSpacing: "-0.015em" }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OPEN ROLES
      ══════════════════════════════════════════════════════ */}
      <section id="open-roles" style={{ background: "#f4f6fb", padding: "52px 24px 72px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "4px 12px", borderRadius: 99 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
                  {ROLES.length} roles open now
                </span>
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", margin: "0 0 5px", letterSpacing: "-0.03em" }}>Open Internship Roles</h2>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>All roles use a single common application — one form, all positions.</p>
            </div>
            <button
              onClick={() => setApplyRole(ROLES[0].id)}
              style={{
                padding: "11px 22px", borderRadius: 12,
                background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)",
                color: "white", border: "none", fontSize: 13, fontWeight: 700,
                cursor: "pointer", letterSpacing: "-0.01em",
                display: "flex", alignItems: "center", gap: 7,
                boxShadow: "0 4px 16px rgba(29,58,143,0.22)",
                transition: "all .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Common Apply Form
              <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <div className="ji-careers-grid">
            {ROLES.map((role, i) => (
              <RoleCard key={role.id} role={role} index={i} onApply={id => setApplyRole(id)} />
            ))}
          </div>

          {/* Bottom CTA banner */}
          <div style={{
            marginTop: 44, borderRadius: 20,
            background: "linear-gradient(135deg,#0f172a 0%,#1d3a8f 100%)",
            padding: "32px 32px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 20,
            boxShadow: "0 8px 40px rgba(15,23,42,0.18)",
          }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "white", letterSpacing: "-0.025em", marginBottom: 6 }}>
                Don&apos;t see your role? Apply anyway.
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                We love people who take initiative. Open applications are always welcome — we&apos;ll reach out when the right role opens.
              </div>
            </div>
            <button
              onClick={() => setApplyRole(ROLES[0].id)}
              style={{
                padding: "13px 26px", borderRadius: 12,
                background: "white", color: "#1d3a8f",
                border: "none", fontSize: 14, fontWeight: 800,
                cursor: "pointer", letterSpacing: "-0.01em", flexShrink: 0,
                display: "flex", alignItems: "center", gap: 7,
                transition: "all .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Submit Open Application
              <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {applyRole && (
        <ApplyModal initialRole={applyRole} onClose={() => setApplyRole(null)} />
      )}
    </>
  )
}
