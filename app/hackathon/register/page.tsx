"use client"

import { useState } from "react"
import { Navbar } from "@/components/landing/navbar"

type FormVals = Record<string, string>

const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root {
    --navy: #0A1F44; --blue: #1B4DFF; --ice: #EAF1FF; --ice2: #F4F7FF;
    --border: #E2E8F0; --ink2: #374151; --ink3: #6B7280;
    --shadow-md: 0 4px 20px rgba(10,31,68,.08);
    --shadow-lg: 0 12px 40px rgba(10,31,68,.12);
  }
  @keyframes rg-spin { to{transform:rotate(360deg)} }
  @keyframes rg-pop { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:none} }
  @keyframes rg-check { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
  @keyframes rg-fade { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }

  body { font-family: 'Inter', system-ui, sans-serif; background: #F4F7FF; }

  /* PAGE WRAP */
  .rg-page { min-height: 100vh; padding: 88px 20px 60px; display: flex; align-items: flex-start; justify-content: center; }
  .rg-inner { width: 100%; max-width: 680px; animation: rg-fade .45s ease both; }

  /* BACK LINK */
  .rg-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--ink3); text-decoration: none; margin-bottom: 28px; transition: color .18s; }
  .rg-back:hover { color: var(--navy); }

  /* HEADER */
  .rg-hdr { margin-bottom: 28px; }
  .rg-pill { display: inline-flex; align-items: center; gap: 6px; background: white; border: 1.5px solid rgba(27,77,255,.14); border-radius: 99px; padding: 5px 14px; font-size: 11.5px; font-weight: 700; color: var(--blue); margin-bottom: 16px; }
  .rg-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: #22C55E; animation: rg-spin 0s linear infinite; }
  .rg-h1 { font-size: 30px; font-weight: 900; color: var(--navy); letter-spacing: -.04em; margin-bottom: 8px; }
  .rg-sub { font-size: 14px; color: var(--ink3); line-height: 1.65; }

  /* FORM CARD */
  .rg-card { background: white; border: 1.5px solid var(--border); border-radius: 22px; overflow: hidden; box-shadow: var(--shadow-lg); }
  .rg-card-head { padding: 28px 36px 22px; background: var(--ice2); border-bottom: 1px solid var(--border); }
  .rg-card-title { font-size: 17px; font-weight: 900; color: var(--navy); letter-spacing: -.03em; margin-bottom: 4px; }
  .rg-card-sub { font-size: 12.5px; color: var(--ink3); }
  .rg-card-body { padding: 32px 36px; }
  @media(max-width:520px){ .rg-card-head,.rg-card-body { padding-left: 20px; padding-right: 20px; } }

  /* FORM FIELDS */
  .rg-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media(max-width:480px){ .rg-row { grid-template-columns: 1fr; } }
  .rg-field { margin-bottom: 16px; }
  .rg-label { display: block; font-size: 11px; font-weight: 700; color: var(--ink2); margin-bottom: 7px; letter-spacing: .05em; text-transform: uppercase; }
  .rg-req { color: #EF4444; margin-left: 2px; }
  .rg-input, .rg-select, .rg-textarea {
    width: 100%; padding: 12px 15px;
    background: #F8FAFF; border: 1.5px solid var(--border); border-radius: 10px;
    font-size: 14px; color: var(--navy); font-family: inherit; outline: none;
    transition: border-color .18s, box-shadow .18s, background .18s; appearance: none;
  }
  .rg-input::placeholder,.rg-textarea::placeholder { color: #B0BCCC; }
  .rg-input:focus,.rg-select:focus,.rg-textarea:focus { border-color: var(--blue); background: white; box-shadow: 0 0 0 3px rgba(27,77,255,.08); }
  .rg-input.err,.rg-select.err { border-color: #EF4444; }
  .rg-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath fill='%236B7280' d='M5 7L0 0h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; cursor: pointer;
  }
  .rg-textarea { resize: vertical; min-height: 84px; line-height: 1.65; }
  .rg-errmsg { font-size: 11.5px; color: #EF4444; font-weight: 600; margin-top: 5px; }
  .rg-divider { height: 1px; background: var(--border); margin: 4px 0 18px; }
  .rg-serr { background: #FFF5F5; border: 1.5px solid #FED7D7; border-radius: 10px; padding: 12px 16px; font-size: 13px; color: #C53030; font-weight: 600; margin-bottom: 18px; }

  /* SUBMIT BTN */
  .rg-submit {
    width: 100%; padding: 15px; border: none; border-radius: 12px;
    background: var(--navy); color: white;
    font-size: 15px; font-weight: 800; font-family: inherit; cursor: pointer; letter-spacing: -.01em;
    box-shadow: 0 4px 18px rgba(10,31,68,.26); transition: background .2s, transform .18s, box-shadow .18s;
  }
  .rg-submit:hover:not(:disabled) { background: #0d2a5e; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(10,31,68,.34); }
  .rg-submit:disabled { opacity: .6; cursor: not-allowed; }
  .rg-submit-inner { display: flex; align-items: center; justify-content: center; gap: 9px; }
  .rg-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: white; border-radius: 50%; animation: rg-spin .7s linear infinite; }
  .rg-free { text-align: center; margin-top: 12px; font-size: 12px; color: var(--ink3); }

  /* SUCCESS */
  .rg-success-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #F4F7FF; padding: 88px 24px 40px; }
  .rg-success-card { background: white; border: 1.5px solid #E2E8F0; border-radius: 22px; padding: 56px 44px; max-width: 460px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(10,31,68,.10); animation: rg-pop .5s ease both; }
  @media(max-width:480px){ .rg-success-card { padding: 38px 20px; } }
  .rg-success-icon { width: 72px; height: 72px; border-radius: 20px; background: #0A1F44; display: flex; align-items: center; justify-content: center; margin: 0 auto 26px; box-shadow: 0 8px 28px rgba(10,31,68,.26); }
  .rg-success-path { stroke-dasharray: 60; stroke-dashoffset: 60; animation: rg-check .5s .3s ease forwards; }
  .rg-success-h2 { font-size: 26px; font-weight: 900; color: #0A1F44; letter-spacing: -.04em; margin-bottom: 10px; }
  .rg-success-p { font-size: 14px; color: #374151; line-height: 1.75; margin-bottom: 26px; }
  .rg-success-em { font-weight: 700; color: #0A1F44; }
  .rg-success-tags { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px; }
  .rg-success-tag { background: #EAF1FF; border: 1px solid rgba(27,77,255,.14); border-radius: 99px; padding: 6px 14px; font-size: 12px; font-weight: 700; color: #1B4DFF; }
  .rg-wa-btn { display: inline-flex; align-items: center; gap: 9px; padding: 14px 28px; border-radius: 12px; background: #25D366; color: white; font-size: 14px; font-weight: 800; text-decoration: none; box-shadow: 0 4px 16px rgba(37,211,102,.28); transition: all .2s; margin-bottom: 14px; }
  .rg-wa-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,211,102,.38); }
  .rg-back-home { display: inline-block; font-size: 13px; font-weight: 600; color: var(--ink3); text-decoration: none; transition: color .18s; }
  .rg-back-home:hover { color: var(--blue); }
`

function SuccessState({ name, email }: { name: string; email: string }) {
  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="rg-success-wrap">
        <div className="rg-success-card">
          <div className="rg-success-icon">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path className="rg-success-path" d="M5 17l8 8 16-16" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="rg-success-h2">You&apos;re Registered!</div>
          <p className="rg-success-p">
            Hey <span className="rg-success-em">{name || "there"}</span> — your spot for the{" "}
            <span className="rg-success-em">Jobingen AI Content Engine Hackathon</span> is confirmed.
            Problem brief and details will be sent to <span className="rg-success-em">{email}</span>.
          </p>
          <div className="rg-success-tags">
            <span className="rg-success-tag">✓ Registered</span>
            <span className="rg-success-tag">📧 Email Confirmed</span>
            <span className="rg-success-tag">🆓 Free Entry</span>
          </div>
          <div style={{ marginBottom: 12 }}>
            <a href="https://chat.whatsapp.com/BVteQffk69HIjUI9xOYmPG" target="_blank" rel="noopener noreferrer" className="rg-wa-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Join WhatsApp Group
            </a>
          </div>
          <a href="/hackathon" className="rg-back-home">← Back to Hackathon</a>
        </div>
      </div>
    </>
  )
}

export default function RegisterPage() {
  const [vals, setVals] = useState<FormVals>({})
  const [errs, setErrs] = useState<FormVals>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [sErr, setSErr] = useState("")

  function set(n: string, v: string) {
    setVals(p => ({ ...p, [n]: v }))
    if (errs[n]) setErrs(p => { const x = { ...p }; delete x[n]; return x })
    setSErr("")
  }

  function validate() {
    const e: FormVals = {}
    if (!vals.name?.trim()) e.name = "Full name is required."
    if (!vals.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = "Valid email required."
    if (!vals.phone?.trim() || vals.phone.replace(/\D/g, "").length < 10) e.phone = "Valid 10-digit number required."
    if (!vals.college?.trim()) e.college = "College / institution is required."
    if (!vals.year) e.year = "Please select your year."
    return e
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const ve = validate()
    if (Object.keys(ve).length) { setErrs(ve); return }
    setBusy(true); setSErr("")
    try {
      const fd = new FormData()
      Object.entries(vals).forEach(([k, v]) => fd.append(k, v))
      const r = await fetch("/api/hackathon-register", { method: "POST", body: fd })
      const j = await r.json()
      if (!r.ok) { setSErr(j.error ?? "Registration failed. Please try again."); return }
      setDone(true)
    } catch { setSErr("Network error. Please try again.") }
    finally { setBusy(false) }
  }

  if (done) return <SuccessState name={vals.name ?? ""} email={vals.email ?? ""} />

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="rg-page">
        <div className="rg-inner">

          <a href="/hackathon" className="rg-back">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Hackathon
          </a>

          <div className="rg-hdr">
            <div className="rg-pill">
              <span className="rg-pill-dot"/>
              Registrations Open
            </div>
            <h1 className="rg-h1">Register for the Hackathon</h1>
            <p className="rg-sub">Free entry · Takes 2 minutes · Internship prize for top builders</p>
          </div>

          <div className="rg-card">
            <div className="rg-card-head">
              <div className="rg-card-title">Jobingen AI Content Engine Hackathon</div>
              <div className="rg-card-sub">AI Content Engine · Free Entry · Internship Prize</div>
            </div>
            <div className="rg-card-body">
              {sErr && <div className="rg-serr">⚠ {sErr}</div>}
              <form onSubmit={submit} noValidate>
                <div className="rg-row">
                  <div className="rg-field">
                    <label className="rg-label">Full Name<span className="rg-req">*</span></label>
                    <input className={`rg-input${errs.name ? " err" : ""}`} placeholder="Arjun Sharma" value={vals.name ?? ""} onChange={e => set("name", e.target.value)}/>
                    {errs.name && <div className="rg-errmsg">{errs.name}</div>}
                  </div>
                  <div className="rg-field">
                    <label className="rg-label">Email Address<span className="rg-req">*</span></label>
                    <input type="email" className={`rg-input${errs.email ? " err" : ""}`} placeholder="arjun@gmail.com" value={vals.email ?? ""} onChange={e => set("email", e.target.value)}/>
                    {errs.email && <div className="rg-errmsg">{errs.email}</div>}
                  </div>
                </div>
                <div className="rg-row">
                  <div className="rg-field">
                    <label className="rg-label">Phone Number<span className="rg-req">*</span></label>
                    <input type="tel" className={`rg-input${errs.phone ? " err" : ""}`} placeholder="9876543210" value={vals.phone ?? ""} onChange={e => set("phone", e.target.value)}/>
                    {errs.phone && <div className="rg-errmsg">{errs.phone}</div>}
                  </div>
                  <div className="rg-field">
                    <label className="rg-label">College / Institution<span className="rg-req">*</span></label>
                    <input className={`rg-input${errs.college ? " err" : ""}`} placeholder="IIT Delhi" value={vals.college ?? ""} onChange={e => set("college", e.target.value)}/>
                    {errs.college && <div className="rg-errmsg">{errs.college}</div>}
                  </div>
                </div>
                <div className="rg-row">
                  <div className="rg-field">
                    <label className="rg-label">Year of Study<span className="rg-req">*</span></label>
                    <select className={`rg-select${errs.year ? " err" : ""}`} value={vals.year ?? ""} onChange={e => set("year", e.target.value)}>
                      <option value="">Select…</option>
                      {["1st Year","2nd Year","3rd Year","4th Year","Final Year (5yr)","Recent Graduate","Working Professional"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {errs.year && <div className="rg-errmsg">{errs.year}</div>}
                  </div>
                  <div className="rg-field">
                    <label className="rg-label">Tech Stack <span style={{ textTransform: "none", fontWeight: 500, fontSize: 11, color: "#6B7280" }}>(optional)</span></label>
                    <input className="rg-input" placeholder="Python, LangChain, Node.js…" value={vals.tech_stack ?? ""} onChange={e => set("tech_stack", e.target.value)}/>
                  </div>
                </div>
                <div className="rg-row">
                  <div className="rg-field">
                    <label className="rg-label">GitHub / Portfolio <span style={{ textTransform: "none", fontWeight: 500, fontSize: 11, color: "#6B7280" }}>(optional)</span></label>
                    <input className="rg-input" placeholder="github.com/you" value={vals.github ?? ""} onChange={e => set("github", e.target.value)}/>
                  </div>
                  <div className="rg-field">
                    <label className="rg-label">Team Name <span style={{ textTransform: "none", fontWeight: 500, fontSize: 11, color: "#6B7280" }}>(optional)</span></label>
                    <input className="rg-input" placeholder="Team Nexus" value={vals.team_name ?? ""} onChange={e => set("team_name", e.target.value)}/>
                  </div>
                </div>
                <div className="rg-divider"/>
                <div className="rg-field">
                  <label className="rg-label">Why do you want to participate? <span style={{ textTransform: "none", fontWeight: 500, fontSize: 11, color: "#6B7280" }}>(optional)</span></label>
                  <textarea className="rg-textarea" rows={3} placeholder="What excites you about this AI content automation challenge?" value={vals.why ?? ""} onChange={e => set("why", e.target.value)}/>
                </div>
                <button type="submit" className="rg-submit" disabled={busy}>
                  <span className="rg-submit-inner">
                    {busy && <span className="rg-spinner"/>}
                    {busy ? "Registering…" : "Submit Registration →"}
                  </span>
                </button>
                <div className="rg-free">🔒 Free entry · No payment · No spam</div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
