"use client"

import React, { useRef, useState, useEffect } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

/* ─── Scroll Reveal ───────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("show"); io.unobserve(el) } }, { threshold: 0.07 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return ref
}
function R({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const ref = useReveal()
  return <div ref={ref} className={`rev ${className}`} style={{ transitionDelay: `${d}ms` }}>{children}</div>
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { icon: "🎓", title: "Interns",           desc: "Pre-trained, project-ready interns across 6+ domains", color: "#1d3a8f", bg: "#eef2ff" },
  { icon: "⚡", title: "Freelancers",        desc: "Skilled freelancers for project-based or contract work", color: "#7c3aed", bg: "#f5f3ff" },
  { icon: "💼", title: "Full-Time",          desc: "Vetted candidates ready to commit and grow long-term", color: "#059669", bg: "#f0fdf4" },
  { icon: "💻", title: "Developers",         desc: "Frontend, backend, full-stack and AI/ML engineers",   color: "#0891b2", bg: "#e0f2fe" },
  { icon: "🎨", title: "Designers",          desc: "UI/UX, brand, motion and product designers",           color: "#db2777", bg: "#fdf2f8" },
  { icon: "📣", title: "Marketing",          desc: "Growth, content, SEO and social media specialists",    color: "#d97706", bg: "#fffbeb" },
  { icon: "⚙️", title: "Operations",         desc: "PMs, coordinators and ops specialists",                color: "#16a34a", bg: "#f0fdf4" },
  { icon: "🎥", title: "Creators",           desc: "Video editors, content creators and storytellers",     color: "#9333ea", bg: "#faf5ff" },
]

const WHY_CARDS = [
  { icon: "🏋️", title: "Pre-Trained Candidates",  body: "Every candidate completes real projects before joining. No hand-holding, no ramp-up delay." },
  { icon: "🚀", title: "Startup-Ready Mindset",    body: "Built for fast teams. They understand sprints, async communication, and modern workflows." },
  { icon: "🤖", title: "AI-First Skills",          body: "Trained on Cursor, ChatGPT, Notion AI and modern stacks — they hit the ground running." },
  { icon: "⚡", title: "48hr Profile Delivery",    body: "Submit your need. Get shortlisted, curated profiles within 48 hours. No endless waiting." },
  { icon: "🌐", title: "All Domains Covered",      body: "Tech, design, marketing, ops, product — one platform for every role in your startup." },
  { icon: "📈", title: "2026-Ready Skillsets",     body: "Up-to-date with latest tools, frameworks and industry practices. No outdated candidates." },
]

const STEPS = [
  { n: "01", title: "Submit Requirement", desc: "Fill our structured form with your company info and role needs. Takes under 3 minutes." },
  { n: "02", title: "We Shortlist Talent", desc: "Our team reviews your requirement and handpicks the best-fit profiles from our network." },
  { n: "03", title: "Interview & Evaluate", desc: "We share curated profiles. You interview, assess, and make the final hiring decision." },
  { n: "04", title: "Hire & Onboard Fast", desc: "Finalise the hire. Onboard quickly. Start shipping real work from day one." },
]

const DOMAINS = ["Development", "AI / ML", "Design", "Marketing", "Operations", "Product Management", "HR", "Finance"]

/* ─── Form Types ──────────────────────────────────────────────────────────── */
type FD = {
  company_name: string; website_url: string; contact_name: string
  work_email: string; phone: string; talent_type: string
  role_title: string; domain: string; required_skills: string; num_hires: string
  work_model: string; additional_details: string
}
const INIT: FD = {
  company_name: "", website_url: "", contact_name: "", work_email: "", phone: "",
  talent_type: "", role_title: "", domain: "", required_skills: "", num_hires: "",
  work_model: "", additional_details: "",
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function HireTalentPage() {
  const [step, setStep]     = useState(1)
  const [form, setForm]     = useState<FD>(INIT)
  const [errors, setErrors] = useState<Partial<FD>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const set = (k: keyof FD, v: string) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: undefined })) }
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  const validate = (s: number) => {
    const e: Partial<FD> = {}
    if (s === 1) {
      if (!form.company_name.trim()) e.company_name = "Required"
      if (!form.contact_name.trim()) e.contact_name = "Required"
      if (!form.work_email.trim() || !/\S+@\S+\.\S+/.test(form.work_email)) e.work_email = "Valid email required"
      if (!form.phone.trim()) e.phone = "Required"
    }
    if (s === 2 && !form.talent_type) e.talent_type = "Please select one"
    if (s === 3) {
      if (!form.role_title.trim()) e.role_title = "Required"
      if (!form.domain) e.domain = "Required"
    }
    if (s === 4 && !form.work_model) e.work_model = "Please select one"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next   = () => { if (validate(step)) setStep(s => s + 1) }
  const back   = () => setStep(s => s - 1)
  const submit = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/hire-talent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (res.ok) setSuccess(true)
      else alert("Submission failed. Please try again.")
    } catch { alert("Network error. Please try again.") }
    finally { setLoading(false) }
  }

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="hire">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="hire-hero">
          <div className="hire-hero-grid" /><div className="hire-hero-glow" />
          <div className="hire-wrap" style={{ position:"relative", zIndex:1 }}>
            <div style={{ textAlign:"center" }}>
              <div className="hire-badge" style={{ animation:"hire-fade .55s var(--ease) both" }}>
                <span className="hire-badge-pill"><span className="hire-badge-dot" />Hiring Partner</span>
                <span className="hire-badge-txt">Now accepting applications</span>
              </div>
              <h1 className="hire-h1">
                Hire Startup-Ready<br />
                <span className="hire-grad">Talent With Jobingen</span>
              </h1>
              <p className="hire-sub">
                Access trained interns, freelancers, creators, and full-time candidates ready to work on modern startup systems and real-world projects.
              </p>
              <div className="hire-ctas">
                <button className="hire-btn-p" onClick={scrollToForm}>
                  Post a Hiring Request
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <a href="#categories" className="hire-btn-s">Explore Talent Categories</a>
              </div>
              <div style={{ display:"flex", justifyContent:"center" }}>
                <div className="hire-stats">
                  {[{ v:"48hr", l:"Talent Delivery" }, { v:"6+", l:"Domains" }, { v:"100%", l:"Trained Talent" }, { v:"Zero", l:"Agency Fee" }].map(s => (
                    <div key={s.l} className="hire-stat">
                      <div className="hire-stat-v">{s.v}</div>
                      <div className="hire-stat-l">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TALENT CATEGORIES ────────────────────────────────────────────── */}
        <section id="categories" className="hire-sec">
          <div className="hire-wrap">
            <R><div className="hire-eyebrow"><span className="hire-eyebrow-dot" />Talent Categories</div></R>
            <R d={60}><h2 className="hire-ttl">Every Role Your<br />Startup Needs to Ship</h2></R>
            <R d={100}><p className="hire-desc" style={{ marginBottom:0 }}>From early hires to scaling teams — find curated talent across every function.</p></R>
            <div className="hire-cat-grid">
              {CATEGORIES.map((c, i) => (
                <R key={c.title} d={i * 50}>
                  <div className="hire-cat-card">
                    <div className="hire-cat-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
                    <div className="hire-cat-title">{c.title}</div>
                    <div className="hire-cat-desc">{c.desc}</div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY JOBINGEN ─────────────────────────────────────────────────── */}
        <section className="hire-sec-alt">
          <div className="hire-wrap">
            <R><div className="hire-eyebrow"><span className="hire-eyebrow-dot" />Why Jobingen</div></R>
            <R d={60}><h2 className="hire-ttl">Built for Founders<br />Who Move Fast</h2></R>
            <R d={100}><p className="hire-desc">Not a job board. Not a generic recruitment agency. A curated talent network built for startups.</p></R>
            <div className="hire-why-grid">
              {WHY_CARDS.map((w, i) => (
                <R key={w.title} d={i * 60}>
                  <div className="hire-why-card">
                    <div className="hire-why-icon">{w.icon}</div>
                    <div className="hire-why-title">{w.title}</div>
                    <div className="hire-why-body">{w.body}</div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section className="hire-sec">
          <div className="hire-wrap">
            <R><div className="hire-eyebrow"><span className="hire-eyebrow-dot" />Process</div></R>
            <R d={60}><h2 className="hire-ttl">From Requirement<br />to Hire in 4 Steps</h2></R>
            <div className="hire-steps">
              {STEPS.map((s, i) => (
                <R key={s.n} d={i * 80}>
                  <div className="hire-step">
                    <div className="hire-step-top">
                      <div className="hire-step-num">{s.n}</div>
                      {i < STEPS.length - 1 && <div className="hire-step-line" />}
                    </div>
                    <div className="hire-step-title">{s.title}</div>
                    <div className="hire-step-desc">{s.desc}</div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── HIRING FORM ──────────────────────────────────────────────────── */}
        <section className="hire-sec-alt" ref={formRef}>
          <div className="hire-wrap">
            <R><div className="hire-eyebrow"><span className="hire-eyebrow-dot" />Hiring Request</div></R>
            <R d={60}><h2 className="hire-ttl">Post a Hiring Request</h2></R>
            <R d={100}><p className="hire-desc">Tell us who you need. We'll shortlist and deliver profiles within 48 hours.</p></R>

            <R d={140}>
              <div className="hire-form-outer">
                <div className="hire-form-card">

                  {/* Gradient header */}
                  <div className="hire-form-head">
                    <div className="hire-form-head-tag">
                      <span className="hire-ft-dot" />Step {step} of 5
                    </div>
                    <div className="hire-form-head-title">
                      {["Company Info", "Talent Type", "Role Details", "Work Model", "Final Details"][step - 1]}
                    </div>
                    {/* progress bar */}
                    <div className="hire-prog-bar">
                      <div className="hire-prog-fill" style={{ width:`${(step/5)*100}%` }} />
                    </div>
                  </div>

                  {!success ? (
                    <div className="hire-form-body">

                      {/* STEP 1 */}
                      {step === 1 && (
                        <div className="hire-step-body">
                          <div className="hire-grid2">
                            <F label="Company Name *" error={errors.company_name}>
                              <input className={`hire-input${errors.company_name ? " err":""}`} placeholder="Acme Inc." value={form.company_name} onChange={e=>set("company_name",e.target.value)} />
                            </F>
                            <F label="Website URL">
                              <input className="hire-input" placeholder="https://acme.com" value={form.website_url} onChange={e=>set("website_url",e.target.value)} />
                            </F>
                            <F label="Founder / HR Name *" error={errors.contact_name}>
                              <input className={`hire-input${errors.contact_name?" err":""}`} placeholder="Rahul Sharma" value={form.contact_name} onChange={e=>set("contact_name",e.target.value)} />
                            </F>
                            <F label="Work Email *" error={errors.work_email}>
                              <input className={`hire-input${errors.work_email?" err":""}`} placeholder="rahul@acme.com" value={form.work_email} onChange={e=>set("work_email",e.target.value)} />
                            </F>
                            <F label="Phone Number *" error={errors.phone}>
                              <input className={`hire-input${errors.phone?" err":""}`} placeholder="+91 98765 43210" value={form.phone} onChange={e=>set("phone",e.target.value)} />
                            </F>
                          </div>
                        </div>
                      )}

                      {/* STEP 2 */}
                      {step === 2 && (
                        <div className="hire-step-body">
                          <div className="hire-fdiv">What type of talent are you looking for?</div>
                          {errors.talent_type && <div className="hire-err-msg">{errors.talent_type}</div>}
                          <div className="hire-choice-grid">
                            {[
                              { v:"Interns",              icon:"🎓", d:"Short-term, project-based" },
                              { v:"Freelancers",          icon:"⚡", d:"Contract or gig work" },
                              { v:"Full-Time Employees",  icon:"💼", d:"Long-term commitment" },
                              { v:"Contract Roles",       icon:"📋", d:"Fixed scope & timeline" },
                            ].map(o => (
                              <button key={o.v} className={`hire-choice${form.talent_type===o.v?" sel":""}`} onClick={()=>set("talent_type",o.v)}>
                                <span className="hire-choice-icon">{o.icon}</span>
                                <div style={{flex:1,textAlign:"left"}}>
                                  <div className="hire-choice-label">{o.v}</div>
                                  <div className="hire-choice-sub">{o.d}</div>
                                </div>
                                <span className="hire-choice-dot" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* STEP 3 */}
                      {step === 3 && (
                        <div className="hire-step-body">
                          <div className="hire-grid2">
                            <F label="Role Title *" error={errors.role_title}>
                              <input className={`hire-input${errors.role_title?" err":""}`} placeholder="Frontend Developer Intern" value={form.role_title} onChange={e=>set("role_title",e.target.value)} />
                            </F>
                            <F label="Domain *" error={errors.domain}>
                              <select className={`hire-input${errors.domain?" err":""}`} value={form.domain} onChange={e=>set("domain",e.target.value)}>
                                <option value="">Select Domain</option>
                                {DOMAINS.map(d=><option key={d}>{d}</option>)}
                              </select>
                            </F>
                            <F label="Required Skills">
                              <input className="hire-input" placeholder="React, TypeScript, Figma..." value={form.required_skills} onChange={e=>set("required_skills",e.target.value)} />
                            </F>
                            <F label="Number of Hires">
                              <input className="hire-input" type="number" min="1" placeholder="1" value={form.num_hires} onChange={e=>set("num_hires",e.target.value)} />
                            </F>
                          </div>
                        </div>
                      )}

                      {/* STEP 4 */}
                      {step === 4 && (
                        <div className="hire-step-body">
                          <div className="hire-fdiv">Where will the candidate work?</div>
                          {errors.work_model && <div className="hire-err-msg">{errors.work_model}</div>}
                          <div className="hire-model-grid">
                            {[
                              { v:"Remote",  icon:"🌐", d:"Work from anywhere" },
                              { v:"Hybrid",  icon:"🏢", d:"Mix of office & remote" },
                              { v:"Onsite",  icon:"📍", d:"At your office" },
                            ].map(o=>(
                              <button key={o.v} className={`hire-model${form.work_model===o.v?" sel":""}`} onClick={()=>set("work_model",o.v)}>
                                <span className="hire-model-icon">{o.icon}</span>
                                <div className="hire-model-label">{o.v}</div>
                                <div className="hire-model-sub">{o.d}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* STEP 5 */}
                      {step === 5 && (
                        <div className="hire-step-body">
                          <F label="Describe your ideal candidate or hiring requirements">
                            <textarea className="hire-input hire-ta" rows={4}
                              placeholder="Share details about your team, work culture, expectations..."
                              value={form.additional_details} onChange={e=>set("additional_details",e.target.value)} />
                          </F>
                          <div className="hire-summary">
                            <div className="hire-summary-hd">Review Before Submitting</div>
                            {[
                              { l:"Company",     v: form.company_name },
                              { l:"Contact",     v: `${form.contact_name} · ${form.work_email}` },
                              { l:"Talent Type", v: form.talent_type },
                              { l:"Role",        v: form.role_title },
                              { l:"Domain",      v: form.domain },
                              { l:"Work Model",  v: form.work_model },
                              { l:"Skills",      v: form.required_skills || "—" },
                            ].map(r=>(
                              <div key={r.l} className="hire-summary-row">
                                <span className="hire-summary-lbl">{r.l}</span>
                                <span className="hire-summary-val">{r.v||"—"}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Nav */}
                      <div className="hire-nav">
                        {step > 1
                          ? <button className="hire-btn-back" onClick={back}>← Back</button>
                          : <div />
                        }
                        {step < 5
                          ? <button className="hire-btn-next" onClick={next}>Continue →</button>
                          : <button className="hire-btn-submit" onClick={submit} disabled={loading}>
                              {loading ? <><span className="hire-spin"/>Submitting…</> : "Submit Hiring Request →"}
                            </button>
                        }
                      </div>
                    </div>
                  ) : (
                    <div className="hire-success">
                      <div className="hire-success-ring">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="hire-success-h">Request Submitted!</div>
                      <div className="hire-success-p">Your hiring request has been successfully submitted. The Jobingen team will connect with you shortly.</div>
                      <a href="/" className="hire-btn-p" style={{textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8}}>Back to Home</a>
                    </div>
                  )}
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

/* ─── Field helper ────────────────────────────────────────────────────────── */
function F({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="hire-field">
      <label className="hire-label">{label}</label>
      {children}
      {error && <div className="hire-field-err">{error}</div>}
    </div>
  )
}

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
const CSS = `
  .hire {
    --ind:  #1d3a8f;
    --vio:  #3b52f0;
    --ind-l:#e8edfe;
    --ind-xl:#f4f6ff;
    --cream:#f7f7fb;
    --white:#ffffff;
    --ink:  #09090f;
    --ink2: #3d3d52;
    --ink3: #8a8aa8;
    --jb:   rgba(10,10,20,0.07);
    --jbM:  rgba(10,10,20,0.14);
    --grn:  #10b981;
    --shadow-sm: 0 2px 8px rgba(10,10,20,0.05);
    --shadow-md: 0 4px 24px rgba(10,10,20,0.09);
    --shadow-lg: 0 12px 48px rgba(10,10,20,0.13);
    --ease: cubic-bezier(.16,1,.3,1);
    font-family: -apple-system,BlinkMacSystemFont,'Inter',system-ui,sans-serif;
    -webkit-font-smoothing: antialiased;
    background: var(--white);
    overflow-x: hidden;
  }
  .hire * { box-sizing: border-box; }

  @keyframes hire-fade  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
  @keyframes hire-spin  { to{transform:rotate(360deg)} }
  @keyframes hire-check { 0%{transform:scale(0) rotate(-12deg);opacity:0} 60%{transform:scale(1.2) rotate(4deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }

  .hire .rev { opacity:0; transform:translateY(20px); transition:opacity .65s var(--ease),transform .65s var(--ease); }
  .hire .rev.show { opacity:1; transform:none; }

  .hire-grad {
    background: linear-gradient(135deg,var(--ind) 0%,var(--vio) 100%);
    -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  }

  /* WRAP */
  .hire-wrap { max-width:1100px; margin:0 auto; padding:0 24px; }
  @media(max-width:600px){ .hire-wrap{padding:0 16px} }

  /* HERO */
  .hire-hero {
    position:relative; overflow:hidden;
    background:linear-gradient(175deg,var(--ind-xl) 0%,var(--white) 65%);
    padding:120px 24px 80px; border-bottom:1px solid var(--jb);
  }
  @media(max-width:600px){ .hire-hero{padding:100px 18px 60px} }
  .hire-hero-grid {
    position:absolute; inset:0; pointer-events:none; opacity:.45;
    background-image:linear-gradient(var(--ind-l) 1px,transparent 1px),linear-gradient(90deg,var(--ind-l) 1px,transparent 1px);
    background-size:44px 44px;
    mask-image:radial-gradient(ellipse 75% 60% at 50% 30%,black 10%,transparent 75%);
    -webkit-mask-image:radial-gradient(ellipse 75% 60% at 50% 30%,black 10%,transparent 75%);
  }
  .hire-hero-glow {
    position:absolute; top:-200px; left:50%; transform:translateX(-50%);
    width:800px; height:800px; border-radius:50%; pointer-events:none;
    background:radial-gradient(circle,rgba(29,58,143,.07) 0%,transparent 65%);
  }

  .hire-badge {
    display:inline-flex; align-items:center; gap:8px; white-space:nowrap;
    padding:6px 16px 6px 8px; background:white;
    border:1.5px solid rgba(29,58,143,.18); border-radius:99px;
    box-shadow:var(--shadow-sm); margin-bottom:28px;
  }
  .hire-badge-pill {
    display:inline-flex; align-items:center; gap:5px;
    background:linear-gradient(135deg,var(--ind),var(--vio));
    color:white; font-size:10px; font-weight:800; letter-spacing:.07em; text-transform:uppercase;
    padding:4px 10px; border-radius:99px;
  }
  .hire-badge-dot { width:6px; height:6px; background:#22c55e; border-radius:50%; }
  .hire-badge-txt { font-size:12.5px; font-weight:600; color:var(--ind); }

  .hire-h1 {
    font-size:clamp(38px,5.8vw,68px); font-weight:900; color:var(--ink);
    letter-spacing:-.048em; line-height:1.04; margin-bottom:20px;
    animation:hire-fade .7s var(--ease) .1s both;
  }
  .hire-sub {
    font-size:clamp(15px,1.8vw,18px); color:var(--ink2); line-height:1.75;
    max-width:600px; margin:0 auto 36px;
    animation:hire-fade .8s var(--ease) .18s both;
  }
  .hire-ctas {
    display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap;
    margin-bottom:48px; animation:hire-fade .9s var(--ease) .24s both;
  }
  @media(max-width:480px){ .hire-ctas{flex-direction:column;align-items:stretch;padding:0 4px} }

  .hire-btn-p {
    display:inline-flex; align-items:center; justify-content:center; gap:9px;
    padding:14px 32px; border-radius:13px;
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white;
    font-size:15px; font-weight:700; text-decoration:none; border:none; cursor:pointer; font-family:inherit;
    box-shadow:0 4px 20px rgba(29,58,143,.32); transition:all .22s var(--ease);
  }
  .hire-btn-p:hover { transform:translateY(-2px); box-shadow:0 10px 32px rgba(29,58,143,.42); }
  .hire-btn-s {
    display:inline-flex; align-items:center; justify-content:center; gap:8px;
    padding:14px 26px; border-radius:13px; background:white; color:var(--ind);
    font-size:15px; font-weight:700; text-decoration:none;
    border:1.5px solid rgba(29,58,143,.2); box-shadow:var(--shadow-sm);
    transition:all .22s; cursor:pointer; font-family:inherit;
  }
  .hire-btn-s:hover { border-color:var(--ind); background:var(--ind-xl); transform:translateY(-1px); }

  .hire-stats {
    display:inline-flex; background:white; border:1.5px solid var(--jb); border-radius:16px;
    overflow:hidden; box-shadow:var(--shadow-md); animation:hire-fade 1s var(--ease) .3s both;
  }
  .hire-stat { padding:16px 28px; text-align:center; border-right:1px solid var(--jb); }
  .hire-stat:last-child { border-right:none; }
  .hire-stat-v { font-size:20px; font-weight:900; color:var(--ind); letter-spacing:-.04em; line-height:1; }
  .hire-stat-l { font-size:10px; font-weight:600; color:var(--ink3); margin-top:4px; letter-spacing:.04em; text-transform:uppercase; }
  @media(max-width:600px){
    .hire-stats { display:grid; grid-template-columns:1fr 1fr; border-radius:14px; width:100%; }
    .hire-stat  { border-right:none; border-bottom:1px solid var(--jb); padding:13px 16px; }
    .hire-stat:nth-child(odd)  { border-right:1px solid var(--jb); }
    .hire-stat:nth-last-child(-n+2){ border-bottom:none; }
  }

  /* SECTIONS */
  .hire-sec     { padding:72px 0; background:var(--white); }
  .hire-sec-alt { padding:72px 0; background:var(--cream); }
  @media(max-width:600px){ .hire-sec,.hire-sec-alt{ padding:52px 0; } }

  .hire-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:14px; font-size:11px; font-weight:800; color:var(--ind); letter-spacing:.1em; text-transform:uppercase; }
  .hire-eyebrow-dot { width:5px; height:5px; border-radius:50%; background:var(--ind); flex-shrink:0; }
  .hire-ttl  { font-size:clamp(28px,3.5vw,44px); font-weight:900; color:var(--ink); letter-spacing:-.04em; line-height:1.08; margin-bottom:14px; }
  .hire-desc { font-size:16px; color:var(--ink2); line-height:1.75; max-width:520px; margin-bottom:52px; }

  /* CATEGORIES */
  .hire-cat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-top:48px; }
  @media(max-width:1000px){ .hire-cat-grid{ grid-template-columns:repeat(2,1fr); } }
  @media(max-width:480px){ .hire-cat-grid{ grid-template-columns:1fr; } }

  .hire-cat-card {
    background:white; border:1.5px solid var(--jb); border-radius:20px;
    padding:24px 20px; transition:all .28s var(--ease); cursor:default;
    box-shadow:var(--shadow-sm);
  }
  .hire-cat-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-lg); border-color:rgba(29,58,143,.2); }
  .hire-cat-icon { width:48px; height:48px; border-radius:13px; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:14px; }
  .hire-cat-title { font-size:15px; font-weight:800; color:var(--ink); letter-spacing:-.02em; margin-bottom:7px; }
  .hire-cat-desc  { font-size:13px; color:var(--ink2); line-height:1.6; }

  /* WHY */
  .hire-why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:52px; }
  @media(max-width:860px){ .hire-why-grid{ grid-template-columns:1fr; max-width:560px; } }

  .hire-why-card {
    background:white; border:1.5px solid var(--jb); border-radius:20px;
    padding:28px 24px; box-shadow:var(--shadow-sm); transition:all .28s var(--ease);
  }
  .hire-why-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-lg); border-color:rgba(29,58,143,.2); }
  .hire-why-icon  { width:46px; height:46px; border-radius:13px; background:var(--ind-l); display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:18px; }
  .hire-why-title { font-size:16px; font-weight:800; color:var(--ink); letter-spacing:-.025em; margin-bottom:10px; }
  .hire-why-body  { font-size:13.5px; color:var(--ink2); line-height:1.72; }

  /* HOW */
  .hire-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:0; margin-top:52px; }
  @media(max-width:800px){ .hire-steps{ grid-template-columns:repeat(2,1fr); gap:32px; } }
  @media(max-width:480px){ .hire-steps{ grid-template-columns:1fr; gap:24px; } }

  .hire-step { padding:0 12px; text-align:center; }
  .hire-step-top { display:flex; align-items:center; justify-content:center; margin-bottom:18px; position:relative; }
  .hire-step-num {
    width:52px; height:52px; border-radius:50%;
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white;
    font-size:15px; font-weight:900; display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 16px rgba(29,58,143,.3); flex-shrink:0; z-index:1;
  }
  .hire-step-line {
    position:absolute; left:calc(50% + 26px); right:calc(-50% + 26px);
    top:26px; height:2px; background:linear-gradient(90deg,var(--vio),var(--ind-l));
  }
  @media(max-width:800px){ .hire-step-line{ display:none; } }
  .hire-step-title { font-size:15px; font-weight:800; color:var(--ink); letter-spacing:-.02em; margin-bottom:8px; }
  .hire-step-desc  { font-size:13px; color:var(--ink2); line-height:1.65; max-width:200px; margin:0 auto; }

  /* FORM */
  .hire-form-outer { max-width:700px; margin:0 auto; }
  .hire-form-card  { background:white; border:1.5px solid var(--jb); border-radius:22px; overflow:hidden; box-shadow:var(--shadow-lg); }

  .hire-form-head {
    background:linear-gradient(135deg,var(--ind),var(--vio));
    padding:28px 32px; position:relative; overflow:hidden;
  }
  .hire-form-head::after {
    content:''; position:absolute; top:-50px; right:-40px;
    width:220px; height:220px; background:rgba(255,255,255,.06); border-radius:50%;
  }
  .hire-form-head-tag {
    display:inline-flex; align-items:center; gap:5px;
    background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.22);
    border-radius:99px; padding:4px 10px; font-size:10px; font-weight:800; color:white;
    letter-spacing:.06em; text-transform:uppercase; margin-bottom:10px; position:relative; z-index:1;
  }
  .hire-ft-dot { width:5px; height:5px; background:#86efac; border-radius:50%; }
  .hire-form-head-title { font-size:20px; font-weight:900; color:white; letter-spacing:-.03em; margin-bottom:14px; position:relative; z-index:1; }
  .hire-prog-bar { height:4px; background:rgba(255,255,255,.2); border-radius:99px; position:relative; z-index:1; }
  .hire-prog-fill { height:100%; border-radius:99px; background:white; transition:width .4s var(--ease); }

  .hire-form-body { padding:28px 32px; }
  @media(max-width:520px){ .hire-form-body{padding:20px 18px;} .hire-form-head{padding:22px 20px;} }

  .hire-step-body { animation:hire-fade .3s var(--ease) both; }

  .hire-fdiv { font-size:11px; font-weight:800; color:var(--ink3); text-transform:uppercase; letter-spacing:.08em; margin-bottom:16px; padding-bottom:10px; border-bottom:1px solid var(--jb); }
  .hire-err-msg { background:#fef2f2; border:1px solid rgba(244,63,94,.2); color:#dc2626; font-size:13px; font-weight:600; padding:10px 14px; border-radius:10px; margin-bottom:14px; }

  .hire-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:540px){ .hire-grid2{ grid-template-columns:1fr; } }

  .hire-field { display:flex; flex-direction:column; gap:6px; }
  .hire-label { font-size:11.5px; font-weight:700; color:var(--ink2); letter-spacing:.01em; }
  .hire-input {
    width:100%; padding:12px 14px; border-radius:11px;
    border:1.5px solid var(--jb); background:var(--cream);
    font-size:14px; font-weight:500; color:var(--ink); outline:none; font-family:inherit;
    transition:border-color .18s,box-shadow .18s,background .18s; appearance:none;
  }
  .hire-input:focus { border-color:var(--ind); background:white; box-shadow:0 0 0 3px rgba(29,58,143,.1); }
  .hire-input.err   { border-color:#f43f5e; }
  .hire-input::placeholder { color:var(--ink3); font-weight:400; }
  .hire-ta { resize:vertical; min-height:110px; }
  .hire-field-err { font-size:12px; color:#dc2626; font-weight:600; }

  /* CHOICES */
  .hire-choice-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  @media(max-width:480px){ .hire-choice-grid{ grid-template-columns:1fr; } }

  .hire-choice {
    display:flex; align-items:center; gap:12px; padding:14px 16px;
    background:var(--cream); border:1.5px solid var(--jb); border-radius:13px;
    cursor:pointer; font-family:inherit; position:relative; transition:all .18s var(--ease);
  }
  .hire-choice:hover { border-color:var(--ind); background:var(--ind-xl); }
  .hire-choice.sel   { border-color:var(--ind); background:var(--ind-xl); box-shadow:0 0 0 3px rgba(29,58,143,.1); }
  .hire-choice-icon  { font-size:22px; flex-shrink:0; }
  .hire-choice-label { font-size:14px; font-weight:700; color:var(--ink); }
  .hire-choice-sub   { font-size:12px; color:var(--ink3); margin-top:2px; }
  .hire-choice-dot   {
    width:18px; height:18px; border-radius:50%; border:1.5px solid rgba(10,10,20,.2);
    background:white; flex-shrink:0; transition:all .18s;
  }
  .hire-choice.sel .hire-choice-dot {
    background:var(--ind); border-color:var(--ind);
    background-image:url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 6l3 3 5-5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:center; background-size:10px;
  }

  /* MODEL */
  .hire-model-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  @media(max-width:480px){ .hire-model-grid{ grid-template-columns:1fr; } }

  .hire-model {
    padding:20px 16px; background:var(--cream); border:1.5px solid var(--jb); border-radius:14px;
    cursor:pointer; text-align:center; font-family:inherit; transition:all .18s var(--ease);
  }
  .hire-model:hover { border-color:var(--ind); background:var(--ind-xl); }
  .hire-model.sel   { border-color:var(--ind); background:var(--ind-xl); box-shadow:0 0 0 3px rgba(29,58,143,.1); }
  .hire-model-icon  { font-size:26px; display:block; margin-bottom:8px; }
  .hire-model-label { font-size:15px; font-weight:800; color:var(--ink); margin-bottom:4px; }
  .hire-model-sub   { font-size:12px; color:var(--ink3); }

  /* SUMMARY */
  .hire-summary     { background:var(--cream); border:1.5px solid var(--jb); border-radius:14px; padding:18px 20px; margin-top:18px; }
  .hire-summary-hd  { font-size:10.5px; font-weight:800; color:var(--ind); letter-spacing:.07em; text-transform:uppercase; margin-bottom:12px; }
  .hire-summary-row { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:5px 0; border-bottom:1px solid var(--jb); }
  .hire-summary-row:last-child { border-bottom:none; }
  .hire-summary-lbl { font-size:12px; font-weight:600; color:var(--ink3); flex-shrink:0; }
  .hire-summary-val { font-size:12.5px; font-weight:700; color:var(--ink); text-align:right; }

  /* NAV */
  .hire-nav { display:flex; align-items:center; justify-content:space-between; padding-top:22px; border-top:1px solid var(--jb); margin-top:22px; gap:10px; }
  .hire-btn-back {
    background:var(--cream); border:1.5px solid var(--jb); color:var(--ink2);
    padding:11px 22px; border-radius:11px; font-size:14px; font-weight:700;
    cursor:pointer; font-family:inherit; transition:all .18s;
  }
  .hire-btn-back:hover { background:#e9ecf1; }
  .hire-btn-next {
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white; border:none;
    padding:12px 28px; border-radius:11px; font-size:14px; font-weight:700;
    cursor:pointer; font-family:inherit; box-shadow:0 3px 14px rgba(29,58,143,.28);
    transition:all .22s var(--ease);
  }
  .hire-btn-next:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(29,58,143,.4); }
  .hire-btn-submit {
    display:inline-flex; align-items:center; gap:8px;
    background:linear-gradient(135deg,#059669,#10b981); color:white; border:none;
    padding:12px 28px; border-radius:11px; font-size:14px; font-weight:700;
    cursor:pointer; font-family:inherit; box-shadow:0 3px 14px rgba(5,150,105,.28);
    transition:all .22s var(--ease);
  }
  .hire-btn-submit:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 20px rgba(5,150,105,.4); }
  .hire-btn-submit:disabled { opacity:.6; cursor:not-allowed; transform:none; }
  .hire-spin {
    width:14px; height:14px; border:2px solid rgba(255,255,255,.35);
    border-top-color:white; border-radius:50%; display:inline-block; flex-shrink:0;
    animation:hire-spin .65s linear infinite;
  }

  /* SUCCESS */
  .hire-success { padding:52px 32px; text-align:center; }
  .hire-success-ring {
    width:72px; height:72px; border-radius:50%; margin:0 auto 20px;
    background:linear-gradient(135deg,#059669,#10b981);
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 8px 24px rgba(5,150,105,.35);
    animation:hire-check .5s cubic-bezier(.34,1.56,.64,1) both;
  }
  .hire-success-h { font-size:24px; font-weight:900; color:var(--ink); letter-spacing:-.04em; margin-bottom:10px; }
  .hire-success-p { font-size:15px; color:var(--ink2); line-height:1.72; max-width:400px; margin:0 auto 28px; }
`
