"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  HardHat,
  Landmark,
  Leaf,
  MoreHorizontal,
} from "lucide-react";

const CARD_PATH =
  "M 0.07,0 L 0.94,0 Q 1,0 0.98937,0.05906 L 0.83063,0.94095 Q 0.82,1 0.76,1 L 0.06,1 Q 0,1 0,0.94 L 0,0.06 Q 0,0 0.06,0 Z";

const certifications = [

  {
    icon: Award,
    label: "COFEPRIS",
    subtitle: "Riesgos Sanitarios",
    description:
      "Certifica nuestro compromiso con la calidad y protección contra riesgos sanitarios.",
    accent: "#d4af37",
    leftTitleWhite: "Certificaciones que respaldan",
    leftTitleOrange: "nuestro compromiso con la salud.",
    leftDescription:
      "Contamos con certificaciones nacionales e internacionales que garantizan el cumplimiento de los más altos estándares de calidad, seguridad y cumplimiento en cada proceso.",
  },
  {
    icon: Leaf,
    label: "IMSS",
    subtitle: "Seguro Social",
    description: "Comprometidos con la protección y el uso responsable de los recursos.",
    accent: "#22c55e",
    leftTitleWhite: "Seguro Social",
    leftTitleOrange: "responsable y certificada.",
    leftDescription:
      "Operamos bajo prácticas que son respaldadas por el Seguro Social.",
  },
  {
    icon: HardHat,
    label: "ISO 45001:2018",
    subtitle: "Seguridad y Salud en el Trabajo",
    description: "Garantizamos ambientes laborales seguros y saludables para nuestro equipo.",
    accent: "#ef4444",
    leftTitleWhite: "Seguridad laboral",
    leftTitleOrange: "certificada internacionalmente.",
    leftDescription:
      "Protegemos a nuestro equipo con procesos y ambientes de trabajo seguros y saludables.",
  },
];

export default function Certifications() {
  const [active, setActive] = useState(1);
  const activeCert = certifications[active];

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + certifications.length) % certifications.length);

  return (
    <section
      id="calidad"
      className="mx-6 mb-16 grid grid-cols-1 gap-10 sm:mx-10 lg:mx-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-6"
    >
      {/* left card: pinned while this section scrolls past, content swaps with the active certification */}
      <motion.div
        className="lg:sticky lg:top-24"
        initial={{ opacity: 0, x: -70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* mobile: plain rounded card — the skewed trapezoid clip-path only reads
            right on a wide/short box; on a narrow/tall mobile box it distorts and
            leaves unclipped gaps (white background showing through). */}
        <div className="relative flex min-h-[420px] flex-col justify-center gap-6 rounded-2xl bg-gradient-to-b from-zinc-900 to-black px-6 py-10 ring-2 ring-brand-orange lg:hidden">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-8 bg-brand-orange" />
            <span className="text-xs font-semibold tracking-widest text-zinc-300">
              NUESTROS CELLOS
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-3xl font-extrabold leading-tight text-white">
                {activeCert.leftTitleWhite}{" "}
                <span className="text-brand-orange">{activeCert.leftTitleOrange}</span>
              </h2>

              <p className="text-base leading-relaxed text-zinc-400">
                {activeCert.leftDescription}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#certificados"
              className="flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Ver certificados
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#nosotros"
              className="flex items-center gap-2 rounded-full border border-zinc-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Conocer más
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* desktop: original diagonal-cut trapezoid */}
        <div className="relative hidden h-[460px] max-w-[590px] lg:block">
          <svg
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <path d={CARD_PATH} fill="#0a0a0a" />
            <path d={CARD_PATH} fill="none" stroke="var(--brand-orange)" strokeWidth="0.005" />
          </svg>

          <div
            className="relative flex h-full flex-col justify-center gap-6 px-8 py-12 pr-14 sm:px-12 sm:pr-16 lg:pr-20 lg:py-16"
            style={{
              clipPath:
                "polygon(0 0, 94% 0, 89.937% 5.906%, 83.063% 94.095%, 82% 100%, 0 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 bg-brand-orange" />
              <span className="text-xs font-semibold tracking-widest text-zinc-300">
                NUESTROS CELLOS
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-6"
              >
                <h2 className="max-w-md text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  {activeCert.leftTitleWhite}{" "}
                  <span className="text-brand-orange">{activeCert.leftTitleOrange}</span>
                </h2>

                <p className="max-w-md text-base leading-relaxed text-zinc-400">
                  {activeCert.leftDescription}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#certificados"
                className="flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Ver certificados
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#nosotros"
                className="flex items-center gap-2 rounded-full border border-zinc-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                Conocer más
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* right: certificate carousel, active one centered + enlarged */}
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, x: 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex h-[460px] w-full items-center justify-center overflow-hidden">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Certificado anterior"
            className="absolute left-2 z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange text-white transition-opacity hover:opacity-90 sm:left-1/2 sm:-translate-x-[190px]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <motion.div
            className="relative h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
            style={{ perspective: 1400, willChange: "transform" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
          >
            {certifications.map((cert, i) => {
              const offset = i - active;
              const distance = Math.abs(offset);
              const Icon = cert.icon;

              return (
                <motion.div
                  key={cert.label}
                  className={`absolute top-1/2 left-1/2 w-[240px] sm:w-[280px] ${
                    distance === 0 ? "" : "cursor-pointer"
                  }`}
                  style={{ zIndex: certifications.length - distance }}
                  onClick={() => distance !== 0 && setActive(i)}
                  animate={{
                    x: `calc(-50% + ${offset * 150}px)`,
                    y: "-50%",
                    rotateY: distance === 0 ? 0 : offset > 0 ? -28 : 28,
                    scale: distance === 0 ? 1 : 0.82,
                    opacity: distance > 2 ? 0 : distance === 0 ? 1 : 0.45,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                >
                  <div
                    className={`relative flex h-[360px] flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-zinc-900 to-black p-5 ${
                      distance === 0 ? "ring-1 ring-brand-orange/60" : ""
                    }`}
                    style={{ borderColor: `${cert.accent}55` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                        <Icon className="h-3.5 w-3.5" style={{ color: cert.accent }} />
                        {cert.label}
                      </div>
                      {distance === 0 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur">
                          <MoreHorizontal className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    {distance === 0 ? (
                      <div className="mt-3 flex flex-1 flex-col items-center gap-2 text-center">
                        <h3 className="text-base font-bold" style={{ color: cert.accent }}>
                          {cert.label}
                        </h3>
                        <p className="text-xs font-medium text-zinc-300">{cert.subtitle}</p>
                        <p className="line-clamp-2 text-[11px] leading-snug text-zinc-400">
                          {cert.description}
                        </p>

                        <div
                          className="mt-auto flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 text-center"
                          style={{ borderColor: cert.accent }}
                        >
                          <Icon className="h-4 w-4" style={{ color: cert.accent }} />
                          <span className="mt-0.5 text-[7px] font-bold" style={{ color: cert.accent }}>
                            CERTIFICADO
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 flex flex-1 flex-col items-center justify-center gap-2 text-center">
                        <Icon className="h-8 w-8" style={{ color: cert.accent }} />
                        <p className="text-xs font-semibold text-white">{cert.label}</p>
                        <p className="text-[11px] text-zinc-400">{cert.subtitle}</p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold text-brand-orange"
                    >
                      Ver más
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Siguiente certificado"
            className="absolute right-2 z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange text-white transition-opacity hover:opacity-90 sm:right-auto sm:left-1/2 sm:translate-x-[190px]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {certifications.map((cert, i) => (
            <button
              key={cert.label}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ir a ${cert.label}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-brand-orange" : "w-2 bg-zinc-600"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
