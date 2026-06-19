import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  message?: unknown;
  /** Honeypot — must be empty. Real users never fill it. */
  company?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown, max = 5000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: silently accept (and drop) bot submissions so they think it worked.
  if (asString(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name, 120);
  const email = asString(body.email, 200);
  const projectType = asString(body.projectType, 60);
  const message = asString(body.message, 5000);

  if (!name) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Tell us a bit more about what you’re trying to build." },
      { status: 400 },
    );
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO ?? user;

  if (!user || !pass) {
    // Local dev / unconfigured deploy: don't try to send, but give the dev a
    // clear error so they know to set the env vars.
    return NextResponse.json(
      {
        ok: false,
        error:
          "Mail is not configured on this deployment. Set GMAIL_USER and GMAIL_APP_PASSWORD.",
      },
      { status: 503 },
    );
  }

  const subject = `New brief · ${projectType || "general"} · ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType || "(not specified)"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const projectCell = projectType
    ? escapeHtml(projectType)
    : '<i style="color:#999">not specified</i>';

  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px;font-size:18px">New brief from the Tejas Labs site</h2>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td><b>${escapeHtml(name)}</b></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Project</td><td>${projectCell}</td></tr>
      </table>
      <h3 style="margin:20px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.1em">Brief</h3>
      <div style="white-space:pre-wrap;font-size:14px;background:#f6f1e7;border:1px solid #111;padding:14px">${escapeHtml(message)}</div>
      <p style="margin-top:16px;font-size:12px;color:#999">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Tejas Labs site" <${user}>`,
      to,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] send failed", err);
    return NextResponse.json(
      { ok: false, error: "Couldn’t send right now. Please email tejaslabs0028@gmail.com directly." },
      { status: 502 },
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
