"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

type Phase = "ready" | "cutting" | "celebrate" | "reveal"

const PETALS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: (i * 2.1) % 100,
  delay: (i * 0.15) % 6,
  duration: 4 + (i % 5),
  size: 8 + (i % 10),
  color: ["#fbbf24","#fda4af","#fff","#f9a8d4","#fde68a","#bfdbfe","#c4b5fd"][i % 7],
  drift: -50 + (i % 100),
  rotate: (i * 19) % 360,
}))

const SCISSORS = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24'%3E%3Cpath fill='%231d3a8f' d='M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z'/%3E%3C/svg%3E") 4 32, crosshair`

export default function LaunchPage() {
  const [phase, setPhase] = useState<Phase>("ready")
  const [hover, setHover] = useState(false)
  const router = useRouter()

  const fireConfetti = useCallback(() => {
    const base = { colors: ["#1d3a8f","#3b52f0","#fbbf24","#f9a8d4","#34d399","#f87171","#fff"] }
    confetti({ ...base, particleCount: 200, spread: 160, startVelocity: 50, origin: { x: 0.5, y: 0.42 } })
    setTimeout(() => confetti({ ...base, particleCount: 120, spread: 90, origin: { x: 0.1, y: 0.55 } }), 200)
    setTimeout(() => confetti({ ...base, particleCount: 120, spread: 90, origin: { x: 0.9, y: 0.55 } }), 350)
    setTimeout(() => confetti({ ...base, particleCount: 80, spread: 60, angle: 90, origin: { x: 0.5, y: 0.9 } }), 600)
  }, [])

  const cut = useCallback(() => {
    if (phase !== "ready") return
    setPhase("cutting")
    setTimeout(() => {
      setPhase("celebrate")
      fireConfetti()
      setTimeout(() => {
        setPhase("reveal")
        setTimeout(() => router.push("/pre-launch"), 1800)
      }, 4200)
    }, 900)
  }, [phase, fireConfetti, router])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Enter" && phase === "ready") cut() }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [cut, phase])

  return (
    <>
      <style>{CSS}</style>
      <div className="lp">

        {/* Background */}
        <div className="lp-bg-blob lp-bg-blob--1" />
        <div className="lp-bg-blob lp-bg-blob--2" />
        <div className="lp-bg-blob lp-bg-blob--3" />
        <div className="lp-noise" />

        {/* Skip */}
        <button className="lp-skip" onClick={() => router.push("/pre-launch")}>
          Skip <svg width="12" height="12" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Petals */}
        {(phase === "celebrate" || phase === "reveal") && (
          <div className="lp-petals">
            {PETALS.map(p => (
              <div key={p.id} className="lp-petal" style={{
                left: `${p.left}%`,
                width: p.size, height: p.size * 1.4,
                background: p.color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                "--drift": `${p.drift}px`,
                "--rot": `${p.rotate}deg`,
              } as React.CSSProperties} />
            ))}
          </div>
        )}

        {/* ── READY / CUTTING ── */}
        {(phase === "ready" || phase === "cutting") && (
          <div className="lp-stage">

            {/* Top label */}
            <div className="lp-chip">
              <span className="lp-chip-dot" />
              Official Platform Launch
            </div>

            {/* Logo */}
            <div className="lp-logo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/jobingen-logo.png" alt="Jobingen" className="lp-logo" />
            </div>

            {/* ── RIBBON ── */}
            <div
              className={`lp-ribbon${hover ? " lp-ribbon--hover" : ""}${phase === "cutting" ? " lp-ribbon--cut" : ""}`}
              onClick={cut}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ cursor: SCISSORS }}
            >
              {/* Ribbon halves */}
              <div className="lp-rh lp-rh--left">
                <div className="lp-rh-inner">
                  <div className="lp-rh-silk" />
                  <div className="lp-rh-top-shine" />
                  <div className="lp-rh-bottom-shadow" />
                  <div className="lp-rh-shine-band" />
                  <div className="lp-rh-fade-right" />
                </div>
              </div>

              {/* Cut zone — floating scissors + glow line */}
              <div className="lp-cut-zone">
                <div className="lp-cut-guide" />
                <svg className="lp-scissors-float" width="34" height="34" viewBox="0 0 24 24" fill="#1d3a8f">
                  <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"/>
                </svg>
              </div>

              <div className="lp-rh lp-rh--right">
                <div className="lp-rh-inner">
                  <div className="lp-rh-silk" />
                  <div className="lp-rh-top-shine" />
                  <div className="lp-rh-bottom-shadow" />
                  <div className="lp-rh-shine-band" />
                  <div className="lp-rh-fade-left" />
                </div>
              </div>
            </div>

            {phase === "ready" && <div className="lp-idle-pulse" />}

            {phase === "cutting" && (
              <div className="lp-launching">
                <div className="lp-launch-spinner" />
              </div>
            )}
          </div>
        )}

        {/* ── CELEBRATE ── */}
        {phase === "celebrate" && (
          <div className="lp-celebrate">
            <div className="lp-cel-rings">
              <div className="lp-ring lp-ring--1" />
              <div className="lp-ring lp-ring--2" />
              <div className="lp-ring lp-ring--3" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jobingen-logo.png" alt="Jobingen" className="lp-cel-logo" />
            <h1 className="lp-cel-h1">We&apos;re Live.</h1>
            <p className="lp-cel-sub">Find smarter. Apply faster. Land better.</p>
            <div className="lp-cel-date">March 2026 · India</div>
          </div>
        )}

        {/* ── REVEAL ── */}
        {phase === "reveal" && (
          <div className="lp-reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jobingen-logo.png" alt="Jobingen" className="lp-rev-logo" />
          </div>
        )}

      </div>
    </>
  )
}

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lp {
    min-height: 100vh;
    background: #f4f6fb;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
  }

  /* ── BACKGROUND ── */
  .lp-bg-blob {
    position: absolute; border-radius: 50%; pointer-events: none; filter: blur(90px);
  }
  .lp-bg-blob--1 {
    width: 60vw; height: 60vw; top: -15%; left: -10%;
    background: radial-gradient(circle, rgba(42,78,207,.09) 0%, transparent 65%);
    animation: lp-b1 22s ease-in-out infinite;
  }
  .lp-bg-blob--2 {
    width: 50vw; height: 50vw; bottom: -15%; right: -8%;
    background: radial-gradient(circle, rgba(99,102,241,.07) 0%, transparent 65%);
    animation: lp-b2 28s ease-in-out infinite;
  }
  .lp-bg-blob--3 {
    width: 40vw; height: 40vw; top: 50%; left: 50%; transform: translate(-50%,-50%);
    background: radial-gradient(circle, rgba(59,130,246,.05) 0%, transparent 60%);
    animation: lp-b1 18s 3s ease-in-out infinite;
  }
  @keyframes lp-b1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(4%,6%)} }
  @keyframes lp-b2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-5%,-4%)} }

  .lp-noise {
    position: absolute; inset: 0; pointer-events: none; opacity: .025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  /* ── SKIP ── */
  .lp-skip {
    position: fixed; top: 22px; right: 24px; z-index: 200;
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,.9); border: 1px solid rgba(0,0,0,.08);
    color: #3d3d52; padding: 8px 16px; border-radius: 10px;
    font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit;
    transition: all .2s; box-shadow: 0 2px 8px rgba(0,0,0,.06);
    backdrop-filter: blur(12px);
  }
  .lp-skip:hover { background: #fff; border-color: rgba(29,58,143,.2); color: #1d3a8f; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,.1); }

  /* ── STAGE ── */
  .lp-stage {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; z-index: 10; width: 100%; padding: 32px 20px;
  }

  /* Chip */
  .lp-chip {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff; border: 1px solid rgba(29,58,143,.14);
    color: #1d3a8f; padding: 7px 18px; border-radius: 99px;
    font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
    margin-bottom: 32px; box-shadow: 0 1px 4px rgba(29,58,143,.08);
  }
  .lp-chip-dot {
    width: 7px; height: 7px; border-radius: 50%; background: #10b981;
    box-shadow: 0 0 8px rgba(16,185,129,.7); animation: lp-pulse 1.8s ease-in-out infinite;
  }
  @keyframes lp-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.7} }

  /* Logo */
  .lp-logo-wrap { margin-bottom: 44px; }
  .lp-logo { height: 96px; width: auto; filter: drop-shadow(0 4px 20px rgba(29,58,143,.15)); }

  /* ── RIBBON ── */
  .lp-ribbon {
    width: min(880px, 94vw); display: flex; align-items: center;
    position: relative; margin-bottom: 40px; user-select: none;
    filter: drop-shadow(0 12px 32px rgba(239,68,68,.18));
  }

  .lp-rh {
    flex: 1; height: 74px; position: relative;
    transition: transform 2.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 2.4s ease .15s, filter .25s;
    animation: lp-rh-breathe 5s ease-in-out infinite;
  }
  @keyframes lp-rh-breathe {
    0%,100% { filter: brightness(1) saturate(1); }
    50%     { filter: brightness(1.05) saturate(1.06); }
  }
  /* V-cut ends for realistic ribbon look */
  .lp-rh--left {
    background:
      /* satin sheen sweep */
      linear-gradient(162deg,
        rgba(255,255,255,0) 20%, rgba(255,255,255,.22) 38%, rgba(255,255,255,.32) 44%,
        rgba(255,255,255,.18) 50%, rgba(0,0,0,.06) 62%, rgba(0,0,0,0) 78%
      ),
      /* cloth body — crimson satin */
      linear-gradient(180deg,
        #fecdd3 0%, #fca5a5 4%,
        #f87171 10%, #ef4444 20%,
        #dc2626 36%, #991b1b 50%, #dc2626 64%,
        #ef4444 78%, #f87171 90%,
        #fca5a5 96%, #fecdd3 100%
      );
    clip-path: polygon(0 0, 100% 0, calc(100% - 20px) 50%, 100% 100%, 0 100%);
    border-radius: 5px 0 0 5px;
  }
  .lp-rh--right {
    background:
      linear-gradient(162deg,
        rgba(255,255,255,0) 20%, rgba(255,255,255,.22) 38%, rgba(255,255,255,.32) 44%,
        rgba(255,255,255,.18) 50%, rgba(0,0,0,.06) 62%, rgba(0,0,0,0) 78%
      ),
      linear-gradient(180deg,
        #fecdd3 0%, #fca5a5 4%,
        #f87171 10%, #ef4444 20%,
        #dc2626 36%, #991b1b 50%, #dc2626 64%,
        #ef4444 78%, #f87171 90%,
        #fca5a5 96%, #fecdd3 100%
      );
    clip-path: polygon(20px 0, 100% 0, 100% 100%, 20px 100%, 0 50%);
    border-radius: 0 5px 5px 0;
  }
  .lp-rh-inner { position: absolute; inset: 0; overflow: hidden; }
  /* Woven fabric crosshatch texture */
  .lp-rh-silk {
    position: absolute; inset: 0;
    background:
      repeating-linear-gradient(-52deg, transparent, transparent 6px, rgba(255,255,255,.04) 6px, rgba(255,255,255,.04) 7px),
      repeating-linear-gradient(52deg,  transparent, transparent 6px, rgba(0,0,0,.04) 6px, rgba(0,0,0,.04) 7px),
      repeating-linear-gradient(90deg,  transparent, transparent 18px, rgba(0,0,0,.025) 18px, rgba(0,0,0,.025) 19px);
  }
  /* Top highlight band (ribbon curves forward at top) */
  .lp-rh-top-shine {
    position: absolute; top: 0; left: 0; right: 0; height: 42%;
    background: linear-gradient(180deg,
      rgba(255,255,255,.35) 0%,
      rgba(255,255,255,.14) 40%,
      rgba(255,255,255,.02) 80%,
      transparent 100%
    );
  }
  /* Bottom shadow (ribbon curves back at bottom) */
  .lp-rh-bottom-shadow {
    position: absolute; bottom: 0; left: 0; right: 0; height: 42%;
    background: linear-gradient(0deg,
      rgba(0,0,0,.28) 0%,
      rgba(0,0,0,.10) 50%,
      transparent 100%
    );
  }
  /* Moving specular highlight — looks like light catching fabric */
  .lp-rh-shine-band {
    position: absolute; inset: 0;
    background: linear-gradient(108deg,
      transparent 28%,
      rgba(255,255,255,.07) 38%, rgba(255,255,255,.14) 43%,
      rgba(255,255,255,.07) 48%, transparent 58%
    );
    animation: lp-sheen 6s ease-in-out infinite;
  }
  @keyframes lp-sheen {
    0%   { opacity: 0.6; background-position: -100% 0; }
    50%  { opacity: 1; }
    100% { opacity: 0.6; }
  }
  .lp-rh-fade-right {
    position: absolute; top: 0; bottom: 0; right: 0; width: 90px;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,.32));
  }
  .lp-rh-fade-left {
    position: absolute; top: 0; bottom: 0; left: 0; width: 90px;
    background: linear-gradient(90deg, rgba(0,0,0,.32), transparent);
  }

  /* ── CUT ZONE ── */
  .lp-cut-zone {
    width: 48px; min-width: 48px; height: 74px;
    position: relative; z-index: 10; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    overflow: visible;
  }

  /* Glowing vertical cut line */
  .lp-cut-guide {
    position: absolute;
    width: 2px; height: calc(100% + 10px);
    background: linear-gradient(180deg,
      transparent 0%,
      rgba(255,255,255,.7) 20%,
      rgba(255,255,255,1) 50%,
      rgba(255,255,255,.7) 80%,
      transparent 100%
    );
    box-shadow: 0 0 8px rgba(255,255,255,.6), 0 0 20px rgba(239,68,68,.25);
    border-radius: 2px;
    animation: lp-guide-pulse 2s ease-in-out infinite;
  }
  @keyframes lp-guide-pulse {
    0%,100% { opacity: .7; box-shadow: 0 0 8px rgba(255,255,255,.5), 0 0 18px rgba(239,68,68,.2); }
    50%     { opacity: 1;  box-shadow: 0 0 14px rgba(255,255,255,.9), 0 0 32px rgba(239,68,68,.4); }
  }

  /* Floating scissors above ribbon */
  .lp-scissors-float {
    position: absolute;
    top: -52px;
    filter: drop-shadow(0 3px 10px rgba(29,58,143,.25));
    transform: rotate(-20deg);
    animation: lp-scissors-bob 1.8s ease-in-out infinite;
    transition: top .3s ease, transform .3s ease;
  }
  @keyframes lp-scissors-bob {
    0%,100% { top: -52px; }
    50%     { top: -42px; }
  }

  /* Hover — scissors move closer */
  .lp-ribbon--hover .lp-rh { filter: brightness(1.08) saturate(1.12); animation: none; }
  .lp-ribbon--hover .lp-scissors-float {
    animation: none;
    top: -28px;
    filter: drop-shadow(0 4px 14px rgba(29,58,143,.4));
  }
  .lp-ribbon--hover .lp-cut-guide {
    opacity: 1;
    box-shadow: 0 0 18px rgba(255,255,255,1), 0 0 40px rgba(239,68,68,.55);
  }

  /* Cut — scissors slash down, ribbon falls */
  .lp-ribbon--cut .lp-rh {
    transition: transform 2.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 2.3s ease .15s, filter .25s;
    animation: none;
  }
  .lp-ribbon--cut .lp-rh--left {
    transform: translateX(calc(-50vw - 80px)) rotate(-18deg) translateY(90px);
    opacity: 0;
  }
  .lp-ribbon--cut .lp-rh--right {
    transform: translateX(calc(50vw + 80px)) rotate(18deg) translateY(90px);
    opacity: 0;
  }
  .lp-ribbon--cut .lp-scissors-float {
    animation: lp-scissors-cut .55s cubic-bezier(.4,0,.2,1) forwards;
  }
  @keyframes lp-scissors-cut {
    0%   { top: -28px; opacity: 1; transform: rotate(-20deg); }
    35%  { top: 60px;  opacity: 1; transform: rotate(-20deg) scale(1.1); }
    100% { top: 120px; opacity: 0; transform: rotate(-20deg) scale(.8); }
  }
  .lp-ribbon--cut .lp-cut-guide {
    animation: lp-guide-vanish .4s ease forwards;
  }
  @keyframes lp-guide-vanish {
    to { opacity: 0; transform: scaleY(0); }
  }

  /* Idle pulse — subtle tap hint below ribbon */
  .lp-idle-pulse {
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(29,58,143,.25);
    margin-top: 4px;
    animation: lp-idle 2.4s ease-in-out infinite;
  }
  @keyframes lp-idle {
    0%,100% { transform: scale(1); opacity: .4; }
    50%      { transform: scale(1.8); opacity: .9; }
  }

  /* Launching */
  .lp-launching {
    display: flex; align-items: center; justify-content: center;
    margin-top: 4px;
  }
  .lp-launch-spinner {
    width: 20px; height: 20px; border-radius: 50%;
    border: 2.5px solid rgba(29,58,143,.15); border-top-color: #1d3a8f;
    animation: lp-spin .8s linear infinite;
  }
  @keyframes lp-spin { to { transform: rotate(360deg); } }

  /* ── PETALS ── */
  .lp-petals { position: fixed; inset: 0; pointer-events: none; z-index: 50; overflow: hidden; }
  .lp-petal {
    position: absolute; top: -20px; border-radius: 50% 0 50% 0; opacity: .85;
    animation: lp-petal-fall linear both;
  }
  @keyframes lp-petal-fall {
    0%   { transform: translateY(-20px) translateX(0) rotate(0); opacity: .85; }
    85%  { opacity: .7; }
    100% { transform: translateY(108vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
  }

  /* ── CELEBRATE ── */
  .lp-celebrate {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; z-index: 10; padding: 24px 20px;
    animation: lp-cel-in .85s cubic-bezier(.16,1,.3,1) both;
    position: relative;
  }
  @keyframes lp-cel-in {
    from { opacity: 0; transform: scale(.8) translateY(32px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* Rings */
  .lp-cel-rings { position: absolute; top: 50%; left: 50%; pointer-events: none; }
  .lp-ring {
    position: absolute; border-radius: 50%;
    border: 1.5px solid rgba(29,58,143,.15);
    transform: translate(-50%,-50%);
    animation: lp-ring-out 3s ease-out infinite;
  }
  .lp-ring--1 { width: 240px; height: 240px; animation-delay: 0s; }
  .lp-ring--2 { width: 380px; height: 380px; animation-delay: .5s; border-color: rgba(29,58,143,.09); }
  .lp-ring--3 { width: 520px; height: 520px; animation-delay: 1s; border-color: rgba(29,58,143,.05); }
  @keyframes lp-ring-out {
    0%  { transform: translate(-50%,-50%) scale(.4); opacity: .8; }
    100%{ transform: translate(-50%,-50%) scale(1.4); opacity: 0; }
  }

  .lp-cel-logo {
    height: 88px; width: auto; position: relative; z-index: 2; margin-bottom: 22px;
    animation: lp-float 3s ease-in-out infinite;
    filter: drop-shadow(0 8px 24px rgba(29,58,143,.2));
  }
  @keyframes lp-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

  .lp-cel-h1 {
    font-size: clamp(34px, 5.5vw, 62px); font-weight: 900;
    letter-spacing: -.04em; line-height: 1.05;
    color: #09090f; margin-bottom: 12px; position: relative; z-index: 2;
  }
  .lp-cel-sub {
    font-size: 16px; color: #8a8aa8; font-weight: 500;
    position: relative; z-index: 2; margin-bottom: 36px;
  }

  .lp-cel-date {
    font-size: 13px; font-weight: 600; color: #94a3b8;
    letter-spacing: .08em; text-transform: uppercase;
    position: relative; z-index: 2;
    animation: lp-stats-in .5s .3s ease both;
  }
  @keyframes lp-stats-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

  /* ── REVEAL ── */
  .lp-reveal {
    position: fixed; inset: 0; background: #f4f6fb;
    display: flex; align-items: center; justify-content: center;
    z-index: 100; animation: lp-reveal 1.8s ease forwards;
  }
  @keyframes lp-reveal { 0%{opacity:1} 55%{opacity:1} 100%{opacity:0} }
  .lp-rev-logo {
    height: 80px; width: auto;
    animation: lp-rev-logo 1.8s ease;
    filter: drop-shadow(0 4px 20px rgba(29,58,143,.2));
  }
  @keyframes lp-rev-logo {
    0%  { opacity:0; transform:scale(.85); }
    30% { opacity:1; transform:scale(1.04); }
    70% { opacity:1; transform:scale(1); }
    100%{ opacity:0; transform:scale(1.08); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    .lp-rh { height: 54px; }
    .lp-cut-zone { height: 54px; width: 36px; min-width: 36px; }
    .lp-scissors-float { width: 26px; height: 26px; }
    .lp-cel-h1 { font-size: 36px; }
  }
`
