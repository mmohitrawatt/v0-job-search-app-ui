"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/landing/navbar"

type Vals = {
  team_name: string
  leader_name: string
  email: string
  project_title: string
  description: string
  tech_stack: string
  github_link: string
  demo_link: string
}

const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root {
    --navy: #0A1F44; --blue: #1B4DFF; --ice: #EAF1FF; --ice2: #F4F7FF;
    --border: #E2E8F0; --ink2: #374151; --ink3: #6B7280;
    --shadow-lg: 0 12px 40px rgba(10,31,68,.12);
  }
  @keyframes sb-spin { to{transform:rotate(360deg)} }
  @keyframes sb-pop { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:none} }
  @keyframes sb-check { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
  @keyframes sb-fade { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }

  body { font-family: 'Inter', system-ui, sans-serif; background: #F4F7FF; }

  .sb-page { min-height: 100vh; padding: 88px 20px 60px; display: flex; align-items: flex-start; justify-content: center; }
  .sb-inner { width: 100%; max-width: 720px; animation: sb-fade .45s ease both; }

  .sb-back { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--ink3); text-decoration: none; margin-bottom: 28px; transition: color .18s; }
  .sb-back:hover { color: var(--navy); }

  /* HEADER */
  .sb-hdr { margin-bottom: 28px; }
  .sb-pill { display: inline-flex; align-items: center; gap: 7px; background: white; border: 1.5px solid rgba(27,77,255,.14); border-radius: 99px; padding: 5px 14px; font-size: 11.5px; font-weight: 700; color: var(--blue); margin-bottom: 16px; }
  .sb-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: #f59e0b; }
  .sb-h1 { font-size: 30px; font-weight: 900; color: var(--navy); letter-spacing: -.04em; margin-bottom: 8px; }
  .sb-sub { font-size: 14px; color: var(--ink3); line-height: 1.65; }

  /* CARD */
  .sb-card { background: white; border: 1.5px solid var(--border); border-radius: 22px; overflow: hidden; box-shadow: var(--shadow-lg); }
  .sb-card-head { padding: 28px 36px 22px; background: var(--ice2); border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 14px; }
  .sb-card-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--navy); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .sb-card-title { font-size: 17px; font-weight: 900; color: var(--navy); letter-spacing: -.03em; margin-bottom: 3px; }
  .sb-card-sub { font-size: 12.5px; color: var(--ink3); }
  .sb-card-body { padding: 32px 36px; }
  @media(max-width:520px){ .sb-card-head,.sb-card-body { padding-left: 20px; padding-right: 20px; } }

  /* SECTION LABEL */
  .sb-sec-label { font-size: 10px; font-weight: 800; color: var(--blue); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 1px solid var(--border); }

  /* FIELDS */
  .sb-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media(max-width:500px){ .sb-row { grid-template-columns: 1fr; } }
  .sb-field { margin-bottom: 16px; }
  .sb-label { display: block; font-size: 11px; font-weight: 700; color: var(--ink2); margin-bottom: 7px; letter-spacing: .05em; text-transform: uppercase; }
  .sb-req { color: #EF4444; margin-left: 2px; }
  .sb-opt { text-transform: none; font-weight: 500; font-size: 10.5px; color: var(--ink3); }
  .sb-input, .sb-textarea {
    width: 100%; padding: 12px 15px;
    background: #F8FAFF; border: 1.5px solid var(--border); border-radius: 10px;
    font-size: 14px; color: var(--navy); font-family: inherit; outline: none;
    transition: border-color .18s, box-shadow .18s, background .18s;
  }
  .sb-input::placeholder,.sb-textarea::placeholder { color: #B0BCCC; }
  .sb-input:focus,.sb-textarea:focus { border-color: var(--blue); background: white; box-shadow: 0 0 0 3px rgba(27,77,255,.08); }
  .sb-input.err { border-color: #EF4444; }
  .sb-textarea { resize: vertical; min-height: 100px; line-height: 1.65; }
  .sb-errmsg { font-size: 11.5px; color: #EF4444; font-weight: 600; margin-top: 5px; }

  /* FILE UPLOAD */
  .sb-file-zone {
    border: 1.5px dashed var(--border); border-radius: 10px;
    padding: 20px; text-align: center; cursor: pointer;
    background: #F8FAFF; transition: border-color .18s, background .18s;
  }
  .sb-file-zone:hover { border-color: var(--blue); background: #f0f4ff; }
  .sb-file-zone.has-file { border-color: #22C55E; background: #f0fdf4; }
  .sb-file-icon { font-size: 22px; margin-bottom: 6px; }
  .sb-file-text { font-size: 12.5px; font-weight: 600; color: var(--ink2); margin-bottom: 3px; }
  .sb-file-hint { font-size: 11px; color: var(--ink3); }
  .sb-file-name { font-size: 12px; font-weight: 700; color: #16a34a; margin-top: 6px; }

  /* DIVIDER */
  .sb-divider { height: 1px; background: var(--border); margin: 8px 0 24px; }

  /* SUBMIT */
  .sb-serr { background: #FFF5F5; border: 1.5px solid #FED7D7; border-radius: 10px; padding: 12px 16px; font-size: 13px; color: #C53030; font-weight: 600; margin-bottom: 18px; }
  .sb-submit {
    width: 100%; padding: 15px; border: none; border-radius: 12px;
    background: var(--navy); color: white;
    font-size: 15px; font-weight: 800; font-family: inherit; cursor: pointer;
    box-shadow: 0 4px 18px rgba(10,31,68,.26); transition: background .2s, transform .18s, box-shadow .18s;
  }
  .sb-submit:hover:not(:disabled) { background: #0d2a5e; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(10,31,68,.34); }
  .sb-submit:disabled { opacity: .6; cursor: not-allowed; }
  .sb-submit-inner { display: flex; align-items: center; justify-content: center; gap: 9px; }
  .sb-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: white; border-radius: 50%; animation: sb-spin .7s linear infinite; }
  .sb-note { text-align: center; margin-top: 12px; font-size: 11.5px; color: var(--ink3); }

  /* SUCCESS */
  .sb-success-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #F4F7FF; padding: 88px 24px 40px; }
  .sb-success-card { background: white; border: 1.5px solid #E2E8F0; border-radius: 22px; padding: 56px 44px; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(10,31,68,.10); animation: sb-pop .5s ease both; }
  @media(max-width:480px){ .sb-success-card { padding: 38px 20px; } }
  .sb-success-icon { width: 72px; height: 72px; border-radius: 20px; background: #0A1F44; display: flex; align-items: center; justify-content: center; margin: 0 auto 26px; box-shadow: 0 8px 28px rgba(10,31,68,.26); }
  .sb-success-path { stroke-dasharray: 60; stroke-dashoffset: 60; animation: sb-check .5s .3s ease forwards; }
  .sb-success-h2 { font-size: 26px; font-weight: 900; color: #0A1F44; letter-spacing: -.04em; margin-bottom: 10px; }
  .sb-success-p { font-size: 14px; color: #374151; line-height: 1.75; margin-bottom: 26px; }
  .sb-success-em { font-weight: 700; color: #0A1F44; }
  .sb-success-tags { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px; }
  .sb-success-tag { background: #EAF1FF; border: 1px solid rgba(27,77,255,.14); border-radius: 99px; padding: 6px 14px; font-size: 12px; font-weight: 700; color: #1B4DFF; }
  .sb-wa-btn { display: inline-flex; align-items: center; gap: 9px; padding: 14px 28px; border-radius: 12px; background: #25D366; color: white; font-size: 14px; font-weight: 800; text-decoration: none; box-shadow: 0 4px 16px rgba(37,211,102,.28); transition: all .2s; margin-bottom: 14px; }
  .sb-wa-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,211,102,.38); }
  .sb-back-link { display: inline-block; font-size: 13px; font-weight: 600; color: #6B7280; text-decoration: none; transition: color .18s; }
  .sb-back-link:hover { color: #1B4DFF; }
`

function SuccessState({ project, name }: { project: string; name: string }) {
  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="sb-success-wrap">
        <div className="sb-success-card">
          <div className="sb-success-icon">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path className="sb-success-path" d="M5 17l8 8 16-16" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="sb-success-h2">Submission Received!</div>
          <p className="sb-success-p">
            <span className="sb-success-em">{project || "Your project"}</span> has been submitted successfully.
            Great work, <span className="sb-success-em">{name || "builder"}</span>!
            The Jobingen team will review all submissions and announce results shortly.
          </p>
          <div className="sb-success-tags">
            <span className="sb-success-tag">✓ Submitted</span>
            <span className="sb-success-tag">🔍 Under Review</span>
            <span className="sb-success-tag">🏆 Results Awaited</span>
          </div>
          <div style={{ marginBottom: 12 }}>
            <a href="https://chat.whatsapp.com/BVteQffk69HIjUI9xOYmPG" target="_blank" rel="noopener noreferrer" className="sb-wa-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Join WhatsApp Group
            </a>
          </div>
          <a href="/hackathon" className="sb-back-link">← Back to Hackathon</a>
        </div>
      </div>
    </>
  )
}

export default function SubmitPage() {
  const [vals, setVals] = useState<Vals>({
    team_name: "", leader_name: "", email: "",
    project_title: "", description: "", tech_stack: "",
    github_link: "", demo_link: "",
  })
  const [errs, setErrs] = useState<Partial<Vals>>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [sErr, setSErr] = useState("")
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function set(k: keyof Vals, v: string) {
    setVals(p => ({ ...p, [k]: v }))
    if (errs[k]) setErrs(p => { const x = { ...p }; delete x[k]; return x })
    setSErr("")
  }

  function validate() {
    const e: Partial<Vals> = {}
    if (!vals.team_name.trim()) e.team_name = "Team name is required."
    if (!vals.leader_name.trim()) e.leader_name = "Leader name is required."
    if (!vals.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = "Valid email required."
    if (!vals.project_title.trim()) e.project_title = "Project title is required."
    if (!vals.description.trim()) e.description = "Description is required."
    if (!vals.tech_stack.trim()) e.tech_stack = "Tech stack is required."
    if (!vals.github_link.trim()) e.github_link = "GitHub repo link is required."
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
      if (screenshot) fd.append("screenshot", screenshot)
      const r = await fetch("/api/hackathon-submit", { method: "POST", body: fd })
      const j = await r.json()
      if (!r.ok) { setSErr(j.error ?? "Submission failed. Please try again."); return }
      setDone(true)
    } catch { setSErr("Network error. Please try again.") }
    finally { setBusy(false) }
  }

  if (done) return <SuccessState project={vals.project_title} name={vals.leader_name} />

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="sb-page">
        <div className="sb-inner">

          <a href="/hackathon" className="sb-back">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Hackathon
          </a>

          <div className="sb-hdr">
            <div className="sb-pill">
              <span className="sb-pill-dot"/>
              Submissions Open
            </div>
            <h1 className="sb-h1">Submit Your Project</h1>
            <p className="sb-sub">Submit your AI Content Engine build for review. Include your GitHub repo and a short demo.</p>
          </div>

          <div className="sb-card">
            <div className="sb-card-head">
              <div className="sb-card-icon">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <div>
                <div className="sb-card-title">Project Submission Form</div>
                <div className="sb-card-sub">Jobingen AI Content Engine Hackathon 2026</div>
              </div>
            </div>

            <div className="sb-card-body">
              {sErr && <div className="sb-serr">⚠ {sErr}</div>}
              <form onSubmit={submit} noValidate>

                {/* TEAM DETAILS */}
                <div className="sb-sec-label">Team Details</div>
                <div className="sb-row">
                  <div className="sb-field">
                    <label className="sb-label">Team Name<span className="sb-req">*</span></label>
                    <input className={`sb-input${errs.team_name ? " err" : ""}`} placeholder="Team Nexus" value={vals.team_name} onChange={e => set("team_name", e.target.value)}/>
                    {errs.team_name && <div className="sb-errmsg">{errs.team_name}</div>}
                  </div>
                  <div className="sb-field">
                    <label className="sb-label">Team Leader Name<span className="sb-req">*</span></label>
                    <input className={`sb-input${errs.leader_name ? " err" : ""}`} placeholder="Arjun Sharma" value={vals.leader_name} onChange={e => set("leader_name", e.target.value)}/>
                    {errs.leader_name && <div className="sb-errmsg">{errs.leader_name}</div>}
                  </div>
                </div>
                <div className="sb-field" style={{ marginBottom: 24 }}>
                  <label className="sb-label">Email Address<span className="sb-req">*</span></label>
                  <input type="email" className={`sb-input${errs.email ? " err" : ""}`} placeholder="arjun@gmail.com" value={vals.email} onChange={e => set("email", e.target.value)}/>
                  {errs.email && <div className="sb-errmsg">{errs.email}</div>}
                </div>

                <div className="sb-divider"/>

                {/* PROJECT DETAILS */}
                <div className="sb-sec-label">Project Details</div>
                <div className="sb-field">
                  <label className="sb-label">Project Title<span className="sb-req">*</span></label>
                  <input className={`sb-input${errs.project_title ? " err" : ""}`} placeholder="Jobingen AI Content Engine v1.0" value={vals.project_title} onChange={e => set("project_title", e.target.value)}/>
                  {errs.project_title && <div className="sb-errmsg">{errs.project_title}</div>}
                </div>
                <div className="sb-field">
                  <label className="sb-label">Project Description<span className="sb-req">*</span></label>
                  <textarea className={`sb-textarea${errs.description ? " err" : ""}`} rows={4} placeholder="Describe what you built — how it works, what modules are implemented, and what makes it stand out..." value={vals.description} onChange={e => set("description", e.target.value)}/>
                  {errs.description && <div className="sb-errmsg">{errs.description}</div>}
                </div>
                <div className="sb-field">
                  <label className="sb-label">Tech Stack Used<span className="sb-req">*</span></label>
                  <input className={`sb-input${errs.tech_stack ? " err" : ""}`} placeholder="Python, LangChain, Puppeteer, n8n, Claude API..." value={vals.tech_stack} onChange={e => set("tech_stack", e.target.value)}/>
                  {errs.tech_stack && <div className="sb-errmsg">{errs.tech_stack}</div>}
                </div>

                <div className="sb-divider"/>

                {/* LINKS */}
                <div className="sb-sec-label">Links</div>
                <div className="sb-row">
                  <div className="sb-field">
                    <label className="sb-label">GitHub Repo<span className="sb-req">*</span></label>
                    <input className={`sb-input${errs.github_link ? " err" : ""}`} placeholder="github.com/team/project" value={vals.github_link} onChange={e => set("github_link", e.target.value)}/>
                    {errs.github_link && <div className="sb-errmsg">{errs.github_link}</div>}
                  </div>
                  <div className="sb-field">
                    <label className="sb-label">Demo / Video Link <span className="sb-opt">(optional)</span></label>
                    <input className="sb-input" placeholder="youtube.com/watch?v=... or loom.com/..." value={vals.demo_link} onChange={e => set("demo_link", e.target.value)}/>
                  </div>
                </div>

                <div className="sb-divider"/>

                {/* SCREENSHOT */}
                <div className="sb-sec-label">Screenshot <span style={{ textTransform: "none", fontWeight: 500, fontSize: 10, color: "#6B7280", letterSpacing: 0 }}>(optional)</span></div>
                <div className="sb-field" style={{ marginBottom: 28 }}>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => setScreenshot(e.target.files?.[0] ?? null)}/>
                  <div
                    className={`sb-file-zone${screenshot ? " has-file" : ""}`}
                    onClick={() => fileRef.current?.click()}
                  >
                    <div className="sb-file-icon">{screenshot ? "✅" : "🖼️"}</div>
                    <div className="sb-file-text">{screenshot ? "Screenshot attached" : "Click to upload a screenshot"}</div>
                    <div className="sb-file-hint">PNG, JPG up to 5MB</div>
                    {screenshot && <div className="sb-file-name">{screenshot.name}</div>}
                  </div>
                </div>

                <button type="submit" className="sb-submit" disabled={busy}>
                  <span className="sb-submit-inner">
                    {busy && <span className="sb-spinner"/>}
                    {busy ? "Submitting…" : "Submit Project →"}
                  </span>
                </button>
                <div className="sb-note">Make sure your GitHub repo is public before submitting.</div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
