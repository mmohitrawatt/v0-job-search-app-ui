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

/* Deterministic pseudo-stat from a seed string — stable across renders (no Math.random) */
function seededStat(seed: string, min: number, max: number) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) }
  return min + (Math.abs(h) % (max - min + 1))
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

const HERO_PHOTOS_LEFT = [
  "/mentors/shubham-kaushik.jpg",
  "/mentors/jitesh-vijaykumar.jpg",
  "/mentors/sonic-payeng.jpg",
  "/mentors/bipin-chaudhary.jpg",
]
const HERO_PHOTOS_RIGHT = [
  "/mentors/aditya-dubey.jpg",
  "/mentors/tarsh-vaibhav.jpg",
  "/mentors/Ashirvad Kar Pathak.jpeg",
  "/mentors/Yukta_manek.jpeg",
]

const ALL_HERO_PHOTOS = [...HERO_PHOTOS_LEFT, ...HERO_PHOTOS_RIGHT]
/* 4 marquee columns — different orderings so it never looks repeated across columns */
const MARQUEE_COLS = [
  ALL_HERO_PHOTOS,
  [...ALL_HERO_PHOTOS].reverse(),
  [...ALL_HERO_PHOTOS.slice(3), ...ALL_HERO_PHOTOS.slice(0, 3)],
  [...ALL_HERO_PHOTOS.slice(5), ...ALL_HERO_PHOTOS.slice(0, 5)].reverse(),
]

/* A single vertical auto-scrolling column of photos (content duplicated for seamless loop) */
function MarqueeColumn({ photos, direction, duration }: { photos: string[]; direction: "up" | "down"; duration: number }) {
  return (
    <div style={{ flex: 1, minWidth: 0, height: "100%", overflow: "hidden" }}>
      <div className="marq-track" style={{ animation: `${direction === "up" ? "marqUp" : "marqDown"} ${duration}s linear infinite` }}>
        {[...photos, ...photos].map((p, i) => (
          <div key={i} className="marq-tile">
            <Image src={p} alt="" width={200} height={200} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          </div>
        ))}
      </div>
    </div>
  )
}

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

/* ─── Rich 1:1 Session card ───────────────────────── */
const SESSION_OFFERS = [
  { title: "Professionalize your resume", desc: "Expert feedback to make your resume stand out", icon: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" },
  { title: "Clarify your target", desc: "Define the exact roles and companies you should aim for", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01" },
  { title: "Launch your search", desc: "Leave with the essential assets to start applying today", icon: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" },
  { title: "Get personalized advice", desc: "Tailored guidance for your specific career goals", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
]

function MentorSessionCard({ m }: { m: any }) {
  const sessions = seededStat(m.name + "s", 62, 480)
  const reviews = seededStat(m.name + "r", 42, 180)
  const rating = (46 + seededStat(m.name + "g", 0, 3)) / 10
  const students = seededStat(m.name + "st", 320, 1200)
  const price = 199 + seededStat(m.name + "p", 0, 6) * 50
  const shortCompany = (m.company || "").split(" ")[0]
  const bio = m.desc || `${m.role} at ${m.company}.`

  return (
    <div className="session-card">
      {/* Header strip */}
      <div className="sc-head">
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#0c1a35", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
        </div>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: "#0c1a35", letterSpacing: "-0.01em" }}>30-min 1:1 Session with {m.name}</span>
        <span className="sc-head-avail" style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 99, background: "#ecfdf3", border: "1px solid #d1fadf", fontSize: 11.5, fontWeight: 800, color: "#12805c", whiteSpace: "nowrap" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.18)", animation: "livePulse 2s infinite" }} />
          Available now
        </span>
      </div>

      <div className="sc-body">
        {/* LEFT */}
        <div className="sc-left">
          <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 14 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", background: "#eef1f6", boxShadow: "0 0 0 3px #fff, 0 3px 10px rgba(15,23,42,0.14)" }}>
                {m.photo ? (
                  <Image src={m.photo} alt={m.name} width={56} height={56} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#1d3a8f", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 900 }}>{m.initials}</div>
                )}
              </div>
              <span style={{ position: "absolute", bottom: 1, right: 1, width: 13, height: 13, borderRadius: "50%", background: "#16a34a", border: "2.5px solid #fff" }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 17, fontWeight: 900, color: "#0c1a35", letterSpacing: "-0.02em" }}>{m.name}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M12 2l2.09 1.52 2.55-.36 1.06 2.35 2.35 1.06-.36 2.55L21.21 12l-1.52 2.09.36 2.55-2.35 1.06-1.06 2.35-2.55-.36L12 21.21l-2.09-1.52-2.55.36-1.06-2.35-2.35-1.06.36-2.55L2.79 12 4.31 9.91l-.36-2.55 2.35-1.06 1.06-2.35 2.55.36z" fill="#1d3a8f" /><path d="M8.5 12l2.3 2.3 4.7-4.9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 500, color: "#64748b", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.role} <span style={{ color: "#a2acbd" }}>· {m.company}</span></div>
            </div>
          </div>

          {/* rating line */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 13 }}>
            <Stars rating={Math.round(rating)} />
            <span style={{ fontSize: 12.5, fontWeight: 800, color: "#0c1a35" }}>{rating.toFixed(1)}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>· {reviews} reviews</span>
          </div>

          {/* pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 13 }}>
            <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 99, background: "#0c1a35", color: "#fff" }}>#{shortCompany}</span>
            {(m.topics || []).slice(0, 3).map((t: string) => (
              <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "#eef2ff", color: "#1d3a8f" }}>{t}</span>
            ))}
            {(m.topics || []).length > 3 && (
              <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "#f1f5f9", color: "#64748b" }}>+{m.topics.length - 3}</span>
            )}
          </div>

          {/* bio */}
          <p style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.65, margin: "0 0 14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{bio}</p>

          {/* meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, paddingTop: 12, borderTop: "1px solid #f1f5f9", fontSize: 12, fontWeight: 600, color: "#64748b" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              {sessions} sessions
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              {students} students
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="sc-right">
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#0c1a35", marginBottom: 12 }}>What you&rsquo;ll get</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
            {SESSION_OFFERS.map((o, k) => (
              <div key={k} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#1d3a8f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0c1a35", lineHeight: 1.35 }}>{o.title}</div>
                  <div style={{ fontSize: 11.5, color: "#94a3b8", lineHeight: 1.4, marginTop: 1 }}>{o.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap", marginTop: 16, paddingTop: 14, borderTop: "1px solid #f1f5f9" }}>
            <div><span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>Session fee</span><div style={{ fontSize: 22, fontWeight: 900, color: "#0c1a35", letterSpacing: "-0.02em", lineHeight: 1 }}>₹{price}</div></div>
            <a href="https://ai.jobingen.com/mentors" target="_blank" rel="noopener noreferrer" className="sc-book" style={{
              display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 26px",
              background: "#1d3a8f", color: "#fff", borderRadius: 12, border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 800, textDecoration: "none",
              boxShadow: "0 6px 18px rgba(29,58,143,0.3)", transition: "transform .18s, box-shadow .18s, filter .18s",
            }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              Book Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MentorsPage() {
  const avgRating = 4.6
  const [dbMentors, setDbMentors] = useState<DBMentor[]>([])
  const [mode, setMode] = useState<"mentee" | "mentor">("mentee")

  const scrollToMentors = () => {
    document.getElementById("mentors-list")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

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

  const COMPANIES = ["KPMG", "Dell Technologies", "PhonePe", "Zepto", "SAP", "HCLTech", "Wabtec", "Cograd"]
  const LOGO_MAP: Record<string, string> = {
    "KPMG": "/logos/kpmg.svg",
    "Dell Technologies": "/logos/dell.svg",
    "PhonePe": "/logos/phonepe.svg",
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", overflowX: "hidden", fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>
      <Navbar />

      {/* ── Hero (ADPList-style: side photo collage + center content + Mentee/Mentor toggle) ── */}
      <section className="hero-section" style={{ background: "#ffffff", position: "relative", overflow: "hidden", paddingBottom: 56, paddingLeft: 24, paddingRight: 24 }}>
        {/* navbar spacer — pushes content below fixed navbar on all screen sizes */}
        <div style={{ height: "var(--navbar-offset, 70px)" }} />
        <style>{`:root{--navbar-offset:70px}@media(min-width:1024px){:root{--navbar-offset:96px}}`}</style>

        {/* Segmented pill toggle — For Students / For Mentors */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{
            position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr",
            background: "#f1f4fb", border: "1.5px solid #e0e7ff", borderRadius: 99,
            padding: 5, gap: 0, width: 340, boxShadow: "inset 0 1px 2px rgba(15,23,42,0.04)",
          }}>
            {/* sliding highlight */}
            <span style={{
              position: "absolute", top: 5, bottom: 5, width: "calc(50% - 5px)",
              left: mode === "mentee" ? 5 : "calc(50%)",
              borderRadius: 99, background: "#1d3a8f",
              boxShadow: "0 3px 10px rgba(29,58,143,0.28)", transition: "left .28s cubic-bezier(.4,0,.2,1)",
            }} />
            {([["mentee", "Find a Mentor"], ["mentor", "Become a Mentor"]] as const).map(([key, label]) => {
              const on = mode === key
              return (
                <button key={key} onClick={() => setMode(key)} style={{
                  position: "relative", zIndex: 1, background: "none", border: "none", cursor: "pointer",
                  padding: "9px 4px", fontSize: 13.5, fontWeight: 800, letterSpacing: "-0.01em",
                  color: on ? "#ffffff" : "#64748b", transition: "color .2s",
                }}>
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 3-column layout: left photos · center · right photos */}
        <div className="hero-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr minmax(0,600px) 1fr", alignItems: "center", maxWidth: 1360, margin: "0 auto" }}>

          {/* Left photo collage + floating glass card */}
          <div style={{ position: "relative" }}>
            <div className="hero-photos hero-photos-left" aria-hidden>
              <div style={{ display: "flex", gap: 14, height: "100%" }}>
                <MarqueeColumn photos={MARQUEE_COLS[0]} direction="up" duration={38} />
                <MarqueeColumn photos={MARQUEE_COLS[1]} direction="down" duration={46} />
              </div>
            </div>
          </div>

          {/* Center content */}
          <div key={mode} className="hero-center" style={{ textAlign: "center", padding: "8px 12px 0" }}>
            {/* eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 99, background: "#f1f4fb", border: "1px solid #e0e7ff", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1d3a8f", animation: "livePulse 2s infinite" }} />
              <span style={{ fontSize: 11.5, fontWeight: 800, color: "#1d3a8f", letterSpacing: ".04em", textTransform: "uppercase" }}>
                {mode === "mentee" ? "Live 1:1 Mentorship" : "Join the mentor community"}
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(33px, 4.6vw, 56px)", fontWeight: 900, color: "#0c1a35", letterSpacing: "-0.045em", lineHeight: 1.04, marginBottom: 20 }}>
              {mode === "mentee" ? (
                <>Level up faster with<br />the <span style={{ color: "#1d3a8f" }}>right mentor</span></>
              ) : (
                <>Your experience is<br />someone&rsquo;s <span style={{ color: "#1d3a8f" }}>shortcut</span></>
              )}
            </h1>

            <p style={{ fontSize: 16.5, color: "#475569", lineHeight: 1.7, maxWidth: 470, margin: "0 auto 30px" }}>
              {mode === "mentee" ? (
                <>Get 1:1 guidance from working professionals at KPMG, Dell, PhonePe, SAP &amp; more — {" "}<b style={{ color: "#0c1a35" }}>60+ mentors</b> in the community.</>
              ) : (
                <>Guide students through the gap between college and the real world. Give back, grow your network, and define your legacy.</>
              )}
            </p>

            {/* CTA — search (mentee) / button (mentor) */}
            {mode === "mentee" ? (
              <div style={{ maxWidth: 500, margin: "0 auto" }}>
                <div className="hero-search" style={{ display: "flex", alignItems: "center", gap: 10, background: "white", border: "1.5px solid #e0e7ff", borderRadius: 16, padding: "6px 6px 6px 18px", boxShadow: "0 8px 30px rgba(29,58,143,0.08)" }}>
                  <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                  <input
                    placeholder="What do you want to get better at?"
                    onKeyDown={(e) => { if (e.key === "Enter") scrollToMentors() }}
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 15, color: "#0f172a", background: "transparent", minWidth: 0 }}
                  />
                  <button onClick={scrollToMentors} className="hero-find-btn" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 22px", borderRadius: 12, background: "#1d3a8f", color: "white", fontWeight: 800, fontSize: 14, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(29,58,143,0.28)" }}>
                    Find
                  </button>
                </div>
                {/* trust row: avatar stack */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
                  <div style={{ display: "flex" }}>
                    {[...HERO_PHOTOS_LEFT.slice(0, 2), ...HERO_PHOTOS_RIGHT.slice(0, 2)].map((p, i) => (
                      <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", overflow: "hidden", border: "2.5px solid #fff", marginLeft: i === 0 ? 0 : -10, boxShadow: "0 2px 6px rgba(15,23,42,0.12)", position: "relative", zIndex: 4 - i }}>
                        <Image src={p} alt="" width={30} height={30} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {[1, 2, 3, 4, 5].map(i => (
                        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                      <span style={{ fontSize: 12.5, fontWeight: 800, color: "#0c1a35", marginLeft: 3 }}>{avgRating}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>Loved by 500+ students</div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <Link href="/become-mentor" className="hero-find-btn" style={{
                  display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 40px", borderRadius: 14,
                  background: "#1d3a8f", color: "white", fontWeight: 800, fontSize: 15.5,
                  textDecoration: "none", boxShadow: "0 6px 22px rgba(29,58,143,0.32)",
                }}>
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  Become a Mentor
                </Link>
                <span style={{ fontSize: 12.5, color: "#94a3b8", fontWeight: 500 }}>Free to apply · Takes 5 minutes</span>
              </div>
            )}
          </div>

          {/* Right photo collage + floating glass card */}
          <div style={{ position: "relative" }}>
            <div className="hero-photos hero-photos-right" aria-hidden>
              <div style={{ display: "flex", gap: 14, height: "100%" }}>
                <MarqueeColumn photos={MARQUEE_COLS[2]} direction="down" duration={42} />
                <MarqueeColumn photos={MARQUEE_COLS[3]} direction="up" duration={50} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Company logos strip ── */}
      <div style={{ background: "#ffffff", borderTop: "1px solid #eef1f6", borderBottom: "1px solid #eef1f6", padding: "18px 24px" }}>
        <div className="logo-strip" style={{ maxWidth: 980, margin: "0 auto", display: "flex", alignItems: "center", gap: 26, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: ".06em", textTransform: "uppercase" }}>Mentors from</span>
          {COMPANIES.map(c => (
            LOGO_MAP[c] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={c} src={LOGO_MAP[c]} alt={c} className="logo-img" style={{ height: 26, width: "auto", objectFit: "contain", display: "block" }} />
            ) : (
              <span key={c} className="logo-word" style={{ fontSize: 15, fontWeight: 800, color: "#64748b", letterSpacing: "-0.02em" }}>{c}</span>
            )
          ))}
        </div>
      </div>

      <div className="m-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* ── Active Mentors ── */}
        <div id="mentors-list" style={{ marginBottom: 48, scrollMarginTop: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", display: "inline-block", animation: "livePulse 2s infinite" }} />
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0c1a35", letterSpacing: "-0.03em" }}>Active Mentors</h2>
          </div>
          <p style={{ fontSize: 13.5, color: "#64748b", marginBottom: 28 }}>Currently taking 1:1 training, mock interviews &amp; mentoring sessions</p>

          <div className="session-stack">
            {activeMentors.map((m, i) => (
              <MentorSessionCard key={i} m={m} />
            ))}
          </div>
        </div>

        {/* ── All Mentors ── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0c1a35", letterSpacing: "-0.03em" }}>Meet the full network</h2>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1d3a8f", background: "#eef2ff", padding: "4px 12px", borderRadius: 99 }}>{MENTORS.length}+ professionals</span>
          </div>
          <p style={{ fontSize: 13.5, color: "#64748b", marginBottom: 26 }}>
            From KPMG, Dell, PhonePe, SAP, HCLTech, Zepto &amp; growing startups
          </p>

          <div className="all-grid" style={{ display: "flex", flexDirection: "row", overflowX: "auto", gap: 14, paddingBottom: 14, paddingTop: 2, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
            {extendedMentors.map((m, i) => (
              <div key={i} className="mentor-card-sm" style={{
                flexShrink: 0,
                width: 240,
                scrollSnapAlign: "start",
                background: "white",
                borderRadius: 16,
                border: "1px solid #edf0f6",
                boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 6px 16px rgba(15,23,42,0.04)",
                padding: "18px 16px",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow .25s, transform .25s",
              }}>
                {/* Top row: avatar + name/role */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 13 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                    background: "#eef2ff", color: "#1d3a8f",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, fontWeight: 900, boxShadow: "inset 0 0 0 1px #e0e7ff",
                  }}>{m.initials}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#0c1a35", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.4, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.role}</div>
                  </div>
                </div>

                {/* Company chip (neutral) */}
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5, alignSelf: "flex-start",
                  fontSize: 11, fontWeight: 700, padding: "4px 10px",
                  borderRadius: 8, background: "#f5f7fb", color: "#475569",
                  border: "1px solid #eef1f6", marginBottom: 12,
                }}>
                  <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /></svg>
                  {m.company}
                </span>

                {/* Description (2-line clamp) */}
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.65, margin: "0 0 14px", flexGrow: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{m.desc}</p>

                {/* Divider */}
                <div style={{ height: 1, background: "#f1f5f9", marginBottom: 12 }} />

                {/* Topics */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {m.topics.slice(0, 3).map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 7, background: "#f5f7fb", color: "#475569", border: "1px solid #eef1f6" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── What Our Mentors Say ── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 15px", background: "#f1f4fb", border: "1px solid #e0e7ff", borderRadius: 99, marginBottom: 16, fontSize: 11, fontWeight: 800, color: "#1d3a8f", textTransform: "uppercase", letterSpacing: ".05em" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></svg>
              From Our Mentors
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#0c1a35", letterSpacing: "-0.035em", marginBottom: 12 }}>Why they give back</h2>
            <p style={{ fontSize: 14.5, color: "#64748b", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              They&rsquo;ve been exactly where you are — no clear direction, no exposure. Here&rsquo;s why they chose to change that.
            </p>
          </div>

          <div className="quotes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
            {MENTOR_QUOTES.map((q, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 18, padding: "26px 26px",
                border: "1px solid #edf0f6", boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 8px 22px rgba(15,23,42,0.04)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 6, right: 22, fontSize: 96, fontWeight: 900, color: "#1d3a8f", opacity: 0.05, lineHeight: 1, pointerEvents: "none", fontFamily: "Georgia,serif" }}>&ldquo;</div>

                <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8, marginBottom: 20, position: "relative" }}>
                  &ldquo;{q.quote}&rdquo;
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, overflow: "hidden", boxShadow: "0 2px 8px rgba(15,23,42,0.1)" }}>
                    {q.photo ? (
                      <Image src={q.photo} alt={q.name} width={44} height={44} style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#1d3a8f", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, fontWeight: 900 }}>{q.initials}</div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#0c1a35" }}>{q.name}</div>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: "#94a3b8", marginTop: 1 }}>Mentor</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Student Reviews ── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 15px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 99, marginBottom: 16, fontSize: 11, fontWeight: 800, color: "#b45309", textTransform: "uppercase", letterSpacing: ".05em" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              Student Reviews
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#0c1a35", letterSpacing: "-0.035em", marginBottom: 14 }}>What students say</h2>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "white", border: "1px solid #edf0f6", borderRadius: 99, padding: "8px 18px", boxShadow: "0 2px 10px rgba(15,23,42,0.04)" }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} width="17" height="17" viewBox="0 0 24 24" fill={i <= Math.round(avgRating) ? "#f59e0b" : "#e2e8f0"}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: 18, fontWeight: 900, color: "#0c1a35" }}>{avgRating}</span>
              <span style={{ fontSize: 12.5, color: "#94a3b8", fontWeight: 600 }}>· {REVIEWS.length}+ reviews</span>
            </div>
          </div>

          <div className="reviews-grid" style={{ display: "flex", flexDirection: "row", overflowX: "auto", gap: 14, paddingBottom: 12, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 16, padding: "20px 20px",
                border: "1px solid #edf0f6", boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 6px 16px rgba(15,23,42,0.04)",
                flexShrink: 0, width: 310, scrollSnapAlign: "start", display: "flex", flexDirection: "column",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <Stars rating={r.rating} />
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: "#94a3b8" }}>{r.college}</span>
                </div>
                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.75, marginBottom: 18, flexGrow: 1 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: 13 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#eef2ff", color: "#1d3a8f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>{initials(r.name)}</div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#0c1a35" }}>{r.name}</span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#1d3a8f", background: "#eef2ff", padding: "3px 9px", borderRadius: 99 }}>via {r.mentor.split(" ")[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes livePulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(1.3); } }
        .hero-photos-left { padding-right: 8px; }
        .hero-photos-right { padding-left: 8px; }

        /* Vertical auto-scroll photo marquee */
        .hero-photos { height: 540px; overflow: hidden;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 5%, #000 95%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, #000 5%, #000 95%, transparent 100%); }
        .marq-track { display: flex; flex-direction: column; will-change: transform; }
        .marq-tile { aspect-ratio: 1; border-radius: 16px; overflow: hidden; margin-bottom: 14px; box-shadow: 0 6px 18px rgba(15,23,42,0.10); outline: 3px solid rgba(255,255,255,0.9); outline-offset: -1px; }
        @keyframes marqUp { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes marqDown { from { transform: translateY(-50%); } to { transform: translateY(0); } }

        .logo-img { opacity: .95; transition: opacity .25s ease, transform .25s ease; }
        .logo-img:hover { opacity: 1; transform: translateY(-1px); }
        .logo-word { transition: color .25s ease; }
        .logo-word:hover { color: #1d3a8f; }

        /* entrance for whole center block + photos */
        @keyframes heroPhotoIn { from { opacity: 0; transform: translateY(26px) scale(.92); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-11px); } }
        @keyframes heroCardIn { 0% { opacity: 0; transform: translateY(14px) scale(.9); } 60% { opacity: 1; } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes heroModeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .hero-photo-in { opacity: 0; animation: heroPhotoIn .7s cubic-bezier(.2,.7,.2,1) forwards; }
        .hero-float { animation: heroFloat 6s ease-in-out infinite; }
        .hero-tile { aspect-ratio: 1; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 22px rgba(15,23,42,0.12); outline: 3px solid rgba(255,255,255,0.9); outline-offset: -1px; transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s; }
        .hero-tile:hover { transform: translateY(-6px) scale(1.04); box-shadow: 0 18px 40px rgba(15,23,42,0.20); }
        .hero-center { animation: heroModeIn .45s ease both; }

        .hero-card { display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.82); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(224,231,255,0.9); border-radius: 15px; padding: 11px 15px; box-shadow: 0 12px 30px rgba(15,23,42,0.12); z-index: 5; opacity: 0; animation: heroCardIn .6s ease .7s forwards, heroFloat 7s ease-in-out 1.3s infinite; }

        .hero-search { transition: box-shadow .25s ease, border-color .25s ease; }
        .hero-search:focus-within { border-color: #1d3a8f; box-shadow: 0 0 0 4px rgba(29,58,143,0.10), 0 12px 34px rgba(29,58,143,0.14); }
        .hero-find-btn { transition: transform .2s ease, box-shadow .2s ease, filter .2s ease; }
        .hero-find-btn:hover { filter: brightness(1.08); transform: translateY(-1px); box-shadow: 0 8px 22px rgba(29,58,143,0.38); }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photos, .hero-card { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-photo-in, .hero-float, .hero-card, .hero-center, .hero-tile, .marq-track { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
        .all-grid::-webkit-scrollbar { display: none; }
        .all-grid { scrollbar-width: none; }
        .reviews-grid::-webkit-scrollbar { display: none; }
        .reviews-grid { scrollbar-width: none; }
        .mentor-card-active:hover { box-shadow:0 1px 2px rgba(15,23,42,0.05), 0 20px 44px rgba(15,23,42,0.14) !important; transform:translateY(-5px); }
        .mentor-card-active:hover .m-photo { transform: scale(1.05); }
        .mentor-view-btn:hover { background:#1d3a8f !important; color:#fff !important; border-color:#1d3a8f !important; }

        /* Rich 1:1 Session card */
        .session-stack { display: flex; flex-direction: column; gap: 20px; }
        .session-card { background: #fff; border: 1px solid #e8edf4; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(15,23,42,0.03); transition: box-shadow .3s ease, transform .3s ease, border-color .3s ease; }
        .session-card:hover { border-color: #cbd5e1; box-shadow: 0 8px 32px rgba(15,23,42,0.07); transform: translateY(-3px); }
        .sc-head { display: flex; align-items: center; gap: 11px; padding: 12px 22px; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
        .sc-body { display: grid; grid-template-columns: 1fr 1.05fr; }
        .sc-left { padding: 20px 22px; background: #fff; min-width: 0; }
        .sc-right { padding: 20px 22px; border-left: 1px solid #f1f5f9; display: flex; flex-direction: column; background: #f8fafc; min-width: 0; }
        .sc-book:hover { filter: brightness(1.08); transform: translateY(-1px); box-shadow: 0 8px 22px rgba(29,58,143,0.4); }
        @media (max-width: 860px) {
          .sc-body { grid-template-columns: 1fr; }
          .sc-right { border-left: none; border-top: 1px solid #edf0f6; }
          .sc-head { padding: 12px 16px; }
          .sc-left, .sc-right { padding: 18px 16px; }
        }
        .mentor-card-sm:hover { box-shadow:0 6px 20px rgba(0,0,0,0.07) !important; transform:translateY(-2px); }

        /* Tablet: quotes to single column, tighten hero photos height */
        @media (max-width: 900px) {
          .quotes-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
        /* Session card header wraps gracefully on small screens */
        @media (max-width: 560px) {
          .sc-head { flex-wrap: wrap; gap: 8px 10px; }
          .sc-head-avail { margin-left: 0 !important; }
        }
        /* Mobile */
        @media (max-width: 640px) {
          .hero-section { padding-left: 16px !important; padding-right: 16px !important; padding-bottom: 40px !important; }
          .m-wrap { padding: 32px 16px 56px !important; }
          .all-grid { gap: 12px !important; }
          .reviews-grid { gap: 12px !important; }
          .session-stack { gap: 14px !important; }
          .sc-left, .sc-right { padding: 16px 15px !important; }
        }
      `}} />

      <Footer />
    </div>
  )
}
