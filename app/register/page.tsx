"use client"

import { useState } from "react"
import { JobngenLogo } from "@/components/jobngen-logo"

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
    background: linear-gradient(90deg, #1d3a8f, #3b52f0, #5a6ef4, #5a6ef4, #5a6ef4, #3b52f0, #1d3a8f);
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
    content: '';
    position: absolute; inset: 0;
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

  /* Input fields */
  .field-input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--cream);
    font-size: 14px;
    font-weight: 500;
    color: var(--ink);
    outline: none;
    transition: border-color .18s ease, background .18s ease, box-shadow .18s ease;
    appearance: none;
    font-family: inherit;
  }
  .field-input:focus {
    border-color: var(--ind);
    background: white;
    box-shadow: 0 0 0 3px rgba(29,58,143,0.1);
  }
  .field-input::placeholder { color: var(--ink3); font-weight: 400; }

  /* Radio option cards */
  .radio-card {
    flex: 1;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--cream);
    cursor: pointer;
    transition: all .18s ease;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: var(--ink2);
    user-select: none;
  }
  .radio-card:hover { border-color: rgba(29,58,143,0.3); background: var(--ind-l); color: var(--ind); }
  .radio-card.selected { border-color: var(--ind); background: var(--ind-l); color: var(--ind); font-weight: 700; }

  /* Success */
  .success-check { animation: check-pop .5s var(--spring) both; }
  .fade-up { animation: fade-up .6s var(--ease-out) both; }
`

// ─── Types ──────────────────────────────────────────────────────
type FormData = {
  name: string
  email: string
  phone: string
  org: string
  status: string
  level: string
  goal: string
  agreed: boolean
}

const INIT: FormData = { name:"", email:"", phone:"", org:"", status:"", level:"", goal:"", agreed:false }

// ─── Success Screen ──────────────────────────────────────────────
function SuccessScreen({ name }: { name: string }) {
  const dots = ["#6074f3","#34d399","#fb7185","#fbbf24","#60a5fa","#8c9df6","#f472b6"]
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--cream)", padding:"40px 24px", position:"relative", overflow:"hidden" }}>
      {/* Confetti dots */}
      {dots.map((c,i) => (
        <div key={i} style={{
          position:"absolute", width:8, height:8, borderRadius:"50%", background:c,
          left:`${12 + i*11}%`, top:"20%",
          animation:`confetti-fall ${1.2 + i*0.15}s ease-out ${i*0.08}s both`,
        }} />
      ))}
      {dots.map((c,i) => (
        <div key={`b${i}`} style={{
          position:"absolute", width:6, height:6, borderRadius:2, background:c,
          left:`${8 + i*12}%`, top:"15%",
          animation:`confetti-fall ${1.4 + i*0.12}s ease-out ${0.1 + i*0.07}s both`,
        }} />
      ))}

      <div style={{ maxWidth:480, width:"100%", textAlign:"center" }} className="fade-up">
        {/* Check circle */}
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
          Check your email for the confirmation + Zoom link. Add it to your calendar — you don&apos;t want to miss this.
        </p>

        {/* What's next */}
        <div style={{ borderRadius:20, padding:"20px 24px", background:"white", border:"1.5px solid var(--border)", boxShadow:"var(--shadow-sm)", textAlign:"left", marginBottom:24 }}>
          <div style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:".07em", color:"var(--ink3)", marginBottom:14 }}>What happens next</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { icon:"📧", text:"Confirmation email sent to your inbox" },
              { icon:"💬", text:"WhatsApp group link shared before the event" },
              { icon:"📅", text:"Reminder 24hrs before — Saturday 14 March, 8:30 AM" },
              { icon:"🏆", text:"Hackathon problem given at 6 PM on Day 1 via Google Form" },
            ].map((s,i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:16, lineHeight:1, marginTop:1, flexShrink:0 }}>{s.icon}</span>
                <span style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.5 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        <a href="/landing" className="btn btn-primary" style={{ fontSize:14, fontWeight:800, padding:"13px 28px", borderRadius:14 }}>
          ← Back to Home
        </a>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────
export default function RegisterPage() {
  const [form, setForm] = useState<FormData>(INIT)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(key: keyof FormData, val: string | boolean) {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: "" }))
  }

  function validate() {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim())  e.name  = "Name is required"
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required"
    if (!form.phone.trim() || form.phone.replace(/\D/g,"").length < 10) e.phone = "10-digit number required"
    if (!form.org.trim())   e.org   = "College or company required"
    if (!form.status)       e.status = "Please select one"
    if (!form.level)        e.level  = "Please select one"
    if (!form.agreed)       e.agreed = "Please agree to continue"
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
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

      <div style={{ minHeight:"100vh", background:"var(--cream)", fontFamily:"-apple-system,BlinkMacSystemFont,'Inter',system-ui,sans-serif" }}>

        {/* Top shimmer bar */}
        <div className="top-bar" />

        {/* Navbar */}
        <nav style={{ background:"rgba(247,247,251,0.9)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--border)", padding:"0 28px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50 }}>
          <a href="/landing" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>
            <JobngenLogo height={110} />
          </a>
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:99, background:"var(--rose-l)", border:"1px solid rgba(244,63,94,0.22)", fontSize:11, fontWeight:800, color:"var(--rose)", textTransform:"uppercase", letterSpacing:".06em" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--rose)", animation:"pulse-s 1.5s ease-in-out infinite" }} />
            Live · 14–15 March 2026
          </div>
        </nav>

        {/* Main content */}
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"48px 28px", display:"grid", gridTemplateColumns:"1fr 420px", gap:36, alignItems:"start" }}>

          {/* ── LEFT: Form ── */}
          <div>
            {/* Header */}
            <div style={{ marginBottom:32 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"var(--ind)", textTransform:"uppercase", letterSpacing:".07em", marginBottom:10 }}>
                2-Day AI Bootcamp + Hackathon
              </div>
              <h1 style={{ fontSize:"clamp(28px,3.6vw,44px)", fontWeight:900, letterSpacing:"-.03em", color:"var(--ink)", margin:"0 0 12px", lineHeight:1.08 }}>
                Secure your spot.<br /><span className="shimmer">Start building AI.</span>
              </h1>
              <p style={{ fontSize:15, color:"var(--ink2)", lineHeight:1.7, maxWidth:480 }}>
                Online · 14–15 March · ₹29 only · Limited seats
              </p>
            </div>

            {/* Form card */}
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ background:"white", borderRadius:24, border:"1.5px solid var(--border)", boxShadow:"var(--shadow-sm)", padding:"32px 32px", display:"flex", flexDirection:"column", gap:22 }}>

                {/* Row 1: Name + Email */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <Field label="Full Name" error={errors.name}>
                    <input className="field-input" placeholder="Arjun Sharma" value={form.name}
                      onChange={e => set("name", e.target.value)} />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input className="field-input" type="email" placeholder="arjun@gmail.com" value={form.email}
                      onChange={e => set("email", e.target.value)} />
                  </Field>
                </div>

                {/* Row 2: Phone + Org */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <Field label="WhatsApp Number" error={errors.phone}>
                    <input className="field-input" placeholder="+91 98765 43210" value={form.phone}
                      onChange={e => set("phone", e.target.value)} />
                  </Field>
                  <Field label="College / Company" error={errors.org}>
                    <input className="field-input" placeholder="IIT Delhi / Swiggy" value={form.org}
                      onChange={e => set("org", e.target.value)} />
                  </Field>
                </div>

                {/* Row 3: Status */}
                <Field label="I am currently a..." error={errors.status}>
                  <div style={{ display:"flex", gap:8 }}>
                    {["Student","Working Professional","Fresher / Between Jobs"].map(opt => (
                      <div key={opt} className={`radio-card${form.status === opt ? " selected" : ""}`}
                        onClick={() => set("status", opt)}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </Field>

                {/* Row 4: Level */}
                <Field label="My AI/ML background is..." error={errors.level}>
                  <div style={{ display:"flex", gap:8 }}>
                    {["Complete Beginner","Heard the basics","Built a few things"].map(opt => (
                      <div key={opt} className={`radio-card${form.level === opt ? " selected" : ""}`}
                        onClick={() => set("level", opt)}>
                        {opt}
                      </div>
                    ))}
                  </div>
                </Field>

                {/* Row 5: Goal (optional) */}
                <Field label="What do you want to walk away with? (optional)">
                  <textarea className="field-input" placeholder="e.g. Build my first RAG app, get internship ready, crack AI interviews..."
                    rows={3} value={form.goal} onChange={e => set("goal", e.target.value)}
                    style={{ resize:"none", lineHeight:1.6 }} />
                </Field>

                {/* Agree */}
                <div>
                  <label style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer" }}>
                    <div onClick={() => set("agreed", !form.agreed)} style={{
                      width:20, height:20, borderRadius:6, border:`1.5px solid ${form.agreed ? "var(--ind)" : "var(--borderM)"}`,
                      background: form.agreed ? "var(--ind)" : "white", flexShrink:0, marginTop:1,
                      display:"flex", alignItems:"center", justifyContent:"center", transition:"all .18s ease",
                    }}>
                      {form.agreed && <svg width="11" height="11" fill="none" viewBox="0 0 11 11"><path d="M1.5 5.5L4.5 8.5L9.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span style={{ fontSize:13, color:"var(--ink2)", lineHeight:1.6 }}>
                      I agree to receive event communications via email and WhatsApp. I understand the ₹29 registration fee is non-refundable.
                    </span>
                  </label>
                  {errors.agreed && <div style={{ fontSize:11, color:"var(--rose)", marginTop:6, marginLeft:32 }}>{errors.agreed}</div>}
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary" disabled={loading}
                  style={{ fontSize:15, fontWeight:900, padding:"15px 28px", borderRadius:16, width:"100%", opacity: loading ? .75 : 1, transition:"opacity .2s", cursor: loading ? "wait" : "pointer", gap:10 }}>
                  {loading
                    ? <><Spinner /> Registering...</>
                    : <>Register Now — ₹29 <svg width="16" height="16" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                  }
                </button>

                {/* Trust row */}
                <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:20, paddingTop:4 }}>
                  {["🔒 Secure payment","📧 Instant confirmation","↩ No hidden charges"].map((t,i) => (
                    <span key={i} style={{ fontSize:11, color:"var(--ink3)", fontWeight:600 }}>{t}</span>
                  ))}
                </div>

              </div>
            </form>
          </div>

          {/* ── RIGHT: Event Summary Card ── */}
          <div style={{ position:"sticky", top:76, display:"flex", flexDirection:"column", gap:16 }}>

            {/* Main summary card */}
            <div style={{ borderRadius:24, overflow:"hidden", boxShadow:"var(--shadow-lg)" }}>
              {/* Gradient header */}
              <div style={{ background:"linear-gradient(135deg,#1d3a8f,#2548c5)", padding:"24px 24px 20px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.07)", pointerEvents:"none" }} />
                <div style={{ position:"absolute", bottom:-20, left:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.05)", pointerEvents:"none" }} />
                <div style={{ position:"relative" }}>
                  <div style={{ fontSize:10, fontWeight:800, color:"rgba(255,255,255,0.55)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:6 }}>Bootcamp + Hackathon</div>
                  <div style={{ fontSize:22, fontWeight:900, color:"white", letterSpacing:"-.025em", lineHeight:1.2, marginBottom:16 }}>
                    2-Day AI Bootcamp<br />+ Hackathon
                  </div>
                  <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
                    <span style={{ fontSize:44, fontWeight:900, color:"white", lineHeight:1 }}>₹29</span>
                    <span style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:4 }}>only</span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div style={{ background:"white", padding:"20px 24px", display:"flex", flexDirection:"column", gap:20 }}>

                {/* Schedule */}
                <div>
                  <div style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:".07em", color:"var(--ink3)", marginBottom:12 }}>Schedule</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {[
                      { day:"Day 1 — Sat 14 Mar", time:"8:30 AM – 6 PM", detail:"AI/ML/DL + RAG Masterclass · 4 sessions", clr:"var(--ind)", bg:"var(--ind-l)", n:"1" },
                      { day:"Day 2 — Sun 15 Mar", time:"9 AM – 9 PM",   detail:"Hackathon — Build real AI in 1 day",      clr:"var(--vio)", bg:"#f5f3ff",     n:"2" },
                    ].map((s,i) => (
                      <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                        <div style={{ width:32, height:32, borderRadius:10, background:s.bg, color:s.clr, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, flexShrink:0 }}>{s.n}</div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:"var(--ink)" }}>{s.day}</div>
                          <div style={{ fontSize:11, color:"var(--ind)", fontWeight:600 }}>{s.time}</div>
                          <div style={{ fontSize:11, color:"var(--ink3)", lineHeight:1.45 }}>{s.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height:1, background:"var(--border)" }} />

                {/* What you get */}
                <div>
                  <div style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:".07em", color:"var(--ink3)", marginBottom:12 }}>What You Take Home</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {[
                      { icon:"📄", text:"ATS-proof resume review" },
                      { icon:"📚", text:"Full lecture notes & resources" },
                      { icon:"🗺️", text:"3-month AI job roadmap" },
                      { icon:"💼", text:"Paid internship for winners" },
                      { icon:"🤝", text:"Peer community access" },
                    ].map((p,i) => (
                      <div key={i} style={{ display:"flex", gap:10, alignItems:"center" }}>
                        <div style={{ width:28, height:28, borderRadius:8, background:"var(--cream2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{p.icon}</div>
                        <span style={{ fontSize:12, fontWeight:600, color:"var(--ink2)" }}>{p.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height:1, background:"var(--border)" }} />

                {/* Speakers */}
                <div>
                  <div style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:".07em", color:"var(--ink3)", marginBottom:12 }}>Your Mentors</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {[
                      { name:"Aditya Dubey",    role:"Sr. AI Engineer",          initials:"AD", clr:"var(--ind)", bg:"var(--ind-l)" },
                      { name:"Shubham Kaushik", role:"Gen AI Consultant · KPMG", initials:"SK", clr:"var(--vio)", bg:"#f5f3ff"      },
                    ].map((s,i) => (
                      <div key={i} style={{ display:"flex", gap:10, alignItems:"center" }}>
                        <div style={{ width:38, height:38, borderRadius:12, background:s.bg, color:s.clr, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, flexShrink:0 }}>{s.initials}</div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:"var(--ink)" }}>{s.name}</div>
                          <div style={{ fontSize:11, color:"var(--ink3)" }}>{s.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Urgency banner */}
            <div style={{ borderRadius:16, padding:"14px 18px", background:"var(--amb-l)", border:"1px solid rgba(245,158,11,0.25)", display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontSize:20 }}>⚡</span>
              <div>
                <div style={{ fontSize:13, fontWeight:800, color:"var(--ink)" }}>Seats filling up fast</div>
                <div style={{ fontSize:11, color:"var(--ink3)" }}>Online · Limited capacity · Register now to confirm your spot</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

// ─── Small helpers ───────────────────────────────────────────────
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation:"spin-slow 1s linear infinite" }}>
      <style>{`@keyframes spin-slow { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}
