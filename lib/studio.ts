/** Tejas Labs — shared content. */

export const studio = {
  name: "Tejas Labs",
  wordmark: "TEJAS LABS",
  tagline:
    "Production-ready AI automation, agentic workflows, and full-stack AI applications.",
  blurb:
    "We build AI that doesn’t just demo well — it runs in your business. RAG systems, custom GPT agents, and full-stack AI apps that pass audits, cut costs, and scale. Trusted by the Government of Chhattisgarh.",
  email: "tejaslabs0028@gmail.com",
  upwork: "https://www.upwork.com/agencies/2066396595594354942/",
  location: "Raipur, India · GMT+5:30",
  founded: 2021,
  cta: "Start a project",
  trust: "Trusted by the Government of Chhattisgarh",
};

export const stats = [
  { value: "30+", label: "projects shipped" },
  { value: "6 mo", label: "in production AI" },
  { value: "3", label: "specialists, no handoffs" },
  { value: "∞", label: "iterations until it ships" },
];

export const services = [
  {
    n: "01",
    title: "Custom GPT Agents & RPA",
    body: "Task-oriented agents with multi-tool workflows, browser automation, and built-in cost control. They do the work, not just the demo.",
    tags: ["LangGraph", "Playwright", "RPA"],
  },
  {
    n: "02",
    title: "Vertical SaaS Integrations",
    body: "Replace Zapier sprawl with engineered pipelines across Shopify, Tekmetric, HubSpot, GHL, and Google Workspace.",
    tags: ["Shopify", "HubSpot", "n8n", "Make.com"],
  },
  {
    n: "03",
    title: "RAG Knowledge Systems",
    body: "Secure vector search (Pinecone, PGVector) over your private docs, with PII masking and full audit logs.",
    tags: ["Pinecone", "PGVector", "RAG"],
  },
  {
    n: "04",
    title: "Full-Stack AI Applications",
    body: "FastAPI / Django / Node.js backends with React frontends — Dockerized, tested, and cloud-deployed.",
    tags: ["FastAPI", "MERN", "Next.js", "Docker"],
  },
  {
    n: "05",
    title: "Data Automation & Reporting",
    body: "Scraping, cleansing, and live dashboards with eval monitoring on top of your real data.",
    tags: ["Scrapy", "Dashboards", "Evals"],
  },
];

export const projects = [
  {
    name: "Ecoroom",
    year: "2025",
    discipline: "Sustainable marketplace",
    blurb:
      "A website for a business that connects householders with makers who turn everyday waste into eco-friendly home decor — a marketplace to discover, hire, and collaborate with creators crafting the best out of waste to beautify homes.",
    metrics: ["waste-to-decor", "maker marketplace", "eco-first UX"],
  },
  {
    name: "LearnAI",
    year: "2024",
    discipline: "Mobile learning app",
    blurb:
      "An Android app teaching the fundamentals of AI — core concepts, a searchable glossary of the field's famous terminology, and a live feed of the latest AI news, all in one pocket-sized learning companion.",
    metrics: ["Android-native", "live AI news feed", "interactive glossary"],
  },
  {
    name: "Utah Deportation Insights",
    year: "2025",
    discipline: "Bilingual data platform",
    blurb:
      "A bilingual English/Spanish insights platform built for Brody covering Utah deportation data — surfacing trends and stories with AI-powered search and summaries for advocates, journalists, and affected communities.",
    metrics: ["bilingual EN/ES", "AI search & summaries", "trend dashboards"],
  },
  {
    name: "YouTube Shorts Automation",
    year: "2025",
    discipline: "Content automation",
    blurb:
      "An n8n pipeline that auto-generates and schedules YouTube Shorts for any niche — generating clips and posting on a cadence, with a Google Sheets database tracking every video and its analytics as the single source of truth.",
    metrics: ["n8n pipeline", "Google Sheets DB", "any-niche scheduling"],
  },
  {
    name: "OpenClaw / Hermes Agent",
    year: "2024",
    discipline: "Personal AI agent",
    blurb:
      "A personal-assistant agent built on OpenClaw and Hermes that automates the day-to-day — handling repetitive tasks and guiding users to automate their own uninteresting chores with AI, turning busywork into reproducible workflows.",
    metrics: ["OpenClaw + Hermes", "daily task automation", "DIY agent guidance"],
  },
];

export const process = [
  {
    step: "Scope",
    title: "We start with the problem, not the model",
    body: "A scoping call and a written spec with clear audit, cost, and latency targets — agreed before a single line of code.",
  },
  {
    step: "Build",
    title: "Ship to a staging URL on day one",
    body: "We build in the real environment: real API keys, real data, observability and tracing from the very first commit.",
  },
  {
    step: "Harden",
    title: "Production mindset by default",
    body: "Acceptance tests, prompt versioning, PII masking, key vaulting, and cost dashboards — all in place before handoff.",
  },
  {
    step: "Run",
    title: "Retainers for ongoing improvement",
    body: "We stay on for prompt and tool refinement, eval monitoring, and rapid iteration as your business changes.",
  },
];

export const team = [
  {
    name: "Tushar Naidu",
    role: "Founder",
    img: "/tushar.jpeg",
    bio: "Leads the AI architecture — LangGraph workflows, RAG systems, and the backend that keeps them running in production.",
  },
  {
    name: "Ansh Pandey",
    role: "Founder",
    img: "/ansh.png",
    bio: "Builds the full-stack apps and SaaS integrations around the models — React, Next.js, Node, and the glue between tools.",
  },
  {
    name: "Lag",
    role: "AI Developer",
    img: undefined,
    bio: "Builds and ships the models — from prompt engineering to agentic workflows, evals, and the inference layer behind every product.",
  },
  {
    name: "Nitin",
    role: "Backend Dev · Full-Stack",
    img: undefined,
    bio: "Owns the backend, APIs, and the full-stack glue — data pipelines, Docker/K8s deployment, and the observability that keeps everything accountable.",
  },
];

export const testimonials = [
  {
    quote:
      "Their RAG system cut our support load by half and passed our security audit on the first try.",
    name: "Operations Lead",
    title: "State Government Department",
  },
  {
    quote:
      "Most agencies ship a demo. Tejas Labs shipped observability and cost dashboards on day one.",
    name: "Founder",
    title: "D2C Retail Brand",
  },
  {
    quote:
      "They replaced our Zapier sprawl with one maintainable pipeline. Costs dropped, reliability went up.",
    name: "CTO",
    title: "B2B SaaS Startup",
  },
];

export const faqs = [
  {
    q: "How do you price?",
    a: "Fixed-scope projects or a monthly retainer. We quote after a scoping call once we understand the work — no hourly surprises, no scope creep invoices.",
  },
  {
    q: "How fast can you start?",
    a: "Usually within a week. We run two engagements at a time so each gets the full team’s attention, not a slice of it.",
  },
  {
    q: "Is my data secure?",
    a: "By default: API key vaulting, PII masking, data-residency controls, and full audit logs. We build to pass your security review, not dodge it.",
  },
  {
    q: "Which models do you use?",
    a: "GPT-5, Claude, Gemini, and Perplexity — wired behind smart fallback and caching so you control spend without locking into one vendor.",
  },
];

export const techStack = [
  "Python",
  "FastAPI",
  "Flask",
  "Django REST",
  "Node.js",
  "Next.js",
  "React",
  "Tailwind",
  "Flutter",
  "LangGraph",
  "PostgreSQL",
  "MongoDB",
  "Pinecone",
  "PGVector",
  "AWS",
  "GCP",
  "Azure",
  "Docker",
  "Kubernetes",
  "GitHub Actions",
  "Playwright",
  "Scrapy",
  "n8n",
  "Shopify",
  "HubSpot",
  "GHL",
  "Zapier",
];
