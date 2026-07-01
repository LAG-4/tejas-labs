import {
  faqs,
  developers,
  extendedProjects,
  process as deliveryProcess,
  projects,
  services,
  stats,
  studio,
  team,
} from "@/lib/studio";

type IncomingMessage = {
  role: "assistant" | "user";
  content: string;
};

const OPENCODE_BASE_URL =
  process.env.OPENCODE_GO_BASE_URL ?? "https://opencode.ai/zen/v1";
const OPENCODE_MODEL = process.env.OPENCODE_GO_MODEL ?? "nemotron-3-ultra-free";

function buildKnowledgeBase() {
  const projectLines = projects
    .map(
      (project) =>
        `${project.name} (${project.year}, ${project.discipline}): ${project.blurb} Results: ${project.metrics.join(", ")}.`,
    )
    .join("\n");
  const extendedProjectLines = extendedProjects
    .map(
      (project) =>
        `${project.name} (${project.category}): ${project.body} Tech: ${project.tech.join(", ")}. Links: ${
          project.links.length > 0 ? project.links.join(", ") : "No public link listed"
        }.`,
    )
    .join("\n");

  const serviceLines = services
    .map((service) => `${service.title}: ${service.body} Tags: ${service.tags.join(", ")}.`)
    .join("\n");

  const faqLines = faqs.map((faq) => `${faq.q}: ${faq.a}`).join("\n");
  const teamLines = team.map((member) => `${member.name}, ${member.role}: ${member.bio}`).join("\n");
  const developerLines = developers
    .map((dev) => `${dev.name}: ${dev.capabilities}`)
    .join("\n");
  const processLines = deliveryProcess
    .map((step) => `${step.step} (${step.day}): ${step.title}. ${step.body}`)
    .join("\n");

  return [
    `Studio: ${studio.name}. ${studio.blurb}`,
    `Contact: Upwork ${studio.upwork}. Email ${studio.email}. Location ${studio.location}. Trust: ${studio.trust}.`,
    `Stats: ${stats.map((stat) => `${stat.value} ${stat.label}`).join("; ")}.`,
    `Services:\n${serviceLines}`,
    `Projects:\n${projectLines}`,
    `Extended portfolio:\n${extendedProjectLines}`,
    `Cover letter instruction: When asked to draft a cover letter, include this exact sentence: "You can know more about me and my projects from my website: https://lagaryan.click/ "`,
    `Process:\n${processLines}`,
    `Team:\n${teamLines}`,
    `Developers (use this to route work to the right person):\n${developerLines}`,
    `FAQ:\n${faqLines}`,
  ].join("\n\n");
}

function cleanMessages(value: unknown): IncomingMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((message): message is IncomingMessage => {
      if (!message || typeof message !== "object") return false;
      const candidate = message as Partial<IncomingMessage>;
      return (
        (candidate.role === "assistant" || candidate.role === "user") &&
        typeof candidate.content === "string" &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-8)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 900),
    }));
}

const CACHE_MAX = 100;
const replyCache = new Map<string, string>();

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const cannedReplies = new Map<string, string>([
  [
    "hi",
    "Hi! I'm Tejas, the Tejas Labs receptionist. I help visitors scope their project and find the right service, past work, and next step.\n\nWhat would you like to build?",
  ],
  [
    "hello",
    "Hi there! I'm Tejas, the Tejas Labs receptionist.\n\nTell me what you want to build — an AI chatbot, a landing page, a SaaS MVP, an automation pipeline, or a mobile app — and I'll point you to the right service, relevant work, and the next step.",
  ],
  [
    "hey",
    "Hey! Welcome to Tejas Labs. What can I help you ship — a site, a chatbot, an automation, a mobile app, or something else?",
  ],
  [
    "how are you",
    "I'm running and ready. I'm Tejas, the Tejas Labs receptionist — tell me what you'd like to build and I'll map it to the right service, project, and next step.",
  ],
  [
    "who are you",
    "I'm Tejas, the AI receptionist for **Tejas Labs** — a freelance software and AI agency. I point visitors to the most relevant services, projects, and next step. What are you trying to build?",
  ],
  [
    "what do you do",
    "Tejas Labs ships **AI chatbots & voice agents**, **GoHighLevel implementations**, **lead-generation websites**, **business automation**, **full-stack web/SaaS**, **mobile apps**, and **AI consulting**.\n\nWhich of these is closest to what you need?",
  ],
  [
    "services",
    "Tejas Labs offers:\n- **AI Chatbots & Voice Agents** — Vapi, GoHighLevel, OpenAI, WhatsApp\n- **GoHighLevel Implementation** — funnels, pipelines, Twilio, AI chat\n- **Lead Generation Websites** — high-conversion landing pages + CRM\n- **Business Automation** — Python, n8n, APIs, GHL workflows\n- **Full-Stack Web & SaaS** — Next.js, React, Node, Postgres\n- **Mobile Apps** — Flutter + Firebase\n- **AI Consulting** — prompt eng, RAG, datasets, agent architecture\n\nWhat would you like to start with?",
  ],
  [
    "pricing",
    "Ballpark pricing at Tejas Labs:\n- **AI chatbot setup** — $300–800\n- **Lead-gen website** — $500–1,500\n- **GoHighLevel complete setup** — $1,000–3,000+\n- **Custom SaaS MVP** — $2,000–5,000+\n\nMonthly maintenance retainers are available after launch. Share a quick scope and I'll give a tighter estimate.",
  ],
  [
    "how much",
    "Tejas Labs pricing depends on scope: chatbots ~$300–800, lead-gen sites ~$500–1,500, GHL setups ~$1,000–3,000+, and SaaS MVPs ~$2,000–5,000+. Tell me what you're building and I'll narrow it down.",
  ],
  [
    "portfolio",
    "Here's a sample of Tejas Labs work. What kind of build are you scoping?\n\n**SaaS / marketplaces:** Ecoroom, CafeHopper\n**AI / RAG:** AI PDF Chatbot with Source Citations, ChatSQL, RAG Search Engine\n**Mobile:** LearnAI (Google Play), CafeCompas, SheSafe\n**Client sites:** Brody Sites, Utah Deportation Insights\n\nWant me to go deeper on any of these?",
  ],
  [
    "contact",
    "You can reach Tejas Labs here:\n- **Email:** tejaslabs0028@gmail.com\n- **Location:** Raipur, India · GMT+5:30\n- **Hire us:** https://www.upwork.com/agencies/2066396595594354942/\n\nFor a project quote, tell me what you'd like to build and I'll draft the next step.",
  ],
  [
    "thanks",
    "Anytime! Tell me what you'd like to build and I'll map it to the right service and next step.",
  ],
  [
    "thank you",
    "My pleasure. Want me to point you toward the right service, a relevant project, or a quote next?",
  ],
]);

function buildProjectsAnswer() {
  const featured = projects
    .map((p) => `- **${p.name}** (${p.year}, ${p.discipline}) — ${p.blurb}`)
    .join("\n");
  const extended = extendedProjects
    .map((p) => `- **${p.name}** (${p.category}) — ${p.body}`)
    .join("\n");
  return [
    "Here's the full Tejas Labs portfolio.",
    "",
    "**Featured projects:**",
    featured,
    "",
    "**Extended portfolio:**",
    extended,
    "",
    "Which of these is closest to what you want to build? Tell me your goal and I'll point you to the right next step.",
  ].join("\n");
}

function buildTeamAnswer() {
  const founders = team
    .map((m) => `- **${m.name}** (${m.role}) — ${m.bio}`)
    .join("\n");
  const devs = developers
    .map((d) => `- **${d.name}** — ${d.capabilities}`)
    .join("\n");
  return [
    "The Tejas Labs team:",
    "",
    "**Founders & specialists:**",
    founders,
    "",
    "**Developers (routing by skill):**",
    devs,
    "",
    "What are you building? I'll match you with the right person.",
  ].join("\n");
}

const projectTriggers = ["project", "projects", "portfolio", "work", "case stud", "what have you built", "what have u built", "what all projects", "past work", "previous work", "show work", "show your work", "examples"];
const teamTriggers = ["team", "who works", "who are the", "developers", "who builds", "your people", "staff", "hire"];
const servicesTriggers = ["service", "services", "what do you do", "what do u do", "what can you do", "what can u do", "offer", "offerings", "capabilities"];
const pricingTriggers = ["price", "pricing", "cost", "how much", "rate", "rates", "charge", "budget", "quote", "estimate"];

function matchIntent(text: string): string | undefined {
  const n = normalize(text);
  if (projectTriggers.some((t) => n.includes(t))) return buildProjectsAnswer();
  if (teamTriggers.some((t) => n.includes(t))) return buildTeamAnswer();
  if (servicesTriggers.some((t) => n.includes(t))) {
    return (
      "Tejas Labs offers:\n- **AI Chatbots & Voice Agents** — Vapi, GoHighLevel, OpenAI, WhatsApp\n- **GoHighLevel Implementation** — funnels, pipelines, Twilio, AI chat\n- **Lead Generation Websites** — high-conversion landing pages + CRM\n- **Business Automation** — Python, n8n, APIs, GHL workflows\n- **Full-Stack Web & SaaS** — Next.js, React, Node, Postgres\n- **Mobile Apps** — Flutter + Firebase\n- **AI Consulting** — prompt eng, RAG, datasets, agent architecture\n\nWhat would you like to start with?"
    );
  }
  if (pricingTriggers.some((t) => n.includes(t))) {
    return "Ballpark pricing at Tejas Labs:\n- **AI chatbot setup** — $300–800\n- **Lead-gen website** — $500–1,500\n- **GoHighLevel complete setup** — $1,000–3,000+\n- **Custom SaaS MVP** — $2,000–5,000+\n\nMonthly maintenance retainers are available after launch. Share a quick scope and I'll give a tighter estimate.";
  }
  return undefined;
}

function cacheGet(key: string) {
  const value = replyCache.get(key);
  if (value === undefined) return undefined;
  replyCache.delete(key);
  replyCache.set(key, value);
  return value;
}

function cacheSet(key: string, value: string) {
  if (replyCache.size >= CACHE_MAX) {
    const oldest = replyCache.keys().next().value;
    if (oldest !== undefined) replyCache.delete(oldest);
  }
  replyCache.set(key, value);
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENCODE_GO_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Chat is not configured yet. Add OPENCODE_GO_API_KEY on the server." },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = cleanMessages((body as { messages?: unknown }).messages);

  if (messages.length === 0) {
    return Response.json({ error: "Send at least one message." }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];
  const cacheKey = lastMessage.role === "user" ? normalize(lastMessage.content) : "";

  if (cacheKey) {
    const canned = cannedReplies.get(cacheKey);
    if (canned !== undefined) {
      cacheSet(cacheKey, canned);
      return Response.json({ reply: canned });
    }

    const cached = cacheGet(cacheKey);
    if (cached !== undefined) return Response.json({ reply: cached });
  }

  if (lastMessage.role === "user") {
    const intentReply = matchIntent(lastMessage.content);
    if (intentReply !== undefined) {
      if (cacheKey) cacheSet(cacheKey, intentReply);
      return Response.json({ reply: intentReply });
    }
  }

  try {
    const systemPrompt = `You are Tejas, the warm, concise AI receptionist for Tejas Labs, a freelance software and AI agency.

Use only the knowledge base below as factual context. If a visitor asks for something outside it, say what you can infer and invite them to share details.

Goals:
- Help potential clients understand whether Tejas Labs can build what they need.
- Mention relevant services, projects, prices, timelines, or team details when useful.
- Ask one focused follow-up question when the client need is unclear.
- Guide qualified visitors to hire Tejas Labs on Upwork: ${studio.upwork}
- If asked to draft a cover letter, include the exact personal website sentence from the knowledge base.
- You may use light Markdown: **bold**, bullet lists, and tables for comparisons. Keep it skimmable.

Style:
- Sound human, calm, and confident.
- Keep replies under 130 words unless the user asks for details.
- Do not invent case studies, client names, guarantees, or private contact channels.

Knowledge base:
${buildKnowledgeBase()}`;

    let reply = "";

    for (let attempt = 0; attempt < 3 && !reply; attempt++) {
      const response = await fetch(`${OPENCODE_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OPENCODE_MODEL,
          temperature: 0.35,
          max_tokens: 2500,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        reply = data.choices?.[0]?.message?.content?.trim() ?? "";
      }
    }

    if (!reply) {
      return Response.json({ error: "The model returned an empty reply." }, { status: 502 });
    }

    if (cacheKey) cacheSet(cacheKey, reply);

    return Response.json({ reply });
  } catch {
    return Response.json(
      { error: "The Tejas Labs receptionist is unavailable right now." },
      { status: 502 },
    );
  }
}
