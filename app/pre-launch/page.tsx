"use client"

import { useState, useRef, useEffect } from "react"
import { JobingenLogo } from "@/components/jobingen-logo"

// ─── Bootcamp Feedback Section ─────────────────────────────────
const FB_AVATAR_COLORS = ["#6074f3","#10b981","#f59e0b","#f43f5e","#3b82f6","#8b5cf6","#ec4899","#14b8a6"]
type FBItem = { name: string; rating: number; quote: string; recommend: string }

function BootcampFeedbackSection() {
  const [items, setItems] = useState<FBItem[]>([])
  const [avgRating, setAvgRating] = useState(0)
  const [recommendPct, setRecommendPct] = useState(0)
  const ref = useScrollReveal()

  useEffect(() => {
    fetch("/api/public-feedback")
      .then(r => r.json())
      .then(d => {
        const list: FBItem[] = d.feedback || []
        setItems(list)
        if (list.length) {
          setAvgRating(Math.round((list.reduce((s, r) => s + r.rating, 0) / list.length) * 10) / 10)
          const yes = list.filter(r => r.recommend?.toLowerCase().includes("yes")).length
          setRecommendPct(Math.round((yes / list.length) * 100))
        }
      })
      .catch(() => {})
  }, [])

  const FALLBACK: FBItem[] = [
    { name:"Rahul M.", rating:5, quote:"The RAG session was incredibly hands-on. I built my first AI app on Day 1 itself. Mentors were super accessible throughout.", recommend:"Definitely Yes" },
    { name:"Priya S.", rating:5, quote:"Best ₹29 I've ever spent. Content quality was top-notch — ML to RAG to hackathon in 2 days. Completely worth it.", recommend:"Definitely Yes" },
    { name:"Arjun K.", rating:5, quote:"Practical, structured, and mentors actually helped debug live. Waiting for the next batch!", recommend:"Definitely Yes" },
    { name:"Sneha R.", rating:5, quote:"Loved the hackathon format. Built a real project in 12 hours. The community is amazing.", recommend:"Definitely Yes" },
    { name:"Vikram P.", rating:4, quote:"Very well structured for someone new to AI. The live debugging sessions were the best part.", recommend:"Probably Yes" },
    { name:"Ananya T.", rating:5, quote:"Got clarity on RAG architecture that I couldn't find in months of YouTube videos. Exceptional value.", recommend:"Definitely Yes" },
  ]

  const display = items.length > 0 ? items : FALLBACK
  const track = [...display, ...display]

  return (
    <section style={{ background:"#f7f7fb", padding:"80px 0", overflow:"hidden" }}>
      {/* Header */}
      <div ref={ref} className="pl-reveal" style={{ textAlign:"center", marginBottom:44, padding:"0 28px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#ecfdf5", border:"1px solid rgba(16,185,129,0.25)", color:"#10b981", fontSize:12, fontWeight:700, padding:"5px 14px", borderRadius:99, marginBottom:16 }}>
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#10b981", display:"inline-block", animation:"pl-p 1.5s ease-in-out infinite" }} />
          {items.length > 0 ? "Live Feedback · Bootcamp 1" : "From Our Alumni · Bootcamp 1"}
        </div>
        <h2 style={{ fontSize:"clamp(26px,3.2vw,40px)", fontWeight:900, color:"#0a0a0a", margin:"0 0 12px", letterSpacing:"-.025em" }}>
          What our alumni say
        </h2>
        <p style={{ fontSize:15, color:"#6b7280", margin:"0 auto", maxWidth:440, lineHeight:1.7 }}>
          Real words from real attendees — unfiltered.
        </p>

        {/* Stats strip */}
        <div style={{ display:"inline-flex", gap:0, background:"white", border:"1.5px solid rgba(10,10,20,0.08)", borderRadius:16, overflow:"hidden", marginTop:28, boxShadow:"0 2px 8px rgba(10,10,20,0.05)" }}>
          {[
            { label:"Avg Rating", value: items.length ? `${avgRating} / 5` : "5.0 / 5", color:"#fbbf24" },
            { label:"Responses",  value: items.length ? `${items.length}+` : "50+",      color:"#1d3a8f" },
            { label:"Recommend",  value: items.length ? `${recommendPct}%` : "97%",      color:"#10b981" },
          ].map((s, i) => (
            <div key={i} style={{ padding:"14px 24px", textAlign:"center", borderRight: i < 2 ? "1px solid rgba(10,10,20,0.08)" : "none" }}>
              <div style={{ fontSize:20, fontWeight:900, color:s.color, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:10, fontWeight:700, color:"#9ca3af", marginTop:4, textTransform:"uppercase", letterSpacing:".06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div style={{ position:"relative" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:80, background:"linear-gradient(to right, #f7f7fb, transparent)", zIndex:2, pointerEvents:"none" }} />
        <div style={{ position:"absolute", right:0, top:0, bottom:0, width:80, background:"linear-gradient(to left, #f7f7fb, transparent)", zIndex:2, pointerEvents:"none" }} />
        <div style={{ display:"flex", gap:16, paddingLeft:28, animation:`pl-scroll ${track.length * 3.5}s linear infinite`, width:"max-content" }}>
          {track.map((f, i) => {
            const initials = f.name.split(" ").map((n: string) => n[0]).join("").slice(0,2).toUpperCase()
            const color = FB_AVATAR_COLORS[i % FB_AVATAR_COLORS.length]
            return (
              <div key={i} style={{ width:272, flexShrink:0, borderRadius:18, padding:"20px 22px", background:"white", border:"1.5px solid rgba(10,10,20,0.08)", boxShadow:"0 2px 8px rgba(10,10,20,0.05)", display:"flex", flexDirection:"column", gap:12, position:"relative" }}>
                {/* Quote mark */}
                <div style={{ position:"absolute", top:14, left:18, fontSize:52, lineHeight:1, color:"rgba(29,58,143,0.07)", fontFamily:"Georgia,serif", fontWeight:900, pointerEvents:"none", userSelect:"none" }}>&ldquo;</div>
                {/* Stars */}
                <div style={{ display:"flex", gap:2 }}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="13" height="13" viewBox="0 0 14 14">
                      <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill={s <= f.rating ? "#fbbf24" : "#e5e7eb"}/>
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p style={{ fontSize:13, lineHeight:1.7, color:"#4b5563", margin:0, flex:1, display:"-webkit-box", WebkitLineClamp:4, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                  {f.quote}
                </p>
                {/* Author */}
                <div style={{ display:"flex", alignItems:"center", gap:10, paddingTop:12, borderTop:"1px solid rgba(10,10,20,0.08)" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:"white", flexShrink:0 }}>{initials}</div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:800, color:"#0a0a0a" }}>{f.name}</div>
                    <div style={{ fontSize:10, color:"#9ca3af" }}>Bootcamp 1 Attendee</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

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

function PromoPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("pl_popup_closed")) return
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setVisible(false)
    localStorage.setItem("pl_popup_closed", "1")
  }

  if (!visible) return null

  return (
    <div className="pl-pop-overlay" onClick={close}>
      <div className="pl-pop" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className="pl-pop-x" onClick={close} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>

        {/* Badge */}
        <div className="pl-pop-badge">
          <span className="pl-pop-badge-dot" />
          Limited Seats
        </div>

        {/* Title */}
        <h3 className="pl-pop-title">Bootcamp &amp; Hackathon</h3>
        <p className="pl-pop-desc">Join our upcoming bootcamp and hackathon to build real AI products and win exciting rewards.</p>

        {/* Buttons */}
        <div className="pl-pop-btns">
          <a href="#bootcamp" className="pl-pop-btn-primary" onClick={close}>Join Bootcamp</a>
          <a href="#bootcamp" className="pl-pop-btn-outline" onClick={close}>Register Hackathon</a>
        </div>
        <a href="/campus-ambassador" className="pl-pop-btn-amb" onClick={close}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Become Campus Ambassador
        </a>

        {/* Footer note */}
        <p className="pl-pop-note">🎁 Winners get ₹50,000+ in prizes &amp; mentorship</p>
      </div>
    </div>
  )
}

const PL_MENTORS = [
  {
    name: "Sonic Payeng", role: "Software Engineer 2 (SWE2)", company: "Dell Technologies",
    initials: "SP", photo: "/mentors/sonic-payeng.jpg",
    desc: "Sonic specializes in applied machine learning, intelligent automation, and LLM systems. He works at Dell Technologies on the Dell Automation Platform, building AI-driven solutions across on-premise, SaaS, and hybrid cloud environments.",
    linkedin: "https://www.linkedin.com/in/sonic-payeng-7ab8a8212/",
  },
  {
    name: "Jitesh Vijaykumar", role: "AI Engineer", company: "KPMG",
    initials: "JV", photo: "/mentors/jitesh-vijaykumar.jpg",
    desc: "Jitesh has 5+ years building scalable AI solutions for enterprise systems. At KPMG, he designs and implements AI-powered solutions that improve decision-making, automation, and operational efficiency for organizations.",
    linkedin: "https://www.linkedin.com/in/jitesh-vijaykumar-b2786814b/",
  },
  {
    name: "Shubham Kaushik", role: "AI & Financial Intelligence Researcher", company: "KPMG",
    initials: "SK", photo: "/mentors/shubham-kaushik.jpg",
    desc: "Shubham has 5+ years in AI, machine learning, and full-stack development. His research spans LLMs, intelligent data systems, and scalable financial AI applications at KPMG.",
    linkedin: "https://www.linkedin.com/in/eskaykaushik/",
  },
  {
    name: "Aditya Dubey", role: "AI Strategy & Implementation Consultant", company: "Cograd",
    initials: "AD", photo: "/mentors/aditya-dubey.jpg",
    desc: "An expert in building scalable systems and managing the full project lifecycle. With 3+ years of experience as an AI Engineer, he specializes in the strategic application of LLMs, Multi-Agent systems, and Offline AI models. Beyond engineering, he is a dedicated mentor to 12,000+ students and professionals, bridging the gap between cutting-edge technology and education.",
    linkedin: "https://www.linkedin.com/in/aditya-dubey-4092b1214/",
  },
]

function PLMentorCard({ m }: { m: typeof PL_MENTORS[0] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="pl-mcard">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={m.photo} alt={m.name} className="pl-mphoto"
          onError={(e) => {
            e.currentTarget.style.display = "none"
            const fb = e.currentTarget.nextElementSibling as HTMLElement
            if (fb) fb.style.display = "flex"
          }}
        />
        <div className="pl-mfallback" style={{ display: "none" }}>{m.initials}</div>
        <div>
          <div className="pl-mname">{m.name}</div>
          <div className="pl-mrole">{m.role}</div>
          <span className="pl-mco">{m.company}</span>
        </div>
      </div>
      <div className="pl-mdiv" />
      <p className={`pl-mdesc${expanded ? "" : " clamped"}`}>{m.desc}</p>
      <button className="pl-mmore" onClick={() => setExpanded(v => !v)}>
        {expanded ? "View Less ↑" : "View More ↓"}
      </button>
      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="pl-mli">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>
    </div>
  )
}

export default function PreLaunchPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState("")

  const [name2, setName2] = useState("")
  const [email2, setEmail2] = useState("")
  const [submitted2, setSubmitted2] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [formError2, setFormError2] = useState("")

  const handleSubmit = async (e: React.FormEvent, which: "hero" | "cta") => {
    e.preventDefault()
    const n = which === "hero" ? name : name2
    const em = which === "hero" ? email : email2
    if (!n.trim() || !em.trim()) return
    if (which === "hero") { setLoading(true); setFormError("") }
    else { setLoading2(true); setFormError2("") }
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n.trim(), email: em.trim() }),
      })
      const data = await res.json()
      if (!res.ok && res.status !== 409) {
        if (which === "hero") setFormError(data.error || "Something went wrong.")
        else setFormError2(data.error || "Something went wrong.")
      } else {
        // 201 success or 409 duplicate — both treated as success for user
        if (which === "hero") { setSubmitted(true); setName(""); setEmail("") }
        else { setSubmitted2(true); setName2(""); setEmail2("") }
      }
    } catch {
      if (which === "hero") setFormError("Network error. Please try again.")
      else setFormError2("Network error. Please try again.")
    } finally {
      if (which === "hero") setLoading(false)
      else setLoading2(false)
    }
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

        /* ═══ POPUP ═══ */
        @keyframes pl-pop-in{from{opacity:0;transform:translate(-50%,-50%) scale(.92)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
        @keyframes pl-pop-bg{from{opacity:0}to{opacity:1}}
        .pl-pop-overlay{position:fixed;inset:0;z-index:999;background:rgba(10,10,10,.45);backdrop-filter:blur(6px);animation:pl-pop-bg .35s ease forwards;display:flex;align-items:center;justify-content:center}
        .pl-pop{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:24px;padding:32px 28px 26px;width:min(440px,calc(100vw - 32px));box-shadow:0 32px 80px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.04);animation:pl-pop-in .45s cubic-bezier(.16,1,.3,1) forwards;z-index:1000}
        .pl-pop-x{position:absolute;top:16px;right:16px;width:30px;height:30px;border-radius:8px;border:none;background:#f3f4f6;color:#6b7280;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
        .pl-pop-x:hover{background:#e5e7eb;color:#111}
        .pl-pop-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(42,78,207,.07);color:#2a4ecf;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:5px 12px;border-radius:100px;margin-bottom:16px}
        .pl-pop-badge-dot{width:6px;height:6px;border-radius:50%;background:#2a4ecf;animation:pl-p 2s infinite}
        .pl-pop-title{font-size:22px;font-weight:900;letter-spacing:-.6px;color:#0a0a0a;margin-bottom:10px;line-height:1.2}
        .pl-pop-desc{font-size:14px;color:#555;line-height:1.65;margin-bottom:22px}
        .pl-pop-btns{display:flex;gap:10px;margin-bottom:16px}
        .pl-pop-btn-primary{flex:1;background:linear-gradient(135deg,#1d3a8f,#2a4ecf,#3b52f0);color:#fff;border:none;padding:13px 0;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;text-align:center;text-decoration:none;display:flex;align-items:center;justify-content:center;transition:all .3s cubic-bezier(.16,1,.3,1);box-shadow:0 4px 16px rgba(42,78,207,.3);font-family:inherit}
        .pl-pop-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(42,78,207,.45)}
        .pl-pop-btn-outline{flex:1;background:#fff;color:#1d3a8f;border:1.5px solid rgba(42,78,207,.25);padding:13px 0;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;text-align:center;text-decoration:none;display:flex;align-items:center;justify-content:center;transition:all .25s;font-family:inherit}
        .pl-pop-btn-outline:hover{background:rgba(42,78,207,.05);border-color:#2a4ecf}
        .pl-pop-note{font-size:12px;color:#999;text-align:center}
        @media(max-width:480px){
          .pl-pop{padding:24px 20px 20px}
          .pl-pop-title{font-size:19px}
          .pl-pop-btns{flex-direction:column}
        }

        /* ═══ NAV ═══ */
        .pl-nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,.72);backdrop-filter:blur(24px) saturate(180%);border-bottom:1px solid rgba(0,0,0,.04)}
        .pl-nav-in{max-width:1200px;margin:0 auto;padding:0 32px;height:72px;display:flex;align-items:center;justify-content:space-between}
        .pl-nav-links{display:flex;gap:32px}
        .pl-nav-a{font-size:14px;font-weight:500;color:#666;text-decoration:none;transition:color .25s}
        .pl-nav-a:hover{color:#1d3a8f}
        .pl-nav-cta{display:inline-flex;align-items:center;background:linear-gradient(135deg,#2a4ecf,#3b52f0);color:#fff;border:none;padding:10px 24px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .3s cubic-bezier(.16,1,.3,1);box-shadow:0 2px 12px rgba(42,78,207,.25)}
        .pl-nav-cta:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(42,78,207,.4)}
        .pl-nav-cta:active{transform:translateY(0) scale(.97)}
        .pl-nav-wa{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:10px;background:#fff;border:1.5px solid rgba(42,78,207,.3);color:#2a4ecf;font-size:13px;font-weight:700;text-decoration:none;transition:all .25s;white-space:nowrap}
        .pl-nav-wa:hover{background:#e8edfe;border-color:#2a4ecf;transform:translateY(-1px)}
        .pl-nav-reg{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:10px;background:linear-gradient(135deg,#2a4ecf,#3b52f0);color:#fff;font-size:13px;font-weight:700;text-decoration:none;transition:all .25s;white-space:nowrap;box-shadow:0 2px 10px rgba(42,78,207,.25)}
        .pl-nav-reg:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(42,78,207,.4)}

        /* ═══ HERO ═══ */
        .pl-hero{position:relative;padding:100px 32px 60px;min-height:100vh;min-height:100svh;text-align:center;overflow:hidden;background:linear-gradient(170deg,#eef2ff 0%,#f8f9ff 30%,#fff 60%,#f0f4ff 100%)}
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
        .pl-how{padding:80px 32px 88px;background:#fff;position:relative}
        .pl-how-inner{max-width:1100px;margin:0 auto}
        .pl-how-head{text-align:center;margin-bottom:56px}
        .pl-how-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#2a4ecf;margin-bottom:12px}
        .pl-how-title{font-size:36px;font-weight:900;letter-spacing:-.03em;color:#09090f;line-height:1.1;margin-bottom:12px}
        .pl-how-sub{font-size:15px;color:#8a8aa8;font-weight:500}
        .pl-steps{display:grid;grid-template-columns:repeat(5,1fr);gap:0;position:relative}
        .pl-steps::before{content:'';position:absolute;top:28px;left:calc(10% + 16px);right:calc(10% + 16px);height:1px;background:linear-gradient(90deg,rgba(42,78,207,.15),rgba(42,78,207,.3),rgba(42,78,207,.15));z-index:0}
        .pl-step{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 12px;position:relative;z-index:1}
        .pl-step-num{width:56px;height:56px;border-radius:16px;background:#fff;border:1.5px solid rgba(42,78,207,.15);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#2a4ecf;margin-bottom:20px;position:relative;box-shadow:0 2px 12px rgba(42,78,207,.08);transition:all .3s ease}
        .pl-step:hover .pl-step-num{background:linear-gradient(135deg,#1d3a8f,#2a4ecf);color:#fff;border-color:transparent;box-shadow:0 8px 24px rgba(42,78,207,.25);transform:translateY(-3px)}
        .pl-step h4{font-size:14px;font-weight:800;color:#09090f;margin-bottom:8px;letter-spacing:-.01em;line-height:1.3}
        .pl-step p{font-size:12.5px;color:#8a8aa8;line-height:1.6;font-weight:450}
        @media(max-width:860px){.pl-steps{grid-template-columns:1fr 1fr;gap:32px}.pl-steps::before{display:none}}
        @media(max-width:480px){.pl-steps{grid-template-columns:1fr;gap:24px}}

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
        .pl-ft-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2.5fr 1fr 1fr;gap:48px}
        .pl-ft-brand h3{font-size:20px;font-weight:900;margin-bottom:10px}
        .pl-ft-brand p{font-size:14px;color:#888;line-height:1.6;max-width:280px}
        .pl-ft-col h4{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#999;margin-bottom:16px}
        .pl-ft-col a{display:block;font-size:14px;color:#555;text-decoration:none;margin-bottom:10px;transition:color .2s,transform .2s;font-weight:500}
        .pl-ft-col a:hover{color:#2a4ecf;transform:translateX(2px)}
        .pl-ft-bot{max-width:1200px;margin:32px auto 0;padding-top:24px;border-top:1px solid rgba(0,0,0,.04);display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#aaa}

        /* ═══ CAMPUS AMBASSADOR CARD ═══ */
        .pl-ca-wrap{padding:0 32px 64px;background:#f8f9ff;max-width:1100px;margin:0 auto}
        .pl-ca-card{border-radius:28px;overflow:hidden;background:linear-gradient(135deg,#060d24 0%,#0d1b45 45%,#1d3a8f 100%);padding:56px 60px;position:relative;box-shadow:0 24px 80px rgba(6,13,36,.28);display:flex;align-items:center;justify-content:space-between;gap:40px}
        .pl-ca-card::before{content:'';position:absolute;top:-80px;right:-40px;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(42,78,207,.28),transparent 70%);pointer-events:none}
        .pl-ca-card::after{content:'';position:absolute;bottom:-60px;left:18%;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(59,82,240,.18),transparent 70%);pointer-events:none}
        .pl-ca-left{flex:1;position:relative;z-index:1}
        .pl-ca-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);padding:6px 16px;border-radius:100px;font-size:11px;font-weight:700;color:rgba(255,255,255,.8);text-transform:uppercase;letter-spacing:.07em;margin-bottom:20px}
        .pl-ca-badge-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;box-shadow:0 0 6px rgba(34,197,94,.5);animation:pl-p 2s infinite}
        .pl-ca-card h3{font-size:30px;font-weight:900;color:#fff;letter-spacing:-1px;line-height:1.18;margin-bottom:14px}
        .pl-ca-card p{font-size:16px;color:rgba(255,255,255,.58);line-height:1.72;max-width:480px;margin-bottom:32px}
        .pl-ca-btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#1d3a8f;padding:14px 32px;border-radius:12px;font-size:15px;font-weight:800;text-decoration:none;box-shadow:0 4px 20px rgba(0,0,0,.2);transition:all .3s cubic-bezier(.16,1,.3,1);position:relative;z-index:1}
        .pl-ca-btn:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 8px 32px rgba(0,0,0,.28)}
        .pl-ca-btn:active{transform:scale(.97)}
        .pl-ca-right{flex-shrink:0;position:relative;z-index:1;display:flex;flex-direction:column;gap:12px;align-items:flex-end}
        .pl-ca-tag{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:12px 18px;backdrop-filter:blur(8px);white-space:nowrap}
        .pl-ca-tag-ico{font-size:16px}
        .pl-ca-tag-txt{font-size:13px;font-weight:600;color:rgba(255,255,255,.78)}

        /* ═══ POPUP AMBASSADOR BUTTON ═══ */
        .pl-pop-btn-amb{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;padding:12px 0;border-radius:12px;background:transparent;color:#1d3a8f;border:1.5px solid rgba(42,78,207,.22);font-size:13px;font-weight:700;text-decoration:none;transition:all .25s;margin-bottom:12px;font-family:inherit;cursor:pointer}
        .pl-pop-btn-amb:hover{background:rgba(42,78,207,.06);border-color:#2a4ecf;transform:translateY(-1px)}

        /* ═══ RESPONSIVE ═══ */
        @media(max-width:1024px){
          .pl-svc-grid{grid-template-columns:repeat(2,1fr);gap:14px}
          .pl-bene-grid{grid-template-columns:repeat(2,1fr)}
          .pl-ft-in{grid-template-columns:1fr 1fr;gap:32px}
        }
        @media(max-width:768px){
          .pl-ca-wrap{padding:0 16px 48px}
          .pl-ca-card{flex-direction:column;align-items:flex-start;padding:36px 24px;gap:20px}
          .pl-ca-card h3{font-size:22px;letter-spacing:-.7px}
          .pl-ca-card p{font-size:14px}
          .pl-ca-right{align-items:flex-start;width:100%;flex-direction:row;flex-wrap:wrap;gap:8px}
          .pl-ca-tag{padding:10px 14px}
          .pl-ca-tag-txt{font-size:12px}
          .pl-nav-links{display:none}
          .pl-nav-wa{display:none}
          .pl-nav-cta{display:none}
          .pl-nav-in{height:60px;padding:0 16px}
          .pl-nav-in a img{height:42px!important}
          .pl-nav-reg{padding:9px 16px;font-size:13px;gap:6px}
          .pl-nav-reg span{display:inline}
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
          .pl-bc{padding:32px 16px 60px}
          .pl-bc-head{padding:24px 20px;gap:16px;flex-direction:column;align-items:stretch}
          .pl-bc-left{flex-direction:column;align-items:flex-start;gap:10px}
          .pl-bc-h{font-size:18px;line-height:1.25}
          .pl-bc-right{flex-direction:column;align-items:flex-start;width:100%;gap:10px}
          .pl-bc-price{display:flex;align-items:baseline;gap:8px;text-align:left}
          .pl-bc-psub{margin-top:0}
          .pl-bc-amt{font-size:28px}
          .pl-bc-reg{width:100%;justify-content:center;padding:13px 20px;font-size:14px}
          .pl-bc-body{grid-template-columns:1fr;padding:20px;gap:20px}
          .pl-bc-cols{grid-template-columns:1fr}
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
          .pl-bc-head{padding:18px 16px;gap:12px}
          .pl-bc-h{font-size:16px;line-height:1.3}
          .pl-bc-amt{font-size:26px}
          .pl-bc-body{padding:16px 14px}
          .pl-bc-amt{font-size:26px}
          .pl-portals-track{animation-duration:12s}
          .pl-ppill{font-size:13px;padding:6px 18px}
          .pl-ft-brand img{height:55px!important}
        }

        /* ═══ JOBS SECTION ═══ */
        .pl-jobs{padding:60px 32px 72px;background:#f4f6fb}
        .pl-jobs-wrap{max-width:1100px;margin:0 auto}
        .pl-jgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        @media(max-width:700px){.pl-jgrid{grid-template-columns:1fr}}
        .pl-jobs-label{font-size:11px;font-weight:700;color:#1d3a8f;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;text-align:center}
        .pl-jobs-heading{font-size:clamp(22px,3vw,34px);font-weight:900;color:#09090f;letter-spacing:-.03em;text-align:center;margin-bottom:8px}
        .pl-jobs-sub{font-size:14px;color:#5a5a7a;text-align:center;max-width:480px;margin:0 auto 36px;line-height:1.65}
        .pl-jcard{background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;transition:transform .22s cubic-bezier(.16,1,.3,1),box-shadow .22s ease;box-shadow:0 2px 8px rgba(0,0,0,.05)}
        .pl-jcard:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(29,58,143,.11);border-color:rgba(29,58,143,.18)}
        .pl-jcard-body{padding:20px 22px 16px;display:flex;gap:14px;align-items:flex-start;flex:1}
        .pl-jlogo{width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#fff;flex-shrink:0;letter-spacing:-.01em;overflow:hidden;padding:0;border:1px solid rgba(0,0,0,.08)}
        .pl-jlogo img{width:100%;height:100%;object-fit:contain;display:block}
        .pl-jinfo{flex:1;min-width:0}
        .pl-jtitle{font-size:15px;font-weight:800;color:#09090f;margin-bottom:3px;letter-spacing:-.02em;line-height:1.25}
        .pl-jcompany{font-size:12px;font-weight:600;color:#5a5a7a;margin-bottom:10px}
        .pl-jtags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
        .pl-jtag{font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;letter-spacing:.01em}
        .pl-jtag-type{background:#e8edfe;color:#1d3a8f}
        .pl-jtag-mode{background:#f5f3ff;color:#7c3aed}
        .pl-jtag-live{background:#ecfdf5;color:#10b981;display:inline-flex;align-items:center;gap:3px}
        .pl-jloc{font-size:11px;color:#8a8aa8;display:flex;align-items:center;gap:4px}
        .pl-jcard-foot{padding:10px 22px;border-top:1px solid rgba(0,0,0,.06);background:#fafbff;display:flex;align-items:center;justify-content:space-between;gap:10px}
        .pl-japply{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#1d3a8f,#2548c5);color:#fff;font-size:11px;font-weight:800;padding:7px 16px;border-radius:9px;text-decoration:none;box-shadow:0 3px 10px rgba(29,58,143,.25);transition:all .18s ease}
        .pl-japply:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(29,58,143,.35)}
        .pl-jposted{font-size:10px;color:#8a8aa8;font-weight:500}
        .pl-jobs-cta{text-align:center;margin-top:28px}
        .pl-jobs-cta a{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:700;color:#1d3a8f;text-decoration:none;padding:10px 20px;border-radius:11px;border:1.5px solid rgba(29,58,143,.2);background:#e8edfe;transition:all .18s ease}
        .pl-jobs-cta a:hover{background:#1d3a8f;color:#fff}
        @media(max-width:640px){.pl-jobs{padding:40px 16px 52px}.pl-jcard-foot{flex-direction:column;align-items:stretch}.pl-japply{justify-content:center;width:100%}}

        /* ═══ BOOTCAMP MENTORS ═══ */
        .pl-mentors{padding:60px 32px 72px;background:#fff}
        .pl-mentors-wrap{max-width:1100px;margin:0 auto}
        .pl-mentors-label{font-size:11px;font-weight:700;color:#1d3a8f;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;text-align:center}
        .pl-mentors-heading{font-size:clamp(22px,3vw,34px);font-weight:900;color:#09090f;letter-spacing:-.03em;text-align:center;margin-bottom:8px}
        .pl-mentors-sub{font-size:14px;color:#5a5a7a;text-align:center;max-width:500px;margin:0 auto 36px;line-height:1.65}
        .pl-mgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
        @media(max-width:1024px){.pl-mgrid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:560px){.pl-mgrid{grid-template-columns:1fr}}
        .pl-mcard{background:#f8f9ff;border:1px solid rgba(29,58,143,.08);border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:14px;transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s cubic-bezier(.16,1,.3,1)}
        .pl-mcard:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(29,58,143,.12)}
        .pl-mphoto{width:60px;height:60px;border-radius:14px;object-fit:cover;object-position:top;flex-shrink:0;border:2px solid rgba(29,58,143,.1)}
        .pl-mfallback{width:60px;height:60px;border-radius:14px;background:linear-gradient(135deg,#1d3a8f,#3b52f0);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#fff;flex-shrink:0}
        .pl-mname{font-size:15px;font-weight:800;color:#09090f;line-height:1.2}
        .pl-mrole{font-size:11px;font-weight:600;color:#1d3a8f;margin-top:2px;line-height:1.4}
        .pl-mco{display:inline-block;font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;background:#e8edfe;color:#1d3a8f;margin-top:4px}
        .pl-mdiv{height:1px;background:rgba(0,0,0,.07)}
        .pl-mdesc{font-size:12px;color:#5a5a7a;line-height:1.7;flex:1}
        .pl-mdesc.clamped{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
        .pl-mmore{background:none;border:none;padding:0;font-size:11.5px;font-weight:700;color:#1d3a8f;cursor:pointer;text-decoration:underline;text-underline-offset:2px}
        .pl-mli{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:9px;background:#e8edfe;color:#1d3a8f;font-size:12px;font-weight:700;text-decoration:none;border:1px solid rgba(29,58,143,.15);transition:all .2s ease;margin-top:auto}
        .pl-mli:hover{background:#1d3a8f;color:#fff}
        @media(max-width:640px){.pl-mentors{padding:40px 16px 52px}}
      `}</style>

      <PromoPopup />

      <div className="pl">
        {/* ═══ NAV ═══ */}
        <nav className="pl-nav">
          <div className="pl-nav-in">
            <a href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}><JobingenLogo height={110} /></a>
            <div className="pl-nav-links">
              <a href="#bootcamp" className="pl-nav-a">Bootcamp</a>
              <a href="#services" className="pl-nav-a">Services</a>
              <a href="#how" className="pl-nav-a">How it Works</a>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <a href="/jobs" className="pl-nav-wa">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
                <span>View Jobs</span>
              </a>
              <a href="/register" className="pl-nav-reg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                <span>Register Now</span>
              </a>
              <a href="/campus-ambassador" className="pl-nav-cta">Become Ambassador</a>
            </div>
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
            <p className="pl-hero-sub">Jobingen brings every job portal, AI-powered resume tools, salary data, and interview prep into one command center — built for India.</p>
            {submitted ? (
              <p className="pl-ok">You&apos;re on the early access list.</p>
            ) : (
              <form className="pl-form" style={{ flexDirection: "column", maxWidth: 480 }} onSubmit={(e) => handleSubmit(e, "hero")}>
                <div style={{ display: "flex", gap: 10 }}>
                  <input className="pl-input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required style={{ flex: 1, minWidth: 0 }} />
                  <input id="hero-email" className="pl-input" type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ flex: 1.4, minWidth: 0 }} />
                </div>
                {formError && <p style={{ color: "#f43f5e", fontSize: 13, fontWeight: 600, margin: "4px 0 0" }}>{formError}</p>}
                <button className="pl-btn" type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}>
                  {loading ? "Joining..." : "Get Early Access"}
                </button>
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
                      <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
                        <div className="pl-bc-amt">&#8377;29</div>
                        <span style={{ fontSize:16, color:"rgba(255,255,255,0.4)", textDecoration:"line-through", marginBottom:4, fontWeight:700 }}>&#8377;499</span>
                      </div>
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
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {[
                        { icon:"🏆", text:"Winners get paid internships" },
                        { icon:"📄", text:"ATS-proof resume included" },
                        { icon:"🤖", text:"Build a real AI project, end-to-end" },
                        { icon:"👥", text:"Live mentors, no passive watching" },
                      ].map((item) => (
                        <div key={item.text} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"#3d3d52", fontWeight:500 }}>
                          <span style={{ fontSize:15 }}>{item.icon}</span>
                          {item.text}
                        </div>
                      ))}
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

        {/* ═══ BOOTCAMP MENTORS ═══ */}
        <Reveal>
          <section className="pl-mentors">
            <div className="pl-mentors-wrap">
              <div className="pl-mentors-label">Our Upcoming Bootcamp Mentors</div>
              <h2 className="pl-mentors-heading">Learn from Industry Experts</h2>
              <p className="pl-mentors-sub">
                AI engineers and researchers from top companies who will guide you live through every session.
              </p>
              <div className="pl-mgrid">
                {PL_MENTORS.map((m) => <PLMentorCard key={m.name} m={m} />)}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══ JOBS SECTION ═══ */}
        <Reveal>
          <section className="pl-jobs">
            <div className="pl-jobs-wrap">

              <h2 className="pl-jobs-heading">Open Positions</h2>
              <p className="pl-jobs-sub">
                Exciting opportunities across tech, design, and operations. Apply now and grow with us.
              </p>
              <div className="pl-jgrid">
              {[
                { title: "Technology Transfer & IP Manager", company: "IIT Kanpur (IITK)", location: "Kanpur, Uttar Pradesh", type: "Full Time", mode: "On-site", slug: "ip-manager-iitk", logo: "/iit-kanpur.jpg", initials: "IK", gradient: "linear-gradient(135deg,#1d3a8f,#3b52f0)" },
                { title: "AI Engineer Intern", company: "Trippyway", location: "Remote (India)", type: "Internship", mode: "Remote", slug: "ai-engineer-intern-trippyway", logo: "/trippyway-logo.jpg", initials: "TW", gradient: "linear-gradient(135deg,#0f766e,#14b8a6)" },
                { title: "UI/UX Design Intern", company: "Trippyway", location: "Remote (India)", type: "Internship", mode: "Remote", slug: "uiux-intern-trippyway", logo: "/trippyway-logo.jpg", initials: "TW", gradient: "linear-gradient(135deg,#0f766e,#14b8a6)" },
                { title: "HR & Talent Acquisition Intern", company: "Trippyway", location: "Remote (India)", type: "Internship", mode: "Remote", slug: "hr-intern-trippyway", logo: "/trippyway-logo.jpg", initials: "TW", gradient: "linear-gradient(135deg,#0f766e,#14b8a6)" },
              ].map((job) => (
                <div className="pl-jcard" key={job.slug}>
                  <div className="pl-jcard-body">
                    <div className="pl-jlogo">
                      <img src={job.logo} alt={job.company} style={{ width:"100%",height:"100%",objectFit:"contain" }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display="none"; const p = e.currentTarget.parentElement as HTMLElement; p.style.background=job.gradient; p.innerText=job.initials; }} />
                    </div>
                    <div className="pl-jinfo">
                      <div className="pl-jtitle">{job.title}</div>
                      <div className="pl-jcompany">{job.company}</div>
                      <div className="pl-jtags">
                        <span className="pl-jtag pl-jtag-type">{job.type}</span>
                        <span className="pl-jtag pl-jtag-mode">{job.mode}</span>
                        <span className="pl-jtag pl-jtag-live">
                          <span style={{ width:5,height:5,borderRadius:"50%",background:"#10b981",display:"inline-block" }} />
                          Hiring Now
                        </span>
                      </div>
                      <div className="pl-jloc">
                        <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                        {job.location}
                      </div>
                    </div>
                  </div>
                  <div className="pl-jcard-foot">
                    <span className="pl-jposted">Posted recently · via Jobingen</span>
                    <a href={`/jobs/${job.slug}`} className="pl-japply">
                      Apply Now
                      <svg width="11" height="11" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                </div>
              ))}
              </div>
              <div className="pl-jobs-cta">
                <a href="/jobs">
                  View All Open Positions
                  <svg width="13" height="13" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </section>
        </Reveal>

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


        {/* ═══ CAMPUS AMBASSADOR CARD ═══ */}
        <div className="pl-ca-wrap">
          <Reveal>
            <div className="pl-ca-card">
              <div className="pl-ca-left">
                <div className="pl-ca-badge">
                  <span className="pl-ca-badge-dot" />
                  Now Recruiting
                </div>
                <h3>Become a Jobingen Campus Ambassador</h3>
                <p>Represent Jobingen in your college and help students discover better job opportunities, AI tools, and career resources.</p>
                <a href="/campus-ambassador" className="pl-ca-btn">
                  Apply Now
                  <svg width="14" height="14" fill="none" viewBox="0 0 18 18">
                    <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              <div className="pl-ca-right">
                <div className="pl-ca-tag">
                  <span className="pl-ca-tag-ico">🏆</span>
                  <span className="pl-ca-tag-txt">Official Certificate</span>
                </div>
                <div className="pl-ca-tag">
                  <span className="pl-ca-tag-ico">💼</span>
                  <span className="pl-ca-tag-txt">Internship Opportunity</span>
                </div>
                <div className="pl-ca-tag">
                  <span className="pl-ca-tag-ico">🤖</span>
                  <span className="pl-ca-tag-txt">Exclusive AI Workshops</span>
                </div>
                <div className="pl-ca-tag">
                  <span className="pl-ca-tag-ico">🌐</span>
                  <span className="pl-ca-tag-txt">Network with Founders</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

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
              <div className="pl-how-head">
                <div className="pl-how-label">How it works</div>
                <h2 className="pl-how-title">From sign-up to offer letter.</h2>
                <p className="pl-how-sub">Five steps. Zero wasted effort.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="pl-steps">
                {[
                  { num: "01", title: "Set your preferences", desc: "Target role, location, salary range, and experience. Done in 30 seconds." },
                  { num: "02", title: "Get a unified job feed", desc: "Jobs from Naukri, LinkedIn, Indeed, and 6+ portals — all in one place." },
                  { num: "03", title: "Apply with AI resumes", desc: "AI rewrites your resume per job description. Beat ATS filters automatically." },
                  { num: "04", title: "Talk to insiders", desc: "Connect with real employees before your interview. Know what to expect." },
                  { num: "05", title: "Get hired", desc: "Mock interviews with Vibe AI, application tracker, and real salary data." },
                ].map((s) => (
                  <div className="pl-step" key={s.num}>
                    <div className="pl-step-num">{s.num}</div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ BOOTCAMP FEEDBACK ═══ */}
        <BootcampFeedbackSection />

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
              <p className="pl-cta-desc">Be first in line when Jobingen launches. Sign up and we&apos;ll notify you on day one.</p>
              {submitted2 ? (
                <p className="pl-ok">You&apos;re on the early access list.</p>
              ) : (
                <form className="pl-form" style={{ flexDirection: "column" }} onSubmit={(e) => handleSubmit(e, "cta")}>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input className="pl-input" placeholder="Your name" value={name2} onChange={(e) => setName2(e.target.value)} required style={{ flex: 1, minWidth: 0 }} />
                    <input className="pl-input" type="email" placeholder="Your email address" value={email2} onChange={(e) => setEmail2(e.target.value)} required style={{ flex: 1.4, minWidth: 0 }} />
                  </div>
                  {formError2 && <p style={{ color: "#a3e635", fontSize: 13, fontWeight: 600, margin: "4px 0 0" }}>{formError2}</p>}
                  <button className="pl-btn" type="submit" disabled={loading2} style={{ opacity: loading2 ? 0.7 : 1, cursor: loading2 ? "wait" : "pointer" }}>
                    {loading2 ? "Joining..." : "Join the Waitlist"}
                  </button>
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
              <JobingenLogo height={100} style={{ marginBottom: 4 }} />
              <p>The search ends here!</p>
            </div>
            <div className="pl-ft-col">
              <h4>Product</h4>
              <a href="#services">Features</a>
              <a href="#bootcamp">Bootcamp</a>
              <a href="#how">How it Works</a>
              <a href="/register">Register Now</a>
            </div>
            <div className="pl-ft-col">
              <h4>Community</h4>
<a href="https://www.instagram.com/jobingen.ai" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.linkedin.com/company/jobingen/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="pl-ft-bot">
            <span>&copy; 2026 Jobingen. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  )
}
