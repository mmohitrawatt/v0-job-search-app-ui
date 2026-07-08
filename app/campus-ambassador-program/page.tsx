import type { Metadata } from "next"
import { CampusAmbassadorProgramClient } from "./campus-ambassador-client"

const TITLE = "Become a Jobingen Campus Ambassador"
const DESCRIPTION =
  "Represent Jobingen at your college, build leadership skills, work with our core team, and help thousands of students discover better career opportunities. Apply in 2 minutes."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/campus-ambassador-program",
    siteName: "Jobingen",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function CampusAmbassadorProgramPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Campus Ambassador",
    description: DESCRIPTION,
    hiringOrganization: {
      "@type": "Organization",
      name: "Jobingen",
      sameAs: "https://jobingen.com",
    },
    employmentType: "VOLUNTEER",
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CampusAmbassadorProgramClient />
    </>
  )
}
