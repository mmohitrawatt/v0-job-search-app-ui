"use client"

import { useState, useRef, ChangeEvent } from "react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

/* ─── CSS ────────────────────────────────────────────────── */
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
    --vio:    #7c3aed;
    --vio-l:  #f5f3ff;
    --grn:    #10b981;
    --grn-l:  #ecfdf5;
    --amb:    #f59e0b;
    --amb-l:  #fffbeb;
    --rose:   #f43f5e;
    --rose-l: #fff1f2;
    --shadow-sm:  0 2px 8px rgba(10,10,20,0.05);
    --shadow-md:  0 4px 24px rgba(10,10,20,0.08);
    --spring: cubic-bezier(.34,1.56,.64,1);
    --ease-out: cubic-bezier(.16,1,.3,1);
  }

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
  @keyframes rbspin { to { transform: rotate(360deg) } }
  @keyframes rbping { 0%,100% { opacity:.6; transform: scale(1) } 50% { opacity:.2; transform: scale(1.35) } }

  .shimmer-vio {
    background: linear-gradient(90deg, #7c3aed 0%, #4f46e5 28%, #8b5cf6 48%, #4f46e5 68%, #7c3aed 100%);
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
    background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
    box-shadow: 0 6px 28px rgba(124,58,237,.32);
    color: white;
  }
  .btn-primary:hover { box-shadow: 0 12px 40px rgba(124,58,237,.45); }
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
    border-color: var(--vio);
    background: white;
    box-shadow: 0 0 0 3px rgba(124,58,237,.1);
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
  .upload-area:hover { border-color: rgba(124,58,237,.35); background: var(--vio-l); }
  .upload-area.has-file { border-color: var(--grn); background: var(--grn-l); border-style: solid; }

  .step-badge {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--vio); color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; flex-shrink: 0;
  }

  .success-check { animation: check-pop .5s var(--spring) both; }
  .fade-up { animation: fade-up .6s var(--ease-out) both; }
  .spin { animation: spin 1s linear infinite; }

  .rb-learn-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.08) !important; transform: translateY(-1px) }

  @media (max-width: 900px) {
    .page-grid { grid-template-columns: 1fr !important; }
    .sticky-col { position: static !important; }
    .form-2col { grid-template-columns: 1fr !important; }
    .rb-overview-grid { grid-template-columns: 1fr !important; gap: 32px !important }
    .rb-two-col { grid-template-columns: 1fr !important; gap: 20px !important }
  }
  @media (max-width: 640px) {
    .rb-nav-spacer { height: 72px !important }
    .rb-hero { padding: 48px 16px 44px !important }
    .rb-stats { grid-template-columns: repeat(2,1fr) !important; width: calc(100% - 32px) !important }
    .rb-stat-cell:nth-child(1) { border-bottom: 1px solid #f1f5f9 }
    .rb-stat-cell:nth-child(2) { border-right: none !important; border-bottom: 1px solid #f1f5f9 }
    .rb-stat-cell:nth-child(3) { border-right: none !important }
    .rb-stat-cell { padding: 12px 14px !important }
    .rb-form-grid { grid-template-columns: 1fr !important }
    .rb-form-pad { padding: 24px 20px !important }
    .page-wrap { padding: 28px 16px !important }
    .form-card { padding: 20px 16px !important }
  }
`

const QR_IMAGE_SRC = "/qr-jobingen.png"
const UPI_ID = "jobingen@upi"

/* ─── Types ─────────────────────────────────────────────── */
type Year = "1st Year Student" | "2nd Year Student" | "3rd Year Student" | "Final Year" | "Working Professional"
type Level = "Beginner" | "Intermediate" | "Advanced"
type Lang = "C++" | "Python" | "Java"

/* ─── Data ───────────────────────────────────────────────── */
const LEARN_CARDS = [
  {
    n: "01",
    title: "Base Recursion Fundamentals",
    points: ["Base case vs recursive case", "Stack visualization", "Factorial and Fibonacci examples"],
    color: "#1d3a8f", bg: "#eef1fd",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  },
  {
    n: "02",
    title: "Recursive Tree & Depth Analysis",
    points: ["Visualizing recursion trees", "Understanding branching", "Time complexity from recursion depth"],
    color: "#7c3aed", bg: "#f5f3ff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>,
  },
  {
    n: "03",
    title: "Parameter Passing & State",
    points: ["Passing parameters correctly", "Managing recursion state", "Avoiding unnecessary copies"],
    color: "#0891b2", bg: "#ecfeff",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    n: "04",
    title: "Transition to Backtracking",
    points: ["Exploring all possibilities", "Undoing choices (backtrack step)", "DFS mindset"],
    color: "#16a34a", bg: "#f0fdf4",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
  },
  {
    n: "05",
    title: "Real Backtracking Problems",
    points: ["Subsets & Permutations", "Combination Sum", "N-Queens problem"],
    color: "#dc2626", bg: "#fef2f2",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
]

const OUTCOMES = [
  { icon: "🧠", title: "Deep Recursion Intuition",  desc: "Build lasting mental models for how recursive calls expand and resolve." },
  { icon: "⚡", title: "Backtracking Mastery",       desc: "Confidently solve subset, permutation, and constraint problems." },
  { icon: "🎯", title: "LeetCode Med–Hard Ready",    desc: "Strong foundation to tackle medium and hard recursive problems." },
  { icon: "🔍", title: "Complexity Thinking",        desc: "Analyze time and space from recursion trees — not just formulas." },
]

const PREREQS = [
  "Basic C++ knowledge (functions, loops, arrays)",
  "Comfortable writing simple programs",
  "Basic understanding of vectors or arrays",
]

/* ─── Small components ────────────────────────────────────── */
function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-black text-[#7c3aed] uppercase tracking-[0.12em] mb-3">{children}</p>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(22px,3vw,32px)] font-black text-slate-900 tracking-[-0.03em] leading-[1.15] mb-4">
      {children}
    </h2>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", letterSpacing: ".01em" }}>
        {label}
      </label>
      {children}
      {error && (
        <div style={{ fontSize: 11, color: "var(--rose)", fontWeight: 600 }}>{error}</div>
      )}
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
  const dots = ["#7c3aed", "#34d399", "#fb7185", "#fbbf24", "#60a5fa", "#8c9df6", "#f472b6"]
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--cream)", padding: "40px 24px", position: "relative", overflow: "hidden",
    }}>
      {dots.map((c, i) => (
        <div key={i} style={{
          position: "absolute", width: 8, height: 8, borderRadius: "50%", background: c,
          left: `${12 + i * 11}%`, top: "20%",
          animation: `confetti-fall ${1.2 + i * 0.15}s ease-out ${i * 0.08}s both`,
        }} />
      ))}
      {dots.map((c, i) => (
        <div key={`b${i}`} style={{
          position: "absolute", width: 6, height: 6, borderRadius: 2, background: c,
          left: `${8 + i * 12}%`, top: "15%",
          animation: `confetti-fall ${1.4 + i * 0.12}s ease-out ${0.1 + i * 0.07}s both`,
        }} />
      ))}

      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }} className="fade-up">
        <div
          className="success-check"
          style={{
            width: 88, height: 88, borderRadius: "50%",
            background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px", boxShadow: "0 16px 48px rgba(124,58,237,0.32)",
          }}
        >
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <path d="M10 21L17 28L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--vio)", marginBottom: 10, textTransform: "uppercase", letterSpacing: ".06em" }}>
          Registration Received!
        </div>
        <h1 style={{
          fontSize: "clamp(26px,4vw,38px)", fontWeight: 900, letterSpacing: "-.03em",
          color: "var(--ink)", margin: "0 0 14px", lineHeight: 1.1,
        }}>
          Welcome, <span className="shimmer-vio">{name.split(" ")[0]}!</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.72, margin: "0 0 32px", maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
          Your bootcamp registration has been submitted. We will verify your payment and send session details to your email.
        </p>

        <div style={{
          borderRadius: 20, padding: "20px 24px", background: "white",
          border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)",
          textAlign: "left", marginBottom: 24,
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--ink3)", marginBottom: 14 }}>
            What happens next
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🔍", text: "We verify your UPI transaction ID within 24 hours" },
              { icon: "📧", text: "Confirmation email sent once payment is verified" },
              { icon: "💬", text: "WhatsApp group link shared before the session" },
              { icon: "🚀", text: "Session link and materials sent on the day" },
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
    <div style={{
      borderRadius: 20, border: "1.5px solid var(--border)",
      boxShadow: "var(--shadow-md)", overflow: "hidden", background: "white",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
        padding: "18px 24px", display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
        }}>
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
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
          padding: "20px", borderRadius: 16, background: "var(--cream)",
          border: "1.5px solid var(--border)", marginBottom: 16,
        }}>
          <div style={{
            width: 160, height: 160, borderRadius: 12, overflow: "hidden",
            background: "white", border: "1.5px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 8,
          }}>
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
                      <span>QR Code</span>
                    </div>
                  `
                }
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>
              UPI ID
            </div>
            <button
              onClick={copyUpi}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 10,
                border: "1.5px solid var(--border)", background: "white",
                cursor: "pointer", transition: "all .2s",
                fontFamily: "inherit",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 800, color: "var(--vio)", letterSpacing: ".01em" }}>
                {UPI_ID}
              </span>
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
            <span key={app} style={{
              fontSize: 11, fontWeight: 700, color: "var(--vio)",
              padding: "3px 8px", borderRadius: 6, background: "var(--vio-l)",
            }}>
              {app}
            </span>
          ))}
        </div>

        <div style={{
          marginTop: 16, padding: "12px 14px", borderRadius: 10,
          background: "var(--amb-l)", border: "1px solid rgba(245,158,11,.2)",
          fontSize: 12, color: "var(--ink2)", lineHeight: 1.55,
        }}>
          Scan the QR code or send payment using any UPI app. Then enter your transaction ID in the form.
        </div>
      </div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────── */
export default function RecursionBootcampPage() {
  const formRef = useRef<HTMLDivElement>(null)

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [serverError, setServerError] = useState("")

  const [fullName, setFullName]   = useState("")
  const [email, setEmail]         = useState("")
  const [phone, setPhone]         = useState("")
  const [college, setCollege]     = useState("")
  const [year, setYear]           = useState<Year | "">("")
  const [level, setLevel]         = useState<Level | "">("")
  const [lang, setLang]           = useState<Lang>("C++")
  const [upiTxnId, setUpiTxnId]   = useState("")
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotName, setScreenshotName] = useState("")
  const [errors, setErrors]       = useState<Record<string, string>>({})

  const fileRef = useRef<HTMLInputElement>(null)

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function setErr(key: string, val: string) {
    setErrors(e => ({ ...e, [key]: val }))
    setServerError("")
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setScreenshot(file)
    setScreenshotName(file.name)
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!fullName.trim()) e.fullName = "Name is required."
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email required."
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) e.phone = "10-digit phone required."
    if (!college.trim()) e.college = "College name is required."
    if (!year) e.year = "Please select your year."
    if (!level) e.level = "Please select experience level."
    if (!upiTxnId.trim()) e.upiTxnId = "UPI Transaction ID is required."
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setServerError("")

    try {
      const fd = new FormData()
      fd.append("full_name", fullName.trim())
      fd.append("email", email.trim())
      fd.append("phone", phone.trim())
      fd.append("college", college.trim())
      fd.append("current_year", year)
      fd.append("experience_level", level)
      fd.append("preferred_language", lang)
      fd.append("upi_transaction_id", upiTxnId.trim())
      if (screenshot) fd.append("screenshot", screenshot)

      const res = await fetch("/api/recursion-bootcamp", { method: "POST", body: fd })
      const data = await res.json()

      if (!res.ok) {
        setServerError(data.error || "Registration failed. Please try again.")
        setLoading(false)
        return
      }

      setSubmitted(true)
    } catch {
      setServerError("Network error. Please check your connection.")
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <SuccessScreen name={fullName} />
      </>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div style={{ minHeight: "100vh", background: "#f8faff", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
        <Navbar />
        <div style={{ height: 108 }} className="rb-nav-spacer" />

        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <section className="rb-hero" style={{ background: "linear-gradient(180deg,#f0f4ff 0%,#e8edff 60%,#f8faff 100%)", padding: "72px 24px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "-15%", right: "3%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: "-10%", left: "2%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,58,143,0.06) 0%,transparent 70%)" }} />
            <div style={{ position: "absolute", top: "30%", left: "8%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 70%)" }} />
          </div>

          <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", background: "white", border: "1.5px solid #dde5ff", borderRadius: 99, marginBottom: 28, boxShadow: "0 2px 12px rgba(124,58,237,0.1)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7c3aed", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: "#7c3aed", letterSpacing: ".07em", textTransform: "uppercase" }}>Live Bootcamp · Recursion & Backtracking</span>
            </div>

            <h1 style={{ fontSize: "clamp(26px,4.5vw,50px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: 20 }}>
              Recursion Deep Dive:{" "}
              <span style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                From Call Stack
              </span>
              {" "}to<br />Backtracking Mastery
            </h1>

            <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.75, maxWidth: 580, margin: "0 auto 16px" }}>
              Master recursion from first principles and develop deep problem-solving skills through structured recursion thinking and backtracking techniques.
            </p>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 40px" }}>
              A focused bootcamp designed to help developers build strong intuition for recursion — understanding how complex problems are solved using recursive depth, stack flow, and backtracking strategies.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              <button onClick={scrollToForm}
                style={{ fontSize: 15, fontWeight: 700, color: "white", padding: "14px 32px", borderRadius: 14, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", boxShadow: "0 4px 20px rgba(124,58,237,0.35)", transition: "all .2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                Register for Bootcamp — ₹29 →
              </button>
              <a href="#curriculum"
                style={{ fontSize: 15, fontWeight: 600, color: "#374151", padding: "14px 28px", borderRadius: 14, border: "1.5px solid #e0e7ff", background: "white", cursor: "pointer", textDecoration: "none", transition: "all .2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f8faff")}
                onMouseLeave={e => (e.currentTarget.style.background = "white")}>
                View Curriculum
              </a>
            </div>

            <div className="rb-stats" style={{ display: "inline-grid", gridTemplateColumns: "repeat(4,1fr)", background: "white", border: "1.5px solid #e0e7ff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(124,58,237,0.08)" }}>
              {[
                { val: "5",    label: "Core Modules"   },
                { val: "C++",  label: "Language"       },
                { val: "Live", label: "Session Format" },
                { val: "₹29",  label: "Only"           },
              ].map((s, i) => (
                <div key={s.label} className="rb-stat-cell" style={{ padding: "16px 24px", textAlign: "center", borderRight: i < 3 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#7c3aed", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SESSION OVERVIEW
        ══════════════════════════════════════════════ */}
        <section style={{ background: "white", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} className="rb-overview-grid">
              <div>
                <SectionLabel>Session Overview</SectionLabel>
                <SectionHeading>A complete deep dive into recursion</SectionHeading>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 20 }}>
                  This session focuses on building strong intuition around recursion depth, stack behavior, and recursive problem-solving patterns.
                </p>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85 }}>
                  Instead of jumping across topics, we go <strong style={{ color: "#1d3a8f" }}>depth-wise into recursion</strong> to understand how problems expand and resolve through recursive calls — giving you the foundation to crack any backtracking problem.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: "🎯", title: "Focused & Structured",  desc: "Every topic builds on the last — no random topic jumping." },
                  { icon: "🧩", title: "Problem-First Approach", desc: "Real LeetCode-style problems from start to finish." },
                  { icon: "📈", title: "Complexity Aware",       desc: "Learn to analyze time and space from the recursion tree." },
                  { icon: "💬", title: "Live Interaction",       desc: "Ask questions, get clarity, and code along in real time." },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: 14, padding: "16px 18px", background: "#fafbff", borderRadius: 14, border: "1px solid #e8ecf4" }}>
                    <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 3 }}>{item.title}</div>
                      <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CURRICULUM
        ══════════════════════════════════════════════ */}
        <section id="curriculum" style={{ padding: "80px 24px", background: "#f8faff" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <SectionLabel>Curriculum</SectionLabel>
              <SectionHeading>What You Will Learn</SectionHeading>
              <p style={{ fontSize: 15, color: "#64748b", maxWidth: 480, margin: "0 auto" }}>
                Five tightly structured modules that take you from recursion basics all the way to real backtracking problems.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {LEARN_CARDS.map((card, i) => (
                <div key={card.n} style={{ display: "flex", gap: 20, background: "white", borderRadius: 18, border: "1.5px solid #e8ecf4", padding: "24px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", transition: "box-shadow .2s, transform .2s" }}
                  className="rb-learn-card">
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: card.bg, color: card.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, border: `1.5px solid ${card.color}20` }}>
                      {card.n}
                    </div>
                    {i < LEARN_CARDS.length - 1 && (
                      <div style={{ width: 2, height: "calc(100% + 16px)", background: `${card.color}18`, borderRadius: 2, margin: "8px auto 0", marginLeft: 21 }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ color: card.color }}>{card.icon}</div>
                      <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>{card.title}</h3>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {card.points.map(p => (
                        <div key={p} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", background: card.bg, borderRadius: 99, border: `1px solid ${card.color}18` }}>
                          <CheckIcon color={card.color} />
                          <span style={{ fontSize: 12.5, fontWeight: 600, color: card.color }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            COMPLEXITY + TECH STACK
        ══════════════════════════════════════════════ */}
        <section style={{ background: "white", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "72px 24px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="rb-two-col">
            <div style={{ background: "#fafbff", borderRadius: 20, border: "1.5px solid #e8ecf4", padding: "32px 30px" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#eef1fd", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Tools & Language</p>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 12 }}>Built in C++</h3>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, marginBottom: 20 }}>
                All examples and problems are coded in C++ — the language most commonly used in competitive programming and DSA interviews.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["vectors and recursion functions", "Passing references correctly", "Organizing recursive logic cleanly", "Writing clean backtracking templates"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckIcon color="#1d3a8f" />
                    <span style={{ fontSize: 13, color: "#374151" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "linear-gradient(135deg,#1d3a8f,#4f46e5)", borderRadius: 20, padding: "32px 30px", color: "white" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </div>
              <p style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.6)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Thinking in Depth</p>
              <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 12 }}>Complexity From Trees</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 24 }}>
                Stop memorizing formulas — learn to derive complexity by reading the recursion tree directly.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Time Complexity",  formula: "O(branching factor ^ depth)",  sub: "Read from the recursion tree width" },
                  { label: "Space Complexity", formula: "O(depth of recursion stack)",   sub: "One frame per recursive call" },
                ].map(c => (
                  <div key={c.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "monospace", marginBottom: 3 }}>{c.formula}</div>
                    <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>{c.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PREREQUISITES + OUTCOMES
        ══════════════════════════════════════════════ */}
        <section style={{ padding: "72px 24px", background: "#f8faff" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 40, alignItems: "start" }} className="rb-two-col">
            <div style={{ background: "white", borderRadius: 20, border: "1.5px solid #e8ecf4", padding: "28px 26px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Prerequisites</p>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 6 }}>What you need</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>
                This bootcamp is beginner-friendly. You don&apos;t need to know recursion — just the basics below.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {PREREQS.map(p => (
                  <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 6, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <CheckIcon color="#16a34a" />
                    </div>
                    <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: "12px 14px", background: "#f5f3ff", borderRadius: 10, border: "1px solid #ede9fe" }}>
                <span style={{ fontSize: 12, color: "#7c3aed", fontWeight: 600 }}>💡 No prior recursion knowledge needed — we start from zero.</span>
              </div>
            </div>

            <div>
              <p style={{ fontSize: 10, fontWeight: 800, color: "#7c3aed", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Outcomes</p>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 6 }}>What You Will Gain</h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 24 }}>
                By the end of this bootcamp, you won&apos;t just know recursion — you&apos;ll think recursively.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {OUTCOMES.map(o => (
                  <div key={o.title} style={{ background: "white", borderRadius: 16, border: "1.5px solid #e8ecf4", padding: "20px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                    <div style={{ fontSize: 26, marginBottom: 10 }}>{o.icon}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{o.title}</div>
                    <div style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.65 }}>{o.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            REGISTRATION FORM
        ══════════════════════════════════════════════ */}
        <section ref={formRef} style={{ background: "var(--cream)", borderTop: "1px solid #f1f5f9", padding: "80px 24px 100px" }}>
          <div className="page-wrap" style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: 40, maxWidth: 600 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14,
                padding: "5px 14px", borderRadius: 99, background: "var(--vio-l)",
                border: "1px solid rgba(124,58,237,.2)",
                fontSize: 11, fontWeight: 800, color: "var(--vio)", textTransform: "uppercase", letterSpacing: ".07em",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--vio)", animation: "pulse-dot 2s infinite" }} />
                Recursion Deep Dive — Register Now
              </div>
              <h1 style={{
                fontSize: "clamp(28px,3.8vw,46px)", fontWeight: 900, letterSpacing: "-.03em",
                color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.08,
              }}>
                Secure Your Seat<br />
                <span className="shimmer-vio">Only ₹29</span>
              </h1>
              <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.7, maxWidth: 480 }}>
                Fill in your details below, pay ₹29 via UPI, and you&apos;re in. We&apos;ll send session details to your email.
              </p>
            </div>

            {/* Grid: form left, UPI card right */}
            <div className="page-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
              {/* ── LEFT: Form ── */}
              <form onSubmit={handleSubmit} noValidate>
                <div
                  className="form-card"
                  style={{
                    background: "white", borderRadius: 24,
                    border: "1.5px solid var(--border)", boxShadow: "var(--shadow-sm)",
                    padding: "32px", display: "flex", flexDirection: "column", gap: 22,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)", marginBottom: -6 }}>
                    Participant Details
                  </div>

                  {/* Row 1: Name + Email */}
                  <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Full Name *" error={errors.fullName}>
                      <input
                        className={`h-field${errors.fullName ? " error" : ""}`}
                        placeholder="Priya Sharma"
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value); setErr("fullName", "") }}
                      />
                    </Field>
                    <Field label="Email Address *" error={errors.email}>
                      <input
                        className={`h-field${errors.email ? " error" : ""}`}
                        type="email"
                        placeholder="you@gmail.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setErr("email", "") }}
                      />
                    </Field>
                  </div>

                  {/* Row 2: Phone + College */}
                  <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Phone Number *" error={errors.phone}>
                      <input
                        className={`h-field${errors.phone ? " error" : ""}`}
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); setErr("phone", "") }}
                      />
                    </Field>
                    <Field label="College / Institution *" error={errors.college}>
                      <input
                        className={`h-field${errors.college ? " error" : ""}`}
                        placeholder="NIT Allahabad"
                        value={college}
                        onChange={(e) => { setCollege(e.target.value); setErr("college", "") }}
                      />
                    </Field>
                  </div>

                  {/* Current Year */}
                  <Field label="Current Year / Status *" error={errors.year}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                      {(["1st Year Student","2nd Year Student","3rd Year Student","Final Year","Working Professional"] as Year[]).map(y => (
                        <button key={y} type="button" onClick={() => { setYear(y); setErr("year", "") }}
                          style={{ padding: "7px 14px", borderRadius: 99, fontSize: 12.5, fontWeight: 600, border: "1.5px solid", cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
                            borderColor: year === y ? "var(--vio)" : "rgba(10,10,20,0.1)",
                            background:  year === y ? "var(--vio)" : "white",
                            color:       year === y ? "white" : "#374151",
                          }}>
                          {y}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Experience Level + Language */}
                  <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Field label="Experience Level *" error={errors.level}>
                      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                        {(["Beginner","Intermediate","Advanced"] as Level[]).map(l => (
                          <button key={l} type="button" onClick={() => { setLevel(l); setErr("level", "") }}
                            style={{ flex: 1, padding: "8px 4px", borderRadius: 10, fontSize: 12, fontWeight: 700, border: "1.5px solid", cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
                              borderColor: level === l ? "var(--vio)" : "rgba(10,10,20,0.1)",
                              background:  level === l ? "var(--vio-l)" : "white",
                              color:       level === l ? "var(--vio)" : "#64748b",
                            }}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </Field>

                    <Field label="Preferred Language">
                      <select value={lang} onChange={e => setLang(e.target.value as Lang)} className="h-field"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36, appearance: "none" }}>
                        <option value="C++">C++</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                      </select>
                    </Field>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "var(--border)" }} />

                  {/* Payment section */}
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)", marginBottom: 16 }}>
                      Payment Verification
                    </div>

                    <Field label="UPI Transaction ID *" error={errors.upiTxnId}>
                      <input
                        className={`h-field${errors.upiTxnId ? " error" : ""}`}
                        placeholder="e.g. 123456789012"
                        value={upiTxnId}
                        onChange={(e) => { setUpiTxnId(e.target.value); setErr("upiTxnId", "") }}
                      />
                      <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 4 }}>
                        Find this in your UPI app under transaction history after payment.
                      </div>
                    </Field>

                    <div style={{ marginTop: 16 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "var(--ink2)", letterSpacing: ".01em", display: "block", marginBottom: 6 }}>
                        Payment Screenshot <span style={{ color: "var(--ink3)", fontWeight: 500 }}>(optional)</span>
                      </label>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFile}
                      />
                      <div
                        className={`upload-area${screenshotName ? " has-file" : ""}`}
                        onClick={() => fileRef.current?.click()}
                      >
                        {screenshotName ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4" stroke="var(--grn)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="12" cy="12" r="10" stroke="var(--grn)" strokeWidth="2" />
                            </svg>
                            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--grn)" }}>
                              {screenshotName}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" style={{ margin: "0 auto 8px" }}>
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round" />
                              <polyline points="17 8 12 3 7 8" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              <line x1="12" y1="3" x2="12" y2="15" stroke="var(--ink3)" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink3)" }}>
                              Click to upload payment screenshot
                            </div>
                            <div style={{ fontSize: 11, color: "var(--ink3)", marginTop: 4 }}>PNG, JPG up to 5MB</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Server error */}
                  {serverError && (
                    <div style={{
                      padding: "12px 16px", borderRadius: 10,
                      background: "var(--rose-l)", border: "1px solid rgba(244,63,94,.25)",
                      fontSize: 13, fontWeight: 600, color: "var(--rose)",
                    }}>
                      {serverError}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ fontSize: 15, fontWeight: 800, padding: "15px", borderRadius: 14, width: "100%", fontFamily: "inherit" }}
                  >
                    {loading ? <><Spinner /> Registering…</> : "Secure My Seat — ₹29 →"}
                  </button>

                  <p style={{ textAlign: "center", fontSize: 12, color: "var(--ink3)", marginTop: -8 }}>
                    Only ₹29 · We&apos;ll email you session details after payment is verified.
                  </p>
                </div>
              </form>

              {/* ── RIGHT: UPI Payment Card ── */}
              <div className="sticky-col" style={{ position: "sticky", top: 100 }}>
                <UpiPaymentCard />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
