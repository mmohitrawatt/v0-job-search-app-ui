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
}

export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "AI Engineer",
    company: "OpenAI",
    location: "San Francisco, CA",
    type: "Full-time",
    skills: ["Python", "LLMs", "Transformers", "PyTorch"],
    missingSkills: ["RLHF", "CUDA Optimization"],
    matchScore: 87,
    salary: "$180k–$240k",
    initials: "OA",
    color: "bg-emerald-100 text-emerald-700",
    description:
      "Build and deploy large-scale language models powering the next generation of AI products. Work closely with research to take cutting-edge models from paper to production.",
    isRemote: false,
  },
  {
    id: "2",
    title: "ML Engineer",
    company: "Google DeepMind",
    location: "London, UK",
    type: "Full-time",
    skills: ["PyTorch", "CUDA", "Research", "JAX"],
    missingSkills: ["TPU Programming", "Distributed Training"],
    matchScore: 74,
    salary: "$160k–$210k",
    initials: "GD",
    color: "bg-blue-100 text-blue-700",
    description:
      "Develop ML systems at frontier scale. You will design training pipelines, optimize inference, and collaborate with world-class researchers on AGI-aligned projects.",
    isRemote: false,
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Stripe",
    location: "New York, NY",
    type: "Full-time",
    skills: ["Python", "SQL", "Statistics", "A/B Testing"],
    missingSkills: ["Causal Inference", "Spark"],
    matchScore: 91,
    salary: "$140k–$190k",
    initials: "ST",
    color: "bg-violet-100 text-violet-700",
    description:
      "Use data to drive product decisions for millions of businesses. You will build experimentation frameworks, predictive models, and data pipelines at global scale.",
    isRemote: false,
  },
  {
    id: "4",
    title: "Backend Engineer",
    company: "Vercel",
    location: "Remote",
    type: "Full-time",
    skills: ["Node.js", "Go", "Rust", "Kubernetes"],
    missingSkills: ["Rust async", "eBPF"],
    matchScore: 68,
    salary: "$130k–$175k",
    initials: "VC",
    color: "bg-amber-100 text-amber-700",
    description:
      "Build the infrastructure that powers millions of developer deployments. Own high-throughput services, improve build performance, and shape platform reliability.",
    isRemote: true,
  },
  {
    id: "5",
    title: "AI Product Manager",
    company: "Anthropic",
    location: "San Francisco, CA",
    type: "Full-time",
    skills: ["AI Strategy", "Product", "LLMs", "Roadmapping"],
    missingSkills: ["Enterprise Sales", "API Product"],
    matchScore: 79,
    salary: "$150k–$200k",
    initials: "AN",
    color: "bg-rose-100 text-rose-700",
    description:
      "Define the product vision for Claude. Partner with research and engineering to ship safe, useful AI products trusted by enterprises worldwide.",
    isRemote: false,
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "Cloudflare",
    location: "Austin, TX",
    type: "Full-time",
    skills: ["K8s", "Terraform", "AWS", "CI/CD"],
    missingSkills: ["Cloudflare Workers", "Wrangler"],
    matchScore: 62,
    salary: "$120k–$160k",
    initials: "CF",
    color: "bg-orange-100 text-orange-700",
    description:
      "Design and operate the global infrastructure behind Cloudflare's edge network. Automate deployments, harden security posture, and ensure 99.99% uptime.",
    isRemote: false,
  },
]

export const MOCK_QUESTIONS = [
  {
    q: "Tell me about a time you improved model performance under tight latency constraints.",
    a: "Start by quantifying the initial latency (e.g., 'inference took 450ms'). Describe the specific optimization — quantization, pruning, ONNX export, or caching. Show the result numerically ('reduced to 80ms, 5x improvement'). Finish with learnings and how you'd generalize the approach.",
  },
  {
    q: "How do you handle data drift in a production ML system?",
    a: "Explain your monitoring stack (Evidently, WhyLabs, or custom dashboards). Discuss drift detection metrics — PSI, KS-test, or feature distribution shifts. Walk through your retraining triggers and rollback strategy. Mention A/B testing for new model versions.",
  },
  {
    q: "Design a real-time recommendation system for 10M daily active users.",
    a: "Break it into retrieval and ranking stages. Retrieval: two-tower model + ANN index (Faiss/ScaNN). Ranking: lightweight neural ranker with feature store. Serving: Redis for pre-computed candidates, sub-50ms SLA. Cover data pipelines, feature freshness, and cold-start handling.",
  },
  {
    q: "Explain the attention mechanism and why it was transformative.",
    a: "Attention lets each token dynamically weight all other tokens ('context') rather than relying on fixed-length hidden states. Key insight: scaled dot-product attention O(n²) enables long-range dependencies. This replaced RNNs for sequence tasks. Multi-head attention learns diverse relationship types in parallel.",
  },
  {
    q: "Walk me through your approach to debugging a model that regressed after a data pipeline change.",
    a: "Start by bisecting — compare model outputs before vs. after the pipeline change on a held-out slice. Check input distributions for schema drift, null rates, or encoding changes. Validate labels independently. Use SHAP/LIME to see if feature importances shifted. Re-run ablations to isolate the root cause.",
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
  { id: "r1", name: "AI Engineer Resume", edited: "2 days ago", score: 92, scoreColor: "text-emerald-600 bg-emerald-50", targetJob: "1" },
  { id: "r2", name: "ML Scientist CV", edited: "1 week ago", score: 78, scoreColor: "text-amber-600 bg-amber-50", targetJob: "2" },
  { id: "r3", name: "Backend Dev Resume", edited: "2 weeks ago", score: 65, scoreColor: "text-orange-600 bg-orange-50", targetJob: "4" },
  { id: "r4", name: "Full Stack Resume", edited: "1 month ago", score: 71, scoreColor: "text-blue-600 bg-blue-50" },
]
