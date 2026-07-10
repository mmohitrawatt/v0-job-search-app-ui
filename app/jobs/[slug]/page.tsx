import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase"
import ApplyForm from "./apply-form"

export const revalidate = 60

type Job = {
  id: string
  title: string
  company: string
  location: string
  slug: string
  description: string
  apply_type: string
}

const STATIC_JOBS: Job[] = [
  {
    id: "2",
    title: "AI Engineer Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "ai-engineer-intern-trippyway",
    description: `Work on real AI features — LLMs, RAG pipelines, recommendation engines, and travel intelligence systems
Ship production-grade code alongside senior engineers and see your work live in front of real users
Own features end-to-end: from scoping and prototyping to deployment and monitoring
Integrate third-party AI APIs and build custom fine-tuned solutions tailored to the travel domain
Write clean, well-documented Python/TypeScript code and participate in regular code reviews
Collaborate directly with founders and the product team on AI strategy and roadmap decisions`,
    apply_type: "direct",
  },
  {
    id: "3",
    title: "UI/UX Design Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "uiux-intern-trippyway",
    description: `Design the future of travel discovery — from user research and wireframes to high-fidelity Figma prototypes
Work directly with founders on product strategy and help define how millions of travelers plan their trips
Conduct usability tests, analyze user feedback, and iterate rapidly on designs based on real data
Create and maintain a consistent design system — components, tokens, and guidelines
Design across web and mobile surfaces with a strong eye for typography, spacing, and visual hierarchy
Graduate with a portfolio of real shipped work — not concept projects`,
    apply_type: "direct",
  },
  {
    id: "4",
    title: "HR & Talent Acquisition Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "hr-intern-trippyway",
    description: `Source, screen, and shortlist candidates across engineering, design, and business roles
Schedule and coordinate interviews with hiring managers and founders
Manage end-to-end onboarding for new hires — documentation, tool access, and orientation sessions
Maintain and update the applicant tracking system and recruitment pipelines
Draft job descriptions, outreach messages, and offer letters
Help build Trippyway's employer brand across LinkedIn and job platforms`,
    apply_type: "direct",
  },
  {
    id: "tw-1",
    title: "Sales Executive",
    company: "Tapwave",
    location: "Bengaluru, India",
    slug: "sales-executive-tapwave",
    description: `Drive new business and manage client relationships for Tapwave's NFC Business Cards, Smart Standees, and Digital Networking Solutions
Achieve sales targets across B2B segments — businesses, educational institutions, clubs, and organizations
Identify and pursue new business opportunities through cold calls, meetings, and networking
Build and maintain strong, long-lasting client relationships with regular follow-ups
Present and demonstrate Tapwave's products to potential clients effectively
Maintain accurate records of leads, opportunities, and client interactions in CRM`,
    apply_type: "direct",
  },
  {
    id: "tw-2",
    title: "Graphic Designer",
    company: "Tapwave",
    location: "Bengaluru, India",
    slug: "graphic-designer-tapwave",
    description: `Create eye-catching designs for digital and print for Tapwave's NFC and smart networking product line
Manage and maintain branding assets — logos, templates, style guides, and marketing collateral
Collaborate closely with the marketing team to deliver visually compelling campaigns
Design product packaging, standee visuals, and NFC card layouts with precision
Work with basic SaaS tools and Adobe Creative Suite to deliver high-quality output
Iterate quickly on feedback and maintain consistency across all brand touchpoints`,
    apply_type: "direct",
  },
  {
    id: "kv-1",
    title: "Database Architect",
    company: "Kendriya Vidyalaya",
    location: "India",
    slug: "database-architect-kendriya-vidyalaya",
    description: `Design and maintain scalable, secure, and high-performance database architectures
Create logical and physical data models based on business and application requirements
Design database schemas, relationships, indexing strategies, and normalization for optimal performance
Evaluate, select, and implement appropriate SQL and NoSQL database technologies
Plan and execute database migration and modernization initiatives, including cloud migrations (AWS, Azure, or GCP)
Optimize database performance through query tuning, partitioning, replication, and indexing
Design high-availability, backup, disaster recovery, and failover solutions
Implement data governance, security, encryption, access control, and compliance best practices
Develop data integration strategies for applications, APIs, ETL pipelines, analytics, and AI/ML platforms
Architect AI-ready data foundations that support RAG, vector databases, semantic search, recommendation systems, and intelligent analytics
Collaborate with application, DevOps, data engineering, and AI teams to ensure scalable and reliable data infrastructure
Monitor database health, troubleshoot production issues, and continuously improve performance, scalability, and reliability
Document database architecture, standards, migration plans, and operational procedures
Evaluate emerging database technologies and recommend architectural improvements aligned with business goals
Compensation ₹50K–80K per month, based on experience and expertise`,
    apply_type: "direct",
  },
]

const COMPANY_LOGOS: Record<string, string> = {
  "Tapwave": "/tapwave.jpeg",
  "Trippyway": "/trippyway-logo.jpg",
  "Kendriya Vidyalaya": "/kendriya-vidyalaya-logo.svg",
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let job: Job | null = null
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from("jobs").select("*").eq("slug", slug).single()
    if (data) job = data
  } catch {
    // fallback to static
  }

  if (!job) job = STATIC_JOBS.find(j => j.slug === slug) ?? null
  if (!job) notFound()

  const bullets = (job as Job).description
    .split("\n")
    .map((l: string) => l.trim())
    .filter(Boolean)

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 20,
        boxShadow: "0 1px 3px rgba(0,0,0,.04)"
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jobingen-logo.png" alt="Jobingen" style={{ height: 72, width: "auto", display: "block" }} />
          </Link>
          <Link href="/jobs" style={{ fontSize: 13, fontWeight: 600, color: "#475569", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            ← All Jobs
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* Job Header Card */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,.06)",
          padding: "32px 32px 28px",
          marginBottom: 24,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              {COMPANY_LOGOS[(job as Job).company] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={COMPANY_LOGOS[(job as Job).company]}
                  alt={(job as Job).company}
                  style={{ width: 56, height: 56, borderRadius: 12, border: "1.5px solid #e2e8f0", objectFit: "contain", padding: 4, background: "#fff", flexShrink: 0 }}
                />
              )}
              <div>
              <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 900, color: "#0f172a", margin: "0 0 10px", letterSpacing: "-.4px", lineHeight: 1.2 }}>
                {(job as Job).title}
              </h1>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <span style={{
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: "1px solid #bfdbfe",
                }}>
                  {(job as Job).company}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#64748b", fontWeight: 500 }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="#94a3b8" />
                  </svg>
                  {(job as Job).location}
                </span>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,.06)",
          padding: "28px 32px",
          marginBottom: 24,
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", margin: "0 0 20px", letterSpacing: "-.2px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 4, height: 20, background: "#1d4ed8", borderRadius: 2, display: "inline-block" }} />
            Job Description
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            {bullets.map((line: string, i: number) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{
                  flexShrink: 0,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#eff6ff",
                  border: "1.5px solid #bfdbfe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 2,
                }}>
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ fontSize: 15, color: "#334155", lineHeight: 1.6 }}>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Application Form */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,.06)",
          padding: "28px 32px",
        }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-.2px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 4, height: 20, background: "#1d4ed8", borderRadius: 2, display: "inline-block" }} />
              Share your resume to get the job
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
              Fill in your details and upload your resume. Our team will reach out if your profile matches.
            </p>
          </div>
          <ApplyForm jobSlug={(job as Job).slug} />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e2e8f0", padding: "24px 20px", textAlign: "center", background: "#fff" }}>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
          © {new Date().getFullYear()} Jobingen. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
