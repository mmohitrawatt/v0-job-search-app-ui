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

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`ca-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
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
    { bg: "#eef2ff", title: "Represent Jobingen", desc: "Be the official Jobingen face on your campus and build local awareness.", step: "01",
      svg: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 11l19-9-9 19-2-8-8-2z" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { bg: "#f0fdf4", title: "Share AI Career Tools", desc: "Help fellow students discover AI-powered resume, interview, and job search tools.", step: "02",
      svg: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#16a34a" strokeWidth="1.8"/><path d="M8 12h8M12 8v8" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { bg: "#fffbeb", title: "Promote Events", desc: "Spread the word about Jobingen bootcamps, hackathons, and career workshops.", step: "03",
      svg: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#d97706" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { bg: "#eef2ff", title: "Build Community", desc: "Grow the Jobingen student community and connect peers with real opportunities.", step: "04",
      svg: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="7" r="3" stroke="#1d3a8f" strokeWidth="1.8"/><circle cx="17" cy="9" r="2.5" stroke="#1d3a8f" strokeWidth="1.8"/><path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round"/><path d="M17 14c1.657 0 3 1.343 3 3" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  ]

  const perks = [
    { iconBg: "#eef2ff", title: "Official Certificate", desc: "Get a verified certificate from Jobingen to showcase your leadership on your resume and LinkedIn.",
      svg: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="5" stroke="#1d3a8f" strokeWidth="1.8"/><path d="M9 21l3-3 3 3V14a5 5 0 01-6 0v7z" stroke="#1d3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { iconBg: "#f0fdf4", title: "Internship Opportunities", desc: "High-performing ambassadors get priority access to internship roles within the Jobingen team.",
      svg: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" stroke="#16a34a" strokeWidth="1.8"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="#16a34a" strokeWidth="1.8"/><path d="M12 12v4M10 14h4" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { iconBg: "#fffbeb", title: "Exclusive AI Workshops", desc: "Attend invite-only AI and career tech workshops before they're open to the public.",
      svg: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { iconBg: "#fdf4ff", title: "Leadership Experience", desc: "Lead real campaigns, events, and community initiatives that look great on any resume.",
      svg: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke="#9333ea" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { iconBg: "#f0f9ff", title: "Network with Founders", desc: "Connect directly with startup founders, senior engineers, and hiring managers in our ecosystem.",
      svg: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2" stroke="#0284c7" strokeWidth="1.8"/><circle cx="5" cy="19" r="2" stroke="#0284c7" strokeWidth="1.8"/><circle cx="19" cy="19" r="2" stroke="#0284c7" strokeWidth="1.8"/><path d="M12 7v4M12 11l-5.5 6M12 11l5.5 6" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { iconBg: "#ecfdf5", title: "Exclusive Perks", desc: "Ambassador-only swag, early product access, referral bonuses, and more as you grow your impact.",
      svg: <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M20 12v10H4V12" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 7H2v5h20V7z" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .ca * { box-sizing: border-box; margin: 0; padding: 0; }
        .ca {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #0f172a; background: #fff; overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .ca-reveal {
          opacity: 0; transform: translateY(32px);
          transition: opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1);
        }
        .ca-visible { opacity: 1; transform: translateY(0); }

        /* ── Keyframes ── */
        @keyframes ca-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ca-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: .45; transform: scale(.75); }
        }
        @keyframes ca-grad-shift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes ca-float-1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(35px,-28px) scale(1.04); }
          66%      { transform: translate(-18px,-42px) scale(.97); }
        }
        @keyframes ca-float-2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-28px,38px) scale(.96); }
          66%      { transform: translate(22px,14px) scale(1.03); }
        }

        /* ── HERO ── */
        .ca-hero {
          position: relative; padding: 120px 32px 96px;
          text-align: center; overflow: hidden;
          background: linear-gradient(180deg, #f0f4ff 0%, #e8edff 60%, #f8faff 100%);
        }
        .ca-hero::after {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(42,78,207,.028) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 10%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 10%, transparent 70%);
          pointer-events: none;
        }
        .ca-hero-orb1 {
          position: absolute; top: -110px; left: -7%; width: 580px; height: 580px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(42,78,207,.14) 0%, rgba(59,82,240,.05) 40%, transparent 70%);
          pointer-events: none; filter: blur(56px);
          animation: ca-float-1 20s ease-in-out infinite;
        }
        .ca-hero-orb2 {
          position: absolute; bottom: -80px; right: -5%; width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,82,240,.1) 0%, transparent 70%);
          pointer-events: none; filter: blur(48px);
          animation: ca-float-2 26s ease-in-out infinite;
        }
        .ca-hero-in { position: relative; max-width: 800px; margin: 0 auto; z-index: 1; }
        .ca-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,.8); backdrop-filter: blur(16px);
          border: 1px solid rgba(42,78,207,.14); padding: 7px 18px;
          border-radius: 99px; font-size: 13px; font-weight: 600; color: #2a4ecf;
          margin-bottom: 32px; box-shadow: 0 4px 16px rgba(42,78,207,.07);
          animation: ca-fade-up .8s cubic-bezier(.16,1,.3,1) both;
        }
        .ca-hero-dot {
          width: 7px; height: 7px; background: #22c55e; border-radius: 50%;
          box-shadow: 0 0 8px rgba(34,197,94,.45); animation: ca-pulse 2s infinite;
        }
        .ca-hero h1 {
          font-size: 68px; font-weight: 900; letter-spacing: -3px;
          line-height: 1.04; margin-bottom: 24px; color: #0f172a;
          animation: ca-fade-up .9s cubic-bezier(.16,1,.3,1) .1s both;
        }
        .ca-grad {
          background: linear-gradient(135deg, #1d3a8f, #3b5bdb, #4f72f5, #3b5bdb);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; background-size: 300% auto;
          animation: ca-grad-shift 6s ease-in-out infinite;
        }
        .ca-hero-sub {
          font-size: 19px; color: #475569; line-height: 1.72;
          max-width: 540px; margin: 0 auto 40px;
          animation: ca-fade-up 1s cubic-bezier(.16,1,.3,1) .2s both;
        }
        .ca-hero-cta-wrap { animation: ca-fade-up 1s cubic-bezier(.16,1,.3,1) .3s both; }
        .ca-hero-cta {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #1d3a8f, #3b5bdb);
          color: #fff; border: none; padding: 17px 44px;
          border-radius: 14px; font-size: 16px; font-weight: 700;
          cursor: pointer; text-decoration: none; font-family: inherit;
          box-shadow: 0 4px 22px rgba(29,58,143,.32);
          transition: all .35s cubic-bezier(.16,1,.3,1);
          position: relative; overflow: hidden;
        }
        .ca-hero-cta::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,.16) 0%, transparent 60%);
          pointer-events: none;
        }
        .ca-hero-cta:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 36px rgba(29,58,143,.46); }

        /* hero stats row */
        .ca-hero-stats {
          display: inline-flex; align-items: center; gap: 10px;
          margin-top: 28px; flex-wrap: wrap; justify-content: center;
          animation: ca-fade-up 1s cubic-bezier(.16,1,.3,1) .42s both;
        }
        .ca-hero-stat-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,.72); backdrop-filter: blur(12px);
          border: 1px solid rgba(29,58,143,.12);
          padding: 6px 14px; border-radius: 99px;
          font-size: 13px; font-weight: 600; color: #1d3a8f;
          box-shadow: 0 2px 8px rgba(29,58,143,.06);
        }
        .ca-hero-stat-dot { width: 5px; height: 5px; border-radius: 50%; background: #3b5bdb; flex-shrink: 0; }

        /* ── SHARED SECTION TOKENS ── */
        .ca-section { padding: 88px 32px; background: #fff; }
        .ca-section-alt { padding: 88px 32px; background: #f8faff; position: relative; }
        .ca-section-alt::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(29,58,143,.08), transparent);
        }
        .ca-section-process { padding: 88px 32px; background: #f8faff; position: relative; }
        .ca-section-process::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(29,58,143,.08), transparent);
        }
        .ca-inner { max-width: 1080px; margin: 0 auto; }
        .ca-label {
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1.6px; color: #3b5bdb; text-align: center; margin-bottom: 10px;
        }
        .ca-title {
          font-size: 44px; font-weight: 900; letter-spacing: -2px;
          text-align: center; color: #0f172a; line-height: 1.1; margin-bottom: 14px;
        }
        .ca-sub {
          font-size: 17px; color: #475569; text-align: center;
          max-width: 520px; margin: 0 auto 56px; line-height: 1.65;
        }

        /* ── WHAT YOU WILL DO ── */
        .ca-do-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
        }
        .ca-do-card {
          background: #fff; border: 1.5px solid #e0e7ff;
          border-radius: 20px; padding: 28px 22px;
          transition: all .35s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 2px 16px rgba(29,58,143,.06);
          position: relative;
        }
        .ca-do-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(29,58,143,.12), 0 0 0 1.5px rgba(59,91,219,.12);
          border-color: rgba(59,91,219,.18);
        }
        .ca-do-icon-wrap {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; flex-shrink: 0;
        }
        .ca-do-step {
          position: absolute; top: 18px; right: 18px;
          width: 26px; height: 26px; border-radius: 50%;
          background: #f1f5f9; border: 1px solid #e2e8f0;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 800; color: #94a3b8; letter-spacing: .2px;
        }
        .ca-do-card h3 { font-size: 15px; font-weight: 800; margin-bottom: 8px; color: #0f172a; letter-spacing: -.2px; }
        .ca-do-card p { font-size: 13px; color: #475569; line-height: 1.56; }

        /* ── HOW IT WORKS ── */
        .ca-process-steps {
          display: flex; align-items: flex-start; justify-content: center; gap: 0;
          position: relative; margin-top: 16px;
        }
        .ca-process-step {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; flex: 1; max-width: 240px; position: relative;
        }
        .ca-process-connector {
          flex: 1; display: flex; align-items: center; padding-top: 28px;
          max-width: 100px;
        }
        .ca-process-connector-line {
          flex: 1; height: 1px;
          border-top: 2px dashed #c7d2fe;
        }
        .ca-process-num {
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, #1d3a8f, #3b5bdb);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 900; color: #fff;
          box-shadow: 0 4px 18px rgba(29,58,143,.24);
          margin-bottom: 18px; flex-shrink: 0;
        }
        .ca-process-step h4 { font-size: 17px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
        .ca-process-step p { font-size: 14px; color: #475569; line-height: 1.5; max-width: 180px; }

        /* ── PERKS ── */
        .ca-perks-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .ca-perk-card {
          background: #fff; border: 1.5px solid #e0e7ff;
          border-radius: 20px; padding: 32px 28px;
          transition: all .4s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 2px 16px rgba(29,58,143,.06);
          position: relative; overflow: hidden;
        }
        .ca-perk-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1d3a8f, #3b5bdb, #4f72f5);
          opacity: 0; transition: opacity .3s;
        }
        .ca-perk-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(29,58,143,.12), 0 0 0 1.5px rgba(59,91,219,.14);
          border-color: rgba(59,91,219,.2);
        }
        .ca-perk-card:hover::before { opacity: 1; }
        .ca-perk-icon {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .ca-perk-card h4 { font-size: 16px; font-weight: 800; margin-bottom: 8px; color: #0f172a; }
        .ca-perk-card p { font-size: 14px; color: #475569; line-height: 1.62; }

        /* ── WHO CAN APPLY ── */
        .ca-who-section { padding: 88px 32px; background: #fff; }
        .ca-who-grid {
          max-width: 1080px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
        }
        .ca-who-left .ca-label { text-align: left; }
        .ca-who-left .ca-title { text-align: left; margin-bottom: 14px; }
        .ca-who-sub {
          font-size: 16px; color: #475569; line-height: 1.65;
          max-width: 360px;
        }
        .ca-who-list { display: flex; flex-direction: column; gap: 12px; }
        .ca-who-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 18px 20px; border-radius: 16px;
          background: #f8faff; border: 1.5px solid #e0e7ff;
          transition: all .25s;
        }
        .ca-who-item:hover { background: #eef2ff; border-color: rgba(59,91,219,.2); }
        .ca-who-check {
          width: 24px; height: 24px; min-width: 24px; border-radius: 50%;
          background: linear-gradient(135deg, #1d3a8f, #3b5bdb);
          display: flex; align-items: center; justify-content: center; margin-top: 1px;
        }
        .ca-who-item span { font-size: 15px; color: #334155; font-weight: 500; line-height: 1.5; }

        /* ── FORM SECTION ── */
        .ca-form-section {
          padding: 88px 32px 108px; background: #060d24;
          position: relative; overflow: hidden;
        }
        .ca-form-mesh1 {
          position: absolute; top: -25%; left: -8%; width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(42,78,207,.32), transparent 65%);
          filter: blur(80px); pointer-events: none;
          animation: ca-float-1 22s ease-in-out infinite;
        }
        .ca-form-mesh2 {
          position: absolute; bottom: -18%; right: -5%; width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,82,240,.22), transparent 65%);
          filter: blur(70px); pointer-events: none;
          animation: ca-float-2 26s ease-in-out infinite;
        }
        .ca-form-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 36px 36px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 80%);
          pointer-events: none;
        }
        .ca-form-layout {
          position: relative; max-width: 1080px; margin: 0 auto; z-index: 1;
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 72px; align-items: start;
        }
        /* left text panel */
        .ca-form-text-panel { padding-top: 8px; }
        .ca-form-text-panel .ca-label { text-align: left; color: #818cf8; }
        .ca-form-text-panel .ca-title { text-align: left; color: #fff; margin-bottom: 16px; }
        .ca-form-text-panel .ca-sub { text-align: left; color: rgba(255,255,255,.5); margin: 0 0 40px; max-width: 360px; }
        .ca-form-steps { display: flex; flex-direction: column; gap: 20px; }
        .ca-form-step {
          display: flex; align-items: flex-start; gap: 14px;
        }
        .ca-form-step-num {
          width: 32px; height: 32px; min-width: 32px; border-radius: 50%;
          background: rgba(59,91,219,.25); border: 1px solid rgba(59,91,219,.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: #818cf8;
          flex-shrink: 0; margin-top: 2px;
        }
        .ca-form-step-text h5 { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 3px; }
        .ca-form-step-text p { font-size: 13px; color: rgba(255,255,255,.45); line-height: 1.5; }

        /* right form panel */
        .ca-form-panel { }
        .ca-form {
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
          border-radius: 20px; padding: 36px 32px; backdrop-filter: blur(16px);
        }
        .ca-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .ca-form-group { display: flex; flex-direction: column; gap: 6px; }
        .ca-form-group.full { grid-column: 1 / -1; }
        .ca-form-label {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .8px; color: rgba(255,255,255,.42);
        }
        .ca-form-input {
          background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1);
          border-radius: 10px; padding: 13px 16px;
          font-size: 14px; color: #fff; font-family: inherit; outline: none;
          transition: all .25s;
        }
        .ca-form-input::placeholder { color: rgba(255,255,255,.22); }
        .ca-form-input:focus {
          border-color: rgba(59,91,219,.65); background: rgba(255,255,255,.1);
          box-shadow: 0 0 0 3px rgba(59,91,219,.16);
        }
        .ca-form-textarea {
          background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1);
          border-radius: 10px; padding: 13px 16px;
          font-size: 14px; color: #fff; font-family: inherit; outline: none;
          transition: all .25s; resize: vertical; min-height: 110px; line-height: 1.5;
        }
        .ca-form-textarea::placeholder { color: rgba(255,255,255,.22); }
        .ca-form-textarea:focus {
          border-color: rgba(59,91,219,.65); background: rgba(255,255,255,.1);
          box-shadow: 0 0 0 3px rgba(59,91,219,.16);
        }
        .ca-form-hint { font-size: 11px; color: rgba(255,255,255,.28); margin-top: 4px; }
        .ca-form-submit {
          width: 100%; background: linear-gradient(135deg, #1d3a8f, #3b5bdb);
          color: #fff; border: none; padding: 16px 0;
          border-radius: 12px; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: inherit;
          box-shadow: 0 4px 22px rgba(29,58,143,.42);
          transition: all .35s cubic-bezier(.16,1,.3,1); margin-top: 8px;
          position: relative; overflow: hidden;
        }
        .ca-form-submit::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,.14) 0%, transparent 60%);
          pointer-events: none;
        }
        .ca-form-submit:hover { transform: translateY(-2px) scale(1.01); box-shadow: 0 8px 32px rgba(29,58,143,.58); }
        .ca-form-submit:disabled { opacity: .58; cursor: wait; transform: none; }
        .ca-form-error { font-size: 13px; color: #f87171; font-weight: 600; margin-top: 14px; text-align: center; }
        .ca-form-success {
          text-align: center; padding: 48px 24px;
        }
        .ca-form-success-icon {
          width: 68px; height: 68px; border-radius: 50%;
          background: rgba(34,197,94,.14); border: 2px solid rgba(34,197,94,.28);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 22px;
        }
        .ca-form-success h3 { font-size: 24px; font-weight: 900; color: #fff; margin-bottom: 10px; letter-spacing: -.5px; }
        .ca-form-success p { font-size: 15px; color: rgba(255,255,255,.48); line-height: 1.65; max-width: 380px; margin: 0 auto 28px; }
        .ca-form-success-back {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
          color: #fff; padding: 11px 24px; border-radius: 10px;
          font-size: 14px; font-weight: 600; text-decoration: none;
          transition: all .25s;
        }
        .ca-form-success-back:hover { background: rgba(255,255,255,.14); }

        /* ── RESPONSIVE ── */
        @media(max-width:1024px) {
          .ca-do-grid { grid-template-columns: repeat(2, 1fr); }
          .ca-perks-grid { grid-template-columns: repeat(2, 1fr); }
          .ca-form-layout { grid-template-columns: 1fr; gap: 48px; }
          .ca-form-text-panel .ca-sub { max-width: 100%; }
          .ca-who-grid { grid-template-columns: 1fr; gap: 40px; }
          .ca-who-sub { max-width: 100%; }
        }
        @media(max-width:768px) {
          .ca-hero { padding: 80px 18px 56px; }
          .ca-hero-badge { font-size: 12px; padding: 6px 14px; margin-bottom: 20px; }
          .ca-hero h1 { font-size: 38px; letter-spacing: -1.8px; margin-bottom: 16px; }
          .ca-hero-sub { font-size: 15px; margin-bottom: 28px; max-width: 100%; line-height: 1.6; }
          .ca-hero-cta { padding: 14px 32px; font-size: 15px; }
          .ca-hero-stats { gap: 8px; }
          .ca-hero-stat-pill { font-size: 12px; padding: 5px 12px; }
          .ca-section, .ca-section-alt, .ca-section-process { padding: 64px 16px; }
          .ca-who-section { padding: 64px 16px; }
          .ca-form-section { padding: 64px 16px 80px; }
          .ca-label { font-size: 11px; }
          .ca-title { font-size: 30px; letter-spacing: -1.2px; }
          .ca-sub { font-size: 15px; margin-bottom: 36px; }
          .ca-do-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .ca-do-card { padding: 20px 16px; border-radius: 16px; }
          .ca-do-icon-wrap { width: 42px; height: 42px; margin-bottom: 14px; }
          .ca-perks-grid { grid-template-columns: 1fr; gap: 12px; }
          .ca-perk-card { padding: 24px 20px; border-radius: 16px; }
          .ca-process-steps { flex-direction: column; align-items: center; gap: 0; }
          .ca-process-step { max-width: 100%; padding: 0 24px 32px; }
          .ca-process-connector { display: none; }
          .ca-who-left .ca-title { font-size: 28px; }
          .ca-form { padding: 24px 18px; border-radius: 16px; }
          .ca-form-row { grid-template-columns: 1fr; gap: 10px; margin-bottom: 10px; }
          .ca-form-input, .ca-form-textarea { font-size: 16px; }
        }
        @media(max-width:480px) {
          .ca-hero { padding: 76px 16px 48px; }
          .ca-hero h1 { font-size: 30px; letter-spacing: -1.2px; margin-bottom: 14px; }
          .ca-hero-sub { font-size: 14px; margin-bottom: 24px; }
          .ca-hero-cta { padding: 13px 26px; font-size: 14px; }
          .ca-section, .ca-section-alt, .ca-section-process { padding: 52px 14px; }
          .ca-who-section { padding: 52px 14px; }
          .ca-form-section { padding: 52px 14px 72px; }
          .ca-title { font-size: 26px; letter-spacing: -.8px; }
          .ca-sub { font-size: 14px; margin-bottom: 28px; }
          .ca-do-grid { grid-template-columns: 1fr; gap: 10px; }
          .ca-perk-card { padding: 20px 16px; }
          .ca-perk-icon { width: 44px; height: 44px; margin-bottom: 14px; }
          .ca-form { padding: 20px 14px; }
          .ca-form-submit { font-size: 14px; padding: 14px 0; }
        }
      `}</style>

      <Navbar />

      <div className="ca">
        <div style={{ height: 108 }} />

        {/* HERO */}
        <section className="ca-hero">
          <div className="ca-hero-orb1" />
          <div className="ca-hero-orb2" />
          <div className="ca-hero-in">
            <div className="ca-hero-badge">
              <span className="ca-hero-dot" />
              Applications Open
            </div>
            <h1>
              Become a Jobingen<br />
              <span className="ca-grad">Campus Ambassador</span>
            </h1>
            <p className="ca-hero-sub">
              Represent Jobingen in your college and help students discover better career
              opportunities, AI tools, and the future of hiring.
            </p>
            <div className="ca-hero-cta-wrap">
              <a href="#apply" className="ca-hero-cta">
                Apply Now
                <svg width="16" height="16" fill="none" viewBox="0 0 18 18">
                  <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <div className="ca-hero-stats">
              <div className="ca-hero-stat-pill">
                <span className="ca-hero-stat-dot" />
                50+ Colleges
              </div>
              <div className="ca-hero-stat-pill">
                <span className="ca-hero-stat-dot" />
                Applications Open
              </div>
              <div className="ca-hero-stat-pill">
                <span className="ca-hero-stat-dot" />
                48hr Response
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU WILL DO */}
        <section className="ca-section">
          <div className="ca-inner">
            <Reveal>
              <p className="ca-label">Your Role</p>
              <h2 className="ca-title">What you will do</h2>
              <p className="ca-sub">As a Campus Ambassador, you are the bridge between Jobingen and your college community.</p>
            </Reveal>
            <div className="ca-do-grid">
              {doItems.map((item, i) => (
                <Reveal key={item.title} delay={i * 70}>
                  <div className="ca-do-card">
                    <span className="ca-do-step">{item.step}</span>
                    <div className="ca-do-icon-wrap" style={{ background: item.bg }}>
                      {item.svg}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="ca-section-process">
          <div className="ca-inner">
            <Reveal>
              <p className="ca-label">The Process</p>
              <h2 className="ca-title">How it works</h2>
              <p className="ca-sub">Three simple steps to become a Jobingen Campus Ambassador and start making an impact.</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="ca-process-steps">
                <div className="ca-process-step">
                  <div className="ca-process-num">1</div>
                  <h4>Apply Online</h4>
                  <p>Fill out the short application form with your details and motivation.</p>
                </div>
                <div className="ca-process-connector">
                  <div className="ca-process-connector-line" />
                </div>
                <div className="ca-process-step">
                  <div className="ca-process-num">2</div>
                  <h4>Get Selected</h4>
                  <p>Our team reviews applications and reaches out within 48 hours.</p>
                </div>
                <div className="ca-process-connector">
                  <div className="ca-process-connector-line" />
                </div>
                <div className="ca-process-step">
                  <div className="ca-process-num">3</div>
                  <h4>Start Leading</h4>
                  <p>Get onboarded, receive your kit, and begin representing Jobingen on campus.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PERKS */}
        <section className="ca-section-alt">
          <div className="ca-inner">
            <Reveal>
              <p className="ca-label">Why Join</p>
              <h2 className="ca-title">Perks &amp; Benefits</h2>
              <p className="ca-sub">We invest in our ambassadors. Here is what you get for building the Jobingen community on your campus.</p>
            </Reveal>
            <div className="ca-perks-grid">
              {perks.map((perk, i) => (
                <Reveal key={perk.title} delay={i * 80}>
                  <div className="ca-perk-card">
                    <div className="ca-perk-icon" style={{ background: perk.iconBg }}>
                      {perk.svg}
                    </div>
                    <h4>{perk.title}</h4>
                    <p>{perk.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHO CAN APPLY */}
        <section className="ca-who-section">
          <div className="ca-who-grid">
            <Reveal>
              <div className="ca-who-left">
                <p className="ca-label">Eligibility</p>
                <h2 className="ca-title">Who can apply</h2>
                <p className="ca-who-sub">No experience required — just passion, initiative, and a desire to help students around you.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="ca-who-list">
                {eligibility.map((item, i) => (
                  <div className="ca-who-item" key={i}>
                    <div className="ca-who-check">
                      <svg width="11" height="11" fill="none" viewBox="0 0 12 12">
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

        {/* APPLICATION FORM */}
        <section className="ca-form-section" id="apply">
          <div className="ca-form-mesh1" />
          <div className="ca-form-mesh2" />
          <div className="ca-form-grid" />
          <div className="ca-form-layout">
            {/* Left text panel */}
            <div className="ca-form-text-panel">
              <Reveal>
                <p className="ca-label">Apply Now</p>
                <h2 className="ca-title">Ready to lead?</h2>
                <p className="ca-sub">Join our growing network of student leaders representing Jobingen across India.</p>
              </Reveal>
              <Reveal delay={80}>
                <div className="ca-form-steps">
                  <div className="ca-form-step">
                    <div className="ca-form-step-num">1</div>
                    <div className="ca-form-step-text">
                      <h5>Submit your application</h5>
                      <p>Takes less than 5 minutes. Tell us about yourself and your campus.</p>
                    </div>
                  </div>
                  <div className="ca-form-step">
                    <div className="ca-form-step-num">2</div>
                    <div className="ca-form-step-text">
                      <h5>Get a response within 48 hours</h5>
                      <p>Our team personally reviews every application and follows up by email.</p>
                    </div>
                  </div>
                  <div className="ca-form-step">
                    <div className="ca-form-step-num">3</div>
                    <div className="ca-form-step-text">
                      <h5>Onboard and start leading</h5>
                      <p>Receive your ambassador kit, resources, and community access to hit the ground running.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right form panel */}
            <div className="ca-form-panel">
              {submitted ? (
                <div className="ca-form ca-form-success">
                  <div className="ca-form-success-icon">
                    <svg width="30" height="30" fill="none" viewBox="0 0 32 32">
                      <path d="M6 16l7 7 13-13" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Application Submitted!</h3>
                  <p>Thank you for applying to become a Jobingen Campus Ambassador. We will review your application and reach out within 48 hours.</p>
                  <a href="/pre-launch" className="ca-form-success-back">
                    <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Back to Jobingen
                  </a>
                </div>
              ) : (
                <Reveal delay={100}>
                  <form className="ca-form" onSubmit={handleSubmit}>
                    <div className="ca-form-row">
                      <div className="ca-form-group">
                        <label className="ca-form-label">Full Name *</label>
                        <input className="ca-form-input" placeholder="Rahul Sharma" value={form.name} onChange={set("name")} required />
                      </div>
                      <div className="ca-form-group">
                        <label className="ca-form-label">College Name *</label>
                        <input className="ca-form-input" placeholder="IIT Delhi" value={form.college} onChange={set("college")} required />
                      </div>
                    </div>

                    <div className="ca-form-row">
                      <div className="ca-form-group">
                        <label className="ca-form-label">Course / Year *</label>
                        <input className="ca-form-input" placeholder="B.Tech CSE, 2nd Year" value={form.course_year} onChange={set("course_year")} required />
                      </div>
                      <div className="ca-form-group">
                        <label className="ca-form-label">Email Address *</label>
                        <input className="ca-form-input" type="email" placeholder="rahul@college.edu" value={form.email} onChange={set("email")} required />
                      </div>
                    </div>

                    <div className="ca-form-row">
                      <div className="ca-form-group">
                        <label className="ca-form-label">Phone Number *</label>
                        <input className="ca-form-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} required />
                      </div>
                      <div className="ca-form-group">
                        <label className="ca-form-label">LinkedIn Profile</label>
                        <input className="ca-form-input" placeholder="linkedin.com/in/rahul" value={form.linkedin} onChange={set("linkedin")} />
                      </div>
                    </div>

                    <div className="ca-form-row" style={{ marginBottom: 14 }}>
                      <div className="ca-form-group">
                        <label className="ca-form-label">Instagram Profile</label>
                        <input className="ca-form-input" placeholder="@rahul.sharma" value={form.instagram} onChange={set("instagram")} />
                      </div>
                    </div>

                    <div className="ca-form-group full" style={{ marginBottom: 20 }}>
                      <label className="ca-form-label">Why do you want to become a Campus Ambassador? *</label>
                      <textarea
                        className="ca-form-textarea"
                        placeholder="Tell us about yourself, what you are passionate about, and how you plan to spread Jobingen on your campus..."
                        value={form.why_ambassador}
                        onChange={set("why_ambassador")}
                        required
                      />
                      <span className="ca-form-hint">Minimum 50 characters. Be honest and specific.</span>
                    </div>

                    {error && <p className="ca-form-error">{error}</p>}

                    <button className="ca-form-submit" type="submit" disabled={loading}>
                      {loading ? "Submitting..." : "Submit Application"}
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
