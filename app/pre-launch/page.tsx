"use client"

import { useState, useRef, useEffect } from "react"
import { JobngenLogo } from "@/components/jobngen-logo"

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("pl-visible"); obs.unobserve(el) } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`pl-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function PreLaunchPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [email2, setEmail2] = useState("")
  const [submitted2, setSubmitted2] = useState(false)

  const handleSubmit = (e: React.FormEvent, which: "hero" | "cta") => {
    e.preventDefault()
    if (which === "hero") { if (!email.trim()) return; setSubmitted(true); setEmail("") }
    else { if (!email2.trim()) return; setSubmitted2(true); setEmail2("") }
    setTimeout(() => { if (which === "hero") setSubmitted(false); else setSubmitted2(false) }, 4000)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .pl *{box-sizing:border-box;margin:0;padding:0}
        .pl{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0a0a0a;background:#fff;overflow-x:hidden;-webkit-font-smoothing:antialiased}
        .pl-reveal{opacity:0;transform:translateY(36px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
        .pl-visible{opacity:1;transform:translateY(0)}

        /* ═══ NAV ═══ */
        .pl-nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,.82);backdrop-filter:blur(20px) saturate(180%);border-bottom:1px solid rgba(0,0,0,.05)}
        .pl-nav-in{max-width:1200px;margin:0 auto;padding:0 32px;height:72px;display:flex;align-items:center;justify-content:space-between}
        .pl-logo{font-size:22px;font-weight:900;letter-spacing:-.5px;text-decoration:none;background:linear-gradient(90deg,#0d1b45,#1d3a8f,#3b52f0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .pl-nav-links{display:flex;gap:32px}
        .pl-nav-a{font-size:14px;font-weight:500;color:#666;text-decoration:none;transition:color .2s}
        .pl-nav-a:hover{color:#0a0a0a}
        .pl-nav-cta{background:linear-gradient(135deg,#6366f1,#7c3aed);color:#fff;border:none;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all .3s;box-shadow:0 2px 12px rgba(99,102,241,.3)}
        .pl-nav-cta:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(99,102,241,.4)}

        /* ═══ HERO ═══ */
        .pl-hero{position:relative;padding:160px 32px 100px;text-align:center;overflow:hidden;background:#fff}
        .pl-hero-bg{display:none}
        .pl-hero-in{position:relative;max-width:780px;margin:0 auto}
        .pl-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.15);padding:8px 18px;border-radius:100px;font-size:13px;font-weight:600;color:#6366f1;margin-bottom:32px}
        .pl-dot{width:8px;height:8px;background:#22c55e;border-radius:50%;box-shadow:0 0 8px rgba(34,197,94,.4);animation:pl-p 2s infinite}
        @keyframes pl-p{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
        .pl-hero h1{font-size:62px;font-weight:900;letter-spacing:-2.5px;line-height:1.04;margin-bottom:24px}
        .pl-grad{background:linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .pl-hero-sub{font-size:19px;color:#555;line-height:1.7;max-width:540px;margin:0 auto 40px}
        .pl-form{display:flex;gap:10px;max-width:480px;margin:0 auto 14px}
        .pl-input{flex:1;padding:16px 20px;border:1.5px solid #e0e0e0;border-radius:12px;font-size:15px;outline:none;transition:all .3s;background:#fff;font-family:inherit}
        .pl-input:focus{border-color:#6366f1;box-shadow:0 0 0 4px rgba(99,102,241,.1)}
        .pl-btn{background:linear-gradient(135deg,#6366f1,#7c3aed);color:#fff;border:none;padding:16px 32px;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .3s;box-shadow:0 4px 16px rgba(99,102,241,.3);font-family:inherit}
        .pl-btn:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(99,102,241,.4)}
        .pl-ok{color:#16a34a;font-size:15px;font-weight:600;padding:16px 0}
        .pl-note{font-size:13px;color:#999;margin-top:4px}

        /* ═══ BOOTCAMP — PREMIUM ═══ */
        .pl-bc{padding:60px 32px 100px;position:relative;background:#fafafa}
        .pl-bc-wrap{max-width:1100px;margin:0 auto;position:relative}
        .pl-bc-card{border-radius:28px;overflow:hidden;background:#fff;border:1px solid rgba(0,0,0,.06);box-shadow:0 24px 80px rgba(0,0,0,.08),0 0 0 1px rgba(99,102,241,.04)}
        .pl-bc-head{background:linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4338ca 100%);padding:36px 40px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;position:relative;overflow:hidden}
        .pl-bc-head::before{content:'';position:absolute;top:-80px;right:-40px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.3),transparent 70%);pointer-events:none}
        .pl-bc-head::after{content:'';position:absolute;bottom:-60px;left:20%;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.2),transparent 70%);pointer-events:none}
        .pl-bc-left{display:flex;align-items:center;gap:16px;flex-wrap:wrap;position:relative}
        .pl-live{display:inline-flex;align-items:center;gap:7px;padding:6px 16px;border-radius:100px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);font-size:11px;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;backdrop-filter:blur(8px)}
        .pl-live-d{width:7px;height:7px;border-radius:50%;background:#f87171;animation:pl-p 1.5s infinite}
        .pl-bc-h{font-size:24px;font-weight:900;color:#fff;letter-spacing:-.5px}
        .pl-bc-right{display:flex;align-items:center;gap:20px;flex-shrink:0;position:relative}
        .pl-bc-price{text-align:right}
        .pl-bc-amt{font-size:36px;font-weight:900;color:#fff;line-height:1}
        .pl-bc-psub{font-size:11px;color:rgba(255,255,255,.5);margin-top:3px}
        .pl-bc-reg{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:14px;background:#fff;color:#4338ca;font-size:14px;font-weight:800;text-decoration:none;box-shadow:0 4px 24px rgba(0,0,0,.2);transition:all .3s;white-space:nowrap}
        .pl-bc-reg:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.25)}

        .pl-bc-body{padding:32px 40px;display:grid;grid-template-columns:260px 1fr;gap:36px}
        .pl-bc-meta{display:flex;flex-direction:column;gap:18px}
        .pl-bc-daterow{display:flex;gap:12px;align-items:flex-start}
        .pl-bc-daterow .ico{font-size:18px;margin-top:1px}
        .pl-bc-daterow .label{font-size:14px;font-weight:700;color:#0a0a0a}
        .pl-bc-daterow .sub{font-size:12px;color:#888;margin-top:1px}
        .pl-bc-hr{height:1px;background:#f0f0f0}
        .pl-mentors-h{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#aaa;margin-bottom:12px}
        .pl-mentor{display:flex;align-items:center;gap:12px;margin-bottom:12px}
        .pl-mentor-av{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;flex-shrink:0}
        .pl-mentor-n{font-size:14px;font-weight:800;color:#0a0a0a}
        .pl-mentor-r{font-size:12px;color:#888}
        .pl-bc-interactive{padding:14px 16px;border-radius:14px;background:#ecfdf5;border:1px solid rgba(16,185,129,.15);margin-top:auto}
        .pl-bc-interactive h5{font-size:13px;font-weight:700;color:#10b981;margin-bottom:3px}
        .pl-bc-interactive p{font-size:12px;color:#666;line-height:1.5}

        .pl-bc-cols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
        .pl-daycard{padding:24px 20px;border-radius:18px;background:#fafaff;border:1px solid #eeeef8}
        .pl-daycard.d2{background:linear-gradient(145deg,#312e81,#4338ca);border:none;position:relative;overflow:hidden}
        .pl-daycard.d2::after{content:'';position:absolute;top:-30px;right:-30px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.06);pointer-events:none}
        .pl-daypill{display:inline-flex;align-items:center;gap:7px;margin-bottom:16px}
        .pl-daypill em{font-style:normal;padding:3px 11px;border-radius:100px;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.06em}
        .pl-daypill span{font-size:10px;font-weight:600}
        .pl-daycard h4{font-size:14px;font-weight:800;margin-bottom:16px;line-height:1.3}
        .pl-dayitem{display:flex;gap:9px;align-items:flex-start;margin-bottom:10px}
        .pl-daydot{width:5px;height:5px;border-radius:50%;flex-shrink:0;margin-top:5px}
        .pl-daytime{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.04em}
        .pl-daytxt{font-size:12px;line-height:1.5}
        .pl-take{display:flex;align-items:center;gap:9px;margin-bottom:10px}
        .pl-take span:first-child{font-size:15px;flex-shrink:0}
        .pl-take span:last-child{font-size:13px;font-weight:600;color:#555}

        /* ═══ PORTALS ═══ */
        .pl-portals{padding:56px 32px;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;background:#fafafa}
        .pl-portals-in{max-width:1000px;margin:0 auto;text-align:center}
        .pl-portals-lbl{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#aaa;margin-bottom:24px}
        .pl-portals-row{display:flex;align-items:center;justify-content:center;gap:48px;flex-wrap:wrap}
        .pl-ppill{font-size:16px;font-weight:700;color:#ccc;letter-spacing:-.3px;transition:color .3s}
        .pl-ppill:hover{color:#666}

        /* ═══ SERVICES ═══ */
        .pl-svc{padding:120px 32px;max-width:1200px;margin:0 auto}
        .pl-slbl{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#6366f1;text-align:center;margin-bottom:12px}
        .pl-stitle{font-size:44px;font-weight:900;letter-spacing:-1.5px;text-align:center;margin-bottom:16px;color:#0a0a0a;line-height:1.1}
        .pl-ssub{font-size:18px;color:#666;text-align:center;max-width:580px;margin:0 auto 64px;line-height:1.6}
        .pl-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .pl-scard{position:relative;background:#fff;border:1px solid #eee;border-radius:20px;padding:40px 32px 36px;transition:all .4s cubic-bezier(.16,1,.3,1);overflow:hidden}
        .pl-scard:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,.08);border-color:transparent}
        .pl-scard::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#6366f1,#8b5cf6);opacity:0;transition:opacity .3s}
        .pl-scard:hover::before{opacity:1}
        .pl-sicon{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:20px}
        .pl-scard h3{font-size:20px;font-weight:800;margin-bottom:10px;letter-spacing:-.3px}
        .pl-scard p{font-size:15px;color:#666;line-height:1.6}
        .pl-stag{display:inline-block;margin-top:16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;padding:4px 10px;border-radius:6px}

        /* ═══ PROBLEM ═══ */
        .pl-prob{padding:120px 32px;background:#0a0a0a;color:#fff;position:relative;overflow:hidden}
        .pl-prob-glow{position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(99,102,241,.15) 0%,transparent 70%);pointer-events:none}
        .pl-prob-in{max-width:800px;margin:0 auto;text-align:center;position:relative}
        .pl-prob-in .pl-slbl{color:#818cf8}
        .pl-prob-in .pl-stitle{color:#fff}
        .pl-prob-copy{font-size:18px;color:#999;line-height:1.8;max-width:600px;margin:0 auto 56px}
        .pl-pain-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;margin:0 auto}
        .pl-paincard{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px 24px;text-align:left;transition:all .3s}
        .pl-paincard:hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12)}
        .pl-painico{font-size:32px;margin-bottom:14px}
        .pl-paincard h4{font-size:16px;font-weight:700;margin-bottom:8px;color:#fff}
        .pl-paincard p{font-size:14px;color:#888;line-height:1.6}

        /* ═══ HOW IT WORKS ═══ */
        .pl-how{padding:120px 32px;max-width:1000px;margin:0 auto}
        .pl-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:48px;margin-top:64px;position:relative}
        .pl-steps::before{content:'';position:absolute;top:36px;left:15%;right:15%;height:2px;background:linear-gradient(90deg,#e0e0e0 0%,#6366f1 50%,#e0e0e0 100%)}
        .pl-step{text-align:center;position:relative}
        .pl-step-n{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:28px;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;position:relative;z-index:1;box-shadow:0 8px 32px rgba(99,102,241,.25)}
        .pl-step h3{font-size:18px;font-weight:800;margin-bottom:8px}
        .pl-step p{font-size:14px;color:#666;line-height:1.6;max-width:260px;margin:0 auto}

        /* ═══ BENEFITS ═══ */
        .pl-bene{padding:120px 32px;background:#0a0a0a;color:#fff;position:relative;overflow:hidden}
        .pl-bene-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:500px;background:radial-gradient(ellipse,rgba(99,102,241,.1) 0%,transparent 70%);pointer-events:none}
        .pl-bene .pl-slbl{color:#818cf8}
        .pl-bene .pl-stitle{color:#fff}
        .pl-bene .pl-ssub{color:#888}
        .pl-bene-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1100px;margin:0 auto;position:relative}
        .pl-bcard{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:32px 28px;transition:all .3s}
        .pl-bcard:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.14);transform:translateY(-2px)}
        .pl-bcard-ico{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:18px}
        .pl-bcard h4{font-size:17px;font-weight:800;margin-bottom:8px;color:#fff}
        .pl-bcard p{font-size:14px;color:#888;line-height:1.6}
        .pl-scarcity{text-align:center;margin-top:48px;max-width:500px;margin-left:auto;margin-right:auto;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);padding:18px 28px;border-radius:14px;font-size:15px;color:#a78bfa;font-weight:700;position:relative}

        /* ═══ FINAL CTA ═══ */
        .pl-cta{padding:120px 32px;text-align:center;background:#0a0a0a;color:#fff;position:relative;overflow:hidden}
        .pl-cta-glow{position:absolute;bottom:-100px;left:50%;transform:translateX(-50%);width:800px;height:400px;background:radial-gradient(ellipse,rgba(99,102,241,.2) 0%,transparent 70%);pointer-events:none}
        .pl-cta-in{position:relative;max-width:600px;margin:0 auto}
        .pl-cta h2{font-size:44px;font-weight:900;letter-spacing:-1.5px;margin-bottom:16px;line-height:1.1}
        .pl-cta .pl-grad2{background:linear-gradient(135deg,#818cf8,#a78bfa,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .pl-cta>div p{font-size:17px;color:#888;margin-bottom:36px;line-height:1.6}
        .pl-cta .pl-form{max-width:480px;margin:0 auto 16px}
        .pl-cta .pl-input{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:#fff}
        .pl-cta .pl-input:focus{border-color:#6366f1;box-shadow:0 0 0 4px rgba(99,102,241,.15)}
        .pl-cta .pl-input::placeholder{color:#555}
        .pl-cta .pl-ok{color:#a3e635}

        /* ═══ FOOTER ═══ */
        .pl-ft{padding:56px 32px 40px;border-top:1px solid #f0f0f0}
        .pl-ft-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2.5fr 1fr 1fr 1fr;gap:48px}
        .pl-ft-brand h3{font-size:20px;font-weight:900;margin-bottom:10px}
        .pl-ft-brand p{font-size:14px;color:#888;line-height:1.6;max-width:280px}
        .pl-ft-col h4{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#999;margin-bottom:16px}
        .pl-ft-col a{display:block;font-size:14px;color:#555;text-decoration:none;margin-bottom:10px;transition:color .2s;font-weight:500}
        .pl-ft-col a:hover{color:#6366f1}
        .pl-ft-bot{max-width:1200px;margin:32px auto 0;padding-top:24px;border-top:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#aaa}

        /* ═══ RESPONSIVE ═══ */
        @media(max-width:1024px){
          .pl-svc-grid{grid-template-columns:repeat(2,1fr)}
          .pl-bene-grid{grid-template-columns:repeat(2,1fr)}
          .pl-ft-in{grid-template-columns:1fr 1fr;gap:32px}
        }
        @media(max-width:768px){
          .pl-nav-links{display:none}
          .pl-hero{padding:130px 20px 70px}
          .pl-hero h1{font-size:38px;letter-spacing:-1.5px}
          .pl-hero-sub{font-size:16px;margin-bottom:32px}
          .pl-form{flex-direction:column}
          .pl-btn{width:100%;text-align:center}
          .pl-stitle{font-size:32px}
          .pl-ssub{font-size:16px}
          .pl-svc{padding:80px 20px}
          .pl-svc-grid{grid-template-columns:1fr}
          .pl-pain-grid{grid-template-columns:1fr;max-width:400px}
          .pl-steps{grid-template-columns:1fr;gap:40px}
          .pl-steps::before{display:none}
          .pl-ft-in{grid-template-columns:1fr;gap:24px}
          .pl-ft-bot{flex-direction:column;gap:8px;text-align:center}
          .pl-cta h2{font-size:32px}
          .pl-prob{padding:80px 20px}
          .pl-prob-copy{font-size:16px}
          .pl-how{padding:80px 20px}
          .pl-bene{padding:80px 20px}
          .pl-bene-grid{grid-template-columns:1fr}
          .pl-portals-row{gap:28px}
          .pl-bc{padding:0 20px 80px}
          .pl-bc-head{padding:28px 24px;gap:16px}
          .pl-bc-h{font-size:20px}
          .pl-bc-body{grid-template-columns:1fr;padding:24px;gap:24px}
          .pl-bc-cols{grid-template-columns:1fr}
          .pl-bc-right{flex-wrap:wrap}
        }
        @media(max-width:480px){
          .pl-hero{padding:120px 16px 60px}
          .pl-hero h1{font-size:30px}
          .pl-stitle{font-size:26px}
          .pl-cta{padding:80px 16px}
          .pl-cta h2{font-size:26px}
          .pl-nav-in{padding:0 16px}
          .pl-nav-cta{padding:8px 16px;font-size:13px}
          .pl-portals-row{gap:20px}
          .pl-ppill{font-size:14px}
          .pl-bc{padding:0 16px 60px}
          .pl-bc-head{padding:20px 16px}
          .pl-bc-h{font-size:17px}
          .pl-bc-body{padding:20px 16px}
          .pl-bc-amt{font-size:28px}
          .pl-bc-reg{padding:12px 24px;font-size:13px}
        }
      `}</style>

      <div className="pl">
        {/* ═══ NAV ═══ */}
        <nav className="pl-nav">
          <div className="pl-nav-in">
            <a href="/pre-launch" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}><JobngenLogo height={26} /></a>
            <div className="pl-nav-links">
              <a href="#bootcamp" className="pl-nav-a">Bootcamp</a>
              <a href="#services" className="pl-nav-a">Services</a>
              <a href="#how" className="pl-nav-a">How it Works</a>
            </div>
            <button className="pl-nav-cta" onClick={() => document.getElementById("hero-email")?.focus()}>Join Waitlist</button>
          </div>
        </nav>

        {/* ═══ HERO ═══ */}
        <section className="pl-hero">
          <div className="pl-hero-bg" />
          <div className="pl-hero-in">
            <div className="pl-chip"><span className="pl-dot" />Launching Soon</div>
            <h1>Your entire job search.<br /><span className="pl-grad">One intelligent platform.</span></h1>
            <p className="pl-hero-sub">Jobngen brings every job portal, AI-powered resume tools, salary data, and interview prep into one command center — built for India.</p>
            {submitted ? (
              <p className="pl-ok">You&apos;re on the list! We&apos;ll notify you at launch.</p>
            ) : (
              <form className="pl-form" onSubmit={(e) => handleSubmit(e, "hero")}>
                <input id="hero-email" className="pl-input" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button className="pl-btn" type="submit">Get Early Access</button>
              </form>
            )}
            <p className="pl-note">Free forever for early members. No spam, ever.</p>
          </div>
        </section>

        {/* ═══ BOOTCAMP — right below hero ═══ */}
        <section className="pl-bc" id="bootcamp">
          <div className="pl-bc-wrap">
            <Reveal>
              <div className="pl-bc-card">
                {/* Header */}
                <div className="pl-bc-head">
                  <div className="pl-bc-left">
                    <div className="pl-live"><span className="pl-live-d" />Live &middot; 14-15 March 2026</div>
                    <div className="pl-bc-h">2-Day AI Bootcamp + Hackathon</div>
                  </div>
                  <div className="pl-bc-right">
                    <div className="pl-bc-price">
                      <div className="pl-bc-amt">&#8377;29</div>
                      <div className="pl-bc-psub">Online &middot; Limited seats</div>
                    </div>
                    <a href="/register" className="pl-bc-reg">
                      Register Now
                      <svg width="14" height="14" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                </div>

                {/* Body */}
                <div className="pl-bc-body">
                  {/* Left meta */}
                  <div className="pl-bc-meta">
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div className="pl-bc-daterow">
                        <span className="ico">&#128197;</span>
                        <div><div className="label">Saturday, 14 March</div><div className="sub">8:30 AM - 6 PM &middot; 4 sessions</div></div>
                      </div>
                      <div className="pl-bc-daterow">
                        <span className="ico">&#9889;</span>
                        <div><div className="label">Sunday, 15 March</div><div className="sub">9 AM - 9 PM &middot; Hackathon</div></div>
                      </div>
                    </div>
                    <div className="pl-bc-hr" />
                    <div>
                      <div className="pl-mentors-h">Your Mentors</div>
                      <div className="pl-mentor">
                        <div className="pl-mentor-av" style={{ background: "#eef2ff", color: "#4338ca" }}>AD</div>
                        <div><div className="pl-mentor-n">Aditya Dubey</div><div className="pl-mentor-r">Sr. AI Engineer</div></div>
                      </div>
                      <div className="pl-mentor">
                        <div className="pl-mentor-av" style={{ background: "#f5f3ff", color: "#7c3aed" }}>SK</div>
                        <div><div className="pl-mentor-n">Shubham Kaushik</div><div className="pl-mentor-r">Gen AI Consultant &middot; KPMG</div></div>
                      </div>
                    </div>
                    <div className="pl-bc-interactive">
                      <h5>&#127919; Fully Interactive</h5>
                      <p>You build throughout. No passive watching — mentors resolve blockers live.</p>
                    </div>
                  </div>

                  {/* Right columns */}
                  <div className="pl-bc-cols">
                    {/* Day 1 */}
                    <div className="pl-daycard">
                      <div className="pl-daypill">
                        <em style={{ background: "#eef2ff", color: "#4338ca" }}>Day 1</em>
                        <span style={{ color: "#999" }}>Sat</span>
                      </div>
                      <h4 style={{ color: "#0a0a0a" }}>AI/ML/DL + RAG Masterclass</h4>
                      {[
                        { time: "8:30 AM", text: "AI/ML/DL Technical Deep Dive" },
                        { time: "11:00 AM", text: "RAG Architecture + Implementation" },
                        { time: "2:00 PM", text: "Live RAG Project Build (hands-on)" },
                        { time: "6-7 PM", text: "Hackathon problem via Google Form" },
                      ].map((d) => (
                        <div className="pl-dayitem" key={d.time}>
                          <div className="pl-daydot" style={{ background: "#4338ca" }} />
                          <div>
                            <div className="pl-daytime" style={{ color: "#4338ca" }}>{d.time}</div>
                            <div className="pl-daytxt" style={{ color: "#555" }}>{d.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Day 2 */}
                    <div className="pl-daycard d2">
                      <div style={{ position: "relative" }}>
                        <div className="pl-daypill">
                          <em style={{ background: "rgba(255,255,255,.15)", color: "#fff" }}>Day 2</em>
                          <span style={{ color: "rgba(255,255,255,.5)" }}>Sun &middot; Hackathon</span>
                        </div>
                        <h4 style={{ color: "#fff" }}>Build Real AI in 1 Day</h4>
                        {["9 AM - 9 PM full-day build", "1 major AI project, end-to-end", "Full mentor support all day", "Winners: paid internships &#127942;"].map((item) => (
                          <div className="pl-dayitem" key={item}>
                            <div className="pl-daydot" style={{ background: "rgba(255,255,255,.5)" }} />
                            <div className="pl-daytxt" style={{ color: "rgba(255,255,255,.85)" }} dangerouslySetInnerHTML={{ __html: item }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Takeaways */}
                    <div className="pl-daycard">
                      <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: "#aaa", marginBottom: 16 }}>What You Take Home</div>
                      {[
                        { icon: "&#128196;", text: "ATS-proof resume" },
                        { icon: "&#128218;", text: "Full lecture notes" },
                        { icon: "&#128506;", text: "3-month AI roadmap" },
                        { icon: "&#128188;", text: "Paid internship (winners)" },
                        { icon: "&#129309;", text: "Community peer network" },
                      ].map((p) => (
                        <div className="pl-take" key={p.text}>
                          <span dangerouslySetInnerHTML={{ __html: p.icon }} />
                          <span>{p.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ PORTALS ═══ */}
        <Reveal>
          <section className="pl-portals">
            <div className="pl-portals-in">
              <p className="pl-portals-lbl">Aggregating jobs from all major platforms</p>
              <div className="pl-portals-row">
                {["Naukri", "LinkedIn", "Indeed", "Internshala", "Glassdoor", "Foundit", "Wellfound"].map((p) => (
                  <span className="pl-ppill" key={p}>{p}</span>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══ SERVICES ═══ */}
        <section className="pl-svc" id="services">
          <Reveal>
            <p className="pl-slbl">What We&apos;re Building</p>
            <h2 className="pl-stitle">Six powerful services.<br />One platform.</h2>
            <p className="pl-ssub">Everything a job seeker in India needs — from discovery to offer letter. No more tab-switching, no more guesswork.</p>
          </Reveal>
          <div className="pl-svc-grid">
            {[
              { icon: "&#128269;", bg: "#eef2ff", title: "Unified Job Feed", desc: "All portals in one smart feed. Filter by role, location, salary, experience level — search once, see everything.", tag: "Core", tagBg: "#eef2ff", tagC: "#6366f1" },
              { icon: "&#128196;", bg: "#f0fdf4", title: "AI Resume Tailoring", desc: "Paste any job description, get a resume optimized with the right keywords. Beat ATS filters, land more interviews.", tag: "AI-Powered", tagBg: "#f0fdf4", tagC: "#16a34a" },
              { icon: "&#128176;", bg: "#fffbeb", title: "Salary Intelligence", desc: "Real salary data by role, city, and experience. Know what companies actually pay before you negotiate.", tag: "Data", tagBg: "#fffbeb", tagC: "#d97706" },
              { icon: "&#127908;", bg: "#fdf2f8", title: "AI Mock Interviews", desc: "Practice with Vibe, our AI coach. Behavioral, technical, HR rounds — with real-time feedback and scoring.", tag: "AI Coach", tagBg: "#fdf2f8", tagC: "#db2777" },
              { icon: "&#128203;", bg: "#f0f9ff", title: "Application Tracker", desc: "Track every application in a visual pipeline. Applied, screening, interview, offer — never lose track again.", tag: "Productivity", tagBg: "#f0f9ff", tagC: "#0284c7" },
              { icon: "&#128276;", bg: "#faf5ff", title: "Smart Job Alerts", desc: "Set your criteria once. Get notified instantly when matching jobs appear across any portal.", tag: "Automation", tagBg: "#faf5ff", tagC: "#9333ea" },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="pl-scard">
                  <div className="pl-sicon" style={{ background: s.bg }} dangerouslySetInnerHTML={{ __html: s.icon }} />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="pl-stag" style={{ background: s.tagBg, color: s.tagC }}>{s.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ PROBLEM ═══ */}
        <section className="pl-prob">
          <div className="pl-prob-glow" />
          <div className="pl-prob-in">
            <Reveal>
              <p className="pl-slbl">The Problem</p>
              <h2 className="pl-stitle">Job search in India is broken.</h2>
              <p className="pl-prob-copy">You open 5 tabs, copy-paste the same resume everywhere, never hear back, and have zero idea what salary to expect. Sound familiar?</p>
            </Reveal>
            <div className="pl-pain-grid">
              {[
                { icon: "&#128561;", title: "5+ portals, zero clarity", desc: "Juggling Naukri, LinkedIn, Indeed — same listings, different formats, no unified view. Hours wasted daily." },
                { icon: "&#128196;", title: "One resume for all roles", desc: "Your generic resume gets auto-rejected by ATS. You never know which keywords matter for which role." },
                { icon: "&#128566;", title: "No salary transparency", desc: "\"Salary as per industry standards\" — you deserve real numbers and market data before you even apply." },
              ].map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <div className="pl-paincard">
                    <div className="pl-painico" dangerouslySetInnerHTML={{ __html: p.icon }} />
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="pl-how" id="how">
          <Reveal>
            <p className="pl-slbl">How It Works</p>
            <h2 className="pl-stitle">Three steps to your next offer.</h2>
            <p className="pl-ssub">No learning curve. No complex setup. Just sign up and let Jobngen handle the rest.</p>
          </Reveal>
          <div className="pl-steps">
            {[
              { num: "1", title: "Connect Your Search", desc: "Set your role, location, and salary expectations. We instantly aggregate matching jobs from every portal." },
              { num: "2", title: "Apply Smarter with AI", desc: "Tailor your resume per job, track applications, and get salary insights — all from one dashboard." },
              { num: "3", title: "Land the Interview", desc: "Practice with our AI coach, negotiate with real data, and walk into every interview fully prepared." },
            ].map((s, i) => (
              <Reveal key={s.num} delay={i * 120}>
                <div className="pl-step">
                  <div className="pl-step-n">{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ BENEFITS ═══ */}
        <section className="pl-bene">
          <div className="pl-bene-glow" />
          <Reveal>
            <p className="pl-slbl">Early Access</p>
            <h2 className="pl-stitle">Get in before everyone else.</h2>
            <p className="pl-ssub">Join the waitlist now and unlock perks that won&apos;t be available after public launch.</p>
          </Reveal>
          <div className="pl-bene-grid">
            {[
              { icon: "&#9889;", bg: "rgba(99,102,241,.12)", title: "Free forever plan", desc: "Early members get all premium features at zero cost — forever. No bait-and-switch." },
              { icon: "&#128161;", bg: "rgba(234,179,8,.12)", title: "Priority feature requests", desc: "Direct line to our product team. Tell us what to build — your feedback shapes the roadmap." },
              { icon: "&#129309;", bg: "rgba(139,92,246,.12)", title: "Exclusive community", desc: "Private group with founders, hiring managers at top companies, and fellow ambitious candidates." },
              { icon: "&#127942;", bg: "rgba(236,72,153,.12)", title: "Beta tester badge", desc: "Get recognized in the community. First to try every new feature before public release." },
              { icon: "&#128196;", bg: "rgba(16,185,129,.12)", title: "Resume review by founders", desc: "Get your resume personally reviewed and optimized by the Jobngen founding team." },
              { icon: "&#128640;", bg: "rgba(59,130,246,.12)", title: "Launch day priority", desc: "Be the first to access Jobngen on launch day. Skip the queue, start immediately." },
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <div className="pl-bcard">
                  <div className="pl-bcard-ico" style={{ background: b.bg }} dangerouslySetInnerHTML={{ __html: b.icon }} />
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={450}>
            <div className="pl-scarcity">Early access is limited. Join the waitlist to secure your free-forever plan.</div>
          </Reveal>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="pl-cta">
          <div className="pl-cta-glow" />
          <div className="pl-cta-in">
            <Reveal>
              <h2>Something big is <span className="pl-grad2">coming.</span></h2>
              <p>Be first in line when Jobngen launches. Sign up and we&apos;ll notify you on day one.</p>
              {submitted2 ? (
                <p className="pl-ok">Welcome to Jobngen! We&apos;ll be in touch.</p>
              ) : (
                <form className="pl-form" onSubmit={(e) => handleSubmit(e, "cta")}>
                  <input className="pl-input" type="email" placeholder="Enter your email address" value={email2} onChange={(e) => setEmail2(e.target.value)} required />
                  <button className="pl-btn" type="submit">Join the Waitlist</button>
                </form>
              )}
            </Reveal>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="pl-ft">
          <div className="pl-ft-in">
            <div className="pl-ft-brand">
              <JobngenLogo height={24} style={{ marginBottom: 10 }} />
              <p>AI-powered job search built for India. One platform, every portal, zero noise.</p>
            </div>
            <div className="pl-ft-col">
              <h4>Product</h4>
              <a href="#services">Services</a>
              <a href="#bootcamp">Bootcamp</a>
              <a href="#how">How it Works</a>
            </div>
            <div className="pl-ft-col">
              <h4>Company</h4>
              <a href="/landing">About Us</a>
              <a href="mailto:hello@jobngen.com">Contact</a>
              <a href="/register">Early Access</a>
            </div>
            <div className="pl-ft-col">
              <h4>Connect</h4>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
          <div className="pl-ft-bot">
            <span>&copy; 2026 Jobngen. All rights reserved.</span>
            <span>Built with purpose in India</span>
          </div>
        </footer>
      </div>
    </>
  )
}
