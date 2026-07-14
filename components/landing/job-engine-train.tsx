"use client"

import { FileText, Users, AudioLines, Send, Fingerprint, Briefcase } from "lucide-react"
import { FadeIn } from "./motion"

/* ─── The Job Engine — cinematic edition ───────────────────────────
   A detailed locomotive (the "job engine") hauling one wagon per
   product feature through a parallax scene: drifting clouds, distant
   hills, rushing speed-streaks, a gravel track bed, spinning spoked
   wheels, an oscillating piston rod and a puffing chimney.
   Brand-navy monochrome (#1d3a8f) + warm gold trim.               */

const NAVY = "#1d3a8f"
const NAVY_D = "#152a63"
const GOLD = "#f5b83d"

const CARS = [
  { icon: FileText,    title: "Resumes",      cargo: "AI Builder" },
  { icon: AudioLines,  title: "Interview AI", cargo: "Mock Rounds" },
  { icon: Users,       title: "Mentors",      cargo: "1:1 Guidance" },
  { icon: Send,        title: "JobEngine",    cargo: "Auto-Apply" },
  { icon: Fingerprint, title: "ThinkPrint",   cargo: "Assessments" },
  { icon: Briefcase,   title: "Job Matches",  cargo: "Ranked Feed" },
]

/* a spinning spoked wheel with a rim + hub */
function Wheel({ size = 26 }: { size?: number }) {
  return (
    <span className="je-wheel" style={{ width: size, height: size }}>
      <svg viewBox="0 0 40 40" width={size} height={size} className="je-wheel-svg">
        <circle cx="20" cy="20" r="18.5" fill={NAVY_D} stroke={NAVY} strokeWidth="2.5" />
        <circle cx="20" cy="20" r="15" fill="none" stroke="#33477e" strokeWidth="2" />
        <g stroke="#e7edff" strokeWidth="2.1" strokeLinecap="round">
          <line x1="20" y1="6"  x2="20" y2="34" />
          <line x1="6"  y1="20" x2="34" y2="20" />
          <line x1="9.6" y1="9.6"  x2="30.4" y2="30.4" />
          <line x1="30.4" y1="9.6" x2="9.6"  y2="30.4" />
        </g>
        <circle cx="20" cy="20" r="4.4" fill="#eef2ff" stroke={NAVY} strokeWidth="1.5" />
      </svg>
    </span>
  )
}

/* one full train (engine + all wagons) — rendered twice for a seamless loop */
function TrainSet({ aria = false }: { aria?: boolean }) {
  return (
    <div className="je-set" aria-hidden={aria}>
      {/* ── Engine ── */}
      <div className="je-engine je-chug">
        <div className="je-body">
          <div className="je-smoke">
            <span className="je-puff" style={{ animationDelay: "0s" }} />
            <span className="je-puff" style={{ animationDelay: ".5s" }} />
            <span className="je-puff" style={{ animationDelay: "1s" }} />
            <span className="je-puff" style={{ animationDelay: "1.5s" }} />
          </div>
          <div className="je-chimney" />
          <div className="je-dome" />
          <div className="je-whistle" />
          <div className="je-cab-roof" />
          <div className="je-cab"><div className="je-window" /></div>
          <div className="je-boiler">
            <div className="je-rivets" />
            <div className="je-nose" />
            <div className="je-catcher" />
            <div className="je-headlight" />
            <div className="je-brand">jobingen</div>
            <div className="je-num">01</div>
          </div>
        </div>
        <div className="je-eng-wheels">
          <div className="je-rod" />
          <Wheel size={26} />
          <Wheel size={40} />
          <Wheel size={26} />
        </div>
      </div>

      {/* ── Feature wagons ── */}
      {CARS.map((c, i) => {
        const Icon = c.icon
        return (
          <div key={c.title} style={{ display: "flex", alignItems: "flex-end" }}>
            <div className="je-coupler" />
            <div className="je-car je-chug" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
              <div className="je-buffer" style={{ left: -3 }} />
              <div className="je-buffer" style={{ right: -3 }} />
              <div className="je-car-body">
                <div className="je-car-top" />
                <div className="je-car-in">
                  <div className="je-ico"><Icon size={21} strokeWidth={2} /></div>
                  <div className="je-car-title">{c.title}</div>
                  <div className="je-car-cargo">{c.cargo}</div>
                </div>
              </div>
              <div className="je-wheels"><Wheel /><Wheel /></div>
            </div>
          </div>
        )
      })}
      {/* long empty track — clean gap before the train loops back in */}
      <div style={{ width: "60vw", maxWidth: 620, flexShrink: 0 }} aria-hidden />
    </div>
  )
}

export function JobEngineTrain() {
  return (
    <section className="je-sec">
      <style>{`
        .je-sec { position: relative; overflow: hidden; padding: 74px 0 90px; background: #ffffff; }

        @keyframes je-spin    { to { transform: rotate(360deg); } }
        @keyframes je-ties    { from { background-position-x: 0; } to { background-position-x: 64px; } }
        @keyframes je-gravel  { from { background-position-x: 0; } to { background-position-x: 44px; } }
        @keyframes je-bob     { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2.5px); } }
        @keyframes je-rod     { 0%,100% { transform: translateX(0); } 50% { transform: translateX(5px); } }
        @keyframes je-puff    {
          0%   { opacity: 0;   transform: translate(0,0) scale(.45); }
          18%  { opacity: .34; }
          100% { opacity: 0;   transform: translate(40px,-70px) scale(2.2); }
        }
        @keyframes je-streak  { 0% { transform: translateX(-10vw); opacity: 0; } 12% { opacity: .5; } 100% { transform: translateX(115vw); opacity: 0; } }
        @keyframes je-cloud   { from { transform: translateX(-8%); } to { transform: translateX(108%); } }
        @keyframes je-hill    { from { background-position-x: 0; } to { background-position-x: 360px; } }
        @keyframes je-roll-in { from { transform: translateX(-52px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes je-blink   { 0%,100% { opacity: 1; } 50% { opacity: .35; } }

        /* ── parallax scenery ── */
        .je-sky-glow { position:absolute; inset:0 0 auto 0; height:70%; pointer-events:none;
          background: radial-gradient(60% 80% at 50% 0%, rgba(29,58,143,0.06), transparent 70%); }
        .je-cloud { position:absolute; border-radius:50%; background:#fff;
          box-shadow: 30px 6px 0 -4px #fff, 62px 12px 0 -8px #fff, -26px 8px 0 -6px #fff;
          filter: blur(.3px); opacity:.9; animation: je-cloud linear infinite; }
        .je-hills { position:absolute; left:0; right:0; height:120px; bottom:96px; pointer-events:none;
          background-repeat: repeat-x; background-size:360px 120px; opacity:.055;
          background-image:
            radial-gradient(120px 120px at 60px 120px, ${NAVY} 60%, transparent 62%),
            radial-gradient(170px 150px at 250px 130px, ${NAVY} 60%, transparent 62%);
          animation: je-hill 26s linear infinite; }
        .je-streaks { position:absolute; inset:0; pointer-events:none; z-index:1; }
        .je-streak { position:absolute; height:2px; border-radius:2px; background:${NAVY}; opacity:.14;
          animation: je-streak linear infinite; }

        /* ── train ── */
        .je-scene { position: relative; z-index:2; }
        .je-train { display: flex; align-items: flex-end; width: max-content; margin: 0 auto; padding: 0 10px 2px;
          animation: je-roll-in 1s cubic-bezier(.16,1,.3,1) both; }
        .je-chug  { animation: je-bob 1.05s ease-in-out infinite; will-change: transform; }
        .je-wheel-svg { animation: je-spin 1.35s linear infinite; display:block; }

        .je-coupler { width: 18px; height: 5px; background: ${NAVY}; border-radius: 3px; margin-bottom: 27px; opacity:.8; flex-shrink:0;
          box-shadow: 0 0 0 3px rgba(29,58,143,.08); }

        /* wagon */
        .je-car { position: relative; flex-shrink:0; }
        .je-car-body { width: 138px; background: linear-gradient(180deg,#ffffff,#f5f8ff); border:2px solid #dbe2f7;
          border-radius: 15px; box-shadow: 0 12px 28px rgba(29,58,143,0.12), inset 0 1px 0 #fff; overflow:hidden;
          transition: transform .25s ease, box-shadow .25s ease; }
        .je-car:hover .je-car-body { transform: translateY(-5px); box-shadow: 0 22px 44px rgba(29,58,143,0.2); }
        .je-car-top { height: 8px; background: linear-gradient(90deg,${NAVY},#28407e); position:relative; }
        .je-car-top::after { content:""; position:absolute; inset:0; background: repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 2px, transparent 2px 12px); }
        .je-car-in { padding: 15px 10px 13px; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .je-ico { width: 44px; height: 44px; border-radius: 12px; background: #eef2ff; color:${NAVY};
          display:grid; place-items:center; margin-bottom: 8px; box-shadow: inset 0 0 0 1px #dbe2f7; }
        .je-car-title { font-size: 12.5px; font-weight: 800; color:#0c1a35; letter-spacing:-.01em; }
        .je-car-cargo { font-size: 9.5px; font-weight: 700; color:#8492ad; text-transform:uppercase; letter-spacing:.05em; margin-top:2px; }
        .je-wheels { display:flex; justify-content:center; gap: 40px; margin-top: 6px; }
        .je-buffer { position:absolute; width:5px; height:12px; background:${NAVY}; border-radius:2px; bottom:34px; opacity:.55; }

        /* ── engine ── */
        .je-engine { position: relative; flex-shrink:0; margin-right: 1px; }
        .je-body { position: relative; }
        .je-boiler { width: 176px; height: 60px; border-radius: 14px 32px 6px 6px; position:relative;
          background: linear-gradient(180deg,#2a4680 0%, ${NAVY} 55%, ${NAVY_D} 100%);
          box-shadow: 0 12px 28px rgba(29,58,143,0.28), inset 0 2px 0 rgba(255,255,255,.14); }
        .je-boiler::before { content:""; position:absolute; left:52px; top:0; bottom:0; width:2px; background:rgba(255,255,255,.10); }
        .je-rivets { position:absolute; left:10px; right:44px; top:9px; height:6px; border-radius:6px;
          background: radial-gradient(circle at 3px 3px, rgba(255,255,255,.5) 0 1.4px, transparent 1.6px) 0 0/13px 6px repeat-x; opacity:.5; }
        .je-band { position:absolute; left:0; right:24px; bottom:12px; height:5px; background:${GOLD}; opacity:.9; }
        .je-cab { position:absolute; right:-2px; top:-36px; width:66px; height:54px; border-radius:12px 12px 4px 4px;
          background: linear-gradient(180deg,#28407e,${NAVY_D}); box-shadow: inset 0 2px 0 rgba(255,255,255,.12); }
        .je-cab-roof { position:absolute; right:-6px; top:-38px; width:74px; height:8px; background:${NAVY_D}; border-radius:5px; }
        .je-window { position:absolute; top:11px; left:13px; width:40px; height:26px; border-radius:6px;
          background: linear-gradient(160deg,#dbe4ff,#9fb2ee); box-shadow: inset 0 0 0 2px #12244d; }
        .je-brand { position:absolute; left:50px; top:14px; font-size:18px; font-weight:900; letter-spacing:-.03em; color:#ffffff; text-transform:lowercase; text-shadow:0 1px 2px rgba(0,0,0,.25); }
        .je-num { position:absolute; left:50px; top:43px; padding:1px 5px; border-radius:3px; background:${GOLD};
          color:${NAVY_D}; font-size:10px; font-weight:900; letter-spacing:.04em; }
        .je-headlight { position:absolute; left:-8px; top:16px; width:15px; height:15px; border-radius:50%;
          background:${GOLD}; box-shadow: 0 0 16px 4px rgba(245,184,61,.7); animation: je-blink 2.4s ease-in-out infinite; }
        .je-lightbeam { position:absolute; left:-46px; top:14px; width:0; height:0; border-top:10px solid transparent;
          border-bottom:10px solid transparent; border-right:40px solid rgba(245,184,61,.16); }
        .je-nose { position:absolute; left:-15px; bottom:0; width:0; height:0;
          border-left:15px solid transparent; border-bottom:30px solid ${NAVY}; }
        .je-catcher { position:absolute; left:-26px; bottom:-2px; width:0; height:0;
          border-left:26px solid transparent; border-bottom:16px solid ${NAVY_D}; opacity:.9; }
        .je-chimney { position:absolute; left:24px; top:-24px; width:22px; height:26px; border-radius:4px 4px 2px 2px;
          background: linear-gradient(180deg,#28407e,${NAVY}); }
        .je-chimney::before { content:""; position:absolute; top:-6px; left:-5px; width:32px; height:9px; background:${GOLD}; border-radius:5px; opacity:.85; }
        .je-dome { position:absolute; left:64px; top:-14px; width:20px; height:16px; border-radius:10px 10px 0 0;
          background: linear-gradient(180deg,${GOLD},#d99a24); }
        .je-whistle { position:absolute; left:92px; top:-12px; width:5px; height:14px; background:${NAVY_D}; border-radius:2px; }
        .je-smoke { position:absolute; left:28px; top:-32px; width:14px; height:14px; }
        .je-puff { position:absolute; width:15px; height:15px; border-radius:50%; background:#c3cde6; filter: blur(1px);
          animation: je-puff 2.3s ease-out infinite; }
        .je-eng-wheels { position:relative; display:flex; align-items:flex-end; gap: 18px; padding: 6px 16px 0; }
        .je-rod { position:absolute; left:24px; right:24px; top: 50%; height:5px; background:${GOLD}; border-radius:3px; opacity:.85;
          box-shadow: 0 0 0 2px rgba(29,58,143,.15); animation: je-rod 1.35s ease-in-out infinite; }

        /* ── moving train (marquee across the screen) ── */
        @keyframes je-run { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .je-marquee { position:relative; overflow:hidden; padding-bottom:26px;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
        .je-move { display:flex; width:max-content; align-items:flex-end; animation: je-run 26s linear infinite; }
        .je-marquee:hover .je-move { animation-play-state: paused; }
        .je-set { display:flex; align-items:flex-end; padding:0 34px 0 8px; }

        /* static ground rail spanning the section */
        .je-groundrail { position:absolute; left:0; right:0; bottom:12px; height:20px; z-index:0; }
        .je-rail { position:absolute; left:0; right:0; height:3.5px; background:linear-gradient(180deg,#aeb8d4,#c9d0e6); border-radius:2px; }
        .je-ties { position:absolute; top:6px; left:0; right:0; height:13px;
          background-image: repeating-linear-gradient(90deg,#c2cbe2 0 8px, transparent 8px 60px); }

        @media (prefers-reduced-motion: reduce) {
          .je-wheel-svg,.je-chug,.je-puff,.je-move,.je-streak,.je-cloud,.je-hills,.je-rod,.je-headlight { animation:none !important; }
        }
      `}</style>

      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 relative" style={{ zIndex: 2 }}>
        {/* heading */}
        <FadeIn className="text-center mb-12">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eef2ff",
            border: "1px solid #cdd8fb", borderRadius: 999, padding: "6px 15px", marginBottom: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".12em", color: NAVY, textTransform: "uppercase" }}>
              All aboard the Job Engine
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(26px,6vw,50px)", fontWeight: 900, letterSpacing: "-0.04em",
            lineHeight: 1.1, color: "#0c1a35", maxWidth: "100%" }}>
            One engine, pulling your <span style={{ color: NAVY }}>whole career</span> forward
          </h2>
          <p style={{ fontSize: "clamp(15px,1.7vw,17px)", color: "#475569", maxWidth: 620, margin: "14px auto 0", lineHeight: 1.6, fontWeight: 500, paddingLeft: 4, paddingRight: 4 }}>
            Every feature on one track — all powered by Jobingen.
          </p>
        </FadeIn>
      </div>

      {/* ── full-width moving train (loops across the screen) ── */}
      <div className="je-marquee">
        <div className="je-move">
          <TrainSet />
          <TrainSet aria />
        </div>
        {/* static ground rail — ties below a single rail line */}
        <div className="je-groundrail">
          <div className="je-ties" />
          <div className="je-rail" style={{ top: 2 }} />
        </div>
      </div>
    </section>
  )
}
