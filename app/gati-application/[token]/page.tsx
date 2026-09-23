import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, ExternalLink, FileText, MapPin } from "lucide-react"
import { createServerClient } from "@/lib/supabase"
import { verifyGatiApplicationToken } from "@/lib/gati-application-receipt"
import "./receipt.css"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Your AI Trainer application | JOBINGEN",
  robots: { index: false, follow: false },
}

export default async function GatiApplicationReceipt({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const id = verifyGatiApplicationToken(token)
  if (!id) notFound()

  const supabase = createServerClient()
  const { data: application, error } = await supabase
    .from("gati_video_educator_applications")
    .select("name,email,phone,preferred_tracks,sample_video_url,resume_url,created_at")
    .eq("id", id)
    .single()
  if (error || !application) notFound()

  const submittedAt = new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" }).format(new Date(application.created_at))

  return <div className="gr-page">
    <header className="gr-header"><div className="gr-header-inner"><Link href="/" aria-label="Jobingen home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/jobingen-logo.png" alt="Jobingen" />
    </Link><Link href="/jobs/ai-trainer-gati-shiksha"><ArrowLeft size={16} /> Back to role</Link></div></header>

    <main className="gr-main">
      <div className="gr-intro"><div className="gr-check"><Check size={25} strokeWidth={2.7} /></div><span className="gr-eyebrow">APPLICATION RECEIPT</span><h1>Your application was submitted</h1><p>Here is a record of what you sent for Gati Shiksha&apos;s AI Trainer role. Save this private link if you want to revisit it.</p></div>

      <section className="gr-card" aria-labelledby="gr-role-title"><div className="gr-role"><div className="gr-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gati-shiksha-logo.png" alt="Gati Shiksha" />
      </div><div><span>Gati Shiksha</span><h2 id="gr-role-title">AI Trainer</h2><p><MapPin size={14} /> Delhi studio · Freelance</p></div></div><div className="gr-submitted"><strong>Submitted</strong><span>{submittedAt}</span></div></section>

      <section className="gr-card" aria-labelledby="gr-details-title"><h2 id="gr-details-title">Application details</h2><dl className="gr-details"><div><dt>Name</dt><dd>{application.name}</dd></div><div><dt>Email</dt><dd>{application.email}</dd></div><div><dt>Phone</dt><dd>{application.phone}</dd></div><div><dt>Preferred track(s)</dt><dd>{Array.isArray(application.preferred_tracks) ? application.preferred_tracks.join(", ") : "—"}</dd></div><div><dt>CV / Resume</dt><dd>{application.resume_url ? <a href={application.resume_url} target="_blank" rel="noopener noreferrer"><FileText size={15} /> View uploaded CV <ExternalLink size={13} /></a> : "Submitted"}</dd></div><div><dt>Sample teaching video</dt><dd>{application.sample_video_url ? <a href={application.sample_video_url} target="_blank" rel="noopener noreferrer">View video <ExternalLink size={13} /></a> : "Not provided"}</dd></div></dl></section>

      <section className="gr-next"><div><h2>What happens next?</h2><p>Gati Shiksha screens applications. Shortlisted candidates are invited for a short screen test at the Delhi studio.</p></div><Link href="https://ai.jobingen.com" target="_blank" rel="noopener noreferrer">Explore Jobingen AI <ArrowRight size={17} /></Link></section>
    </main>
  </div>
}
