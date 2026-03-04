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

        /* ═══ KEYFRAMES ═══ */
        @keyframes pl-p{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
        @keyframes pl-grad-shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes pl-float-1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.05)}66%{transform:translate(-20px,-50px) scale(.97)}}
        @keyframes pl-float-2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-30px,40px) scale(.96)}66%{transform:translate(25px,15px) scale(1.04)}}
        @keyframes pl-float-3{0%,100%{transform:translate(0,0)}50%{transform:translate(-15px,-25px)}}
        @keyframes pl-shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        @keyframes pl-count{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pl-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

        /* ═══ NAV ═══ */
        .pl-nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,.72);backdrop-filter:blur(24px) saturate(180%);border-bottom:1px solid rgba(0,0,0,.04)}
        .pl-nav-in{max-width:1200px;margin:0 auto;padding:0 32px;height:72px;display:flex;align-items:center;justify-content:space-between}
        .pl-nav-links{display:flex;gap:32px}
        .pl-nav-a{font-size:14px;font-weight:500;color:#666;text-decoration:none;transition:color .25s}
        .pl-nav-a:hover{color:#1d3a8f}
        .pl-nav-cta{background:linear-gradient(135deg,#2a4ecf,#3b52f0);color:#fff;border:none;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all .3s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 12px rgba(42,78,207,.25)}
        .pl-nav-cta:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(42,78,207,.4)}
        .pl-nav-cta:active{transform:translateY(0) scale(.97)}

        /* ═══ HERO ═══ */
        .pl-hero{position:relative;padding:180px 32px 120px;text-align:center;overflow:hidden;background:linear-gradient(170deg,#eef2ff 0%,#f8f9ff 30%,#fff 60%,#f0f4ff 100%)}
        .pl-hero-orb1{position:absolute;top:-120px;left:-8%;width:650px;height:650px;border-radius:50%;background:radial-gradient(circle,rgba(42,78,207,.14) 0%,rgba(59,82,240,.06) 40%,transparent 70%);pointer-events:none;animation:pl-float-1 22s ease-in-out infinite;filter:blur(60px)}
        .pl-hero-orb2{position:absolute;bottom:-100px;right:-6%;width:550px;height:550px;border-radius:50%;background:radial-gradient(circle,rgba(59,82,240,.12) 0%,rgba(42,78,207,.04) 40%,transparent 70%);pointer-events:none;animation:pl-float-2 28s ease-in-out infinite;filter:blur(50px)}
        .pl-hero-orb3{position:absolute;top:35%;left:55%;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.07) 0%,transparent 60%);pointer-events:none;animation:pl-float-3 18s ease-in-out infinite;filter:blur(40px)}
        .pl-hero::after{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(42,78,207,.035) 1px,transparent 1px);background-size:32px 32px;mask-image:radial-gradient(ellipse 80% 60% at 50% 35%,black 10%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse 80% 60% at 50% 35%,black 10%,transparent 70%);pointer-events:none}
        .pl-hero-in{position:relative;max-width:800px;margin:0 auto;z-index:1;width:100%}
        .pl-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.65);backdrop-filter:blur(16px);border:1px solid rgba(42,78,207,.1);padding:8px 20px;border-radius:100px;font-size:13px;font-weight:600;color:#2a4ecf;margin-bottom:40px;box-shadow:0 4px 16px rgba(42,78,207,.06)}
        .pl-dot{width:8px;height:8px;background:#22c55e;border-radius:50%;box-shadow:0 0 8px rgba(34,197,94,.4);animation:pl-p 2s infinite}
        .pl-hero h1{font-size:72px;font-weight:900;letter-spacing:-3.5px;line-height:1.0;margin-bottom:28px}
        .pl-grad{background:linear-gradient(135deg,#0d1b45,#1d3a8f,#2a4ecf,#3b52f0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:300% auto;animation:pl-grad-shift 6s ease-in-out infinite}
        .pl-hero-sub{font-size:20px;color:#555;line-height:1.7;max-width:560px;margin:0 auto 44px}
        .pl-form{display:flex;gap:10px;max-width:500px;margin:0 auto 16px}
        .pl-input{flex:1;padding:16px 22px;border:1.5px solid rgba(0,0,0,.08);border-radius:14px;font-size:15px;outline:none;transition:all .3s;background:rgba(255,255,255,.8);backdrop-filter:blur(8px);font-family:inherit}
        .pl-input:focus{border-color:#2a4ecf;box-shadow:0 0 0 4px rgba(42,78,207,.1)}
        .pl-btn{background:linear-gradient(135deg,#1d3a8f,#2a4ecf,#3b52f0);color:#fff;border:none;padding:16px 34px;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 4px 20px rgba(42,78,207,.35);font-family:inherit;position:relative;overflow:hidden}
        .pl-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(255,255,255,.2) 0%,transparent 60%);pointer-events:none;border-radius:inherit}
        .pl-btn:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 8px 32px rgba(42,78,207,.5)}
        .pl-btn:active{transform:translateY(0) scale(.97)}
        .pl-ok{color:#16a34a;font-size:15px;font-weight:600;padding:16px 0}
        .pl-note{font-size:13px;color:#999;margin-top:4px}

        /* Social proof */
        .pl-social{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:36px}
        .pl-avatars{display:flex}
        .pl-av{width:34px;height:34px;border-radius:50%;border:2.5px solid #fff;margin-left:-10px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.1)}
        .pl-av:first-child{margin-left:0}
        .pl-social-txt{font-size:14px;color:#777;font-weight:500}
        .pl-social-txt strong{color:#0a0a0a;font-weight:800}

        /* ═══ BOOTCAMP — PREMIUM ═══ */
        .pl-bc{padding:60px 32px 100px;position:relative;background:#fafafa}
        .pl-bc-wrap{max-width:1100px;margin:0 auto;position:relative}
        .pl-bc-card{border-radius:28px;overflow:hidden;background:#fff;border:1px solid rgba(0,0,0,.06);box-shadow:0 24px 80px rgba(0,0,0,.08),0 0 0 1px rgba(42,78,207,.04)}
        .pl-bc-head{background:linear-gradient(135deg,#060d24 0%,#0d1b45 40%,#1d3a8f 100%);padding:36px 40px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;position:relative;overflow:hidden}
        .pl-bc-head::before{content:'';position:absolute;top:-80px;right:-40px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(59,82,240,.3),transparent 70%);pointer-events:none}
        .pl-bc-head::after{content:'';position:absolute;bottom:-60px;left:20%;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(42,78,207,.2),transparent 70%);pointer-events:none}
        .pl-bc-left{display:flex;align-items:center;gap:16px;flex-wrap:wrap;position:relative}
        .pl-live{display:inline-flex;align-items:center;gap:7px;padding:6px 16px;border-radius:100px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);font-size:11px;font-weight:800;color:#fff;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;backdrop-filter:blur(8px)}
        .pl-live-d{width:7px;height:7px;border-radius:50%;background:#f87171;animation:pl-p 1.5s infinite}
        .pl-bc-h{font-size:24px;font-weight:900;color:#fff;letter-spacing:-.5px}
        .pl-bc-right{display:flex;align-items:center;gap:20px;flex-shrink:0;position:relative}
        .pl-bc-price{text-align:right}
        .pl-bc-amt{font-size:36px;font-weight:900;color:#fff;line-height:1}
        .pl-bc-psub{font-size:11px;color:rgba(255,255,255,.5);margin-top:3px}
        .pl-bc-reg{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:14px;background:#fff;color:#1d3a8f;font-size:14px;font-weight:800;text-decoration:none;box-shadow:0 4px 24px rgba(0,0,0,.2);transition:all .3s cubic-bezier(.16,1,.3,1);white-space:nowrap}
        .pl-bc-reg:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 8px 32px rgba(0,0,0,.28)}
        .pl-bc-reg:active{transform:translateY(0) scale(.97)}

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
        .pl-daycard{padding:24px 20px;border-radius:18px;background:#f5f7fe;border:1px solid #e3e8fc}
        .pl-daycard.d2{background:linear-gradient(145deg,#0d1b45,#1d3a8f);border:none;position:relative;overflow:hidden}
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

        /* ═══ PORTALS — infinite ticker ═══ */
        .pl-portals{padding:48px 0;background:#fff;border-bottom:1px solid rgba(0,0,0,.04);overflow:hidden;position:relative}
        .pl-portals-lbl{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:#aaa;margin-bottom:28px;text-align:center;padding:0 32px}
        .pl-portals-track{display:flex;width:max-content;animation:pl-scroll 20s linear infinite}
        .pl-portals-track:hover{animation-play-state:paused}
        .pl-ppill{display:inline-flex;align-items:center;gap:10px;padding:10px 36px;font-size:16px;font-weight:800;color:#b0b8c9;letter-spacing:-.3px;white-space:nowrap;transition:color .3s}
        .pl-ppill-dot{width:5px;height:5px;border-radius:50%;background:rgba(42,78,207,.15)}
        .pl-portals::before,.pl-portals::after{content:'';position:absolute;top:0;bottom:0;width:120px;z-index:2;pointer-events:none}
        .pl-portals::before{left:0;background:linear-gradient(90deg,#fff 20%,transparent)}
        .pl-portals::after{right:0;background:linear-gradient(270deg,#fff 20%,transparent)}

        /* ═══ STATS ═══ */
        .pl-stats{padding:72px 32px;background:#fff}
        .pl-stats-in{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;text-align:center}
        .pl-stat{padding:32px 24px;border-radius:20px;background:linear-gradient(145deg,#f8f9ff,#fff);border:1px solid rgba(42,78,207,.06)}
        .pl-stat-n{font-size:48px;font-weight:900;letter-spacing:-2px;background:linear-gradient(135deg,#0d1b45,#2a4ecf);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.1}
        .pl-stat-l{font-size:14px;color:#888;font-weight:500;margin-top:6px}

        /* ═══ SERVICES — bento ═══ */
        .pl-svc{padding:80px 32px 88px;background:#f8f9ff;position:relative}
        .pl-svc::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(42,78,207,.08),transparent)}
        .pl-svc-inner{max-width:1080px;margin:0 auto}
        .pl-slbl{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#2a4ecf;text-align:center;margin-bottom:12px}
        .pl-stitle{font-size:48px;font-weight:900;letter-spacing:-2px;text-align:center;margin-bottom:16px;color:#0a0a0a;line-height:1.08}
        .pl-ssub{font-size:18px;color:#666;text-align:center;max-width:580px;margin:0 auto 64px;line-height:1.6}
        .pl-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:auto auto;gap:16px}
        .pl-scard{position:relative;background:#fff;border:1px solid rgba(0,0,0,.05);border-radius:18px;padding:24px 22px;transition:all .35s cubic-bezier(.16,1,.3,1);overflow:hidden;display:flex;gap:16px;align-items:flex-start}
        .pl-scard:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(29,58,143,.1),0 0 0 1px rgba(42,78,207,.08);border-color:transparent}
        .pl-sicon{width:46px;height:46px;min-width:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:22px}
        .pl-scard-txt h3{font-size:16px;font-weight:800;margin-bottom:4px;letter-spacing:-.2px;line-height:1.3}
        .pl-scard-txt p{font-size:13px;color:#777;line-height:1.5}
        .pl-stag{display:inline-block;margin-top:8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;padding:3px 8px;border-radius:5px}

        /* ═══ PROBLEM — contained dark card ═══ */
        .pl-prob{padding:100px 32px;background:#fff;position:relative}
        .pl-prob-card{max-width:1100px;margin:0 auto;border-radius:32px;background:linear-gradient(135deg,#060d24 0%,#0d1b45 40%,#142a6a 100%);padding:80px 60px;position:relative;overflow:hidden;box-shadow:0 32px 80px rgba(6,13,36,.3)}
        .pl-prob-card::before{content:'';position:absolute;top:-100px;right:-50px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(42,78,207,.2),transparent 70%);pointer-events:none;animation:pl-float-1 20s ease-in-out infinite}
        .pl-prob-card::after{content:'';position:absolute;bottom:-80px;left:10%;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(59,82,240,.15),transparent 70%);pointer-events:none;animation:pl-float-2 24s ease-in-out infinite}
        .pl-prob-in{max-width:800px;margin:0 auto;text-align:center;position:relative;z-index:1}
        .pl-prob-in .pl-slbl{color:#6074f3}
        .pl-prob-in .pl-stitle{color:#fff}
        .pl-prob-copy{font-size:18px;color:rgba(255,255,255,.6);line-height:1.8;max-width:600px;margin:0 auto 56px}
        .pl-pain-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;margin:0 auto}
        .pl-paincard{background:rgba(255,255,255,.06);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:28px 24px;text-align:left;transition:all .4s cubic-bezier(.16,1,.3,1)}
        .pl-paincard:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.15);transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.2)}
        .pl-painico{font-size:32px;margin-bottom:14px}
        .pl-paincard h4{font-size:16px;font-weight:700;margin-bottom:8px;color:#fff}
        .pl-paincard p{font-size:14px;color:rgba(255,255,255,.55);line-height:1.6}

        /* ═══ YOUR JOURNEY ═══ */
        .pl-how{padding:80px 32px 88px;background:#f8f9ff;position:relative}
        .pl-how::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(42,78,207,.08),transparent)}
        .pl-how-inner{max-width:900px;margin:0 auto}
        .pl-journey{display:flex;flex-direction:column;gap:0;margin-top:48px;position:relative}
        .pl-journey::before{content:'';position:absolute;top:24px;bottom:24px;left:23px;width:2px;background:linear-gradient(180deg,#2a4ecf,rgba(42,78,207,.1));z-index:0}
        .pl-jstep{display:flex;gap:20px;align-items:flex-start;padding:20px 0;position:relative;z-index:1}
        .pl-jstep-dot{width:48px;min-width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#1d3a8f,#2a4ecf);color:#fff;font-size:18px;font-weight:900;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(42,78,207,.25),0 0 0 4px #f8f9ff}
        .pl-jstep-body{flex:1;padding:4px 0 0}
        .pl-jstep-body h3{font-size:17px;font-weight:800;margin-bottom:4px;letter-spacing:-.2px}
        .pl-jstep-body p{font-size:14px;color:#666;line-height:1.5}
        .pl-jstep-tags{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}
        .pl-jtag{font-size:11px;font-weight:600;padding:3px 10px;border-radius:100px;background:#e8edfe;color:#2a4ecf}

        /* ═══ BENEFITS ═══ */
        .pl-bene{padding:120px 32px;background:#fff;position:relative;overflow:hidden}
        .pl-bene-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:500px;background:radial-gradient(ellipse,rgba(42,78,207,.04) 0%,transparent 70%);pointer-events:none}
        .pl-bene .pl-slbl{color:#2a4ecf}
        .pl-bene .pl-stitle{color:#0a0a0a}
        .pl-bene .pl-ssub{color:#666}
        .pl-bene-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:1100px;margin:0 auto;position:relative}
        .pl-bcard{background:#fff;border:1px solid rgba(0,0,0,.06);border-radius:20px;padding:32px 28px;transition:all .4s cubic-bezier(.16,1,.3,1);box-shadow:0 1px 4px rgba(0,0,0,.04)}
        .pl-bcard:hover{border-color:rgba(42,78,207,.15);transform:translateY(-6px);box-shadow:0 20px 50px rgba(29,58,143,.1),0 0 0 1px rgba(42,78,207,.06)}
        .pl-bcard-ico{width:52px;height:52px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:20px}
        .pl-bcard h4{font-size:17px;font-weight:800;margin-bottom:8px;color:#0a0a0a}
        .pl-bcard p{font-size:14px;color:#666;line-height:1.6}
        .pl-scarcity{text-align:center;margin-top:56px;max-width:560px;margin-left:auto;margin-right:auto;background:linear-gradient(135deg,#0d1b45,#1d3a8f,#2a4ecf);padding:20px 32px;border-radius:16px;font-size:15px;color:#fff;font-weight:700;position:relative;box-shadow:0 8px 32px rgba(42,78,207,.3);overflow:hidden}
        .pl-scarcity::after{content:'';position:absolute;top:0;left:0;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);animation:pl-shimmer 3s ease-in-out infinite}

        /* ═══ FINAL CTA ═══ */
        .pl-cta{padding:100px 32px 120px;text-align:center;background:#060d24;position:relative;overflow:hidden}
        .pl-cta-mesh1{position:absolute;top:-30%;left:-10%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(42,78,207,.35),transparent 65%);pointer-events:none;animation:pl-float-1 22s ease-in-out infinite;filter:blur(80px)}
        .pl-cta-mesh2{position:absolute;bottom:-20%;right:-5%;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(59,82,240,.25),transparent 65%);pointer-events:none;animation:pl-float-2 26s ease-in-out infinite;filter:blur(70px)}
        .pl-cta-mesh3{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.12),transparent 60%);pointer-events:none;filter:blur(60px)}
        .pl-cta-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.03) 1px,transparent 1px);background-size:40px 40px;mask-image:radial-gradient(ellipse 60% 50% at 50% 50%,black 20%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse 60% 50% at 50% 50%,black 20%,transparent 80%);pointer-events:none}
        .pl-cta-in{position:relative;max-width:620px;margin:0 auto;z-index:1}
        .pl-cta-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.08);padding:6px 16px;border-radius:100px;font-size:12px;font-weight:600;color:rgba(255,255,255,.6);margin-bottom:28px;letter-spacing:.3px}
        .pl-cta-badge span{width:6px;height:6px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,.5);animation:pl-p 2s infinite}
        .pl-cta h2{font-size:52px;font-weight:900;letter-spacing:-2.5px;margin-bottom:18px;line-height:1.05;color:#fff}
        .pl-cta .pl-grad2{background:linear-gradient(135deg,#6074f3,#8c9df6,#b8c5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .pl-cta-in p.pl-cta-desc{font-size:17px;color:rgba(255,255,255,.5);margin-bottom:44px;line-height:1.7}
        .pl-cta .pl-form{max-width:500px;margin:0 auto 14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:6px;display:flex;gap:6px}
        .pl-cta .pl-input{background:transparent;border:none;color:#fff;padding:14px 18px;border-radius:12px;backdrop-filter:none}
        .pl-cta .pl-input:focus{border:none;box-shadow:none}
        .pl-cta .pl-input::placeholder{color:rgba(255,255,255,.3)}
        .pl-cta .pl-btn{border-radius:12px;padding:14px 28px;box-shadow:0 4px 20px rgba(42,78,207,.4)}
        .pl-cta .pl-ok{color:#a3e635}
        .pl-cta .pl-note{color:rgba(255,255,255,.25);margin-top:8px}

        /* ═══ FOOTER ═══ */
        .pl-ft{padding:56px 32px 40px;border-top:1px solid rgba(0,0,0,.04);background:#fafbff}
        .pl-ft-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2.5fr 1fr 1fr 1fr;gap:48px}
        .pl-ft-brand h3{font-size:20px;font-weight:900;margin-bottom:10px}
        .pl-ft-brand p{font-size:14px;color:#888;line-height:1.6;max-width:280px}
        .pl-ft-col h4{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#999;margin-bottom:16px}
        .pl-ft-col a{display:block;font-size:14px;color:#555;text-decoration:none;margin-bottom:10px;transition:color .2s,transform .2s;font-weight:500}
        .pl-ft-col a:hover{color:#2a4ecf;transform:translateX(2px)}
        .pl-ft-bot{max-width:1200px;margin:32px auto 0;padding-top:24px;border-top:1px solid rgba(0,0,0,.04);display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#aaa}

        /* ═══ RESPONSIVE ═══ */
        @media(max-width:1024px){
          .pl-svc-grid{grid-template-columns:repeat(2,1fr);gap:14px}
          .pl-bene-grid{grid-template-columns:repeat(2,1fr)}
          .pl-ft-in{grid-template-columns:1fr 1fr;gap:32px}
        }
        @media(max-width:768px){
          .pl-nav-links{display:none}
          .pl-nav-in{height:60px;padding:0 16px}
          .pl-nav-in a img{height:80px!important}
          .pl-nav-cta{padding:8px 18px;font-size:13px}
          .pl-hero{padding:120px 20px 70px;min-height:100vh;min-height:100svh;display:flex;flex-direction:column;justify-content:center}
          .pl-hero h1{font-size:38px;letter-spacing:-1.8px;line-height:1.08}
          .pl-hero-sub{font-size:16px;margin-bottom:32px;max-width:400px}
          .pl-form{flex-direction:column;max-width:100%}
          .pl-btn{width:100%;text-align:center;padding:14px 24px}
          .pl-input{padding:14px 18px}
          .pl-chip{font-size:12px;padding:6px 16px;margin-bottom:28px}
          .pl-social{flex-direction:column;gap:8px;margin-top:24px}
          .pl-stitle{font-size:32px;letter-spacing:-1.5px}
          .pl-slbl{font-size:12px}
          .pl-ssub{font-size:15px;margin-bottom:40px}
          .pl-bc{padding:0 16px 60px}
          .pl-bc-head{padding:24px 20px;gap:14px;flex-direction:column;align-items:flex-start}
          .pl-bc-h{font-size:18px}
          .pl-bc-right{flex-wrap:wrap;width:100%;justify-content:space-between}
          .pl-bc-body{grid-template-columns:1fr;padding:20px;gap:20px}
          .pl-bc-cols{grid-template-columns:1fr}
          .pl-bc-amt{font-size:30px}
          .pl-bc-reg{padding:12px 24px;font-size:13px}
          .pl-portals{padding:36px 0}
          .pl-portals-lbl{font-size:11px;margin-bottom:20px}
          .pl-portals-track{animation-duration:15s}
          .pl-ppill{padding:8px 24px;font-size:14px}
          .pl-svc{padding:60px 16px}
          .pl-svc-grid{grid-template-columns:1fr 1fr;gap:12px}
          .pl-scard{padding:18px 16px;gap:12px;border-radius:14px}
          .pl-sicon{width:40px;height:40px;min-width:40px;border-radius:10px;font-size:18px}
          .pl-scard-txt h3{font-size:14px}
          .pl-scard-txt p{font-size:12px}
          .pl-stag{font-size:9px;padding:2px 6px}
          .pl-prob{padding:60px 16px}
          .pl-prob-card{padding:48px 24px;border-radius:22px}
          .pl-prob-copy{font-size:15px;margin-bottom:40px}
          .pl-pain-grid{grid-template-columns:1fr;max-width:100%;gap:14px}
          .pl-paincard{padding:22px 20px;border-radius:14px}
          .pl-painico{font-size:26px;margin-bottom:10px}
          .pl-paincard h4{font-size:15px}
          .pl-paincard p{font-size:13px}
          .pl-how{padding:60px 16px}
          .pl-journey{margin-top:32px}
          .pl-journey::before{left:19px}
          .pl-jstep{gap:14px;padding:14px 0}
          .pl-jstep-dot{width:40px;min-width:40px;height:40px;font-size:15px}
          .pl-jstep-body h3{font-size:15px}
          .pl-jstep-body p{font-size:13px}
          .pl-jtag{font-size:10px;padding:2px 8px}
          .pl-cta{padding:70px 16px 80px}
          .pl-cta h2{font-size:32px;letter-spacing:-1.5px}
          .pl-cta-in p.pl-cta-desc{font-size:15px;margin-bottom:32px}
          .pl-cta .pl-form{flex-direction:column;background:none;border:none;padding:0;border-radius:0;gap:10px}
          .pl-cta .pl-input{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:14px 18px}
          .pl-cta .pl-btn{width:100%;border-radius:14px;padding:14px 24px}
          .pl-cta-badge{font-size:11px;padding:5px 14px;margin-bottom:20px}
          .pl-ft{padding:40px 16px 32px}
          .pl-ft-in{grid-template-columns:1fr;gap:28px;text-align:center}
          .pl-ft-brand{display:flex;flex-direction:column;align-items:center}
          .pl-ft-brand p{max-width:100%}
          .pl-ft-brand img{height:70px!important}
          .pl-ft-col{text-align:center}
          .pl-ft-col a:hover{transform:none}
          .pl-ft-bot{flex-direction:column;gap:6px;text-align:center}
        }
        @media(max-width:480px){
          .pl-nav-in a img{height:65px!important}
          .pl-hero{padding:100px 14px 50px;min-height:100vh;min-height:100svh;display:flex;flex-direction:column;justify-content:center}
          .pl-hero h1{font-size:30px;letter-spacing:-1.2px}
          .pl-hero-sub{font-size:15px;margin-bottom:28px}
          .pl-stitle{font-size:26px;letter-spacing:-1px}
          .pl-ssub{font-size:14px}
          .pl-svc-grid{grid-template-columns:1fr}
          .pl-scard{padding:20px 18px}
          .pl-prob-card{padding:36px 18px;border-radius:18px}
          .pl-prob-copy{font-size:14px}
          .pl-cta{padding:56px 14px 64px}
          .pl-cta h2{font-size:26px;letter-spacing:-1px}
          .pl-cta-in p.pl-cta-desc{font-size:14px}
          .pl-bc-head{padding:18px 14px}
          .pl-bc-h{font-size:16px}
          .pl-bc-body{padding:16px 14px}
          .pl-bc-amt{font-size:26px}
          .pl-portals-track{animation-duration:12s}
          .pl-ppill{font-size:13px;padding:6px 18px}
          .pl-ft-brand img{height:55px!important}
        }
      `}</style>

      <div className="pl">
        {/* ═══ NAV ═══ */}
        <nav className="pl-nav">
          <div className="pl-nav-in">
            <a href="/pre-launch" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}><JobngenLogo height={110} /></a>
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
          <div className="pl-hero-orb1" />
          <div className="pl-hero-orb2" />
          <div className="pl-hero-orb3" />
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
            <p className="pl-note">Join 1,200+ others. No spam, ever.</p>
            <div className="pl-social">
              <div className="pl-avatars">
                <div className="pl-av" style={{ background: "#1d3a8f" }}>A</div>
                <div className="pl-av" style={{ background: "#2a4ecf" }}>R</div>
                <div className="pl-av" style={{ background: "#3b52f0" }}>S</div>
                <div className="pl-av" style={{ background: "#6074f3" }}>P</div>
                <div className="pl-av" style={{ background: "#142a6a" }}>M</div>
              </div>
              <span className="pl-social-txt"><strong>1,200+</strong> already on the waitlist</span>
            </div>
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
                        <div className="pl-mentor-av" style={{ background: "#e8edfe", color: "#1d3a8f" }}>AD</div>
                        <div><div className="pl-mentor-n">Aditya Dubey</div><div className="pl-mentor-r">Sr. AI Engineer</div></div>
                      </div>
                      <div className="pl-mentor">
                        <div className="pl-mentor-av" style={{ background: "#eef1fe", color: "#3b52f0" }}>SK</div>
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
                        <em style={{ background: "#e8edfe", color: "#1d3a8f" }}>Day 1</em>
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
                          <div className="pl-daydot" style={{ background: "#1d3a8f" }} />
                          <div>
                            <div className="pl-daytime" style={{ color: "#1d3a8f" }}>{d.time}</div>
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

        {/* ═══ PORTALS — infinite ticker ═══ */}
        <Reveal>
          <section className="pl-portals">
            <p className="pl-portals-lbl">Aggregating jobs from all major platforms</p>
            <div className="pl-portals-track">
              {[...Array(2)].map((_, setIdx) =>
                ["Naukri", "LinkedIn", "Indeed", "Internshala", "Glassdoor", "Foundit", "Wellfound", "Hirect", "Unstop", "AngelList"].map((p) => (
                  <span className="pl-ppill" key={`${setIdx}-${p}`}><span className="pl-ppill-dot" />{p}</span>
                ))
              )}
            </div>
          </section>
        </Reveal>

        {/* ═══ SERVICES ═══ */}
        <section className="pl-svc" id="services">
          <div className="pl-svc-inner">
          <Reveal>
            <p className="pl-slbl">Everything You Need</p>
            <h2 className="pl-stitle">Built to get you hired faster.</h2>
          </Reveal>
          <div className="pl-svc-grid">
            {[
              { icon: "&#128269;", bg: "#e8edfe", title: "Unified Job Feed", desc: "Every portal in one feed. Search once, see everything.", tag: "Core", tagBg: "#e8edfe", tagC: "#2a4ecf" },
              { icon: "&#128196;", bg: "#f0fdf4", title: "AI Resume Tailoring", desc: "Auto-optimize your resume for each job description.", tag: "AI", tagBg: "#f0fdf4", tagC: "#16a34a" },
              { icon: "&#128101;", bg: "#fffbeb", title: "Insider Connect", desc: "Talk to employees inside companies before you interview.", tag: "New", tagBg: "#fffbeb", tagC: "#d97706" },
              { icon: "&#127908;", bg: "#fdf2f8", title: "AI Mock Interviews", desc: "Practice with Vibe — real-time feedback and scoring.", tag: "AI Coach", tagBg: "#fdf2f8", tagC: "#db2777" },
              { icon: "&#128203;", bg: "#f0f9ff", title: "Application Tracker", desc: "Visual pipeline from applied to offer. Never lose track.", tag: "Productivity", tagBg: "#f0f9ff", tagC: "#0284c7" },
              { icon: "&#128276;", bg: "#eef1fe", title: "Smart Job Alerts", desc: "Set criteria once. Get notified when matching jobs appear.", tag: "Auto", tagBg: "#eef1fe", tagC: "#2a4ecf" },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="pl-scard">
                  <div className="pl-sicon" style={{ background: s.bg }} dangerouslySetInnerHTML={{ __html: s.icon }} />
                  <div className="pl-scard-txt">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <span className="pl-stag" style={{ background: s.tagBg, color: s.tagC }}>{s.tag}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
        </section>

        {/* ═══ PROBLEM ═══ */}
        <section className="pl-prob">
          <div className="pl-prob-card">
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
          </div>
        </section>

        {/* ═══ YOUR JOURNEY ═══ */}
        <section className="pl-how" id="how">
          <div className="pl-how-inner">
          <Reveal>
            <p className="pl-slbl">Your Journey on Jobngen</p>
            <h2 className="pl-stitle">From sign-up to offer letter.</h2>
          </Reveal>
          <div className="pl-journey">
            {[
              { num: "1", title: "Set your preferences", desc: "Tell us your target role, location, salary range, and experience. Takes 30 seconds.", tags: ["Role", "Location", "Salary"] },
              { num: "2", title: "Discover jobs from every portal", desc: "Jobngen pulls matching jobs from Naukri, LinkedIn, Indeed, and 6+ portals into one feed.", tags: ["Naukri", "LinkedIn", "Indeed", "6+ more"] },
              { num: "3", title: "Apply with AI-tailored resumes", desc: "For each job, AI rewrites your resume with the right keywords. Beat ATS filters automatically.", tags: ["ATS Optimized", "Per-JD Tailoring"] },
              { num: "4", title: "Talk to company insiders", desc: "Before your interview, connect with real employees at the company. Know the culture, questions, and expectations.", tags: ["Insider Connect", "Real People"] },
              { num: "5", title: "Prep, interview, get hired", desc: "Practice mock interviews with Vibe AI, track all your applications, and negotiate with real salary data.", tags: ["AI Coach", "Tracker", "Salary Data"] },
            ].map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <div className="pl-jstep">
                  <div className="pl-jstep-dot">{s.num}</div>
                  <div className="pl-jstep-body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="pl-jstep-tags">
                      {s.tags.map((t) => <span className="pl-jtag" key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="pl-cta">
          <div className="pl-cta-mesh1" />
          <div className="pl-cta-mesh2" />
          <div className="pl-cta-mesh3" />
          <div className="pl-cta-grid" />
          <div className="pl-cta-in">
            <Reveal>
              <div className="pl-cta-badge"><span />Launching Soon</div>
              <h2>Something big is <span className="pl-grad2">coming.</span></h2>
              <p className="pl-cta-desc">Be first in line when Jobngen launches. Sign up and we&apos;ll notify you on day one.</p>
              {submitted2 ? (
                <p className="pl-ok">Welcome to Jobngen! We&apos;ll be in touch.</p>
              ) : (
                <form className="pl-form" onSubmit={(e) => handleSubmit(e, "cta")}>
                  <input className="pl-input" type="email" placeholder="Enter your email address" value={email2} onChange={(e) => setEmail2(e.target.value)} required />
                  <button className="pl-btn" type="submit">Join the Waitlist</button>
                </form>
              )}
              <p className="pl-note">Be the first to know. No spam, ever.</p>
            </Reveal>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="pl-ft">
          <div className="pl-ft-in">
            <div className="pl-ft-brand">
              <JobngenLogo height={100} style={{ marginBottom: 4 }} />
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
