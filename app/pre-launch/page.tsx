"use client"

import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { AITools } from "@/components/landing/ai-tools"
import { Bootcamps } from "@/components/landing/bootcamps"
import { Testimonials } from "@/components/landing/testimonials"
import { HowItWorks } from "@/components/landing/how-it-works"
import { FeaturedJobs } from "@/components/landing/featured-jobs"

import { CampusAmbassador } from "@/components/landing/campus-ambassador"
import { MentorsPreview } from "@/components/landing/mentors-preview"
import { StudentInsightsBanner } from "@/components/landing/student-insights-banner"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function PreLaunchPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
      <Navbar />
      <Hero />
      <Bootcamps />
      <MentorsPreview />
      <AITools />
      <HowItWorks />
      <FeaturedJobs />
      <Testimonials />
      <CampusAmbassador />
      <StudentInsightsBanner />
      <CTASection />
      <Footer />
    </div>
  )
}
