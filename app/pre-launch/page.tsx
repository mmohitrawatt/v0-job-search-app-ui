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
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        a, button { transition: opacity 0.15s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s cubic-bezier(0.16,1,0.3,1); }
        a:hover, button:hover { text-decoration: none; }
        @keyframes float-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes fade-up-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .animate-float { animation: float-slow 6s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
      `}</style>
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
