"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "tejas-theme";

function getThemeSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(onChange: () => void) {
  // The inline script in layout.tsx may set data-theme before React hydrates,
  // so a MutationObserver catches that and any later toggles.
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === "data-theme") {
        onChange();
        return;
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  // Cross-tab sync: another tab toggling the theme should update us too.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage may be unavailable (private mode, quota); ignore.
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = useCallback(() => {
    const next: Theme = isDark ? "light" : "dark";
    applyTheme(next);
  }, [isDark]);

  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
      className={`group relative inline-flex h-9 w-9 items-center justify-center border-2 border-[var(--border)] bg-[var(--paper)] text-[var(--ink)] transition-all duration-200 hover:bg-[var(--ink)] hover:text-[var(--paper)] active:translate-y-[1px] ${className}`}
    >
      <span aria-hidden className="relative block h-4 w-4">
        <svg
          key={isDark ? "moon" : "sun"}
          viewBox="0 0 24 24"
          className="theme-icon absolute inset-0 m-auto h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isDark ? (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.9 4.9 1.4 1.4" />
              <path d="m17.7 17.7 1.4 1.4" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m4.9 19.1 1.4-1.4" />
              <path d="m17.7 6.3 1.4-1.4" />
            </>
          )}
        </svg>
      </span>
    </button>
  );
}
