"use client"

import { useEffect, useState } from "react"

// ─── CSS ────────────────────────────────────────────────────────
const CSS = `
  :root {
    --ink:    #0a0a0f;
    --ink2:   #4a4a5a;
    --ink3:   #8a8a9a;
    --white:  #ffffff;
    --bg:     #fafafa;
    --border: rgba(0,0,0,0.06);
    --ind:    #4f46e5;
    --ind-l:  #eef2ff;
    --ease:   cubic-bezier(.16,1,.3,1);
    --spring: cubic-bezier(.34,1.56,.64,1);
  }

  * { box-sizing: border-box; }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes shimmer-bar {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse-dot {
    0%,100% { opacity: .5; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.3); }
  }

  .sr {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity .7s var(--ease), transform .7s var(--ease);
  }
  .sr.in { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: .06s; }
  .d2 { transition-delay: .12s; }
  .d3 { transition-delay: .18s; }
  .d4 { transition-delay: .24s; }
  .d5 { transition-delay: .30s; }
  .d6 { transition-delay: .36s; }

  .top-bar {
    height: 2px;
    background: linear-gradient(90deg, #4f46e5, #7c3aed, #4f46e5);
    background-size: 200% auto;
    animation: shimmer-bar 3s linear infinite;
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  }

  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    cursor: pointer; text-decoration: none; border: none; outline: none;
    font-weight: 600; border-radius: 12px;
    transition: transform .2s var(--spring), box-shadow .2s ease, opacity .15s;
  }
  .btn:hover { transform: translateY(-2px); }
  .btn:active { transform: translateY(0) scale(.98); }

  .btn-primary {
    background: var(--ink);
    color: white;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
  .btn-primary:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.18); }

  .btn-secondary {
    background: white;
    color: var(--ink);
    border: 1.5px solid var(--border);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .btn-secondary:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); border-color: rgba(0,0,0,0.12); }

  .email-input {
    width: 100%;
    padding: 14px 18px;
    font-size: 15px;
    font-weight: 500;
    color: var(--ink);
    background: white;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .email-input:focus {
    border-color: var(--ind);
    box-shadow: 0 0 0 3px rgba(79,70,229,0.08);
  }
  .email-input::placeholder { color: var(--ink3); font-weight: 400; }

  /* ── Responsive ─────────────────────────── */
  @media (max-width: 768px) {
    .nav-inner { padding: 0 18px !important; }
    .nav-cta { display: none !important; }
    .hero-section { padding: 120px 20px 64px !important; }
    .hero-h1 { font-size: clamp(32px, 8vw, 44px) !important; }
    .hero-sub { font-size: 16px !important; }
    .hero-form { flex-direction: column !important; }
    .hero-form .btn { width: 100% !important; }
    .section { padding: 64px 20px !important; }
    .features-grid { grid-template-columns: 1fr !important; }
    .benefits-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .footer-bottom { flex-direction: column !important; text-align: center !important; gap: 8px !important; }
    .final-cta-h2 { font-size: clamp(28px, 7vw, 38px) !important; }
    .bootcamp-grid { grid-template-columns: 1fr !important; }
    .problem-copy { font-size: 18px !important; }
  }
  @media (max-width: 480px) {
    .nav-inner { padding: 0 16px !important; }
    .hero-section { padding: 100px 16px 56px !important; }
    .hero-h1 { font-size: 30px !important; }
    .section { padding: 52px 16px !important; }
  }
`

// ─── Navbar ────────────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.6)",
      backdropFilter: "blur(20px) saturate(1.4)",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all .3s ease",
    }}>
      <div className="nav-inner" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "white" }}>V</div>
          <span style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)", letterSpacing: "-.03em" }}>VibeonJob</span>
        </a>
        <a href="#waitlist" className="btn btn-primary nav-cta" style={{ fontSize: 13, padding: "9px 20px" }}>
          Join Waitlist
        </a>
      </div>
    </nav>
  )
}

// ─── Hero ──────────────────────────────────────────────────────
function Hero() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section className="hero-section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 28px 80px", background: "var(--white)", position: "relative" }}>
      <div style={{ maxWidth: 680, textAlign: "center", animation: "fade-up .9s var(--ease) both" }}>

        {/* Pre-launch badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, background: "var(--bg)", border: "1px solid var(--border)", marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ind)", animation: "pulse-dot 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", letterSpacing: ".02em" }}>Launching Soon</span>
        </div>

        {/* Headline */}
        <h1 className="hero-h1" style={{ fontSize: "clamp(40px, 5.5vw, 60px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.04em", color: "var(--ink)", margin: "0 0 20px" }}>
          India&apos;s AI Job Companion<br />is Launching Soon.
        </h1>

        {/* Subheadline */}
        <p className="hero-sub" style={{ fontSize: 18, lineHeight: 1.7, color: "var(--ink2)", margin: "0 0 40px", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          Resume Tailoring. Smart Job Match. AI Mock Interviews.<br />
          Everything you need to land your next tech job — in one platform.
        </p>

        {/* Email form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="hero-form" style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto 18px" }}>
            <input
              type="email"
              placeholder="you@email.com"
              className="email-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ fontSize: 14, padding: "14px 24px", whiteSpace: "nowrap", flexShrink: 0 }}>
              Join Waitlist
            </button>
          </form>
        ) : (
          <div style={{ padding: "16px 24px", borderRadius: 12, background: "#ecfdf5", border: "1px solid rgba(16,185,129,0.2)", maxWidth: 440, margin: "0 auto 18px", animation: "fade-in .4s ease" }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#059669", margin: 0 }}>You&apos;re on the list. We&apos;ll reach out soon.</p>
          </div>
        )}

        {/* Trust text */}
        <p style={{ fontSize: 13, color: "var(--ink3)", margin: 0 }}>
          Early members get priority access + exclusive bootcamp invites.
        </p>
      </div>
    </section>
  )
}

// ─── Vision ────────────────────────────────────────────────────
function Vision() {
  return (
    <section className="sr section" style={{ padding: "80px 28px", background: "var(--bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <p className="sr d1" style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ind)", marginBottom: 20 }}>Our Vision</p>
        <p className="sr d2" style={{ fontSize: 20, lineHeight: 1.75, color: "var(--ink2)", margin: 0, fontWeight: 400 }}>
          VibeonJob is building India&apos;s most intelligent AI-powered career platform for tech students and professionals. From your first resume to your dream offer — we&apos;re designing every step to be smarter, faster, and more human.
        </p>
      </div>
    </section>
  )
}

// ─── Feature Teasers ───────────────────────────────────────────
function Features() {
  const items = [
    { icon: "01", title: "AI Resume Tailoring", desc: "Paste any job description. Get a resume optimized with the right keywords, structure, and ATS score — in seconds." },
    { icon: "02", title: "Smart Job Match", desc: "See your fit percentage before you apply. Every job ranked by skills, experience, and career alignment." },
    { icon: "03", title: "AI Mock Interviews", desc: "Practice with AI-powered interviews tailored to your target role. Get real feedback on every answer." },
    { icon: "04", title: "Career Pipeline Tracker", desc: "Track every application from Applied to Offer. Never lose sight of where you stand." },
  ]
  return (
    <section className="section" style={{ padding: "80px 28px", background: "var(--white)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="sr" style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ind)", marginBottom: 16 }}>What We&apos;re Building</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-.03em", color: "var(--ink)", margin: 0, lineHeight: 1.15 }}>
            One platform. Every edge you need.
          </h2>
        </div>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {items.map((f, i) => (
            <div key={i} className={`sr d${i + 1}`} style={{
              padding: "32px 28px", borderRadius: 16,
              border: "1px solid var(--border)", background: "var(--white)",
              transition: "box-shadow .25s ease, transform .25s var(--spring)",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = ""; }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ind)", letterSpacing: ".06em", marginBottom: 16, fontFamily: "monospace" }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: "0 0 8px", letterSpacing: "-.02em" }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink2)", margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Problem ───────────────────────────────────────────────────
function Problem() {
  return (
    <section className="sr section" style={{ padding: "80px 28px", background: "var(--bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <h2 className="sr d1" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-.03em", color: "var(--ink)", margin: "0 0 24px", lineHeight: 1.1 }}>
          Job search is broken.
        </h2>
        <p className="sr d2 problem-copy" style={{ fontSize: 20, lineHeight: 1.8, color: "var(--ink2)", margin: 0 }}>
          Sending 100 resumes. Getting 2 replies.<br />
          No clarity. No feedback. No direction.<br />
          <span style={{ color: "var(--ink)", fontWeight: 600 }}>We&apos;re changing that.</span>
        </p>
      </div>
    </section>
  )
}

// ─── Bootcamp & Hackathon ──────────────────────────────────────
function Bootcamp() {
  const items = [
    { icon: "01", title: "Resume & LinkedIn Optimization", desc: "Live sessions on building ATS-proof resumes and LinkedIn profiles that actually get recruiter attention." },
    { icon: "02", title: "Interview Strategy Workshops", desc: "Structured prep for DSA, system design, and HR rounds — with real frameworks, not theory." },
    { icon: "03", title: "Live Feedback Sessions", desc: "Submit your resume or mock interview. Get reviewed live by mentors with real hiring experience." },
    { icon: "04", title: "Community & Networking", desc: "Connect with driven peers, mentors, and recruiters. Build your network while building your career." },
  ]
  return (
    <section id="bootcamp" className="section" style={{ padding: "80px 28px", background: "var(--white)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="sr" style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ind)", marginBottom: 16 }}>Upcoming Events</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-.03em", color: "var(--ink)", margin: "0 0 14px", lineHeight: 1.15 }}>
            Bootcamps & Hackathons
          </h2>
          <p style={{ fontSize: 16, color: "var(--ink2)", margin: 0, maxWidth: 440, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            We&apos;re hosting exclusive events for early community members. Here&apos;s what&apos;s coming.
          </p>
        </div>
        <div className="bootcamp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
          {items.map((item, i) => (
            <div key={i} className={`sr d${i + 1}`} style={{
              padding: "28px 24px", borderRadius: 16,
              border: "1px solid var(--border)", background: "var(--bg)",
            }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ind)", letterSpacing: ".06em", marginBottom: 14, fontFamily: "monospace" }}>{item.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-.015em" }}>{item.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--ink2)", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="sr d5" style={{ textAlign: "center" }}>
          <a href="#waitlist" className="btn btn-secondary" style={{ fontSize: 14, padding: "12px 28px" }}>
            Join Waitlist for Updates
            <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Early Access Benefits ─────────────────────────────────────
function EarlyAccess() {
  const benefits = [
    "Priority access before public launch",
    "Exclusive bootcamp & workshop invites",
    "Hackathon participation perks",
    "Early adopter badge on your profile",
    "Direct feedback channel with the founding team",
  ]
  return (
    <section className="sr section" style={{ padding: "80px 28px", background: "var(--bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <p className="sr d1" style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--ind)", marginBottom: 16 }}>Early Access</p>
        <h2 className="sr d2" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-.03em", color: "var(--ink)", margin: "0 0 32px", lineHeight: 1.15 }}>
          Why join early?
        </h2>
        <div className="sr d3" style={{ textAlign: "left", marginBottom: 32 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "12px 0", borderBottom: i < benefits.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--ind-l)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M2 5.2L4 7.2L8 3" stroke="var(--ind)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>
        <div className="sr d4" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 99, background: "#fffbeb", border: "1px solid rgba(245,158,11,0.2)" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#b45309" }}>Limited early access spots available</span>
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ─────────────────────────────────────────────────
function FinalCTA() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section id="waitlist" className="sr section" style={{ padding: "100px 28px", background: "var(--white)" }}>
      <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
        <h2 className="sr d1 final-cta-h2" style={{ fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-.035em", color: "var(--ink)", margin: "0 0 18px", lineHeight: 1.1 }}>
          Be among the first to<br />experience VibeonJob.
        </h2>
        <p className="sr d2" style={{ fontSize: 16, color: "var(--ink2)", margin: "0 0 36px", lineHeight: 1.7 }}>
          We&apos;re building something meaningful for India&apos;s job seekers.<br />
          Get early access. No spam — only launch updates.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="sr d3 hero-form" style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto" }}>
            <input
              type="email"
              placeholder="your@email.com"
              className="email-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ fontSize: 14, padding: "14px 24px", whiteSpace: "nowrap", flexShrink: 0 }}>
              Join Waitlist
            </button>
          </form>
        ) : (
          <div className="sr d3" style={{ padding: "16px 24px", borderRadius: 12, background: "#ecfdf5", border: "1px solid rgba(16,185,129,0.2)", maxWidth: 420, margin: "0 auto", animation: "fade-in .4s ease" }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#059669", margin: 0 }}>You&apos;re on the list. We&apos;ll reach out soon.</p>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 28px 32px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "white" }}>V</div>
              <span style={{ fontSize: 16, fontWeight: 800, color: "var(--ink)", letterSpacing: "-.02em" }}>VibeonJob</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--ink3)", lineHeight: 1.7, maxWidth: 260, margin: 0 }}>
              AI-powered career platform for India&apos;s tech talent. Launching soon.
            </p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink3)", marginBottom: 14, marginTop: 0 }}>Product</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Features", "Bootcamps", "Early Access"].map(item => (
                <a key={item} href="#waitlist" style={{ fontSize: 13, color: "var(--ink2)", textDecoration: "none", transition: "color .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--ink2)")}>{item}</a>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink3)", marginBottom: 14, marginTop: 0 }}>Legal</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Privacy Policy", "Terms of Service"].map(item => (
                <a key={item} href="#" style={{ fontSize: 13, color: "var(--ink2)", textDecoration: "none", transition: "color .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--ink2)")}>{item}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, color: "var(--ink3)" }}>&copy; 2026 VibeonJob. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "var(--ink3)" }}>Built in India.</span>
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
    document.body.style.margin = "0"
    return () => { document.body.style.backgroundColor = ""; document.body.style.margin = ""; }
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
      <div className="top-bar" />
      <div style={{ fontFamily: "var(--font-inter, -apple-system, system-ui, sans-serif)", background: "white", overflowX: "hidden" }}>
        <Navbar scrolled={scrolled} />
        <Hero />
        <Vision />
        <Features />
        <Problem />
        <Bootcamp />
        <EarlyAccess />
        <FinalCTA />
        <Footer />
      </div>
    </>
  )
}
