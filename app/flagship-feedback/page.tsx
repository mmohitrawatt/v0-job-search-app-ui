"use client"

import { useState, FormEvent } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

/* ─── CSS ────────────────────────────────────────────────────────── */
const CSS = `
  .fb {
    --ind: #1d3a8f;
    --vio: #3b52f0;
    --ind-l: #e8edfe;
    --ind-xl: #f4f6ff;
    --cream: #f7f7fb;
    --ink: #09090f;
    --ink2: #3d3d52;
    --ink3: #8a8aa8;
    --jb: rgba(10,10,20,0.08);
    --grn: #10b981;
    --grn-l: #ecfdf5;
    --shadow-sm: 0 2px 8px rgba(10,10,20,0.05);
    --shadow-md: 0 4px 24px rgba(10,10,20,0.09);
    --shadow-lg: 0 12px 48px rgba(10,10,20,0.13);
    --ease: cubic-bezier(.16,1,.3,1);
    --spring: cubic-bezier(.34,1.56,.64,1);
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    background: #f7f8fc;
    color: var(--ink);
    min-height: 100vh;
  }

  @keyframes fb-fade { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
  @keyframes fb-spin { to{transform:rotate(360deg)} }
  @keyframes fb-check-pop { 0%{transform:scale(0) rotate(-15deg);opacity:0} 65%{transform:scale(1.18) rotate(4deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes fb-pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
  @keyframes fb-star-pop { 0%{transform:scale(.8)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }

  .fb-wrap { max-width: 640px; margin: 0 auto; padding: 120px 24px 80px; }

  .fb-card {
    background: white; border-radius: 28px; border: 1.5px solid var(--jb);
    box-shadow: 0 24px 72px rgba(29,58,143,.08); overflow: hidden;
    animation: fb-fade .5s var(--ease) both;
  }
  .fb-card-head {
    padding: 40px 48px 32px;
    background: linear-gradient(135deg, #f0f4ff, #eef1fd);
    border-bottom: 1.5px solid var(--jb);
  }
  @media(max-width:580px){ .fb-card-head,.fb-card-body { padding-left: 24px; padding-right: 24px; } }

  .fb-badge {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 5px 14px 5px 8px; background: white;
    border: 1.5px solid rgba(29,58,143,.2); border-radius: 99px;
    box-shadow: var(--shadow-sm); margin-bottom: 20px;
  }
  .fb-badge-pill {
    display: inline-flex; align-items: center; gap: 4px;
    background: linear-gradient(135deg, var(--ind), var(--vio)); color: white;
    font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
    padding: 3px 9px; border-radius: 99px;
  }
  .fb-badge-dot { width: 5px; height: 5px; background: #22c55e; border-radius: 50%; animation: fb-pulse-dot 2s ease-in-out infinite; }
  .fb-head-title { font-size: clamp(22px, 3.5vw, 30px); font-weight: 900; color: var(--ink); letter-spacing: -.04em; margin-bottom: 8px; }
  .fb-head-sub { font-size: 14px; color: var(--ink2); line-height: 1.65; }

  .fb-card-body { padding: 40px 48px; }

  .fb-section-label {
    font-size: 11px; font-weight: 800; color: var(--ind);
    letter-spacing: .08em; text-transform: uppercase;
    display: flex; align-items: center; gap: 7px;
    margin-bottom: 18px;
  }
  .fb-section-label::before { content:''; display:block; width:4px; height:4px; border-radius:50%; background:var(--ind); }

  .fb-rating-group { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
  .fb-rating-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 20px; background: var(--cream); border-radius: 14px; border: 1.5px solid var(--jb); }
  .fb-rating-label { font-size: 14px; font-weight: 700; color: var(--ink); }
  .fb-rating-sub { font-size: 11.5px; color: var(--ink3); margin-top: 2px; }
  .fb-stars { display: flex; gap: 4px; }
  .fb-star-btn { background: none; border: none; cursor: pointer; padding: 2px; display: flex; align-items: center; transition: transform .12s var(--spring); }
  .fb-star-btn:hover { transform: scale(1.18); }
  .fb-star-btn.active { animation: fb-star-pop .2s var(--spring); }

  .fb-field { margin-bottom: 22px; }
  .fb-label { display: block; font-size: 12.5px; font-weight: 700; color: var(--ink2); margin-bottom: 8px; letter-spacing: .02em; text-transform: uppercase; }
  .fb-input {
    width: 100%; padding: 14px 18px; border: 1.5px solid var(--jb); border-radius: 13px;
    background: var(--cream); font-size: 15px; font-weight: 500; color: var(--ink);
    outline: none; transition: border-color .18s, box-shadow .18s, background .18s;
    font-family: inherit;
  }
  .fb-input:focus { border-color: var(--ind); background: white; box-shadow: 0 0 0 4px rgba(29,58,143,.08); }
  .fb-input::placeholder { color: var(--ink3); }
  .fb-textarea {
    width: 100%; padding: 14px 18px; border: 1.5px solid var(--jb); border-radius: 13px;
    background: var(--cream); font-size: 15px; font-weight: 500; color: var(--ink);
    outline: none; transition: border-color .18s, box-shadow .18s, background .18s;
    resize: vertical; min-height: 100px; font-family: inherit; line-height: 1.65;
  }
  .fb-textarea:focus { border-color: var(--ind); background: white; box-shadow: 0 0 0 4px rgba(29,58,143,.08); }
  .fb-textarea::placeholder { color: var(--ink3); }

  .fb-recommend-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .fb-recommend-btn {
    flex: 1; min-width: 110px; padding: 12px 16px; border-radius: 12px;
    border: 1.5px solid var(--jb); background: white; cursor: pointer;
    font-size: 13px; font-weight: 700; color: var(--ink2); font-family: inherit;
    transition: all .18s; text-align: center;
  }
  .fb-recommend-btn.sel { background: var(--grn-l); border-color: var(--grn); color: var(--grn); }

  .fb-divider { height: 1px; background: var(--jb); margin: 28px 0; }

  .fb-submit-btn {
    display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%;
    padding: 17px 32px; border-radius: 15px; border: none; cursor: pointer;
    background: linear-gradient(135deg, var(--ind), var(--vio)); color: white;
    font-size: 16px; font-weight: 800; letter-spacing: -.02em; font-family: inherit;
    box-shadow: 0 6px 24px rgba(29,58,143,.34); transition: all .22s var(--ease);
  }
  .fb-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(29,58,143,.44); }
  .fb-submit-btn:disabled { opacity: .55; cursor: not-allowed; }

  .fb-err { color: #ef4444; font-size: 11.5px; font-weight: 600; margin-top: 5px; }

  .fb-success { padding: 60px 48px; text-align: center; }
  .fb-success-icon {
    width: 80px; height: 80px; border-radius: 24px;
    background: linear-gradient(135deg, var(--ind), var(--vio));
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px; box-shadow: 0 12px 40px rgba(29,58,143,.3);
    animation: fb-check-pop .6s var(--spring) both;
  }
  .fb-success-h2 { font-size: clamp(24px, 4vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -.04em; margin-bottom: 12px; }
  .fb-success-p { font-size: 15px; color: var(--ink2); line-height: 1.75; max-width: 380px; margin: 0 auto 32px; }

  @media(max-width:580px){
    .fb-rating-row { flex-direction: column; align-items: flex-start; gap: 10px; }
    .fb-success { padding: 40px 24px; }
  }
`

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="fb-stars">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          className={`fb-star-btn${s <= value ? " active" : ""}`}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
          aria-label={`${s} star`}
        >
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path
              d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
              fill={s <= (hover || value) ? "#fbbf24" : "#e5e7eb"}
              style={{ transition: "fill .12s" }}
            />
          </svg>
        </button>
      ))}
    </div>
  )
}

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"]

type FeedbackForm = {
  name: string
  email: string
  overallRating: number
  contentRating: number
  mentorRating: number
  liked: string
  improve: string
  recommend: string
  nextTopic: string
}

const INIT: FeedbackForm = {
  name: "", email: "",
  overallRating: 0, contentRating: 0, mentorRating: 0,
  liked: "", improve: "", recommend: "Definitely Yes", nextTopic: "",
}

export default function FlagshipFeedbackPage() {
  const [form, setForm] = useState<FeedbackForm>(INIT)
  const [errors, setErrors] = useState<Partial<Record<keyof FeedbackForm, string>>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState("")

  function set(k: keyof FeedbackForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [k]: e.target.value }))
      if (errors[k]) setErrors(er => ({ ...er, [k]: "" }))
      setServerError("")
    }
  }
  function setRating(k: "overallRating" | "contentRating" | "mentorRating") {
    return (v: number) => {
      setForm(f => ({ ...f, [k]: v }))
      if (errors[k]) setErrors(er => ({ ...er, [k]: "" }))
    }
  }

  function validate() {
    const e: Partial<Record<keyof FeedbackForm, string>> = {}
    if (!form.name.trim()) e.name = "Please enter your name"
    if (!form.overallRating) e.overallRating = "Please rate your overall experience"
    if (!form.contentRating) e.contentRating = "Please rate the content quality"
    if (!form.mentorRating) e.mentorRating = "Please rate the mentors"
    if (!form.liked.trim()) e.liked = "Please tell us what you liked"
    return e
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true); setServerError("")
    try {
      const res = await fetch("/api/bootcamp-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          overall_rating: form.overallRating,
          content_rating: form.contentRating,
          mentor_rating: form.mentorRating,
          liked: form.liked.trim(),
          improve: form.improve.trim(),
          recommend: form.recommend,
          next_topic: form.nextTopic.trim(),
          bootcamp: "flagship_2026",
        }),
      })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || "Something went wrong. Please try again."); setLoading(false); return }
      setSuccess(true)
    } catch {
      setServerError("Network error. Please check your connection and try again.")
      setLoading(false)
    }
  }

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="fb">
        <div className="fb-wrap">

          {success ? (
            <div className="fb-card">
              <div className="fb-success">
                <div className="fb-success-icon">
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 className="fb-success-h2">Thank You!</h2>
                <p className="fb-success-p">
                  Your feedback has been submitted and will appear live on the bootcamp page shortly. Your experience helps us build better programs.
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                  <a
                    href="/flagship-training"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "13px 26px", borderRadius: 13,
                      background: "linear-gradient(135deg, #1d3a8f, #3b52f0)", color: "white",
                      fontSize: 14, fontWeight: 800, textDecoration: "none",
                    }}
                  >
                    Back to Bootcamp Page
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="fb-card" noValidate>
              {/* Header */}
              <div className="fb-card-head">
                <div className="fb-badge">
                  <div className="fb-badge-pill">
                    <span className="fb-badge-dot"/>Flagship 2026
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ind)" }}>Bootcamp Feedback</span>
                </div>
                <h1 className="fb-head-title">How Was Your Experience?</h1>
                <p className="fb-head-sub">
                  Your honest feedback helps us improve the program and appears on the bootcamp page to help future students.
                </p>
              </div>

              {/* Body */}
              <div className="fb-card-body">

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }} className="fb-name-grid">
                  <div className="fb-field" style={{ marginBottom: 0 }}>
                    <label className="fb-label">Your Name <span style={{ color: "#ef4444" }}>*</span></label>
                    <input
                      className="fb-input"
                      placeholder="Rahul Sharma"
                      value={form.name}
                      onChange={set("name")}
                      style={errors.name ? { borderColor: "#ef4444" } : {}}
                    />
                    {errors.name && <div className="fb-err">{errors.name}</div>}
                  </div>
                  <div className="fb-field" style={{ marginBottom: 0 }}>
                    <label className="fb-label">Email <span style={{ color: "var(--ink3)", fontWeight: 500, fontSize: 10 }}>Optional</span></label>
                    <input
                      type="email"
                      className="fb-input"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={set("email")}
                    />
                  </div>
                </div>

                <div className="fb-divider" style={{ marginTop: 28 }}/>

                {/* Star Ratings */}
                <div className="fb-section-label" style={{ marginTop: 4 }}>Rate Your Experience</div>
                <div className="fb-rating-group">
                  {([
                    { key: "overallRating", label: "Overall Experience", sub: "How was the bootcamp overall?" },
                    { key: "contentRating", label: "Content Quality", sub: "DSA, Spec Coding & RAG modules" },
                    { key: "mentorRating", label: "Mentor Quality", sub: "Session delivery & accessibility" },
                  ] as { key: "overallRating" | "contentRating" | "mentorRating"; label: string; sub: string }[]).map(r => (
                    <div key={r.key}>
                      <div className="fb-rating-row" style={errors[r.key] ? { borderColor: "#ef4444" } : {}}>
                        <div>
                          <div className="fb-rating-label">{r.label}</div>
                          <div className="fb-rating-sub">{r.sub}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                          <StarRating value={form[r.key]} onChange={setRating(r.key)} />
                          {form[r.key] > 0 && (
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#fbbf24" }}>{RATING_LABELS[form[r.key]]}</span>
                          )}
                        </div>
                      </div>
                      {errors[r.key] && <div className="fb-err">{errors[r.key]}</div>}
                    </div>
                  ))}
                </div>

                <div className="fb-divider"/>

                {/* Text feedback */}
                <div className="fb-section-label">Your Thoughts</div>

                <div className="fb-field">
                  <label className="fb-label">What did you like most? <span style={{ color: "#ef4444" }}>*</span></label>
                  <textarea
                    className="fb-textarea"
                    placeholder="The RAG session was mind-blowing. I finally understood how AI systems actually work in production..."
                    rows={4}
                    value={form.liked}
                    onChange={e => { if (e.target.value.length <= 500) set("liked")(e) }}
                    style={errors.liked ? { borderColor: "#ef4444" } : {}}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    {errors.liked ? <div className="fb-err">{errors.liked}</div> : <span/>}
                    <span style={{ fontSize: 11, fontWeight: 600, color: form.liked.length > 450 ? "#f59e0b" : "var(--ink3)" }}>{form.liked.length}/500</span>
                  </div>
                </div>

                <div className="fb-field">
                  <label className="fb-label">What could be improved? <span style={{ color: "var(--ink3)", fontWeight: 500, fontSize: 10 }}>Optional</span></label>
                  <textarea
                    className="fb-textarea"
                    placeholder="More time on deployment would have been great..."
                    rows={3}
                    value={form.improve}
                    onChange={e => { if (e.target.value.length <= 400) set("improve")(e) }}
                  />
                </div>

                <div className="fb-divider"/>

                {/* Recommend */}
                <div className="fb-section-label">Would You Recommend?</div>
                <div className="fb-recommend-row" style={{ marginBottom: 24 }}>
                  {["Definitely Yes", "Probably Yes", "Not Sure"].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      className={`fb-recommend-btn${form.recommend === opt ? " sel" : ""}`}
                      onClick={() => setForm(f => ({ ...f, recommend: opt }))}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="fb-field">
                  <label className="fb-label">What topics should we cover next? <span style={{ color: "var(--ink3)", fontWeight: 500, fontSize: 10 }}>Optional</span></label>
                  <input
                    className="fb-input"
                    placeholder="e.g. System Design, LLM Fine-tuning, Open Source..."
                    value={form.nextTopic}
                    onChange={set("nextTopic")}
                  />
                </div>

                {serverError && (
                  <div style={{ padding: "12px 16px", borderRadius: 10, background: "#fff1f2", border: "1px solid rgba(244,63,94,.25)", fontSize: 13, fontWeight: 600, color: "#f43f5e", marginBottom: 16 }}>
                    {serverError}
                  </div>
                )}

                <button type="submit" className="fb-submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "fb-spin 1s linear infinite" }}>
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Feedback
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </>
                  )}
                </button>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 14, fontSize: 12, color: "var(--ink3)", fontWeight: 600 }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                  Your feedback appears live on the bootcamp page
                </div>

              </div>
            </form>
          )}

        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `@media(max-width:520px){.fb-name-grid{grid-template-columns:1fr!important;}}` }} />
      <Footer />
    </>
  )
}
