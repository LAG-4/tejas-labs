"use client";

import { useId, useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const PROJECT_TYPES = [
  "Custom GPT Agent / RPA",
  "Vertical SaaS Integration",
  "RAG Knowledge System",
  "Full-Stack AI App",
  "Data Automation / Reporting",
  "Something else",
] as const;

const inputClass =
  "w-full border-2 border-[var(--border)] bg-[var(--invert-bg)] px-4 py-3 text-sm font-bold text-[var(--invert-text)] placeholder-[var(--invert-text-mute)] outline-none transition focus:border-[var(--pink)] focus:bg-[var(--invert-bg)]";

const labelClass =
  "text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--invert-text-soft)]";

export function ContactForm() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          projectType: data.get("projectType"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
        }),
      });
      const json = (await res.json().catch(() => ({ ok: false, error: "Network error" }))) as {
        ok: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong. Please try again or email us directly.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Network error. Please email tejaslabs0028@gmail.com directly.");
    }
  }

  return (
    <form ref={formRef} id={formId} onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor={`${formId}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            disabled={status === "submitting"}
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor={`${formId}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            disabled={status === "submitting"}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor={`${formId}-type`} className={labelClass}>
          Project type
        </label>
        <select
          id={`${formId}-type`}
          name="projectType"
          defaultValue=""
          disabled={status === "submitting"}
          className={`${inputClass} cursor-pointer appearance-none pr-10`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f6f1e7' stroke-width='2' stroke-linecap='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "16px 16px",
          }}
        >
          <option value="" disabled>
            Pick one…
          </option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor={`${formId}-message`} className={labelClass}>
          Brief
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          placeholder="What are you trying to automate or build? Audit, cost, or latency targets if you have them."
          disabled={status === "submitting"}
          className={`${inputClass} resize-y leading-relaxed`}
        />
      </div>

      {/* Honeypot — hidden from real users, irresistible to bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 border-2 border-[var(--invert-border)] bg-[var(--pink)] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-[#111111] transition hover:bg-[var(--invert-text)] disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Spinner /> Sending…
            </>
          ) : (
            <>
              Send the brief <span aria-hidden>▸</span>
            </>
          )}
        </button>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--invert-text-mute)]">
          Replies within 2 working days
        </p>
      </div>

      {status === "success" && (
        <div
          role="status"
          className="border-2 border-[var(--invert-border)] bg-[var(--invert-bg)] px-4 py-3 text-sm text-[var(--invert-text)]"
        >
          <span className="text-[var(--pink)]">●</span> Got it. We’ll be in touch within
          two working days. If it’s urgent, ping us on Upwork.
        </div>
      )}
      {status === "error" && (
        <div
          role="alert"
          className="border-2 border-[var(--pink)] bg-[var(--invert-bg)] px-4 py-3 text-sm text-[var(--invert-text)]"
        >
          <span className="text-[var(--pink)]">!</span> {error}
        </div>
      )}
    </form>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden
      className="animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  );
}
