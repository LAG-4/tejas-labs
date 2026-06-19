"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import {
  packages,
  process,
  projects,
  services,
  stats,
  studio,
  testimonials,
} from "@/lib/studio";
import {
  useAutoReveal,
  useMouseParallax,
  useReducedMotion,
  useScrollProgress,
} from "@/lib/hooks";
import { ThemeToggle } from "@/components/theme-toggle";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

function Halftone({
  color,
  size = 10,
  opacity = 0.5,
}: {
  color: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1.4px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
}

function Overprint({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 text-[var(--ink)]">{children}</span>
      <span
        aria-hidden
        className="overprint-layer overprint-pink absolute inset-0 z-20 text-[var(--pink)]"
        style={{ transform: "translate(-6px, 3px)" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="overprint-layer overprint-blue absolute inset-0 z-30 text-[var(--blue)]"
        style={{ transform: "translate(6px, -3px)" }}
      >
        {children}
      </span>
    </span>
  );
}

function MouseSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let idleTimer = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
        el.classList.add("is-active");
      });
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(
        () => el.classList.remove("is-active"),
        1400,
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
    };
  }, []);

  return <div ref={ref} className="mouse-spotlight" aria-hidden />;
}

const SERVICE_LEADS = [
  "A {C} chatbot that qualifies leads and answers questions 24/7 — on the site, over WhatsApp, over SMS.",
  "A full GHL build-out for {C}: funnels, pipelines, calendars, and automations wired end-to-end.",
  "A conversion-first site for {C} that turns visitors into booked calls and CRM entries.",
  "We'd map {C}'s repetitive busywork and replace it with one clean automated pipeline.",
  "The dashboard, MVP, or internal tool {C} needs — React, Node, and a real database, deployed on Vercel.",
  "A cross-platform app for {C} — booking, directory, or community — live on Android and iOS.",
  "We'd help {C} design the AI layer: prompts, agents, datasets, and RAG — production-ready, not a demo.",
];

const PROCESS_LEADS = [
  "We start with {C}'s actual problem — not a template.",
  "{C} sees a working version the same week.",
  "We tune it against {C}'s feedback until it's right.",
  "{C} goes live — documented, monitored, and supported.",
];

const ACCENTS = ["var(--ink)", "var(--pink)", "var(--blue)", "var(--ink)"];

export function ProposalView({
  clientName,
  preparedOn,
  proposalNo,
}: {
  clientName: string;
  slug: string;
  preparedOn: string;
  proposalNo: string;
}) {
  useAutoReveal();
  const progress = useScrollProgress();
  const mouse = useMouseParallax(1);
  const reduced = useReducedMotion();

  const forClient = (s: string) => s.replace(/\{C\}/g, clientName);
  const mailto = `mailto:${studio.email}?subject=${encodeURIComponent(
    `Project brief — ${clientName} (via proposal page)`,
  )}`;

  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen text-[var(--ink)]`}
      style={{ background: "var(--bg)", fontFamily: "var(--font-body)" }}
    >
      {/* scroll progress registration bar */}
      <div className="fixed left-0 top-0 z-50 flex h-2 w-full">
        <div className="h-full bg-[var(--pink)]" style={{ width: `${progress * 100}%` }} />
        <div className="h-full flex-1 bg-[var(--blue)]/15" />
      </div>

      {!reduced && <MouseSpotlight />}

      <Nav clientName={clientName} mailto={mailto} />

      <main className="relative mx-auto max-w-6xl px-6 pb-32 sm:px-10">
        {/* cover sheet */}
        <section className="relative grid gap-10 py-14 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-8">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
              <span className="h-2 w-2 rounded-full bg-[var(--pink)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--blue)]" />
              Proposal {proposalNo} · {studio.wordmark}
            </div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-[clamp(2.2rem,6.5vw,5rem)] uppercase leading-[0.86] tracking-tight"
            >
              A proposal
              <br />
              for
              <br />
              <Overprint>{clientName}</Overprint>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--ink-soft)]">
              {forClient(
                "We put this together for {C} — a look at where {C} is today and where it could be with the right software and AI behind it. The work, the timeline, and the price below are all scoped with {C} in mind.",
              )}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 border-2 border-[var(--border)] bg-[var(--paper)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
              <span className="text-[var(--pink)]">★</span>
              Prepared exclusively for {clientName}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={studio.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--invert-bg)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--invert-text)] transition hover:bg-[var(--pink)] hover:text-[#111111]"
              >
                Hire us on Upwork ▸
              </a>
              <a
                href={mailto}
                className="border-2 border-[var(--border)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-[var(--invert-bg)] hover:text-[var(--invert-text)]"
              >
                Get a free quote
              </a>
            </div>
          </div>

          {/* cover poster */}
          <div className="relative lg:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden border-2 border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]">
              <Halftone color="var(--ink)" size={9} opacity={0.12} />
              <div className="absolute inset-0 flex flex-col p-5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span>{studio.wordmark}</span>
                  <span>PROPOSAL {proposalNo}</span>
                </div>
                <div className="mt-5 flex h-2 w-full overflow-hidden border border-[var(--ink-mute)]">
                  <div className="flex-1 bg-[var(--pink)]" />
                  <div className="flex-1 bg-[var(--blue)]" />
                  <div className="flex-1 bg-[var(--ink)]" />
                  <div className="flex-1 bg-[var(--paper)]" />
                </div>
                <div className="relative flex flex-1 flex-col items-center justify-center">
                  <div
                    className="relative h-36 w-36 transition-transform duration-200 ease-out"
                    style={{
                      transform: `translate(${reduced ? 0 : mouse.x * 14}px, ${reduced ? 0 : mouse.y * 14}px)`,
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-[var(--border)]" />
                    <div className="absolute inset-3 rounded-full border border-[var(--ink-soft)]" />
                    <div className="absolute inset-6 rounded-full border border-[var(--pink)]" />
                    <div className="absolute inset-9 rounded-full border border-[var(--blue)]" />
                    <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-[var(--ink)]" />
                    <div className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-[var(--ink)]" />
                    <div className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-[var(--ink)]" />
                    <div className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-[var(--ink)]" />
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)]" />
                  </div>
                  <div className="mt-6 max-w-[80%] text-center">
                    <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--ink-mute)]">
                      Prepared exclusively for
                    </div>
                    <div
                      style={{ fontFamily: "var(--font-display)" }}
                      className="mt-1 break-words text-lg uppercase leading-none"
                    >
                      {clientName}
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="truncate">{preparedOn}</span>
                  <span className="text-[var(--ink-mute)]">{studio.founded}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* stats */}
        <section className="grid grid-cols-2 gap-px border-2 border-[var(--border)] bg-[var(--border)] lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-cell group bg-[var(--paper)] p-6 transition-colors duration-300 hover:bg-[var(--invert-bg)]"
            >
              <div
                style={{ fontFamily: "var(--font-display)" }}
                className="text-5xl text-[var(--blue)] transition-colors duration-300 group-hover:text-[var(--pink)]"
              >
                {s.value}
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-soft)] transition-colors duration-300 group-hover:text-[var(--invert-text-soft)]">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* what we'd build */}
        <section
          id="services"
          className="scroll-mt-24 border-t-2 border-[var(--border)] py-20"
        >
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
                what we&apos;d build
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-2 text-5xl uppercase"
              >
                For {clientName}
              </h2>
            </div>
            <div className="hidden text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:block">
              seven core services
            </div>
          </div>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
            {forClient(
              "If {C} needs it, we build it — and ship it to production. Each service below is something we can tailor to {C} on a scoping call.",
            )}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <div
                key={s.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                className={`group relative overflow-hidden border-2 border-[var(--border)] p-6 transition-colors duration-300 hover:border-[var(--pink)] hover:bg-[var(--pink)]/[0.06] ${
                  i === services.length - 1 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--blue)] transition-colors duration-300 group-hover:text-[var(--pink)]">
                  <span>{s.n}</span>
                  <span className="h-px flex-1 bg-[var(--ink-trace)] transition-colors duration-300 group-hover:bg-[var(--pink)]/40" />
                </div>
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="mt-4 text-2xl uppercase transition-colors duration-300 group-hover:text-[var(--blue)]"
                >
                  {s.title}
                </h3>
                <p className="mt-2 text-sm font-bold leading-relaxed text-[var(--ink)]">
                  {forClient(SERVICE_LEADS[i])}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {s.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-[var(--border-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:border-[var(--pink)]/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* packages */}
        <section
          id="packages"
          className="scroll-mt-24 border-t-2 border-[var(--border)] py-20"
        >
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--pink)]">
                engagement shapes
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-2 text-5xl uppercase"
              >
                For {clientName}
              </h2>
            </div>
            <div className="hidden text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:block">
              pick a starting point
            </div>
          </div>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
            {forClient(
              "Pick the shape that fits {C} best. Every package is a starting point — we'll tailor scope and price to {C} on a call.",
            )}
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {packages.map((p, i) => (
              <div
                key={p.tier}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                className="group relative flex flex-col border-2 border-[var(--border)] bg-[var(--paper)] p-6 transition-colors duration-300 hover:border-[var(--pink)]"
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-4xl text-[var(--ink-ghost)]"
                  >
                    {p.tier}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--blue)] transition-colors duration-300 group-hover:text-[var(--pink)]">
                    {p.price}
                  </span>
                </div>
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="mt-3 text-xl uppercase"
                >
                  {p.name}
                </h3>
                <ul className="mt-4 flex-1 space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-[var(--ink-soft)]">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0"
                        style={{ background: i % 2 ? "var(--blue)" : "var(--pink)" }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* process timeline */}
        <section
          id="process"
          className="scroll-mt-24 border-t-2 border-[var(--border)] py-20"
        >
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
                how we&apos;d work
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-2 text-5xl uppercase"
              >
                With {clientName}
              </h2>
            </div>
            <div className="hidden text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:block">
              four phases · one shipped product
            </div>
          </div>
          <div className="relative space-y-6">
            {process.map((p, i) => {
              const isPink = i % 2 === 0;
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <article
                  key={p.step}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                  className="relative overflow-hidden border-2 border-[var(--border)] bg-[var(--paper)]"
                >
                  <Halftone color={isPink ? "var(--pink)" : "var(--blue)"} size={12} opacity={0.1} />
                  <div className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-12">
                    <div className="md:col-span-3">
                      <div
                        style={{ fontFamily: "var(--font-display)" }}
                        className="text-6xl leading-none text-[var(--ink-ghost)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div
                        className="mt-3 inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                        style={{ background: accent, color: "var(--paper-text)" }}
                      >
                        {p.day}
                      </div>
                    </div>
                    <div className="md:col-span-6">
                      <div
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: isPink ? "var(--pink)" : "var(--blue)" }}
                      >
                        phase {String(i + 1).padStart(2, "0")} · {p.step}
                      </div>
                      <h3
                        style={{ fontFamily: "var(--font-display)" }}
                        className="mt-1 text-3xl uppercase leading-none sm:text-4xl"
                      >
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm font-bold leading-snug text-[var(--ink)]">
                        {forClient(PROCESS_LEADS[i])}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                        {p.body}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-mute)]">
                        output
                      </div>
                      <div className="mt-1 text-sm font-bold uppercase tracking-widest text-[var(--pink)]">
                        {p.output}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* proof — selected work */}
        <section
          id="proof"
          className="scroll-mt-24 border-t-2 border-[var(--border)] py-20"
        >
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--pink)]">
                selected work
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-2 text-5xl uppercase"
              >
                Proof
              </h2>
            </div>
            <div className="hidden text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:block">
              shipped, not mocked
            </div>
          </div>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
            {forClient("A few things we've shipped for teams like {C}.")}
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => {
              const isPink = i % 2 === 0;
              return (
                <article
                  key={p.name}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                  className="group flex flex-col border-2 border-[var(--border)] bg-[var(--paper)] p-6 transition-colors duration-300 hover:border-[var(--pink)]"
                >
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: isPink ? "var(--pink)" : "var(--blue)" }}
                  >
                    {p.discipline}
                  </div>
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="mt-1 text-2xl uppercase leading-none"
                  >
                    {p.name}
                  </h3>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-mute)]">
                    {p.year}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {p.blurb}
                  </p>
                  {p.links && p.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.links.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            ["--link-hover" as string]: isPink
                              ? "var(--pink)"
                              : "var(--blue)",
                          }}
                          className="inline-flex items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--paper)] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 hover:bg-[var(--link-hover)] hover:text-[var(--paper-text)]"
                        >
                          {l.label} <span aria-hidden>↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* why us */}
        <section className="border-t-2 border-[var(--border)] py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
                the case for us
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-2 text-5xl uppercase"
              >
                Why {clientName}
              </h2>
            </div>
            <div className="hidden text-right text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:block">
              {studio.trust}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="group border-2 border-[var(--border)] bg-[var(--paper)] p-6 transition-colors duration-300 hover:border-[var(--pink)]"
              >
                <div
                  className="text-4xl leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  style={{ color: i % 2 ? "var(--blue)" : "var(--pink)" }}
                >
                  “
                </div>
                <blockquote
                  style={{ fontFamily: "var(--font-display)" }}
                  className="mt-2 text-lg uppercase leading-tight"
                >
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-mute)]">
                  {t.name} · {t.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* close — prepared exclusively */}
        <section
          id="close"
          className="scroll-mt-24 border-t-2 border-[var(--border)] py-20"
        >
          <div className="relative overflow-hidden border-2 border-[var(--invert-border)] bg-[var(--invert-bg)] p-8 text-[var(--invert-text)] sm:p-12">
            <Halftone color="var(--invert-text)" size={9} opacity={0.06} />
            <div className="relative flex flex-col items-center justify-center py-10 text-center max-w-xl mx-auto">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--pink)]">
                Prepared exclusively for {clientName}
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-4 text-4xl uppercase leading-none sm:text-5xl"
              >
                This page was
                <br />
                made for{" "}
                <span className="text-[var(--pink)]">{clientName}.</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[var(--invert-text-soft)]">
                {forClient(
                  "If anything here lines up with what {C} needs, we'd love to scope it properly — no obligation, no cost. Tell us about {C}'s project and we'll come back with a clear scope and price.",
                )}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href={studio.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[var(--invert-border)] bg-[var(--pink)] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#111111] transition hover:bg-[var(--invert-text)]"
                >
                  Hire us on Upwork <span aria-hidden>▸</span>
                </a>
                <a
                  href={mailto}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[var(--invert-border)] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[var(--invert-text)] transition hover:bg-[var(--invert-text)] hover:text-[var(--invert-bg)]"
                >
                  Email us a brief
                </a>
              </div>
              <div className="mt-8 text-[10px] font-bold uppercase tracking-widest text-[var(--invert-text-mute)]">
                {clientName} · {preparedOn} · Proposal {proposalNo}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer clientName={clientName} />
    </div>
  );
}

function Nav({
  clientName,
  mailto,
}: {
  clientName: string;
  mailto: string;
}) {
  const LINKS = [
    { href: "#services", label: "Services" },
    { href: "#packages", label: "Packages" },
    { href: "#process", label: "Process" },
    { href: "#proof", label: "Work" },
    { href: "#close", label: "Close" },
  ];
  return (
    <nav className="sticky top-0 z-40 border-b-2 border-[var(--border)] bg-[var(--paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            style={{ fontFamily: "var(--font-display)" }}
            className="text-sm uppercase tracking-[0.2em] hover:text-[var(--pink)]"
          >
            {studio.wordmark}
          </Link>
          <span className="hidden text-[10px] font-bold uppercase tracking-widest text-[var(--ink-mute)] sm:inline">
            · Proposal for {clientName}
          </span>
        </div>
        <div className="hidden gap-6 text-[10px] font-bold uppercase tracking-widest md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[var(--blue)]">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href={mailto}
            className="bg-[var(--invert-bg)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--invert-text)] transition hover:bg-[var(--pink)] hover:text-[#111111]"
          >
            Get a quote
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer({ clientName }: { clientName: string }) {
  return (
    <footer className="border-t-2 border-[var(--border)] bg-[var(--paper)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:px-10 md:grid-cols-3">
        <div>
          <div style={{ fontFamily: "var(--font-display)" }} className="text-xl uppercase">
            {studio.wordmark}
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">
            {studio.tagline}
          </p>
        </div>
        <div className="text-sm">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
            This proposal
          </div>
          <div className="mt-2 font-bold">Prepared for {clientName}</div>
          <div className="mt-1 text-[var(--ink-mute)]">{studio.location}</div>
        </div>
        <div className="text-sm">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
            Get in touch
          </div>
          <a
            href={studio.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block font-bold hover:text-[var(--pink)]"
          >
            Hire us on Upwork →
          </a>
          <Link href="/" className="mt-2 inline-block hover:text-[var(--blue)]">
            Back to homepage →
          </Link>
        </div>
      </div>
      <div className="border-t border-[var(--border-soft)] px-6 py-6 text-center text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:px-10">
        © {new Date().getFullYear()} {studio.name} · Proposal for {clientName}
      </div>
    </footer>
  );
}
