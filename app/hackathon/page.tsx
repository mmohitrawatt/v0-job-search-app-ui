"use client"

import { useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

type FormVals = Record<string, string>

const MODULES = [
  { n: "01", title: "Persona Engine", tag: "Foundation", body: 'System prompt encoding the "Gen" brand persona — strategist + creative director, blue/white premium identity, student-first tone. Sub-modes: planner, copywriter, critic.', output: "Versioned prompt files" },
  { n: "02", title: "Content Planner", tag: "Intelligence", body: "Given a date + content calendar rules (5 pillars: Educate 40%, Opportunity 25%, Proof 15%, Brand 10%, Culture 10%), selects today's pillar, topic, and template.", output: "JSON content plan" },
  { n: "03", title: "Copy Generator", tag: "LLM", body: "LLM call producing structured output: hook/headline, slide-by-slide copy (for carousels), caption, hashtags, CTA, alt-text.", output: "Structured JSON" },
  { n: "04", title: "Critic / QA Pass", tag: "Quality", body: "Second LLM pass scoring the draft against a rubric (brand voice, hook strength, value density, no cringe, CTA present). Score below threshold → auto-regenerate (max 3 retries).", output: "Score + pass/fail log" },
  { n: "05", title: "Design Renderer", tag: "Rendering", body: "7 parametric HTML/CSS templates rendered to PNG via Puppeteer (1080×1080 and 1080×1350). Templates: Insight Card, Carousel, Job Drop, Comparison, Success Story, Mentor Spotlight, Meme.", output: "Final post images (PNG)" },
  { n: "06", title: "Local Content Store", tag: "Data", body: "Input data in simple files/DB: topics bank, jobs sheet (manually filled), testimonials sheet, calendar config. No scraper required for Phase 1.", output: "SQLite / Sheets / JSON" },
  { n: "07", title: "Output & Approval Queue", tag: "Delivery", body: "Daily run drops the finished pack (images + caption + hashtags) into a folder / Notion / Slack message for one-tap human review. Manual posting in Phase 1.", output: "Daily content pack" },
  { n: "08", title: "Orchestrator", tag: "Pipeline", body: "One scheduled pipeline (cron / n8n / Python script) that runs Planner → Generator → Critic → Renderer → Queue daily with logging and failure alerts.", output: "Working daily pipeline" },
]

const TECH = [
  { label: "Language", value: "Python or Node.js" },
  { label: "LLM", value: "Claude / GPT API — structured JSON outputs" },
  { label: "Rendering", value: "HTML/CSS templates + Puppeteer/Playwright → PNG" },
  { label: "Orchestration", value: "n8n (preferred) or cron + Python script" },
  { label: "Storage", value: "SQLite or Google Sheets / Airtable" },
  { label: "Queue / Notify", value: "Slack or WhatsApp webhook / dated output folder + Notion" },
  { label: "Config", value: "Single YAML/JSON with feature flags per Phase 2 module" },
]

const PHASE2 = [
  { pri: "P2.1", title: "LinkedIn Auto-publish", body: "Post approved packs via LinkedIn API or scheduler tool. Approval step remains." },
  { pri: "P2.2", title: "Job Data Ingestion", body: "Pull daily job listings from JobInGen's own database; optionally external feeds for comparison posts." },
  { pri: "P2.3", title: "Instagram Auto-publish", body: "Meta Graph API posting — carousels + captions, stories briefs." },
  { pri: "P2.4", title: "Trend Ingestion", body: "Google Trends / RSS hiring news → feeds Planner topic selection automatically." },
  { pri: "P2.5", title: "Analytics Feedback Loop", body: "Pull post metrics weekly → score formats → inject top performers as few-shot examples into Persona Engine." },
]

const CSS = `
  .hk {
    --navy: #0A1F44;
    --blue: #1B4DFF;
    --ice: #EAF1FF;
    --ice2: #F4F7FF;
    --border: #E2E8F0;
    --ink2: #374151;
    --ink3: #6B7280;
    --shadow-sm: 0 1px 4px rgba(10,31,68,.05);
    --shadow-md: 0 4px 24px rgba(10,31,68,.08);
    --shadow-lg: 0 12px 48px rgba(10,31,68,.12);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    background: #F8FAFF;
    color: #0A1F44;
    overflow-x: hidden;
  }
  .hk * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes hk-fade { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
  @keyframes hk-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.5)} }
  @keyframes hk-spin { to{transform:rotate(360deg)} }
  @keyframes hk-check { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
  @keyframes hk-pop { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:none} }

  /* HERO */
  .hk-hero {
    position: relative; overflow: hidden;
    background: linear-gradient(175deg, #f0f4ff 0%, #f7f8fc 55%);
    padding: 160px 24px 88px;
    border-bottom: 1px solid #e8edf8;
  }
  .hk-hero-grid {
    position: absolute; inset: 0; pointer-events: none; opacity: .45;
    background-image: linear-gradient(#dde5ff 1px, transparent 1px),
                      linear-gradient(90deg, #dde5ff 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 10%, transparent 72%);
  }
  .hk-hero-glow {
    position: absolute; top: -220px; left: 50%; transform: translateX(-50%);
    width: 860px; height: 860px; border-radius: 50%; pointer-events: none;
    background: radial-gradient(circle, rgba(27,77,255,.07) 0%, transparent 65%);
  }
  .hk-hero-inner { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; text-align: center; }

  .hk-badge {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 7px 18px 7px 9px; background: white;
    border: 1.5px solid rgba(27,77,255,.2); border-radius: 99px;
    box-shadow: 0 4px 24px rgba(10,31,68,.09); margin-bottom: 32px;
    animation: hk-fade .55s ease both;
  }
  .hk-badge-pill {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--navy); color: white;
    font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;
    padding: 4px 11px; border-radius: 99px;
  }
  .hk-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #22C55E; animation: hk-pulse 2s infinite; }
  .hk-badge-text { font-size: 13px; font-weight: 600; color: var(--navy); }

  .hk-h1 {
    font-size: clamp(34px, 5vw, 58px); font-weight: 900;
    color: var(--navy); letter-spacing: -.045em; line-height: 1.06;
    margin-bottom: 18px; animation: hk-fade .6s ease .08s both;
  }
  .hk-h1-accent {
    background: linear-gradient(90deg, var(--navy) 0%, var(--blue) 50%, #4f6ef7 100%);
    background-size: 300% auto;
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }

  .hk-sub {
    font-size: clamp(15px, 1.7vw, 17.5px); color: #3d3d52;
    line-height: 1.78; max-width: 560px; margin: 0 auto 32px;
    animation: hk-fade .65s ease .14s both;
  }

  .hk-hero-ctas {
    display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;
    margin-bottom: 40px; animation: hk-fade .7s ease .2s both;
  }
  .hk-btn-p {
    display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; border-radius: 13px;
    background: var(--navy); color: white; font-size: 15px; font-weight: 700;
    text-decoration: none; border: none; cursor: pointer;
    box-shadow: 0 4px 20px rgba(10,31,68,.3); transition: all .2s ease; letter-spacing: -.01em;
  }
  .hk-btn-p:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(10,31,68,.4); background: #0d2a5e; }
  .hk-btn-s {
    display: inline-flex; align-items: center; gap: 8px; padding: 14px 26px; border-radius: 13px;
    background: white; color: var(--navy); font-size: 15px; font-weight: 700;
    text-decoration: none; border: 1.5px solid rgba(10,31,68,.18);
    box-shadow: 0 1px 6px rgba(10,31,68,.07); transition: all .2s; letter-spacing: -.01em;
  }
  .hk-btn-s:hover { border-color: var(--navy); background: var(--ice2); transform: translateY(-1px); }

  .hk-chips {
    display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
    animation: hk-fade .7s ease .26s both;
  }
  .hk-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px; background: white; border: 1.5px solid rgba(10,31,68,.1);
    border-radius: 99px; font-size: 12.5px; font-weight: 600; color: #3d3d52;
    box-shadow: 0 1px 4px rgba(10,31,68,.05);
  }
  .hk-chip-dot { width: 7px; height: 7px; border-radius: 50%; }

  @keyframes hk-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* PRIZE BAR */
  .hk-prize-bar {
    background: var(--blue); padding: 0;
    overflow: hidden; border-bottom: 1px solid rgba(0,0,0,.08);
  }
  .hk-prize-track {
    display: flex; width: max-content;
    animation: hk-marquee 18s linear infinite;
  }
  .hk-prize-bar:hover .hk-prize-track { animation-play-state: paused; }
  .hk-prize-item {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 12.5px; font-weight: 700; color: white;
    padding: 14px 28px; white-space: nowrap; flex-shrink: 0;
    border-right: 1px solid rgba(255,255,255,.18);
  }
  .hk-prize-sep { display: none; }

  /* LAYOUT */
  .hk-wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
  .hk-sec { padding: 80px 0; }
  .hk-sec-alt { padding: 80px 0; background: white; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .hk-sec-dk { padding: 80px 0; background: var(--navy); }

  .hk-eyebrow { display: inline-flex; align-items: center; gap: 7px; font-size: 11px; font-weight: 800; color: var(--blue); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 10px; }
  .hk-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--blue); }
  .hk-eyebrow-w { color: rgba(255,255,255,.4); }
  .hk-eyebrow-dot-w { background: rgba(255,255,255,.4); }

  .hk-ttl { font-size: clamp(24px, 3vw, 38px); font-weight: 900; color: var(--navy); letter-spacing: -.04em; line-height: 1.1; margin-bottom: 10px; }
  .hk-ttl-w { font-size: clamp(24px, 3vw, 38px); font-weight: 900; color: white; letter-spacing: -.04em; line-height: 1.1; margin-bottom: 10px; }
  .hk-desc { font-size: 15px; color: var(--ink2); line-height: 1.78; max-width: 520px; }
  .hk-desc-w { font-size: 15px; color: rgba(255,255,255,.5); line-height: 1.78; max-width: 520px; }

  /* PROBLEM */
  .hk-prob-card {
    background: white; border: 1.5px solid var(--border);
    border-radius: 18px; padding: 36px 40px;
    box-shadow: var(--shadow-md); margin-top: 44px; position: relative; overflow: hidden;
  }
  .hk-prob-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background: linear-gradient(90deg, var(--navy), var(--blue)); }
  .hk-prob-title { font-size: 18px; font-weight: 900; color: var(--navy); letter-spacing: -.025em; margin-bottom: 14px; }
  .hk-prob-body { font-size: 14.5px; color: var(--ink2); line-height: 1.8; margin-bottom: 22px; }
  .hk-prob-note {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 14px 18px; background: var(--ice2);
    border: 1px solid rgba(27,77,255,.1); border-radius: 11px;
    font-size: 13px; color: var(--ink2); line-height: 1.65;
  }
  .hk-prob-note strong { color: var(--navy); font-weight: 800; }

  /* PILLARS */
  .hk-pillars { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 36px; }
  .hk-pillar {
    flex: 1; min-width: 110px; background: white; border: 1.5px solid var(--border);
    border-radius: 13px; padding: 18px 14px; text-align: center; box-shadow: var(--shadow-sm);
  }
  .hk-pillar-pct { font-size: 26px; font-weight: 900; color: var(--navy); letter-spacing: -.04em; line-height: 1; margin-bottom: 5px; }
  .hk-pillar-label { font-size: 11px; font-weight: 700; color: var(--ink3); text-transform: uppercase; letter-spacing: .06em; }

  /* MODULES */
  .hk-modules { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 48px; }
  @media(max-width:700px){ .hk-modules { grid-template-columns: 1fr; } }
  .hk-module {
    background: white; border: 1.5px solid var(--border); border-radius: 16px;
    padding: 26px 26px; box-shadow: var(--shadow-sm);
    transition: transform .2s, box-shadow .2s, border-color .2s;
  }
  .hk-module:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: rgba(27,77,255,.18); }
  .hk-module-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .hk-module-num { font-size: 36px; font-weight: 900; color: rgba(10,31,68,.07); letter-spacing: -.06em; line-height: 1; }
  .hk-module-tag { font-size: 10px; font-weight: 800; color: var(--blue); background: var(--ice); border: 1px solid rgba(27,77,255,.14); border-radius: 6px; padding: 3px 9px; letter-spacing: .06em; text-transform: uppercase; }
  .hk-module-title { font-size: 16px; font-weight: 900; color: var(--navy); letter-spacing: -.025em; margin-bottom: 9px; }
  .hk-module-body { font-size: 13px; color: var(--ink2); line-height: 1.7; margin-bottom: 14px; }
  .hk-module-output { font-size: 11.5px; font-weight: 700; color: var(--blue); display: flex; align-items: center; gap: 6px; }
  .hk-module-out-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--blue); flex-shrink: 0; }

  /* PHASE 2 */
  .hk-p2-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 40px; }
  @media(max-width:700px){ .hk-p2-grid { grid-template-columns: 1fr 1fr; } }
  @media(max-width:440px){ .hk-p2-grid { grid-template-columns: 1fr; } }
  .hk-p2-card {
    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09);
    border-radius: 13px; padding: 20px 18px;
  }
  .hk-p2-pri { font-size: 10px; font-weight: 800; color: rgba(147,197,253,.7); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 5px; }
  .hk-p2-title { font-size: 14px; font-weight: 800; color: white; letter-spacing: -.02em; margin-bottom: 6px; }
  .hk-p2-body { font-size: 12px; color: rgba(255,255,255,.4); line-height: 1.6; }

  /* TECH */
  .hk-tech { margin-top: 44px; border: 1.5px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-md); }
  .hk-tech-row { display: flex; border-bottom: 1px solid var(--border); }
  .hk-tech-row:last-child { border-bottom: none; }
  .hk-tech-label { width: 170px; flex-shrink: 0; padding: 16px 20px; font-size: 11.5px; font-weight: 800; color: var(--navy); text-transform: uppercase; letter-spacing: .05em; background: var(--ice2); border-right: 1px solid var(--border); }
  .hk-tech-val { padding: 16px 20px; font-size: 13.5px; color: var(--ink2); line-height: 1.55; background: white; flex: 1; }
  @media(max-width:500px){ .hk-tech-row{flex-direction:column;} .hk-tech-label{width:100%;border-right:none;border-bottom:1px solid var(--border);} }

  /* FORM */
  .hk-form-outer { max-width: 700px; margin: 48px auto 0; }
  .hk-form-card { background: white; border: 1.5px solid var(--border); border-radius: 22px; overflow: hidden; box-shadow: var(--shadow-lg); }
  .hk-form-head { padding: 34px 42px 26px; background: var(--ice2); border-bottom: 1px solid var(--border); }
  .hk-form-head-title { font-size: 21px; font-weight: 900; color: var(--navy); letter-spacing: -.03em; margin-bottom: 4px; }
  .hk-form-head-sub { font-size: 13px; color: var(--ink3); }
  .hk-form-body { padding: 34px 42px; }
  @media(max-width:540px){ .hk-form-head,.hk-form-body { padding-left: 20px; padding-right: 20px; } }

  .hk-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media(max-width:500px){ .hk-row { grid-template-columns: 1fr; } }
  .hk-field { margin-bottom: 16px; }
  .hk-label { display: block; font-size: 11.5px; font-weight: 700; color: var(--ink2); margin-bottom: 7px; letter-spacing: .03em; text-transform: uppercase; }
  .hk-req { color: #EF4444; margin-left: 2px; }
  .hk-input, .hk-select, .hk-textarea {
    width: 100%; padding: 12px 15px;
    background: #F8FAFF; border: 1.5px solid var(--border); border-radius: 10px;
    font-size: 14px; color: var(--navy); font-family: inherit; outline: none;
    transition: border-color .18s, box-shadow .18s, background .18s; appearance: none;
  }
  .hk-input::placeholder, .hk-textarea::placeholder { color: #B0BCCC; }
  .hk-input:focus, .hk-select:focus, .hk-textarea:focus { border-color: var(--blue); background: white; box-shadow: 0 0 0 3px rgba(27,77,255,.08); }
  .hk-input.err, .hk-select.err { border-color: #EF4444; }
  .hk-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath fill='%236B7280' d='M5 7L0 0h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; cursor: pointer;
  }
  .hk-textarea { resize: vertical; min-height: 84px; line-height: 1.65; }
  .hk-errmsg { font-size: 11.5px; color: #EF4444; font-weight: 600; margin-top: 5px; }
  .hk-divider { height: 1px; background: var(--border); margin: 4px 0 18px; }
  .hk-submit {
    width: 100%; padding: 14px; border: none; border-radius: 12px;
    background: var(--navy); color: white;
    font-size: 15px; font-weight: 800; font-family: inherit; cursor: pointer;
    box-shadow: 0 4px 18px rgba(10,31,68,.26); transition: background .2s, transform .18s, box-shadow .18s;
  }
  .hk-submit:hover:not(:disabled) { background: #0d2a5e; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(10,31,68,.34); }
  .hk-submit:disabled { opacity: .6; cursor: not-allowed; }
  .hk-submit-inner { display: flex; align-items: center; justify-content: center; gap: 9px; }
  .hk-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: white; border-radius: 50%; animation: hk-spin .7s linear infinite; }
  .hk-serr { background: #FFF5F5; border: 1.5px solid #FED7D7; border-radius: 10px; padding: 12px 16px; font-size: 13px; color: #C53030; font-weight: 600; margin-bottom: 18px; }
  .hk-free { text-align: center; margin-top: 13px; font-size: 12px; color: var(--ink3); }

  /* SUCCESS */
  .hk-success-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #F8FAFF; padding: 88px 24px 40px; }
  .hk-success-card { background: white; border: 1.5px solid #E2E8F0; border-radius: 22px; padding: 56px 44px; max-width: 460px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(10,31,68,.10); animation: hk-pop .5s ease both; }
  @media(max-width:480px){ .hk-success-card { padding: 38px 20px; } }
  .hk-success-icon { width: 72px; height: 72px; border-radius: 20px; background: #0A1F44; display: flex; align-items: center; justify-content: center; margin: 0 auto 26px; box-shadow: 0 8px 28px rgba(10,31,68,.26); }
  .hk-success-path { stroke-dasharray: 60; stroke-dashoffset: 60; animation: hk-check .5s .3s ease forwards; }
  .hk-success-h2 { font-size: 26px; font-weight: 900; color: #0A1F44; letter-spacing: -.04em; margin-bottom: 10px; }
  .hk-success-p { font-size: 14px; color: #374151; line-height: 1.75; margin-bottom: 26px; }
  .hk-success-em { font-weight: 700; color: #0A1F44; }
  .hk-success-tags { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 28px; }
  .hk-success-tag { background: #EAF1FF; border: 1px solid rgba(27,77,255,.14); border-radius: 99px; padding: 6px 14px; font-size: 12px; font-weight: 700; color: #1B4DFF; }
  .hk-wa-btn { display: inline-flex; align-items: center; gap: 9px; padding: 13px 26px; border-radius: 12px; background: #25D366; color: white; font-size: 14px; font-weight: 800; text-decoration: none; box-shadow: 0 4px 16px rgba(37,211,102,.28); transition: all .2s; margin-bottom: 14px; }
  .hk-wa-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,211,102,.38); }
  .hk-back { display: inline-block; font-size: 13px; font-weight: 600; color: var(--ink3); text-decoration: none; }
  .hk-back:hover { color: var(--blue); }

  @media(max-width:840px){ .hk-sec,.hk-sec-alt,.hk-sec-dk { padding: 60px 0; } }
  @media(max-width:560px){ .hk-wrap { padding: 0 16px; } }
`

function SuccessState({ name, email }: { name: string; email: string }) {
  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="hk-success-wrap">
        <div className="hk-success-card">
          <div className="hk-success-icon">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path className="hk-success-path" d="M5 17l8 8 16-16" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="hk-success-h2">You&apos;re Registered!</div>
          <p className="hk-success-p">
            Hey <span className="hk-success-em">{name || "there"}</span> — your spot for the{" "}
            <span className="hk-success-em">Jobingen AI Content Engine Hackathon</span> is confirmed.
            Problem brief and details will be sent to <span className="hk-success-em">{email}</span>.
          </p>
          <div className="hk-success-tags">
            <span className="hk-success-tag">✓ Registered</span>
            <span className="hk-success-tag">📧 Email Confirmed</span>
            <span className="hk-success-tag">🆓 Free Entry</span>
          </div>
          <div style={{ marginBottom: 12 }}>
            <a href="https://chat.whatsapp.com/BVteQffk69HIjUI9xOYmPG" target="_blank" rel="noopener noreferrer" className="hk-wa-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Join WhatsApp Group
            </a>
          </div>
          <a href="/" className="hk-back">← Back to Home</a>
        </div>
      </div>
    </>
  )
}

export default function HackathonPage() {
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
      <div className="hk">

        {/* HERO */}
        <section className="hk-hero">
          <div className="hk-hero-grid"/>
          <div className="hk-hero-glow"/>
          <div className="hk-hero-inner">

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="hk-badge">
                <div className="hk-badge-pill">
                  <span className="hk-badge-dot"/>
                  Open Now
                </div>
                <span className="hk-badge-text">Jobingen AI Hackathon 2026</span>
              </div>
            </div>

            <h1 className="hk-h1">
              Build the AI Engine.<br/>
              <span className="hk-h1-accent">Win the Internship.</span>
            </h1>

            <p className="hk-sub">
              Build and ship Jobingen&apos;s AI Content Creation Engine in a 48-hour sprint.
              Top builders get a real <strong style={{ color: "var(--navy)" }}>AI Engineer Internship (6–8 weeks)</strong> — your code goes live in production.
            </p>

            <div className="hk-hero-ctas">
              <a href="#register" className="hk-btn-p">
                Register Now — Free
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#problem" className="hk-btn-s">
                View Problem Statement
              </a>
            </div>

            <div className="hk-chips">
              <span className="hk-chip"><span className="hk-chip-dot" style={{ background: "#22C55E" }}/>Free Entry</span>
              <span className="hk-chip"><span className="hk-chip-dot" style={{ background: "var(--navy)" }}/>48-Hour Sprint</span>
              <span className="hk-chip"><span className="hk-chip-dot" style={{ background: "var(--blue)" }}/>Internship Prize</span>
              <span className="hk-chip"><span className="hk-chip-dot" style={{ background: "#f59e0b" }}/>100% Online</span>
              <span className="hk-chip"><span className="hk-chip-dot" style={{ background: "#8b5cf6" }}/>Ships to Production</span>
            </div>

          </div>
        </section>


        {/* PROBLEM STATEMENT */}
        <section className="hk-sec" id="problem">
          <div className="hk-wrap">
            <div className="hk-eyebrow"><span className="hk-eyebrow-dot"/>Problem Statement</div>
            <h2 className="hk-ttl">What You&apos;re Building</h2>
            <p className="hk-desc">One objective. Eight modules. Zero ambiguity.</p>

            <div className="hk-prob-card">
              <div className="hk-prob-title">JobInGen AI Content Creation Engine</div>
              <p className="hk-prob-body">
                Build an AI content creation engine that generates daily, on-brand social media posts
                (copy + designed image) for JobInGen — fully automatically. Run one command or scheduled job
                and receive a complete, brand-perfect, ready-to-post content pack every day,
                with zero manual design or writing work.
              </p>
              <div className="hk-prob-note">
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>💡</span>
                <span>
                  <strong>Core principle:</strong> The creation engine is the product. LinkedIn API, Instagram API and data scrapers
                  are optional plug-ins — built only after the core engine works. The system must function end-to-end
                  even if every external integration is turned off.
                </span>
              </div>
            </div>

            {/* Content Pillars */}
            <div style={{ marginTop: 52 }}>
              <div className="hk-eyebrow"><span className="hk-eyebrow-dot"/>Content Calendar</div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: "var(--navy)", letterSpacing: "-.03em", marginBottom: 6 }}>5 Content Pillars</h3>
              <p style={{ fontSize: 14, color: "var(--ink3)", marginBottom: 0 }}>
                The planner module selects today&apos;s pillar, topic, and template based on these weights.
              </p>
              <div className="hk-pillars">
                {[
                  { pct: "40%", label: "Educate" },
                  { pct: "25%", label: "Opportunity" },
                  { pct: "15%", label: "Proof" },
                  { pct: "10%", label: "Brand" },
                  { pct: "10%", label: "Culture" },
                ].map(p => (
                  <div key={p.label} className="hk-pillar">
                    <div className="hk-pillar-pct">{p.pct}</div>
                    <div className="hk-pillar-label">{p.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PHASE 1 MODULES */}
        <section className="hk-sec-alt">
          <div className="hk-wrap">
            <div className="hk-eyebrow"><span className="hk-eyebrow-dot"/>Phase 1 — Mandatory</div>
            <h2 className="hk-ttl">8 Modules to Build</h2>
            <p className="hk-desc">All 8 are required for Phase 1. Each has a defined input and output. Build in order.</p>

            <div className="hk-modules">
              {MODULES.map(m => (
                <div key={m.n} className="hk-module">
                  <div className="hk-module-head">
                    <div className="hk-module-num">{m.n}</div>
                    <div className="hk-module-tag">{m.tag}</div>
                  </div>
                  <div className="hk-module-title">{m.title}</div>
                  <div className="hk-module-body">{m.body}</div>
                  <div className="hk-module-output">
                    <span className="hk-module-out-dot"/>
                    Output: {m.output}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHASE 2 */}
        <section className="hk-sec-dk">
          <div className="hk-wrap">
            <div className="hk-eyebrow"><span className="hk-eyebrow-dot-w hk-eyebrow-w"/>Phase 2 — Optional</div>
            <h2 className="hk-ttl-w">Bonus Integrations</h2>
            <p className="hk-desc-w">
              Build these after Phase 1 is complete. Each is an independent plug-in.
              Core engine must never depend on any of these.
            </p>
            <div className="hk-p2-grid">
              {PHASE2.map(p => (
                <div key={p.pri} className="hk-p2-card">
                  <div className="hk-p2-pri">{p.pri}</div>
                  <div className="hk-p2-title">{p.title}</div>
                  <div className="hk-p2-body">{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="hk-sec">
          <div className="hk-wrap">
            <div className="hk-eyebrow"><span className="hk-eyebrow-dot"/>Tech Stack</div>
            <h2 className="hk-ttl">Suggested Stack</h2>
            <p className="hk-desc">You may propose alternatives — justify the choice in your submission.</p>
            <div className="hk-tech">
              {TECH.map(t => (
                <div key={t.label} className="hk-tech-row">
                  <div className="hk-tech-label">{t.label}</div>
                  <div className="hk-tech-val">{t.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM */}
        <section className="hk-sec-alt" id="register">
          <div className="hk-wrap">
            <div style={{ textAlign: "center" }}>
              <div className="hk-eyebrow" style={{ justifyContent: "center" }}><span className="hk-eyebrow-dot"/>Register</div>
              <h2 className="hk-ttl" style={{ textAlign: "center" }}>Apply Now</h2>
              <p className="hk-desc" style={{ margin: "0 auto", textAlign: "center" }}>Free entry. Takes 2 minutes.</p>
            </div>

            <div className="hk-form-outer">
              <div className="hk-form-card">
                <div className="hk-form-head">
                  <div className="hk-form-head-title">Hackathon Registration</div>
                  <div className="hk-form-head-sub">AI Content Engine · Free Entry · Internship Prize</div>
                </div>
                <div className="hk-form-body">
                  {sErr && <div className="hk-serr">⚠ {sErr}</div>}
                  <form onSubmit={submit} noValidate>
                    <div className="hk-row">
                      <div className="hk-field">
                        <label className="hk-label">Full Name<span className="hk-req">*</span></label>
                        <input className={`hk-input${errs.name ? " err" : ""}`} placeholder="Arjun Sharma" value={vals.name ?? ""} onChange={e => set("name", e.target.value)}/>
                        {errs.name && <div className="hk-errmsg">{errs.name}</div>}
                      </div>
                      <div className="hk-field">
                        <label className="hk-label">Email Address<span className="hk-req">*</span></label>
                        <input type="email" className={`hk-input${errs.email ? " err" : ""}`} placeholder="arjun@gmail.com" value={vals.email ?? ""} onChange={e => set("email", e.target.value)}/>
                        {errs.email && <div className="hk-errmsg">{errs.email}</div>}
                      </div>
                    </div>
                    <div className="hk-row">
                      <div className="hk-field">
                        <label className="hk-label">Phone Number<span className="hk-req">*</span></label>
                        <input type="tel" className={`hk-input${errs.phone ? " err" : ""}`} placeholder="9876543210" value={vals.phone ?? ""} onChange={e => set("phone", e.target.value)}/>
                        {errs.phone && <div className="hk-errmsg">{errs.phone}</div>}
                      </div>
                      <div className="hk-field">
                        <label className="hk-label">College / Institution<span className="hk-req">*</span></label>
                        <input className={`hk-input${errs.college ? " err" : ""}`} placeholder="IIT Delhi" value={vals.college ?? ""} onChange={e => set("college", e.target.value)}/>
                        {errs.college && <div className="hk-errmsg">{errs.college}</div>}
                      </div>
                    </div>
                    <div className="hk-row">
                      <div className="hk-field">
                        <label className="hk-label">Year of Study<span className="hk-req">*</span></label>
                        <select className={`hk-select${errs.year ? " err" : ""}`} value={vals.year ?? ""} onChange={e => set("year", e.target.value)}>
                          <option value="">Select…</option>
                          {["1st Year","2nd Year","3rd Year","4th Year","Final Year (5yr)","Recent Graduate","Working Professional"].map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        {errs.year && <div className="hk-errmsg">{errs.year}</div>}
                      </div>
                      <div className="hk-field">
                        <label className="hk-label">Tech Stack <span style={{ textTransform: "none", fontWeight: 500, fontSize: 11, color: "var(--ink3)" }}>(optional)</span></label>
                        <input className="hk-input" placeholder="Python, LangChain, Node.js…" value={vals.tech_stack ?? ""} onChange={e => set("tech_stack", e.target.value)}/>
                      </div>
                    </div>
                    <div className="hk-row">
                      <div className="hk-field">
                        <label className="hk-label">GitHub / Portfolio <span style={{ textTransform: "none", fontWeight: 500, fontSize: 11, color: "var(--ink3)" }}>(optional)</span></label>
                        <input className="hk-input" placeholder="github.com/you" value={vals.github ?? ""} onChange={e => set("github", e.target.value)}/>
                      </div>
                      <div className="hk-field">
                        <label className="hk-label">Team Name <span style={{ textTransform: "none", fontWeight: 500, fontSize: 11, color: "var(--ink3)" }}>(optional)</span></label>
                        <input className="hk-input" placeholder="Team Nexus" value={vals.team_name ?? ""} onChange={e => set("team_name", e.target.value)}/>
                      </div>
                    </div>
                    <div className="hk-divider"/>
                    <div className="hk-field">
                      <label className="hk-label">Why do you want to participate? <span style={{ textTransform: "none", fontWeight: 500, fontSize: 11, color: "var(--ink3)" }}>(optional)</span></label>
                      <textarea className="hk-textarea" rows={3} placeholder="What excites you about this AI content automation challenge?" value={vals.why ?? ""} onChange={e => set("why", e.target.value)}/>
                    </div>
                    <button type="submit" className="hk-submit" disabled={busy}>
                      <span className="hk-submit-inner">
                        {busy && <span className="hk-spinner"/>}
                        {busy ? "Registering…" : "Register Now — Free Entry →"}
                      </span>
                    </button>
                    <div className="hk-free">🔒 Free entry · No payment · No spam</div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer/>
    </>
  )
}
