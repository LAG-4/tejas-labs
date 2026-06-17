/** Tejas Labs — shared content. */

export const studio = {
  name: "Tejas Labs",
  wordmark: "TEJAS LABS",
  tagline:
    "Production-ready AI automation, agentic workflows, and full-stack AI applications.",
  blurb:
    "We build AI that doesn’t just demo well — it runs in your business. RAG systems, custom GPT agents, and full-stack AI apps that pass audits, cut costs, and scale. Trusted by the Government of Chhattisgarh.",
  email: "hello@tejaslabs.ai",
  upwork: "https://www.upwork.com/",
  location: "Raipur, India · GMT+5:30",
  founded: 2021,
  cta: "Start a project",
  trust: "Trusted by the Government of Chhattisgarh",
};

export const stats = [
  { value: "30+", label: "projects shipped" },
  { value: "4+", label: "years in production AI" },
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
    name: "Chhattisgarh Govt",
    year: "2025",
    discipline: "Public-sector AI",
    blurb:
      "A multilingual RAG knowledge assistant for a Government of Chhattisgarh department — answering citizen and staff queries over policy docs and schemes, with audit-ready logs.",
    metrics: ["12k+ queries/mo", "3 languages", "audit-ready logs"],
  },
  {
    name: "Tekmetric + Shopify",
    year: "2025",
    discipline: "E-commerce automation",
    blurb:
      "An agent that triages orders, syncs inventory, and replies to customers across Shopify and GHL for an auto-parts retailer — replacing a fragile Zapier chain.",
    metrics: ["-60% manual ops", "2.3× faster replies", "1 pipeline, not 12"],
  },
  {
    name: "HIPAA RAG Assistant",
    year: "2024",
    discipline: "Healthcare AI",
    blurb:
      "Clinical knowledge retrieval over private documentation with PII masking, data-residency controls, and a full audit trail. Built to pass a compliance review.",
    metrics: ["HIPAA-aligned", "PII masked", "0 data egress"],
  },
  {
    name: "HubSpot + n8n Engine",
    year: "2024",
    discipline: "CRM automation",
    blurb:
      "Replaced a costly Zapier sprawl with a cost-engineered n8n + LangGraph pipeline syncing HubSpot and GHL in real time, with eval monitoring on every run.",
    metrics: ["-70% integration cost", "real-time sync", "eval-monitored"],
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
    name: "Tushar N.",
    role: "Founder · AI & Backend",
    img: "/tushar.jpeg",
    bio: "Leads the AI architecture — LangGraph workflows, RAG systems, and the backend that keeps them running in production.",
  },
  {
    name: "Aryan G.",
    role: "Full-Stack · Integrations",
    img: undefined,
    bio: "Builds the full-stack apps and SaaS integrations around the models — React, Next.js, Node, and the glue between tools.",
  },
  {
    name: "Nitin X.",
    role: "Data & DevOps",
    img: undefined,
    bio: "Owns the data pipelines, scraping, Docker/K8s deployment, and the observability that keeps everything accountable.",
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
