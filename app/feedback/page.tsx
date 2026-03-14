"use client"

import { useState } from "react"
import { JobingenLogo } from "@/components/jobingen-logo"

const CSS = `
  :root {
    --ink:    #09090f;
    --ink2:   #3d3d52;
    --ink3:   #8a8aa8;
    --cream:  #f7f7fb;
    --border: rgba(10,10,20,0.08);
    --ind:    #1d3a8f;
    --ind-l:  #e8edfe;
    --grn:    #10b981;
    --grn-l:  #ecfdf5;
    --rose:   #f43f5e;
    --shadow-sm: 0 2px 8px rgba(10,10,20,0.05);
    --shadow-md: 0 4px 24px rgba(10,10,20,0.08);
    --spring: cubic-bezier(.34,1.56,.64,1);
    --ease-out: cubic-bezier(.16,1,.3,1);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; background: var(--cream); }

  @keyframes fade-up {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes check-pop {
    0%   { transform: scale(0) rotate(-10deg); opacity:0; }
    60%  { transform: scale(1.2) rotate(4deg); opacity:1; }
    100% { transform: scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }

  .shimmer {
    background: linear-gradient(90deg, #1d3a8f 0%, #3b52f0 28%, #5a6ef4 48%, #3b52f0 68%, #1d3a8f 100%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 5s linear infinite;
  }

  .fade-up { animation: fade-up .55s var(--ease-out) both; }
  .success-check { animation: check-pop .5s var(--spring) both; }

  .field-input {
    width: 100%; padding: 12px 14px; border-radius: 12px;
    border: 1.5px solid var(--border); background: var(--cream);
    font-size: 14px; font-weight: 500; color: var(--ink); outline: none;
    transition: border-color .18s ease, background .18s ease, box-shadow .18s ease;
    font-family: inherit; appearance: none;
  }
  .field-input:focus {
    border-color: var(--ind); background: white;
    box-shadow: 0 0 0 3px rgba(29,58,143,0.1);
  }
  .field-input::placeholder { color: var(--ink3); font-weight: 400; }
  .field-input.err { border-color: var(--rose); }

  .star-btn {
    background: none; border: none; cursor: pointer; padding: 2px;
    transition: transform .15s var(--spring);
    line-height: 1;
  }
  .star-btn:hover { transform: scale(1.2); }

  .radio-pill {
    padding: 8px 16px; border-radius: 99px;
    border: 1.5px solid var(--border); background: var(--cream);
    cursor: pointer; font-size: 13px; font-weight: 600; color: var(--ink2);
    transition: all .18s ease; user-select: none; white-space: nowrap;
  }
  .radio-pill:hover { border-color: rgba(29,58,143,0.3); background: var(--ind-l); color: var(--ind); }
  .radio-pill.selected { border-color: var(--ind); background: var(--ind-l); color: var(--ind); }

  @media (max-width: 600px) {
    .fb-card { padding: 20px 16px !important; }
    .fb-wrap { padding: 24px 16px !important; }
  }
`

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent"]
  const active = hovered || value

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="star-btn"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill={star <= active ? "#FBBF24" : "none"} stroke={star <= active ? "#FBBF24" : "#d1d5db"} strokeWidth="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
        {active > 0 && (
          <span style={{ fontSize: 13, fontWeight: 700, color: "#FBBF24", alignSelf: "center", marginLeft: 4 }}>
            {labels[active]}
          </span>
        )}
      </div>
    </div>
  )
}

function RatingRow({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  const active = hovered || value
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)", minWidth: 130 }}>{label}</span>
      <div style={{ display: "flex", gap: 3 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="star-btn"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={star <= active ? "#FBBF24" : "none"} stroke={star <= active ? "#FBBF24" : "#d1d5db"} strokeWidth="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

function SuccessScreen() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 460, width: "100%", textAlign: "center" }} className="fade-up">
        <div className="success-check" style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#1d3a8f,#2548c5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 12px 40px rgba(29,58,143,0.28)" }}>
          <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
            <path d="M9 18L15 24L27 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ind)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 8 }}>Thank You!</div>
        <h1 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 900, letterSpacing: "-.03em", color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.15 }}>
          Feedback <span className="shimmer">received</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.72, marginBottom: 28, maxWidth: 360, margin: "0 auto 28px" }}>
          Your feedback means a lot to us. We&apos;ll use it to make the next bootcamp even better.
        </p>
        <div style={{ background: "white", border: "1.5px solid var(--border)", borderRadius: 16, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--ink3)", marginBottom: 12 }}>Stay connected</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="https://chat.whatsapp.com/BuLo53f46OSGa9d6whiFdy" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--ink2)", fontSize: 13, fontWeight: 600 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.03l5.327-1.394A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-4.99-1.364l-.358-.213-3.714.973.99-3.625-.233-.37A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>
              Join WhatsApp Group
            </a>
            <a href="https://www.instagram.com/jobingen.ai/" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--ink2)", fontSize: 13, fontWeight: 600 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="url(#igGrad)">
                <defs><linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#fd1d1d"/><stop offset="50%" stopColor="#833ab4"/><stop offset="100%" stopColor="#fcb045"/></linearGradient></defs>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Follow on Instagram
            </a>
          </div>
        </div>
        <a href="/pre-launch" style={{ display: "inline-block", background: "var(--ind)", color: "white", borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
          Back to Home
        </a>
      </div>
    </div>
  )
}

export default function FeedbackPage() {
  const [form, setForm] = useState({
    name: "", email: "",
    overall_rating: 0, content_rating: 0, mentor_rating: 0,
    liked: "", improve: "", recommend: "", next_topic: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState("")

  function set(key: string, val: string | number) {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: "" }))
    setServerError("")
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.overall_rating) e.overall_rating = "Please give an overall rating"
    if (!form.liked.trim()) e.liked = "Please tell us what you liked"
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setServerError("")
    try {
      const res = await fetch("/api/bootcamp-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || "Something went wrong."); setLoading(false); return }
      setSubmitted(true)
    } catch {
      setServerError("Network error. Please try again.")
      setLoading(false)
    }
  }

  if (submitted) return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <SuccessScreen />
    </>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ minHeight: "100vh", background: "var(--cream)" }}>

        {/* Nav */}
        <nav style={{ background: "rgba(247,247,251,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <a href="/pre-launch" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <JobingenLogo height={110} />
          </a>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ind)" }}>Bootcamp 1 · Feedback</div>
        </nav>

        {/* Hero */}
        <div style={{ background: "var(--ind)", padding: "44px 28px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>
              2-Day AI Bootcamp + Hackathon
            </div>
            <h1 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 900, color: "white", margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-.02em" }}>
              Share your experience
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
              Takes 2 minutes. Your feedback directly shapes the next bootcamp.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="fb-wrap" style={{ maxWidth: 640, margin: "0 auto", padding: "40px 28px" }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="fb-card" style={{ background: "white", borderRadius: 24, border: "1.5px solid var(--border)", boxShadow: "var(--shadow-md)", padding: "32px", display: "flex", flexDirection: "column", gap: 28 }}>

              {/* Name + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>Your Name *</label>
                  <input className={`field-input${errors.name ? " err" : ""}`} placeholder="Arjun Sharma" value={form.name} onChange={e => set("name", e.target.value)} />
                  {errors.name && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{errors.name}</span>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>Email <span style={{ color: "var(--ink3)", fontWeight: 500 }}>(optional)</span></label>
                  <input className="field-input" type="email" placeholder="arjun@gmail.com" value={form.email} onChange={e => set("email", e.target.value)} />
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "var(--border)" }} />

              {/* Overall rating */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Overall, how was the bootcamp? *</label>
                <StarRating value={form.overall_rating} onChange={v => set("overall_rating", v)} />
                {errors.overall_rating && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{errors.overall_rating}</span>}
              </div>

              {/* Category ratings */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Rate specific areas</label>
                <div style={{ background: "var(--cream)", borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
                  <RatingRow label="Content Quality" value={form.content_rating} onChange={v => set("content_rating", v)} />
                  <div style={{ height: 1, background: "var(--border)" }} />
                  <RatingRow label="Mentor / Teaching" value={form.mentor_rating} onChange={v => set("mentor_rating", v)} />
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "var(--border)" }} />

              {/* What did you like */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>What did you like most? *</label>
                <textarea className={`field-input${errors.liked ? " err" : ""}`} rows={3} placeholder="e.g. The RAG session was super practical, loved the hands-on hackathon..." value={form.liked} onChange={e => set("liked", e.target.value)} style={{ resize: "none", lineHeight: 1.6 }} />
                {errors.liked && <span style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{errors.liked}</span>}
              </div>

              {/* What to improve */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>What could be better? <span style={{ color: "var(--ink3)", fontWeight: 500 }}>(optional)</span></label>
                <textarea className="field-input" rows={3} placeholder="e.g. More time for Q&A, slower pace on Day 2..." value={form.improve} onChange={e => set("improve", e.target.value)} style={{ resize: "none", lineHeight: 1.6 }} />
              </div>

              {/* Would you recommend */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Would you recommend this to a friend?</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Definitely Yes", "Probably Yes", "Not Sure", "No"].map(opt => (
                    <div key={opt} className={`radio-pill${form.recommend === opt ? " selected" : ""}`} onClick={() => set("recommend", opt)}>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next topic */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>What topic should we cover next? <span style={{ color: "var(--ink3)", fontWeight: 500 }}>(optional)</span></label>
                <input className="field-input" placeholder="e.g. LLM fine-tuning, Agentic AI, System Design for ML..." value={form.next_topic} onChange={e => set("next_topic", e.target.value)} />
              </div>

              {/* Server error */}
              {serverError && (
                <div style={{ padding: "12px 16px", borderRadius: 10, background: "#fff1f2", border: "1px solid rgba(244,63,94,.25)", fontSize: 13, fontWeight: 600, color: "var(--rose)" }}>
                  {serverError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", padding: "15px 28px", borderRadius: 16, background: "linear-gradient(135deg,#1d3a8f,#2548c5)", color: "white", fontSize: 15, fontWeight: 900, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity .2s", fontFamily: "inherit" }}
              >
                {loading ? "Submitting..." : "Submit Feedback"}
                {!loading && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}
