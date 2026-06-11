"use client"

import { useState } from "react"
import { Navbar } from "@/components/landing/navbar"

type F = { name: string; label: string; type: "text"|"email"|"tel"|"select"|"textarea"; placeholder?: string; required?: boolean; options?: string[] }

const FIELDS: F[] = [
  { name:"name",       label:"Full Name",             type:"text",     placeholder:"Arjun Sharma",       required:true },
  { name:"email",      label:"Email Address",          type:"email",    placeholder:"arjun@gmail.com",    required:true },
  { name:"phone",      label:"Phone Number",           type:"tel",      placeholder:"9876543210",         required:true },
  { name:"college",    label:"College / Institution",  type:"text",     placeholder:"IIT Delhi",          required:true },
  { name:"year",       label:"Year of Study",          type:"select",   required:true,
    options:["1st Year","2nd Year","3rd Year","4th Year","Final Year (5yr)","Recent Graduate","Working Professional"] },
  { name:"tech_stack", label:"Tech Stack",             type:"text",     placeholder:"Python, LangChain…", required:false },
  { name:"github",     label:"GitHub / Portfolio (optional)", type:"text", placeholder:"github.com/you",  required:false },
  { name:"team_name",  label:"Team Name (optional)",   type:"text",     placeholder:"Team Nexus",         required:false },
  { name:"why",        label:"Why do you want to participate? (optional)", type:"textarea",
    placeholder:"What excites you about AI-powered content automation?",  required:false },
]

export default function HackathonPage() {
  const [vals, setVals]   = useState<Record<string,string>>({})
  const [errs, setErrs]   = useState<Record<string,string>>({})
  const [busy, setBusy]   = useState(false)
  const [done, setDone]   = useState(false)
  const [sErr, setSErr]   = useState("")

  function set(n:string, v:string) {
    setVals(p=>({...p,[n]:v}))
    if (errs[n]) setErrs(p=>{ const x={...p}; delete x[n]; return x })
  }

  function validate() {
    const e:Record<string,string> = {}
    for (const f of FIELDS) {
      if (!f.required) continue
      const v=(vals[f.name]??"").trim()
      if (!v){ e[f.name]=`${f.label} is required.`; continue }
      if (f.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e[f.name]="Enter a valid email."
      if (f.type==="tel"&&v.replace(/\D/g,"").length<10) e[f.name]="Enter a valid 10-digit number."
    }
    return e
  }

  async function submit(e:React.FormEvent) {
    e.preventDefault()
    const ve=validate()
    if (Object.keys(ve).length){ setErrs(ve); return }
    setBusy(true); setSErr("")
    try {
      const fd=new FormData()
      Object.entries(vals).forEach(([k,v])=>fd.append(k,v))
      const r=await fetch("/api/hackathon-register",{method:"POST",body:fd})
      const j=await r.json()
      if (!r.ok){ setSErr(j.error??"Registration failed. Please try again."); return }
      setDone(true)
    } catch { setSErr("Network error. Please try again.") }
    finally { setBusy(false) }
  }

  /* ── success ── */
  if (done) return (
    <>
      <Navbar />
      <style>{`
        @keyframes sc-pop{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:none}}
        @keyframes sc-check{from{stroke-dashoffset:60}to{stroke-dashoffset:0}}
        @keyframes sc-ring{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.5);opacity:0}}
        .sc-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f8faff;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
        .sc-card{background:white;border:1.5px solid #dde5ff;border-radius:24px;padding:56px 48px;max-width:460px;width:100%;text-align:center;box-shadow:0 8px 48px rgba(29,58,143,.09);animation:sc-pop .5s cubic-bezier(.16,1,.3,1)}
        @media(max-width:500px){.sc-card{padding:40px 24px}}
        .sc-icon{position:relative;display:inline-flex;align-items:center;justify-content:center;margin-bottom:28px}
        .sc-ring{position:absolute;width:84px;height:84px;border-radius:50%;border:2px solid rgba(29,58,143,.18);animation:sc-ring 2.2s ease-out infinite}
        .sc-circle{width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#1a3585,#4668f5);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(29,58,143,.28)}
        .sc-path{stroke-dasharray:60;stroke-dashoffset:60;animation:sc-check .5s .3s cubic-bezier(.16,1,.3,1) forwards}
        .sc-title{font-size:26px;font-weight:900;color:#0f172a;letter-spacing:-.03em;margin-bottom:10px}
        .sc-body{font-size:14.5px;color:#475569;line-height:1.75;margin-bottom:28px}
        .sc-em{font-weight:700;color:#1d3a8f}
        .sc-tags{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:32px}
        .sc-tag{background:#eef2ff;border:1.5px solid #c7d2fe;border-radius:99px;padding:6px 16px;font-size:12px;font-weight:700;color:#1d3a8f}
        .sc-btn{display:inline-block;padding:12px 32px;border-radius:12px;background:linear-gradient(135deg,#1a3585,#4668f5);color:white;font-size:14px;font-weight:700;text-decoration:none}
      `}</style>
      <div className="sc-wrap">
        <div className="sc-card">
          <div className="sc-icon">
            <div className="sc-ring"/>
            <div className="sc-circle">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path className="sc-path" d="M5 15l7 7 13-13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="sc-title">{"You're In! 🎉"}</div>
          <p className="sc-body">
            Hey <span className="sc-em">{vals.name||"there"}</span> — your spot for the{" "}
            <span className="sc-em">Jobingen AI Content Engine Hackathon</span> is confirmed.
            We will email you at <span className="sc-em">{vals.email}</span> with the problem brief, dataset, and next steps.
          </p>
          <div className="sc-tags">
            <span className="sc-tag">✓ Registered</span>
            <span className="sc-tag">📧 Email on the way</span>
            <span className="sc-tag">🆓 Free Entry</span>
          </div>
          <a href="/careers" className="sc-btn">← Back to Careers</a>
        </div>
      </div>
    </>
  )

  /* ── main page ── */
  return (
    <>
      <Navbar />
      <style>{`
        @keyframes hk-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        @keyframes hk-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.55)}}
        @keyframes hk-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

        .hk{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Inter',sans-serif;-webkit-font-smoothing:antialiased;color:#0f172a;background:#f8faff;overflow-x:hidden}
        .hk *{box-sizing:border-box;margin:0;padding:0}

        /* HERO */
        .hk-hero{
          position:relative;overflow:hidden;
          background:linear-gradient(160deg,#edf0ff 0%,#f2f5ff 55%,#f8faff 100%);
          padding:160px 24px 100px;text-align:center;border-bottom:1px solid #e4e9ff
        }
        .hk-grid{position:absolute;inset:0;background-image:radial-gradient(rgba(29,58,143,.04) 1px,transparent 1px);background-size:38px 38px;pointer-events:none}
        .hk-blob-a{position:absolute;top:-12%;right:-6%;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(29,58,143,.07) 0%,transparent 60%);pointer-events:none}
        .hk-blob-b{position:absolute;bottom:-15%;left:-4%;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(70,104,245,.06) 0%,transparent 60%);pointer-events:none}

        .hk-inner{position:relative;max-width:720px;margin:0 auto}

        .hk-badge{
          display:inline-flex;align-items:center;gap:7px;padding:6px 18px;
          background:white;border:1.5px solid #dde5ff;border-radius:99px;margin-bottom:28px;
          box-shadow:0 2px 12px rgba(29,58,143,.08);
          animation:hk-up .5s cubic-bezier(.16,1,.3,1) both
        }
        .hk-dot{width:6px;height:6px;border-radius:50%;background:#16a34a;box-shadow:0 0 6px rgba(22,163,74,.5);animation:hk-pulse 2s infinite;flex-shrink:0}
        .hk-badge-txt{font-size:11px;font-weight:800;color:#1d3a8f;letter-spacing:.07em;text-transform:uppercase}

        .hk-h1{
          font-size:clamp(36px,5.5vw,64px);font-weight:900;color:#0f172a;
          letter-spacing:-.045em;line-height:1.05;margin-bottom:20px;
          animation:hk-up .6s cubic-bezier(.16,1,.3,1) .06s both
        }
        .hk-grad{background:linear-gradient(135deg,#1a3585,#2d4fd4 55%,#4668f5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

        .hk-sub{
          font-size:clamp(15px,1.8vw,18px);color:#64748b;line-height:1.75;
          max-width:540px;margin:0 auto 36px;
          animation:hk-up .6s cubic-bezier(.16,1,.3,1) .12s both
        }

        .hk-chips{
          display:flex;flex-wrap:wrap;gap:10px;justify-content:center;
          animation:hk-up .6s cubic-bezier(.16,1,.3,1) .18s both
        }
        .hk-chip{
          display:inline-flex;align-items:center;gap:6px;padding:7px 18px;
          background:white;border:1.5px solid #e0e7ff;border-radius:99px;
          font-size:13px;font-weight:600;color:#1d3a8f;
          box-shadow:0 1px 6px rgba(29,58,143,.06)
        }

        /* PERKS */
        .hk-perks-wrap{max-width:800px;margin:0 auto;padding:64px 24px 0}
        .hk-perks{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        @media(max-width:700px){.hk-perks{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:400px){.hk-perks{grid-template-columns:1fr}}
        .hk-perk{
          background:white;border:1.5px solid #e8edff;border-radius:16px;
          padding:20px 16px;text-align:center;
          box-shadow:0 2px 10px rgba(29,58,143,.04)
        }
        .hk-perk-ico{font-size:26px;margin-bottom:8px}
        .hk-perk-lbl{font-size:13px;font-weight:700;color:#0f172a;margin-bottom:3px}
        .hk-perk-sub{font-size:11.5px;color:#94a3b8;line-height:1.45}

        /* FORM SECTION */
        .hk-form-wrap{max-width:600px;margin:0 auto;padding:72px 24px 80px}

        .hk-form-head{text-align:center;margin-bottom:36px}
        .hk-form-title{font-size:clamp(22px,3vw,28px);font-weight:800;color:#0f172a;letter-spacing:-.03em;margin-bottom:8px}
        .hk-form-sub{font-size:14px;color:#94a3b8}

        .hk-card{
          background:white;border:1.5px solid #e4e9ff;border-radius:22px;
          padding:40px 36px;box-shadow:0 4px 36px rgba(29,58,143,.08)
        }
        @media(max-width:560px){.hk-card{padding:28px 20px;border-radius:18px}}

        /* fields */
        .hk-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        @media(max-width:500px){.hk-row{grid-template-columns:1fr}}
        .hk-field{margin-bottom:20px}
        .hk-lbl{display:block;font-size:12.5px;font-weight:700;color:#475569;margin-bottom:7px;letter-spacing:.01em}
        .hk-req{color:#ef4444;margin-left:2px}
        .hk-input,.hk-select,.hk-textarea{
          width:100%;padding:12px 15px;
          background:#fafbff;border:1.5px solid #e4e9ff;border-radius:12px;
          font-size:14px;color:#0f172a;font-family:inherit;
          outline:none;transition:border-color .18s,box-shadow .18s,background .18s;appearance:none
        }
        .hk-input::placeholder,.hk-textarea::placeholder{color:#c0cce0}
        .hk-input:focus,.hk-select:focus,.hk-textarea:focus{
          border-color:#1d3a8f;box-shadow:0 0 0 3px rgba(29,58,143,.09);background:white
        }
        .hk-input.e,.hk-select.e,.hk-textarea.e{border-color:#ef4444;box-shadow:0 0 0 3px rgba(239,68,68,.07)}
        .hk-emsg{font-size:11.5px;color:#ef4444;margin-top:5px;font-weight:600}
        .hk-select{
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath fill='%2394a3b8' d='M5 7L0 0h10z'/%3E%3C/svg%3E");
          background-repeat:no-repeat;background-position:right 14px center;padding-right:36px;cursor:pointer
        }
        .hk-textarea{resize:vertical;min-height:88px;line-height:1.65}

        .hk-divider{height:1px;background:#f0f4ff;margin:8px 0 24px}

        /* submit */
        .hk-btn{
          width:100%;padding:15px;border:none;border-radius:13px;cursor:pointer;font-family:inherit;
          background:linear-gradient(135deg,#1a3585,#2d4fd4 55%,#4668f5);
          color:white;font-size:15px;font-weight:800;letter-spacing:.01em;
          box-shadow:0 4px 20px rgba(29,58,143,.3);transition:transform .18s,box-shadow .18s
        }
        .hk-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 28px rgba(29,58,143,.38)}
        .hk-btn:disabled{opacity:.6;cursor:not-allowed}
        .hk-btn-inner{display:flex;align-items:center;justify-content:center;gap:8px}
        .hk-spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,.35);border-top-color:white;border-radius:50%;animation:hk-spin .7s linear infinite}

        .hk-serr{background:#fff5f5;border:1.5px solid #fed7d7;border-radius:11px;padding:12px 16px;font-size:13px;color:#e53e3e;font-weight:600;margin-bottom:20px;line-height:1.5}
        .hk-free{text-align:center;margin-top:14px;font-size:12px;color:#c0cce0}

        /* STEPS */
        .hk-steps-wrap{background:white;border-top:1px solid #f0f4ff;padding:64px 24px 80px}
        .hk-steps-inner{max-width:680px;margin:0 auto}
        .hk-steps-title{font-size:clamp(20px,2.8vw,26px);font-weight:800;color:#0f172a;text-align:center;margin-bottom:40px;letter-spacing:-.02em}
        .hk-steps{display:flex;flex-direction:column;gap:0}
        .hk-step{display:flex;gap:18px;align-items:flex-start;position:relative;padding-bottom:28px}
        .hk-step:last-child{padding-bottom:0}
        .hk-step-line{position:absolute;left:15px;top:32px;bottom:0;width:2px;background:#f0f4ff}
        .hk-step:last-child .hk-step-line{display:none}
        .hk-step-num{
          flex-shrink:0;width:32px;height:32px;border-radius:50%;
          background:linear-gradient(135deg,#1a3585,#4668f5);
          display:flex;align-items:center;justify-content:center;
          font-size:13px;font-weight:800;color:white;
          box-shadow:0 2px 10px rgba(29,58,143,.2);position:relative;z-index:1
        }
        .hk-step-body{padding-top:5px}
        .hk-step-t{font-size:14px;font-weight:700;color:#0f172a;margin-bottom:3px}
        .hk-step-d{font-size:13px;color:#64748b;line-height:1.6}
      `}</style>

      <div className="hk">

        {/* ── HERO ── */}
        <div className="hk-hero">
          <div className="hk-grid"/>
          <div className="hk-blob-a"/>
          <div className="hk-blob-b"/>
          <div className="hk-inner">
            <div className="hk-badge">
              <span className="hk-dot"/>
              <span className="hk-badge-txt">Open Hackathon · Registrations Live</span>
            </div>
            <h1 className="hk-h1">
              Win the Hackathon.<br/>
              <span className="hk-grad">Join as AI Engineer Intern.</span>
            </h1>
            <p className="hk-sub">
              Build an AI Content Creation Engine for Jobingen in a 48-hour sprint. Top performers get a real <strong>AI Engineer Internship offer (6–8 weeks)</strong>.
            </p>
            <div className="hk-chips">
              <span className="hk-chip">🆓 Free Entry</span>
              <span className="hk-chip">💼 Internship for Winners</span>
              <span className="hk-chip">⏱ 48-Hour Sprint</span>
              <span className="hk-chip">🌐 100% Online</span>
            </div>
          </div>
        </div>

        {/* ── PERKS ── */}
        <div className="hk-perks-wrap">
          <div className="hk-perks">
            {[
              { ico:"💼", lbl:"AI Engineer Intern",   sub:"6–8 weeks, real product" },
              { ico:"🚀", lbl:"Ships to Production",  sub:"Your code goes live at Jobingen" },
              { ico:"🤝", lbl:"Founder Mentorship",   sub:"Direct 1-on-1 access" },
              { ico:"📜", lbl:"Certificate",          sub:"For shortlisted participants" },
            ].map(p=>(
              <div key={p.lbl} className="hk-perk">
                <div className="hk-perk-ico">{p.ico}</div>
                <div className="hk-perk-lbl">{p.lbl}</div>
                <div className="hk-perk-sub">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="hk-form-wrap">
          <div className="hk-form-head">
            <div className="hk-form-title">Register for Free</div>
            <div className="hk-form-sub">Takes 2 minutes · No fee · No spam.</div>
          </div>

          <div className="hk-card">
            {sErr && <div className="hk-serr">⚠ {sErr}</div>}

            <form onSubmit={submit} noValidate>

              {/* name + email */}
              <div className="hk-row">
                {FIELDS.slice(0,2).map(f=>(
                  <div key={f.name} className="hk-field">
                    <label className="hk-lbl" htmlFor={f.name}>
                      {f.label}<span className="hk-req">*</span>
                    </label>
                    <input id={f.name} type={f.type} className={`hk-input${errs[f.name]?" e":""}`}
                      placeholder={f.placeholder} value={vals[f.name]??""}
                      onChange={e=>set(f.name,e.target.value)}/>
                    {errs[f.name]&&<div className="hk-emsg">{errs[f.name]}</div>}
                  </div>
                ))}
              </div>

              {/* phone + college */}
              <div className="hk-row">
                {FIELDS.slice(2,4).map(f=>(
                  <div key={f.name} className="hk-field">
                    <label className="hk-lbl" htmlFor={f.name}>
                      {f.label}<span className="hk-req">*</span>
                    </label>
                    <input id={f.name} type={f.type} className={`hk-input${errs[f.name]?" e":""}`}
                      placeholder={f.placeholder} value={vals[f.name]??""}
                      onChange={e=>set(f.name,e.target.value)}/>
                    {errs[f.name]&&<div className="hk-emsg">{errs[f.name]}</div>}
                  </div>
                ))}
              </div>

              {/* year + tech stack */}
              <div className="hk-row">
                <div className="hk-field">
                  <label className="hk-lbl" htmlFor="year">
                    Year of Study<span className="hk-req">*</span>
                  </label>
                  <select id="year" className={`hk-select${errs.year?" e":""}`}
                    value={vals.year??""} onChange={e=>set("year",e.target.value)}>
                    <option value="">Select…</option>
                    {FIELDS[4].options!.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                  {errs.year&&<div className="hk-emsg">{errs.year}</div>}
                </div>
                <div className="hk-field">
                  <label className="hk-lbl" htmlFor="tech_stack">Tech Stack</label>
                  <input id="tech_stack" type="text" className="hk-input"
                    placeholder="Python, LangChain…" value={vals.tech_stack??""}
                    onChange={e=>set("tech_stack",e.target.value)}/>
                </div>
              </div>

              {/* github + team */}
              <div className="hk-row">
                <div className="hk-field">
                  <label className="hk-lbl" htmlFor="github">GitHub / Portfolio</label>
                  <input id="github" type="text" className="hk-input"
                    placeholder="github.com/you" value={vals.github??""}
                    onChange={e=>set("github",e.target.value)}/>
                </div>
                <div className="hk-field">
                  <label className="hk-lbl" htmlFor="team_name">Team Name</label>
                  <input id="team_name" type="text" className="hk-input"
                    placeholder="Team Nexus" value={vals.team_name??""}
                    onChange={e=>set("team_name",e.target.value)}/>
                </div>
              </div>

              <div className="hk-divider"/>

              {/* why */}
              <div className="hk-field">
                <label className="hk-lbl" htmlFor="why">Why do you want to participate?</label>
                <textarea id="why" className="hk-textarea"
                  placeholder="What excites you about AI-powered content automation?"
                  value={vals.why??""} onChange={e=>set("why",e.target.value)}/>
              </div>

              <button type="submit" className="hk-btn" disabled={busy}>
                <span className="hk-btn-inner">
                  {busy&&<span className="hk-spinner"/>}
                  {busy?"Registering…":"Register Now — It's Free →"}
                </span>
              </button>

              <div className="hk-free">🔒 Completely free · No payment required</div>
            </form>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div className="hk-steps-wrap">
          <div className="hk-steps-inner">
            <div className="hk-steps-title">How It Works</div>
            <div className="hk-steps">
              {[
                { n:"1", t:"Register",                d:"Sign up for free. Takes 2 minutes." },
                { n:"2", t:"Receive Problem Brief",   d:"We will share the full problem statement, brand kit, and dataset with all registered participants before the sprint begins." },
                { n:"3", t:"48-Hour Build Sprint",    d:"Build solo or in a team of up to 3. Submit your GitHub repo + a 3-min demo video." },
                { n:"4", t:"Top 10 Present Live",     d:"Shortlisted teams demo their engine directly to the Jobingen team." },
                { n:"5", t:"Win → Get Hired",         d:"Top performers receive the AI Engineer Intern offer (6–8 weeks, ships to production)." },
              ].map(s=>(
                <div key={s.n} className="hk-step">
                  <div className="hk-step-line"/>
                  <div className="hk-step-num">{s.n}</div>
                  <div className="hk-step-body">
                    <div className="hk-step-t">{s.t}</div>
                    <div className="hk-step-d">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
