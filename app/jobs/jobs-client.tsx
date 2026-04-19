"use client"

import { useState, useMemo, useRef, type ReactNode } from "react"
import React from "react"
import Link from "next/link"
import type { Job } from "./page"

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const COMPANY_COLORS: Record<string, string> = {
  "Google":                 "#4285F4",
  "Microsoft":              "#00A4EF",
  "Amazon":                 "#FF9900",
  "Meta":                   "#0866FF",
  "Netflix":                "#E50914",
  "Apple":                  "#374151",
  "Flipkart":               "#2874F0",
  "Zomato":                 "#E23744",
  "Swiggy":                 "#FC8019",
  "CRED":                   "#111827",
  "Razorpay":               "#2563EB",
  "Zepto":                  "#8B31F5",
  "Meesho":                 "#9B51E0",
  "PhonePe":                "#5F259F",
  "Ola":                    "#111827",
  "Groww":                  "#5367FF",
  "BrowserStack":           "#F1692F",
  "Trippyway":              "#0F766E",
  "Top Institute of India": "#1D3A8F",
  "Paytm":                  "#00BAF2",
  "Byju's":                 "#6D28D9",
  "InMobi":                 "#E11D48",
  "Freshworks":             "#0ea5e9",
}

const FEATURED_COMPANIES: Array<{
  name: string; industry: string; stage: string; size: string;
  tagline: string; active: boolean; roles?: number
}> = [
  { name: "Trippyway",             industry: "Travel · AI",            stage: "Seed",     size: "50+",    tagline: "AI-powered travel discovery startup",         active: true,  roles: 3 },
  { name: "Netflix",               industry: "Streaming · Tech",       stage: "Public",   size: "12k+",   tagline: "World's leading entertainment platform",       active: true,  roles: 1 },
  { name: "Top Institute of India",industry: "Research · Academia",    stage: "Govt.",    size: "10k+",   tagline: "India's premier science & tech institution",   active: true,  roles: 1 },
  { name: "Google",                industry: "Big Tech · AI",          stage: "Public",   size: "182k+",  tagline: "Organizing the world's information",           active: false },
  { name: "Microsoft",             industry: "Cloud · SaaS",           stage: "Public",   size: "220k+",  tagline: "Empowering every person and organization",     active: false },
  { name: "Flipkart",              industry: "E-Commerce",             stage: "Public",   size: "55k+",   tagline: "India's largest e-commerce marketplace",       active: false },
  { name: "Zomato",                industry: "Food Tech",              stage: "Public",   size: "5.8k+",  tagline: "Delivering food, joy, and happiness",          active: false },
  { name: "Razorpay",              industry: "Fintech",                stage: "Series F", size: "3.2k+",  tagline: "India's leading full-stack payments platform",  active: false },
  { name: "CRED",                  industry: "Consumer Fintech",       stage: "Series E", size: "1.5k+",  tagline: "Rewarding India's most creditworthy citizens", active: false },
  { name: "Zepto",                 industry: "Quick Commerce",         stage: "Series D", size: "2.4k+",  tagline: "Groceries delivered in 10 minutes",            active: false },
  { name: "Meesho",                industry: "Social Commerce",        stage: "Series F", size: "11k+",   tagline: "Democratizing internet commerce for Bharat",   active: false },
  { name: "PhonePe",               industry: "Payments",               stage: "Public",   size: "4.2k+",  tagline: "India's most trusted digital payments app",    active: false },
  { name: "Swiggy",                industry: "Food Delivery",          stage: "Public",   size: "6.5k+",  tagline: "Delivering everyday convenience to millions",  active: false },
  { name: "Groww",                 industry: "Wealthtech",             stage: "Series F", size: "2.1k+",  tagline: "Simplifying investments for everyday Indians", active: false },
  { name: "BrowserStack",          industry: "Dev Tools · SaaS",       stage: "Series B", size: "1.1k+",  tagline: "The world's leading software testing platform",active: false },
  { name: "Ola",                   industry: "Mobility · EV",          stage: "Public",   size: "8k+",    tagline: "Redefining mobility and clean energy for India",active: false },
  { name: "Freshworks",            industry: "B2B SaaS",               stage: "Public",   size: "5k+",    tagline: "Modern software for the modern world",         active: false },
  { name: "InMobi",                industry: "AdTech",                 stage: "Series B", size: "1.8k+",  tagline: "Driving real connections between brands",      active: false },
]

const INDUSTRIES: Array<{
  label: string; sub: string; color: string; bg: string;
  icon: React.ReactNode; search?: string; mode?: string; type?: string
}> = [
  { label: "Engineering",    sub: "Software & Dev",       color: "#1d3a8f", bg: "#eff6ff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, search: "Engineer" },
  { label: "Design",         sub: "UI/UX & Visual",       color: "#7c3aed", bg: "#f5f3ff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>, search: "Design" },
  { label: "AI & ML",        sub: "Machine Learning",     color: "#0891b2", bg: "#ecfeff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, search: "AI" },
  { label: "Product",        sub: "PM & Strategy",        color: "#0f766e", bg: "#f0fdfa",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, search: "Product" },
  { label: "Marketing",      sub: "Growth & Brand",       color: "#b45309", bg: "#fffbeb",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, search: "Marketing" },
  { label: "Finance",        sub: "Fintech & Banking",    color: "#15803d", bg: "#f0fdf4",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, search: "Finance" },
  { label: "HR & People",    sub: "Talent & Culture",     color: "#be185d", bg: "#fdf2f8",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, search: "HR" },
  { label: "Research",       sub: "Science & Labs",       color: "#6d28d9", bg: "#f5f3ff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0-3 7h12l-3-7M9 14h6"/></svg>, search: "Research" },
  { label: "Medical",        sub: "Healthcare & Pharma",  color: "#dc2626", bg: "#fef2f2",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 3-4-6-3 3H2"/></svg>, search: "Medical" },
  { label: "Legal",          sub: "Law & Compliance",     color: "#374151", bg: "#f9fafb",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, search: "Legal" },
  { label: "Sales",          sub: "Business Dev",         color: "#ea580c", bg: "#fff7ed",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, search: "Sales" },
  { label: "Operations",     sub: "Ops & Supply Chain",   color: "#0369a1", bg: "#f0f9ff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>, search: "Operations" },
  { label: "Data & Analytics", sub: "BI & Insights",     color: "#7c3aed", bg: "#f5f3ff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, search: "Data" },
  { label: "Content",        sub: "Writing & Media",      color: "#0891b2", bg: "#ecfeff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>, search: "Content" },
  { label: "Education",      sub: "Teaching & EdTech",    color: "#f59e0b", bg: "#fffbeb",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, search: "Education" },
  { label: "Cybersecurity",  sub: "Infosec & Privacy",    color: "#1d4ed8", bg: "#eff6ff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, search: "Security" },
  { label: "Consulting",     sub: "Strategy & Advisory",  color: "#92400e", bg: "#fef3c7",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, search: "Consulting" },
  { label: "Remote",         sub: "Work from anywhere",   color: "#059669", bg: "#f0fdf4",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, mode: "Remote" },
  { label: "Internship",     sub: "Students & Freshers",  color: "#c2410c", bg: "#fff7ed",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>, type: "Internship" },
  { label: "Logistics",      sub: "Supply & Delivery",    color: "#0f766e", bg: "#f0fdfa",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, search: "Logistics" },
]

const TYPE_S: Record<string, { bg: string; color: string; border: string }> = {
  Internship:  { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "Full Time": { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  Contractual: { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
}
const MODE_S: Record<string, { bg: string; color: string; border: string }> = {
  Remote:    { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  "On-site": { bg: "#faf5ff", color: "#7c3aed", border: "#ddd6fe" },
  Hybrid:    { bg: "#fff7ed", color: "#b45309", border: "#fed7aa" },
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPANY LETTER ICON  (first word, first letter — styled)
───────────────────────────────────────────────────────────────────────────── */
function CompanyIcon({ name, size = 52 }: { name: string; size?: number }) {
  const color = COMPANY_COLORS[name] || "#1d3a8f"
  const letter = name.trim()[0].toUpperCase()
  const r = Math.round(size * 0.22)
  return (
    <div style={{
      width: size, height: size, borderRadius: r, flexShrink: 0,
      background: `${color}14`,
      border: `2px solid ${color}28`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: Math.round(size * 0.42), fontWeight: 900,
      color: color, lineHeight: 1,
      fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
      letterSpacing: "-0.02em",
    }}>
      {letter}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   ACTIVELY HIRING CARD  (Naukri-style: centered logo, name, tagline, CTA)
───────────────────────────────────────────────────────────────────────────── */
function ActiveCard({ company, jobCount, onClick, index }: {
  company: typeof FEATURED_COMPANIES[0]; jobCount: number; onClick: () => void; index: number
}) {
  const [hov, setHov] = useState(false)
  const color = COMPANY_COLORS[company.name] || "#1d3a8f"

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white", borderRadius: 18, textAlign: "center",
        border: hov ? `1.5px solid ${color}45` : "1.5px solid #eef0f6",
        padding: "28px 20px 22px",
        cursor: "pointer", width: "100%",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov ? `0 20px 56px ${color}1c` : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
        animation: `fadeUp 0.45s ease ${index * 0.08}s both`,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
      }}
    >
      {/* Icon */}
      <CompanyIcon name={company.name} size={64} />

      {/* Name */}
      <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginTop: 14, marginBottom: 4, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{company.name}</div>

      {/* Industry */}
      <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, marginBottom: 10 }}>{company.industry}</div>

      {/* Tagline */}
      <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6, marginBottom: 16, maxWidth: 220 }}>{company.tagline}</div>

      {/* Badges */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", background: "#f4f6fb", padding: "3px 10px", borderRadius: 99 }}>{company.stage}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", background: "#f4f6fb", padding: "3px 10px", borderRadius: 99 }}>{company.size}</span>
      </div>

      {/* CTA */}
      <div style={{ width: "100%", borderTop: "1px solid #f4f6fb", paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: "#16a34a" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
          Hiring Now
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: color, background: `${color}12`, padding: "6px 14px", borderRadius: 99, display: "flex", alignItems: "center", gap: 4 }}>
          {jobCount} role{jobCount !== 1 ? "s" : ""}
          <svg width="11" height="11" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMING SOON MARQUEE CARD
───────────────────────────────────────────────────────────────────────────── */
function MarqueeCard({ company }: { company: typeof FEATURED_COMPANIES[0] }) {
  const [watching, setWatching] = useState(false)
  const color = COMPANY_COLORS[company.name] || "#1d3a8f"

  return (
    <div style={{
      background: "white", borderRadius: 18,
      border: "1.5px solid #eef0f6",
      padding: "22px 22px 18px",
      width: 240, flexShrink: 0,
      display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0,
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: 14 }}>
        <CompanyIcon name={company.name} size={46} />
        <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", background: "#f4f6fb", padding: "3px 9px", borderRadius: 99, border: "1px solid #eef0f6" }}>
          Coming Soon
        </span>
      </div>

      <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 3, letterSpacing: "-0.015em" }}>{company.name}</div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>{company.industry}</div>
      <div style={{ fontSize: 11.5, color: "#64748b", lineHeight: 1.6, marginBottom: 14, minHeight: 38 }}>{company.tagline}</div>

      <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: "#6b7280", background: "#f4f6fb", padding: "2px 8px", borderRadius: 99 }}>{company.stage}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: "#6b7280", background: "#f4f6fb", padding: "2px 8px", borderRadius: 99 }}>{company.size}</span>
      </div>

      <button
        onClick={() => setWatching(w => !w)}
        style={{
          width: "100%", padding: "9px 0", borderRadius: 10, border: "none",
          background: watching ? color : "#f4f6fb",
          color: watching ? "white" : "#6b7280",
          fontSize: 12, fontWeight: 700, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
          transform: watching ? "scale(1.02)" : "scale(1)",
        }}
      >
        {watching ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            Watching
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            Watch Company
          </>
        )}
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MARQUEE WRAPPER
───────────────────────────────────────────────────────────────────────────── */
function CompanyMarquee({ companies }: { companies: typeof FEATURED_COMPANIES }) {
  const track = useRef<HTMLDivElement>(null)
  const items = [...companies, ...companies]

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg,#f7f8fc,transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg,#f7f8fc,transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div
        ref={track}
        style={{
          display: "flex", gap: 14,
          animation: "marqueeScroll 40s linear infinite",
          width: "fit-content",
        }}
        onMouseEnter={() => { if (track.current) track.current.style.animationPlayState = "paused" }}
        onMouseLeave={() => { if (track.current) track.current.style.animationPlayState = "running" }}
      >
        {items.map((c, i) => (
          <MarqueeCard key={`${c.name}-${i}`} company={c} />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   JOB CARD
───────────────────────────────────────────────────────────────────────────── */
function JobCard({ job, index }: { job: Job; index: number }) {
  const [saved, setSaved] = useState(false)
  const [hov, setHov] = useState(false)
  const color = COMPANY_COLORS[job.company] || "#1d3a8f"
  const type = job.type || "Full Time"
  const mode = job.mode || "On-site"
  const typeS = TYPE_S[type] || { bg: "#f3f4f6", color: "#374151", border: "#e5e7eb" }
  const modeS = MODE_S[mode] || { bg: "#f3f4f6", color: "#374151", border: "#e5e7eb" }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "white", borderRadius: 16,
        border: hov ? `1.5px solid ${color}40` : "1.5px solid #eef0f6",
        boxShadow: hov ? `0 8px 32px ${color}12` : "0 1px 4px rgba(0,0,0,0.03)",
        overflow: "hidden",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
        animation: `fadeUp 0.4s ease ${index * 0.055}s both`,
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: `linear-gradient(180deg,${color},${color}55)` }} />
      <div style={{ padding: "18px 20px 16px 23px" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <CompanyIcon name={job.company} size={50} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 3px", letterSpacing: "-0.015em", lineHeight: 1.3 }}>{job.title}</h3>
                <div style={{ fontSize: 13, color: "#6b7280", display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 600, color: "#374151" }}>{job.company}</span>
                  <span style={{ color: "#e2e8f0" }}>·</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {job.location}
                  </span>
                  {job.experience && <><span style={{ color: "#e2e8f0" }}>·</span><span>{job.experience}</span></>}
                </div>
              </div>
              <button onClick={() => setSaved(s => !s)} style={{ border: "none", background: "none", cursor: "pointer", padding: 4, color: saved ? "#ef4444" : "#d1d5db", flexShrink: 0, transition: "all 0.15s" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
              <span style={{ ...typeS, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, border: `1px solid ${typeS.border}` }}>{type}</span>
              <span style={{ ...modeS, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, border: `1px solid ${modeS.border}` }}>{mode}</span>
              {job.department && <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, background: "#faf5ff", color: "#7c3aed", border: "1px solid #ddd6fe" }}>{job.department}</span>}
              {job.experience && <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, background: "#fffbeb", color: "#b45309", border: "1px solid #fde68a" }}>{job.experience}</span>}
            </div>
            {job.description && (
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, margin: "10px 0 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                {job.description}
              </p>
            )}
          </div>
        </div>
      </div>
      <div style={{ padding: "11px 20px 11px 23px", borderTop: "1px solid #f8fafc", background: "#fafbff", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "#16a34a" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
            Actively Hiring
          </span>
          {job.duration && <span style={{ fontSize: 11, color: "#94a3b8" }}>· {job.duration}</span>}
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          {!job.applyUrl && (
            <Link href={`/jobs/${job.slug}`}
              style={{ fontSize: 12, fontWeight: 600, color: "#374151", padding: "6px 14px", borderRadius: 8, border: "1px solid #e0e7ff", background: "white", textDecoration: "none", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e7ff"; e.currentTarget.style.color = "#374151" }}>
              Details
            </Link>
          )}
          <a href={job.applyUrl ?? `/jobs/${job.slug}`} {...(job.applyUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            style={{ fontSize: 12, fontWeight: 700, color: "white", padding: "6px 18px", borderRadius: 8, background: color, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, transition: "opacity 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Apply Now
            <svg width="11" height="11" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SIDEBAR CHECKBOX
───────────────────────────────────────────────────────────────────────────── */
function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 8px", borderRadius: 8, cursor: "pointer" }}
      onMouseEnter={e => e.currentTarget.style.background = "#f5f7ff"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
      <span onClick={onChange} style={{ width: 17, height: 17, borderRadius: 5, flexShrink: 0, border: `2px solid ${checked ? "#1d3a8f" : "#d1d5db"}`, background: checked ? "#1d3a8f" : "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.12s", cursor: "pointer" }}>
        {checked && <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      <span onClick={onChange} style={{ fontSize: 13, color: checked ? "#1d3a8f" : "#374151", fontWeight: checked ? 700 : 500, cursor: "pointer" }}>{label}</span>
    </label>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────────────────────── */
export function JobsClient({ jobs }: { jobs: Job[] }) {
  const [search, setSearch]     = useState("")
  const [location, setLocation] = useState("")
  const [types, setTypes]       = useState<string[]>([])
  const [modes, setModes]       = useState<string[]>([])
  const [sort, setSort]         = useState<"newest" | "az">("newest")
  const jobsRef = useRef<HTMLDivElement>(null)

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  const clearAll = () => { setSearch(""); setLocation(""); setTypes([]); setModes([]) }
  const scrollToJobs = () => setTimeout(() => jobsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80)

  const companiesMap = useMemo(() => {
    const m: Record<string, Job[]> = {}
    jobs.forEach(j => { if (!m[j.company]) m[j.company] = []; m[j.company].push(j) })
    return m
  }, [jobs])

  const filtered = useMemo(() => {
    let r = jobs.filter(j => {
      const q = search.toLowerCase(), loc = location.toLowerCase()
      return (
        (!q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || (j.department || "").toLowerCase().includes(q)) &&
        (!loc || j.location.toLowerCase().includes(loc)) &&
        (types.length === 0 || types.includes(j.type || "Full Time")) &&
        (modes.length === 0 || modes.includes(j.mode || "On-site"))
      )
    })
    if (sort === "az") r = [...r].sort((a, b) => a.title.localeCompare(b.title))
    return r
  }, [jobs, search, location, types, modes, sort])

  const activeFilters = types.length + modes.length + (search ? 1 : 0)
  const comingSoon = FEATURED_COMPANIES.filter(c => !c.active)
  const activeCompanies = FEATURED_COMPANIES.filter(c => c.active)

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.7)} }
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes floatChip {
          0%,100% { transform: translateY(0px); opacity: 0.7; }
          50%      { transform: translateY(-10px); opacity: 1; }
        }
        .ji-cat-scroll::-webkit-scrollbar{display:none}
        .ji-inp{border:none;background:transparent;font-size:14px;color:#0f172a;width:100%;padding:18px 0;}
        .ji-inp:focus{outline:none;}
        .ji-inp::placeholder{color:#94a3b8;}
        @media(max-width:960px){
          .ji-layout{flex-direction:column!important}
          .ji-sidebar{width:100%!important;position:static!important;flex-direction:row!important;flex-wrap:wrap;gap:12px!important}
          .ji-fbox{flex:1;min-width:180px}
          .ji-active-grid{grid-template-columns:repeat(3,1fr)!important}
        }
        @media(max-width:640px){
          .ji-hero-h{font-size:28px!important;letter-spacing:-.03em!important}
          .ji-searchbar{flex-direction:column!important;border-radius:16px!important}
          .ji-sdiv{display:none!important}
          .ji-active-grid{grid-template-columns:1fr 1fr!important}
          .ji-cat-grid{grid-template-columns:repeat(2,1fr)!important;gap:8px!important}
          .ji-stats{gap:20px!important}
        }
        @media(min-width:641px) and (max-width:960px){
          .ji-cat-grid{grid-template-columns:repeat(3,1fr)!important}
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO — matches Jobingen design system
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(180deg,#f8faff 0%,#eef2ff 50%,#fff 100%)", position: "relative", overflow: "hidden", borderBottom: "1px solid #e8edf8" }}>

        {/* Subtle background accents */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: -80, right: "8%",  width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,58,143,0.06) 0%,transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: -40, left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,91,219,0.05) 0%,transparent 70%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(29,58,143,0.035) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        {/* Floating company chips */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {[
            { name: "Google",    top: "18%", left: "5%",   delay: "0s"   },
            { name: "Netflix",   top: "28%", right: "6%",  delay: "0.5s" },
            { name: "Microsoft", top: "62%", left: "3%",   delay: "1s"   },
            { name: "Zomato",    top: "68%", right: "7%",  delay: "0.3s" },
            { name: "Razorpay",  top: "42%", left: "1.5%", delay: "1.3s" },
            { name: "Flipkart",  top: "78%", left: "18%",  delay: "0.7s" },
            { name: "Zepto",     top: "14%", right: "20%", delay: "1s"   },
            { name: "Groww",     top: "72%", right: "20%", delay: "0.4s" },
          ].map(c => {
            const col = COMPANY_COLORS[c.name] || "#1d3a8f"
            return (
              <div key={c.name} style={{
                position: "absolute", top: c.top, left: c.left, right: c.right,
                display: "flex", alignItems: "center", gap: 7,
                background: "white",
                border: `1.5px solid ${col}20`,
                borderRadius: 99, padding: "6px 14px 6px 8px",
                boxShadow: `0 4px 16px ${col}10`,
                animation: `floatChip 6s ease-in-out ${c.delay} infinite`,
              }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${col}15`, border: `1.5px solid ${col}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: col }}>
                  {c.name[0]}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{c.name}</span>
              </div>
            )
          })}
        </div>

        {/* Main content */}
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto", padding: "64px 24px 60px", textAlign: "center" }}>

          {/* Live pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 22, padding: "5px 16px", borderRadius: 99, background: "white", border: "1.5px solid #e0e7ff", boxShadow: "0 2px 12px rgba(29,58,143,0.07)", animation: "fadeUp 0.5s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1d3a8f" }}>Updated Daily — New roles every morning</span>
          </div>

          {/* Headline — matches landing page style */}
          <h1 className="ji-hero-h" style={{ fontSize: "clamp(32px,5.5vw,56px)", fontWeight: 900, color: "#0f172a", marginBottom: 14, letterSpacing: "-0.04em", lineHeight: 1.08, animation: "fadeUp 0.5s ease 0.1s both" }}>
            Find your next role at<br />
            <span style={{ background: "linear-gradient(135deg,#1d3a8f 0%,#3b5bdb 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              India's best companies.
            </span>
          </h1>

          <p style={{ fontSize: 17, color: "#64748b", fontWeight: 400, maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.72, animation: "fadeUp 0.5s ease 0.18s both" }}>
            Curated roles from top startups &amp; companies — no noise, only the best.
          </p>

          {/* Search bar — on-brand white elevated */}
          <div className="ji-searchbar" style={{ display: "flex", background: "white", borderRadius: 18, border: "1.5px solid #dde3f5", boxShadow: "0 8px 48px rgba(29,58,143,0.12)", maxWidth: 800, margin: "0 auto 22px", overflow: "hidden", animation: "fadeUp 0.5s ease 0.25s both" }}>
            <div style={{ flex: 1.8, display: "flex", alignItems: "center", padding: "0 18px", gap: 10 }}>
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input className="ji-inp" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && scrollToJobs()} placeholder="Job title, company, or skill..." />
            </div>
            <div className="ji-sdiv" style={{ width: 1, background: "#eef0f6", margin: "12px 0" }} />
            <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 18px", gap: 10 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <input className="ji-inp" value={location} onChange={e => setLocation(e.target.value)} onKeyDown={e => e.key === "Enter" && scrollToJobs()} placeholder="City or Remote" />
            </div>
            <button onClick={scrollToJobs}
              style={{ padding: "0 32px", background: "linear-gradient(135deg,#1d3a8f 0%,#3b5bdb 100%)", color: "white", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "opacity 0.15s", flexShrink: 0, letterSpacing: "-0.01em" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Search
            </button>
          </div>

          {/* Quick tags */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 40, animation: "fadeUp 0.5s ease 0.32s both" }}>
            {["Remote", "Internship", "AI & ML", "Design", "Engineering", "Full Time"].map(tag => (
              <button key={tag}
                onClick={() => {
                  if (tag === "Remote") { setModes(["Remote"]); setTypes([]); setSearch("") }
                  else if (tag === "Internship" || tag === "Full Time") { setTypes([tag]); setModes([]); setSearch("") }
                  else setSearch(tag)
                  scrollToJobs()
                }}
                style={{ padding: "6px 16px", borderRadius: 99, border: "1.5px solid #e0e7ff", background: "white", color: "#4b5563", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", boxShadow: "0 1px 4px rgba(29,58,143,0.05)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1d3a8f"; e.currentTarget.style.color = "#1d3a8f"; e.currentTarget.style.background = "#eff6ff" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e7ff"; e.currentTarget.style.color = "#4b5563"; e.currentTarget.style.background = "white" }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="ji-stats" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap", animation: "fadeUp 0.5s ease 0.38s both" }}>
            {[
              { val: `${jobs.length}+`, label: "Open roles" },
              { val: `${Object.keys(companiesMap).length}`, label: "Hiring now" },
              { val: `${FEATURED_COMPANIES.length}+`, label: "Companies tracked" },
              { val: "Daily", label: "New listings" },
            ].map((s, i) => (
              <>
                <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "0 24px" }}>
                  <span style={{ fontSize: 20, fontWeight: 900, color: "#1d3a8f", letterSpacing: "-0.03em" }}>{s.val}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{s.label}</span>
                </div>
                {i < 3 && <div key={`d${i}`} style={{ width: 1, height: 28, background: "#e0e7ff" }} />}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BROWSE BY CATEGORY — horizontal scroll
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "white", borderBottom: "1px solid #eef0f6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 0 36px 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, paddingRight: 24, flexWrap: "wrap", gap: 8 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.025em" }}>Browse by Category</h2>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>All fields — tech, medical, legal, business &amp; more</p>
            </div>
            <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{INDUSTRIES.length} categories · scroll →</span>
          </div>

          {/* Scroll track */}
          <div style={{ position: "relative" }}>
            {/* Right fade */}
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(270deg,white,transparent)", zIndex: 2, pointerEvents: "none" }} />

            <div
              style={{ display: "flex", gap: 12, overflowX: "auto", paddingRight: 60, paddingBottom: 4, scrollbarWidth: "none" }}
              className="ji-cat-scroll"
            >
              {INDUSTRIES.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => {
                    if (cat.type)      { setTypes([cat.type]); setModes([]); setSearch("") }
                    else if (cat.mode) { setModes([cat.mode]); setTypes([]); setSearch("") }
                    else               { setSearch(cat.search!); setTypes([]); setModes([]) }
                    scrollToJobs()
                  }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-start",
                    padding: "16px 16px 14px", borderRadius: 16, textAlign: "left",
                    border: "1.5px solid #f0f2f8", background: "white", cursor: "pointer",
                    transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
                    animation: `fadeUp 0.4s ease ${Math.min(i, 8) * 0.04}s both`,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                    flexShrink: 0, width: 160,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${cat.color}40`
                    e.currentTarget.style.background = cat.bg
                    e.currentTarget.style.transform = "translateY(-3px)"
                    e.currentTarget.style.boxShadow = `0 10px 28px ${cat.color}14`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#f0f2f8"
                    e.currentTarget.style.background = "white"
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.03)"
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 11, marginBottom: 12,
                    background: cat.bg, color: cat.color,
                    border: `1.5px solid ${cat.color}22`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {cat.icon}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 2, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{cat.label}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 10, lineHeight: 1.4 }}>{cat.sub}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 700, color: cat.color, marginTop: "auto" }}>
                    Explore
                    <svg width="10" height="10" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED COMPANIES — ACTIVELY HIRING
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f7f8fc", borderBottom: "1px solid #eef0f6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.025em" }}>Companies Actively Hiring</h2>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>Live openings — apply directly through Jobingen</p>
            </div>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "6px 14px", borderRadius: 99 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", animation: "pulseDot 2s infinite", display: "inline-block" }} />
              {activeCompanies.length} companies live
            </span>
          </div>

          <div className="ji-active-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${activeCompanies.length}, 1fr)`, gap: 16, paddingBottom: 44 }}>
            {activeCompanies.map((c, i) => (
              <ActiveCard key={c.name} company={c} index={i}
                jobCount={companiesMap[c.name]?.length || 0}
                onClick={() => { setSearch(c.name); scrollToJobs() }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMING SOON — AUTO-SCROLL MARQUEE
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#f7f8fc", borderBottom: "1px solid #eef0f6", paddingBottom: 44 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 0 0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "36px 24px 22px 0", flexWrap: "wrap", gap: 10 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.025em" }}>
                Coming Soon
                <span style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", background: "#f0f2f8", border: "1px solid #e8eaf0", padding: "3px 10px", borderRadius: 99, marginLeft: 10, verticalAlign: "middle" }}>
                  {comingSoon.length} tracked
                </span>
              </h2>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>Watch companies — get notified when they go live. Hover to pause.</p>
            </div>
          </div>
        </div>
        <CompanyMarquee companies={comingSoon} />
      </section>

      {/* ══════════════════════════════════════════════════════
          JOB LISTINGS
      ══════════════════════════════════════════════════════ */}
      <section ref={jobsRef} style={{ background: "#f4f6fb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px 80px" }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 3px", letterSpacing: "-0.025em" }}>All Open Positions</h2>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>{jobs.length} roles · updated daily</p>
          </div>

          <div className="ji-layout" style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
            <aside className="ji-sidebar" style={{ width: 228, flexShrink: 0, position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="ji-fbox" style={{ background: "white", borderRadius: 14, border: "1px solid #eef0f6", padding: "16px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>Filters</span>
                  {activeFilters > 0 && <button onClick={clearAll} style={{ fontSize: 11, fontWeight: 600, color: "#1d3a8f", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Clear ({activeFilters})</button>}
                </div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Job Type</p>
                {["Internship", "Full Time", "Contractual"].map(t => <Checkbox key={t} label={t} checked={types.includes(t)} onChange={() => toggle(types, setTypes, t)} />)}
                <div style={{ height: 1, background: "#f0f2f8", margin: "12px 0" }} />
                <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Work Mode</p>
                {["Remote", "On-site", "Hybrid"].map(m => <Checkbox key={m} label={m} checked={modes.includes(m)} onChange={() => toggle(modes, setModes, m)} />)}
              </div>
              <div style={{ background: "linear-gradient(145deg,#0f172a,#1d3a8f)", borderRadius: 14, padding: "20px 16px" }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>🔔</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "white", marginBottom: 6 }}>Job Alerts</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 14 }}>Be first to know when new roles go live. No spam — ever.</div>
                <button style={{ width: "100%", padding: "9px 0", borderRadius: 9, border: "1.5px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "white", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.2)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)" }}>
                  Enable Alerts
                </button>
              </div>
            </aside>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{filtered.length} {filtered.length === 1 ? "role" : "roles"} found</span>
                  {[...types, ...modes, ...(search ? [`"${search}"`] : [])].map(f => (
                    <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "#1d3a8f", background: "#eff6ff", border: "1px solid #c7d2fe", padding: "3px 10px", borderRadius: 99 }}>
                      {f}
                      <button onClick={() => { if (types.includes(f)) toggle(types, setTypes, f); else if (modes.includes(f)) toggle(modes, setModes, f); else setSearch("") }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#93c5fd", padding: 0, fontSize: 15, lineHeight: 1 }}>×</button>
                    </span>
                  ))}
                </div>
                <select value={sort} onChange={e => setSort(e.target.value as "newest" | "az")}
                  style={{ padding: "7px 30px 7px 10px", borderRadius: 8, border: "1px solid #e0e7ff", background: "white", fontSize: 12, fontWeight: 600, color: "#374151", cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}>
                  <option value="newest">Newest First</option>
                  <option value="az">A → Z</option>
                </select>
              </div>

              {filtered.length === 0 ? (
                <div style={{ background: "white", borderRadius: 16, border: "1px solid #eef0f6", padding: "72px 24px", textAlign: "center", animation: "fadeUp 0.35s ease both" }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>No roles match</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>Try a different keyword or clear your filters</div>
                  <button onClick={clearAll} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #e0e7ff", background: "white", fontSize: 13, fontWeight: 700, color: "#1d3a8f", cursor: "pointer" }}>Clear filters</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {filtered.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
