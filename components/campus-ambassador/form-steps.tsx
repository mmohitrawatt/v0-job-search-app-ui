"use client"

import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CollegeCombobox } from "@/components/campus-ambassador/college-combobox"
import {
  CLUB_OPTIONS,
  COMMUNICATION_OPTIONS,
  CONTENT_CREATOR_OPTIONS,
  GENDER_OPTIONS,
  STUDENT_REACH_OPTIONS,
  YEAR_OPTIONS,
  type CampusAmbassadorFormValues,
} from "@/lib/campus-ambassador/schema"

const inputCls = "h-11 rounded-xl border-slate-200 text-sm focus-visible:ring-[#1d3a8f]/20 focus-visible:border-[#1d3a8f]"
const labelCls = "text-xs font-semibold text-slate-700"

function PillOption({
  selected,
  children,
  onClick,
}: {
  selected: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all",
        selected
          ? "border-[#1d3a8f] bg-[#eef2ff] text-[#1d3a8f] shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-[#c7d2fe] hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  )
}

export function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-extrabold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{sub}</p>
    </div>
  )
}

export function PersonalStep() {
  const { control } = useFormContext<CampusAmbassadorFormValues>()
  return (
    <div>
      <StepHeading title="Personal Information" sub="Tell us a bit about yourself." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="Rahul Sharma" className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Email Address *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="rahul@college.edu" className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Mobile Number *</FormLabel>
              <FormControl>
                <Input placeholder="9876543210" className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Gender *</FormLabel>
              <Select value={field.value || undefined} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className={cn(inputCls, "w-full")}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GENDER_OPTIONS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>City *</FormLabel>
              <FormControl>
                <Input placeholder="Delhi, Bangalore..." className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>State *</FormLabel>
              <FormControl>
                <Input placeholder="Delhi, Karnataka..." className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>LinkedIn Profile *</FormLabel>
              <FormControl>
                <Input placeholder="linkedin.com/in/..." className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Instagram Profile *</FormLabel>
              <FormControl>
                <Input placeholder="@yourhandle" className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export function AcademicStep() {
  const { control } = useFormContext<CampusAmbassadorFormValues>()
  return (
    <div>
      <StepHeading title="Academic Information" sub="Where and what are you studying?" />
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={control}
          name="college"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>College Name *</FormLabel>
              <FormControl>
                <CollegeCombobox value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>University *</FormLabel>
                <FormControl>
                  <Input placeholder="Affiliated university" className={inputCls} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Degree *</FormLabel>
                <FormControl>
                  <Input placeholder="B.Tech, BBA, MCA..." className={inputCls} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Branch *</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science, ECE..." className={inputCls} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Current Year *</FormLabel>
                <Select value={field.value || undefined} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className={cn(inputCls, "w-full")}>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {YEAR_OPTIONS.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="graduationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Expected Graduation Year *</FormLabel>
                <FormControl>
                  <Input placeholder="2027" className={inputCls} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export function CampusStep() {
  const { control, watch, setValue, formState } = useFormContext<CampusAmbassadorFormValues>()
  const clubs = watch("clubs") || []
  const clubsError = formState.errors.clubs?.message as string | undefined

  const toggleClub = (club: string) => {
    if (clubs.includes(club)) {
      setValue("clubs", clubs.filter((c) => c !== club), { shouldValidate: true })
    } else {
      setValue("clubs", [...clubs, club], { shouldValidate: true })
    }
  }

  return (
    <div>
      <StepHeading title="Campus Information" sub="Are you already involved in any campus activities?" />
      <div className="space-y-5">
        <div>
          <label className={cn(labelCls, "mb-2 block")}>Are you a member of any club? *</label>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {CLUB_OPTIONS.map((club) => (
              <label
                key={club}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors",
                  clubs.includes(club)
                    ? "border-[#1d3a8f] bg-[#eef2ff] text-[#1d3a8f]"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                )}
              >
                <Checkbox checked={clubs.includes(club)} onCheckedChange={() => toggleClub(club)} />
                {club}
              </label>
            ))}
          </div>
          {clubsError && <p className="mt-1.5 text-sm text-destructive">{clubsError}</p>}
        </div>

        {clubs.includes("Other") && (
          <FormField
            control={control}
            name="clubOther"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Tell us which club</FormLabel>
                <FormControl>
                  <Input placeholder="Name of your club/society" className={inputCls} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="leadershipExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Leadership Experience *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any leadership roles, events organized, or teams led..."
                  className="min-h-[110px] rounded-xl border-slate-200 text-sm focus-visible:ring-[#1d3a8f]/20 focus-visible:border-[#1d3a8f]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export function SocialStep() {
  const { control, watch, setValue } = useFormContext<CampusAmbassadorFormValues>()
  const contentCreator = watch("contentCreator")
  const studentReach = watch("studentReach")

  return (
    <div>
      <StepHeading title="Social Presence & Outreach" sub="Your influence and reach on campus." />
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="instagramFollowers"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Instagram Followers *</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. 1200" className={inputCls} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="linkedinFollowers"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>LinkedIn Followers *</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. 500" className={inputCls} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <label className={cn(labelCls, "mb-2 block")}>Can you create content? *</label>
          <div className="flex flex-wrap gap-2.5">
            {CONTENT_CREATOR_OPTIONS.map((opt) => (
              <PillOption
                key={opt}
                selected={contentCreator === opt}
                onClick={() => setValue("contentCreator", opt, { shouldValidate: true })}
              >
                {opt}
              </PillOption>
            ))}
          </div>
        </div>

        <div>
          <label className={cn(labelCls, "mb-2 block")}>How many students can you directly reach? *</label>
          <div className="flex flex-wrap gap-2.5">
            {STUDENT_REACH_OPTIONS.map((opt) => (
              <PillOption
                key={opt}
                selected={studentReach === opt}
                onClick={() => setValue("studentReach", opt, { shouldValidate: true })}
              >
                {opt}
              </PillOption>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MotivationStep() {
  const { control, watch } = useFormContext<CampusAmbassadorFormValues>()
  const motivation = watch("motivation") || ""
  const wordCount = motivation.trim() ? motivation.trim().split(/\s+/).filter(Boolean).length : 0

  return (
    <div>
      <StepHeading title="Motivation" sub="Why do you want to become a Campus Ambassador?" />
      <FormField
        control={control}
        name="motivation"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Tell us about your college's placement challenges, what you'd do differently, and why you're the right person for this role..."
                className="min-h-[200px] rounded-xl border-slate-200 text-sm focus-visible:ring-[#1d3a8f]/20 focus-visible:border-[#1d3a8f]"
                {...field}
              />
            </FormControl>
            <div className="flex items-center justify-between">
              <FormMessage />
              <span
                className={cn(
                  "ml-auto text-xs font-medium",
                  wordCount < 50 || wordCount > 300 ? "text-red-500" : "text-emerald-600",
                )}
              >
                {wordCount} / 300 words {wordCount < 50 ? `(min 50)` : ""}
              </span>
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

export function AvailabilityStep() {
  const { watch, setValue, formState } = useFormContext<CampusAmbassadorFormValues>()
  const availability = watch("availability")
  const communication = watch("communication")
  const agreedPerformanceBased = watch("agreedPerformanceBased")
  const agreedCommunication = watch("agreedCommunication")
  const { errors } = formState

  return (
    <div>
      <StepHeading title="Availability & Agreement" sub="Almost done — just a few final details." />
      <div className="space-y-6">
        <div>
          <label className={cn(labelCls, "mb-2 block")}>Can you dedicate 4-6 hours/week? *</label>
          <div className="flex flex-wrap gap-2.5">
            {(["Yes", "No"] as const).map((opt) => (
              <PillOption
                key={opt}
                selected={availability === opt}
                onClick={() => setValue("availability", opt, { shouldValidate: true })}
              >
                {opt}
              </PillOption>
            ))}
          </div>
          {errors.availability && (
            <p className="mt-1.5 text-sm text-destructive">{errors.availability.message as string}</p>
          )}
        </div>

        <div>
          <label className={cn(labelCls, "mb-2 block")}>Preferred communication *</label>
          <div className="flex flex-wrap gap-2.5">
            {COMMUNICATION_OPTIONS.map((opt) => (
              <PillOption
                key={opt}
                selected={communication === opt}
                onClick={() => setValue("communication", opt, { shouldValidate: true })}
              >
                {opt}
              </PillOption>
            ))}
          </div>
          {errors.communication && (
            <p className="mt-1.5 text-sm text-destructive">{errors.communication.message as string}</p>
          )}
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={agreedPerformanceBased}
              onCheckedChange={(v) => setValue("agreedPerformanceBased", v === true, { shouldValidate: true })}
              className="mt-0.5"
            />
            <span className="text-sm leading-relaxed text-slate-700">
              I understand this is a performance-based Campus Ambassador Program. *
            </span>
          </label>
          {errors.agreedPerformanceBased && (
            <p className="text-sm text-destructive">{errors.agreedPerformanceBased.message as string}</p>
          )}

          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={agreedCommunication}
              onCheckedChange={(v) => setValue("agreedCommunication", v === true, { shouldValidate: true })}
              className="mt-0.5"
            />
            <span className="text-sm leading-relaxed text-slate-700">
              I agree to receive communication from Jobingen. *
            </span>
          </label>
          {errors.agreedCommunication && (
            <p className="text-sm text-destructive">{errors.agreedCommunication.message as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}
