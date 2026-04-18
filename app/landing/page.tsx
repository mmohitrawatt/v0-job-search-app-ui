"use client"

import { useEffect, useState } from "react"
import { JobingenLogo } from "@/components/jobingen-logo"

// ─── CSS ────────────────────────────────────────────────────────
const CSS = `
  :root {
    --ink:    #0a0a0f;
    --ink2:   #3c3c50;
    --ink3:   #8b8ba0;
    --white:  #ffffff;
    --bg:     #fafafa;
    --bg2:    #f5f5f7;
    --border: rgba(0,0,0,.06);
    --border2:rgba(0,0,0,.1);
    --accent: #1d3a8f;
    --accent2:#3b52f0;
    --grn:    #10b981;
    --grn-l:  #ecfdf5;
    --amb:    #f59e0b;
    --rose:   #f43f5e;
    --vio:    #7c3aed;
    --vio-l:  #f5f3ff;
    --ease:   cubic-bezier(.16,1,.3,1);
    --spring: cubic-bezier(.34,1.56,.64,1);
  }

  *, *::before, *::after { box-sizing: border-box; }

  /* ── Keyframes ─────────────────────────── */
  @keyframes reveal {
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes float-y {
    0%,100% { transform:translateY(0) }
    50%     { transform:translateY(-14px) }
  }
  @keyframes float-r {
    0%,100% { transform:translateY(0) rotate(-3deg) }
    50%     { transform:translateY(-10px) rotate(2deg) }
  }
  @keyframes ping { 75%,100% { transform:scale(2.2); opacity:0; } }
  @keyframes shimmer {
    0%   { background-position:-300% center }
    100% { background-position:300% center }
  }
  @keyframes pulse-s { 0%,100%{opacity:.8;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
  @keyframes bar-fill { from { width:0 } }
  @keyframes activity-in { from { opacity:0; transform:translateX(-10px) } to { opacity:1; transform:translateX(0) } }

  /* ── Scroll reveal ─────────────────────── */
  .sr { opacity:0; transform:translateY(28px); transition: opacity .7s var(--ease), transform .7s var(--ease); }
  .sr.in { opacity:1; transform:translateY(0); }
  .d1{transition-delay:.06s} .d2{transition-delay:.12s} .d3{transition-delay:.18s}
  .d4{transition-delay:.24s} .d5{transition-delay:.3s}  .d6{transition-delay:.36s}

  /* ── Shimmer text ──────────────────────── */
  .shimmer {
    background: linear-gradient(90deg, #1d3a8f 0%, #3b52f0 30%, #6366f1 50%, #3b52f0 70%, #1d3a8f 100%);
    background-size: 250% auto;
    -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
    animation: shimmer 4.5s linear infinite;
  }

  /* ── Ticker ────────────────────────────── */
  .ticker-track { display:flex; width:max-content; animation:marquee 35s linear infinite; }
  .ticker-track:hover { animation-play-state:paused; }

  /* ── Responsive ────────────────────────── */
  @media(max-width:768px) {
    .hero-grid { grid-template-columns:1fr !important; text-align:center !important; }
    .hero-left { align-items:center !important; }
    .hero-right { display:none !important; }
    .hero-ctas { justify-content:center !important; }
    .hero-proof { justify-content:center !important; }
    .hero-stats { justify-content:center !important; border-left:none !important; padding-left:0 !important; border-top:1px solid var(--border); padding-top:12px !important; }
    .hero-live { justify-content:center !important; }

    .stats-row { grid-template-columns:repeat(2,1fr) !important; }

    .boot-head { flex-direction:column !important; align-items:stretch !important; }
    .boot-price-group { flex-direction:column !important; align-items:flex-start !important; width:100% !important; }
    .boot-reg-btn { width:100% !important; justify-content:center !important; }
    .boot-body { grid-template-columns:1fr !important; }
    .boot-cols { grid-template-columns:1fr !important; }

    .mentors-row { grid-template-columns:1fr !important; }
    .pain-grid  { grid-template-columns:1fr !important; }
    .feat-grid  { grid-template-columns:1fr !important; }
    .journey-line::before { left:19px !important; }
    .j-dot { width:40px !important; min-width:40px !important; height:40px !important; font-size:15px !important; }

    .cta-inner { padding:48px 20px !important; border-radius:22px !important; }
    .cta-h2 { font-size:clamp(28px,7.5vw,40px) !important; }
    .cta-pills { flex-direction:column !important; align-items:center !important; }

    .footer-grid { grid-template-columns:1fr 1fr !important; }
    .footer-brand { grid-column:1/-1 !important; }
    .footer-bottom { flex-direction:column !important; align-items:center !important; text-align:center !important; }
  }
  @media(max-width:480px) {
    .hero-grid { padding:60px 16px 32px !important; }
    .hero-ctas a { width:100% !important; justify-content:center !important; }
    .footer-grid { grid-template-columns:1fr !important; }
    .feat-grid { grid-template-columns:1fr !important; }
    .boot-cols { grid-template-columns:1fr !important; }
  }
`

// ─── Section wrapper ──────────────────────────────────────────
function Section({ id, bg = "white", children, className = "", style = {} }: { id?: string; bg?: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <section id={id} className={className} style={{ background: bg, padding: "96px 28px", position: "relative", ...style }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>{children}</div>
    </section>
  )
}

// ─── Section header ───────────────────────────────────────────
function SectionHeader({ pill, pillColor = "var(--accent)", pillBg = "#eef1fd", title, titleHighlight, sub, align = "center" }: { pill: string; pillColor?: string; pillBg?: string; title: string; titleHighlight?: string; sub: string; align?: "center" | "left" }) {
  return (
    <div className="sr" style={{ textAlign: align, marginBottom: 56 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 99, background: pillBg, color: pillColor, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 18, border: `1px solid ${pillColor}15` }}>
        {pill}
      </div>
      <h2 className="sr d1" style={{ fontSize: "clamp(30px,3.8vw,50px)", fontWeight: 900, letterSpacing: "-.04em", color: "var(--ink)", margin: "0 0 16px", lineHeight: 1.06 }}>
        {title}{titleHighlight && <><br /><span className="shimmer">{titleHighlight}</span></>}
      </h2>
      <p className="sr d2" style={{ fontSize: 17, color: "var(--ink3)", maxWidth: 520, margin: align === "center" ? "0 auto" : undefined, lineHeight: 1.7 }}>
        {sub}
      </p>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)
  const links = [["AI Tools", "/ai-tools"], ["Jobs", "/jobs"], ["Bootcamp", "#bootcamp"], ["Mentors", "/mentors"]]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || open ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.4)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all .3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <JobingenLogo height={100} />
        </a>

        {/* Desktop links */}
        <div className="nav-links-desk" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {links.map(([l, href]) => (
            <a key={l} href={href} style={{ fontSize: 14, fontWeight: 500, color: "var(--ink2)", textDecoration: "none", padding: "8px 16px", borderRadius: 10, transition: "all .15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--bg2)"; e.currentTarget.style.color = "var(--ink)" }}
              onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "var(--ink2)" }}>
              {l}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="nav-ctas-desk" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="/dashboard" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink2)", textDecoration: "none", padding: "8px 16px", borderRadius: 12, border: "1.5px solid var(--border2)", transition: "all .15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--bg2)" }}
            onMouseLeave={e => { e.currentTarget.style.background = "" }}>
            Open App
          </a>
          <a href="/register" style={{ fontSize: 14, fontWeight: 700, color: "white", textDecoration: "none", padding: "9px 22px", borderRadius: 12, background: "var(--ink)", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.15)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "" }}>
            Get Started
          </a>
        </div>

        {/* Mobile */}
        <div className="nav-mob-right" style={{ display: "none", alignItems: "center", gap: 8 }}>
          <a href="/register" style={{ fontSize: 13, fontWeight: 700, color: "white", textDecoration: "none", padding: "8px 18px", borderRadius: 10, background: "var(--ink)" }}>Join</a>
          <button onClick={() => setOpen(o => !o)} aria-label="Menu" style={{ width: 38, height: 38, borderRadius: 10, background: "transparent", border: "1.5px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            {open
              ? <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M2 2l12 12M14 2L2 14" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" /></svg>
              : <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M2 4h12M2 8h10M2 12h12" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" /></svg>
            }
          </button>
        </div>
      </div>

      {open && (
        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--border)", padding: "8px 20px 16px", background: "rgba(255,255,255,.97)" }}>
          {links.map(([l, href]) => (
            <a key={l} href={href} onClick={() => setOpen(false)} style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", textDecoration: "none", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>{l}</a>
          ))}
          <a href="/dashboard" onClick={() => setOpen(false)} style={{ fontSize: 16, fontWeight: 600, color: "var(--ink2)", textDecoration: "none", padding: "14px 0" }}>Open App</a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  const [liveIdx, setLiveIdx] = useState(0)
  const wins = [
    { emoji: "🎉", text: "Rahul M. received ₹44 LPA offer at Zepto" },
    { emoji: "🏆", text: "Priya S. cracked the Flipkart PM interview" },
    { emoji: "🚀", text: "Arjun K. got SDE-2 at Swiggy in 12 days" },
    { emoji: "💰", text: "Sneha K.'s ATS score jumped from 61 to 94" },
  ]
  useEffect(() => {
    const t = setInterval(() => setLiveIdx(i => (i + 1) % wins.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 64, background: "white", position: "relative", overflow: "hidden" }}>
      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)", pointerEvents: "none", opacity: .5 }} />

      <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 28px 56px", width: "100%", display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 80, alignItems: "center" }}>

        {/* Left */}
        <div className="hero-left" style={{ animation: "reveal .8s var(--ease) both", display: "flex", flexDirection: "column" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 8, padding: "5px 16px 5px 6px", borderRadius: 99, background: "var(--bg2)", border: "1px solid var(--border)", marginBottom: 28 }}>
            <span style={{ background: "var(--ink)", borderRadius: 99, padding: "3px 10px", fontSize: 9, fontWeight: 800, color: "white", textTransform: "uppercase", letterSpacing: ".06em" }}>New</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)" }}>Vibe AI mock interviews are live</span>
          </div>

          {/* H1 */}
          <h1 style={{ fontSize: "clamp(46px,5.5vw,72px)", fontWeight: 900, lineHeight: 1.04, letterSpacing: "-.045em", color: "var(--ink)", margin: "0 0 24px" }}>
            Get hired at<br />India&apos;s best<br />
            <span className="shimmer">tech companies.</span>
          </h1>

          {/* Sub */}
          <p style={{ fontSize: "clamp(16px,1.4vw,18px)", lineHeight: 1.7, color: "var(--ink3)", margin: "0 0 36px", maxWidth: 480 }}>
            AI-powered resume tailoring, real salary data in ₹ LPA, smart job matching, and Vibe AI coaching — built for India&apos;s tech market.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
            <a href="/register" style={{ fontSize: 16, fontWeight: 700, padding: "16px 32px", borderRadius: 16, color: "white", background: "var(--ink)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all .2s var(--spring)", boxShadow: "0 4px 20px rgba(0,0,0,.12)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,.18)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.12)" }}>
              Get Started Free
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="/ai-tools" style={{ fontSize: 16, fontWeight: 600, padding: "16px 28px", borderRadius: 16, color: "var(--ink)", background: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, border: "1.5px solid var(--border2)", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--bg2)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "white" }}>
              Explore AI Tools
            </a>
          </div>

          {/* Social proof */}
          <div className="hero-proof" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex" }}>
              {["#1d3a8f", "#10b981", "#f59e0b", "#f43f5e", "#3b52f0"].map((c, i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: c, border: "2.5px solid white", marginLeft: i ? -9 : 0, fontSize: 10, fontWeight: 900, color: "white", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 - i }}>
                  {["A", "P", "R", "S", "M"][i]}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "var(--ink3)" }}>
              <strong style={{ color: "var(--ink)" }}>50,000+</strong> users &middot; <strong style={{ color: "var(--amb)" }}>4.9★</strong>
            </div>
            <div className="hero-stats" style={{ display: "flex", gap: 20, paddingLeft: 16, borderLeft: "1px solid var(--border)" }}>
              {[{ v: "12d", l: "avg. to offer" }, { v: "94%", l: "interview pass" }].map(m => (
                <div key={m.l}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>{m.v}</div>
                  <div style={{ fontSize: 10, color: "var(--ink3)", marginTop: 2 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live ticker */}
          <div className="hero-live" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ position: "relative", width: 7, height: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--grn)" }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--grn)", animation: "ping 1.8s ease-out infinite" }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 800, color: "var(--grn)", textTransform: "uppercase", letterSpacing: ".06em" }}>Live</span>
            </div>
            <div key={liveIdx} style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)", animation: "activity-in .4s var(--ease)" }}>
              {wins[liveIdx].emoji} {wins[liveIdx].text}
            </div>
          </div>
        </div>

        {/* Right — floating card */}
        <div className="hero-right" style={{ position: "relative", height: 540, animation: "reveal .8s var(--ease) .2s both" }}>
          {/* Glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", translate: "-50% -50%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,58,143,.12), transparent 70%)", filter: "blur(48px)", pointerEvents: "none" }} />

          {/* Main card */}
          <div style={{
            position: "absolute", top: "50%", left: "50%", translate: "-50% -50%",
            width: 320, borderRadius: 24, background: "var(--ink)", padding: "24px 22px",
            boxShadow: "0 32px 80px rgba(0,0,0,.2), 0 8px 24px rgba(0,0,0,.1)",
            animation: "float-y 7s ease-in-out infinite", zIndex: 2,
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 16 }}>⚡ Top Match &middot; Today</div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "white" }}>SW</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "white", lineHeight: 1.2 }}>SDE II — AI/ML</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", marginTop: 3 }}>Swiggy &middot; Bengaluru</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 1 }}>₹32–52 LPA</div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "white", lineHeight: 1 }}>94</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)", letterSpacing: ".05em" }}>% MATCH</div>
              </div>
            </div>
            {[{ l: "Skills", p: 95 }, { l: "Experience", p: 88 }, { l: "Culture Fit", p: 91 }].map(b => (
              <div key={b.l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)", width: 64, flexShrink: 0 }}>{b.l}</span>
                <div style={{ flex: 1, height: 4, borderRadius: 99, background: "rgba(255,255,255,.1)" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: "rgba(255,255,255,.8)", width: `${b.p}%` }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,.5)", width: 20, textAlign: "right" }}>{b.p}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
              <div style={{ flex: 1, height: 42, borderRadius: 13, background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "var(--ink)", cursor: "pointer" }}>Smart Apply</div>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 2.5l1.8 4.2 4.5.4-3.3 2.9 1 4.3L8 11.8l-4 2.5 1-4.3-3.3-2.9 4.5-.4z" fill="rgba(255,255,255,.5)" /></svg>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div style={{ position: "absolute", top: 20, right: -10, background: "white", borderRadius: 16, padding: "10px 14px", boxShadow: "0 12px 40px rgba(0,0,0,.08)", animation: "float-r 5s ease-in-out infinite", display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--border)", zIndex: 3 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--grn-l)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>📄</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "var(--ink)" }}>ATS Score <span style={{ color: "var(--grn)" }}>92</span></div>
              <div style={{ fontSize: 10, color: "var(--ink3)" }}>↑ +31 pts this week</div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 50, left: -10, background: "white", borderRadius: 16, padding: "10px 14px", boxShadow: "0 12px 40px rgba(0,0,0,.08)", animation: "float-y 6s ease-in-out 1s infinite", border: "1px solid var(--border)", zIndex: 3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 14 }}>🎉</span>
              <span style={{ fontSize: 15, fontWeight: 900, color: "var(--grn)" }}>₹44 LPA!</span>
            </div>
            <div style={{ fontSize: 10, color: "var(--ink3)" }}>Offer received &middot; Zepto</div>
          </div>

          <div style={{ position: "absolute", top: 140, left: -8, background: "#eef1fd", borderRadius: 14, padding: "9px 13px", boxShadow: "0 8px 28px rgba(29,58,143,.1)", animation: "float-r 5.5s ease-in-out .5s infinite", display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(29,58,143,.12)", zIndex: 3 }}>
            <span style={{ fontSize: 16 }}>📩</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)" }}>Interview Invite!</div>
              <div style={{ fontSize: 9, color: "var(--accent)", opacity: .6 }}>Razorpay &middot; SDE II</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Ticker ───────────────────────────────────────────────────
function Ticker() {
  const items = ["AI Resume Tailoring", "Salary Intelligence", "Smart Job Matching", "Vibe AI Coach", "ATS Optimizer", "Job Alerts", "Application Pipeline", "Mock Interviews"]
  const all = [...items, ...items]
  return (
    <div className="sr" style={{ background: "var(--ink)", padding: "14px 0", overflow: "hidden" }}>
      <div className="ticker-track">
        {all.map((item, i) => (
          <span key={i} style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: ".08em", whiteSpace: "nowrap", marginRight: 48, display: "inline-flex", alignItems: "center", gap: 12 }}>
            {item}
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,.25)", display: "inline-block" }} />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Logos ─────────────────────────────────────────────────────
function Logos() {
  const logos = ["Swiggy", "Flipkart", "CRED", "PhonePe", "Razorpay", "Zepto", "Meesho", "Groww", "Nykaa", "Paytm", "Juspay", "Dunzo"]
  const clrs = ["#ff6b35", "#2874f0", "#00bcd4", "#6739b7", "#02042b", "#3a0ca3", "#f43f5e", "#00c27e", "#fc2779", "#00b9f1", "#2563eb", "#f59e0b"]
  const all = [...logos, ...logos]
  return (
    <section className="sr" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "28px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink3)" }}>Our users got hired at</span>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className="ticker-track" style={{ animationDuration: "40s" }}>
          {all.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 16, padding: "6px 14px", borderRadius: 12, background: "white", border: "1px solid var(--border)", flexShrink: 0 }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: clrs[i % clrs.length] + "18", color: clrs[i % clrs.length], fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>{c[0]}</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", whiteSpace: "nowrap" }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Problems ─────────────────────────────────────────────────
function Problems() {
  const pains = [
    { icon: "🌀", title: "10 portals, zero clarity", desc: "Hours wasted switching between Naukri, LinkedIn, Wellfound. Same listings, different formats." },
    { icon: "🤖", title: "Resume rejected by bots", desc: "ATS filters out 75% of applications. Your generic resume never reaches a human." },
    { icon: "💸", title: "No salary transparency", desc: "Quoting too low costs you lakhs. Too high loses the offer. Real ₹ LPA data doesn't exist." },
    { icon: "😰", title: "Freeze in interviews", desc: "You know the answers but blank under pressure. No structured prep, no real feedback." },
    { icon: "🕳️", title: "Applications vanish", desc: "Applied to 80 jobs. Heard from 3. No visibility into what stage anything is at." },
    { icon: "📋", title: "Same resume, zero calls", desc: "Generic templates get ignored. Recruiters spot copy-paste in seconds and move on." },
  ]
  return (
    <Section bg="var(--ink)" style={{ padding: "96px 28px" }}>
      <div className="sr" style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 99, background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.6)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 18, border: "1px solid rgba(255,255,255,.08)" }}>
          The Real Problem
        </div>
        <h2 className="sr d1" style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 900, letterSpacing: "-.04em", color: "white", margin: "0 0 16px", lineHeight: 1.06 }}>
          Job search in India is<br />completely broken.
        </h2>
        <p className="sr d2" style={{ fontSize: 17, color: "rgba(255,255,255,.45)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          You spend hours every week on the same painful loop. Jobingen fixes every part of it.
        </p>
      </div>
      <div className="pain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {pains.map((p, i) => (
          <div key={i} className={`sr d${(i % 3) + 1}`} style={{ background: "rgba(255,255,255,.04)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 20, padding: "28px 24px", transition: "all .25s var(--ease)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(-4px)" }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.transform = "" }}>
            <div style={{ fontSize: 28, marginBottom: 14 }}>{p.icon}</div>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 8px", letterSpacing: "-.02em" }}>{p.title}</h4>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── Features ─────────────────────────────────────────────────
function Features() {
  const services = [
    { icon: "🔍", color: "var(--accent)", bg: "#eef1fd", title: "Unified Job Feed", tag: "Core", desc: "Every portal in one feed — Naukri, LinkedIn, Indeed, Wellfound — ranked by your AI fit score." },
    { icon: "📄", color: "var(--grn)", bg: "var(--grn-l)", title: "AI Resume Tailor", tag: "Most Used", desc: "Paste any JD → instant keyword-matched resume. ATS score jumps 40+ points. Zero guesswork." },
    { icon: "💰", color: "var(--amb)", bg: "#fffbeb", title: "Salary Intelligence", tag: "Live Data", desc: "Real ₹ LPA benchmarks by role, city, and company. Know your market rate before negotiation." },
    { icon: "🎤", color: "#db2777", bg: "#fdf2f8", title: "Vibe AI Coach", tag: "AI", desc: "Mock interviews with real-time feedback. Structured prep. 93% of users crack their first interview." },
    { icon: "📊", color: "#4361ee", bg: "#edf2ff", title: "Application Pipeline", tag: "Tracker", desc: "Visual kanban from Applied → Offer. Know exactly where each application stands." },
    { icon: "🔔", color: "var(--rose)", bg: "#fff1f2", title: "Smart Job Alerts", tag: "Auto", desc: "Set criteria once. Get notified when matching jobs appear — before they go viral." },
  ]
  return (
    <Section id="features" bg="var(--bg)">
      <SectionHeader pill="Everything You Need" title="Built to get you" titleHighlight="hired faster." sub="One platform. Every tool India's job seekers need — from resume to offer letter." />
      <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {services.map((s, i) => (
          <div key={i} className={`sr d${(i % 3) + 1}`} style={{ background: "white", borderRadius: 20, border: "1px solid var(--border)", padding: "28px 24px", transition: "all .25s var(--ease)", cursor: "default" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,.06)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{s.icon}</div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: s.bg, color: s.color, textTransform: "uppercase", letterSpacing: ".04em" }}>{s.tag}</span>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", margin: "0 0 8px", letterSpacing: "-.02em" }}>{s.title}</h3>
            <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── How It Works ─────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: "1", title: "Build your profile in 5 minutes", desc: "Upload your resume — Vibe AI scores it, finds skill gaps, and suggests fixes.", tags: ["Resume Score", "Gap Analysis"] },
    { n: "2", title: "Discover jobs from every portal", desc: "One search across Naukri, LinkedIn, Indeed, Wellfound — ranked by AI fit percentage.", tags: ["Multi-Portal", "AI Matching"] },
    { n: "3", title: "Apply with a JD-tailored resume", desc: "AI rewrites your resume with matching keywords for each role. ATS score hits 90+.", tags: ["ATS Optimized", "Per-JD Resume"] },
    { n: "4", title: "Prep with Vibe AI mock interviews", desc: "5-day structured roadmap + AI mock coach. Real-time feedback on DSA, design, and HR rounds.", tags: ["Vibe AI Coach", "5-Day Prep"] },
    { n: "5", title: "Negotiate and accept your offer", desc: "Real ₹ LPA data for your role, city, and company. Walk into salary talks fully prepared.", tags: ["Salary Intel", "Offer Letter"] },
  ]
  return (
    <Section id="how-it-works">
      <SectionHeader pill="Your Journey" pillColor="var(--grn)" pillBg="var(--grn-l)" title="From sign-up to" titleHighlight="offer letter." sub="A clear path — no guesswork, no wasted effort, no missed opportunities." />
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="journey-line" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ position: "absolute", top: 24, bottom: 24, left: 23, width: 2, background: "linear-gradient(180deg, var(--accent), rgba(29,58,143,.08))", zIndex: 0 }} />
          {steps.map((s, i) => (
            <div key={i} className={`sr d${(i % 3) + 1}`} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "24px 0", position: "relative", zIndex: 1 }}>
              <div className="j-dot" style={{ width: 48, minWidth: 48, height: 48, borderRadius: "50%", background: "var(--ink)", color: "white", fontSize: 18, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,.12), 0 0 0 4px white" }}>{s.n}</div>
              <div style={{ flex: 1, paddingTop: 4 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-.02em", color: "var(--ink)" }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.6, margin: "0 0 10px" }}>{s.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {s.tags.map(t => <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, background: "#eef1fd", color: "var(--accent)" }}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Bootcamp (Completed) ─────────────────────────────────────
function Bootcamp() {
  return (
    <section id="bootcamp" style={{ background: "var(--bg)", padding: "40px 28px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className="sr" style={{ overflow: "hidden", borderRadius: 24, border: "1px solid var(--border)", background: "white" }}>
          {/* Header — Completed */}
          <div className="boot-head" style={{ background: "var(--ink)", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 99, background: "rgba(16,185,129,.15)", border: "1px solid rgba(16,185,129,.25)", fontSize: 10, fontWeight: 800, color: "#34d399", textTransform: "uppercase", letterSpacing: ".06em", whiteSpace: "nowrap" }}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                Completed &middot; 12 April 2026
              </div>
              <div style={{ fontSize: 19, fontWeight: 800, color: "white", letterSpacing: "-.02em" }}>AI/ML Masterclass + Hackathon</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex" }}>
                  {["#1d3a8f", "#10b981", "#f59e0b", "#f43f5e", "#7c3aed"].map((c, i) => (
                    <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: "2px solid var(--ink)", marginLeft: i ? -7 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 900, color: "white" }}>
                      {["A", "S", "J", "B", "T"][i]}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>300+ students</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="boot-body" style={{ padding: "22px 28px", display: "grid", gridTemplateColumns: "210px 1fr", gap: 24 }}>
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Success stats */}
              <div style={{ padding: "14px 16px", borderRadius: 14, background: "var(--grn-l)", border: "1px solid rgba(16,185,129,.15)" }}>
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--grn)", marginBottom: 10 }}>Event Highlights</div>
                {[
                  { val: "300+", label: "Students attended" },
                  { val: "4.8", label: "Average rating" },
                  { val: "100%", label: "Hands-on projects" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "var(--grn)", lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: "var(--ink3)" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: "var(--border)" }} />

              {/* Mentors */}
              <div>
                <div style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--ink3)", marginBottom: 10 }}>Led By</div>
                {[
                  { name: "Aditya Dubey", role: "AI Engineer &middot; Cograd", initials: "AD", clr: "var(--accent)" },
                  { name: "Sonic Payeng", role: "SWE2 &middot; Dell Technologies", initials: "SP", clr: "var(--grn)" },
                  { name: "Jitesh Vijaykumar", role: "AI Engineer &middot; KPMG", initials: "JV", clr: "var(--vio)" },
                  { name: "Shubham Kaushik", role: "AI Researcher &middot; KPMG", initials: "SK", clr: "#b45309" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--bg2)", color: s.clr, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, flexShrink: 0 }}>{s.initials}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{s.name}</div>
                      <div style={{ fontSize: 10, color: "var(--ink3)" }} dangerouslySetInnerHTML={{ __html: s.role }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — 3 cols */}
            <div className="boot-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {/* What was covered */}
              <div style={{ padding: 16, borderRadius: 16, background: "var(--bg)", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <span style={{ padding: "2px 9px", borderRadius: 99, background: "#eef1fd", fontSize: 9, fontWeight: 800, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".05em" }}>Covered</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)", marginBottom: 12 }}>AI/ML + RAG Masterclass</div>
                {[
                  { time: "Session 1", item: "AI/ML/DL Technical Deep Dive" },
                  { time: "Session 2", item: "RAG Architecture + Implementation" },
                  { time: "Session 3", item: "Live RAG Project Build" },
                  { time: "Session 4", item: "Hackathon + Live Mentoring" },
                ].map((d, i) => (
                  <div key={i} style={{ display: "flex", gap: 7, marginBottom: 8 }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="var(--grn)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M20 6L9 17l-5-5" /></svg>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 800, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".04em" }}>{d.time}</div>
                      <div style={{ fontSize: 11, color: "var(--ink2)", lineHeight: 1.4 }}>{d.item}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hackathon results */}
              <div style={{ padding: 16, borderRadius: 16, background: "var(--ink)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -16, right: -16, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                    <span style={{ padding: "2px 9px", borderRadius: 99, background: "rgba(16,185,129,.18)", fontSize: 9, fontWeight: 800, color: "#34d399", textTransform: "uppercase", letterSpacing: ".05em" }}>Hackathon</span>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,.4)", fontWeight: 600 }}>Completed</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "white", marginBottom: 12 }}>Results &amp; Outcomes</div>
                  {["300+ students participated live", "Real AI projects built end-to-end", "Top performers got paid internships", "Full mentor support throughout", "Community network formed"].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 7, marginBottom: 8 }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M20 6L9 17l-5-5" /></svg>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)", lineHeight: 1.4 }}>{item}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What students got */}
              <div style={{ padding: 16, borderRadius: 16, background: "var(--bg)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--ink3)", marginBottom: 14 }}>What Students Got</div>
                {[
                  { icon: "📄", text: "ATS-proof resume" },
                  { icon: "📚", text: "Full lecture recordings" },
                  { icon: "🗺️", text: "3-month AI roadmap" },
                  { icon: "💼", text: "Paid internship (winners)" },
                  { icon: "🤝", text: "Community peer network" },
                  { icon: "🏆", text: "Certificates of completion" },
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 13 }}>{p.icon}</span>
                    <span style={{ fontSize: 12, color: "var(--ink2)", fontWeight: 600 }}>{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next batch teaser */}
          <div style={{ padding: "14px 28px", borderTop: "1px solid var(--border)", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 14 }}>🚀</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Next batch coming soon</span>
              <span style={{ fontSize: 12, color: "var(--ink3)" }}>&mdash; join the waitlist to get early access</span>
            </div>
            <a href="/register" style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              Join Waitlist
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Mentors ──────────────────────────────────────────────────
function MentorsSection() {
  const mentors = [
    { name: "Shubham Kaushik", role: "AI Researcher", company: "KPMG", initials: "SK", color: "#b45309", desc: "5+ years in AI/ML & full-stack. Research on LLMs & financial AI." },
    { name: "Jitesh Vijaykumar", role: "AI Engineer", company: "KPMG", initials: "JV", color: "var(--vio)", desc: "5+ years building scalable AI solutions for enterprise systems." },
    { name: "Sonic Payeng", role: "SWE2", company: "Dell Technologies", initials: "SP", color: "var(--grn)", desc: "AI engineer building automation on Dell Platform. M.Tech from MNNIT." },
    { name: "Aditya Dubey", role: "AI Engineer", company: "Cograd", initials: "AD", color: "var(--accent)", desc: "Mentored 12,000+ professionals in AI. M.Tech from NIT Allahabad." },
  ]
  return (
    <Section bg="var(--bg)">
      <SectionHeader pill="Meet Our Mentors" pillColor="var(--vio)" pillBg="var(--vio-l)" title="Learn from industry leaders" sub="Working professionals from top companies, passionate about guiding the next generation." />
      <div className="mentors-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {mentors.map((m, i) => (
          <div key={i} className={`sr d${i + 1}`} style={{ background: "white", borderRadius: 20, border: "1px solid var(--border)", padding: "28px 22px", transition: "all .25s var(--ease)", cursor: "default" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,.06)" }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--bg2)", color: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, flexShrink: 0 }}>{m.initials}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", lineHeight: 1.2 }}>{m.name}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: m.color, marginTop: 2 }}>{m.role}</div>
              </div>
            </div>
            <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: "var(--bg2)", color: "var(--ink2)", marginBottom: 12, letterSpacing: ".02em" }}>{m.company}</span>
            <p style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 36 }}>
        <a href="/mentors" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 14, background: "var(--ink)", color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none", transition: "all .2s var(--spring)", boxShadow: "0 4px 16px rgba(0,0,0,.1)" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,.15)" }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.1)" }}>
          View All 20+ Mentors
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
      </div>
    </Section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────
type FeedbackItem = { name: string; rating: number; quote: string; recommend: string }

function FeedbackCard({ f, idx }: { f: FeedbackItem; idx: number }) {
  const colors = ["#1d3a8f", "#10b981", "#f59e0b", "#f43f5e", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"]
  const initials = f.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
  return (
    <div style={{ width: 300, flexShrink: 0, borderRadius: 20, padding: "22px 20px", background: "white", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 2 }}>
        {[1, 2, 3, 4, 5].map(s => (
          <svg key={s} width="14" height="14" viewBox="0 0 14 14"><path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill={s <= f.rating ? "#fbbf24" : "#e5e7eb"} /></svg>
        ))}
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink2)", margin: 0, flex: 1, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{f.quote}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: colors[idx % colors.length], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: "white" }}>{initials}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{f.name}</div>
          <div style={{ fontSize: 10, color: "var(--ink3)" }}>Bootcamp Attendee</div>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([])
  const [avgRating, setAvgRating] = useState(0)
  const [recommendPct, setRecommendPct] = useState(0)

  useEffect(() => {
    fetch("/api/public-feedback").then(r => r.json()).then(d => {
      const list: FeedbackItem[] = d.feedback || []
      setFeedback(list)
      if (list.length) {
        setAvgRating(Math.round((list.reduce((s, r) => s + r.rating, 0) / list.length) * 10) / 10)
        setRecommendPct(Math.round((list.filter(r => r.recommend?.toLowerCase().includes("yes")).length / list.length) * 100))
      }
    }).catch(() => { })
  }, [])

  const track = feedback.length ? [...feedback, ...feedback] : []
  const fallback: FeedbackItem[] = [
    { quote: "The RAG session was incredibly hands-on. Built my first AI app on Day 1. Mentors were super accessible.", name: "Rahul M.", rating: 5, recommend: "Yes" },
    { quote: "Best investment. ML to RAG to hackathon in 2 days. Content quality was top-notch.", name: "Priya S.", rating: 5, recommend: "Yes" },
    { quote: "Practical, structured, and mentors helped debug live. Completely worth ₹29.", name: "Arjun K.", rating: 5, recommend: "Yes" },
  ]

  return (
    <Section bg="var(--bg)" style={{ overflow: "hidden" }}>
      <div className="sr" style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--grn-l)", border: "1px solid rgba(16,185,129,.2)", color: "var(--grn)", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 99, marginBottom: 18, textTransform: "uppercase", letterSpacing: ".06em" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--grn)" }} />
          Live from Bootcamp
        </div>
        <h2 className="sr d1" style={{ fontSize: "clamp(30px,3.8vw,46px)", fontWeight: 900, letterSpacing: "-.035em", color: "var(--ink)", margin: "0 0 14px" }}>
          What our <span className="shimmer">alumni say</span>
        </h2>
        {feedback.length > 0 && (
          <div className="sr d2" style={{ display: "inline-flex", gap: 0, background: "white", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", marginTop: 20 }}>
            {[
              { label: "Avg Rating", value: `${avgRating}/5`, color: "#fbbf24" },
              { label: "Responses", value: `${feedback.length}+`, color: "var(--accent)" },
              { label: "Would Recommend", value: `${recommendPct}%`, color: "var(--grn)" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "14px 24px", textAlign: "center", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ink3)", marginTop: 4, textTransform: "uppercase", letterSpacing: ".06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {track.length > 0 ? (
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ display: "flex", gap: 16, animation: `marquee ${track.length * 4}s linear infinite`, width: "max-content" }}>
            {track.map((f, i) => <FeedbackCard key={i} f={f} idx={i} />)}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          {fallback.map((f, i) => <FeedbackCard key={i} f={f} idx={i} />)}
        </div>
      )}
    </Section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────
function CTA() {
  return (
    <Section bg="white">
      <div className="cta-inner sr" style={{
        borderRadius: 32, padding: "80px 48px", textAlign: "center", position: "relative", overflow: "hidden",
        background: "var(--ink)", boxShadow: "0 32px 80px rgba(0,0,0,.15)",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,.03)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 99, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.7)", marginBottom: 28 }}>
            Join 1,200+ job seekers
          </div>

          <h2 className="cta-h2" style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 900, letterSpacing: "-.04em", color: "white", margin: "0 0 18px", lineHeight: 1.06 }}>
            Your next offer is<br />closer than you think.
          </h2>
          <p className="cta-sub" style={{ fontSize: 17, color: "rgba(255,255,255,.5)", margin: "0 auto 40px", maxWidth: 500, lineHeight: 1.7 }}>
            AI resume tailor, salary intel, 5-day prep, and Vibe AI coaching — built for India&apos;s tech market.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="/register" style={{ fontSize: 16, fontWeight: 800, padding: "16px 36px", borderRadius: 16, color: "var(--ink)", background: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all .2s var(--spring)", boxShadow: "0 4px 20px rgba(0,0,0,.15)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "" }}>
              Get Started Free
              <svg width="16" height="16" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          <div className="cta-pills" style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {["⚡ 12 days avg. to offer", "📄 3× more interview calls", "🎯 93% success with Vibe AI"].map((s, i) => (
              <div key={i} style={{ padding: "6px 16px", borderRadius: 99, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.55)" }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Footer ───────────────────────────────────────────────────
function Footer() {
  const cols: Record<string, [string, string][]> = {
    Product: [["Jobs", "/jobs"], ["AI Tools", "/ai-tools"], ["Bootcamp", "/#bootcamp"], ["Mentors", "/mentors"]],
    Company: [["About", "/"], ["Blog", "/"], ["Careers", "/"], ["Press", "/"]],
    Legal: [["Privacy Policy", "/"], ["Terms", "/"], ["Cookies", "/"]],
  }
  return (
    <footer style={{ background: "white", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 28px 32px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: 48 }}>
          <div className="footer-brand">
            <div style={{ marginBottom: 14 }}><JobingenLogo height={80} /></div>
            <p style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.7, maxWidth: 220, margin: "0 0 18px" }}>AI-powered job search for India&apos;s tech job market.</p>
            <div style={{ display: "flex", gap: 8 }}>
              {["in", "𝕏"].map((s, i) => (
                <a key={i} href="/" style={{ width: 32, height: 32, borderRadius: 10, background: "var(--bg2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "var(--ink2)", textDecoration: "none", transition: "all .15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#eef1fd"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--bg2)"; e.currentTarget.style.color = "var(--ink2)"; e.currentTarget.style.transform = "" }}>
                  {s}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(cols).map(([sec, items]) => (
            <div key={sec}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink3)", marginBottom: 16 }}>{sec}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(([label, href]) => (
                  <li key={label}><a href={href} style={{ fontSize: 14, fontWeight: 500, color: "var(--ink2)", textDecoration: "none", transition: "color .15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--ink2)")}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, paddingTop: 24, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "var(--ink3)" }}>&copy; 2026 Jobingen. Built for India&apos;s job seekers.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99, background: "var(--grn-l)", border: "1px solid rgba(16,185,129,.12)" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--grn)", animation: "pulse-s 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--grn)" }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff"
    return () => { document.body.style.backgroundColor = "" }
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in") }),
      { threshold: .08, rootMargin: "0px 0px -40px 0px" }
    )
    document.querySelectorAll(".sr").forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ fontFamily: "var(--font-inter,-apple-system,system-ui,sans-serif)", background: "white" }}>
        <Navbar scrolled={scrolled} />
        <Hero />
        <Ticker />
        <Logos />
        <Bootcamp />
        <MentorsSection />
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
