"use client"

import { useEffect, useState } from "react"

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
    --shadow-xl:  0 24px 80px rgba(10,10,20,0.12);
    --ind-glow:   0 8px 32px rgba(79,70,229,0.28);
    --ind-glow-l: 0 4px 16px rgba(79,70,229,0.16);
    --spring: cubic-bezier(.34,1.56,.64,1);
    --ease-out: cubic-bezier(.16,1,.3,1);
  }

  /* ── Keyframes ─────────────────────────── */
  @keyframes reveal-up {
    from { opacity:0; transform:translateY(44px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes reveal-scale {
    from { opacity:0; transform:scale(.9) translateY(20px); }
    to   { opacity:1; transform:scale(1)  translateY(0); }
  }
  @keyframes float-phone {
    0%,100% { transform: translateY(0px) rotate(1.2deg); }
    50%      { transform: translateY(-20px) rotate(-0.4deg); }
  }
  @keyframes badge-a {
    0%,100% { transform: translate(0,0) rotate(-4deg) scale(1); }
    50%      { transform: translate(-5px,-13px) rotate(-2deg) scale(1.02); }
  }
  @keyframes badge-b {
    0%,100% { transform: translate(0,0) rotate(3deg) scale(1); }
    50%      { transform: translate(7px,-9px) rotate(5deg) scale(1.02); }
  }
  @keyframes badge-c {
    0%,100% { transform: translate(0,0) rotate(-1deg) scale(1); }
    40%      { transform: translate(4px,9px) rotate(1deg) scale(1.01); }
  }
  @keyframes ticker-slide {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes ping {
    75%,100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes gradient-pan {
    0%,100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }
  @keyframes pulse-s {
    0%,100% { transform: scale(1); opacity:.8; }
    50%      { transform: scale(1.12); opacity:1; }
  }
  @keyframes spin-slow {
    to { transform: rotate(360deg); }
  }
  @keyframes sparkle-1 {
    0%,100% { transform: translate(0,0) scale(1) rotate(0deg); opacity:.25; }
    33%      { transform: translate(-8px,-14px) scale(1.15) rotate(30deg); opacity:.5; }
    66%      { transform: translate(6px,-6px) scale(.9) rotate(-15deg); opacity:.35; }
  }
  @keyframes sparkle-2 {
    0%,100% { transform: translate(0,0) scale(1) rotate(0deg); opacity:.2; }
    40%      { transform: translate(10px,-10px) scale(1.2) rotate(-25deg); opacity:.45; }
    70%      { transform: translate(-4px,8px) scale(.85) rotate(20deg); opacity:.3; }
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(28px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
  }
  @keyframes bar-in {
    from { width: 0; }
  }
  @keyframes count-fade {
    from { opacity:0; transform: translateY(6px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes activity-in {
    from { opacity:0; transform: translateX(-12px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes underline-grow {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }

  /* ── Scroll reveal ──────────────────────── */
  .sr {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity .75s var(--ease-out), transform .75s var(--ease-out);
  }
  .sr.in { opacity:1; transform:translateY(0); }
  .d1 { transition-delay:.07s; }
  .d2 { transition-delay:.14s; }
  .d3 { transition-delay:.21s; }
  .d4 { transition-delay:.28s; }
  .d5 { transition-delay:.35s; }
  .d6 { transition-delay:.42s; }

  /* ── Shimmer gradient text ──────────────── */
  .shimmer {
    background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 28%, #a855f7 48%, #7c3aed 68%, #4f46e5 100%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 5s linear infinite;
  }

  /* ── Button system ──────────────────────── */
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; text-decoration: none; border: none; outline: none;
    transition: transform .22s var(--spring), box-shadow .22s ease, background .15s ease;
    position: relative; overflow: hidden;
  }
  .btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none;
    border-radius: inherit;
  }
  .btn:hover  { transform: translateY(-3px) scale(1.035); }
  .btn:active { transform: translateY(0) scale(.97); }
  .btn-primary {
    background: linear-gradient(135deg, #4f46e5 0%, #6d28d9 100%);
    box-shadow: 0 6px 28px rgba(79,70,229,.32), 0 2px 6px rgba(79,70,229,.2);
  }
  .btn-primary:hover {
    box-shadow: 0 12px 40px rgba(79,70,229,.45), 0 4px 12px rgba(79,70,229,.25);
  }
  .btn-outline {
    background: white;
    box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,.8);
  }
  .btn-outline:hover { box-shadow: var(--shadow-md); }

  /* ── Cards ──────────────────────────────── */
  .card {
    background: white;
    border-radius: 20px;
    border: 1.5px solid var(--border);
    box-shadow: var(--shadow-sm);
    transition: transform .28s var(--spring), box-shadow .28s ease;
    position: relative; overflow: hidden;
  }
  .card::before {
    content: '';
    position: absolute; top:0; left:0; right:0; height:1px;
    background: linear-gradient(90deg, transparent, rgba(79,70,229,.15), transparent);
    opacity: 0;
    transition: opacity .28s ease;
  }
  .card:hover { transform: translateY(-7px) scale(1.008); box-shadow: var(--shadow-lg), 0 0 0 1px rgba(79,70,229,.06); }
  .card:hover::before { opacity: 1; }

  /* ── Feature card icon bounce ── */
  .card:hover .feat-icon {
    transform: scale(1.14) rotate(-6deg);
    transition: transform .3s var(--spring);
  }
  .feat-icon {
    transition: transform .3s ease;
  }

  /* ── Pill badge ─────────────────────────── */
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px; border-radius: 99px;
    font-size: 11px; font-weight: 800;
    text-transform: uppercase; letter-spacing: .065em;
  }

  /* ── Ticker ─────────────────────────────── */
  .ticker-wrap { display:flex; width:max-content; animation: ticker-slide 30s linear infinite; }

  /* ── Activity rows ──────────────────────── */
  .activity-row { animation: activity-in .45s var(--ease-out) both; }

  /* ── Stat underline ─────────────────────── */
  .stat-line {
    height: 3px; border-radius:99px; margin: 6px auto 0;
    animation: underline-grow .8s var(--ease-out) .4s both;
  }

  /* ── Gradient border card ───────────────── */
  .grad-border {
    position: relative;
  }
  .grad-border::before {
    content: '';
    position: absolute; inset: -1px;
    border-radius: 21px;
    background: linear-gradient(135deg, rgba(79,70,229,.35), rgba(139,92,246,.15), transparent);
    z-index: -1;
    opacity: 0;
    transition: opacity .28s ease;
  }
  .grad-border:hover::before { opacity: 1; }

  /* ── Pricing popular glow ───────────────── */
  .pricing-popular {
    box-shadow: 0 0 0 2px #4f46e5, 0 28px 80px rgba(79,70,229,.22), 0 8px 24px rgba(79,70,229,.12);
  }

  /* ── Section divider dots ───────────────── */
  .dot-divider {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    margin: 0 0 16px;
  }
  .dot-divider span {
    width: 4px; height: 4px; border-radius:50%; background: var(--ind-l);
    display: inline-block;
  }
  .dot-divider span:nth-child(2) { background: rgba(79,70,229,.3); }
  .dot-divider span:nth-child(3) { background: rgba(79,70,229,.15); }

  /* ── Shimmer top bar ─────────────────────── */
  .top-bar {
    height: 3px;
    background: linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7, #ec4899, #a855f7, #7c3aed, #4f46e5);
    background-size: 200% auto;
    animation: shimmer 4s linear infinite;
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  }

/* ── Feature card colored glow ───────────── */
  .feat-card { transition: transform .28s var(--spring), box-shadow .28s ease; }

  /* ── Nav short text ──────────────────────── */
  .nav-cta-short { display: none; }

  /* ── Responsive ─────────────────────────── */
  @media (max-width:768px) {
    /* Navbar */
    .nav-inner { padding: 0 18px !important; }
    .nav-cta-main { font-size: 12px !important; padding: 8px 14px !important; border-radius: 10px !important; }
    .nav-cta-full  { display: none; }
    .nav-cta-short { display: inline; }

    /* Hero */
    .hero-grid { grid-template-columns: 1fr !important; padding: 76px 20px 44px !important; gap: 0 !important; }
    .hero-left { display: flex !important; flex-direction: column !important; align-items: center !important; }
    .hero-h1  { text-align: center !important; font-size: clamp(36px,9vw,52px) !important; margin-bottom: 16px !important; }
    .hero-desc { text-align: center !important; max-width: 100% !important; font-size: 15px !important; margin-bottom: 22px !important; }
    .hero-ctas { justify-content: center !important; }
    .hero-proof { flex-direction: column !important; align-items: center !important; gap: 10px !important; padding-bottom: 14px !important; margin-bottom: 14px !important; }
    .hero-mini-stats { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--border); padding-top: 10px; justify-content: center !important; }
    .hero-live { justify-content: center !important; flex-wrap: wrap !important; gap: 6px !important; }
    .hero-right { display: none !important; }

    /* Bootcamp */
    .bootcamp-head { padding: 16px !important; gap: 12px !important; }
    .bootcamp-left-group { flex-wrap: wrap !important; gap: 8px !important; }
    .bootcamp-title { font-size: 17px !important; }
    .bootcamp-body { grid-template-columns: 1fr !important; padding: 18px 16px !important; gap: 16px !important; }
    .bootcamp-cols { grid-template-columns: 1fr !important; }

    /* Problems */
    .problems-grid { grid-template-columns: 1fr !important; }

    /* Testimonials */
    .testimonial-feat { transform: scale(1) !important; }

    /* CTA */
    .cta-inner { padding: 44px 20px !important; border-radius: 20px !important; }
    .cta-h2   { font-size: clamp(28px,7.5vw,40px) !important; margin-bottom: 12px !important; }
    .cta-sub  { font-size: 15px !important; margin-bottom: 28px !important; max-width: 100% !important; }
    .cta-pills { flex-direction: column !important; align-items: center !important; gap: 6px !important; }

    /* Footer */
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
    .footer-brand { grid-column: 1 / -1 !important; }
    .footer-bottom { flex-direction: column !important; align-items: center !important; gap: 10px !important; text-align: center !important; }

    /* Sections */
    .section-pad { padding: 52px 20px !important; }
  }
  @media (max-width:480px) {
    .nav-inner { padding: 0 14px !important; }
    .hero-grid { padding: 70px 16px 36px !important; }
    .hero-h1  { font-size: clamp(32px,8.5vw,42px) !important; }
    .hero-ctas a { width: 100% !important; justify-content: center !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
    .cta-inner { padding: 36px 16px !important; }
    .cta-pills { flex-direction: column !important; }
  }
`

// ─── Navbar ────────────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: scrolled ? "rgba(247,247,251,0.94)" : "rgba(247,247,251,0.55)",
      backdropFilter:"blur(24px)",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
      transition: "all .35s ease",
    }}>
      <div className="nav-inner" style={{ maxWidth:1200, margin:"0 auto", padding:"0 28px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", gap:24 }}>
        <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <div style={{ width:36, height:36, borderRadius:11, background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:900, color:"white", boxShadow:"0 4px 16px rgba(79,70,229,0.3)" }}>V</div>
          <span style={{ fontSize:18, fontWeight:900, color:"var(--ink)", letterSpacing:"-.025em" }}>VibeonJob</span>
        </a>
        <div className="hidden md:flex" style={{ display:"flex", alignItems:"center", gap:36 }}>
          {[["Features","#features"],["How It Works","#how-it-works"],["Bootcamp","#bootcamp"]].map(([l,href]) => (
            <a key={l} href={href}
              style={{ fontSize:13, fontWeight:700, color:"var(--ink2)", textDecoration:"none", transition:"color .15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--ind)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--ink2)")}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <a href="/app" className="btn btn-outline hidden sm:inline-flex" style={{ fontSize:13, fontWeight:700, padding:"8px 16px", borderRadius:12, color:"var(--ink2)", border:"1.5px solid var(--borderM)" }}>Open App</a>
          <a href="/register" className="btn btn-primary nav-cta-main" style={{ fontSize:13, fontWeight:800, padding:"9px 20px", borderRadius:12, color:"white" }}>
            <span className="nav-cta-full">Get Started Free</span>
            <span className="nav-cta-short">Join Free</span>
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ──────────────────────────────────────────────────────
function Hero() {
  const [liveIdx, setLiveIdx] = useState(0)
  const wins = [
    { emoji:"🎉", text:"Rahul M. received ₹44 LPA offer at Zepto" },
    { emoji:"🏆", text:"Priya S. cracked the Flipkart PM interview" },
    { emoji:"🚀", text:"Arjun K. got SDE-2 at Swiggy in just 12 days" },
    { emoji:"💰", text:"Sneha K.'s ATS score jumped from 61 to 94" },
  ]
  useEffect(() => {
    const t = setInterval(() => setLiveIdx(i => (i + 1) % wins.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", paddingTop:64, background:"var(--white)", position:"relative", overflow:"hidden" }}>

      {/* Dot grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(79,70,229,0.09) 1px, transparent 1px)", backgroundSize:"32px 32px", maskImage:"radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 100%)", pointerEvents:"none" }} />

      {/* Orbs */}
      <div style={{ position:"absolute", top:"5%", left:"-8%", width:560, height:560, borderRadius:"50%", background:"radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)", filter:"blur(72px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"5%", right:"-5%", width:440, height:440, borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)", filter:"blur(72px)", pointerEvents:"none" }} />

      {/* Sparkles */}
      {[
        { top:"14%", left:"3%", size:18, anim:"sparkle-1 5s ease-in-out infinite" },
        { top:"80%", left:"6%", size:12, anim:"sparkle-2 4s ease-in-out 1s infinite" },
        { top:"20%", right:"3%", size:14, anim:"sparkle-1 6s ease-in-out .5s infinite" },
        { top:"85%", right:"5%", size:10, anim:"sparkle-2 4.5s ease-in-out 1.5s infinite" },
      ].map((s,i) => (
        <div key={i} style={{ position:"absolute", ...s, width:s.size, height:s.size, pointerEvents:"none", animation:s.anim }}>
          <svg viewBox="0 0 24 24"><path d="M12 2L13.5 10L22 12L13.5 14L12 22L10.5 14L2 12L10.5 10Z" fill="#4f46e5" /></svg>
        </div>
      ))}

      <div className="hero-grid" style={{ maxWidth:1240, margin:"0 auto", padding:"80px 32px", width:"100%", display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:80, alignItems:"center" }}>

        {/* ── LEFT ── */}
        <div className="hero-left" style={{ animation:"reveal-up .8s var(--ease-out) both" }}>

          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px 6px 8px", borderRadius:99, background:"var(--ind-l)", border:"1px solid rgba(79,70,229,.22)", marginBottom:28 }}>
            <div style={{ background:"linear-gradient(135deg,#4f46e5,#7c3aed)", borderRadius:99, padding:"3px 10px", fontSize:9, fontWeight:900, color:"white", textTransform:"uppercase", letterSpacing:".07em" }}>✦ NEW</div>
            <span style={{ fontSize:12, fontWeight:700, color:"var(--ind)" }}>Vibe AI mock interviews are live 🎤</span>
          </div>

          {/* H1 */}
          <h1 className="hero-h1" style={{ fontSize:"clamp(44px,5.2vw,68px)", fontWeight:900, lineHeight:1.06, letterSpacing:"-.036em", color:"var(--ink)", margin:"0 0 22px" }}>
            Get Hired at<br />
            India&apos;s Best<br />
            <span className="shimmer">Tech Companies.</span>
          </h1>

          {/* Description */}
          <p className="hero-desc" style={{ fontSize:"clamp(15px,1.4vw,17px)", lineHeight:1.72, color:"var(--ink2)", margin:"0 0 34px", maxWidth:460 }}>
            AI resume tailoring, real ₹ LPA salary benchmarks, smart job match scoring, and Vibe AI interview coaching — everything built for India&apos;s tech market.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:36 }}>
            <a href="/register" className="btn btn-primary" style={{ fontSize:15, fontWeight:800, padding:"14px 28px", borderRadius:16, color:"white", gap:8, display:"inline-flex", alignItems:"center" }}>
              Start Free — No Card
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="/" className="btn btn-outline" style={{ fontSize:15, fontWeight:700, padding:"14px 22px", borderRadius:16, color:"var(--ink)", border:"1.5px solid var(--borderM)", gap:8, display:"inline-flex", alignItems:"center" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="var(--ink)" strokeWidth="1.5"/><polygon points="6.5,5 11.5,8 6.5,11" fill="var(--ind)"/></svg>
              Watch Demo
            </a>
          </div>

          {/* Social proof */}
          <div className="hero-proof" style={{ display:"flex", alignItems:"center", gap:16, paddingBottom:22, borderBottom:"1px solid var(--border)", marginBottom:22 }}>
            <div style={{ display:"flex" }}>
              {["#4f46e5","#10b981","#f59e0b","#f43f5e","#8b5cf6"].map((c,i) => (
                <div key={i} style={{ width:32, height:32, borderRadius:"50%", background:c, border:"2.5px solid white", marginLeft:i?-10:0, fontSize:10, fontWeight:900, color:"white", display:"flex", alignItems:"center", justifyContent:"center", zIndex:5-i }}>
                  {["A","P","R","S","M"][i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ display:"flex", gap:1, marginBottom:3 }}>
                {[...Array(5)].map((_,i) => <svg key={i} width="12" height="12" viewBox="0 0 12 12"><path d="M6 1l1.3 3.7H11L8.2 6.5l1 3.7L6 8.2 2.8 10.2l1-3.7L1 4.7h3.7z" fill="#f59e0b"/></svg>)}
              </div>
              <div style={{ fontSize:12, color:"var(--ink3)" }}><strong style={{ color:"var(--ink)" }}>50,000+</strong> hired · <strong style={{ color:"var(--ind)" }}>4.9★</strong> rating</div>
            </div>
            <div className="hero-mini-stats" style={{ display:"flex", gap:20, paddingLeft:16, borderLeft:"1px solid var(--border)" }}>
              {[{ v:"12d", l:"avg. to offer" }, { v:"94%", l:"interview pass" }].map(m => (
                <div key={m.l}>
                  <div style={{ fontSize:20, fontWeight:900, color:"var(--ind)", lineHeight:1 }}>{m.v}</div>
                  <div style={{ fontSize:10, color:"var(--ink3)", marginTop:2 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live ticker */}
          <div className="hero-live" style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
              <div style={{ position:"relative", width:8, height:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:"var(--grn)" }} />
                <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"var(--grn)", animation:"ping 1.7s ease-out infinite" }} />
              </div>
              <span style={{ fontSize:10, fontWeight:800, color:"var(--grn)", textTransform:"uppercase", letterSpacing:".06em" }}>Live</span>
            </div>
            <div key={liveIdx} style={{ fontSize:13, fontWeight:600, color:"var(--ink2)", animation:"activity-in .4s var(--ease-out)" }}>
              {wins[liveIdx].emoji} {wins[liveIdx].text}
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="hero-right" style={{ position:"relative", height:560, animation:"reveal-up .8s var(--ease-out) .22s both" }}>

          {/* Glow */}
          <div style={{ position:"absolute", top:"50%", left:"50%", translate:"-50% -50%", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)", filter:"blur(56px)", pointerEvents:"none" }} />

          {/* ── MAIN MATCH CARD ── */}
          <div style={{
            position:"absolute", top:"50%", left:"50%", translate:"-50% -50%",
            width:330, borderRadius:28,
            background:"linear-gradient(148deg, #4338ca 0%, #6d28d9 100%)",
            padding:"26px 24px",
            boxShadow:"0 40px 100px rgba(79,70,229,0.38), 0 8px 24px rgba(79,70,229,0.22)",
            overflow:"hidden",
            animation:"float-phone 8s ease-in-out infinite",
            zIndex:2,
          }}>
            <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }} />
            <div style={{ position:"absolute", bottom:-20, left:-20, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />

            <div style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.45)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:16, position:"relative" }}>⚡ Top Match · Today</div>

            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20, position:"relative" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:46, height:46, borderRadius:14, background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:900, color:"white", flexShrink:0 }}>SW</div>
                <div>
                  <div style={{ fontSize:16, fontWeight:900, color:"white", lineHeight:1.2 }}>SDE II — AI/ML</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.55)", marginTop:3 }}>Swiggy · Bengaluru</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.38)", marginTop:1 }}>₹32–52 LPA</div>
                </div>
              </div>
              <div style={{ textAlign:"center", flexShrink:0 }}>
                <div style={{ fontSize:40, fontWeight:900, color:"white", lineHeight:1 }}>94</div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,0.4)", letterSpacing:".05em" }}>% MATCH</div>
              </div>
            </div>

            <div style={{ marginBottom:20, position:"relative" }}>
              {[{ l:"Skills", p:95 }, { l:"Experience", p:88 }, { l:"Culture Fit", p:91 }].map(b => (
                <div key={b.l} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.45)", width:68, flexShrink:0 }}>{b.l}</span>
                  <div style={{ flex:1, height:5, borderRadius:99, background:"rgba(255,255,255,0.14)" }}>
                    <div style={{ height:"100%", borderRadius:99, background:"rgba(255,255,255,0.88)", width:`${b.p}%` }} />
                  </div>
                  <span style={{ fontSize:10, fontWeight:800, color:"rgba(255,255,255,0.6)", width:20, textAlign:"right" }}>{b.p}</span>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:8, position:"relative" }}>
              <div style={{ flex:1, height:42, borderRadius:14, background:"rgba(255,255,255,0.95)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, color:"#4f46e5", cursor:"pointer", gap:6 }}>
                <span>✦</span> Smart Apply
              </div>
              <div style={{ width:42, height:42, borderRadius:14, background:"rgba(255,255,255,0.14)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 2.5l1.8 4.2 4.5.4-3.3 2.9 1 4.3L8 11.8l-4 2.5 1-4.3-3.3-2.9 4.5-.4z" fill="rgba(255,255,255,0.65)"/></svg>
              </div>
            </div>

            <div style={{ marginTop:16, paddingTop:14, borderTop:"1px solid rgba(255,255,255,0.12)", display:"flex", justifyContent:"space-between", position:"relative" }}>
              {[{ l:"Applied", n:12 }, { l:"Screen", n:5 }, { l:"Interview", n:3 }, { l:"Offer", n:1 }].map((s,i) => (
                <div key={s.l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:16, fontWeight:900, color:["rgba(255,255,255,0.9)","rgba(255,255,255,0.65)","rgba(255,255,255,0.5)","rgba(255,255,255,0.35)"][i] }}>{s.n}</div>
                  <div style={{ fontSize:8, color:"rgba(255,255,255,0.28)", marginTop:1 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── ATS badge — top right ── */}
          <div style={{ position:"absolute", top:28, right:-16, background:"white", borderRadius:20, padding:"11px 15px", boxShadow:"0 16px 48px rgba(0,0,0,0.11), 0 4px 12px rgba(0,0,0,0.06)", animation:"badge-a 4.5s ease-in-out infinite", display:"flex", alignItems:"center", gap:10, border:"1.5px solid rgba(16,185,129,0.15)", zIndex:3 }}>
            <div style={{ width:36, height:36, borderRadius:11, background:"var(--grn-l)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>📄</div>
            <div>
              <div style={{ fontSize:13, fontWeight:900, color:"var(--ink)" }}>ATS Score <span style={{ color:"var(--grn)" }}>92</span></div>
              <div style={{ fontSize:10, color:"var(--ink3)" }}>↑ +31 pts this week</div>
            </div>
          </div>

          {/* ── Offer badge — bottom left ── */}
          <div style={{ position:"absolute", bottom:48, left:-16, background:"white", borderRadius:20, padding:"11px 16px", boxShadow:"0 16px 48px rgba(0,0,0,0.11), 0 4px 12px rgba(0,0,0,0.06)", animation:"badge-b 5.5s ease-in-out infinite", border:"1.5px solid rgba(16,185,129,0.18)", zIndex:3 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
              <span style={{ fontSize:16 }}>🎉</span>
              <span style={{ fontSize:16, fontWeight:900, color:"var(--grn)" }}>₹44 LPA!</span>
            </div>
            <div style={{ fontSize:10, color:"var(--ink3)" }}>Offer received · Zepto</div>
          </div>

          {/* ── Interview badge — mid left ── */}
          <div style={{ position:"absolute", top:146, left:-12, background:"var(--ind-l)", borderRadius:18, padding:"10px 14px", boxShadow:"0 12px 36px rgba(79,70,229,0.16)", animation:"badge-c 6s ease-in-out infinite", display:"flex", alignItems:"center", gap:8, border:"1.5px solid rgba(79,70,229,0.2)", zIndex:3 }}>
            <span style={{ fontSize:18 }}>📩</span>
            <div>
              <div style={{ fontSize:11, fontWeight:800, color:"var(--ind)" }}>Interview Invite!</div>
              <div style={{ fontSize:9, color:"var(--ind)", opacity:.65 }}>Razorpay · SDE II</div>
            </div>
          </div>

          {/* ── Salary badge — mid right ── */}
          <div style={{ position:"absolute", bottom:156, right:-12, background:"white", borderRadius:18, padding:"10px 15px", boxShadow:"0 12px 36px rgba(0,0,0,0.1)", animation:"badge-a 5s ease-in-out 1.5s infinite", border:"1.5px solid rgba(245,158,11,0.2)", zIndex:3 }}>
            <div style={{ fontSize:10, color:"var(--ink3)", marginBottom:2 }}>Salary Intel · ML Eng</div>
            <div style={{ fontSize:17, fontWeight:900, color:"var(--amb)" }}>₹42–48 LPA</div>
            <div style={{ fontSize:10, color:"var(--grn)", fontWeight:700 }}>↑ 18% YoY</div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Ticker ────────────────────────────────────────────────────
function Ticker() {
  const items = [
    "AI Resume Tailoring ✦","Salary Intelligence ₹ LPA ✦","5-Day Prep Streak ✦","Smart Job Matching ✦",
    "Application Pipeline ✦","Vibe AI Coach ✦","ATS Optimizer ✦","Platform Comparison ✦","Job Alerts ✦",
    "AI Resume Tailoring ✦","Salary Intelligence ₹ LPA ✦","5-Day Prep Streak ✦","Smart Job Matching ✦",
    "Application Pipeline ✦","Vibe AI Coach ✦","ATS Optimizer ✦","Platform Comparison ✦","Job Alerts ✦",
  ]
  return (
    <div style={{ background:"linear-gradient(135deg,#4338ca,#6d28d9)", padding:"15px 0", overflow:"hidden", position:"relative" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.07) 1px,transparent 1px)", backgroundSize:"20px 20px", pointerEvents:"none" }} />
      {/* Edge fades */}
      <div style={{ position:"absolute", top:0, bottom:0, left:0, width:140, background:"linear-gradient(to right, #4338ca, transparent)", zIndex:2, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, bottom:0, right:0, width:140, background:"linear-gradient(to left, #6d28d9, transparent)", zIndex:2, pointerEvents:"none" }} />
      <div className="ticker-wrap">
        {items.map((item,i) => (
          <span key={i} style={{ fontSize:12, fontWeight:800, color:"rgba(255,255,255,0.9)", textTransform:"uppercase", letterSpacing:".09em", whiteSpace:"nowrap", marginRight:48 }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

// ─── Logos ─────────────────────────────────────────────────────
function Logos() {
  const logos = ["Swiggy","Flipkart","CRED","PhonePe","Razorpay","Zepto","Meesho","Groww","Nykaa","Paytm","Juspay","Dunzo"]
  const clrs  = ["#ff6b35","#2874f0","#00bcd4","#6739b7","#02042b","#3a0ca3","#f43f5e","#00c27e","#fc2779","#00b9f1","#2563eb","#f59e0b"]
  const all   = [...logos,...logos]
  return (
    <section className="sr" style={{ background:"var(--cream)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"30px 0" }}>
      <div style={{ textAlign:"center", marginBottom:18 }}>
        <span style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:".08em", color:"var(--ink3)" }}>Our users got hired at</span>
      </div>
      <div style={{ overflow:"hidden" }}>
        <div className="ticker-wrap" style={{ animationDuration:"34s" }}>
          {all.map((c,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginRight:20, padding:"7px 14px", borderRadius:14, background:"white", border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)", flexShrink:0 }}>
              <div style={{ width:22, height:22, borderRadius:6, background:clrs[i%clrs.length]+"20", color:clrs[i%clrs.length], fontSize:10, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>{c[0]}</div>
              <span style={{ fontSize:12, fontWeight:700, color:"var(--ink2)", whiteSpace:"nowrap" }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Problems ──────────────────────────────────────────────────
function Problems() {
  const problems = [
    {
      icon:"🌀", clr:"var(--rose)", bg:"var(--rose-l)",
      problem:"Switching between 10 job portals every morning",
      painSub:"Naukri, LinkedIn, Wellfound, Internshala, Instahyre... and still missing jobs.",
      fix:"All portals in one feed — ranked by your AI fit score automatically.",
      tag:"Job Companion AI",
    },
    {
      icon:"🤖", clr:"var(--ind)", bg:"var(--ind-l)",
      problem:"Your resume gets rejected before a human sees it",
      painSub:"ATS bots filter out 75% of resumes. Yours might be one of them.",
      fix:"LaTeX resume builder + ATS optimizer. Hit 90+ score, every time.",
      tag:"LaTeX Resume + ATS Score",
    },
    {
      icon:"💸", clr:"var(--grn)", bg:"var(--grn-l)",
      problem:"You don't know what salary to ask for",
      painSub:"Quoting too low costs you lakhs. Quoting too high loses you the offer.",
      fix:"Live ₹ LPA salary benchmarks by role, city, and company. Walk in prepared.",
      tag:"Salary Intelligence",
    },
    {
      icon:"😰", clr:"var(--amb)", bg:"var(--amb-l)",
      problem:"Blanking out in technical and HR interviews",
      painSub:"You know the answers — but freeze when it matters most.",
      fix:"Vibe AI mock interviews + 5-day structured prep. Real feedback, zero pressure.",
      tag:"AI Interview Coach",
    },
    {
      icon:"🕳️", clr:"#6366f1", bg:"#eef2ff",
      problem:"Applications disappear into a black hole",
      painSub:"Applied to 80 jobs. Heard from 3. No idea what stage anything is in.",
      fix:"Visual pipeline tracker — Applied → Screening → Interview → Offer. Always know your status.",
      tag:"Application Pipeline",
    },
    {
      icon:"📋", clr:"#a855f7", bg:"#fdf4ff",
      problem:"Same resume, 50 companies, zero callbacks",
      painSub:"Generic resumes get ignored. Recruiters can spot a template in seconds.",
      fix:"Paste any JD → AI tailors your resume with the right keywords in 10 seconds.",
      tag:"AI Resume Tailor",
    },
  ]
  return (
    <section id="problems" className="section-pad" style={{ background:"var(--white)", padding:"80px 28px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>

        {/* Header */}
        <div className="sr" style={{ textAlign:"center", marginBottom:52 }}>
          <div className="dot-divider"><span/><span/><span/></div>
          <div className="pill sr d1" style={{ background:"var(--rose-l)", color:"var(--rose)", marginBottom:14 }}>Sound familiar?</div>
          <h2 className="sr d2" style={{ fontSize:"clamp(28px,3.4vw,46px)", fontWeight:900, letterSpacing:"-.03em", color:"var(--ink)", margin:"0 0 14px", lineHeight:1.05 }}>
            Job search is broken.<br /><span className="shimmer">We fix all of it.</span>
          </h2>
          <p className="sr d3" style={{ fontSize:16, color:"var(--ink2)", maxWidth:480, margin:"0 auto", lineHeight:1.7 }}>
            6 real problems every job seeker in India faces — solved in one app.
          </p>
        </div>

        {/* Grid */}
        <div className="problems-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {problems.map((p,i) => (
            <div key={i} className={`card sr d${(i%3)+1}`} style={{ padding:0, overflow:"hidden" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-7px)"; (e.currentTarget as HTMLElement).style.boxShadow="var(--shadow-lg), 0 0 0 1px rgba(79,70,229,0.07)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.boxShadow="" }}>

              {/* Problem band */}
              <div style={{ padding:"22px 22px 18px", background:"var(--cream)", borderBottom:"1px solid var(--border)" }}>
                <div style={{ width:42, height:42, borderRadius:13, background:p.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:14 }}>{p.icon}</div>
                <div style={{ fontSize:15, fontWeight:800, color:"var(--ink)", marginBottom:6, lineHeight:1.3 }}>{p.problem}</div>
                <div style={{ fontSize:12, color:"var(--ink3)", lineHeight:1.6 }}>{p.painSub}</div>
              </div>

              {/* Solution band */}
              <div style={{ padding:"16px 22px 20px", background:"white" }}>
                <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:p.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                    <svg width="9" height="9" fill="none" viewBox="0 0 9 9"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={p.clr} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div style={{ fontSize:13, fontWeight:600, color:"var(--ink2)", lineHeight:1.6 }}>{p.fix}</div>
                </div>
                <div style={{ marginTop:12 }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px", borderRadius:99, background:p.bg, fontSize:10, fontWeight:800, color:p.clr, textTransform:"uppercase", letterSpacing:".05em" }}>
                    {p.tag}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Features ──────────────────────────────────────────────────
function Features() {
  const feats = [
    { icon:"✦", bg:"var(--ind-l)",  ic:"var(--ind)",  title:"AI Resume Tailor",     tag:"Most Used", tagBg:"var(--ind-l)",  tagC:"var(--ind)",  desc:"Paste any JD → instant keyword-matched bullets. ATS score jumps 40+ points. Zero guesswork." },
    { icon:"◎", bg:"var(--rose-l)", ic:"var(--rose)", title:"Smart Job Matching",    desc:"See your fit % before applying. Every job ranked by skills, experience, culture, and salary alignment." },
    { icon:"₹", bg:"var(--grn-l)",  ic:"var(--grn)",  title:"Salary Intelligence",  tag:"Live Data", tagBg:"var(--grn-l)",  tagC:"var(--grn)",  desc:"₹ LPA benchmarks by role, city, company. Know your market rate before any negotiation." },
    { icon:"◈", bg:"var(--amb-l)",  ic:"var(--amb)",  title:"5-Day Interview Prep",  tag:"New",       tagBg:"var(--amb-l)",  tagC:"var(--amb)",  desc:"DSA, system design, HR rounds. Daily subtasks, streak tracking, Vibe AI mock coaching." },
    { icon:"⬡", bg:"#edf2ff",      ic:"#4361ee",     title:"Application Pipeline",  desc:"Visual kanban from Applied → Offer. Know exactly where each application stands in real time." },
    { icon:"◆", bg:"#fdf4ff",      ic:"#a855f7",     title:"Vibe AI Strategist",    desc:"Your AI career coach. Weekly action plans, application feedback, negotiation scripts." },
  ]
  return (
    <section id="features" className="section-pad" style={{ background:"var(--cream)", padding:"80px 28px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="sr" style={{ textAlign:"center", marginBottom:52 }}>
          <div className="dot-divider"><span/><span/><span/></div>
          <div className="pill sr d1" style={{ background:"var(--ind-l)", color:"var(--ind)", marginBottom:14 }}>Features</div>
          <h2 className="sr d2" style={{ fontSize:"clamp(28px,3.4vw,44px)", fontWeight:900, letterSpacing:"-.025em", color:"var(--ink)", margin:"0 0 14px" }}>
            Everything You Need<br /><span className="shimmer">to Get Hired</span>
          </h2>
          <p className="sr d3" style={{ fontSize:16, color:"var(--ink2)", maxWidth:440, margin:"0 auto" }}>One platform for India&apos;s tech job market — from resume to offer letter.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:16 }}>
          {feats.map((f,i) => (
            <div key={i} className={`card grad-border feat-card sr d${(i%3)+1}`} style={{ padding:"32px 32px 42px" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 64px ${f.ic}28, 0 4px 16px ${f.ic}14, var(--shadow-lg)` }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "" }}>
              <div className="feat-icon" style={{ width:54, height:54, borderRadius:16, background:f.bg, color:f.ic, fontSize:24, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, boxShadow:`0 4px 16px ${f.ic}18` }}>{f.icon}</div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <div style={{ fontSize:16, fontWeight:800, color:"var(--ink)" }}>{f.title}</div>
                {f.tag && <div style={{ fontSize:9, fontWeight:900, padding:"3px 9px", borderRadius:99, background:f.tagBg, color:f.tagC, textTransform:"uppercase", letterSpacing:".05em" }}>{f.tag}</div>}
              </div>
              <p style={{ fontSize:13.5, lineHeight:1.72, color:"var(--ink2)", margin:0 }}>{f.desc}</p>
              <div style={{ position:"absolute", bottom:-4, right:6, fontSize:96, fontWeight:900, lineHeight:1, color:"rgba(10,10,20,0.025)", userSelect:"none", pointerEvents:"none" }}>{i+1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ──────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n:1, clr:"var(--ind)", bg:"var(--ind-l)", title:"Build Your Profile", desc:"Upload or build your resume in 5 minutes. Vibe AI scores it and highlights every gap before you apply.", chip:"Takes 5 minutes" },
    { n:2, clr:"var(--vio)", bg:"#f5f3ff",      title:"Discover & Match",   desc:"AI scans thousands of jobs daily and ranks by your fit %. See exactly which skills to highlight.", chip:"Real-time results" },
    { n:3, clr:"var(--grn)", bg:"var(--grn-l)", title:"Prep, Apply & Win",  desc:"5-day interview roadmap + one-tap Smart Apply with a JD-tailored resume. Land the offer.", chip:"Avg. 12 days to offer" },
  ]
  return (
    <section id="how-it-works" className="section-pad" style={{ background:"var(--white)", padding:"80px 28px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="sr" style={{ textAlign:"center", marginBottom:52 }}>
          <div className="dot-divider"><span/><span/><span/></div>
          <div className="pill sr d1" style={{ background:"var(--grn-l)", color:"var(--grn)", marginBottom:14 }}>How It Works</div>
          <h2 className="sr d2" style={{ fontSize:"clamp(28px,3.4vw,44px)", fontWeight:900, letterSpacing:"-.025em", color:"var(--ink)", margin:0 }}>
            Profile to Offer in<br /><span className="shimmer">3 Simple Steps</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {steps.map((s,i) => (
            <div key={i} className={`card sr d${i+1}`} style={{ padding:"32px 28px" }}>
              <div style={{ position:"relative", width:58, height:58, borderRadius:18, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
                <span style={{ fontSize:26, fontWeight:900, color:s.clr }}>{s.n}</span>
                {/* Orbit dot */}
                <div style={{ position:"absolute", inset:0 }}>
                  <div style={{ position:"absolute", top:"50%", left:"50%", width:8, height:8, borderRadius:"50%", background:s.clr, opacity:.4, transform:"translate(-50%,-50%)", animation:`orbit ${3+i}s linear infinite` }} />
                </div>
              </div>
              <h3 style={{ fontSize:20, fontWeight:800, color:"var(--ink)", margin:"0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize:14, lineHeight:1.68, color:"var(--ink2)", margin:"0 0 18px" }}>{s.desc}</p>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:99, background:s.bg, fontSize:11, fontWeight:800, color:s.clr }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:s.clr }} />{s.chip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ──────────────────────────────────────────────
function Testimonials() {
  const cards = [
    { quote:"Resume tailor got me 3 interview calls in one week. ATS went 61%→94% overnight. Salary intel helped me lock ₹44 LPA at Zepto.", name:"Rahul M.", role:"SDE II @ Zepto", initials:"RM", clr:"var(--vio)", bg:"#f5f3ff" },
    { quote:"5-day prep streak + Vibe AI mock interviews changed how I prepared completely. Cracked Flipkart system design on first attempt. Life-changing.", name:"Priya S.", role:"PM @ Flipkart", initials:"PS", clr:"var(--amb)", bg:"var(--amb-l)", featured:true },
    { quote:"Saw 94% match on Swiggy, knew exactly what to highlight. Offer in 12 days. VibeonJob ran my whole job search for me. 100% worth it.", name:"Arjun K.", role:"Backend @ Swiggy", initials:"AK", clr:"var(--grn)", bg:"var(--grn-l)" },
  ]
  return (
    <section className="section-pad" style={{ background:"var(--cream)", padding:"80px 28px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="sr" style={{ textAlign:"center", marginBottom:52 }}>
          <div className="dot-divider"><span/><span/><span/></div>
          <div className="pill sr d1" style={{ background:"var(--amb-l)", color:"var(--amb)", marginBottom:14 }}>Success Stories</div>
          <h2 className="sr d2" style={{ fontSize:"clamp(28px,3.4vw,44px)", fontWeight:900, letterSpacing:"-.025em", color:"var(--ink)", margin:0 }}>
            Hired at <span className="shimmer">Top Indian Companies</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16, alignItems:"center" }}>
          {cards.map((t,i) => (
            <div key={i} className={`sr d${i+1}${t.featured ? " testimonial-feat" : ""}`} style={{
              borderRadius:24, padding:"28px 26px", display:"flex", flexDirection:"column", gap:16,
              background: t.featured ? "linear-gradient(145deg,#4f46e5,#6d28d9)" : "white",
              border: t.featured ? "none" : "1.5px solid var(--border)",
              boxShadow: t.featured ? "0 32px 80px rgba(79,70,229,0.28), 0 8px 24px rgba(79,70,229,0.14)" : "var(--shadow-sm)",
              transform: t.featured ? "scale(1.04)" : "scale(1)",
              position:"relative",
              transition:"transform .28s var(--spring), box-shadow .28s ease",
            }}
              onMouseEnter={e => { if (!t.featured) (e.currentTarget as HTMLElement).style.transform="translateY(-7px)"; }}
              onMouseLeave={e => { if (!t.featured) (e.currentTarget as HTMLElement).style.transform=t.featured?"scale(1.04)":"scale(1)"; }}>
              {t.featured && <div style={{ position:"absolute", top:16, right:16, padding:"3px 10px", borderRadius:99, background:"rgba(255,255,255,0.18)", fontSize:9, fontWeight:900, color:"white", textTransform:"uppercase", letterSpacing:".07em" }}>⭐ Featured</div>}
              {/* Decorative quote mark */}
              <div style={{ position:"absolute", top:18, left:22, fontSize:72, lineHeight:1, color:t.featured?"rgba(255,255,255,0.1)":"rgba(79,70,229,0.09)", fontFamily:"Georgia,serif", fontWeight:900, pointerEvents:"none", userSelect:"none" }}>&ldquo;</div>
              <div style={{ display:"flex", gap:3 }}>
                {[...Array(5)].map((_,j) => <svg key={j} width="13" height="13" viewBox="0 0 14 14"><path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill={t.featured?"rgba(255,255,255,0.9)":"#fbbf24"}/></svg>)}
              </div>
              <p style={{ fontSize:14, lineHeight:1.75, color:t.featured?"rgba(255,255,255,0.85)":"var(--ink2)", flex:1, margin:0 }}>{t.quote}</p>
              <div style={{ display:"flex", alignItems:"center", gap:12, paddingTop:16, borderTop:t.featured?"1px solid rgba(255,255,255,0.15)":"1px solid var(--border)" }}>
                <div style={{ width:38, height:38, borderRadius:"50%", background:t.featured?"rgba(255,255,255,0.2)":t.bg, color:t.featured?"white":t.clr, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, flexShrink:0, border:t.featured?"1px solid rgba(255,255,255,0.2)":"1px solid rgba(0,0,0,0.07)" }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:800, color:t.featured?"white":"var(--ink)" }}>{t.name}</div>
                  <div style={{ fontSize:11, color:t.featured?"rgba(255,255,255,0.55)":"var(--ink3)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Bootcamp ──────────────────────────────────────────────────
function Bootcamp() {
  const day1 = [
    { time:"8:30 AM",  item:"AI/ML/DL Technical Deep Dive" },
    { time:"11:00 AM", item:"RAG Architecture + Implementation" },
    { time:"2:00 PM",  item:"Live RAG Project Build (hands-on)" },
    { time:"6–7 PM",   item:"Hackathon problem via Google Form" },
  ]
  return (
    <section id="bootcamp" style={{ background:"var(--cream)", padding:"36px 28px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="sr card" style={{ overflow:"hidden", padding:0, borderRadius:24 }}>

          {/* ── Header band ── */}
          <div className="bootcamp-head" style={{ background:"linear-gradient(135deg,#4f46e5 0%,#6d28d9 100%)", padding:"18px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
            <div className="bootcamp-left-group" style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, padding:"4px 12px", borderRadius:99, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", fontSize:10, fontWeight:900, color:"white", textTransform:"uppercase", letterSpacing:".07em", whiteSpace:"nowrap" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#f87171", animation:"pulse-s 1.5s ease-in-out infinite", flexShrink:0 }} />
                Live · 14–15 March 2026
              </div>
              <div className="bootcamp-title" style={{ fontSize:20, fontWeight:900, color:"white", letterSpacing:"-.025em", lineHeight:1.2 }}>
                2-Day AI Bootcamp <span style={{ opacity:.7 }}>+</span> Hackathon
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:16, flexShrink:0 }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:30, fontWeight:900, color:"white", lineHeight:1 }}>₹29</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.55)", marginTop:1 }}>Online · Limited seats</div>
              </div>
              <a href="/register" className="btn" style={{ fontSize:13, fontWeight:900, padding:"11px 24px", borderRadius:14, color:"#4f46e5", background:"white", boxShadow:"0 4px 20px rgba(0,0,0,0.18)", display:"inline-flex", alignItems:"center", gap:8, whiteSpace:"nowrap" }}>
                Register Now
                <svg width="13" height="13" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="bootcamp-body" style={{ padding:"22px 28px", display:"grid", gridTemplateColumns:"220px 1fr", gap:24, background:"white" }}>

            {/* Left: meta + speakers */}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {/* Dates */}
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { emoji:"📅", day:"Saturday, 14 March", time:"8:30 AM – 6 PM · 4 sessions" },
                  { emoji:"⚡", day:"Sunday, 15 March",   time:"9 AM – 9 PM · Hackathon" },
                ].map((d,i) => (
                  <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                    <span style={{ fontSize:16, lineHeight:1, marginTop:1 }}>{d.emoji}</span>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:"var(--ink)" }}>{d.day}</div>
                      <div style={{ fontSize:11, color:"var(--ink3)" }}>{d.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ height:1, background:"var(--border)" }} />

              {/* Speakers */}
              <div>
                <div style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:".08em", color:"var(--ink3)", marginBottom:10 }}>Your Mentors</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {[
                    { name:"Aditya Dubey",    role:"Sr. AI Engineer",          initials:"AD", clr:"var(--ind)", bg:"var(--ind-l)" },
                    { name:"Shubham Kaushik", role:"Gen AI Consultant · KPMG", initials:"SK", clr:"var(--vio)", bg:"#f5f3ff"      },
                  ].map((s,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:11, background:s.bg, color:s.clr, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, flexShrink:0 }}>{s.initials}</div>
                      <div>
                        <div style={{ fontSize:12, fontWeight:800, color:"var(--ink)" }}>{s.name}</div>
                        <div style={{ fontSize:10, color:"var(--ink3)", lineHeight:1.4 }}>{s.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding:"10px 12px", borderRadius:12, background:"var(--grn-l)", border:"1px solid rgba(16,185,129,0.2)", marginTop:"auto" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"var(--grn)", marginBottom:2 }}>🎯 Fully Interactive</div>
                <div style={{ fontSize:10, color:"var(--ink3)", lineHeight:1.55 }}>You build throughout. No passive watching — mentors resolve blockers live.</div>
              </div>
            </div>

            {/* Right: 3 info columns */}
            <div className="bootcamp-cols" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>

              {/* Day 1 */}
              <div style={{ padding:"16px 16px", borderRadius:16, background:"var(--cream)", border:"1px solid var(--border)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                  <div style={{ padding:"2px 9px", borderRadius:99, background:"var(--ind-l)", fontSize:9, fontWeight:900, color:"var(--ind)", textTransform:"uppercase", letterSpacing:".06em" }}>Day 1</div>
                  <div style={{ fontSize:9, color:"var(--ink3)", fontWeight:600 }}>Sat</div>
                </div>
                <div style={{ fontSize:12, fontWeight:800, color:"var(--ink)", marginBottom:12, lineHeight:1.3 }}>AI/ML/DL + RAG Masterclass</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {day1.map((d,i) => (
                    <div key={i} style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                      <div style={{ width:5, height:5, borderRadius:"50%", background:"var(--ind)", flexShrink:0, marginTop:4 }} />
                      <div>
                        <div style={{ fontSize:9, fontWeight:800, color:"var(--ind)", textTransform:"uppercase", letterSpacing:".04em" }}>{d.time}</div>
                        <div style={{ fontSize:11, color:"var(--ink2)", lineHeight:1.4 }}>{d.item}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day 2 — Hackathon */}
              <div style={{ padding:"16px 16px", borderRadius:16, background:"linear-gradient(145deg,#4f46e5,#6d28d9)", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-16, right:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
                <div style={{ position:"relative" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                    <div style={{ padding:"2px 9px", borderRadius:99, background:"rgba(255,255,255,0.18)", fontSize:9, fontWeight:900, color:"white", textTransform:"uppercase", letterSpacing:".06em" }}>Day 2</div>
                    <div style={{ fontSize:9, color:"rgba(255,255,255,0.55)", fontWeight:600 }}>Sun · Hackathon</div>
                  </div>
                  <div style={{ fontSize:12, fontWeight:800, color:"white", marginBottom:12, lineHeight:1.3 }}>Build Real AI in 1 Day</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {[
                      "9 AM – 9 PM full-day build",
                      "1 major AI project, end-to-end",
                      "Full mentor support all day",
                      "Winners: paid internships 🏆",
                    ].map((item,i) => (
                      <div key={i} style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background:"rgba(255,255,255,0.55)", flexShrink:0, marginTop:4 }} />
                        <div style={{ fontSize:11, color:"rgba(255,255,255,0.85)", lineHeight:1.4 }}>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What You Get */}
              <div style={{ padding:"16px 16px", borderRadius:16, background:"var(--cream)", border:"1px solid var(--border)" }}>
                <div style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:".07em", color:"var(--ink3)", marginBottom:12 }}>What You Take Home</div>
                <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                  {[
                    { icon:"📄", text:"ATS-proof resume" },
                    { icon:"📚", text:"Full lecture notes" },
                    { icon:"🗺️", text:"3-month AI roadmap" },
                    { icon:"💼", text:"Paid internship (winners)" },
                    { icon:"🤝", text:"Community peer network" },
                  ].map((p,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:13, flexShrink:0 }}>{p.icon}</span>
                      <span style={{ fontSize:11, color:"var(--ink2)", fontWeight:600 }}>{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── CTA ───────────────────────────────────────────────────────
function CTA() {
  const avatars = ["#818cf8","#34d399","#fb7185","#fbbf24","#60a5fa"]
  return (
    <section className="sr section-pad" style={{ background:"var(--cream)", padding:"80px 28px" }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }}>
        <div className="cta-inner" style={{
          borderRadius:32, padding:"72px 48px", textAlign:"center", position:"relative", overflow:"hidden",
          background:"linear-gradient(145deg,#4f46e5 0%,#6d28d9 100%)",
          boxShadow:"0 32px 100px rgba(79,70,229,0.28), 0 8px 32px rgba(79,70,229,0.14)",
        }}>
          {/* Decorative orbs — same pattern as Pricing Pro card */}
          <div style={{ position:"absolute", top:-60, right:-60, width:260, height:260, borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-44, left:-44, width:190, height:190, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"30%", left:"50%", width:440, height:220, borderRadius:"50%", background:"rgba(255,255,255,0.04)", filter:"blur(40px)", translate:"-50% -50%", pointerEvents:"none" }} />
          {/* Dot grid overlay */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.07) 1px,transparent 1px)", backgroundSize:"22px 22px", pointerEvents:"none" }} />

          <div style={{ position:"relative" }}>
            {/* Badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:99, background:"rgba(255,255,255,0.14)", border:"1px solid rgba(255,255,255,0.22)", fontSize:12, fontWeight:700, color:"white", marginBottom:28 }}>
              ✦ Free to get started · No card required
            </div>

            {/* Headline */}
            <h2 className="cta-h2" style={{ fontSize:"clamp(32px,4.2vw,54px)", fontWeight:900, letterSpacing:"-.035em", color:"white", margin:"0 0 18px", lineHeight:1.05 }}>
              Your next offer is<br />closer than you think.
            </h2>

            {/* Subtext */}
            <p className="cta-sub" style={{ fontSize:17, color:"rgba(255,255,255,0.72)", margin:"0 auto 40px", maxWidth:500, lineHeight:1.7 }}>
              AI resume tailor, salary intel, 5-day prep, and Vibe AI coaching — everything built for India&apos;s tech market.
            </p>

            {/* CTAs */}
            <div style={{ display:"flex", justifyContent:"center", gap:12, flexWrap:"wrap", marginBottom:48 }}>
              <a href="/register" className="btn" style={{ fontSize:15, fontWeight:900, padding:"15px 32px", borderRadius:16, color:"#4f46e5", background:"white", boxShadow:"0 8px 32px rgba(0,0,0,0.18)", gap:8, display:"inline-flex", alignItems:"center" }}>
                Start Free Today
                <svg width="16" height="16" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/" className="btn" style={{ fontSize:14, fontWeight:700, padding:"15px 24px", borderRadius:16, color:"rgba(255,255,255,0.88)", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.22)", gap:8, display:"inline-flex", alignItems:"center" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><polygon points="6.5,5 11.5,8 6.5,11" fill="currentColor"/></svg>
                Watch Demo
              </a>
            </div>

            {/* Social proof */}
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:16, marginBottom:24 }}>
              <div style={{ display:"flex" }}>
                {avatars.map((c,i) => (
                  <div key={i} style={{ width:30, height:30, borderRadius:"50%", background:c, border:"2px solid rgba(255,255,255,0.3)", marginLeft:i===0?0:-9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:"white" }}>
                    {["A","R","P","S","M"][i]}
                  </div>
                ))}
              </div>
              <div style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.85)" }}>
                50,000+ users &nbsp;·&nbsp; ★ 4.9 rating
              </div>
            </div>

            {/* Micro-stat pills */}
            <div className="cta-pills" style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
              {["⚡ 12 days avg. to offer","📄 3× more interview calls","🎯 93% success with Vibe AI"].map((s,i) => (
                <div key={i} style={{ padding:"5px 14px", borderRadius:99, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.18)", fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.75)" }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────
function Footer() {
  const cols: Record<string,string[]> = {
    Product:["Features","How It Works","Pricing","Changelog"],
    Company:["About","Blog","Careers","Press"],
    Legal:  ["Privacy Policy","Terms","Cookies"],
  }
  return (
    <footer style={{ background:"white", borderTop:"1px solid var(--border)" }}>
      <div style={{ maxWidth:1120, margin:"0 auto", padding:"56px 28px 32px" }}>
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:32, marginBottom:48 }}>
          <div className="footer-brand">
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#4f46e5,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:900, color:"white", boxShadow:"0 4px 14px rgba(79,70,229,0.28)" }}>V</div>
              <span style={{ fontSize:18, fontWeight:900, color:"var(--ink)", letterSpacing:"-.025em" }}>VibeonJob</span>
            </div>
            <p style={{ fontSize:13, color:"var(--ink3)", lineHeight:1.72, maxWidth:200, margin:"0 0 20px" }}>AI-powered job search for India&apos;s tech job market.</p>
            <div style={{ display:"flex", gap:8 }}>
              {["in","𝕏"].map((s,i) => (
                <a key={i} href="/" style={{ width:32, height:32, borderRadius:10, background:"var(--cream)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:"var(--ink2)", textDecoration:"none", transition:"all .2s var(--spring)" }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background="var(--ind-l)"; el.style.color="var(--ind)"; el.style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="var(--cream)"; el.style.color="var(--ink2)"; el.style.transform="none"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(cols).map(([sec,items]) => (
            <div key={sec}>
              <div style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:".08em", color:"var(--ink3)", marginBottom:16 }}>{sec}</div>
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:10 }}>
                {items.map(item => (
                  <li key={item}><a href="/" style={{ fontSize:13, fontWeight:500, color:"var(--ink2)", textDecoration:"none", transition:"color .15s" }}
                    onMouseEnter={e=>(e.currentTarget.style.color="var(--ind)")}
                    onMouseLeave={e=>(e.currentTarget.style.color="var(--ink2)")}>{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, paddingTop:24, borderTop:"1px solid var(--border)", flexWrap:"wrap" }}>
          <span style={{ fontSize:12, color:"var(--ink3)" }}>© 2026 VibeonJob. Built with ❤️ for India&apos;s job seekers.</span>
          <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:99, background:"var(--grn-l)", border:"1px solid rgba(16,185,129,0.15)" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--grn)", animation:"pulse-s 2s ease-in-out infinite" }} />
            <span style={{ fontSize:11, fontWeight:700, color:"var(--grn)" }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ──────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff"
    return () => { document.body.style.backgroundColor = "" }
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive:true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in") }),
      { threshold:.08, rootMargin:"0px 0px -40px 0px" }
    )
    document.querySelectorAll(".sr").forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="top-bar" />
      <div style={{ fontFamily:"var(--font-inter,-apple-system,system-ui,sans-serif)", background:"white" }}>
        <Navbar scrolled={scrolled} />
        <Hero />
        <Bootcamp />
        <Ticker />
        <Logos />
        <Problems />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </>
  )
}
