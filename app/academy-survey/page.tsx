"use client"

import { useMemo, useState, type ReactNode } from "react"

/* ─── CSS ────────────────────────────────────────────────────────── */
const CSS = `
  .as {
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
    display: flex;
    flex-direction: column;
    -webkit-tap-highlight-color: transparent;
  }
  .as * { touch-action: manipulation; }

  @keyframes as-fade { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
  @keyframes as-spin { to{transform:rotate(360deg)} }
  @keyframes as-check-pop { 0%{transform:scale(0) rotate(-15deg);opacity:0} 65%{transform:scale(1.18) rotate(4deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes as-pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }

  .as-topbar {
    position: sticky; top: 0; z-index: 10;
    background: rgba(247,248,252,.9); backdrop-filter: blur(10px);
    border-bottom: 1.5px solid var(--jb);
    padding: 16px 20px;
  }
  .as-topbar-inner { max-width: 640px; margin: 0 auto; display: flex; align-items: center; gap: 14px; }
  .as-back-btn {
    display: flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; border-radius: 11px; border: 1.5px solid var(--jb);
    background: white; cursor: pointer; flex-shrink: 0; transition: all .15s;
  }
  .as-back-btn:hover { border-color: var(--ind); background: var(--ind-xl); }
  .as-back-btn:disabled { opacity: 0; pointer-events: none; }
  .as-progress-wrap { flex: 1; }
  .as-progress-label {
    display: flex; justify-content: space-between; align-items: baseline;
    font-size: 12px; font-weight: 700; color: var(--ink3); margin-bottom: 6px;
    letter-spacing: .02em;
  }
  .as-progress-label b { color: var(--ind); font-weight: 800; }
  .as-progress-track { height: 6px; border-radius: 99px; background: var(--jb); overflow: hidden; }
  .as-progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--ind), var(--vio)); transition: width .4s var(--ease); }

  .as-wrap { flex: 1; max-width: 640px; margin: 0 auto; width: 100%; padding: 40px 24px 60px; display: flex; flex-direction: column; justify-content: center; }

  .as-brand-badge {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 5px 14px 5px 8px; background: white;
    border: 1.5px solid rgba(29,58,143,.2); border-radius: 99px;
    box-shadow: var(--shadow-sm); margin-bottom: 24px; align-self: flex-start;
  }
  .as-brand-pill {
    display: inline-flex; align-items: center; gap: 4px;
    background: linear-gradient(135deg, var(--ind), var(--vio)); color: white;
    font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
    padding: 3px 9px; border-radius: 99px;
  }
  .as-brand-dot { width: 5px; height: 5px; background: #22c55e; border-radius: 50%; animation: as-pulse-dot 2s ease-in-out infinite; }

  .as-step { animation: as-fade .4s var(--ease) both; }
  .as-q-kicker { font-size: 11.5px; font-weight: 800; color: var(--ind); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 10px; }
  .as-q-title { font-size: clamp(24px, 4.5vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -.03em; line-height: 1.2; margin-bottom: 10px; }
  .as-q-sub { font-size: 15px; color: var(--ink2); line-height: 1.6; margin-bottom: 32px; max-width: 480px; }

  .as-field { margin-bottom: 18px; }
  .as-label { display: block; font-size: 12.5px; font-weight: 700; color: var(--ink2); margin-bottom: 8px; letter-spacing: .02em; text-transform: uppercase; }
  .as-input, .as-select {
    width: 100%; padding: 16px 18px; border: 1.5px solid var(--jb); border-radius: 14px;
    background: white; font-size: 16px; font-weight: 500; color: var(--ink);
    outline: none; transition: border-color .18s, box-shadow .18s, background .18s;
    font-family: inherit; appearance: none;
  }
  .as-input:focus, .as-select:focus { border-color: var(--ind); box-shadow: 0 0 0 4px rgba(29,58,143,.08); }
  .as-input::placeholder { color: var(--ink3); }
  .as-textarea {
    width: 100%; padding: 16px 18px; border: 1.5px solid var(--jb); border-radius: 14px;
    background: white; font-size: 16px; font-weight: 500; color: var(--ink);
    outline: none; transition: border-color .18s, box-shadow .18s; resize: vertical;
    min-height: 120px; font-family: inherit; line-height: 1.65;
  }
  .as-textarea:focus { border-color: var(--ind); box-shadow: 0 0 0 4px rgba(29,58,143,.08); }
  .as-textarea::placeholder { color: var(--ink3); }
  .as-select-wrap { position: relative; }
  .as-select-wrap svg { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--ink3); }

  .as-chip-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .as-chip {
    padding: 11px 20px; border-radius: 99px; border: 1.5px solid var(--jb); background: white;
    cursor: pointer; font-size: 14px; font-weight: 700; color: var(--ink2); font-family: inherit;
    transition: all .16s;
  }
  .as-chip.sel { background: var(--ind); border-color: var(--ind); color: white; box-shadow: 0 6px 18px rgba(29,58,143,.28); }
  .as-chip:active { transform: scale(.96); }

  .as-option-grid { display: flex; flex-direction: column; gap: 10px; }
  .as-option {
    display: flex; align-items: center; gap: 14px; padding: 16px 18px;
    border: 1.5px solid var(--jb); border-radius: 14px; background: white;
    cursor: pointer; transition: all .15s; text-align: left; width: 100%; font-family: inherit;
  }
  .as-option:hover { border-color: rgba(29,58,143,.35); background: var(--ind-xl); }
  .as-option:active { transform: scale(.985); }
  .as-option.sel { border-color: var(--ind); background: var(--ind-xl); box-shadow: 0 0 0 3px rgba(29,58,143,.1); }
  .as-option-mark {
    flex-shrink: 0; width: 22px; height: 22px; border-radius: 7px; border: 1.5px solid var(--jb);
    background: white; display: flex; align-items: center; justify-content: center; transition: all .15s;
  }
  .as-option-mark.round { border-radius: 50%; }
  .as-option.sel .as-option-mark { background: var(--ind); border-color: var(--ind); }
  .as-option-text { flex: 1; }
  .as-option-label { font-size: 15px; font-weight: 700; color: var(--ink); }
  .as-option-sub { font-size: 12.5px; color: var(--ink3); margin-top: 2px; line-height: 1.4; }

  .as-char-count { text-align: right; font-size: 11.5px; font-weight: 600; color: var(--ink3); margin-top: 6px; }

  .as-err { color: #ef4444; font-size: 12.5px; font-weight: 600; margin-top: 8px; }

  .as-footer { position: sticky; bottom: 0; background: linear-gradient(0deg, #f7f8fc 60%, transparent); padding: 24px 24px calc(env(safe-area-inset-bottom, 0px)); margin-top: auto; }
  .as-footer-inner { max-width: 640px; margin: 0 auto; }
  .as-cta-btn {
    display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%;
    padding: 18px 32px; border-radius: 16px; border: none; cursor: pointer;
    background: linear-gradient(135deg, var(--ind), var(--vio)); color: white;
    font-size: 16px; font-weight: 800; letter-spacing: -.01em; font-family: inherit;
    box-shadow: 0 6px 24px rgba(29,58,143,.34); transition: all .22s var(--ease); margin-bottom: 20px;
  }
  .as-cta-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(29,58,143,.44); }
  .as-cta-btn:active:not(:disabled) { transform: translateY(0) scale(.98); }
  .as-cta-btn:disabled { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .as-skip-link {
    display: block; text-align: center; font-size: 13px; font-weight: 700; color: var(--ink3);
    background: none; border: none; cursor: pointer; width: 100%; padding-bottom: 20px; font-family: inherit;
  }
  .as-skip-link:hover { color: var(--ind); }

  .as-landing { text-align: center; }
  .as-landing-icon {
    width: 72px; height: 72px; border-radius: 22px; margin: 0 auto 24px;
    background: linear-gradient(135deg, var(--ind), var(--vio));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 12px 36px rgba(29,58,143,.3);
  }
  .as-landing-points { display: flex; flex-direction: column; gap: 14px; margin: 28px 0 8px; text-align: left; }
  .as-landing-point { display: flex; align-items: flex-start; gap: 12px; }
  .as-landing-point-icon {
    flex-shrink: 0; width: 26px; height: 26px; border-radius: 8px; background: var(--grn-l);
    display: flex; align-items: center; justify-content: center; margin-top: 1px;
  }
  .as-landing-point-text { font-size: 14.5px; color: var(--ink2); line-height: 1.5; }

  .as-success { text-align: center; padding: 40px 0; }
  .as-success-icon {
    width: 84px; height: 84px; border-radius: 24px;
    background: linear-gradient(135deg, var(--ind), var(--vio));
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 28px; box-shadow: 0 12px 40px rgba(29,58,143,.3);
    animation: as-check-pop .6s var(--spring) both;
  }
  .as-success-h2 { font-size: clamp(26px, 4.5vw, 36px); font-weight: 900; color: var(--ink); letter-spacing: -.04em; margin-bottom: 14px; }
  .as-success-p { font-size: 15.5px; color: var(--ink2); line-height: 1.75; max-width: 420px; margin: 0 auto 8px; }

  .as-explore-card {
    display: flex; align-items: center; gap: 16px; text-align: left;
    margin: 32px auto 0; max-width: 440px; padding: 20px; border-radius: 20px;
    background: linear-gradient(135deg, var(--ind), var(--vio));
    box-shadow: 0 16px 40px rgba(29,58,143,.3); text-decoration: none;
    transition: transform .22s var(--ease), box-shadow .22s var(--ease);
  }
  .as-explore-card:hover { transform: translateY(-3px); box-shadow: 0 22px 52px rgba(29,58,143,.4); }
  .as-explore-card:active { transform: translateY(0) scale(.98); }
  .as-explore-icon {
    flex-shrink: 0; width: 48px; height: 48px; border-radius: 14px;
    background: rgba(255,255,255,.16); border: 1.5px solid rgba(255,255,255,.25);
    display: flex; align-items: center; justify-content: center;
  }
  .as-explore-text { flex: 1; }
  .as-explore-kicker { font-size: 11px; font-weight: 800; color: rgba(255,255,255,.75); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 3px; }
  .as-explore-title { font-size: 16.5px; font-weight: 800; color: white; letter-spacing: -.01em; margin-bottom: 2px; }
  .as-explore-sub { font-size: 12.5px; color: rgba(255,255,255,.8); line-height: 1.4; }
  .as-explore-arrow { flex-shrink: 0; color: white; transition: transform .22s var(--ease); }
  .as-explore-card:hover .as-explore-arrow { transform: translateX(4px); }

  @media(max-width:640px){
    .as-wrap { padding: 24px 18px 36px; }
    .as-topbar { padding: 14px 16px; }
    .as-q-sub { margin-bottom: 26px; }
    .as-option { padding: 14px 16px; min-height: 58px; }
    .as-option-label { font-size: 14.5px; }
    .as-option-sub { font-size: 12px; }
    .as-chip { padding: 10px 16px; font-size: 13.5px; }
    .as-input, .as-select, .as-textarea { padding: 14px 16px; }
    .as-cta-btn { padding: 16px 28px; font-size: 15px; }
    .as-landing-icon { width: 60px; height: 60px; border-radius: 18px; }
    .as-success-icon { width: 72px; height: 72px; border-radius: 20px; }
    .as-explore-card { margin-top: 26px; padding: 16px; gap: 12px; border-radius: 18px; }
    .as-explore-icon { width: 42px; height: 42px; border-radius: 12px; }
    .as-explore-title { font-size: 15.5px; }
  }

  @media(max-width:380px){
    .as-q-title { font-size: 22px; }
    .as-wrap { padding: 20px 14px 32px; }
  }
`

/* ─── data ───────────────────────────────────────────────────────── */
const SPECIALIZATIONS = [
  "Marketing", "Finance", "Operations", "Human Resources",
  "Business Analytics / Data", "Strategy & Consulting", "General Management", "Other",
]

const AI_TOPICS = [
  { key: "tools", label: "AI Tools & Productivity", sub: "ChatGPT, Claude, Copilot and everyday workflows" },
  { key: "prompting", label: "Prompt Engineering", sub: "Getting better, more reliable outputs" },
  { key: "business", label: "AI for Business & Marketing", sub: "Strategy, growth, content and campaigns" },
  { key: "product", label: "AI Product Development", sub: "Building AI-powered products and features" },
  { key: "automation", label: "AI Automation", sub: "Automating workflows and repetitive tasks" },
  { key: "genai", label: "Generative AI", sub: "Text, image, video and voice generation" },
  { key: "other", label: "Something else", sub: "Tell us what you have in mind" },
]

const SESSION_TYPES = [
  { key: "workshop", label: "Hands-on Workshop", sub: "Build something yourself, step by step" },
  { key: "demo", label: "Live Demo", sub: "Watch tools and workflows in action" },
  { key: "career", label: "Career-focused Session", sub: "How AI changes roles, skills and hiring" },
  { key: "project", label: "Project-based Session", sub: "Work on a real project across the session" },
]

type FormState = {
  name: string
  email: string
  college: string
  specialization: string
  specOther: string
  year: string
  aiTopics: string[]
  aiTopicsOther: string
  biggestChallenge: string
  sessionType: string
  buildGoal: string
  specificTopic: string
}

const INIT: FormState = {
  name: "", email: "", college: "", specialization: "", specOther: "", year: "",
  aiTopics: [], aiTopicsOther: "", biggestChallenge: "", sessionType: "", buildGoal: "", specificTopic: "",
}

const TOTAL_STEPS = 8

/* ─── icons ──────────────────────────────────────────────────────── */
function CheckIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
function DotIcon() {
  return <div style={{ width: 9, height: 9, borderRadius: "50%", background: "white" }} />
}

/* ─── component ──────────────────────────────────────────────────── */
export default function AcademySurveyPage() {
  const [stage, setStage] = useState<"intro" | "survey" | "success">("intro")
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INIT)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }))
    setError("")
  }

  function toggleTopic(key: string) {
    setForm(f => {
      const has = f.aiTopics.includes(key)
      return { ...f, aiTopics: has ? f.aiTopics.filter(k => k !== key) : [...f.aiTopics, key] }
    })
    setError("")
  }

  const canContinue = useMemo(() => {
    switch (step) {
      case 0: return true // name/email optional
      case 1: return form.college.trim().length > 0
      case 2: return form.specialization.trim().length > 0 && form.year.trim().length > 0 && (form.specialization !== "Other" || form.specOther.trim().length > 0)
      case 3: return form.aiTopics.length > 0 && (!form.aiTopics.includes("other") || form.aiTopicsOther.trim().length > 0)
      case 4: return form.biggestChallenge.trim().length > 0
      case 5: return form.sessionType.trim().length > 0
      case 6: return form.buildGoal.trim().length > 0
      case 7: return true // optional, submit
      default: return false
    }
  }, [step, form])

  async function submit() {
    setLoading(true); setError("")
    try {
      const res = await fetch("/api/academy-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          college: form.college.trim(),
          specialization: form.specialization === "Other" ? form.specOther.trim() : `${form.specialization} — ${form.year}`,
          ai_topics: form.aiTopics,
          ai_topics_other: form.aiTopicsOther.trim(),
          biggest_challenge: form.biggestChallenge.trim(),
          session_type: form.sessionType,
          build_goal: form.buildGoal.trim(),
          specific_topic: form.specificTopic.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Something went wrong. Please try again."); setLoading(false); return }
      setStage("success")
    } catch {
      setError("Network error. Please check your connection and try again.")
      setLoading(false)
    }
  }

  function handleContinue() {
    if (!canContinue) {
      setError("Please answer this before continuing.")
      return
    }
    if (step === TOTAL_STEPS - 1) {
      submit()
      return
    }
    setStep(s => s + 1)
  }

  function handleBack() {
    setError("")
    if (step === 0) { setStage("intro"); return }
    setStep(s => s - 1)
  }

  const showSkip = step === 7 // specific topic is optional

  return (
    <>
      <style>{CSS}</style>
      <div className="as">

        {stage === "survey" && (
          <div className="as-topbar">
            <div className="as-topbar-inner">
              <button className="as-back-btn" onClick={handleBack} aria-label="Back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="as-progress-wrap">
                <div className="as-progress-label">
                  <span><b>{step + 1}</b> of {TOTAL_STEPS}</span>
                </div>
                <div className="as-progress-track">
                  <div className="as-progress-fill" style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="as-wrap">

          {stage === "intro" && (
            <div className="as-step as-landing">
              <div className="as-landing-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l8 4-8 4-8-4 8-4z" />
                  <path d="M4 10v6c0 1 3.5 3 8 3s8-2 8-3v-6" />
                </svg>
              </div>
              <div className="as-brand-badge" style={{ display: "inline-flex", alignSelf: "center" }}>
                <div className="as-brand-pill"><span className="as-brand-dot" />Jobingen Academy</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ind)" }}>2-minute survey</span>
              </div>
              <h1 className="as-q-title">Help us build the AI session you actually want.</h1>
              <p className="as-q-sub" style={{ margin: "0 auto 8px" }}>
                We're designing a new AI workshop for MBA students — and we want it shaped by what you actually want to learn, not guesswork.
              </p>
              <div className="as-landing-points">
                <div className="as-landing-point">
                  <div className="as-landing-point-icon"><CheckIcon color="#10b981" /></div>
                  <div className="as-landing-point-text">Takes about 2 minutes, 8 quick questions</div>
                </div>
                <div className="as-landing-point">
                  <div className="as-landing-point-icon"><CheckIcon color="#10b981" /></div>
                  <div className="as-landing-point-text">No long essays — pick options or a short line</div>
                </div>
                <div className="as-landing-point">
                  <div className="as-landing-point-icon"><CheckIcon color="#10b981" /></div>
                  <div className="as-landing-point-text">Your answers directly shape the next session</div>
                </div>
              </div>
              <button className="as-cta-btn" style={{ marginTop: 24 }} onClick={() => setStage("survey")}>
                Start the Survey
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {stage === "survey" && (
            <div className="as-step" key={step}>

              {step === 0 && (
                <>
                  <div className="as-q-kicker">Let's start</div>
                  <h1 className="as-q-title">Who's answering?</h1>
                  <p className="as-q-sub">Totally optional — only helps us say thanks and follow up if needed.</p>
                  <div className="as-field">
                    <label className="as-label">Your Name</label>
                    <input className="as-input" placeholder="Priya Sharma" value={form.name} onChange={e => set("name", e.target.value)} />
                  </div>
                  <div className="as-field">
                    <label className="as-label">Email <span style={{ color: "var(--ink3)", fontWeight: 500, textTransform: "none" }}>Optional</span></label>
                    <input type="email" className="as-input" placeholder="you@college.edu" value={form.email} onChange={e => set("email", e.target.value)} />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="as-q-kicker">Question 2 of 8</div>
                  <h1 className="as-q-title">Which college or university are you at?</h1>
                  <p className="as-q-sub">Helps us understand who's attending across campuses.</p>
                  <div className="as-field">
                    <label className="as-label">College / University</label>
                    <input className="as-input" placeholder="e.g. IIM Lucknow, FMS Delhi..." value={form.college} onChange={e => set("college", e.target.value)} autoFocus />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="as-q-kicker">Question 3 of 8</div>
                  <h1 className="as-q-title">What's your specialization and year?</h1>
                  <p className="as-q-sub">So we can tailor examples to what you're actually studying.</p>
                  <div className="as-field">
                    <label className="as-label">Specialization</label>
                    <div className="as-select-wrap">
                      <select className="as-select" value={form.specialization} onChange={e => set("specialization", e.target.value)}>
                        <option value="" disabled>Select your specialization</option>
                        {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
                    </div>
                  </div>
                  {form.specialization === "Other" && (
                    <div className="as-field">
                      <input className="as-input" placeholder="Tell us your specialization" value={form.specOther} onChange={e => set("specOther", e.target.value)} autoFocus />
                    </div>
                  )}
                  <div className="as-field">
                    <label className="as-label">Year</label>
                    <div className="as-chip-row">
                      {["1st Year", "2nd Year", "Executive MBA"].map(y => (
                        <button key={y} type="button" className={`as-chip${form.year === y ? " sel" : ""}`} onClick={() => set("year", y)}>{y}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="as-q-kicker">Question 4 of 8</div>
                  <h1 className="as-q-title">What do you want to learn about AI?</h1>
                  <p className="as-q-sub">Pick as many as apply — this shapes the whole session.</p>
                  <div className="as-option-grid">
                    {AI_TOPICS.map(t => {
                      const sel = form.aiTopics.includes(t.key)
                      return (
                        <button key={t.key} type="button" className={`as-option${sel ? " sel" : ""}`} onClick={() => toggleTopic(t.key)}>
                          <div className="as-option-mark">{sel && <CheckIcon />}</div>
                          <div className="as-option-text">
                            <div className="as-option-label">{t.label}</div>
                            <div className="as-option-sub">{t.sub}</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  {form.aiTopics.includes("other") && (
                    <div className="as-field" style={{ marginTop: 16 }}>
                      <input className="as-input" placeholder="What's that something else?" value={form.aiTopicsOther} onChange={e => set("aiTopicsOther", e.target.value)} autoFocus />
                    </div>
                  )}
                </>
              )}

              {step === 4 && (
                <>
                  <div className="as-q-kicker">Question 5 of 8</div>
                  <h1 className="as-q-title">What's your biggest challenge in using AI?</h1>
                  <p className="as-q-sub">Be honest — this helps us fix the actual blockers, not the obvious ones.</p>
                  <div className="as-field">
                    <textarea
                      className="as-textarea" rows={5} autoFocus
                      placeholder="e.g. I don't know which tool to use for what, or my prompts never give useful output..."
                      value={form.biggestChallenge}
                      onChange={e => { if (e.target.value.length <= 400) set("biggestChallenge", e.target.value) }}
                    />
                    <div className="as-char-count">{form.biggestChallenge.length}/400</div>
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <div className="as-q-kicker">Question 6 of 8</div>
                  <h1 className="as-q-title">What type of session would you prefer?</h1>
                  <p className="as-q-sub">Pick the format you'd actually show up and stay engaged for.</p>
                  <div className="as-option-grid">
                    {SESSION_TYPES.map(s => {
                      const sel = form.sessionType === s.key
                      return (
                        <button key={s.key} type="button" className={`as-option${sel ? " sel" : ""}`} onClick={() => set("sessionType", s.key)}>
                          <div className="as-option-mark round">{sel && <DotIcon />}</div>
                          <div className="as-option-text">
                            <div className="as-option-label">{s.label}</div>
                            <div className="as-option-sub">{s.sub}</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {step === 6 && (
                <>
                  <div className="as-q-kicker">Question 7 of 8</div>
                  <h1 className="as-q-title">What would you most like to build or learn using AI?</h1>
                  <p className="as-q-sub">A real project, a skill, anything — tell us in your own words.</p>
                  <div className="as-field">
                    <textarea
                      className="as-textarea" rows={5} autoFocus
                      placeholder="e.g. I'd love to build an AI agent that helps with my internship search, or learn to use AI for market research..."
                      value={form.buildGoal}
                      onChange={e => { if (e.target.value.length <= 400) set("buildGoal", e.target.value) }}
                    />
                    <div className="as-char-count">{form.buildGoal.length}/400</div>
                  </div>
                </>
              )}

              {step === 7 && (
                <>
                  <div className="as-q-kicker">Question 8 of 8 · Last one</div>
                  <h1 className="as-q-title">Anything specific you want covered?</h1>
                  <p className="as-q-sub">A topic, a tool, a question — anything on your mind. Optional.</p>
                  <div className="as-field">
                    <textarea
                      className="as-textarea" rows={4} autoFocus
                      placeholder="e.g. Can you cover how AI is changing consulting case interviews?"
                      value={form.specificTopic}
                      onChange={e => { if (e.target.value.length <= 400) set("specificTopic", e.target.value) }}
                    />
                    <div className="as-char-count">{form.specificTopic.length}/400</div>
                  </div>
                </>
              )}

              {error && <div className="as-err">{error}</div>}
            </div>
          )}

          {stage === "success" && (
            <div className="as-step as-success">
              <div className="as-success-icon">
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="as-success-h2">Thank you!</h2>
              <p className="as-success-p" style={{ margin: "0 auto" }}>
                Your answers are in. We're using every response to design the next Jobingen Academy AI session —
                keep an eye out, it's going to be built around what you told us.
              </p>

              <a href="/" className="as-explore-card">
                <div className="as-explore-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                </div>
                <div className="as-explore-text">
                  <div className="as-explore-kicker">While you're here</div>
                  <div className="as-explore-title">Explore Jobingen</div>
                  <div className="as-explore-sub">Jobs, mentors, AI tools & more — all in one place</div>
                </div>
                <svg className="as-explore-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}

        </div>

        {stage === "survey" && (
          <div className="as-footer">
            <div className="as-footer-inner">
              <button className="as-cta-btn" onClick={handleContinue} disabled={loading}>
                {loading ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "as-spin 1s linear infinite" }}>
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Submitting...
                  </>
                ) : step === TOTAL_STEPS - 1 ? (
                  <>
                    Submit Survey
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </>
                ) : (
                  <>
                    Continue
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </>
                )}
              </button>
              {showSkip && (
                <button className="as-skip-link" onClick={submit}>Skip and submit</button>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  )
}
