"use client"

import { useRef } from "react"
import {
  Award,
  Briefcase,
  Gift,
  GraduationCap,
  Megaphone,
  Sparkles,
  Star,
  Users,
} from "lucide-react"

import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { CampusAmbassadorWizard } from "@/components/campus-ambassador/wizard"

const STATS = [
  { icon: "🏫", label: "Top Colleges" },
  { icon: "👨‍🎓", label: "Student Leaders" },
  { icon: "🎁", label: "Rewards" },
  { icon: "🚀", label: "Internship Opportunities" },
]

const WHY_JOIN = [
  { icon: Award, title: "Leadership Experience", desc: "Lead a real program on your campus and build a track record of ownership and execution." },
  { icon: Briefcase, title: "Industry Exposure", desc: "Get direct visibility into how a fast-moving startup builds products and goes to market." },
  { icon: Users, title: "Networking", desc: "Connect with founders, mentors, and top-performing students across India's best colleges." },
  { icon: GraduationCap, title: "Certificates", desc: "Earn an official Jobingen Campus Ambassador certificate recognized on your resume and LinkedIn." },
  { icon: Sparkles, title: "Internship Opportunities", desc: "Top performers get fast-tracked to internship and Pre-Placement Interview opportunities." },
  { icon: Star, title: "Mentorship", desc: "Get paired with Jobingen's core team and industry mentors for 1:1 career guidance." },
  { icon: Gift, title: "Rewards", desc: "Unlock cash rewards, swag kits, and free access to every Jobingen bootcamp and AI tool." },
  { icon: Megaphone, title: "Recognition", desc: "Get featured on Jobingen's official channels as a top-performing Campus Ambassador." },
]

const HOW_IT_WORKS = [
  { num: "01", title: "Apply Online", desc: "Fill out the application form — it takes about 2 minutes." },
  { num: "02", title: "Get Reviewed", desc: "Our team reviews every application and shortlists based on fit and reach." },
  { num: "03", title: "Onboard & Launch", desc: "Shortlisted candidates go through a short interaction, final discussion, then official onboarding." },
]

export function CampusAmbassadorProgramClient() {
  const formRef = useRef<HTMLDivElement>(null)
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <>
      <style>{`
        .caa * { box-sizing: border-box; }
        .caa { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

        @keyframes caa-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }
        @keyframes caa-fade-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }

        .caa-hero {
          position: relative; overflow: hidden;
          background: linear-gradient(180deg, #ffffff 0%, #ffffff 60%, #ffffff 100%);
          padding: 188px 24px 80px; text-align: center;
        }
        .caa-hero-blob1 { position:absolute; top:-10%; right:5%; width:440px; height:440px; border-radius:50%; background:radial-gradient(circle, rgba(29,58,143,0) 0%, transparent 70%); pointer-events:none; }
        .caa-hero-blob2 { position:absolute; bottom:-5%; left:3%; width:320px; height:320px; border-radius:50%; background:radial-gradient(circle, rgba(59,91,219,0) 0%, transparent 70%); pointer-events:none; }
        .caa-hero-dot-grid { position:absolute; inset:0; background-image:radial-gradient(circle,rgba(29,58,143,0.06) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; }

        .caa-hero-badge {
          display:inline-flex; align-items:center; gap:7px;
          padding:6px 18px; background:white; border:1.5px solid #dde5ff;
          border-radius:99px; margin-bottom:28px;
          box-shadow:0 2px 12px rgba(29,58,143,0.08);
          animation: caa-fade-up .6s cubic-bezier(.16,1,.3,1) both;
        }
        .caa-hero-dot { width:7px; height:7px; background:#16a34a; border-radius:50%; box-shadow:0 0 6px rgba(22,163,74,.5); animation:caa-pulse 2s infinite; }
        .caa-hero-badge-text { font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.06em; text-transform:uppercase; }

        .caa-hero-h1 {
          font-size:clamp(34px,5vw,58px); font-weight:900; color:#0f172a;
          letter-spacing:-0.04em; line-height:1.08; margin-bottom:20px;
          animation: caa-fade-up .7s cubic-bezier(.16,1,.3,1) .06s both;
        }
        .caa-hero-grad { background: linear-gradient(135deg, #1d3a8f, #1d3a8f); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .caa-hero-sub {
          font-size:17px; color:#475569; line-height:1.75; max-width:600px; margin:0 auto 36px;
          animation: caa-fade-up .8s cubic-bezier(.16,1,.3,1) .12s both;
        }
        .caa-btn-primary {
          display:inline-flex; align-items:center; gap:9px;
          background:#1d3a8f;
          color:#fff; padding:15px 34px; border-radius:12px;
          font-size:15px; font-weight:700; border:none; cursor:pointer;
          box-shadow:0 4px 20px rgba(29,58,143,0.28);
          transition:all .25s cubic-bezier(.16,1,.3,1);
          animation: caa-fade-up .9s cubic-bezier(.16,1,.3,1) .18s both;
        }
        .caa-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(29,58,143,0.38); }

        .caa-hero-stats {
          display:inline-flex; align-items:center; background:white;
          border:1.5px solid #e0e7ff; border-radius:16px; overflow:hidden;
          box-shadow:0 4px 20px rgba(29,58,143,0.08);
          animation: caa-fade-up 1s cubic-bezier(.16,1,.3,1) .24s both;
          margin-top: 40px;
        }
        .caa-stat { padding:16px 26px; text-align:center; border-right:1px solid #f1f5f9; }
        .caa-stat:last-child { border-right:none; }
        .caa-stat-icon { font-size:20px; line-height:1; }
        .caa-stat-label { font-size:11px; font-weight:700; color:#64748b; margin-top:6px; }

        .caa-inner { max-width:1100px; margin:0 auto; padding:0 24px; }
        .caa-sec { padding:80px 24px; }
        .caa-sec-alt { padding:80px 24px; background:#f8faff; }

        .caa-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:800; color:#1d3a8f; letter-spacing:.08em; text-transform:uppercase; margin-bottom:14px; }
        .caa-eyebrow-line { display:inline-block; width:20px; height:2px; background:#1d3a8f; border-radius:2px; }
        .caa-sec-title { font-size:clamp(26px,3.5vw,40px); font-weight:900; color:#0f172a; letter-spacing:-0.035em; line-height:1.1; margin-bottom:14px; }
        .caa-sec-sub { font-size:16px; color:#64748b; line-height:1.75; max-width:560px; }

        .caa-why-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:48px; }
        @media(max-width:900px) { .caa-why-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:540px) { .caa-why-grid { grid-template-columns:1fr; } }
        .caa-why-card {
          background:white; border-radius:18px; border:1.5px solid #eaecf4;
          padding:22px 20px; box-shadow:0 2px 12px rgba(0,0,0,0.04);
          transition:box-shadow .2s, transform .2s;
        }
        .caa-why-card:hover { box-shadow:0 8px 24px rgba(29,58,143,0.1); transform:translateY(-2px); }
        .caa-why-icon { width:36px; height:36px; border-radius:10px; background:#eef2ff; border:1.5px solid #c7d2fe; display:flex; align-items:center; justify-content:center; margin-bottom:14px; color:#1d3a8f; }
        .caa-why-title { font-size:14px; font-weight:800; color:#0f172a; margin-bottom:6px; letter-spacing:-0.01em; }
        .caa-why-desc { font-size:12.5px; color:#64748b; line-height:1.65; }

        .caa-process { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:48px; }
        @media(max-width:700px) { .caa-process { grid-template-columns:1fr; } }
        .caa-process-card {
          background:white; border-radius:20px; border:1.5px solid #e0e7ff;
          padding:32px 28px; position:relative; overflow:hidden;
          box-shadow:0 2px 16px rgba(29,58,143,0.06);
        }
        .caa-process-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#1d3a8f,#1d3a8f); }
        .caa-process-num {
          width:44px; height:44px; border-radius:12px;
          background:linear-gradient(135deg,#1d3a8f,#1d3a8f);
          color:white; font-size:18px; font-weight:900;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:20px; box-shadow:0 4px 12px rgba(29,58,143,0.25);
        }
        .caa-process-title { font-size:17px; font-weight:800; color:#0f172a; margin-bottom:8px; letter-spacing:-0.02em; }
        .caa-process-desc { font-size:13px; color:#64748b; line-height:1.7; }

        .caa-form-section { background:linear-gradient(180deg,#ffffff 0%,#ffffff 100%); padding:80px 24px; }
        .caa-form-head { text-align:center; max-width:600px; margin:0 auto 40px; }

        .caa-cta-banner { background:linear-gradient(135deg,#0f2060,#1d3a8f 50%,#1d3a8f); padding:72px 24px; text-align:center; }
        .caa-cta-h2 { font-size:clamp(26px,4vw,42px); font-weight:900; color:white; letter-spacing:-0.04em; line-height:1.1; margin-bottom:14px; }
        .caa-cta-sub { font-size:16px; color:rgba(255,255,255,0.75); margin-bottom:32px; max-width:480px; margin-left:auto; margin-right:auto; line-height:1.7; }
        .caa-cta-btn { display:inline-flex; align-items:center; gap:9px; background:white; color:#1d3a8f; padding:15px 36px; border-radius:12px; font-size:15px; font-weight:800; border:none; cursor:pointer; box-shadow:0 4px 20px rgba(0,0,0,0.2); transition:all .25s; }
        .caa-cta-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,0,0,0.3); }

        @media(max-width:860px) {
          .caa-hero { padding:164px 20px 64px; }
          .caa-sec, .caa-sec-alt, .caa-form-section { padding:56px 20px; }
          .caa-inner { padding:0 20px; }
        }
        @media(max-width:640px) {
          .caa-hero { padding:160px 16px 52px; }
          .caa-sec, .caa-sec-alt, .caa-form-section { padding:44px 16px; }
          .caa-inner { padding:0 16px; }
          .caa-hero-sub { font-size:15px; }
          .caa-btn-primary { width:100%; justify-content:center; }
          .caa-hero-stats { display:grid; grid-template-columns:1fr 1fr; width:100%; max-width:320px; }
          .caa-stat { border-right:1px solid #f1f5f9; border-bottom:1px solid #f1f5f9; padding:14px 0; }
        }
      `}</style>

      <Navbar />
      <div className="caa">
        {/* HERO */}
        <section className="caa-hero">
          <div className="caa-hero-blob1" />
          <div className="caa-hero-blob2" />
          <div className="caa-hero-dot-grid" />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="caa-hero-badge">
              <span className="caa-hero-dot" />
              <span className="caa-hero-badge-text">Applications Open — Founding Batch</span>
            </div>

            <h1 className="caa-hero-h1">
              Become a Jobingen<br /><span className="caa-hero-grad">Campus Ambassador</span>
            </h1>

            <p className="caa-hero-sub">
              Represent Jobingen at your college, build leadership skills, work with our core team,
              and help thousands of students discover better career opportunities.
            </p>

            <button className="caa-btn-primary" onClick={scrollToForm}>
              Apply Now
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="caa-hero-stats">
                {STATS.map((s) => (
                  <div className="caa-stat" key={s.label}>
                    <div className="caa-stat-icon">{s.icon}</div>
                    <div className="caa-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY JOIN */}
        <section className="caa-sec">
          <div className="caa-inner">
            <div className="caa-eyebrow"><span className="caa-eyebrow-line" />Why Join</div>
            <h2 className="caa-sec-title">Why Become a Campus Ambassador?</h2>
            <p className="caa-sec-sub">A real leadership role with career benefits that go far beyond a certificate.</p>
            <div className="caa-why-grid">
              {WHY_JOIN.map((item) => (
                <div className="caa-why-card" key={item.title}>
                  <div className="caa-why-icon">
                    <item.icon size={18} strokeWidth={2.2} />
                  </div>
                  <div className="caa-why-title">{item.title}</div>
                  <div className="caa-why-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="caa-sec-alt">
          <div className="caa-inner">
            <div className="caa-eyebrow"><span className="caa-eyebrow-line" />The Process</div>
            <h2 className="caa-sec-title">How It Works</h2>
            <p className="caa-sec-sub">A simple, transparent process from application to onboarding.</p>
            <div className="caa-process">
              {HOW_IT_WORKS.map((s) => (
                <div className="caa-process-card" key={s.num}>
                  <div className="caa-process-num">{s.num}</div>
                  <div className="caa-process-title">{s.title}</div>
                  <div className="caa-process-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* APPLICATION FORM */}
        <section className="caa-form-section" ref={formRef}>
          <div className="caa-form-head">
            <div className="caa-eyebrow" style={{ justifyContent: "center" }}><span className="caa-eyebrow-line" />Apply Now</div>
            <h2 className="caa-sec-title">Campus Ambassador Application</h2>
            <p className="caa-sec-sub" style={{ margin: "0 auto" }}>
              Takes about 2 minutes. Your progress is saved automatically as you go.
            </p>
          </div>
          <CampusAmbassadorWizard />
        </section>

        {/* CTA BANNER */}
        <section className="caa-cta-banner">
          <h2 className="caa-cta-h2">Your Campus. Your Leadership. Your Career.</h2>
          <p className="caa-cta-sub">
            Spots are limited per college. Apply today and become the face of Jobingen at your campus.
          </p>
          <button className="caa-cta-btn" onClick={scrollToForm}>
            Apply as Campus Ambassador
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </section>
      </div>
      <Footer />
    </>
  )
}
