import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { CareersClient } from "./careers-client"

export const metadata = {
  title: "Careers at Jobingen — Join the Team",
  description: "Build the future of hiring with us. Apply for internships at Jobingen across engineering, design, product, marketing, and more.",
}

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <CareersClient />
      <Footer />
    </>
  )
}
