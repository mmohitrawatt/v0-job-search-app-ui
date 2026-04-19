"use client"

import { useState, useMemo, useRef } from "react"
import Link from "next/link"
import type { Job } from "./page"

/* ─── helpers ──────────────────────────────────────────────────────────────── */

const COMPANY_META: Record<string, { logo?: string; color: string; industry: string; tagline: string }> = {
  Trippyway: {
    logo: "/trippyway-logo.jpg",
    color: "#0f766e",
    industry: "Travel · AI",
    tagline: "AI-powered travel discovery startup",
  },
  Netflix: {
    logo: undefined,
    color: "#E50914",
    industry: "Streaming · Tech",
    tagline: "World's leading entertainment platform",
  },
  "Top Institute of India": {
    logo: undefined,
    color: "#1d3a8f",
    industry: "Research · Academia",
    tagline: "India's premier science & technology institution",
  },
}

const GRADIENTS: Record<string, string> = {
  "#E50914": "linear-gradient(135deg,#141414,#E50914)",
  "#1d3a8f": "linear-gradient(135deg,#0a1533,#1d3a8f)",
  "#0f766e": "linear-gradient(135deg,#042f2e,#0f766e)",
}

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

const TYPE_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Internship:  { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "Full Time": { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  Contractual: { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
}
const MODE_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Remote:    { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "On-site": { bg: "#faf5ff", color: "#7c3aed", border: "#ddd6fe" },
  Hybrid:    { bg: "#fff7ed", color: "#b45309", border: "#fed7aa" },
}

/* ─── Featured company card ─────────────────────────────────────────────── */
function CompanyCard({ name, jobs, onClick }: { name: string; jobs: Job[]; onClick: () => void }) {
  const meta = COMPANY_META[name] || { color: "#1d3a8f", industry: "Technology", tagline: "" }
  const gradient = GRADIENTS[meta.color] || `linear-gradient(135deg,#1d3a8f,#3b52f0)`
  const [hov, setHov] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white", borderRadius: 18,
        border: hov ? "1.5px solid #c7d2fe" : "1.5px solid #eef0f6",
        padding: 0, overflow: "hidden", cursor: "pointer",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? "0 12px 40px rgba(29,58,143,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
        textAlign: "left", width: "100%",
      }}
    >
      {/* Color bar */}
      <div style={{ height: 5, background: gradient }} />

      <div style={{ padding: "18px 20px 16px" }}>
        {/* Logo + badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, overflow: "hidden",
            background: meta.logo ? "#fff" : gradient,
            border: "1.5px solid #eef0f6",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontWeight: 900, color: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}>
            {meta.logo
              ? <img src={meta.logo} alt={name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }} />
              : getInitials(name)
            }
          </div>
          <span style={{
            display: "flex", alignItems: "center", gap: 4,
            fontSize: 10, fontWeight: 700, color: "#16a34a",
            background: "#f0fdf4", border: "1px solid #bbf7d0",
            padding: "3px 8px", borderRadius: 99,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a", display: "inline-block", animation: "pulseDot 2s infinite" }} />
            Hiring
          </span>
        </div>

        <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 3, letterSpacing: "-0.01em" }}>{name}</div>
        <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500, marginBottom: 8 }}>{meta.industry}</div>
        <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.55, marginBottom: 14 }}>{meta.tagline}</div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1d3a8f", background: "#eff6ff", padding: "4px 10px", borderRadius: 99, border: "1px solid #c7d2fe" }}>
            {jobs.length} open role{jobs.length !== 1 ? "s" : ""}
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#1d3a8f", display: "flex", alignItems: "center", gap: 3 }}>
            View roles
            <svg width="12" height="12" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
      </div>
    </button>
  )
}

/* ─── Job Card ──────────────────────────────────────────────────────────── */
function JobCard({ job, index }: { job: Job; index: number }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  const meta = COMPANY_META[job.company]
  const logo = meta?.logo
  const color = meta?.color || "#1d3a8f"
  const gradient = GRADIENTS[color] || `linear-gradient(135deg,#1d3a8f,#3b52f0)`
  const type = job.type || "Full Time"
  const mode = job.mode || "On-site"
  const typeS = TYPE_STYLE[type] || { bg: "#f3f4f6", color: "#374151", border: "#e5e7eb" }
  const modeS = MODE_STYLE[mode] || { bg: "#f3f4f6", color: "#374151", border: "#e5e7eb" }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white", borderRadius: 16,
        border: hov ? "1.5px solid #c7d2fe" : "1.5px solid #eef0f6",
        boxShadow: hov ? "0 8px 32px rgba(29,58,143,0.08)" : "0 1px 4px rgba(0,0,0,0.03)",
        overflow: "hidden",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
        animation: `fadeUp 0.4s ease ${index * 0.055}s both`,
      }}
    >
      <div style={{ padding: "20px 22px" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>

          {/* Logo */}
          <div style={{
            width: 52, height: 52, borderRadius: 13, flexShrink: 0,
            background: logo ? "#fff" : gradient,
            border: "1.5px solid #eef0f6",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", fontSize: 15, fontWeight: 900, color: "white",
          }}>
            {logo
              ? <img src={logo} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: logo.startsWith("/") ? 5 : 0 }} />
              : getInitials(job.company)
            }
          </div>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 2px", letterSpacing: "-0.015em", lineHeight: 1.3 }}>
                  {job.title}
                </h3>
                <div style={{ fontSize: 13, color: "#6b7280", display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 600, color: "#374151" }}>{job.company}</span>
                  <span style={{ color: "#d1d5db", fontSize: 10 }}>●</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {job.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSaved(s => !s)}
                style={{ border: "none", background: "none", cursor: "pointer", padding: 4, color: saved ? "#ef4444" : "#d1d5db", flexShrink: 0, transition: "all 0.15s" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
              <span style={{ ...typeS, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, border: `1px solid ${typeS.border}` }}>{type}</span>
              <span style={{ ...modeS, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, border: `1px solid ${modeS.border}` }}>{mode}</span>
              {job.department && (
                <span style={{ background: "#faf5ff", color: "#7c3aed", border: "1px solid #ddd6fe", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>{job.department}</span>
              )}
              {job.experience && (
                <span style={{ background: "#fffbeb", color: "#b45309", border: "1px solid #fde68a", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>
                  {job.experience}
                </span>
              )}
            </div>

            {/* Description */}
            {job.description && (
              <p style={{
                fontSize: 13, color: "#6b7280", lineHeight: 1.65, margin: "10px 0 0",
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
              }}>
                {job.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "12px 22px", borderTop: "1px solid #f4f6fb",
        background: "#fafbff",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "#16a34a" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
            Actively Hiring
          </span>
          {job.duration && (
            <span style={{ fontSize: 11, color: "#9ca3af" }}>· {job.duration}</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {!job.applyUrl && (
            <Link href={`/jobs/${job.slug}`}
              style={{
                fontSize: 12, fontWeight: 600, color: "#374151",
                padding: "6px 14px", borderRadius: 8, border: "1px solid #e0e7ff",
                background: "white", textDecoration: "none", display: "inline-flex", alignItems: "center",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#1d3a8f"; e.currentTarget.style.color = "#1d3a8f" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e7ff"; e.currentTarget.style.color = "#374151" }}
            >
              Details
            </Link>
          )}
          <a
            href={job.applyUrl ?? `/jobs/${job.slug}`}
            {...(job.applyUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            style={{
              fontSize: 12, fontWeight: 700, color: "white",
              padding: "6px 18px", borderRadius: 8,
              background: "#1d3a8f",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#1e40af"}
            onMouseLeave={e => e.currentTarget.style.background = "#1d3a8f"}
          >
            Apply Now
            <svg width="11" height="11" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── Sidebar filter checkbox ────────────────────────────────────────────── */
function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 8px", borderRadius: 8, cursor: "pointer" }}
      onMouseEnter={e => e.currentTarget.style.background = "#f5f7ff"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      <span
        onClick={onChange}
        style={{
          width: 17, height: 17, borderRadius: 5, flexShrink: 0,
          border: `2px solid ${checked ? "#1d3a8f" : "#d1d5db"}`,
          background: checked ? "#1d3a8f" : "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.12s", cursor: "pointer",
        }}
      >
        {checked && <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      <span onClick={onChange} style={{ fontSize: 13, color: checked ? "#1d3a8f" : "#374151", fontWeight: checked ? 700 : 500, cursor: "pointer" }}>{label}</span>
    </label>
  )
}

/* ─── Category chip ──────────────────────────────────────────────────────── */
const CATEGORIES = [
  { label: "All Jobs", icon: "✦", type: "all" },
  { label: "Remote", icon: "🏠", filter: "mode", value: "Remote" },
  { label: "Internship", icon: "🎓", filter: "type", value: "Internship" },
  { label: "Full Time", icon: "💼", filter: "type", value: "Full Time" },
  { label: "Engineering", icon: "⚡", filter: "search", value: "Engineer" },
  { label: "Design", icon: "🎨", filter: "search", value: "Design" },
  { label: "AI & ML", icon: "🤖", filter: "search", value: "AI" },
  { label: "HR", icon: "🤝", filter: "search", value: "HR" },
]

/* ─── Main export ────────────────────────────────────────────────────────── */

const ALL_TYPES = ["Internship", "Full Time", "Contractual"]
const ALL_MODES = ["Remote", "On-site", "Hybrid"]

export function JobsClient({ jobs }: { jobs: Job[] }) {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [types, setTypes] = useState<string[]>([])
  const [modes, setModes] = useState<string[]>([])
  const [sort, setSort] = useState<"newest" | "az">("newest")
  const [activeCat, setActiveCat] = useState("All Jobs")
  const jobsRef = useRef<HTMLDivElement>(null)

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const clearAll = () => { setSearch(""); setLocation(""); setTypes([]); setModes([]); setActiveCat("All Jobs") }

  const handleCat = (cat: typeof CATEGORIES[0]) => {
    setActiveCat(cat.label)
    if (cat.type === "all") { clearAll(); return }
    if (cat.filter === "type") { setTypes([cat.value!]); setModes([]); setSearch("") }
    else if (cat.filter === "mode") { setModes([cat.value!]); setTypes([]); setSearch("") }
    else if (cat.filter === "search") { setSearch(cat.value!); setTypes([]); setModes([]) }
    setTimeout(() => jobsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
  }

  const companiesMap = useMemo(() => {
    const m: Record<string, Job[]> = {}
    jobs.forEach(j => { if (!m[j.company]) m[j.company] = []; m[j.company].push(j) })
    return m
  }, [jobs])

  const filtered = useMemo(() => {
    let result = jobs.filter(j => {
      const q = search.toLowerCase()
      const loc = location.toLowerCase()
      const matchSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || (j.department || "").toLowerCase().includes(q)
      const matchLoc = !loc || j.location.toLowerCase().includes(loc)
      const matchType = types.length === 0 || types.includes(j.type || "Full Time")
      const matchMode = modes.length === 0 || modes.includes(j.mode || "On-site")
      return matchSearch && matchLoc && matchType && matchMode
    })
    if (sort === "az") result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    return result
  }, [jobs, search, location, types, modes, sort])

  const activeFilters = types.length + modes.length + (search ? 1 : 0)

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.45; transform: scale(1.6); }
        }
        @keyframes shimmer {
          from { opacity: 0.7; } to { opacity: 1; }
        }
        .ji-searchbar input:focus { outline: none; }
        @media (max-width: 900px) {
          .ji-layout { flex-direction: column !important; }
          .ji-sidebar { width: 100% !important; position: static !important; flex-direction: row !important; gap: 12px !important; }
          .ji-fbox { flex: 1; min-width: 140px; }
        }
        @media (max-width: 600px) {
          .ji-hero-head { font-size: 28px !important; }
          .ji-searchbar { flex-direction: column !important; border-radius: 14px !important; }
          .ji-searchbar .ji-divider { display: none !important; }
          .ji-companies-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(180deg,#eef2ff 0%,#f9faff 60%,#fff 100%)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "52px 24px 40px", textAlign: "center" }}>

          {/* Eyebrow */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14, padding: "5px 14px", borderRadius: 99, background: "white", border: "1px solid #e0e7ff", boxShadow: "0 1px 6px rgba(29,58,143,0.06)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1d3a8f", letterSpacing: "0.03em" }}>LIVE — New roles added weekly</span>
          </div>

          <h1 className="ji-hero-head" style={{ fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 900, color: "#0f172a", marginBottom: 10, letterSpacing: "-0.035em", lineHeight: 1.12 }}>
            Find your next opportunity
          </h1>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 32, fontWeight: 400, maxWidth: 460, margin: "0 auto 32px" }}>
            Curated jobs from top startups &amp; companies — updated regularly, no spam.
          </p>

          {/* Search bar */}
          <div className="ji-searchbar" style={{
            display: "flex", background: "white", borderRadius: 16,
            border: "1.5px solid #e0e7ff", boxShadow: "0 4px 32px rgba(29,58,143,0.08)",
            maxWidth: 780, margin: "0 auto 20px", overflow: "hidden",
          }}>
            <div style={{ flex: 1.6, display: "flex", alignItems: "center", padding: "0 16px", gap: 10 }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Job title, company, or skill..."
                style={{ border: "none", fontSize: 14, color: "#111827", fontWeight: 400, width: "100%", padding: "17px 0", background: "transparent" }}
              />
            </div>
            <div className="ji-divider" style={{ width: 1, background: "#e8eaf0", margin: "10px 0" }} />
            <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 16px", gap: 10 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="City or Remote"
                style={{ border: "none", fontSize: 14, color: "#111827", fontWeight: 400, width: "100%", padding: "17px 0", background: "transparent" }}
              />
            </div>
            <button
              onClick={() => jobsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              style={{
                padding: "0 28px", background: "#1d3a8f", color: "white",
                border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
                transition: "background 0.15s", flexShrink: 0, letterSpacing: "-0.01em",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#1e40af"}
              onMouseLeave={e => e.currentTarget.style.background = "#1d3a8f"}
            >
              Search
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {[
              { val: `${jobs.length}+`, label: "Open roles" },
              { val: `${Object.keys(companiesMap).length}`, label: "Companies hiring" },
              { val: "Weekly", label: "Updates" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#1d3a8f" }}>{s.val}</span>
                <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 400 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CATEGORY CHIPS (sticky-scroll)
      ══════════════════════════════════════ */}
      <div style={{ background: "white", borderBottom: "1px solid #eef0f6", position: "sticky", top: 108, zIndex: 30 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", gap: 4, overflowX: "auto", padding: "10px 0", scrollbarWidth: "none" }}>
            {CATEGORIES.map(cat => {
              const active = activeCat === cat.label
              return (
                <button
                  key={cat.label}
                  onClick={() => handleCat(cat)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "7px 16px", borderRadius: 99, whiteSpace: "nowrap",
                    border: active ? "1.5px solid #1d3a8f" : "1.5px solid #eef0f6",
                    background: active ? "#1d3a8f" : "white",
                    color: active ? "white" : "#6b7280",
                    fontSize: 13, fontWeight: active ? 700 : 500,
                    cursor: "pointer", transition: "all 0.15s", flexShrink: 0,
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "#c7d2fe"; e.currentTarget.style.color = "#1d3a8f" }}}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "#eef0f6"; e.currentTarget.style.color = "#6b7280" }}}
                >
                  <span style={{ fontSize: 14 }}>{cat.icon}</span>
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ background: "#f5f7fb" }}>

        {/* ══════════════════════════════════════
            FEATURED COMPANIES
        ══════════════════════════════════════ */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", margin: "0 0 2px", letterSpacing: "-0.02em" }}>
                Featured Companies
              </h2>
              <p style={{ fontSize: 13, color: "#9ca3af", margin: 0, fontWeight: 400 }}>
                Top companies actively hiring through Jobingen
              </p>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "4px 12px", borderRadius: 99, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
              {Object.keys(companiesMap).length} companies hiring
            </span>
          </div>

          <div className="ji-companies-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 40 }}>
            {Object.entries(companiesMap).map(([name, compJobs]) => (
              <CompanyCard
                key={name}
                name={name}
                jobs={compJobs}
                onClick={() => {
                  setSearch(name)
                  setActiveCat("All Jobs")
                  setTimeout(() => jobsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
                }}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            DIVIDER
        ══════════════════════════════════════ */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ height: 1, background: "#eef0f6" }} />
        </div>

        {/* ══════════════════════════════════════
            JOB LISTINGS
        ══════════════════════════════════════ */}
        <div ref={jobsRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 80px" }}>

          <div className="ji-layout" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

            {/* ── Sidebar ── */}
            <aside className="ji-sidebar" style={{ width: 230, flexShrink: 0, position: "sticky", top: 160, display: "flex", flexDirection: "column", gap: 12 }}>

              <div className="ji-fbox" style={{ background: "white", borderRadius: 14, border: "1px solid #eef0f6", padding: "18px 14px", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Filter</span>
                  {activeFilters > 0 && (
                    <button onClick={clearAll} style={{ fontSize: 11, fontWeight: 600, color: "#1d3a8f", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      Clear all
                    </button>
                  )}
                </div>

                <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Job Type</p>
                {ALL_TYPES.map(t => (
                  <Checkbox key={t} label={t} checked={types.includes(t)} onChange={() => toggle(types, setTypes, t)} />
                ))}

                <div style={{ height: 1, background: "#f0f0f0", margin: "12px 0" }} />

                <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Work Mode</p>
                {ALL_MODES.map(m => (
                  <Checkbox key={m} label={m} checked={modes.includes(m)} onChange={() => toggle(modes, setModes, m)} />
                ))}
              </div>

              {/* Tip card */}
              <div style={{ background: "linear-gradient(135deg,#1d3a8f,#2548c5)", borderRadius: 14, padding: "16px 16px", color: "white" }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 5 }}>🚀 More jobs coming</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 12 }}>
                  We add new roles every week. Turn on alerts to be first.
                </div>
                <button style={{ width: "100%", padding: "8px 0", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.12)", color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  Get Job Alerts
                </button>
              </div>
            </aside>

            {/* ── Job list ── */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Topbar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                    {filtered.length} {filtered.length === 1 ? "role" : "roles"} found
                  </span>
                  {[...types, ...modes, ...(search ? [search] : [])].map(f => (
                    <span key={f} style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      fontSize: 11, fontWeight: 600, color: "#1d3a8f",
                      background: "#eff6ff", border: "1px solid #c7d2fe",
                      padding: "3px 10px", borderRadius: 99,
                    }}>
                      {f}
                      <button
                        onClick={() => {
                          if (types.includes(f)) toggle(types, setTypes, f)
                          else if (modes.includes(f)) toggle(modes, setModes, f)
                          else setSearch("")
                        }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#93c5fd", padding: 0, fontSize: 15, lineHeight: 1 }}
                      >×</button>
                    </span>
                  ))}
                </div>

                <select
                  value={sort}
                  onChange={e => setSort(e.target.value as "newest" | "az")}
                  style={{
                    padding: "7px 30px 7px 10px", borderRadius: 8,
                    border: "1px solid #e0e7ff", background: "white",
                    fontSize: 12, fontWeight: 600, color: "#374151",
                    cursor: "pointer", appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center",
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="az">A → Z</option>
                </select>
              </div>

              {filtered.length === 0 ? (
                <div style={{
                  background: "white", borderRadius: 16, border: "1px solid #eef0f6",
                  padding: "72px 24px", textAlign: "center",
                  animation: "fadeUp 0.35s ease both",
                }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#111827", marginBottom: 6 }}>No jobs match</div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>Try a different keyword or clear filters</div>
                  <button onClick={clearAll} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #e0e7ff", background: "white", fontSize: 13, fontWeight: 700, color: "#1d3a8f", cursor: "pointer" }}>
                    Clear filters
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {filtered.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
