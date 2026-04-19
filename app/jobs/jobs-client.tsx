"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import type { Job } from "./page"

/* ── helpers ─────────────────────────────────────────────────────────────── */

const COMPANY_LOGOS: Record<string, string> = {
  Trippyway: "/trippyway-logo.jpg",
  Netflix: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44'%3E%3Crect width='44' height='44' fill='%23141414'/%3E%3Cpolygon points='9%2C6 16%2C6 35%2C38 28%2C38' fill='%23E50914'/%3E%3Crect x='9' y='6' width='7' height='32' fill='%23E50914'/%3E%3Crect x='28' y='6' width='7' height='32' fill='%23E50914'/%3E%3C%2Fsvg%3E`,
  "Top Institute of India": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='12' fill='%231d3a8f'/%3E%3Cpath d='M16 12v24M22 12h8a6 6 0 0 1 0 12H22z' stroke='white' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E`,
}

const GRADIENTS = [
  "linear-gradient(135deg,#1d3a8f,#3b52f0)",
  "linear-gradient(135deg,#0f766e,#14b8a6)",
  "linear-gradient(135deg,#7c3aed,#a78bfa)",
  "linear-gradient(135deg,#b45309,#f59e0b)",
  "linear-gradient(135deg,#be185d,#f472b6)",
  "linear-gradient(135deg,#0369a1,#38bdf8)",
]

function getGradient(name: string) {
  return GRADIENTS[name.charCodeAt(0) % GRADIENTS.length]
}

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

const MODE_COLOR: Record<string, { bg: string; color: string }> = {
  Remote:   { bg: "#ecfdf5", color: "#059669" },
  "On-site":{ bg: "#eff6ff", color: "#1d4ed8" },
  Hybrid:   { bg: "#f5f3ff", color: "#7c3aed" },
}

const TYPE_COLOR: Record<string, { bg: string; color: string }> = {
  Internship:   { bg: "#fff7ed", color: "#c2410c" },
  "Full Time":  { bg: "#eff6ff", color: "#1d4ed8" },
  Contractual:  { bg: "#f0fdf4", color: "#15803d" },
}

/* ── Filter Checkbox ─────────────────────────────────────────────────────── */
function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 12px", borderRadius: 10, cursor: "pointer", width: "100%",
        background: active ? "#eff6ff" : "transparent",
        border: active ? "1.5px solid #bfdbfe" : "1.5px solid transparent",
        color: active ? "#1d4ed8" : "#6b7280",
        fontSize: 13, fontWeight: active ? 700 : 500,
        transition: "all 0.15s ease",
      }}
    >
      <span style={{
        width: 16, height: 16, borderRadius: 5, border: `2px solid ${active ? "#3b82f6" : "#d1d5db"}`,
        background: active ? "#3b82f6" : "white", display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, transition: "all 0.15s",
      }}>
        {active && (
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  )
}

/* ── Job Card ────────────────────────────────────────────────────────────── */
function JobCard({ job, index }: { job: Job; index: number }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)

  const type = job.type || "Full Time"
  const mode = job.mode || "On-site"
  const modeStyle = MODE_COLOR[mode] || { bg: "#f3f4f6", color: "#374151" }
  const typeStyle = TYPE_COLOR[type] || { bg: "#f3f4f6", color: "#374151" }
  const logo = COMPANY_LOGOS[job.company]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: 20,
        border: hovered ? "1.5px solid #bfdbfe" : "1.5px solid #f0f0f0",
        boxShadow: hovered ? "0 12px 40px -8px rgba(29,58,143,0.14)" : "0 2px 8px rgba(0,0,0,0.04)",
        display: "flex", flexDirection: "column",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
        animation: `fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) ${index * 0.06}s both`,
        overflow: "hidden",
      }}
    >
      {/* Card body */}
      <div style={{ padding: "20px 20px 16px", display: "flex", gap: 16, alignItems: "flex-start" }}>

        {/* Logo */}
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0, overflow: "hidden",
          background: logo ? "#fff" : getGradient(job.company),
          border: "1.5px solid #f0f0f0",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 900, color: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}>
          {logo
            ? <img src={logo} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            : getInitials(job.company)
          }
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title + save */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.3, margin: 0 }}>
              {job.title}
            </h3>
            <button
              onClick={() => setSaved(s => !s)}
              style={{
                flexShrink: 0, padding: 4, borderRadius: 8, border: "none", background: "none",
                cursor: "pointer", color: saved ? "#ef4444" : "#d1d5db",
                transition: "all 0.2s", transform: saved ? "scale(1.15)" : "scale(1)",
              }}
              title={saved ? "Saved" : "Save job"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Company */}
          <div style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
            {job.company}
            <span style={{ color: "#e5e7eb" }}>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#9ca3af" }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
              </svg>
              {job.location}
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
            <span style={{ ...typeStyle, fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>{type}</span>
            <span style={{ ...modeStyle, fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>{mode}</span>
            {job.department && (
              <span style={{ background: "#f5f3ff", color: "#7c3aed", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>{job.department}</span>
            )}
            {job.experience && (
              <span style={{ background: "#fffbeb", color: "#b45309", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>
                {job.experience}
              </span>
            )}
          </div>

          {/* Description */}
          {job.description && (
            <p style={{
              fontSize: 12.5, color: "#6b7280", lineHeight: 1.65, margin: 0,
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
            }}>
              {job.description}
            </p>
          )}
        </div>
      </div>

      {/* Card footer */}
      <div style={{
        padding: "12px 20px", borderTop: "1px solid #f9fafb",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
        background: "#fafbff", flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Stipend */}
          {job.stipend && (
            <span style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 12, fontWeight: 800, color: "#1d3a8f",
              background: "#eff6ff", padding: "3px 10px", borderRadius: 7,
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              {job.stipend}
            </span>
          )}
          {/* Duration */}
          {job.duration && (
            <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>
              · {job.duration}
            </span>
          )}
          {/* Hiring badge */}
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "#059669" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", animation: "pulseDot 2s ease-in-out infinite", display: "inline-block" }} />
            Hiring Now
          </span>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!job.applyUrl && (
            <Link href={`/jobs/${job.slug}`} style={{
              fontSize: 12, fontWeight: 700, color: "#374151",
              padding: "7px 14px", borderRadius: 10,
              border: "1.5px solid #e5e7eb", background: "white",
              textDecoration: "none", transition: "all 0.15s",
              display: "inline-flex", alignItems: "center", gap: 5,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#93c5fd"; e.currentTarget.style.color = "#1d4ed8" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151" }}
            >
              View Details
            </Link>
          )}
          <a
            href={job.applyUrl ?? `/jobs/${job.slug}`}
            {...(job.applyUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            style={{
              fontSize: 12, fontWeight: 800, color: "white",
              padding: "7px 16px", borderRadius: 10,
              background: "linear-gradient(135deg,#1d3a8f,#2548c5)",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5,
              boxShadow: "0 3px 12px rgba(29,58,143,0.28)",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(29,58,143,0.38)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 3px 12px rgba(29,58,143,0.28)" }}
          >
            Apply Now
            <svg width="11" height="11" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}

/* ── Main Client Component ───────────────────────────────────────────────── */

const ALL_TYPES = ["Internship", "Full Time", "Contractual"]
const ALL_MODES = ["Remote", "On-site", "Hybrid"]

export function JobsClient({ jobs }: { jobs: Job[] }) {
  const [search, setSearch] = useState("")
  const [types, setTypes] = useState<string[]>([])
  const [modes, setModes] = useState<string[]>([])
  const [sort, setSort] = useState<"newest" | "stipend">("newest")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) => {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const activeFilters = types.length + modes.length

  const filtered = useMemo(() => {
    let result = jobs.filter(j => {
      const q = search.toLowerCase()
      const matchSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.location.toLowerCase().includes(q) || (j.department || "").toLowerCase().includes(q)
      const matchType = types.length === 0 || types.includes(j.type || "Full Time")
      const matchMode = modes.length === 0 || modes.includes(j.mode || "On-site")
      return matchSearch && matchType && matchMode
    })
    if (sort === "stipend") {
      result = [...result].sort((a, b) => {
        const getNum = (s?: string) => parseInt((s || "0").replace(/[^\d]/g, "")) || 0
        return getNum(b.stipend) - getNum(a.stipend)
      })
    }
    return result
  }, [jobs, search, types, modes, sort])

  const Sidebar = () => (
    <aside style={{
      width: 240, flexShrink: 0,
      background: "white", borderRadius: 20, border: "1.5px solid #f0f0f0",
      padding: "20px 16px", height: "fit-content",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      position: "sticky", top: 120,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>Filters</span>
        {activeFilters > 0 && (
          <button onClick={() => { setTypes([]); setModes([]) }}
            style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            Clear all
          </button>
        )}
      </div>

      {/* Job Type */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Job Type</p>
        {ALL_TYPES.map(t => (
          <FilterChip key={t} label={t} active={types.includes(t)} onClick={() => toggle(types, setTypes, t)} />
        ))}
      </div>

      {/* Work Mode */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Work Mode</p>
        {ALL_MODES.map(m => (
          <FilterChip key={m} label={m} active={modes.includes(m)} onClick={() => toggle(modes, setModes, m)} />
        ))}
      </div>
    </aside>
  )

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.4); }
        }
        .search-input:focus { outline: none; border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); }
        .sort-select:focus { outline: none; }
        @media (max-width: 768px) {
          .jobs-layout { flex-direction: column !important; }
          .jobs-grid-inner { grid-template-columns: 1fr !important; }
          .hero-search { flex-direction: column !important; }
        }
      `}</style>

      {/* ── Search Hero ── */}
      <div style={{ background: "linear-gradient(135deg,#0a1533 0%,#1d3a8f 100%)", padding: "32px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Jobingen Jobs
          </p>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 900, color: "white", marginBottom: 20, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Find your next opportunity
          </h1>

          {/* Search bar */}
          <div className="hero-search" style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                className="search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search jobs, companies, skills..."
                style={{
                  width: "100%", padding: "13px 14px 13px 40px",
                  borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.1)", color: "white",
                  fontSize: 14, fontWeight: 500,
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s",
                }}
              />
            </div>
            <button
              style={{
                padding: "13px 24px", borderRadius: 12, border: "none", cursor: "pointer",
                background: "white", color: "#1d3a8f", fontSize: 14, fontWeight: 800,
                whiteSpace: "nowrap", transition: "all 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = ""}
            >
              Search Jobs
            </button>
          </div>

          {/* Quick filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {["Remote", "Internship", "AI & Engineering", "Design", "Full Time"].map(tag => (
              <button key={tag} onClick={() => {
                if (["Remote", "On-site", "Hybrid"].includes(tag)) toggle(modes, setModes, tag)
                else if (["Internship", "Full Time", "Contractual"].includes(tag)) toggle(types, setTypes, tag)
                else setSearch(tag)
              }}
                style={{
                  padding: "5px 12px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)",
                  fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "white" }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)" }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div style={{ background: "#f8fafc", minHeight: "60vh" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 80px" }}>

          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                {filtered.length} {filtered.length === 1 ? "role" : "roles"} found
              </span>
              {activeFilters > 0 && (
                <span style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", background: "#eff6ff", padding: "2px 8px", borderRadius: 99 }}>
                  {activeFilters} filter{activeFilters > 1 ? "s" : ""} active
                </span>
              )}
              {/* Active filter chips */}
              {[...types, ...modes].map(f => (
                <span key={f} style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontSize: 11, fontWeight: 700, color: "#1d4ed8",
                  background: "#eff6ff", border: "1px solid #bfdbfe",
                  padding: "3px 8px", borderRadius: 99,
                }}>
                  {f}
                  <button onClick={() => {
                    if (types.includes(f)) toggle(types, setTypes, f)
                    else toggle(modes, setModes, f)
                  }} style={{ background: "none", border: "none", cursor: "pointer", color: "#93c5fd", padding: 0, lineHeight: 1 }}>×</button>
                </span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Mobile filter toggle */}
              <button
                className="lg:hidden"
                onClick={() => setSidebarOpen(o => !o)}
                style={{
                  display: "none", alignItems: "center", gap: 6, padding: "8px 14px",
                  borderRadius: 10, border: "1.5px solid #e5e7eb", background: "white",
                  fontSize: 13, fontWeight: 700, color: "#374151", cursor: "pointer",
                }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 6h18M7 12h10M11 18h2"/>
                </svg>
                Filters {activeFilters > 0 && `(${activeFilters})`}
              </button>

              {/* Sort */}
              <select
                className="sort-select"
                value={sort}
                onChange={e => setSort(e.target.value as "newest" | "stipend")}
                style={{
                  padding: "8px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb",
                  background: "white", fontSize: 13, fontWeight: 600, color: "#374151",
                  cursor: "pointer", appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
                  paddingRight: 32,
                }}
              >
                <option value="newest">Newest First</option>
                <option value="stipend">Highest Pay</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="jobs-layout" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

            {/* Sidebar */}
            <div style={{ display: "block" }}>
              <Sidebar />
            </div>

            {/* Job grid */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {filtered.length === 0 ? (
                <div style={{
                  background: "white", borderRadius: 20, border: "1.5px solid #f0f0f0",
                  padding: "64px 24px", textAlign: "center",
                  animation: "fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both",
                }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 6, letterSpacing: "-0.02em" }}>No jobs match your search</div>
                  <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>Try adjusting your filters or search term</div>
                  <button onClick={() => { setSearch(""); setTypes([]); setModes([]) }}
                    style={{ padding: "10px 20px", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "white", fontSize: 13, fontWeight: 700, color: "#374151", cursor: "pointer" }}>
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="jobs-grid-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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
