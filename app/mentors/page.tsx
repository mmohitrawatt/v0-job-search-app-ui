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

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: "0 auto 20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #7c3aed, #3b5bdb)",
            boxShadow: "0 8px 28px rgba(124,58,237,.25)",
          }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-.04em", lineHeight: 1.15, marginBottom: 12 }}>
            Our Mentors
          </h1>
          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
            Working professionals from top companies, passionate about guiding the next generation of builders.
          </p>
        </div>

        {/* Mentor cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
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
                    <Image src={m.photo} alt={m.name} width={56} height={56} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
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
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 12, fontWeight: 700, color: "#2563eb", textDecoration: "none",
                }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                  </svg>
                  View LinkedIn Profile
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: "center", marginTop: 56, padding: "40px 24px",
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
        @media (max-width: 700px) {
          div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  )
}
