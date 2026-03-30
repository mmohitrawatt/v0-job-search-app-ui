"use client"

import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { AITools } from "@/components/landing/ai-tools"
import { Bootcamps } from "@/components/landing/bootcamps"
import { Testimonials } from "@/components/landing/testimonials"
import { HowItWorks } from "@/components/landing/how-it-works"
import { FeaturedJobs } from "@/components/landing/featured-jobs"

import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function PreLaunchPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
      <Navbar />
      <Hero />
      <Bootcamps />
      <AITools />
      <HowItWorks />
      <FeaturedJobs />
      <Testimonials />

      <CTASection />
      <Footer />
    </div>
  )
}
