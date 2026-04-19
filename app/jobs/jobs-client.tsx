"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import type { Job } from "./page"

/* ── helpers ─────────────────────────────────────────────────────────────── */

const COMPANY_LOGOS: Record<string, string> = {
  Trippyway: "/trippyway-logo.jpg",
  Netflix: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44'%3E%3Crect width='44' height='44' fill='%23141414'/%3E%3Cpolygon points='9%2C6 16%2C6 35%2C38 28%2C38' fill='%23E50914'/%3E%3Crect x='9' y='6' width='7' height='32' fill='%23E50914'/%3E%3Crect x='28' y='6' width='7' height='32' fill='%23E50914'/%3E%3C%2Fsvg%3E`,
  "Top Institute of India": `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='10' fill='%231d3a8f'/%3E%3Cpath d='M16 12v24M22 12h8a6 6 0 0 1 0 12H22z' stroke='white' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E`,
}

const GRADIENTS = [
  "#1d3a8f", "#0f766e", "#7c3aed", "#b45309", "#be185d", "#0369a1",
]

function getGradient(name: string) {
  return GRADIENTS[name.charCodeAt(0) % GRADIENTS.length]
}

function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

const QUICK_CATEGORIES = [
  { label: "Remote", icon: "🏠", filter: "mode", value: "Remote" },
  { label: "Internship", icon: "🎓", filter: "type", value: "Internship" },
  { label: "Full Time", icon: "💼", filter: "type", value: "Full Time" },
  { label: "AI & Tech", icon: "⚡", filter: "search", value: "AI" },
  { label: "Design", icon: "🎨", filter: "search", value: "Design" },
  { label: "On-site", icon: "🏢", filter: "mode", value: "On-site" },
]

/* ── Job Card ────────────────────────────────────────────────────────────── */
function JobCard({ job, index }: { job: Job; index: number }) {
  const [saved, setSaved] = useState(false)
  const logo = COMPANY_LOGOS[job.company]
  const type = job.type || "Full Time"
  const mode = job.mode || "On-site"

  const tagColors: Record<string, { bg: string; color: string; border: string }> = {
    Internship:   { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
    "Full Time":  { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    Contractual:  { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
    Remote:       { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
    "On-site":    { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    Hybrid:       { bg: "#f5f3ff", color: "#7c3aed", border: "#ddd6fe" },
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        border: "1px solid #e8eaf0",
        padding: "20px 24px",
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        transition: "all 0.18s ease",
        animation: `fadeUp 0.35s ease ${index * 0.05}s both`,
        cursor: "default",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = "#c7d2fe"
        el.style.boxShadow = "0 4px 24px rgba(29,58,143,0.08)"
        el.style.transform = "translateY(-1px)"
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = "#e8eaf0"
        el.style.boxShadow = "none"
        el.style.transform = "translateY(0)"
      }}
    >
      {/* Logo */}
      <div style={{
        width: 56, height: 56, borderRadius: 12, flexShrink: 0,
        background: logo ? "#fff" : getGradient(job.company),
        border: "1px solid #e8eaf0",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        fontSize: 16, fontWeight: 900, color: "white",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        {logo
          ? <img src={logo} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain", padding: logo.startsWith("/") ? 4 : 0 }} />
          : getInitials(job.company)
        }
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Title row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0, letterSpacing: "-0.015em", lineHeight: 1.35 }}>
            {job.title}
          </h3>
          <button
            onClick={() => setSaved(s => !s)}
            title={saved ? "Saved" : "Save"}
            style={{
              flexShrink: 0, border: "none", background: "none",
              cursor: "pointer", padding: 4, borderRadius: 8,
              color: saved ? "#ef4444" : "#d1d5db",
              transition: "all 0.15s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>

        {/* Company + location */}
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 10, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 600, color: "#374151" }}>{job.company}</span>
          <span style={{ color: "#d1d5db" }}>·</span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {job.location}
          </span>
          {job.experience && (
            <>
              <span style={{ color: "#d1d5db" }}>·</span>
              <span>{job.experience}</span>
            </>
          )}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: job.description ? 10 : 0 }}>
          {[type, mode, job.department].filter(Boolean).map((tag) => {
            const style = tagColors[tag!] || { bg: "#f3f4f6", color: "#374151", border: "#e5e7eb" }
            return (
              <span key={tag} style={{
                fontSize: 11, fontWeight: 600,
                padding: "3px 10px", borderRadius: 99,
                background: style.bg, color: style.color,
                border: `1px solid ${style.border}`,
              }}>
                {tag}
              </span>
            )
          })}
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99,
            background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
            Actively Hiring
          </span>
        </div>

        {/* Description */}
        {job.description && (
          <p style={{
            fontSize: 13, color: "#6b7280", lineHeight: 1.65, margin: "0 0 14px",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
          }}>
            {job.description}
          </p>
        )}

        {/* Footer: duration + actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
            {job.duration ? `Duration: ${job.duration}` : "Posted recently"} · via Jobingen
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {!job.applyUrl && (
              <Link
                href={`/jobs/${job.slug}`}
                style={{
                  fontSize: 13, fontWeight: 600, color: "#374151",
                  padding: "7px 16px", borderRadius: 8,
                  border: "1px solid #d1d5db", background: "white",
                  textDecoration: "none", transition: "all 0.15s",
                  display: "inline-flex", alignItems: "center",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1d3a8f"; e.currentTarget.style.color = "#1d3a8f" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.color = "#374151" }}
              >
                View Details
              </Link>
            )}
            <a
              href={job.applyUrl ?? `/jobs/${job.slug}`}
              {...(job.applyUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                fontSize: 13, fontWeight: 700, color: "white",
                padding: "7px 20px", borderRadius: 8,
                background: "#1d3a8f",
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5,
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1e40af" }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1d3a8f" }}
            >
              Apply Now
            </a>
          </div>
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
  const [sort, setSort] = useState<"newest" | "az">("newest")

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const clearAll = () => { setSearch(""); setTypes([]); setModes([]) }
  const activeFilters = types.length + modes.length

  const filtered = useMemo(() => {
    let result = jobs.filter(j => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        (j.department || "").toLowerCase().includes(q)
      const matchType = types.length === 0 || types.includes(j.type || "Full Time")
      const matchMode = modes.length === 0 || modes.includes(j.mode || "On-site")
      return matchSearch && matchType && matchMode
    })
    if (sort === "az") result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    return result
  }, [jobs, search, types, modes, sort])

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.5); }
        }
        .ji-input:focus { outline: none; border-color: #1d3a8f !important; box-shadow: 0 0 0 3px rgba(29,58,143,0.1); }
        .ji-select:focus { outline: none; }
        @media (max-width: 860px) {
          .ji-layout { flex-direction: column !important; }
          .ji-sidebar { width: 100% !important; position: static !important; display: flex; gap: 16px; flex-wrap: wrap; }
          .ji-filter-group { flex: 1; min-width: 140px; }
        }
        @media (max-width: 540px) {
          .ji-hero-inner { padding: 32px 16px 24px !important; }
          .ji-searchbar { flex-direction: column !important; }
          .ji-cats { gap: 6px !important; }
        }
      `}</style>

      {/* ── SEARCH HERO (light, like Naukri) ── */}
      <div style={{ background: "linear-gradient(180deg, #eef2ff 0%, #f8faff 100%)", borderBottom: "1px solid #e0e7ff" }}>
        <div className="ji-hero-inner" style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 32px", textAlign: "center" }}>

          <h1 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Find your dream job now
          </h1>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 28, fontWeight: 400 }}>
            {jobs.length}+ curated opportunities — updated regularly
          </p>

          {/* Search bar */}
          <div className="ji-searchbar" style={{ display: "flex", gap: 0, background: "white", borderRadius: 14, border: "1.5px solid #e0e7ff", boxShadow: "0 4px 24px rgba(29,58,143,0.07)", overflow: "hidden", maxWidth: 740, margin: "0 auto 20px" }}>
            <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ position: "absolute", left: 16, color: "#9ca3af", flexShrink: 0 }} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                className="ji-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Job title, company, or skill..."
                style={{
                  width: "100%", padding: "16px 16px 16px 42px",
                  border: "none", background: "transparent",
                  fontSize: 15, color: "#111827", fontWeight: 400,
                  transition: "all 0.2s",
                }}
              />
            </div>
            <div style={{ width: 1, background: "#e5e7eb", margin: "10px 0" }} />
            <div style={{ position: "relative", display: "flex", alignItems: "center", minWidth: 140 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 14, color: "#9ca3af" }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                className="ji-input"
                placeholder="Location"
                style={{
                  width: "100%", padding: "16px 16px 16px 34px",
                  border: "none", background: "transparent",
                  fontSize: 15, color: "#111827", fontWeight: 400,
                }}
              />
            </div>
            <button
              style={{
                padding: "0 28px", background: "#1d3a8f", color: "white",
                border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer",
                transition: "background 0.15s", flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#1e40af"}
              onMouseLeave={e => e.currentTarget.style.background = "#1d3a8f"}
            >
              Search
            </button>
          </div>

          {/* Category chips */}
          <div className="ji-cats" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {QUICK_CATEGORIES.map(cat => {
              const isActive =
                cat.filter === "type" ? types.includes(cat.value) :
                cat.filter === "mode" ? modes.includes(cat.value) :
                search.toLowerCase().includes(cat.value.toLowerCase())
              return (
                <button
                  key={cat.label}
                  onClick={() => {
                    if (cat.filter === "type") toggle(types, setTypes, cat.value)
                    else if (cat.filter === "mode") toggle(modes, setModes, cat.value)
                    else setSearch(cat.value)
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 16px", borderRadius: 99,
                    border: isActive ? "1.5px solid #1d3a8f" : "1.5px solid #e0e7ff",
                    background: isActive ? "#eff6ff" : "white",
                    color: isActive ? "#1d3a8f" : "#6b7280",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    transition: "all 0.15s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = "#c7d2fe"; e.currentTarget.style.color = "#374151" }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "#e0e7ff"; e.currentTarget.style.color = "#6b7280" }}}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ background: "#f4f6fb", minHeight: "60vh" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 80px" }}>
          <div className="ji-layout" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

            {/* ── Sidebar ── */}
            <aside className="ji-sidebar" style={{ width: 236, flexShrink: 0, position: "sticky", top: 116 }}>

              {/* Filter box */}
              <div className="ji-filter-group" style={{ background: "white", borderRadius: 14, border: "1px solid #e8eaf0", padding: "18px 16px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Filter Jobs</span>
                  {activeFilters > 0 && (
                    <button onClick={() => { setTypes([]); setModes([]) }}
                      style={{ fontSize: 12, fontWeight: 600, color: "#1d3a8f", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      Clear
                    </button>
                  )}
                </div>

                <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Job Type</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 18 }}>
                  {ALL_TYPES.map(t => (
                    <label key={t} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 6px", borderRadius: 8, cursor: "pointer", transition: "background 0.12s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{
                        width: 17, height: 17, borderRadius: 5, border: `2px solid ${types.includes(t) ? "#1d3a8f" : "#d1d5db"}`,
                        background: types.includes(t) ? "#1d3a8f" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, transition: "all 0.12s", cursor: "pointer",
                      }}
                        onClick={() => toggle(types, setTypes, t)}
                      >
                        {types.includes(t) && <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </span>
                      <span style={{ fontSize: 13, color: types.includes(t) ? "#1d3a8f" : "#374151", fontWeight: types.includes(t) ? 700 : 500, cursor: "pointer" }}
                        onClick={() => toggle(types, setTypes, t)}>
                        {t}
                      </span>
                    </label>
                  ))}
                </div>

                <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Work Mode</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {ALL_MODES.map(m => (
                    <label key={m} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 6px", borderRadius: 8, cursor: "pointer", transition: "background 0.12s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{
                        width: 17, height: 17, borderRadius: 5, border: `2px solid ${modes.includes(m) ? "#1d3a8f" : "#d1d5db"}`,
                        background: modes.includes(m) ? "#1d3a8f" : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, transition: "all 0.12s", cursor: "pointer",
                      }}
                        onClick={() => toggle(modes, setModes, m)}
                      >
                        {modes.includes(m) && <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </span>
                      <span style={{ fontSize: 13, color: modes.includes(m) ? "#1d3a8f" : "#374151", fontWeight: modes.includes(m) ? 700 : 500, cursor: "pointer" }}
                        onClick={() => toggle(modes, setModes, m)}>
                        {m}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── Job Listings ── */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Topbar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                    {filtered.length} {filtered.length === 1 ? "job" : "jobs"} found
                  </span>
                  {[...types, ...modes].map(f => (
                    <span key={f} style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      fontSize: 11, fontWeight: 700, color: "#1d3a8f",
                      background: "#eff6ff", border: "1px solid #c7d2fe",
                      padding: "3px 10px", borderRadius: 99,
                    }}>
                      {f}
                      <button onClick={() => {
                        if (types.includes(f)) toggle(types, setTypes, f)
                        else toggle(modes, setModes, f)
                      }} style={{ background: "none", border: "none", cursor: "pointer", color: "#93c5fd", padding: 0, lineHeight: 1, fontSize: 14 }}>×</button>
                    </span>
                  ))}
                </div>

                <select
                  className="ji-select"
                  value={sort}
                  onChange={e => setSort(e.target.value as "newest" | "az")}
                  style={{
                    padding: "8px 32px 8px 12px", borderRadius: 8,
                    border: "1px solid #e0e7ff", background: "white",
                    fontSize: 13, fontWeight: 600, color: "#374151",
                    cursor: "pointer", appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="az">A → Z</option>
                </select>
              </div>

              {/* Cards */}
              {filtered.length === 0 ? (
                <div style={{
                  background: "white", borderRadius: 16, border: "1px solid #e8eaf0",
                  padding: "72px 24px", textAlign: "center",
                  animation: "fadeUp 0.35s ease both",
                }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 6 }}>No jobs found</div>
                  <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>Try adjusting your filters or search term</div>
                  <button onClick={clearAll}
                    style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #e0e7ff", background: "white", fontSize: 13, fontWeight: 700, color: "#1d3a8f", cursor: "pointer" }}>
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
