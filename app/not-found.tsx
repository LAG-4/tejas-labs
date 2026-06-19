import type { Metadata } from "next";
import Link from "next/link";
import { studio } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Page not found · Tejas Labs",
  description: "The page you're looking for doesn't exist. Head back to the homepage.",
  robots: { index: false },
};

const SECTIONS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <div
      className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10 sm:px-10"
      style={{ background: "var(--bg)" }}
    >
      <Link
        href="/"
        style={{ fontFamily: "var(--font-display)" }}
        className="text-sm uppercase tracking-[0.2em] hover:text-[var(--pink)]"
      >
        {studio.wordmark}
      </Link>

      <div className="my-auto py-16">
        <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--blue)]">
          <span className="h-2 w-2 rounded-full bg-[var(--pink)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--blue)]" />
          error 404 · page not found
        </div>

        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="text-[clamp(3rem,10vw,6rem)] uppercase leading-[0.86] tracking-tight"
        >
          Page
          <br />
          not
          <br />
          <span className="text-[var(--pink)]">found.</span>
        </h1>

        <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--ink-soft)]">
          The page you&apos;re looking for doesn&apos;t exist — it may have moved,
          been removed, or the URL might be incorrect. Head back to the
          homepage, or jump to a section below.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="bg-[var(--invert-bg)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--invert-text)] transition hover:bg-[var(--pink)] hover:text-[#111111]"
          >
            Back to homepage ▸
          </Link>
          <a
            href={`mailto:${studio.email}`}
            className="border-2 border-[var(--border)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-[var(--invert-bg)] hover:text-[var(--invert-text)]"
          >
            Let us know what you need
          </a>
        </div>
      </div>

      <nav aria-label="Site sections" className="border-t-2 border-[var(--border)] pt-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--ink-faint)]">
          Or jump to
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold uppercase tracking-widest">
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href} className="text-[var(--ink-soft)] hover:text-[var(--blue)]">
              {s.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
