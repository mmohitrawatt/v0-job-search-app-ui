"use client"

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

/* ─── scroll reveal (same pattern as summer-internship) ─────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("show"); io.unobserve(el) } }, { threshold: 0.08 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return ref
}
function R({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const ref = useReveal()
  return <div ref={ref} className={`rev ${className}`} style={{ transitionDelay: `${d}ms` }}>{children}</div>
}

/* ─── CSS ────────────────────────────────────────────────────────── */
const CSS = `
  /* Scoped to .ea — identical vars to Jobingen summer-internship */
  .ea {
    --ind:  #1d3a8f;
    --vio:  #3b52f0;
    --ind-l:#e8edfe;
    --ind-xl:#f4f6ff;
    --cream:#f7f7fb;
    --white:#ffffff;
    --ink:  #09090f;
    --ink2: #3d3d52;
    --ink3: #8a8aa8;
    --jb:   rgba(10,10,20,0.07);
    --jbM:  rgba(10,10,20,0.14);
    --grn:  #10b981;
    --grn-l:#ecfdf5;
    --shadow-sm: 0 2px 8px rgba(10,10,20,0.05);
    --shadow-md: 0 4px 24px rgba(10,10,20,0.09);
    --shadow-lg: 0 12px 48px rgba(10,10,20,0.13);
    --ease: cubic-bezier(.16,1,.3,1);

    font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    background: var(--white);
    overflow-x: hidden;
  }

  @keyframes ea-fade  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
  @keyframes ea-scale { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
  @keyframes ea-spin  { to{transform:rotate(360deg)} }

  /* scroll reveal — same as .si */
  .ea .rev { opacity:0; transform:translateY(20px); transition:opacity .65s var(--ease), transform .65s var(--ease); }
  .ea .rev.show { opacity:1; transform:none; }

  /* gradient text — same as .shimmer-text in summer internship */
  .ea .ea-grad {
    background: linear-gradient(135deg, var(--ind) 0%, var(--vio) 100%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }

  /* ── HERO ── */
  .ea-hero {
    position: relative; overflow: hidden;
    background: linear-gradient(175deg, var(--ind-xl) 0%, var(--white) 60%);
    padding: 64px 24px 72px;
    border-bottom: 1px solid var(--jb);
  }
  @media(max-width:600px) { .ea-hero { padding: 44px 18px 52px; } }
  .ea-hero-grid {
    position: absolute; inset: 0; pointer-events: none; opacity: .45;
    background-image: linear-gradient(var(--ind-l) 1px, transparent 1px), linear-gradient(90deg, var(--ind-l) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse 75% 60% at 50% 30%, black 10%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 75% 60% at 50% 30%, black 10%, transparent 75%);
  }
  .ea-hero-glow {
    position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
    width: 800px; height: 800px; border-radius: 50%; pointer-events: none;
    background: radial-gradient(circle, rgba(29,58,143,.07) 0%, transparent 65%);
  }
  .ea-hero-wrap { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; text-align: center; }

  /* badge — same structure as si-cohort-badge */
  .ea-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px 6px 8px; background: white;
    border: 1.5px solid rgba(29,58,143,.18); border-radius: 99px;
    box-shadow: var(--shadow-sm); margin-bottom: 28px;
    animation: ea-fade .55s var(--ease) both;
  }
  .ea-badge-pill { display: inline-flex; align-items: center; gap: 5px; background: linear-gradient(135deg,var(--ind),var(--vio)); color: white; font-size: 10px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; padding: 4px 10px; border-radius: 99px; }
  .ea-badge-dot  { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; }
  .ea-badge-txt  { font-size: 12.5px; font-weight: 600; color: var(--ind); }

  .ea-h1  { font-size: clamp(38px,5.8vw,66px); font-weight: 900; color: var(--ink); letter-spacing: -.048em; line-height: 1.04; margin-bottom: 22px; animation: ea-fade .7s var(--ease) .1s both; }
  .ea-sub { font-size: clamp(15px,1.8vw,18px); color: var(--ink2); line-height: 1.78; max-width: 570px; margin: 0 auto 38px; animation: ea-fade .8s var(--ease) .16s both; }

  /* CTAs */
  .ea-ctas { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; animation: ea-fade .9s var(--ease) .22s both; }
  .ea-btn-p {
    display: inline-flex; align-items: center; justify-content: center; gap: 9px; padding: 14px 32px; border-radius: 13px;
    background: linear-gradient(135deg,var(--ind),var(--vio)); color: white;
    font-size: 15px; font-weight: 700; text-decoration: none; border: none; cursor: pointer;
    box-shadow: 0 4px 20px rgba(29,58,143,.32); transition: all .22s var(--ease);
  }
  .ea-btn-p:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(29,58,143,.42); }
  .ea-btn-s {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 26px; border-radius: 13px;
    background: white; color: var(--ind); font-size: 15px; font-weight: 700;
    text-decoration: none; border: 1.5px solid rgba(29,58,143,.2);
    box-shadow: var(--shadow-sm); transition: all .22s; cursor: pointer;
  }
  .ea-btn-s:hover { border-color: var(--ind); background: var(--ind-xl); transform: translateY(-1px); }
  @media(max-width:480px) {
    .ea-ctas { flex-direction: column; align-items: stretch; padding: 0 4px; }
    .ea-btn-p, .ea-btn-s { width: 100%; font-size: 14px; padding: 13px 20px; }
  }

  /* stats row — identical to si-stats-row */
  .ea-stats-row {
    display: inline-flex; background: white; border: 1.5px solid var(--jb); border-radius: 16px;
    overflow: hidden; box-shadow: var(--shadow-md);
    animation: ea-fade 1s var(--ease) .28s both;
  }
  .ea-stat        { padding: 18px 28px; text-align: center; border-right: 1px solid var(--jb); }
  .ea-stat:last-child { border-right: none; }
  .ea-stat-v      { font-size: 22px; font-weight: 900; color: var(--ind); letter-spacing: -.04em; line-height: 1; }
  .ea-stat-l      { font-size: 10.5px; font-weight: 600; color: var(--ink3); margin-top: 5px; letter-spacing: .04em; text-transform: uppercase; }
  @media(max-width:600px) {
    .ea-stats-row { display: grid; grid-template-columns: 1fr 1fr; border-radius: 14px; width: 100%; }
    .ea-stat { border-right: none; border-bottom: 1px solid var(--jb); padding: 13px 16px; }
    .ea-stat:nth-child(odd)  { border-right: 1px solid var(--jb); }
    .ea-stat:nth-last-child(-n+2) { border-bottom: none; }
    .ea-stat-v { font-size: 18px; }
  }

  /* ── SECTIONS ── */
  .ea-wrap    { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
  .ea-sec     { padding: 72px 0; background: var(--white); }
  .ea-sec-alt { padding: 72px 0; background: var(--cream); }
  .ea-sec-dk  { padding: 56px 0; background: linear-gradient(160deg,#0c1445 0%,#0f172a 50%,#0c1445 100%); position: relative; overflow: hidden; }
  @media(max-width:600px) {
    .ea-wrap { padding: 0 16px; }
    .ea-sec, .ea-sec-alt { padding: 48px 0; }
    .ea-sec-dk { padding: 40px 0; }
  }

  .ea-eyebrow     { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 14px; font-size: 11px; font-weight: 800; color: var(--ind); letter-spacing: .1em; text-transform: uppercase; }
  .ea-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--ind); flex-shrink: 0; }
  .ea-eyebrow-w   { color: rgba(165,180,252,.8); }
  .ea-eyebrow-dot-w { background: rgba(165,180,252,.8); }
  .ea-ttl   { font-size: clamp(28px,3.5vw,44px); font-weight: 900; color: var(--ink); letter-spacing: -.04em; line-height: 1.08; margin-bottom: 14px; }
  .ea-ttl-w { font-size: clamp(28px,3.5vw,44px); font-weight: 900; color: white; letter-spacing: -.04em; line-height: 1.08; margin-bottom: 14px; }
  .ea-desc   { font-size: 16px; color: var(--ink2); line-height: 1.75; max-width: 520px; }
  .ea-desc-w { font-size: 16px; color: #94a3b8; line-height: 1.75; max-width: 540px; }


  /* ── WHY CARDS — identical to si-why-card ── */
  .ea-why-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 52px; }
  @media(max-width:860px) { .ea-why-grid { grid-template-columns: 1fr; max-width: 100%; } }
  .ea-why-card {
    background: white; border-radius: 20px; border: 1.5px solid var(--jb);
    padding: 28px 24px; box-shadow: var(--shadow-sm);
    transition: all .28s var(--ease); position: relative; overflow: hidden;
  }
  .ea-why-card::after { content: ''; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(135deg,rgba(29,58,143,.03) 0%,transparent 60%); opacity: 0; transition: opacity .28s; }
  .ea-why-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: rgba(29,58,143,.22); }
  .ea-why-card:hover::after { opacity: 1; }
  .ea-why-num   { font-size: 10.5px; font-weight: 900; color: var(--vio); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 14px; opacity: .7; }
  .ea-why-icon  { width: 46px; height: 46px; border-radius: 13px; background: var(--ind-l); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; font-size: 22px; }
  .ea-why-title { font-size: 16px; font-weight: 800; color: var(--ink); letter-spacing: -.025em; margin-bottom: 10px; }
  .ea-why-body  { font-size: 13.5px; color: var(--ink2); line-height: 1.72; }


  /* ── SEATS CARD (redesigned) ── */
  .ea-seats-card {
    background: white; border: 1.5px solid var(--jb); border-radius: 24px;
    margin-top: 52px; overflow: hidden; box-shadow: var(--shadow-md);
    display: grid; grid-template-columns: 260px 1fr;
  }
  .ea-seats-left {
    background: linear-gradient(160deg, var(--ind-xl) 0%, #dde5fd 100%);
    border-right: 1.5px solid var(--ind-l);
    padding: 40px 28px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
  }
  .ea-seats-num  { font-size: clamp(64px,10vw,96px); font-weight: 900; color: var(--ind); letter-spacing: -.06em; line-height: 1; margin-bottom: 6px; }
  .ea-seats-unit { font-size: 11px; font-weight: 800; color: var(--ink3); text-transform: uppercase; letter-spacing: .09em; margin-bottom: 18px; }
  .ea-seats-lim  {
    display: inline-flex; align-items: center; gap: 5px;
    background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.2);
    border-radius: 99px; padding: 5px 12px;
    font-size: 11px; font-weight: 800; color: #dc2626;
  }
  .ea-seats-lim-dot { width: 5px; height: 5px; background: #dc2626; border-radius: 50%; }
  .ea-seats-right { padding: 40px 44px; }
  .ea-seats-rh   { font-size: clamp(18px,2.2vw,24px); font-weight: 900; color: var(--ink); letter-spacing: -.04em; line-height: 1.2; margin-bottom: 10px; }
  .ea-seats-rdesc { font-size: 14.5px; color: var(--ink2); line-height: 1.7; margin-bottom: 24px; }
  .ea-seats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 11px 24px; margin-bottom: 26px; }
  .ea-seat-row   { display: flex; align-items: center; gap: 9px; font-size: 13.5px; color: var(--ink2); font-weight: 500; }
  .ea-seat-check { width: 20px; height: 20px; border-radius: 6px; background: var(--grn-l); border: 1px solid rgba(16,185,129,.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ea-urgency-tag { display: inline-flex; align-items: center; gap: 7px; background: #fff7ed; border: 1px solid rgba(234,88,12,.2); border-radius: 8px; padding: 7px 14px; font-size: 12.5px; font-weight: 700; color: #9a3412; }
  @media(max-width:800px) { .ea-seats-card { grid-template-columns: 1fr; } .ea-seats-left { border-right: none; border-bottom: 1.5px solid var(--ind-l); padding: 32px; flex-direction: row; gap: 24px; text-align: left; } .ea-seats-right { padding: 28px 24px; } }
  @media(max-width:520px) { .ea-seats-grid { grid-template-columns: 1fr; } .ea-seats-left { flex-direction: column; text-align: center; } }

  /* ── APPLICATION FORM ── */
  .ea-form-outer { max-width: 660px; margin: 0 auto; }
  .ea-form-card  {
    background: white; border: 1.5px solid var(--jb);
    border-radius: 22px; overflow: hidden; box-shadow: var(--shadow-lg);
  }
  .ea-form-top {
    background: linear-gradient(135deg, var(--ind), var(--vio));
    padding: 28px 32px; position: relative; overflow: hidden;
  }
  .ea-form-top::after {
    content: ''; position: absolute; top: -50px; right: -40px;
    width: 220px; height: 220px; background: rgba(255,255,255,.06); border-radius: 50%;
  }
  .ea-ft-tag {
    display: inline-flex; align-items: center; gap: 5px;
    background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.22);
    border-radius: 99px; padding: 4px 10px; font-size: 10px; font-weight: 800; color: white;
    letter-spacing: .06em; text-transform: uppercase; margin-bottom: 12px; position: relative; z-index: 1;
  }
  .ea-ft-dot { width: 5px; height: 5px; background: #86efac; border-radius: 50%; }
  .ea-form-top h3 { font-size: 20px; font-weight: 900; color: white; letter-spacing: -.03em; margin-bottom: 5px; position: relative; z-index: 1; }
  .ea-form-top p  { font-size: 13px; color: rgba(255,255,255,.65); position: relative; z-index: 1; }

  .ea-form-body { padding: 30px 32px; }
  @media(max-width:520px) { .ea-form-body { padding: 20px 18px; } .ea-form-top { padding: 22px 20px; } }

  .ea-fdiv { font-size: 10.5px; font-weight: 800; color: var(--ink3); text-transform: uppercase; letter-spacing: .08em; margin: 22px 0 16px; padding-bottom: 8px; border-bottom: 1px solid var(--jb); }
  .ea-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media(max-width:540px) { .ea-grid2 { grid-template-columns: 1fr; } }

  .ea-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 16px; }
  .ea-label { font-size: 12px; font-weight: 700; color: var(--ink2); letter-spacing: .01em; }
  .ea-opt   { font-size: 11px; color: var(--ink3); font-weight: 500; }

  .ea-input {
    width: 100%; padding: 11px 13px; border-radius: 10px;
    border: 1.5px solid var(--jb); background: var(--cream);
    font-size: 14px; color: var(--ink); outline: none; font-family: inherit;
    transition: border-color .18s, box-shadow .18s, background .18s;
  }
  .ea-input:focus { border-color: var(--ind); background: white; box-shadow: 0 0 0 3px rgba(29,58,143,.1); }
  .ea-input::placeholder { color: var(--ink3); }
  .ea-input.err { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,.07); }

  .ea-select {
    width: 100%; padding: 11px 13px; border-radius: 10px;
    border: 1.5px solid var(--jb); background: var(--cream);
    font-size: 14px; color: var(--ink); outline: none; cursor: pointer; font-family: inherit; appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='11' height='7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%238a8aa8' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 13px center;
    transition: border-color .18s, box-shadow .18s;
  }
  .ea-select:focus { border-color: var(--ind); background-color: white; box-shadow: 0 0 0 3px rgba(29,58,143,.1); }
  .ea-select.err  { border-color: #ef4444; }

  .ea-textarea {
    width: 100%; padding: 11px 13px; border-radius: 10px;
    border: 1.5px solid var(--jb); background: var(--cream);
    font-size: 14px; color: var(--ink); outline: none;
    resize: vertical; min-height: 110px; line-height: 1.7; font-family: inherit;
    transition: border-color .18s, box-shadow .18s, background .18s;
  }
  .ea-textarea:focus { border-color: var(--ind); background: white; box-shadow: 0 0 0 3px rgba(29,58,143,.1); }
  .ea-textarea::placeholder { color: var(--ink3); }
  .ea-textarea.err { border-color: #ef4444; }

  .ea-err  { font-size: 11px; color: #ef4444; font-weight: 600; }
  .ea-char { font-size: 11px; color: var(--ink3); text-align: right; }

  .ea-submit {
    width: 100%; padding: 14px; border-radius: 12px; border: none; cursor: pointer;
    background: linear-gradient(135deg,var(--ind),var(--vio)); color: white;
    font-size: 15px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 4px 20px rgba(29,58,143,.32);
    transition: all .22s var(--ease); margin-top: 8px;
  }
  .ea-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(29,58,143,.44); }
  .ea-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
  .ea-form-note { margin-top: 13px; font-size: 11.5px; color: var(--ink3); text-align: center; line-height: 1.65; }
  .ea-form-note a { color: var(--ind); font-weight: 600; text-decoration: none; }

  /* ── DARK CTA — identical to si-cta-sec ── */
  .ea-cta-glow1 { position: absolute; top: -200px; left: 50%; transform: translateX(-50%); width: 700px; height: 700px; border-radius: 50%; pointer-events: none; background: radial-gradient(circle,rgba(59,82,240,.22) 0%,transparent 65%); }
  .ea-cta-glow2 { position: absolute; bottom: -150px; left: -80px; width: 500px; height: 500px; border-radius: 50%; pointer-events: none; background: radial-gradient(circle,rgba(29,58,143,.3) 0%,transparent 70%); }
  .ea-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; text-align: center; padding: 0 24px; }

  @media(max-width:480px) {
    .ea-seats-right { padding: 22px 18px; }
    .ea-seats-rh { font-size: 18px; }
    .ea-urgency-tag { font-size: 11px; padding: 6px 11px; }
    .ea-why-card { padding: 22px 18px; }
  }

  /* ── LIVE SEATS ── */
  @keyframes ea-bump { 0%{transform:scale(1)} 40%{transform:scale(1.22)} 70%{transform:scale(.96)} 100%{transform:scale(1)} }
  @keyframes ea-pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.75)} }
  @keyframes ea-bar-shine { 0%{left:-60%} 100%{left:120%} }

  .ea-live-dot {
    width:6px; height:6px; border-radius:50%; background:#22c55e; display:inline-block; flex-shrink:0;
    animation: ea-pulse-dot 1.8s ease-in-out infinite;
  }
  .ea-live-dot.urgent { background:#dc2626; }
  .ea-live-dot.warn   { background:#f59e0b; }

  .ea-seats-live { transition:color .4s var(--ease); }
  .ea-seats-live.ea-bump { animation:ea-bump .6s var(--ease) both; }

  /* new seats card */
  .ea-sc {
    background:white; border:1.5px solid var(--jb); border-radius:24px;
    overflow:hidden; box-shadow:var(--shadow-md); margin-top:52px;
  }
  .ea-sc-top {
    display:grid; grid-template-columns:260px 1fr;
  }
  @media(max-width:800px) { .ea-sc-top { grid-template-columns:1fr; } }

  .ea-sc-left {
    background:linear-gradient(160deg,var(--ind-xl) 0%,#dde5fd 100%);
    border-right:1.5px solid var(--ind-l);
    padding:40px 28px;
    display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;
  }
  @media(max-width:800px) { .ea-sc-left { border-right:none; border-bottom:1.5px solid var(--ind-l); padding:28px 24px; flex-direction:row; gap:20px; text-align:left; justify-content:flex-start; } }
  @media(max-width:480px) { .ea-sc-left { flex-direction:column; text-align:center; justify-content:center; } }

  .ea-sc-num {
    font-size:clamp(56px,10vw,88px); font-weight:900; letter-spacing:-.06em; line-height:1;
    margin-bottom:4px; transition:color .5s var(--ease);
  }
  .ea-sc-num.green  { color:#059669; }
  .ea-sc-num.yellow { color:#d97706; }
  .ea-sc-num.red    { color:#dc2626; }
  .ea-sc-num.ea-bump { animation:ea-bump .6s var(--ease) both; }

  .ea-sc-unit { font-size:11px; font-weight:800; color:var(--ink3); text-transform:uppercase; letter-spacing:.09em; margin-bottom:16px; }
  .ea-sc-badge {
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 12px; border-radius:99px; font-size:11px; font-weight:800;
  }
  .ea-sc-badge.green  { background:#dcfce7; color:#059669; border:1px solid rgba(5,150,105,.2); }
  .ea-sc-badge.yellow { background:#fef3c7; color:#b45309; border:1px solid rgba(180,83,9,.2); }
  .ea-sc-badge.red    { background:#fee2e2; color:#dc2626; border:1px solid rgba(220,38,38,.2); }

  .ea-sc-right { padding:36px 40px; }
  @media(max-width:800px) { .ea-sc-right { padding:24px 20px; } }

  .ea-sc-rh { font-size:clamp(17px,2.2vw,22px); font-weight:900; color:var(--ink); letter-spacing:-.04em; line-height:1.2; margin-bottom:8px; }
  .ea-sc-rdesc { font-size:14px; color:var(--ink2); line-height:1.7; margin-bottom:20px; }

  /* progress bar */
  .ea-pb-wrap { margin-bottom:20px; }
  .ea-pb-labels { display:flex; justify-content:space-between; align-items:center; margin-bottom:7px; }
  .ea-pb-lbl { font-size:11px; font-weight:700; color:var(--ink3); text-transform:uppercase; letter-spacing:.06em; }
  .ea-pb-pct { font-size:12px; font-weight:800; }
  .ea-pb-pct.green  { color:#059669; }
  .ea-pb-pct.yellow { color:#d97706; }
  .ea-pb-pct.red    { color:#dc2626; }
  .ea-pb-track { height:10px; background:var(--ind-l); border-radius:99px; overflow:hidden; position:relative; }
  .ea-pb-fill {
    height:100%; border-radius:99px; position:relative; overflow:hidden;
    transition:width .8s cubic-bezier(.34,1.2,.64,1);
  }
  .ea-pb-fill.green  { background:linear-gradient(90deg,#059669,#34d399); }
  .ea-pb-fill.yellow { background:linear-gradient(90deg,#d97706,#fbbf24); }
  .ea-pb-fill.red    { background:linear-gradient(90deg,#dc2626,#f87171); }
  .ea-pb-fill::after {
    content:''; position:absolute; top:0; bottom:0; width:50%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);
    animation:ea-bar-shine 2s ease-in-out infinite;
  }

  .ea-sc-checks { display:grid; grid-template-columns:1fr 1fr; gap:9px 20px; margin-bottom:20px; }
  @media(max-width:480px) { .ea-sc-checks { grid-template-columns:1fr; } }

  .ea-sc-urgency {
    display:flex; align-items:flex-start; gap:9px;
    border-radius:10px; padding:10px 14px; font-size:12.5px; font-weight:700; line-height:1.5;
  }
  .ea-sc-urgency.green  { background:#f0fdf4; color:#15803d; border:1px solid rgba(22,163,74,.15); }
  .ea-sc-urgency.yellow { background:#fffbeb; color:#92400e; border:1px solid rgba(180,83,9,.2); }
  .ea-sc-urgency.red    { background:#fef2f2; color:#9b1c1c; border:1px solid rgba(220,38,38,.2); }

  .ea-sc-urgency-icon { flex-shrink:0; margin-top:1px; }

  /* ── SUCCESS ── */
  .ea-success-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--cream); padding: 40px 16px; }
  .ea-success-card { max-width: 480px; width: 100%; background: white; border: 1.5px solid var(--jb); border-radius: 24px; box-shadow: var(--shadow-lg); padding: 48px 40px; text-align: center; animation: ea-scale .55s var(--ease) both; }
  @media(max-width:520px) { .ea-success-card { padding: 32px 20px; } }
  .ea-success-icon { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg,var(--ind),var(--vio)); display: flex; align-items: center; justify-content: center; margin: 0 auto 22px; box-shadow: 0 12px 40px rgba(29,58,143,.28); }
  .ea-success-kicker { font-size: 11px; font-weight: 800; color: var(--ind); text-transform: uppercase; letter-spacing: .07em; margin-bottom: 10px; }
  .ea-success-h { font-size: 26px; font-weight: 900; color: var(--ink); letter-spacing: -.03em; margin-bottom: 12px; }
  .ea-success-p { font-size: 14px; color: var(--ink2); line-height: 1.75; margin-bottom: 24px; }
  .ea-success-tag { display: inline-flex; align-items: center; gap: 7px; background: var(--grn-l); border: 1px solid rgba(16,185,129,.2); border-radius: 10px; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #059669; margin-bottom: 28px; }
  .ea-wa-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 9px;
    width: 100%; padding: 13px 20px; border-radius: 12px; margin-bottom: 12px;
    background: #25d366; color: white; font-size: 14px; font-weight: 800;
    text-decoration: none; box-shadow: 0 4px 16px rgba(37,211,102,.3);
    transition: all .22s var(--ease);
  }
  .ea-wa-btn:hover { background: #20bd5a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,211,102,.4); }

  .ea-back-home { display: inline-flex; align-items: center; justify-content: center; gap: 7px; width: 100%; padding: 13px 28px; border-radius: 12px; background: linear-gradient(135deg,var(--ind),var(--vio)); color: white; font-size: 14px; font-weight: 800; text-decoration: none; box-shadow: 0 4px 16px rgba(29,58,143,.28); transition: all .22s; }
  .ea-back-home:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(29,58,143,.4); }
`

/* ─── Types & Data ───────────────────────────────────────────────── */
type Form = { name:string; email:string; phone:string; college:string; status:string; domain:string; why:string; portfolio:string }
const INIT: Form = { name:"", email:"", phone:"", college:"", status:"", domain:"", why:"", portfolio:"" }
const STATUSES = ["1st Year Student","2nd Year Student","3rd Year Student","Final Year Student","Graduate","Working Professional"]
const DOMAINS  = ["AI / ML","Development","Product Design","Marketing","Operations","Creator Program"]

const WHY_CARDS = [
  { n:"01", icon:"🎯", title:"Personal Mentor Support",   body:"Every selected intern is assigned a dedicated mentor — not a queue ticket. You get real guidance from real people throughout the program." },
  { n:"02", icon:"📐", title:"Quality Over Quantity",     body:"We want every intern to genuinely understand and build. Not just show up — but actually learn by working on things that matter." },
  { n:"03", icon:"🚀", title:"Real Startup Experience",   body:"Work inside a live AI startup — on real tools, real systems, real decisions. This isn't a simulation. It's the actual thing." },
]


/* ─── Icons ──────────────────────────────────────────────────────── */
function ArrowRight() {
  return <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
}
function ArrowLeft() {
  return <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
}
function CheckSm() {
  return <svg width="11" height="11" fill="none" viewBox="0 0 14 14"><path d="M2.5 7l3 3 6-6" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function Spinner() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ animation:"ea-spin 1s linear infinite" }}>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
      <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}


/* ─── SeatsCard ──────────────────────────────────────────────────── */
function SeatsCard({ seats, seatsAnim, onApply }: { seats: { total: number; filled: number; remaining: number }; seatsAnim: boolean; onApply: () => void }) {
  const pct     = Math.round((seats.filled / seats.total) * 100)
  const urgency = seats.remaining <= 10 ? "red" : seats.remaining <= 25 ? "yellow" : "green"
  const label   = urgency === "red" ? "Almost Full!" : urgency === "yellow" ? "Filling Fast" : "Spots Available"
  const dotClass = urgency === "red" ? "urgent" : urgency === "yellow" ? "warn" : ""
  const urgencyMsg = urgency === "red"
    ? "Hurry — less than 10 seats remain. Applications may close very soon."
    : urgency === "yellow"
    ? "Over half the cohort is filled. Apply now before it closes."
    : "Applications are open. Secure your spot before seats run out."
  const urgencyIcon = urgency === "red"
    ? <svg className="ea-sc-urgency-icon" width="15" height="15" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" strokeLinecap="round"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
    : urgency === "yellow"
    ? <svg className="ea-sc-urgency-icon" width="15" height="15" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    : <svg className="ea-sc-urgency-icon" width="15" height="15" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>

  return (
    <div className="ea-sc">
      <div className="ea-sc-top">

        {/* Left — live counter */}
        <div className="ea-sc-left">
          <div>
            <div className={`ea-sc-num ${urgency}${seatsAnim ? " ea-bump" : ""}`}>{seats.remaining}</div>
            <div className="ea-sc-unit">Seats Remaining</div>
            <div className={`ea-sc-badge ${urgency}`}>
              <span className={`ea-live-dot ${dotClass}`} />
              {label}
            </div>
          </div>
        </div>

        {/* Right — progress + details */}
        <div className="ea-sc-right">
          <div className="ea-sc-rh">Only 60 seats —<br />intentionally kept small.</div>
          <div className="ea-sc-rdesc">
            Most programs take hundreds of applicants. We don&apos;t. Every intern gets real mentor attention,
            real project ownership, and direct team visibility.
          </div>

          {/* Progress bar */}
          <div className="ea-pb-wrap">
            <div className="ea-pb-labels">
              <span className="ea-pb-lbl">{seats.filled} / {seats.total} seats filled</span>
              <span className={`ea-pb-pct ${urgency}`}>{pct}% filled</span>
            </div>
            <div className="ea-pb-track">
              <div className={`ea-pb-fill ${urgency}`} style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Checklist */}
          <div className="ea-sc-checks">
            {["Personal mentor assigned","Real project ownership","Direct founder access","Letter of recommendation","Certificate of completion","Priority hiring pipeline"].map(item => (
              <div key={item} className="ea-seat-row">
                <div className="ea-seat-check"><CheckSm /></div>
                {item}
              </div>
            ))}
          </div>

          {/* Urgency message */}
          <div className={`ea-sc-urgency ${urgency}`}>
            {urgencyIcon}
            <span>{urgencyMsg}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function EarlyApplyPage() {
  const [form, setForm]       = useState<Form>(INIT)
  const [errors, setErrors]   = useState<Partial<Record<keyof Form, string>>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  /* ── Seats ── */
  const [seats, setSeats] = useState({ total: 60, filled: 0, remaining: 60 })
  const [seatsAnim, setSeatsAnim] = useState(false)
  const seatsRef = useRef(60)

  useEffect(() => {
    const fetchSeats = () =>
      fetch("/api/early-apply/seats")
        .then(r => r.json())
        .then(d => {
          setSeats(d)
          if (seatsRef.current !== d.remaining) {
            setSeatsAnim(true)
            setTimeout(() => setSeatsAnim(false), 800)
          }
          seatsRef.current = d.remaining
        })
        .catch(() => {})
    fetchSeats()
    const id = setInterval(fetchSeats, 30000)
    return () => clearInterval(id)
  }, [])

  const set = (k: keyof Form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }))

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  const validate = (): boolean => {
    const errs: Partial<Record<keyof Form, string>> = {}
    if (!form.name.trim())  errs.name    = "Full name is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email"
    if (form.phone.replace(/\D/g,"").length < 10) errs.phone = "Enter a valid 10-digit number"
    if (!form.college.trim()) errs.college = "College / University is required"
    if (!form.status)         errs.status  = "Select your current status"
    if (!form.domain)         errs.domain  = "Select a domain of interest"
    if (form.why.trim().length < 40) errs.why = "Please write at least 40 characters"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("/api/early-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors({ email: data.error || "Submission failed. Please try again." })
        return
      }
      setDone(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      setErrors({ email: "Network error. Please check your connection." })
    } finally {
      setLoading(false)
    }
  }

  /* ── Success ── */
  if (done) return (
    <>
      <style>{CSS}</style>
      <div className="ea">
        <div className="ea-success-wrap">
          <div className="ea-success-card">
            <div className="ea-success-icon">
              <svg width="34" height="34" fill="none" viewBox="0 0 40 40">
                <path d="M10 21L17 28L30 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ea-success-kicker">Application Received</div>
            <h2 className="ea-success-h">You're in the queue, {form.name.split(" ")[0]}!</h2>
            <p className="ea-success-p">
              Your early application has been successfully submitted. Our team will review every application personally and contact shortlisted candidates via email.
            </p>
            <div className="ea-success-tag">
              <CheckSm />
              Successfully submitted
            </div>

            {/* WhatsApp group */}
            <a
              href="https://chat.whatsapp.com/FMRyhii0sJoEFqQ1giF5Me"
              target="_blank"
              rel="noopener noreferrer"
              className="ea-wa-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join the WhatsApp Group
            </a>

            <Link href="/" className="ea-back-home">
              <ArrowLeft />
              Back to Jobingen
            </Link>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <div className="ea" style={{ paddingTop: 68 }}>

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section className="ea-hero">
          <div className="ea-hero-grid" />
          <div className="ea-hero-glow" />

          <div className="ea-hero-wrap">
            <div className="ea-badge">
              <div className="ea-badge-pill">
                <div className="ea-badge-dot" />
                Cohort 2026
              </div>
              <span className="ea-badge-txt">Early Applications Open</span>
            </div>

            <h1 className="ea-h1">
              Early Apply for<br />
              <span className="ea-grad">Jobingen Summer Training</span>
            </h1>

            <p className="ea-sub">
              Join Jobingen's AI-first summer internship and work on real projects, modern workflows, and startup systems — starting June 2026.
            </p>

            <div className="ea-ctas">
              <button className="ea-btn-p" onClick={scrollToForm}>
                Apply Early &nbsp;<ArrowRight />
              </button>
              <a href="#program" className="ea-btn-s">
                Explore Program
              </a>
            </div>

            <div className="ea-stats-row">
              <div className="ea-stat">
                <div className="ea-stat-v">4 Weeks</div>
                <div className="ea-stat-l">Duration</div>
              </div>
              <div className="ea-stat">
                <div className="ea-stat-v">June 1</div>
                <div className="ea-stat-l">Start Date</div>
              </div>
              <div className="ea-stat">
                <div className="ea-stat-v">6 Domains</div>
                <div className="ea-stat-l">Tracks</div>
              </div>
              <div className="ea-stat">
                <div className={`ea-stat-v ea-seats-live${seatsAnim ? " ea-bump" : ""}`} style={{ color: seats.remaining <= 15 ? "#dc2626" : seats.remaining <= 30 ? "#d97706" : "var(--ind)" }}>
                  {seats.remaining}
                </div>
                <div className="ea-stat-l" style={{ display:"flex", alignItems:"center", gap:4, justifyContent:"center" }}>
                  <span className="ea-live-dot" />Seats Left
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SECTION — WHY (cream)
        ════════════════════════════════════════ */}
        <section id="program" className="ea-sec-alt">
          <div className="ea-wrap">
            <R>
              <div className="ea-eyebrow"><div className="ea-eyebrow-dot" />Why Only 60 Seats</div>
              <div className="ea-ttl">We keep the cohort small on purpose.</div>
              <div className="ea-desc">So every intern gets real attention, real work, and real growth.</div>
            </R>
            <div className="ea-why-grid">
              {WHY_CARDS.map((c, i) => (
                <R key={c.title} d={i * 80}>
                  <div className="ea-why-card">
                    <div className="ea-why-num">{c.n}</div>
                    <div className="ea-why-icon">{c.icon}</div>
                    <div className="ea-why-title">{c.title}</div>
                    <div className="ea-why-body">{c.body}</div>
                  </div>
                </R>
              ))}
            </div>

            {/* ── Live Seats card ── */}
            <R d={240}>
              <SeatsCard seats={seats} seatsAnim={seatsAnim} onApply={scrollToForm} />
            </R>

          </div>
        </section>

        {/* ════════════════════════════════════════
            SECTION — FORM (white)
        ════════════════════════════════════════ */}
        <section className="ea-sec" ref={formRef}>
          <div className="ea-wrap">
            <R>
              <div style={{ textAlign:"center" }}>
                <div className="ea-eyebrow" style={{ justifyContent:"center" }}>
                  <div className="ea-eyebrow-dot" />Apply Now
                </div>
                <div className="ea-ttl">Early Application Form</div>
                <div className="ea-desc" style={{ margin:"0 auto", textAlign:"center" }}>Takes under 2 minutes. Fill in your details and we'll be in touch.</div>
              </div>
            </R>
            <R d={80}>
              <div className="ea-form-outer" style={{ marginTop: 40 }}>
                <div className="ea-form-card">

                  <div className="ea-form-top">
                    <div className="ea-ft-tag">
                      <div className="ea-ft-dot" />
                      Now Accepting Early Applications
                    </div>
                    <h3>Summer Training 2026</h3>
                    <p>Fill in your details — shortlisting happens on a rolling basis.</p>
                  </div>

                  <form className="ea-form-body" onSubmit={submit}>

                    <div className="ea-fdiv">Personal Details</div>
                    <div className="ea-grid2">
                      <div className="ea-field">
                        <label className="ea-label">Full Name *</label>
                        <input className={`ea-input${errors.name?" err":""}`} placeholder="Rahul Sharma" value={form.name} onChange={set("name")} />
                        {errors.name && <span className="ea-err">{errors.name}</span>}
                      </div>
                      <div className="ea-field">
                        <label className="ea-label">Email Address *</label>
                        <input className={`ea-input${errors.email?" err":""}`} type="email" placeholder="rahul@college.edu" value={form.email} onChange={set("email")} />
                        {errors.email && <span className="ea-err">{errors.email}</span>}
                      </div>
                    </div>
                    <div className="ea-field">
                      <label className="ea-label">Phone Number *</label>
                      <input className={`ea-input${errors.phone?" err":""}`} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
                      {errors.phone && <span className="ea-err">{errors.phone}</span>}
                    </div>

                    <div className="ea-fdiv">Education</div>
                    <div className="ea-field">
                      <label className="ea-label">College / University *</label>
                      <input className={`ea-input${errors.college?" err":""}`} placeholder="IIT Delhi" value={form.college} onChange={set("college")} />
                      {errors.college && <span className="ea-err">{errors.college}</span>}
                    </div>
                    <div className="ea-grid2">
                      <div className="ea-field">
                        <label className="ea-label">Current Status *</label>
                        <select className={`ea-select${errors.status?" err":""}`} value={form.status} onChange={set("status")}>
                          <option value="">Select status</option>
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.status && <span className="ea-err">{errors.status}</span>}
                      </div>
                      <div className="ea-field">
                        <label className="ea-label">Domain of Interest *</label>
                        <select className={`ea-select${errors.domain?" err":""}`} value={form.domain} onChange={set("domain")}>
                          <option value="">Select domain</option>
                          {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {errors.domain && <span className="ea-err">{errors.domain}</span>}
                      </div>
                    </div>

                    <div className="ea-fdiv">Your Story</div>
                    <div className="ea-field">
                      <label className="ea-label">Why do you want to join Jobingen Summer Training? *</label>
                      <textarea
                        className={`ea-textarea${errors.why?" err":""}`}
                        placeholder="Tell us what excites you about AI, startups, and building real products. What do you want to learn and create this summer?"
                        value={form.why} onChange={set("why")} rows={4}
                      />
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        {errors.why ? <span className="ea-err">{errors.why}</span> : <span />}
                        <span className="ea-char">{form.why.length} / min 40</span>
                      </div>
                    </div>
                    <div className="ea-field">
                      <label className="ea-label">
                        LinkedIn / Portfolio / GitHub <span className="ea-opt">(optional)</span>
                      </label>
                      <input className="ea-input" type="url" placeholder="https://linkedin.com/in/yourname" value={form.portfolio} onChange={set("portfolio")} />
                    </div>

                    <button type="submit" className="ea-submit" disabled={loading}>
                      {loading ? <><Spinner /> Submitting...</> : <>Submit Early Application &nbsp;<ArrowRight /></>}
                    </button>

                    <p className="ea-form-note">
                      By submitting, you agree to Jobingen's <a href="#">Terms &amp; Conditions</a>.
                    </p>
                  </form>
                </div>
              </div>
            </R>
          </div>
        </section>

        {/* ════════════════════════════════════════
            DARK CTA — same as summer internship
        ════════════════════════════════════════ */}
        <section className="ea-sec-dk">
          <div className="ea-cta-glow1" />
          <div className="ea-cta-glow2" />
          <div className="ea-cta-inner">
            <R>
              <div className="ea-eyebrow ea-eyebrow-w" style={{ justifyContent:"center" }}>
                <div className="ea-eyebrow-dot ea-eyebrow-dot-w" />
                Ready to Apply
              </div>
              <div className="ea-ttl-w">Ready to Build With Jobingen?</div>
              <div className="ea-desc-w" style={{ margin:"0 auto 28px" }}>
                60 seats. June 2026. AI-first. Remote.
              </div>
              <button className="ea-btn-p" style={{ background:"white", color:"var(--ind)", boxShadow:"0 4px 20px rgba(0,0,0,.25)" }} onClick={scrollToForm}>
                Apply Early &nbsp;<ArrowRight />
              </button>
            </R>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
