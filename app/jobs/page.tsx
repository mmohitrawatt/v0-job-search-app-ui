import Link from "next/link"
import { createServerClient } from "@/lib/supabase"

type Job = {
  id: string
  title: string
  company: string
  location: string
  slug: string
}

export const revalidate = 60

const STATIC_JOBS: Job[] = [
  {
    id: "1",
    title: "Technology Transfer & IP Manager",
    company: "IIT Kanpur (IITK)",
    location: "Kanpur, Uttar Pradesh",
    slug: "ip-manager-iitk",
  },
]

const CSS = `
  :root {
    --ink:     #09090f;
    --ink2:    #3d3d52;
    --ink3:    #8a8aa8;
    --border:  rgba(10,10,20,0.08);
    --borderM: rgba(10,10,20,0.14);
    --ind:     #1d3a8f;
    --ind-l:   #e8edfe;
    --vio:     #3b52f0;
    --cream:   #f7f7fb;
    --grn:     #10b981;
    --grn-l:   #ecfdf5;
    --shadow-sm: 0 2px 8px rgba(10,10,20,0.05);
    --shadow-md: 0 4px 24px rgba(10,10,20,0.08);
    --shadow-lg: 0 16px 56px rgba(10,10,20,0.11);
    --spring:    cubic-bezier(.34,1.56,.64,1);
    --ease-out:  cubic-bezier(.16,1,.3,1);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; background: var(--cream); }

  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes pulse-s {
    0%,100% { transform: scale(1); opacity: .8; }
    50%      { transform: scale(1.18); opacity: 1; }
  }
  @keyframes float-a {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-16px); }
  }
  @keyframes float-b {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(14px); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ticker-slide {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .shimmer-text {
    background: linear-gradient(90deg, #1d3a8f 0%, #3b52f0 28%, #5a6ef4 48%, #3b52f0 68%, #1d3a8f 100%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 5s linear infinite;
  }
  .top-bar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 3px;
    background: linear-gradient(90deg, #1d3a8f, #3b52f0, #5a6ef4, #3b52f0, #1d3a8f);
    background-size: 200% auto;
    animation: shimmer 4s linear infinite;
  }
  .f0 { animation: fade-up .65s var(--ease-out) .00s both; }
  .f1 { animation: fade-up .65s var(--ease-out) .10s both; }
  .f2 { animation: fade-up .65s var(--ease-out) .20s both; }
  .f3 { animation: fade-up .65s var(--ease-out) .30s both; }
  .f4 { animation: fade-up .65s var(--ease-out) .40s both; }

  /* ── Navbar ─────────────────────────── */
  .nav {
    position: sticky; top: 3px; z-index: 100;
    background: rgba(247,247,251,0.92);
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 2px 20px rgba(0,0,0,0.04);
  }
  .nav-inner {
    max-width: 1140px; margin: 0 auto; padding: 0 32px;
    height: 62px; display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo-link { display: flex; align-items: center; text-decoration: none; }
  .nav-home-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600; color: var(--ink2);
    text-decoration: none; transition: color .15s;
  }
  .nav-home-link:hover { color: var(--ind); }
  .hiring-pill {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 15px; border-radius: 99px;
    background: var(--grn-l); border: 1px solid rgba(16,185,129,.22);
    font-size: 11px; font-weight: 800; color: var(--grn);
    letter-spacing: .04em; text-transform: uppercase;
  }

  /* ── Hero ───────────────────────────── */
  .hero {
    background: linear-gradient(135deg, #060d24 0%, #0d1b45 50%, #142a6a 100%);
    padding: 80px 32px 88px; position: relative; overflow: hidden;
  }
  .hero-orb-1 {
    position: absolute; top: -120px; right: -60px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(59,82,240,.2), transparent 70%);
    animation: float-a 20s ease-in-out infinite;
  }
  .hero-orb-2 {
    position: absolute; bottom: -100px; left: 8%;
    width: 340px; height: 340px; border-radius: 50%;
    background: radial-gradient(circle, rgba(29,58,143,.18), transparent 70%);
    animation: float-b 26s ease-in-out 4s infinite;
  }
  .hero-orb-3 {
    position: absolute; top: 30%; left: 55%;
    width: 180px; height: 180px; border-radius: 50%;
    background: radial-gradient(circle, rgba(93,111,244,.12), transparent 70%);
    animation: float-a 14s ease-in-out 2s infinite;
  }
  .hero-inner { max-width: 1140px; margin: 0 auto; position: relative; z-index: 1; }
  .hero-live {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.14);
    backdrop-filter: blur(8px); border-radius: 99px;
    padding: 7px 18px; margin-bottom: 28px;
    font-size: 11px; font-weight: 800; color: rgba(255,255,255,.9);
    letter-spacing: .07em; text-transform: uppercase;
  }
  .hero-h1 {
    font-size: clamp(38px, 5.5vw, 64px); font-weight: 900;
    color: white; line-height: 1.04; letter-spacing: -.035em;
    margin: 0 0 20px;
  }
  .hero-accent { color: #93c5fd; }
  .hero-sub {
    font-size: 17px; color: rgba(255,255,255,.6);
    line-height: 1.75; max-width: 500px; margin: 0 0 44px;
  }
  .hero-stats { display: flex; align-items: center; gap: 0; flex-wrap: wrap; }
  .hero-stat {
    padding: 0 32px;
    border-right: 1px solid rgba(255,255,255,.1);
  }
  .hero-stat:first-child { padding-left: 0; }
  .hero-stat:last-child  { border-right: none; }
  .hero-stat-n { font-size: 28px; font-weight: 900; color: white; line-height: 1; }
  .hero-stat-l { font-size: 12px; color: rgba(255,255,255,.45); margin-top: 3px; font-weight: 600; }

  /* Culture ticker */
  .ticker-wrap {
    margin-top: 56px; overflow: hidden;
    mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
  }
  .ticker-track {
    display: flex; width: max-content; gap: 10px;
    animation: ticker-slide 30s linear infinite;
  }
  .ticker-pill {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 99px; white-space: nowrap;
    background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.11);
    font-size: 12px; font-weight: 700; color: rgba(255,255,255,.75);
  }

  /* ── Why Join section ───────────────── */
  .why-section { padding: 80px 32px; }
  .why-inner { max-width: 1140px; margin: 0 auto; }
  .sec-label {
    font-size: 11px; font-weight: 800; text-transform: uppercase;
    letter-spacing: .1em; color: var(--ind); margin-bottom: 10px;
  }
  .sec-title {
    font-size: clamp(26px, 3.5vw, 38px); font-weight: 900;
    color: var(--ink); letter-spacing: -.03em; margin: 0 0 12px;
  }
  .sec-sub {
    font-size: 15px; color: var(--ink2); line-height: 1.75;
    max-width: 460px; margin: 0 0 48px;
  }
  .values-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
  .val-card {
    background: white; border-radius: 22px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow-sm);
    padding: 26px 22px;
    transition: transform .28s var(--ease-out), box-shadow .28s ease, border-color .28s ease;
  }
  .val-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(29,58,143,.12);
  }
  .val-icon {
    width: 50px; height: 50px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; margin-bottom: 16px;
    transition: transform .28s var(--spring);
  }
  .val-card:hover .val-icon { transform: scale(1.12) rotate(-5deg); }
  .val-title { font-size: 15px; font-weight: 800; color: var(--ink); margin: 0 0 7px; }
  .val-desc  { font-size: 13px; color: var(--ink2); line-height: 1.65; margin: 0; }

  /* ── Jobs section ───────────────────── */
  .jobs-section { padding: 0 32px 88px; }
  .jobs-inner   { max-width: 1140px; margin: 0 auto; }
  .jobs-head    { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .jobs-h2      { font-size: 22px; font-weight: 900; color: var(--ink); letter-spacing: -.02em; }
  .cnt-badge    {
    display: inline-block; margin-left: 10px;
    font-size: 12px; font-weight: 800; color: var(--ind);
    background: var(--ind-l); padding: 3px 11px; border-radius: 99px;
    vertical-align: middle;
  }

  /* Job card */
  .job-card {
    display: flex; align-items: center; justify-content: space-between; gap: 20px;
    background: white; border-radius: 22px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow-sm);
    padding: 26px 28px; text-decoration: none; color: inherit;
    margin-bottom: 14px; position: relative; overflow: hidden;
    transition: transform .25s var(--ease-out), box-shadow .25s ease, border-color .25s ease;
  }
  .job-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(29,58,143,.3), transparent);
    opacity: 0; transition: opacity .25s ease;
  }
  .job-card:hover { transform: translateY(-4px); box-shadow: 0 14px 48px rgba(29,58,143,.12); border-color: rgba(29,58,143,.18); }
  .job-card:hover::before { opacity: 1; }
  .job-type {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em;
    padding: 3px 10px; border-radius: 6px;
    background: var(--ind-l); color: var(--ind); margin-bottom: 10px;
  }
  .job-title { font-size: 19px; font-weight: 900; color: var(--ink); margin: 0 0 10px; letter-spacing: -.025em; }
  .job-meta  { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .job-meta-i {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 13px; color: var(--ink2); font-weight: 500;
  }
  .job-meta-dot { color: var(--borderM); font-size: 16px; line-height: 1; }
  .job-live {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 700; color: var(--grn);
  }
  .job-btn {
    flex-shrink: 0;
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #1d3a8f 0%, #2548c5 100%);
    color: white; font-size: 13px; font-weight: 800;
    padding: 13px 26px; border-radius: 13px; text-decoration: none;
    box-shadow: 0 4px 18px rgba(29,58,143,.28);
    transition: transform .22s var(--spring), box-shadow .22s ease;
    white-space: nowrap;
  }
  .job-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 10px 32px rgba(29,58,143,.42); }

  /* Empty state */
  .empty {
    text-align: center; padding: 88px 20px;
    background: white; border-radius: 24px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow-sm);
  }
  .empty-ico  { font-size: 48px; margin-bottom: 16px; }
  .empty-h    { font-size: 20px; font-weight: 800; color: var(--ink); margin-bottom: 8px; }
  .empty-sub  { font-size: 14px; color: var(--ink3); line-height: 1.65; }

  /* ── Footer ─────────────────────────── */
  .footer {
    background: white; border-top: 1px solid var(--border);
    padding: 28px 32px;
  }
  .footer-inner {
    max-width: 1140px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;
  }
  .footer-links { display: flex; align-items: center; gap: 22px; }
  .f-link { font-size: 13px; color: var(--ink3); font-weight: 600; text-decoration: none; transition: color .15s; }
  .f-link:hover { color: var(--ind); }

  /* ── Responsive ──────────────────────── */
  @media (max-width: 900px) {
    .values-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .hero { padding: 60px 20px 68px; }
    .why-section, .jobs-section { padding-left: 16px; padding-right: 16px; }
    .hero-stat { padding: 0 20px; }
    .job-card { flex-direction: column; align-items: flex-start; }
    .job-btn  { width: 100%; justify-content: center; }
    .footer-inner { flex-direction: column; align-items: center; text-align: center; }
    .nav-inner { padding: 0 16px; }
  }
  @media (max-width: 540px) {
    .values-grid { grid-template-columns: 1fr; }
    .hero-stats  { flex-direction: column; align-items: flex-start; gap: 12px; }
    .hero-stat   { border-right: none; padding: 0; }
  }
`

const VALUES = [
  { icon: "🚀", bg: "#e8edfe", title: "High Impact Work",    desc: "Every feature you build helps thousands of Indian professionals land better jobs and grow their careers." },
  { icon: "🤖", bg: "#f0fdf4", title: "AI-First Culture",    desc: "We integrate AI into everything — product, tools, workflows. Stay at the cutting edge every day." },
  { icon: "🏡", bg: "#fff7ed", title: "Remote Friendly",     desc: "Work from anywhere in India. Great talent exists everywhere, not just metros." },
  { icon: "⚡", bg: "#fdf4ff", title: "Fast & Flat",         desc: "Join early, grow fast. We move quick, ship often, and give real ownership to people who earn it." },
  { icon: "💡", bg: "#fffbeb", title: "Learning First",      desc: "We invest in your growth — courses, conferences, dedicated time to explore new ideas and skills." },
  { icon: "🤝", bg: "#fff1f2", title: "No Micromanagement",  desc: "Your ideas get heard and shipped. We hire smart people and trust them to do great work independently." },
]

const CULTURE = [
  "🌏 Remote First", "⚡ Ship Fast", "🤖 AI Tools Built-in",
  "📚 L&D Budget", "🏆 Real Ownership", "💬 Radical Transparency",
  "🌱 Fast Career Growth", "🎯 Mission Driven", "🧪 Experiment Freely",
]

export default async function JobsPage() {
  let jobs: Job[] = STATIC_JOBS
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from("jobs")
      .select("id, title, company, location, slug")
      .order("created_at", { ascending: false })
    if (data && data.length > 0) jobs = data
  } catch {
    // fallback to static
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="top-bar" />
      <div style={{ paddingTop: 3 }}>

        {/* ── Navbar ── */}
        <header className="nav">
          <div className="nav-inner">
            {/* Logo */}
            <Link href="/pre-launch" className="nav-logo-link">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/jobingen-logo.png" alt="Jobingen" style={{ height: 46, width: "auto" }} />
            </Link>

            {/* Right */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Link href="/pre-launch" className="nav-home-link">
                <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Home
              </Link>
              <span className="hiring-pill">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--grn)", display: "inline-block", animation: "pulse-s 1.6s ease-in-out infinite" }} />
                We&apos;re Hiring
              </span>
            </div>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-orb-1" />
          <div className="hero-orb-2" />
          <div className="hero-orb-3" />
          <div className="hero-inner">

            <div className="hero-live f0">
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse-s 1.5s ease-in-out infinite" }} />
              {jobs.length} Open Position{jobs.length !== 1 ? "s" : ""} · Actively Hiring
            </div>

            <h1 className="hero-h1 f1">
              Build the future of<br />
              <span className="hero-accent">job search in India</span>
            </h1>

            <p className="hero-sub f2">
              Join Jobingen and help millions of Indian professionals find their dream jobs.
              We&apos;re building India&apos;s most intelligent, AI-powered job platform.
            </p>

            <div className="hero-stats f3">
              {[
                { n: "50K+",    l: "Professionals Helped" },
                { n: "10+",     l: "Portals Aggregated" },
                { n: "AI-First",l: "Product Culture" },
                { n: "2026",    l: "Founded" },
              ].map((s) => (
                <div className="hero-stat" key={s.l}>
                  <div className="hero-stat-n">{s.n}</div>
                  <div className="hero-stat-l">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Ticker */}
            <div className="ticker-wrap f4">
              <div className="ticker-track">
                {[...CULTURE, ...CULTURE].map((p, i) => (
                  <span className="ticker-pill" key={i}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Join ── */}
        <section className="why-section">
          <div className="why-inner">
            <div className="sec-label">Why Jobingen</div>
            <h2 className="sec-title">A place where your work matters</h2>
            <p className="sec-sub">
              Small team, big mission. Ship fast, learn constantly, own your work.
              If that excites you — you&apos;ll love it here.
            </p>
            <div className="values-grid">
              {VALUES.map((v) => (
                <div className="val-card" key={v.title}>
                  <div className="val-icon" style={{ background: v.bg }}>{v.icon}</div>
                  <h3 className="val-title">{v.title}</h3>
                  <p className="val-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Positions ── */}
        <section className="jobs-section">
          <div className="jobs-inner">
            <div className="sec-label">Join the Team</div>
            <div className="jobs-head">
              <h2 className="jobs-h2">
                Open Positions
                <span className="cnt-badge">{jobs.length}</span>
              </h2>
            </div>

            {!jobs || jobs.length === 0 ? (
              <div className="empty">
                <div className="empty-ico">💼</div>
                <div className="empty-h">No open positions right now</div>
                <div className="empty-sub">
                  We&apos;re growing fast — check back soon.<br />
                  Or reach out at <strong style={{ color: "var(--ind)" }}>careers@jobingen.com</strong>
                </div>
              </div>
            ) : (
              <div>
                {jobs.map((job: Job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jobingen-logo.png" alt="Jobingen" style={{ height: 38, width: "auto" }} />
            <p style={{ fontSize: 13, color: "var(--ink3)" }}>
              © {new Date().getFullYear()} Jobingen. All rights reserved.
            </p>
            <div className="footer-links">
              <Link href="/pre-launch" className="f-link">Home</Link>
              <Link href="/register"   className="f-link">Bootcamp</Link>
              <Link href="/dashboard"  className="f-link">Open App</Link>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.slug}`} className="job-card">
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="job-type">
          <svg width="7" height="7" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4"/></svg>
          Full Time · Remote
        </div>
        <h3 className="job-title">{job.title}</h3>
        <div className="job-meta">
          <span className="job-meta-i">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="2" stroke="var(--ink3)" strokeWidth="1.8"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="var(--ink3)" strokeWidth="1.8"/>
            </svg>
            {job.company}
          </span>
          <span className="job-meta-dot">·</span>
          <span className="job-meta-i">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="var(--ink3)"/>
            </svg>
            {job.location}
          </span>
          <span className="job-meta-dot">·</span>
          <span className="job-live">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--grn)", display: "inline-block", animation: "pulse-s 1.8s ease-in-out infinite" }} />
            Actively Hiring
          </span>
        </div>
      </div>
      <div className="job-btn">
        View &amp; Apply
        <svg width="14" height="14" fill="none" viewBox="0 0 18 18">
          <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  )
}
