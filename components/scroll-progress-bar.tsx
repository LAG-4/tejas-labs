"use client";

import { useScrollProgress } from "@/lib/hooks";

/** Isolated scroll-progress bar. Owns the high-frequency progress
 *  state so the page tree doesn't re-render on every scroll frame. */
export function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="fixed left-0 top-0 z-50 flex h-2 w-full">
      <div className="h-full bg-[var(--pink)]" style={{ width: `${progress * 100}%` }} />
      <div className="h-full flex-1 bg-[var(--blue)]/15" />
    </div>
  );
}
