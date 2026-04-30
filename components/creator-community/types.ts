export interface FormData {
  fullName: string
  email: string
  phone: string
  city: string
  instagram: string
  followerCount: string
  contentTypes: string[]
  collaborationModel: string
  postsPerWeek: string
}

export interface StepConfig {
  id: number
  label: string
  shortLabel: string
}

export const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  instagram: "",
  followerCount: "",
  contentTypes: [],
  collaborationModel: "",
  postsPerWeek: "",
}

export const STEPS: StepConfig[] = [
  { id: 1, label: "Basic Information", shortLabel: "You" },
  { id: 2, label: "Collaboration",     shortLabel: "Collab" },
  { id: 3, label: "Review & Submit",   shortLabel: "Review" },
]
