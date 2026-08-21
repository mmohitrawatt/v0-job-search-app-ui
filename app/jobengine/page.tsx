import type { Metadata } from "next"
import { Footer } from "@/components/landing/footer"
import { Navbar } from "@/components/landing/navbar"
import { JobEngineClient } from "./jobengine-client"

export const metadata: Metadata = {
  title: "JobEngine — AI job matching | Jobingen",
  description:
    "Upload your resume and JobEngine scores live openings from top company career pages against it — with an AI match score and reason for each.",
}

export default function JobEnginePage() {
  return (
    <>
      <Navbar />
      <JobEngineClient />
      <Footer />
    </>
  )
}
