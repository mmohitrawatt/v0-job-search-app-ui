"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Footer } from "@/components/landing/footer"

// ─── CSS — exact same as hackathon page ─────────────────────────────────────
const CSS = `
  :root {
    --ink:    #09090f;
    --ink2:   #3d3d52;
    --ink3:   #8a8aa8;
    --white:  #ffffff;
    --cream:  #f7f7fb;
    --cream2: #f0f0f8;
    --border: rgba(10,10,20,0.08);
    --borderM:rgba(10,10,20,0.16);
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
    --shadow-lg:  0 12px 48px rgba(10,10,20,0.12);
    --spring: cubic-bezier(.34,1.56,.64,1);
    --ease-out: cubic-bezier(.16,1,.3,1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; background: var(--cream); }

  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes pulse-dot {
    0%,100% { transform: scale(1); opacity:.9; }
    50%      { transform: scale(1.25); opacity:1; }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes check-pop {
    0%   { transform: scale(0) rotate(-12deg); opacity:0; }
    60%  { transform: scale(1.22) rotate(4deg); opacity:1; }
    100% { transform: scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes confetti-fall {
    0%   { transform: translateY(-24px) rotate(0deg); opacity:1; }
    100% { transform: translateY(110px) rotate(720deg); opacity:0; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .shimmer {
    background: linear-gradient(90deg, #1d3a8f 0%, #3b52f0 28%, #5a6ef4 48%, #3b52f0 68%, #1d3a8f 100%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 5s linear infinite;
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
  .btn-primary:disabled { opacity:.65; cursor:not-allowed; transform:none; }

  .h-field {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--cream);
    font-size: 14px;
    font-weight: 500;
    color: var(--ink);
    outline: none;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
    font-family: inherit;
  }
  .h-field:focus {
    border-color: var(--ind);
    background: white;
    box-shadow: 0 0 0 3px rgba(29,58,143,.1);
  }
  .h-field::placeholder { color: var(--ink3); font-weight: 400; }
  .h-field.error { border-color: var(--rose); }

  .upload-area {
    width: 100%;
    padding: 20px;
    border-radius: 14px;
    border: 2px dashed var(--border);
    background: var(--cream);
    text-align: center;
    cursor: pointer;
    transition: all .2s ease;
  }
  .upload-area:hover { border-color: rgba(29,58,143,.35); background: var(--ind-l); }
  .upload-area.has-file { border-color: var(--grn); background: var(--grn-l); border-style: solid; }

  .step-badge {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--ind); color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; flex-shrink: 0;
  }

  .success-check { animation: check-pop .5s var(--spring) both; }
  .fade-up { animation: fade-up .6s var(--ease-out) both; }
  .spin { animation: spin 1s linear infinite; }

  @media (max-width: 900px) {
    .page-grid { grid-template-columns: 1fr !important; }
    .sticky-col { position: static !important; }
    .form-2col { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 640px) {
    .page-wrap { padding: 28px 16px !important; }
    .form-card { padding: 20px 16px !important; }
  }
`

const QR_IMAGE_SRC = "/qr-jobingen.jpeg"
const UPI_ID = "jobingen@upi"

type FormData = {
  name: string
  email: string
  phone: string
  college: string
  upi_transaction_id: string
}

const INIT: FormData = { name: "", email: "", phone: "", college: "", upi_transaction_id: "" }

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", letterSpacing: ".01em" }}>
        {label}
      </label>
      {children}
      {error && <div style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{error}</div>}
    </div>
  )
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="spin" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function SuccessScreen({ name }: { name: string }) {
  const dots = ["#6074f3", "#34d399", "#fb7185", "#fbbf24", "#60a5fa", "#8c9df6", "#f472b6"]
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--cream)", padding: "40px 24px", position: "relative", overflow: "hidden",
    }}>
      {dots.map((c, i) => (
        <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: c, left: `${12 + i * 11}%`, top: "20%", animation: `confetti-fall ${1.2 + i * 0.15}s ease-out ${i * 0.08}s both` }} />
      ))}
      {dots.map((c, i) => (
        <div key={`b${i}`} style={{ position: "absolute", width: 6, height: 6, borderRadius: 2, background: c, left: `${8 + i * 12}%`, top: "15%", animation: `confetti-fall ${1.4 + i * 0.12}s ease-out ${0.1 + i * 0.07}s both` }} />
      ))}

      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }} className="fade-up">
        <div className="success-check" style={{
          width: 88, height: 88, borderRadius: "50%",
          background: "linear-gradient(135deg, #1d3a8f, #2548c5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 28px", boxShadow: "0 16px 48px rgba(29,58,143,0.32)",
        }}>
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <path d="M10 21L17 28L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ind)", marginBottom: 10, textTransform: "uppercase", letterSpacing: ".06em" }}>
          Registration Received!
        </div>
        <h1 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 900, letterSpacing: "-.03em", color: "var(--ink)", margin: "0 0 14px", lineHeight: 1.1 }}>
          Welcome, <span className="shimmer">{name.split(" ")[0]}!</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.72, margin: "0 0 32px", maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
          Your seat for the Recursion Deep Dive Bootcamp has been reserved. We will verify your payment and send session details to your email.
        </p>

        <div style={{ borderRadius: 20, padding: "20px 24px", background: "white", border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)", textAlign: "left", marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--ink3)", marginBottom: 14 }}>
            What happens next
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🔍", text: "We verify your UPI transaction ID within 24 hours" },
              { icon: "📧", text: "Confirmation email sent once payment is verified" },
              { icon: "💬", text: "WhatsApp group link shared before the session" },
              { icon: "🗓️", text: "Session on 29 April · 7:30 PM – 10:30 PM (IST)" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>{s.icon}</span>
                <span style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        <a href="/" className="btn btn-primary" style={{ fontSize: 14, fontWeight: 800, padding: "13px 28px", borderRadius: 14 }}>
          Back to Home
        </a>
      </div>
    </div>
  )
}

function UpiPaymentCard() {
  const [copied, setCopied] = useState(false)
  const copyUpi = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ borderRadius: 20, border: "1.5px solid var(--border)", boxShadow: "var(--shadow-md)", overflow: "hidden", background: "white" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1d3a8f 0%, #2548c5 100%)", padding: "18px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
          💳
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: ".07em" }}>
            Registration Fee
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "white", lineHeight: 1.1 }}>
            ₹29 <span style={{ fontSize: 13, fontWeight: 500, opacity: .7 }}>only</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px" }}>
        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {[
            { n: "1", text: "Scan the QR code or copy the UPI ID below" },
            { n: "2", text: "Pay ₹29 using any UPI app" },
            { n: "3", text: "Enter your UPI Transaction ID in the form" },
          ].map((s) => (
            <div key={s.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div className="step-badge">{s.n}</div>
              <span style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, paddingTop: 4 }}>{s.text}</span>
            </div>
          ))}
        </div>

        {/* QR Code */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "20px", borderRadius: 16, background: "var(--cream)", border: "1.5px solid var(--border)", marginBottom: 16 }}>
          <div style={{ width: 160, height: 160, borderRadius: 12, overflow: "hidden", background: "white", border: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={QR_IMAGE_SRC}
              alt="UPI QR Code"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onError={(e) => {
                const parent = (e.target as HTMLImageElement).parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;color:#8a8aa8;font-size:12px;text-align:center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                        <rect x="3" y="14" width="7" height="7" rx="1"/>
                        <path d="M14 14h1v1h-1zM17 14h1v1h-1zM14 17h1v1h-1zM17 17h1v1h-1z"/>
                      </svg>
                      <span>Add QR code<br/>at /public/<br/>qr-jobingen.png</span>
                    </div>
                  `
                }
              }}
            />
          </div>

          {/* UPI ID */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>
              UPI ID
            </div>
            <button onClick={copyUpi} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, border: "1.5px solid var(--border)", background: "white", cursor: "pointer", transition: "all .2s", fontFamily: "inherit" }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "var(--ind)", letterSpacing: ".01em" }}>{UPI_ID}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: copied ? "var(--grn)" : "var(--ink3)" }}>
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
          </div>
        </div>

        {/* App logos */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "var(--ink3)", fontWeight: 600 }}>Pay with:</span>
          {["Paytm", "PhonePe", "Google Pay", "BHIM"].map((app) => (
            <span key={app} style={{ fontSize: 11, fontWeight: 700, color: "var(--ind)", padding: "3px 8px", borderRadius: 6, background: "var(--ind-l)" }}>
              {app}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 10, background: "var(--amb-l)", border: "1px solid rgba(245,158,11,.2)", fontSize: 12, color: "var(--ink2)", lineHeight: 1.55 }}>
          Scan the QR code or send payment using any UPI app such as Paytm, PhonePe, Google Pay, or your banking app. Then enter your transaction ID in the form below.
        </div>
      </div>
    </div>
  )
}

export default function RecursionBootcampPage() {
  const [form, setForm] = useState<FormData>(INIT)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotName, setScreenshotName] = useState("")
  const [screenshotError, setScreenshotError] = useState("")
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function set(key: keyof FormData, val: string) {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: "" }))
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
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim()) e.name = "Name is required."
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required."
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "10-digit phone number required."
    if (!form.college.trim()) e.college = "College name is required."
    if (!form.upi_transaction_id.trim()) e.upi_transaction_id = "UPI Transaction ID is required."
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (!screenshot) setScreenshotError("Payment screenshot is required.")
    else setScreenshotError("")
    if (Object.keys(errs).length || !screenshot) { setErrors(errs); return }
    setLoading(true)
    setServerError("")
    try {
      const fd = new FormData()
      fd.append("name", form.name.trim())
      fd.append("email", form.email.trim())
      fd.append("phone", form.phone.trim())
      fd.append("college", form.college.trim())
      fd.append("upi_transaction_id", form.upi_transaction_id.trim())
      if (screenshot) fd.append("screenshot", screenshot)

      const res = await fetch("/api/recursion-bootcamp", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || "Something went wrong. Please try again."); setLoading(false); return }
      setSubmitted(true)
    } catch {
      setServerError("Network error. Please check your connection and try again.")
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <SuccessScreen name={form.name} />
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", flexDirection: "column" }}>
        <div className="page-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 28px" }}>

          {/* ── Page Header ── */}
          <div style={{ marginBottom: 40, maxWidth: 600 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14,
              padding: "5px 14px", borderRadius: 99, background: "var(--ind-l)",
              border: "1px solid rgba(29,58,143,.2)",
              fontSize: 11, fontWeight: 800, color: "var(--ind)", textTransform: "uppercase", letterSpacing: ".07em",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ind)", animation: "pulse-dot 2s infinite" }} />
              Live Bootcamp · 29 April · 7:30 PM – 10:30 PM
            </div>
            <h1 style={{ fontSize: "clamp(28px,3.8vw,46px)", fontWeight: 900, letterSpacing: "-.03em", color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.08 }}>
              Register for the<br />
              <span className="shimmer">Recursion Deep Dive</span>
            </h1>
            <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.7, maxWidth: 480 }}>
              From call stack to backtracking mastery — live session in C++ · Only ₹29 · Seats limited.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {[
                { icon: "📅", text: "29 April 2026" },
                { icon: "🕖", text: "7:30 PM – 10:30 PM" },
                { icon: "⏱", text: "3 Hours Live" },
              ].map((b) => (
                <div key={b.text} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99, background: "white", border: "1.5px solid var(--border)", fontSize: 12, fontWeight: 700, color: "var(--ink2)" }}>
                  <span>{b.icon}</span>{b.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── 2-col grid ── */}
          <div className="page-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>

            {/* LEFT: Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-card" style={{ background: "white", borderRadius: 24, border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)", padding: "32px", display: "flex", flexDirection: "column", gap: 22 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)", marginBottom: -6 }}>
                  Participant Details
                </div>

                {/* Name + Email */}
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field label="Full Name *" error={errors.name}>
                    <input className={`h-field${errors.name ? " error" : ""}`} placeholder="Arjun Sharma" value={form.name} onChange={(e) => set("name", e.target.value)} />
                  </Field>
                  <Field label="Email Address *" error={errors.email}>
                    <input className={`h-field${errors.email ? " error" : ""}`} type="email" placeholder="arjun@gmail.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </Field>
                </div>

                {/* Phone + College */}
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field label="Phone Number *" error={errors.phone}>
                    <input className={`h-field${errors.phone ? " error" : ""}`} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                  </Field>
                  <Field label="College / Institution *" error={errors.college}>
                    <input className={`h-field${errors.college ? " error" : ""}`} placeholder="NIT Allahabad" value={form.college} onChange={(e) => set("college", e.target.value)} />
                  </Field>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "var(--border)" }} />

                {/* Payment */}
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)", marginBottom: 16 }}>Payment Verification</div>

                  <Field label="UPI Transaction ID *" error={errors.upi_transaction_id}>
                    <input className={`h-field${errors.upi_transaction_id ? " error" : ""}`} placeholder="e.g. 123456789012" value={form.upi_transaction_id} onChange={(e) => set("upi_transaction_id", e.target.value)} />
                    <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 4 }}>
                      Find this in your UPI app under transaction history after payment.
                    </div>
                  </Field>

                  <div style={{ marginTop: 16 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", letterSpacing: ".01em", display: "block", marginBottom: 6 }}>
                      Payment Screenshot <span style={{ color: "var(--rose)" }}>*</span>
                    </label>
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
                    <div className={`upload-area${screenshotName ? " has-file" : ""}${screenshotError ? " error" : ""}`} onClick={() => fileRef.current?.click()}>
                      {screenshotName ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4" stroke="var(--grn)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="10" stroke="var(--grn)" strokeWidth="2" />
                          </svg>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--grn)" }}>{screenshotName}</span>
                        </div>
                      ) : (
                        <div>
                          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" style={{ margin: "0 auto 8px" }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round" />
                            <polyline points="17 8 12 3 7 8" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="12" y1="3" x2="12" y2="15" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink3)" }}>Click to upload payment screenshot</div>
                          <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 4 }}>PNG, JPG up to 5MB</div>
                        </div>
                      )}
                    </div>
                    {screenshotError && <div style={{ fontSize: 11, color: "var(--rose)", marginTop: 4 }}>{screenshotError}</div>}
                  </div>
                </div>

                {serverError && (
                  <div style={{ padding: "12px 16px", borderRadius: 10, background: "var(--rose-l)", border: "1px solid rgba(244,63,94,.25)", fontSize: 13, fontWeight: 600, color: "var(--rose)" }}>
                    {serverError}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn btn-primary" style={{ fontSize: 15, fontWeight: 900, padding: "15px 28px", borderRadius: 16, width: "100%", gap: 10 }}>
                  {loading
                    ? <><Spinner /> Submitting registration...</>
                    : <>Submit Registration — ₹29 paid
                        <svg width="16" height="16" fill="none" viewBox="0 0 18 18">
                          <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                  }
                </button>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, flexWrap: "wrap", paddingTop: 4 }}>
                  {["🔒 Secure", "📧 Confirmation email", "✅ Manual verification"].map((t, i) => (
                    <span key={i} style={{ fontSize: 11, color: "var(--ink3)", fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </form>

            {/* RIGHT: UPI card + what you get */}
            <div className="sticky-col" style={{ position: "sticky", top: 76, display: "flex", flexDirection: "column", gap: 16 }}>
              <UpiPaymentCard />

              {/* What you get */}
              <div style={{ borderRadius: 20, border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)", overflow: "hidden", background: "white" }}>
                <div style={{ background: "linear-gradient(135deg, #1d3a8f, #2548c5)", padding: "16px 20px" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: ".07em" }}>What You Get</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "white", marginTop: 4 }}>Recursion Deep Dive</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 4, fontWeight: 600 }}>📅 29 April · 7:30 PM – 10:30 PM</div>
                </div>
                <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "🧠", text: "Base Recursion & Call Stack" },
                    { icon: "🌳", text: "Recursion Trees & Complexity" },
                    { icon: "🔄", text: "Backtracking — N-Queens, Subsets" },
                    { icon: "⚡", text: "Real LeetCode Problems in C++" },
                    { icon: "📄", text: "Session Recording + Resources" },
                    { icon: "🏆", text: "Completion Certificate" },
                  ].map((item) => (
                    <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 16 }}>{item.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)" }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
