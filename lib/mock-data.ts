export type JobPortal = "naukri" | "linkedin" | "indeed" | "foundit" | "internshala"

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
  },
]

export const MOCK_QUESTIONS = [
  {
    q: "Kisi aisi situation ke baare mein batao jab tumne tight latency constraints mein model performance improve ki ho.",
    a: "Pehle initial latency ko quantify karo (e.g., 'inference 450ms le raha tha'). Specific optimization batao — quantization, pruning, ONNX export, ya caching. Result numerically dikhao ('80ms tak laya, 5x improvement'). Aakhir mein learnings aur approach ko generalise karne ka tarika batao.",
  },
  {
    q: "Production ML system mein data drift kaise handle karte ho?",
    a: "Apna monitoring stack explain karo (Evidently AI, custom dashboards). Drift detection metrics discuss karo — PSI, KS-test, feature distribution shifts. Retraining triggers aur rollback strategy walk through karo. Naye model versions ke liye A/B testing mention karo.",
  },
  {
    q: "10 crore daily active users ke liye real-time recommendation system design karo.",
    a: "Retrieval aur ranking stages mein divide karo. Retrieval: two-tower model + ANN index (Faiss). Ranking: lightweight neural ranker with feature store. Serving: Redis for pre-computed candidates, sub-50ms SLA. Data pipelines, feature freshness, aur cold-start handling cover karo.",
  },
  {
    q: "Attention mechanism explain karo aur ye kyun transformative tha?",
    a: "Attention har token ko dynamically baaki tokens ('context') ke saath weigh karne deta hai rather than fixed-length hidden states. Key insight: scaled dot-product attention O(n²) long-range dependencies enable karta hai. Isse RNNs replace hue sequence tasks mein. Multi-head attention parallel mein diverse relationship types seekhta hai.",
  },
  {
    q: "Data pipeline change ke baad model regress ho gayi — debug kaise karoge?",
    a: "Bisect karo — pipeline change se pehle aur baad ke model outputs compare karo held-out slice pe. Input distributions check karo schema drift, null rates, ya encoding changes ke liye. Labels ko independently validate karo. SHAP/LIME use karo feature importances shift check karne ke liye. Root cause isolate karne ke liye ablations run karo.",
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
  { id: "r1", name: "SDE II — AI/ML Resume", edited: "2 din pehle", score: 92, scoreColor: "text-emerald-600 bg-emerald-50", targetJob: "1" },
  { id: "r2", name: "ML Engineer CV", edited: "1 hafte pehle", score: 78, scoreColor: "text-amber-600 bg-amber-50", targetJob: "2" },
  { id: "r3", name: "Backend Dev Resume", edited: "2 hafte pehle", score: 65, scoreColor: "text-orange-600 bg-orange-50", targetJob: "4" },
  { id: "r4", name: "Full Stack Resume", edited: "1 mahine pehle", score: 71, scoreColor: "text-blue-600 bg-blue-50" },
]
