"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

/* ─── scroll reveal ──────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("show"); io.unobserve(el) } }, { threshold: 0.08 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return ref
}
function R({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const ref = useReveal()
  return <div ref={ref} className={`rev ${className}`} style={{ transitionDelay: `${d}ms` }}>{children}</div>
}

/* ─── data ───────────────────────────────────────────────────────── */
const WHY = [
  { title: "Real Product Ownership", body: "You own features from spec to ship — not just tasks someone hands you. Your name goes on what you build." },
  { title: "AI-First by Default", body: "Every workflow, every tool, every decision is AI-augmented. Learn to build the way the best teams in the world work." },
  { title: "Live Systems", body: "You'll push to production. Real users will use what you build. That changes how you think about quality." },
  { title: "Startup Velocity", body: "Move faster than you thought possible. Ship in days, not months. Iterate on real user feedback." },
  { title: "Career-Defining Portfolio", body: "Walk away with shipped projects you can walk through in any interview — not a folder of exercise solutions." },
]

const DOMAINS = [
  { tag: "AI / ML", title: "AI Products", body: "Core features for resume AI, job matching, and interview intelligence systems." },
  { tag: "PRODUCT", title: "Career Tools", body: "User flows, onboarding, and product systems that job seekers interact with daily." },
  { tag: "ENGINEERING", title: "Automation Systems", body: "Pipelines that automate recruiter outreach, resume parsing, and job alerts." },
  { tag: "DESIGN", title: "UX & Interfaces", body: "Craft interfaces used by thousands — from mobile-first screens to dashboard layouts." },
  { tag: "GROWTH", title: "Startup Operations", body: "Run experiments, coordinate programs, and contribute to growth systems." },
  { tag: "CREATOR", title: "Community & Content", body: "Build systems for the Jobingen creator ecosystem and campus ambassador network." },
]

const BENEFITS = [
  { title: "Internship Certificate", body: "Official Jobingen certificate with your role and contribution — verified and shareable on LinkedIn.", icon: "cert" },
  { title: "Live Project Portfolio", body: "Shipped features, real users, real impact — portfolio work you can walk through in any interview.", icon: "layers" },
  { title: "Mentorship Access", body: "Weekly 1:1s, code reviews, and design crits from senior team members across every domain.", icon: "mentor" },
  { title: "Startup Network", body: "Build direct relationships with founders, engineers, and operators inside the Jobingen ecosystem.", icon: "network" },
  { title: "Ecosystem Exposure", body: "Front-row seat to how an AI startup operates, raises, and scales — not a theory, the real thing.", icon: "globe" },
  { title: "Fast-Track Hiring", body: "Top interns skip the queue for full-time and extended roles. We hire from within first.", icon: "rocket" },
]

const PROCESS = [
  { n: "01", title: "Apply Online", body: "Multi-step form. Takes under 7 minutes. Pay the ₹1,499 registration fee to confirm your seat." },
  { n: "02", title: "Application Review", body: "Our team reviews every application personally. No automated rejections. Shortlisting within 7 days." },
  { n: "03", title: "Founder Discussion", body: "A 20-minute casual conversation with someone from the Jobingen team. No trick questions." },
  { n: "04", title: "Offer Letter", body: "Selected candidates receive an official Jobingen offer letter with program details and start date." },
  { n: "05", title: "Cohort Kickoff", body: "Orientation day, team introductions, project briefing, and your first real task. Day one starts here." },
]

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Product Design · NIT Trichy", body: "I designed screens that went live within my first week. Nobody treated me like 'just an intern' — I was in every product meeting, giving real opinions that actually changed decisions." },
  { name: "Arjun Mehta", role: "AI/ML · IIT Delhi", body: "Shipped a resume analysis feature that's still in production 6 months after I left. That one feature taught me more about ML engineering than 2 semesters of coursework." },
  { name: "Neha Kapoor", role: "Engineering · IIIT Hyderabad", body: "The velocity here is completely different. You move so fast you don't even realise how much you're learning until you look back at day one and compare it to where you are now." },
]

const COLLEGES = ["IITs", "NITs", "IIITs", "VIT", "DTU", "BITS", "NSUT", "SRM", "Amity", "Chandigarh University", "KIET", "BIT Mesra", "LNMIIT", "NIT Warangal"]

/* ─── CSS ───────────────────────────────────────────────────────── */
const CSS = `
  .si {
    --ind: #1d3a8f;
    --vio: #3b52f0;
    --ind-l: #e8edfe;
    --ind-xl: #f4f6ff;
    --cream: #f7f7fb;
    --white: #f7f8fc;
    --ink: #09090f;
    --ink2: #3d3d52;
    --ink3: #8a8aa8;
    --jb: rgba(10,10,20,0.07);
    --jbM: rgba(10,10,20,0.14);
    --grn: #10b981;
    --grn-l: #ecfdf5;
    --shadow-sm: 0 2px 8px rgba(10,10,20,0.05);
    --shadow-md: 0 4px 24px rgba(10,10,20,0.09);
    --shadow-lg: 0 12px 48px rgba(10,10,20,0.13);
    --ease: cubic-bezier(.16,1,.3,1);
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    background: #ffffff;
  }

  @keyframes si-fade    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
  @keyframes si-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  .rev { opacity:0; transform:translateY(20px); transition:opacity .65s var(--ease), transform .65s var(--ease); }
  .rev.show { opacity:1; transform:none; }

  .shimmer-text {
    background: linear-gradient(135deg, var(--ind) 0%, var(--vio) 100%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }

  /* ── HERO ── */
  .si-hero {
    position: relative; overflow: hidden;
    background: linear-gradient(175deg, var(--ind-xl) 0%, var(--white) 60%);
    padding: 164px 24px 64px;
    border-bottom: 1px solid var(--jb);
  }
  .si-hero-grid {
    position:absolute; inset:0; pointer-events:none; opacity:.45;
    background-image: linear-gradient(var(--ind-l) 1px, transparent 1px), linear-gradient(90deg, var(--ind-l) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse 75% 60% at 50% 30%, black 10%, transparent 75%);
  }
  .si-hero-glow {
    position:absolute; top:-200px; left:50%; transform:translateX(-50%);
    width:800px; height:800px; border-radius:50%; pointer-events:none;
    background:radial-gradient(circle, rgba(29,58,143,.07) 0%, transparent 65%);
  }
  .si-hero-wrap { position:relative; z-index:1; max-width:780px; margin:0 auto; text-align:center; }

  .si-cohort-badge {
    display:inline-flex; align-items:center; gap:8px;
    padding:6px 16px 6px 8px; background:white;
    border:1.5px solid rgba(29,58,143,.18); border-radius:99px;
    box-shadow: var(--shadow-sm); margin-bottom:28px;
    animation: si-fade .55s var(--ease) both;
  }
  .si-cohort-pill { display:inline-flex; align-items:center; gap:5px; background:linear-gradient(135deg,var(--ind),var(--vio)); color:white; font-size:10px; font-weight:800; letter-spacing:.07em; text-transform:uppercase; padding:4px 10px; border-radius:99px; }
  .si-cohort-dot  { width:6px; height:6px; background:#22c55e; border-radius:50%; }
  .si-cohort-text { font-size:12.5px; font-weight:600; color:var(--ind); }

  .si-h1  { font-size:clamp(38px,5.8vw,68px); font-weight:900; color:var(--ink); letter-spacing:-.048em; line-height:1.04; margin-bottom:24px; animation:si-fade .7s var(--ease) .1s both; }
  .si-sub { font-size:clamp(16px,1.8vw,18.5px); color:var(--ink2); line-height:1.78; max-width:580px; margin:0 auto 40px; animation:si-fade .8s var(--ease) .16s both; }

  .si-ctas { display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap; margin-bottom:52px; animation:si-fade .9s var(--ease) .22s both; }
  .si-btn-p {
    display:inline-flex; align-items:center; gap:9px; padding:14px 34px; border-radius:13px;
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white;
    font-size:15px; font-weight:700; text-decoration:none; border:none; cursor:pointer;
    box-shadow:0 4px 20px rgba(29,58,143,.32); transition:all .22s var(--ease);
  }
  .si-btn-p:hover { transform:translateY(-2px); box-shadow:0 10px 32px rgba(29,58,143,.42); }
  .si-btn-s {
    display:inline-flex; align-items:center; gap:8px; padding:14px 28px; border-radius:13px;
    background:white; color:var(--ind); font-size:15px; font-weight:700;
    text-decoration:none; border:1.5px solid rgba(29,58,143,.2);
    box-shadow:var(--shadow-sm); transition:all .22s;
  }
  .si-btn-s:hover { border-color:var(--ind); background:var(--ind-xl); transform:translateY(-1px); }

  /* Stats */
  .si-stats-row {
    display:inline-flex; background:white; border:1.5px solid var(--jb); border-radius:16px;
    overflow:hidden; box-shadow:var(--shadow-md);
    animation:si-fade 1s var(--ease) .28s both;
  }
  .si-stat { padding:18px 28px; text-align:center; border-right:1px solid var(--jb); }
  .si-stat:last-child { border-right:none; }
  .si-stat-v { font-size:22px; font-weight:900; color:var(--ind); letter-spacing:-.04em; line-height:1; }
  .si-stat-l { font-size:10.5px; font-weight:600; color:var(--ink3); margin-top:5px; letter-spacing:.04em; text-transform:uppercase; }

  /* ── TICKER ── */
  .si-ticker { background:white; border-bottom:1px solid var(--jb); padding:12px 0; overflow:hidden; }
  .si-ticker-track { display:flex; width:max-content; animation:si-marquee 36s linear infinite; }
  .si-ticker-item { display:inline-flex; align-items:center; gap:8px; padding:0 24px; font-size:12px; font-weight:700; color:var(--ink2); white-space:nowrap; }
  .si-ticker-sep { color:rgba(29,58,143,.25); font-size:10px; }

  /* ── SECTIONS ── */
  .si-wrap    { max-width:1100px; margin:0 auto; padding:0 24px; }
  .si-sec     { padding:88px 0; }
  .si-sec-alt { padding:88px 0; background:var(--cream); }
  .si-sec-dk  { padding:88px 0; background:linear-gradient(160deg,#0c1445 0%,#0f172a 50%,#0c1445 100%); }
  .si-sec-b   { padding:88px 0; background:linear-gradient(160deg,var(--ind-xl) 0%,var(--ind-l) 100%); }

  .si-eyebrow     { display:inline-flex; align-items:center; gap:8px; margin-bottom:14px; font-size:11px; font-weight:800; color:var(--ind); letter-spacing:.1em; text-transform:uppercase; }
  .si-eyebrow-dot { width:5px; height:5px; border-radius:50%; background:var(--ind); flex-shrink:0; }
  .si-eyebrow-w   { color:rgba(165,180,252,.8); }
  .si-eyebrow-dot-w { background:rgba(165,180,252,.8); }
  .si-ttl   { font-size:clamp(28px,3.5vw,46px); font-weight:900; color:var(--ink); letter-spacing:-.04em; line-height:1.08; margin-bottom:14px; }
  .si-ttl-w { font-size:clamp(28px,3.5vw,46px); font-weight:900; color:white; letter-spacing:-.04em; line-height:1.08; margin-bottom:14px; }
  .si-desc   { font-size:16px; color:var(--ink2); line-height:1.75; max-width:520px; }
  .si-desc-w { font-size:16px; color:#94a3b8; line-height:1.75; max-width:520px; }

  /* ── WHY BENTO ── */
  .si-why-bento-top { display:grid; grid-template-columns:2fr 1fr; gap:14px; margin-top:52px; }
  .si-why-bento-bot { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:14px; }

  .si-why-hero {
    background:linear-gradient(148deg,#0d1b60 0%,#132263 40%,#0e1f6e 100%);
    border-radius:22px; padding:40px 36px; height:100%; position:relative; overflow:hidden;
    border:1.5px solid rgba(59,91,219,.28); box-shadow:0 16px 56px rgba(13,27,100,.28);
  }
  .si-why-hero::before {
    content:''; position:absolute; top:-100px; right:-80px;
    width:340px; height:340px; border-radius:50%; pointer-events:none;
    background:radial-gradient(circle,rgba(91,131,255,.18) 0%,transparent 65%);
  }
  .si-why-hero::after {
    content:''; position:absolute; bottom:-60px; left:-40px;
    width:220px; height:220px; border-radius:50%; pointer-events:none;
    background:radial-gradient(circle,rgba(59,91,219,.12) 0%,transparent 65%);
  }
  .si-why-hero-icon {
    width:52px; height:52px; border-radius:15px; z-index:1; position:relative;
    background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.15);
    display:flex; align-items:center; justify-content:center; margin-bottom:24px;
  }
  .si-why-hero-label { font-size:10px; font-weight:800; color:rgba(165,180,252,.65); letter-spacing:.12em; text-transform:uppercase; margin-bottom:14px; position:relative; z-index:1; }
  .si-why-hero-title { font-size:clamp(19px,2.5vw,24px); font-weight:900; color:white; letter-spacing:-.04em; line-height:1.15; margin-bottom:16px; position:relative; z-index:1; }
  .si-why-hero-body  { font-size:14.5px; color:rgba(148,163,184,.85); line-height:1.8; position:relative; z-index:1; }

  .si-why-card {
    background:white; border-radius:20px; border:1.5px solid var(--jb);
    padding:28px 24px; height:100%; box-shadow:var(--shadow-sm);
    transition:all .28s var(--ease); position:relative; overflow:hidden;
  }
  .si-why-card::after { content:''; position:absolute; inset:0; border-radius:inherit; background:linear-gradient(135deg,rgba(29,58,143,.03) 0%,transparent 60%); opacity:0; transition:opacity .28s; }
  .si-why-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-lg); border-color:rgba(29,58,143,.22); }
  .si-why-card:hover::after { opacity:1; }
  .si-why-icon  { width:46px; height:46px; border-radius:13px; background:var(--ind-l); display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
  .si-why-title { font-size:16px; font-weight:800; color:var(--ink); letter-spacing:-.025em; margin-bottom:10px; }
  .si-why-body  { font-size:13.5px; color:var(--ink2); line-height:1.72; }

  /* ── DOMAINS ── */
  .si-dom-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(255,255,255,.06); border-radius:20px; overflow:hidden; margin-top:52px; border:1px solid rgba(255,255,255,.07); }
  @media(max-width:900px){.si-dom-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:580px){.si-dom-grid{grid-template-columns:1fr;}}
  .si-dom-card { background:#0c1445; padding:28px 24px; transition:background .2s; }
  .si-dom-card:hover { background:#111b55; }
  .si-dom-tag   { font-size:9px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:#60a5fa; border:1px solid rgba(96,165,250,.25); border-radius:6px; padding:3px 8px; display:inline-block; margin-bottom:14px; }
  .si-dom-num   { font-size:40px; font-weight:900; color:rgba(255,255,255,.06); line-height:1; margin-bottom:10px; letter-spacing:-.05em; }
  .si-dom-title { font-size:17px; font-weight:800; color:white; margin-bottom:8px; letter-spacing:-.028em; }
  .si-dom-body  { font-size:13px; color:#64748b; line-height:1.7; }

  /* ── LEARN ── */
  .si-learn-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:52px; }
  @media(max-width:680px){.si-learn-grid{grid-template-columns:1fr;}}
  .si-learn-item  { display:flex; align-items:flex-start; gap:16px; background:white; border:1.5px solid var(--jb); border-radius:18px; padding:24px 22px; box-shadow:var(--shadow-sm); transition:all .25s var(--ease); }
  .si-learn-item:hover { border-color:rgba(29,58,143,.2); box-shadow:var(--shadow-md); transform:translateY(-2px); }
  .si-learn-n     { width:40px; height:40px; border-radius:12px; flex-shrink:0; background:linear-gradient(135deg,var(--ind),var(--vio)); color:white; font-size:13px; font-weight:900; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(29,58,143,.22); }
  .si-learn-title { font-size:15px; font-weight:800; color:var(--ink); margin-bottom:6px; letter-spacing:-.02em; }
  .si-learn-body  { font-size:13px; color:var(--ink2); line-height:1.68; }

  /* ── WHO ── */
  .si-who-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-top:52px; }
  @media(max-width:900px){.si-who-grid{grid-template-columns:repeat(3,1fr);}}
  @media(max-width:580px){.si-who-grid{grid-template-columns:repeat(2,1fr);}}
  .si-who-card       { background:white; border-radius:18px; border:1.5px solid var(--jb); padding:26px 16px; text-align:center; box-shadow:var(--shadow-sm); transition:all .25s var(--ease); }
  .si-who-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-lg); border-color:rgba(29,58,143,.2); }
  .si-who-icon  { width:52px; height:52px; border-radius:14px; background:var(--ind-l); margin:0 auto 14px; display:flex; align-items:center; justify-content:center; }
  .si-who-title { font-size:14px; font-weight:800; color:var(--ink); margin-bottom:6px; }
  .si-who-body  { font-size:12px; color:var(--ink2); line-height:1.6; }

  /* ── BENEFITS TABLE ── */
  .si-ben-table { display:grid; grid-template-columns:repeat(3,1fr); margin-top:48px; border:1.5px solid var(--jb); border-radius:22px; overflow:hidden; box-shadow:var(--shadow-md); }
  .si-ben-cell  { display:flex; gap:16px; align-items:flex-start; padding:26px 22px; border-right:1px solid var(--jb); border-bottom:1px solid var(--jb); transition:background .22s; }
  .si-ben-cell:nth-child(3n)  { border-right:none; }
  .si-ben-cell:nth-child(n+4) { border-bottom:none; }
  .si-ben-cell:hover { background:var(--ind-xl); }
  .si-ben-cell-icon  { width:44px; height:44px; border-radius:12px; background:var(--ind-l); flex-shrink:0; display:flex; align-items:center; justify-content:center; transition:background .22s; }
  .si-ben-cell:hover .si-ben-cell-icon { background:rgba(29,58,143,.13); }
  .si-ben-cell-title { font-size:14.5px; font-weight:800; color:var(--ink); margin-bottom:5px; letter-spacing:-.025em; }
  .si-ben-cell-body  { font-size:12.5px; color:var(--ink2); line-height:1.62; }
  @media(max-width:680px){
    .si-ben-table { grid-template-columns:1fr 1fr; }
    .si-ben-cell:nth-child(3n)  { border-right:1px solid var(--jb); }
    .si-ben-cell:nth-child(2n)  { border-right:none; }
    .si-ben-cell:nth-child(n+4) { border-bottom:1px solid var(--jb); }
    .si-ben-cell:nth-child(n+5) { border-bottom:none; }
  }
  @media(max-width:420px){
    .si-ben-table { grid-template-columns:1fr; }
    .si-ben-cell  { border-right:none; border-bottom:1px solid var(--jb); }
    .si-ben-cell:last-child { border-bottom:none; }
  }

  /* ── PROCESS STEPPER ── */
  .si-steps { display:flex; align-items:flex-start; margin-top:56px; }
  .si-step  { flex:1; display:flex; flex-direction:column; align-items:center; min-width:0; }
  .si-step-track { display:flex; align-items:center; width:100%; }
  .si-step-ll,.si-step-lr { flex:1; height:2px; background:linear-gradient(90deg,rgba(29,58,143,.18),rgba(59,82,240,.28)); }
  .si-step-ll.hi,.si-step-lr.hi { opacity:0; pointer-events:none; }
  .si-step-circle {
    width:50px; height:50px; border-radius:50%; flex-shrink:0;
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white;
    font-size:13px; font-weight:900; display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 18px rgba(29,58,143,.3);
  }
  .si-step-content { padding:18px 10px 0; text-align:center; }
  .si-step-title { font-size:14px; font-weight:800; color:var(--ink); margin-bottom:7px; letter-spacing:-.02em; }
  .si-step-text  { font-size:12.5px; color:var(--ink2); line-height:1.65; }
  @media(max-width:720px){
    .si-steps { flex-direction:column; gap:0; }
    .si-step  { flex:none; flex-direction:row; align-items:flex-start; gap:16px; padding-bottom:24px; width:100%; }
    .si-step:last-child { padding-bottom:0; }
    .si-step-track { flex-direction:column; width:auto; flex-shrink:0; align-items:center; }
    .si-step-ll,.si-step-lr { width:2px; height:20px; flex:none; background:linear-gradient(180deg,rgba(29,58,143,.18),rgba(59,82,240,.28)); }
    .si-step-content { padding:12px 0 0; text-align:left; flex:1; min-width:0; }
  }

  /* ── TESTIMONIALS ── */
  .si-testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:52px; }
  @media(max-width:900px){.si-testi-grid{grid-template-columns:1fr;}}
  .si-testi-card {
    background:white; border-radius:20px; border:1.5px solid var(--jb);
    padding:30px 26px; box-shadow:var(--shadow-sm); transition:all .25s; position:relative; overflow:hidden;
  }
  .si-testi-card::before { content:'"'; position:absolute; top:-10px; right:22px; font-size:100px; font-weight:900; color:var(--ind); opacity:.06; line-height:1; pointer-events:none; font-family:Georgia,serif; }
  .si-testi-card:hover { transform:translateY(-3px); box-shadow:var(--shadow-md); border-color:rgba(29,58,143,.15); }
  .si-testi-stars { display:flex; gap:3px; margin-bottom:14px; }
  .si-testi-body  { font-size:14px; color:var(--ink2); line-height:1.8; margin-bottom:22px; position:relative; z-index:1; }
  .si-testi-av    { width:40px; height:40px; border-radius:12px; background:linear-gradient(135deg,var(--ind),var(--vio)); color:white; font-size:15px; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .si-testi-name  { font-size:13.5px; font-weight:800; color:var(--ink); }
  .si-testi-role  { font-size:11.5px; color:var(--ind); font-weight:600; }

  /* ── FINAL CTA ── */
  .si-cta-sec { padding:96px 24px; text-align:center; background:linear-gradient(160deg,#0c1445 0%,#0f172a 40%,#1a0a3d 80%,#0c1445 100%); position:relative; overflow:hidden; }
  .si-cta-orb  { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:700px; height:700px; border-radius:50%; pointer-events:none; background:radial-gradient(circle,rgba(29,58,143,.2) 0%,transparent 65%); }
  .si-cta-grid { position:absolute; inset:0; pointer-events:none; opacity:.12; background-image:linear-gradient(rgba(99,102,241,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.3) 1px,transparent 1px); background-size:56px 56px; }
  .si-cta-inner { position:relative; z-index:1; max-width:620px; margin:0 auto; }
  .si-cta-label { display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18); border-radius:99px; padding:6px 16px; font-size:12px; font-weight:700; color:#a5b4fc; margin-bottom:24px; }
  .si-cta-h2    { font-size:clamp(32px,5vw,58px); font-weight:900; color:white; letter-spacing:-.045em; line-height:1.04; margin-bottom:18px; }
  .si-cta-sub   { font-size:17px; color:#94a3b8; line-height:1.7; margin-bottom:40px; }
  .si-cta-btn   { display:inline-flex; align-items:center; gap:10px; background:white; color:var(--ind); padding:16px 40px; border-radius:14px; font-size:16px; font-weight:800; text-decoration:none; letter-spacing:-.02em; box-shadow:0 4px 24px rgba(0,0,0,.22); transition:all .25s; }
  .si-cta-btn:hover { transform:translateY(-3px); box-shadow:0 12px 36px rgba(0,0,0,.32); }
  .si-cta-note  { display:inline-flex; align-items:center; gap:6px; color:#64748b; font-size:12.5px; font-weight:600; margin-top:18px; }
  .si-cta-ndot  { width:6px; height:6px; background:#22c55e; border-radius:50%; }

  /* ── RESPONSIVE ── */
  @media(max-width:860px){
    .si-hero   { padding-top:100px; padding-bottom:48px; }
    .si-sec,.si-sec-alt,.si-sec-dk,.si-sec-b { padding:68px 0; }
    .si-cta-sec { padding:72px 24px; }
    .si-why-bento-top { grid-template-columns:1fr; }
    .si-why-bento-bot { grid-template-columns:1fr 1fr; }
  }
  @media(max-width:640px){
    .si-hero { padding:96px 16px 40px; }
    .si-sec,.si-sec-alt,.si-sec-dk,.si-sec-b { padding:52px 0; }
    .si-cta-sec { padding:56px 16px; }
    .si-stats-row { display:grid; grid-template-columns:1fr 1fr; width:100%; max-width:330px; }
    .si-stat { border-right:1px solid var(--jb); border-bottom:1px solid var(--jb); }
    .si-stat:nth-child(2n) { border-right:none; }
    .si-stat:nth-child(3),.si-stat:nth-child(4) { border-bottom:none; }
    .si-ctas { flex-direction:column; align-items:stretch; max-width:300px; margin-left:auto; margin-right:auto; }
    .si-btn-p,.si-btn-s { justify-content:center; }
    .si-wrap { padding:0 16px; }
    .si-who-grid { grid-template-columns:repeat(2,1fr); }
    .si-why-bento-bot { grid-template-columns:1fr; }
  }
`

/* ─── SVG Icons ─────────────────────────────────────────────────── */
function ChevronRight() { return <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg> }
function Star()         { return <svg width="13" height="13" viewBox="0 0 24 24" fill="#1d3a8f"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/></svg> }

/* ─── WHY icons ──────────────────────────────────────────────────── */
const WHY_ICONS = [
  /* product ownership — box/package */
  <svg key="w0" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  /* AI-first — sparkle / lightning */
  <svg key="w1" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  /* live systems — radio dot */
  <svg key="w2" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 010 8.49M7.76 7.76a6 6 0 000 8.49M20.49 3.51a12 12 0 010 16.97M3.51 3.51a12 12 0 000 16.97"/></svg>,
  /* startup velocity — zap */
  <svg key="w3" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  /* portfolio — briefcase */
  <svg key="w4" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v4M10 14h4"/></svg>,
]

/* ─── BENEFITS icons ─────────────────────────────────────────────── */
const BEN_ICONS = [
  /* certificate — award */
  <svg key="b0" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  /* portfolio — layers */
  <svg key="b1" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  /* mentorship — users */
  <svg key="b2" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  /* network — link */
  <svg key="b3" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  /* ecosystem — globe */
  <svg key="b4" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  /* fast-track — rocket */
  <svg key="b5" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M15 9v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
]

/* ─── Who icons ──────────────────────────────────────────────────── */
const WHO_ICONS = [
  <svg key="s" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>,
  <svg key="c" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><path d="M15 10l4.553-2.069A1 1 0 0121 8.88V15M3 8l4.5 2.25L12 8l4.5 2.25L21 8M3 8v8l9 4 9-4V8M3 8l9 4 9-4"/></svg>,
  <svg key="d" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="g" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  <svg key="b" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
]

/* ─── Page ───────────────────────────────────────────────────────── */
export default function SummerInternshipPage() {
  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="si">

        {/* ── HERO ── */}
        <section className="si-hero">
          <div className="si-hero-grid" />
          <div className="si-hero-glow" />
          <div className="si-hero-wrap">

            <div style={{ display:"flex", justifyContent:"center" }}>
              <div className="si-cohort-badge">
                <div className="si-cohort-pill"><span className="si-cohort-dot" />Now Open</div>
                <span className="si-cohort-text">Summer Training Cohort 2026</span>
              </div>
            </div>

            <h1 className="si-h1">
              Build Real Products.<br />
              <span className="shimmer-text">Learn AI. Work Like</span><br />
              a Startup Team.
            </h1>

            <p className="si-sub">
              Join Jobingen's Summer Training and work on live AI tools, career systems, and startup projects that real users interact with every day.
            </p>

            <div className="si-ctas">
              <Link href="/summer-internship/apply" className="si-btn-p">
                Apply Now — ₹1,499 <ChevronRight />
              </Link>
              <a href="#program" className="si-btn-s">
                Explore Program
              </a>
            </div>

            <div style={{ display:"flex", justifyContent:"center" }}>
              <div className="si-stats-row">
                {[
                  { v:"4 Weeks",  l:"Duration" },
                  { v:"June 1",   l:"Cohort Starts" },
                  { v:"6",        l:"Domains" },
                  { v:"₹1,499",   l:"Registration" },
                ].map(s => (
                  <div key={s.l} className="si-stat">
                    <div className="si-stat-v">{s.v}</div>
                    <div className="si-stat-l">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="si-ticker">
          <div className="si-ticker-track">
            {[...COLLEGES,...COLLEGES].map((c,i) => (
              <span key={i} className="si-ticker-item">{c}<span className="si-ticker-sep">◆</span></span>
            ))}
          </div>
        </div>

        {/* ── WHY ── */}
        <section className="si-sec" id="program">
          <div className="si-wrap">
            <R>
              <div className="si-eyebrow"><span className="si-eyebrow-dot"/>Why This Internship</div>
              <h2 className="si-ttl">Why We're Different</h2>
              <p className="si-desc">Most internships give you tasks. This one gives you ownership — of live features, real decisions, and real users.</p>
            </R>

            {/* Top row: large hero card + 1 card */}
            <div className="si-why-bento-top">
              <R>
                <div className="si-why-hero">
                  <div className="si-why-hero-icon">{WHY_ICONS[0]}</div>
                  <div className="si-why-hero-label">01 · Core Principle</div>
                  <div className="si-why-hero-title">{WHY[0].title}</div>
                  <div className="si-why-hero-body">{WHY[0].body}</div>
                </div>
              </R>
              <R d={70}>
                <div className="si-why-card">
                  <div className="si-why-icon">{WHY_ICONS[1]}</div>
                  <div className="si-why-title">{WHY[1].title}</div>
                  <div className="si-why-body">{WHY[1].body}</div>
                </div>
              </R>
            </div>

            {/* Bottom row: 3 equal cards */}
            <div className="si-why-bento-bot">
              {WHY.slice(2).map((c, i) => (
                <R key={c.title} d={i * 65}>
                  <div className="si-why-card">
                    <div className="si-why-icon">{WHY_ICONS[i + 2]}</div>
                    <div className="si-why-title">{c.title}</div>
                    <div className="si-why-body">{c.body}</div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOMAINS ── */}
        <section className="si-sec-dk">
          <div className="si-wrap">
            <R>
              <div className="si-eyebrow"><span className="si-eyebrow-dot si-eyebrow-w"/>Work Areas</div>
              <h2 className="si-ttl-w">What You Will Build</h2>
              <p className="si-desc-w">Six domains. Real products. Pick what fires you up.</p>
            </R>
            <div className="si-dom-grid">
              {DOMAINS.map((d, i) => (
                <R key={d.title} d={i * 50}>
                  <div className="si-dom-card">
                    <div className="si-dom-tag">{d.tag}</div>
                    <div className="si-dom-num">0{i+1}</div>
                    <div className="si-dom-title">{d.title}</div>
                    <div className="si-dom-body">{d.body}</div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEARN ── */}
        <section className="si-sec">
          <div className="si-wrap">
            <R>
              <div className="si-eyebrow"><span className="si-eyebrow-dot"/>Learning Experience</div>
              <h2 className="si-ttl">Learn by Building</h2>
              <p className="si-desc">Forget passive learning. You build alongside the team — real deadlines, real feedback, real production.</p>
            </R>
            <div className="si-learn-grid">
              {[
                { n:"01", t:"Real Sprint Cycles",     b:"Product stand-ups, task boards, and actual code in production. No toy projects." },
                { n:"02", t:"Cross-Functional Teams", b:"Work shoulder-to-shoulder with designers, engineers, and PMs the way real startups do." },
                { n:"03", t:"Startup Execution",      b:"Move fast, take ownership, iterate on feedback. No hand-holding, no spoon-feeding." },
                { n:"04", t:"AI-Assisted Work",       b:"Use Copilot, Cursor, and AI APIs as a superpower — the way every top team works today." },
              ].map((item, i) => (
                <R key={item.n} d={i * 60}>
                  <div className="si-learn-item">
                    <div className="si-learn-n">{item.n}</div>
                    <div>
                      <div className="si-learn-title">{item.t}</div>
                      <div className="si-learn-body">{item.b}</div>
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO ── */}
        <section className="si-sec-alt">
          <div className="si-wrap">
            <R>
              <div className="si-eyebrow"><span className="si-eyebrow-dot"/>Who Should Apply</div>
              <h2 className="si-ttl">Built for Builders</h2>
              <p className="si-desc">We care about curiosity and drive, not GPA. If you love building things, you belong here.</p>
            </R>
            <div className="si-who-grid">
              {[
                { t:"Students",       b:"Looking for real experience beyond classroom theory." },
                { t:"Creators",       b:"Who want to build systems, not just content." },
                { t:"Developers",     b:"Ready to ship production code in a real team." },
                { t:"Designers",      b:"Who want to design for actual users and problems." },
                { t:"Curious Builders", b:"Who love learning, experimenting, making." },
              ].map((c, i) => (
                <R key={c.t} d={i * 55}>
                  <div className="si-who-card">
                    <div className="si-who-icon">{WHO_ICONS[i]}</div>
                    <div className="si-who-title">{c.t}</div>
                    <div className="si-who-body">{c.b}</div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="si-sec">
          <div className="si-wrap">
            <R>
              <div className="si-eyebrow"><span className="si-eyebrow-dot"/>What You Get</div>
              <h2 className="si-ttl">What You Walk Away With</h2>
              <p className="si-desc">Real value — the kind that compounds for years, not just a line on your resume.</p>
            </R>

            <R d={60}>
              <div className="si-ben-table">
                {BENEFITS.map((b, i) => (
                  <div key={b.title} className="si-ben-cell">
                    <div className="si-ben-cell-icon">{BEN_ICONS[i]}</div>
                    <div>
                      <div className="si-ben-cell-title">{b.title}</div>
                      <div className="si-ben-cell-body">{b.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="si-sec-b">
          <div className="si-wrap">
            <R>
              <div className="si-eyebrow"><span className="si-eyebrow-dot"/>Process</div>
              <h2 className="si-ttl">How It Works</h2>
              <p className="si-desc">Simple, transparent, and fast. We respect your time.</p>
            </R>
            <R d={60}>
              <div className="si-steps">
                {PROCESS.map((p, i) => (
                  <div key={p.n} className="si-step">
                    <div className="si-step-track">
                      <div className={`si-step-ll${i === 0 ? " hi" : ""}`} />
                      <div className="si-step-circle">{p.n}</div>
                      <div className={`si-step-lr${i === PROCESS.length - 1 ? " hi" : ""}`} />
                    </div>
                    <div className="si-step-content">
                      <div className="si-step-title">{p.title}</div>
                      <div className="si-step-text">{p.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="si-sec">
          <div className="si-wrap">
            <R>
              <div className="si-eyebrow"><span className="si-eyebrow-dot"/>From Past Interns</div>
              <h2 className="si-ttl">What Interns Say</h2>
              <p className="si-desc">Real people, real projects, real growth.</p>
            </R>
            <div className="si-testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <R key={t.name} d={i * 65}>
                  <div className="si-testi-card">
                    <div className="si-testi-stars">{[...Array(5)].map((_, j) => <Star key={j} />)}</div>
                    <div className="si-testi-body">"{t.body}"</div>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div className="si-testi-av">{t.name[0]}</div>
                      <div>
                        <div className="si-testi-name">{t.name}</div>
                        <div className="si-testi-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="si-cta-sec">
          <div className="si-cta-orb" /><div className="si-cta-grid" />
          <div className="si-cta-inner">
            <R>
              <div style={{ display:"flex", justifyContent:"center" }}>
                <div className="si-cta-label">
                  Summer 2026 · Starts June 1
                </div>
              </div>
              <h2 className="si-cta-h2">Ready to Build<br />With Jobingen?</h2>
              <p className="si-cta-sub">4 weeks. Real work. Real impact. ₹1,499 registration fee confirms your commitment.</p>
              <Link href="/summer-internship/apply" className="si-cta-btn">
                Apply Now <ChevronRight />
              </Link>
              <div style={{ display:"flex", justifyContent:"center" }}>
                <div className="si-cta-note">
                  <div className="si-cta-ndot" />
                  Rolling admissions — apply early
                </div>
              </div>
            </R>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
