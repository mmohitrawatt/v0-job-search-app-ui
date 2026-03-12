import Link from "next/link"
import { createServerClient } from "@/lib/supabase"

type Job = {
  id: string
  title: string
  company: string
  location: string
  slug: string
  type?: string
  department?: string
  experience?: string
  mode?: string
}

export const revalidate = 60

const STATIC_JOBS: Job[] = [
  {
    id: "1",
    title: "Technology Transfer & IP Manager",
    company: "IIT Kanpur (IITK)",
    location: "Kanpur, Uttar Pradesh",
    slug: "ip-manager-iitk",
    type: "Full Time",
    department: "Research & Innovation",
    experience: "3–7 years",
    mode: "On-site",
  },
]

const CSS = `
  :root {
    --ink:    #09090f;
    --ink2:   #3d3d52;
    --ink3:   #8a8aa8;
    --border: rgba(10,10,20,0.08);
    --borderM:rgba(10,10,20,0.14);
    --ind:    #1d3a8f;
    --ind-l:  #e8edfe;
    --grn:    #10b981;
    --grn-l:  #ecfdf5;
    --amb:    #f59e0b;
    --amb-l:  #fffbeb;
    --vio:    #7c3aed;
    --vio-l:  #f5f3ff;
    --cream:  #f4f6fb;
    --white:  #ffffff;
    --shadow-sm: 0 2px 8px rgba(10,10,20,0.06);
    --shadow-md: 0 8px 32px rgba(10,10,20,0.10);
    --shadow-lg: 0 20px 64px rgba(10,10,20,0.13);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; background: var(--cream); color: var(--ink); }

  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes pulse-dot {
    0%,100% { transform: scale(1); opacity: .75; }
    50%      { transform: scale(1.3); opacity: 1; }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .top-bar {
    height: 3px;
    background: linear-gradient(90deg, #1d3a8f, #3b52f0, #5a6ef4, #3b52f0, #1d3a8f);
    background-size: 200% auto;
    animation: shimmer 4s linear infinite;
  }

  /* ── NAV ── */
  .nav {
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 50;
  }
  .nav-inner {
    max-width: 1100px; margin: 0 auto; padding: 0 28px;
    height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .nav-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--grn-l); border: 1px solid rgba(16,185,129,.2);
    padding: 5px 13px; border-radius: 99px;
    font-size: 12px; font-weight: 700; color: var(--grn);
  }
  .nav-jobs-link {
    font-size: 13px; font-weight: 700; color: var(--ink2); text-decoration: none;
    padding: 7px 14px; border-radius: 10px; border: 1.5px solid var(--border);
    background: white; transition: all .18s ease;
  }
  .nav-jobs-link:hover { border-color: rgba(29,58,143,.25); color: var(--ind); background: var(--ind-l); }

  /* ── HERO ── */
  .hero {
    background: linear-gradient(135deg, #060e2a 0%, #0d1b45 40%, #1d3a8f 100%);
    padding: 64px 28px 72px; position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: -100px; right: -60px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(59,82,240,.22), transparent 70%);
    pointer-events: none;
  }
  .hero::after {
    content: ''; position: absolute; bottom: -80px; left: 15%;
    width: 360px; height: 360px; border-radius: 50%;
    background: radial-gradient(circle, rgba(29,58,143,.18), transparent 70%);
    pointer-events: none;
  }
  .hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15);
    border-radius: 99px; padding: 6px 16px; margin-bottom: 22px;
    font-size: 11px; font-weight: 800; color: rgba(255,255,255,.9);
    letter-spacing: .07em; text-transform: uppercase; animation: fade-up .5s ease both;
  }
  .hero-h1 {
    font-size: clamp(28px, 4vw, 48px); font-weight: 900;
    color: white; line-height: 1.08; letter-spacing: -.035em; margin: 0 0 16px;
    animation: fade-up .5s .1s ease both;
  }
  .hero-sub {
    font-size: 16px; color: rgba(255,255,255,.6); line-height: 1.7;
    max-width: 460px; margin-bottom: 32px;
    animation: fade-up .5s .2s ease both;
  }
  .hero-stats {
    display: flex; gap: 24px; flex-wrap: wrap;
    animation: fade-up .5s .3s ease both;
  }
  .hero-stat {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
    border-radius: 12px; padding: 10px 18px;
  }
  .hero-stat-n { font-size: 22px; font-weight: 900; color: white; line-height: 1; }
  .hero-stat-l { font-size: 11px; color: rgba(255,255,255,.55); font-weight: 600; margin-top: 1px; }

  /* ── MAIN CONTENT ── */
  .page { max-width: 1100px; margin: 0 auto; padding: 40px 28px 80px; display: grid; grid-template-columns: 260px 1fr; gap: 28px; align-items: start; }
  @media (max-width: 860px) { .page { grid-template-columns: 1fr; } }

  /* ── SIDEBAR / FILTERS ── */
  .sidebar { background: white; border-radius: 20px; border: 1.5px solid var(--border); padding: 24px; box-shadow: var(--shadow-sm); position: sticky; top: 88px; }
  .sidebar-title { font-size: 13px; font-weight: 800; color: var(--ink); margin-bottom: 16px; letter-spacing: -.01em; }
  .filter-group { margin-bottom: 20px; }
  .filter-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--ink3); margin-bottom: 10px; }
  .filter-pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 600; padding: 5px 12px;
    border-radius: 8px; border: 1.5px solid var(--border);
    background: var(--cream); color: var(--ink2); cursor: pointer;
    margin: 0 6px 6px 0; transition: all .15s ease; user-select: none;
  }
  .filter-pill.active, .filter-pill:hover { border-color: var(--ind); background: var(--ind-l); color: var(--ind); font-weight: 700; }
  .sidebar-divider { height: 1px; background: var(--border); margin: 18px 0; }
  .alert-box {
    background: var(--ind-l); border: 1.5px solid rgba(29,58,143,.15);
    border-radius: 14px; padding: 14px; margin-top: 4px;
  }
  .alert-box p { font-size: 12px; color: var(--ind); font-weight: 600; line-height: 1.5; margin-bottom: 10px; }
  .alert-btn {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    width: 100%; padding: 9px; border-radius: 10px;
    background: var(--ind); color: white; font-size: 12px; font-weight: 800;
    text-decoration: none; border: none; cursor: pointer;
    transition: opacity .15s ease;
  }
  .alert-btn:hover { opacity: .88; }

  /* ── JOBS PANEL ── */
  .jobs-panel {}
  .jobs-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 10px; }
  .jobs-title-row { display: flex; align-items: center; gap: 10px; }
  .jobs-heading { font-size: 18px; font-weight: 900; color: var(--ink); letter-spacing: -.02em; }
  .jobs-count { font-size: 12px; font-weight: 800; color: var(--ind); background: var(--ind-l); padding: 3px 10px; border-radius: 99px; }
  .jobs-sort { font-size: 12px; font-weight: 600; color: var(--ink3); display: flex; align-items: center; gap: 6px; }

  /* ── JOB CARD ── */
  .job-card {
    background: white; border-radius: 20px; border: 1.5px solid var(--border);
    box-shadow: var(--shadow-sm); padding: 0; margin-bottom: 14px;
    text-decoration: none; color: inherit; display: block;
    transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
    overflow: hidden;
  }
  .job-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: rgba(29,58,143,.2); }
  .job-card-body { padding: 22px 24px 18px; display: flex; gap: 16px; align-items: flex-start; }
  .job-logo {
    width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; font-weight: 900; color: white;
    background: linear-gradient(135deg, #1d3a8f, #3b52f0);
    border: 2px solid rgba(29,58,143,.1);
    letter-spacing: -.02em;
  }
  .job-info { flex: 1; min-width: 0; }
  .job-title { font-size: 16px; font-weight: 800; color: var(--ink); margin: 0 0 5px; letter-spacing: -.02em; line-height: 1.25; }
  .job-company { font-size: 13px; font-weight: 600; color: var(--ink2); margin-bottom: 10px; }
  .job-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .tag {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 700; padding: 3px 9px;
    border-radius: 7px; letter-spacing: .01em;
  }
  .tag-type  { background: var(--ind-l); color: var(--ind); }
  .tag-mode  { background: var(--vio-l); color: var(--vio); }
  .tag-dept  { background: #f0fdf4; color: #059669; }
  .tag-exp   { background: var(--amb-l); color: #b45309; }
  .tag-live  { background: var(--grn-l); color: var(--grn); }
  .job-meta-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .job-meta-item { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; color: var(--ink3); font-weight: 500; }
  .job-card-footer {
    padding: 12px 24px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    background: #fafbff;
  }
  .job-posted { font-size: 11px; color: var(--ink3); font-weight: 500; }
  .job-apply-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: linear-gradient(135deg, #1d3a8f, #2548c5);
    color: white; font-size: 12px; font-weight: 800;
    padding: 8px 18px; border-radius: 10px; text-decoration: none;
    box-shadow: 0 3px 12px rgba(29,58,143,.28);
    transition: transform .18s ease, box-shadow .18s ease;
    white-space: nowrap;
  }
  .job-apply-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(29,58,143,.38); }
  .job-save-btn {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 700; color: var(--ink3);
    padding: 7px 14px; border-radius: 10px;
    border: 1.5px solid var(--border); background: white;
    text-decoration: none; transition: all .18s ease;
    white-space: nowrap;
  }
  .job-save-btn:hover { border-color: rgba(29,58,143,.25); color: var(--ind); background: var(--ind-l); }

  /* ── EMPTY ── */
  .empty { text-align: center; padding: 72px 24px; background: white; border-radius: 20px; border: 1.5px solid var(--border); }

  /* ── FOOTER ── */
  .footer { border-top: 1px solid var(--border); background: white; padding: 24px 28px; }
  .footer-inner {
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
  }
  .f-link { font-size: 13px; color: var(--ink3); font-weight: 600; text-decoration: none; margin-left: 18px; }
  .f-link:hover { color: var(--ind); }

  @media (max-width: 640px) {
    .hero { padding: 44px 16px 52px; }
    .hero-stats { gap: 12px; }
    .page { padding: 24px 16px 60px; gap: 20px; }
    .job-card-body { flex-direction: column; gap: 12px; }
    .job-card-footer { flex-direction: column; align-items: stretch; gap: 8px; }
    .job-apply-btn, .job-save-btn { justify-content: center; width: 100%; }
    .sidebar { position: static; }
  }
`

function getInitials(company: string) {
  return company.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

function getGradient(company: string) {
  const gradients = [
    "linear-gradient(135deg,#1d3a8f,#3b52f0)",
    "linear-gradient(135deg,#0f766e,#14b8a6)",
    "linear-gradient(135deg,#7c3aed,#a78bfa)",
    "linear-gradient(135deg,#b45309,#f59e0b)",
    "linear-gradient(135deg,#be185d,#f472b6)",
  ]
  const idx = company.charCodeAt(0) % gradients.length
  return gradients[idx]
}

export default async function JobsPage() {
  let jobs: Job[] = STATIC_JOBS
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from("jobs")
      .select("id, title, company, location, slug, type, department, experience, mode")
      .order("created_at", { ascending: false })
    if (data && data.length > 0) jobs = data
  } catch {
    // fallback to static
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="top-bar" />

      {/* Navbar */}
      <header className="nav">
        <div className="nav-inner">
          <Link href="/pre-launch" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jobingen-logo.png" alt="Jobingen" style={{ height: 64, width: "auto" }} />
          </Link>
          <div className="nav-right">
            <div className="nav-badge">
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--grn)", display: "inline-block", animation: "pulse-dot 1.6s ease-in-out infinite" }} />
              Actively Hiring
            </div>
            <Link href="/register" className="nav-jobs-link">Join Bootcamp</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            Jobingen is hiring
          </div>
          <h1 className="hero-h1">
            Build the future of<br />job search in India
          </h1>
          <p className="hero-sub">
            Join a fast-growing team helping millions of Indian professionals find better opportunities.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div>
                <div className="hero-stat-n">{jobs.length}</div>
                <div className="hero-stat-l">Open Roles</div>
              </div>
            </div>
            <div className="hero-stat">
              <div>
                <div className="hero-stat-n">100%</div>
                <div className="hero-stat-l">Remote Friendly</div>
              </div>
            </div>
            <div className="hero-stat">
              <div>
                <div className="hero-stat-n">Fast</div>
                <div className="hero-stat-l">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="page">

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-title">Filter Jobs</div>

          <div className="filter-group">
            <div className="filter-label">Job Type</div>
            <span className="filter-pill active">All</span>
            <span className="filter-pill">Full Time</span>
            <span className="filter-pill">Part Time</span>
            <span className="filter-pill">Internship</span>
          </div>

          <div className="filter-group">
            <div className="filter-label">Work Mode</div>
            <span className="filter-pill active">All</span>
            <span className="filter-pill">Remote</span>
            <span className="filter-pill">On-site</span>
            <span className="filter-pill">Hybrid</span>
          </div>

          <div className="filter-group">
            <div className="filter-label">Department</div>
            <span className="filter-pill active">All</span>
            <span className="filter-pill">Engineering</span>
            <span className="filter-pill">Product</span>
            <span className="filter-pill">Research</span>
            <span className="filter-pill">Operations</span>
          </div>

          <div className="sidebar-divider" />

          <div className="alert-box">
            <p>Get notified when new roles matching your profile are posted.</p>
            <Link href="/register" className="alert-btn">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Set Job Alert
            </Link>
          </div>
        </aside>

        {/* Jobs */}
        <main>
          <div className="jobs-header">
            <div className="jobs-title-row">
              <span className="jobs-heading">Current Openings</span>
              <span className="jobs-count">{jobs.length} job{jobs.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="jobs-sort">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              Sort: Newest First
            </div>
          </div>

          {!jobs || jobs.length === 0 ? (
            <div className="empty">
              <div style={{ fontSize: 40, marginBottom: 14 }}>💼</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", marginBottom: 8 }}>No open positions right now</div>
              <div style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.65 }}>We&apos;re growing fast — check back soon for new opportunities.</div>
            </div>
          ) : (
            <div>
              {jobs.map((job: Job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <p style={{ fontSize: 13, color: "var(--ink3)" }}>© {new Date().getFullYear()} Jobingen. All rights reserved.</p>
          <div>
            <Link href="/pre-launch" className="f-link">Home</Link>
            <Link href="/register"   className="f-link">Bootcamp</Link>
          </div>
        </div>
      </footer>
    </>
  )
}

function JobCard({ job }: { job: Job }) {
  const type       = job.type       || "Full Time"
  const mode       = job.mode       || "On-site"
  const dept       = job.department || "General"
  const experience = job.experience || "Open"

  return (
    <div className="job-card">
      <div className="job-card-body">
        {/* Logo */}
        <div className="job-logo" style={{ background: getGradient(job.company) }}>
          {getInitials(job.company)}
        </div>

        {/* Info */}
        <div className="job-info">
          <h3 className="job-title">{job.title}</h3>
          <div className="job-company">{job.company}</div>

          <div className="job-tags">
            <span className="tag tag-type">{type}</span>
            <span className="tag tag-mode">{mode}</span>
            <span className="tag tag-dept">{dept}</span>
            <span className="tag tag-exp">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              {experience}
            </span>
            <span className="tag tag-live">
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--grn)", display: "inline-block" }} />
              Hiring Now
            </span>
          </div>

          <div className="job-meta-row">
            <span className="job-meta-item">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="currentColor"/></svg>
              {job.location}
            </span>
          </div>
        </div>
      </div>

      <div className="job-card-footer">
        <span className="job-posted">Posted recently · via Jobingen</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href={`/jobs/${job.slug}`} className="job-save-btn">
            View Details
          </Link>
          <Link href={`/jobs/${job.slug}`} className="job-apply-btn">
            Apply Now
            <svg width="12" height="12" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
