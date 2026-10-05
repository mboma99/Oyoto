"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

/* The theme lives on <html data-theme>, set before first paint by the inline
   script in the root layout (themeScript) so a saved dark choice never
   flashes light. This button flips it and remembers the choice. */

export const THEME_KEY = "oyoto-theme";

/** Runs in <head> before the page paints. */
export const themeScript = `try{if(localStorage.getItem("${THEME_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.dataset.theme === "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const toggle = () => {
    const next = !dark;
    if (next) document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // private mode or blocked storage: the switch still works for this visit
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
    >
      {dark ? <Sun size={18} weight="light" /> : <Moon size={18} weight="light" />}
    </button>
  );
}
