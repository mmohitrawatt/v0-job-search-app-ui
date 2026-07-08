"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function CampusAmbassadorSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_8px_40px_rgba(29,58,143,0.1)] sm:px-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
        className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50"
      >
        <Check className="size-8 text-emerald-600" strokeWidth={2.5} />
      </motion.div>

      <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        Application Submitted Successfully
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
        Thank you for applying. Our team will review your application carefully and reach out if you&apos;re shortlisted.
      </p>

      <Button asChild className="mt-8 h-11 w-full rounded-xl bg-gradient-to-br from-[#1d3a8f] to-[#3b5bdb] text-sm font-semibold shadow-[0_4px_16px_rgba(29,58,143,0.28)] hover:opacity-90 sm:w-auto sm:px-8">
        <Link href="/">
          Back to Home
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </motion.div>
  )
}
