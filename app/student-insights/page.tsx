"use client"

import { useState } from "react"
import { JobingenLogo } from "@/components/jobingen-logo"

// ─── CSS ─────────────────────────────────────────────────────────
const CSS = `
  :root {
    --ink:    #09090f;
    --ink2:   #3d3d52;
    --ink3:   #8a8aa8;
    --cream:  #f4f4f8;
    --white:  #ffffff;
    --border: rgba(10,10,20,0.08);
    --ind:    #1d3a8f;
    --ind2:   #2548c5;
    --ind-l:  #eef1fd;
    --grn:    #10b981;
    --grn-l:  #ecfdf5;
    --rose:   #f43f5e;
    --rose-l: #fff1f2;
    --amb:    #f59e0b;
    --amb-l:  #fffbeb;
    --vio:    #7c3aed;
    --vio-l:  #f3f0ff;
    --shadow-sm: 0 1px 4px rgba(10,10,20,0.06);
    --shadow-md: 0 4px 24px rgba(10,10,20,0.08);
    --shadow-lg: 0 8px 40px rgba(10,10,20,0.12);
    --spring:   cubic-bezier(.34,1.56,.64,1);
    --ease-out: cubic-bezier(.16,1,.3,1);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; background: var(--cream); color: var(--ink); }

  @keyframes fade-up {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes check-pop {
    0%   { transform: scale(0) rotate(-15deg); opacity:0; }
    65%  { transform: scale(1.18) rotate(4deg); opacity:1; }
    100% { transform: scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes shimmer-text {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes confetti-drop {
    0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(60px) rotate(360deg); opacity: 0; }
  }

  .shimmer {
    background: linear-gradient(90deg, #1d3a8f 0%, #4f6ef7 35%, #7b93ff 50%, #4f6ef7 65%, #1d3a8f 100%);
    background-size: 300% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer-text 4s linear infinite;
  }

  .si-fade { animation: fade-up .6s var(--ease-out) both; }
  .si-fade-d1 { animation-delay: .08s; }
  .si-fade-d2 { animation-delay: .16s; }
  .si-fade-d3 { animation-delay: .24s; }
  .si-fade-d4 { animation-delay: .32s; }

  .top-bar {
    height: 3px;
    background: linear-gradient(90deg, #1d3a8f, #3b52f0, #5a6ef4, #5a6ef4, #3b52f0, #1d3a8f);
    background-size: 200% auto;
    animation: shimmer-text 4s linear infinite;
  }

  /* ── Problem Cards ── */
  .pc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  @media (max-width: 640px) { .pc-grid { grid-template-columns: 1fr; } }

  .pc-card {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 16px 18px; border-radius: 16px;
    border: 1.5px solid var(--border); background: var(--white);
    cursor: pointer; transition: all .22s var(--ease-out);
    user-select: none; position: relative;
  }
  .pc-card:hover { border-color: rgba(29,58,143,0.2); box-shadow: 0 4px 16px rgba(10,10,20,0.06); transform: translateY(-1px); }
  .pc-card.selected { border-color: var(--ind); background: var(--ind-l); }
  .pc-card.selected .pc-check { background: var(--ind); border-color: var(--ind); }
  .pc-card.selected .pc-check svg { opacity: 1; }

  .pc-check {
    width: 22px; height: 22px; border-radius: 7px;
    border: 1.5px solid rgba(10,10,20,0.18); background: var(--cream);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
    transition: all .2s var(--spring);
  }
  .pc-check svg { opacity: 0; transition: opacity .15s ease; }

  .pc-info h4 { font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.3; margin-bottom: 2px; }
  .pc-info p { font-size: 12px; color: var(--ink3); line-height: 1.5; }

  /* ── Rating Buttons ── */
  .rt-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .rt-btn {
    flex: 1; min-width: 80px; padding: 14px 12px; border-radius: 14px;
    border: 1.5px solid var(--border); background: var(--white);
    text-align: center; cursor: pointer; transition: all .22s var(--ease-out);
    user-select: none;
  }
  .rt-btn:hover { border-color: rgba(29,58,143,0.2); transform: translateY(-2px); box-shadow: var(--shadow-sm); }
  .rt-btn.selected { border-color: var(--ind); background: var(--ind-l); }
  .rt-btn .rt-num { font-size: 22px; font-weight: 900; color: var(--ink3); line-height: 1; margin-bottom: 6px; transition: color .2s; }
  .rt-btn.selected .rt-num { color: var(--ind); }
  .rt-btn .rt-label { font-size: 11px; font-weight: 600; color: var(--ink3); transition: color .2s; }
  .rt-btn.selected .rt-label { color: var(--ind); font-weight: 700; }
  @media (max-width: 480px) { .rt-btn { min-width: 60px; padding: 12px 8px; } .rt-btn .rt-num { font-size: 18px; } }

  /* ── Radio Cards ── */
  .rc-stack { display: flex; flex-direction: column; gap: 10px; }
  .rc-card {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px; border-radius: 14px;
    border: 1.5px solid var(--border); background: var(--white);
    cursor: pointer; transition: all .22s var(--ease-out);
    user-select: none;
  }
  .rc-card:hover { border-color: rgba(29,58,143,0.2); box-shadow: var(--shadow-sm); }
  .rc-card.selected { border-color: var(--ind); background: var(--ind-l); }
  .rc-dot {
    width: 20px; height: 20px; border-radius: 50%;
    border: 2px solid rgba(10,10,20,0.18); background: var(--cream);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all .2s var(--spring);
  }
  .rc-card.selected .rc-dot { border-color: var(--ind); background: var(--ind); }
  .rc-dot::after {
    content: ''; width: 8px; height: 8px; border-radius: 50%;
    background: white; opacity: 0; transition: opacity .15s;
  }
  .rc-card.selected .rc-dot::after { opacity: 1; }
  .rc-text { font-size: 14px; font-weight: 600; color: var(--ink2); }
  .rc-card.selected .rc-text { color: var(--ind); font-weight: 700; }

  /* ── Textarea ── */
  .si-textarea {
    width: 100%; padding: 16px 18px; border-radius: 16px;
    border: 1.5px solid var(--border); background: var(--white);
    font-size: 14px; font-weight: 500; color: var(--ink); outline: none;
    resize: none; line-height: 1.7; font-family: inherit;
    transition: border-color .2s, box-shadow .2s, background .2s;
  }
  .si-textarea:focus { border-color: var(--ind); background: white; box-shadow: 0 0 0 3px rgba(29,58,143,0.08); }
  .si-textarea::placeholder { color: var(--ink3); font-weight: 400; }

  /* ── Submit Button ── */
  .si-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    padding: 16px 40px; border-radius: 16px; border: none;
    background: linear-gradient(135deg, #1d3a8f 0%, #2548c5 100%);
    color: white; font-size: 16px; font-weight: 800;
    cursor: pointer; font-family: inherit;
    box-shadow: 0 6px 28px rgba(29,58,143,0.32);
    transition: all .25s var(--spring);
    position: relative; overflow: hidden;
  }
  .si-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none; border-radius: inherit;
  }
  .si-btn:hover:not(:disabled) { transform: translateY(-2px) scale(1.02); box-shadow: 0 12px 40px rgba(29,58,143,0.42); }
  .si-btn:active:not(:disabled) { transform: translateY(0) scale(.97); }
  .si-btn:disabled { opacity: .65; cursor: not-allowed; transform: none; }

  /* ── Spinner ── */
  .si-spinner { width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin .6s linear infinite; }

  /* ── Success ── */
  .si-success-check { animation: check-pop .5s var(--spring) both; }

  /* ── Other input ── */
  .si-other-input {
    width: 100%; padding: 10px 14px; border-radius: 10px;
    border: 1.5px solid var(--border); background: var(--cream);
    font-size: 13px; font-weight: 500; color: var(--ink);
    outline: none; font-family: inherit;
    transition: border-color .2s, background .2s;
    margin-top: 8px;
  }
  .si-other-input:focus { border-color: var(--ind); background: white; }
`

// ─── Problem Categories ──────────────────────────────────────────
const PROBLEMS = [
  { id: "practical", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Lack of practical skills training", desc: "College focuses on theory, not real-world skills" },
  { id: "mentorship", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "No proper mentorship or guidance", desc: "Hard to find mentors who understand the industry" },
  { id: "resume", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round"/></svg>, title: "Difficulty building a strong resume", desc: "No idea how to present skills and projects effectively" },
  { id: "career", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#1d3a8f" strokeWidth="1.8"/><path d="M12 16v-4M12 8h.01" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round"/></svg>, title: "Confusion about career paths", desc: "Too many options, no clarity on which direction to take" },
  { id: "projects", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#1d3a8f" strokeWidth="1.8"/><line x1="8" y1="21" x2="16" y2="21" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="17" x2="12" y2="21" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round"/></svg>, title: "Lack of real-world projects", desc: "No exposure to building actual products or solutions" },
  { id: "internships", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" stroke="#1d3a8f" strokeWidth="1.8"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round"/></svg>, title: "Difficulty finding internships", desc: "Applying everywhere but rarely getting responses" },
  { id: "industry", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "No industry exposure", desc: "Zero connection between classroom learning and industry needs" },
  { id: "theory", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: "Too much theory, less practical learning", desc: "Exam-heavy curriculum with no hands-on experience" },
]

const RATINGS = [
  { value: 1, label: "Very Poor" },
  { value: 2, label: "Poor" },
  { value: 3, label: "Average" },
  { value: 4, label: "Good" },
  { value: 5, label: "Excellent" },
]

const RESUME_OPTIONS = [
  "I don't know what to include",
  "I don't have enough projects",
  "I don't know how to match my resume with job roles",
  "Resume formatting issues",
  "No guidance from seniors or mentors",
]

// ─── Success Screen ──────────────────────────────────────────────
function SuccessScreen() {
  const dots = ["#6074f3", "#34d399", "#fb7185", "#fbbf24", "#60a5fa", "#8c9df6", "#f472b6"]
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
      {dots.map((c, i) => (
        <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: c, left: `${12 + i * 11}%`, top: "20%", animation: `confetti-drop ${1.2 + i * 0.15}s ease-out ${i * 0.08}s both` }} />
      ))}
      {dots.map((c, i) => (
        <div key={`b${i}`} style={{ position: "absolute", width: 6, height: 6, borderRadius: 2, background: c, left: `${8 + i * 12}%`, top: "15%", animation: `confetti-drop ${1.4 + i * 0.12}s ease-out ${0.1 + i * 0.07}s both` }} />
      ))}
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }} className="si-fade">
        <div className="si-success-check" style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#1d3a8f,#2548c5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 16px 48px rgba(29,58,143,0.32)" }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <path d="M10 21L17 28L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ind)", marginBottom: 10, textTransform: "uppercase", letterSpacing: ".06em" }}>Thank You!</div>
        <h1 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 900, letterSpacing: "-.03em", color: "var(--ink)", margin: "0 0 14px", lineHeight: 1.1 }}>
          Your insights <span className="shimmer">matter</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.72, margin: "0 0 32px", maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
          We will use your feedback to build better tools, programs, and learning experiences for students like you.
        </p>
        <a href="/pre-launch" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 14, background: "linear-gradient(135deg,#1d3a8f,#2548c5)", color: "white", fontSize: 14, fontWeight: 800, textDecoration: "none", boxShadow: "0 6px 24px rgba(29,58,143,.3)", transition: "transform .2s" }}>
          Back to Home
          <svg width="14" height="14" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────
export default function StudentInsightsPage() {
  const [selected, setSelected] = useState<string[]>([])
  const [otherText, setOtherText] = useState("")
  const [rating, setRating] = useState(0)
  const [resumeProblem, setResumeProblem] = useState("")
  const [insight, setInsight] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  function toggleProblem(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
    setError("")
  }

  async function handleSubmit() {
    if (!selected.length && !rating && !resumeProblem && !insight.trim()) {
      setError("Please fill at least one section before submitting.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const categories = [...selected.map(id => PROBLEMS.find(p => p.id === id)?.title || id)]
      if (otherText.trim()) categories.push(`Other: ${otherText.trim()}`)

      const res = await fetch("/api/student-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem_categories: categories,
          skill_rating: rating || null,
          resume_problem: resumeProblem || null,
          student_insight_text: insight.trim() || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong."); setLoading(false); return }
      setSubmitted(true)
    } catch {
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  if (submitted) return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <SuccessScreen />
    </>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
        <div className="top-bar" />

        {/* Navbar */}
        <nav style={{ background: "rgba(244,244,248,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <a href="/pre-launch" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <JobingenLogo height={110} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 99, background: "var(--ind-l)", border: "1px solid rgba(29,58,143,0.15)", fontSize: 11, fontWeight: 800, color: "var(--ind)", textTransform: "uppercase", letterSpacing: ".06em" }}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l.572 2.287a.5.5 0 01-.486.613H9.828a.5.5 0 01-.485-.613l.572-2.287z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Student Insights
          </div>
        </nav>

        {/* ═══ HERO ═══ */}
        <section style={{ background: "linear-gradient(160deg, #0f2260 0%, #1d3a8f 55%, #1e3fa0 100%)", padding: "64px 28px 56px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -100, right: -60, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,82,240,.2), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -80, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,.12), transparent 70%)", pointerEvents: "none" }} />
          <div className="si-fade" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 99, padding: "5px 14px", marginBottom: 20 }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1.5" /></svg>
              <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: ".07em" }}>Help Us Build Better</span>
            </div>
            <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "white", margin: "0 0 18px", lineHeight: 1.1, letterSpacing: "-.03em" }}>
              What Problems Are Students<br />Facing in College Today?
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 24px" }}>
              We are building tools and learning programs to improve how students develop real skills. Share the challenges you face during your college journey so we can build better solutions.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 16px" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Your feedback directly helps us build better tools for students.</span>
            </div>
          </div>
        </section>

        {/* ═══ FORM CONTENT ═══ */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 80px" }}>

          {/* ── Section 1: Problem Categories ── */}
          <div className="si-fade si-fade-d1" style={{ marginBottom: 48 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 8, background: "var(--ind-l)", fontSize: 10, fontWeight: 800, color: "var(--ind)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Step 1 of 4</div>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-.02em", lineHeight: 1.2, margin: "0 0 6px" }}>
                Which challenges are you currently facing?
              </h2>
              <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.6 }}>Select all that apply to your college experience.</p>
            </div>

            <div className="pc-grid">
              {PROBLEMS.map(p => (
                <div key={p.id} className={`pc-card${selected.includes(p.id) ? " selected" : ""}`} onClick={() => toggleProblem(p.id)}>
                  <div className="pc-check">
                    <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M2 6.5L5 9.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div className="pc-info">
                    <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ flexShrink: 0, display: "flex" }}>{p.icon}</span>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Other */}
            <div style={{ marginTop: 12 }}>
              <div className={`pc-card${selected.includes("other") ? " selected" : ""}`} onClick={() => toggleProblem("other")} style={{ maxWidth: "100%" }}>
                <div className="pc-check">
                  <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M2 6.5L5 9.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div className="pc-info" style={{ flex: 1 }}>
                  <h4 style={{ display: "flex", alignItems: "center", gap: 8 }}><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Other</h4>
                  <p>Something else not listed above</p>
                </div>
              </div>
              {selected.includes("other") && (
                <input className="si-other-input" placeholder="Describe the challenge you face..." value={otherText} onChange={e => setOtherText(e.target.value)} />
              )}
            </div>
          </div>

          {/* ── Section 2: Skill Rating ── */}
          <div className="si-fade si-fade-d2" style={{ marginBottom: 48 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 8, background: "var(--grn-l)", fontSize: 10, fontWeight: 800, color: "var(--grn)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Step 2 of 4</div>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-.02em", lineHeight: 1.2, margin: "0 0 6px" }}>
                How satisfied are you with skill development in your college?
              </h2>
              <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.6 }}>Rate the opportunities your college provides for real skill building.</p>
            </div>

            <div className="rt-row">
              {RATINGS.map(r => (
                <div key={r.value} className={`rt-btn${rating === r.value ? " selected" : ""}`} onClick={() => { setRating(r.value); setError("") }}>
                  <div className="rt-num">{r.value}</div>
                  <div className="rt-label">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 3: Resume Challenge ── */}
          <div className="si-fade si-fade-d3" style={{ marginBottom: 48 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 8, background: "var(--vio-l)", fontSize: 10, fontWeight: 800, color: "var(--vio)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Step 3 of 4</div>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-.02em", lineHeight: 1.2, margin: "0 0 6px" }}>
                What is the biggest difficulty you face with resumes?
              </h2>
              <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.6 }}>Pick the one that resonates most with your experience.</p>
            </div>

            <div className="rc-stack">
              {RESUME_OPTIONS.map(opt => (
                <div key={opt} className={`rc-card${resumeProblem === opt ? " selected" : ""}`} onClick={() => { setResumeProblem(opt); setError("") }}>
                  <div className="rc-dot" />
                  <div className="rc-text">{opt}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 4: Open Insight ── */}
          <div className="si-fade si-fade-d4" style={{ marginBottom: 48 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 8, background: "var(--amb-l)", fontSize: 10, fontWeight: 800, color: "var(--amb)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Step 4 of 4</div>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-.02em", lineHeight: 1.2, margin: "0 0 6px" }}>
                Tell us the biggest challenge in your college journey
              </h2>
              <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.6 }}>Be as specific as you want. Every detail helps us build better solutions.</p>
            </div>

            <textarea
              className="si-textarea"
              rows={5}
              placeholder="Describe the problem you face while learning skills, building projects, or preparing for careers..."
              value={insight}
              onChange={e => { setInsight(e.target.value); setError("") }}
            />
            <div style={{ textAlign: "right", marginTop: 6, fontSize: 11, color: "var(--ink3)" }}>{insight.length} / 1000</div>
          </div>

          {/* ── Error ── */}
          {error && (
            <div style={{ padding: "12px 16px", borderRadius: 12, background: "var(--rose-l)", border: "1px solid rgba(244,63,94,.2)", fontSize: 13, fontWeight: 600, color: "var(--rose)", marginBottom: 24, textAlign: "center" }}>
              {error}
            </div>
          )}

          {/* ── Submit ── */}
          <div style={{ textAlign: "center" }}>
            <button className="si-btn" disabled={loading} onClick={handleSubmit}>
              {loading ? (
                <><div className="si-spinner" /> Submitting...</>
              ) : (
                <>
                  Submit Insights
                  <svg width="16" height="16" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </>
              )}
            </button>
            <p style={{ fontSize: 12, color: "var(--ink3)", marginTop: 16, lineHeight: 1.6, maxWidth: 400, margin: "16px auto 0" }}>
              Your response will help us improve skill development opportunities for students.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "24px 28px", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: "var(--ink3)" }}>Jobingen &copy; 2026 &middot; Building better career tools for students</span>
        </div>
      </div>
    </>
  )
}
