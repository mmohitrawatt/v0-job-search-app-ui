import { createServerClient } from "@/lib/supabase"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"
import { JobsClient } from "./jobs-client"

export type Job = {
  id: string
  title: string
  company: string
  location: string
  slug: string
  type?: string
  department?: string
  experience?: string
  mode?: string
  description?: string
  stipend?: string
  duration?: string
  applyUrl?: string
}

export const revalidate = 60

const STATIC_JOBS: Job[] = [
  {
    id: "tw-1",
    title: "Sales Executive",
    company: "Tapwave",
    location: "Bengaluru, India",
    slug: "sales-executive-tapwave",
    type: "Full Time",
    department: "Sales",
    experience: "0–2 yr",
    mode: "On-site",
    stipend: "₹3–6 LPA",
    description: "Drive new business and manage client relationships for Tapwave's NFC Business Cards, Smart Standees, and Digital Networking Solutions. Achieve sales targets across B2B segments — businesses, educational institutions, clubs, and organizations. Strong communication and proactive approach required.",
  },
  {
    id: "tw-2",
    title: "Graphic Designer",
    company: "Tapwave",
    location: "Bengaluru, India",
    slug: "graphic-designer-tapwave",
    type: "Full Time",
    department: "Design",
    experience: "0–2 yr",
    mode: "On-site",
    stipend: "₹2.5–5 LPA",
    description: "Create eye-catching designs for digital and print for Tapwave's NFC and smart networking product line. Manage branding assets and collaborate closely with the marketing team. Proficiency in Adobe Creative Suite and basic SaaS knowledge required.",
  },
  {
    id: "2",
    title: "AI Engineer Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "ai-engineer-intern-trippyway",
    type: "Internship",
    department: "Engineering & AI",
    experience: "Fresher / 0–1 yr",
    mode: "Remote",
    stipend: "₹8,000–15,000/mo",
    duration: "3–6 months",
    description: "Work on real AI features — LLMs, RAG pipelines, recommendation engines, and travel intelligence systems. You'll ship production-grade code alongside senior engineers and build AI that real users interact with.",
  },
  {
    id: "3",
    title: "UI/UX Design Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "uiux-intern-trippyway",
    type: "Internship",
    department: "Design",
    experience: "Fresher / 0–1 yr",
    mode: "Remote",
    stipend: "₹6,000–10,000/mo",
    duration: "3–6 months",
    description: "Design the future of travel discovery. From user research and wireframes to high-fidelity Figma prototypes, you'll shape how people plan their trips. Work directly with founders on product strategy.",
  },
  {
    id: "4",
    title: "HR & Talent Acquisition Intern",
    company: "Trippyway",
    location: "Remote (India)",
    slug: "hr-intern-trippyway",
    type: "Internship",
    department: "Human Resources",
    experience: "Fresher / 0–1 yr",
    mode: "Remote",
    stipend: "₹5,000–8,000/mo",
    duration: "3 months",
    description: "Help build the team that builds the product. You'll source and screen candidates, coordinate interviews, manage onboarding, and help shape a culture that attracts top talent.",
  },
  {
    id: "kv-1",
    title: "Database Architect",
    company: "Kendriya Vidyalaya",
    location: "India",
    slug: "database-architect-kendriya-vidyalaya",
    type: "Full Time",
    department: "Engineering",
    experience: "3–8 yr",
    mode: "On-site",
    stipend: "₹50K–80K/month",
    description: "Design and maintain scalable, secure, and high-performance database architectures. Create logical and physical data models, design schemas, indexing strategies, and normalization for optimal performance. Evaluate and implement SQL and NoSQL technologies, plan cloud migrations (AWS, Azure, or GCP), and optimize performance through query tuning, partitioning, and replication. Design high-availability, backup, and disaster recovery solutions, implement data governance and security best practices, and architect AI-ready data foundations supporting RAG, vector databases, and semantic search. Collaborate with application, DevOps, data engineering, and AI teams. Compensation ₹50K–80K per month, based on experience and expertise.",
  },
]

export default async function JobsPage() {
  let jobs: Job[] = STATIC_JOBS
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from("jobs")
      .select("id, title, company, location, slug, type, department, experience, mode, description, stipend, duration")
      .order("created_at", { ascending: false })
    if (data && data.length > 0) jobs = data
  } catch {
    // fallback to static
  }

  return (
    <>
      <Navbar />
      <JobsClient jobs={jobs} />
      <Footer />
    </>
  )
}
