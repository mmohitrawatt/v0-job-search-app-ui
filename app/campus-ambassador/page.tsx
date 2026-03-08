"use client"

import { useState, useRef, useEffect } from "react"
import { JobingenLogo } from "@/components/jobingen-logo"

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
    { icon: "📣", bg: "#e8edfe", title: "Represent Jobingen", desc: "Be the official Jobingen face on your campus and build local awareness." },
    { icon: "🤖", bg: "#f0fdf4", title: "Share AI Career Tools", desc: "Help fellow students discover AI-powered resume, interview, and job search tools." },
    { icon: "🎓", bg: "#fffbeb", title: "Promote Events", desc: "Spread the word about Jobingen bootcamps, hackathons, and career workshops." },
    { icon: "🌐", bg: "#eef1fe", title: "Build Community", desc: "Grow the Jobingen student community and connect peers with real opportunities." },
  ]

  const perks = [
    { icon: "🏆", bg: "#e8edfe", title: "Official Certificate", desc: "Get a verified certificate from Jobingen to showcase your leadership on your resume and LinkedIn." },
    { icon: "💼", bg: "#f0fdf4", title: "Internship Opportunities", desc: "High-performing ambassadors get priority access to internship roles within the Jobingen team." },
    { icon: "🤖", bg: "#fffbeb", title: "Exclusive AI Workshops", desc: "Attend invite-only AI and career tech workshops before they're open to the public." },
    { icon: "🚀", bg: "#fdf2f8", title: "Leadership Experience", desc: "Lead real campaigns, events, and community initiatives that look great on any resume." },
    { icon: "🤝", bg: "#f0f9ff", title: "Network with Founders", desc: "Connect directly with startup founders, senior engineers, and hiring managers in our ecosystem." },
    { icon: "🎁", bg: "#ecfdf5", title: "Exclusive Perks", desc: "Ambassador-only swag, early product access, referral bonuses, and more as you grow your impact." },
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
          color: #0a0a0a; background: #fff; overflow-x: hidden;
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
        @keyframes ca-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* ── NAV ── */
        .ca-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(255,255,255,.76); backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(0,0,0,.05);
        }
        .ca-nav-in {
          max-width: 1200px; margin: 0 auto; padding: 0 32px;
          height: 72px; display: flex; align-items: center; justify-content: space-between;
        }
        .ca-nav-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 14px; font-weight: 600; color: #555; text-decoration: none;
          transition: color .2s; padding: 6px 0;
        }
        .ca-nav-back:hover { color: #1d3a8f; }
        .ca-nav-back svg { transition: transform .2s; }
        .ca-nav-back:hover svg { transform: translateX(-3px); }
        .ca-nav-cta {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg,#1d3a8f,#2a4ecf,#3b52f0);
          color: #fff; border: none; padding: 10px 22px;
          border-radius: 10px; font-size: 14px; font-weight: 600;
          cursor: pointer; text-decoration: none; font-family: inherit;
          transition: all .3s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 2px 12px rgba(42,78,207,.28);
        }
        .ca-nav-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(42,78,207,.42); }

        /* ── HERO ── */
        .ca-hero {
          position: relative; padding: 116px 32px 88px;
          text-align: center; overflow: hidden;
          background: linear-gradient(170deg,#eef2ff 0%,#f8f9ff 30%,#fff 60%,#f0f4ff 100%);
        }
        .ca-hero::after {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle,rgba(42,78,207,.032) 1px,transparent 1px);
          background-size: 30px 30px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%,black 10%,transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%,black 10%,transparent 70%);
          pointer-events: none;
        }
        .ca-hero-orb1 {
          position: absolute; top: -110px; left: -7%; width: 580px; height: 580px;
          border-radius: 50%;
          background: radial-gradient(circle,rgba(42,78,207,.14) 0%,rgba(59,82,240,.05) 40%,transparent 70%);
          pointer-events: none; filter: blur(56px);
          animation: ca-float-1 20s ease-in-out infinite;
        }
        .ca-hero-orb2 {
          position: absolute; bottom: -80px; right: -5%; width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle,rgba(59,82,240,.1) 0%,transparent 70%);
          pointer-events: none; filter: blur(48px);
          animation: ca-float-2 26s ease-in-out infinite;
        }
        .ca-hero-in { position: relative; max-width: 760px; margin: 0 auto; z-index: 1; }
        .ca-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,.68); backdrop-filter: blur(16px);
          border: 1px solid rgba(42,78,207,.12); padding: 7px 18px;
          border-radius: 100px; font-size: 13px; font-weight: 600; color: #2a4ecf;
          margin-bottom: 36px; box-shadow: 0 4px 16px rgba(42,78,207,.07);
          animation: ca-fade-up .8s cubic-bezier(.16,1,.3,1) both;
        }
        .ca-hero-dot {
          width: 7px; height: 7px; background: #22c55e; border-radius: 50%;
          box-shadow: 0 0 8px rgba(34,197,94,.45); animation: ca-pulse 2s infinite;
        }
        .ca-hero h1 {
          font-size: 60px; font-weight: 900; letter-spacing: -2.8px;
          line-height: 1.06; margin-bottom: 24px;
          animation: ca-fade-up .9s cubic-bezier(.16,1,.3,1) .1s both;
        }
        .ca-grad {
          background: linear-gradient(135deg,#0d1b45,#1d3a8f,#2a4ecf,#3b52f0);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; background-size: 300% auto;
          animation: ca-grad-shift 6s ease-in-out infinite;
        }
        .ca-hero-sub {
          font-size: 19px; color: #555; line-height: 1.72;
          max-width: 530px; margin: 0 auto 40px;
          animation: ca-fade-up 1s cubic-bezier(.16,1,.3,1) .2s both;
        }
        .ca-hero-cta-wrap { animation: ca-fade-up 1s cubic-bezier(.16,1,.3,1) .3s both; }
        .ca-hero-cta {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg,#1d3a8f,#2a4ecf,#3b52f0);
          color: #fff; border: none; padding: 17px 44px;
          border-radius: 14px; font-size: 16px; font-weight: 700;
          cursor: pointer; text-decoration: none; font-family: inherit;
          box-shadow: 0 4px 22px rgba(42,78,207,.38);
          transition: all .35s cubic-bezier(.16,1,.3,1);
          position: relative; overflow: hidden;
        }
        .ca-hero-cta::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom,rgba(255,255,255,.18) 0%,transparent 60%);
          pointer-events: none;
        }
        .ca-hero-cta:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 36px rgba(42,78,207,.52); }
        .ca-hero-note {
          font-size: 13px; color: #999; margin-top: 16px;
          animation: ca-fade-up 1s cubic-bezier(.16,1,.3,1) .4s both;
        }

        /* ── SHARED SECTION TOKENS ── */
        .ca-section { padding: 80px 32px; }
        .ca-section-alt { padding: 80px 32px; background: #f8f9ff; position: relative; }
        .ca-section-alt::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(42,78,207,.08),transparent);
        }
        .ca-inner { max-width: 1080px; margin: 0 auto; }
        .ca-label {
          font-size: 13px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1.4px; color: #2a4ecf; text-align: center; margin-bottom: 10px;
        }
        .ca-title {
          font-size: 44px; font-weight: 900; letter-spacing: -2px;
          text-align: center; color: #0a0a0a; line-height: 1.1; margin-bottom: 14px;
        }
        .ca-sub {
          font-size: 17px; color: #666; text-align: center;
          max-width: 520px; margin: 0 auto 56px; line-height: 1.65;
        }

        /* ── WHAT YOU WILL DO ── */
        .ca-do-grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 16px;
        }
        .ca-do-card {
          background: #fff; border: 1px solid rgba(0,0,0,.06);
          border-radius: 18px; padding: 28px 22px;
          transition: all .35s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 1px 4px rgba(0,0,0,.04);
        }
        .ca-do-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(29,58,143,.1),0 0 0 1px rgba(42,78,207,.07);
          border-color: transparent;
        }
        .ca-do-icon {
          width: 48px; height: 48px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 18px;
        }
        .ca-do-card h3 { font-size: 15px; font-weight: 800; margin-bottom: 7px; color: #0a0a0a; letter-spacing: -.2px; }
        .ca-do-card p { font-size: 13px; color: #777; line-height: 1.56; }

        /* ── PERKS ── */
        .ca-perks-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 20px;
        }
        .ca-perk-card {
          background: #fff; border: 1px solid rgba(0,0,0,.06);
          border-radius: 20px; padding: 32px 28px;
          transition: all .4s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 1px 4px rgba(0,0,0,.04);
          position: relative; overflow: hidden;
        }
        .ca-perk-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg,#1d3a8f,#2a4ecf,#3b52f0);
          opacity: 0; transition: opacity .3s;
        }
        .ca-perk-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(29,58,143,.1),0 0 0 1px rgba(42,78,207,.07);
          border-color: transparent;
        }
        .ca-perk-card:hover::before { opacity: 1; }
        .ca-perk-icon {
          width: 52px; height: 52px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; margin-bottom: 20px;
        }
        .ca-perk-card h4 { font-size: 16px; font-weight: 800; margin-bottom: 8px; color: #0a0a0a; }
        .ca-perk-card p { font-size: 14px; color: #666; line-height: 1.62; }

        /* ── WHO CAN APPLY ── */
        .ca-who-section { padding: 80px 32px; background: #fff; }
        .ca-who-inner { max-width: 680px; margin: 0 auto; text-align: center; }
        .ca-who-list { display: flex; flex-direction: column; gap: 12px; margin-top: 40px; text-align: left; }
        .ca-who-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 18px 22px; border-radius: 14px;
          background: #f8f9ff; border: 1px solid rgba(42,78,207,.06);
          transition: all .25s;
        }
        .ca-who-item:hover { background: #eef2ff; border-color: rgba(42,78,207,.12); }
        .ca-who-check {
          width: 24px; height: 24px; min-width: 24px; border-radius: 50%;
          background: linear-gradient(135deg,#1d3a8f,#2a4ecf);
          display: flex; align-items: center; justify-content: center; margin-top: 0;
        }
        .ca-who-item span { font-size: 15px; color: #333; font-weight: 500; line-height: 1.5; }

        /* ── FORM SECTION ── */
        .ca-form-section {
          padding: 88px 32px 108px; background: #060d24;
          position: relative; overflow: hidden;
        }
        .ca-form-mesh1 {
          position: absolute; top: -25%; left: -8%; width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle,rgba(42,78,207,.32),transparent 65%);
          filter: blur(80px); pointer-events: none;
          animation: ca-float-1 22s ease-in-out infinite;
        }
        .ca-form-mesh2 {
          position: absolute; bottom: -18%; right: -5%; width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle,rgba(59,82,240,.22),transparent 65%);
          filter: blur(70px); pointer-events: none;
          animation: ca-float-2 26s ease-in-out infinite;
        }
        .ca-form-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle,rgba(255,255,255,.025) 1px,transparent 1px);
          background-size: 36px 36px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%,black 10%,transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%,black 10%,transparent 80%);
          pointer-events: none;
        }
        .ca-form-inner { position: relative; max-width: 680px; margin: 0 auto; z-index: 1; }
        .ca-form-inner .ca-label { color: #6074f3; }
        .ca-form-inner .ca-title { color: #fff; }
        .ca-form-inner .ca-sub { color: rgba(255,255,255,.48); margin-bottom: 40px; }

        .ca-form {
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.09);
          border-radius: 20px; padding: 36px 32px; backdrop-filter: blur(12px);
        }
        .ca-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .ca-form-group { display: flex; flex-direction: column; gap: 6px; }
        .ca-form-group.full { grid-column: 1 / -1; }
        .ca-form-label {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .7px; color: rgba(255,255,255,.45);
        }
        .ca-form-input {
          background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1);
          border-radius: 10px; padding: 13px 16px;
          font-size: 14px; color: #fff; font-family: inherit; outline: none;
          transition: all .25s;
        }
        .ca-form-input::placeholder { color: rgba(255,255,255,.22); }
        .ca-form-input:focus {
          border-color: rgba(42,78,207,.65); background: rgba(255,255,255,.1);
          box-shadow: 0 0 0 3px rgba(42,78,207,.16);
        }
        .ca-form-textarea {
          background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1);
          border-radius: 10px; padding: 13px 16px;
          font-size: 14px; color: #fff; font-family: inherit; outline: none;
          transition: all .25s; resize: vertical; min-height: 110px; line-height: 1.5;
        }
        .ca-form-textarea::placeholder { color: rgba(255,255,255,.22); }
        .ca-form-textarea:focus {
          border-color: rgba(42,78,207,.65); background: rgba(255,255,255,.1);
          box-shadow: 0 0 0 3px rgba(42,78,207,.16);
        }
        .ca-form-hint { font-size: 11px; color: rgba(255,255,255,.28); margin-top: 4px; }
        .ca-form-submit {
          width: 100%; background: linear-gradient(135deg,#1d3a8f,#2a4ecf,#3b52f0);
          color: #fff; border: none; padding: 16px 0;
          border-radius: 12px; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: inherit;
          box-shadow: 0 4px 22px rgba(42,78,207,.42);
          transition: all .35s cubic-bezier(.16,1,.3,1); margin-top: 8px;
          position: relative; overflow: hidden;
        }
        .ca-form-submit::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom,rgba(255,255,255,.14) 0%,transparent 60%);
          pointer-events: none;
        }
        .ca-form-submit:hover { transform: translateY(-2px) scale(1.01); box-shadow: 0 8px 32px rgba(42,78,207,.58); }
        .ca-form-submit:disabled { opacity: .58; cursor: wait; transform: none; }
        .ca-form-error { font-size: 13px; color: #f87171; font-weight: 600; margin-top: 14px; text-align: center; }
        .ca-form-success {
          text-align: center; padding: 48px 24px;
        }
        .ca-form-success-icon {
          width: 68px; height: 68px; border-radius: 50%;
          background: rgba(34,197,94,.14); border: 2px solid rgba(34,197,94,.28);
          display: flex; align-items: center; justify-content: center;
          font-size: 30px; margin: 0 auto 22px;
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

        /* ── FOOTER ── */
        .ca-footer {
          padding: 40px 32px; background: #fafbff;
          border-top: 1px solid rgba(0,0,0,.04);
        }
        .ca-footer-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .ca-footer-copy { font-size: 13px; color: #aaa; }
        .ca-footer-link { font-size: 13px; color: #2a4ecf; text-decoration: none; font-weight: 600; }
        .ca-footer-link:hover { text-decoration: underline; }

        /* ── RESPONSIVE ── */
        @media(max-width:1024px) {
          .ca-do-grid { grid-template-columns: repeat(2,1fr); }
          .ca-perks-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media(max-width:768px) {
          /* Nav */
          .ca-nav-in { height: 60px; padding: 0 16px; }
          .ca-nav-back-txt { display: none; }
          .ca-nav-back { gap: 0; padding: 6px 8px 6px 4px; }
          .ca-nav-cta { padding: 9px 16px; font-size: 13px; }
          /* Hero — fit in one screen */
          .ca-hero { padding: 72px 18px 24px; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
          .ca-hero-in { width: 100%; }
          .ca-hero-badge { font-size: 11px; padding: 6px 14px; margin-bottom: 18px; }
          .ca-hero h1 { font-size: 32px; letter-spacing: -1.4px; margin-bottom: 14px; }
          .ca-hero-sub { font-size: 14px; margin-bottom: 22px; max-width: 100%; line-height: 1.6; }
          .ca-hero-cta-wrap { margin-bottom: 0; }
          .ca-hero-cta { padding: 13px 28px; font-size: 15px; }
          .ca-hero-note { font-size: 12px; margin-top: 12px; }
          /* Sections */
          .ca-section, .ca-section-alt { padding: 56px 16px; }
          .ca-who-section { padding: 56px 16px; }
          .ca-form-section { padding: 56px 16px 72px; }
          .ca-label { font-size: 12px; }
          .ca-title { font-size: 28px; letter-spacing: -1.2px; }
          .ca-sub { font-size: 14px; margin-bottom: 32px; }
          /* Grids */
          .ca-do-grid { grid-template-columns: repeat(2,1fr); gap: 12px; }
          .ca-do-card { padding: 20px 16px; border-radius: 14px; }
          .ca-do-icon { width: 40px; height: 40px; font-size: 18px; margin-bottom: 12px; }
          .ca-perks-grid { grid-template-columns: 1fr; gap: 12px; }
          .ca-perk-card { padding: 24px 20px; border-radius: 16px; }
          /* Who */
          .ca-who-inner { text-align: left; }
          .ca-who-item { padding: 14px 16px; }
          /* Form */
          .ca-form { padding: 24px 18px; border-radius: 16px; }
          .ca-form-row { grid-template-columns: 1fr; gap: 10px; margin-bottom: 10px; }
          .ca-form-input, .ca-form-textarea { font-size: 16px; } /* prevent iOS zoom */
          /* Footer */
          .ca-footer { padding: 28px 16px; }
          .ca-footer-inner { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
        @media(max-width:480px) {
          /* Nav */
          .ca-nav-in { height: 56px; }
          /* Hero — still one screen on small phones */
          .ca-hero { padding: 68px 16px 20px; }
          .ca-hero-badge { font-size: 11px; padding: 5px 12px; margin-bottom: 14px; }
          .ca-hero h1 { font-size: 26px; letter-spacing: -1.1px; margin-bottom: 12px; }
          .ca-hero-sub { font-size: 13px; margin-bottom: 20px; }
          .ca-hero-cta { padding: 12px 22px; font-size: 14px; gap: 7px; }
          .ca-hero-note { font-size: 11px; margin-top: 10px; }
          /* Sections */
          .ca-section, .ca-section-alt { padding: 48px 14px; }
          .ca-who-section { padding: 48px 14px; }
          .ca-form-section { padding: 48px 14px 64px; }
          .ca-title { font-size: 24px; letter-spacing: -0.8px; }
          .ca-sub { font-size: 13px; margin-bottom: 28px; }
          /* Grids */
          .ca-do-grid { grid-template-columns: 1fr; gap: 10px; }
          .ca-perk-card { padding: 20px 16px; }
          .ca-perk-icon { width: 44px; height: 44px; font-size: 20px; margin-bottom: 14px; }
          /* Form */
          .ca-form { padding: 20px 14px; }
          .ca-form-submit { font-size: 14px; padding: 14px 0; }
        }
      `}</style>

      <div className="ca">
        {/* NAV */}
        <nav className="ca-nav">
          <div className="ca-nav-in">
            <a href="/" className="ca-nav-back">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ca-nav-back-txt">Back to Jobingen</span>
            </a>
            <a href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>
              <JobingenLogo height={44} />
            </a>
            <a href="#apply" className="ca-nav-cta">Apply Now</a>
          </div>
        </nav>

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
            <p className="ca-hero-note">Join a community of student leaders building the future of jobs.</p>
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
                    <div className="ca-do-icon" style={{ background: item.bg }}>{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
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
                    <div className="ca-perk-icon" style={{ background: perk.bg }}>{perk.icon}</div>
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
          <div className="ca-who-inner">
            <Reveal>
              <p className="ca-label">Eligibility</p>
              <h2 className="ca-title">Who can apply</h2>
              <p className="ca-sub" style={{ marginBottom: 0 }}>No experience required — just passion, initiative, and a desire to help students around you.</p>
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
          <div className="ca-form-inner">
            <Reveal>
              <p className="ca-label">Apply Now</p>
              <h2 className="ca-title">Ready to lead?</h2>
              <p className="ca-sub">Fill in your details below and we will get back to you within 48 hours.</p>
            </Reveal>

            {submitted ? (
              <div className="ca-form ca-form-success">
                <div className="ca-form-success-icon">🎉</div>
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
        </section>

        {/* FOOTER */}
        <footer className="ca-footer">
          <div className="ca-footer-inner">
            <span className="ca-footer-copy">&copy; 2026 Jobingen. All rights reserved.</span>
            <a href="/pre-launch" className="ca-footer-link">Back to Jobingen &rarr;</a>
          </div>
        </footer>
      </div>
    </>
  )
}
