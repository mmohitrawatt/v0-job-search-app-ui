import Link from "next/link"
import { ArrowRight, Check, ChevronDown, ChevronRight, MapPin } from "lucide-react"
import GatiApplyForm from "./gati-apply-form"
import GatiMobileApply from "./gati-mobile-apply"
import "./gati-listing.css"

const topics = ["AI & Generative AI", "Prompt engineering", "Programming (Python / JavaScript)", "Web development", "APIs & backend", "Software development", "Innovation & project building"]

const responsibilities = [
  "Deliver engaging technology sessions for school and college students.",
  "Break down AI, programming and development concepts into clear, practical explanations.",
  "Use demonstrations and project examples to help learners apply what they learn.",
  "Take part in sessions recorded for learning content.",
]

const qualifications = [
  "3rd-year and 4th-year students.",
  "M.Tech and PhD scholars.",
  "Industry professionals with an interest in teaching.",
  "People who can explain technical concepts clearly to students.",
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="gj-heading">{children}</h2>
}

function Checklist({ items }: { items: string[] }) {
  return <ul className="gj-checklist">{items.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
}

export default function GatiListing() {
  return <div className="gj-page">
    <header className="gj-header"><div className="gj-header-inner">
      <Link href="/" aria-label="Jobingen home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/jobingen-logo.png" alt="Jobingen" className="gj-jobingen-logo" />
      </Link>
      <Link href="/jobs" className="gj-all-jobs">Explore jobs <ArrowRight size={15} /></Link>
    </div></header>

    <main className="gj-main">
      <nav className="gj-breadcrumb" aria-label="Breadcrumb"><Link href="/jobs">Jobs</Link><ChevronRight size={13} /><span>AI Trainer / Technical Educator</span></nav>

      <section className="gj-hero" id="gj-hero" aria-labelledby="gj-title">
        <div className="gj-hero-main">
          <div className="gj-company-row">
            <div className="gj-company-logo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gati-shiksha-logo.png" alt="Gati Shiksha" className="gj-company-logo" />
            </div>
            <span className="gj-company-name">Jobingen × Gati Shiksha</span>
          </div>
          <h1 id="gj-title">AI Trainer / Technical Educator</h1>
          <p className="gj-hero-copy">Simplify AI, programming and software development for school and college students through engaging learning sessions.</p>
          <div className="gj-facts" aria-label="Role details">
            <span><MapPin size={15} /> MNNIT Allahabad · Delhi · Multiple locations</span>
            <span>Flexible scheduling</span>
            <span>Per-session stipend</span>
          </div>
          <div className="gj-hero-actions"><a href="#apply" className="gj-primary">Apply now <ArrowRight size={17} /></a><a href="#role-details" className="gj-text-link">Read the role <ChevronDown size={16} /></a></div>
        </div>
        <div className="gj-hero-aside"><span className="gj-aside-label">Applications close</span><strong><time dateTime="2026-09-25T20:00">25 September 2026</time></strong><p>8:00 PM</p></div>
      </section>

      <div className="gj-layout">
        <div className="gj-details gj-details-primary" id="role-details">
          <section className="gj-card gj-summary"><SectionTitle>The role</SectionTitle><p>Jobingen is hiring AI trainers and technical educators to make complex technology topics easy to understand. Sessions are for school and college students and are recorded for learning content.</p><div className="gj-summary-foot"><span>School & college learners</span><span>Recorded sessions</span><span>Flexible schedule</span></div></section>

          <section className="gj-card" id="tracks"><SectionTitle>Topics you may teach</SectionTitle><p className="gj-section-intro">Choose the areas that match your expertise when you apply.</p><ul className="gj-topic-list">{topics.map(topic => <li key={topic}><Check size={15} aria-hidden="true" />{topic}</li>)}</ul></section>

          <section className="gj-card"><SectionTitle>Who can apply</SectionTitle><Checklist items={qualifications} /></section>
        </div>

        <section className="gj-card gj-apply" id="apply"><div className="gj-form-heading"><span className="gj-form-step">APPLICATION</span><SectionTitle>Apply for this role</SectionTitle><p>Submit your details, teaching topics and CV. A sample teaching video can be added if available.</p></div><GatiApplyForm /></section>

        <div className="gj-details gj-details-secondary">
          <section className="gj-card"><SectionTitle>What you&apos;ll do</SectionTitle><Checklist items={responsibilities} /></section>

          <section className="gj-card"><SectionTitle>Session format & stipend</SectionTitle><p>Flexible scheduling, with sessions of 2–3 hours per day. Sessions are recorded for learning content. A stipend is paid per session; details are shared after selection based on expertise and topic.</p></section>

          <section className="gj-card"><SectionTitle>How to apply</SectionTitle><p>Submit your CV and preferred teaching topics through the form. You may include a 2–3 minute sample video explaining a topic you know well. You can also send your CV to <a href="mailto:connect.jobingen@gmail.com">connect.jobingen@gmail.com</a>.</p><p className="gj-deadline-note">Application deadline: <strong>25 September 2026, 8:00 PM</strong></p></section>
        </div>
      </div>
    </main>
    <GatiMobileApply />
    <footer className="gj-footer">© {new Date().getFullYear()} Jobingen. All rights reserved.</footer>
  </div>
}
