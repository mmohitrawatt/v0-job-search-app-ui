"use client"

import Link from "next/link"
import Image from "next/image"
import { JobingenLogo } from "@/components/jobingen-logo"

const MENTORS = [
  {
    name: "Aditya Dubey",
    role: "AI Strategy & Implementation Consultant",
    company: "Cograd",
    initials: "AD",
    photo: "/mentors/aditya-dubey.jpg",
    color: "#1d3a8f",
    bg: "#eef1fd",
    desc: "Aditya Dubey is an AI strategy and implementation consultant focused on helping organizations leverage artificial intelligence for business growth, automation, and operational transformation. He has mentored more than 12,000 professionals and students in AI technologies and practical industry applications. With an M.Tech in Information Systems from NIT Allahabad, Aditya works on translating complex AI concepts into real-world solutions that drive measurable impact for businesses and startups.",
    linkedin: "https://www.linkedin.com/in/aditya-dubey-4092b1214/",
    topics: ["AI/ML Strategy", "Career Guidance", "Resume Review", "Mock Interviews"],
  },
  {
    name: "Sonic Payeng",
    role: "Software Engineer 2 (SWE2)",
    company: "Dell Technologies",
    initials: "SP",
    photo: "/mentors/sonic-payeng.jpg",
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: "Sonic Payeng is an AI engineer specializing in applied machine learning, intelligent automation, and large language model systems. He completed his M.Tech in Artificial Intelligence and Data Science from NIT Allahabad (MNNIT) and currently works at Dell Technologies on the Dell Automation Platform. His work focuses on building AI-driven automation solutions across on-premise, SaaS, and hybrid cloud environments.",
    linkedin: "https://www.linkedin.com/in/sonic-payeng-7ab8a8212/",
    topics: ["System Design", "AI/ML", "Interview Prep", "Skill Roadmap"],
  },
  {
    name: "Jitesh Vijaykumar",
    role: "AI Engineer",
    company: "KPMG",
    initials: "JV",
    photo: "/mentors/jitesh-vijaykumar.jpg",
    color: "#7c3aed",
    bg: "#f5f3ff",
    desc: "Jitesh Vijaykumar is an AI engineer with over five years of experience building scalable artificial intelligence solutions for enterprise systems. With an M.Tech in Artificial Intelligence and Data Science, his work focuses on developing practical machine learning applications that solve real-world business problems. At KPMG, he contributes to designing and implementing AI-powered solutions that improve decision-making, automation, and operational efficiency.",
    linkedin: "https://www.linkedin.com/in/jitesh-vijaykumar-b2786814b/",
    topics: ["AI Engineering", "Career Guidance", "Portfolio Review", "Mock Interviews"],
  },
  {
    name: "Shubham Kaushik",
    role: "AI & Financial Intelligence Researcher",
    company: "KPMG",
    initials: "SK",
    photo: "/mentors/shubham-kaushik.jpg",
    color: "#b45309",
    bg: "#fffbeb",
    desc: "Shubham Kaushik is an AI and financial intelligence researcher with more than five years of experience in artificial intelligence, machine learning, and full-stack development. His work focuses on applied AI research, including large language models, intelligent data systems, and scalable applications for financial analysis and enterprise solutions.",
    linkedin: "https://www.linkedin.com/in/eskaykaushik/",
    topics: ["AI Research", "Full-Stack Dev", "Interview Prep", "Salary Negotiation"],
  },
  {
    name: "Bipin Chaudhary",
    role: "Full Stack Developer",
    company: "SAP (Ex-Intern)",
    initials: "BC",
    photo: "/mentors/bipin-chaudhary.jpg",
    color: "#0369a1",
    bg: "#e0f2fe",
    desc: "Bipin Chaudhary is a Full Stack Developer with around 2.5 years of experience working with JavaScript, TypeScript, Angular, Node.js, and SQL. He has worked with SAP as an intern, gaining strong fundamentals in backend systems and databases. Bipin is passionate about building real-world applications and simplifying complex concepts, with a focus on helping students understand programming and computer science in a practical and easy-to-grasp way.",
    linkedin: "https://www.linkedin.com/in/bipin-chaudhary-39781b152/",
    topics: ["Full-Stack Dev", "JavaScript/TypeScript", "Backend Systems", "Career Guidance"],
  },
  {
    name: "Tarsh Vaibhav",
    role: "Embedded Software Engineer & DSA Trainer",
    company: "Wabtec Corporation",
    initials: "TV",
    photo: "/mentors/tarsh-vaibhav.jpg",
    color: "#dc2626",
    bg: "#fef2f2",
    desc: "Tarsh Vaibhav is an Embedded Software Engineer with 1 year of experience at Wabtec Corporation and a graduate of MNNIT Allahabad. Driven by a passion for education, he currently serves as a DSA Trainer at KIET Group of Institutions, Ghaziabad, where he has trained 500+ students in Data Structures and Algorithms. He brings real industry insight into every session — making complex concepts simple, engaging, and interview-ready — helping students confidently crack placements at top tech companies.",
    linkedin: "https://www.linkedin.com/in/tarsh-vaibhav-4410561b0/",
    topics: ["DSA", "Interview Prep", "Placement Guidance", "Embedded Systems"],
  },
]

export default function MentorsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fafbff", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      {/* Navbar */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,251,255,.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e8ecf4" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <JobingenLogo height={70} />
          </Link>
          <Link href="/become-mentor" style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 20px",
            background: "linear-gradient(135deg, #7c3aed, #3b5bdb)", color: "#fff",
            borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none",
            boxShadow: "0 2px 8px rgba(124,58,237,.2)",
          }}>
            Become a Mentor
          </Link>
        </div>
      </header>

      <div className="mentors-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* ── About / Hero Section ── */}
        <div className="hero-section" style={{ borderRadius: 24, overflow: "hidden", marginBottom: 56 }}>
          {/* Dark hero banner */}
          <div className="hero-banner" style={{ position: "relative", padding: "48px 40px 40px", background: "linear-gradient(135deg, #0f0a2e, #1e1b4b, #312e81)" }}>
            <div style={{ position: "absolute", inset: 0, opacity: .08, backgroundImage: "radial-gradient(circle at 15% 50%, #7c3aed 0, transparent 50%), radial-gradient(circle at 85% 30%, #3b82f6 0, transparent 50%)" }} />
            <div style={{ position: "relative", maxWidth: 640 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: "rgba(255,255,255,.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, marginBottom: 20, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.7)", textTransform: "uppercase" as const, letterSpacing: ".06em" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                Mentor Program
              </div>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "#fff", letterSpacing: "-.04em", lineHeight: 1.15, marginBottom: 14 }}>
                The right mentor at the right time changes everything.
              </h1>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 520 }}>
                Our mentors are working professionals from companies like Dell, KPMG, and top startups. They&rsquo;ve walked the path you&rsquo;re on — and they&rsquo;re here to guide you through it.
              </p>
            </div>
          </div>

          {/* Stats + features strip */}
          <div className="stats-wrap" style={{ background: "#fff", padding: "0 40px", borderBottom: "1px solid #e8ecf4" }}>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "none" }}>
              {[
                { val: "6", label: "Active Mentors", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", color: "#7c3aed" },
                { val: "12K+", label: "Students Guided", icon: "M12 2L2 7l10 5 10-5-10-5Z M2 17l10 5 10-5", color: "#1d3a8f" },
                { val: "3+", label: "Top Companies", icon: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z", color: "#0f766e" },
                { val: "1:1", label: "Personal Sessions", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z", color: "#b45309" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "20px 16px", textAlign: "center" as const, borderRight: i < 3 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", background: `${s.color}10` }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", marginTop: 4, textTransform: "uppercase" as const, letterSpacing: ".05em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works strip */}
          <div className="how-it-works" style={{ background: "#fff", padding: "24px 40px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, border: "1px solid #e8ecf4", borderTop: "none" }}>
            {[
              { step: "01", title: "Browse Mentors", desc: "Explore profiles, expertise, and session formats to find your ideal match." },
              { step: "02", title: "Book a Session", desc: "Choose 1:1 video, group session, or chat-based mentoring — on your terms." },
              { step: "03", title: "Get Direction", desc: "Resume reviews, mock interviews, career roadmaps — real guidance from real professionals." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #7c3aed, #3b5bdb)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 900, flexShrink: 0 }}>{s.step}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 3 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentor cards */}
        <div className="mentor-cards" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {MENTORS.map((m, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 20, border: "1.5px solid #e8ecf4",
              boxShadow: "0 1px 4px rgba(0,0,0,.04)", overflow: "hidden",
              transition: "all .2s",
            }}>
              {/* Top color bar */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${m.color}, ${m.color}88)` }} />

              <div style={{ padding: "24px 24px 20px" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, flexShrink: 0, overflow: "hidden", border: `2.5px solid ${m.bg}` }}>
                    <Image src={m.photo} alt={m.name} width={56} height={56} style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{m.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: m.color, marginTop: 2 }}>{m.role}</div>
                    <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: m.bg, color: m.color, marginTop: 4, letterSpacing: ".03em" }}>
                      {m.company}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 16 }}>
                  {m.desc}
                </p>

                {/* Topics */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {m.topics.map(t => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0" }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* LinkedIn */}
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontSize: 12, fontWeight: 700, color: "#2563eb", textDecoration: "none",
                  }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                    </svg>
                    View LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/* ── Consultancy Live Soon ── */}
        <div className="consultancy-section" style={{ marginTop: 56, borderRadius: 20, overflow: "hidden", border: "1.5px solid #e8ecf4" }}>
          <div className="consultancy-body" style={{ position: "relative", padding: "40px 40px 36px", background: "linear-gradient(135deg, #faf5ff, #eef1fd, #ecfdf5)" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, background: "#fff", border: "1.5px solid #e2e8f0", fontSize: 11, fontWeight: 800, color: "#7c3aed", textTransform: "uppercase" as const, letterSpacing: ".06em" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7c3aed", animation: "livePulse 2s infinite" }} />
                Coming Soon
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14" /><rect x="1" y="6" width="14" height="12" rx="2" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", letterSpacing: "-.03em", lineHeight: 1.2 }}>
                  Mentor Consultancy — Live Sessions
                </h3>
                <p style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>Book live 1:1 video sessions directly with our mentors</p>
              </div>
            </div>

            <div className="consultancy-features" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
              {[
                { icon: "M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M1 6h14v12H1Z", title: "Live Video Calls", desc: "Face-to-face sessions with mentors via Google Meet / Zoom" },
                { icon: "M12 2L2 7l10 5 10-5-10-5Z M2 17l10 5 10-5", title: "Personalized Roadmaps", desc: "Get a tailored career plan based on your goals and skills" },
                { icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2", title: "Resume & Interview Prep", desc: "Real feedback on your resume, mock interviews, and more" },
              ].map((f, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.7)", borderRadius: 14, padding: "16px 14px", border: "1px solid rgba(255,255,255,.8)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 3 }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.55 }}>{f.desc}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
              We&rsquo;re building a seamless booking experience where you can schedule paid 1:1 sessions with verified mentors. Pick your mentor, choose a slot, and get career guidance that actually matters — no generic advice, no fluff.
            </p>
          </div>

          <div className="consultancy-footer" style={{ background: "#fff", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex" }}>
                {["#1d3a8f", "#16a34a", "#7c3aed", "#b45309", "#0369a1", "#dc2626"].map((c, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${c}, ${c}cc)`, border: "2px solid #fff", marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9, fontWeight: 900 }}>
                    {["AD", "SP", "JV", "SK", "BC", "TV"][i]}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>6 mentors ready to go live</span>
            </div>
            <Link href="/become-mentor" style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              Want to be a mentor?
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        {/* ── Become a Mentor CTA ── */}
        <div style={{
          textAlign: "center", marginTop: 40, padding: "40px 24px",
          background: "linear-gradient(135deg, #1e1b4b, #312e81)",
          borderRadius: 20, boxShadow: "0 8px 32px rgba(30,27,75,.2)",
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 8, letterSpacing: "-.03em" }}>
            Want to mentor students?
          </h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 24 }}>
            Your experience is their shortcut. Your time is their turning point.
          </p>
          <Link href="/become-mentor" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
            background: "#fff", color: "#1e1b4b", borderRadius: 12,
            fontSize: 14, fontWeight: 800, textDecoration: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,.15)",
          }}>
            Apply as Mentor
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes livePulse { 0%,100% { opacity:1; } 50% { opacity:.3; } }
        @media (max-width: 700px) {
          .mentors-container { padding: 20px 14px 48px !important; }
          .hero-section { margin-bottom: 28px !important; }
          .hero-banner { padding: 28px 18px 24px !important; }
          .stats-wrap { padding: 0 12px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .how-it-works { grid-template-columns: 1fr !important; padding: 18px 16px !important; }
          .mentor-cards { grid-template-columns: 1fr !important; gap: 16px !important; }
          .consultancy-section { margin-top: 28px !important; }
          .consultancy-body { padding: 20px 16px 20px !important; }
          .consultancy-features { grid-template-columns: 1fr !important; }
          .consultancy-footer {
            padding: 14px 16px !important;
            flex-direction: column !important;
            gap: 12px !important;
            align-items: flex-start !important;
          }
        }
      `}} />
    </div>
  )
}
