import type { Metadata } from "next"
import { JobingenClubClient } from "./club-client"

export const metadata: Metadata = {
  title: "Jobingen Club — Lead at Your College",
  description: "Apply to become a Jobingen Club President at your college. Host hackathons, run AI workshops, drive interview prep, and build a placement-ready community.",
}

export default function JobingenClubPage() {
  return <JobingenClubClient />
}
