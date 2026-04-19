"use client"

import { useState, useRef, ChangeEvent, Suspense } from "react"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

const UPI_ID = "jobingenai@ybl"

// ─── CSS ────────────────────────────────────────────────────────
const CSS = `
  :root {
    --ink:    #09090f;
    --ink2:   #3d3d52;
    --ink3:   #8a8aa8;
    --white:  #ffffff;
    --cream:  #f7f7fb;
    --cream2: #f0f0f8;
    --border: rgba(10,10,20,0.08);
    --borderM:rgba(10,10,20,0.14);
    --ind:    #4f46e5;
    --ind-l:  #eef2ff;
    --vio:    #7c3aed;
    --grn:    #10b981;
    --grn-l:  #ecfdf5;
    --amb:    #f59e0b;
    --amb-l:  #fffbeb;
    --rose:   #f43f5e;
    --rose-l: #fff1f2;
    --shadow-sm:  0 2px 8px rgba(10,10,20,0.05);
    --shadow-md:  0 4px 24px rgba(10,10,20,0.08);
    --shadow-lg:  0 12px 48px rgba(10,10,20,0.1);
    --spring: cubic-bezier(.34,1.56,.64,1);
    --ease-out: cubic-bezier(.16,1,.3,1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; }

  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes pulse-s {
    0%,100% { transform: scale(1); opacity:.8; }
    50%      { transform: scale(1.15); opacity:1; }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes check-pop {
    0%   { transform: scale(0) rotate(-10deg); opacity:0; }
    60%  { transform: scale(1.2) rotate(4deg); opacity:1; }
    100% { transform: scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes confetti-fall {
    0%   { transform: translateY(-20px) rotate(0deg); opacity:1; }
    100% { transform: translateY(100px) rotate(720deg); opacity:0; }
  }
  @keyframes spin-slow { to { transform: rotate(360deg); } }

  .shimmer {
    background: linear-gradient(90deg, #4f46e5 0%, #6366f1 28%, #818cf8 48%, #6366f1 68%, #4f46e5 100%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 5s linear infinite;
  }
  .top-bar {
    height: 3px;
    background: linear-gradient(90deg, #4f46e5, #6366f1, #818cf8, #818cf8, #6366f1, #4f46e5);
    background-size: 200% auto;
    animation: shimmer 4s linear infinite;
  }
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; text-decoration: none; border: none; outline: none;
    transition: transform .22s var(--spring), box-shadow .22s ease;
    position: relative; overflow: hidden;
  }
  .btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none; border-radius: inherit;
  }
  .btn:hover  { transform: translateY(-2px) scale(1.025); }
  .btn:active { transform: translateY(0) scale(.97); }
  .btn-primary {
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
    box-shadow: 0 6px 28px rgba(79,70,229,.32);
    color: white;
  }
  .btn-primary:hover { box-shadow: 0 12px 40px rgba(79,70,229,.45); }
  .btn-primary:disabled { opacity:.68; cursor:not-allowed; transform:none; }

  .field-input {
    width: 100%; padding: 12px 14px; border-radius: 12px;
    border: 1.5px solid var(--border); background: var(--cream);
    font-size: 14px; font-weight: 500; color: var(--ink); outline: none;
    transition: border-color .18s ease, background .18s ease, box-shadow .18s ease;
    appearance: none; font-family: inherit;
  }
  .field-input:focus {
    border-color: var(--ind); background: white;
    box-shadow: 0 0 0 3px rgba(79,70,229,0.1);
  }
  .field-input::placeholder { color: var(--ink3); font-weight: 400; }
  .field-input.err { border-color: var(--rose); }

  .radio-card {
    flex: 1; padding: 10px 14px; border-radius: 12px;
    border: 1.5px solid var(--border); background: var(--cream);
    cursor: pointer; transition: all .18s ease; text-align: center;
    font-size: 13px; font-weight: 600; color: var(--ink2); user-select: none;
  }
  .radio-card:hover { border-color: rgba(79,70,229,0.3); background: var(--ind-l); color: var(--ind); }
  .radio-card.selected { border-color: var(--ind); background: var(--ind-l); color: var(--ind); font-weight: 700; }

  .upload-zone {
    width: 100%; padding: 18px 16px; border-radius: 14px;
    border: 2px dashed var(--border); background: var(--cream);
    text-align: center; cursor: pointer; transition: all .2s ease;
  }
  .upload-zone:hover { border-color: rgba(79,70,229,.35); background: var(--ind-l); }
  .upload-zone.has-file { border-style: solid; border-color: var(--grn); background: var(--grn-l); }

  .success-check { animation: check-pop .5s var(--spring) both; }
  .fade-up { animation: fade-up .6s var(--ease-out) both; }

  /* ═══ HERO ═══ */
  .hero-banner { padding: 60px 28px 52px; }
  .hero-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; border-radius: 99px; padding: 6px 14px; font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
  .hero-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 48px; }
  .hero-main { flex: 1; min-width: 0; }
  .hero-title { font-size: clamp(26px,3.5vw,44px); font-weight: 900; color: white; margin: 0 0 10px; line-height: 1.1; letter-spacing: -.03em; }
  .hero-subtitle { font-size: clamp(14px,1.5vw,17px); font-weight: 600; color: #a5b4fc; margin: 0 0 14px; line-height: 1.5; }
  .hero-desc { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.8; margin: 0 0 28px; }
  .hero-stats { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
  .hero-stat { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 12px 18px; }
  .hero-stat-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .hero-stat-val { font-size: 20px; font-weight: 900; line-height: 1; }
  .hero-stat-lbl { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.45); margin-top: 3px; text-transform: uppercase; letter-spacing: .05em; }
  .hero-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 0 0 24px; }
  .hero-tags { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  .hero-tag { font-size: 11px; font-weight: 600; padding: 5px 12px; border-radius: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); }
  .hero-event-card { flex-shrink: 0; width: 220px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 28px 24px; backdrop-filter: blur(16px); }
  .hero-event-icon { width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg,#4f46e5,#6366f1); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 8px 24px rgba(79,70,229,0.4); }
  .hero-event-label { font-size: 10px; font-weight: 800; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 8px; }
  .hero-event-date { font-size: 32px; font-weight: 900; color: white; line-height: 1; margin-bottom: 4px; }
  .hero-event-time { font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 500; margin-bottom: 16px; }
  .hero-event-price { display: inline-flex; align-items: center; justify-content: center; width: 100%; padding: 10px 0; border-radius: 12px; background: rgba(251,191,36,0.12); border: 1px solid rgba(251,191,36,0.25); font-size: 18px; font-weight: 900; color: #fbbf24; letter-spacing: -.01em; }
  .nav-badge { display: flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: 99px; background: var(--grn-l); border: 1px solid rgba(16,185,129,0.22); font-size: 11px; font-weight: 800; color: var(--grn); text-transform: uppercase; letter-spacing: .06em; }
  .nav-badge-text { display: inline; }

  @media (max-width: 900px) {
    .reg-grid { grid-template-columns: 1fr !important; }
    .reg-sticky { position: static !important; }
    .reg-2col { grid-template-columns: 1fr !important; }
    .reg-wrap { padding: 28px 20px !important; }
    .hint-right { display: none !important; }
    .hint-mobile { display: inline !important; }
    .hero-row { gap: 32px; }
    .hero-event-card { width: 190px; padding: 22px 18px; }
    .hero-event-date { font-size: 26px; }
  }
  @media (max-width: 700px) {
    .hero-event-card { display: none; }
    .hero-banner { padding: 40px 20px 36px; }
    .hero-stats { gap: 8px; }
    .hero-stat { padding: 10px 14px; }
  }
  @media (max-width: 600px) {
    .reg-wrap { padding: 20px 12px !important; }
    .reg-form-card { padding: 18px 14px !important; }
    .reg-nav { padding: 0 14px !important; }
    .radio-card { min-width: calc(50% - 4px); text-align: center; }
    .nav-badge-text { display: none; }
    .hero-banner { padding: 32px 16px 28px; }
    .hero-stat-val { font-size: 17px; }
    .hero-stat-icon { width: 30px; height: 30px; }
  }
  @media (max-width: 380px) {
    .hero-banner { padding: 24px 14px 22px; }
    .reg-wrap { padding: 16px 10px !important; }
    .reg-form-card { padding: 14px 12px !important; }
    .radio-card { min-width: 100%; }
    .hero-stats { gap: 6px; }
    .hero-stat { padding: 9px 12px; gap: 8px; }
  }
  .hint-right  { display: inline; }
  .hint-mobile { display: none; }

  /* ═══ MENTOR ═══ */
  .mentor-section { margin-bottom: 52px; }
  .mentor-title-row { margin-bottom: 36px; text-align: center; }
  .mentor-label { font-size: 12px; font-weight: 700; color: var(--ind); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
  .mentor-heading { font-size: clamp(26px,3.2vw,38px); font-weight: 900; letter-spacing: -.03em; color: var(--ink); margin: 0 0 10px; line-height: 1.1; }
  .mentor-sub { font-size: 15px; color: var(--ink2); line-height: 1.7; max-width: 520px; margin: 0 auto; }
  .mentor-card {
    background: white; border-radius: 20px; border: 1.5px solid var(--border);
    box-shadow: var(--shadow-sm); padding: 22px 20px;
    display: flex; flex-direction: column; gap: 12px;
    transition: transform .28s var(--ease-out), box-shadow .28s ease;
    max-width: 480px; margin: 0 auto;
  }
  .mentor-card:hover { transform: translateY(-5px); box-shadow: 0 18px 52px rgba(10,10,20,0.13); }
  .mentor-photo {
    width: 68px; height: 68px; border-radius: 16px; object-fit: cover;
    border: 2.5px solid var(--ind-l); flex-shrink: 0;
  }
  .mentor-photo-fallback {
    width: 68px; height: 68px; border-radius: 16px;
    background: linear-gradient(135deg,#4f46e5,#6366f1);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 900; color: white; flex-shrink: 0;
  }
  .mentor-name { font-size: 16px; font-weight: 800; color: var(--ink); line-height: 1.2; }
  .mentor-role { font-size: 12px; font-weight: 600; color: var(--ind); line-height: 1.4; margin-top: 2px; }
  .mentor-co   { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 6px; background: var(--ind-l); color: var(--ind); letter-spacing: .03em; margin-top: 4px; }
  .mentor-divider { height: 1px; background: var(--border); }
  .mentor-desc { font-size: 12.5px; color: var(--ink2); line-height: 1.72; flex: 1; }
  .mentor-desc.clamped { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  .mentor-more { margin-top: 6px; background: none; border: none; padding: 0; font-size: 12px; font-weight: 700; color: var(--ind); cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
  .mentor-linkedin {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 700; color: var(--ind); text-decoration: none;
    padding: 8px 14px; border-radius: 10px; background: var(--ind-l);
    border: 1.5px solid rgba(79,70,229,0.15);
    transition: background .2s ease, color .2s ease, transform .2s ease;
    align-self: flex-start; margin-top: auto;
  }
  .mentor-linkedin:hover { background: var(--ind); color: white; transform: translateY(-1px); }
`

// ─── Success Screen ──────────────────────────────────────────────
function SuccessScreen({ name }: { name: string }) {
  const dots = ["#6366f1","#34d399","#fb7185","#fbbf24","#60a5fa","#8c9df6","#f472b6"]
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--cream)", padding:"40px 24px", position:"relative", overflow:"hidden" }}>
      {dots.map((c,i) => (
        <div key={i} style={{ position:"absolute", width:8, height:8, borderRadius:"50%", background:c, left:`${12+i*11}%`, top:"20%", animation:`confetti-fall ${1.2+i*0.15}s ease-out ${i*0.08}s both` }} />
      ))}
      {dots.map((c,i) => (
        <div key={`b${i}`} style={{ position:"absolute", width:6, height:6, borderRadius:2, background:c, left:`${8+i*12}%`, top:"15%", animation:`confetti-fall ${1.4+i*0.12}s ease-out ${0.1+i*0.07}s both` }} />
      ))}
      <div style={{ maxWidth:480, width:"100%", textAlign:"center" }} className="fade-up">
        <div className="success-check" style={{ width:88, height:88, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#6366f1)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px", boxShadow:"0 16px 48px rgba(79,70,229,0.32)" }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <path d="M10 21L17 28L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:"var(--ind)", marginBottom:10, textTransform:"uppercase", letterSpacing:".06em" }}>You&apos;re registered!</div>
        <h1 style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:900, letterSpacing:"-.03em", color:"var(--ink)", margin:"0 0 14px", lineHeight:1.1 }}>
          You&apos;re in,<br /><span className="shimmer">{name.split(" ")[0]}!</span>
        </h1>
        <p style={{ fontSize:15, color:"var(--ink2)", lineHeight:1.72, margin:"0 0 32px", maxWidth:380, marginLeft:"auto", marginRight:"auto" }}>
          Your registration has been submitted. We will verify your payment and send a confirmation to your email.
        </p>
        <div style={{ borderRadius:20, padding:"20px 24px", background:"white", border:"1.5px solid var(--border)", boxShadow:"var(--shadow-sm)", textAlign:"left", marginBottom:24 }}>
          <div style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:".07em", color:"var(--ink3)", marginBottom:14 }}>What happens next</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { icon:"🔍", text:"We verify your UPI payment within a few hours" },
              { icon:"📧", text:"Confirmation email sent once payment is verified" },
              { icon:"💬", text:"Join the WhatsApp group below to stay updated" },
              { icon:"📅", text:"Reminder 24hrs before the masterclass on 19 April" },
              { icon:"⚡", text:"3-hour live session with Bipin — be ready to code!" },
            ].map((s,i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:16, lineHeight:1, marginTop:1, flexShrink:0 }}>{s.icon}</span>
                <span style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.5 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
        <a
          href="https://chat.whatsapp.com/Fl3oz48m5EOChRLUdfAt8V"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:10,
            background:"#25d366", color:"#fff",
            padding:"15px 28px", borderRadius:14,
            fontSize:15, fontWeight:800, textDecoration:"none",
            boxShadow:"0 6px 24px rgba(37,211,102,.35)",
            transition:"all .25s", marginBottom:10,
          }}
          onMouseEnter={e => (e.currentTarget.style.transform="translateY(-2px)")}
          onMouseLeave={e => (e.currentTarget.style.transform="translateY(0)")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.03l5.327-1.394A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-4.99-1.364l-.358-.213-3.714.973.99-3.625-.233-.37A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
          </svg>
          Join WhatsApp Group
        </a>
        <a
          href="https://www.instagram.com/jobingen.ai/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:10,
            background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", color:"#fff",
            padding:"13px 28px", borderRadius:14,
            fontSize:14, fontWeight:800, textDecoration:"none",
            transition:"all .25s", marginBottom:12,
          }}
          onMouseEnter={e => (e.currentTarget.style.transform="translateY(-2px)")}
          onMouseLeave={e => (e.currentTarget.style.transform="translateY(0)")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          Follow on Instagram
        </a>
        <a href="/pre-launch" className="btn btn-primary" style={{ fontSize:14, fontWeight:800, padding:"13px 28px", borderRadius:14 }}>
          Back to Home
        </a>
      </div>
    </div>
  )
}

// ─── UPI Payment Card ─────────────────────────────────────────────
function UpiCard() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  return (
    <div style={{ borderRadius:24, overflow:"hidden", boxShadow:"var(--shadow-lg)", border:"1.5px solid var(--border)" }}>
      <div style={{ background:"linear-gradient(135deg,#4f46e5,#6366f1)", padding:"20px 24px" }}>
        <div style={{ fontSize:10, fontWeight:800, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:4 }}>Registration Fee</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
          <span style={{ fontSize:42, fontWeight:900, color:"white", lineHeight:1 }}>₹29</span>
          <div style={{ display:"flex", flexDirection:"column", marginBottom:5, gap:1 }}>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)", fontWeight:600, lineHeight:1 }}>only</span>
          </div>
        </div>
      </div>
      <div style={{ background:"white", padding:"20px 24px", display:"flex", flexDirection:"column", gap:16 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            { n:"1", t:"Pay ₹29 using the QR code or UPI ID below" },
            { n:"2", t:"Note your UPI Transaction ID from the app" },
            { n:"3", t:"Fill it in the form and submit" },
          ].map(s => (
            <div key={s.n} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:"var(--ind)", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, flexShrink:0, marginTop:1 }}>{s.n}</div>
              <span style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.5, paddingTop:3 }}>{s.t}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"16px", borderRadius:16, background:"var(--cream)", border:"1.5px solid var(--border)" }}>
          <div style={{ width:170, height:170, borderRadius:14, overflow:"hidden", background:"white", border:"1.5px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", padding:6 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/qr-jobingen.jpeg" alt="UPI QR Code — jobingen@ybl" style={{ width:"100%", height:"100%", objectFit:"contain", borderRadius:8 }} />
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:6 }}>UPI ID</div>
            <button onClick={copy} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"9px 18px", borderRadius:10, border:"1.5px solid var(--border)", background:"white", cursor:"pointer", fontFamily:"inherit", transition:"all .2s" }}>
              <span style={{ fontSize:15, fontWeight:900, color:"var(--ind)", letterSpacing:".01em" }}>{UPI_ID}</span>
              <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:6, background: copied ? "var(--grn-l)" : "var(--ind-l)", color: copied ? "var(--grn)" : "var(--ind)" }}>
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
            {["Paytm","PhonePe","Google Pay","BHIM"].map(app => (
              <span key={app} style={{ fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:6, background:"var(--ind-l)", color:"var(--ind)" }}>{app}</span>
            ))}
          </div>
        </div>
        <div style={{ fontSize:12, color:"var(--ink3)", lineHeight:1.6, padding:"10px 14px", borderRadius:10, background:"var(--amb-l)", border:"1px solid rgba(245,158,11,.18)" }}>
          Scan the QR or send ₹29 to <strong style={{ color:"var(--ink2)" }}>{UPI_ID}</strong> via any UPI app, then fill in the transaction ID in the form.
        </div>
      </div>
    </div>
  )
}

// ─── Types ──────────────────────────────────────────────────────
type FormState = {
  name: string; email: string; phone: string; org: string
  status: string; level: string; goal: string
  upi_transaction_id: string; agreed: boolean
}
const INIT: FormState = {
  name:"", email:"", phone:"", org:"", status:"", level:"",
  goal:"", upi_transaction_id:"", agreed:false,
}

// ─── Main Page ───────────────────────────────────────────────────
export default function RegisterFrontendPage() {
  return <Suspense><RegisterForm /></Suspense>
}

function RegisterForm() {
  const [form, setForm] = useState<FormState>(INIT)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotName, setScreenshotName] = useState("")
  const [screenshotError, setScreenshotError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function set(key: keyof FormState, val: string | boolean) {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: "" }))
    setServerError("")
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setScreenshot(file)
    setScreenshotName(file.name)
    setScreenshotError("")
  }

  function validate() {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim())  e.name  = "Name is required"
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required"
    if (!form.phone.trim() || form.phone.replace(/\D/g,"").length < 10) e.phone = "10-digit number required"
    if (!form.org.trim())   e.org   = "College or company required"
    if (!form.status)       e.status = "Please select one"
    if (!form.level)        e.level  = "Please select one"
    if (!form.upi_transaction_id.trim()) e.upi_transaction_id = "UPI Transaction ID is required"
    if (!form.agreed)       e.agreed = "Please agree to continue"
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (!screenshot) setScreenshotError("Please upload your payment screenshot")
    if (Object.keys(errs).length || !screenshot) { setErrors(errs); return }
    setLoading(true)
    setServerError("")
    try {
      const fd = new FormData()
      fd.append("name", form.name.trim())
      fd.append("email", form.email.trim())
      fd.append("phone", form.phone.trim())
      fd.append("college", form.org.trim())
      fd.append("upi_transaction_id", form.upi_transaction_id.trim())
      if (screenshot) fd.append("screenshot", screenshot)

      const res = await fetch("/api/frontend-register", { method:"POST", body:fd })
      const data = await res.json()
      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.")
        setLoading(false)
        return
      }
      setSubmitted(true)
    } catch {
      setServerError("Network error. Please check your connection and try again.")
      setLoading(false)
    }
  }

  if (submitted) return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <SuccessScreen name={form.name} />
    </>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{ minHeight:"100vh", background:"var(--cream)" }}>
        <Navbar />

        {/* ── Hero Banner ── */}
        <div className="hero-banner" style={{ background:"linear-gradient(135deg,#06091a 0%,#0d1440 50%,#1a2a6e 100%)", position:"relative", overflow:"hidden", paddingTop:108 }}>
          {/* Decorative glows */}
          <div style={{ position:"absolute", top:-80, right:-60, width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,.2),transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-60, left:"10%", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle,rgba(79,70,229,.15),transparent 65%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"30%", left:"40%", width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,.08),transparent 70%)", pointerEvents:"none" }} />

          <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>

            {/* Badges row */}
            <div className="hero-badges">
              <span className="hero-badge" style={{ background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.35)", color:"#a5b4fc" }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6.5 1L1.5 7h4.5l-.5 4 5-6H6l.5-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                Live Masterclass
              </span>
              <span className="hero-badge" style={{ background:"rgba(251,191,36,0.12)", border:"1px solid rgba(251,191,36,0.3)", color:"#fbbf24" }}>
                📅 19 April 2026
              </span>
              <span className="hero-badge" style={{ background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)", color:"#34d399" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#34d399", animation:"pulse-s 1.5s ease-in-out infinite", flexShrink:0 }} />
                Registrations Open
              </span>
            </div>

            {/* Main row */}
            <div className="hero-row">

              {/* Left: content */}
              <div className="hero-main">
                <h1 className="hero-title">Frontend Engineering<br />Masterclass</h1>
                <p className="hero-subtitle">Stop Building To-Do Apps. Start Building Systems.</p>
                <p className="hero-desc">
                  A 3-hour intensive live session covering JavaScript internals, frontend system design, and building a YouTube-style React app — with Bipin Chaudhary.
                </p>

                {/* Stats cards */}
                <div className="hero-stats">
                  <div className="hero-stat">
                    <div className="hero-stat-icon" style={{ background:"rgba(165,180,252,0.15)" }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#a5b4fc" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round"/></svg>
                    </div>
                    <div>
                      <div className="hero-stat-val" style={{ color:"#a5b4fc" }}>3 Hours</div>
                      <div className="hero-stat-lbl">Live Session</div>
                    </div>
                  </div>
                  <div className="hero-stat">
                    <div className="hero-stat-icon" style={{ background:"rgba(96,165,250,0.15)" }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#60a5fa" strokeWidth="2"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/></svg>
                    </div>
                    <div>
                      <div className="hero-stat-val" style={{ color:"#60a5fa" }}>1 Mentor</div>
                      <div className="hero-stat-lbl">Expert Instructor</div>
                    </div>
                  </div>
                  <div className="hero-stat">
                    <div className="hero-stat-icon" style={{ background:"rgba(251,191,36,0.15)" }}>
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" fill="#fbbf24" fillOpacity=".9"/></svg>
                    </div>
                    <div>
                      <div className="hero-stat-val" style={{ color:"#fbbf24" }}>₹29 Only</div>
                      <div className="hero-stat-lbl">Registration Fee</div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="hero-divider" />
                <div className="hero-tags">
                  <span style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:".06em", marginRight:2 }}>Topics</span>
                  {["JavaScript","Event Loop","Closures","System Design","React","YouTube Clone"].map(tag => (
                    <span key={tag} className="hero-tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Right: event card */}
              <div className="hero-event-card">
                <div className="hero-event-icon">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="hero-event-label">Next Masterclass</div>
                <div className="hero-event-date">19 Apr</div>
                <div className="hero-event-time">Sunday · 11 AM – 2 PM</div>
                <div className="hero-event-price">₹29</div>
                <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:8 }}>
                  {["Live Online","3 Hours","Certificate"].map(item => (
                    <div key={item} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" stroke="rgba(165,180,252,0.5)" strokeWidth="1"/><path d="M3.5 6L5.5 8L8.5 4" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize:12, color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Page content */}
        <div id="frontend-registration" className="reg-wrap" style={{ maxWidth:1100, margin:"0 auto", padding:"48px 28px" }}>

          {/* Mentor */}
          <div className="mentor-section">
            <div className="mentor-title-row">
              <div className="mentor-label">Your Instructor</div>
              <h2 className="mentor-heading">Meet Your Mentor</h2>
              <p className="mentor-sub">
                Learn from a full stack developer who has worked on enterprise systems at SAP.
                He bridges the gap between tutorial thinking and real frontend engineering.
              </p>
            </div>
            <MentorCard />
          </div>

          {/* Header */}
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"var(--ind)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:10 }}>
              Frontend Engineering Masterclass · 19 April 2026
            </div>
            <h1 style={{ fontSize:"clamp(28px,3.6vw,44px)", fontWeight:900, letterSpacing:"-.03em", color:"var(--ink)", margin:"0 0 12px", lineHeight:1.08 }}>
              Register for the<br />Frontend Engineering Masterclass
            </h1>
            <p style={{ fontSize:15, color:"var(--ink2)", lineHeight:1.7 }}>
              Online · 3-Hour Live Session · 1 Mentor · <strong style={{ color:"var(--ind)" }}>₹29</strong> only · Limited seats
            </p>
            <div style={{ marginTop:12, display:"inline-flex", alignItems:"center", gap:8, padding:"8px 14px", borderRadius:10, background:"var(--amb-l)", border:"1px solid rgba(245,158,11,0.25)", fontSize:12, color:"var(--amb)", fontWeight:700 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M7 4V7.5L9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              Sunday, 19 April — 11:00 AM to 2:00 PM — register now
            </div>
          </div>

          {/* Grid */}
          <div className="reg-grid" style={{ display:"grid", gridTemplateColumns:"1fr 400px", gap:32, alignItems:"start" }}>

            {/* ── LEFT: Form ── */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="reg-form-card" style={{ background:"white", borderRadius:24, border:"1.5px solid var(--border)", boxShadow:"var(--shadow-sm)", padding:"32px", display:"flex", flexDirection:"column", gap:22 }}>

                <div className="reg-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <Field label="Full Name *" error={errors.name}>
                    <input className={`field-input${errors.name?" err":""}`} placeholder="Arjun Sharma" value={form.name} onChange={e => set("name", e.target.value)} />
                  </Field>
                  <Field label="Email Address *" error={errors.email}>
                    <input className={`field-input${errors.email?" err":""}`} type="email" placeholder="arjun@gmail.com" value={form.email} onChange={e => set("email", e.target.value)} />
                  </Field>
                </div>

                <div className="reg-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <Field label="WhatsApp Number *" error={errors.phone}>
                    <input className={`field-input${errors.phone?" err":""}`} placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} />
                  </Field>
                  <Field label="College / Company *" error={errors.org}>
                    <input className={`field-input${errors.org?" err":""}`} placeholder="IIT Delhi / Swiggy" value={form.org} onChange={e => set("org", e.target.value)} />
                  </Field>
                </div>

                <Field label="I am currently a..." error={errors.status}>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {["Student","Working Professional","Fresher / Between Jobs"].map(opt => (
                      <div key={opt} className={`radio-card${form.status===opt?" selected":""}`} onClick={() => set("status", opt)}>{opt}</div>
                    ))}
                  </div>
                </Field>

                <Field label="My JavaScript / Frontend experience is..." error={errors.level}>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {["Complete Beginner","Know the basics","Built a few projects"].map(opt => (
                      <div key={opt} className={`radio-card${form.level===opt?" selected":""}`} onClick={() => set("level", opt)}>{opt}</div>
                    ))}
                  </div>
                </Field>

                <Field label="What do you want to walk away with? (optional)">
                  <textarea className="field-input" placeholder="e.g. Understand JavaScript deeply, crack frontend interviews, build real projects..." rows={3} value={form.goal} onChange={e => set("goal", e.target.value)} style={{ resize:"none", lineHeight:1.6 }} />
                </Field>

                <div style={{ height:1, background:"var(--border)" }} />

                <div style={{ fontSize:14, fontWeight:800, color:"var(--ink)" }}>
                  Payment Details
                  <span className="hint-right" style={{ fontSize:11, fontWeight:600, color:"var(--ink3)", marginLeft:8 }}>Pay ₹29 via the QR on the right →</span>
                  <span className="hint-mobile" style={{ fontSize:11, fontWeight:600, color:"var(--ink3)", marginLeft:8 }}>Pay ₹29 via the QR below ↓</span>
                </div>

                <Field label="UPI Transaction ID *" error={errors.upi_transaction_id}>
                  <input
                    className={`field-input${errors.upi_transaction_id?" err":""}`}
                    placeholder="e.g. 123456789012"
                    value={form.upi_transaction_id}
                    onChange={e => set("upi_transaction_id", e.target.value)}
                  />
                  <div style={{ fontSize:11, color:"var(--ink3)", marginTop:2 }}>
                    Find this in your UPI app after completing the ₹29 payment.
                  </div>
                </Field>

                <div>
                  <label style={{ fontSize:12, fontWeight:700, color:"var(--ink2)", letterSpacing:".01em", display:"block", marginBottom:6 }}>
                    Payment Screenshot <span style={{ color:"var(--rose)" }}>*</span>
                  </label>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleFile} />
                  <div className={`upload-zone${screenshotName?" has-file":""}${screenshotError?" err":""}`} onClick={() => fileRef.current?.click()} style={screenshotError ? { borderColor:"var(--rose)", borderStyle:"dashed" } : {}}>
                    {screenshotName ? (
                      <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"center" }}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" stroke="var(--grn)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="var(--grn)" strokeWidth="2"/></svg>
                        <span style={{ fontSize:13, fontWeight:600, color:"var(--grn)" }}>{screenshotName}</span>
                      </div>
                    ) : (
                      <div>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ margin:"0 auto 6px", display:"block" }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={screenshotError?"var(--rose)":"var(--ink3)"} strokeWidth="1.8" strokeLinecap="round"/><polyline points="17 8 12 3 7 8" stroke={screenshotError?"var(--rose)":"var(--ink3)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="3" x2="12" y2="15" stroke={screenshotError?"var(--rose)":"var(--ink3)"} strokeWidth="1.8" strokeLinecap="round"/></svg>
                        <div style={{ fontSize:13, fontWeight:600, color:screenshotError?"var(--rose)":"var(--ink3)" }}>Click to upload payment screenshot</div>
                        <div style={{ fontSize:11, color:"var(--ink3)", marginTop:3 }}>PNG, JPG — required for payment verification</div>
                      </div>
                    )}
                  </div>
                  {screenshotError && <div style={{ fontSize:11, color:"var(--rose)", fontWeight:600, marginTop:4 }}>{screenshotError}</div>}
                </div>

                <div>
                  <label style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer" }}>
                    <div onClick={() => set("agreed", !form.agreed)} style={{ width:20, height:20, borderRadius:6, border:`1.5px solid ${form.agreed?"var(--ind)":"var(--borderM)"}`, background:form.agreed?"var(--ind)":"white", flexShrink:0, marginTop:1, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .18s ease" }}>
                      {form.agreed && <svg width="11" height="11" fill="none" viewBox="0 0 11 11"><path d="M1.5 5.5L4.5 8.5L9.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.6 }}>
                      I agree to receive event communications via email and WhatsApp. I understand the ₹29 registration fee is non-refundable and my payment will be verified manually.
                    </span>
                  </label>
                  {errors.agreed && <div style={{ fontSize:11, color:"var(--rose)", marginTop:6, marginLeft:32 }}>{errors.agreed}</div>}
                </div>

                {serverError && (
                  <div style={{ padding:"12px 16px", borderRadius:10, background:"var(--rose-l)", border:"1px solid rgba(244,63,94,.25)", fontSize:13, fontWeight:600, color:"var(--rose)" }}>
                    {serverError}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading}
                  style={{ fontSize:15, fontWeight:900, padding:"15px 28px", borderRadius:16, width:"100%", gap:10, transition:"opacity .2s" }}>
                  {loading
                    ? <><Spinner /> Registering...</>
                    : <>Register for Masterclass — ₹29 <svg width="16" height="16" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                  }
                </button>

                <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:20, paddingTop:4, flexWrap:"wrap" }}>
                  {["🔒 Secure","📧 Confirmation email","✅ Payment verified manually"].map((t,i) => (
                    <span key={i} style={{ fontSize:11, color:"var(--ink3)", fontWeight:600 }}>{t}</span>
                  ))}
                </div>

              </div>
            </form>

            {/* ── RIGHT: UPI card + Event summary ── */}
            <div className="reg-sticky" style={{ position:"sticky", top:76, display:"flex", flexDirection:"column", gap:16 }}>

              <UpiCard />

              {/* Event summary */}
              <div style={{ borderRadius:24, overflow:"hidden", boxShadow:"var(--shadow-md)", border:"1.5px solid var(--border)" }}>
                <div style={{ background:"linear-gradient(135deg,#4f46e5,#6366f1)", padding:"20px 24px" }}>
                  <div style={{ fontSize:10, fontWeight:800, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:6 }}>What&apos;s Included</div>
                  <div style={{ fontSize:17, fontWeight:800, color:"white", lineHeight:1.3 }}>Frontend Engineering Masterclass</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.55)", marginTop:4 }}>19 April 2026 · 3-Hour Live Session</div>
                </div>
                <div style={{ background:"white", padding:"18px 24px", display:"flex", flexDirection:"column", gap:12 }}>
                  {[
                    { n:"1", label:"JS Internals", detail:"Execution context, closures, event loop", clr:"#4f46e5", bg:"#eef2ff" },
                    { n:"2", label:"Frontend System Design", detail:"Component architecture & state management", clr:"#7c3aed", bg:"#f5f3ff" },
                    { n:"3", label:"React YouTube Clone", detail:"Video grid, search, and routing live", clr:"#0d9488", bg:"#f0fdfa" },
                  ].map(s => (
                    <div key={s.n} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      <div style={{ width:32, height:32, borderRadius:10, background:s.bg, color:s.clr, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, flexShrink:0 }}>{s.n}</div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:"var(--ink)" }}>{s.label}</div>
                        <div style={{ fontSize:11, color:"var(--ink3)" }}>{s.detail}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ height:1, background:"var(--border)" }} />
                  {[
                    { text:"Full lecture notes & resources" },
                    { text:"Certificate of completion" },
                    { text:"Lifetime access to recordings" },
                  ].map((p,i) => (
                    <div key={i} style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0 }}><circle cx="7" cy="7" r="6" stroke="var(--ind)" strokeWidth="1.2"/><path d="M4.5 7L6.5 9L9.5 5" stroke="var(--ind)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize:12, fontWeight:600, color:"var(--ink2)" }}>{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderRadius:16, padding:"12px 16px", background:"var(--amb-l)", border:"1px solid rgba(245,158,11,0.25)", display:"flex", alignItems:"center", gap:12 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink:0 }}><path d="M10 2L4 10H9L8 16L14 8H9L10 2Z" stroke="var(--amb)" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                <div>
                  <div style={{ fontSize:13, fontWeight:800, color:"var(--ink)" }}>Seats filling up fast</div>
                  <div style={{ fontSize:11, color:"var(--ink3)" }}>Online · Limited capacity · Register now</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

// ─── Mentor Card ─────────────────────────────────────────────────
function MentorCard() {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="mentor-card">
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mentors/bipin-chaudhary.jpg"
          alt="Bipin Chaudhary"
          className="mentor-photo"
          onError={(e) => {
            e.currentTarget.style.display = "none"
            const fb = e.currentTarget.nextElementSibling as HTMLElement
            if (fb) fb.style.display = "flex"
          }}
        />
        <div className="mentor-photo-fallback" style={{ display:"none" }}>BC</div>
        <div>
          <div className="mentor-name">Bipin Chaudhary</div>
          <div className="mentor-role">Full Stack Developer</div>
          <span className="mentor-co">SAP Ex-Intern</span>
        </div>
      </div>
      <div className="mentor-divider" />
      <p className={`mentor-desc${expanded ? "" : " clamped"}`}>
        Bipin Chaudhary is a full stack developer with hands-on experience in building production-grade web applications. As a former SAP intern, he has worked on enterprise-scale frontend systems and understands the gap between tutorial projects and real engineering. In this masterclass, he will walk you through JavaScript internals, frontend system design principles, and building a YouTube-style React application — bridging theory with practical engineering thinking.
      </p>
      <button className="mentor-more" onClick={() => setExpanded(v => !v)}>
        {expanded ? "View Less ↑" : "View More ↓"}
      </button>
      <a
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mentor-linkedin"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn Profile
      </a>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontSize:12, fontWeight:700, color:"var(--ink2)", letterSpacing:".01em" }}>{label}</label>
      {children}
      {error && <div style={{ fontSize:11, color:"var(--rose)", fontWeight:600 }}>{error}</div>}
    </div>
  )
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation:"spin-slow 1s linear infinite", flexShrink:0 }}>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}
