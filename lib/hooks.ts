"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/** IntersectionObserver-based reveal. Returns a ref to attach. */
export function useInView<T extends Element = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  once = true,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) obs.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);

  return { ref, inView };
}

/** Returns 0..1 progress of the whole document scroll. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? h.scrollTop / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return progress;
}

/** Returns the live pointer position, normalised -0.5..0.5 on each axis. */
export function useMouseParallax(strength = 1) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      raf = requestAnimationFrame(() => {
        setPos({
          x: (e.clientX / window.innerWidth - 0.5) * strength,
          y: (e.clientY / window.innerHeight - 0.5) * strength,
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return pos;
}

/**
 * Tracks an element's progress as it passes through the viewport.
 * 0 = element top at viewport bottom, 1 = element bottom at viewport top.
 */
export function useElementProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const distance = vh + rect.height;
      const traveled = vh - rect.top;
      setProgress(Math.min(1, Math.max(0, traveled / distance)));
    };
    const onScroll = () => {
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}

export function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handler = () => onChange();
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Auto-applies .is-visible to [data-reveal] nodes as they enter the viewport. */
export function useAutoReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not(.is-visible), [data-reveal-x]:not(.is-visible), [data-reveal-scale]:not(.is-visible)",
      ),
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);
}
