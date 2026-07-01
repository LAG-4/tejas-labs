import {
  faqs,
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

  try {
    const response = await fetch(`${OPENCODE_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENCODE_MODEL,
        temperature: 0.35,
        max_tokens: 1500,
        messages: [
          {
            role: "system",
            content: `You are Tejas, the warm, concise AI receptionist for Tejas Labs, a freelance software and AI agency.

Use only the knowledge base below as factual context. If a visitor asks for something outside it, say what you can infer and invite them to share details.

Goals:
- Help potential clients understand whether Tejas Labs can build what they need.
- Mention relevant services, projects, prices, timelines, or team details when useful.
- Ask one focused follow-up question when the client need is unclear.
- Guide qualified visitors to hire Tejas Labs on Upwork: ${studio.upwork}
- If asked to draft a cover letter, include the exact personal website sentence from the knowledge base.

Style:
- Sound human, calm, and confident.
- Keep replies under 130 words unless the user asks for details.
- Do not invent case studies, client names, guarantees, or private contact channels.

Knowledge base:
${buildKnowledgeBase()}`,
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      return Response.json(
        { error: "The Tejas Labs receptionist is unavailable right now." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return Response.json({ error: "The model returned an empty reply." }, { status: 502 });
    }

    return Response.json({ reply });
  } catch {
    return Response.json(
      { error: "The Tejas Labs receptionist is unavailable right now." },
      { status: 502 },
    );
  }
}
