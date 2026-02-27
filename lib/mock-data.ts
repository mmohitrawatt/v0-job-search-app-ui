export type JobPortal = "naukri" | "linkedin" | "indeed" | "foundit" | "internshala"

export type PortalListing = {
  portal: JobPortal
  benefit: string
  recommended: boolean
  salaryMin?: number   // in LPA
  salaryMax?: number   // in LPA
}

export type Job = {
  id: string
  title: string
  company: string
  location: string
  type: string
  skills: string[]
  missingSkills: string[]
  matchScore: number
  salary: string
  initials: string
  color: string
  description: string
  isRemote: boolean
  portal: JobPortal
  portalListings?: PortalListing[]
}

export type ApplicationStatus = "applied" | "screening" | "interview" | "offer" | "rejected"

export type Application = {
  id: string
  jobId: string
  jobTitle: string
  company: string
  color: string
  initials: string
  status: ApplicationStatus
  appliedDate: string
  salary: string
}

export type SalaryData = {
  role: string
  min: number
  median: number
  max: number
  trend: "up" | "down" | "stable"
  companies: number
}

export type JobAlert = {
  id: string
  keyword: string
  location: string
  minSalaryLPA: number
  portals: JobPortal[]
  active: boolean
  matchCount: number
}

export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "SDE II — AI/ML",
    company: "Zepto",
    location: "Mumbai, MH",
    type: "Full-time",
    skills: ["Python", "PyTorch", "LLMs", "FastAPI"],
    missingSkills: ["RLHF", "Recommendation Systems"],
    matchScore: 87,
    salary: "₹32–52 LPA",
    initials: "ZP",
    color: "bg-violet-100 text-violet-700",
    description:
      "Build real-time ML systems powering Zepto's 10-minute delivery recommendation and demand forecasting engine. Own the full model lifecycle from experimentation to production deployment on AWS.",
    isRemote: false,
    portal: "linkedin",
    portalListings: [
      { portal: "linkedin", benefit: "Easy Apply",    recommended: true,  salaryMin: 32, salaryMax: 44 },
      { portal: "naukri",   benefit: "Direct Apply",  recommended: false, salaryMin: 35, salaryMax: 52 },
      { portal: "indeed",   benefit: "3-click Apply", recommended: false, salaryMin: 28, salaryMax: 40 },
    ],
  },
  {
    id: "2",
    title: "ML Engineer",
    company: "Flipkart",
    location: "Bengaluru, KA",
    type: "Full-time",
    skills: ["PyTorch", "Spark", "Scala", "Kubernetes"],
    missingSkills: ["Flink", "Distributed Training"],
    matchScore: 74,
    salary: "₹28–45 LPA",
    initials: "FK",
    color: "bg-yellow-100 text-yellow-700",
    description:
      "Design and deploy large-scale ML pipelines for Flipkart's personalisation and search ranking systems serving 400M+ users. Collaborate with research teams on next-gen retrieval models.",
    isRemote: false,
    portal: "naukri",
    portalListings: [
      { portal: "naukri",   benefit: "Direct Hiring",  recommended: false, salaryMin: 28, salaryMax: 40 },
      { portal: "linkedin", benefit: "Easy Apply",      recommended: true,  salaryMin: 32, salaryMax: 45 },
      { portal: "indeed",   benefit: "Fast Response",  recommended: false, salaryMin: 25, salaryMax: 38 },
    ],
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "CRED",
    location: "Bengaluru, KA",
    type: "Full-time",
    skills: ["Python", "SQL", "Statistics", "A/B Testing"],
    missingSkills: ["Causal Inference", "Bayesian Methods"],
    matchScore: 91,
    salary: "₹24–40 LPA",
    initials: "CR",
    color: "bg-zinc-800 text-zinc-100",
    description:
      "Use data to power CRED's credit underwriting, rewards personalisation, and member experience decisions. Build experimentation frameworks and predictive models for India's premium credit card user base.",
    isRemote: false,
    portal: "linkedin",
    portalListings: [
      { portal: "linkedin", benefit: "Easy Apply",       recommended: true,  salaryMin: 28, salaryMax: 40 },
      { portal: "foundit",  benefit: "Salary disclosed", recommended: false, salaryMin: 24, salaryMax: 36 },
      { portal: "naukri",   benefit: "Direct Apply",     recommended: false, salaryMin: 22, salaryMax: 38 },
    ],
  },
  {
    id: "4",
    title: "Backend Engineer",
    company: "Razorpay",
    location: "Remote",
    type: "Full-time",
    skills: ["Go", "Node.js", "PostgreSQL", "Kafka"],
    missingSkills: ["Rust", "eBPF"],
    matchScore: 68,
    salary: "₹22–38 LPA",
    initials: "RZ",
    color: "bg-blue-100 text-blue-700",
    description:
      "Build the payment infrastructure processing billions of rupees daily. Own high-throughput microservices, improve settlement pipelines, and harden the reliability of India's leading payments platform.",
    isRemote: true,
    portal: "indeed",
    portalListings: [
      { portal: "indeed",   benefit: "Fast Response",  recommended: false, salaryMin: 22, salaryMax: 32 },
      { portal: "linkedin", benefit: "Easy Apply",     recommended: true,  salaryMin: 25, salaryMax: 38 },
      { portal: "naukri",   benefit: "Direct Hiring",  recommended: false, salaryMin: 20, salaryMax: 34 },
    ],
  },
  {
    id: "5",
    title: "AI Product Manager",
    company: "PhonePe",
    location: "Bengaluru, KA",
    type: "Full-time",
    skills: ["AI Strategy", "Product", "FinTech", "Roadmapping"],
    missingSkills: ["Enterprise GTM", "API Products"],
    matchScore: 79,
    salary: "₹30–55 LPA",
    initials: "PP",
    color: "bg-indigo-100 text-indigo-700",
    description:
      "Define the AI product roadmap for PhonePe's Smart Money Management suite. Partner with data science and engineering to ship intelligent financial features for 500M+ users across India.",
    isRemote: false,
    portal: "foundit",
    portalListings: [
      { portal: "foundit",  benefit: "Salary disclosed", recommended: false, salaryMin: 30, salaryMax: 50 },
      { portal: "linkedin", benefit: "Easy Apply",       recommended: true,  salaryMin: 35, salaryMax: 55 },
      { portal: "naukri",   benefit: "Direct Apply",     recommended: false, salaryMin: 28, salaryMax: 45 },
    ],
  },
  {
    id: "6",
    title: "DevOps / SRE",
    company: "Dream11",
    location: "Mumbai, MH",
    type: "Full-time",
    skills: ["K8s", "Terraform", "AWS", "CI/CD"],
    missingSkills: ["Istio", "Chaos Engineering"],
    matchScore: 62,
    salary: "₹18–32 LPA",
    initials: "D1",
    color: "bg-red-100 text-red-700",
    description:
      "Operate the infrastructure behind India's largest sports gaming platform during IPL peak loads of 100M+ concurrent users. Automate deployments, build runbooks, and ensure 99.99% uptime.",
    isRemote: false,
    portal: "naukri",
    portalListings: [
      { portal: "naukri",      benefit: "Direct Hiring",   recommended: false, salaryMin: 18, salaryMax: 28 },
      { portal: "linkedin",    benefit: "Easy Apply",      recommended: true,  salaryMin: 22, salaryMax: 32 },
      { portal: "internshala", benefit: "Fresher Friendly", recommended: false, salaryMin: 15, salaryMax: 24 },
    ],
  },
]

export type QuestionCategory = "technical" | "behavioral" | "system-design" | "debugging"
export type QuestionDifficulty = "medium" | "hard"

export type MockQuestion = {
  q: string
  a: string
  category: QuestionCategory
  difficulty: QuestionDifficulty
  tip?: string
}

export const MOCK_QUESTIONS: MockQuestion[] = [
  {
    q: "Describe a situation where you improved model performance under tight latency constraints.",
    a: "Start by quantifying the initial latency (e.g., 'inference took 450ms'). Describe the specific optimization — quantization, pruning, ONNX export, or caching. Show the result numerically ('reduced to 80ms, 5x improvement'). Conclude with learnings and how you'd generalize the approach.",
    category: "behavioral",
    difficulty: "medium",
    tip: "Use the STAR format: Situation → Task → Action → Result. Always quantify the outcome.",
  },
  {
    q: "How do you handle data drift in a production ML system?",
    a: "Describe your monitoring stack (Evidently AI, custom dashboards). Discuss drift detection metrics — PSI, KS-test, feature distribution shifts. Walk through retraining triggers and rollback strategy. Mention A/B testing for new model versions.",
    category: "technical",
    difficulty: "medium",
    tip: "Interviewers want to hear about real tooling you've used. Mention specific libraries if possible.",
  },
  {
    q: "Design a real-time recommendation system for 100 million daily active users.",
    a: "Divide into retrieval and ranking stages. Retrieval: two-tower model + ANN index (Faiss). Ranking: lightweight neural ranker with feature store. Serving: Redis for pre-computed candidates, sub-50ms SLA. Cover data pipelines, feature freshness, and cold-start handling.",
    category: "system-design",
    difficulty: "hard",
    tip: "Always clarify scale and requirements first. Structure: candidates → ranking → serving → monitoring.",
  },
  {
    q: "Explain the attention mechanism and why it was transformative.",
    a: "Attention allows each token to dynamically weigh all other tokens in context, rather than relying on fixed-length hidden states. Key insight: scaled dot-product attention enables O(n²) long-range dependencies. This replaced RNNs for sequence tasks. Multi-head attention learns diverse relationship types in parallel.",
    category: "technical",
    difficulty: "medium",
    tip: "Draw the Q/K/V diagram mentally. Be ready to discuss computational complexity trade-offs.",
  },
  {
    q: "Your model regressed after a data pipeline change — how do you debug it?",
    a: "Bisect the problem — compare model outputs before and after the pipeline change on a held-out slice. Check input distributions for schema drift, null rate changes, or encoding differences. Validate labels independently. Use SHAP/LIME to check for feature importance shifts. Run ablations to isolate the root cause.",
    category: "debugging",
    difficulty: "hard",
    tip: "Show systematic thinking. Start broad (data vs. model vs. infra) then narrow down.",
  },
  {
    q: "Tell me about a time you disagreed with your team on a technical decision. How did you resolve it?",
    a: "Describe the disagreement clearly (e.g., model architecture choice). Explain how you presented data to support your view, listened to counter-arguments, and ultimately either reached a consensus or deferred to the team with clear documentation of trade-offs. Emphasize collaboration over winning.",
    category: "behavioral",
    difficulty: "medium",
    tip: "Show that you can disagree professionally. Avoid making it sound like you always won the argument.",
  },
  {
    q: "Design a feature store for a large-scale ML platform.",
    a: "Feature stores decouple feature engineering from model training and serving. Cover offline store (Hive/Delta Lake for batch training), online store (Redis/DynamoDB for low-latency serving), and the feature registry. Discuss point-in-time correctness to prevent data leakage, versioning, and consistency between training and serving.",
    category: "system-design",
    difficulty: "hard",
    tip: "The key insight is training-serving skew prevention. Show you understand point-in-time joins.",
  },
  {
    q: "What is the difference between bagging and boosting? When would you use each?",
    a: "Bagging (Random Forest): trains models in parallel on random subsets, reduces variance, good for high-variance models like deep trees. Boosting (XGBoost, LightGBM): sequential, each model corrects previous errors, reduces bias, often outperforms on tabular data. Use bagging when you have a noisy dataset or need robustness; use boosting when you need maximum accuracy on clean data.",
    category: "technical",
    difficulty: "medium",
    tip: "Give concrete examples: Random Forest for noisy data, XGBoost for Kaggle-style tabular problems.",
  },
]

export type Resume = {
  id: string
  name: string
  edited: string
  score: number
  scoreColor: string
  targetJob?: string
}

export const DEFAULT_RESUMES: Resume[] = [
  { id: "r1", name: "SDE II — AI/ML Resume", edited: "2 days ago", score: 92, scoreColor: "text-emerald-600 bg-emerald-50", targetJob: "1" },
  { id: "r2", name: "ML Engineer CV", edited: "1 week ago", score: 78, scoreColor: "text-amber-600 bg-amber-50", targetJob: "2" },
  { id: "r3", name: "Backend Dev Resume", edited: "2 weeks ago", score: 65, scoreColor: "text-orange-600 bg-orange-50", targetJob: "4" },
  { id: "r4", name: "Full Stack Resume", edited: "1 month ago", score: 71, scoreColor: "text-blue-600 bg-blue-50" },
]

export const MOCK_APPLICATIONS: Application[] = [
  { id: "a1", jobId: "1", jobTitle: "SDE II — AI/ML", company: "Zepto", color: "bg-violet-100 text-violet-700", initials: "ZP", status: "interview", appliedDate: "3 days ago", salary: "₹32–52 LPA" },
  { id: "a2", jobId: "2", jobTitle: "ML Engineer", company: "Flipkart", color: "bg-yellow-100 text-yellow-700", initials: "FK", status: "screening", appliedDate: "5 days ago", salary: "₹28–45 LPA" },
  { id: "a3", jobId: "3", jobTitle: "Data Scientist", company: "CRED", color: "bg-zinc-800 text-zinc-100", initials: "CR", status: "applied", appliedDate: "1 day ago", salary: "₹24–40 LPA" },
  { id: "a4", jobId: "5", jobTitle: "AI Product Manager", company: "PhonePe", color: "bg-indigo-100 text-indigo-700", initials: "PP", status: "offer", appliedDate: "2 weeks ago", salary: "₹30–55 LPA" },
  { id: "a5", jobId: "4", jobTitle: "Backend Engineer", company: "Razorpay", color: "bg-blue-100 text-blue-700", initials: "RZ", status: "rejected", appliedDate: "3 weeks ago", salary: "₹22–38 LPA" },
  { id: "a6", jobId: "6", jobTitle: "DevOps / SRE", company: "Dream11", color: "bg-red-100 text-red-700", initials: "D1", status: "screening", appliedDate: "1 week ago", salary: "₹18–32 LPA" },
]

export const MOCK_SALARY_DATA: SalaryData[] = [
  { role: "ML Engineer", min: 22, median: 38, max: 65, trend: "up", companies: 142 },
  { role: "Data Scientist", min: 18, median: 32, max: 55, trend: "up", companies: 189 },
  { role: "SDE II", min: 25, median: 42, max: 75, trend: "stable", companies: 312 },
  { role: "SDE III", min: 40, median: 65, max: 110, trend: "up", companies: 198 },
  { role: "AI/ML Lead", min: 50, median: 85, max: 140, trend: "up", companies: 87 },
  { role: "Backend Engineer", min: 20, median: 35, max: 60, trend: "stable", companies: 267 },
]

export const MOCK_ALERTS: JobAlert[] = [
  { id: "al1", keyword: "ML Engineer", location: "Bengaluru", minSalaryLPA: 25, portals: ["linkedin", "naukri"], active: true, matchCount: 4 },
  { id: "al2", keyword: "Data Scientist", location: "Remote", minSalaryLPA: 20, portals: ["linkedin", "indeed", "foundit"], active: true, matchCount: 2 },
]
