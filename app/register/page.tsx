"use client"

import { useState, useRef, ChangeEvent } from "react"
import { JobingenLogo } from "@/components/jobingen-logo"

const UPI_ID = "jobingenai@ybl"
const WHATSAPP = "7078211741"

// ─── CSS ────────────────────────────────────────────────────────
const CSS = `
  :root {
    --ink:    #09090f;
    --ink2:   #3d3d52;
    --ink3:   #8a8aa8;
    --white:  #ffffff;
    --cream:  #f7f7fb;
    --cream2: #f0f0f8;
    --border: rgba(10,10,20,0.08);
    --borderM:rgba(10,10,20,0.14);
    --ind:    #1d3a8f;
    --ind-l:  #e8edfe;
    --vio:    #3b52f0;
    --grn:    #10b981;
    --grn-l:  #ecfdf5;
    --amb:    #f59e0b;
    --amb-l:  #fffbeb;
    --rose:   #f43f5e;
    --rose-l: #fff1f2;
    --shadow-sm:  0 2px 8px rgba(10,10,20,0.05);
    --shadow-md:  0 4px 24px rgba(10,10,20,0.08);
    --shadow-lg:  0 12px 48px rgba(10,10,20,0.1);
    --spring: cubic-bezier(.34,1.56,.64,1);
    --ease-out: cubic-bezier(.16,1,.3,1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; }

  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes pulse-s {
    0%,100% { transform: scale(1); opacity:.8; }
    50%      { transform: scale(1.15); opacity:1; }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes check-pop {
    0%   { transform: scale(0) rotate(-10deg); opacity:0; }
    60%  { transform: scale(1.2) rotate(4deg); opacity:1; }
    100% { transform: scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes confetti-fall {
    0%   { transform: translateY(-20px) rotate(0deg); opacity:1; }
    100% { transform: translateY(100px) rotate(720deg); opacity:0; }
  }
  @keyframes spin-slow { to { transform: rotate(360deg); } }

  .shimmer {
    background: linear-gradient(90deg, #1d3a8f 0%, #3b52f0 28%, #5a6ef4 48%, #3b52f0 68%, #1d3a8f 100%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 5s linear infinite;
  }
  .top-bar {
    height: 3px;
    background: linear-gradient(90deg, #1d3a8f, #3b52f0, #5a6ef4, #5a6ef4, #3b52f0, #1d3a8f);
    background-size: 200% auto;
    animation: shimmer 4s linear infinite;
  }
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; text-decoration: none; border: none; outline: none;
    transition: transform .22s var(--spring), box-shadow .22s ease;
    position: relative; overflow: hidden;
  }
  .btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none; border-radius: inherit;
  }
  .btn:hover  { transform: translateY(-2px) scale(1.025); }
  .btn:active { transform: translateY(0) scale(.97); }
  .btn-primary {
    background: linear-gradient(135deg, #1d3a8f 0%, #2548c5 100%);
    box-shadow: 0 6px 28px rgba(29,58,143,.32);
    color: white;
  }
  .btn-primary:hover { box-shadow: 0 12px 40px rgba(29,58,143,.45); }
  .btn-primary:disabled { opacity:.68; cursor:not-allowed; transform:none; }

  .field-input {
    width: 100%; padding: 12px 14px; border-radius: 12px;
    border: 1.5px solid var(--border); background: var(--cream);
    font-size: 14px; font-weight: 500; color: var(--ink); outline: none;
    transition: border-color .18s ease, background .18s ease, box-shadow .18s ease;
    appearance: none; font-family: inherit;
  }
  .field-input:focus {
    border-color: var(--ind); background: white;
    box-shadow: 0 0 0 3px rgba(29,58,143,0.1);
  }
  .field-input::placeholder { color: var(--ink3); font-weight: 400; }
  .field-input.err { border-color: var(--rose); }

  .radio-card {
    flex: 1; padding: 10px 14px; border-radius: 12px;
    border: 1.5px solid var(--border); background: var(--cream);
    cursor: pointer; transition: all .18s ease; text-align: center;
    font-size: 13px; font-weight: 600; color: var(--ink2); user-select: none;
  }
  .radio-card:hover { border-color: rgba(29,58,143,0.3); background: var(--ind-l); color: var(--ind); }
  .radio-card.selected { border-color: var(--ind); background: var(--ind-l); color: var(--ind); font-weight: 700; }

  .upload-zone {
    width: 100%; padding: 18px 16px; border-radius: 14px;
    border: 2px dashed var(--border); background: var(--cream);
    text-align: center; cursor: pointer; transition: all .2s ease;
  }
  .upload-zone:hover { border-color: rgba(29,58,143,.35); background: var(--ind-l); }
  .upload-zone.has-file { border-style: solid; border-color: var(--grn); background: var(--grn-l); }

  .success-check { animation: check-pop .5s var(--spring) both; }
  .fade-up { animation: fade-up .6s var(--ease-out) both; }

  @media (max-width: 900px) {
    .reg-grid { grid-template-columns: 1fr !important; }
    .reg-sticky { position: static !important; }
    .reg-2col { grid-template-columns: 1fr !important; }
    .reg-wrap { padding: 28px 20px !important; }
    .hint-right { display: none !important; }
    .hint-mobile { display: inline !important; }
  }
  @media (max-width: 600px) {
    .reg-wrap { padding: 20px 12px !important; }
    .reg-form-card { padding: 18px 14px !important; }
    .reg-nav { padding: 0 14px !important; }
    .radio-card { min-width: calc(50% - 4px); text-align: center; }
  }
  @media (max-width: 380px) {
    .reg-wrap { padding: 16px 10px !important; }
    .reg-form-card { padding: 14px 12px !important; }
    .radio-card { min-width: 100%; }
  }
  .hint-right  { display: inline; }
  .hint-mobile { display: none; }

  /* ═══ MEET YOUR MENTORS ═══ */
  .mentors-section { margin-bottom: 52px; }
  .mentors-title-row { margin-bottom: 36px; text-align: center; }
  .mentors-label { font-size: 12px; font-weight: 700; color: var(--ind); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 8px; }
  .mentors-heading { font-size: clamp(26px,3.2vw,38px); font-weight: 900; letter-spacing: -.03em; color: var(--ink); margin: 0 0 10px; line-height: 1.1; }
  .mentors-sub { font-size: 15px; color: var(--ink2); line-height: 1.7; max-width: 520px; margin: 0 auto; }
  .mentors-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
  @media (max-width: 1024px) { .mentors-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 560px)  { .mentors-grid { grid-template-columns: 1fr; } }
  .mentor-card {
    background: white; border-radius: 20px; border: 1.5px solid var(--border);
    box-shadow: var(--shadow-sm); padding: 22px 20px;
    display: flex; flex-direction: column; gap: 12px;
    transition: transform .28s var(--ease-out), box-shadow .28s ease;
  }
  .mentor-card:hover { transform: translateY(-5px); box-shadow: 0 18px 52px rgba(10,10,20,0.13); }
  .mentor-photo {
    width: 68px; height: 68px; border-radius: 16px; object-fit: cover;
    border: 2.5px solid var(--ind-l); flex-shrink: 0;
  }
  .mentor-photo-fallback {
    width: 68px; height: 68px; border-radius: 16px;
    background: linear-gradient(135deg,#1d3a8f,#3b52f0);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; font-weight: 900; color: white; flex-shrink: 0;
  }
  .mentor-name { font-size: 16px; font-weight: 800; color: var(--ink); line-height: 1.2; }
  .mentor-role { font-size: 12px; font-weight: 600; color: var(--ind); line-height: 1.4; margin-top: 2px; }
  .mentor-co   { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 6px; background: var(--ind-l); color: var(--ind); letter-spacing: .03em; margin-top: 4px; }
  .mentor-divider { height: 1px; background: var(--border); }
  .mentor-desc { font-size: 12.5px; color: var(--ink2); line-height: 1.72; flex: 1; }
  .mentor-desc.clamped { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  .mentor-more { margin-top: 6px; background: none; border: none; padding: 0; font-size: 12px; font-weight: 700; color: var(--ind); cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
  .mentor-linkedin {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 700; color: var(--ind); text-decoration: none;
    padding: 8px 14px; border-radius: 10px; background: var(--ind-l);
    border: 1.5px solid rgba(29,58,143,0.15);
    transition: background .2s ease, color .2s ease, transform .2s ease;
    align-self: flex-start; margin-top: auto;
  }
  .mentor-linkedin:hover { background: var(--ind); color: white; transform: translateY(-1px); }
`

// ─── Mentor Data ─────────────────────────────────────────────────
const MENTORS = [
  {
    name: "Sonic Payeng",
    role: "Software Engineer 2 (SWE2)",
    company: "Dell Technologies",
    initials: "SP",
    photo: "/mentors/sonic-payeng.jpg",
    desc: "Sonic Payeng is an AI engineer specializing in applied machine learning, intelligent automation, and large language model systems. He completed his M.Tech in Artificial Intelligence and Data Science from NIT Allahabad (MNNIT) and currently works at Dell Technologies on the Dell Automation Platform. His work focuses on building AI-driven automation solutions across on-premise, SaaS, and hybrid cloud environments. Sonic has extensive experience developing neural networks, fine-tuning LLMs, and designing intelligent systems that transform complex manual workflows into highly efficient automated processes.",
    linkedin: "https://www.linkedin.com/in/sonic-payeng-7ab8a8212/",
  },
  {
    name: "Jitesh Vijaykumar",
    role: "AI Engineer",
    company: "KPMG",
    initials: "JV",
    photo: "/mentors/jitesh-vijaykumar.jpg",
    desc: "Jitesh Vijaykumar is an AI engineer with over five years of experience building scalable artificial intelligence solutions for enterprise systems. With an M.Tech in Artificial Intelligence and Data Science, his work focuses on developing practical machine learning applications that solve real-world business problems. At KPMG, he contributes to designing and implementing AI-powered solutions that improve decision-making, automation, and operational efficiency for organizations.",
    linkedin: "https://www.linkedin.com/in/jitesh-vijaykumar-b2786814b/",
  },
  {
    name: "Shubham Kaushik",
    role: "AI & Financial Intelligence Researcher",
    company: "KPMG",
    initials: "SK",
    photo: "/mentors/shubham-kaushik.jpg",
    desc: "Shubham Kaushik is an AI and financial intelligence researcher with more than five years of experience in artificial intelligence, machine learning, and full-stack development. His work focuses on applied AI research, including large language models, intelligent data systems, and scalable applications for financial analysis and enterprise solutions. Prior to joining KPMG, he worked as a Research Assistant at Motilal Nehru National Institute of Technology Allahabad, contributing to research in advanced AI methodologies and intelligent systems.",
    linkedin: "https://www.linkedin.com/in/eskaykaushik/",
  },
  {
    name: "Aditya Dubey",
    role: "AI Strategy & Implementation Consultant",
    company: "Cograd Technologies",
    initials: "AD",
    photo: "/mentors/aditya-dubey.jpg",
    desc: "Aditya Dubey is an AI strategy and implementation consultant focused on helping organizations leverage artificial intelligence for business growth, automation, and operational transformation. He has mentored more than 12,000 professionals and students in AI technologies and practical industry applications. With an M.Tech in Information Systems from NIT Allahabad, Aditya works on translating complex AI concepts into real-world solutions that drive measurable impact for businesses and startups.",
    linkedin: "https://www.linkedin.com/in/aditya-dubey-4092b1214/",
  },
]

function MentorCard({ m }: { m: typeof MENTORS[0] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="mentor-card">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={m.photo}
          alt={m.name}
          className="mentor-photo"
          onError={(e) => {
            e.currentTarget.style.display = "none"
            const fb = e.currentTarget.nextElementSibling as HTMLElement
            if (fb) fb.style.display = "flex"
          }}
        />
        <div className="mentor-photo-fallback" style={{ display: "none" }}>{m.initials}</div>
        <div>
          <div className="mentor-name">{m.name}</div>
          <div className="mentor-role">{m.role}</div>
          <span className="mentor-co">{m.company}</span>
        </div>
      </div>
      <div className="mentor-divider" />
      <p className={`mentor-desc${expanded ? "" : " clamped"}`}>{m.desc}</p>
      <button className="mentor-more" onClick={() => setExpanded(v => !v)}>
        {expanded ? "View Less ↑" : "View More ↓"}
      </button>
      <a
        href={m.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mentor-linkedin"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn Profile
      </a>
    </div>
  )
}

function MentorsSection() {
  return (
    <div className="mentors-section">
      <div className="mentors-title-row">
        <div className="mentors-label">Expert Instructors</div>
        <h2 className="mentors-heading">Meet Your Mentors</h2>
        <p className="mentors-sub">
          Learn from AI engineers and researchers with real-world experience at top companies.
          They don&apos;t just teach — they mentor you live throughout the bootcamp.
        </p>
      </div>
      <div className="mentors-grid">
        {MENTORS.map((m) => <MentorCard key={m.name} m={m} />)}
      </div>
    </div>
  )
}

// ─── Types ──────────────────────────────────────────────────────
type FormState = {
  name: string; email: string; phone: string; org: string
  status: string; level: string; goal: string
  upi_transaction_id: string; agreed: boolean
}
const INIT: FormState = {
  name:"", email:"", phone:"", org:"", status:"", level:"",
  goal:"", upi_transaction_id:"", agreed:false,
}

// ─── Success Screen ──────────────────────────────────────────────
function SuccessScreen({ name }: { name: string }) {
  const dots = ["#6074f3","#34d399","#fb7185","#fbbf24","#60a5fa","#8c9df6","#f472b6"]
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--cream)", padding:"40px 24px", position:"relative", overflow:"hidden" }}>
      {dots.map((c,i) => (
        <div key={i} style={{ position:"absolute", width:8, height:8, borderRadius:"50%", background:c, left:`${12+i*11}%`, top:"20%", animation:`confetti-fall ${1.2+i*0.15}s ease-out ${i*0.08}s both` }} />
      ))}
      {dots.map((c,i) => (
        <div key={`b${i}`} style={{ position:"absolute", width:6, height:6, borderRadius:2, background:c, left:`${8+i*12}%`, top:"15%", animation:`confetti-fall ${1.4+i*0.12}s ease-out ${0.1+i*0.07}s both` }} />
      ))}
      <div style={{ maxWidth:480, width:"100%", textAlign:"center" }} className="fade-up">
        <div className="success-check" style={{ width:88, height:88, borderRadius:"50%", background:"linear-gradient(135deg,#1d3a8f,#2548c5)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px", boxShadow:"0 16px 48px rgba(29,58,143,0.32)" }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <path d="M10 21L17 28L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:"var(--ind)", marginBottom:10, textTransform:"uppercase", letterSpacing:".06em" }}>You&apos;re registered!</div>
        <h1 style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:900, letterSpacing:"-.03em", color:"var(--ink)", margin:"0 0 14px", lineHeight:1.1 }}>
          See you on<br /><span className="shimmer">14 March, {name.split(" ")[0]}!</span>
        </h1>
        <p style={{ fontSize:15, color:"var(--ink2)", lineHeight:1.72, margin:"0 0 32px", maxWidth:380, marginLeft:"auto", marginRight:"auto" }}>
          Your registration has been submitted. We will verify your payment and send a confirmation to your email.
        </p>
        <div style={{ borderRadius:20, padding:"20px 24px", background:"white", border:"1.5px solid var(--border)", boxShadow:"var(--shadow-sm)", textAlign:"left", marginBottom:24 }}>
          <div style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:".07em", color:"var(--ink3)", marginBottom:14 }}>What happens next</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { icon:"🔍", text:"We verify your UPI payment within a few hours" },
              { icon:"📧", text:"Confirmation email sent once payment is verified" },
              { icon:"💬", text:"Join the WhatsApp group below to stay updated" },
              { icon:"📅", text:"Reminder 24hrs before — Saturday 14 March, 8:30 AM" },
              { icon:"🏆", text:"Hackathon problem given at 6 PM on Day 1" },
            ].map((s,i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:16, lineHeight:1, marginTop:1, flexShrink:0 }}>{s.icon}</span>
                <span style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.5 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Join WhatsApp Group */}
        <a
          href="https://chat.whatsapp.com/Bm260I6cjiX6ks9yLhxYec"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:10,
            background:"#25d366", color:"#fff",
            padding:"15px 28px", borderRadius:14,
            fontSize:15, fontWeight:800, textDecoration:"none",
            boxShadow:"0 6px 24px rgba(37,211,102,.35)",
            transition:"all .25s", marginBottom:12,
          }}
          onMouseEnter={e => (e.currentTarget.style.transform="translateY(-2px)")}
          onMouseLeave={e => (e.currentTarget.style.transform="translateY(0)")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.03l5.327-1.394A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-4.99-1.364l-.358-.213-3.714.973.99-3.625-.233-.37A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
          </svg>
          Join WhatsApp Group
        </a>
        <a href="/pre-launch" className="btn btn-primary" style={{ fontSize:14, fontWeight:800, padding:"13px 28px", borderRadius:14 }}>
          Back to Home
        </a>
      </div>
    </div>
  )
}

// ─── UPI Payment Card ─────────────────────────────────────────────
function UpiCard() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  return (
    <div style={{ borderRadius:24, overflow:"hidden", boxShadow:"var(--shadow-lg)", border:"1.5px solid var(--border)" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#1d3a8f,#2548c5)", padding:"20px 24px" }}>
        <div style={{ fontSize:10, fontWeight:800, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:4 }}>Registration Fee</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
          <span style={{ fontSize:42, fontWeight:900, color:"white", lineHeight:1 }}>₹29</span>
          <div style={{ display:"flex", flexDirection:"column", marginBottom:5, gap:1 }}>
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.4)", textDecoration:"line-through", lineHeight:1 }}>₹499</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)", fontWeight:600, lineHeight:1 }}>only</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ background:"white", padding:"20px 24px", display:"flex", flexDirection:"column", gap:16 }}>

        {/* Steps */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            { n:"1", t:"Pay ₹29 using the QR code or UPI ID below" },
            { n:"2", t:"Note your UPI Transaction ID from the app" },
            { n:"3", t:"Fill it in the form and submit" },
          ].map(s => (
            <div key={s.n} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:"var(--ind)", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, flexShrink:0, marginTop:1 }}>{s.n}</div>
              <span style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.5, paddingTop:3 }}>{s.t}</span>
            </div>
          ))}
        </div>

        {/* QR + UPI ID */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"16px", borderRadius:16, background:"var(--cream)", border:"1.5px solid var(--border)" }}>
          {/* QR Code */}
          <div style={{ width:170, height:170, borderRadius:14, overflow:"hidden", background:"white", border:"1.5px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", padding:6 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/qr-jobingen.jpeg" alt="UPI QR Code — jobingen@ybl" style={{ width:"100%", height:"100%", objectFit:"contain", borderRadius:8 }} />
          </div>

          {/* UPI ID copy button */}
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"var(--ink3)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:6 }}>UPI ID</div>
            <button onClick={copy} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"9px 18px", borderRadius:10, border:"1.5px solid var(--border)", background:"white", cursor:"pointer", fontFamily:"inherit", transition:"all .2s" }}>
              <span style={{ fontSize:15, fontWeight:900, color:"var(--ind)", letterSpacing:".01em" }}>{UPI_ID}</span>
              <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:6, background: copied ? "var(--grn-l)" : "var(--ind-l)", color: copied ? "var(--grn)" : "var(--ind)" }}>
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
          </div>

          {/* App pills */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
            {["Paytm","PhonePe","Google Pay","BHIM"].map(app => (
              <span key={app} style={{ fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:6, background:"var(--ind-l)", color:"var(--ind)" }}>{app}</span>
            ))}
          </div>
        </div>

        <div style={{ fontSize:12, color:"var(--ink3)", lineHeight:1.6, padding:"10px 14px", borderRadius:10, background:"var(--amb-l)", border:"1px solid rgba(245,158,11,.18)" }}>
          Scan the QR or send ₹29 to <strong style={{ color:"var(--ink2)" }}>{UPI_ID}</strong> via any UPI app, then fill in the transaction ID in the form.
        </div>

        {/* WhatsApp help */}
        <a href={`https://wa.me/91${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
          style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 16px", borderRadius:12, background:"#f0fdf4", border:"1px solid rgba(16,185,129,.2)", textDecoration:"none" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.03l5.327-1.394A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-4.99-1.364l-.358-.213-3.714.973.99-3.625-.233-.37A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:"#10b981" }}>Need help?</div>
            <div style={{ fontSize:11, color:"var(--ink3)" }}>WhatsApp: +91 {WHATSAPP}</div>
          </div>
        </a>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────
export default function RegisterPage() {
  const [form, setForm] = useState<FormState>(INIT)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotName, setScreenshotName] = useState("")
  const [screenshotError, setScreenshotError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function set(key: keyof FormState, val: string | boolean) {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: "" }))
    setServerError("")
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setScreenshot(file)
    setScreenshotName(file.name)
    setScreenshotError("")
  }

  function validate() {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim())  e.name  = "Name is required"
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required"
    if (!form.phone.trim() || form.phone.replace(/\D/g,"").length < 10) e.phone = "10-digit number required"
    if (!form.org.trim())   e.org   = "College or company required"
    if (!form.status)       e.status = "Please select one"
    if (!form.level)        e.level  = "Please select one"
    if (!form.upi_transaction_id.trim()) e.upi_transaction_id = "UPI Transaction ID is required"
    if (!form.agreed)       e.agreed = "Please agree to continue"
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (!screenshot) setScreenshotError("Please upload your payment screenshot")
    if (Object.keys(errs).length || !screenshot) { setErrors(errs); return }
    setLoading(true)
    setServerError("")
    try {
      const fd = new FormData()
      fd.append("name", form.name.trim())
      fd.append("email", form.email.trim())
      fd.append("phone", form.phone.trim())
      fd.append("college", form.org.trim())
      fd.append("upi_transaction_id", form.upi_transaction_id.trim())
      if (screenshot) fd.append("screenshot", screenshot)

      const res = await fetch("/api/hackathon-register", { method:"POST", body:fd })
      const data = await res.json()
      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.")
        setLoading(false)
        return
      }
      setSubmitted(true)
    } catch {
      setServerError("Network error. Please check your connection and try again.")
      setLoading(false)
    }
  }

  if (submitted) return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <SuccessScreen name={form.name} />
    </>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{ minHeight:"100vh", background:"var(--cream)" }}>
        <div className="top-bar" />

        {/* Navbar */}
        <nav className="reg-nav" style={{ background:"rgba(247,247,251,0.9)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--border)", padding:"0 28px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50 }}>
          <a href="/pre-launch" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>
            <JobingenLogo height={110} />
          </a>
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:99, background:"var(--rose-l)", border:"1px solid rgba(244,63,94,0.22)", fontSize:11, fontWeight:800, color:"var(--rose)", textTransform:"uppercase", letterSpacing:".06em" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--rose)", animation:"pulse-s 1.5s ease-in-out infinite" }} />
            Live · 14–15 March 2026
          </div>
        </nav>

        {/* Page content */}
        <div className="reg-wrap" style={{ maxWidth:1100, margin:"0 auto", padding:"48px 28px" }}>

          {/* Header */}
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"var(--ind)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:10 }}>
              2-Day AI Bootcamp + Hackathon
            </div>
            <h1 style={{ fontSize:"clamp(28px,3.6vw,44px)", fontWeight:900, letterSpacing:"-.03em", color:"var(--ink)", margin:"0 0 12px", lineHeight:1.08 }}>
              Secure your spot.<br /><span className="shimmer">Start building AI.</span>
            </h1>
            <p style={{ fontSize:15, color:"var(--ink2)", lineHeight:1.7 }}>
              Online · 14–15 March ·{" "}
              <span style={{ textDecoration:"line-through", color:"var(--ink3)", fontSize:14 }}>₹499</span>{" "}
              <strong style={{ color:"var(--ind)" }}>₹29</strong> only · Limited seats
            </p>
          </div>

          {/* ── Meet Your Mentors ── */}
          <MentorsSection />

          {/* Grid */}
          <div className="reg-grid" style={{ display:"grid", gridTemplateColumns:"1fr 400px", gap:32, alignItems:"start" }}>

            {/* ── LEFT: Form ── */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="reg-form-card" style={{ background:"white", borderRadius:24, border:"1.5px solid var(--border)", boxShadow:"var(--shadow-sm)", padding:"32px", display:"flex", flexDirection:"column", gap:22 }}>

                {/* Row 1: Name + Email */}
                <div className="reg-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <Field label="Full Name *" error={errors.name}>
                    <input className={`field-input${errors.name?" err":""}`} placeholder="Arjun Sharma" value={form.name} onChange={e => set("name", e.target.value)} />
                  </Field>
                  <Field label="Email Address *" error={errors.email}>
                    <input className={`field-input${errors.email?" err":""}`} type="email" placeholder="arjun@gmail.com" value={form.email} onChange={e => set("email", e.target.value)} />
                  </Field>
                </div>

                {/* Row 2: Phone + Org */}
                <div className="reg-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <Field label="WhatsApp Number *" error={errors.phone}>
                    <input className={`field-input${errors.phone?" err":""}`} placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} />
                  </Field>
                  <Field label="College / Company *" error={errors.org}>
                    <input className={`field-input${errors.org?" err":""}`} placeholder="IIT Delhi / Swiggy" value={form.org} onChange={e => set("org", e.target.value)} />
                  </Field>
                </div>

                {/* Status */}
                <Field label="I am currently a..." error={errors.status}>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {["Student","Working Professional","Fresher / Between Jobs"].map(opt => (
                      <div key={opt} className={`radio-card${form.status===opt?" selected":""}`} onClick={() => set("status", opt)}>{opt}</div>
                    ))}
                  </div>
                </Field>

                {/* Level */}
                <Field label="My AI/ML background is..." error={errors.level}>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {["Complete Beginner","Heard the basics","Built a few things"].map(opt => (
                      <div key={opt} className={`radio-card${form.level===opt?" selected":""}`} onClick={() => set("level", opt)}>{opt}</div>
                    ))}
                  </div>
                </Field>

                {/* Goal */}
                <Field label="What do you want to walk away with? (optional)">
                  <textarea className="field-input" placeholder="e.g. Build my first RAG app, get internship ready, crack AI interviews..." rows={3} value={form.goal} onChange={e => set("goal", e.target.value)} style={{ resize:"none", lineHeight:1.6 }} />
                </Field>

                {/* Divider */}
                <div style={{ height:1, background:"var(--border)" }} />

                {/* Payment section label */}
                <div style={{ fontSize:14, fontWeight:800, color:"var(--ink)" }}>
                  Payment Details
                  <span className="hint-right" style={{ fontSize:11, fontWeight:600, color:"var(--ink3)", marginLeft:8 }}>Pay ₹29 via the QR on the right →</span>
                  <span className="hint-mobile" style={{ fontSize:11, fontWeight:600, color:"var(--ink3)", marginLeft:8 }}>Pay ₹29 via the QR below ↓</span>
                </div>

                {/* UPI Transaction ID */}
                <Field label="UPI Transaction ID *" error={errors.upi_transaction_id}>
                  <input
                    className={`field-input${errors.upi_transaction_id?" err":""}`}
                    placeholder="e.g. 123456789012"
                    value={form.upi_transaction_id}
                    onChange={e => set("upi_transaction_id", e.target.value)}
                  />
                  <div style={{ fontSize:11, color:"var(--ink3)", marginTop:2 }}>
                    Find this in your UPI app after completing the ₹29 payment.
                  </div>
                </Field>

                {/* Screenshot upload */}
                <div>
                  <label style={{ fontSize:12, fontWeight:700, color:"var(--ink2)", letterSpacing:".01em", display:"block", marginBottom:6 }}>
                    Payment Screenshot <span style={{ color:"var(--rose)" }}>*</span>
                  </label>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleFile} />
                  <div className={`upload-zone${screenshotName?" has-file":""}${screenshotError?" err":""}`} onClick={() => fileRef.current?.click()} style={screenshotError ? { borderColor:"var(--rose)", borderStyle:"dashed" } : {}}>
                    {screenshotName ? (
                      <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"center" }}>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" stroke="var(--grn)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="var(--grn)" strokeWidth="2"/></svg>
                        <span style={{ fontSize:13, fontWeight:600, color:"var(--grn)" }}>{screenshotName}</span>
                      </div>
                    ) : (
                      <div>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ margin:"0 auto 6px", display:"block" }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={screenshotError?"var(--rose)":"var(--ink3)"} strokeWidth="1.8" strokeLinecap="round"/><polyline points="17 8 12 3 7 8" stroke={screenshotError?"var(--rose)":"var(--ink3)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="3" x2="12" y2="15" stroke={screenshotError?"var(--rose)":"var(--ink3)"} strokeWidth="1.8" strokeLinecap="round"/></svg>
                        <div style={{ fontSize:13, fontWeight:600, color:screenshotError?"var(--rose)":"var(--ink3)" }}>Click to upload payment screenshot</div>
                        <div style={{ fontSize:11, color:"var(--ink3)", marginTop:3 }}>PNG, JPG — required for payment verification</div>
                      </div>
                    )}
                  </div>
                  {screenshotError && <div style={{ fontSize:11, color:"var(--rose)", fontWeight:600, marginTop:4 }}>{screenshotError}</div>}
                </div>

                {/* Agree */}
                <div>
                  <label style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer" }}>
                    <div onClick={() => set("agreed", !form.agreed)} style={{ width:20, height:20, borderRadius:6, border:`1.5px solid ${form.agreed?"var(--ind)":"var(--borderM)"}`, background:form.agreed?"var(--ind)":"white", flexShrink:0, marginTop:1, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .18s ease" }}>
                      {form.agreed && <svg width="11" height="11" fill="none" viewBox="0 0 11 11"><path d="M1.5 5.5L4.5 8.5L9.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.6 }}>
                      I agree to receive event communications via email and WhatsApp. I understand the ₹29 registration fee is non-refundable and my payment will be verified manually.
                    </span>
                  </label>
                  {errors.agreed && <div style={{ fontSize:11, color:"var(--rose)", marginTop:6, marginLeft:32 }}>{errors.agreed}</div>}
                </div>

                {/* Server error */}
                {serverError && (
                  <div style={{ padding:"12px 16px", borderRadius:10, background:"var(--rose-l)", border:"1px solid rgba(244,63,94,.25)", fontSize:13, fontWeight:600, color:"var(--rose)" }}>
                    {serverError}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" className="btn btn-primary" disabled={loading}
                  style={{ fontSize:15, fontWeight:900, padding:"15px 28px", borderRadius:16, width:"100%", gap:10, transition:"opacity .2s" }}>
                  {loading
                    ? <><Spinner /> Registering...</>
                    : <>Register Now — <span style={{ textDecoration:"line-through", opacity:0.55, fontSize:13 }}>₹499</span> ₹29 <svg width="16" height="16" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                  }
                </button>

                <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:20, paddingTop:4, flexWrap:"wrap" }}>
                  {["🔒 Secure","📧 Confirmation email","✅ Payment verified manually"].map((t,i) => (
                    <span key={i} style={{ fontSize:11, color:"var(--ink3)", fontWeight:600 }}>{t}</span>
                  ))}
                </div>

              </div>
            </form>

            {/* ── RIGHT: UPI card + Event summary ── */}
            <div className="reg-sticky" style={{ position:"sticky", top:76, display:"flex", flexDirection:"column", gap:16 }}>

              <UpiCard />

              {/* Event summary */}
              <div style={{ borderRadius:24, overflow:"hidden", boxShadow:"var(--shadow-md)", border:"1.5px solid var(--border)" }}>
                <div style={{ background:"linear-gradient(135deg,#1d3a8f,#2548c5)", padding:"20px 24px" }}>
                  <div style={{ fontSize:10, fontWeight:800, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:6 }}>Schedule</div>
                  <div style={{ fontSize:17, fontWeight:800, color:"white", lineHeight:1.3 }}>2-Day AI Bootcamp + Hackathon</div>
                </div>
                <div style={{ background:"white", padding:"18px 24px", display:"flex", flexDirection:"column", gap:12 }}>
                  {[
                    { n:"1", day:"Sat 14 Mar", time:"8:30 AM – 6 PM", detail:"AI/ML/DL + RAG Masterclass", clr:"var(--ind)", bg:"var(--ind-l)" },
                    { n:"2", day:"Sun 15 Mar", time:"9 AM – 9 PM",   detail:"Hackathon — Build real AI", clr:"var(--vio)", bg:"#f5f3ff" },
                  ].map(s => (
                    <div key={s.n} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      <div style={{ width:32, height:32, borderRadius:10, background:s.bg, color:s.clr, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, flexShrink:0 }}>{s.n}</div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:"var(--ink)" }}>{s.day}</div>
                        <div style={{ fontSize:11, color:"var(--ind)", fontWeight:600 }}>{s.time}</div>
                        <div style={{ fontSize:11, color:"var(--ink3)" }}>{s.detail}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ height:1, background:"var(--border)" }} />
                  {[
                    { icon:"📄", text:"ATS-proof resume review" },
                    { icon:"📚", text:"Full lecture notes & resources" },
                    { icon:"💼", text:"Paid internship for winners" },
                  ].map((p,i) => (
                    <div key={i} style={{ display:"flex", gap:10, alignItems:"center" }}>
                      <span style={{ fontSize:15, flexShrink:0 }}>{p.icon}</span>
                      <span style={{ fontSize:12, fontWeight:600, color:"var(--ink2)" }}>{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Urgency */}
              <div style={{ borderRadius:16, padding:"12px 16px", background:"var(--amb-l)", border:"1px solid rgba(245,158,11,0.25)", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:18 }}>⚡</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:800, color:"var(--ink)" }}>Seats filling up fast</div>
                  <div style={{ fontSize:11, color:"var(--ink3)" }}>Online · Limited capacity · Register now</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontSize:12, fontWeight:700, color:"var(--ink2)", letterSpacing:".01em" }}>{label}</label>
      {children}
      {error && <div style={{ fontSize:11, color:"var(--rose)", fontWeight:600 }}>{error}</div>}
    </div>
  )
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation:"spin-slow 1s linear infinite", flexShrink:0 }}>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}
