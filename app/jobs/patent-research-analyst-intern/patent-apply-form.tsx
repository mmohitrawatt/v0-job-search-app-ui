"use client"

import { useState, useRef } from "react"

const DEGREE_OPTIONS = [
  "B.Tech / M.Tech (Engineering)",
  "BCA / MCA (Computer Applications)",
  "BSc / MSc (Science / Technology / Mathematics)",
  "LLB (Law — IP Interest)",
  "Other",
]

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is a patent and what rights does it grant?",
    hint: "Think about the legal protection an inventor receives.",
  },
  {
    id: 2,
    question: "Why is prior art search important before filing a patent?",
    hint: "Consider what happens if a similar invention already exists.",
  },
  {
    id: 3,
    question: "What does patent analysis involve and why is it useful?",
    hint: "Think about evaluating existing patents for trends and gaps.",
  },
  {
    id: 4,
    question: "What is the purpose of patent drafting?",
    hint: "Consider why precise written claims matter for protection.",
  },
  {
    id: 5,
    question: "How would you check if an invention or similar technology already exists?",
    hint: "Think about patent databases, search strategies, and tools.",
  },
]

type Step = "form" | "quiz" | "done"

export default function PatentApplyForm() {
  const [step, setStep] = useState<Step>("form")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [college, setCollege] = useState("")
  const [degree, setDegree] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFormNext(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!name.trim()) return setError("Please enter your name.")
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email.")
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) return setError("Please enter a valid 10-digit phone number.")
    if (!college.trim()) return setError("Please enter your college name.")
    if (!degree) return setError("Please select your degree.")
    if (!file) return setError("Please upload your resume.")
    setStep("quiz")
    // Scroll to top of apply section
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  async function handleQuizSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const unanswered = QUIZ_QUESTIONS.find((q) => !answers[q.id]?.trim())
    if (unanswered) return setError(`Please answer question ${unanswered.id}.`)

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append("name", name.trim())
      fd.append("email", email.trim().toLowerCase())
      fd.append("phone", phone.trim())
      fd.append("college", college.trim())
      fd.append("degree", degree)
      fd.append("linkedin", linkedin.trim())
      fd.append("job_slug", "patent-research-analyst-intern")
      fd.append("resume", file!)
      fd.append("quiz_answers", JSON.stringify(QUIZ_QUESTIONS.map((q) => ({ question: q.question, answer: answers[q.id] }))))

      const res = await fetch("/api/jobs/apply", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed.")
      setStep("done")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const completed = Object.values(answers).filter((a) => a.trim()).length

  /* ─── Success ────────────────────────────────── */
  if (step === "done") {
    return (
      <div>
        <StepIndicator current={3} />
        <div
          style={{
            background: "linear-gradient(135deg,#f0fdf4,#ecfdf5)",
            border: "1px solid #bbf7d0",
            borderRadius: 20,
            padding: "clamp(32px,5vw,56px) clamp(20px,4vw,40px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#dcfce7",
              border: "2px solid #bbf7d0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: "#15803d", margin: "0 0 10px", letterSpacing: "-.4px" }}>
            Application Submitted
          </h3>
          <p style={{ fontSize: 16, color: "#166534", margin: "0 0 6px", lineHeight: 1.6 }}>
            Thank you, <strong>{name}</strong>. Your application and quiz have been recorded.
          </p>
          <p style={{ fontSize: 14, color: "#15803d80", margin: 0 }}>Our team will review your profile and reach out soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <StepIndicator current={step === "form" ? 1 : 2} />

      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 12,
            padding: "14px 18px",
            color: "#dc2626",
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2" />
            <path d="M12 8v4m0 4h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {error}
        </div>
      )}

      {/* ─── Form ──────────────────────────────── */}
      {step === "form" && (
        <form onSubmit={handleFormNext} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-.4px" }}>
              Apply for this role
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
              Fill in your details below, then complete a short quiz.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
            <Field label="Full Name" required value={name} onChange={setName} placeholder="Your full name" />
            <Field label="Email Address" required value={email} onChange={setEmail} placeholder="you@email.com" type="email" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
            <Field label="Phone Number" required value={phone} onChange={setPhone} placeholder="+91 98765 43210" type="tel" />
            <Field label="College / University" required value={college} onChange={setCollege} placeholder="Your institution" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
            <div>
              <label style={labelStyle}>
                Degree <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                style={{
                  ...inputBase,
                  color: degree ? "#0f172a" : "#94a3b8",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                }}
              >
                <option value="" disabled>Select your degree</option>
                {DEGREE_OPTIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <Field label="LinkedIn Profile" value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/yourprofile" />
          </div>

          {/* Resume */}
          <div>
            <label style={labelStyle}>
              Resume <span style={{ color: "#dc2626" }}>*</span>
              <span style={{ fontWeight: 400, color: "#94a3b8", marginLeft: 8, fontSize: 12 }}>PDF, DOC, DOCX — max 10MB</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: `2px dashed ${file ? "#86efac" : "#d1d5db"}`,
                borderRadius: 14,
                padding: "clamp(24px,4vw,36px) 20px",
                textAlign: "center",
                cursor: "pointer",
                background: file ? "#f0fdf4" : "#fafafa",
                transition: "all .2s",
              }}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              {file ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#15803d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#166534" }}>{file.name}</div>
                    <div style={{ fontSize: 12, color: "#15803d" }}>{(file.size / 1024).toFixed(0)} KB &middot; Click to change</div>
                  </div>
                </div>
              ) : (
                <div>
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 10px", display: "block" }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>Drop your resume or click to upload</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>PDF, DOC, or DOCX accepted</div>
                </div>
              )}
            </div>
          </div>

          <button type="submit" style={primaryBtn}>
            Continue to Quiz
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      )}

      {/* ─── Quiz ──────────────────────────────── */}
      {step === "quiz" && (
        <form onSubmit={handleQuizSubmit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-.4px" }}>
              Patent Research Quiz
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", margin: "0 0 16px", lineHeight: 1.5 }}>
              Answer all 5 questions to complete your application.
            </p>
            {/* Progress bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(completed / QUIZ_QUESTIONS.length) * 100}%`,
                    background: completed === QUIZ_QUESTIONS.length ? "#15803d" : "linear-gradient(90deg,#4338ca,#818cf8)",
                    borderRadius: 3,
                    transition: "width .4s ease",
                  }}
                />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: completed === QUIZ_QUESTIONS.length ? "#15803d" : "#4338ca", minWidth: 32 }}>
                {completed}/{QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {QUIZ_QUESTIONS.map((q, i) => {
              const answered = !!answers[q.id]?.trim()
              return (
                <div
                  key={q.id}
                  style={{
                    background: answered ? "#fafffe" : "#fafafa",
                    border: `1.5px solid ${answered ? "#86efac" : "#e5e7eb"}`,
                    borderRadius: 16,
                    padding: "22px 24px",
                    transition: "all .25s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 9,
                        background: answered ? "#15803d" : "#1d3a8f",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 800,
                        flexShrink: 0,
                        transition: "background .25s",
                      }}
                    >
                      {answered ? (
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", lineHeight: 1.45 }}>{q.question}</div>
                      <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, lineHeight: 1.4 }}>{q.hint}</div>
                    </div>
                  </div>
                  <textarea
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder="Type your answer here..."
                    rows={3}
                    style={{
                      ...inputBase,
                      resize: "vertical",
                      lineHeight: 1.7,
                      minHeight: 80,
                    }}
                  />
                </div>
              )
            })}
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
            <button
              type="button"
              onClick={() => { setStep("form"); setError("") }}
              style={outlineBtn}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <button type="submit" disabled={submitting} style={{ ...primaryBtn, opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer" }}>
              {submitting ? (
                <>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "ip-spin .6s linear infinite" }} />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes ip-spin{to{transform:rotate(360deg)}}` }} />
        </form>
      )}
    </div>
  )
}

/* ─── Step Indicator ───────────────────────────────── */

function StepIndicator({ current }: { current: number }) {
  const steps = [
    { n: 1, label: "Details" },
    { n: 2, label: "Quiz" },
    { n: 3, label: "Done" },
  ]
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
      {steps.map((s, i) => (
        <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: current >= s.n ? "#1d3a8f" : "#f1f5f9",
                color: current >= s.n ? "#fff" : "#94a3b8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 800,
                transition: "all .3s",
                border: current >= s.n ? "none" : "1.5px solid #e2e8f0",
              }}
            >
              {current > s.n ? (
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                s.n
              )}
            </div>
            <span style={{ fontSize: 14, fontWeight: current >= s.n ? 700 : 500, color: current >= s.n ? "#1d3a8f" : "#94a3b8", whiteSpace: "nowrap" }}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 2,
                background: current > s.n ? "#1d3a8f" : "#e5e7eb",
                margin: "0 14px",
                borderRadius: 1,
                transition: "background .3s",
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Shared Styles ────────────────────────────────── */

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "#374151",
  display: "block",
  marginBottom: 8,
}

const inputBase: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #e5e7eb",
  borderRadius: 12,
  padding: "12px 16px",
  fontSize: 15,
  color: "#0f172a",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color .2s, box-shadow .2s",
}

const primaryBtn: React.CSSProperties = {
  flex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  background: "#1d3a8f",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  padding: "15px 28px",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  letterSpacing: "-.2px",
  transition: "opacity .2s",
  fontFamily: "inherit",
}

const outlineBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "transparent",
  color: "#475569",
  border: "1.5px solid #d1d5db",
  borderRadius: 12,
  padding: "14px 24px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "all .2s",
}

/* ─── Field ────────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputBase}
        onFocus={(e) => { e.target.style.borderColor = "#1d3a8f"; e.target.style.boxShadow = "0 0 0 3px rgba(29,58,143,.1)" }}
        onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none" }}
      />
    </div>
  )
}
