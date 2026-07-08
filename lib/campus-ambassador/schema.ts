import { z } from "zod"

export const CLUB_OPTIONS = [
  "Placement Cell",
  "Coding Club",
  "E-Cell",
  "GDG",
  "GDSC",
  "NSS",
  "Student Council",
  "Other",
] as const

export const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"] as const

export const CONTENT_CREATOR_OPTIONS = ["Yes", "No", "Maybe"] as const

export const STUDENT_REACH_OPTIONS = ["50-100", "100-300", "300-500", "500+"] as const

export const COMMUNICATION_OPTIONS = ["WhatsApp", "Discord", "Email"] as const

export const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"] as const

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/
const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i
const instagramRegex = /^@?[a-zA-Z0-9._]{2,30}$|^(https?:\/\/)?(www\.)?instagram\.com\/.+/i

const requiredUrlField = (regex: RegExp, requiredMessage: string, formatMessage: string) =>
  z
    .string()
    .trim()
    .min(1, requiredMessage)
    .refine((val) => regex.test(val), { message: formatMessage })

export const campusAmbassadorSchema = z
  .object({
    // Personal Information
    fullName: z.string().trim().min(2, "Full name is required"),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .min(1, "Mobile number is required")
      .regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
    gender: z.enum(GENDER_OPTIONS, { message: "Select your gender" }),
    city: z.string().trim().min(1, "City is required"),
    state: z.string().trim().min(1, "State is required"),
    linkedin: requiredUrlField(linkedinRegex, "LinkedIn profile is required", "Enter a valid LinkedIn profile URL"),
    instagram: requiredUrlField(instagramRegex, "Instagram profile is required", "Enter a valid Instagram handle or URL"),

    // Academic Information
    college: z.string().trim().min(2, "College name is required"),
    university: z.string().trim().min(1, "University is required"),
    degree: z.string().trim().min(1, "Degree is required"),
    branch: z.string().trim().min(1, "Branch is required"),
    year: z.enum(YEAR_OPTIONS, { message: "Select your current year" }),
    graduationYear: z.string().trim().min(1, "Expected graduation year is required"),

    // Campus Information
    clubs: z.array(z.string()).min(1, "Select at least one club"),
    clubOther: z.string().trim().optional().or(z.literal("")),
    leadershipExperience: z.string().trim().min(1, "Leadership experience is required"),

    // Social Presence
    instagramFollowers: z.string().trim().min(1, "Instagram followers is required"),
    linkedinFollowers: z.string().trim().min(1, "LinkedIn followers is required"),
    contentCreator: z.enum(CONTENT_CREATOR_OPTIONS, { message: "Let us know if you can create content" }),

    // Outreach Potential
    studentReach: z.enum(STUDENT_REACH_OPTIONS, { message: "Select how many students you can reach" }),

    // Motivation
    motivation: z
      .string()
      .trim()
      .min(1, "Tell us why you want to become a Campus Ambassador")
      .refine((val) => countWords(val) >= 50, { message: "Please write at least 50 words" })
      .refine((val) => countWords(val) <= 300, { message: "Please keep it under 300 words" }),

    // Availability
    availability: z.enum(["Yes", "No"], { message: "Let us know your availability" }),
    communication: z.enum(COMMUNICATION_OPTIONS, { message: "Select a preferred communication channel" }),

    // Agreement
    agreedPerformanceBased: z
      .boolean()
      .refine((v) => v === true, { message: "You must acknowledge this is a performance-based program" }),
    agreedCommunication: z
      .boolean()
      .refine((v) => v === true, { message: "You must agree to receive communication from Jobingen" }),
  })
  .superRefine((data, ctx) => {
    if (data.clubs.includes("Other") && !data.clubOther?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Tell us which club",
        path: ["clubOther"],
      })
    }
  })

export type CampusAmbassadorFormValues = z.infer<typeof campusAmbassadorSchema>

export const campusAmbassadorDefaultValues: CampusAmbassadorFormValues = {
  fullName: "",
  email: "",
  phone: "",
  gender: undefined as unknown as CampusAmbassadorFormValues["gender"],
  city: "",
  state: "",
  linkedin: "",
  instagram: "",
  college: "",
  university: "",
  degree: "",
  branch: "",
  year: undefined as unknown as CampusAmbassadorFormValues["year"],
  graduationYear: "",
  clubs: [],
  clubOther: "",
  leadershipExperience: "",
  instagramFollowers: "",
  linkedinFollowers: "",
  contentCreator: undefined as unknown as CampusAmbassadorFormValues["contentCreator"],
  studentReach: undefined as unknown as CampusAmbassadorFormValues["studentReach"],
  motivation: "",
  availability: undefined as unknown as CampusAmbassadorFormValues["availability"],
  communication: undefined as unknown as CampusAmbassadorFormValues["communication"],
  agreedPerformanceBased: false,
  agreedCommunication: false,
}

export const FORM_STEPS = [
  { id: "personal", title: "Personal Information", fields: ["fullName", "email", "phone", "gender", "city", "state", "linkedin", "instagram"] },
  { id: "academic", title: "Academic Information", fields: ["college", "university", "degree", "branch", "year", "graduationYear"] },
  { id: "campus", title: "Campus Information", fields: ["clubs", "clubOther", "leadershipExperience"] },
  { id: "social", title: "Social Presence & Outreach", fields: ["instagramFollowers", "linkedinFollowers", "contentCreator", "studentReach"] },
  { id: "motivation", title: "Motivation", fields: ["motivation"] },
  { id: "availability", title: "Availability & Agreement", fields: ["availability", "communication", "agreedPerformanceBased", "agreedCommunication"] },
] as const

export type FormStepId = (typeof FORM_STEPS)[number]["id"]
