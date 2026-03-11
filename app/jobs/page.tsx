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
    --ink:    #09090f;
    --ink2:   #3d3d52;
    --ink3:   #8a8aa8;
    --border: rgba(10,10,20,0.08);
    --ind:    #1d3a8f;
    --ind-l:  #e8edfe;
    --grn:    #10b981;
    --cream:  #f7f7fb;
    --shadow-sm: 0 2px 8px rgba(10,10,20,0.06);
    --shadow-md: 0 6px 28px rgba(10,10,20,0.09);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; background: var(--cream); }

  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position: 400% center; }
  }
  @keyframes pulse-s {
    0%,100% { transform: scale(1); opacity: .75; }
    50%      { transform: scale(1.2);  opacity: 1; }
  }

  .top-bar {
    height: 3px;
    background: linear-gradient(90deg, #1d3a8f, #3b52f0, #5a6ef4, #3b52f0, #1d3a8f);
    background-size: 200% auto;
    animation: shimmer 4s linear infinite;
  }

  /* Navbar */
  .nav {
    background: rgba(247,247,251,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 50;
  }
  .nav-inner {
    max-width: 1000px; margin: 0 auto; padding: 0 24px;
    height: 72px; display: flex; align-items: center; justify-content: space-between;
  }

  /* Hero */
  .hero {
    background: linear-gradient(135deg, #0d1b45 0%, #1d3a8f 100%);
    padding: 60px 24px 64px;
  }
  .hero-inner { max-width: 1000px; margin: 0 auto; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15);
    border-radius: 99px; padding: 5px 14px; margin-bottom: 20px;
    font-size: 11px; font-weight: 800; color: rgba(255,255,255,.9);
    letter-spacing: .06em; text-transform: uppercase;
  }
  .hero-h1 {
    font-size: clamp(30px, 4.5vw, 46px); font-weight: 900;
    color: white; line-height: 1.08; letter-spacing: -.03em; margin: 0 0 14px;
  }
  .hero-sub { font-size: 16px; color: rgba(255,255,255,.6); line-height: 1.7; max-width: 440px; }

  /* Jobs */
  .content { max-width: 1000px; margin: 0 auto; padding: 40px 24px 72px; }
  .section-label {
    font-size: 11px; font-weight: 800; text-transform: uppercase;
    letter-spacing: .1em; color: var(--ind); margin-bottom: 6px;
  }
  .section-head {
    display: flex; align-items: center; margin-bottom: 20px;
  }
  .section-title { font-size: 20px; font-weight: 900; color: var(--ink); }
  .count {
    margin-left: 10px; font-size: 12px; font-weight: 800;
    color: var(--ind); background: var(--ind-l);
    padding: 2px 10px; border-radius: 99px;
  }

  /* Job card */
  .job-card {
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    background: white; border-radius: 18px; border: 1.5px solid var(--border);
    box-shadow: var(--shadow-sm); padding: 22px 24px;
    text-decoration: none; color: inherit; margin-bottom: 12px;
    transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
  }
  .job-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: rgba(29,58,143,.18);
  }
  .job-tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 10px; font-weight: 800; text-transform: uppercase;
    letter-spacing: .05em; padding: 2px 9px; border-radius: 5px;
    background: var(--ind-l); color: var(--ind); margin-bottom: 8px;
  }
  .job-title { font-size: 17px; font-weight: 800; color: var(--ink); margin: 0 0 8px; letter-spacing: -.02em; }
  .job-meta  { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .job-meta-i { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; color: var(--ink2); }
  .job-live  { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 700; color: var(--grn); }
  .job-btn {
    flex-shrink: 0;
    display: inline-flex; align-items: center; gap: 7px;
    background: linear-gradient(135deg, #1d3a8f, #2548c5);
    color: white; font-size: 13px; font-weight: 800;
    padding: 11px 22px; border-radius: 11px; text-decoration: none;
    box-shadow: 0 4px 14px rgba(29,58,143,.28);
    transition: transform .2s ease, box-shadow .2s ease;
    white-space: nowrap;
  }
  .job-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(29,58,143,.4); }

  /* Empty */
  .empty {
    text-align: center; padding: 72px 20px;
    background: white; border-radius: 20px; border: 1.5px solid var(--border);
  }

  /* Footer */
  .footer { border-top: 1px solid var(--border); background: white; padding: 22px 24px; }
  .footer-inner {
    max-width: 1000px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
  }
  .f-link { font-size: 13px; color: var(--ink3); font-weight: 600; text-decoration: none; margin-left: 18px; }
  .f-link:hover { color: var(--ind); }

  /* Responsive */
  @media (max-width: 600px) {
    .job-card { flex-direction: column; align-items: flex-start; }
    .job-btn  { width: 100%; justify-content: center; }
    .footer-inner { flex-direction: column; align-items: center; }
  }
`

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

      {/* Navbar */}
      <header className="nav">
        <div className="nav-inner">
          <Link href="/pre-launch" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jobingen-logo.png" alt="Jobingen" style={{ height: 64, width: "auto" }} />
          </Link>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--ind-l)", border: "1px solid rgba(29,58,143,.18)",
            padding: "5px 13px", borderRadius: 99,
            fontSize: 12, fontWeight: 700, color: "var(--ind)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--grn)", display: "inline-block", animation: "pulse-s 1.6s ease-in-out infinite" }} />
            We&apos;re Hiring
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            {jobs.length} Open Position{jobs.length !== 1 ? "s" : ""}
          </div>
          <h1 className="hero-h1">
            Build the future of<br />job search in India
          </h1>
          <p className="hero-sub">
            Join Jobingen and help millions of Indian professionals find their dream jobs.
          </p>
        </div>
      </section>

      {/* Jobs */}
      <main className="content">
        <div className="section-label">Open Positions</div>
        <div className="section-head">
          <span className="section-title">Current Openings</span>
          <span className="count">{jobs.length}</span>
        </div>

        {!jobs || jobs.length === 0 ? (
          <div className="empty">
            <div style={{ fontSize: 40, marginBottom: 12 }}>💼</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)", marginBottom: 8 }}>No open positions right now</div>
            <div style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.65 }}>
              We&apos;re growing fast — check back soon.
            </div>
          </div>
        ) : (
          <div>
            {jobs.map((job: Job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>

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
  return (
    <Link href={`/jobs/${job.slug}`} className="job-card">
      <div style={{ flex: 1 }}>
        <div className="job-tag">
          <svg width="7" height="7" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4"/></svg>
          Full Time
        </div>
        <h3 className="job-title">{job.title}</h3>
        <div className="job-meta">
          <span className="job-meta-i">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="2" stroke="var(--ink3)" strokeWidth="1.8"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="var(--ink3)" strokeWidth="1.8"/>
            </svg>
            {job.company}
          </span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span className="job-meta-i">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="var(--ink3)"/>
            </svg>
            {job.location}
          </span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span className="job-live">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--grn)", display: "inline-block" }} />
            Actively Hiring
          </span>
        </div>
      </div>
      <div className="job-btn">
        View Job
        <svg width="13" height="13" fill="none" viewBox="0 0 18 18">
          <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  )
}
