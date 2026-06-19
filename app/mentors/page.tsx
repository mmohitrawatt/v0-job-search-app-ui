"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"

/* ─── DB Mentor type (from mentor_applications) ── */
type DBMentor = {
  id: string; full_name: string; job_title: string; domain: string; experience: string
  linkedin?: string; short_intro?: string; professional_bio?: string
  mentorship_topics: string[]; photo_url?: string; location?: string
  session_price?: number; session_duration?: string
  mentorship_format: string[]; available_days?: string[]
}

const DOMAIN_COLORS: Record<string, { color: string; bg: string }> = {
  "AI/ML":        { color: "#7c3aed", bg: "#f5f3ff" },
  "Full Stack":   { color: "#1d3a8f", bg: "#eef1fd" },
  "Backend":      { color: "#0f766e", bg: "#f0fdfa" },
  "Data Science": { color: "#0891b2", bg: "#ecfeff" },
  "Web Dev":      { color: "#1d3a8f", bg: "#eef1fd" },
  "DevOps":       { color: "#0369a1", bg: "#e0f2fe" },
  "UI/UX":        { color: "#e11d48", bg: "#fff1f2" },
  "DSA":          { color: "#16a34a", bg: "#f0fdf4" },
  "Consulting":   { color: "#b45309", bg: "#fffbeb" },
  "Embedded":     { color: "#dc2626", bg: "#fef2f2" },
}

function domainStyle(domain: string) {
  for (const [key, val] of Object.entries(DOMAIN_COLORS)) {
    if (domain?.toLowerCase().includes(key.toLowerCase())) return val
  }
  return { color: "#1d3a8f", bg: "#eef1fd" }
}

function initials(name: string) {
  const parts = name.trim().split(" ")
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

function dbToMentor(m: DBMentor) {
  const { color, bg } = domainStyle(m.domain)
  return {
    name: m.full_name,
    role: m.job_title,
    company: m.domain,
    initials: initials(m.full_name),
    photo: m.photo_url || "",
    color,
    bg,
    desc: m.professional_bio || m.short_intro || "",
    linkedin: m.linkedin || "",
    topics: m.mentorship_topics || [],
    active: true,
  }
}

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
    desc: "Shubham Kaushik is an AI and financial intelligence researcher with more than five years of experience in artificial intelligence, machine learning, and full-stack development. His work focuses on applied AI research, including large language models, intelligent data systems, and scalable applications for financial analysis and enterprise solutions.",
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
    desc: "Jitesh Vijaykumar is an AI engineer with over five years of experience building scalable artificial intelligence solutions for enterprise systems. With an M.Tech in Artificial Intelligence and Data Science, his work focuses on developing practical machine learning applications that solve real-world business problems. At KPMG, he contributes to designing and implementing AI-powered solutions that improve decision-making, automation, and operational efficiency.",
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
    desc: "Sonic Payeng is an AI engineer specializing in applied machine learning, intelligent automation, and large language model systems. He completed his M.Tech in Artificial Intelligence and Data Science from NIT Allahabad (MNNIT) and currently works at Dell Technologies on the Dell Automation Platform. His work focuses on building AI-driven automation solutions across on-premise, SaaS, and hybrid cloud environments.",
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
    desc: "Aditya Dubey is an AI Engineer focused on building and deploying intelligent systems that help organizations leverage artificial intelligence for business growth, automation, and operational transformation. He has mentored more than 12,000 professionals and students in AI technologies and practical industry applications. With an M.Tech in Information Systems from NIT Allahabad, Aditya works on translating complex AI concepts into real-world solutions that drive measurable impact for businesses and startups.",
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
    desc: "Bipin Chaudhary is a Full Stack Developer with around 2.5 years of experience working with JavaScript, TypeScript, Angular, Node.js, and SQL. He has worked with SAP as an intern, gaining strong fundamentals in backend systems and databases. Bipin is passionate about building real-world applications and simplifying complex concepts, with a focus on helping students understand programming and computer science in a practical and easy-to-grasp way.",
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
    desc: "Tarsh Vaibhav is an Embedded Software Engineer with 1 year of experience at Wabtec Corporation and a graduate of MNNIT Allahabad. Driven by a passion for education, he currently serves as a DSA Trainer at KIET Group of Institutions, Ghaziabad, where he has trained 500+ students in Data Structures and Algorithms. He brings real industry insight into every session — making complex concepts simple, engaging, and interview-ready — helping students confidently crack placements at top tech companies.",
    linkedin: "https://www.linkedin.com/in/tarsh-vaibhav-4410561b0/",
    topics: ["DSA", "Interview Prep", "Placement Guidance", "Embedded Systems"],
    active: true,
  },
  {
    name: "Ashirvad Kar Pathak",
    role: "Software Engineer 2",
    company: "Dell Technologies",
    initials: "AK",
    photo: "/mentors/Ashirvad Kar Pathak.jpeg",
    color: "#0f766e",
    bg: "#f0fdfa",
    desc: "Ashirvad Kar Pathak is a Software Engineer 2 at Dell Technologies, where he works on Data Protection appliances. He brings a strong foundation in core computer science principles along with hands-on expertise in C and C++. Passionate about teaching and growth, he mentors students through DSA, systems programming, and placement preparation — making complex engineering concepts approachable and interview-ready.",
    linkedin: "https://www.linkedin.com/in/ashirvad-kar-pathak",
    topics: ["C / C++", "DSA", "Interview Prep", "Systems Programming"],
    active: true,
  },
  {
    name: "Yukta Manek",
    role: "Software Engineer III",
    company: "Walmart Mexico & Central America",
    initials: "YM",
    photo: "/mentors/Yukta_manek.jpeg",
    color: "#be185d",
    bg: "#fdf2f8",
    desc: "Yukta Manek is a Software Engineer III with 5 years of experience, currently at Walmart Mexico and Central America. She specializes in building scalable backend systems and microservices, with a focus on performance, reliability, and delivering business impact in high-traffic environments. She mentors students on backend engineering, system design, and building the skills needed to crack interviews at top product companies.",
    linkedin: "https://www.linkedin.com/in/yukta-manek/",
    topics: ["Backend Systems", "Microservices", "System Design", "Interview Prep"],
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
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const [dbMentors, setDbMentors] = useState<DBMentor[]>([])

  useEffect(() => {
    fetch("/api/mentors")
      .then(r => r.json())
      .then((data: DBMentor[]) => { if (Array.isArray(data)) setDbMentors(data) })
      .catch(() => {})
  }, [])

  /* Hardcoded mentors always shown + new DB published mentors (skip duplicates by name) */
  const hardcodedActive = MENTORS.filter(m => m.active)
  const hardcodedNames = new Set(hardcodedActive.map(m => m.name.toLowerCase()))
  const activeMentors = [
    ...hardcodedActive,
    ...dbMentors.map(dbToMentor).filter(m => !hardcodedNames.has(m.name.toLowerCase())),
  ]

  const extendedMentors = MENTORS.filter(m => !m.active)

  const toggleExpand = (i: number) => {
    setExpandedCards(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const COMPANIES = ["KPMG", "Dell Technologies", "PhonePe", "Zepto", "SAP", "HCLTech", "Wabtec", "Cograd"]

  return (
    <div style={{ minHeight: "100vh", background: "#fafbff", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero-section" style={{ background: "linear-gradient(180deg,#f0f4ff 0%,#e8edff 60%,#f8faff 100%)", textAlign: "center", position: "relative", overflow: "hidden", paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        {/* background blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", right: "5%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,58,143,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-5%", left: "3%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,91,219,0.05) 0%, transparent 70%)" }} />
        </div>

        {/* navbar spacer — pushes content below fixed navbar on all screen sizes */}
        <div style={{ height: "var(--navbar-offset, 90px)" }} />
        <style>{`:root{--navbar-offset:90px}@media(min-width:1024px){:root{--navbar-offset:126px}}`}</style>

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
          <style>{`
            .mn-stats { display: grid; grid-template-columns: 1fr 1fr; width: 100%; max-width: 420px; margin: 0 auto 28px; background: white; border: 1.5px solid #e0e7ff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(29,58,143,0.08); }
            .mn-stat { padding: 16px 20px; text-align: center; }
            .mn-stat:nth-child(1), .mn-stat:nth-child(2) { border-bottom: 1px solid #f1f5f9; }
            .mn-stat:nth-child(odd) { border-right: 1px solid #f1f5f9; }
            .mn-stat-val { font-size: 22px; font-weight: 900; color: #1d3a8f; letter-spacing: -0.03em; line-height: 1; }
            .mn-stat-lbl { font-size: 11px; font-weight: 600; color: #94a3b8; margin-top: 4px; }
            @media(min-width: 600px) {
              .mn-stats { grid-template-columns: repeat(4, 1fr); max-width: 560px; }
              .mn-stat:nth-child(1), .mn-stat:nth-child(2) { border-bottom: none; }
              .mn-stat:nth-child(odd) { border-right: 1px solid #f1f5f9; }
              .mn-stat:not(:last-child) { border-right: 1px solid #f1f5f9; }
            }
            .mn-cta { display: flex; flex-direction: column; align-items: center; gap: 10px; }
            @media(min-width: 480px) { .mn-cta { flex-direction: row; justify-content: center; } }
          `}</style>

          <div className="mn-stats">
            {[
              { val: `${MENTORS.length}+`, label: "Total Mentors" },
              { val: `${activeMentors.length}`, label: "Active Now" },
              { val: `${COMPANIES.length}+`, label: "Companies" },
              { val: `${avgRating}★`, label: "Avg Rating" },
            ].map(s => (
              <div key={s.label} className="mn-stat">
                <div className="mn-stat-val">{s.val}</div>
                <div className="mn-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Apply CTA */}
          <div className="mn-cta">
            <Link href="/become-mentor" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 13,
              background: "linear-gradient(135deg, #1a3585, #2d4fd4 55%, #4668f5)",
              color: "white", fontWeight: 800, fontSize: 14, textDecoration: "none",
              boxShadow: "0 4px 18px rgba(29,58,143,0.32)",
            }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Apply as Mentor
            </Link>
            <span style={{ fontSize: 12.5, color: "#94a3b8", fontWeight: 500 }}>Free to apply · Takes 5 minutes</span>
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

          <div className="active-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
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
                  <div style={{ marginBottom: 16 }}>
                    <p style={{
                      fontSize: 13, color: "#64748b", lineHeight: 1.7, margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: expandedCards.has(i) ? "unset" : 3,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: expandedCards.has(i) ? "visible" : "hidden",
                      transition: "all .2s",
                    }}>{m.desc}</p>
                    <button
                      onClick={() => toggleExpand(i)}
                      style={{
                        marginTop: 6, fontSize: 12, fontWeight: 700,
                        color: "#1d3a8f", background: "none", border: "none",
                        padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                      }}
                    >
                      {expandedCards.has(i) ? "View less" : "View more"}
                      <svg
                        width="12" height="12" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        style={{ transform: expandedCards.has(i) ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>

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

          <div className="all-grid" style={{ display: "flex", flexDirection: "row", overflowX: "auto", gap: 14, paddingBottom: 14, paddingTop: 2, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
            {extendedMentors.map((m, i) => (
              <div key={i} className="mentor-card-sm" style={{
                flexShrink: 0,
                width: 260,
                scrollSnapAlign: "start",
                background: "white",
                borderRadius: 16,
                border: "1.5px solid #eaecf0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)",
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                transition: "box-shadow .2s, transform .2s",
              }}>

                {/* Top row: avatar + name/role */}
                <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 14 }}>
                  {/* Circle avatar with ring */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${m.color} 0%, ${m.color}88 100%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 15, fontWeight: 900,
                      boxShadow: `0 0 0 3px ${m.color}18`,
                    }}>
                      {m.initials}
                    </div>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.4, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.role}</div>
                  </div>
                </div>

                {/* Company badge */}
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5, alignSelf: "flex-start",
                  fontSize: 11, fontWeight: 700, padding: "4px 10px",
                  borderRadius: 99, background: m.bg, color: m.color,
                  border: `1px solid ${m.color}25`, marginBottom: 12,
                }}>
                  <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /></svg>
                  {m.company}
                </span>

                {/* Description */}
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7, margin: "0 0 14px", flexGrow: 1 }}>{m.desc}</p>

                {/* Divider */}
                <div style={{ height: 1, background: "#f1f5f9", marginBottom: 12 }} />

                {/* Topics */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {m.topics.map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 99, background: "#f8faff", color: "#334155", border: "1px solid #e0e7ff" }}>{t}</span>
                  ))}
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

          <div className="reviews-grid" style={{ display: "flex", flexDirection: "row", overflowX: "auto", gap: 16, paddingBottom: 12, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 16, padding: "20px 18px",
                border: "1.5px solid #e8ecf4", boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
                flexShrink: 0, width: 300, scrollSnapAlign: "start",
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
        <div className="consultancy-card" style={{ background: "white", borderRadius: 24, border: "1.5px solid #e0e7ff", boxShadow: "0 4px 24px rgba(29,58,143,0.07)", padding: "40px 40px 36px", marginBottom: 32 }}>
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
        <div className="cta-bar" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 20, padding: "28px 36px",
          background: "linear-gradient(135deg, #1d3a8f 0%, #2d4fd4 60%, #3b5bdb 100%)",
          borderRadius: 18, boxShadow: "0 4px 24px rgba(29,58,143,0.22)",
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 6 }}>For Professionals</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 4 }}>Want to mentor students?</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Your experience is their shortcut. Your time is their turning point.</div>
          </div>
          <Link href="/become-mentor" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px",
            background: "white", color: "#1d3a8f", borderRadius: 10, flexShrink: 0,
            fontSize: 13, fontWeight: 800, textDecoration: "none",
            boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          }}>
            Apply as Mentor
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes livePulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(1.3); } }
        .all-grid::-webkit-scrollbar { display: none; }
        .all-grid { scrollbar-width: none; }
        .reviews-grid::-webkit-scrollbar { display: none; }
        .reviews-grid { scrollbar-width: none; }
        .mentor-card-active:hover { box-shadow:0 8px 32px rgba(0,0,0,0.09) !important; transform:translateY(-2px); }
        .mentor-card-sm:hover { box-shadow:0 6px 20px rgba(0,0,0,0.07) !important; transform:translateY(-2px); }
        @media (max-width: 640px) {
          .nav-spacer { height: 72px !important; }
          .hero-section { padding: 48px 16px 44px !important; }
          .m-wrap { padding: 36px 16px 56px !important; }
          .hero-stats { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; width: calc(100% - 32px) !important; border-radius: 14px !important; margin: 0 auto !important; }
          .hero-stats > div { border-right: none !important; border-bottom: 1px solid #f1f5f9 !important; padding: 16px 12px !important; }
          .hero-stats > div:nth-child(1) { border-right: 1px solid #f1f5f9 !important; }
          .hero-stats > div:nth-child(2) { }
          .hero-stats > div:nth-child(3) { border-right: 1px solid #f1f5f9 !important; border-bottom: none !important; }
          .hero-stats > div:nth-child(4) { border-bottom: none !important; }
          .active-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .all-grid { gap: 12px !important; }
          .quotes-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .reviews-grid { gap: 12px !important; }
          .consultancy-features { grid-template-columns: 1fr !important; gap: 12px !important; }
          .consultancy-card { padding: 24px 18px 22px !important; border-radius: 16px !important; }
          .cta-bar { padding: 22px 20px !important; border-radius: 14px !important; }
          .cta-bar a { width: 100% !important; justify-content: center !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .active-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .all-grid { gap: 14px !important; }
          .reviews-grid { gap: 14px !important; }
          .consultancy-features { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}} />

      <Footer />
    </div>
  )
}
