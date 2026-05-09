"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"

/* ─── CSS ────────────────────────────────────────────────────────── */
const CSS = `
  /* All vars scoped to .ap — never touches global :root or Navbar */
  .ap {
    --ind:  #1d3a8f;
    --vio:  #3b52f0;
    --ind-l:#e8edfe;
    --ind-xl:#f4f6ff;
    --cream:#f7f7fb;
    --ink:  #09090f;
    --ink2: #3d3d52;
    --ink3: #8a8aa8;
    --jb:rgba(10,10,20,0.08);
    --jbM:rgba(10,10,20,0.16);
    --grn:  #10b981;
    --grn-l:#ecfdf5;
    --rose: #ef4444;
    --rose-l:#fef2f2;
    --shadow-sm:0 2px 8px rgba(10,10,20,0.05);
    --shadow-md:0 4px 24px rgba(10,10,20,0.09);
    --shadow-lg:0 12px 48px rgba(10,10,20,0.13);
    --ease:cubic-bezier(.16,1,.3,1);
    --spring:cubic-bezier(.34,1.56,.64,1);

    font-family:-apple-system,BlinkMacSystemFont,'Inter',system-ui,sans-serif;
    -webkit-font-smoothing:antialiased;
    background:#f7f7fb;
    min-height:100vh;
  }

  @keyframes ap-fade { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
  @keyframes ap-spin { to{transform:rotate(360deg)} }
  @keyframes ap-pop  { 0%{transform:scale(0) rotate(-15deg);opacity:0} 60%{transform:scale(1.2) rotate(4deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes ap-confetti { 0%{transform:translateY(-20px) rotate(0);opacity:1} 100%{transform:translateY(120px) rotate(720deg);opacity:0} }

  .ap-fade { animation:ap-fade .55s var(--ease) both; }
  .ap-pop  { animation:ap-pop .5s var(--spring) both; }
  .ap-spin { animation:ap-spin 1s linear infinite; }

  /* ── PAGE SHELL ── */
  .ap-shell { max-width:1100px; margin:0 auto; padding:40px 24px 80px; display:grid; grid-template-columns:340px 1fr; gap:40px; align-items:start; }
  @media(max-width:900px){ .ap-shell{ grid-template-columns:1fr; } }
  @media(max-width:600px){ .ap-shell{ padding:24px 16px 60px; gap:24px; } }

  /* ── SIDEBAR ── */
  .ap-sidebar { position:sticky; top:88px; }
  .ap-sidebar-card { background:white; border-radius:20px; border:1.5px solid var(--jb); overflow:hidden; box-shadow:var(--shadow-md); }
  .ap-sidebar-top { background:linear-gradient(135deg,var(--ind),var(--vio)); padding:24px 22px; }
  .ap-sidebar-badge { display:inline-flex; align-items:center; gap:5px; background:rgba(255,255,255,.18); border:1px solid rgba(255,255,255,.25); border-radius:99px; padding:4px 10px; font-size:10px; font-weight:800; color:white; letter-spacing:.06em; text-transform:uppercase; margin-bottom:14px; }
  .ap-sidebar-bdot  { width:5px; height:5px; background:#86efac; border-radius:50%; }
  .ap-sidebar-title { font-size:18px; font-weight:900; color:white; letter-spacing:-.03em; margin-bottom:5px; }
  .ap-sidebar-sub   { font-size:13px; color:rgba(255,255,255,.75); line-height:1.6; }
  .ap-sidebar-body  { padding:22px; }
  .ap-sidebar-row   { display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--jb); font-size:13px; }
  .ap-sidebar-row:last-of-type { border-bottom:none; }
  .ap-sidebar-lbl   { color:var(--ink3); font-weight:600; }
  .ap-sidebar-val   { color:var(--ink); font-weight:700; }
  .ap-incl-title    { font-size:11px; font-weight:800; color:var(--ink3); text-transform:uppercase; letter-spacing:.08em; margin:18px 0 10px; }
  .ap-incl-item     { display:flex; align-items:center; gap:9px; margin-bottom:8px; font-size:13px; color:var(--ink2); font-weight:500; }
  .ap-incl-check    { width:18px; height:18px; border-radius:6px; background:var(--grn-l); border:1px solid rgba(16,185,129,.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .ap-price-box     { background:var(--ind-xl); border:1.5px solid var(--ind-l); border-radius:14px; padding:16px 18px; margin-top:18px; }
  .ap-price-lbl     { font-size:11px; font-weight:700; color:var(--ind); text-transform:uppercase; letter-spacing:.07em; margin-bottom:6px; }
  .ap-price-amt     { font-size:28px; font-weight:900; color:var(--ind); letter-spacing:-.04em; }
  .ap-price-note    { font-size:11.5px; color:var(--ink3); margin-top:4px; }
  .ap-secure        { display:flex; align-items:center; gap:7px; font-size:11.5px; color:var(--ink3); margin-top:14px; justify-content:center; }

  /* ── FORM CARD ── */
  .ap-card { background:white; border-radius:20px; border:1.5px solid var(--jb); box-shadow:var(--shadow-md); overflow:hidden; }

  /* ── PROGRESS ── */
  .ap-progress { padding:24px 28px 0; }
  .ap-prog-labels { display:flex; justify-content:space-between; margin-bottom:12px; }
  .ap-prog-label { font-size:11px; font-weight:700; color:var(--ink3); text-align:center; flex:1; transition:color .3s; }
  .ap-prog-label.active { color:var(--ind); }
  .ap-prog-label.done   { color:var(--grn); }
  .ap-prog-bar { height:4px; background:var(--jb); border-radius:99px; overflow:hidden; margin-bottom:24px; }
  .ap-prog-fill { height:100%; border-radius:99px; background:linear-gradient(90deg,var(--ind),var(--vio)); transition:width .4s var(--ease); }
  .ap-step-title { font-size:18px; font-weight:900; color:var(--ink); letter-spacing:-.03em; margin-bottom:4px; }
  .ap-step-sub   { font-size:13.5px; color:var(--ink3); margin-bottom:24px; }
  .ap-divider    { height:1px; background:var(--jb); margin-bottom:24px; }

  /* ── FORM BODY ── */
  .ap-body { padding:0 28px 28px; }
  @media(max-width:600px){ .ap-progress{ padding:18px 18px 0; } .ap-body{ padding:0 18px 18px; } }

  .ap-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:600px){ .ap-grid2{ grid-template-columns:1fr; } }
  .ap-field { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
  .ap-label { font-size:12px; font-weight:700; color:var(--ink2); letter-spacing:.01em; }
  .ap-input {
    width:100%; padding:12px 14px; border-radius:11px; border:1.5px solid var(--jb);
    background:var(--cream); font-size:14px; color:var(--ink); outline:none;
    transition:border-color .18s, box-shadow .18s, background .18s; font-family:inherit;
  }
  .ap-input:focus { border-color:var(--ind); background:white; box-shadow:0 0 0 3px rgba(29,58,143,.1); }
  .ap-input::placeholder { color:var(--ink3); }
  .ap-input.err { border-color:var(--rose); box-shadow:0 0 0 3px rgba(239,68,68,.08); }
  .ap-textarea {
    width:100%; padding:12px 14px; border-radius:11px; border:1.5px solid var(--jb);
    background:var(--cream); font-size:14px; color:var(--ink); outline:none;
    resize:vertical; min-height:108px; line-height:1.65; font-family:inherit;
    transition:border-color .18s, box-shadow .18s, background .18s;
  }
  .ap-textarea:focus { border-color:var(--ind); background:white; box-shadow:0 0 0 3px rgba(29,58,143,.1); }
  .ap-textarea::placeholder { color:var(--ink3); }
  .ap-select {
    width:100%; padding:12px 14px; border-radius:11px; border:1.5px solid var(--jb);
    background:var(--cream); font-size:14px; color:var(--ink); outline:none; cursor:pointer;
    font-family:inherit; appearance:none; transition:border-color .18s, box-shadow .18s;
    background-image:url("data:image/svg+xml,%3Csvg width='11' height='7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%238a8aa8' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 14px center;
  }
  .ap-select:focus { border-color:var(--ind); background-color:white; box-shadow:0 0 0 3px rgba(29,58,143,.1); }
  .ap-err-msg { font-size:11px; color:var(--rose); font-weight:600; }
  .ap-char    { font-size:11px; color:var(--ink3); text-align:right; margin-top:-8px; }

  /* ── ACTION BTNS ── */
  .ap-actions { display:flex; gap:10px; margin-top:24px; }
  .ap-btn-next {
    flex:1; padding:14px; border-radius:12px; border:none; cursor:pointer;
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white;
    font-size:15px; font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px;
    box-shadow:0 4px 18px rgba(29,58,143,.3); transition:all .22s var(--ease);
  }
  .ap-btn-next:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(29,58,143,.4); }
  .ap-btn-next:disabled { opacity:.6; cursor:not-allowed; transform:none; }
  .ap-btn-back { padding:14px 18px; border-radius:12px; background:var(--cream); color:var(--ink2); font-size:15px; font-weight:700; border:1.5px solid var(--jb); cursor:pointer; transition:all .18s; flex-shrink:0; }
  .ap-btn-back:hover { background:#e8e8f0; }

  /* ── PAYMENT ── */
  .ap-order-box { background:var(--ind-xl); border:1.5px solid var(--ind-l); border-radius:14px; padding:18px; margin-bottom:22px; }
  .ap-order-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
  .ap-order-title { font-size:13px; font-weight:800; color:var(--ink); }
  .ap-order-amt   { font-size:22px; font-weight:900; color:var(--ind); letter-spacing:-.04em; }
  .ap-order-line  { display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:6px; }
  .ap-order-line:last-child { margin-bottom:0; padding-top:8px; border-top:1px solid var(--ind-l); font-weight:700; }
  .ap-order-lbl   { color:var(--ink2); }
  .ap-order-val   { color:var(--ink); font-weight:600; }

  .ap-pay-methods { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:22px; }
  .ap-pay-method  { padding:12px 10px; border-radius:11px; border:1.5px solid var(--jb); background:white; text-align:center; cursor:pointer; transition:all .18s; }
  .ap-pay-method.selected { border-color:var(--ind); background:var(--ind-xl); box-shadow:0 0 0 3px rgba(29,58,143,.1); }
  .ap-pay-method-icon { font-size:18px; margin-bottom:4px; display:block; }
  .ap-pay-method-name { font-size:11px; font-weight:700; color:var(--ink2); }
  .ap-pay-method.selected .ap-pay-method-name { color:var(--ind); }

  .ap-upi-box { background:white; border:1.5px solid var(--jb); border-radius:14px; padding:20px; margin-bottom:18px; }
  .ap-upi-id-row { display:flex; align-items:center; justify-content:space-between; background:var(--cream); border:1.5px solid var(--jb); border-radius:10px; padding:12px 14px; margin-bottom:14px; }
  .ap-upi-id-val  { font-size:14px; font-weight:700; color:var(--ink); font-family:'SF Mono','Fira Code',monospace; }
  .ap-copy-btn    { font-size:11px; font-weight:800; color:var(--ind); background:var(--ind-l); border:none; border-radius:7px; padding:5px 10px; cursor:pointer; transition:all .18s; }
  .ap-copy-btn:hover { background:var(--ind); color:white; }
  .ap-upi-apps { display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
  .ap-upi-app  { display:inline-flex; align-items:center; gap:5px; padding:5px 10px; border-radius:8px; border:1px solid var(--jb); background:white; font-size:11px; font-weight:700; color:var(--ink2); }

  .ap-card-pan-wrap { position:relative; margin-bottom:14px; }
  .ap-card-type-badge { position:absolute; right:12px; top:50%; transform:translateY(-50%); font-size:10px; font-weight:800; color:var(--ind); background:var(--ind-l); padding:3px 8px; border-radius:6px; }

  .ap-pay-secure { display:flex; align-items:center; justify-content:center; gap:6px; font-size:11.5px; color:var(--ink3); margin-top:12px; }

  /* ── SUCCESS ── */
  .ap-success-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; background:var(--cream); padding:40px 24px; position:relative; overflow:hidden; }
  .ap-success-card { max-width:480px; width:100%; background:white; border-radius:24px; border:1.5px solid var(--jb); box-shadow:var(--shadow-lg); padding:40px 36px; text-align:center; position:relative; z-index:1; }
  .ap-success-icon { width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg,var(--ind),var(--vio)); display:flex; align-items:center; justify-content:center; margin:0 auto 24px; box-shadow:0 12px 40px rgba(29,58,143,.28); }
  .ap-success-h { font-size:26px; font-weight:900; color:var(--ink); letter-spacing:-.03em; margin-bottom:10px; }
  .ap-success-p { font-size:14px; color:var(--ink2); line-height:1.72; margin-bottom:28px; }
  .ap-success-steps { background:var(--cream); border-radius:14px; padding:18px 20px; text-align:left; margin-bottom:24px; }
  .ap-success-step { display:flex; align-items:flex-start; gap:10px; margin-bottom:10px; font-size:13px; color:var(--ink2); line-height:1.5; }
  .ap-success-step:last-child { margin-bottom:0; }
  .ap-success-num { width:20px; height:20px; border-radius:6px; background:var(--ind); color:white; font-size:10px; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
  .ap-back-home { display:inline-flex; align-items:center; gap:7px; padding:13px 28px; border-radius:12px; background:linear-gradient(135deg,var(--ind),var(--vio)); color:white; font-size:14px; font-weight:800; text-decoration:none; box-shadow:0 4px 16px rgba(29,58,143,.28); transition:all .22s; }
  .ap-back-home:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(29,58,143,.38); }

  .ap-shimmer {
    background:linear-gradient(90deg,var(--ind) 0%,var(--vio) 30%,#5a8af4 50%,var(--vio) 70%,var(--ind) 100%);
    background-size:300% auto; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
    animation:ap-shimmer 5s linear infinite;
  }
  @keyframes ap-shimmer { 0%{background-position:-400% center} 100%{background-position:400% center} }
`

/* ─── types ──────────────────────────────────────────────────────── */
type PayMethod = "upi" | "card" | "netbanking"
type Form = {
  name: string; email: string; phone: string
  college: string; year: string; degree: string; city: string
  domain: string; why: string; built: string; portfolio: string
  payMethod: PayMethod; upiId: string; txnId: string
  cardNum: string; cardExpiry: string; cardCvv: string; cardName: string
}
const INIT: Form = {
  name:"", email:"", phone:"",
  college:"", year:"", degree:"", city:"",
  domain:"", why:"", built:"", portfolio:"",
  payMethod:"upi", upiId:"", txnId:"",
  cardNum:"", cardExpiry:"", cardCvv:"", cardName:"",
}

const YEARS   = ["1st Year","2nd Year","3rd Year","4th Year","Final Year","Post Graduate","Other"]
const DEGREES = ["B.Tech / B.E.","BCA / B.Sc (CS)","BBA / B.Com","B.Des","M.Tech / M.E.","MBA","Other"]
const DOMAINS = ["Frontend Development","Backend Development","ML & AI Engineering","Product Design","Data Science","Other / Not Sure Yet"]
const UPI_ID  = "jobingen@upi"

/* ─── helpers ────────────────────────────────────────────────────── */
function fmtCard(v: string) {
  return v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim()
}
function fmtExpiry(v: string) {
  const d = v.replace(/\D/g,"").slice(0,4)
  return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d
}

/* ─── subcomponents ──────────────────────────────────────────────── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="ap-field">
      <label className="ap-label">{label}</label>
      {children}
      {error && <span className="ap-err-msg">{error}</span>}
    </div>
  )
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ap-spin">
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
      <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="10" height="10" fill="none" viewBox="0 0 14 14">
      <path d="M2.5 7l3 3 6-6" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function ArrowRight() {
  return <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
}

/* ─── Success ────────────────────────────────────────────────────── */
function SuccessScreen({ name, domain }: { name: string; domain: string }) {
  const COLORS = ["#3b52f0","#10b981","#f43f5e","#f59e0b","#60a5fa","#8b5cf6","#f472b6"]
  return (
    <div className="ap-success-wrap">
      {COLORS.map((c,i)=>(
        <div key={i} style={{ position:"absolute", width:8, height:8, borderRadius:"50%", background:c, left:`${10+i*12}%`, top:"18%", animation:`ap-confetti ${1.2+i*.15}s ease-out ${i*.08}s both` }}/>
      ))}
      {COLORS.map((c,i)=>(
        <div key={`b${i}`} style={{ position:"absolute", width:6, height:6, borderRadius:2, background:c, left:`${6+i*13}%`, top:"12%", animation:`ap-confetti ${1.4+i*.12}s ease-out ${.1+i*.07}s both` }}/>
      ))}
      <div className="ap-success-card ap-fade">
        <div className="ap-success-icon ap-pop">
          <svg width="38" height="38" fill="none" viewBox="0 0 40 40">
            <path d="M10 21L17 28L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{fontSize:11,fontWeight:800,color:"#1d3a8f",textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>
          Application Received
        </div>
        <h2 className="ap-success-h">
          You're in, <span className="ap-shimmer">{name.split(" ")[0]}!</span>
        </h2>
        <p className="ap-success-p">
          Your application for the <strong>Summer Internship 2026</strong> in <strong>{domain}</strong> has been submitted and payment confirmed. Welcome to the process.
        </p>
        <div className="ap-success-steps">
          <div style={{fontSize:11,fontWeight:800,color:"#8a8aa8",textTransform:"uppercase",letterSpacing:".07em",marginBottom:12}}>What happens next</div>
          {[
            "Payment verified within 24 hours — confirmation email on the way",
            "Application reviewed by our team within 7 days",
            "Selected candidates invited for a short founder call",
            "Offer letter + cohort welcome kit sent before June 2026",
          ].map((s,i)=>(
            <div key={i} className="ap-success-step">
              <div className="ap-success-num">{i+1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <Link href="/" className="ap-back-home">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 12h18M3 12l7-7M3 12l7 7"/></svg>
          Back to Jobingen
        </Link>
      </div>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function ApplyPage() {
  const [step, setStep]       = useState(0)
  const [form, setForm]       = useState<Form>(INIT)
  const [errors, setErrors]   = useState<Partial<Record<keyof Form, string>>>({})
  const [loading, setLoading] = useState(false)
  const [copied, setCopied]   = useState(false)
  const [done, setDone]       = useState(false)

  const set = (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))

  const setCard = (k: keyof Form, transform: (v: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [k]: transform(e.target.value) }))

  const validate = (): boolean => {
    const errs: Partial<Record<keyof Form, string>> = {}
    if (step === 0) {
      if (!form.name.trim())  errs.name  = "Full name is required"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email"
      if (form.phone.replace(/\D/g,"").length < 10) errs.phone = "Enter a valid 10-digit number"
    }
    if (step === 1) {
      if (!form.college.trim()) errs.college = "College name is required"
      if (!form.year)           errs.year    = "Select your year"
      if (!form.degree)         errs.degree  = "Select your degree"
      if (!form.city.trim())    errs.city    = "City is required"
    }
    if (step === 2) {
      if (!form.domain)                        errs.domain = "Select a domain"
      if (form.why.trim().length < 40)         errs.why    = "Please share more (min 40 characters)"
      if (form.built.trim().length < 40)       errs.built  = "Please share more (min 40 characters)"
    }
    if (step === 3) {
      if (form.payMethod === "upi") {
        if (!form.txnId.trim()) errs.txnId = "Enter your UPI transaction ID after paying"
      }
      if (form.payMethod === "card") {
        if (form.cardNum.replace(/\s/g,"").length !== 16) errs.cardNum   = "Enter a valid 16-digit card number"
        if (form.cardExpiry.length < 5)                   errs.cardExpiry = "Enter expiry as MM/YY"
        if (form.cardCvv.length < 3)                      errs.cardCvv   = "Enter 3-digit CVV"
        if (!form.cardName.trim())                        errs.cardName  = "Enter cardholder name"
      }
      if (form.payMethod === "netbanking") {
        // no extra fields needed for this demo
      }
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = () => { if (validate()) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }) } }
  const back = () => { setStep(s => s - 1); setErrors({}); window.scrollTo({ top: 0, behavior: "smooth" }) }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setDone(true)
  }

  const copyUpi = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  if (done) return (
    <>
      <style>{CSS}</style>
      <div className="ap">
        <SuccessScreen name={form.name} domain={form.domain} />
      </div>
    </>
  )

  const STEP_LABELS = ["Personal", "Education", "Your Story", "Payment"]
  const progress = ((step + 1) / 4) * 100

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="ap" style={{ paddingTop: 68 }}>

        {/* ── Breadcrumb ── */}
        <div style={{ background:"white", borderBottom:"1px solid var(--jb)", padding:"12px 0" }}>
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", gap:8, fontSize:13, color:"var(--ink3)" }}>
            <Link href="/" style={{ color:"var(--ink3)", textDecoration:"none", fontWeight:600 }}>Jobingen</Link>
            <span>/</span>
            <Link href="/summer-internship" style={{ color:"var(--ink3)", textDecoration:"none", fontWeight:600 }}>Summer Internship</Link>
            <span>/</span>
            <span style={{ color:"var(--ind)", fontWeight:700 }}>Apply</span>
          </div>
        </div>

        <div className="ap-shell">

          {/* ── SIDEBAR ── */}
          <aside className="ap-sidebar">
            <div className="ap-sidebar-card">
              <div className="ap-sidebar-top">
                <div className="ap-sidebar-badge">
                  <div className="ap-sidebar-bdot" />
                  Now Accepting
                </div>
                <div className="ap-sidebar-title">Summer Internship 2026</div>
                <div className="ap-sidebar-sub">Jobingen · AI-First Startup</div>
              </div>
              <div className="ap-sidebar-body">
                {[
                  { l: "Duration",    v: "4 Weeks" },
                  { l: "Starts",      v: "June 1, 2026" },
                  { l: "Domains",     v: "6 areas" },
                  { l: "Mode",        v: "Remote (Online)" },
                ].map(r => (
                  <div key={r.l} className="ap-sidebar-row">
                    <span className="ap-sidebar-lbl">{r.l}</span>
                    <span className="ap-sidebar-val">{r.v}</span>
                  </div>
                ))}
                <div className="ap-incl-title">What's Included</div>
                {["Internship Certificate","Real Project Portfolio","Weekly Mentorship","Startup Network Access","Fast-Track Hiring"].map(item => (
                  <div key={item} className="ap-incl-item">
                    <div className="ap-incl-check"><CheckIcon /></div>
                    {item}
                  </div>
                ))}
                <div className="ap-price-box">
                  <div className="ap-price-lbl">Registration Fee</div>
                  <div className="ap-price-amt">₹1,499</div>
                  <div className="ap-price-note">One-time · Non-refundable · Seat confirmation</div>
                </div>
                <div className="ap-secure">
                  <LockIcon />
                  100% Secure Payment
                </div>
              </div>
            </div>
          </aside>

          {/* ── FORM ── */}
          <div>
            <div className="ap-card">

              {/* Progress */}
              <div className="ap-progress">
                <div className="ap-prog-labels">
                  {STEP_LABELS.map((l, i) => (
                    <div key={l} className={`ap-prog-label ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}>{l}</div>
                  ))}
                </div>
                <div className="ap-prog-bar">
                  <div className="ap-prog-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="ap-step-title">
                  {step === 0 && "Personal Information"}
                  {step === 1 && "Education Details"}
                  {step === 2 && "Your Story"}
                  {step === 3 && "Complete Payment"}
                </div>
                <div className="ap-step-sub">
                  {step === 0 && "Tell us the basics — we'll use this for your application."}
                  {step === 1 && "Where you're studying and when you graduate."}
                  {step === 2 && "This is the most important part — be honest and specific."}
                  {step === 3 && "Pay the ₹1,499 registration fee to confirm your seat."}
                </div>
                <div className="ap-divider" />
              </div>

              <form className="ap-body" onSubmit={submit}>

                {/* ── STEP 1: Personal ── */}
                {step === 0 && (
                  <div className="ap-fade" key="step0">
                    <Field label="Full Name *" error={errors.name}>
                      <input className={`ap-input${errors.name ? " err" : ""}`} placeholder="Rahul Sharma" value={form.name} onChange={set("name")} />
                    </Field>
                    <Field label="Email Address *" error={errors.email}>
                      <input className={`ap-input${errors.email ? " err" : ""}`} type="email" placeholder="rahul@college.edu" value={form.email} onChange={set("email")} />
                    </Field>
                    <Field label="Phone Number *" error={errors.phone}>
                      <input className={`ap-input${errors.phone ? " err" : ""}`} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
                    </Field>
                    <div className="ap-actions">
                      <button type="button" className="ap-btn-next" onClick={next}>
                        Continue <ArrowRight />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Education ── */}
                {step === 1 && (
                  <div className="ap-fade" key="step1">
                    <Field label="College / University *" error={errors.college}>
                      <input className={`ap-input${errors.college ? " err" : ""}`} placeholder="IIT Delhi" value={form.college} onChange={set("college")} />
                    </Field>
                    <div className="ap-grid2">
                      <Field label="Current Year *" error={errors.year}>
                        <select className="ap-select" value={form.year} onChange={set("year")}>
                          <option value="">Select year</option>
                          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </Field>
                      <Field label="Degree *" error={errors.degree}>
                        <select className="ap-select" value={form.degree} onChange={set("degree")}>
                          <option value="">Select degree</option>
                          {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="City *" error={errors.city}>
                      <input className={`ap-input${errors.city ? " err" : ""}`} placeholder="New Delhi" value={form.city} onChange={set("city")} />
                    </Field>
                    <div className="ap-actions">
                      <button type="button" className="ap-btn-back" onClick={back}>← Back</button>
                      <button type="button" className="ap-btn-next" onClick={next}>Continue <ArrowRight /></button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Story ── */}
                {step === 2 && (
                  <div className="ap-fade" key="step2">
                    <Field label="Interested Track *" error={errors.domain}>
                      <select className="ap-select" value={form.domain} onChange={set("domain")}>
                        <option value="">Select a domain</option>
                        {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </Field>
                    <Field label="Why do you want to join Jobingen? *" error={errors.why}>
                      <textarea className="ap-textarea" placeholder="Be specific — tell us what excites you about AI, startups, or building products. What do you want to learn? What do you want to build?" value={form.why} onChange={set("why")} rows={4} />
                      <div className="ap-char">{form.why.length} / min 40 chars</div>
                    </Field>
                    <Field label="Tell us about something you have built or learned recently *" error={errors.built}>
                      <textarea className="ap-textarea" placeholder="A side project, an open-source contribution, a course you finished, a problem you solved — anything that shows you actively build and learn." value={form.built} onChange={set("built")} rows={4} />
                      <div className="ap-char">{form.built.length} / min 40 chars</div>
                    </Field>
                    <Field label="Portfolio / LinkedIn / GitHub URL (optional)">
                      <input className="ap-input" type="url" placeholder="https://linkedin.com/in/yourname" value={form.portfolio} onChange={set("portfolio")} />
                    </Field>
                    <div className="ap-actions">
                      <button type="button" className="ap-btn-back" onClick={back}>← Back</button>
                      <button type="button" className="ap-btn-next" onClick={next}>Continue <ArrowRight /></button>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Payment ── */}
                {step === 3 && (
                  <div className="ap-fade" key="step3">

                    {/* Order summary */}
                    <div className="ap-order-box">
                      <div className="ap-order-header">
                        <div className="ap-order-title">Order Summary</div>
                        <div className="ap-order-amt">₹1,499</div>
                      </div>
                      <div className="ap-order-line"><span className="ap-order-lbl">Summer Internship 2026</span><span className="ap-order-val">₹1,499</span></div>
                      <div className="ap-order-line"><span className="ap-order-lbl">Processing Fee</span><span className="ap-order-val">₹0</span></div>
                      <div className="ap-order-line"><span className="ap-order-lbl" style={{fontWeight:700}}>Total</span><span className="ap-order-val" style={{color:"var(--ind)"}}>₹1,499</span></div>
                    </div>

                    {/* Payment method tabs */}
                    <div style={{fontSize:12,fontWeight:700,color:"var(--ink3)",marginBottom:10,textTransform:"uppercase",letterSpacing:".06em"}}>Payment Method</div>
                    <div className="ap-pay-methods">
                      {([
                        { id:"upi",        icon:"📱", name:"UPI" },
                        { id:"card",       icon:"💳", name:"Card" },
                        { id:"netbanking", icon:"🏦", name:"Net Banking" },
                      ] as const).map(m => (
                        <div key={m.id} className={`ap-pay-method${form.payMethod === m.id ? " selected" : ""}`} onClick={() => setForm(f => ({...f, payMethod: m.id}))}>
                          <span className="ap-pay-method-icon">{m.icon}</span>
                          <div className="ap-pay-method-name">{m.name}</div>
                        </div>
                      ))}
                    </div>

                    {/* ── UPI ── */}
                    {form.payMethod === "upi" && (
                      <div className="ap-upi-box ap-fade">
                        <div style={{fontSize:12.5,fontWeight:600,color:"var(--ink2)",marginBottom:12}}>
                          Pay <strong>₹1,499</strong> to the UPI ID below using any app, then enter the transaction ID.
                        </div>
                        <div className="ap-upi-id-row">
                          <span className="ap-upi-id-val">{UPI_ID}</span>
                          <button type="button" className="ap-copy-btn" onClick={copyUpi}>
                            {copied ? "✓ Copied" : "Copy"}
                          </button>
                        </div>
                        <div style={{fontSize:11.5,color:"var(--ink3)",marginBottom:12}}>Pay using any of these apps:</div>
                        <div className="ap-upi-apps">
                          {["GPay","PhonePe","Paytm","BHIM","Amazon Pay"].map(app => (
                            <span key={app} className="ap-upi-app">
                              <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#1d3a8f" opacity=".5"/></svg>
                              {app}
                            </span>
                          ))}
                        </div>
                        <Field label="UPI Transaction ID *" error={errors.txnId}>
                          <input className={`ap-input${errors.txnId ? " err" : ""}`} placeholder="Enter UTR / Transaction ID after payment" value={form.txnId} onChange={set("txnId")} />
                        </Field>
                      </div>
                    )}

                    {/* ── CARD ── */}
                    {form.payMethod === "card" && (
                      <div className="ap-upi-box ap-fade">
                        <Field label="Card Number *" error={errors.cardNum}>
                          <div className="ap-card-pan-wrap">
                            <input className={`ap-input${errors.cardNum ? " err" : ""}`} placeholder="1234 5678 9012 3456" value={form.cardNum} onChange={setCard("cardNum", fmtCard)} maxLength={19} style={{paddingRight:80}} />
                            {form.cardNum.length > 0 && <span className="ap-card-type-badge">VISA / MC</span>}
                          </div>
                        </Field>
                        <div className="ap-grid2">
                          <Field label="Expiry (MM/YY) *" error={errors.cardExpiry}>
                            <input className={`ap-input${errors.cardExpiry ? " err" : ""}`} placeholder="MM/YY" value={form.cardExpiry} onChange={setCard("cardExpiry", fmtExpiry)} maxLength={5} />
                          </Field>
                          <Field label="CVV *" error={errors.cardCvv}>
                            <input className={`ap-input${errors.cardCvv ? " err" : ""}`} placeholder="•••" type="password" value={form.cardCvv} onChange={setCard("cardCvv", v => v.replace(/\D/g,"").slice(0,3))} maxLength={3} />
                          </Field>
                        </div>
                        <Field label="Cardholder Name *" error={errors.cardName}>
                          <input className={`ap-input${errors.cardName ? " err" : ""}`} placeholder="RAHUL SHARMA" value={form.cardName} onChange={set("cardName")} style={{textTransform:"uppercase"}} />
                        </Field>
                      </div>
                    )}

                    {/* ── NET BANKING ── */}
                    {form.payMethod === "netbanking" && (
                      <div className="ap-upi-box ap-fade">
                        <div style={{fontSize:13.5,color:"var(--ink2)",lineHeight:1.7,marginBottom:16}}>
                          Transfer <strong>₹1,499</strong> via NEFT/IMPS to the bank account below, then submit. Our team will verify within 24 hours.
                        </div>
                        <div style={{display:"grid",gap:10}}>
                          {[
                            {l:"Account Name",v:"Jobingen Technologies Pvt. Ltd."},
                            {l:"Account Number",v:"XXXX XXXX XXXX"},
                            {l:"IFSC Code",v:"HDFC0001234"},
                            {l:"Bank",v:"HDFC Bank"},
                            {l:"Branch",v:"New Delhi"},
                          ].map(r=>(
                            <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--jb)",fontSize:13}}>
                              <span style={{color:"var(--ink3)",fontWeight:600}}>{r.l}</span>
                              <span style={{color:"var(--ink)",fontWeight:700}}>{r.v}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{marginTop:16,padding:12,background:"var(--ind-xl)",borderRadius:10,fontSize:12.5,color:"var(--ind)",fontWeight:600,lineHeight:1.6}}>
                          Use your full name as the payment reference/remarks so we can match it to your application.
                        </div>
                      </div>
                    )}

                    <div className="ap-pay-secure"><LockIcon />Secured by 256-bit SSL encryption</div>

                    <div className="ap-actions" style={{marginTop:20}}>
                      <button type="button" className="ap-btn-back" onClick={back}>← Back</button>
                      <button type="submit" className="ap-btn-next" disabled={loading}>
                        {loading ? <><Spinner /> Processing...</> : <>Pay ₹1,499 &amp; Submit <ArrowRight /></>}
                      </button>
                    </div>

                    <div style={{marginTop:16,fontSize:12,color:"var(--ink3)",textAlign:"center",lineHeight:1.65}}>
                      By submitting, you agree to the Jobingen{" "}
                      <a href="#" style={{color:"var(--ind)",fontWeight:600}}>Terms & Conditions</a>.
                      {" "}Registration fees are non-refundable once your application is reviewed.
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
