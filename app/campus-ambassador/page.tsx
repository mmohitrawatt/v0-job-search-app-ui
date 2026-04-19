"use client"

import { useState, useRef, useEffect } from "react"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("ca-visible"); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollReveal()
  return <div ref={ref} className="ca-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

const COLLEGES = ["IIT Delhi", "NIT Allahabad", "VIT Vellore", "DTU Delhi", "IIIT Hyderabad", "BIT Mesra", "MNNIT", "Amity University", "NIT Trichy", "IIT BHU", "LNMIIT Jaipur", "KIET Ghaziabad", "Chandigarh University", "SRM Chennai", "NIT Warangal"]

export default function CampusAmbassadorPage() {
  const [form, setForm] = useState({ name: "", college: "", course_year: "", email: "", phone: "", linkedin: "", instagram: "", why_ambassador: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("")
    try {
      const res = await fetch("/api/campus-ambassador", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong."); return }
      setSubmitted(true)
    } catch { setError("Network error. Please try again.") }
    finally { setLoading(false) }
  }

  const roles = [
    { title: "Represent Jobingen", desc: "Be the official Jobingen face on your campus. Run activations, drive awareness, and be the go-to person for career opportunities.", color: "#1d3a8f", bg: "#eef2ff" },
    { title: "Share AI Career Tools", desc: "Introduce peers to AI-powered resume builders, mock interviews, and smart job matching.", color: "#0369a1", bg: "#e0f2fe" },
    { title: "Promote Events", desc: "Spread the word about bootcamps, hackathons, and career workshops before they open to the public.", color: "#0f766e", bg: "#f0fdf4" },
    { title: "Build Community", desc: "Grow the Jobingen network at your college — connecting peers with internships, mentors, and real career paths.", color: "#7c3aed", bg: "#f5f3ff" },
  ]

  const perks = [
    { title: "Verified Certificate", desc: "Official Jobingen certificate to showcase on LinkedIn and your resume.", color: "#1d3a8f", bg: "#eef2ff" },
    { title: "Internship Priority", desc: "Top ambassadors get first access to internship roles inside Jobingen.", color: "#0f766e", bg: "#f0fdf4" },
    { title: "Exclusive Workshops", desc: "Invite-only AI & career tech sessions before public release.", color: "#b45309", bg: "#fffbeb" },
    { title: "Leadership Portfolio", desc: "Real campaigns & events that become powerful portfolio pieces.", color: "#7c3aed", bg: "#f5f3ff" },
    { title: "Founder Network", desc: "Direct access to Jobingen founders, engineers, and hiring managers.", color: "#0369a1", bg: "#e0f2fe" },
    { title: "Ambassador Perks", desc: "Swag, early product access, referral bonuses, and growing rewards.", color: "#dc2626", bg: "#fef2f2" },
  ]

  const eligibility = [
    "Currently enrolled in any college or university in India",
    "Passionate about technology, AI, startups, or career development",
    "Active on campus with solid communication and networking skills",
    "Self-motivated and ready to create real impact in your community",
  ]

  return (
    <>
      <style>{`
        .ca * { box-sizing: border-box; margin: 0; padding: 0; }
        .ca { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .ca-reveal { opacity: 0; transform: translateY(20px); transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
        .ca-visible { opacity: 1 !important; transform: none !important; }

        @keyframes ca-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }
        @keyframes ca-fade-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        @keyframes ca-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1);box-shadow:0 0 0 0 rgba(22,163,74,.4)} 50%{opacity:.7;transform:scale(.8);box-shadow:0 0 0 6px rgba(22,163,74,0)} }

        /* ── HERO ── */
        .ca-hero {
          position: relative; overflow: hidden;
          background: linear-gradient(180deg, #f0f4ff 0%, #e8edff 60%, #f8faff 100%);
          padding: 80px 24px 88px;
        }
        .ca-hero-blob1 { position:absolute; top:-10%; right:5%; width:440px; height:440px; border-radius:50%; background:radial-gradient(circle, rgba(29,58,143,0.07) 0%, transparent 70%); pointer-events:none; }
        .ca-hero-blob2 { position:absolute; bottom:-5%; left:3%; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle, rgba(59,91,219,0.05) 0%, transparent 70%); pointer-events:none; }

        .ca-hero-badge {
          display:inline-flex; align-items:center; gap:7px;
          padding:6px 18px; background:white; border:1.5px solid #dde5ff;
          border-radius:99px; margin-bottom:28px;
          box-shadow:0 2px 12px rgba(29,58,143,0.08);
          animation: ca-fade-up .6s cubic-bezier(.16,1,.3,1) both;
        }
        .ca-hero-dot { width:7px; height:7px; background:#16a34a; border-radius:50%; box-shadow:0 0 6px rgba(22,163,74,.5); animation:ca-pulse 2s infinite; }
        .ca-hero-badge-text { font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.06em; text-transform:uppercase; }

        .ca-hero-h1 {
          font-size:clamp(34px,5vw,60px); font-weight:900; color:#0f172a;
          letter-spacing:-0.04em; line-height:1.06; margin-bottom:20px;
          animation: ca-fade-up .7s cubic-bezier(.16,1,.3,1) .06s both;
        }
        .ca-hero-grad {
          background: linear-gradient(135deg, #1d3a8f, #3b5bdb);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .ca-hero-sub {
          font-size:17px; color:#475569; line-height:1.75; max-width:560px; margin:0 auto 40px;
          animation: ca-fade-up .8s cubic-bezier(.16,1,.3,1) .12s both;
        }
        .ca-hero-actions {
          display:flex; align-items:center; justify-content:center; gap:14px; flex-wrap:wrap;
          animation: ca-fade-up .9s cubic-bezier(.16,1,.3,1) .18s both;
        }
        .ca-btn-primary {
          display:inline-flex; align-items:center; gap:9px;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb);
          color:#fff; padding:14px 32px; border-radius:12px;
          font-size:15px; font-weight:700; text-decoration:none;
          box-shadow:0 4px 20px rgba(29,58,143,0.28);
          transition:all .25s cubic-bezier(.16,1,.3,1);
        }
        .ca-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(29,58,143,0.38); }
        .ca-btn-secondary {
          display:inline-flex; align-items:center; gap:7px;
          background:white; color:#1d3a8f; padding:14px 28px; border-radius:12px;
          font-size:14px; font-weight:700; text-decoration:none;
          border:1.5px solid #dde5ff; box-shadow:0 2px 8px rgba(29,58,143,0.06);
          transition:all .25s;
        }
        .ca-btn-secondary:hover { border-color:#1d3a8f; background:#f8faff; }

        /* hero stats */
        .ca-hero-stats {
          display:inline-flex; align-items:center; background:white;
          border:1.5px solid #e0e7ff; border-radius:16px; overflow:hidden;
          box-shadow:0 4px 20px rgba(29,58,143,0.08);
          animation: ca-fade-up 1s cubic-bezier(.16,1,.3,1) .24s both;
          margin-top: 48px;
        }
        .ca-stat { padding:18px 28px; text-align:center; border-right:1px solid #f1f5f9; }
        .ca-stat:last-child { border-right:none; }
        .ca-stat-val { font-size:22px; font-weight:900; color:#1d3a8f; letter-spacing:-0.03em; line-height:1; }
        .ca-stat-label { font-size:11px; font-weight:600; color:#94a3b8; margin-top:4px; }

        /* ── TICKER ── */
        .ca-ticker {
          background:white; border-top:1px solid #f1f5f9; border-bottom:1px solid #f1f5f9;
          padding:12px 0; overflow:hidden;
        }
        .ca-ticker-track { display:flex; gap:0; width:max-content; animation:ca-marquee 30s linear infinite; }
        .ca-ticker-item {
          display:inline-flex; align-items:center; gap:8px;
          padding:0 28px; font-size:12px; font-weight:700;
          color:#334155; white-space:nowrap;
        }
        .ca-ticker-dot { width:4px; height:4px; border-radius:50%; background:#dde5ff; }

        /* ── SECTIONS ── */
        .ca-inner { max-width:1100px; margin:0 auto; padding:0 24px; }
        .ca-sec { padding:80px 24px; }
        .ca-sec-alt { padding:80px 24px; background:#f8faff; }
        .ca-sec-blue { padding:80px 24px; background:linear-gradient(180deg,#f0f4ff 0%,#e8edff 100%); }

        .ca-eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.08em; text-transform:uppercase;
          margin-bottom:14px;
        }
        .ca-eyebrow-line { display:inline-block; width:20px; height:2px; background:#1d3a8f; border-radius:2px; }
        .ca-sec-title { font-size:clamp(26px,3.5vw,42px); font-weight:900; color:#0f172a; letter-spacing:-0.035em; line-height:1.1; margin-bottom:14px; }
        .ca-sec-sub { font-size:16px; color:#64748b; line-height:1.75; max-width:560px; }

        /* ── ROLES GRID ── */
        .ca-roles-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; margin-top:48px; }
        @media(max-width:640px) { .ca-roles-grid { grid-template-columns:1fr; } }
        .ca-role-card {
          background:white; border-radius:20px; border:1.5px solid #eaecf4;
          padding:28px 28px 26px; box-shadow:0 2px 12px rgba(0,0,0,0.04);
          transition:box-shadow .2s, transform .2s;
        }
        .ca-role-card:hover { box-shadow:0 8px 28px rgba(29,58,143,0.1); transform:translateY(-2px); }
        .ca-role-num {
          display:inline-flex; align-items:center; justify-content:center;
          width:36px; height:36px; border-radius:10px;
          font-size:13px; font-weight:900; margin-bottom:16px;
        }
        .ca-role-title { font-size:17px; font-weight:800; color:#0f172a; margin-bottom:8px; letter-spacing:-0.02em; }
        .ca-role-desc { font-size:13px; color:#64748b; line-height:1.7; }

        /* ── HOW IT WORKS ── */
        .ca-process { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:48px; }
        @media(max-width:700px) { .ca-process { grid-template-columns:1fr; } }
        .ca-process-card {
          background:white; border-radius:20px; border:1.5px solid #e0e7ff;
          padding:32px 28px; position:relative; overflow:hidden;
          box-shadow:0 2px 16px rgba(29,58,143,0.06);
        }
        .ca-process-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,#1d3a8f,#3b5bdb);
        }
        .ca-process-num {
          width:44px; height:44px; border-radius:12px;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb);
          color:white; font-size:18px; font-weight:900;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:20px; box-shadow:0 4px 12px rgba(29,58,143,0.25);
        }
        .ca-process-title { font-size:17px; font-weight:800; color:#0f172a; margin-bottom:8px; letter-spacing:-0.02em; }
        .ca-process-desc { font-size:13px; color:#64748b; line-height:1.7; }

        /* ── PERKS ── */
        .ca-perks-featured {
          background:white; border-radius:20px; border:1.5px solid #e0e7ff;
          padding:32px 36px; display:flex; align-items:center; gap:28px;
          box-shadow:0 4px 20px rgba(29,58,143,0.08); margin-top:48px; margin-bottom:20px;
        }
        .ca-perks-featured-icon {
          width:64px; height:64px; border-radius:18px; flex-shrink:0;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 4px 16px rgba(29,58,143,0.25);
        }
        .ca-perks-featured-badge {
          display:inline-block; font-size:10px; font-weight:800; color:#1d3a8f;
          background:#eef2ff; border:1px solid #dde5ff; border-radius:99px;
          padding:3px 10px; letter-spacing:.06em; text-transform:uppercase; margin-bottom:8px;
        }
        .ca-perks-featured-title { font-size:20px; font-weight:900; color:#0f172a; margin-bottom:6px; letter-spacing:-0.02em; }
        .ca-perks-featured-desc { font-size:14px; color:#64748b; line-height:1.65; }

        .ca-perks-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        @media(max-width:900px) { .ca-perks-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:540px) { .ca-perks-grid { grid-template-columns:1fr; } }
        .ca-perk-card {
          background:white; border-radius:16px; border:1.5px solid #eaecf4;
          padding:22px 22px 20px; box-shadow:0 1px 6px rgba(0,0,0,0.04);
          transition:box-shadow .2s, border-color .2s;
        }
        .ca-perk-card:hover { box-shadow:0 6px 20px rgba(29,58,143,0.09); border-color:#dde5ff; }
        .ca-perk-icon {
          width:40px; height:40px; border-radius:12px;
          display:flex; align-items:center; justify-content:center; margin-bottom:14px;
        }
        .ca-perk-title { font-size:15px; font-weight:800; color:#0f172a; margin-bottom:6px; letter-spacing:-0.02em; }
        .ca-perk-desc { font-size:12px; color:#64748b; line-height:1.65; }

        /* ── WHO CAN APPLY ── */
        .ca-who-layout { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; max-width:1100px; margin:0 auto; padding:0 24px; }
        @media(max-width:700px) { .ca-who-layout { grid-template-columns:1fr; gap:32px; } }
        .ca-who-list { display:flex; flex-direction:column; gap:14px; }
        .ca-who-item {
          display:flex; align-items:flex-start; gap:14px;
          background:white; border:1.5px solid #eaecf4; border-radius:14px;
          padding:16px 18px; box-shadow:0 1px 4px rgba(0,0,0,0.04);
        }
        .ca-who-check {
          width:22px; height:22px; border-radius:7px; flex-shrink:0; margin-top:1px;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 8px rgba(29,58,143,0.2);
        }
        .ca-who-text { font-size:14px; color:#334155; line-height:1.6; font-weight:500; }

        /* ── FORM ── */
        .ca-form-section {
          background:linear-gradient(180deg,#f0f4ff 0%,#e8edff 100%);
          padding:80px 24px; position:relative; overflow:hidden;
        }
        .ca-form-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1.15fr; gap:64px; align-items:start; }
        @media(max-width:860px) { .ca-form-inner { grid-template-columns:1fr; } }

        .ca-form-left-eyebrow {
          display:inline-flex; align-items:center; gap:7px;
          font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.08em;
          text-transform:uppercase; margin-bottom:16px;
        }
        .ca-form-left-h2 { font-size:clamp(26px,3vw,38px); font-weight:900; color:#0f172a; letter-spacing:-0.035em; line-height:1.1; margin-bottom:14px; }
        .ca-form-left-sub { font-size:15px; color:#64748b; line-height:1.75; margin-bottom:36px; }

        .ca-step { display:flex; align-items:flex-start; gap:16px; margin-bottom:20px; }
        .ca-step-num {
          width:36px; height:36px; border-radius:10px; flex-shrink:0;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb); color:white;
          font-size:14px; font-weight:900; display:flex; align-items:center; justify-content:center;
          box-shadow:0 3px 10px rgba(29,58,143,0.22);
        }
        .ca-step-title { font-size:14px; font-weight:800; color:#0f172a; margin-bottom:3px; }
        .ca-step-desc { font-size:13px; color:#64748b; line-height:1.6; }

        .ca-form-box {
          background:white; border-radius:24px; border:1.5px solid #dde5ff;
          padding:36px 36px 32px; box-shadow:0 8px 40px rgba(29,58,143,0.1);
        }
        .ca-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
        @media(max-width:540px) { .ca-form-row { grid-template-columns:1fr; } }
        .ca-form-group { display:flex; flex-direction:column; gap:6px; }
        .ca-form-label { font-size:12px; font-weight:700; color:#334155; }
        .ca-form-input {
          width:100%; padding:11px 14px; border-radius:10px;
          border:1.5px solid #e2e8f0; font-size:14px; color:#0f172a;
          outline:none; transition:border-color .15s, box-shadow .15s;
          background:white; font-family:inherit;
        }
        .ca-form-input:focus { border-color:#1d3a8f; box-shadow:0 0 0 3px rgba(29,58,143,0.1); }
        .ca-form-input::placeholder { color:#94a3b8; }
        .ca-form-textarea {
          width:100%; padding:11px 14px; border-radius:10px;
          border:1.5px solid #e2e8f0; font-size:14px; color:#0f172a;
          outline:none; resize:vertical; min-height:100px; line-height:1.6;
          font-family:inherit; transition:border-color .15s, box-shadow .15s;
        }
        .ca-form-textarea:focus { border-color:#1d3a8f; box-shadow:0 0 0 3px rgba(29,58,143,0.1); }
        .ca-form-textarea::placeholder { color:#94a3b8; }
        .ca-form-hint { font-size:11px; color:#94a3b8; margin-top:4px; }
        .ca-form-error { font-size:13px; color:#dc2626; margin-bottom:12px; }
        .ca-form-submit {
          width:100%; padding:14px; border-radius:12px;
          background:linear-gradient(135deg,#1d3a8f,#3b5bdb); color:white;
          font-size:15px; font-weight:700; border:none; cursor:pointer;
          box-shadow:0 4px 16px rgba(29,58,143,0.28);
          transition:opacity .2s, transform .2s;
        }
        .ca-form-submit:hover:not(:disabled) { opacity:.92; transform:translateY(-1px); }
        .ca-form-submit:disabled { opacity:.6; cursor:not-allowed; }
        .ca-form-success {
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          text-align:center; gap:14px; padding:48px 36px !important;
        }
        .ca-form-success-icon {
          width:56px; height:56px; border-radius:16px;
          background:linear-gradient(135deg,#dcfce7,#bbf7d0);
          display:flex; align-items:center; justify-content:center;
        }
        .ca-form-success h3 { font-size:22px; font-weight:900; color:#0f172a; }
        .ca-form-success p { font-size:14px; color:#64748b; line-height:1.7; max-width:300px; }
        .ca-form-back {
          display:inline-flex; align-items:center; gap:6px;
          font-size:13px; font-weight:700; color:#1d3a8f; text-decoration:none;
          padding:10px 20px; border-radius:10px; background:#eef2ff; border:1.5px solid #dde5ff;
        }

        @media(max-width:860px) {
          .ca-hero { padding:56px 20px 64px; }
          .ca-sec, .ca-sec-alt, .ca-sec-blue, .ca-form-section { padding:56px 20px; }
          .ca-inner { padding:0 20px; }
          .ca-who-layout { padding:0 20px; }
        }
        @media(max-width:640px) {
          .ca-hero { padding:44px 16px 56px; }
          .ca-sec, .ca-sec-alt, .ca-sec-blue, .ca-form-section { padding:44px 16px; }
          .ca-inner { padding:0 16px; }
          .ca-who-layout { padding:0 16px; }
          .ca-hero-badge-text { font-size:10px; }
          .ca-hero-sub { font-size:15px; }
          .ca-sec-sub { font-size:14px; }
          .ca-btn-primary, .ca-btn-secondary { width:100%; justify-content:center; padding:14px 20px; }
          .ca-hero-actions { flex-direction:column; align-items:stretch; width:100%; max-width:320px; margin:0 auto; }
          .ca-roles-grid { margin-top:32px; gap:12px; }
          .ca-process { margin-top:32px; }
          .ca-process-card { padding:24px 20px; }
          .ca-role-card { padding:20px 18px; }
          .ca-perks-featured { padding:22px 20px; }
          .ca-perks-grid { margin-top:0; gap:10px; }
          .ca-perk-card { padding:18px 16px; }
          .ca-who-item { padding:14px 14px; }
          .ca-form-inner { gap:32px; }
          .ca-form-left-sub { margin-bottom:24px; }
        }
        @media(max-width:480px) {
          .ca-hero-stats { display:grid; grid-template-columns:1fr 1fr; width:100%; max-width:320px; }
          .ca-stat { border-right:1px solid #f1f5f9; border-bottom:1px solid #f1f5f9; padding:14px 0; }
          .ca-stat:nth-child(2n) { border-right:none; }
          .ca-stat:nth-child(3), .ca-stat:nth-child(4) { border-bottom:none; }
          .ca-perks-featured { flex-direction:column; gap:16px; padding:20px 18px; }
          .ca-form-box { padding:20px 16px 18px; border-radius:16px; }
          .ca-form-row { grid-template-columns:1fr; }
          .ca-form-inner { gap:24px; }
          .ca-hero { padding:36px 16px 48px; }
          .ca-sec, .ca-sec-alt, .ca-sec-blue, .ca-form-section { padding:36px 16px; }
        }
      `}</style>

      <Navbar />
      <div style={{ height: 108 }} />

      <div className="ca">

        {/* ── HERO ── */}
        <section className="ca-hero">
          <div className="ca-hero-blob1" />
          <div className="ca-hero-blob2" />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
            <div className="ca-hero-badge">
              <div className="ca-hero-dot" />
              <span className="ca-hero-badge-text">Campus Ambassador Program · 2026 Cohort</span>
            </div>

            <h1 className="ca-hero-h1">
              Be the face of<br />
              <span className="ca-hero-grad">Jobingen on your campus.</span>
            </h1>

            <p className="ca-hero-sub">
              Lead your college community. Share AI career tools. Build real-world leadership experience — and open doors that grades never could.
            </p>

            <div className="ca-hero-actions">
              <a href="#apply" className="ca-btn-primary">
                Apply Now
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#perks" className="ca-btn-secondary">
                See Benefits
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
              </a>
            </div>

            <div style={{ display:"flex", justifyContent:"center" }}>
              <div className="ca-hero-stats">
                {[
                  { val: "500+", label: "Ambassadors" },
                  { val: "60+", label: "Colleges" },
                  { val: "₹0", label: "Cost to Join" },
                  { val: "48h", label: "Response Time" },
                ].map((s, i) => (
                  <div key={s.label} className="ca-stat">
                    <div className="ca-stat-val">{s.val}</div>
                    <div className="ca-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="ca-ticker">
          <div className="ca-ticker-track">
            {[...COLLEGES, ...COLLEGES].map((c, i) => (
              <span key={i} className="ca-ticker-item">
                {c}
                <span className="ca-ticker-dot" />
              </span>
            ))}
          </div>
        </div>

        {/* ── WHAT YOU DO ── */}
        <section className="ca-sec">
          <div className="ca-inner">
            <Reveal>
              <div className="ca-eyebrow">
                <span className="ca-eyebrow-line" />
                Your Role
              </div>
              <h2 className="ca-sec-title">What you'll do</h2>
              <p className="ca-sec-sub">You are the bridge between Jobingen and your campus. Real work, real impact, real recognition.</p>
            </Reveal>

            <div className="ca-roles-grid">
              {roles.map((r, i) => (
                <Reveal key={r.title} delay={i * 60}>
                  <div className="ca-role-card">
                    <div className="ca-role-num" style={{ background: r.bg, color: r.color }}>{i + 1}</div>
                    <div className="ca-role-title">{r.title}</div>
                    <div className="ca-role-desc">{r.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="ca-sec-alt">
          <div className="ca-inner">
            <Reveal>
              <div className="ca-eyebrow">
                <span className="ca-eyebrow-line" />
                The Process
              </div>
              <h2 className="ca-sec-title">3 steps to get started</h2>
              <p className="ca-sec-sub">Simple and fast — designed for students who are ready to lead.</p>
            </Reveal>

            <div className="ca-process">
              {[
                { title: "Apply Online", desc: "Fill out the short form — under 5 minutes. Tell us about yourself and your campus." },
                { title: "Get Selected", desc: "Our team personally reviews every application and responds within 48 hours by email." },
                { title: "Start Leading", desc: "Receive your ambassador kit, join the community, and begin making real campus impact." },
              ].map((s, i) => (
                <Reveal key={s.title} delay={i * 70}>
                  <div className="ca-process-card">
                    <div className="ca-process-num">{i + 1}</div>
                    <div className="ca-process-title">{s.title}</div>
                    <div className="ca-process-desc">{s.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PERKS ── */}
        <section className="ca-sec" id="perks">
          <div className="ca-inner">
            <Reveal>
              <div className="ca-eyebrow">
                <span className="ca-eyebrow-line" />
                Why Join
              </div>
              <h2 className="ca-sec-title">Perks &amp; Benefits</h2>
              <p className="ca-sec-sub">We invest in ambassadors who invest in their campus community.</p>
            </Reveal>

            <Reveal delay={40}>
              <div className="ca-perks-featured">
                <div className="ca-perks-featured-icon">
                  <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M9 21l3-3 3 3V14a5 5 0 01-6 0v7z"/></svg>
                </div>
                <div>
                  <div className="ca-perks-featured-badge">Top Benefit</div>
                  <div className="ca-perks-featured-title">{perks[0].title}</div>
                  <div className="ca-perks-featured-desc">{perks[0].desc}</div>
                </div>
              </div>
            </Reveal>

            <div className="ca-perks-grid">
              {perks.slice(1).map((p, i) => (
                <Reveal key={p.title} delay={i * 50}>
                  <div className="ca-perk-card">
                    <div className="ca-perk-icon" style={{ background: p.bg }}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={p.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {i === 0 && <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>}
                        {i === 1 && <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>}
                        {i === 2 && <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>}
                        {i === 3 && <><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M12 11l-5.5 6M12 11l5.5 6"/></>}
                        {i === 4 && <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>}
                      </svg>
                    </div>
                    <div className="ca-perk-title">{p.title}</div>
                    <div className="ca-perk-desc">{p.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO CAN APPLY ── */}
        <section className="ca-sec-alt">
          <div className="ca-who-layout">
            <Reveal>
              <div>
                <div className="ca-eyebrow">
                  <span className="ca-eyebrow-line" />
                  Eligibility
                </div>
                <h2 className="ca-sec-title" style={{ maxWidth: 340 }}>Who can apply</h2>
                <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.75, marginTop: 14, maxWidth: 340 }}>
                  No experience required — just passion, initiative, and a genuine desire to help your campus community grow.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="ca-who-list">
                {eligibility.map((item, i) => (
                  <div key={i} className="ca-who-item">
                    <div className="ca-who-check">
                      <svg width="12" height="12" fill="none" viewBox="0 0 14 14"><path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="ca-who-text">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FORM ── */}
        <section className="ca-form-section" id="apply">
          <div className="ca-form-inner">

            <div>
              <Reveal>
                <div className="ca-form-left-eyebrow">
                  <span className="ca-eyebrow-line" />
                  Apply Now
                </div>
                <h2 className="ca-form-left-h2">Ready to lead?</h2>
                <p className="ca-form-left-sub">Join ambassadors from 60+ colleges. We review every application personally and respond within 48 hours.</p>
              </Reveal>
              <Reveal delay={80}>
                <div>
                  {[
                    { title: "Submit your application", desc: "Takes under 5 minutes. Tell us about yourself and your campus." },
                    { title: "Hear back in 48 hours", desc: "Our team reviews personally and follows up via email." },
                    { title: "Get onboarded & start", desc: "Receive your kit, join the community, hit the ground running." },
                  ].map((s, i) => (
                    <div key={i} className="ca-step">
                      <div className="ca-step-num">{i + 1}</div>
                      <div>
                        <div className="ca-step-title">{s.title}</div>
                        <div className="ca-step-desc">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div>
              {submitted ? (
                <div className="ca-form-box ca-form-success">
                  <div className="ca-form-success-icon">
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3>Application Submitted!</h3>
                  <p>Thank you for applying. We'll review your application and reach out within 48 hours.</p>
                  <a href="/" className="ca-form-back">
                    <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Back to Jobingen
                  </a>
                </div>
              ) : (
                <Reveal delay={100}>
                  <form className="ca-form-box" onSubmit={handleSubmit}>
                    <div className="ca-form-row">
                      <div className="ca-form-group">
                        <label className="ca-form-label">Full Name *</label>
                        <input className="ca-form-input" placeholder="Rahul Sharma" value={form.name} onChange={set("name")} required />
                      </div>
                      <div className="ca-form-group">
                        <label className="ca-form-label">College *</label>
                        <input className="ca-form-input" placeholder="IIT Delhi" value={form.college} onChange={set("college")} required />
                      </div>
                    </div>
                    <div className="ca-form-row">
                      <div className="ca-form-group">
                        <label className="ca-form-label">Course / Year *</label>
                        <input className="ca-form-input" placeholder="B.Tech CSE, 2nd Year" value={form.course_year} onChange={set("course_year")} required />
                      </div>
                      <div className="ca-form-group">
                        <label className="ca-form-label">Email *</label>
                        <input className="ca-form-input" type="email" placeholder="rahul@college.edu" value={form.email} onChange={set("email")} required />
                      </div>
                    </div>
                    <div className="ca-form-row">
                      <div className="ca-form-group">
                        <label className="ca-form-label">Phone *</label>
                        <input className="ca-form-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} required />
                      </div>
                      <div className="ca-form-group">
                        <label className="ca-form-label">LinkedIn</label>
                        <input className="ca-form-input" placeholder="linkedin.com/in/rahul" value={form.linkedin} onChange={set("linkedin")} />
                      </div>
                    </div>
                    <div className="ca-form-row" style={{ marginBottom: 14 }}>
                      <div className="ca-form-group">
                        <label className="ca-form-label">Instagram</label>
                        <input className="ca-form-input" placeholder="@rahul.sharma" value={form.instagram} onChange={set("instagram")} />
                      </div>
                    </div>
                    <div className="ca-form-group" style={{ marginBottom: 20 }}>
                      <label className="ca-form-label">Why do you want to be a Campus Ambassador? *</label>
                      <textarea className="ca-form-textarea" placeholder="Tell us about yourself, what drives you, and how you plan to represent Jobingen at your college..." value={form.why_ambassador} onChange={set("why_ambassador")} required />
                      <span className="ca-form-hint">Be honest and specific — this matters most.</span>
                    </div>
                    {error && <p className="ca-form-error">{error}</p>}
                    <button className="ca-form-submit" type="submit" disabled={loading}>
                      {loading ? "Submitting..." : "Submit Application →"}
                    </button>
                  </form>
                </Reveal>
              )}
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
