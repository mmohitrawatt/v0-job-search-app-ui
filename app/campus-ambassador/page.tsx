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

export default function CampusAmbassadorPage() {
  const [form, setForm] = useState({
    name: "", college: "", course_year: "", email: "",
    phone: "", linkedin: "", instagram: "", why_ambassador: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/campus-ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong."); return }
      setSubmitted(true)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const doItems = [
    {
      title: "Represent Jobingen",
      desc: "Be the official face of Jobingen on your campus. Build awareness, run activations, and be the go-to person for students exploring career opportunities.",
      color: "#1d3a8f", bg: "#eef2ff",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
    },
    {
      title: "Share AI Career Tools",
      desc: "Introduce students to AI-powered resume builders, mock interview tools, and smart job matching — tools that actually change outcomes.",
      color: "#059669", bg: "#ecfdf5",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    },
    {
      title: "Promote Events",
      desc: "Spread the word about Jobingen bootcamps, hackathons, and career workshops before they open to the public.",
      color: "#d97706", bg: "#fffbeb",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
    },
    {
      title: "Build Community",
      desc: "Grow the Jobingen student network at your college — connecting your peers with real internships, mentors, and career paths.",
      color: "#7c3aed", bg: "#f5f3ff",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6"/><path d="M17 14c1.657 0 3 1.343 3 3"/></svg>,
    },
  ]

  const perks = [
    { title: "Verified Certificate", desc: "A Jobingen-issued certificate to showcase your leadership, community building, and campus impact on your resume and LinkedIn.", color: "#1d3a8f", bg: "#eef2ff", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M9 21l3-3 3 3V14a5 5 0 01-6 0v7z"/></svg> },
    { title: "Internship Access", desc: "Top-performing ambassadors get priority consideration for internship roles within Jobingen.", color: "#059669", bg: "#ecfdf5", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg> },
    { title: "Exclusive AI Workshops", desc: "Invite-only access to AI and career tech workshops before they go public.", color: "#d97706", bg: "#fffbeb", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg> },
    { title: "Leadership Portfolio", desc: "Real campaigns, real events, real impact — everything you lead becomes a powerful portfolio piece.", color: "#7c3aed", bg: "#f5f3ff", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/></svg> },
    { title: "Founder Network", desc: "Direct access to Jobingen's founder circle, senior engineers, and a curated network of hiring managers.", color: "#0284c7", bg: "#f0f9ff", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#0284c7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M12 11l-5.5 6M12 11l5.5 6"/></svg> },
    { title: "Ambassador Perks", desc: "Exclusive swag, early product access, referral bonuses, and growing rewards as you build impact.", color: "#059669", bg: "#ecfdf5", icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg> },
  ]

  const eligibility = [
    "Currently enrolled in any college or university in India",
    "Passionate about technology, AI, startups, or career development",
    "Active on campus with good communication and networking skills",
    "Self-motivated and ready to create real impact in your college community",
  ]

  return (
    <>
      <style>{`
        .ca * { box-sizing: border-box; margin: 0; padding: 0; }
        .ca {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #0f172a; background: #fff; overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .ca-reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
        }
        .ca-visible { opacity: 1 !important; transform: none !important; }

        @keyframes ca-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        @keyframes ca-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ca-grad { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes ca-fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @keyframes ca-orb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-25px)} }
        @keyframes ca-orb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,30px)} }

        /* ── HERO ── */
        .ca-hero {
          position: relative; overflow: hidden;
          background: linear-gradient(160deg, #f0f4ff 0%, #eaefff 50%, #f8faff 100%);
          padding: 72px 40px 80px;
        }
        .ca-hero::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image: radial-gradient(rgba(29,58,143,.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .ca-orb1 {
          position:absolute; top:-120px; left:-80px; width:600px; height:600px; border-radius:50%;
          background: radial-gradient(circle, rgba(29,58,143,.13) 0%, transparent 65%);
          filter:blur(60px); pointer-events:none; animation: ca-orb1 18s ease-in-out infinite;
        }
        .ca-orb2 {
          position:absolute; bottom:-100px; right:-60px; width:500px; height:500px; border-radius:50%;
          background: radial-gradient(circle, rgba(59,91,219,.09) 0%, transparent 65%);
          filter:blur(50px); pointer-events:none; animation: ca-orb2 24s ease-in-out infinite;
        }
        .ca-hero-layout {
          position:relative; z-index:1; max-width:1100px; margin:0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
        }
        .ca-hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,.85); backdrop-filter:blur(12px);
          border:1px solid rgba(29,58,143,.14); padding:7px 16px; border-radius:99px;
          font-size:13px; font-weight:600; color:#1d3a8f; margin-bottom:28px;
          box-shadow:0 2px 12px rgba(29,58,143,.08);
          animation: ca-fade-up .7s cubic-bezier(.16,1,.3,1) both;
        }
        .ca-hero-dot { width:7px; height:7px; background:#22c55e; border-radius:50%; box-shadow:0 0 7px rgba(34,197,94,.5); animation:ca-pulse 2s infinite; }
        .ca-hero-h1 {
          font-size: clamp(38px, 4.5vw, 58px); font-weight:900; letter-spacing:-2.5px;
          line-height:1.06; color:#0f172a; margin-bottom:22px;
          animation: ca-fade-up .8s cubic-bezier(.16,1,.3,1) .08s both;
        }
        .ca-hero-grad {
          background: linear-gradient(135deg, #1d3a8f 0%, #3b5bdb 50%, #4f72f5 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          background-size:200% auto; animation: ca-grad 5s ease-in-out infinite;
        }
        .ca-hero-sub {
          font-size:17px; color:#475569; line-height:1.75; max-width:460px; margin-bottom:36px;
          animation: ca-fade-up .9s cubic-bezier(.16,1,.3,1) .16s both;
        }
        .ca-hero-actions {
          display:flex; align-items:center; gap:16px; flex-wrap:wrap;
          animation: ca-fade-up 1s cubic-bezier(.16,1,.3,1) .24s both;
        }
        .ca-cta-primary {
          display:inline-flex; align-items:center; gap:9px;
          background: linear-gradient(135deg, #1d3a8f, #3b5bdb);
          color:#fff; padding:15px 36px; border-radius:12px;
          font-size:15px; font-weight:700; text-decoration:none;
          box-shadow:0 4px 20px rgba(29,58,143,.3);
          transition:all .3s cubic-bezier(.16,1,.3,1);
        }
        .ca-cta-primary:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(29,58,143,.42); }
        .ca-cta-sec {
          font-size:14px; font-weight:600; color:#475569; text-decoration:none;
          display:inline-flex; align-items:center; gap:5px; transition:color .2s;
        }
        .ca-cta-sec:hover { color:#1d3a8f; }
        .ca-hero-note {
          font-size:12px; color:#94a3b8; margin-top:18px;
          animation: ca-fade-up 1s cubic-bezier(.16,1,.3,1) .32s both;
        }

        /* Right side — program card */
        .ca-hero-card {
          background:white; border-radius:24px; border:1.5px solid #e0e7ff;
          box-shadow:0 8px 48px rgba(29,58,143,.1), 0 1px 0 rgba(255,255,255,.8) inset;
          overflow:hidden; animation: ca-fade-up .9s cubic-bezier(.16,1,.3,1) .12s both;
        }
        .ca-hero-card-top {
          background: linear-gradient(135deg, #1d3a8f 0%, #3b5bdb 100%);
          padding:28px 28px 24px; position:relative; overflow:hidden;
        }
        .ca-hero-card-top::after {
          content:''; position:absolute; inset:0;
          background: radial-gradient(circle at 80% 20%, rgba(255,255,255,.08) 0%, transparent 60%);
        }
        .ca-hero-card-label {
          font-size:11px; font-weight:700; color:rgba(255,255,255,.6);
          letter-spacing:.08em; text-transform:uppercase; margin-bottom:8px;
        }
        .ca-hero-card-title { font-size:22px; font-weight:900; color:#fff; letter-spacing:-.5px; margin-bottom:14px; }
        .ca-hero-card-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.2);
          padding:5px 12px; border-radius:99px; font-size:12px; font-weight:600; color:rgba(255,255,255,.9);
        }
        .ca-hero-card-body { padding:24px 28px; }
        .ca-hero-card-perk {
          display:flex; align-items:center; gap:12px; padding:12px 0;
          border-bottom:1px solid #f1f5f9;
        }
        .ca-hero-card-perk:last-child { border-bottom:none; padding-bottom:0; }
        .ca-hero-card-perk-icon {
          width:36px; height:36px; border-radius:10px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
        }
        .ca-hero-card-perk-text { font-size:13.5px; font-weight:600; color:#0f172a; }
        .ca-hero-card-perk-sub { font-size:11.5px; color:#64748b; margin-top:1px; }

        /* ── STATS BAR ── */
        .ca-stats-bar {
          background:#fff; border-top:1px solid #f1f5f9; border-bottom:1px solid #f1f5f9;
          padding:0 40px;
        }
        .ca-stats-inner {
          max-width:1100px; margin:0 auto;
          display:grid; grid-template-columns:repeat(4,1fr);
        }
        .ca-stat-item {
          padding:32px 24px; text-align:center;
          border-right:1px solid #f1f5f9;
        }
        .ca-stat-item:last-child { border-right:none; }
        .ca-stat-num { font-size:40px; font-weight:900; color:#1d3a8f; letter-spacing:-2px; line-height:1; margin-bottom:6px; }
        .ca-stat-label { font-size:13px; font-weight:600; color:#94a3b8; }

        /* ── SECTION SHARED ── */
        .ca-section { padding:96px 40px; background:#fff; }
        .ca-section-alt { padding:96px 40px; background:#f8faff; position:relative; }
        .ca-section-alt::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(29,58,143,.08),transparent); }
        .ca-inner { max-width:1100px; margin:0 auto; }
        .ca-eyebrow {
          display:inline-flex; align-items:center; gap:6px;
          font-size:12px; font-weight:700; color:#3b5bdb; letter-spacing:.08em; text-transform:uppercase;
          margin-bottom:14px;
        }
        .ca-eyebrow::before { content:''; width:18px; height:2px; background:#3b5bdb; border-radius:2px; }
        .ca-section-title { font-size:clamp(32px,3.5vw,44px); font-weight:900; color:#0f172a; letter-spacing:-1.8px; line-height:1.1; margin-bottom:14px; }
        .ca-section-sub { font-size:17px; color:#475569; line-height:1.7; max-width:520px; }

        /* ── BENTO — WHAT YOU DO ── */
        .ca-bento {
          display:grid;
          grid-template-columns:1.1fr 1fr;
          grid-template-rows:auto auto;
          gap:16px; margin-top:52px;
        }
        .ca-bento-main {
          grid-row:1/3; background:#fff; border-radius:22px;
          border:1.5px solid #e0e7ff; padding:36px 32px;
          box-shadow:0 2px 20px rgba(29,58,143,.05);
          transition:all .3s cubic-bezier(.16,1,.3,1);
          display:flex; flex-direction:column;
        }
        .ca-bento-main:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(29,58,143,.1); border-color:rgba(59,91,219,.2); }
        .ca-bento-card {
          background:#fff; border-radius:22px;
          border:1.5px solid #e0e7ff; padding:28px;
          box-shadow:0 2px 20px rgba(29,58,143,.05);
          transition:all .3s cubic-bezier(.16,1,.3,1);
        }
        .ca-bento-card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(29,58,143,.1); border-color:rgba(59,91,219,.2); }
        .ca-bento-icon {
          width:52px; height:52px; border-radius:15px;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:20px; flex-shrink:0;
        }
        .ca-bento-title { font-size:18px; font-weight:800; color:#0f172a; letter-spacing:-.3px; margin-bottom:10px; }
        .ca-bento-main .ca-bento-title { font-size:22px; margin-bottom:14px; }
        .ca-bento-desc { font-size:14px; color:#475569; line-height:1.7; }
        .ca-bento-main .ca-bento-desc { font-size:15px; }
        .ca-bento-tag {
          display:inline-flex; align-items:center; gap:5px; margin-top:auto; padding-top:20px;
          font-size:12px; font-weight:700; letter-spacing:.04em; text-transform:uppercase;
        }

        /* ── PROCESS ── */
        .ca-process { display:grid; grid-template-columns:repeat(3,1fr); gap:0; margin-top:56px; position:relative; }
        .ca-process::before {
          content:''; position:absolute; top:27px; left:calc(16.66% + 28px); right:calc(16.66% + 28px);
          height:1px; background:linear-gradient(90deg,#c7d2fe,#e0e7ff,#c7d2fe);
          border-top:2px dashed #c7d2fe; pointer-events:none;
        }
        .ca-process-item { text-align:center; padding:0 32px; }
        .ca-process-num {
          width:56px; height:56px; border-radius:50%; margin:0 auto 20px;
          background:linear-gradient(135deg, #1d3a8f, #3b5bdb);
          display:flex; align-items:center; justify-content:center;
          font-size:20px; font-weight:900; color:#fff;
          box-shadow:0 4px 16px rgba(29,58,143,.22); position:relative; z-index:1;
        }
        .ca-process-title { font-size:18px; font-weight:800; color:#0f172a; margin-bottom:8px; }
        .ca-process-desc { font-size:14px; color:#64748b; line-height:1.6; }

        /* ── PERKS BENTO ── */
        .ca-perks-featured {
          background: linear-gradient(135deg, #eef2ff 0%, #e8edff 100%);
          border:1.5px solid #c7d2fe; border-radius:22px; padding:36px 40px;
          display:grid; grid-template-columns:auto 1fr; gap:28px; align-items:center;
          margin-bottom:16px;
          transition:all .3s cubic-bezier(.16,1,.3,1);
        }
        .ca-perks-featured:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(29,58,143,.12); }
        .ca-perks-featured-icon {
          width:72px; height:72px; border-radius:20px; background:white;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
          box-shadow:0 4px 16px rgba(29,58,143,.1);
        }
        .ca-perks-featured-label { font-size:12px; font-weight:700; color:#3b5bdb; letter-spacing:.07em; text-transform:uppercase; margin-bottom:6px; }
        .ca-perks-featured-title { font-size:22px; font-weight:900; color:#0f172a; letter-spacing:-.4px; margin-bottom:8px; }
        .ca-perks-featured-desc { font-size:15px; color:#475569; line-height:1.65; }
        .ca-perks-grid {
          display:grid; grid-template-columns:repeat(5,1fr); gap:12px;
        }
        .ca-perk-card {
          background:#fff; border:1.5px solid #e0e7ff; border-radius:18px; padding:24px 20px;
          box-shadow:0 2px 12px rgba(29,58,143,.04);
          transition:all .3s cubic-bezier(.16,1,.3,1); position:relative; overflow:hidden;
        }
        .ca-perk-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#1d3a8f,#3b5bdb); opacity:0; transition:opacity .25s;
        }
        .ca-perk-card:hover { transform:translateY(-5px); box-shadow:0 14px 40px rgba(29,58,143,.1); border-color:rgba(59,91,219,.2); }
        .ca-perk-card:hover::before { opacity:1; }
        .ca-perk-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
        .ca-perk-title { font-size:14px; font-weight:800; color:#0f172a; margin-bottom:6px; }
        .ca-perk-desc { font-size:12.5px; color:#64748b; line-height:1.6; }

        /* ── WHO ── */
        .ca-who-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; max-width:1100px; margin:0 auto;
        }
        .ca-who-list { display:flex; flex-direction:column; gap:10px; }
        .ca-who-item {
          display:flex; align-items:flex-start; gap:14px;
          background:#f8faff; border:1.5px solid #e0e7ff; border-radius:14px;
          padding:16px 18px; transition:all .22s;
        }
        .ca-who-item:hover { background:#eef2ff; border-color:rgba(59,91,219,.22); }
        .ca-who-check {
          width:22px; height:22px; min-width:22px; border-radius:50%;
          background:linear-gradient(135deg, #1d3a8f, #3b5bdb);
          display:flex; align-items:center; justify-content:center; margin-top:1px;
        }
        .ca-who-item span { font-size:14.5px; color:#334155; font-weight:500; line-height:1.5; }

        /* ── FORM ── */
        .ca-form-section {
          padding:96px 40px 112px; background:#060d24; position:relative; overflow:hidden;
        }
        .ca-form-mesh1 {
          position:absolute; top:-20%; left:-6%; width:560px; height:560px; border-radius:50%;
          background:radial-gradient(circle,rgba(29,58,143,.36),transparent 65%);
          filter:blur(80px); pointer-events:none; animation:ca-orb1 20s ease-in-out infinite;
        }
        .ca-form-mesh2 {
          position:absolute; bottom:-15%; right:-4%; width:460px; height:460px; border-radius:50%;
          background:radial-gradient(circle,rgba(59,91,219,.24),transparent 65%);
          filter:blur(70px); pointer-events:none; animation:ca-orb2 26s ease-in-out infinite;
        }
        .ca-form-dots {
          position:absolute; inset:0;
          background-image:radial-gradient(rgba(255,255,255,.03) 1px,transparent 1px);
          background-size:32px 32px; pointer-events:none;
        }
        .ca-form-layout {
          position:relative; z-index:1; max-width:1100px; margin:0 auto;
          display:grid; grid-template-columns:1fr 1.35fr; gap:80px; align-items:start;
        }
        .ca-form-left { padding-top:4px; }
        .ca-form-eyebrow { font-size:12px; font-weight:700; color:#818cf8; letter-spacing:.08em; text-transform:uppercase; margin-bottom:14px; }
        .ca-form-h2 { font-size:clamp(32px,3.5vw,44px); font-weight:900; color:#fff; letter-spacing:-1.8px; line-height:1.08; margin-bottom:16px; }
        .ca-form-sub { font-size:16px; color:rgba(255,255,255,.48); line-height:1.7; margin-bottom:44px; }
        .ca-form-steps { display:flex; flex-direction:column; gap:24px; }
        .ca-form-step { display:flex; align-items:flex-start; gap:14px; }
        .ca-form-step-n {
          width:34px; height:34px; min-width:34px; border-radius:50%;
          background:rgba(59,91,219,.2); border:1px solid rgba(59,91,219,.35);
          display:flex; align-items:center; justify-content:center;
          font-size:13px; font-weight:800; color:#818cf8; flex-shrink:0;
        }
        .ca-form-step h5 { font-size:14px; font-weight:700; color:#fff; margin-bottom:4px; }
        .ca-form-step p { font-size:13px; color:rgba(255,255,255,.42); line-height:1.55; }

        .ca-form-box {
          background:rgba(255,255,255,.055); border:1px solid rgba(255,255,255,.1);
          border-radius:20px; padding:36px 32px; backdrop-filter:blur(20px);
        }
        .ca-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
        .ca-form-group { display:flex; flex-direction:column; gap:6px; }
        .ca-form-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.8px; color:rgba(255,255,255,.38); }
        .ca-form-input {
          background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
          border-radius:10px; padding:13px 16px; font-size:14px; color:#fff; outline:none; transition:all .22s;
        }
        .ca-form-input::placeholder { color:rgba(255,255,255,.2); }
        .ca-form-input:focus { border-color:rgba(59,91,219,.6); background:rgba(255,255,255,.1); box-shadow:0 0 0 3px rgba(59,91,219,.14); }
        .ca-form-textarea {
          background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
          border-radius:10px; padding:13px 16px; font-size:14px; color:#fff; outline:none;
          transition:all .22s; resize:vertical; min-height:100px; line-height:1.55;
        }
        .ca-form-textarea::placeholder { color:rgba(255,255,255,.2); }
        .ca-form-textarea:focus { border-color:rgba(59,91,219,.6); background:rgba(255,255,255,.1); box-shadow:0 0 0 3px rgba(59,91,219,.14); }
        .ca-form-hint { font-size:11px; color:rgba(255,255,255,.26); margin-top:4px; }
        .ca-form-submit {
          width:100%; background:linear-gradient(135deg,#1d3a8f,#3b5bdb);
          color:#fff; border:none; padding:15px 0; border-radius:12px;
          font-size:15px; font-weight:700; cursor:pointer;
          box-shadow:0 4px 20px rgba(29,58,143,.4); transition:all .3s cubic-bezier(.16,1,.3,1);
          margin-top:8px; position:relative; overflow:hidden;
        }
        .ca-form-submit::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom,rgba(255,255,255,.13),transparent 55%); pointer-events:none; }
        .ca-form-submit:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(29,58,143,.55); }
        .ca-form-submit:disabled { opacity:.55; cursor:wait; transform:none; }
        .ca-form-error { font-size:13px; color:#f87171; font-weight:600; margin-top:12px; text-align:center; }
        .ca-form-success { text-align:center; padding:52px 24px; }
        .ca-form-success-check { width:72px; height:72px; border-radius:50%; background:rgba(34,197,94,.12); border:2px solid rgba(34,197,94,.25); display:flex; align-items:center; justify-content:center; margin:0 auto 24px; }
        .ca-form-success h3 { font-size:26px; font-weight:900; color:#fff; letter-spacing:-.5px; margin-bottom:12px; }
        .ca-form-success p { font-size:15px; color:rgba(255,255,255,.45); line-height:1.65; max-width:380px; margin:0 auto 28px; }
        .ca-form-success-back {
          display:inline-flex; align-items:center; gap:7px;
          background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12);
          color:#fff; padding:11px 22px; border-radius:10px; font-size:14px; font-weight:600; text-decoration:none; transition:all .2s;
        }
        .ca-form-success-back:hover { background:rgba(255,255,255,.14); }

        /* ── RESPONSIVE ── */
        @media(max-width:1024px){
          .ca-hero-layout { grid-template-columns:1fr; gap:48px; }
          .ca-hero-card { display:none; }
          .ca-hero-sub { max-width:100%; }
          .ca-stats-inner { grid-template-columns:repeat(2,1fr); }
          .ca-stat-item:nth-child(2) { border-right:none; }
          .ca-bento { grid-template-columns:1fr; }
          .ca-bento-main { grid-row:auto; }
          .ca-perks-grid { grid-template-columns:repeat(3,1fr); }
          .ca-who-grid { grid-template-columns:1fr; gap:40px; }
          .ca-form-layout { grid-template-columns:1fr; gap:52px; }
        }
        @media(max-width:768px){
          .ca-hero { padding:60px 20px 56px; }
          .ca-hero-h1 { font-size:36px; letter-spacing:-1.6px; }
          .ca-hero-sub { font-size:15px; }
          .ca-section, .ca-section-alt { padding:68px 20px; }
          .ca-who-section-wrap { padding:68px 20px; }
          .ca-form-section { padding:68px 20px 88px; }
          .ca-stats-bar { padding:0 20px; }
          .ca-stat-num { font-size:32px; }
          .ca-section-title { font-size:28px; letter-spacing:-1.2px; }
          .ca-section-sub { font-size:15px; }
          .ca-bento { gap:12px; }
          .ca-process { grid-template-columns:1fr; gap:32px; }
          .ca-process::before { display:none; }
          .ca-perks-featured { grid-template-columns:1fr; }
          .ca-perks-featured-icon { width:56px; height:56px; }
          .ca-perks-grid { grid-template-columns:repeat(2,1fr); gap:10px; }
          .ca-form-box { padding:24px 18px; }
          .ca-form-row { grid-template-columns:1fr; gap:10px; margin-bottom:10px; }
          .ca-form-input, .ca-form-textarea { font-size:16px; }
          .ca-form-h2 { font-size:30px; }
        }
        @media(max-width:480px){
          .ca-hero { padding:52px 16px 48px; }
          .ca-hero-h1 { font-size:30px; letter-spacing:-1.2px; }
          .ca-section, .ca-section-alt { padding:56px 16px; }
          .ca-form-section { padding:56px 16px 72px; }
          .ca-stats-inner { grid-template-columns:repeat(2,1fr); }
          .ca-section-title { font-size:26px; }
          .ca-perks-grid { grid-template-columns:1fr; }
          .ca-form-box { padding:20px 14px; border-radius:16px; }
        }
      `}</style>

      <Navbar />

      <div className="ca">
        <div style={{ height: 108 }} />

        {/* ── HERO ── */}
        <section className="ca-hero">
          <div className="ca-orb1" />
          <div className="ca-orb2" />
          <div className="ca-hero-layout">

            {/* Left */}
            <div>
              <div className="ca-hero-badge">
                <span className="ca-hero-dot" />
                Applications Open · 2025 Cohort
              </div>
              <h1 className="ca-hero-h1">
                Represent Jobingen<br />
                at Your <span className="ca-hero-grad">College</span>
              </h1>
              <p className="ca-hero-sub">
                Join the Campus Ambassador Program — build your leadership profile, unlock career opportunities, and help students at your college discover the future of hiring.
              </p>
              <div className="ca-hero-actions">
                <a href="#apply" className="ca-cta-primary">
                  Apply Now
                  <svg width="15" height="15" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="#perks" className="ca-cta-sec">
                  See what you get
                  <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
              <p className="ca-hero-note">Free to apply · No prior experience needed</p>
            </div>

            {/* Right — Program Card */}
            <div className="ca-hero-card">
              <div className="ca-hero-card-top">
                <div className="ca-hero-card-label">Ambassador Program</div>
                <div className="ca-hero-card-title">What you unlock</div>
                <span className="ca-hero-card-badge">
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  Actively selecting
                </span>
              </div>
              <div className="ca-hero-card-body">
                {[
                  { icon: "🏆", label: "Verified Certificate", sub: "From Jobingen, for your LinkedIn" },
                  { icon: "💼", label: "Internship Priority", sub: "Direct access to team roles" },
                  { icon: "🤖", label: "AI Workshop Access", sub: "Invite-only sessions" },
                  { icon: "🤝", label: "Founder Network", sub: "Connect with builders & HRs" },
                ].map(p => (
                  <div key={p.label} className="ca-hero-card-perk">
                    <div className="ca-hero-card-perk-icon" style={{ background: "#f8faff" }}>
                      <span style={{ fontSize: 18 }}>{p.icon}</span>
                    </div>
                    <div>
                      <div className="ca-hero-card-perk-text">{p.label}</div>
                      <div className="ca-hero-card-perk-sub">{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="ca-stats-bar">
          <div className="ca-stats-inner">
            {[
              { num: "50+", label: "Colleges Represented" },
              { num: "48h", label: "Application Response" },
              { num: "100%", label: "Certificate Guaranteed" },
              { num: "2025", label: "Active Cohort" },
            ].map((s, i) => (
              <div key={s.label} className="ca-stat-item">
                <div className="ca-stat-num">{s.num}</div>
                <div className="ca-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHAT YOU WILL DO — BENTO ── */}
        <section className="ca-section">
          <div className="ca-inner">
            <Reveal>
              <div className="ca-eyebrow">Your Role</div>
              <h2 className="ca-section-title">What you'll do as an Ambassador</h2>
              <p className="ca-section-sub">You are the bridge between Jobingen and your college community. Real work, real impact.</p>
            </Reveal>

            <div className="ca-bento">
              {/* Main large card */}
              <Reveal>
                <div className="ca-bento-main">
                  <div className="ca-bento-icon" style={{ background: doItems[0].bg }}>
                    {doItems[0].icon}
                  </div>
                  <div className="ca-bento-title">{doItems[0].title}</div>
                  <div className="ca-bento-desc">{doItems[0].desc}</div>
                  <div className="ca-bento-tag" style={{ color: doItems[0].color }}>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    Core responsibility
                  </div>
                </div>
              </Reveal>

              {/* Right column — 3 smaller cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {doItems.slice(1).map((item, i) => (
                  <Reveal key={item.title} delay={i * 70}>
                    <div className="ca-bento-card">
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                        <div className="ca-bento-icon" style={{ background: item.bg, marginBottom: 0, flexShrink: 0 }}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="ca-bento-title" style={{ fontSize: 16, marginBottom: 6 }}>{item.title}</div>
                          <div className="ca-bento-desc" style={{ fontSize: 13 }}>{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="ca-section-alt">
          <div className="ca-inner">
            <Reveal>
              <div className="ca-eyebrow">The Process</div>
              <h2 className="ca-section-title">3 steps to get started</h2>
              <p className="ca-section-sub">Simple, fast, and designed for students who are ready to lead.</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="ca-process">
                {[
                  { n: "1", title: "Apply Online", desc: "Fill out the short form — takes under 5 minutes. Tell us about yourself and your campus." },
                  { n: "2", title: "Get Selected", desc: "Our team personally reviews every application and responds within 48 hours." },
                  { n: "3", title: "Start Leading", desc: "Receive your ambassador kit, join the community, and begin making impact." },
                ].map(s => (
                  <div key={s.n} className="ca-process-item">
                    <div className="ca-process-num">{s.n}</div>
                    <div className="ca-process-title">{s.title}</div>
                    <div className="ca-process-desc">{s.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PERKS ── */}
        <section className="ca-section" id="perks">
          <div className="ca-inner">
            <Reveal>
              <div className="ca-eyebrow">Why Join</div>
              <h2 className="ca-section-title">Perks &amp; Benefits</h2>
              <p className="ca-section-sub">We invest in ambassadors who invest in their campus community.</p>
            </Reveal>

            {/* Featured perk */}
            <Reveal delay={60}>
              <div className="ca-perks-featured" style={{ marginTop: 48 }}>
                <div className="ca-perks-featured-icon">
                  {perks[0].icon}
                </div>
                <div>
                  <div className="ca-perks-featured-label">Top Benefit</div>
                  <div className="ca-perks-featured-title">{perks[0].title}</div>
                  <div className="ca-perks-featured-desc">{perks[0].desc}</div>
                </div>
              </div>
            </Reveal>

            {/* Rest 5 perks in a row */}
            <div className="ca-perks-grid">
              {perks.slice(1).map((perk, i) => (
                <Reveal key={perk.title} delay={i * 60}>
                  <div className="ca-perk-card">
                    <div className="ca-perk-icon" style={{ background: perk.bg }}>{perk.svg}</div>
                    <div className="ca-perk-title">{perk.title}</div>
                    <div className="ca-perk-desc">{perk.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO CAN APPLY ── */}
        <section className="ca-section-alt">
          <div className="ca-who-grid">
            <Reveal>
              <div>
                <div className="ca-eyebrow">Eligibility</div>
                <h2 className="ca-section-title">Who can apply</h2>
                <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.7, marginTop: 14, maxWidth: 360 }}>
                  No prior experience needed — just passion, initiative, and a genuine desire to help students around you.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="ca-who-list">
                {eligibility.map((item, i) => (
                  <div className="ca-who-item" key={i}>
                    <div className="ca-who-check">
                      <svg width="10" height="10" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FORM ── */}
        <section className="ca-form-section" id="apply">
          <div className="ca-form-mesh1" />
          <div className="ca-form-mesh2" />
          <div className="ca-form-dots" />
          <div className="ca-form-layout">

            {/* Left */}
            <div className="ca-form-left">
              <Reveal>
                <div className="ca-form-eyebrow">Apply Now</div>
                <h2 className="ca-form-h2">Ready to lead?</h2>
                <p className="ca-form-sub">Join ambassadors from 50+ colleges. We review every application personally.</p>
              </Reveal>
              <Reveal delay={80}>
                <div className="ca-form-steps">
                  {[
                    { title: "Submit your application", desc: "Takes less than 5 minutes. Tell us about yourself and your campus." },
                    { title: "Hear back in 48 hours", desc: "Our team reviews personally and follows up via email." },
                    { title: "Get onboarded & start", desc: "Receive your kit, join the community, hit the ground running." },
                  ].map((s, i) => (
                    <div key={i} className="ca-form-step">
                      <div className="ca-form-step-n">{i + 1}</div>
                      <div>
                        <h5>{s.title}</h5>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — Form */}
            <div>
              {submitted ? (
                <div className="ca-form-box ca-form-success">
                  <div className="ca-form-success-check">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3>Application Submitted!</h3>
                  <p>Thank you for applying. We'll review your application and reach out within 48 hours.</p>
                  <a href="/" className="ca-form-success-back">
                    <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
                      <textarea
                        className="ca-form-textarea"
                        placeholder="Tell us about yourself, what drives you, and how you plan to represent Jobingen at your college..."
                        value={form.why_ambassador}
                        onChange={set("why_ambassador")}
                        required
                      />
                      <span className="ca-form-hint">Be honest and specific — this is the most important part.</span>
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
