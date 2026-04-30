export interface FormData {
  fullName: string
  email: string
  phone: string
  city: string
  instagram: string
  linkedin: string
  youtube: string
  followerCount: string
  contentTypes: string[]
  bestPosts: string
  audienceDescription: string
  contentIdea: string
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
  linkedin: "",
  youtube: "",
  followerCount: "",
  contentTypes: [],
  bestPosts: "",
  audienceDescription: "",
  contentIdea: "",
  collaborationModel: "",
  postsPerWeek: "",
}

export const STEPS: StepConfig[] = [
  { id: 1, label: "Basic Information", shortLabel: "You" },
  { id: 2, label: "Creator Profile", shortLabel: "Profile" },
  { id: 3, label: "Content & Audience", shortLabel: "Content" },
  { id: 4, label: "Your Best Idea", shortLabel: "Idea" },
  { id: 5, label: "Collaboration", shortLabel: "Collab" },
  { id: 6, label: "Review & Submit", shortLabel: "Review" },
]
