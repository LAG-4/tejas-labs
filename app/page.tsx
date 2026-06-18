"use client";

import { useEffect, useRef } from "react";
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

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const PAPER = "#f6f1e7";
const PINK = "#ff2d6f";
const BLUE = "#1b3cff";
const INK = "#111111";

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
      <span className="relative z-10 text-[#111]">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 z-20 text-[#ff2d6f]"
        style={{ transform: "translate(-6px, 3px)", mixBlendMode: "multiply" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 z-30 text-[#1b3cff]"
        style={{ transform: "translate(6px, -3px)", mixBlendMode: "multiply" }}
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
      className={`${display.variable} ${body.variable} min-h-screen text-[#111]`}
      style={{ background: PAPER, fontFamily: "var(--font-body)" }}
    >
      {/* press progress as a registration bar */}
      <div className="fixed left-0 top-0 z-50 flex h-2 w-full">
        <div className="h-full bg-[#ff2d6f]" style={{ width: `${progress * 100}%` }} />
        <div className="h-full flex-1 bg-[#1b3cff]/15" />
      </div>

      {/* cursor spotlight — follows the mouse, tinted disk that fades on idle */}
      {!reduced && <MouseSpotlight />}

      <Nav />

      {/* tech stack marquee */}
      <div className="marquee-wrap overflow-hidden border-y border-black/15 bg-[#111] py-3 text-[#f6f1e7]">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap" style={{ ["--marquee-duration" as string]: "44s" }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8 text-xs font-bold uppercase tracking-[0.25em]">
              {techStack.map((t, i) => (
                <span key={i} className="flex items-center gap-8">
                  {t} <span className="text-[#ff2d6f]">✦</span>
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
            <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#1b3cff]">
              <span className="h-2 w-2 rounded-full bg-[#ff2d6f]" />
              <span className="h-2 w-2 rounded-full bg-[#1b3cff]" />
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
            <p className="mt-8 max-w-md text-base leading-relaxed text-black/70">
              {studio.blurb}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 border-2 border-black bg-[#f6f1e7] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
              <span className="text-[#ff2d6f]">★</span>
              {studio.trust}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-[#111] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f6f1e7] transition hover:bg-[#ff2d6f]"
              >
                {studio.cta} ▸
              </a>
              <a
                href="#work"
                className="border-2 border-black px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-black hover:text-[#f6f1e7]"
              >
                See shipped work
              </a>
            </div>
          </div>

          {/* poster block */}
          <div className="relative lg:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden border-2 border-black bg-[#f6f1e7]">
              <Halftone color={INK} size={9} opacity={0.12} />
              <div className="absolute inset-0 p-5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span>{studio.wordmark}</span>
                  <span>EST. {studio.founded}</span>
                </div>
                <div className="mt-5 flex h-2 w-full overflow-hidden border border-black/40">
                  <div className="flex-1 bg-[#ff2d6f]" />
                  <div className="flex-1 bg-[#1b3cff]" />
                  <div className="flex-1 bg-[#111]" />
                  <div className="flex-1 bg-[#f6f1e7]" />
                </div>
                <div className="relative mt-8 flex h-[55%] flex-col items-center justify-center">
                  <div
                    className="relative h-36 w-36 transition-transform duration-200 ease-out"
                    style={{
                      transform: `translate(${reduced ? 0 : mouse.x * 14}px, ${reduced ? 0 : mouse.y * 14}px)`,
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-black" />
                    <div className="absolute inset-3 rounded-full border border-black/60" />
                    <div className="absolute inset-6 rounded-full border border-[#ff2d6f]" />
                    <div className="absolute inset-9 rounded-full border border-[#1b3cff]" />
                    <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-black" />
                    <div className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-black" />
                    <div className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-black" />
                    <div className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-black" />
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111]" />
                  </div>
                  <div className="mt-6 text-center">
                    <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/50">
                      specimen · no. 01
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-black/70">
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
        <section className="grid grid-cols-2 gap-px border-2 border-black bg-black lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-cell group bg-[#f6f1e7] p-6 transition-colors duration-300 hover:bg-[#111]"
            >
              <div
                style={{ fontFamily: "var(--font-display)" }}
                className="text-5xl text-[#1b3cff] transition-colors duration-300 group-hover:text-[#ff2d6f]"
              >
                {s.value}
              </div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-black/60 transition-colors duration-300 group-hover:text-[#f6f1e7]/70">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        {/* THE STACKING PRESS — shipped work */}
        <section id="work" className="scroll-mt-24 py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2d6f]">shipped work</div>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">Selected prints</h2>
            </div>
            <div className="hidden text-[10px] font-bold uppercase tracking-widest text-black/40 sm:block">
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
                  className="press-sheet sticky overflow-hidden border-2 border-black bg-[#f6f1e7] shadow-[8px_8px_0_0_#111]"
                >
                  <Halftone color={isPink ? PINK : BLUE} size={12} opacity={0.1} />
                  <div className="relative grid gap-6 p-6 sm:p-10 md:grid-cols-12">
                    <div className="md:col-span-2">
                      <div style={{ fontFamily: "var(--font-display)" }} className="text-6xl leading-none text-black/15">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-black/50">
                        {p.year}
                      </div>
                    </div>
                    <div className="md:col-span-6">
                      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: isPink ? PINK : BLUE }}>
                        {p.discipline}
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)" }} className="mt-1 text-4xl uppercase leading-none sm:text-5xl">
                        {p.name}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-black/70">
                        {p.blurb}
                      </p>
                    </div>
                    <div className="md:col-span-4">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">results</div>
                      <ul className="mt-3 space-y-2">
                        {p.metrics.map((m) => (
                          <li key={m} className="flex items-center gap-2 text-sm font-bold">
                            <span className="h-2.5 w-2.5" style={{ background: isPink ? PINK : BLUE }} />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* capabilities */}
        <section id="services" className="scroll-mt-24 border-t-2 border-black py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#1b3cff]">what we deliver</div>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">Contents</h2>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">five disciplines</div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <div
                key={s.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                className={`group relative overflow-hidden border-2 border-black p-6 transition-colors duration-300 hover:border-[#ff2d6f] hover:bg-[#ff2d6f]/[0.06] ${i === services.length - 1 ? "md:col-span-2" : ""}`}
              >
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#1b3cff] transition-colors duration-300 group-hover:text-[#ff2d6f]">
                  <span>{s.n}</span>
                  <span className="h-px flex-1 bg-black/20 transition-colors duration-300 group-hover:bg-[#ff2d6f]/40" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)" }} className="mt-4 text-2xl uppercase transition-colors duration-300 group-hover:text-[#1b3cff]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70">{s.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="border border-black/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 group-hover:border-black/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* process */}
        <section id="process" className="scroll-mt-24 border-t-2 border-black py-20">
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2d6f]">how we work</div>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">Four passes</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => {
              const colors = [INK, PINK, BLUE, INK];
              return (
                <div
                  key={p.step}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                  className="group relative border-2 border-black p-6 transition-colors duration-300 hover:border-[#1b3cff] hover:bg-[#1b3cff]/[0.06]"
                >
                  <div className="absolute right-4 top-4 h-6 w-6 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-150" style={{ background: colors[i] }} />
                  <div className="text-[10px] font-bold uppercase tracking-widest text-black/50">pass {i + 1}</div>
                  <h3 style={{ fontFamily: "var(--font-display)" }} className="mt-4 text-2xl uppercase transition-colors duration-300 group-hover:text-[#ff2d6f]">{p.step}</h3>
                  <p className="mt-2 text-sm font-bold leading-snug">{p.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-black/60">{p.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* team */}
        <section id="team" className="scroll-mt-24 border-t-2 border-black py-20">
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#1b3cff]">masthead</div>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">The studio</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {team.map((t, i) => (
              <div
                key={t.name}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                className="team-card group relative flex flex-col overflow-hidden border-2 border-black transition-colors duration-300 hover:border-[#ff2d6f]"
              >
                {t.img && (
                  <div className="aspect-[4/5] w-full overflow-hidden bg-[#eee5d3]">
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
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#ff2d6f]">{t.role}</div>
                  <p className="mt-3 text-sm leading-relaxed text-black/70">{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* testimonials */}
        <section className="border-t-2 border-black py-20">
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#1b3cff]">blurbs</div>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">From the clients</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                className="group border-2 border-black bg-[#f6f1e7] p-6 transition-colors duration-300 hover:border-[#ff2d6f]"
              >
                <div className="text-4xl leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" style={{ color: i % 2 ? BLUE : PINK }}>“</div>
                <blockquote style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-lg uppercase leading-tight">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-[10px] font-bold uppercase tracking-widest text-black/50">
                  {t.name} · {t.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t-2 border-black py-20">
          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2d6f]">fine print</div>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-5xl uppercase">Questions</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f, i) => (
              <details key={f.q} data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }} className="group border-2 border-black bg-[#f6f1e7] p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span style={{ fontFamily: "var(--font-display)" }} className="text-lg uppercase">{f.q}</span>
                  <span className="text-2xl text-[#1b3cff] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="scroll-mt-24 border-t-2 border-black py-20">
          <div className="relative overflow-hidden border-2 border-black bg-[#111] p-8 text-[#f6f1e7] sm:p-12">
            <Halftone color={PAPER} size={9} opacity={0.06} />
            <div className="relative grid gap-8 lg:grid-cols-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff2d6f]">{studio.cta}</div>
                <h2 style={{ fontFamily: "var(--font-display)" }} className="mt-3 text-5xl uppercase leading-none">
                  Hand us the <span className="text-[#ff2d6f]">brief.</span>
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                  Tell us what you’re trying to automate. We’ll come back with a
                  fixed scope, a price, and the audit, cost, and latency targets
                  we’ll hit — usually within two working days.
                </p>
                <div className="mt-6 text-[10px] font-bold uppercase tracking-widest text-white/50">
                  {studio.location} · {studio.wordmark}
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <a href={`mailto:${studio.email}`} className="group flex items-center justify-between border-2 border-white px-5 py-4 text-sm font-bold uppercase tracking-widest transition hover:bg-[#ff2d6f] hover:text-[#111]">
                  {studio.email} <span>▸</span>
                </a>
                <a href={studio.upwork} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-2 border-white/30 px-5 py-4 text-sm font-bold uppercase tracking-widest text-white/70 transition hover:border-white hover:text-white">
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

function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b-2 border-black bg-[#f6f1e7]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" style={{ fontFamily: "var(--font-display)" }} className="text-sm uppercase tracking-[0.2em] hover:text-[#ff2d6f]">
          {studio.wordmark}
        </a>
        <div className="hidden gap-6 text-[10px] font-bold uppercase tracking-widest sm:flex">
          <a href="#services" className="hover:text-[#1b3cff]">services</a>
          <a href="#work" className="hover:text-[#1b3cff]">work</a>
          <a href="#process" className="hover:text-[#1b3cff]">process</a>
          <a href="#team" className="hover:text-[#1b3cff]">team</a>
          <a href="#contact" className="hover:text-[#1b3cff]">contact</a>
        </div>
        <a href="#contact" className="bg-[#111] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#f6f1e7] transition hover:bg-[#ff2d6f]">
          {studio.cta}
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer id="top" className="border-t-2 border-black bg-[#f6f1e7]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:px-10 md:grid-cols-3">
        <div>
          <div style={{ fontFamily: "var(--font-display)" }} className="text-xl uppercase">{studio.wordmark}</div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-black/60">{studio.tagline}</p>
        </div>
        <div className="text-sm">
          <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">Get in touch</div>
          <a href={`mailto:${studio.email}`} className="mt-2 block font-bold hover:text-[#ff2d6f]">{studio.email}</a>
          <a href={studio.upwork} target="_blank" rel="noopener noreferrer" className="mt-1 block text-black/60 hover:text-[#1b3cff]">Upwork →</a>
          <div className="mt-2 text-black/50">{studio.location}</div>
        </div>
        <div className="text-sm">
          <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">Navigate</div>
          <div className="mt-2 flex flex-col gap-1 text-black/60">
            <a href="#services" className="hover:text-[#1b3cff]">Services</a>
            <a href="#work" className="hover:text-[#1b3cff]">Work</a>
            <a href="#process" className="hover:text-[#1b3cff]">Process</a>
            <a href="#team" className="hover:text-[#1b3cff]">Team</a>
            <a href="#contact" className="hover:text-[#1b3cff]">Contact</a>
          </div>
        </div>
      </div>
      <div className="border-t border-black/10 px-6 py-6 text-center text-[10px] font-bold uppercase tracking-widest text-black/40 sm:px-10">
        © {new Date().getFullYear()} {studio.name} · {studio.trust}
      </div>
    </footer>
  );
}
