"use client"

import { useState, useRef, FormEvent } from "react"

type BugEntry = {
  page_url: string
  feature_area: string
  category: string
  severity: string
  what_tried: string
  steps: [string, string, string]
  expected: string
  actual: string
  screenshot_note: string
  screenshotFile: File | null
  screenshotName: string
}

const EMPTY_BUG = (): BugEntry => ({
  page_url: "",
  feature_area: "",
  category: "",
  severity: "",
  what_tried: "",
  steps: ["", "", ""],
  expected: "",
  actual: "",
  screenshot_note: "",
  screenshotFile: null,
  screenshotName: "",
})

type FormState = {
  tester_name: string
  tester_email: string
  tester_phone: string
  team_name: string
  bugs: BugEntry[]
}

const INIT: FormState = {
  tester_name: "",
  tester_email: "",
  tester_phone: "",
  team_name: "",
  bugs: [EMPTY_BUG()],
}

const CATEGORIES = ["Functional", "UI-UX", "Validation", "Performance", "Security", "Content"]
const SEVERITIES = [
  { label: "Critical", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  { label: "High",     color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
  { label: "Medium",   color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  { label: "Low",      color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
]

const CSS = `
  .bb { --ind:#1d3a8f; --vio:#3b52f0; --ink:#09090f; --ink2:#3d3d52; --ink3:#8a8aa8;
    --jb:rgba(10,10,20,0.08); --cream:#f7f7fb; --shadow-sm:0 2px 8px rgba(10,10,20,.05);
    --shadow-md:0 4px 24px rgba(10,10,20,.09);
    font-family:-apple-system,BlinkMacSystemFont,'Inter',system-ui,sans-serif;
    -webkit-font-smoothing:antialiased; background:#f0f2f8; color:var(--ink); min-height:100vh; }

  @keyframes bb-fade { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
  @keyframes bb-spin { to{transform:rotate(360deg)} }
  @keyframes bb-check { 0%{transform:scale(0) rotate(-15deg);opacity:0} 65%{transform:scale(1.18) rotate(4deg)} 100%{transform:scale(1) rotate(0);opacity:1} }

  .bb-page { max-width:700px; margin:0 auto; padding:40px 20px 80px; }

  .bb-header { text-align:center; margin-bottom:32px; }
  .bb-logo { display:inline-flex; align-items:center; gap:10px; background:#1d3a8f;
    color:white; padding:8px 18px; border-radius:99px; font-size:13px; font-weight:800;
    letter-spacing:.04em; margin-bottom:20px; }
  .bb-title { font-size:clamp(26px,5vw,38px); font-weight:900; color:var(--ink); letter-spacing:-.04em; margin-bottom:8px; }
  .bb-sub { font-size:15px; color:var(--ink2); }

  .bb-card { background:white; border-radius:20px; border:1.5px solid var(--jb);
    box-shadow:var(--shadow-md); overflow:hidden; animation:bb-fade .4s ease both; }

  .bb-section { padding:28px 32px; border-bottom:1.5px solid var(--jb); }
  .bb-section:last-child { border-bottom:none; }
  @media(max-width:560px){ .bb-section{ padding:20px 18px; } }

  .bb-sec-label { font-size:10px; font-weight:800; color:var(--ind); letter-spacing:.1em;
    text-transform:uppercase; display:flex; align-items:center; gap:6px; margin-bottom:18px; }
  .bb-sec-label::before { content:''; width:4px; height:4px; border-radius:50%; background:var(--ind); display:block; }

  .bb-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:480px){ .bb-grid2{ grid-template-columns:1fr; } }

  .bb-field { display:flex; flex-direction:column; gap:6px; }
  .bb-label { font-size:11.5px; font-weight:700; color:var(--ink2); letter-spacing:.02em; text-transform:uppercase; }
  .bb-req { color:#ef4444; }
  .bb-opt { font-size:9px; font-weight:500; color:var(--ink3); }
  .bb-input { width:100%; padding:12px 16px; border:1.5px solid var(--jb); border-radius:11px;
    background:var(--cream); font-size:14.5px; font-weight:500; color:var(--ink);
    outline:none; font-family:inherit; transition:all .18s; }
  .bb-input:focus { border-color:var(--ind); background:white; box-shadow:0 0 0 3px rgba(29,58,143,.08); }
  .bb-input::placeholder { color:var(--ink3); }
  .bb-textarea { width:100%; padding:12px 16px; border:1.5px solid var(--jb); border-radius:11px;
    background:var(--cream); font-size:14.5px; font-weight:500; color:var(--ink);
    outline:none; font-family:inherit; transition:all .18s; resize:vertical; min-height:80px; line-height:1.6; }
  .bb-textarea:focus { border-color:var(--ind); background:white; box-shadow:0 0 0 3px rgba(29,58,143,.08); }
  .bb-textarea::placeholder { color:var(--ink3); }
  .bb-err-msg { font-size:11px; font-weight:600; color:#ef4444; }
  .bb-err { border-color:#ef4444 !important; }

  .bb-chips { display:flex; flex-wrap:wrap; gap:8px; }
  .bb-chip { padding:7px 14px; border-radius:99px; border:1.5px solid var(--jb); background:white;
    font-size:12.5px; font-weight:700; color:var(--ink2); cursor:pointer; transition:all .15s;
    font-family:inherit; user-select:none; }
  .bb-chip:hover { border-color:#94a3b8; color:var(--ink); }
  .bb-chip.sel-cat { background:#eef2ff; border-color:#818cf8; color:#1d3a8f; }

  .bb-steps { display:flex; flex-direction:column; gap:10px; }
  .bb-step { display:flex; align-items:center; gap:10px; }
  .bb-step-num { width:26px; height:26px; border-radius:50%; background:#1d3a8f; color:white;
    font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

  .bb-upload-area { width:100%; padding:18px 20px; border-radius:13px; border:2px dashed rgba(10,10,20,.12);
    background:var(--cream); text-align:center; cursor:pointer; transition:all .2s; }
  .bb-upload-area:hover { border-color:rgba(29,58,143,.35); background:#eef2ff; }
  .bb-upload-area.has-file { border-color:#16a34a; background:#f0fdf4; border-style:solid; }

  .bb-bug-card { background:white; border-radius:18px; border:1.5px solid #e2e8f0;
    box-shadow:0 2px 12px rgba(0,0,0,.04); overflow:hidden; }
  .bb-bug-header { padding:16px 20px; background:linear-gradient(135deg,#f0f4ff,#eef1fd);
    border-bottom:1.5px solid rgba(29,58,143,.1); display:flex; align-items:center; justify-content:space-between; }
  .bb-bug-num { font-size:13px; font-weight:800; color:#1d3a8f; display:flex; align-items:center; gap:7px; }
  .bb-bug-body { padding:20px 24px; display:flex; flex-direction:column; gap:18px; }
  @media(max-width:560px){ .bb-bug-body{ padding:16px; } }

  .bb-remove-btn { background:none; border:1.5px solid #fecaca; color:#ef4444; border-radius:8px;
    font-size:12px; font-weight:700; padding:5px 12px; cursor:pointer; font-family:inherit; transition:all .15s; }
  .bb-remove-btn:hover { background:#fef2f2; }

  .bb-add-btn { display:flex; align-items:center; justify-content:center; gap:8px; width:100%;
    padding:14px; border-radius:14px; border:2px dashed rgba(29,58,143,.25); background:rgba(29,58,143,.03);
    color:#1d3a8f; font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; transition:all .2s; }
  .bb-add-btn:hover { background:rgba(29,58,143,.07); border-color:#818cf8; }

  .bb-submit-btn { display:flex; align-items:center; justify-content:center; gap:10px; width:100%;
    padding:17px 32px; border-radius:14px; border:none; cursor:pointer;
    background:linear-gradient(135deg,var(--ind),var(--vio)); color:white;
    font-size:16px; font-weight:800; font-family:inherit;
    box-shadow:0 6px 24px rgba(29,58,143,.34); transition:all .22s; }
  .bb-submit-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 14px 40px rgba(29,58,143,.44); }
  .bb-submit-btn:disabled { opacity:.55; cursor:not-allowed; }

  .bb-server-err { padding:12px 16px; border-radius:10px; background:#fff1f2;
    border:1px solid rgba(244,63,94,.25); font-size:13px; font-weight:600; color:#f43f5e; }

  .bb-success { padding:60px 40px; text-align:center; }
  .bb-success-icon { width:80px; height:80px; border-radius:24px;
    background:linear-gradient(135deg,var(--ind),var(--vio));
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 24px; box-shadow:0 12px 40px rgba(29,58,143,.3);
    animation:bb-check .6s cubic-bezier(.34,1.56,.64,1) both; }
  .bb-success-h2 { font-size:32px; font-weight:900; color:var(--ink); letter-spacing:-.04em; margin-bottom:12px; }
  .bb-success-p { font-size:15px; color:var(--ink2); line-height:1.75; max-width:360px; margin:0 auto; }
`

function BugCard({
  bug, index, total, onChange, onRemove, errors
}: {
  bug: BugEntry
  index: number
  total: number
  onChange: (b: BugEntry) => void
  onRemove: () => void
  errors: Partial<Record<string, string>>
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  function setStep(i: number, val: string) {
    const steps = [...bug.steps] as [string, string, string]
    steps[i] = val
    onChange({ ...bug, steps })
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    onChange({ ...bug, screenshotFile: file, screenshotName: file.name })
  }

  function clearFile() {
    if (fileRef.current) fileRef.current.value = ""
    onChange({ ...bug, screenshotFile: null, screenshotName: "" })
  }

  return (
    <div className="bb-bug-card">
      <div className="bb-bug-header">
        <div className="bb-bug-num">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <path d="M14.5 3H9.5a1 1 0 0 0-.9.55L7 6H4a1 1 0 0 0 0 2h1v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h1a1 1 0 0 0 0-2h-3l-1.6-2.45A1 1 0 0 0 14.5 3Z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Bug #{index + 1}
        </div>
        {total > 1 && (
          <button type="button" className="bb-remove-btn" onClick={onRemove}>Remove</button>
        )}
      </div>

      <div className="bb-bug-body">
        {/* Page URL + Feature Area */}
        <div className="bb-grid2">
          <div className="bb-field">
            <label className="bb-label">Page / URL <span className="bb-req">*</span></label>
            <input
              className={`bb-input${errors.page_url ? " bb-err" : ""}`}
              placeholder="e.g. ai.jobengine.com/search"
              value={bug.page_url}
              onChange={e => onChange({ ...bug, page_url: e.target.value })}
            />
            {errors.page_url && <span className="bb-err-msg">{errors.page_url}</span>}
          </div>
          <div className="bb-field">
            <label className="bb-label">Feature / Area <span className="bb-req">*</span></label>
            <input
              className={`bb-input${errors.feature_area ? " bb-err" : ""}`}
              placeholder="e.g. Search, Profile, Login"
              value={bug.feature_area}
              onChange={e => onChange({ ...bug, feature_area: e.target.value })}
            />
            {errors.feature_area && <span className="bb-err-msg">{errors.feature_area}</span>}
          </div>
        </div>

        {/* Category */}
        <div className="bb-field">
          <label className="bb-label">Category <span className="bb-req">*</span></label>
          <div className="bb-chips">
            {CATEGORIES.map(c => (
              <button
                key={c}
                type="button"
                className={`bb-chip${bug.category === c ? " sel-cat" : ""}`}
                onClick={() => onChange({ ...bug, category: c })}
              >
                {c}
              </button>
            ))}
          </div>
          {errors.category && <span className="bb-err-msg">{errors.category}</span>}
        </div>

        {/* Severity */}
        <div className="bb-field">
          <label className="bb-label">Severity <span className="bb-req">*</span></label>
          <div className="bb-chips">
            {SEVERITIES.map(s => (
              <button
                key={s.label}
                type="button"
                className="bb-chip"
                style={bug.severity === s.label
                  ? { background: s.bg, borderColor: s.border, color: s.color }
                  : {}}
                onClick={() => onChange({ ...bug, severity: s.label })}
              >
                {s.label}
              </button>
            ))}
          </div>
          {errors.severity && <span className="bb-err-msg">{errors.severity}</span>}
        </div>

        {/* What you tried */}
        <div className="bb-field">
          <label className="bb-label">What You Tried <span className="bb-req">*</span></label>
          <input
            className={`bb-input${errors.what_tried ? " bb-err" : ""}`}
            placeholder="The test case — what did you do?"
            value={bug.what_tried}
            onChange={e => onChange({ ...bug, what_tried: e.target.value })}
          />
          {errors.what_tried && <span className="bb-err-msg">{errors.what_tried}</span>}
        </div>

        {/* Steps to reproduce */}
        <div className="bb-field">
          <label className="bb-label">Steps to Reproduce <span className="bb-req">*</span></label>
          <div className="bb-steps">
            {[0, 1, 2].map(i => (
              <div key={i} className="bb-step">
                <div className="bb-step-num">{i + 1}</div>
                <input
                  className="bb-input"
                  placeholder={i === 0 ? "First, navigate to..." : i === 1 ? "Then, click / enter..." : "Then observe..."}
                  value={bug.steps[i]}
                  onChange={e => setStep(i, e.target.value)}
                  style={{ marginBottom: 0 }}
                />
              </div>
            ))}
          </div>
          {errors.step0 && <span className="bb-err-msg">{errors.step0}</span>}
        </div>

        {/* Expected + Actual */}
        <div className="bb-grid2">
          <div className="bb-field">
            <label className="bb-label">Expected Result <span className="bb-req">*</span></label>
            <textarea
              className={`bb-textarea${errors.expected ? " bb-err" : ""}`}
              placeholder="What SHOULD have happened"
              rows={3}
              value={bug.expected}
              onChange={e => onChange({ ...bug, expected: e.target.value })}
            />
            {errors.expected && <span className="bb-err-msg">{errors.expected}</span>}
          </div>
          <div className="bb-field">
            <label className="bb-label">Actual Result <span className="bb-req">*</span></label>
            <textarea
              className={`bb-textarea${errors.actual ? " bb-err" : ""}`}
              placeholder="What DID happen"
              rows={3}
              value={bug.actual}
              onChange={e => onChange({ ...bug, actual: e.target.value })}
            />
            {errors.actual && <span className="bb-err-msg">{errors.actual}</span>}
          </div>
        </div>

        {/* Screenshot — upload + link both always visible */}
        <div className="bb-field">
          <label className="bb-label">Screenshot <span className="bb-opt">Image upload · PDF via link below</span></label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,.pdf"
            style={{ display: "none" }}
            onChange={handleFile}
          />

          {/* Upload area */}
          <div
            className={`bb-upload-area${bug.screenshotName ? " has-file" : ""}`}
            onClick={() => fileRef.current?.click()}
            style={{ cursor: "pointer" }}
          >
            {bug.screenshotName ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth="2.2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{bug.screenshotName}</span>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); clearFile() }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 18, lineHeight: 1, padding: "0 2px" }}
                >
                  ×
                </button>
              </div>
            ) : (
              <div>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.8" style={{ margin: "0 auto 8px", display: "block" }}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>Click to upload screenshot</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>PNG, JPG, PDF — max 5MB</div>
              </div>
            )}
          </div>

          {/* OR paste link — always visible */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "6px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(10,10,20,.08)" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: ".06em" }}>OR PASTE LINK</span>
            <div style={{ flex: 1, height: 1, background: "rgba(10,10,20,.08)" }} />
          </div>
          <input
            className="bb-input"
            placeholder="https://drive.google.com/... or any screenshot URL"
            value={bug.screenshot_note}
            onChange={e => onChange({ ...bug, screenshot_note: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

function validateBug(bug: BugEntry, idx: number): Record<string, string> {
  const e: Record<string, string> = {}
  if (!bug.page_url.trim()) e[`${idx}_page_url`] = "Required"
  if (!bug.feature_area.trim()) e[`${idx}_feature_area`] = "Required"
  if (!bug.category) e[`${idx}_category`] = "Please select a category"
  if (!bug.severity) e[`${idx}_severity`] = "Please select severity"
  if (!bug.what_tried.trim()) e[`${idx}_what_tried`] = "Required"
  if (!bug.steps[0].trim()) e[`${idx}_step0`] = "At least step 1 is required"
  if (!bug.expected.trim()) e[`${idx}_expected`] = "Required"
  if (!bug.actual.trim()) e[`${idx}_actual`] = "Required"
  return e
}

export default function BugBashPage() {
  const [form, setForm] = useState<FormState>(INIT)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState("")

  function updateBug(idx: number, bug: BugEntry) {
    setForm(f => ({ ...f, bugs: f.bugs.map((b, i) => i === idx ? bug : b) }))
    setServerError("")
  }

  function addBug() {
    setForm(f => ({ ...f, bugs: [...f.bugs, EMPTY_BUG()] }))
  }

  function removeBug(idx: number) {
    setForm(f => ({ ...f, bugs: f.bugs.filter((_, i) => i !== idx) }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.tester_name.trim()) errs.tester_name = "Name required"
    if (!form.tester_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.tester_email.trim())) errs.tester_email = "Valid email required"
    if (!form.tester_phone.trim() || form.tester_phone.replace(/\D/g, "").length < 10) errs.tester_phone = "Valid 10-digit mobile required"
    form.bugs.forEach((bug, idx) => Object.assign(errs, validateBug(bug, idx)))
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setServerError("")
    try {
      const fd = new globalThis.FormData()
      fd.append("tester_name", form.tester_name.trim())
      fd.append("tester_email", form.tester_email.trim())
      fd.append("tester_phone", form.tester_phone.trim())
      fd.append("team_name", form.team_name.trim())

      // bugs JSON without File objects
      const bugsData = form.bugs.map(b => ({
        page_url: b.page_url,
        feature_area: b.feature_area,
        category: b.category,
        severity: b.severity,
        what_tried: b.what_tried,
        steps: b.steps,
        expected: b.expected,
        actual: b.actual,
        screenshot_note: b.screenshot_note,
      }))
      fd.append("bugs", JSON.stringify(bugsData))

      // attach each screenshot file as screenshot_0, screenshot_1 etc.
      form.bugs.forEach((b, i) => {
        if (b.screenshotFile) fd.append(`screenshot_${i}`, b.screenshotFile)
      })

      const res = await fetch("/api/bug-bash", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || "Something went wrong. Try again."); return }
      setSuccess(true)
    } catch {
      setServerError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="bb">
        <div className="bb-page">

          {success ? (
            <div className="bb-card">
              <div className="bb-success">
                <div className="bb-success-icon">
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 className="bb-success-h2">Report Submitted!</h2>
                <p className="bb-success-p">
                  Your bug report with {form.bugs.length} bug{form.bugs.length > 1 ? "s" : ""} has been received. Great hunting!
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Header */}
              <div className="bb-header">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="bb-logo">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/></svg>
                    JOBINGEN · Bug Bash
                  </div>
                </div>
                <h1 className="bb-title">Bug Bash Report</h1>
                <p className="bb-sub">Find the bugs · Hunt them · Report them · Score points</p>
              </div>

              {/* Tester Info */}
              <div className="bb-card">
                <div className="bb-section">
                  <div className="bb-sec-label">Tester Info</div>
                  <div className="bb-grid2" style={{ marginBottom: 14 }}>
                    <div className="bb-field">
                      <label className="bb-label">Your Name <span className="bb-req">*</span></label>
                      <input
                        className={`bb-input${errors.tester_name ? " bb-err" : ""}`}
                        placeholder="Rahul Sharma"
                        value={form.tester_name}
                        onChange={e => { setForm(f => ({ ...f, tester_name: e.target.value })); setErrors(er => ({ ...er, tester_name: "" })) }}
                      />
                      {errors.tester_name && <span className="bb-err-msg">{errors.tester_name}</span>}
                    </div>
                    <div className="bb-field">
                      <label className="bb-label">Mobile Number <span className="bb-req">*</span></label>
                      <input
                        type="tel"
                        className={`bb-input${errors.tester_phone ? " bb-err" : ""}`}
                        placeholder="9876543210"
                        value={form.tester_phone ?? ""}
                        onChange={e => { setForm(f => ({ ...f, tester_phone: e.target.value })); setErrors(er => ({ ...er, tester_phone: "" })) }}
                      />
                      {errors.tester_phone && <span className="bb-err-msg">{errors.tester_phone}</span>}
                    </div>
                  </div>
                  <div className="bb-grid2" style={{ marginBottom: 14 }}>
                    <div className="bb-field">
                      <label className="bb-label">Email <span className="bb-req">*</span></label>
                      <input
                        type="email"
                        className={`bb-input${errors.tester_email ? " bb-err" : ""}`}
                        placeholder="you@email.com"
                        value={form.tester_email}
                        onChange={e => { setForm(f => ({ ...f, tester_email: e.target.value })); setErrors(er => ({ ...er, tester_email: "" })) }}
                      />
                      {errors.tester_email && <span className="bb-err-msg">{errors.tester_email}</span>}
                    </div>
                    <div className="bb-field">
                      <label className="bb-label">Team Name <span className="bb-opt">Optional</span></label>
                      <input
                        className="bb-input"
                        placeholder="e.g. Bug Hunters Team A"
                        value={form.team_name}
                        onChange={e => setForm(f => ({ ...f, team_name: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bug Cards */}
              {form.bugs.map((bug, idx) => (
                <BugCard
                  key={idx}
                  bug={bug}
                  index={idx}
                  total={form.bugs.length}
                  onChange={b => updateBug(idx, b)}
                  onRemove={() => removeBug(idx)}
                  errors={Object.fromEntries(
                    Object.entries(errors)
                      .filter(([k]) => k.startsWith(`${idx}_`))
                      .map(([k, v]) => [k.replace(`${idx}_`, ""), v])
                  )}
                />
              ))}

              {/* Add Bug */}
              <button type="button" className="bb-add-btn" onClick={addBug}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>
                Add Another Bug
              </button>

              {/* Submit */}
              <div className="bb-card">
                <div className="bb-section">
                  {serverError && (
                    <div className="bb-server-err" style={{ marginBottom: 16 }}>{serverError}</div>
                  )}
                  <button type="submit" className="bb-submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "bb-spin 1s linear infinite" }}>
                          <path d="M21 12a9 9 0 11-6.219-8.56"/>
                        </svg>
                        Uploading & Submitting...
                      </>
                    ) : (
                      <>
                        Submit Bug Report ({form.bugs.length} bug{form.bugs.length > 1 ? "s" : ""})
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </>
                    )}
                  </button>
                  <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", fontWeight: 600, marginTop: 12 }}>
                    Better reports = more points. A bug a developer can reproduce without asking scores the most.
                  </p>
                </div>
              </div>

            </form>
          )}
        </div>
      </div>
    </>
  )
}
