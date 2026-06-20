"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { process, stats, studio } from "@/lib/studio";
import {
  about,
  commitment,
  coreExpertise,
  proposedSolutions,
  techStackCategorized,
  whyChooseUs,
} from "@/lib/proposal";
import {
  useAutoReveal,
  useHasHover,
  useReducedMotion,
} from "@/lib/hooks";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { ParallaxRegistrationMark } from "@/components/parallax-registration-mark";
import { SiteNav } from "@/components/site-nav";

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
  const reduced = useReducedMotion();
  const hasHover = useHasHover();

  const forClient = (s: string) => s.replace(/\{C\}/g, clientName);
  const mailto = `mailto:${studio.email}?subject=${encodeURIComponent(
    `Project brief — ${clientName} (via proposal page)`,
  )}`;

  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen text-[var(--ink)]`}
      style={{ background: "var(--bg)", fontFamily: "var(--font-body)" }}
    >
      <ScrollProgressBar />

      {!reduced && hasHover && <MouseSpotlight />}

      <SiteNav
        wordmark={studio.wordmark}
        subtitle={`Proposal for ${clientName}`}
        ctaHref={mailto}
        ctaLabel="Get a quote"
        links={[
          { href: "#expertise", label: "Expertise" },
          { href: "#solutions", label: "Solutions" },
          { href: "#process", label: "Process" },
          { href: "#why", label: "Why Us" },
          { href: "#contact", label: "Contact" },
        ]}
      />

      <main className="relative mx-auto max-w-6xl px-6 pb-32 sm:px-10">
        {/* ── cover sheet ── */}
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
              Proposal for
              <br />
              <Overprint>{clientName}</Overprint>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--ink-soft)]">
              {forClient(
                "We put this together for {C} — a look at the AI solutions, automation, and software we'd build to transform how {C} operates. The expertise, proposed solutions, and timeline below are all scoped with {C} in mind.",
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
                  <ParallaxRegistrationMark />
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

        {/* ── stats ── */}
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

        {/* ── about ── */}
        <section
          id="about"
          className="scroll-mt-24 border-t-2 border-[var(--border)] py-20"
        >
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
                who we are
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-2 text-4xl uppercase leading-none"
              >
                About
              </h2>
            </div>
            <div className="md:col-span-9">
              <p className="text-base font-bold leading-relaxed text-[var(--ink)]">
                {about.intro}
              </p>
              <div className="mt-6 border-l-2 border-[var(--pink)] pl-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--pink)]">
                  Our mission
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {about.mission}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── core expertise ── */}
        <section
          id="expertise"
          className="scroll-mt-24 border-t-2 border-[var(--border)] py-20"
        >
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
                what we do
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-2 text-5xl uppercase"
              >
                Core Expertise
              </h2>
            </div>
            <div className="hidden text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:block">
              ten disciplines
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {coreExpertise.map((cat, i) => (
              <div
                key={cat.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}
                className="group relative overflow-hidden border-2 border-[var(--border)] bg-[var(--paper)] p-6 transition-colors duration-300 hover:border-[var(--pink)]"
              >
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--blue)] transition-colors duration-300 group-hover:text-[var(--pink)]">
                  <span style={{ fontFamily: "var(--font-display)" }}>{cat.n}</span>
                  <span className="h-px flex-1 bg-[var(--ink-trace)] transition-colors duration-300 group-hover:bg-[var(--pink)]/40" />
                </div>
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="mt-3 text-xl uppercase leading-tight transition-colors duration-300 group-hover:text-[var(--blue)]"
                >
                  {cat.title}
                </h3>
                <ul className="mt-4 grid gap-1.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-[var(--ink-soft)]"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0"
                        style={{ background: i % 2 ? "var(--blue)" : "var(--pink)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── proposed solutions ── */}
        <section
          id="solutions"
          className="scroll-mt-24 border-t-2 border-[var(--border)] py-20"
        >
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--pink)]">
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
              seven proposed solutions
            </div>
          </div>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
            {forClient(
              "Here's where we'd start with {C}. Each solution can stand alone or combine into a single AI-powered platform — we'd finalize the exact scope on a call.",
            )}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {proposedSolutions.map((sol, i) => {
              const isPink = i % 2 === 0;
              return (
                <article
                  key={sol.title}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                  className={`group relative overflow-hidden border-2 border-[var(--border)] bg-[var(--paper)] p-6 transition-colors duration-300 hover:border-[var(--pink)] ${
                    i === proposedSolutions.length - 1 ? "md:col-span-2" : ""
                  }`}
                >
                  <Halftone color={isPink ? "var(--pink)" : "var(--blue)"} size={12} opacity={0.08} />
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span
                        style={{ fontFamily: "var(--font-display)" }}
                        className="text-4xl leading-none text-[var(--ink-ghost)] transition-colors duration-300 group-hover:text-[var(--pink)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="h-px flex-1"
                        style={{ background: isPink ? "var(--pink)" : "var(--blue)" }}
                      />
                    </div>
                    <h3
                      style={{ fontFamily: "var(--font-display)" }}
                      className="mt-3 text-2xl uppercase leading-tight transition-colors duration-300 group-hover:text-[var(--blue)]"
                    >
                      {sol.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {forClient(sol.body)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── process timeline ── */}
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

        {/* ── why choose us ── */}
        <section
          id="why"
          className="scroll-mt-24 border-t-2 border-[var(--border)] py-20"
        >
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--pink)]">
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
          <div className="relative overflow-hidden border-2 border-[var(--border)] bg-[var(--paper)] p-8 sm:p-10">
            <Halftone color="var(--ink)" size={10} opacity={0.08} />
            <div className="relative grid gap-4 sm:grid-cols-2">
              {whyChooseUs.map((reason, i) => (
                <div
                  key={reason}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-0.5 shrink-0 text-lg leading-none"
                    style={{ color: i % 2 ? "var(--blue)" : "var(--pink)" }}
                  >
                    ✦
                  </span>
                  <span className="text-sm font-bold leading-snug text-[var(--ink)]">
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── technology stack ── */}
        <section
          id="stack"
          className="scroll-mt-24 border-t-2 border-[var(--border)] py-20"
        >
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
                what we build on
              </div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-2 text-5xl uppercase"
              >
                Technology Stack
              </h2>
            </div>
            <div className="hidden text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:block">
              production-grade, not experimental
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {techStackCategorized.map((group, i) => (
              <div
                key={group.category}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                className="group border-2 border-[var(--border)] bg-[var(--paper)] p-6 transition-colors duration-300 hover:border-[var(--pink)]"
              >
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--blue)] transition-colors duration-300 group-hover:text-[var(--pink)]">
                  <span>{group.category}</span>
                  <span className="h-px flex-1 bg-[var(--ink-trace)] transition-colors duration-300 group-hover:bg-[var(--pink)]/40" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="border border-[var(--border-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:border-[var(--pink)]/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── our commitment ── */}
        <section className="border-t-2 border-[var(--border)] py-20">
          <div className="relative overflow-hidden border-2 border-[var(--border)] bg-[var(--paper)] p-8 sm:p-12">
            <Halftone color="var(--ink)" size={10} opacity={0.08} />
            <div className="relative mx-auto max-w-2xl text-center">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--pink)]">
                Our Commitment
              </div>
              <p className="mt-6 text-base font-bold leading-relaxed text-[var(--ink)]">
                {forClient(commitment.body)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                {forClient(commitment.closing)}
              </p>
            </div>
          </div>
        </section>

        {/* ── contact / CTA ── */}
        <section
          id="contact"
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

function Footer({ clientName }: { clientName: string }) {
  return (
    <footer className="border-t-2 border-[var(--border)] bg-[var(--paper)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:px-10 md:grid-cols-3">
        <div>
          <div style={{ fontFamily: "var(--font-display)" }} className="text-xl uppercase">
            {studio.wordmark}
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">
            AI · Machine Learning · Cloud · Enterprise Software · Digital Transformation
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
