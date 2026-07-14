"use client"

import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { LogoMarquee } from "@/components/landing/logo-marquee"
import { ProductShowcase } from "@/components/landing/product-showcase"
import { Testimonials } from "@/components/landing/testimonials"
import { JobHubStats } from "@/components/landing/job-hub-stats"
import { JobEngineTrain } from "@/components/landing/job-engine-train"

import { MentorsPreview } from "@/components/landing/mentors-preview"
import { Footer } from "@/components/landing/footer"

export default function PreLaunchPage() {
  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: "#ffffff", overflowX: "clip" }}>
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
      <LogoMarquee />
      <ProductShowcase />
      <MentorsPreview />
      <JobEngineTrain />
      <Testimonials />
      <JobHubStats />
      <Footer />
    </div>
  )
}
