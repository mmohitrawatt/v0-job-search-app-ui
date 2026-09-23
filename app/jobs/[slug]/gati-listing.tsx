import Link from "next/link"
import { ArrowRight, Check, ChevronRight, FileVideo, MapPin } from "lucide-react"
import GatiApplyForm from "./gati-apply-form"
import "./gati-listing.css"

const tracks = [
  { number: "01", title: "Junior Innovation Challenge", grades: "Classes VI–VIII", topics: ["Computers, internet & websites", "Programming logic", "Sequences, conditions & loops", "Scratch", "Events, motion & interaction", "HTML", "CSS", "Basic JavaScript", "AI & Generative AI basics", "Prompt writing", "Project planning", "Prototyping", "Testing", "Presentation"] },
  { number: "02", title: "Emerging Innovator Challenge", grades: "Classes IX–X", topics: ["Frontend, backend & data concepts", "JavaScript fundamentals", "Variables, data types & operators", "Functions", "HTML & CSS", "Responsive design", "DOM", "APIs", "HTTP", "JSON", "Database fundamentals", "AI & Generative AI", "Prompt engineering", "App architecture", "Feature planning", "Testing & debugging"] },
  { number: "03", title: "Advanced Innovation Challenge", grades: "Classes XI–XII", topics: ["Client-server architecture", "Modern application architecture", "Semantic HTML", "Responsive CSS", "JavaScript & DOM", "Node.js", "Express", "REST APIs", "HTTP", "Databases", "LLM concepts", "Prompt engineering", "AI-assisted development", "Git & GitHub", "System design", "Stack selection", "Team project planning", "Integration", "Testing"] },
]

const responsibilities = [
  "Record lessons at the Delhi studio using scripts and shoot plans provided by Gati Shiksha.",
  "Explain technical concepts clearly for different school grade levels.",
  "Perform live coding and screen demonstrations.",
  "Work with Scratch, HTML, CSS, JavaScript, Node.js, Git and AI tools, depending on your track.",
  "Review scripts before recording and flag technical errors or ways to improve explanations.",
  "Suggest clearer examples, re-record segments when needed, and coordinate corrections with the production team.",
]

const qualifications = [
  "B.Tech/B.E., BCA/MCA or B.Sc/M.Sc in CS or IT, pursuing or completed.",
  "Strong computer science fundamentals and hands-on programming and web development skills.",
  "Familiarity with HTML, CSS and JavaScript.",
  "Backend and Node.js knowledge for the senior/advanced track.",
  "Practical familiarity with Generative AI tools and prompt engineering.",
  "Clear spoken English and a confident on-camera presence.",
  "Ability to simplify concepts for students and travel to the Delhi studio on scheduled shoot days.",
]

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="gj-heading"><span />{children}</h2>
}

function Checklist({ items }: { items: string[] }) {
  return <ul className="gj-checklist">{items.map(item => <li key={item}><span className="gj-check"><Check size={12} strokeWidth={2.5} /></span><span>{item}</span></li>)}</ul>
}

export default function GatiListing() {
  return <div className="gj-page">
    <header className="gj-header"><div className="gj-header-inner">
      <Link href="/" aria-label="Jobingen home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/jobingen-logo.png" alt="Jobingen" className="gj-jobingen-logo" />
      </Link>
      <Link href="/jobs" className="gj-all-jobs">← All Jobs</Link>
    </div></header>

    <main className="gj-main">
      <div className="gj-breadcrumb"><Link href="/jobs">All jobs</Link><ChevronRight size={13} /><span>Freelance Video Educator</span></div>

      <section className="gj-card gj-intro">
        <div className="gj-intro-top">
          <div className="gj-brand"><div className="gj-company-logo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gati-shiksha-logo.png" alt="Gati Shiksha logo" className="gj-company-logo" />
          </div><div><h1>Freelance Video Educator</h1><div className="gj-meta"><span className="gj-company-pill">Gati Shiksha</span><span className="gj-location"><MapPin size={15} /> Delhi Studio</span></div></div></div>
          <a href="#apply" className="gj-primary gj-header-apply">Apply Now <ArrowRight size={16} /></a>
        </div>
        <p className="gj-tagline">Teach Technology & AI. Build the next generation of young innovators.</p>
        <div className="gj-facts"><span>Freelance</span><span>Competitive per-day pay</span><span>Freshers & final-year students welcome</span></div>
        <div className="gj-required"><FileVideo size={19} /><span>Have a teaching sample? You can share a 2–3 minute video with your application.</span><a href="#apply">Apply below →</a></div>
      </section>

      <section className="gj-card"><Heading>About the role</Heading><p className="gj-lead">Gati Shiksha is looking for sharp, confident engineers and technology professionals to teach school students in Classes VI–XII through its technology and innovation bootcamps.</p><p>You&apos;ll visit the Delhi studio to record teaching videos from scripts prepared by the curriculum team. The role calls for clear explanations, live coding and screen demonstrations that make complex technology concepts easy for students to understand.</p><p>Freshers and final-year students are welcome. Skill matters more than prior experience, and teaching experience is not required.</p></section>

      <section className="gj-card"><Heading>What you&apos;ll do</Heading><Checklist items={responsibilities} /></section>

      <section className="gj-card" id="tracks"><Heading>Curriculum tracks</Heading><p className="gj-muted">You don&apos;t need to cover every track. Choose the track or tracks you&apos;re strongest in.</p><div className="gj-tracks">{tracks.map(track => <article className="gj-track" key={track.number}><div className="gj-track-heading"><span className="gj-track-number">TRACK {track.number}</span><span className="gj-grade">{track.grades}</span></div><h3>{track.title}</h3><div className="gj-topics">{track.topics.map(topic => <span key={topic}>{topic}</span>)}</div></article>)}</div></section>

      <section className="gj-card"><Heading>Who should apply</Heading><Checklist items={qualifications} /><div className="gj-info">Freshers, final-year students, recent graduates, CS/IT students, software developers, web developers, AI/GenAI practitioners and candidates with strong technical communication skills can apply.</div></section>

      <section className="gj-card"><Heading>What Gati Shiksha offers</Heading><Checklist items={["Competitive per-day pay for each shoot day.", "Flexible freelance schedule with shoot days planned in advance.", "Fully scripted content and a professional studio setup.", "Opportunity to become a featured educator across Gati Shiksha bootcamps.", "No prior teaching experience required."]} /></section>

      <section className="gj-card"><Heading>Application & selection</Heading><div className="gj-application-parts"><div><b>01</b><span>CV / Resume</span></div><div><b>02</b><span>Preferred curriculum track(s)</span></div><div><b>03 · IF AVAILABLE</b><span>2–3 minute sample teaching video</span></div></div><p className="gj-muted">If you share a sample, explain any one topic from the tracks above. Show clear communication, technical understanding, simple explanations, confidence and student engagement.</p><ol className="gj-process"><li>Submit your CV and preferred track(s) on Jobingen. You can also include a sample video.</li><li>Gati Shiksha screens applications and profiles.</li><li>Shortlisted candidates attend a short studio screen test in Delhi.</li><li>Gati Shiksha makes the final selection.</li></ol></section>

      <section className="gj-card gj-apply" id="apply"><Heading>Apply for this role</Heading><p className="gj-muted">Fill in your details and upload your resume. You can add a shareable sample video link if you have one.</p><GatiApplyForm /></section>
    </main>
    <footer className="gj-footer">© {new Date().getFullYear()} Jobingen. All rights reserved.</footer>
  </div>
}
