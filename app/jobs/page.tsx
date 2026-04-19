import Link from "next/link"
import { createServerClient } from "@/lib/supabase"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

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
  description?: string
  stipend?: string
  duration?: string
  applyUrl?: string
}

export const revalidate = 60

const STATIC_JOBS: Job[] = [
  {
    id: "10",
    title: "IP & Technology Transfer Associate",
    company: "Top Institute of India",
    location: "Leading Science & Technology Campus",
    slug: "patent-research-analyst-intern",
    type: "Contractual",
    department: "Intellectual Property",
    experience: "Fresher / 0–2 yr",
    mode: "On-site",
    stipend: "\u20B980,000\u20131,00,000/mo",
    description: "Work at the intersection of innovation, research, and intellectual property. Support patent analysis, technology commercialization, and IP management alongside senior faculty and innovation leaders at one of India\u2019s top institutes.",
  },
  {
    id: "2",
    title: "AI Engineer Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "ai-engineer-intern-trippyway",
    type: "Internship",
    department: "Engineering & AI",
    experience: "Fresher / 0–1 yr",
    mode: "Remote",
    stipend: "₹8,000–15,000/mo",
    duration: "3–6 months",
    description: "Work on real AI features — LLMs, RAG pipelines, recommendation engines, and travel intelligence systems. You'll ship production-grade code alongside senior engineers and build AI that real users interact with. This is not a watch-and-learn internship — you own features end-to-end and see your work live.",
  },
  {
    id: "3",
    title: "UI/UX Design Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "uiux-intern-trippyway",
    type: "Internship",
    department: "Design",
    experience: "Fresher / 0–1 yr",
    mode: "Remote",
    stipend: "₹6,000–10,000/mo",
    duration: "3–6 months",
    description: "Design the future of travel discovery. From user research and wireframes to high-fidelity Figma prototypes, you'll shape how people plan their trips. You'll work directly with founders on product strategy, run usability tests, and graduate with a portfolio of real shipped work — not concept projects.",
  },
  {
    id: "4",
    title: "HR & Talent Acquisition Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "hr-intern-trippyway",
    type: "Internship",
    department: "Human Resources",
    experience: "Fresher / 0–1 yr",
    mode: "Remote",
    stipend: "₹5,000–8,000/mo",
    duration: "3 months",
    description: "Help build the team that builds the product. You'll source and screen candidates, coordinate interviews, manage onboarding, and help shape a culture that attracts top talent. High-ownership role — your decisions directly influence who joins Trippyway and how fast we grow.",
  },
  {
    id: "5",
    title: "Software Engineering Intern",
    company: "Netflix",
    location: "India · US · Poland · Japan",
    slug: "swe-intern-netflix",
    type: "Internship",
    department: "Engineering & Data",
    experience: "Bachelor's / Master's / PhD",
    mode: "On-site",
    duration: "12 weeks (Summer)",
    description: "12-week summer internship immersing you in Netflix's unique culture. Work on meaningful projects across Engineering, Data & Insights, Content, Finance, Marketing, and Program Management that directly advance the business and thrill global audiences. Open to students pursuing bachelor's, master's, or doctoral degrees.",
    applyUrl: "https://jobs.netflix.com/careers/internships",
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


  /* ── PAGE HEADER ── */
  .page-head {
    background: white; border-bottom: 1px solid var(--border);
    padding: 22px 28px;
  }
  .page-head-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  }
  .page-head-left { display: flex; flex-direction: column; gap: 3px; }
  .page-head-title { font-size: 20px; font-weight: 900; color: var(--ink); letter-spacing: -.03em; }
  .page-head-sub { font-size: 13px; color: var(--ink3); font-weight: 500; }
  .page-head-count {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--ind-l); border: 1px solid rgba(29,58,143,.12);
    padding: 6px 14px; border-radius: 99px;
    font-size: 12px; font-weight: 800; color: var(--ind);
  }

  /* ── MAIN CONTENT ── */
  .page { max-width: 1200px; margin: 0 auto; padding: 32px 28px 72px; }

  /* ── JOBS HEADER ── */
  .jobs-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }
  .jobs-title-row { display: flex; align-items: center; gap: 10px; }
  .jobs-heading { font-size: 18px; font-weight: 900; color: var(--ink); letter-spacing: -.02em; }
  .jobs-count { font-size: 12px; font-weight: 800; color: var(--ind); background: var(--ind-l); padding: 3px 10px; border-radius: 99px; }
  .jobs-sort { font-size: 12px; font-weight: 600; color: var(--ink3); display: flex; align-items: center; gap: 6px; }

  /* ── JOBS GRID ── */
  .jobs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  @media (max-width: 700px) { .jobs-grid { grid-template-columns: 1fr; } }

  /* ── JOB CARD ── */
  .job-card {
    background: white; border-radius: 18px; border: 1.5px solid var(--border);
    box-shadow: var(--shadow-sm);
    text-decoration: none; color: inherit; display: flex; flex-direction: column;
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
    overflow: hidden;
  }
  .job-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: rgba(29,58,143,.22); }
  .job-card-body { padding: 20px 20px 16px; display: flex; gap: 14px; align-items: flex-start; flex: 1; }
  .job-logo {
    width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 900; color: white;
    background: linear-gradient(135deg, #1d3a8f, #3b52f0);
    border: 1px solid rgba(0,0,0,.07);
    overflow: hidden; padding: 0;
  }
  .job-logo img { width: 100%; height: 100%; object-fit: contain; display: block; }
  .job-info { flex: 1; min-width: 0; }
  .job-title { font-size: 15px; font-weight: 800; color: var(--ink); margin: 0 0 3px; letter-spacing: -.02em; line-height: 1.3; }
  .job-company { font-size: 12px; font-weight: 600; color: var(--ink3); margin-bottom: 10px; }
  .job-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
  .tag {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 700; padding: 3px 8px;
    border-radius: 6px; letter-spacing: .01em; white-space: nowrap;
  }
  .tag-type  { background: var(--ind-l); color: var(--ind); }
  .tag-mode  { background: var(--vio-l); color: var(--vio); }
  .tag-dept  { background: #f0fdf4; color: #059669; }
  .tag-exp   { background: var(--amb-l); color: #b45309; }
  .tag-live  { background: var(--grn-l); color: var(--grn); }
  .job-desc { font-size: 12px; color: var(--ink3); line-height: 1.6; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .job-meta-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .job-meta-item { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--ink3); font-weight: 500; }
  .job-card-footer {
    padding: 12px 20px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    background: #fafbff;
  }
  .job-posted { font-size: 11px; color: var(--ink3); font-weight: 500; white-space: nowrap; }
  .job-apply-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: linear-gradient(135deg, #1d3a8f, #2548c5);
    color: white; font-size: 12px; font-weight: 800;
    padding: 8px 16px; border-radius: 9px; text-decoration: none;
    box-shadow: 0 2px 10px rgba(29,58,143,.25);
    transition: transform .18s ease, box-shadow .18s ease;
    white-space: nowrap;
  }
  .job-apply-btn:hover { transform: translateY(-1px); box-shadow: 0 5px 18px rgba(29,58,143,.35); }
  .job-save-btn {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 700; color: var(--ink3);
    padding: 7px 13px; border-radius: 9px;
    border: 1.5px solid var(--border); background: white;
    text-decoration: none; transition: all .18s ease; white-space: nowrap;
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
    .page-head { padding: 16px; }
    .page { padding: 24px 16px 60px; }
    .job-card-body { flex-direction: column; gap: 12px; }
    .job-card-footer { flex-direction: column; align-items: stretch; gap: 8px; }
    .job-apply-btn, .job-save-btn { justify-content: center; width: 100%; }
    .sidebar { position: static; }
  }
`

const COMPANY_LOGOS: Record<string, string> = {
  "Trippyway": "/trippyway-logo.jpg",
  "Netflix": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44'%3E%3Crect width='44' height='44' fill='%23141414'/%3E%3Cpolygon points='9%2C6 16%2C6 35%2C38 28%2C38' fill='%23E50914'/%3E%3Crect x='9' y='6' width='7' height='32' fill='%23E50914'/%3E%3Crect x='28' y='6' width='7' height='32' fill='%23E50914'/%3E%3C%2Fsvg%3E",
  "Top Institute of India": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='12' fill='%231d3a8f'/%3E%3Cpath d='M16 12v24M22 12h8a6 6 0 0 1 0 12H22z' stroke='white' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
}

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
      <Navbar />

      {/* Page Header */}
      <div style={{ height: 108 }} />
      <div className="page-head">
        <div className="page-head-inner">
          <div className="page-head-left">
            <div className="page-head-title">Open Positions</div>
            <div className="page-head-sub">Jobs listed via Jobingen</div>
          </div>
          <div className="page-head-count">
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--grn)", display: "inline-block" }} />
            {jobs.length} {jobs.length === 1 ? "role" : "roles"} open
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="page">
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
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ marginBottom: 14, color: "var(--ink3)" }}><rect x="6" y="14" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M14 14V11C14 9.89 14.9 9 16 9H24C25.1 9 26 9.9 26 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M6 22H34" stroke="currentColor" strokeWidth="1.5"/></svg>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", marginBottom: 8 }}>No open positions right now</div>
              <div style={{ fontSize: 14, color: "var(--ink3)", lineHeight: 1.65 }}>We&apos;re growing fast — check back soon for new opportunities.</div>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job: Job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
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
        <div className="job-logo" style={{ background: COMPANY_LOGOS[job.company] ? "#fff" : getGradient(job.company) }}>
          {COMPANY_LOGOS[job.company]
            ? <img src={COMPANY_LOGOS[job.company]} alt={job.company} />
            : getInitials(job.company)
          }
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
          {!job.applyUrl && (
            <Link href={`/jobs/${job.slug}`} className="job-save-btn">
              View Details
            </Link>
          )}
          <a
            href={job.applyUrl ?? `/jobs/${job.slug}`}
            {...(job.applyUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="job-apply-btn"
          >
            Apply Now
            <svg width="12" height="12" fill="none" viewBox="0 0 18 18"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}
