"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

type NavLink = { href: string; label: string };

/** Sticky top nav with a mobile hamburger menu.
 *  Solid background (no `backdrop-blur`) to keep mobile scrolling
 *  smooth — backdrop blur on a sticky element repaints on every
 *  scroll frame and is the most common cause of "stuck" mobile UIs. */
export function SiteNav({
  links,
  wordmark,
  subtitle,
  ctaHref,
  ctaLabel = "Get a free quote",
}: {
  links: NavLink[];
  wordmark: string;
  subtitle?: string;
  ctaHref: string;
  ctaLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b-2 border-[var(--border)] bg-[var(--paper)]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-10 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              style={{ fontFamily: "var(--font-display)" }}
              className="text-sm uppercase tracking-[0.2em] hover:text-[var(--pink)]"
            >
              {wordmark}
            </Link>
            {subtitle && (
              <span className="hidden truncate text-[10px] font-bold uppercase tracking-widest text-[var(--ink-mute)] sm:inline">
                · {subtitle}
              </span>
            )}
          </div>

          <div className="hidden gap-6 text-[10px] font-bold uppercase tracking-widest sm:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[var(--blue)]">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <a
              href={ctaHref}
              className="hidden bg-[var(--invert-bg)] px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[var(--invert-text)] transition hover:bg-[var(--pink)] hover:text-[#111111] sm:inline-block"
            >
              {ctaLabel}
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[var(--border)] bg-[var(--paper)] text-[var(--ink)] transition active:translate-y-[1px] sm:hidden"
            >
              <span aria-hidden className="relative block h-3 w-4">
                <span
                  className="absolute left-0 right-0 h-[2px] bg-current transition-all duration-200"
                  style={{
                    top: open ? "50%" : "2px",
                    transform: open ? "translateY(-50%) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="absolute left-0 right-0 h-[2px] bg-current transition-all duration-200"
                  style={{
                    top: open ? "50%" : "calc(100% - 2px)",
                    transform: open ? "translateY(-50%) rotate(-45deg)" : "none",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          id="site-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)] sm:hidden"
        >
          <div className="flex items-center justify-between border-b-2 border-[var(--border)] px-5 py-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-sm uppercase tracking-[0.2em]"
            >
              {wordmark}
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="relative inline-flex h-11 w-11 items-center justify-center border-2 border-[var(--border)] active:translate-y-[1px]"
            >
              <span aria-hidden className="text-2xl leading-none">×</span>
            </button>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ fontFamily: "var(--font-display)" }}
                className="border-b-2 border-[var(--border-soft)] py-5 text-3xl font-bold uppercase leading-none tracking-tight hover:text-[var(--pink)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-8 bg-[var(--invert-bg)] px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-[var(--invert-text)] transition hover:bg-[var(--pink)] hover:text-[#111111]"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
