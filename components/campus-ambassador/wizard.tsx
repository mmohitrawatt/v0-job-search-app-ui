"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  campusAmbassadorDefaultValues,
  campusAmbassadorSchema,
  FORM_STEPS,
  type CampusAmbassadorFormValues,
} from "@/lib/campus-ambassador/schema"
import {
  PersonalStep,
  AcademicStep,
  CampusStep,
  SocialStep,
  MotivationStep,
  AvailabilityStep,
} from "@/components/campus-ambassador/form-steps"
import { CampusAmbassadorSuccess } from "@/components/campus-ambassador/success-screen"

const STORAGE_KEY = "jobingen-campus-ambassador-draft"

const STEP_COMPONENTS = [PersonalStep, AcademicStep, CampusStep, SocialStep, MotivationStep, AvailabilityStep]

export function CampusAmbassadorWizard() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const form = useForm<CampusAmbassadorFormValues>({
    resolver: zodResolver(campusAmbassadorSchema),
    defaultValues: campusAmbassadorDefaultValues,
    mode: "onChange",
  })

  // Restore autosaved draft on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const draft = JSON.parse(raw)
        form.reset({ ...campusAmbassadorDefaultValues, ...draft })
      }
    } catch {
      // ignore corrupt draft
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Autosave on every change
  useEffect(() => {
    const subscription = form.watch((values) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
      } catch {
        // ignore quota errors
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  const totalSteps = FORM_STEPS.length
  const StepComponent = STEP_COMPONENTS[step]
  const isLastStep = step === totalSteps - 1

  const goNext = async () => {
    const fields = FORM_STEPS[step].fields as unknown as (keyof CampusAmbassadorFormValues)[]
    const valid = await form.trigger(fields)
    if (valid) setStep((s) => Math.min(s + 1, totalSteps - 1))
  }

  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = async (values: CampusAmbassadorFormValues) => {
    setLoading(true)
    setSubmitError("")
    try {
      const res = await fetch("/api/campus-ambassador-program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.")
        return
      }
      window.localStorage.removeItem(STORAGE_KEY)
      setSubmitted(true)
    } catch {
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return <CampusAmbassadorSuccess />

  const progressPct = Math.round(((step + 1) / totalSteps) * 100)

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_40px_rgba(29,58,143,0.1)] sm:p-9">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>
            Step {step + 1} of {totalSteps} — {FORM_STEPS[step].title}
          </span>
          <span>~2 min to complete</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#1d3a8f] to-[#3b5bdb]"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (isLastStep) form.handleSubmit(onSubmit)()
            else goNext()
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>

          {submitError && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {submitError}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={step === 0}
              className="h-11 rounded-xl border-slate-200 px-5 text-sm font-semibold disabled:opacity-0"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 flex-1 rounded-xl bg-gradient-to-br from-[#1d3a8f] to-[#3b5bdb] text-sm font-semibold shadow-[0_4px_16px_rgba(29,58,143,0.28)] hover:opacity-90 sm:flex-none sm:px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : isLastStep ? (
                "Apply as Campus Ambassador"
              ) : (
                <>
                  Continue
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
