"use client";

import { useMouseParallax, useReducedMotion } from "@/lib/hooks";

/** Concentric registration mark that drifts with the cursor.
 *  Owns the mouse-parallax state locally so the surrounding page
 *  doesn't re-render on every pointer move. */
export function ParallaxRegistrationMark({ strength = 14 }: { strength?: number }) {
  const mouse = useMouseParallax(1);
  const reduced = useReducedMotion();
  return (
    <div
      className="relative h-36 w-36 transition-transform duration-200 ease-out"
      style={{
        transform: `translate(${reduced ? 0 : mouse.x * strength}px, ${reduced ? 0 : mouse.y * strength}px)`,
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
  );
}
