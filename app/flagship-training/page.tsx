"use client"

import { useState, useRef, useEffect, FormEvent } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

/* ─── scroll reveal ──────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("show"); io.unobserve(el) } }, { threshold: 0.06 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return ref
}
function R({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const ref = useReveal()
  return <div ref={ref} className={`ft-rev ${className}`} style={{ transitionDelay: `${d}ms` }}>{children}</div>
}

/* ─── data ───────────────────────────────────────────────────────── */
const PROBLEMS = [
  {
    n: "01",
    title: "Learning Syntax, Not Problem Solving",
    body: "Most students memorise code. They can't decompose a problem they haven't seen before. Interviewers notice immediately.",
    icon: "brain",
  },
  {
    n: "02",
    title: "Building Projects Without Requirements",
    body: "Cloning tutorials gives you working code — not engineering thinking. Real companies build from specs, not from YouTube.",
    icon: "spec",
  },
  {
    n: "03",
    title: "Using AI Tools Without Understanding AI Systems",
    body: "Copilot doesn't explain RAG. ChatGPT doesn't teach vector databases. You're using the outputs without understanding the engine.",
    icon: "ai",
  },
]

const CURRICULUM = [
  {
    tag: "MODULE 1",
    title: "Think Like A Problem Solver",
    subtitle: "Data Structures & Algorithms",
    color: "#1d3a8f",
    bg: "linear-gradient(148deg,#0d1b60 0%,#132263 40%,#0e1f6e 100%)",
    topics: [
      "Problem decomposition & first-principles thinking",
      "Pattern recognition across problem families",
      "Interview-style problem solving frameworks",
      "DSA thinking — not just memorisation",
      "Practical coding strategies that work under pressure",
    ],
  },
  {
    tag: "MODULE 2",
    title: "Spec Driven Coding",
    subtitle: "Real-World Software Development",
    color: "#0f766e",
    bg: "linear-gradient(148deg,#042f2e 0%,#064e3b 40%,#052e1c 100%)",
    topics: [
      "Thinking from requirements, not from code",
      "Real-world development workflow & practices",
      "Writing scalable, maintainable code",
      "Product-first engineering mindset",
      "Modern software development practices used in top teams",
    ],
  },
  {
    tag: "MODULE 3",
    title: "Advanced RAG Systems",
    subtitle: "AI Application Architecture",
    color: "#7c3aed",
    bg: "linear-gradient(148deg,#2d1b69 0%,#3b1fa3 40%,#1e0a6b 100%)",
    topics: [
      "Retrieval Augmented Generation from scratch",
      "Vector databases & embedding systems",
      "Context engineering for production AI",
      "AI application architecture patterns",
      "Building production-ready AI systems",
    ],
  },
]

/* mentor names we want to show — fetched live from /api/mentors */
const MENTOR_NAMES = ["Aayushman Verma", "Aditya Dubey"]
/* DB may store name without spaces — fuzzy match helper */
function mentorMatch(dbName: string, target: string) {
  const a = dbName.toLowerCase().replace(/\s+/g, "")
  const b = target.toLowerCase().replace(/\s+/g, "")
  return a === b
}

/* fallback data if API hasn't resolved yet or name not found */
const MENTOR_FALLBACK: Record<string, MentorCard> = {
  "Aayushman Verma": {
    name: "Aayushman Verma",
    role: "SDE",
    company: "Software Development",
    initials: "AV",
    photo: "",
    color: "#1d3a8f",
    bg: "#eef1fd",
    exp: "Industry Experience",
    bio: "Software development professional with hands-on experience in full-stack engineering. Guides students on what actually matters in interviews and on the job.",
    topics: ["Resume Review", "Career Guidance", "Interview Preparation"],
  },
  "Aditya Dubey": {
    name: "Aditya Dubey",
    role: "AI Engineer",
    company: "AI / ML",
    initials: "AD",
    photo: "/mentors/aditya-dubey.jpg",
    color: "#7c3aed",
    bg: "#f5f3ff",
    exp: "5+ Years",
    bio: "AI Engineer who has mentored 20,000+ students and professionals in AI technologies and real-world applications. M.Tech in Information Systems from NIT Allahabad.",
    topics: ["AI/ML Strategy", "RAG Systems", "Career Guidance", "Mock Interviews"],
  },
}

type DBMentor = {
  id: string; full_name: string; job_title: string; domain: string; experience: string
  linkedin?: string; short_intro?: string; professional_bio?: string
  mentorship_topics: string[]; photo_url?: string; location?: string
}

type MentorCard = {
  name: string; role: string; company: string; initials: string; photo: string
  color: string; bg: string; exp: string; bio: string; topics: string[]
}

const DOMAIN_COLORS: Record<string, { color: string; bg: string }> = {
  "AI/ML":             { color: "#7c3aed", bg: "#f5f3ff" },
  "Full Stack":        { color: "#1d3a8f", bg: "#eef1fd" },
  "Software Dev":      { color: "#1d3a8f", bg: "#eef1fd" },
  "Software Develop":  { color: "#1d3a8f", bg: "#eef1fd" },
  "Backend":           { color: "#0f766e", bg: "#f0fdfa" },
  "Data Science":      { color: "#0891b2", bg: "#ecfeff" },
  "DSA":               { color: "#16a34a", bg: "#f0fdf4" },
  "DevOps":            { color: "#0369a1", bg: "#e0f2fe" },
  "UI/UX":             { color: "#e11d48", bg: "#fff1f2" },
}
function domainColor(domain: string) {
  for (const [key, val] of Object.entries(DOMAIN_COLORS)) {
    if (domain?.toLowerCase().includes(key.toLowerCase())) return val
  }
  return { color: "#1d3a8f", bg: "#eef1fd" }
}
function initials(name: string) {
  const p = name.trim().split(" ")
  return p.length >= 2 ? (p[0][0] + p[p.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}
function dbToCard(m: DBMentor): MentorCard {
  const { color, bg } = domainColor(m.domain)
  return {
    name: m.full_name,
    role: m.job_title,
    company: m.domain,
    initials: initials(m.full_name),
    photo: m.photo_url || "",
    color,
    bg,
    exp: m.experience || "Industry Experience",
    bio: m.professional_bio || m.short_intro || "",
    topics: m.mentorship_topics || [],
  }
}

const WHO = [
  { icon: "student",  title: "College Students",    body: "1st year to final year — build real skills before campus placements." },
  { icon: "dev",      title: "Developers",          body: "Level up from tutorials to real engineering thinking." },
  { icon: "ai",       title: "AI Enthusiasts",      body: "Go beyond prompts — understand how AI systems actually work." },
  { icon: "job",      title: "Job Seekers",         body: "Crack interviews with problem solving, not pattern memorisation." },
  { icon: "engineer", title: "Aspiring Engineers",  body: "Build the foundations that top companies actually look for." },
]

const OUTCOMES = [
  { title: "Problem Solving Mindset",  body: "Think through any problem — not just the ones you've seen before.", icon: "brain" },
  { title: "Real Industry Knowledge",  body: "Understand how engineers at top companies actually work.", icon: "industry" },
  { title: "AI Systems Understanding", body: "Build and explain RAG pipelines, vector search, and LLM apps.", icon: "ai" },
  { title: "Career Clarity",           body: "Know exactly what to build, learn, and show in your portfolio.", icon: "clarity" },
  { title: "Practical Skills",         body: "Spec-driven development, scalable code, real project experience.", icon: "skills" },
  { title: "Certificate",              body: "Official Jobingen Certificate of Participation, shareable on LinkedIn.", icon: "cert" },
]

const TESTIMONIALS = [
  {
    name: "Rahul Verma",
    role: "B.Tech CSE · DTU",
    body: "Finally understood how to think through a problem — not just memorise solutions. Got my first offer within 3 weeks.",
  },
  {
    name: "Sneha Agarwal",
    role: "Final Year · NIT Jaipur",
    body: "Built my first actual RAG project after this. Interviewers are genuinely impressed — it's the only thing on my resume they ask about.",
  },
  {
    name: "Karan Mehta",
    role: "Working Professional · Bangalore",
    body: "Spec-driven coding changed how I work. Embarrassing that nobody taught me this in 4 years of college.",
  },
]

const COLLEGES = [
  "IIT Delhi", "NIT Trichy", "BITS Pilani", "VIT Vellore", "DTU", "IIIT Hyderabad",
  "IIT Bombay", "NIT Warangal", "SRM University", "Amity University",
]

/* ─── CSS ───────────────────────────────────────────────────────── */
const CSS = `
  .ft {
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
    --spring: cubic-bezier(.34,1.56,.64,1);
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    background: #ffffff;
    color: var(--ink);
  }

  @keyframes ft-fade    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
  @keyframes ft-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes ft-pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
  @keyframes ft-glow-pulse { 0%,100%{opacity:.4} 50%{opacity:.7} }
  @keyframes ft-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes ft-spin { to{transform:rotate(360deg)} }
  @keyframes ft-shimmer-text { 0%{background-position:-400% center} 100%{background-position:400% center} }
  @keyframes ft-confetti { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(60px) rotate(360deg);opacity:0} }
  @keyframes ft-check-pop { 0%{transform:scale(0) rotate(-15deg);opacity:0} 65%{transform:scale(1.18) rotate(4deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }

  .ft-rev { opacity:0; transform:translateY(20px); transition:opacity .65s var(--ease), transform .65s var(--ease); }
  .ft-rev.show { opacity:1; transform:none; }

  .ft-shimmer {
    background: linear-gradient(90deg,#1d3a8f 0%,#4f6ef7 35%,#7b93ff 50%,#4f6ef7 65%,#1d3a8f 100%);
    background-size: 300% auto;
    -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
    animation: ft-shimmer-text 4s linear infinite;
  }
  .ft-shimmer-vio {
    background: linear-gradient(90deg,#7c3aed 0%,#a78bfa 35%,#c4b5fd 50%,#a78bfa 65%,#7c3aed 100%);
    background-size: 300% auto;
    -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
    animation: ft-shimmer-text 4s linear infinite;
  }

  /* ── HERO ── */
  .ft-hero {
    position:relative; overflow:hidden;
    background: linear-gradient(175deg, #f0f4ff 0%, var(--white) 55%);
    padding: 168px 24px 80px;
    border-bottom: 1px solid var(--jb);
  }
  .ft-hero-grid {
    position:absolute; inset:0; pointer-events:none; opacity:.4;
    background-image: linear-gradient(var(--ind-l) 1px, transparent 1px),
                      linear-gradient(90deg, var(--ind-l) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 10%, transparent 72%);
  }
  .ft-hero-glow {
    position:absolute; top:-240px; left:50%; transform:translateX(-50%);
    width:900px; height:900px; border-radius:50%; pointer-events:none;
    background:radial-gradient(circle, rgba(29,58,143,.08) 0%, transparent 65%);
    animation: ft-glow-pulse 4s ease-in-out infinite;
  }
  .ft-hero-orb-l {
    position:absolute; top:20%; left:-180px; width:420px; height:420px; border-radius:50%; pointer-events:none;
    background:radial-gradient(circle, rgba(124,58,237,.07) 0%, transparent 65%);
    animation: ft-float 7s ease-in-out infinite;
  }
  .ft-hero-orb-r {
    position:absolute; top:30%; right:-160px; width:380px; height:380px; border-radius:50%; pointer-events:none;
    background:radial-gradient(circle, rgba(59,82,240,.06) 0%, transparent 65%);
    animation: ft-float 9s ease-in-out infinite reverse;
  }
  .ft-hero-wrap { position:relative; z-index:1; max-width:800px; margin:0 auto; text-align:center; }

  .ft-badge {
    display:inline-flex; align-items:center; gap:9px;
    padding:7px 18px 7px 9px; background:white;
    border:1.5px solid rgba(29,58,143,.2); border-radius:99px;
    box-shadow: var(--shadow-md); margin-bottom:32px;
    animation: ft-fade .55s var(--ease) both;
  }
  .ft-badge-pill {
    display:inline-flex; align-items:center; gap:5px;
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white;
    font-size:10px; font-weight:800; letter-spacing:.08em; text-transform:uppercase;
    padding:4px 11px; border-radius:99px;
  }
  .ft-badge-dot { width:6px; height:6px; background:#22c55e; border-radius:50%; animation:ft-pulse-dot 2s ease-in-out infinite; }
  .ft-badge-text { font-size:13px; font-weight:600; color:var(--ind); }

  .ft-h1 { font-size:clamp(36px,5.5vw,64px); font-weight:900; color:var(--ink); letter-spacing:-.048em; line-height:1.04; margin-bottom:22px; animation:ft-fade .7s var(--ease) .1s both; }
  .ft-sub { font-size:clamp(15.5px,1.7vw,18px); color:var(--ink2); line-height:1.8; max-width:600px; margin:0 auto 36px; animation:ft-fade .8s var(--ease) .16s both; }

  .ft-tags { display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap; margin-bottom:40px; animation:ft-fade .85s var(--ease) .22s both; }
  .ft-tag { display:inline-flex; align-items:center; gap:6px; padding:7px 14px; border-radius:99px; border:1.5px solid rgba(29,58,143,.15); background:white; font-size:12.5px; font-weight:700; color:var(--ink2); box-shadow:var(--shadow-sm); }
  .ft-tag-dot { width:7px; height:7px; border-radius:50%; }

  .ft-ctas { display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap; margin-bottom:56px; animation:ft-fade .9s var(--ease) .28s both; }
  .ft-btn-p {
    display:inline-flex; align-items:center; gap:9px; padding:15px 36px; border-radius:14px;
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white;
    font-size:15.5px; font-weight:700; text-decoration:none; border:none; cursor:pointer;
    box-shadow:0 4px 22px rgba(29,58,143,.34); transition:all .22s var(--ease);
    letter-spacing:-.02em;
  }
  .ft-btn-p:hover { transform:translateY(-2px); box-shadow:0 10px 36px rgba(29,58,143,.44); }
  .ft-btn-s {
    display:inline-flex; align-items:center; gap:8px; padding:15px 28px; border-radius:14px;
    background:white; color:var(--ind); font-size:15.5px; font-weight:700;
    text-decoration:none; border:1.5px solid rgba(29,58,143,.22);
    box-shadow:var(--shadow-sm); transition:all .22s; letter-spacing:-.02em;
  }
  .ft-btn-s:hover { border-color:var(--ind); background:var(--ind-xl); transform:translateY(-1px); }

  .ft-stats-row {
    display:inline-flex; background:white; border:1.5px solid var(--jb); border-radius:18px;
    overflow:hidden; box-shadow:var(--shadow-md);
    animation:ft-fade 1s var(--ease) .34s both;
  }
  .ft-stat { padding:20px 32px; text-align:center; border-right:1px solid var(--jb); }
  .ft-stat:last-child { border-right:none; }
  .ft-stat-v { font-size:23px; font-weight:900; color:var(--ind); letter-spacing:-.04em; line-height:1; }
  .ft-stat-l { font-size:10.5px; font-weight:600; color:var(--ink3); margin-top:5px; letter-spacing:.04em; text-transform:uppercase; }

  /* ── TICKER ── */
  .ft-ticker { background:white; border-bottom:1px solid var(--jb); padding:12px 0; overflow:hidden; }
  .ft-ticker-track { display:flex; width:max-content; animation:ft-marquee 32s linear infinite; }
  .ft-ticker-item { display:inline-flex; align-items:center; gap:8px; padding:0 22px; font-size:12px; font-weight:700; color:var(--ink2); white-space:nowrap; }
  .ft-ticker-sep { color:rgba(29,58,143,.3); font-size:10px; }

  /* ── SECTION CHROME ── */
  .ft-wrap { max-width:1120px; margin:0 auto; padding:0 24px; }
  .ft-sec { padding:96px 0; }
  .ft-sec-alt { padding:96px 0; background:var(--cream); }
  .ft-sec-dk { padding:96px 0; background:linear-gradient(160deg,#0c1445 0%,#0f172a 50%,#0c1445 100%); }
  .ft-sec-b { padding:96px 0; background:linear-gradient(160deg,var(--ind-xl) 0%,var(--ind-l) 100%); }

  .ft-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:14px; font-size:11px; font-weight:800; color:var(--ind); letter-spacing:.1em; text-transform:uppercase; }
  .ft-eyebrow-dot { width:5px; height:5px; border-radius:50%; background:var(--ind); flex-shrink:0; }
  .ft-eyebrow-w { color:rgba(165,180,252,.8); }
  .ft-eyebrow-dot-w { background:rgba(165,180,252,.8); }
  .ft-ttl { font-size:clamp(28px,3.5vw,46px); font-weight:900; color:var(--ink); letter-spacing:-.04em; line-height:1.07; margin-bottom:14px; }
  .ft-ttl-w { font-size:clamp(28px,3.5vw,46px); font-weight:900; color:white; letter-spacing:-.04em; line-height:1.07; margin-bottom:14px; }
  .ft-desc { font-size:16px; color:var(--ink2); line-height:1.75; max-width:520px; }
  .ft-desc-w { font-size:16px; color:#94a3b8; line-height:1.75; max-width:520px; }

  /* ── PROBLEMS ── */
  .ft-prob-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:56px; }
  @media(max-width:860px){.ft-prob-grid{grid-template-columns:1fr;}}
  .ft-prob-card {
    position:relative; overflow:hidden;
    background:white; border-radius:22px; border:1.5px solid var(--jb);
    padding:34px 28px; box-shadow:var(--shadow-sm); transition:all .28s var(--ease);
  }
  .ft-prob-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,rgba(239,68,68,.5),rgba(245,101,58,.5)); border-radius:99px 99px 0 0; }
  .ft-prob-card:hover { transform:translateY(-5px); box-shadow:var(--shadow-lg); border-color:rgba(239,68,68,.15); }
  .ft-prob-num { font-size:46px; font-weight:900; color:rgba(239,68,68,.08); letter-spacing:-.06em; line-height:1; margin-bottom:16px; }
  .ft-prob-icon { width:48px; height:48px; border-radius:14px; background:#fff1f2; border:1px solid rgba(239,68,68,.12); display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
  .ft-prob-title { font-size:17px; font-weight:800; color:var(--ink); letter-spacing:-.03em; margin-bottom:10px; line-height:1.25; }
  .ft-prob-body { font-size:13.5px; color:var(--ink2); line-height:1.72; }

  /* Solution banner */
  .ft-sol-banner {
    margin-top:28px; background:linear-gradient(135deg,#0d1b60 0%,#132263 50%,#0e1f6e 100%);
    border-radius:22px; padding:40px 40px; display:flex; align-items:center; gap:32px;
    border:1.5px solid rgba(59,91,219,.25); box-shadow:0 16px 56px rgba(13,27,100,.22);
    position:relative; overflow:hidden;
  }
  .ft-sol-banner::before { content:''; position:absolute; top:-120px; right:-80px; width:380px; height:380px; border-radius:50%; background:radial-gradient(circle,rgba(91,131,255,.15) 0%,transparent 65%); pointer-events:none; }
  .ft-sol-banner::after { content:''; position:absolute; bottom:-80px; left:-40px; width:260px; height:260px; border-radius:50%; background:radial-gradient(circle,rgba(59,91,219,.1) 0%,transparent 65%); pointer-events:none; }
  .ft-sol-pill { display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18); padding:5px 13px; border-radius:99px; font-size:10.5px; font-weight:800; color:#a5b4fc; letter-spacing:.08em; text-transform:uppercase; margin-bottom:14px; }
  .ft-sol-title { font-size:clamp(20px,2.8vw,28px); font-weight:900; color:white; letter-spacing:-.04em; line-height:1.12; margin-bottom:12px; position:relative; z-index:1; }
  .ft-sol-body { font-size:14.5px; color:#94a3b8; line-height:1.78; position:relative; z-index:1; }
  .ft-sol-badge { flex-shrink:0; width:84px; height:84px; border-radius:22px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.14); display:flex; align-items:center; justify-content:center; position:relative; z-index:1; }
  @media(max-width:680px){ .ft-sol-banner{flex-direction:column;padding:28px 22px;gap:20px;} .ft-sol-badge{width:60px;height:60px;} }

  /* ── CURRICULUM ── */
  .ft-curr-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:56px; }
  @media(max-width:900px){.ft-curr-grid{grid-template-columns:1fr;}}
  .ft-curr-card {
    border-radius:24px; overflow:hidden; border:1.5px solid rgba(255,255,255,.08);
    box-shadow:0 20px 60px rgba(0,0,0,.28); transition:transform .28s var(--ease), box-shadow .28s var(--ease);
    position:relative;
  }
  .ft-curr-card:hover { transform:translateY(-6px); box-shadow:0 32px 80px rgba(0,0,0,.38); }
  .ft-curr-card-head { padding:36px 32px 28px; }
  .ft-curr-tag { display:inline-block; font-size:9.5px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.5); border:1px solid rgba(255,255,255,.14); border-radius:6px; padding:4px 10px; margin-bottom:20px; }
  .ft-curr-num { font-size:72px; font-weight:900; color:rgba(255,255,255,.05); letter-spacing:-.06em; line-height:1; margin-bottom:-10px; }
  .ft-curr-title { font-size:clamp(19px,2.4vw,23px); font-weight:900; color:white; letter-spacing:-.04em; line-height:1.14; margin-bottom:6px; }
  .ft-curr-sub { font-size:12.5px; color:rgba(255,255,255,.42); font-weight:600; letter-spacing:.02em; }
  .ft-curr-topics { padding:0 32px 36px; }
  .ft-curr-divider { height:1px; background:rgba(255,255,255,.08); margin-bottom:24px; }
  .ft-curr-topic { display:flex; align-items:flex-start; gap:10px; margin-bottom:13px; }
  .ft-curr-topic:last-child { margin-bottom:0; }
  .ft-curr-check { width:18px; height:18px; border-radius:5px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18); display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
  .ft-curr-topic-text { font-size:13px; color:rgba(255,255,255,.72); line-height:1.6; font-weight:500; }

  /* ── MENTORS ── */
  .ft-ment-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-top:56px; max-width:880px; margin-left:auto; margin-right:auto; align-items:stretch; }
  @media(max-width:720px){.ft-ment-grid{grid-template-columns:1fr;}}
  .ft-ment-card {
    background:white; border-radius:24px; border:1.5px solid var(--jb);
    padding:32px 28px; box-shadow:var(--shadow-sm); transition:all .28s var(--ease);
    position:relative; overflow:hidden;
    display:flex; flex-direction:column; height:100%;
  }
  .ft-ment-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3.5px; border-radius:99px 99px 0 0; }
  .ft-ment-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-lg); }
  .ft-ment-top { display:flex; align-items:center; gap:16px; padding-bottom:20px; margin-bottom:20px; border-bottom:1px solid var(--jb); }
  .ft-ment-av { width:72px; height:72px; border-radius:18px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:900; color:white; overflow:hidden; box-shadow:0 4px 14px rgba(0,0,0,.12); }
  .ft-ment-av img { width:100%; height:100%; object-fit:cover; display:block; }
  .ft-ment-info { flex:1; min-width:0; }
  .ft-ment-name { font-size:17px; font-weight:900; color:var(--ink); letter-spacing:-.03em; margin-bottom:3px; }
  .ft-ment-role { font-size:12.5px; font-weight:600; color:var(--ink2); margin-bottom:8px; }
  .ft-ment-company { display:inline-flex; align-items:center; gap:5px; font-size:11px; font-weight:700; padding:4px 11px; border-radius:99px; }
  .ft-ment-bio { font-size:13.5px; color:var(--ink2); line-height:1.78; flex:1; margin-bottom:20px; }
  .ft-ment-topics { display:flex; flex-wrap:wrap; gap:7px; margin-top:auto; }
  .ft-ment-topic { font-size:11px; font-weight:700; padding:5px 12px; border-radius:99px; }

  /* ── WHO ── */
  .ft-who-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:14px; margin-top:56px; }
  @media(max-width:900px){.ft-who-grid{grid-template-columns:repeat(3,1fr);}}
  @media(max-width:580px){.ft-who-grid{grid-template-columns:repeat(2,1fr);}}
  .ft-who-card { background:white; border-radius:20px; border:1.5px solid var(--jb); padding:28px 18px; text-align:center; box-shadow:var(--shadow-sm); transition:all .26s var(--ease); }
  .ft-who-card:hover { transform:translateY(-5px); box-shadow:var(--shadow-lg); border-color:rgba(29,58,143,.2); }
  .ft-who-icon { width:54px; height:54px; border-radius:15px; background:var(--ind-l); margin:0 auto 15px; display:flex; align-items:center; justify-content:center; }
  .ft-who-title { font-size:14.5px; font-weight:800; color:var(--ink); margin-bottom:7px; letter-spacing:-.02em; }
  .ft-who-body { font-size:12px; color:var(--ink2); line-height:1.62; }

  /* ── OUTCOMES ── */
  .ft-out-table { display:grid; grid-template-columns:repeat(3,1fr); margin-top:52px; border:1.5px solid var(--jb); border-radius:24px; overflow:hidden; box-shadow:var(--shadow-md); }
  .ft-out-cell { display:flex; gap:16px; align-items:flex-start; padding:28px 24px; border-right:1px solid var(--jb); border-bottom:1px solid var(--jb); transition:background .22s; }
  .ft-out-cell:nth-child(3n) { border-right:none; }
  .ft-out-cell:nth-child(n+4) { border-bottom:none; }
  .ft-out-cell:hover { background:var(--ind-xl); }
  .ft-out-icon { width:46px; height:46px; border-radius:13px; background:var(--ind-l); flex-shrink:0; display:flex; align-items:center; justify-content:center; transition:background .22s; }
  .ft-out-cell:hover .ft-out-icon { background:rgba(29,58,143,.13); }
  .ft-out-title { font-size:15px; font-weight:800; color:var(--ink); margin-bottom:5px; letter-spacing:-.025em; }
  .ft-out-body { font-size:12.5px; color:var(--ink2); line-height:1.65; }
  @media(max-width:720px){
    .ft-out-table{grid-template-columns:1fr 1fr;}
    .ft-out-cell:nth-child(3n){border-right:1px solid var(--jb);}
    .ft-out-cell:nth-child(2n){border-right:none;}
    .ft-out-cell:nth-child(n+4){border-bottom:1px solid var(--jb);}
    .ft-out-cell:nth-child(n+5){border-bottom:none;}
  }
  @media(max-width:460px){
    .ft-out-table{grid-template-columns:1fr;}
    .ft-out-cell{border-right:none;border-bottom:1px solid var(--jb);}
    .ft-out-cell:last-child{border-bottom:none;}
  }

  /* ── TESTIMONIALS ── */
  .ft-testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:52px; }
  @media(max-width:860px){.ft-testi-grid{grid-template-columns:1fr;}}
  .ft-testi-card {
    background:white; border-radius:22px; border:1.5px solid var(--jb);
    padding:32px 28px; box-shadow:var(--shadow-sm); transition:all .25s; position:relative; overflow:hidden;
  }
  .ft-testi-card::before { content:'"'; position:absolute; top:-12px; right:22px; font-size:110px; font-weight:900; color:var(--ind); opacity:.05; line-height:1; pointer-events:none; font-family:Georgia,serif; }
  .ft-testi-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-md); border-color:rgba(29,58,143,.14); }
  .ft-testi-stars { display:flex; gap:3px; margin-bottom:14px; }
  .ft-testi-body { font-size:14px; color:var(--ink2); line-height:1.8; margin-bottom:24px; position:relative; z-index:1; }
  .ft-testi-av { width:42px; height:42px; border-radius:13px; background:linear-gradient(135deg,var(--ind),var(--vio)); color:white; font-size:16px; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ft-testi-name { font-size:14px; font-weight:800; color:var(--ink); }
  .ft-testi-role { font-size:12px; color:var(--ind); font-weight:600; }

  /* ── PRICING ── */
  .ft-price-wrap { max-width:500px; margin:48px auto 0; }
  .ft-price-card {
    background:white; border-radius:28px; border:1.5px solid var(--jb);
    box-shadow:0 24px 72px rgba(29,58,143,.1); overflow:hidden; position:relative;
  }
  .ft-price-card::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg,var(--ind),var(--vio)); }
  .ft-price-head { padding:36px 36px 28px; text-align:center; border-bottom:1px solid var(--jb); }
  .ft-price-badge { display:inline-flex; align-items:center; gap:6px; background:var(--ind-l); border:1px solid rgba(29,58,143,.14); padding:5px 14px; border-radius:99px; font-size:11px; font-weight:800; color:var(--ind); letter-spacing:.06em; text-transform:uppercase; margin-bottom:20px; }
  .ft-price-name { font-size:20px; font-weight:900; color:var(--ink); margin-bottom:8px; letter-spacing:-.03em; }
  .ft-price-amount { font-size:68px; font-weight:900; color:var(--ind); letter-spacing:-.06em; line-height:1; margin-bottom:6px; }
  .ft-price-caption { font-size:13px; color:var(--ink3); font-weight:600; }
  .ft-price-features { padding:28px 36px; }
  .ft-price-feature { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--jb); }
  .ft-price-feature:last-child { border-bottom:none; }
  .ft-price-check { width:22px; height:22px; border-radius:7px; background:var(--grn-l); border:1px solid rgba(16,185,129,.18); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ft-price-feat-text { font-size:14px; font-weight:600; color:var(--ink2); }
  .ft-price-cta { padding:0 36px 36px; }
  .ft-price-btn {
    display:flex; align-items:center; justify-content:center; gap:10px; width:100%;
    padding:17px 32px; border-radius:15px; border:none; cursor:pointer;
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white;
    font-size:16.5px; font-weight:800; letter-spacing:-.02em;
    box-shadow:0 6px 24px rgba(29,58,143,.36); transition:all .22s var(--ease);
  }
  .ft-price-btn:hover { transform:translateY(-2px); box-shadow:0 14px 40px rgba(29,58,143,.46); }
  .ft-price-trust { display:flex; align-items:center; justify-content:center; gap:16px; margin-top:16px; }
  .ft-price-trust-item { display:flex; align-items:center; gap:5px; font-size:11.5px; font-weight:600; color:var(--ink3); }

  /* ── REGISTRATION FORM ── */
  .ft-reg-outer { display:flex; gap:32px; align-items:flex-start; max-width:1060px; margin:0 auto; }
  .ft-reg-wrap { flex:1; min-width:0; }
  .ft-upi-desktop-col { width:320px; flex-shrink:0; }
  .ft-upi-mobile-only { display:none; }
  @media(max-width:900px) {
    .ft-reg-outer { flex-direction:column; }
    .ft-upi-desktop-col { display:none; }
    .ft-upi-mobile-only { display:block; }
  }
  .ft-reg-card { background:white; border-radius:28px; border:1.5px solid var(--jb); box-shadow:var(--shadow-lg); overflow:hidden; }
  .ft-reg-head { padding:40px 48px 32px; background:linear-gradient(135deg,#f4f6ff,#eef1fd); border-bottom:1px solid var(--jb); }
  .ft-reg-head-title { font-size:24px; font-weight:900; color:var(--ink); letter-spacing:-.04em; margin-bottom:6px; }
  .ft-reg-head-sub { font-size:14px; color:var(--ink2); line-height:1.6; }
  .ft-reg-progress { display:flex; gap:6px; margin-top:20px; }
  .ft-reg-prog-dot { flex:1; height:3px; border-radius:99px; transition:background .3s; }
  .ft-reg-body { padding:40px 48px; }
  .ft-reg-field { margin-bottom:22px; }
  .ft-reg-label { display:block; font-size:12.5px; font-weight:700; color:var(--ink2); margin-bottom:8px; letter-spacing:.02em; text-transform:uppercase; }
  .ft-reg-input {
    width:100%; padding:14px 18px; border:1.5px solid var(--jb); border-radius:13px;
    background:var(--cream); font-size:15px; font-weight:500; color:var(--ink);
    outline:none; transition:border-color .18s, box-shadow .18s, background .18s;
    font-family:inherit;
  }
  .ft-reg-input:focus { border-color:var(--ind); background:white; box-shadow:0 0 0 4px rgba(29,58,143,.08); }
  .ft-reg-input::placeholder { color:var(--ink3); }
  .ft-reg-select {
    width:100%; padding:14px 18px; border:1.5px solid var(--jb); border-radius:13px;
    background:var(--cream); font-size:15px; font-weight:500; color:var(--ink);
    outline:none; transition:border-color .18s, box-shadow .18s; appearance:none; cursor:pointer;
    font-family:inherit;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%238a8aa8' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 16px center; padding-right:44px;
  }
  .ft-reg-select:focus { border-color:var(--ind); background-color:white; box-shadow:0 0 0 4px rgba(29,58,143,.08); }
  .ft-reg-textarea {
    width:100%; padding:14px 18px; border:1.5px solid var(--jb); border-radius:13px;
    background:var(--cream); font-size:15px; font-weight:500; color:var(--ink);
    outline:none; transition:border-color .18s, box-shadow .18s, background .18s;
    resize:vertical; min-height:100px; font-family:inherit; line-height:1.65;
  }
  .ft-reg-textarea:focus { border-color:var(--ind); background:white; box-shadow:0 0 0 4px rgba(29,58,143,.08); }
  .ft-reg-textarea::placeholder { color:var(--ink3); }
  .ft-reg-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  @media(max-width:580px){
    .ft-reg-head,.ft-reg-body { padding-left:24px; padding-right:24px; }
    .ft-reg-grid { grid-template-columns:1fr; }
  }

  /* Payment section inside form */
  .ft-pay-section { margin-top:28px; padding-top:28px; border-top:1px solid var(--jb); }
  .ft-pay-amount-row { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; background:var(--ind-xl); border:1.5px solid rgba(29,58,143,.14); border-radius:14px; margin-bottom:20px; }
  .ft-pay-label { font-size:13px; font-weight:700; color:var(--ink2); }
  .ft-pay-price { font-size:26px; font-weight:900; color:var(--ind); letter-spacing:-.04em; }
  .ft-pay-btn {
    display:flex; align-items:center; justify-content:center; gap:10px; width:100%;
    padding:17px 32px; border-radius:15px; border:none; cursor:pointer;
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white;
    font-size:16px; font-weight:800; letter-spacing:-.02em;
    box-shadow:0 6px 24px rgba(29,58,143,.36); transition:all .22s var(--ease);
  }
  .ft-pay-btn:hover { transform:translateY(-2px); box-shadow:0 14px 40px rgba(29,58,143,.44); }
  .ft-pay-btn:disabled { opacity:.6; cursor:not-allowed; transform:none; }
  .ft-pay-trust { display:flex; align-items:center; justify-content:center; gap:18px; margin-top:14px; flex-wrap:wrap; }
  .ft-pay-trust-item { display:flex; align-items:center; gap:5px; font-size:11.5px; font-weight:600; color:var(--ink3); }

  /* UPI payment card */
  .ft-upi-card { border-radius:20px; border:1.5px solid var(--jb); box-shadow:0 4px 20px rgba(0,0,0,.07); overflow:hidden; background:white; }
  .ft-upi-head { background:linear-gradient(135deg,#1d3a8f 0%,#2548c5 100%); padding:18px 24px; display:flex; align-items:center; gap:12px; }
  .ft-upi-body { padding:24px; }
  .ft-step-badge { width:28px; height:28px; border-radius:50%; background:var(--ind); color:white; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; flex-shrink:0; }
  .ft-upload-area { width:100%; padding:20px; border-radius:14px; border:2px dashed var(--jb); background:var(--cream); text-align:center; cursor:pointer; transition:all .2s ease; }
  .ft-upload-area:hover { border-color:rgba(29,58,143,.35); background:var(--ind-xl); }
  .ft-upload-area.has-file { border-color:#16a34a; background:#f0fdf4; border-style:solid; }
  .ft-upload-area.upload-err { border-color:#ef4444; }

  /* ── SUCCESS ── */
  .ft-success { min-height:60vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:80px 24px; }
  .ft-success-icon { width:88px; height:88px; border-radius:26px; background:linear-gradient(135deg,var(--ind),var(--vio)); display:flex; align-items:center; justify-content:center; margin:0 auto 28px; box-shadow:0 12px 40px rgba(29,58,143,.32); animation:ft-check-pop .6s var(--spring) both; }
  .ft-success-h2 { font-size:clamp(28px,4vw,42px); font-weight:900; color:var(--ink); letter-spacing:-.04em; margin-bottom:14px; }
  .ft-success-p { font-size:16px; color:var(--ink2); line-height:1.75; max-width:480px; margin:0 auto 36px; }
  .ft-success-card { background:var(--ind-xl); border:1.5px solid rgba(29,58,143,.12); border-radius:18px; padding:22px 28px; max-width:420px; margin:0 auto 36px; }
  .ft-success-card-row { display:flex; align-items:center; gap:10px; font-size:13.5px; color:var(--ink2); font-weight:600; margin-bottom:10px; }
  .ft-success-card-row:last-child { margin-bottom:0; }

  /* ── CTA SECTION ── */
  .ft-cta-sec { padding:100px 24px; text-align:center; background:linear-gradient(160deg,#0c1445 0%,#0f172a 40%,#1a0a3d 80%,#0c1445 100%); position:relative; overflow:hidden; }
  .ft-cta-orb { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:720px; height:720px; border-radius:50%; pointer-events:none; background:radial-gradient(circle,rgba(29,58,143,.22) 0%,transparent 65%); }
  .ft-cta-grid { position:absolute; inset:0; pointer-events:none; opacity:.1; background-image:linear-gradient(rgba(99,102,241,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.4) 1px,transparent 1px); background-size:56px 56px; }
  .ft-cta-inner { position:relative; z-index:1; max-width:640px; margin:0 auto; }
  .ft-cta-label { display:inline-flex; align-items:center; gap:7px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.18); border-radius:99px; padding:7px 18px; font-size:12px; font-weight:700; color:#a5b4fc; margin-bottom:24px; }
  .ft-cta-h2 { font-size:clamp(34px,5vw,60px); font-weight:900; color:white; letter-spacing:-.045em; line-height:1.03; margin-bottom:18px; }
  .ft-cta-sub { font-size:17px; color:#94a3b8; line-height:1.72; margin-bottom:40px; }
  .ft-cta-btn { display:inline-flex; align-items:center; gap:10px; background:white; color:var(--ind); padding:17px 44px; border-radius:15px; font-size:16.5px; font-weight:800; text-decoration:none; letter-spacing:-.02em; box-shadow:0 4px 28px rgba(0,0,0,.24); transition:all .25s; }
  .ft-cta-btn:hover { transform:translateY(-3px); box-shadow:0 14px 40px rgba(0,0,0,.34); }
  .ft-cta-note { display:inline-flex; align-items:center; gap:7px; color:#64748b; font-size:12.5px; font-weight:600; margin-top:18px; }
  .ft-cta-ndot { width:6px; height:6px; background:#22c55e; border-radius:50%; animation:ft-pulse-dot 2s ease-in-out infinite; }

  /* ── GLOBAL RESPONSIVE ── */
  @media(max-width:860px){
    .ft-hero { padding-top:110px; padding-bottom:56px; }
    .ft-sec,.ft-sec-alt,.ft-sec-dk,.ft-sec-b { padding:68px 0; }
    .ft-cta-sec { padding:72px 24px; }
  }
  @media(max-width:640px){
    .ft-hero { padding:100px 16px 48px; }
    .ft-sec,.ft-sec-alt,.ft-sec-dk,.ft-sec-b { padding:52px 0; }
    .ft-cta-sec { padding:56px 16px; }
    .ft-stats-row { display:grid; grid-template-columns:1fr 1fr; width:100%; max-width:340px; }
    .ft-stat { border-right:1px solid var(--jb); border-bottom:1px solid var(--jb); }
    .ft-stat:nth-child(2n) { border-right:none; }
    .ft-stat:nth-child(3),.ft-stat:nth-child(4) { border-bottom:none; }
    .ft-ctas { flex-direction:column; align-items:stretch; max-width:300px; margin-left:auto; margin-right:auto; }
    .ft-btn-p,.ft-btn-s { justify-content:center; }
    .ft-wrap { padding:0 16px; }
    .ft-tags { gap:8px; }
    .ft-tag { font-size:12px; padding:6px 12px; }
  }

  /* ── 2-DAY FORMAT ── */
  .ft-days-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:56px; }
  @media(max-width:720px){.ft-days-grid{grid-template-columns:1fr;}}
  .ft-day-card { border-radius:24px; overflow:hidden; padding:36px 32px; box-shadow:0 20px 60px rgba(0,0,0,.28); transition:transform .28s var(--ease); position:relative; }
  .ft-day-card:hover { transform:translateY(-6px); }
  .ft-day-num { font-size:10px; font-weight:800; color:rgba(165,180,252,.7); letter-spacing:.1em; text-transform:uppercase; margin-bottom:6px; }
  .ft-day-date { font-size:28px; font-weight:900; color:white; letter-spacing:-.04em; margin-bottom:4px; }
  .ft-day-title { font-size:17px; font-weight:700; color:rgba(255,255,255,.75); margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid rgba(255,255,255,.08); }
  .ft-day-topic { display:flex; align-items:center; gap:10px; margin-bottom:11px; font-size:13px; color:rgba(255,255,255,.68); font-weight:500; line-height:1.5; }
  .ft-day-prize { display:flex; align-items:center; gap:10px; margin-top:24px; padding:14px 18px; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.28); border-radius:12px; font-size:13.5px; font-weight:700; color:#fde68a; }

  /* ── PRIZE BANNER ── */
  .ft-prize-banner {
    margin-top:28px; background:linear-gradient(135deg,#1a0a3d 0%,#2d1b69 50%,#1a0a3d 100%);
    border-radius:22px; padding:40px 40px; display:flex; align-items:center; gap:32px;
    border:1.5px solid rgba(245,158,11,.2); box-shadow:0 16px 56px rgba(45,27,105,.22);
    position:relative; overflow:hidden;
  }
  .ft-prize-banner::before { content:''; position:absolute; top:-120px; right:-80px; width:380px; height:380px; border-radius:50%; background:radial-gradient(circle,rgba(245,158,11,.07) 0%,transparent 65%); pointer-events:none; }
  .ft-prize-banner::after { content:''; position:absolute; bottom:-80px; left:-40px; width:260px; height:260px; border-radius:50%; background:radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 65%); pointer-events:none; }
  @media(max-width:680px){ .ft-prize-banner{flex-direction:column;padding:28px 22px;gap:20px;} }
`

/* ─── SVG Icons ─────────────────────────────────────────────────── */
function ChevronRight() {
  return <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
}
function Star() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="#1d3a8f"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/></svg>
}
function Check({ color = "#10b981" }: { color?: string }) {
  return <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
}
function Lock() {
  return <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
}
function Shield() {
  return <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}
function Zap() {
  return <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
}
function BrainIcon() {
  return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.46 2.5 2.5 0 01-1.07-4.61A3 3 0 015 11a3 3 0 013-3 2.5 2.5 0 011.5-4.5z"/><path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.46 2.5 2.5 0 001.07-4.61A3 3 0 0019 11a3 3 0 00-3-3 2.5 2.5 0 00-1.5-4.5z"/></svg>
}
function SpecIcon() {
  return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
}
function AIIcon({ color = "#ef4444" }: { color?: string }) {
  return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>
}
function IndustryIcon() {
  return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v4M10 14h4"/></svg>
}
function ClarityIcon() {
  return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
function SkillsIcon() {
  return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
}
function CertIcon() {
  return <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
}

const PROB_ICONS = [<BrainIcon key="b"/>, <SpecIcon key="s"/>, <AIIcon key="a"/>]
const WHO_ICONS = [
  <svg key="s" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>,
  <svg key="d" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <AIIcon key="ai" color="#1d3a8f"/>,
  <svg key="j" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
  <svg key="e" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>,
]
const OUT_ICONS = [
  <svg key="b" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.46 2.5 2.5 0 01-1.07-4.61A3 3 0 015 11a3 3 0 013-3 2.5 2.5 0 011.5-4.5z"/><path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.46 2.5 2.5 0 001.07-4.61A3 3 0 0119 11a3 3 0 00-3-3 2.5 2.5 0 00-1.5-4.5z"/></svg>,
  <IndustryIcon key="i"/>,
  <AIIcon key="a" color="#1d3a8f"/>,
  <ClarityIcon key="c"/>,
  <SkillsIcon key="s"/>,
  <CertIcon key="cert"/>,
]

/* ─── Abstract Hero Visual ───────────────────────────────────────── */
function HeroVisual() {
  return (
    <div style={{
      position: "relative", width: "100%", maxWidth: 420,
      margin: "0 auto", aspectRatio: "4/3",
    }}>
      {/* Outer glow */}
      <div style={{
        position: "absolute", inset: -30, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(29,58,143,.06) 0%, transparent 65%)",
      }} />

      {/* Card 1: DSA */}
      <div style={{
        position: "absolute", top: "8%", left: "4%",
        background: "linear-gradient(135deg, #0d1b60, #132263)", borderRadius: 18,
        padding: "18px 20px", width: "52%", boxShadow: "0 20px 60px rgba(13,27,100,.3)",
        border: "1px solid rgba(59,91,219,.25)",
        animation: "ft-float 6s ease-in-out infinite",
      }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: "rgba(165,180,252,.7)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>Module 1</div>
        <div style={{ fontSize: 15, fontWeight: 900, color: "white", letterSpacing: "-.03em", lineHeight: 1.2, marginBottom: 12 }}>Think Like<br/>A Solver</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {["DSA", "Patterns", "Problems"].map(t => (
            <span key={t} style={{ fontSize: 9, fontWeight: 700, color: "#a5b4fc", background: "rgba(255,255,255,.08)", padding: "3px 8px", borderRadius: 99 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Card 2: RAG */}
      <div style={{
        position: "absolute", top: "4%", right: "2%",
        background: "linear-gradient(135deg, #2d1b69, #3b1fa3)", borderRadius: 18,
        padding: "18px 20px", width: "44%", boxShadow: "0 20px 60px rgba(45,27,105,.3)",
        border: "1px solid rgba(124,58,237,.25)",
        animation: "ft-float 8s ease-in-out infinite reverse",
      }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: "rgba(196,181,253,.7)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>Module 3</div>
        <div style={{ fontSize: 13, fontWeight: 900, color: "white", letterSpacing: "-.03em", lineHeight: 1.25, marginBottom: 10 }}>RAG<br/>Systems</div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }}/>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#a5b4fc" }}>Production AI</span>
        </div>
      </div>

      {/* Card 3: Spec Coding */}
      <div style={{
        position: "absolute", bottom: "4%", left: "8%",
        background: "linear-gradient(135deg, #042f2e, #064e3b)", borderRadius: 18,
        padding: "18px 20px", width: "56%", boxShadow: "0 20px 60px rgba(4,47,46,.3)",
        border: "1px solid rgba(15,118,110,.25)",
        animation: "ft-float 10s ease-in-out infinite",
      }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: "rgba(110,231,183,.6)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>Module 2</div>
        <div style={{ fontSize: 14, fontWeight: 900, color: "white", letterSpacing: "-.03em", lineHeight: 1.2, marginBottom: 10 }}>Spec Driven<br/>Coding</div>
        <div style={{ height: 3, background: "rgba(16,185,129,.25)", borderRadius: 99, marginBottom: 5 }}>
          <div style={{ width: "72%", height: "100%", background: "linear-gradient(90deg, #10b981, #34d399)", borderRadius: 99 }}/>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(110,231,183,.7)" }}>Real-world workflow</div>
      </div>

      {/* Center badge */}
      <div style={{
        position: "absolute", top: "46%", left: "50%", transform: "translate(-50%, -50%)",
        background: "white", borderRadius: 16, padding: "12px 18px",
        boxShadow: "0 8px 32px rgba(29,58,143,.14)", border: "1.5px solid rgba(29,58,143,.1)",
        display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap",
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #1d3a8f, #3b52f0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap/>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, color: "#09090f", letterSpacing: "-.02em" }}>₹49 · 27-28 June</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#8a8aa8" }}>Bootcamp + Hackathon</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Form state ─────────────────────────────────────────────────── */
type FormData = {
  fullName: string; email: string; phone: string; college: string;
  status: string; skillLevel: string; motivation: string; upi_transaction_id: string;
}
const INIT: FormData = { fullName: "", email: "", phone: "", college: "", status: "", skillLevel: "", motivation: "", upi_transaction_id: "" }
const UPI_ID = "jobingen@upi"
const QR_SRC = "/qr-jobingen.jpeg"

/* ─── UPI Payment Card ───────────────────────────────────────────── */
function UpiPaymentCard() {
  const [copied, setCopied] = useState(false)
  function copyUpi() {
    navigator.clipboard.writeText(UPI_ID).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  return (
    <div className="ft-upi-card">
      <div className="ft-upi-head">
        <div style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>💳</div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.6)", textTransform:"uppercase", letterSpacing:".07em" }}>Registration Fee</div>
          <div style={{ fontSize:24, fontWeight:900, color:"white", lineHeight:1.1 }}>₹49 <span style={{ fontSize:13, fontWeight:500, opacity:.7 }}>only</span></div>
        </div>
      </div>
      <div className="ft-upi-body">
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
          {[
            { n:"1", text:"Scan the QR code or copy the UPI ID below" },
            { n:"2", text:"Pay ₹49 using any UPI app (PhonePe, Paytm, GPay, BHIM)" },
            { n:"3", text:"Enter your Transaction ID + upload screenshot in the form" },
          ].map(s => (
            <div key={s.n} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
              <div className="ft-step-badge">{s.n}</div>
              <span style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.5, paddingTop:4 }}>{s.text}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"20px", borderRadius:16, background:"var(--cream)", border:"1.5px solid var(--jb)", marginBottom:14 }}>
          <div style={{ width:160, height:160, borderRadius:12, overflow:"hidden", background:"white", border:"1.5px solid var(--jb)", display:"flex", alignItems:"center", justifyContent:"center", padding:8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={QR_SRC} alt="UPI QR Code" style={{ width:"100%", height:"100%", objectFit:"contain" }} />
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>UPI ID</div>
            <button onClick={copyUpi} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:10, border:"1.5px solid var(--jb)", background:"white", cursor:"pointer", fontFamily:"inherit" }}>
              <span style={{ fontSize:14, fontWeight:800, color:"var(--ind)" }}>{UPI_ID}</span>
              <span style={{ fontSize:11, fontWeight:700, color: copied ? "#16a34a" : "var(--ink3)" }}>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>
        <div style={{ padding:"11px 14px", borderRadius:10, background:"#fffbeb", border:"1px solid rgba(245,158,11,.2)", fontSize:12, color:"var(--ink2)", lineHeight:1.55 }}>
          After paying, enter the Transaction ID from your UPI app&apos;s history and upload the screenshot.
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function FlagshipTrainingPage() {
  const [form, setForm] = useState<FormData>(INIT)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotName, setScreenshotName] = useState("")
  const [screenshotError, setScreenshotError] = useState("")
  const [serverError, setServerError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  /* live mentor fetch */
  const [mentors, setMentors] = useState<MentorCard[]>(
    MENTOR_NAMES.map(n => MENTOR_FALLBACK[n])
  )
  useEffect(() => {
    fetch("/api/mentors")
      .then(r => r.json())
      .then((data: DBMentor[]) => {
        if (!Array.isArray(data)) return
        const resolved = MENTOR_NAMES.map(name => {
          const found = data.find(m => mentorMatch(m.full_name, name))
          if (!found) return MENTOR_FALLBACK[name]
          const card = dbToCard(found)
          /* always use canonical name (proper spacing) */
          card.name = name
          /* overrides per mentor */
          if (mentorMatch(found.full_name, "Aditya Dubey")) {
            card.company = "AI / ML"
            card.bio = "AI Engineer who has mentored 20,000+ students and professionals in AI technologies and real-world applications. M.Tech in Information Systems from NIT Allahabad."
          }
          return card
        })
        setMentors(resolved)
      })
      .catch(() => {})
  }, [])

  function set(k: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [k]: e.target.value }))
      if (errors[k]) setErrors(er => ({ ...er, [k]: "" }))
      setServerError("")
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setScreenshot(file); setScreenshotName(file.name); setScreenshotError("")
  }

  function validate() {
    const e: Partial<FormData> = {}
    if (!form.fullName.trim()) e.fullName = "Required"
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required"
    if (!form.phone.trim() || form.phone.replace(/\D/g,"").length < 10) e.phone = "Valid phone required"
    if (!form.college.trim()) e.college = "Required"
    if (!form.status) e.status = "Select your year"
    if (!form.skillLevel) e.skillLevel = "Select skill level"
    if (!form.motivation.trim()) e.motivation = "Required"
    if (!form.upi_transaction_id.trim()) e.upi_transaction_id = "UPI Transaction ID is required"
    return e
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (!screenshot) setScreenshotError("Payment screenshot is required.")
    else setScreenshotError("")
    if (Object.keys(errs).length || !screenshot) { setErrors(errs); return }
    setLoading(true); setServerError("")
    try {
      const fd = new globalThis.FormData()
      fd.append("full_name", form.fullName.trim())
      fd.append("email", form.email.trim())
      fd.append("phone", form.phone.trim())
      fd.append("college", form.college.trim())
      fd.append("status", form.status)
      fd.append("skill_level", form.skillLevel)
      fd.append("motivation", form.motivation.trim())
      fd.append("upi_transaction_id", form.upi_transaction_id.trim())
      if (screenshot) fd.append("screenshot", screenshot)
      const res = await fetch("/api/flagship-training", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || "Something went wrong. Please try again."); setLoading(false); return }
      setSuccess(true)
    } catch {
      setServerError("Network error. Please check your connection and try again.")
      setLoading(false)
    }
  }

  const filled = Object.values(form).filter(Boolean).length
  const total = Object.keys(form).length
  const progress = filled / total

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="ft">

        {/* ── HERO ── */}
        <section className="ft-hero">
          <div className="ft-hero-grid"/>
          <div className="ft-hero-glow"/>
          <div className="ft-hero-orb-l"/>
          <div className="ft-hero-orb-r"/>
          <div className="ft-hero-wrap">

            {/* Badge */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="ft-badge">
                <div className="ft-badge-pill">
                  <span className="ft-badge-dot"/>2026
                </div>
                <span className="ft-badge-text">Jobingen Flagship Bootcamp 2026</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="ft-h1">
              Think Like a<br/>
              <span className="ft-shimmer">Problem Solver.</span><br/>
              Build Like an Engineer.
            </h1>

            <p className="ft-sub">
              Two days. Three modules. One hackathon. Problem solving, real-world engineering, and AI systems — plus a chance to win a real Jobingen internship.
            </p>

            {/* Info tags */}
            <div className="ft-tags">
              <div className="ft-tag">
                <span className="ft-tag-dot" style={{ background: "#22c55e" }}/>
                2-Day Live Experience
              </div>
              <div className="ft-tag">
                <span className="ft-tag-dot" style={{ background: "#1d3a8f" }}/>
                ₹49 Registration
              </div>
              <div className="ft-tag">
                <span className="ft-tag-dot" style={{ background: "#f59e0b" }}/>
                Day 2: Hackathon
              </div>
              <div className="ft-tag">
                <span className="ft-tag-dot" style={{ background: "#7c3aed" }}/>
                Certificate Included
              </div>
              <div className="ft-tag">
                <span className="ft-tag-dot" style={{ background: "#f43f5e" }}/>
                Internship Prize
              </div>
            </div>

            {/* CTAs */}
            <div className="ft-ctas">
              <a href="#register" className="ft-btn-p">
                Register Now — ₹49 <ChevronRight/>
              </a>
              <a href="#curriculum" className="ft-btn-s">
                View Curriculum
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="ft-stats-row">
                {[
                  { v: "27-28 June", l: "Program Dates" },
                  { v: "₹49",       l: "Registration Fee" },
                  { v: "Online",    l: "Live Bootcamp" },
                  { v: "Limited",   l: "Seats Left" },
                ].map(s => (
                  <div key={s.l} className="ft-stat">
                    <div className="ft-stat-v">{s.v}</div>
                    <div className="ft-stat-l">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── HERO VISUAL (mobile) ── */}
        <section style={{ padding: "48px 24px", background: "var(--cream)", borderBottom: "1px solid var(--jb)", display: "none" }}>
        </section>

        {/* ── COLLEGE TICKER ── */}
        <div className="ft-ticker">
          <div className="ft-ticker-track">
            {[...COLLEGES, ...COLLEGES].map((c, i) => (
              <span key={i} className="ft-ticker-item">{c}<span className="ft-ticker-sep">◆</span></span>
            ))}
          </div>
        </div>

        {/* ── 2-DAY FORMAT ── */}
        <section className="ft-sec-dk">
          <div className="ft-wrap">
            <R>
              <div className="ft-eyebrow"><span className="ft-eyebrow-dot ft-eyebrow-dot-w"/>Program Structure</div>
              <h2 className="ft-ttl-w">2 Days. Complete Transformation.</h2>
              <p className="ft-desc-w">Day 1 you learn. Day 2 you build. The best builder wins an internship.</p>
            </R>

            <div className="ft-days-grid">
              {/* Day 1 */}
              <R d={0}>
                <div className="ft-day-card" style={{ background: "linear-gradient(148deg,#0d1b60 0%,#132263 40%,#0e1f6e 100%)", border: "1.5px solid rgba(59,91,219,.25)" }}>
                  <div className="ft-day-num">Day 1</div>
                  <div className="ft-day-date">27 June</div>
                  <div className="ft-day-title">Live Bootcamp Class</div>
                  {["Module 1 — DSA & Problem Solving Mindset", "Module 2 — Spec Driven Development", "Module 3 — Advanced RAG Systems", "Hands-on walkthroughs with mentors", "Problem statement revealed at end of session"].map(t => (
                    <div key={t} className="ft-day-topic">
                      <div className="ft-curr-check" style={{ flexShrink: 0 }}><Check color="rgba(255,255,255,.7)"/></div>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </R>

              {/* Day 2 */}
              <R d={90}>
                <div className="ft-day-card" style={{ background: "linear-gradient(148deg,#2d1b69 0%,#3b1fa3 40%,#1e0a6b 100%)", border: "1.5px solid rgba(124,58,237,.25)" }}>
                  <div className="ft-day-num" style={{ color: "rgba(196,181,253,.7)" }}>Day 2</div>
                  <div className="ft-day-date">28 June</div>
                  <div className="ft-day-title">Hackathon</div>
                  {["Solo competition — build from scratch", "Problem statement from Day 1", "Apply DSA + engineering + AI skills", "Mentors as judges", "Submit and present your solution"].map(t => (
                    <div key={t} className="ft-day-topic">
                      <div className="ft-curr-check" style={{ flexShrink: 0 }}><Check color="rgba(255,255,255,.7)"/></div>
                      <span>{t}</span>
                    </div>
                  ))}
                  <div className="ft-day-prize">
                    <span style={{ fontSize: 20 }}>🏆</span>
                    <span>Winner gets a <strong>Jobingen Internship</strong></span>
                  </div>
                </div>
              </R>
            </div>
          </div>
        </section>

        {/* ── WHY STUDENTS STRUGGLE ── */}
        <section className="ft-sec">
          <div className="ft-wrap">
            <R>
              <div className="ft-eyebrow"><span className="ft-eyebrow-dot"/>The Real Problem</div>
              <h2 className="ft-ttl">Why Thousands of Students<br/>Struggle To Get Hired</h2>
              <p className="ft-desc">It's not about effort. It's about what nobody taught you.</p>
            </R>

            <div className="ft-prob-grid">
              {PROBLEMS.map((p, i) => (
                <R key={p.n} d={i * 70}>
                  <div className="ft-prob-card">
                    <div className="ft-prob-num">{p.n}</div>
                    <div className="ft-prob-icon">{PROB_ICONS[i]}</div>
                    <div className="ft-prob-title">{p.title}</div>
                    <div className="ft-prob-body">{p.body}</div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── CURRICULUM ── */}
        <section className="ft-sec-dk" id="curriculum">
          <div className="ft-wrap">
            <R>
              <div className="ft-eyebrow"><span className="ft-eyebrow-dot ft-eyebrow-dot-w"/>Program Curriculum</div>
              <h2 className="ft-ttl-w">What You Will Learn</h2>
              <p className="ft-desc-w">Three modules. Everything you were never taught.</p>
            </R>

            <div className="ft-curr-grid">
              {CURRICULUM.map((c, i) => (
                <R key={c.tag} d={i * 80}>
                  <div className="ft-curr-card" style={{ background: c.bg }}>
                    <div className="ft-curr-card-head">
                      <div className="ft-curr-tag">{c.tag}</div>
                      <div className="ft-curr-num">0{i + 1}</div>
                      <div className="ft-curr-title">{c.title}</div>
                      <div className="ft-curr-sub">{c.subtitle}</div>
                    </div>
                    <div className="ft-curr-topics">
                      <div className="ft-curr-divider"/>
                      {c.topics.map(t => (
                        <div key={t} className="ft-curr-topic">
                          <div className="ft-curr-check">
                            <Check color="rgba(255,255,255,.7)"/>
                          </div>
                          <div className="ft-curr-topic-text">{t}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── MENTORS ── */}
        <section className="ft-sec">
          <div className="ft-wrap">
            <R>
              <div className="ft-eyebrow"><span className="ft-eyebrow-dot"/>Your Mentors</div>
              <h2 className="ft-ttl">Learn From Industry Mentors</h2>
              <p className="ft-desc">Real practitioners. Zero theory fluff.</p>
            </R>

            <div className="ft-ment-grid">
              {mentors.map((m, i) => (
                <R key={m.name} d={i * 90}>
                  <div
                    className="ft-ment-card"
                    style={{ "--accent-color": m.color } as React.CSSProperties}
                  >
                    {/* top color bar */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 3.5,
                      background: `linear-gradient(90deg, ${m.color}, ${m.color}88)`,
                      borderRadius: "99px 99px 0 0",
                    }}/>

                    <div className="ft-ment-top">
                      <div
                        className="ft-ment-av"
                        style={{ background: m.photo ? undefined : `linear-gradient(135deg, ${m.color}, ${m.color}cc)` }}
                      >
                        {m.photo
                          ? <img src={m.photo} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                          : m.initials
                        }
                      </div>
                      <div className="ft-ment-info">
                        <div className="ft-ment-name">{m.name}</div>
                        <div className="ft-ment-role">{m.role}</div>
                        <div
                          className="ft-ment-company"
                          style={{ background: m.bg, color: m.color, border: `1px solid ${m.color}22` }}
                        >
                          {m.company}
                        </div>
                      </div>
                    </div>

                    <div className="ft-ment-bio">{m.bio}</div>

                    <div className="ft-ment-topics">
                      {m.topics.map(t => (
                        <span
                          key={t}
                          className="ft-ment-topic"
                          style={{ background: m.bg, color: m.color, border: `1px solid ${m.color}22` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO SHOULD JOIN ── */}
        <section className="ft-sec-alt">
          <div className="ft-wrap">
            <R>
              <div className="ft-eyebrow"><span className="ft-eyebrow-dot"/>Who Should Join</div>
              <h2 className="ft-ttl">This Bootcamp Is For You If…</h2>
              <p className="ft-desc">We don't care about your GPA. We care that you want to build.</p>
            </R>
            <div className="ft-who-grid">
              {WHO.map((w, i) => (
                <R key={w.title} d={i * 55}>
                  <div className="ft-who-card">
                    <div className="ft-who-icon">{WHO_ICONS[i]}</div>
                    <div className="ft-who-title">{w.title}</div>
                    <div className="ft-who-body">{w.body}</div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUTCOMES ── */}
        <section className="ft-sec">
          <div className="ft-wrap">
            <R>
              <div className="ft-eyebrow"><span className="ft-eyebrow-dot"/>Program Outcomes</div>
              <h2 className="ft-ttl">What You Will Gain</h2>
              <p className="ft-desc">Skills that compound. Not just a certificate.</p>
            </R>
            <R d={60}>
              <div className="ft-out-table">
                {OUTCOMES.map((o, i) => (
                  <div key={o.title} className="ft-out-cell">
                    <div className="ft-out-icon">{OUT_ICONS[i]}</div>
                    <div>
                      <div className="ft-out-title">{o.title}</div>
                      <div className="ft-out-body">{o.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </section>

        {/* ── INTERNSHIP PRIZE BANNER ── */}
        <section className="ft-sec" style={{ paddingTop: 0 }}>
          <div className="ft-wrap">
            <R d={40}>
              <div className="ft-prize-banner">
                <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                  <div className="ft-sol-pill">
                    <span style={{ fontSize: 14 }}>🏆</span>
                    Hackathon Prize
                  </div>
                  <div className="ft-sol-title">
                    Win a Real Jobingen Internship.
                  </div>
                  <div className="ft-sol-body">
                    The top performer from the Day 2 Hackathon wins an actual internship at Jobingen — not a participation trophy. Build the best solution, earn the opportunity.
                  </div>
                </div>
                <div className="ft-sol-badge" style={{ background: "rgba(245,158,11,.12)", border: "1px solid rgba(245,158,11,.2)", width: 96, height: 96, borderRadius: 24 }}>
                  <span style={{ fontSize: 40 }}>🏆</span>
                </div>
              </div>
            </R>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="ft-sec-b">
          <div className="ft-wrap">
            <R>
              <div className="ft-eyebrow"><span className="ft-eyebrow-dot"/>Student Stories</div>
              <h2 className="ft-ttl">What Past Attendees Say</h2>
              <p className="ft-desc">From people who've been exactly where you are.</p>
            </R>
            <div className="ft-testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <R key={t.name} d={i * 70}>
                  <div className="ft-testi-card">
                    <div className="ft-testi-stars">{[...Array(5)].map((_, j) => <Star key={j}/>)}</div>
                    <div className="ft-testi-body">"{t.body}"</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div className="ft-testi-av">{t.name[0]}</div>
                      <div>
                        <div className="ft-testi-name">{t.name}</div>
                        <div className="ft-testi-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>



        {/* ── REGISTRATION + PAYMENT ── */}
        <section className="ft-sec-alt" id="register">
          <div className="ft-wrap">
            <R>
              <div className="ft-eyebrow"><span className="ft-eyebrow-dot"/>Registration</div>
              <h2 className="ft-ttl">Reserve Your Seat</h2>
              <p className="ft-desc">Takes under 2 minutes.</p>
            </R>

            <R d={60}>
              <div className="ft-reg-outer">
              <div className="ft-reg-wrap">
                {success ? (
                  <SuccessState email={form.email}/>
                ) : (
                  <form onSubmit={handleSubmit} className="ft-reg-card" noValidate>

                    {/* Form header */}
                    <div className="ft-reg-head">
                      <div className="ft-reg-head-title">Join Jobingen Flagship Bootcamp</div>
                      <div className="ft-reg-head-sub">27-28 June · Online Live · ₹49 · Certificate + Internship Prize</div>
                      {/* Progress bar */}
                      <div className="ft-reg-progress">
                        {Object.keys(form).map((k, i) => (
                          <div
                            key={k}
                            className="ft-reg-prog-dot"
                            style={{ background: form[k as keyof FormData] ? "var(--ind)" : "rgba(29,58,143,.12)" }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Form body */}
                    <div className="ft-reg-body">

                      {/* Name + Email */}
                      <div className="ft-reg-grid">
                        <div className="ft-reg-field">
                          <label className="ft-reg-label">Full Name</label>
                          <input
                            className="ft-reg-input"
                            placeholder="Your full name"
                            value={form.fullName}
                            onChange={set("fullName")}
                            style={errors.fullName ? { borderColor: "#ef4444" } : {}}
                          />
                          {errors.fullName && <div style={{ color: "#ef4444", fontSize: 11.5, fontWeight: 600, marginTop: 5 }}>{errors.fullName}</div>}
                        </div>
                        <div className="ft-reg-field">
                          <label className="ft-reg-label">Email Address</label>
                          <input
                            type="email"
                            className="ft-reg-input"
                            placeholder="you@email.com"
                            value={form.email}
                            onChange={set("email")}
                            style={errors.email ? { borderColor: "#ef4444" } : {}}
                          />
                          {errors.email && <div style={{ color: "#ef4444", fontSize: 11.5, fontWeight: 600, marginTop: 5 }}>{errors.email}</div>}
                        </div>
                      </div>

                      {/* Phone + College */}
                      <div className="ft-reg-grid">
                        <div className="ft-reg-field">
                          <label className="ft-reg-label">Phone Number</label>
                          <input
                            type="tel"
                            className="ft-reg-input"
                            placeholder="+91 XXXXX XXXXX"
                            value={form.phone}
                            onChange={set("phone")}
                            style={errors.phone ? { borderColor: "#ef4444" } : {}}
                          />
                          {errors.phone && <div style={{ color: "#ef4444", fontSize: 11.5, fontWeight: 600, marginTop: 5 }}>{errors.phone}</div>}
                        </div>
                        <div className="ft-reg-field">
                          <label className="ft-reg-label">College / University</label>
                          <input
                            className="ft-reg-input"
                            placeholder="Your college name"
                            value={form.college}
                            onChange={set("college")}
                            style={errors.college ? { borderColor: "#ef4444" } : {}}
                          />
                          {errors.college && <div style={{ color: "#ef4444", fontSize: 11.5, fontWeight: 600, marginTop: 5 }}>{errors.college}</div>}
                        </div>
                      </div>

                      {/* Status + Skill Level */}
                      <div className="ft-reg-grid">
                        <div className="ft-reg-field">
                          <label className="ft-reg-label">Current Status</label>
                          <select
                            className="ft-reg-select"
                            value={form.status}
                            onChange={set("status")}
                            style={errors.status ? { borderColor: "#ef4444" } : {}}
                          >
                            <option value="">Select your year</option>
                            <option value="1st">1st Year</option>
                            <option value="2nd">2nd Year</option>
                            <option value="3rd">3rd Year</option>
                            <option value="final">Final Year</option>
                            <option value="graduate">Graduate</option>
                            <option value="working">Working Professional</option>
                          </select>
                          {errors.status && <div style={{ color: "#ef4444", fontSize: 11.5, fontWeight: 600, marginTop: 5 }}>{errors.status}</div>}
                        </div>
                        <div className="ft-reg-field">
                          <label className="ft-reg-label">Current Skill Level</label>
                          <select
                            className="ft-reg-select"
                            value={form.skillLevel}
                            onChange={set("skillLevel")}
                            style={errors.skillLevel ? { borderColor: "#ef4444" } : {}}
                          >
                            <option value="">Select skill level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                          {errors.skillLevel && <div style={{ color: "#ef4444", fontSize: 11.5, fontWeight: 600, marginTop: 5 }}>{errors.skillLevel}</div>}
                        </div>
                      </div>

                      {/* Motivation */}
                      <div className="ft-reg-field">
                        <label className="ft-reg-label">Why Do You Want To Join?</label>
                        <textarea
                          className="ft-reg-textarea"
                          placeholder="Share what you're hoping to learn or achieve from this training..."
                          value={form.motivation}
                          onChange={set("motivation")}
                          rows={3}
                          style={errors.motivation ? { borderColor: "#ef4444" } : {}}
                        />
                        {errors.motivation && <div style={{ color: "#ef4444", fontSize: 11.5, fontWeight: 600, marginTop: 5 }}>{errors.motivation}</div>}
                      </div>

                      {/* Payment Verification */}
                      <div className="ft-pay-section">
                        <div style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)", marginBottom: 16, letterSpacing: "-.02em" }}>
                          Payment Verification
                        </div>

                        {/* UPI card (mobile: inline; desktop: in right col — shown here for mobile) */}
                        <div style={{ marginBottom: 20 }} className="ft-upi-mobile-only">
                          <UpiPaymentCard />
                        </div>

                        {/* Transaction ID */}
                        <div style={{ marginBottom: 16 }}>
                          <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", letterSpacing: ".01em", display: "block", marginBottom: 6 }}>
                            UPI Transaction ID <span style={{ color: "#ef4444" }}>*</span>
                          </label>
                          <input
                            className="ft-reg-input"
                            placeholder="e.g. 123456789012"
                            value={form.upi_transaction_id}
                            onChange={set("upi_transaction_id")}
                            style={errors.upi_transaction_id ? { borderColor: "#ef4444" } : {}}
                          />
                          {errors.upi_transaction_id
                            ? <div style={{ color:"#ef4444", fontSize:11.5, fontWeight:600, marginTop:4 }}>{errors.upi_transaction_id}</div>
                            : <div style={{ fontSize:11, color:"var(--ink3)", marginTop:4 }}>Find this in your UPI app under transaction history after payment.</div>
                          }
                        </div>

                        {/* Screenshot upload */}
                        <div style={{ marginBottom: 20 }}>
                          <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", letterSpacing: ".01em", display: "block", marginBottom: 6 }}>
                            Payment Screenshot <span style={{ color: "#ef4444" }}>*</span>
                          </label>
                          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
                          <div
                            className={`ft-upload-area${screenshotName ? " has-file" : ""}${screenshotError ? " upload-err" : ""}`}
                            onClick={() => fileRef.current?.click()}
                          >
                            {screenshotName ? (
                              <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}>
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                                  <path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2"/>
                                </svg>
                                <span style={{ fontSize:13, fontWeight:600, color:"#16a34a" }}>{screenshotName}</span>
                              </div>
                            ) : (
                              <div>
                                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" style={{ margin:"0 auto 8px" }}>
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round"/>
                                  <polyline points="17 8 12 3 7 8" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                  <line x1="12" y1="3" x2="12" y2="15" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round"/>
                                </svg>
                                <div style={{ fontSize:13, fontWeight:600, color:"var(--ink3)" }}>Click to upload payment screenshot</div>
                                <div style={{ fontSize:11, color:"var(--ink3)", marginTop:4 }}>PNG, JPG up to 5MB</div>
                              </div>
                            )}
                          </div>
                          {screenshotError && <div style={{ fontSize:11, color:"#ef4444", marginTop:4 }}>{screenshotError}</div>}
                        </div>

                        {serverError && (
                          <div style={{ padding:"12px 16px", borderRadius:10, background:"#fff1f2", border:"1px solid rgba(244,63,94,.25)", fontSize:13, fontWeight:600, color:"#f43f5e", marginBottom:16 }}>
                            {serverError}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="ft-pay-btn"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "ft-spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Registration — ₹49 Paid <ChevronRight/>
                            </>
                          )}
                        </button>
                        <div className="ft-pay-trust">
                          <div className="ft-pay-trust-item"><Lock/>Secure</div>
                          <div className="ft-pay-trust-item"><Shield/>Verified manually</div>
                          <div className="ft-pay-trust-item">📧 Confirmation email</div>
                        </div>
                      </div>

                    </div>
                  </form>
                )}
              </div>

              {/* Right col: UPI card (desktop only) */}
              <div className="ft-upi-desktop-col">
                <div style={{ position:"sticky", top:80 }}>
                  <UpiPaymentCard />
                </div>
              </div>

              </div>{/* /ft-reg-outer */}
            </R>
          </div>
        </section>



      </div>
      <Footer/>
    </>
  )
}

/* ─── Success State ──────────────────────────────────────────────── */
function SuccessState({ email }: { email: string }) {
  return (
    <div className="ft-reg-card">
      <div style={{ padding: "60px 48px", textAlign: "center" }}>
        <div className="ft-success-icon">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 900, color: "var(--ink)", letterSpacing: "-.04em", marginBottom: 12 }}>
          Registration Confirmed
        </h2>
        <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.75, maxWidth: 400, margin: "0 auto 28px" }}>
          Welcome to Jobingen Flagship Bootcamp. You will receive further communication on your registered email and WhatsApp number.
        </p>

        <div style={{ background: "var(--ind-xl)", border: "1.5px solid rgba(29,58,143,.12)", borderRadius: 18, padding: "22px 28px", maxWidth: 380, margin: "0 auto 28px", textAlign: "left" }}>
          {[
            { icon: "📅", label: "Day 1 — Bootcamp", value: "27 June 2026 · Online Live" },
            { icon: "⚡", label: "Day 2 — Hackathon", value: "28 June 2026 · Build & Win" },
            { icon: "📧", label: "Confirmation", value: email || "Your registered email" },
            { icon: "📱", label: "WhatsApp", value: "Updates on your registered number" },
          ].map((r, idx, arr) => (
            <div
              key={r.label}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                ...(idx < arr.length - 1 ? { marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(29,58,143,.08)" } : {}),
              }}
            >
              <span style={{ fontSize: 18 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 1 }}>{r.label}</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>{r.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--grn)", marginBottom: 24 }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          See you on 27 June for the Bootcamp and 28 June for the Hackathon. This is going to change things.
        </div>

        <a
          href="https://chat.whatsapp.com/BVteQffk69HIjUI9xOYmPG"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 28px", borderRadius: 14,
            background: "#25d366", color: "white",
            fontSize: 15, fontWeight: 800, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(37,211,102,.35)",
            transition: "all .22s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 10px 32px rgba(37,211,102,.45)" }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(37,211,102,.35)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Join WhatsApp Group
        </a>
      </div>
    </div>
  )
}
