import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WaitlistProvider } from '@/components/waitlist-modal'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Jobingen",
  "url": "https://jobingen.com",
  "logo": "https://jobingen.com/icon.png",
  "description":
    "AI-powered job search, resume builder, and interview preparation platform.",
  "founder": [
    {
      "@type": "Person",
      "name": "Mohit Rawat",
      "jobTitle": "Founder",
      "sameAs": ["https://www.linkedin.com/in/mohitrawat0801/"],
    },
    {
      "@type": "Person",
      "name": "Aditya Dubey",
      "jobTitle": "Founder",
      "sameAs": ["https://www.linkedin.com/in/aditya-dubey-4092b1214/"],
    },
    {
      "@type": "Person",
      "name": "Priyank Pandey",
      "jobTitle": "Founder",
      "sameAs": ["https://www.linkedin.com/in/priyankpandey-devops/"],
    },
  ],
}

export const metadata: Metadata = {
  title: 'Jobingen — Job Search & Preparation',
  description: 'AI-powered job search, resume builder, and interview preparation platform.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Machine-readable org/founder data — invisible to users, read by crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
        <Analytics />
      </body>
    </html>
  )
}
