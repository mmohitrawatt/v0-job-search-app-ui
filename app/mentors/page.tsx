"use client"

import Link from "next/link"
import Image from "next/image"
import { JobingenLogo } from "@/components/jobingen-logo"

/* ─── Mentor Data ──────────────────────────────────── */

const MENTORS = [
  // ── Core 6 (with photos) ──
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
    role: "Software Engineer 2 (SWE2)",
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
    role: "AI Strategy & Implementation Consultant",
    company: "Cograd",
    initials: "AD",
    photo: "/mentors/aditya-dubey.jpg",
    color: "#1d3a8f",
    bg: "#eef1fd",
    desc: "Aditya Dubey is an AI strategy and implementation consultant focused on helping organizations leverage artificial intelligence for business growth, automation, and operational transformation. He has mentored more than 12,000 professionals and students in AI technologies and practical industry applications. With an M.Tech in Information Systems from NIT Allahabad, Aditya works on translating complex AI concepts into real-world solutions that drive measurable impact for businesses and startups.",
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
    role: "Embedded Software Engineer & DSA Trainer",
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

  // ── Extended Mentors (initials-only) ──
  {
    name: "Rahul Mehta",
    role: "Senior Software Engineer",
    company: "Dell Technologies",
    initials: "RM",
    color: "#0891b2",
    bg: "#ecfeff",
    desc: "Rahul specializes in cloud-native microservices and DevOps pipelines. With 4+ years at Dell, he has built distributed systems handling millions of requests and mentors engineers on system design and scalable architecture.",
    linkedin: "",
    topics: ["System Design", "DevOps", "Cloud Architecture", "Interview Prep"],
    active: false,
  },
  {
    name: "Neha Sharma",
    role: "Data Analyst",
    company: "PhonePe",
    initials: "NS",
    color: "#7c3aed",
    bg: "#f5f3ff",
    desc: "Neha works on product analytics at PhonePe, turning raw data into actionable insights for fintech products used by millions. She guides students on breaking into data roles, building SQL skills, and cracking analytics interviews.",
    linkedin: "",
    topics: ["Data Analytics", "SQL", "Product Analytics", "Career Guidance"],
    active: false,
  },
  {
    name: "Arjun Verma",
    role: "Backend Engineer",
    company: "Zepto",
    initials: "AV",
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: "Arjun builds high-performance backend systems at Zepto that power quick-commerce at scale. He is passionate about helping students understand distributed systems, API design, and how startups operate at breakneck speed.",
    linkedin: "",
    topics: ["Backend Development", "Startup Culture", "API Design", "Skill Roadmap"],
    active: false,
  },
  {
    name: "Priya Singh",
    role: "UX Designer",
    company: "PhonePe",
    initials: "PS",
    color: "#e11d48",
    bg: "#fff1f2",
    desc: "Priya designs user experiences for PhonePe's payment products used by 500M+ users. She mentors aspiring designers on building portfolios, cracking design interviews, and transitioning into product design roles.",
    linkedin: "",
    topics: ["UI/UX Design", "Portfolio Review", "Design Thinking", "Career Switch"],
    active: false,
  },
  {
    name: "Vikram Tiwari",
    role: "Associate Consultant",
    company: "KPMG",
    initials: "VT",
    color: "#b45309",
    bg: "#fffbeb",
    desc: "Vikram works in technology consulting at KPMG, advising enterprises on digital transformation and cloud migration. He guides students on consulting careers, case interview preparation, and building a strong professional profile.",
    linkedin: "",
    topics: ["Consulting", "Case Interviews", "Digital Transformation", "LinkedIn Optimization"],
    active: false,
  },
  {
    name: "Ananya Gupta",
    role: "Frontend Engineer",
    company: "Zepto",
    initials: "AG",
    color: "#0369a1",
    bg: "#e0f2fe",
    desc: "Ananya builds fast, responsive web interfaces at Zepto using React and Next.js. She is passionate about frontend performance and helps students master modern JavaScript, component architecture, and frontend interviews.",
    linkedin: "",
    topics: ["React/Next.js", "Frontend Dev", "JavaScript", "Interview Prep"],
    active: false,
  },
  {
    name: "Karan Patel",
    role: "SAP Technical Consultant",
    company: "SAP",
    initials: "KP",
    color: "#1d3a8f",
    bg: "#eef1fd",
    desc: "Karan is an SAP technical consultant working on enterprise resource planning solutions for global clients. He guides freshers on navigating the SAP ecosystem, getting certified, and building a career in enterprise tech.",
    linkedin: "",
    topics: ["SAP Modules", "Enterprise Tech", "Career Guidance", "Certification Prep"],
    active: false,
  },
  {
    name: "Deepika Rathore",
    role: "ML Engineer",
    company: "HCLTech",
    initials: "DR",
    color: "#7c3aed",
    bg: "#f5f3ff",
    desc: "Deepika builds and deploys machine learning models at HCLTech for healthcare and manufacturing clients. She mentors students on ML fundamentals, model deployment, and transitioning from academics to industry AI roles.",
    linkedin: "",
    topics: ["Machine Learning", "Model Deployment", "Python", "Resume Review"],
    active: false,
  },
  {
    name: "Rohan Saxena",
    role: "Product Manager",
    company: "PhonePe",
    initials: "RS",
    color: "#0f766e",
    bg: "#ecfdf5",
    desc: "Rohan manages payment products at PhonePe, working at the intersection of technology, design, and business strategy. He helps aspiring PMs understand product thinking, write impactful PRDs, and crack PM interviews at top startups.",
    linkedin: "",
    topics: ["Product Management", "PM Interviews", "Product Strategy", "Career Switch"],
    active: false,
  },
  {
    name: "Sneha Yadav",
    role: "QA Automation Engineer",
    company: "HCLTech",
    initials: "SY",
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: "Sneha specializes in test automation frameworks and CI/CD quality gates at HCLTech. She helps students understand the importance of quality engineering, build automation skills, and explore rewarding careers in QA.",
    linkedin: "",
    topics: ["Test Automation", "QA Engineering", "CI/CD", "Career Guidance"],
    active: false,
  },
  {
    name: "Amit Kumar",
    role: "DevOps Engineer",
    company: "Dell Technologies",
    initials: "AK",
    color: "#dc2626",
    bg: "#fef2f2",
    desc: "Amit manages infrastructure and deployment pipelines at Dell Technologies, ensuring high availability for enterprise platforms. He guides students on cloud certifications, Linux fundamentals, and breaking into DevOps roles.",
    linkedin: "",
    topics: ["DevOps", "AWS/Cloud", "Linux", "Skill Roadmap"],
    active: false,
  },
  {
    name: "Ishita Jain",
    role: "Business Analyst",
    company: "KPMG",
    initials: "IJ",
    color: "#b45309",
    bg: "#fffbeb",
    desc: "Ishita works as a business analyst at KPMG, bridging the gap between business requirements and technology solutions. She mentors students on analytical thinking, Excel mastery, SQL, and cracking BA interviews at top consulting firms.",
    linkedin: "",
    topics: ["Business Analysis", "Excel/SQL", "Consulting Prep", "Resume Review"],
    active: false,
  },
  {
    name: "Manish Rawat",
    role: "Full Stack Developer",
    company: "Zepto",
    initials: "MR",
    color: "#0891b2",
    bg: "#ecfeff",
    desc: "Manish builds end-to-end features at Zepto, from database design to pixel-perfect UIs. He is passionate about the startup ecosystem and helps students develop a builder mindset, ship side projects, and land their first startup role.",
    linkedin: "",
    topics: ["Full-Stack Dev", "Startup Mindset", "Side Projects", "Interview Prep"],
    active: false,
  },
  {
    name: "Kavita Nair",
    role: "Cloud Solutions Architect",
    company: "HCLTech",
    initials: "KN",
    color: "#e11d48",
    bg: "#fff1f2",
    desc: "Kavita designs cloud solutions for enterprise clients at HCLTech, working across AWS, Azure, and GCP. She mentors engineers on cloud architecture patterns, certification roadmaps, and building a career in cloud computing.",
    linkedin: "",
    topics: ["Cloud Architecture", "AWS/Azure", "Certifications", "Career Guidance"],
    active: false,
  },
  {
    name: "Siddharth Agarwal",
    role: "Cybersecurity Analyst",
    company: "SAP",
    initials: "SA",
    color: "#1d3a8f",
    bg: "#eef1fd",
    desc: "Siddharth works on enterprise security at SAP, protecting critical business systems from evolving threats. He guides students on cybersecurity fundamentals, ethical hacking basics, and building a career in information security.",
    linkedin: "",
    topics: ["Cybersecurity", "Ethical Hacking", "Security Certifications", "Skill Roadmap"],
    active: false,
  },
  {
    name: "Pooja Bansal",
    role: "Data Engineer",
    company: "PhonePe",
    initials: "PB",
    color: "#0f766e",
    bg: "#ecfdf5",
    desc: "Pooja builds scalable data pipelines at PhonePe that process billions of transactions daily. She helps students understand data engineering tools like Spark, Kafka, and Airflow, and guides them on cracking data engineering interviews.",
    linkedin: "",
    topics: ["Data Engineering", "Big Data", "Python/SQL", "Interview Prep"],
    active: false,
  },
]

/* ─── Reviews Data ─────────────────────────────────── */

const REVIEWS = [
  { name: "Aman Tripathi", college: "NIT Surat", rating: 5, text: "The resume review session completely transformed my CV. Got 3 interview calls within a week of updating it. The mentor pointed out things I would have never noticed on my own.", mentor: "Shubham Kaushik" },
  { name: "Ritika Agarwal", college: "IIIT Hyderabad", rating: 5, text: "Mock interview with Jitesh sir was so real, I felt like I was sitting in an actual Google interview. The feedback was brutally honest and exactly what I needed to improve.", mentor: "Jitesh Vijaykumar" },
  { name: "Sahil Verma", college: "DTU Delhi", rating: 4, text: "Sonic bhaiya helped me understand system design from scratch. His Dell experience really shows — he explained real production scenarios that no YouTube video covers.", mentor: "Sonic Payeng" },
  { name: "Prachi Mishra", college: "MNNIT Allahabad", rating: 5, text: "Aditya sir's career roadmap session was a game-changer. I was confused between data science and software dev — he helped me see the bigger picture and choose the right path.", mentor: "Aditya Dubey" },
  { name: "Kunal Sharma", college: "BIT Mesra", rating: 5, text: "Bipin bhaiya made JavaScript concepts so simple. I was struggling with async/await and promises for months. One session and everything clicked. Best mentor for web dev!", mentor: "Bipin Chaudhary" },
  { name: "Anshika Rani", college: "KIET Ghaziabad", rating: 5, text: "Tarsh sir's DSA sessions are next level. He doesn't just teach solutions — he teaches you how to think. My problem-solving speed improved drastically after just 3 sessions.", mentor: "Tarsh Vaibhav" },
  { name: "Rohit Pandey", college: "VIT Vellore", rating: 4, text: "The 1:1 session gave me clarity on what companies actually look for. My mentor was honest about industry expectations and helped me set realistic goals for my placement prep.", mentor: "Shubham Kaushik" },
  { name: "Sneha Chauhan", college: "MNNIT Allahabad", rating: 5, text: "I was completely lost about how to start my career in AI. After one session with Aditya sir, I had a clear 6-month roadmap. Now I'm interning at a startup and loving it.", mentor: "Aditya Dubey" },
  { name: "Varun Gupta", college: "NIT Trichy", rating: 4, text: "The portfolio review was super detailed. My mentor went through every project, suggested improvements, and even helped me rewrite my project descriptions for maximum impact.", mentor: "Jitesh Vijaykumar" },
  { name: "Divya Kumari", college: "IIT BHU", rating: 5, text: "I had no idea what I was doing wrong in interviews. After the mock session, I realized my communication was the problem — not my technical skills. That single insight changed everything.", mentor: "Sonic Payeng" },
  { name: "Harsh Agrawal", college: "LNMIIT Jaipur", rating: 5, text: "Tarsh sir's approach to teaching DSA is unique. He connects every problem to real interview patterns. I cracked my TCS Digital interview right after his sessions.", mentor: "Tarsh Vaibhav" },
  { name: "Meghna Reddy", college: "IIIT Bangalore", rating: 4, text: "The salary negotiation guidance was incredibly practical. I didn't know freshers could negotiate too. Ended up getting a 15% higher offer just by following the mentor's advice.", mentor: "Shubham Kaushik" },
]

/* ─── What Our Mentors Say ─────────────────────────── */

const MENTOR_QUOTES = [
  {
    name: "Aditya Dubey",
    quote: "When we were in college, we faced the exact same confusion — no clear direction, no real exposure to how the industry actually works. That's why this matters so much. Giving students the right guidance at the right time can literally change the trajectory of their career. We wish we had this when we were starting out.",
    initials: "AD",
    color: "#1d3a8f",
  },
  {
    name: "Sonic Payeng",
    quote: "Most students don't lack talent — they lack the right environment and the right mentor to push them in the right direction. I've seen brilliant engineers stuck because nobody told them what to focus on. If I can save even one student from that confusion, it's worth every minute.",
    initials: "SP",
    color: "#16a34a",
  },
  {
    name: "Shubham Kaushik",
    quote: "The problem is never just about skills. It's about environment, exposure, and knowing what the industry actually expects. Once you understand that gap, everything changes. That's what we try to do here — bridge the gap between college and the real world.",
    initials: "SK",
    color: "#b45309",
  },
  {
    name: "Tarsh Vaibhav",
    quote: "I've trained 500+ students and the pattern is always the same — they know how to code but don't know how to think about problems. As a growing time, this is the best opportunity to give them the right direction before it's too late. One good mentor can save years of confusion.",
    initials: "TV",
    color: "#dc2626",
  },
]

/* ─── Star Rating Component ────────────────────────── */

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= rating ? "#f59e0b" : "#e2e8f0"} stroke={i <= rating ? "#f59e0b" : "#e2e8f0"} strokeWidth="1">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

/* ─── Page ─────────────────────────────────────────── */

export default function MentorsPage() {
  const avgRating = 4.6
  const totalReviews = REVIEWS.length
  const activeMentors = MENTORS.filter(m => m.active).length

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

        {/* ── Hero Section ── */}
        <div className="hero-section" style={{ borderRadius: 24, overflow: "hidden", marginBottom: 56 }}>
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
                Our mentors are working professionals from companies like KPMG, Dell, PhonePe, SAP, HCLTech, Zepto, and growing startups. They&rsquo;ve walked the path you&rsquo;re on — and they&rsquo;re here to guide you through it.
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="stats-wrap" style={{ background: "#fff", padding: "0 40px", borderBottom: "1px solid #e8ecf4" }}>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "none" }}>
              {[
                { val: `${MENTORS.length}+`, label: "Total Mentors", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", color: "#7c3aed" },
                { val: `${activeMentors}+`, label: "Actively Training", icon: "M12 2L2 7l10 5 10-5-10-5Z M2 17l10 5 10-5", color: "#16a34a" },
                { val: "6+", label: "Top Companies", icon: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z", color: "#0f766e" },
                { val: `${avgRating}`, label: `${totalReviews}+ Reviews`, icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", color: "#f59e0b" },
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

          {/* How it works */}
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

        {/* ── Active Mentors Section ── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a", animation: "livePulse 2s infinite" }} />
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", letterSpacing: "-.03em" }}>Active Mentors</h2>
          </div>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>Currently taking 1:1 training and mentoring sessions</p>
        </div>

        <div className="mentor-cards" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 56 }}>
          {MENTORS.filter(m => m.active).map((m, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 20, border: "1.5px solid #e8ecf4",
              boxShadow: "0 1px 4px rgba(0,0,0,.04)", overflow: "hidden",
              transition: "all .2s",
            }}>
              <div style={{ height: 4, background: `linear-gradient(90deg, ${m.color}, ${m.color}88)` }} />
              <div style={{ padding: "24px 24px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, flexShrink: 0, overflow: "hidden", border: `2.5px solid ${m.bg}` }}>
                    {m.photo ? (
                      <Image src={m.photo} alt={m.name} width={56} height={56} style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 900 }}>{m.initials}</div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{m.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: m.color, marginTop: 2 }}>{m.role}</div>
                    <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: m.bg, color: m.color, marginTop: 4, letterSpacing: ".03em" }}>
                      {m.company}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 16 }}>{m.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {m.topics.map(t => (
                    <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0" }}>{t}</span>
                  ))}
                </div>
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#2563eb", textDecoration: "none" }}>
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

        {/* ── All Mentors Section ── */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", letterSpacing: "-.03em", marginBottom: 6 }}>All Mentors</h2>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>
            {MENTORS.length}+ mentors from KPMG, Dell, PhonePe, SAP, HCLTech, Zepto & growing startups
          </p>
        </div>

        <div className="mentor-cards-all" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 56 }}>
          {MENTORS.filter(m => !m.active).map((m, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 16, border: "1.5px solid #e8ecf4",
              boxShadow: "0 1px 4px rgba(0,0,0,.04)", overflow: "hidden",
              transition: "all .2s",
            }}>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${m.color}, ${m.color}88)` }} />
              <div style={{ padding: "20px 18px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, overflow: "hidden", border: `2px solid ${m.bg}`, background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, fontWeight: 900 }}>
                    {m.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>{m.name}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: m.color, marginTop: 2 }}>{m.role}</div>
                    <span style={{ display: "inline-block", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 5, background: m.bg, color: m.color, marginTop: 3, letterSpacing: ".03em" }}>
                      {m.company}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.65, marginBottom: 12 }}>{m.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {m.topics.map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 16, background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── What Our Mentors Say ── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: "#f5f3ff", border: "1px solid #e9e5ff", borderRadius: 20, marginBottom: 16, fontSize: 11, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase" as const, letterSpacing: ".06em" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></svg>
              From Our Mentors
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", letterSpacing: "-.03em", marginBottom: 8 }}>What Our Mentors Say</h2>
            <p style={{ fontSize: 14, color: "#64748b", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Our mentors have been exactly where you are today. They understand the struggle — no clear direction, no exposure, no one to ask the real questions. Here&rsquo;s why they chose to give back.
            </p>
          </div>

          <div className="mentor-quotes" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {MENTOR_QUOTES.map((q, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 20, padding: "28px 24px",
                border: "1.5px solid #e8ecf4", boxShadow: "0 2px 12px rgba(0,0,0,.03)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 16, right: 20, fontSize: 48, fontWeight: 900, color: `${q.color}08`, lineHeight: 1 }}>&ldquo;</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${q.color}, ${q.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 900, flexShrink: 0 }}>
                    {q.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a" }}>{q.name}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: q.color }}>Mentor</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.75, fontStyle: "italic" }}>
                  &ldquo;{q.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Student Reviews ── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: "#fffbeb", border: "1px solid #fef3c7", borderRadius: 20, marginBottom: 16, fontSize: 11, fontWeight: 700, color: "#b45309", textTransform: "uppercase" as const, letterSpacing: ".06em" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              Student Reviews
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", letterSpacing: "-.03em", marginBottom: 8 }}>What Students Say About Our Mentors</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i <= Math.round(avgRating) ? "#f59e0b" : "#e2e8f0"} stroke={i <= Math.round(avgRating) ? "#f59e0b" : "#e2e8f0"} strokeWidth="1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{avgRating}</span>
              <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>({totalReviews}+ reviews)</span>
            </div>
          </div>

          <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 16, padding: "20px 18px",
                border: "1.5px solid #e8ecf4", boxShadow: "0 1px 4px rgba(0,0,0,.03)",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <Stars rating={r.rating} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8" }}>{r.college}</span>
                </div>
                <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.7, marginBottom: 14 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{r.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#7c3aed", background: "#f5f3ff", padding: "2px 8px", borderRadius: 6 }}>Mentored by {r.mentor.split(" ")[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Consultancy Live Soon ── */}
        <div className="consultancy-section" style={{ marginBottom: 40, borderRadius: 20, overflow: "hidden", border: "1.5px solid #e8ecf4" }}>
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
                    {["SK", "JV", "SP", "AD", "BC", "TV"][i]}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>{activeMentors}+ mentors ready to go live</span>
            </div>
            <Link href="/become-mentor" style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              Want to be a mentor?
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        {/* ── Become a Mentor CTA ── */}
        <div style={{
          textAlign: "center", padding: "40px 24px",
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
          .mentor-cards-all { grid-template-columns: 1fr !important; gap: 14px !important; }
          .mentor-quotes { grid-template-columns: 1fr !important; gap: 14px !important; }
          .reviews-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .consultancy-section { margin-bottom: 20px !important; }
          .consultancy-body { padding: 20px 16px 20px !important; }
          .consultancy-features { grid-template-columns: 1fr !important; }
          .consultancy-footer {
            padding: 14px 16px !important;
            flex-direction: column !important;
            gap: 12px !important;
            align-items: flex-start !important;
          }
        }
        @media (min-width: 701px) and (max-width: 900px) {
          .mentor-cards-all { grid-template-columns: repeat(2, 1fr) !important; }
          .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}} />
    </div>
  )
}
