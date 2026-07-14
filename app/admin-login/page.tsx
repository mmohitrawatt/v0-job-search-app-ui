"use client"

import { useState, useEffect } from "react"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [checking, setChecking] = useState(true)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("adm_auth")) {
      window.location.href = "/admin"
    } else {
      setChecking(false)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/data", {
        headers: { Authorization: `Bearer ${password}` },
      })
      if (res.ok) {
        sessionStorage.setItem("adm_auth", password)
        window.location.href = "/admin"
      } else {
        setError("Wrong password. Please try again.")
        setShake(true)
        setTimeout(() => setShake(false), 600)
        setPassword("")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (checking) return null

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#060d24;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif;-webkit-font-smoothing:antialiased}

        @keyframes al-float1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-24px) scale(1.04)}}
        @keyframes al-float2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-22px,18px) scale(.97)}}
        @keyframes al-fadein{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes al-pulse{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.25)}50%{box-shadow:0 0 0 7px rgba(34,197,94,.08)}}
        @keyframes al-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}
        @keyframes al-spin{to{transform:rotate(360deg)}}

        .al-wrap{
          min-height:100svh;background:#060d24;
          display:flex;align-items:center;justify-content:center;
          padding:24px;position:relative;overflow:hidden;
        }
        .al-orb1{position:absolute;top:-15%;left:-10%;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(42,78,207,.22),transparent 70%);filter:blur(80px);pointer-events:none;animation:al-float1 20s ease-in-out infinite}
        .al-orb2{position:absolute;bottom:-10%;right:-8%;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.16),transparent 70%);filter:blur(70px);pointer-events:none;animation:al-float2 26s ease-in-out infinite}
        .al-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.025) 1px,transparent 1px);background-size:32px 32px;pointer-events:none}

        .al-card{
          position:relative;z-index:1;
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08);
          border-radius:24px;padding:44px 40px 36px;
          width:100%;max-width:420px;
          backdrop-filter:blur(24px);
          box-shadow:0 32px 80px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.04);
          animation:al-fadein .6s cubic-bezier(.16,1,.3,1) both;
        }
        .al-card.shake{animation:al-shake .5s ease both}

        .al-brand{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:36px}
        .al-brand-dot{width:10px;height:10px;border-radius:50%;background:#22c55e;animation:al-pulse 2s infinite}
        .al-brand-name{font-size:17px;font-weight:800;color:#f8fafc;letter-spacing:-.3px}

        .al-icon{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,#1d3a8f,#2a4ecf);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 8px 24px rgba(42,78,207,.4)}
        .al-title{font-size:24px;font-weight:900;color:#f8fafc;text-align:center;letter-spacing:-.5px;margin-bottom:6px}
        .al-sub{font-size:13px;color:rgba(255,255,255,.38);text-align:center;margin-bottom:32px;line-height:1.5}

        .al-field{margin-bottom:8px}
        .al-label{display:block;font-size:11px;font-weight:700;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.7px;margin-bottom:8px}
        .al-input-wrap{position:relative}
        .al-input{
          width:100%;background:rgba(255,255,255,.06);
          border:1.5px solid rgba(255,255,255,.1);
          border-radius:12px;padding:14px 48px 14px 16px;
          font-size:15px;color:#f8fafc;outline:none;
          transition:all .25s;font-family:inherit;
          -webkit-text-security:${`disc`};
        }
        .al-input:focus{border-color:rgba(42,78,207,.7);background:rgba(255,255,255,.09);box-shadow:0 0 0 3px rgba(42,78,207,.18)}
        .al-input::placeholder{color:rgba(255,255,255,.2)}
        .al-eye{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,.3);padding:4px;display:flex;align-items:center;justify-content:center;transition:color .2s}
        .al-eye:hover{color:rgba(255,255,255,.65)}

        .al-error{
          display:flex;align-items:center;gap:8px;
          background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);
          border-radius:10px;padding:11px 14px;
          color:#f87171;font-size:13px;font-weight:600;
          margin-bottom:16px;
        }

        .al-btn{
          width:100%;background:#1d3a8f;
          color:#fff;border:none;padding:15px;
          border-radius:12px;font-size:15px;font-weight:700;
          cursor:pointer;margin-top:20px;font-family:inherit;
          transition:all .3s cubic-bezier(.16,1,.3,1);
          box-shadow:0 4px 20px rgba(42,78,207,.4);
          position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:8px;
        }
        .al-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(255,255,255,.14),transparent 60%);pointer-events:none}
        .al-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 28px rgba(42,78,207,.55)}
        .al-btn:active:not(:disabled){transform:scale(.98)}
        .al-btn:disabled{opacity:.55;cursor:not-allowed;transform:none}
        .al-spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:al-spin .65s linear infinite;flex-shrink:0}

        .al-footer{margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,.06);text-align:center}
        .al-footer-txt{font-size:12px;color:rgba(255,255,255,.2)}

        @media(max-width:480px){
          .al-card{padding:32px 24px 28px;border-radius:20px}
          .al-title{font-size:21px}
        }
      `}</style>

      <div className="al-wrap">
        <div className="al-orb1" />
        <div className="al-orb2" />
        <div className="al-grid" />

        <div className={`al-card${shake ? " shake" : ""}`}>
          <div className="al-brand">
            <div className="al-brand-dot" />
            <span className="al-brand-name">Jobingen</span>
          </div>

          <div className="al-icon">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="white" strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="al-title">Admin Access</h1>
          <p className="al-sub">Enter your admin password to access<br/>the Jobingen dashboard</p>

          <form onSubmit={handleSubmit}>
            <div className="al-field">
              <label className="al-label">Password</label>
              <div className="al-input-wrap">
                <input
                  className="al-input"
                  type={show ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
                  required
                />
                <button type="button" className="al-eye" onClick={() => setShow(s => !s)} tabIndex={-1}>
                  {show ? (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  ) : (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="al-error">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                {error}
              </div>
            )}

            <button className="al-btn" type="submit" disabled={loading || !password.trim()}>
              {loading ? <><span className="al-spinner" /> Verifying...</> : "Access Dashboard"}
            </button>
          </form>

          <div className="al-footer">
            <p className="al-footer-txt">Restricted to Jobingen team members only</p>
          </div>
        </div>
      </div>
    </>
  )
}
