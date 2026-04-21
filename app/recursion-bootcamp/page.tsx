"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

/* ─── Types ─────────────────────────────────────────────── */
type Year = "1st Year Student" | "2nd Year Student" | "3rd Year Student" | "Final Year" | "Working Professional"
type Level = "Beginner" | "Intermediate" | "Advanced"
type Lang = "C++" | "Python" | "Java"

/* ─── Data ───────────────────────────────────────────────── */
const LEARN_CARDS = [
  {
    n: "01",
    title: "Base Recursion Fundamentals",
    points: ["Base case vs recursive case", "Stack visualization", "Factorial and Fibonacci examples"],
    color: "#1d3a8f", bg: "#eef1fd",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  },
  {
    n: "02",
    title: "Recursive Tree & Depth Analysis",
    points: ["Visualizing recursion trees", "Understanding branching", "Time complexity from recursion depth"],
    color: "#7c3aed", bg: "#f5f3ff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>,
  },
  {
    n: "03",
    title: "Parameter Passing & State",
    points: ["Passing parameters correctly", "Managing recursion state", "Avoiding unnecessary copies"],
    color: "#0891b2", bg: "#ecfeff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    n: "04",
    title: "Transition to Backtracking",
    points: ["Exploring all possibilities", "Undoing choices (backtrack step)", "DFS mindset"],
    color: "#16a34a", bg: "#f0fdf4",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
  },
  {
    n: "05",
    title: "Real Backtracking Problems",
    points: ["Subsets & Permutations", "Combination Sum", "N-Queens problem"],
    color: "#dc2626", bg: "#fef2f2",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
]

const OUTCOMES = [
  { icon: "🧠", title: "Deep Recursion Intuition",  desc: "Build lasting mental models for how recursive calls expand and resolve." },
  { icon: "⚡", title: "Backtracking Mastery",       desc: "Confidently solve subset, permutation, and constraint problems." },
  { icon: "🎯", title: "LeetCode Med–Hard Ready",    desc: "Strong foundation to tackle medium and hard recursive problems." },
  { icon: "🔍", title: "Complexity Thinking",        desc: "Analyze time and space from recursion trees — not just formulas." },
]

const PREREQS = [
  "Basic C++ knowledge (functions, loops, arrays)",
  "Comfortable writing simple programs",
  "Basic understanding of vectors or arrays",
]

/* ─── Small components ────────────────────────────────────── */
function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-black text-[#7c3aed] uppercase tracking-[0.12em] mb-3">{children}</p>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(22px,3vw,32px)] font-black text-slate-900 tracking-[-0.03em] leading-[1.15] mb-4">
      {children}
    </h2>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5 normal-case font-normal tracking-normal">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[14px] text-slate-800 outline-none transition-all focus:bg-white focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/10 placeholder:text-slate-400 font-[inherit]"

/* ─── Page ────────────────────────────────────────────────── */
export default function RecursionBootcampPage() {
  const formRef = useRef<HTMLDivElement>(null)

  const [done, setDone]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")

  const [fullName, setFullName] = useState("")
  const [email, setEmail]       = useState("")
  const [phone, setPhone]       = useState("")
  const [college, setCollege]   = useState("")
  const [year, setYear]         = useState<Year | "">("")
  const [level, setLevel]       = useState<Level | "">("")
  const [lang, setLang]         = useState<Lang>("C++")

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fullName.trim() || !email.trim() || !phone.trim() || !college.trim() || !year || !level) {
      setError("Please fill all required fields."); return
    }
    setLoading(true); setError("")
    try {
      const res = await fetch("/api/recursion-bootcamp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, email, phone, college, current_year: year, experience_level: level, preferred_language: lang }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Registration failed."); return }
      setDone(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch { setError("Network error. Please try again.") }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <Navbar />
      <div style={{ height: 108 }} className="rb-nav-spacer" />

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="rb-hero" style={{ background: "linear-gradient(180deg,#f0f4ff 0%,#e8edff 60%,#f8faff 100%)", padding: "72px 24px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-15%", right: "3%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "2%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,58,143,0.06) 0%,transparent 70%)" }} />
          <div style={{ position: "absolute", top: "30%", left: "8%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", background: "white", border: "1.5px solid #dde5ff", borderRadius: 99, marginBottom: 28, boxShadow: "0 2px 12px rgba(124,58,237,0.1)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7c3aed", display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: "#7c3aed", letterSpacing: ".07em", textTransform: "uppercase" }}>Live Bootcamp · Recursion & Backtracking</span>
          </div>

          <h1 style={{ fontSize: "clamp(26px,4.5vw,50px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 20 }}>
            Recursion Deep Dive:{" "}
            <span style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              From Call Stack
            </span>
            {" "}to<br />Backtracking Mastery
          </h1>

          <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.75, maxWidth: 580, margin: "0 auto 16px" }}>
            Master recursion from first principles and develop deep problem-solving skills through structured recursion thinking and backtracking techniques.
          </p>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 40px" }}>
            A focused bootcamp designed to help developers build strong intuition for recursion — understanding how complex problems are solved using recursive depth, stack flow, and backtracking strategies.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <button onClick={scrollToForm}
              style={{ fontSize: 15, fontWeight: 700, color: "white", padding: "14px 32px", borderRadius: 14, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", boxShadow: "0 4px 20px rgba(124,58,237,0.35)", transition: "all .2s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
              Register for Bootcamp →
            </button>
            <a href="#curriculum"
              style={{ fontSize: 15, fontWeight: 600, color: "#374151", padding: "14px 28px", borderRadius: 14, border: "1.5px solid #e0e7ff", background: "white", cursor: "pointer", textDecoration: "none", transition: "all .2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8faff")}
              onMouseLeave={e => (e.currentTarget.style.background = "white")}>
              View Curriculum
            </a>
          </div>

          {/* Stats strip */}
          <div className="rb-stats" style={{ display: "inline-grid", gridTemplateColumns: "repeat(4,1fr)", background: "white", border: "1.5px solid #e0e7ff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(124,58,237,0.08)" }}>
            {[
              { val: "5",      label: "Core Modules"     },
              { val: "C++",    label: "Language"         },
              { val: "Live",   label: "Session Format"   },
              { val: "Free",   label: "No Cost"          },
            ].map((s, i) => (
              <div key={s.label} className="rb-stat-cell" style={{ padding: "16px 24px", textAlign: "center", borderRight: i < 3 ? "1px solid #f1f5f9" : "none" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#7c3aed", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SESSION OVERVIEW
      ══════════════════════════════════════════════ */}
      <section style={{ background: "white", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} className="rb-overview-grid">
            <div>
              <SectionLabel>Session Overview</SectionLabel>
              <SectionHeading>A complete deep dive into recursion</SectionHeading>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 20 }}>
                This session focuses on building strong intuition around recursion depth, stack behavior, and recursive problem-solving patterns.
              </p>
              <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85 }}>
                Instead of jumping across topics, we go <strong style={{ color: "#1d3a8f" }}>depth-wise into recursion</strong> to understand how problems expand and resolve through recursive calls — giving you the foundation to crack any backtracking problem.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "🎯", title: "Focused & Structured",  desc: "Every topic builds on the last — no random topic jumping." },
                { icon: "🧩", title: "Problem-First Approach", desc: "Real LeetCode-style problems from start to finish." },
                { icon: "📈", title: "Complexity Aware",       desc: "Learn to analyze time and space from the recursion tree." },
                { icon: "💬", title: "Live Interaction",       desc: "Ask questions, get clarity, and code along in real time." },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 14, padding: "16px 18px", background: "#fafbff", borderRadius: 14, border: "1px solid #e8ecf4" }}>
                  <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT YOU WILL LEARN
      ══════════════════════════════════════════════ */}
      <section id="curriculum" style={{ padding: "80px 24px", background: "#f8faff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>Curriculum</SectionLabel>
            <SectionHeading>What You Will Learn</SectionHeading>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 480, margin: "0 auto" }}>
              Five tightly structured modules that take you from recursion basics all the way to real backtracking problems.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {LEARN_CARDS.map((card, i) => (
              <div key={card.n} style={{ display: "flex", gap: 20, background: "white", borderRadius: 18, border: "1.5px solid #e8ecf4", padding: "24px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "box-shadow .2s, transform .2s" }}
                className="rb-learn-card">
                {/* Number */}
                <div style={{ flexShrink: 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: card.bg, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, border: `1.5px solid ${card.color}20` }}>
                    {card.n}
                  </div>
                  {i < LEARN_CARDS.length - 1 && (
                    <div style={{ width: 2, height: "calc(100% + 16px)", background: `${card.color}18`, borderRadius: 2, margin: "8px auto 0", marginLeft: 21 }} />
                  )}
                </div>
                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ color: card.color }}>{card.icon}</div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>{card.title}</h3>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {card.points.map(p => (
                      <div key={p} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: card.bg, borderRadius: 99, border: `1px solid ${card.color}18` }}>
                        <CheckIcon color={card.color} />
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: card.color }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          COMPLEXITY + TECH STACK — side by side
      ══════════════════════════════════════════════ */}
      <section style={{ background: "white", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "72px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="rb-two-col">

          {/* Tools */}
          <div style={{ background: "#fafbff", borderRadius: 20, border: "1.5px solid #e8ecf4", padding: "32px 30px" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "#eef1fd", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <p style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Tools & Language</p>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 12 }}>Built in C++</h3>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, marginBottom: 20 }}>
              All examples and problems are coded in C++ — the language most commonly used in competitive programming and DSA interviews.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "vectors and recursion functions",
                "Passing references correctly",
                "Organizing recursive logic cleanly",
                "Writing clean backtracking templates",
              ].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckIcon color="#1d3a8f" />
                  <span style={{ fontSize: 13, color: "#374151" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complexity */}
          <div style={{ background: "linear-gradient(135deg,#1d3a8f,#4f46e5)", borderRadius: 20, padding: "32px 30px", color: "white" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <p style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.6)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Thinking in Depth</p>
            <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 12 }}>Complexity From Trees</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 24 }}>
              Stop memorizing formulas — learn to derive complexity by reading the recursion tree directly.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Time Complexity",  formula: "O(branching factor ^ depth)",   sub: "Read from the recursion tree width" },
                { label: "Space Complexity", formula: "O(depth of recursion stack)",    sub: "One frame per recursive call" },
              ].map(c => (
                <div key={c.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "monospace", marginBottom: 3 }}>{c.formula}</div>
                  <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PREREQUISITES + OUTCOMES
      ══════════════════════════════════════════════ */}
      <section style={{ padding: "72px 24px", background: "#f8faff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 40, alignItems: "start" }} className="rb-two-col">

          {/* Prerequisites */}
          <div style={{ background: "white", borderRadius: 20, border: "1.5px solid #e8ecf4", padding: "28px 26px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Prerequisites</p>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 6 }}>What you need</h3>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>
              This bootcamp is beginner-friendly. You don&apos;t need to know recursion — just the basics below.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PREREQS.map(p => (
                <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <CheckIcon color="#16a34a" />
                  </div>
                  <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: "12px 14px", background: "#f5f3ff", borderRadius: 10, border: "1px solid #ede9fe" }}>
              <span style={{ fontSize: 12, color: "#7c3aed", fontWeight: 600 }}>💡 No prior recursion knowledge needed — we start from zero.</span>
            </div>
          </div>

          {/* Outcomes */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Outcomes</p>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 6 }}>What You Will Gain</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 24 }}>
              By the end of this bootcamp, you won&apos;t just know recursion — you&apos;ll think recursively.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {OUTCOMES.map(o => (
                <div key={o.title} style={{ background: "white", borderRadius: 16, border: "1.5px solid #e8ecf4", padding: "20px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{o.icon}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{o.title}</div>
                  <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.65 }}>{o.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          REGISTRATION FORM
      ══════════════════════════════════════════════ */}
      <section ref={formRef} style={{ padding: "80px 24px 100px", background: "white", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel>Registration</SectionLabel>
            <SectionHeading>Secure Your Seat</SectionHeading>
            <p style={{ fontSize: 15, color: "#64748b", maxWidth: 440, margin: "0 auto" }}>
              Fill in your details below. This bootcamp is free — just register and show up.
            </p>
          </div>

          {done ? (
            /* Success */
            <div style={{ background: "linear-gradient(135deg,#f5f3ff,#eef2ff)", borderRadius: 24, border: "1.5px solid #ddd6fe", padding: "52px 40px", textAlign: "center", boxShadow: "0 8px 32px rgba(124,58,237,0.1)" }}>
              <div style={{ position: "relative", width: 72, height: 72, margin: "0 auto 24px" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: "rgba(124,58,237,0.15)", animation: "rbping 1.5s infinite" }} />
                <div style={{ position: "relative", width: 72, height: 72, borderRadius: 18, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(124,58,237,0.35)" }}>
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 12 }}>You&apos;re Registered!</h2>
              <p style={{ fontSize: 15, color: "#4c1d95", lineHeight: 1.75, maxWidth: 440, margin: "0 auto 28px" }}>
                Your seat for the <strong>Recursion Deep Dive Bootcamp</strong> has been successfully reserved. We&apos;ll send session details to your email.
              </p>
              <Link href="/"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "white", textDecoration: "none", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>
                Back to Home →
              </Link>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} style={{ background: "#fafbff", borderRadius: 24, border: "1.5px solid #e8ecf4", padding: "36px 36px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }} className="rb-form-pad">

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="rb-form-grid">
                <Field label="Full Name" required>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g. Priya Sharma" className={inputCls} />
                </Field>
                <Field label="Email Address" required>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className={inputCls} />
                </Field>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="rb-form-grid">
                <Field label="Phone Number" required>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className={inputCls} />
                </Field>
                <Field label="College / University" required>
                  <input type="text" value={college} onChange={e => setCollege(e.target.value)} placeholder="e.g. NIT Allahabad" className={inputCls} />
                </Field>
              </div>

              <div style={{ marginBottom: 20 }}>
                <Field label="Current Year / Status" required>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                    {(["1st Year Student","2nd Year Student","3rd Year Student","Final Year","Working Professional"] as Year[]).map(y => (
                      <button key={y} type="button" onClick={() => setYear(y)}
                        style={{ padding: "7px 14px", borderRadius: 99, fontSize: 12.5, fontWeight: 600, border: "1.5px solid", cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
                          borderColor: year === y ? "#7c3aed" : "#e2e8f0",
                          background:  year === y ? "#7c3aed" : "white",
                          color:       year === y ? "white" : "#374151",
                        }}>
                        {y}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }} className="rb-form-grid">
                <Field label="Experience Level" required>
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    {(["Beginner","Intermediate","Advanced"] as Level[]).map(l => (
                      <button key={l} type="button" onClick={() => setLevel(l)}
                        style={{ flex: 1, padding: "8px 4px", borderRadius: 10, fontSize: 12, fontWeight: 700, border: "1.5px solid", cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
                          borderColor: level === l ? "#7c3aed" : "#e2e8f0",
                          background:  level === l ? "#f5f3ff" : "white",
                          color:       level === l ? "#7c3aed" : "#64748b",
                        }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Preferred Language">
                  <select value={lang} onChange={e => setLang(e.target.value as Lang)} className={inputCls}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36, appearance: "none" }}>
                    <option value="C++">C++</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                  </select>
                </Field>
              </div>

              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 16px", marginBottom: 20 }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                  <span style={{ fontSize: 13, color: "#dc2626", fontWeight: 500 }}>{error}</span>
                </div>
              )}

              <button type="submit" disabled={loading}
                style={{ width: "100%", padding: "15px", borderRadius: 14, fontSize: 15, fontWeight: 800, color: "white", border: "none", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, opacity: loading ? 0.7 : 1, transition: "all .2s",
                  background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                  boxShadow: "0 6px 24px rgba(124,58,237,0.35)",
                  fontFamily: "inherit",
                }}>
                {loading
                  ? <><span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "rbspin .6s linear infinite" }} /> Registering…</>
                  : <>Secure My Seat →</>
                }
              </button>

              <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 14 }}>
                100% free. No payment required. We&apos;ll email you session details.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rbspin { to { transform: rotate(360deg) } }
        @keyframes rbping { 0%,100% { opacity:.6; transform: scale(1) } 50% { opacity:.2; transform: scale(1.35) } }

        .rb-learn-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.08) !important; transform: translateY(-1px) }

        @media (max-width: 640px) {
          .rb-nav-spacer { height: 72px !important }
          .rb-hero       { padding: 48px 16px 44px !important }
          .rb-stats      { grid-template-columns: repeat(2,1fr) !important; width: calc(100% - 32px) !important }
          .rb-stat-cell:nth-child(1) { border-bottom: 1px solid #f1f5f9 }
          .rb-stat-cell:nth-child(2) { border-right: none !important; border-bottom: 1px solid #f1f5f9 }
          .rb-stat-cell:nth-child(3) { border-right: none !important }
          .rb-stat-cell  { padding: 12px 14px !important }
          .rb-overview-grid { grid-template-columns: 1fr !important; gap: 32px !important }
          .rb-two-col    { grid-template-columns: 1fr !important; gap: 20px !important }
          .rb-form-grid  { grid-template-columns: 1fr !important }
          .rb-form-pad   { padding: 24px 20px !important }
        }
      ` }} />
    </div>
  )
}
