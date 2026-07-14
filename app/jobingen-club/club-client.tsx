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

const TICKER_ITEMS = [
  "Club President Role", "Free Bootcamp Access", "LOR from Jobingen", "AI Tools for Free",
  "Host Hackathons", "Industry Mentors", "Interview Prep Sessions", "PPI at Jobingen",
  "Certificate of Leadership", "Mentor Network Access", "Real Career Impact", "Founding Batch",
]

const ACTIVITIES = [
  {
    title: "Run AI & Tech Workshops",
    desc: "Organize hands-on sessions on AI tools, resume building, and interview prep using Jobingen's platform — directly on your campus.",
  },
  {
    title: "Host Hackathons & Bootcamps",
    desc: "Plan and execute hackathons, coding bootcamps, and skill challenges for your college community with Jobingen support.",
  },
  {
    title: "Interview Preparation Events",
    desc: "Use Jobingen's AI Interview tool to run mock interview sessions, group prep drives, and placement readiness workshops.",
  },
  {
    title: "Build the Community",
    desc: "Grow a placement-focused student community at your college — connect peers with internships, mentors, and real career opportunities.",
  },
]

const PERKS = [
  { title: "Official LOR", desc: "Letter of Recommendation from Jobingen founders — powerful for higher studies and job applications." },
  { title: "PPI at Jobingen", desc: "Top performers get a direct Pre-Placement Interview at Jobingen — skip the general hiring queue." },
  { title: "Free Bootcamp Access", desc: "All Jobingen bootcamps and AI courses, completely free for you as Club President." },
  { title: "Industry Mentor Access", desc: "Direct access to Jobingen's mentor network — working professionals from top Indian and global companies." },
  { title: "Free AI Tools", desc: "Lifetime free access to AI Resume Builder, AI Mock Interview, Job Tracker, and all Jobingen tools." },
  { title: "Certificate + Swag", desc: "Official Jobingen Club President certificate, swag kit, and recognition on Jobingen's platform." },
]

const STEPS = [
  { num: "01", title: "Apply Online", desc: "Fill the application form. Tell us about your college, your current role on campus, and why you want to lead Jobingen Club." },
  { num: "02", title: "Get Selected", desc: "Our team reviews your application and schedules a quick 15-minute call to understand your vision and campus fit." },
  { num: "03", title: "Launch Your Club", desc: "Get onboarded, receive your kit, and launch Jobingen Club at your college — with full support from our team." },
]

const ELIGIBILITY = [
  "Currently enrolled in any engineering or management college in India",
  "In 2nd or 3rd year of study (preferred — 4th year okay if placement season allows)",
  "Already involved in any campus club, society, or student activity",
  "Genuinely excited about AI, careers, and building something at your college",
]

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"]
const BRANCHES = ["Computer Science / IT", "Electronics / ECE", "Mechanical", "Civil", "MBA / Management", "Other"]

export function JobingenClubClient() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", college: "", city: "",
    year: "", degree: "", linkedin: "", instagram: "",
    campus_role: "", why_lead: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("")
    try {
      const res = await fetch("/api/campus-ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong."); return }
      setSubmitted(true)
    } catch { setError("Network error. Please try again.") }
    finally { setLoading(false) }
  }

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

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

        /* ── HERO ── */
        .ca-hero {
          position: relative; overflow: hidden;
          background: linear-gradient(180deg, #ffffff 0%, #ffffff 60%, #f8faff 100%);
          padding: 100px 24px 72px; text-align: center;
        }
        @media(min-width: 768px) { .ca-hero { padding: 188px 24px 88px; } }
        .ca-hero-blob1 { position:absolute; top:-10%; right:5%; width:440px; height:440px; border-radius:50%; background:radial-gradient(circle, rgba(29,58,143,0.07) 0%, transparent 70%); pointer-events:none; }
        .ca-hero-blob2 { position:absolute; bottom:-5%; left:3%; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle, rgba(59,91,219,0.05) 0%, transparent 70%); pointer-events:none; }
        .ca-hero-dot-grid { position:absolute; inset:0; background-image:radial-gradient(circle,rgba(29,58,143,0.06) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; }

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
        .ca-hero-grad { background: linear-gradient(135deg, #1d3a8f, #1d3a8f); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
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
          background:#1d3a8f;
          color:#fff; padding:14px 32px; border-radius:12px;
          font-size:15px; font-weight:700; text-decoration:none; border:none; cursor:pointer;
          box-shadow:0 4px 20px rgba(29,58,143,0.28);
          transition:all .25s cubic-bezier(.16,1,.3,1);
        }
        .ca-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(29,58,143,0.38); }
        .ca-btn-secondary {
          display:inline-flex; align-items:center; gap:7px;
          background:white; color:#1d3a8f; padding:14px 28px; border-radius:12px;
          font-size:14px; font-weight:700; text-decoration:none; border:1.5px solid #dde5ff;
          box-shadow:0 2px 8px rgba(29,58,143,0.06); transition:all .25s;
        }
        .ca-btn-secondary:hover { border-color:#1d3a8f; background:#f8faff; }

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
        .ca-ticker { background:white; border-top:1px solid #f1f5f9; border-bottom:1px solid #f1f5f9; padding:12px 0; overflow:hidden; }
        .ca-ticker-track { display:flex; gap:0; width:max-content; animation:ca-marquee 32s linear infinite; }
        .ca-ticker-item { display:inline-flex; align-items:center; gap:8px; padding:0 28px; font-size:12px; font-weight:700; color:#334155; white-space:nowrap; }
        .ca-ticker-dot { width:4px; height:4px; border-radius:50%; background:#dde5ff; }

        /* ── SECTIONS ── */
        .ca-inner { max-width:1100px; margin:0 auto; padding:0 24px; }
        .ca-sec { padding:80px 24px; }
        .ca-sec-alt { padding:80px 24px; background:#f8faff; }
        .ca-sec-blue { padding:80px 24px; background:linear-gradient(180deg,#ffffff 0%,#ffffff 100%); }

        .ca-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.08em; text-transform:uppercase; margin-bottom:14px; }
        .ca-eyebrow-line { display:inline-block; width:20px; height:2px; background:#1d3a8f; border-radius:2px; }
        .ca-sec-title { font-size:clamp(26px,3.5vw,42px); font-weight:900; color:#0f172a; letter-spacing:-0.035em; line-height:1.1; margin-bottom:14px; }
        .ca-sec-sub { font-size:16px; color:#64748b; line-height:1.75; max-width:560px; }

        /* ── ACTIVITIES ── */
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
          width:36px; height:36px; border-radius:10px; background:#eef2ff;
          border:1.5px solid #c7d2fe; color:#1d3a8f;
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
        .ca-process-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#1d3a8f,#1d3a8f); }
        .ca-process-num {
          width:44px; height:44px; border-radius:12px;
          background:linear-gradient(135deg,#1d3a8f,#1d3a8f);
          color:white; font-size:18px; font-weight:900;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:20px; box-shadow:0 4px 12px rgba(29,58,143,0.25);
        }
        .ca-process-title { font-size:17px; font-weight:800; color:#0f172a; margin-bottom:8px; letter-spacing:-0.02em; }
        .ca-process-desc { font-size:13px; color:#64748b; line-height:1.7; }

        /* ── PERKS ── */
        .ca-perks-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:48px; }
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
          background:#eef2ff; border:1.5px solid #c7d2fe;
          display:flex; align-items:center; justify-content:center; margin-bottom:14px;
        }
        .ca-perk-title { font-size:15px; font-weight:800; color:#0f172a; margin-bottom:6px; letter-spacing:-0.02em; }
        .ca-perk-desc { font-size:12px; color:#64748b; line-height:1.65; }

        /* ── WHO CAN APPLY ── */
        .ca-who-layout { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; max-width:1100px; margin:0 auto; padding:0 24px; }
        @media(max-width:700px) { .ca-who-layout { grid-template-columns:1fr; gap:32px; } }
        .ca-who-list { display:flex; flex-direction:column; gap:14px; }
        .ca-who-item { display:flex; align-items:flex-start; gap:14px; background:white; border:1.5px solid #eaecf4; border-radius:14px; padding:16px 18px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
        .ca-who-check { width:22px; height:22px; border-radius:7px; flex-shrink:0; margin-top:1px; background:linear-gradient(135deg,#1d3a8f,#1d3a8f); display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(29,58,143,0.2); }
        .ca-who-text { font-size:14px; color:#334155; line-height:1.6; font-weight:500; }

        /* ── FORM ── */
        .ca-form-section { background:linear-gradient(180deg,#ffffff 0%,#ffffff 100%); padding:80px 24px; position:relative; overflow:hidden; }
        .ca-form-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1.15fr; gap:64px; align-items:start; }
        @media(max-width:860px) { .ca-form-inner { grid-template-columns:1fr; } }

        .ca-form-left-eyebrow { display:inline-flex; align-items:center; gap:7px; font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.08em; text-transform:uppercase; margin-bottom:16px; }
        .ca-form-left-h2 { font-size:clamp(26px,3vw,38px); font-weight:900; color:#0f172a; letter-spacing:-0.035em; line-height:1.1; margin-bottom:14px; }
        .ca-form-left-sub { font-size:15px; color:#64748b; line-height:1.75; margin-bottom:36px; }

        .ca-step { display:flex; align-items:flex-start; gap:16px; margin-bottom:20px; }
        .ca-step-num { width:36px; height:36px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,#1d3a8f,#1d3a8f); color:white; font-size:14px; font-weight:900; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(29,58,143,0.22); }
        .ca-step-title { font-size:14px; font-weight:800; color:#0f172a; margin-bottom:3px; }
        .ca-step-desc { font-size:13px; color:#64748b; line-height:1.6; }

        .ca-form-box { background:white; border-radius:24px; border:1.5px solid #dde5ff; padding:36px 36px 32px; box-shadow:0 8px 40px rgba(29,58,143,0.1); }
        .ca-form-title { font-size:18px; font-weight:900; color:#0f172a; margin-bottom:6px; letter-spacing:-0.02em; }
        .ca-form-sub { font-size:13px; color:#64748b; margin-bottom:24px; line-height:1.6; }
        .ca-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
        @media(max-width:540px) { .ca-form-row { grid-template-columns:1fr; } }
        .ca-form-group { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
        .ca-form-group-last { margin-bottom:0; }
        .ca-form-label { font-size:12px; font-weight:700; color:#334155; }
        .ca-form-input {
          width:100%; padding:11px 14px; border-radius:10px;
          border:1.5px solid #e2e8f0; font-size:14px; color:#0f172a;
          outline:none; transition:border-color .15s, box-shadow .15s;
          background:white; font-family:inherit;
        }
        .ca-form-input:focus { border-color:#1d3a8f; box-shadow:0 0 0 3px rgba(29,58,143,0.1); }
        .ca-form-input::placeholder { color:#94a3b8; }
        .ca-form-select {
          width:100%; padding:11px 14px; border-radius:10px;
          border:1.5px solid #e2e8f0; font-size:14px; color:#0f172a;
          outline:none; background:white; font-family:inherit; cursor:pointer;
          transition:border-color .15s, box-shadow .15s; appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 14px center;
        }
        .ca-form-select:focus { border-color:#1d3a8f; box-shadow:0 0 0 3px rgba(29,58,143,0.1); }
        .ca-form-textarea {
          width:100%; padding:11px 14px; border-radius:10px;
          border:1.5px solid #e2e8f0; font-size:14px; color:#0f172a;
          outline:none; resize:vertical; min-height:100px; line-height:1.6;
          font-family:inherit; transition:border-color .15s, box-shadow .15s;
        }
        .ca-form-textarea:focus { border-color:#1d3a8f; box-shadow:0 0 0 3px rgba(29,58,143,0.1); }
        .ca-form-textarea::placeholder { color:#94a3b8; }
        .ca-form-hint { font-size:11px; color:#94a3b8; margin-top:2px; }
        .ca-form-error { font-size:13px; color:#dc2626; margin-bottom:12px; padding:10px 14px; background:#fef2f2; border-radius:8px; border:1px solid #fecaca; }
        .ca-form-submit {
          width:100%; padding:14px; border-radius:12px;
          background:#1d3a8f; color:white;
          font-size:15px; font-weight:700; border:none; cursor:pointer;
          box-shadow:0 4px 16px rgba(29,58,143,0.28);
          transition:opacity .2s, transform .2s; margin-top:8px;
        }
        .ca-form-submit:hover:not(:disabled) { opacity:.92; transform:translateY(-1px); }
        .ca-form-submit:disabled { opacity:.6; cursor:not-allowed; }
        .ca-form-divider { height:1px; background:#f1f5f9; margin:18px 0; }

        .ca-form-success { display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:14px; padding:48px 36px !important; }
        .ca-form-success-icon { width:56px; height:56px; border-radius:16px; background:linear-gradient(135deg,#dcfce7,#bbf7d0); display:flex; align-items:center; justify-content:center; }
        .ca-form-success h3 { font-size:22px; font-weight:900; color:#0f172a; }
        .ca-form-success p { font-size:14px; color:#64748b; line-height:1.7; max-width:300px; }

        /* ── CTA BANNER ── */
        .ca-cta-banner { background:linear-gradient(135deg,#0f2060,#1d3a8f 50%,#1d3a8f); padding:72px 24px; text-align:center; }
        .ca-cta-h2 { font-size:clamp(28px,4vw,48px); font-weight:900; color:white; letter-spacing:-0.04em; line-height:1.1; margin-bottom:14px; }
        .ca-cta-sub { font-size:16px; color:rgba(255,255,255,0.75); margin-bottom:36px; max-width:500px; margin-left:auto; margin-right:auto; line-height:1.7; }
        .ca-cta-btn { display:inline-flex; align-items:center; gap:9px; background:white; color:#1d3a8f; padding:15px 36px; border-radius:12px; font-size:15px; font-weight:800; text-decoration:none; border:none; cursor:pointer; box-shadow:0 4px 20px rgba(0,0,0,0.2); transition:all .25s; }
        .ca-cta-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,0,0,0.3); }

        @media(max-width:860px) {
          .ca-hero { padding:164px 20px 64px; }
          .ca-sec, .ca-sec-alt, .ca-sec-blue, .ca-form-section { padding:56px 20px; }
          .ca-inner { padding:0 20px; }
          .ca-who-layout { padding:0 20px; }
        }
        @media(max-width:640px) {
          .ca-hero { padding:164px 16px 56px; }
          .ca-sec, .ca-sec-alt, .ca-sec-blue, .ca-form-section { padding:44px 16px; }
          .ca-inner { padding:0 16px; }
          .ca-who-layout { padding:0 16px; }
          .ca-hero-sub { font-size:15px; }
          .ca-btn-primary, .ca-btn-secondary { width:100%; justify-content:center; padding:14px 20px; }
          .ca-hero-actions { flex-direction:column; align-items:stretch; width:100%; max-width:320px; margin:0 auto; }
          .ca-roles-grid { margin-top:32px; gap:12px; }
          .ca-process { margin-top:32px; }
          .ca-form-inner { gap:32px; }
          .ca-form-box { padding:24px 20px 20px; }
          .ca-hero-stats { display:grid; grid-template-columns:1fr 1fr; width:100%; max-width:320px; }
          .ca-stat { border-right:1px solid #f1f5f9; border-bottom:1px solid #f1f5f9; padding:14px 0; }
        }
      `}</style>

      <Navbar />
      <div className="ca">

        {/* ── HERO ── */}
        <section className="ca-hero">
          <div className="ca-hero-blob1" />
          <div className="ca-hero-blob2" />
          <div className="ca-hero-dot-grid" />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="ca-hero-badge">
              <span className="ca-hero-dot" />
              <span className="ca-hero-badge-text">Founding Batch Open — Apply Now</span>
            </div>

            <h1 className="ca-hero-h1">
              Lead <span className="ca-hero-grad">Jobingen Club</span><br />at Your College
            </h1>

            <p className="ca-hero-sub">
              Be the official Jobingen Club President on your campus. Host hackathons, run AI workshops,
              drive interview prep, and build a placement-ready community — with full Jobingen support.
            </p>

            <div className="ca-hero-actions">
              <button className="ca-btn-primary" onClick={scrollToForm}>
                Apply as Club President
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <a className="ca-btn-secondary" href="#what-you-do">
                See What You&apos;ll Do
              </a>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="ca-hero-stats">
                <div className="ca-stat"><div className="ca-stat-val">50+</div><div className="ca-stat-label">Target Colleges</div></div>
                <div className="ca-stat"><div className="ca-stat-val">15+</div><div className="ca-stat-label">Industry Mentors</div></div>
                <div className="ca-stat"><div className="ca-stat-val">6</div><div className="ca-stat-label">Cities Wave 1</div></div>
                <div className="ca-stat"><div className="ca-stat-val">Free</div><div className="ca-stat-label">For All Members</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="ca-ticker">
          <div className="ca-ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="ca-ticker-item">
                <span className="ca-ticker-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── WHAT YOU'LL DO ── */}
        <section className="ca-sec" id="what-you-do">
          <div className="ca-inner">
            <Reveal>
              <div className="ca-eyebrow"><span className="ca-eyebrow-line" />Your Role</div>
              <h2 className="ca-sec-title">What You&apos;ll Do as Club President</h2>
              <p className="ca-sec-sub">
                Jobingen Club is not a title — it is a real leadership role with real impact on your campus and your career.
              </p>
            </Reveal>
            <div className="ca-roles-grid">
              {ACTIVITIES.map((a, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="ca-role-card">
                    <div className="ca-role-num">{String(i + 1).padStart(2, "0")}</div>
                    <div className="ca-role-title">{a.title}</div>
                    <div className="ca-role-desc">{a.desc}</div>
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
              <div className="ca-eyebrow"><span className="ca-eyebrow-line" />The Process</div>
              <h2 className="ca-sec-title">How It Works</h2>
              <p className="ca-sec-sub">Simple 3-step process — apply, get selected, and launch your club with Jobingen&apos;s full support.</p>
            </Reveal>
            <div className="ca-process">
              {STEPS.map((s, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="ca-process-card">
                    <div className="ca-process-num">{s.num}</div>
                    <div className="ca-process-title">{s.title}</div>
                    <div className="ca-process-desc">{s.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PERKS ── */}
        <section className="ca-sec">
          <div className="ca-inner">
            <Reveal>
              <div className="ca-eyebrow"><span className="ca-eyebrow-line" />What You Get</div>
              <h2 className="ca-sec-title">Perks for Club Presidents</h2>
              <p className="ca-sec-sub">This is not just a role — it is a career accelerator. Every benefit is real, tangible, and directly tied to your growth.</p>
            </Reveal>
            <div className="ca-perks-grid">
              {PERKS.map((p, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="ca-perk-card">
                    <div className="ca-perk-icon">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#1d3a8f"/></svg>
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
        <section className="ca-sec-blue">
          <div className="ca-who-layout">
            <Reveal>
              <div>
                <div className="ca-eyebrow"><span className="ca-eyebrow-line" />Eligibility</div>
                <h2 className="ca-sec-title">Who Can Apply?</h2>
                <p className="ca-sec-sub" style={{ marginBottom: 0 }}>
                  We are looking for students who already make things happen on their campus — not just title-collectors.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="ca-who-list">
                {ELIGIBILITY.map((item, i) => (
                  <div key={i} className="ca-who-item">
                    <div className="ca-who-check">
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="ca-who-text">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── APPLICATION FORM ── */}
        <section className="ca-form-section" ref={formRef}>
          <div className="ca-form-inner">
            {/* Left */}
            <div>
              <div className="ca-form-left-eyebrow">
                <span style={{ display: "inline-block", width: 20, height: 2, background: "#1d3a8f", borderRadius: 2 }} />
                Apply Now
              </div>
              <h2 className="ca-form-left-h2">Apply to Lead Jobingen Club at Your College</h2>
              <p className="ca-form-left-sub">
                Fill this form and our team will reach out within 48 hours. We review every application personally.
              </p>

            </div>

            {/* Right — Form */}
            <div>
              {submitted ? (
                <div className="ca-form-box ca-form-success">
                  <div className="ca-form-success-icon">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3>Application Received!</h3>
                  <p>Our team will review your application and reach out within 48 hours. Check your email.</p>
                </div>
              ) : (
                <form className="ca-form-box" onSubmit={handleSubmit}>
                  <div className="ca-form-title">Club President Application</div>
                  <div className="ca-form-sub">Founding batch — limited spots per city</div>

                  {error && <div className="ca-form-error">{error}</div>}

                  {/* Row 1 */}
                  <div className="ca-form-row">
                    <div className="ca-form-group">
                      <label className="ca-form-label">Full Name *</label>
                      <input className="ca-form-input" placeholder="Rahul Sharma" value={form.name} onChange={set("name")} required />
                    </div>
                    <div className="ca-form-group">
                      <label className="ca-form-label">Email *</label>
                      <input className="ca-form-input" type="email" placeholder="rahul@college.edu" value={form.email} onChange={set("email")} required />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="ca-form-row">
                    <div className="ca-form-group">
                      <label className="ca-form-label">Phone *</label>
                      <input className="ca-form-input" placeholder="9876543210" value={form.phone} onChange={set("phone")} required />
                    </div>
                    <div className="ca-form-group">
                      <label className="ca-form-label">City *</label>
                      <input className="ca-form-input" placeholder="Delhi / Bangalore / Pune..." value={form.city} onChange={set("city")} required />
                    </div>
                  </div>

                  {/* College */}
                  <div className="ca-form-group">
                    <label className="ca-form-label">College / University *</label>
                    <input className="ca-form-input" placeholder="Full college name" value={form.college} onChange={set("college")} required />
                  </div>

                  {/* Row 3 */}
                  <div className="ca-form-row">
                    <div className="ca-form-group">
                      <label className="ca-form-label">Year of Study *</label>
                      <select className="ca-form-select" value={form.year} onChange={set("year")} required>
                        <option value="">Select year</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div className="ca-form-group">
                      <label className="ca-form-label">Degree *</label>
                      <input className="ca-form-input" placeholder="e.g. B.Tech, BCA, MBA, B.Sc…" value={form.degree} onChange={set("degree")} required />
                    </div>
                  </div>

                  <div className="ca-form-divider" />

                  {/* Row 4 */}
                  <div className="ca-form-row">
                    <div className="ca-form-group">
                      <label className="ca-form-label">LinkedIn</label>
                      <input className="ca-form-input" placeholder="linkedin.com/in/..." value={form.linkedin} onChange={set("linkedin")} />
                    </div>
                    <div className="ca-form-group">
                      <label className="ca-form-label">Instagram</label>
                      <input className="ca-form-input" placeholder="@yourhandle" value={form.instagram} onChange={set("instagram")} />
                    </div>
                  </div>

                  {/* Current Role */}
                  <div className="ca-form-group">
                    <label className="ca-form-label">Current Club / Position on Campus</label>
                    <input className="ca-form-input" placeholder="E.g. GDSC Lead, E-Cell Co-founder, Coding Club President..." value={form.campus_role} onChange={set("campus_role")} />
                    <span className="ca-form-hint">Leave blank if you don't currently hold any position</span>
                  </div>

                  {/* Why */}
                  <div className="ca-form-group ca-form-group-last">
                    <label className="ca-form-label">Why do you want to lead Jobingen Club at your college? *</label>
                    <textarea className="ca-form-textarea" placeholder="Tell us about your college's placement challenges, what you'd do differently, and why you're the right person..." value={form.why_lead} onChange={set("why_lead")} required />
                  </div>

                  <button className="ca-form-submit" type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Application →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="ca-cta-banner">
          <Reveal>
            <h2 className="ca-cta-h2">Your Campus. Your Club. Your Career.</h2>
            <p className="ca-cta-sub">
              Founding batch spots are limited. The first 50 applicants who qualify get priority selection and the full founding member kit.
            </p>
            <button className="ca-cta-btn" onClick={scrollToForm}>
              Apply Now — It&apos;s Free
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </Reveal>
        </section>

      </div>
      <Footer />
    </>
  )
}
