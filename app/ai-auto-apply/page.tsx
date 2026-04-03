"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import { JobingenLogo } from "@/components/jobingen-logo"

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

  :root {
    --blue:#384FFB; --blue-h:#2d40d9; --blue-l:#eef0ff; --blue-ll:#f6f7ff;
    --navy:#001751; --ink:#0a0a1a; --ink2:#444466; --ink3:#8888aa;
    --white:#ffffff; --bg:#fafaff;
    --border:rgba(0,0,0,.06); --border2:rgba(56,79,251,.12);
    --grn:#22c55e; --grn-l:#f0fdf4; --amb:#f59e0b; --amb-l:#fffbeb;
    --sh:0 1px 3px rgba(0,0,0,.04),0 4px 20px rgba(0,0,0,.04);
    --sh-h:0 4px 30px rgba(56,79,251,.12);
    --sh-btn:0 6px 24px rgba(56,79,251,.3);
  }
  @keyframes fade-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin-s{to{transform:rotate(360deg)}}
  @keyframes pulse-d{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.3);opacity:1}}
  @keyframes stripe{0%{background-position:0 0}100%{background-position:40px 0}}
  @keyframes float-y{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

  .page{
    font-family:'Poppins',-apple-system,BlinkMacSystemFont,sans-serif;
    min-height:100vh; background:var(--bg); color:var(--ink);
  }

  /* ═══ NAV ═══ */
  .nav{
    position:sticky; top:0; z-index:50; background:rgba(255,255,255,.85);
    backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
    border-bottom:1px solid var(--border);
  }
  .nav-in{
    max-width:1100px; margin:0 auto; padding:0 24px;
    height:60px; display:flex; align-items:center; gap:16px;
  }
  .nav-sep{width:1px;height:22px;background:var(--border)}
  .nav-tag{
    font-size:12px;font-weight:700;color:var(--blue);
    background:var(--blue-l);padding:5px 14px;border-radius:99px;
  }
  .nav-r{margin-left:auto}
  .nav-back{
    font-size:13px;font-weight:600;color:var(--ink2);text-decoration:none;
    display:inline-flex;align-items:center;gap:6px;
    padding:7px 16px;border-radius:10px;border:1.5px solid var(--border);
    background:var(--white);transition:all .2s;
  }
  .nav-back:hover{border-color:var(--blue);color:var(--blue);background:var(--blue-ll)}

  /* ═══ HERO ═══ */
  .hero{
    max-width:1100px;margin:0 auto;padding:40px 24px 0;
    text-align:center;
  }
  .hero-pill{
    display:inline-flex;align-items:center;gap:7px;
    background:var(--blue-l);border:1.5px solid var(--border2);
    padding:6px 18px;border-radius:99px;
    font-size:11px;font-weight:700;color:var(--blue);
    text-transform:uppercase;letter-spacing:.06em;margin-bottom:16px;
  }
  .hero h1{
    font-size:clamp(28px,5vw,42px);font-weight:900;letter-spacing:-.04em;
    line-height:1.1;color:var(--ink);margin:0 0 12px;
  }
  .hero h1 span{
    background:linear-gradient(135deg,var(--blue),#6c63ff);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;
  }
  .hero p{
    font-size:15px;color:var(--ink3);font-weight:500;
    line-height:1.7;max-width:500px;margin:0 auto 28px;
  }

  /* stepper (horizontal) */
  .stepper{
    display:flex;align-items:center;justify-content:center;
    gap:0;margin-bottom:36px;
  }
  .st-item{display:flex;align-items:center;gap:8px}
  .st-line{width:40px;height:2px;border-radius:2px;background:var(--border);margin:0 4px;position:relative;overflow:hidden}
  .st-line-fill{position:absolute;inset:0;background:var(--blue);border-radius:2px;transform-origin:left;transition:transform .5s ease}
  .st-dot{
    width:32px;height:32px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:12px;font-weight:800;transition:all .3s ease;
    flex-shrink:0;
  }
  .st-dot.future{background:var(--white);color:var(--ink3);border:2px solid var(--border)}
  .st-dot.active{background:var(--blue);color:white;border:none;box-shadow:var(--sh-btn)}
  .st-dot.done{background:var(--grn);color:white;border:none;cursor:pointer}
  .st-dot.done:hover{transform:scale(1.1)}
  .st-lbl{font-size:12px;font-weight:700}
  .st-lbl.future{color:var(--ink3);opacity:.4}
  .st-lbl.active{color:var(--blue)}
  .st-lbl.done{color:var(--grn);cursor:pointer}
  @media(max-width:640px){.st-lbl{display:none}.st-line{width:24px}}

  /* ═══ CONTENT ═══ */
  .content{
    max-width:1100px;margin:0 auto;padding:0 24px 60px;
    animation:fade-in .4s ease both;
  }

  /* ═══ UPLOAD ═══ */
  .up-wrap{max-width:480px;margin:0 auto}
  .up{
    background:var(--white);border-radius:24px;border:2.5px dashed var(--border2);
    padding:48px 36px;text-align:center;cursor:pointer;
    transition:all .3s ease;box-shadow:var(--sh);
  }
  .up:hover,.up.drag{border-color:var(--blue);background:var(--blue-ll)}
  .up-ico{
    width:68px;height:68px;border-radius:20px;
    background:var(--blue-l);
    display:flex;align-items:center;justify-content:center;
    margin:0 auto 18px;animation:float-y 3s ease-in-out infinite;
  }
  .up h3{font-size:20px;font-weight:800;color:var(--ink);margin-bottom:5px}
  .up p{font-size:14px;color:var(--ink3);font-weight:500;margin-bottom:20px}
  .up-btn{
    display:inline-flex;align-items:center;gap:7px;
    background:var(--blue);color:white;font-family:inherit;
    font-size:14px;font-weight:700;padding:12px 28px;
    border-radius:12px;border:none;cursor:pointer;
    box-shadow:var(--sh-btn);transition:all .2s ease;
  }
  .up-btn:hover{transform:translateY(-1px);box-shadow:0 10px 36px rgba(56,79,251,.4)}
  .up-tags{display:flex;gap:6px;justify-content:center;margin-top:14px}
  .up-tag{font-size:10px;font-weight:700;color:var(--ink3);background:var(--bg);padding:3px 10px;border-radius:6px;border:1px solid var(--border)}

  /* file */
  .fl{
    background:var(--white);border:2px solid var(--border2);border-radius:16px;
    padding:14px 18px;display:flex;align-items:center;gap:14px;
    margin-bottom:16px;box-shadow:var(--sh);
  }
  .fl-ico{
    width:44px;height:44px;border-radius:12px;
    background:linear-gradient(135deg,var(--blue),#6c63ff);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;
  }
  .fl-name{font-size:14px;font-weight:700;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .fl-size{font-size:12px;color:var(--ink3)}
  .fl-rm{
    width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;
    border:none;background:transparent;cursor:pointer;color:var(--ink3);transition:all .15s;margin-left:auto;flex-shrink:0;
  }
  .fl-rm:hover{background:#ffe5e5;color:#e53935}

  /* cta */
  .cta{
    display:flex;align-items:center;justify-content:center;gap:8px;
    width:100%;font-family:inherit;
    background:var(--blue);color:white;font-size:15px;font-weight:700;
    padding:15px 28px;border-radius:14px;border:none;cursor:pointer;
    box-shadow:var(--sh-btn);transition:all .2s ease;
  }
  .cta:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(56,79,251,.4)}
  .cta:disabled{opacity:.55;cursor:not-allowed;transform:none;box-shadow:none}

  /* ═══ ANALYSIS ═══ */
  .an{max-width:560px;margin:0 auto}
  .an-card{background:var(--white);border-radius:24px;border:1.5px solid var(--border);box-shadow:var(--sh);overflow:hidden}
  .an-bar{height:4px;background:linear-gradient(90deg,var(--blue),#6c63ff,var(--grn))}
  .an-head{padding:20px 24px;display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--border)}
  .an-ico{width:44px;height:44px;border-radius:14px;background:var(--blue-l);display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .an-t{font-size:17px;font-weight:800;color:var(--ink)}
  .an-s{font-size:12px;color:var(--grn);font-weight:600;display:flex;align-items:center;gap:4px}
  .an-grid{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--border)}
  .an-cell{padding:18px 24px}
  .an-cell:nth-child(odd){border-right:1px solid var(--border)}
  .an-cell:nth-child(-n+2){border-bottom:1px solid var(--border)}
  .an-lbl{font-size:10px;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}
  .an-val{font-size:15px;font-weight:700;color:var(--ink)}
  .an-skills{display:flex;flex-wrap:wrap;gap:5px}
  .an-skill{font-size:11px;font-weight:700;color:var(--blue);background:var(--blue-l);padding:4px 10px;border-radius:8px}
  .an-prefs{padding:20px 24px}
  .an-prefs-t{font-size:14px;font-weight:800;color:var(--ink);margin-bottom:14px}
  .an-prefs-g{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:18px}
  .an-prefs-l{font-size:11px;font-weight:600;color:var(--ink3);margin-bottom:5px}
  .an-inp{
    width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--border);
    background:var(--bg);font-size:13px;font-weight:600;color:var(--ink);
    outline:none;transition:all .2s;font-family:inherit;
  }
  .an-inp:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(56,79,251,.06)}
  .mode-g{display:flex;border-radius:12px;overflow:hidden;border:1.5px solid var(--border)}
  .mode-b{flex:1;padding:11px 0;font-size:12px;font-weight:700;border:none;cursor:pointer;transition:all .2s;text-transform:capitalize;font-family:inherit}
  .mode-b.off{background:var(--bg);color:var(--ink3)} .mode-b.off:hover{background:var(--blue-ll)}
  .mode-b.on{background:var(--blue);color:white}
  @media(max-width:600px){
    .an-grid{grid-template-columns:1fr}.an-cell:nth-child(odd){border-right:none}
    .an-cell{border-bottom:1px solid var(--border)}.an-cell:last-child{border-bottom:none}
    .an-prefs-g{grid-template-columns:1fr}
  }

  /* ═══ JOBS ═══ */
  .jo-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
  .jo-h{font-size:20px;font-weight:800;color:var(--ink);letter-spacing:-.02em}
  .jo-cnt{font-size:11px;font-weight:800;color:var(--blue);background:var(--blue-l);padding:4px 12px;border-radius:99px;margin-left:8px}
  .jo-sort{font-size:12px;color:var(--ink3);font-weight:600}
  .jo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px}
  @media(max-width:900px){.jo-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:600px){.jo-grid{grid-template-columns:1fr}}
  .jc{
    background:var(--white);border-radius:18px;border:1.5px solid var(--border);
    padding:16px;box-shadow:var(--sh);transition:all .25s;animation:fade-in .35s ease both;
  }
  .jc:hover{transform:translateY(-3px);box-shadow:var(--sh-h);border-color:var(--border2)}
  .jc-top{display:flex;align-items:flex-start;gap:12px;margin-bottom:10px}
  .jc-logo{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:900;color:white;flex-shrink:0}
  .jc-role{font-size:14px;font-weight:800;color:var(--ink);line-height:1.25}
  .jc-co{font-size:11px;font-weight:600;color:var(--ink3)}
  .jc-sc{margin-left:auto;flex-shrink:0;width:42px;height:42px;position:relative}
  .jc-sc-t{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900}
  .jc-meta{display:flex;gap:6px}
  .jc-tag{font-size:10px;font-weight:700;padding:3px 8px;border-radius:7px;display:inline-flex;align-items:center;gap:3px}
  .jc-tag.loc{background:var(--bg);color:var(--ink3);border:1px solid var(--border)}
  .jc-tag.sal{background:var(--grn-l);color:#059669;border:1px solid rgba(34,197,94,.15)}

  /* slider */
  .sl{max-width:480px;margin:0 auto;background:var(--white);border-radius:22px;border:1.5px solid var(--border);box-shadow:var(--sh);overflow:hidden}
  .sl-bar{height:4px;background:linear-gradient(90deg,var(--blue),#6c63ff)}
  .sl-body{padding:24px}
  .sl-head{display:flex;align-items:center;gap:12px;margin-bottom:20px}
  .sl-ico{width:42px;height:42px;border-radius:12px;background:var(--amb-l);display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .sl-t{font-size:16px;font-weight:800;color:var(--ink)}
  .sl-s{font-size:12px;color:var(--ink3)}
  .sl-disp{background:var(--blue-ll);border:1.5px solid var(--border2);border-radius:16px;padding:14px 20px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between}
  .sl-num{font-size:34px;font-weight:900;color:var(--blue);letter-spacing:-.04em;line-height:1}
  .sl-unit{font-size:13px;color:var(--ink3);font-weight:600;margin-left:4px}
  .aa-range{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:99px;background:var(--blue-l);outline:none;margin-bottom:8px}
  .aa-range::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:var(--blue);border:3px solid white;box-shadow:0 2px 10px rgba(56,79,251,.35);cursor:pointer;transition:transform .15s ease}
  .aa-range::-webkit-slider-thumb:hover{transform:scale(1.15)}
  .aa-range::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:var(--blue);border:3px solid white;box-shadow:0 2px 10px rgba(56,79,251,.35);cursor:pointer}
  .rl{display:flex;justify-content:space-between;margin-bottom:18px}
  .rl-i{font-size:11px;font-weight:700;color:var(--ink3);padding:3px 8px;border-radius:6px;cursor:pointer;transition:all .15s}
  .rl-i:hover{color:var(--blue)} .rl-i.on{color:var(--blue);background:var(--blue-l)}
  .sl-hint{font-size:11px;color:var(--ink3);text-align:center;margin-top:12px}

  /* ═══ PROGRESS ═══ */
  .pg{max-width:480px;margin:0 auto}
  .pg-card{background:var(--white);border-radius:24px;border:1.5px solid var(--border);box-shadow:var(--sh);overflow:hidden}
  .pg-bar{height:5px;background:var(--blue-l);overflow:hidden}
  .pg-bar-fill{height:100%;background:linear-gradient(90deg,var(--blue),#6c63ff);transition:width .3s;position:relative}
  .pg-bar-fill::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(-45deg,transparent,transparent 8px,rgba(255,255,255,.2) 8px,rgba(255,255,255,.2) 16px);animation:stripe .6s linear infinite}
  .pg-body{padding:24px}
  .pg-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}
  .pg-left{display:flex;align-items:center;gap:14px}
  .pg-ico{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .pg-t{font-size:17px;font-weight:800;color:var(--ink)}
  .pg-s{font-size:12px;color:var(--ink3)}
  .pg-ctr{background:var(--blue-l);border:1.5px solid var(--border2);border-radius:14px;padding:10px 18px;text-align:center}
  .pg-ctr-n{font-size:22px;font-weight:900;color:var(--blue);line-height:1}
  .pg-ctr-l{font-size:10px;color:var(--ink3);font-weight:600}
  .tl{display:flex;flex-direction:column}
  .tl-row{display:flex;align-items:flex-start;gap:14px}
  .tl-track{display:flex;flex-direction:column;align-items:center;flex-shrink:0}
  .tl-dot{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .3s ease}
  .tl-dot.pend{background:var(--bg);color:var(--ink3);border:2px solid var(--border)}
  .tl-dot.act{background:var(--blue-l);color:var(--blue);border:2px solid var(--border2)}
  .tl-dot.ok{background:var(--grn-l);color:var(--grn);border:2px solid rgba(34,197,94,.2)}
  .tl-line{width:2px;height:16px;background:var(--border);border-radius:2px}
  .tl-line.ok{background:rgba(34,197,94,.3)}
  .tl-txt{padding:6px 0 20px}
  .tl-l{font-size:14px;font-weight:700}
  .tl-l.pend{color:var(--ink3);opacity:.4} .tl-l.act{color:var(--ink)} .tl-l.ok{color:var(--ink3)}
  .tl-d{font-size:11px;color:var(--ink3)}

  /* ═══ DASHBOARD ═══ */
  .da{max-width:640px;margin:0 auto}
  .da-ban{background:var(--grn-l);border:2px solid rgba(34,197,94,.2);border-radius:20px;padding:20px 24px;display:flex;align-items:center;gap:16px;margin-bottom:24px}
  .da-ban-ico{width:48px;height:48px;border-radius:14px;background:rgba(34,197,94,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .da-ban-t{font-size:17px;font-weight:800;color:#065f46}
  .da-ban-s{font-size:13px;color:#047857;margin-top:2px}
  .da-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
  @media(max-width:640px){.da-grid{grid-template-columns:1fr 1fr}}
  .sc{background:var(--white);border-radius:18px;border:1.5px solid var(--border);padding:20px;box-shadow:var(--sh);transition:all .25s}
  .sc:hover{transform:translateY(-3px);box-shadow:var(--sh-h)}
  .sc-ico{width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
  .sc-n{font-size:28px;font-weight:900;color:var(--ink);letter-spacing:-.03em;line-height:1}
  .sc-l{font-size:12px;font-weight:600;color:var(--ink3);margin-top:3px}
  .da-foot{display:flex;align-items:center;justify-content:center;gap:8px}
  .da-live{width:7px;height:7px;border-radius:50%;background:var(--grn);animation:pulse-d 1.6s ease-in-out infinite}
  .da-foot span{font-size:12px;color:var(--ink3)}
  .da-rst{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--blue);background:var(--blue-l);padding:8px 16px;border-radius:10px;border:none;cursor:pointer;transition:background .15s;margin-left:14px;font-family:inherit}
  .da-rst:hover{background:#dde1ff}
`

const I={
  up:<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#384FFB" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  file:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  x:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  brain:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#384FFB" strokeWidth="2" strokeLinecap="round"><path d="M12 2a5 5 0 0 1 5 5c0 1.5-.5 3-2 4l-3 2-3-2c-1.5-1-2-2.5-2-4a5 5 0 0 1 5-5z"/><path d="M12 13v9"/><path d="M9 18h6"/></svg>,
  chk:<svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  chkL:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  srch:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  globe:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  fUp:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/></svg>,
  send:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  spin:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{animation:"spin-s .8s linear infinite"}}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>,
  zap:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  rkt:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>,
  party:<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="2" strokeLinecap="round"><path d="m5.8 11.3 2.4 2.4"/><path d="M8.2 13.7 3 19"/><path d="m14 6-1 2"/><path d="m10.2 8.2-2 1"/><path d="m20 4-2 2"/><path d="m17.5 9.5 2 2"/><path d="m14 18 2-2"/><path d="m9 13 2-2"/></svg>,
  arr:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  rst:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>,
  pin:<svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  $:<svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
}

type Step="upload"|"analysis"|"jobs"|"apply"|"dashboard"
const STEPS:{k:Step;l:string}[]=[{k:"upload",l:"Upload"},{k:"analysis",l:"Analysis"},{k:"jobs",l:"Jobs"},{k:"apply",l:"Apply"},{k:"dashboard",l:"Dashboard"}]
const AN={role:"Product Designer",exp:"2 Years",skills:["Figma","UX Research","Prototyping","Design Systems","Wireframing"],industry:"Technology"}
const GR=["linear-gradient(135deg,#384FFB,#6c63ff)","linear-gradient(135deg,#0f766e,#14b8a6)","linear-gradient(135deg,#7c3aed,#a78bfa)","linear-gradient(135deg,#b45309,#f59e0b)","linear-gradient(135deg,#be185d,#f472b6)","linear-gradient(135deg,#059669,#34d399)","linear-gradient(135deg,#dc2626,#f87171)","linear-gradient(135deg,#4338ca,#818cf8)","linear-gradient(135deg,#0369a1,#38bdf8)"]
const JOBS=[{co:"Razorpay",role:"Product Designer",loc:"Bangalore",sal:"12-18 LPA",sc:94},{co:"Swiggy",role:"Senior UX Designer",loc:"Bangalore",sal:"15-22 LPA",sc:89},{co:"CRED",role:"Product Designer",loc:"Bangalore",sal:"14-20 LPA",sc:86},{co:"Zerodha",role:"UI/UX Designer",loc:"Bangalore",sal:"10-16 LPA",sc:83},{co:"PhonePe",role:"Design Lead",loc:"Pune",sal:"18-28 LPA",sc:79},{co:"Groww",role:"Product Designer",loc:"Mumbai",sal:"12-17 LPA",sc:76},{co:"Meesho",role:"UX Designer",loc:"Bangalore",sal:"10-15 LPA",sc:74},{co:"Flipkart",role:"Sr. Product Designer",loc:"Bangalore",sal:"20-30 LPA",sc:71},{co:"Ola",role:"Product Designer",loc:"Pune",sal:"11-16 LPA",sc:68}]
const JC=[10,25,50,100]
const TLS=[{l:"Finding matching jobs",d:"Scanning platforms",i:"srch"},{l:"Opening job pages",d:"Preparing forms",i:"globe"},{l:"Uploading resume",d:"Attaching docs",i:"fUp"},{l:"Submitting applications",d:"Sending to recruiters",i:"send"}] as const
const STC=[{k:"applied" as const,l:"Applied",bg:"var(--blue-l)",c:"var(--blue)"},{k:"interviews" as const,l:"Interviews",bg:"var(--grn-l)",c:"var(--grn)"},{k:"responses" as const,l:"Responses",bg:"var(--amb-l)",c:"var(--amb)"},{k:"pending" as const,l:"Pending",bg:"var(--bg)",c:"var(--ink3)"}]

function SR({s}:{s:number}){const r=16,c=2*Math.PI*r,o=c-(s/100)*c;const col=s>=85?"#22c55e":s>=70?"#f59e0b":"#e53935";return<div className="jc-sc"><svg width="42" height="42" viewBox="0 0 42 42" style={{transform:"rotate(-90deg)"}}><circle cx="21" cy="21" r={r} fill="none" stroke="#eef0ff" strokeWidth="3"/><circle cx="21" cy="21" r={r} fill="none" stroke={col} strokeWidth="3" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={o} style={{transition:"stroke-dashoffset .6s ease"}}/></svg><span className="jc-sc-t" style={{color:col}}>{s}%</span></div>}
function Ctr({to}:{to:number}){const[n,setN]=useState(0);useEffect(()=>{if(!to)return;let f=0;const t=20,s=to/t;const id=setInterval(()=>{f++;setN(Math.round(Math.min(s*f,to)));if(f>=t)clearInterval(id)},40);return()=>clearInterval(id)},[to]);return<>{n}</>}

export default function Page(){
  const[step,setStep]=useState<Step>("upload")
  const[file,setFile]=useState<File|null>(null)
  const[drag,setDrag]=useState(false)
  const[busy,setBusy]=useState(false)
  const[loc,setLoc]=useState("Bangalore")
  const[sal,setSal]=useState("8-12 LPA")
  const[mode,setMode]=useState("hybrid")
  const[si,setSi]=useState(1)
  const[applying,setApplying]=useState(false)
  const[prog,setProg]=useState(0)
  const[tls,setTls]=useState(0)
  const[ac,setAc]=useState(25)
  const fr=useRef<HTMLInputElement>(null)
  const idx=STEPS.findIndex(s=>s.k===step)

  const onDrop=useCallback((e:React.DragEvent)=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files[0];if(f&&(f.type==="application/pdf"||f.name.endsWith(".docx")))setFile(f)},[])
  const analyze=useCallback(()=>{setBusy(true);setTimeout(()=>{setBusy(false);setStep("analysis")},1800)},[])
  useEffect(()=>{if(!applying)return;const d=8800;const p=setInterval(()=>{setProg(v=>{if(v>=100){clearInterval(p);return 100}return v+1})},d/100);const s=setInterval(()=>{setTls(v=>{if(v>=3){clearInterval(s);return 3}return v+1})},2200);return()=>{clearInterval(p);clearInterval(s)}},[applying])
  useEffect(()=>{if(prog>=100&&applying){setApplying(false);setTimeout(()=>setStep("dashboard"),600)}},[prog,applying])
  const go=()=>{const c=JC[si];setAc(c);setProg(0);setTls(0);setApplying(true);setStep("apply")}
  const reset=()=>{setStep("upload");setFile(null);setBusy(false);setApplying(false);setProg(0);setTls(0)}
  const done=prog>=100,apd=Math.round((prog/100)*ac)

  return(
    <>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>
      <div className="page">
        {/* NAV */}
        <nav className="nav"><div className="nav-in">
          <Link href="/" style={{display:"flex",alignItems:"center",textDecoration:"none"}}><JobingenLogo height={40}/></Link>
          <div className="nav-sep"/>
          <span className="nav-tag">AI Auto Apply</span>
          <div className="nav-r"><Link href="/" className="nav-back">{I.arr} Back</Link></div>
        </div></nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-pill"><span style={{width:7,height:7,borderRadius:"50%",background:"#384FFB",display:"inline-block"}}/> Beta</div>
          <h1>AI Auto Apply <span>Engine</span></h1>
          <p>Upload your resume and let AI find &amp; apply to the best matching jobs across platforms — automatically.</p>

          {/* STEPPER */}
          <div className="stepper">
            {STEPS.map((s,i)=>{const c=i<idx?"done":i===idx?"active":"future";return(
              <div key={s.k} className="st-item">
                {i>0&&<div className="st-line"><div className="st-line-fill" style={{transform:`scaleX(${i<=idx?1:0})`}}/></div>}
                <div className={`st-dot ${c}`} onClick={()=>c==="done"&&setStep(s.k)}>{c==="done"?I.chk:i+1}</div>
                <span className={`st-lbl ${c}`} onClick={()=>c==="done"&&setStep(s.k)}>{s.l}</span>
              </div>
            )})}
          </div>
        </div>

        {/* CONTENT */}
        <div className="content" key={step}>

          {step==="upload"&&(
            <div className="up-wrap">
              <div className={`up ${drag?"drag":""}`} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={onDrop} onClick={()=>!file&&fr.current?.click()}>
                <input ref={fr} type="file" accept=".pdf,.docx" hidden onChange={e=>{if(e.target.files?.[0])setFile(e.target.files[0])}}/>
                {!file?(<>
                  <div className="up-ico">{I.up}</div>
                  <h3>Drop your resume here</h3>
                  <p>or click to browse files</p>
                  <button className="up-btn" onClick={e=>{e.stopPropagation();fr.current?.click()}}>{I.up} Browse Files</button>
                  <div className="up-tags"><span className="up-tag">PDF</span><span className="up-tag">DOCX</span></div>
                </>):(<div onClick={e=>e.stopPropagation()} style={{width:"100%"}}>
                  <div className="fl"><div className="fl-ico">{I.file}</div><div style={{flex:1,minWidth:0}}><div className="fl-name">{file.name}</div><div className="fl-size">{(file.size/1024).toFixed(1)} KB</div></div><button className="fl-rm" onClick={()=>setFile(null)}>{I.x}</button></div>
                  <button className="cta" onClick={analyze} disabled={busy}>{busy?<>{I.spin} Analyzing...</>:<>{I.brain} Analyze Resume</>}</button>
                </div>)}
              </div>
            </div>
          )}

          {step==="analysis"&&(
            <div className="an"><div className="an-card">
              <div className="an-bar"/>
              <div className="an-head"><div className="an-ico">{I.brain}</div><div><div className="an-t">Resume Analysis</div><div className="an-s">{I.chk} Profile extracted</div></div></div>
              <div className="an-grid">
                <div className="an-cell"><div className="an-lbl">Role</div><div className="an-val">{AN.role}</div></div>
                <div className="an-cell"><div className="an-lbl">Experience</div><div className="an-val">{AN.exp}</div></div>
                <div className="an-cell"><div className="an-lbl">Industry</div><div className="an-val">{AN.industry}</div></div>
                <div className="an-cell"><div className="an-lbl">Skills</div><div className="an-skills">{AN.skills.map(s=><span key={s} className="an-skill">{s}</span>)}</div></div>
              </div>
              <div className="an-prefs">
                <div className="an-prefs-t">Your Preferences</div>
                <div className="an-prefs-g">
                  <div><div className="an-prefs-l">Location</div><input className="an-inp" value={loc} onChange={e=>setLoc(e.target.value)}/></div>
                  <div><div className="an-prefs-l">Salary</div><input className="an-inp" value={sal} onChange={e=>setSal(e.target.value)}/></div>
                  <div><div className="an-prefs-l">Work Mode</div><div className="mode-g">{["remote","hybrid","onsite"].map(m=><button key={m} className={`mode-b ${mode===m?"on":"off"}`} onClick={()=>setMode(m)}>{m}</button>)}</div></div>
                </div>
                <button className="cta" onClick={()=>setStep("jobs")}>{I.srch} Find Matching Jobs</button>
              </div>
            </div></div>
          )}

          {step==="jobs"&&(<>
            <div className="jo-top"><div style={{display:"flex",alignItems:"center"}}><span className="jo-h">Matching Jobs</span><span className="jo-cnt">{JOBS.length}</span></div><span className="jo-sort">By match score</span></div>
            <div className="jo-grid">
              {JOBS.map((j,i)=>(<div key={i} className="jc" style={{animationDelay:`${i*40}ms`}}>
                <div className="jc-top"><div className="jc-logo" style={{background:GR[i%GR.length]}}>{j.co[0]}</div><div style={{flex:1,minWidth:0}}><div className="jc-role">{j.role}</div><div className="jc-co">{j.co}</div></div><SR s={j.sc}/></div>
                <div className="jc-meta"><span className="jc-tag loc">{I.pin} {j.loc}</span><span className="jc-tag sal">{I.$} {j.sal}</span></div>
              </div>))}
            </div>
            <div className="sl"><div className="sl-bar"/><div className="sl-body">
              <div className="sl-head"><div className="sl-ico">{I.zap}</div><div><div className="sl-t">Auto Apply</div><div className="sl-s">Select how many jobs</div></div></div>
              <div className="sl-disp"><span style={{fontSize:12,color:"var(--ink3)",fontWeight:600}}>Applications</span><div><span className="sl-num">{JC[si]}</span><span className="sl-unit">jobs</span></div></div>
              <input type="range" className="aa-range" min={0} max={3} step={1} value={si} onChange={e=>setSi(+e.target.value)}/>
              <div className="rl">{JC.map((c,i)=><span key={c} className={`rl-i ${i===si?"on":""}`} onClick={()=>setSi(i)}>{c}</span>)}</div>
              <button className="cta" onClick={go}>{I.rkt} Start Auto Apply</button>
              <div className="sl-hint">AI applies to top {JC[si]} matching jobs</div>
            </div></div>
          </>)}

          {step==="apply"&&(
            <div className="pg"><div className="pg-card">
              <div className="pg-bar"><div className="pg-bar-fill" style={{width:`${prog}%`}}/></div>
              <div className="pg-body">
                <div className="pg-head">
                  <div className="pg-left"><div className="pg-ico" style={{background:done?"var(--grn-l)":"var(--blue-l)"}}>{done?<span style={{color:"var(--grn)"}}>{I.chkL}</span>:<span style={{color:"var(--blue)"}}>{I.spin}</span>}</div><div><div className="pg-t">{done?"All Sent!":"Applying..."}</div><div className="pg-s">{done?"Done":"AI is working"}</div></div></div>
                  <div className="pg-ctr"><div className="pg-ctr-n">{apd}<span style={{fontSize:12,color:"var(--ink3)",fontWeight:600}}>/{ac}</span></div><div className="pg-ctr-l">Applied</div></div>
                </div>
                <div className="tl">{TLS.map((s,i)=>{const a=i===tls&&!done,d=i<tls||done,cl=d?"ok":a?"act":"pend";return(
                  <div key={s.l} className="tl-row"><div className="tl-track"><div className={`tl-dot ${cl}`}>{d?<span style={{color:"var(--grn)"}}>{I.chk}</span>:a?<span style={{color:"var(--blue)"}}>{I.spin}</span>:I[s.i as keyof typeof I]}</div>{i<TLS.length-1&&<div className={`tl-line ${d?"ok":""}`}/>}</div><div className="tl-txt"><div className={`tl-l ${cl}`}>{s.l}</div><div className="tl-d">{s.d}</div></div></div>
                )})}</div>
              </div>
            </div></div>
          )}

          {step==="dashboard"&&(()=>{const st={applied:ac,interviews:Math.max(1,Math.round(ac*.06)),responses:Math.round(ac*.16),pending:Math.round(ac*.78)};return(
            <div className="da">
              <div className="da-ban"><div className="da-ban-ico">{I.party}</div><div><div className="da-ban-t">Applications Submitted!</div><div className="da-ban-s">AI applied to {st.applied} jobs. Notifications on response.</div></div></div>
              <div className="da-grid">{STC.map(({k,l,bg,c:cl})=>(<div key={k} className="sc"><div className="sc-ico" style={{background:bg}}><span style={{color:cl}}>{k==="applied"?I.send:k==="interviews"?I.globe:k==="responses"?I.srch:I.spin}</span></div><div className="sc-n"><Ctr to={st[k]}/></div><div className="sc-l">{l}</div></div>))}</div>
              <div className="da-foot"><span className="da-live"/><span>Real-time updates</span><button className="da-rst" onClick={reset}>{I.rst} Start Over</button></div>
            </div>
          )})()}
        </div>
      </div>
    </>
  )
}
