"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

const CSS = `
  :root {
    --ink:    #09090f;
    --ink2:   #3d3d52;
    --ink3:   #8a8aa8;
    --cream:  #f4f4f8;
    --white:  #f7f8fc;
    --border: rgba(10,10,20,0.08);
    --ind:    #1d3a8f;
    --ind2:   #2548c5;
    --ind-l:  #eef1fd;
    --grn:    #10b981;
    --grn-l:  #ecfdf5;
    --rose:   #f43f5e;
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
  .fb-page *, .fb-page *::before, .fb-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .fb-page { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; background: var(--cream); color: var(--ink); }

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
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.25); }
    50%      { box-shadow: 0 0 0 8px rgba(124,58,237,0); }
  }

  .shimmer {
    background: linear-gradient(90deg, #1d3a8f 0%, #4f6ef7 35%, #7b93ff 50%, #4f6ef7 65%, #1d3a8f 100%);
    background-size: 300% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer-text 4s linear infinite;
  }
  .shimmer-grn {
    background: linear-gradient(90deg, #059669 0%, #34d399 35%, #6ee7b7 50%, #34d399 65%, #059669 100%);
    background-size: 300% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer-text 4s linear infinite;
  }
  .shimmer-vio {
    background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 35%, #c4b5fd 50%, #a78bfa 65%, #7c3aed 100%);
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
  .section-num-vio {
    width: 22px; height: 22px; border-radius: 7px; background: var(--vio-l);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; color: var(--vio); flex-shrink: 0;
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

  .submit-btn-vio {
    width: 100%; padding: 17px 28px; border-radius: 16px;
    background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 60%, #8b5cf6 100%);
    color: white; font-size: 15px; font-weight: 800; border: none;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px;
    transition: opacity .2s, transform .15s, box-shadow .2s; font-family: inherit;
    box-shadow: 0 4px 20px rgba(124,58,237,0.35);
    letter-spacing: -.01em;
  }
  .submit-btn-vio:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(124,58,237,0.42); }
  .submit-btn-vio:active:not(:disabled) { transform: translateY(0); }
  .submit-btn-vio:disabled { opacity: 0.65; cursor: not-allowed; }

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

  /* Navigation Cards */
  .nav-cards {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
    max-width: 720px; margin: 0 auto;
  }
  .nav-card {
    position: relative; padding: 20px 18px; border-radius: 18px;
    border: 1.5px solid var(--border); background: var(--white);
    cursor: pointer; text-align: left;
    transition: all .25s var(--ease-out); font-family: inherit;
    display: flex; flex-direction: column; gap: 10px;
    box-shadow: var(--shadow-sm); overflow: hidden;
  }
  .nav-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: transparent; transition: background .25s ease; border-radius: 18px 18px 0 0;
  }
  .nav-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(10,10,20,0.1);
    border-color: rgba(10,10,20,0.15);
  }
  .nav-card.active-fb { border-color: var(--ind); background: linear-gradient(180deg, #eef1fd 0%, #fff 60%); }
  .nav-card.active-fb::before { background: linear-gradient(90deg, #1d3a8f, #3b5ff0); }
  .nav-card.active-hk { border-color: var(--vio); background: linear-gradient(180deg, #f3f0ff 0%, #fff 60%); }
  .nav-card.active-hk::before { background: linear-gradient(90deg, #5b21b6, #8b5cf6); }
  .nav-card.active-rs { border-color: var(--grn); background: linear-gradient(180deg, #ecfdf5 0%, #fff 60%); }
  .nav-card.active-rs::before { background: linear-gradient(90deg, #059669, #34d399); }
  .nav-card-icon {
    width: 42px; height: 42px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all .25s ease;
  }
  .nav-card-title {
    font-size: 14px; font-weight: 800; color: var(--ink); letter-spacing: -.02em;
    display: flex; align-items: center; gap: 8;
  }
  .nav-card-desc { font-size: 11px; color: var(--ink3); font-weight: 500; line-height: 1.5; margin-top: -4px; }
  .nav-badge {
    font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 99px;
    text-transform: uppercase; letter-spacing: .04em;
    background: linear-gradient(135deg, #7c3aed, #a78bfa);
    color: white; animation: pulse-glow 2s ease-in-out infinite;
    flex-shrink: 0;
  }

  /* Upload area */
  .upload-zone {
    width: 100%; padding: 24px; border-radius: 16px;
    border: 2px dashed var(--border); background: var(--cream);
    text-align: center; cursor: pointer;
    transition: all .2s ease;
  }
  .upload-zone:hover { border-color: rgba(124,58,237,.35); background: var(--vio-l); }
  .upload-zone.has-file { border-color: var(--grn); background: var(--grn-l); border-style: solid; }

  /* Tech chip */
  .tech-chip-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
  .tech-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 8px;
    background: var(--vio-l); color: var(--vio);
    font-size: 12px; font-weight: 700;
    animation: fade-up .3s var(--ease-out) both;
  }
  .tech-chip button {
    background: none; border: none; cursor: pointer; padding: 0;
    color: var(--vio); opacity: .6; font-size: 14px; line-height: 1;
    transition: opacity .15s;
  }
  .tech-chip button:hover { opacity: 1; }

  @media (max-width: 640px) {
    .section-card { padding: 20px 18px !important; }
    .fb-wrap { padding: 20px 16px !important; }
    .fb-hero { padding: 36px 20px !important; }
    .name-grid { grid-template-columns: 1fr !important; }
    .proj-grid { grid-template-columns: 1fr !important; }
    .recommend-row { flex-wrap: wrap !important; }
    .recommend-card { min-width: calc(50% - 4px) !important; }
    .res-header { padding: 20px 20px; }
    .res-body { padding: 18px 18px; }
    .nav-cards { grid-template-columns: 1fr !important; gap: 10px; }
    .nav-card { flex-direction: row; align-items: center; padding: 16px; gap: 14px; }
    .nav-card-icon { width: 38px; height: 38px; }
    .nav-card-desc { display: none; }
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
          {["1","2","3","4","5"].map((n) => (
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

function FeedbackSuccessScreen() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
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
        <p className="fade-up-3" style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.75, maxWidth: 380, margin: "0 auto 32px" }}>
          Your response has been recorded. We&apos;ll use it to build an even better experience for the next Summer Training.
        </p>
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

function ProjectSuccessScreen({ teamName }: { teamName: string }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <div className="success-check" style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#5b21b6,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 16px 48px rgba(124,58,237,0.3)" }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <path d="M10 20L17 27L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="fade-up" style={{ fontSize: 11, fontWeight: 800, color: "var(--vio)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>
          Project Submitted!
        </div>
        <h1 className="fade-up-2" style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 900, letterSpacing: "-.03em", color: "var(--ink)", lineHeight: 1.1, marginBottom: 14 }}>
          Great work, <span className="shimmer-vio">{teamName || "Team"}!</span>
        </h1>
        <p className="fade-up-3" style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.75, maxWidth: 380, margin: "0 auto 32px" }}>
          Your hackathon project has been submitted successfully. Our judges will review it and results will be announced soon.
        </p>

        <div className="fade-up-3" style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 18, padding: "20px 24px", marginBottom: 24, boxShadow: "var(--shadow-sm)", textAlign: "left" }}>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--ink3)", marginBottom: 14 }}>What happens next</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "1", text: "Judges review all submitted projects" },
              { icon: "2", text: "Top projects shortlisted for final evaluation" },
              { icon: "3", text: "Winners announced on our Instagram and WhatsApp group" },
              { icon: "4", text: "Prizes distributed within 48 hours of announcement" },
            ].map((s) => (
              <div key={s.icon} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, background: "var(--vio-l)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 800, color: "var(--vio)" }}>{s.icon}</div>
                <span style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, paddingTop: 2 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        <a href="/pre-launch" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#5b21b6,#7c3aed)", color: "white", borderRadius: 14, padding: "13px 28px", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>
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

type ActiveTab = "feedback" | "resources"

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("resources")

  // ── Feedback form state ──
  const [form, setForm] = useState({
    name: "", email: "",
    overall_rating: 0, content_rating: 0, mentor_rating: 0,
    liked: "", recommend: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState("")

  // ── Project submission state ──
  const [projForm, setProjForm] = useState({
    team_name: "", leader_name: "", email: "",
    project_title: "", description: "", tech_stack: "",
    github_link: "", demo_link: "",
  })
  const [projScreenshot, setProjScreenshot] = useState<File | null>(null)
  const [projScreenshotName, setProjScreenshotName] = useState("")
  const [projErrors, setProjErrors] = useState<Record<string, string>>({})
  const [projLoading, setProjLoading] = useState(false)
  const [projSubmitted, setProjSubmitted] = useState(false)
  const [projServerError, setProjServerError] = useState("")
  const projFileRef = useRef<HTMLInputElement>(null)

  // ── Feedback handlers ──
  function set(key: string, val: string | number) {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: "" }))
    setServerError("")
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.overall_rating) e.overall_rating = "Please rate your overall experience"
    if (!form.liked.trim()) e.liked = "Please share your feedback — it means a lot to us"
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setServerError("")
    try {
      const res = await fetch("/api/bootcamp-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, bootcamp: "summer_training" }),
      })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || "Something went wrong."); setLoading(false); return }
      setSubmitted(true)
    } catch {
      setServerError("Network error. Please try again.")
      setLoading(false)
    }
  }

  // ── Project handlers ──
  function projSet(key: string, val: string) {
    setProjForm(f => ({ ...f, [key]: val }))
    setProjErrors(e => ({ ...e, [key]: "" }))
    setProjServerError("")
  }

  function handleProjFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setProjScreenshot(file)
    setProjScreenshotName(file.name)
  }

  function projValidate() {
    const e: Record<string, string> = {}
    if (!projForm.team_name.trim()) e.team_name = "Team name is required"
    if (!projForm.leader_name.trim()) e.leader_name = "Team leader name is required"
    if (!projForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(projForm.email)) e.email = "Valid email is required"
    if (!projForm.project_title.trim()) e.project_title = "Project title is required"
    if (!projForm.description.trim()) e.description = "Project description is required"
    if (!projForm.tech_stack.trim()) e.tech_stack = "Tech stack is required"
    if (!projForm.github_link.trim()) e.github_link = "GitHub repo link is required"
    return e
  }

  async function handleProjSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = projValidate()
    if (Object.keys(errs).length) { setProjErrors(errs); return }
    setProjLoading(true)
    setProjServerError("")
    try {
      const fd = new FormData()
      fd.append("team_name", projForm.team_name.trim())
      fd.append("leader_name", projForm.leader_name.trim())
      fd.append("email", projForm.email.trim())
      fd.append("project_title", projForm.project_title.trim())
      fd.append("description", projForm.description.trim())
      fd.append("tech_stack", projForm.tech_stack.trim())
      fd.append("github_link", projForm.github_link.trim())
      fd.append("demo_link", projForm.demo_link.trim())
      if (projScreenshot) fd.append("screenshot", projScreenshot)

      const res = await fetch("/api/hackathon-submit", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) { setProjServerError(data.error || "Something went wrong."); setProjLoading(false); return }
      setProjSubmitted(true)
    } catch {
      setProjServerError("Network error. Please try again.")
      setProjLoading(false)
    }
  }

  // ── Success screens ──
  if (submitted) return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <FeedbackSuccessScreen />
    </>
  )

  if (projSubmitted) return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ProjectSuccessScreen teamName={projForm.team_name} />
    </>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Navbar />
      <div className="fb-page" style={{ minHeight: "100vh", background: "var(--cream)" }}>

        {/* Hero */}
        <div style={{ background: "linear-gradient(180deg,#f8faff 0%,#eef2ff 50%,#fff 100%)", borderBottom: "1px solid #e8edf8", padding: "152px 24px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(29,58,143,0.035) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18, padding: "5px 16px", borderRadius: 99, background: "white", border: "1.5px solid #e0e7ff", boxShadow: "0 2px 12px rgba(29,58,143,0.07)" }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1d3a8f" }}>Offline Summer Training · June 2026</span>
            </div>
            <h1 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: "#0f172a", lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 12 }}>
              How was your{" "}
              <span style={{ background: "linear-gradient(135deg,#1d3a8f 0%,#3b5bdb 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Summer Training?
              </span>
            </h1>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, maxWidth: 420, margin: "0 auto 22px" }}>
              2 minutes. Your honest words directly shape what we build for the next batch of students.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 0, background: "white", border: "1.5px solid #e0e7ff", borderRadius: 14, padding: "10px 4px", boxShadow: "0 2px 12px rgba(29,58,143,0.07)" }}>
              {[["~2 min","to complete"],["4","questions"],["100%","anonymous"]].map(([v, l], i) => (
                <div key={v} style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
                  <div style={{ textAlign: "center", padding: "0 20px" }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: "#1d3a8f", letterSpacing: "-0.02em" }}>{v}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500, marginTop: 1 }}>{l}</div>
                  </div>
                  {i < 2 && <div style={{ width: 1, background: "#e0e7ff", alignSelf: "center", height: 24 }} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="fb-wrap" style={{ maxWidth: 680, margin: "0 auto", padding: "24px 24px 60px" }}>
          <>

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
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>
                      Overall experience <span style={{ color: "var(--rose)" }}>*</span>
                    </div>
                    <StarRating value={form.overall_rating} onChange={v => set("overall_rating", v)} size={40} />
                    {errors.overall_rating && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{errors.overall_rating}</span>}
                  </div>
                  <div style={{ height: 1, background: "var(--border)" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink2)", marginBottom: 4 }}>Rate specific areas</div>
                    <div style={{ background: "var(--cream)", borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
                      <MiniStarRow label="Content Coverage & Clarity" value={form.content_rating} onChange={v => set("content_rating", v)} />
                      <div style={{ height: 1, background: "var(--border)" }} />
                      <MiniStarRow label="Mentor Interaction & Support" value={form.mentor_rating} onChange={v => set("mentor_rating", v)} />
                    </div>
                  </div>
                </div>

                {/* Motivational banner */}
                <div style={{
                  padding: "16px 20px", borderRadius: 16,
                  background: "linear-gradient(135deg, #eef1fd 0%, #f0f4ff 100%)",
                  border: "1.5px solid rgba(29,58,143,0.18)",
                  display: "flex", gap: 14, alignItems: "flex-start",
                }}>
                  <div style={{ fontSize: 26, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>💙</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ind)", marginBottom: 5 }}>
                      You are a part of our dream
                    </div>
                    <div style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.7 }}>
                      Your feedback isn&apos;t just a form — it&apos;s the foundation of our next program.
                      Every honest word you write shapes what we build for the next batch of students like you.
                    </div>
                  </div>
                </div>

                {/* Section 3 — Your Feedback */}
                <div className="section-card fade-up-3">
                  <div className="section-label">
                    <span className="section-num">3</span>
                    <span style={{ marginLeft: 8 }}>Your Feedback</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
                      What&apos;s your feedback &amp; suggestions? <span style={{ color: "var(--rose)" }}>*</span>
                    </label>
                    <p style={{ fontSize: 12, color: "var(--ink3)" }}>
                      What worked, what didn&apos;t, what would make the next training 10x better? Be honest — your words are gold.
                    </p>
                    <textarea
                      className={`field-input${errors.liked ? " err" : ""}`}
                      rows={4}
                      placeholder="e.g. The sessions were really engaging. Mentor explained concepts very clearly. I wish we had more time for Q&A and hands-on practice..."
                      value={form.liked}
                      onChange={e => set("liked", e.target.value)}
                      style={{ lineHeight: 1.65, marginTop: 4 }}
                    />
                    {errors.liked && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{errors.liked}</span>}
                  </div>
                </div>

                {/* Section 4 — Recommend */}
                <div className="section-card">
                  <div className="section-label">
                    <span className="section-num">4</span>
                    <span style={{ marginLeft: 8 }}>Would You Recommend?</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)", marginBottom: 4 }}>Would you recommend this training to a friend or classmate?</div>
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

                {serverError && (
                  <div style={{ padding: "13px 16px", borderRadius: 12, background: "#fff1f2", border: "1px solid rgba(244,63,94,.2)", fontSize: 13, fontWeight: 600, color: "var(--rose)", display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="#f43f5e" strokeWidth="1.5"/><path d="M8 5v3.5M8 10.5v.5" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    {serverError}
                  </div>
                )}

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
                  Your response is confidential and used only to improve future programs.
                </p>
              </form>

          </>

          {/* Hackathon submission removed — time over */}
          {false && (
            <form onSubmit={handleProjSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Section 1 — Team Info */}
              <div className="section-card fade-up">
                <div className="section-label">
                  <span className="section-num-vio">1</span>
                  <span style={{ marginLeft: 8 }}>Team Info</span>
                </div>
                <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>Team Name <span style={{ color: "var(--rose)" }}>*</span></label>
                    <input className={`field-input${projErrors.team_name ? " err" : ""}`} placeholder="e.g. Team Rocket" value={projForm.team_name} onChange={e => projSet("team_name", e.target.value)} />
                    {projErrors.team_name && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{projErrors.team_name}</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>Team Leader Name <span style={{ color: "var(--rose)" }}>*</span></label>
                    <input className={`field-input${projErrors.leader_name ? " err" : ""}`} placeholder="Arjun Sharma" value={projForm.leader_name} onChange={e => projSet("leader_name", e.target.value)} />
                    {projErrors.leader_name && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{projErrors.leader_name}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>Email Address <span style={{ color: "var(--rose)" }}>*</span></label>
                  <input className={`field-input${projErrors.email ? " err" : ""}`} type="email" placeholder="arjun@gmail.com" value={projForm.email} onChange={e => projSet("email", e.target.value)} />
                  {projErrors.email && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{projErrors.email}</span>}
                </div>
              </div>

              {/* Section 2 — Project Details */}
              <div className="section-card fade-up-2">
                <div className="section-label">
                  <span className="section-num-vio">2</span>
                  <span style={{ marginLeft: 8 }}>Project Details</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>Project Title <span style={{ color: "var(--rose)" }}>*</span></label>
                  <input className={`field-input${projErrors.project_title ? " err" : ""}`} placeholder="e.g. AI Resume Analyzer" value={projForm.project_title} onChange={e => projSet("project_title", e.target.value)} />
                  {projErrors.project_title && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{projErrors.project_title}</span>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Project Description <span style={{ color: "var(--rose)" }}>*</span></label>
                  <p style={{ fontSize: 12, color: "var(--ink3)" }}>What does your project do? What problem does it solve? Be specific.</p>
                  <textarea className={`field-input${projErrors.description ? " err" : ""}`} rows={4} placeholder="e.g. Our project uses GPT-4 to analyze resumes against job descriptions, providing a match score, missing keywords, and actionable suggestions to improve the resume..." value={projForm.description} onChange={e => projSet("description", e.target.value)} style={{ lineHeight: 1.65, marginTop: 4 }} />
                  {projErrors.description && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{projErrors.description}</span>}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <span style={{ fontSize: 11, color: projForm.description.length > 500 ? "var(--grn)" : "var(--ink3)", fontWeight: 600 }}>
                      {projForm.description.length} chars {projForm.description.length < 100 && projForm.description.length > 0 ? "· write more for better evaluation" : ""}
                    </span>
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--border)" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>Tech Stack Used <span style={{ color: "var(--rose)" }}>*</span></label>
                  <p style={{ fontSize: 12, color: "var(--ink3)" }}>e.g. Python, LangChain, Streamlit, OpenAI API, Pinecone</p>
                  <input className={`field-input${projErrors.tech_stack ? " err" : ""}`} placeholder="Python, FastAPI, React, GPT-4, ChromaDB..." value={projForm.tech_stack} onChange={e => projSet("tech_stack", e.target.value)} />
                  {projErrors.tech_stack && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{projErrors.tech_stack}</span>}
                  {projForm.tech_stack.trim() && (
                    <div className="tech-chip-row">
                      {projForm.tech_stack.split(",").map(t => t.trim()).filter(Boolean).map((tech, i) => (
                        <span key={i} className="tech-chip">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Section 3 — Links & Upload */}
              <div className="section-card fade-up-3">
                <div className="section-label">
                  <span className="section-num-vio">3</span>
                  <span style={{ marginLeft: 8 }}>Links & Screenshot</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      GitHub Repository Link <span style={{ color: "var(--rose)" }}>*</span>
                    </span>
                  </label>
                  <input className={`field-input${projErrors.github_link ? " err" : ""}`} type="url" placeholder="https://github.com/your-team/project-name" value={projForm.github_link} onChange={e => projSet("github_link", e.target.value)} />
                  {projErrors.github_link && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{projErrors.github_link}</span>}
                  <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 2 }}>
                    Make sure your repo is public or shared with the judges
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Live Demo Link <span style={{ color: "var(--ink3)", fontWeight: 400 }}>(optional)</span>
                    </span>
                  </label>
                  <input className="field-input" type="url" placeholder="https://your-project.vercel.app or Loom/YouTube video link" value={projForm.demo_link} onChange={e => projSet("demo_link", e.target.value)} />
                  <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 2 }}>
                    Deployed app URL, Loom walkthrough, or YouTube demo video
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--border)" }} />

                {/* Screenshot upload */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>
                    Project Screenshot <span style={{ color: "var(--ink3)", fontWeight: 400 }}>(optional but recommended)</span>
                  </label>
                  <input
                    ref={projFileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleProjFile}
                  />
                  <div
                    className={`upload-zone${projScreenshotName ? " has-file" : ""}`}
                    onClick={() => projFileRef.current?.click()}
                  >
                    {projScreenshotName ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4" stroke="var(--grn)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="10" stroke="var(--grn)" strokeWidth="2" />
                        </svg>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--grn)" }}>{projScreenshotName}</span>
                        <span style={{ fontSize: 11, color: "var(--ink3)", fontWeight: 500 }}>· Click to change</span>
                      </div>
                    ) : (
                      <div>
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--vio-l)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="var(--vio)" strokeWidth="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5" fill="var(--vio)"/>
                            <path d="M21 15l-5-5L5 21" stroke="var(--vio)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink2)" }}>
                          Click to upload project screenshot
                        </div>
                        <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 4 }}>PNG, JPG up to 5MB — show off your UI!</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Important note */}
              <div style={{
                padding: "16px 18px", borderRadius: 14,
                background: "var(--amb-l)", border: "1.5px solid rgba(245,158,11,.2)",
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(245,158,11,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#d97706" strokeWidth="2" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Before submitting</div>
                  <ul style={{ fontSize: 12, color: "var(--ink2)", lineHeight: 1.7, paddingLeft: 16, margin: 0 }}>
                    <li>Make sure your GitHub repo is <strong>public</strong> or shared with judges</li>
                    <li>Add a <strong>README.md</strong> with setup instructions in your repo</li>
                    <li>Double-check your project description — judges read this first</li>
                  </ul>
                </div>
              </div>

              {/* Server error */}
              {projServerError && (
                <div style={{ padding: "13px 16px", borderRadius: 12, background: "#fff1f2", border: "1px solid rgba(244,63,94,.2)", fontSize: 13, fontWeight: 600, color: "var(--rose)", display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="#f43f5e" strokeWidth="1.5"/><path d="M8 5v3.5M8 10.5v.5" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  {projServerError}
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={projLoading} className="submit-btn-vio">
                {projLoading ? (
                  <><div className="spinner" /> Submitting project...</>
                ) : (
                  <>Submit Hackathon Project
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/></svg>
                  </>
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: 11, color: "var(--ink3)", lineHeight: 1.6 }}>
                You can submit only once. Make sure all details are correct before submitting.
              </p>
            </form>
          )}

          {/* ═══════════════════════════════════════════════════ */}
          {/* ── FREE RESOURCES (hidden) ── */}
          {false && (
            <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Main resource card */}
              <div className="res-section">
                <div className="res-header" style={{ background: "linear-gradient(135deg, #064e3b 0%, #047857 100%)" }}>
                  <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "white", letterSpacing: "-.02em" }}>Bootcamp Resource Kit</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500, marginTop: 3 }}>Everything from the 2-day AI bootcamp — yours to keep forever</div>
                    </div>
                  </div>
                </div>
                <div className="res-body" style={{ gap: 14 }}>
                  {/* Resource items */}
                  {[
                    { title: "Presentation Slides", desc: "All session slides from Day 1 & Day 2 in PDF format", icon: "📊", color: "#eef1fd", textColor: "#1d3a8f", chips: ["Day 1", "Day 2", "PDF"] },
                    { title: "Code Notebooks", desc: "Jupyter notebooks with hands-on exercises and solutions", icon: "💻", color: "#f3f0ff", textColor: "#7c3aed", chips: ["Python", "Jupyter", "Colab"] },
                    { title: "Cheat Sheets", desc: "Quick reference cards for LLMs, prompt engineering, RAG", icon: "📋", color: "#fef3c7", textColor: "#d97706", chips: ["LLM", "Prompts", "RAG"] },
                    { title: "Reference Materials", desc: "Research papers, blog links, and further reading recommendations", icon: "📚", color: "#fce7f3", textColor: "#db2777", chips: ["Papers", "Blogs", "Links"] },
                  ].map((item) => (
                    <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px", borderRadius: 16, background: "var(--cream)", border: "1.5px solid var(--border)" }}>
                      <div style={{ width: 46, height: 46, borderRadius: 13, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22 }}>
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)", marginBottom: 3 }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: "var(--ink3)", lineHeight: 1.5, marginBottom: 8 }}>{item.desc}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {item.chips.map(c => (
                            <span key={c} style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 6, background: item.color, color: item.textColor, textTransform: "uppercase", letterSpacing: ".03em" }}>{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Download button */}
                  <a
                    href="https://drive.google.com/drive/folders/1EhuxYuf8W91AgaUkMp4YUrKEigBSgu7F?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      width: "100%", padding: "17px 28px", borderRadius: 16,
                      background: "linear-gradient(135deg, #047857 0%, #059669 60%, #10b981 100%)",
                      color: "white", fontSize: 15, fontWeight: 800, textDecoration: "none",
                      boxShadow: "0 4px 20px rgba(5,150,105,0.35)",
                      transition: "transform .15s, box-shadow .2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(5,150,105,0.42)" }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(5,150,105,0.35)" }}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Open Google Drive
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>

              {/* Instagram follow */}
              <div className="section-card fade-up-2" style={{ gap: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--ink3)" }}>Stay Connected</div>
                <a href="https://www.instagram.com/jobingen.ai/" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 14, textDecoration: "none",
                    padding: "14px 18px", borderRadius: 14,
                    background: "linear-gradient(135deg,rgba(131,58,180,0.06),rgba(253,29,29,0.04),rgba(252,176,69,0.06))",
                    border: "1.5px solid rgba(131,58,180,0.15)",
                    transition: "transform .15s, box-shadow .2s",
                  }}
                >
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)" }}>Follow @jobingen.ai</div>
                    <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 2 }}>Get notified when the next bootcamp drops</div>
                  </div>
                  <svg style={{ flexShrink: 0 }} width="18" height="18" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="#8a8aa8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
