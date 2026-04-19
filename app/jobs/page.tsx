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
    id: "10",
    title: "IP & Technology Transfer Associate",
    company: "Top Institute of India",
    location: "Leading Science & Technology Campus",
    slug: "patent-research-analyst-intern",
    type: "Contractual",
    department: "Intellectual Property",
    experience: "Fresher / 0–2 yr",
    mode: "On-site",
    stipend: "₹80,000–1,00,000/mo",
    description: "Work at the intersection of innovation, research, and intellectual property. Support patent analysis, technology commercialization, and IP management alongside senior faculty and innovation leaders at one of India's top institutes.",
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
    id: "5",
    title: "Software Engineering Intern",
    company: "Netflix",
    location: "India · US · Poland · Japan",
    slug: "swe-intern-netflix",
    type: "Internship",
    department: "Engineering & Data",
    experience: "Bachelor's / Master's / PhD",
    mode: "On-site",
    duration: "12 weeks (Summer)",
    description: "12-week summer internship immersing you in Netflix's unique culture. Work on meaningful projects across Engineering, Data & Insights, Content, Finance, Marketing, and Program Management.",
    applyUrl: "https://jobs.netflix.com/careers/internships",
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
      <div style={{ height: 108 }} />
      <JobsClient jobs={jobs} />
      <Footer />
    </>
  )
}
