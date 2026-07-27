"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextValue = {
  dark: boolean;
  toggleDark: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    // Chrome for Android's edge-swipe "go back" gesture (right-swipe from the
    // left edge, or left-swipe from the right edge) shows a blank white peek
    // when there's no previous page in history — that's not our CSS/page, it's
    // the browser's own navigation UI, so overscroll-behavior alone doesn't
    // stop it. Block it ourselves: if a touch starts within the edge zone,
    // preventDefault so Chrome never recognizes it as an edge-swipe.
    const EDGE = 24;
    const onTouchStart = (e: TouchEvent) => {
      const x = e.touches[0]?.clientX;
      if (x === undefined) return;
      if (x <= EDGE || x >= window.innerWidth - EDGE) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchstart", onTouchStart, { passive: false });
    return () => document.removeEventListener("touchstart", onTouchStart);
  }, []);

  const toggleDark = () => {
    setDark((v) => {
      const next = !v;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
