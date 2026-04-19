"use client"

import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

/* ─── Mentor Data ──────────────────────────────────── */

const MENTORS = [
  {
    name: "Shubham Kaushik",
    role: "AI & Financial Intelligence Researcher",
    company: "KPMG",
    initials: "SK",
    photo: "/mentors/shubham-kaushik.jpg",
    color: "#b45309",
    bg: "#fffbeb",
    desc: "5+ years in AI, ML, and full-stack development. Focuses on LLMs, intelligent data systems, and scalable applications for financial analysis and enterprise solutions.",
    linkedin: "https://www.linkedin.com/in/eskaykaushik/",
    topics: ["AI Research", "Full-Stack Dev", "Interview Prep", "Salary Negotiation"],
    active: true,
  },
  {
    name: "Jitesh Vijaykumar",
    role: "AI Engineer",
    company: "KPMG",
    initials: "JV",
    photo: "/mentors/jitesh-vijaykumar.jpg",
    color: "#7c3aed",
    bg: "#f5f3ff",
    desc: "M.Tech in AI & Data Science. Builds scalable enterprise AI solutions at KPMG — automation, decision intelligence, and operational efficiency.",
    linkedin: "https://www.linkedin.com/in/jitesh-vijaykumar-b2786814b/",
    topics: ["AI Engineering", "Career Guidance", "Portfolio Review", "Mock Interviews"],
    active: true,
  },
  {
    name: "Sonic Payeng",
    role: "Software Engineer II",
    company: "Dell Technologies",
    initials: "SP",
    photo: "/mentors/sonic-payeng.jpg",
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: "MNNIT M.Tech in AI & DS. Builds AI-driven automation on Dell's platform — spanning on-prem, SaaS, and hybrid cloud environments.",
    linkedin: "https://www.linkedin.com/in/sonic-payeng-7ab8a8212/",
    topics: ["System Design", "AI/ML", "Interview Prep", "Skill Roadmap"],
    active: true,
  },
  {
    name: "Aditya Dubey",
    role: "AI Engineer",
    company: "Cograd",
    initials: "AD",
    photo: "/mentors/aditya-dubey.jpg",
    color: "#1d3a8f",
    bg: "#eef1fd",
    desc: "M.Tech from NIT Allahabad. Mentored 12,000+ students in AI and practical industry applications. Translates complex AI into measurable business impact.",
    linkedin: "https://www.linkedin.com/in/aditya-dubey-4092b1214/",
    topics: ["AI/ML Strategy", "Career Guidance", "Resume Review", "Mock Interviews"],
    active: true,
  },
  {
    name: "Bipin Chaudhary",
    role: "Full Stack Developer",
    company: "SAP (Ex-Intern)",
    initials: "BC",
    photo: "/mentors/bipin-chaudhary.jpg",
    color: "#0369a1",
    bg: "#e0f2fe",
    desc: "2.5 years in JS, TypeScript, Angular, Node.js, and SQL. Ex-SAP intern. Passionate about making programming and CS accessible for beginners.",
    linkedin: "https://www.linkedin.com/in/bipin-chaudhary-39781b152/",
    topics: ["Full-Stack Dev", "JavaScript/TypeScript", "Backend Systems", "Career Guidance"],
    active: true,
  },
  {
    name: "Tarsh Vaibhav",
    role: "Embedded Software Engineer",
    company: "Wabtec Corporation",
    initials: "TV",
    photo: "/mentors/tarsh-vaibhav.jpg",
    color: "#dc2626",
    bg: "#fef2f2",
    desc: "MNNIT graduate & DSA Trainer at KIET. Trained 500+ students in Data Structures and Algorithms — making complex concepts simple, engaging, and interview-ready.",
    linkedin: "https://www.linkedin.com/in/tarsh-vaibhav-4410561b0/",
    topics: ["DSA", "Interview Prep", "Placement Guidance", "Embedded Systems"],
    active: true,
  },
  {
    name: "Rahul Mehta",
    role: "Senior Software Engineer",
    company: "Dell Technologies",
    initials: "RM",
    color: "#0891b2",
    bg: "#ecfeff",
    desc: "Cloud-native microservices and DevOps. 4+ years at Dell, builds distributed systems at scale.",
    linkedin: "",
    topics: ["System Design", "DevOps", "Cloud Architecture"],
    active: false,
  },
  {
    name: "Neha Sharma",
    role: "Data Analyst",
    company: "PhonePe",
    initials: "NS",
    color: "#7c3aed",
    bg: "#f5f3ff",
    desc: "Product analytics at PhonePe. Guides students on breaking into data roles and cracking analytics interviews.",
    linkedin: "",
    topics: ["Data Analytics", "SQL", "Product Analytics"],
    active: false,
  },
  {
    name: "Arjun Verma",
    role: "Backend Engineer",
    company: "Zepto",
    initials: "AV",
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: "High-performance backend at Zepto. Passionate about distributed systems, API design, and startup culture.",
    linkedin: "",
    topics: ["Backend Dev", "Startup Culture", "API Design"],
    active: false,
  },
  {
    name: "Priya Singh",
    role: "UX Designer",
    company: "PhonePe",
    initials: "PS",
    color: "#e11d48",
    bg: "#fff1f2",
    desc: "Designs payment UX for 500M+ users. Mentors aspiring designers on portfolios and design interviews.",
    linkedin: "",
    topics: ["UI/UX Design", "Portfolio Review", "Career Switch"],
    active: false,
  },
  {
    name: "Vikram Tiwari",
    role: "Associate Consultant",
    company: "KPMG",
    initials: "VT",
    color: "#b45309",
    bg: "#fffbeb",
    desc: "Technology consulting at KPMG. Guides students on consulting careers and case interview prep.",
    linkedin: "",
    topics: ["Consulting", "Case Interviews", "LinkedIn Optimization"],
    active: false,
  },
  {
    name: "Ananya Gupta",
    role: "Frontend Engineer",
    company: "Zepto",
    initials: "AG",
    color: "#0369a1",
    bg: "#e0f2fe",
    desc: "React & Next.js at Zepto. Helps students master modern JS, component architecture, and frontend interviews.",
    linkedin: "",
    topics: ["React/Next.js", "Frontend Dev", "Interview Prep"],
    active: false,
  },
  {
    name: "Karan Patel",
    role: "SAP Technical Consultant",
    company: "SAP",
    initials: "KP",
    color: "#1d3a8f",
    bg: "#eef1fd",
    desc: "SAP ERP for global clients. Guides freshers on navigating the SAP ecosystem and certifications.",
    linkedin: "",
    topics: ["SAP Modules", "Enterprise Tech", "Certification Prep"],
    active: false,
  },
  {
    name: "Deepika Rathore",
    role: "ML Engineer",
    company: "HCLTech",
    initials: "DR",
    color: "#7c3aed",
    bg: "#f5f3ff",
    desc: "Builds and deploys ML models for healthcare and manufacturing. Mentors on ML fundamentals and model deployment.",
    linkedin: "",
    topics: ["Machine Learning", "Model Deployment", "Python"],
    active: false,
  },
  {
    name: "Rohan Saxena",
    role: "Product Manager",
    company: "PhonePe",
    initials: "RS",
    color: "#0f766e",
    bg: "#ecfdf5",
    desc: "Manages payment products at PhonePe. Helps aspiring PMs with product thinking and PM interview prep.",
    linkedin: "",
    topics: ["Product Management", "PM Interviews", "Product Strategy"],
    active: false,
  },
  {
    name: "Sneha Yadav",
    role: "QA Automation Engineer",
    company: "HCLTech",
    initials: "SY",
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: "Test automation and CI/CD quality gates at HCLTech. Builds automation skills and explores careers in QA.",
    linkedin: "",
    topics: ["Test Automation", "QA Engineering", "CI/CD"],
    active: false,
  },
  {
    name: "Amit Kumar",
    role: "DevOps Engineer",
    company: "Dell Technologies",
    initials: "AK",
    color: "#dc2626",
    bg: "#fef2f2",
    desc: "Infrastructure and deployment pipelines at Dell. Guides students on cloud certs, Linux, and DevOps careers.",
    linkedin: "",
    topics: ["DevOps", "AWS/Cloud", "Linux"],
    active: false,
  },
  {
    name: "Ishita Jain",
    role: "Business Analyst",
    company: "KPMG",
    initials: "IJ",
    color: "#b45309",
    bg: "#fffbeb",
    desc: "Bridges business and tech at KPMG. Mentors on analytical thinking, Excel, SQL, and BA interviews.",
    linkedin: "",
    topics: ["Business Analysis", "Excel/SQL", "Consulting Prep"],
    active: false,
  },
  {
    name: "Manish Rawat",
    role: "Full Stack Developer",
    company: "Zepto",
    initials: "MR",
    color: "#0891b2",
    bg: "#ecfeff",
    desc: "End-to-end features at Zepto — DB design to pixel-perfect UIs. Helps students ship side projects and land startup roles.",
    linkedin: "",
    topics: ["Full-Stack Dev", "Startup Mindset", "Side Projects"],
    active: false,
  },
  {
    name: "Kavita Nair",
    role: "Cloud Solutions Architect",
    company: "HCLTech",
    initials: "KN",
    color: "#e11d48",
    bg: "#fff1f2",
    desc: "Cloud solutions across AWS, Azure, GCP for enterprise clients. Guides on architecture patterns and cloud certifications.",
    linkedin: "",
    topics: ["Cloud Architecture", "AWS/Azure", "Certifications"],
    active: false,
  },
  {
    name: "Siddharth Agarwal",
    role: "Cybersecurity Analyst",
    company: "SAP",
    initials: "SA",
    color: "#1d3a8f",
    bg: "#eef1fd",
    desc: "Enterprise security at SAP. Guides students on cybersecurity fundamentals and ethical hacking basics.",
    linkedin: "",
    topics: ["Cybersecurity", "Ethical Hacking", "Security Certs"],
    active: false,
  },
  {
    name: "Pooja Bansal",
    role: "Data Engineer",
    company: "PhonePe",
    initials: "PB",
    color: "#0f766e",
    bg: "#ecfdf5",
    desc: "Builds data pipelines processing billions of transactions at PhonePe. Teaches Spark, Kafka, and Airflow.",
    linkedin: "",
    topics: ["Data Engineering", "Big Data", "Python/SQL"],
    active: false,
  },
]

const REVIEWS = [
  { name: "Aman Tripathi", college: "NIT Surat", rating: 5, text: "The resume review completely transformed my CV. Got 3 interview calls within a week of updating it. The mentor pointed out things I would never have noticed on my own.", mentor: "Shubham Kaushik" },
  { name: "Ritika Agarwal", college: "IIIT Hyderabad", rating: 5, text: "Mock interview with Jitesh sir felt like a real Google interview. The feedback was brutally honest and exactly what I needed. Cracked my next interview with confidence.", mentor: "Jitesh Vijaykumar" },
  { name: "Sahil Verma", college: "DTU Delhi", rating: 4, text: "Sonic bhaiya helped me understand system design from scratch. His Dell experience shows — he explains real production scenarios that no YouTube video covers.", mentor: "Sonic Payeng" },
  { name: "Prachi Mishra", college: "MNNIT Allahabad", rating: 5, text: "Aditya sir's career roadmap session was a game-changer. I was confused between data science and software dev — he helped me see the bigger picture and choose right.", mentor: "Aditya Dubey" },
  { name: "Kunal Sharma", college: "BIT Mesra", rating: 5, text: "Bipin bhaiya made JavaScript so simple. I was struggling with async/await for months. One session and everything clicked. Best mentor for web dev!", mentor: "Bipin Chaudhary" },
  { name: "Anshika Rani", college: "KIET Ghaziabad", rating: 5, text: "Tarsh sir doesn't just teach solutions — he teaches you how to think. My problem-solving speed improved drastically after just 3 sessions.", mentor: "Tarsh Vaibhav" },
  { name: "Rohit Pandey", college: "VIT Vellore", rating: 4, text: "The 1:1 session gave me clarity on what companies actually look for. Honest about industry expectations and helped me set realistic placement goals.", mentor: "Shubham Kaushik" },
  { name: "Sneha Chauhan", college: "MNNIT Allahabad", rating: 5, text: "I was lost about AI careers. After one session I had a clear 6-month roadmap. Now I'm interning at a startup and loving it.", mentor: "Aditya Dubey" },
  { name: "Varun Gupta", college: "NIT Trichy", rating: 4, text: "The portfolio review was super detailed. My mentor went through every project and helped me rewrite descriptions for maximum impact.", mentor: "Jitesh Vijaykumar" },
  { name: "Divya Kumari", college: "IIT BHU", rating: 5, text: "I realized my communication was the problem, not my technical skills. That single insight from the mock session changed everything.", mentor: "Sonic Payeng" },
  { name: "Harsh Agrawal", college: "LNMIIT Jaipur", rating: 5, text: "Tarsh sir connects every DSA problem to real interview patterns. I cracked my TCS Digital interview right after his sessions.", mentor: "Tarsh Vaibhav" },
  { name: "Meghna Reddy", college: "IIIT Bangalore", rating: 4, text: "Didn't know freshers could negotiate salary too. Ended up getting a 15% higher offer just by following the mentor's advice.", mentor: "Shubham Kaushik" },
]

const MENTOR_QUOTES = [
  { name: "Aditya Dubey", quote: "When we were in college, we faced the exact same confusion — no clear direction, no real exposure to how the industry works. Giving students the right guidance at the right time can literally change the trajectory of their career.", initials: "AD", color: "#1d3a8f", photo: "/mentors/aditya-dubey.jpg" },
  { name: "Sonic Payeng", quote: "Most students don't lack talent — they lack the right environment and mentor to push them in the right direction. I've seen brilliant engineers stuck because nobody told them what to focus on.", initials: "SP", color: "#16a34a", photo: "/mentors/sonic-payeng.jpg" },
  { name: "Shubham Kaushik", quote: "The problem is never just about skills. It's about environment, exposure, and knowing what the industry actually expects. Once you understand that gap, everything changes.", initials: "SK", color: "#b45309", photo: "/mentors/shubham-kaushik.jpg" },
  { name: "Tarsh Vaibhav", quote: "They know how to code but don't know how to think about problems. One good mentor can save years of confusion. That's why this matters.", initials: "TV", color: "#dc2626", photo: "/mentors/tarsh-vaibhav.jpg" },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= rating ? "#f59e0b" : "#e2e8f0"} stroke={i <= rating ? "#f59e0b" : "#e2e8f0"} strokeWidth="1">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function MentorsPage() {
  const avgRating = 4.6
  const activeMentors = MENTORS.filter(m => m.active)
  const extendedMentors = MENTORS.filter(m => !m.active)

  const COMPANIES = ["KPMG", "Dell Technologies", "PhonePe", "Zepto", "SAP", "HCLTech", "Wabtec", "Cograd"]

  return (
    <div style={{ minHeight: "100vh", background: "#fafbff", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <Navbar />
      <div style={{ height: 108 }} />

      {/* ── Hero ── */}
      <section style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #e8edff 60%, #f8faff 100%)", padding: "72px 24px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* background blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", right: "5%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,58,143,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-5%", left: "3%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,91,219,0.05) 0%, transparent 70%)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 18px", background: "white", border: "1.5px solid #dde5ff", borderRadius: 99, marginBottom: 28, boxShadow: "0 2px 12px rgba(29,58,143,0.08)" }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#1d3a8f", letterSpacing: ".06em", textTransform: "uppercase" }}>Mentor Program</span>
          </div>

          <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 18 }}>
            The right mentor at the<br />
            <span style={{ background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>right time</span> changes everything.
          </h1>

          <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.75, maxWidth: 580, margin: "0 auto 44px" }}>
            Working professionals from KPMG, Dell, PhonePe, SAP, HCLTech, Zepto & more — guiding you through the gap between college and the real world.
          </p>

          {/* Stats row */}
          <div className="hero-stats" style={{ display: "inline-flex", alignItems: "center", background: "white", border: "1.5px solid #e0e7ff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(29,58,143,0.08)" }}>
            {[
              { val: `${MENTORS.length}+`, label: "Total Mentors" },
              { val: `${activeMentors.length}`, label: "Active Now" },
              { val: `${COMPANIES.length}+`, label: "Companies" },
              { val: `${avgRating}★`, label: "Avg Rating" },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: "18px 28px", textAlign: "center", borderRight: i < 3 ? "1px solid #f1f5f9" : "none" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#1d3a8f", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company logos strip ── */}
      <div style={{ background: "white", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "14px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginRight: 8, letterSpacing: ".05em", textTransform: "uppercase" }}>Mentors from</span>
          {COMPANIES.map(c => (
            <span key={c} style={{ fontSize: 12, fontWeight: 700, color: "#334155", padding: "4px 12px", background: "#f8faff", border: "1px solid #e0e7ff", borderRadius: 99 }}>{c}</span>
          ))}
        </div>
      </div>

      <div className="m-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* ── Active Mentors ── */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", display: "inline-block", animation: "livePulse 2s infinite" }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em" }}>Active Mentors</h2>
          </div>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 32 }}>Currently taking 1:1 training, mock interviews &amp; mentoring sessions</p>

          <div className="active-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {activeMentors.map((m, i) => (
              <div key={i} className="mentor-card-active" style={{
                background: "white",
                borderRadius: 20,
                border: "1.5px solid #e8ecf4",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                overflow: "hidden",
                transition: "box-shadow .2s, transform .2s",
              }}>
                {/* Top accent bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${m.color}, ${m.color}66)` }} />

                <div style={{ padding: "24px 24px 22px" }}>
                  {/* Header: photo + name + company */}
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ width: 72, height: 72, borderRadius: 18, flexShrink: 0, overflow: "hidden", border: "2.5px solid #f1f5f9", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                      {m.photo ? (
                        <Image src={m.photo} alt={m.name} width={72} height={72} style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 900 }}>{m.initials}</div>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", lineHeight: 1.25, marginBottom: 3 }}>{m.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 8, lineHeight: 1.4 }}>{m.role}</div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: m.bg, color: m.color, border: `1px solid ${m.color}22` }}>
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" />
                        </svg>
                        {m.company}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 16 }}>{m.desc}</p>

                  {/* Topics */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {m.topics.map(t => (
                      <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: "#f8faff", color: "#334155", border: "1px solid #e0e7ff" }}>{t}</span>
                    ))}
                  </div>

                  {/* LinkedIn CTA */}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        fontSize: 12, fontWeight: 700, color: "#2563eb",
                        padding: "8px 16px", borderRadius: 10,
                        background: "#eff6ff", border: "1px solid #bfdbfe",
                        textDecoration: "none", transition: "background .15s",
                      }}
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                      </svg>
                      View on LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── All Mentors ── */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em" }}>All Mentors</h2>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>{MENTORS.length}+ professionals</span>
          </div>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 28 }}>
            From KPMG, Dell, PhonePe, SAP, HCLTech, Zepto &amp; growing startups
          </p>

          <div className="all-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {extendedMentors.map((m, i) => (
              <div key={i} className="mentor-card-sm" style={{
                background: "white",
                borderRadius: 20,
                border: "1.5px solid #e8ecf4",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                overflow: "hidden",
                transition: "box-shadow .2s, transform .2s",
              }}>
                {/* Colored header band */}
                <div style={{ height: 56, background: m.bg, position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 0 }}>
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${m.color}18 0%, ${m.color}08 100%)` }} />
                  {/* Avatar — overlaps the band */}
                  <div style={{
                    position: "absolute",
                    bottom: -26,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 52, height: 52, borderRadius: 16,
                    background: `linear-gradient(135deg, ${m.color}, ${m.color}bb)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 17, fontWeight: 900,
                    border: "3px solid white",
                    boxShadow: `0 4px 14px ${m.color}40`,
                    zIndex: 1,
                  }}>
                    {m.initials}
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: "34px 18px 18px", textAlign: "center" }}>
                  {/* Name + role */}
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", lineHeight: 1.25, marginBottom: 3 }}>{m.name}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 500, color: "#64748b", marginBottom: 10, lineHeight: 1.4 }}>{m.role}</div>

                  {/* Company badge */}
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 11, fontWeight: 700, padding: "4px 12px",
                    borderRadius: 99, background: m.bg, color: m.color,
                    border: `1.5px solid ${m.color}25`, marginBottom: 14,
                  }}>
                    <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /></svg>
                    {m.company}
                  </span>

                  {/* Divider */}
                  <div style={{ height: 1, background: "#f1f5f9", marginBottom: 14 }} />

                  {/* Topics */}
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
                    {m.topics.map(t => (
                      <span key={t} style={{ fontSize: 10.5, fontWeight: 600, padding: "4px 10px", borderRadius: 99, background: "#f8faff", color: "#334155", border: "1px solid #e0e7ff" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── What Our Mentors Say ── */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 16px", background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 99, marginBottom: 16, fontSize: 11, fontWeight: 800, color: "#1d3a8f", textTransform: "uppercase", letterSpacing: ".06em" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></svg>
              From Our Mentors
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 10 }}>Why They Give Back</h2>
            <p style={{ fontSize: 14, color: "#64748b", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
              They've been exactly where you are — no clear direction, no exposure. Here's why they chose to change that.
            </p>
          </div>

          <div className="quotes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {MENTOR_QUOTES.map((q, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 20, padding: "28px 26px",
                border: "1.5px solid #e8ecf4", boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 14, right: 20, fontSize: 72, fontWeight: 900, color: "#1d3a8f", opacity: 0.04, lineHeight: 1, pointerEvents: "none" }}>&ldquo;</div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, flexShrink: 0, overflow: "hidden", border: "2px solid #f1f5f9", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
                    {q.photo ? (
                      <Image src={q.photo} alt={q.name} width={46} height={46} style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${q.color}, ${q.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, fontWeight: 900 }}>{q.initials}</div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>{q.name}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: q.color, marginTop: 1 }}>Mentor</div>
                  </div>
                </div>

                <p style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.8, fontStyle: "italic" }}>
                  &ldquo;{q.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Student Reviews ── */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 16px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 99, marginBottom: 16, fontSize: 11, fontWeight: 800, color: "#b45309", textTransform: "uppercase", letterSpacing: ".06em" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              Student Reviews
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 10 }}>What Students Say</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i <= Math.round(avgRating) ? "#f59e0b" : "#e2e8f0"} stroke={i <= Math.round(avgRating) ? "#f59e0b" : "#e2e8f0"} strokeWidth="1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>{avgRating}</span>
              <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>({REVIEWS.length}+ reviews)</span>
            </div>
          </div>

          <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 16, padding: "20px 18px",
                border: "1.5px solid #e8ecf4", boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <Stars rating={r.rating} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8" }}>{r.college}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.75, marginBottom: 16 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>{r.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#1d3a8f", background: "#eef2ff", padding: "2px 9px", borderRadius: 99 }}>via {r.mentor.split(" ")[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Consultancy Live Soon ── */}
        <div style={{ background: "white", borderRadius: 24, border: "1.5px solid #e0e7ff", boxShadow: "0 4px 24px rgba(29,58,143,0.07)", padding: "40px 40px 36px", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg, #1d3a8f, #3b5bdb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(29,58,143,0.25)" }}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14" /><rect x="1" y="6" width="14" height="12" rx="2" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.25, marginBottom: 4 }}>
                  Mentor Consultancy — Live Sessions
                </h3>
                <p style={{ fontSize: 13, color: "#64748b" }}>Book 1:1 video sessions directly with our mentors</p>
              </div>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", background: "#eef2ff", border: "1.5px solid #c7d2fe", borderRadius: 99, fontSize: 11, fontWeight: 800, color: "#1d3a8f", whiteSpace: "nowrap" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1d3a8f", display: "inline-block", animation: "livePulse 2s infinite" }} />
              Coming Soon
            </span>
          </div>

          <div className="consultancy-features" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M1 6h14v12H1Z", title: "Live Video Calls", desc: "Face-to-face via Google Meet or Zoom" },
              { icon: "M12 2L2 7l10 5 10-5-10-5Z M2 17l10 5 10-5", title: "Personalized Roadmaps", desc: "Career plan tailored to your goals" },
              { icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2", title: "Resume & Interview Prep", desc: "Real feedback, mock sessions & more" },
            ].map((f, j) => (
              <div key={j} style={{ background: "#f8faff", borderRadius: 14, padding: "18px 16px", border: "1px solid #e0e7ff" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={f.icon} /></svg>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.55 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Become a Mentor CTA ── */}
        <div style={{
          textAlign: "center", padding: "52px 24px",
          background: "linear-gradient(135deg, #1d3a8f 0%, #2d4fd4 60%, #3b5bdb 100%)",
          borderRadius: 24, boxShadow: "0 8px 40px rgba(29,58,143,0.28)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "-20%", right: "-5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: "-30%", left: "-3%", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 16px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 99, marginBottom: 20, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)", letterSpacing: ".06em", textTransform: "uppercase" }}>
              For Professionals
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: "-0.03em" }}>
              Want to mentor students?
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 28, maxWidth: 400, margin: "0 auto 28px", lineHeight: 1.7 }}>
              Your experience is their shortcut. Your time is their turning point.
            </p>
            <Link href="/become-mentor" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px",
              background: "white", color: "#1d3a8f", borderRadius: 12,
              fontSize: 14, fontWeight: 800, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              transition: "transform .15s",
            }}>
              Apply as Mentor
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes livePulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(1.3); } }
        .mentor-card-active:hover { box-shadow:0 8px 32px rgba(0,0,0,0.09) !important; transform:translateY(-2px); }
        .mentor-card-sm:hover { box-shadow:0 6px 20px rgba(0,0,0,0.07) !important; transform:translateY(-2px); }
        @media (max-width: 640px) {
          .m-wrap { padding: 40px 16px 56px !important; }
          .hero-stats { flex-direction: column !important; width: 100% !important; }
          .active-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .all-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .quotes-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .reviews-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .consultancy-features { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .active-grid { grid-template-columns: 1fr !important; }
          .all-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}} />

      <Footer />
    </div>
  )
}
