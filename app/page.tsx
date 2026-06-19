"use client";

import { useEffect, useRef, useState } from "react";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import {
  faqs,
  projects,
  process,
  services,
  stats,
  studio,
  team,
  techStack,
  testimonials,
} from "@/lib/studio";
import { useAutoReveal, useMouseParallax, useReducedMotion, useScrollProgress } from "@/lib/hooks";
import { ThemeToggle } from "@/components/theme-toggle";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });

function Halftone({ color, size = 10, opacity = 0.5 }: { color: string; size?: number; opacity?: number }) {
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

/** Overprint headline: pink + blue layers offset, multiplied on paper. */
function Overprint({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

/** Soft tinted disk that trails the cursor; fades out when the mouse is idle. */
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
      idleTimer = window.setTimeout(() => el.classList.remove("is-active"), 1400);
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

export default function Home() {
  useAutoReveal();
  const progress = useScrollProgress();
  const mouse = useMouseParallax(1);
  const reduced = useReducedMotion();

  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen text-[var(--ink)]`}
      style={{ background: "var(--bg)", fontFamily: "var(--font-body)" }}
    >
      {/* press progress as a registration bar */}
      <div className="fixed left-0 top-0 z-50 flex h-2 w-full">
        <div className="h-full bg-[var(--pink)]" style={{ width: `${progress * 100}%` }} />
        <div className="h-full flex-1 bg-[var(--blue)]/15" />
      </div>

      {/* cursor spotlight — follows the mouse, tinted disk that fades on idle */}
      {!reduced && <MouseSpotlight />}

      <Nav />

      {/* tech stack marquee */}
      <div className="marquee-wrap overflow-hidden border-y border-[var(--ink-trace)] bg-[var(--invert-bg)] py-3 text-[var(--invert-text)]">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap" style={{ ["--marquee-duration" as string]: "44s" }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8 text-xs font-bold uppercase tracking-[0.25em]">
              {techStack.map((t, i) => (
                <span key={i} className="flex items-center gap-8">
                  {t} <span className="text-[var(--pink)]">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <main className="relative mx-auto max-w-6xl px-6 pb-32 sm:px-10">
        {/* hero poster */}
        <section className="relative grid gap-10 py-14 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-8">
            <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
              <span className="h-2 w-2 rounded-full bg-[var(--pink)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--blue)]" />
              {studio.name} · AI automation studio
            </div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-[clamp(2.4rem,7vw,5.5rem)] uppercase leading-[0.86] tracking-tight"
            >
              We ship AI that
              <br />
              survives
              <br />
              <Overprint>production.</Overprint>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--ink-soft)]">
              {studio.blurb}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 border-2 border-[var(--border)] bg-[var(--paper)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
              <span className="text-[var(--pink)]">★</span>
              {studio.trust}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-[var(--invert-bg)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--invert-text)] transition hover:bg-[var(--pink)] hover:text-[#111111]"
              >
                {studio.cta} ▸
              </a>
              <a
                href="#work"
                className="border-2 border-[var(--border)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-[var(--invert-bg)] hover:text-[var(--invert-text)]"
              >
                See shipped work
              </a>
            </div>
          </div>

          {/* poster block */}
          <div className="relative lg:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden border-2 border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]">
              <Halftone color="var(--ink)" size={9} opacity={0.12} />
              <div className="absolute inset-0 p-5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span>{studio.wordmark}</span>
                  <span>EST. {studio.founded}</span>
                </div>
                <div className="mt-5 flex h-2 w-full overflow-hidden border border-[var(--ink-mute)]">
                  <div className="flex-1 bg-[var(--pink)]" />
                  <div className="flex-1 bg-[var(--blue)]" />
                  <div className="flex-1 bg-[var(--ink)]" />
                  <div className="flex-1 bg-[var(--paper)]" />
                </div>
                <div className="relative mt-8 flex h-[55%] flex-col items-center justify-center">
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
                  <div className="mt-6 text-center">
                    <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--ink-mute)]">
                      specimen · no. 01
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-soft)]">
                      proof / approved
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-display)" }} className="absolute bottom-5 left-5 right-5 text-2xl uppercase leading-none">
                  RAG · Agents · Apps
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

        {/* THE STACKING PRESS — shipped work */}
        <section id="work" className="scroll-mt-24 py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--pink)]">shipped work</div>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">Selected prints</h2>
            </div>
            <div className="hidden text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:block">
              sheets stack as you scroll
            </div>
          </div>

          <div className="relative space-y-6">
            {projects.map((p, i) => {
              const rot = i % 2 === 0 ? -1.4 : 1.2;
              const isPink = i % 2 === 0;
              return (
                <article
                  key={p.name}
                  data-reveal
                  style={{
                    top: `${80 + i * 26}px`,
                    ["--rot" as string]: `${rot}deg`,
                    ["--reveal-delay" as string]: `${i * 60}ms`,
                  }}
                  className="press-sheet sticky overflow-hidden border-2 border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]"
                >
                  <Halftone color={isPink ? "var(--pink)" : "var(--blue)"} size={12} opacity={0.1} />
                  <div className="relative grid gap-6 p-6 sm:p-10 md:grid-cols-12">
                    <div className="md:col-span-2">
                      <div style={{ fontFamily: "var(--font-display)" }} className="text-6xl leading-none text-[var(--ink-ghost)]">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-mute)]">
                        {p.year}
                      </div>
                    </div>
                    <div className="md:col-span-6">
                      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: isPink ? "var(--pink)" : "var(--blue)" }}>
                        {p.discipline}
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)" }} className="mt-1 text-4xl uppercase leading-none sm:text-5xl">
                        {p.name}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--ink-soft)]">
                        {p.blurb}
                      </p>
                    </div>
                    <div className="md:col-span-4">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">results</div>
                      <ul className="mt-3 space-y-2">
                        {p.metrics.map((m) => (
                          <li key={m} className="flex items-center gap-2 text-sm font-bold">
                            <span className="h-2.5 w-2.5" style={{ background: isPink ? "var(--pink)" : "var(--blue)" }} />
                            {m}
                          </li>
                        ))}
                      </ul>
                      {p.links && p.links.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.links.map((l) => (
                            <a
                              key={l.url}
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ ["--link-hover" as string]: isPink ? "var(--pink)" : "var(--blue)" }}
                              className="inline-flex items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--paper)] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 hover:bg-[var(--link-hover)] hover:text-[var(--paper-text)]"
                            >
                              {l.label} <span aria-hidden>↗</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* capabilities */}
        <section id="services" className="scroll-mt-24 border-t-2 border-[var(--border)] py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">what we deliver</div>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">Contents</h2>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">five disciplines</div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <div
                key={s.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                className={`group relative overflow-hidden border-2 border-[var(--border)] p-6 transition-colors duration-300 hover:border-[var(--pink)] hover:bg-[var(--pink)]/[0.06] ${i === services.length - 1 ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--blue)] transition-colors duration-300 group-hover:text-[var(--pink)]">
                  <span>{s.n}</span>
                  <span className="h-px flex-1 bg-[var(--ink-trace)] transition-colors duration-300 group-hover:bg-[var(--pink)]/40" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)" }} className="mt-4 text-2xl uppercase transition-colors duration-300 group-hover:text-[var(--blue)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{s.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="border border-[var(--border-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:border-[var(--pink)]/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* process — animated live press run */}
        <section id="process" className="scroll-mt-24 border-t-2 border-[var(--border)] py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--pink)]">how we work</div>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">A press run</h2>
            </div>
            <div className="hidden text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:block">
              four passes · one shipped build
            </div>
          </div>
          <WorkflowCard />
        </section>

        {/* team */}
        <section id="team" className="scroll-mt-24 border-t-2 border-[var(--border)] py-20">
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">masthead</div>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">The studio</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {team.map((t, i) => (
              <div
                key={t.name}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                className="team-card group relative flex flex-col overflow-hidden border-2 border-[var(--border)] transition-colors duration-300 hover:border-[var(--pink)]"
              >
                {t.img && (
                  <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--paper-faint)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.img}
                      alt={t.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      style={{ filter: "contrast(1.05) saturate(0.9)" }}
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 style={{ fontFamily: "var(--font-display)" }} className="text-3xl uppercase">{t.name}</h3>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[var(--pink)]">{t.role}</div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* testimonials */}
        <section className="border-t-2 border-[var(--border)] py-20">
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">blurbs</div>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">From the clients</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="group border-2 border-[var(--border)] bg-[var(--paper)] p-6 transition-colors duration-300 hover:border-[var(--pink)]"
              >
                <div className="text-4xl leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" style={{ color: i % 2 ? "var(--blue)" : "var(--pink)" }}>“</div>
                <blockquote style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-lg uppercase leading-tight">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-mute)]">
                  {t.name} · {t.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t-2 border-[var(--border)] py-20">
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--pink)]">fine print</div>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">Questions</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f, i) => (
              <details key={f.q} data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }} className="group border-2 border-[var(--border)] bg-[var(--paper)] p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span style={{ fontFamily: "var(--font-display)" }} className="text-lg uppercase">{f.q}</span>
                  <span className="text-2xl text-[var(--blue)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="scroll-mt-24 border-t-2 border-[var(--border)] py-20">
          <div className="relative overflow-hidden border-2 border-[var(--invert-border)] bg-[var(--invert-bg)] p-8 text-[var(--invert-text)] sm:p-12">
            <Halftone color="var(--invert-text)" size={9} opacity={0.06} />
            <div className="relative grid gap-8 lg:grid-cols-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--pink)]">{studio.cta}</div>
                <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-3 text-5xl uppercase leading-none">
                  Hand us the <span className="text-[var(--pink)]">brief.</span>
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--invert-text-soft)]">
                  Tell us what you’re trying to automate. We’ll come back with a
                  fixed scope, a price, and the audit, cost, and latency targets
                  we’ll hit — usually within two working days.
                </p>
                <div className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[var(--invert-text-mute)]">
                  {studio.location} · {studio.wordmark}
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <a href={`mailto:${studio.email}`} className="group flex items-center justify-between border-2 border-[var(--invert-border)] px-5 py-4 text-sm font-bold uppercase tracking-widest transition hover:bg-[var(--pink)] hover:text-[#111111] hover:border-[var(--pink)]">
                  {studio.email} <span>▸</span>
                </a>
                <a href={studio.upwork} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-2 border-[var(--invert-border-soft)] px-5 py-4 text-sm font-bold uppercase tracking-widest text-[var(--invert-text-soft)] transition hover:border-[var(--invert-border)] hover:text-[var(--invert-text)]">
                  Message us on Upwork <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/** Animated "press run" — auto-cycles through the 4 process steps.
 *  A progress bar fills in lockstep with the active step, the step
 *  node scales/colors, and the detail block fades in on each change.
 *  Respects prefers-reduced-motion. */
const STEP_MS = 2600;

function WorkflowCard() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    if (paused) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % process.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const current = process[step];
  const NODE_COLORS = ["var(--ink)", "var(--pink)", "var(--blue)", "var(--ink)"];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ ["--workflow-step-ms" as string]: `${STEP_MS}ms` }}
      className="relative overflow-hidden border-2 border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]"
    >
      <Halftone color="var(--ink)" size={9} opacity={0.1} />
      <div className="relative p-6 sm:p-10">
        {/* header bar */}
        <div className="mb-8 flex items-center justify-between border-b border-[var(--ink-trace)] pb-4">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-soft)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--pink)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--pink)]" />
            </span>
            <span>live · workflow</span>
            <span className="text-[var(--ink-softest)]">·</span>
            <span className="text-[var(--ink-soft)]">pass {String(step + 1).padStart(2, "0")} of {String(process.length).padStart(2, "0")}</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">
            <span className="hidden sm:inline">{paused ? "paused · hover" : "auto · loop"}</span>
            <span className="font-mono text-[var(--ink-soft)]">{(step + 1).toString().padStart(2, "0")}/{process.length.toString().padStart(2, "0")}</span>
          </div>
        </div>

        {/* step nodes */}
        <div className="relative">
          <div className="pointer-events-none absolute left-3 right-3 top-3 h-px bg-[var(--ink-trace)]" />
          <div className="relative grid grid-cols-4 gap-2">
            {process.map((p, i) => {
              const isActive = i === step;
              const isPast = i < step;
              return (
                <button
                  key={p.step}
                  type="button"
                  onClick={() => setStep(i)}
                  className="group flex flex-col items-center focus:outline-none"
                >
                  <span
                    className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "scale-125 border-[var(--border)]"
                        : isPast
                          ? "border-[var(--border)]"
                          : "border-[var(--ink-softest)] group-hover:border-[var(--ink-soft)]"
                    }`}
                    style={{
                      background: isActive ? "var(--pink)" : isPast ? "var(--blue)" : "var(--paper)",
                      boxShadow: isActive ? "0 0 0 4px var(--pink-glow)" : undefined,
                    }}
                  >
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[var(--paper-text)]" />}
                  </span>
                  <span
                    className={`mt-3 text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 ${
                      isActive ? "text-[var(--ink)]" : isPast ? "text-[var(--ink-soft)]" : "text-[var(--ink-softest)] group-hover:text-[var(--ink-soft)]"
                    }`}
                  >
                    {p.step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* progress bar */}
        <div className="mt-6 h-1 w-full overflow-hidden bg-[var(--ink-ghost)]">
          <div key={step} className="workflow-bar h-full bg-[var(--pink)]" />
        </div>

        {/* step detail — keyed so each step re-mounts and fades in */}
        <div
          key={step}
          className="workflow-fade mt-10 grid gap-6 sm:grid-cols-12"
        >
          <div className="sm:col-span-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-mute)]">
              pass {String(step + 1).padStart(2, "0")}
            </div>
            <h3
              style={{ fontFamily: "var(--font-display)" }}
              className="mt-2 text-4xl uppercase leading-none sm:text-5xl"
            >
              {current.step}
            </h3>
            <div className="mt-3 inline-block bg-[var(--blue)] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--paper-text)]">
              {current.day}
            </div>
          </div>
          <div className="sm:col-span-6">
            <p className="text-base font-bold leading-snug text-[var(--ink)] sm:text-lg">
              {current.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
              {current.body}
            </p>
          </div>
          <div className="sm:col-span-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-mute)]">
              output
            </div>
            <div className="mt-1 text-sm font-bold uppercase tracking-widest text-[var(--pink)]">
              {current.output}
            </div>
            <div className="mt-5 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-mute)]">
              pass color
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: NODE_COLORS[step] }}
              />
              <span className="text-xs font-bold uppercase tracking-widest">
                {step === 0 ? "ink" : step === 1 ? "magenta" : step === 2 ? "cyan" : "ink"}
              </span>
            </div>
          </div>
        </div>

        {/* color proof strip */}
        <div className="mt-8 flex h-1.5 w-full overflow-hidden border border-[var(--ink-softest)]">
          <div className="flex-1 bg-[var(--pink)]" />
          <div className="flex-1 bg-[var(--blue)]" />
          <div className="flex-1 bg-[var(--ink)]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--ink-faint)]">
          <span>tejas labs · proof card</span>
          <span>j-001 · auto-tick</span>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b-2 border-[var(--border)] bg-[var(--paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <a href="#top" style={{ fontFamily: "var(--font-display)" }} className="text-sm uppercase tracking-[0.2em] hover:text-[var(--pink)]">
          {studio.wordmark}
        </a>
        <div className="hidden gap-6 text-[10px] font-bold uppercase tracking-widest sm:flex">
          <a href="#services" className="hover:text-[var(--blue)]">services</a>
          <a href="#work" className="hover:text-[var(--blue)]">work</a>
          <a href="#process" className="hover:text-[var(--blue)]">process</a>
          <a href="#team" className="hover:text-[var(--blue)]">team</a>
          <a href="#contact" className="hover:text-[var(--blue)]">contact</a>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a href="#contact" className="bg-[var(--invert-bg)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--invert-text)] transition hover:bg-[var(--pink)] hover:text-[#111111]">
            {studio.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer id="top" className="border-t-2 border-[var(--border)] bg-[var(--paper)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:px-10 md:grid-cols-3">
        <div>
          <div style={{ fontFamily: "var(--font-display)" }} className="text-xl uppercase">{studio.wordmark}</div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">{studio.tagline}</p>
        </div>
        <div className="text-sm">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Get in touch</div>
          <a href={`mailto:${studio.email}`} className="mt-2 block font-bold hover:text-[var(--pink)]">{studio.email}</a>
          <a href={studio.upwork} target="_blank" rel="noopener noreferrer" className="mt-1 block text-[var(--ink-soft)] hover:text-[var(--blue)]">Upwork →</a>
          <div className="mt-2 text-[var(--ink-mute)]">{studio.location}</div>
        </div>
        <div className="text-sm">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)]">Navigate</div>
          <div className="mt-2 flex flex-col gap-1 text-[var(--ink-soft)]">
            <a href="#services" className="hover:text-[var(--blue)]">Services</a>
            <a href="#work" className="hover:text-[var(--blue)]">Work</a>
            <a href="#process" className="hover:text-[var(--blue)]">Process</a>
            <a href="#team" className="hover:text-[var(--blue)]">Team</a>
            <a href="#contact" className="hover:text-[var(--blue)]">Contact</a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border-soft)] px-6 py-6 text-center text-[10px] font-bold uppercase tracking-widest text-[var(--ink-faint)] sm:px-10">
        © {new Date().getFullYear()} {studio.name} · {studio.trust}
      </div>
    </footer>
  );
}
