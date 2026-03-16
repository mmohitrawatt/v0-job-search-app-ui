"use client"

import { useState } from "react"
import { JobingenLogo } from "@/components/jobingen-logo"

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
    --amb:    #f59e0b;
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
  @keyframes fade-in {
    from { opacity:0; }
    to   { opacity:1; }
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
  .fade-up   { animation: fade-up .6s var(--ease-out) both; }
  .fade-up-2 { animation: fade-up .6s .1s var(--ease-out) both; }
  .fade-up-3 { animation: fade-up .6s .2s var(--ease-out) both; }
  .fade-in   { animation: fade-in .5s ease both; }
  .success-check { animation: check-pop .55s var(--spring) .1s both; }

  .field-input {
    width: 100%; padding: 13px 16px; border-radius: 14px;
    border: 1.5px solid var(--border); background: var(--cream);
    font-size: 14px; font-weight: 500; color: var(--ink); outline: none;
    transition: border-color .18s, background .18s, box-shadow .18s;
    font-family: inherit; appearance: none; resize: none;
  }
  .field-input:focus {
    border-color: var(--ind); background: var(--white);
    box-shadow: 0 0 0 3px rgba(29,58,143,0.1);
  }
  .field-input::placeholder { color: var(--ink3); font-weight: 400; }
  .field-input.err { border-color: var(--rose); box-shadow: 0 0 0 3px rgba(244,63,94,0.1); }

  .star-btn {
    background: none; border: none; cursor: pointer; padding: 3px;
    transition: transform .15s var(--spring); line-height: 1;
  }
  .star-btn:hover { transform: scale(1.25); }
  .star-btn:active { transform: scale(0.95); }

  .recommend-card {
    flex: 1; min-width: 120px; padding: 14px 12px; border-radius: 14px;
    border: 1.5px solid var(--border); background: var(--white);
    cursor: pointer; text-align: center;
    transition: all .2s ease; user-select: none;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .recommend-card:hover { border-color: rgba(29,58,143,0.3); background: var(--ind-l); transform: translateY(-2px); box-shadow: var(--shadow-sm); }
  .recommend-card.selected { border-color: var(--ind); background: var(--ind-l); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(29,58,143,0.15); }
  .recommend-card.selected .rc-label { color: var(--ind); }
  .recommend-card.selected .rc-icon { background: var(--ind); color: white; }
  .rc-icon { width: 36px; height: 36px; border-radius: 10px; background: var(--cream); display: flex; align-items: center; justify-content: center; transition: all .2s; }
  .rc-label { font-size: 12px; font-weight: 700; color: var(--ink2); }

  .topic-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 10px;
    border: 1.5px solid var(--border); background: var(--white);
    cursor: pointer; font-size: 13px; font-weight: 600; color: var(--ink2);
    transition: all .18s ease; user-select: none; line-height: 1.3;
  }
  .topic-chip:hover { border-color: rgba(29,58,143,0.35); background: var(--ind-l); color: var(--ind); transform: translateY(-1px); }
  .topic-chip.selected { border-color: var(--ind); background: var(--ind-l); color: var(--ind); transform: translateY(-1px); box-shadow: 0 2px 10px rgba(29,58,143,0.15); }
  .chip-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; flex-shrink: 0; transition: all .15s; }
  .topic-chip:not(.selected) .chip-dot { background: var(--border); }

  .section-card {
    background: var(--white); border-radius: 20px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow-sm);
    padding: 28px 28px; display: flex; flex-direction: column; gap: 20px;
  }
  .section-label {
    display: flex; align-items: center; gap: 10;
    font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .07em; color: var(--ink3);
    margin-bottom: 4px;
  }
  .section-num {
    width: 22px; height: 22px; border-radius: 7px; background: var(--ind-l);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; color: var(--ind); flex-shrink: 0;
  }

  .submit-btn {
    width: 100%; padding: 17px 28px; border-radius: 16px;
    background: linear-gradient(135deg, #1d3a8f 0%, #2548c5 60%, #3b5ff0 100%);
    color: white; font-size: 15px; font-weight: 800; border: none;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px;
    transition: opacity .2s, transform .15s, box-shadow .2s; font-family: inherit;
    box-shadow: 0 4px 20px rgba(29,58,143,0.35);
    letter-spacing: -.01em;
  }
  .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(29,58,143,0.42); }
  .submit-btn:active:not(:disabled) { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

  .spinner {
    width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3);
    border-top-color: white; border-radius: 50%;
    animation: spin .7s linear infinite;
  }

  .res-section {
    background: var(--white); border-radius: 20px; border: 1.5px solid var(--border);
    box-shadow: var(--shadow-sm); padding: 0; overflow: hidden;
  }
  .res-header {
    background: linear-gradient(135deg, #0f2260 0%, #1d3a8f 100%);
    padding: 24px 28px; position: relative; overflow: hidden;
  }
  .res-header::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 20px 20px; pointer-events: none;
  }
  .res-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 16px; }
  .res-item {
    display: flex; align-items: center; gap: 14px; padding: 14px 16px;
    border-radius: 14px; background: var(--cream); border: 1.5px solid var(--border);
    text-decoration: none; color: var(--ink);
    transition: border-color .2s, transform .15s, box-shadow .2s;
  }
  .res-item:hover { border-color: rgba(29,58,143,0.3); transform: translateY(-2px); box-shadow: var(--shadow-md); }
  .res-item-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .res-item-info { flex: 1; }
  .res-item-info h4 { font-size: 14px; font-weight: 800; color: var(--ink); margin: 0 0 3px; }
  .res-item-info p { font-size: 12px; color: var(--ink3); margin: 0; line-height: 1.5; }
  .res-arrow {
    width: 32px; height: 32px; border-radius: 8px; background: var(--ind-l);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: background .15s;
  }
  .res-item:hover .res-arrow { background: var(--ind); }
  .res-item:hover .res-arrow svg path { stroke: white; }
  .res-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .res-chip {
    font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 6px;
    text-transform: uppercase; letter-spacing: .04em;
  }

  @media (max-width: 640px) {
    .section-card { padding: 20px 18px !important; }
    .fb-wrap { padding: 20px 16px !important; }
    .fb-hero { padding: 36px 20px !important; }
    .name-grid { grid-template-columns: 1fr !important; }
    .recommend-row { flex-wrap: wrap !important; }
    .recommend-card { min-width: calc(50% - 4px) !important; }
    .res-header { padding: 20px 20px; }
    .res-body { padding: 18px 18px; }
  }
`

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"]
const STAR_COLORS = ["", "#ef4444", "#f97316", "#eab308", "#84cc16", "#10b981"]

function StarRating({ value, onChange, size = 36 }: { value: number; onChange: (v: number) => void; size?: number }) {
  const [hovered, setHovered] = useState(0)
  const active = hovered || value
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map(star => (
          <button key={star} type="button" className="star-btn"
            onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}>
            <svg width={size} height={size} viewBox="0 0 24 24"
              fill={star <= active ? STAR_COLORS[active] : "none"}
              stroke={star <= active ? STAR_COLORS[active] : "#d1d5db"} strokeWidth="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
        {active > 0 && (
          <div style={{ marginLeft: 6, display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: STAR_COLORS[active], lineHeight: 1 }}>{STAR_LABELS[active]}</span>
          </div>
        )}
      </div>
      {active === 0 && (
        <div style={{ display: "flex", gap: 0 }}>
          {["1","2","3","4","5"].map((n, i) => (
            <span key={n} style={{ width: 36, textAlign: "center", fontSize: 10, color: "var(--ink3)", fontWeight: 600 }}>{n}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function MiniStarRow({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  const active = hovered || value
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)" }}>{label}</span>
        {active > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: STAR_COLORS[active], background: `${STAR_COLORS[active]}18`, padding: "2px 8px", borderRadius: 99 }}>{STAR_LABELS[active]}</span>}
      </div>
      <div style={{ display: "flex", gap: 3 }}>
        {[1,2,3,4,5].map(star => (
          <button key={star} type="button" className="star-btn"
            onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}>
            <svg width="22" height="22" viewBox="0 0 24 24"
              fill={star <= active ? STAR_COLORS[active] : "none"}
              stroke={star <= active ? STAR_COLORS[active] : "#d1d5db"} strokeWidth="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

function SuccessScreen() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        {/* Check circle */}
        <div className="success-check" style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#1d3a8f,#2548c5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 16px 48px rgba(29,58,143,0.3)" }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <path d="M10 20L17 27L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="fade-up" style={{ fontSize: 11, fontWeight: 800, color: "var(--ind)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>
          Feedback Received
        </div>
        <h1 className="fade-up-2" style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 900, letterSpacing: "-.03em", color: "var(--ink)", lineHeight: 1.1, marginBottom: 14 }}>
          Thank you for your<br /><span className="shimmer">honest feedback</span>
        </h1>
        <p className="fade-up-3" style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.75, maxWidth: 360, margin: "0 auto 32px" }}>
          Your response has been recorded. We&apos;ll use it to build an even better experience for the next bootcamp.
        </p>

        {/* Instagram card */}
        <div className="fade-up-3" style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 18, padding: "18px 22px", marginBottom: 24, boxShadow: "var(--shadow-sm)" }}>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--ink3)", marginBottom: 14 }}>Stay in the loop</div>
          <a href="https://www.instagram.com/jobingen.ai/" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", padding: "12px 16px", borderRadius: 12, background: "linear-gradient(135deg,#833ab418,#fd1d1d12,#fcb04514)", border: "1px solid rgba(131,58,180,0.15)" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Follow @jobingen.ai</div>
              <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 1 }}>Get notified when the next bootcamp drops</div>
            </div>
            <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="#8a8aa8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        {/* Resources card */}
        <div className="fade-up-3" style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 18, padding: "18px 22px", marginBottom: 24, boxShadow: "var(--shadow-sm)", textAlign: "left" }}>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--ink3)", marginBottom: 14 }}>Free Resources</div>
          <a href="https://drive.google.com/drive/folders/1EhuxYuf8W91AgaUkMp4YUrKEigBSgu7F?usp=sharing" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", padding: "12px 16px", borderRadius: 12, background: "var(--ind-l)", border: "1px solid rgba(29,58,143,0.15)" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#1d3a8f,#3b5bdb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 2v7h7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Bootcamp Resource Kit</div>
              <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 1 }}>Slides, notebooks, cheat sheets — all free</div>
            </div>
            <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="#8a8aa8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        <a href="/pre-launch" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--ind)", color: "white", borderRadius: 14, padding: "13px 28px", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(29,58,143,0.3)" }}>
          Back to Home
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </div>
  )
}

const TOPIC_SUGGESTIONS = [
  { label: "LLM Fine-tuning", icon: "⚡" },
  { label: "Agentic AI & AI Agents", icon: "🤖" },
  { label: "Advanced Prompt Engineering", icon: "✍️" },
  { label: "RAG & Vector Databases", icon: "🔍" },
  { label: "AI Product Building", icon: "🚀" },
  { label: "System Design for AI", icon: "🏗️" },
  { label: "MLOps & Deployment", icon: "⚙️" },
  { label: "Computer Vision", icon: "👁️" },
  { label: "AI for Data Analysis", icon: "📊" },
  { label: "NLP & Text Processing", icon: "💬" },
  { label: "Resume Building with AI", icon: "📄" },
  { label: "Interview Prep with AI", icon: "🎯" },
]

const RECOMMEND_OPTIONS = [
  { label: "Definitely", sub: "100% yes!", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#10b981" stroke="#10b981" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
  { label: "Probably", sub: "Most likely", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#84cc16" stroke="#84cc16" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
  { label: "Not Sure", sub: "Maybe", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
  { label: "No", sub: "Not really", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
]

export default function FeedbackPage() {
  const [form, setForm] = useState({
    name: "", email: "",
    overall_rating: 0, content_rating: 0, mentor_rating: 0,
    liked: "", improve: "", recommend: "", next_topic: "",
  })
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [customTopic, setCustomTopic] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState("")

  function set(key: string, val: string | number) {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: "" }))
    setServerError("")
  }

  function toggleTopic(topic: string) {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.overall_rating) e.overall_rating = "Please rate your overall experience"
    if (!form.liked.trim()) e.liked = "Please tell us what you liked"
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setServerError("")
    try {
      const allTopics = [...selectedTopics, ...(customTopic.trim() ? [customTopic.trim()] : [])].join(", ")
      const res = await fetch("/api/bootcamp-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, next_topic: allTopics }),
      })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || "Something went wrong."); setLoading(false); return }
      setSubmitted(true)
    } catch {
      setServerError("Network error. Please try again.")
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

        {/* Nav */}
        <nav style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(24px)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <a href="/pre-launch" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <JobingenLogo height={110} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 0 3px #10b98120" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>Bootcamp 1 · Feedback</span>
          </div>
        </nav>

        {/* Hero */}
        <div className="fb-hero" style={{ background: "linear-gradient(160deg, #0f2260 0%, #1d3a8f 55%, #1e3fa0 100%)", padding: "52px 28px 48px", position: "relative", overflow: "hidden" }}>
          {/* subtle grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 99, padding: "5px 14px", marginBottom: 18 }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: ".07em" }}>2-Day AI Bootcamp · March 2026</span>
            </div>
            <h1 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, color: "white", lineHeight: 1.1, letterSpacing: "-.025em", marginBottom: 14 }}>
              How was your<br />bootcamp experience?
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 24px" }}>
              Takes 2 minutes. Your honest feedback shapes everything we build next.
            </p>
            {/* time indicator */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "10px 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
              {[["~2 min","to complete"],["5","questions"],["100%","anonymous"]].map(([v, l]) => (
                <div key={v} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "white" }}>{v}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="fb-wrap" style={{ maxWidth: 660, margin: "0 auto", padding: "36px 24px 60px" }}>
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Section 1 — About You */}
            <div className="section-card fade-up">
              <div className="section-label">
                <span className="section-num">1</span>
                <span style={{ marginLeft: 8 }}>About You</span>
              </div>
              <div className="name-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>Your Name <span style={{ color: "var(--rose)" }}>*</span></label>
                  <input className={`field-input${errors.name ? " err" : ""}`} placeholder="Arjun Sharma" value={form.name} onChange={e => set("name", e.target.value)} />
                  {errors.name && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{errors.name}</span>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>Email <span style={{ color: "var(--ink3)", fontWeight: 400 }}>(optional)</span></label>
                  <input className="field-input" type="email" placeholder="arjun@gmail.com" value={form.email} onChange={e => set("email", e.target.value)} />
                </div>
              </div>
            </div>

            {/* Section 2 — Ratings */}
            <div className="section-card fade-up-2">
              <div className="section-label">
                <span className="section-num">2</span>
                <span style={{ marginLeft: 8 }}>Your Ratings</span>
              </div>

              {/* Overall */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>
                  Overall experience <span style={{ color: "var(--rose)" }}>*</span>
                </div>
                <StarRating value={form.overall_rating} onChange={v => set("overall_rating", v)} size={40} />
                {errors.overall_rating && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{errors.overall_rating}</span>}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "var(--border)" }} />

              {/* Category */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink2)", marginBottom: 4 }}>Rate specific areas</div>
                <div style={{ background: "var(--cream)", borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
                  <MiniStarRow label="Content Quality" value={form.content_rating} onChange={v => set("content_rating", v)} />
                  <div style={{ height: 1, background: "var(--border)" }} />
                  <MiniStarRow label="Mentor / Teaching" value={form.mentor_rating} onChange={v => set("mentor_rating", v)} />
                </div>
              </div>
            </div>

            {/* Section 3 — Your Thoughts */}
            <div className="section-card fade-up-3">
              <div className="section-label">
                <span className="section-num">3</span>
                <span style={{ marginLeft: 8 }}>Your Thoughts</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>What did you like most? <span style={{ color: "var(--rose)" }}>*</span></label>
                <p style={{ fontSize: 12, color: "var(--ink3)" }}>Sessions, projects, mentors — anything that stood out</p>
                <textarea className={`field-input${errors.liked ? " err" : ""}`} rows={3} placeholder="e.g. The RAG session was really practical, loved the hands-on hackathon project..." value={form.liked} onChange={e => set("liked", e.target.value)} style={{ lineHeight: 1.65, marginTop: 4 }} />
                {errors.liked && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{errors.liked}</span>}
              </div>

              <div style={{ height: 1, background: "var(--border)" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>What could be better? <span style={{ color: "var(--ink3)", fontWeight: 400 }}>(optional)</span></label>
                <p style={{ fontSize: 12, color: "var(--ink3)" }}>Pacing, content depth, schedule — be honest!</p>
                <textarea className="field-input" rows={3} placeholder="e.g. More time for Q&A, slower pace on Day 2, more coding exercises..." value={form.improve} onChange={e => set("improve", e.target.value)} style={{ lineHeight: 1.65, marginTop: 4 }} />
              </div>
            </div>

            {/* Section 4 — Recommend */}
            <div className="section-card">
              <div className="section-label">
                <span className="section-num">4</span>
                <span style={{ marginLeft: 8 }}>Would You Recommend?</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)", marginBottom: 4 }}>Would you recommend this bootcamp to a friend or classmate?</div>
              <div className="recommend-row" style={{ display: "flex", gap: 8 }}>
                {RECOMMEND_OPTIONS.map(opt => (
                  <div key={opt.label} className={`recommend-card${form.recommend === opt.label ? " selected" : ""}`} onClick={() => set("recommend", opt.label)}>
                    <div className="rc-icon">{opt.icon}</div>
                    <div className="rc-label">{opt.label}</div>
                    <div style={{ fontSize: 10, color: "var(--ink3)", fontWeight: 500 }}>{opt.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5 — Next Bootcamp Topics */}
            <div className="section-card">
              <div className="section-label">
                <span className="section-num">5</span>
                <span style={{ marginLeft: 8 }}>Next Bootcamp</span>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>What topics should we cover next?</div>
                <div style={{ fontSize: 12, color: "var(--ink3)" }}>Pick as many as you like — this directly influences our next curriculum</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {TOPIC_SUGGESTIONS.map(({ label, icon }) => {
                  const isSelected = selectedTopics.includes(label)
                  return (
                    <div key={label} className={`topic-chip${isSelected ? " selected" : ""}`} onClick={() => toggleTopic(label)}>
                      <span className="chip-dot" />
                      {label}
                    </div>
                  )
                })}
              </div>
              {selectedTopics.length > 0 && (
                <div style={{ fontSize: 12, color: "var(--ind)", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path d="M2.5 6.5L5.5 9.5L10.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {selectedTopics.length} topic{selectedTopics.length > 1 ? "s" : ""} selected
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink3)" }}>Anything else not listed above?</label>
                <input className="field-input" placeholder="Type a topic..." value={customTopic} onChange={e => setCustomTopic(e.target.value)} />
              </div>
            </div>

            {/* Server error */}
            {serverError && (
              <div style={{ padding: "13px 16px", borderRadius: 12, background: "#fff1f2", border: "1px solid rgba(244,63,94,.2)", fontSize: 13, fontWeight: 600, color: "var(--rose)", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="#f43f5e" strokeWidth="1.5"/><path d="M8 5v3.5M8 10.5v.5" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round"/></svg>
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <><div className="spinner" /> Submitting...</>
              ) : (
                <>Submit Feedback
                  <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </>
              )}
            </button>

            <p style={{ textAlign: "center", fontSize: 11, color: "var(--ink3)", lineHeight: 1.6 }}>
              Your response is confidential and used only to improve future bootcamps.
            </p>

          </form>

          {/* ─── Resources ─── */}
          <div className="res-section" style={{ marginTop: 20 }}>
            <div className="res-header">
              <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "white", letterSpacing: "-.02em" }}>Free Resources</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 500, marginTop: 2 }}>Everything from the bootcamp — yours to keep</div>
                </div>
              </div>
            </div>
            <div className="res-body">
              <a href="https://drive.google.com/drive/folders/1EhuxYuf8W91AgaUkMp4YUrKEigBSgu7F?usp=sharing" target="_blank" rel="noopener noreferrer" className="res-item">
                <div className="res-item-icon" style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 2v7h7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 13h8M8 17h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="res-item-info">
                  <h4>Bootcamp Resource Kit</h4>
                  <p>Slides, code notebooks, cheat sheets, and reference material</p>
                  <div className="res-chips" style={{ marginTop: 8 }}>
                    <span className="res-chip" style={{ background: "#eef1fd", color: "#1d3a8f" }}>Slides</span>
                    <span className="res-chip" style={{ background: "#ecfdf5", color: "#10b981" }}>Notebooks</span>
                    <span className="res-chip" style={{ background: "#fef3c7", color: "#d97706" }}>Cheat Sheets</span>
                    <span className="res-chip" style={{ background: "#fce7f3", color: "#db2777" }}>References</span>
                  </div>
                </div>
                <div className="res-arrow">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8h8M8 4l4 4-4 4" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
