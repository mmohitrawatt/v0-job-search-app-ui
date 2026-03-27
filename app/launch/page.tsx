"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

type Phase = "ready" | "cutting" | "celebrate" | "reveal"

const PETALS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: (i * 1.7) % 100,
  delay: (i * 0.12) % 7,
  duration: 5 + (i % 6),
  size: 7 + (i % 12),
  color: ["#fbbf24","#fda4af","#fff","#f9a8d4","#fde68a","#bfdbfe","#c4b5fd","#86efac"][i % 8],
  drift: -60 + (i % 120),
  rotate: (i * 23) % 360,
  type: i % 3, // 0: petal, 1: circle, 2: rectangle
}))

export default function LaunchPage() {
  const [phase, setPhase] = useState<Phase>("ready")
  const [hover, setHover] = useState(false)
  const router = useRouter()

  const fireConfetti = useCallback(() => {
    const base = { colors: ["#1d3a8f","#3b52f0","#fbbf24","#f9a8d4","#34d399","#f87171","#fff","#60a5fa"] }
    confetti({ ...base, particleCount: 220, spread: 170, startVelocity: 55, origin: { x: 0.5, y: 0.4 } })
    setTimeout(() => confetti({ ...base, particleCount: 130, spread: 100, origin: { x: 0.1, y: 0.5 } }), 180)
    setTimeout(() => confetti({ ...base, particleCount: 130, spread: 100, origin: { x: 0.9, y: 0.5 } }), 320)
    setTimeout(() => confetti({ ...base, particleCount: 90, spread: 60, angle: 90, origin: { x: 0.5, y: 0.95 } }), 650)
    setTimeout(() => confetti({ ...base, particleCount: 60, spread: 80, origin: { x: 0.3, y: 0.6 } }), 1000)
    setTimeout(() => confetti({ ...base, particleCount: 60, spread: 80, origin: { x: 0.7, y: 0.6 } }), 1200)
  }, [])

  const cut = useCallback(() => {
    if (phase !== "ready") return
    setPhase("cutting")
    setTimeout(() => {
      setPhase("celebrate")
      fireConfetti()
      setTimeout(() => {
        setPhase("reveal")
        setTimeout(() => router.push("/pre-launch"), 2000)
      }, 4500)
    }, 1200)
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
              <div key={p.id} className={`lp-petal lp-petal--${p.type}`} style={{
                left: `${p.left}%`,
                width: p.size, height: p.type === 1 ? p.size : p.size * 1.5,
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

            {/* Logo */}
            <div className="lp-logo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/jobingen-logo.png" alt="Jobingen" className="lp-logo" />
              <div className="lp-logo-date">Launch Day · March 2026</div>
            </div>

            {/* ── RIBBON ── */}
            <div
              className={`lp-ribbon${hover ? " lp-ribbon--hover" : ""}${phase === "cutting" ? " lp-ribbon--cut" : ""}`}
              onClick={cut}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {/* Gold post — left */}
              <div className="lp-post lp-post--left" />

              {/* Left ribbon half */}
              <div className="lp-rh lp-rh--left">
                <div className="lp-rh-inner">
                  <div className="lp-rh-silk" />
                  <div className="lp-rh-top-shine" />
                  <div className="lp-rh-bottom-shadow" />
                  <div className="lp-rh-shine-band" />
                  <div className="lp-rh-hem-top" />
                  <div className="lp-rh-hem-bottom" />
                  <div className="lp-rh-fade-right" />
                </div>
              </div>

              {/* Cut zone */}
              <div className="lp-cut-zone">
                <div className="lp-cut-guide" />
                <svg className="lp-scissors-float" width="42" height="42" viewBox="0 0 24 24" fill="#1d3a8f">
                  <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"/>
                </svg>
              </div>

              {/* Right ribbon half */}
              <div className="lp-rh lp-rh--right">
                <div className="lp-rh-inner">
                  <div className="lp-rh-silk" />
                  <div className="lp-rh-top-shine" />
                  <div className="lp-rh-bottom-shadow" />
                  <div className="lp-rh-shine-band" />
                  <div className="lp-rh-hem-top" />
                  <div className="lp-rh-hem-bottom" />
                  <div className="lp-rh-fade-left" />
                </div>
              </div>

              {/* Gold post — right */}
              <div className="lp-post lp-post--right" />
            </div>

            {phase === "ready" && (
              <div className="lp-hint">
                <div className="lp-hint-dot" />
                <div className="lp-hint-dot" style={{ animationDelay: ".3s" }} />
                <div className="lp-hint-dot" style={{ animationDelay: ".6s" }} />
              </div>
            )}

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
            <div className="lp-cel-badge">
              <span className="lp-cel-badge-dot" />
              Jobingen is now open for everyone
            </div>
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
    background: #f0f4ff;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
    cursor: default;
  }

  /* ── BACKGROUND ── */
  .lp-bg-blob {
    position: absolute; border-radius: 50%; pointer-events: none; filter: blur(100px);
  }
  .lp-bg-blob--1 {
    width: 70vw; height: 70vw; top: -20%; left: -15%;
    background: radial-gradient(circle, rgba(59,82,240,.07) 0%, transparent 65%);
    animation: lp-b1 24s ease-in-out infinite;
  }
  .lp-bg-blob--2 {
    width: 55vw; height: 55vw; bottom: -20%; right: -12%;
    background: radial-gradient(circle, rgba(99,102,241,.06) 0%, transparent 65%);
    animation: lp-b2 30s ease-in-out infinite;
  }
  .lp-bg-blob--3 {
    width: 45vw; height: 45vw; top: 50%; left: 50%; transform: translate(-50%,-50%);
    background: radial-gradient(circle, rgba(248,113,113,.04) 0%, transparent 60%);
    animation: lp-b1 20s 4s ease-in-out infinite;
  }
  @keyframes lp-b1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(3%,5%)} }
  @keyframes lp-b2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-4%,-3%)} }

  .lp-noise {
    position: absolute; inset: 0; pointer-events: none; opacity: .02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  /* ── SKIP ── */
  .lp-skip {
    position: fixed; top: 22px; right: 24px; z-index: 200;
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,.88); border: 1px solid rgba(0,0,0,.07);
    color: #64748b; padding: 8px 16px; border-radius: 10px;
    font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit;
    transition: all .2s; box-shadow: 0 2px 8px rgba(0,0,0,.05);
    backdrop-filter: blur(12px);
  }
  .lp-skip:hover { background: #fff; border-color: rgba(29,58,143,.2); color: #1d3a8f; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,.09); }

  /* ── STAGE ── */
  .lp-stage {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; z-index: 10; width: 100%; padding: 32px 20px;
    gap: 0;
  }

  /* Logo + date */
  .lp-logo-wrap { margin-bottom: 52px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .lp-logo { height: 100px; width: auto; filter: drop-shadow(0 6px 24px rgba(29,58,143,.13)); }
  .lp-logo-date {
    font-size: 11px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase;
    color: #94a3b8;
  }

  /* ── RIBBON WRAPPER ── */
  .lp-ribbon {
    width: min(900px, 96vw); display: flex; align-items: center;
    position: relative; margin-bottom: 44px; user-select: none;
    filter: drop-shadow(0 14px 36px rgba(220,38,38,.16));
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24'%3E%3Cpath fill='%231d3a8f' d='M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z'/%3E%3C/svg%3E") 4 32, crosshair;
  }

  /* ── GOLD POSTS ── */
  .lp-post {
    width: 13px; flex-shrink: 0; height: 104px;
    background: linear-gradient(90deg,
      #7c3d00 0%, #b45309 15%, #d97706 28%,
      #fbbf24 42%, #fef3c7 50%,
      #fbbf24 58%, #d97706 72%, #b45309 85%, #7c3d00 100%
    );
    border-radius: 3px;
    box-shadow: 0 3px 12px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.25);
    position: relative; z-index: 8; flex-shrink: 0;
  }
  /* Bolt holes on posts */
  .lp-post::before, .lp-post::after {
    content: ''; position: absolute; left: 50%; transform: translateX(-50%);
    width: 5px; height: 5px; border-radius: 50%;
    background: radial-gradient(circle, #fff6 0%, #b4530966 60%, transparent 100%);
    box-shadow: 0 1px 2px rgba(0,0,0,.3);
  }
  .lp-post::before { top: 12px; }
  .lp-post::after  { bottom: 12px; }

  /* ── RIBBON HALVES ── */
  .lp-rh {
    flex: 1; height: 86px; position: relative;
    transition: transform 2.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 2.6s ease .2s;
    animation: lp-rh-breathe 5s ease-in-out infinite;
  }
  @keyframes lp-rh-breathe {
    0%,100% { filter: brightness(1) saturate(1); }
    50%     { filter: brightness(1.04) saturate(1.05); }
  }

  /* Satin crimson — cloth body with cylindrical fold */
  .lp-rh--left {
    background:
      /* diagonal satin sheen */
      linear-gradient(158deg,
        rgba(255,255,255,0) 15%, rgba(255,255,255,.18) 32%, rgba(255,255,255,.28) 38%,
        rgba(255,255,255,.14) 46%, rgba(0,0,0,.04) 58%, rgba(0,0,0,0) 74%
      ),
      /* secondary diagonal catch */
      linear-gradient(200deg,
        rgba(255,255,255,0) 30%, rgba(255,255,255,.08) 44%, rgba(255,255,255,.13) 48%,
        rgba(255,255,255,.06) 54%, rgba(0,0,0,0) 66%
      ),
      /* cloth body — deep crimson satin */
      linear-gradient(180deg,
        #fecdd3 0%, #fca5a5 3%,
        #f87171 8%, #ef4444 16%,
        #dc2626 30%, #b91c1c 48%, #991b1b 52%, #b91c1c 56%,
        #dc2626 68%, #ef4444 80%,
        #f87171 90%, #fca5a5 97%, #fecdd3 100%
      );
    clip-path: polygon(0 0, 100% 0, calc(100% - 24px) 50%, 100% 100%, 0 100%);
    border-radius: 5px 0 0 5px;
  }
  .lp-rh--right {
    background:
      linear-gradient(158deg,
        rgba(255,255,255,0) 15%, rgba(255,255,255,.18) 32%, rgba(255,255,255,.28) 38%,
        rgba(255,255,255,.14) 46%, rgba(0,0,0,.04) 58%, rgba(0,0,0,0) 74%
      ),
      linear-gradient(200deg,
        rgba(255,255,255,0) 30%, rgba(255,255,255,.08) 44%, rgba(255,255,255,.13) 48%,
        rgba(255,255,255,.06) 54%, rgba(0,0,0,0) 66%
      ),
      linear-gradient(180deg,
        #fecdd3 0%, #fca5a5 3%,
        #f87171 8%, #ef4444 16%,
        #dc2626 30%, #b91c1c 48%, #991b1b 52%, #b91c1c 56%,
        #dc2626 68%, #ef4444 80%,
        #f87171 90%, #fca5a5 97%, #fecdd3 100%
      );
    clip-path: polygon(24px 0, 100% 0, 100% 100%, 24px 100%, 0 50%);
    border-radius: 0 5px 5px 0;
  }

  .lp-rh-inner { position: absolute; inset: 0; overflow: hidden; border-radius: inherit; }

  /* Woven fabric crosshatch */
  .lp-rh-silk {
    position: absolute; inset: 0;
    background:
      repeating-linear-gradient(-48deg, transparent, transparent 5px, rgba(255,255,255,.035) 5px, rgba(255,255,255,.035) 6px),
      repeating-linear-gradient(48deg,  transparent, transparent 5px, rgba(0,0,0,.035) 5px, rgba(0,0,0,.035) 6px),
      repeating-linear-gradient(90deg,  transparent, transparent 16px, rgba(0,0,0,.02) 16px, rgba(0,0,0,.02) 17px);
  }
  /* Top highlight band */
  .lp-rh-top-shine {
    position: absolute; top: 0; left: 0; right: 0; height: 40%;
    background: linear-gradient(180deg, rgba(255,255,255,.32) 0%, rgba(255,255,255,.1) 45%, transparent 100%);
  }
  /* Bottom shadow */
  .lp-rh-bottom-shadow {
    position: absolute; bottom: 0; left: 0; right: 0; height: 40%;
    background: linear-gradient(0deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,.08) 55%, transparent 100%);
  }
  /* Moving specular */
  .lp-rh-shine-band {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 26%, rgba(255,255,255,.06) 36%, rgba(255,255,255,.12) 42%, rgba(255,255,255,.06) 48%, transparent 58%);
    animation: lp-sheen 7s ease-in-out infinite;
  }
  @keyframes lp-sheen { 0%,100%{opacity:.6} 50%{opacity:1} }

  /* Gold hem lines — ceremonial ribbon detail */
  .lp-rh-hem-top {
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg,
      rgba(251,191,36,0) 0%, rgba(251,191,36,.55) 15%,
      rgba(254,243,199,.8) 50%, rgba(251,191,36,.55) 85%, rgba(251,191,36,0) 100%
    );
  }
  .lp-rh-hem-bottom {
    position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg,
      rgba(217,119,6,0) 0%, rgba(217,119,6,.45) 15%,
      rgba(251,191,36,.65) 50%, rgba(217,119,6,.45) 85%, rgba(217,119,6,0) 100%
    );
  }
  .lp-rh-fade-right {
    position: absolute; top: 0; bottom: 0; right: 0; width: 70px;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,.28));
  }
  .lp-rh-fade-left {
    position: absolute; top: 0; bottom: 0; left: 0; width: 70px;
    background: linear-gradient(90deg, rgba(0,0,0,.28), transparent);
  }

  /* ── CUT ZONE ── */
  .lp-cut-zone {
    width: 52px; min-width: 52px; height: 86px;
    position: relative; z-index: 10; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    overflow: visible;
  }

  .lp-cut-guide {
    position: absolute;
    width: 2px; height: calc(100% + 12px);
    background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,.65) 20%, white 50%, rgba(255,255,255,.65) 80%, transparent 100%);
    box-shadow: 0 0 10px rgba(255,255,255,.55), 0 0 22px rgba(239,68,68,.28);
    border-radius: 2px;
    animation: lp-guide-pulse 2.2s ease-in-out infinite;
  }
  @keyframes lp-guide-pulse {
    0%,100% { opacity: .65; box-shadow: 0 0 8px rgba(255,255,255,.4), 0 0 18px rgba(239,68,68,.18); }
    50%     { opacity: 1;   box-shadow: 0 0 16px rgba(255,255,255,.85), 0 0 36px rgba(239,68,68,.38); }
  }

  /* Floating scissors */
  .lp-scissors-float {
    position: absolute; top: -58px;
    filter: drop-shadow(0 4px 12px rgba(29,58,143,.22));
    transform: rotate(-22deg);
    animation: lp-scissors-bob 2s ease-in-out infinite;
  }
  @keyframes lp-scissors-bob {
    0%,100% { top: -58px; transform: rotate(-22deg); }
    50%     { top: -46px; transform: rotate(-22deg); }
  }

  /* Hover */
  .lp-ribbon--hover .lp-rh { filter: brightness(1.09) saturate(1.14); animation: none; }
  .lp-ribbon--hover .lp-scissors-float {
    animation: none;
    top: -30px;
    transform: rotate(-22deg);
    filter: drop-shadow(0 5px 16px rgba(29,58,143,.38));
    transition: top .25s ease, filter .2s;
  }
  .lp-ribbon--hover .lp-cut-guide {
    opacity: 1;
    box-shadow: 0 0 20px rgba(255,255,255,1), 0 0 48px rgba(239,68,68,.55);
    animation: none;
  }

  /* Cut — scissors slash through, ribbon falls slowly */
  .lp-ribbon--cut .lp-rh {
    animation: none;
  }
  .lp-ribbon--cut .lp-rh--left {
    transition: transform 2.8s cubic-bezier(0.16, 1, 0.3, 1) .1s,
                opacity 2.6s ease .3s;
    transform: translateX(calc(-50vw - 100px)) rotate(-20deg) translateY(80px);
    opacity: 0;
  }
  .lp-ribbon--cut .lp-rh--right {
    transition: transform 2.8s cubic-bezier(0.16, 1, 0.3, 1) .1s,
                opacity 2.6s ease .3s;
    transform: translateX(calc(50vw + 100px)) rotate(20deg) translateY(80px);
    opacity: 0;
  }
  .lp-ribbon--cut .lp-scissors-float {
    animation: lp-scissors-slash .9s cubic-bezier(.4,0,.2,1) forwards;
  }
  @keyframes lp-scissors-slash {
    0%   { top: -30px;  opacity: 1; transform: rotate(-22deg) scale(1); }
    25%  { top: 10px;   opacity: 1; transform: rotate(-22deg) scale(1.08); }
    60%  { top: 55px;   opacity: 1; transform: rotate(-22deg) scale(1); }
    100% { top: 110px;  opacity: 0; transform: rotate(-22deg) scale(.85); }
  }
  .lp-ribbon--cut .lp-cut-guide {
    animation: lp-guide-vanish .35s ease forwards;
  }
  @keyframes lp-guide-vanish { to { opacity: 0; transform: scaleY(0); } }

  /* Hint dots */
  .lp-hint {
    display: flex; gap: 6px; align-items: center; margin-top: 8px;
  }
  .lp-hint-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(29,58,143,.22);
    animation: lp-hint-anim 1.6s ease-in-out infinite;
  }
  @keyframes lp-hint-anim {
    0%,100% { transform: scale(1); opacity: .3; }
    50%     { transform: scale(1.6); opacity: .8; }
  }

  /* Launching */
  .lp-launching { display: flex; align-items: center; justify-content: center; margin-top: 8px; }
  .lp-launch-spinner {
    width: 20px; height: 20px; border-radius: 50%;
    border: 2.5px solid rgba(29,58,143,.12); border-top-color: #1d3a8f;
    animation: lp-spin .8s linear infinite;
  }
  @keyframes lp-spin { to { transform: rotate(360deg); } }

  /* ── PETALS ── */
  .lp-petals { position: fixed; inset: 0; pointer-events: none; z-index: 50; overflow: hidden; }
  .lp-petal {
    position: absolute; top: -20px; opacity: .88;
    animation: lp-petal-fall linear both;
  }
  .lp-petal--0 { border-radius: 50% 0 50% 0; }        /* petal */
  .lp-petal--1 { border-radius: 50%; }                  /* circle */
  .lp-petal--2 { border-radius: 2px; }                  /* rectangle */
  @keyframes lp-petal-fall {
    0%   { transform: translateY(-20px) translateX(0) rotate(0); opacity: .88; }
    80%  { opacity: .65; }
    100% { transform: translateY(110vh) translateX(var(--drift)) rotate(var(--rot)); opacity: 0; }
  }

  /* ── CELEBRATE ── */
  .lp-celebrate {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; z-index: 10; padding: 24px 20px;
    animation: lp-cel-in .9s cubic-bezier(.16,1,.3,1) both;
    position: relative;
  }
  @keyframes lp-cel-in {
    from { opacity: 0; transform: scale(.82) translateY(36px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .lp-cel-rings { position: absolute; top: 50%; left: 50%; pointer-events: none; }
  .lp-ring {
    position: absolute; border-radius: 50%;
    border: 1.5px solid rgba(29,58,143,.12);
    transform: translate(-50%,-50%);
    animation: lp-ring-out 3.2s ease-out infinite;
  }
  .lp-ring--1 { width: 260px; height: 260px; animation-delay: 0s; }
  .lp-ring--2 { width: 420px; height: 420px; animation-delay: .55s; border-color: rgba(29,58,143,.07); }
  .lp-ring--3 { width: 580px; height: 580px; animation-delay: 1.1s; border-color: rgba(29,58,143,.04); }
  @keyframes lp-ring-out {
    0%  { transform: translate(-50%,-50%) scale(.3); opacity: .9; }
    100%{ transform: translate(-50%,-50%) scale(1.5); opacity: 0; }
  }

  .lp-cel-logo {
    height: 92px; width: auto; position: relative; z-index: 2; margin-bottom: 24px;
    animation: lp-float 3s ease-in-out infinite;
    filter: drop-shadow(0 8px 28px rgba(29,58,143,.18));
  }
  @keyframes lp-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

  .lp-cel-h1 {
    font-size: clamp(38px, 6vw, 68px); font-weight: 900;
    letter-spacing: -.04em; line-height: 1.04;
    color: #09090f; margin-bottom: 12px; position: relative; z-index: 2;
  }
  .lp-cel-sub {
    font-size: 16px; color: #8a8aa8; font-weight: 500;
    position: relative; z-index: 2; margin-bottom: 32px;
    max-width: 320px;
  }
  .lp-cel-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.25);
    color: #059669; padding: 8px 18px; border-radius: 99px;
    font-size: 13px; font-weight: 600;
    position: relative; z-index: 2;
    animation: lp-badge-in .5s .35s ease both;
  }
  @keyframes lp-badge-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .lp-cel-badge-dot {
    width: 7px; height: 7px; border-radius: 50%; background: #10b981;
    box-shadow: 0 0 8px rgba(16,185,129,.7); animation: lp-pulse 1.8s ease-in-out infinite; flex-shrink: 0;
  }
  @keyframes lp-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.7} }

  /* ── REVEAL ── */
  .lp-reveal {
    position: fixed; inset: 0; background: #f0f4ff;
    display: flex; align-items: center; justify-content: center;
    z-index: 100; animation: lp-reveal 2s ease forwards;
  }
  @keyframes lp-reveal { 0%{opacity:1} 50%{opacity:1} 100%{opacity:0} }
  .lp-rev-logo {
    height: 88px; width: auto;
    animation: lp-rev-logo 2s ease;
    filter: drop-shadow(0 4px 20px rgba(29,58,143,.2));
  }
  @keyframes lp-rev-logo {
    0%  { opacity:0; transform:scale(.85); }
    25% { opacity:1; transform:scale(1.04); }
    70% { opacity:1; transform:scale(1); }
    100%{ opacity:0; transform:scale(1.08); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 600px) {
    .lp-rh { height: 62px; }
    .lp-cut-zone { height: 62px; width: 40px; min-width: 40px; }
    .lp-scissors-float { width: 32px; height: 32px; }
    .lp-post { height: 78px; width: 10px; }
    .lp-cel-h1 { font-size: 38px; }
    .lp-ribbon { width: 96vw; }
  }
`
