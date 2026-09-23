import Link from "next/link"
import { ArrowRight, Check, ChevronDown, ChevronRight, MapPin } from "lucide-react"
import GatiApplyForm from "./gati-apply-form"
import GatiMobileApply from "./gati-mobile-apply"
import "./gati-listing.css"

const tracks = [
  {
    number: "01", title: "Junior Innovation Challenge", grades: "Classes VI–VIII",
    focus: "Computing, creative coding and first projects",
    topics: ["Computers, internet & websites", "Programming logic: sequences, conditions & loops", "Scratch: events, motion & interaction", "HTML, CSS & basic JavaScript", "AI & Generative AI basics and prompt writing", "Project planning, prototyping, testing & presentation"],
  },
  {
    number: "02", title: "Emerging Innovator Challenge", grades: "Classes IX–X",
    focus: "Web development, data and AI applications",
    topics: ["Frontend, backend & data concepts", "JavaScript fundamentals: variables, data types, operators & functions", "HTML, CSS, responsive design & DOM", "APIs, HTTP, JSON & database fundamentals", "AI, Generative AI & prompt engineering", "App architecture, feature planning, testing & debugging"],
  },
  {
    number: "03", title: "Advanced Innovation Challenge", grades: "Classes XI–XII",
    focus: "Full stack applications and AI assisted development",
    topics: ["Client-server & modern application architecture", "Semantic HTML, responsive CSS, JavaScript & DOM", "Node.js, Express, REST APIs, HTTP & databases", "LLM concepts, prompt engineering & AI-assisted development", "Git, GitHub, system design & stack selection", "Team project planning, integration & testing"],
  },
]

const responsibilities = [
  "Record scripted lessons at the Delhi studio for students in Classes VI–XII.",
  "Explain technical topics clearly through live coding and screen demonstrations.",
  "Review scripts for technical accuracy and suggest clearer examples.",
  "Coordinate with the production team on retakes and corrections.",
]

const qualifications = [
  "Pursuing or completed B.Tech/B.E., BCA/MCA or B.Sc/M.Sc in CS or IT.",
  "Strong CS fundamentals, practical programming and web development skills, including HTML, CSS and JavaScript.",
  "Familiarity with Generative AI tools and prompt engineering. Node.js/backend knowledge for the advanced track.",
  "Clear spoken English, confident on camera, and able to simplify concepts for school students.",
  "Able to travel to the Delhi studio on scheduled shoot days.",
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
      <nav className="gj-breadcrumb" aria-label="Breadcrumb"><Link href="/jobs">Jobs</Link><ChevronRight size={13} /><span>AI Trainer</span></nav>

      <section className="gj-hero" id="gj-hero" aria-labelledby="gj-title">
        <div className="gj-hero-main">
          <div className="gj-company-row">
            <div className="gj-company-logo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gati-shiksha-logo.png" alt="Gati Shiksha" className="gj-company-logo" />
            </div>
            <span className="gj-company-name">Gati Shiksha</span>
          </div>
          <h1 id="gj-title">AI Trainer</h1>
          <p className="gj-hero-copy">Teach technology and AI to students in Classes VI–XII through clear, engaging video lessons.</p>
          <div className="gj-facts" aria-label="Role details">
            <span><MapPin size={15} /> Delhi studio</span>
            <span>Freelance</span>
            <span>Competitive per-day pay</span>
          </div>
          <div className="gj-hero-actions"><a href="#apply" className="gj-primary">Apply now <ArrowRight size={17} /></a><a href="#role-details" className="gj-text-link">Read the role <ChevronDown size={16} /></a></div>
        </div>
        <div className="gj-hero-aside"><span className="gj-aside-label">Eligibility</span><strong>Freshers and final-year students are welcome.</strong><p>Teaching experience is not required. Choose the curriculum track that fits your skills.</p></div>
      </section>

      <div className="gj-layout">
        <div className="gj-details gj-details-primary" id="role-details">
          <section className="gj-card gj-summary"><SectionTitle>The role</SectionTitle><p>Visit Gati Shiksha&apos;s Delhi studio to record lessons from scripts prepared by its curriculum team. You&apos;ll make technical ideas easy for school students to understand with explanations, live coding and screen demonstrations.</p><div className="gj-summary-foot"><span>Scripted content</span><span>Studio setup</span><span>Shoot days planned in advance</span></div></section>

          <section className="gj-card" id="tracks"><SectionTitle>Choose your curriculum track</SectionTitle><p className="gj-section-intro">You only need to select the track or tracks you know best. Open a track to see its topics.</p><div className="gj-tracks">{tracks.map(track => <details className="gj-track" key={track.number}><summary><span className="gj-track-number">{track.number}</span><span className="gj-track-title"><strong>{track.title}</strong><small>{track.grades} · {track.focus}</small></span><ChevronDown className="gj-track-chevron" size={17} /></summary><ul>{track.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></details>)}</div></section>

          <section className="gj-card"><SectionTitle>Who can apply</SectionTitle><Checklist items={qualifications} /><p className="gj-eligibility-note">Freshers, final-year students, recent graduates and professionals in software, web or AI development are welcome. Prior teaching experience is not required.</p></section>
        </div>

        <section className="gj-card gj-apply" id="apply"><div className="gj-form-heading"><span className="gj-form-step">APPLICATION</span><SectionTitle>Apply for this role</SectionTitle><p>Submit your details, preferred track and CV. A sample teaching video can be added if available.</p></div><GatiApplyForm /></section>

        <div className="gj-details gj-details-secondary">
          <section className="gj-card"><SectionTitle>What you&apos;ll do</SectionTitle><Checklist items={responsibilities} /></section>

          <section className="gj-card"><SectionTitle>Pay & work setup</SectionTitle><p>Competitive pay per shoot day, a flexible freelance schedule, fully scripted content and a professional studio setup. Educators may be featured across Gati Shiksha bootcamps.</p></section>

          <section className="gj-card"><SectionTitle>After you apply</SectionTitle><ol className="gj-process"><li><span>01</span><p>Submit your CV and preferred track(s) on Jobingen. You may include a 2–3 minute sample teaching video explaining any one curriculum topic.</p></li><li><span>02</span><p>Gati Shiksha screens applications and profiles.</p></li><li><span>03</span><p>Shortlisted candidates attend a short screen test at the Delhi studio.</p></li><li><span>04</span><p>Gati Shiksha makes the final selection.</p></li></ol></section>
        </div>
      </div>
    </main>
    <GatiMobileApply />
    <footer className="gj-footer">© {new Date().getFullYear()} Jobingen. All rights reserved.</footer>
  </div>
}
