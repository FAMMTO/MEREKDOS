"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Gamepad2, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const links = [
  { label: "Inicio", href: "#inicio", active: true },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Calidad", href: "#calidad" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const { dark, toggleDark } = useTheme();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  // checkpoint only moves when direction actually flips (not every scroll tick) —
  // comparing frame-to-frame deltas was noisy on slow scrolls, flickering hidden
  // state back and forth as tiny diffs wobbled above/below the threshold.
  const checkpoint = useRef(0);

  useMotionValueEvent(scrollY, "change", (raw) => {
    // clamp: elastic overscroll (rubber-band bounce at the very top/bottom on
    // mobile) reports oscillating/negative values past the real scroll range —
    // feeding those straight into the checkpoint math is what caused the
    // stutter once scroll hit its max/min.
    const y = Math.max(0, raw);
    if (y < 120) {
      if (hidden) setHidden(false);
      checkpoint.current = y;
      return;
    }
    if (y - checkpoint.current > 60) {
      setHidden(true);
      checkpoint.current = y;
    } else if (checkpoint.current - y > 40) {
      setHidden(false);
      checkpoint.current = y;
    }
  });

  return (
    <motion.div
      className="sticky top-0 z-50 mx-0 mb-6 sm:mx-10 lg:mx-16"
      style={{ willChange: "transform" }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <header
        className="flex w-full items-center justify-between border border-zinc-200/70 bg-white/95 px-6 py-3 shadow-[0_8px_30px_-8px_rgba(60,129,231,0.25)] transition-colors sm:bg-white/80 sm:px-8 sm:backdrop-blur-md md:rounded-2xl dark:border-zinc-800/70 dark:bg-zinc-900/95 dark:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.5)] sm:dark:bg-zinc-900/80"
      >
        <a href="#inicio" className="flex items-center">
          <Image
            src="/merek-logo.png"
            alt="Merek Comercializadora"
            width={140}
            height={140}
            className="h-23 w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-1 rounded-full bg-zinc-100/70 p-1 md:flex dark:bg-zinc-800/70">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                link.active
                  ? "bg-white text-brand-orange shadow-sm dark:bg-zinc-900"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Modo juego"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/70 text-zinc-600 transition-colors hover:border-brand-orange hover:text-brand-orange dark:border-zinc-700 dark:text-zinc-300"
          >
            <Gamepad2 className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={toggleDark}
            aria-label="Modo oscuro"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/70 text-zinc-600 transition-colors hover:border-brand-orange hover:text-brand-orange dark:border-zinc-700 dark:text-zinc-300"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <a
            href="#contacto"
            className="flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md"
          >
            Contáctanos
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-b-2xl bg-zinc-950 px-4 pt-4 pb-3 md:hidden">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`border-b-2 pb-1 text-sm font-medium transition-colors ${
              link.active
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.div>
  );
}
