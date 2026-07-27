"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Headset,
  MoreHorizontal,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";

const CARD_PATH =
  "M 0.06,0 L 0.94,0 Q 1,0 0.98937,0.05906 L 0.83063,0.94095 Q 0.82,1 0.76,1 L 0.06,1 Q 0,1 0,0.94 L 0,0.06 Q 0,0 0.06,0 Z";

const services = [
  {
    icon: Warehouse,
    label: "Equipo médico",
    description: "Almacenamiento con control de temperatura.",
    leftTitleWhite: "Almacenamiento seguro",
    leftTitleOrange: "con control total.",
    leftDescription:
      "Instalaciones con control de temperatura y trazabilidad para proteger cada producto farmacéutico.",
  },
  {
    icon: Truck,
    label: "Medicamentos de patente",
    description: "Distribución nacional con cobertura total.",
    leftTitleWhite: "Distribución con",
    leftTitleOrange: "cobertura nacional.",
    leftDescription:
      "Red logística que garantiza entregas puntuales en todo el país.",
  },
  {
    icon: ShieldCheck,
    label: "Medicamentos genéricos",
    description:
      "Transporte de medicamentos con los más altos estándares de seguridad y control de temperatura.",
    leftTitleWhite: "Soluciones logísticas con los más altos",
    leftTitleOrange: "estándares de calidad.",
    leftDescription:
      "Ofrecemos servicios integrales de transporte y comercialización farmacéutica garantizando seguridad, cumplimiento y eficiencia en cada entrega.",
  },
  {
    icon: ClipboardCheck,
    label: "Artículos Hospitalarios",
    description: "Cumplimiento normativo nacional e internacional.",
    leftTitleWhite: "Cumplimiento normativo",
    leftTitleOrange: "garantizado.",
    leftDescription:
      "Procesos certificados que cumplen regulaciones nacionales e internacionales.",
  },
  {
    icon: Headset,
    label: "Productos desechables",
    description: "Atención personalizada 24/7.",
    leftTitleWhite: "Atención personalizada",
    leftTitleOrange: "24/7.",
    leftDescription:
      "Soporte constante para resolver cualquier necesidad logística.",
  },
];

export default function Services() {
  const [active, setActive] = useState(2);
  const activeService = services[active];

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + services.length) % services.length);

  return (
    <section
      id="servicios"
      className="mx-6 mb-16 grid grid-cols-1 gap-10 sm:mx-10 lg:mx-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-6"
    >
      {/* left card: pinned while this section scrolls past, content swaps with the active service */}
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
        <div className="relative flex min-h-[460px] flex-col justify-center gap-6 rounded-2xl bg-gradient-to-b from-zinc-900 to-black px-6 py-10 ring-2 ring-brand-orange lg:hidden">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-8 bg-brand-orange" />
            <span className="text-xs font-semibold tracking-widest text-zinc-300">
              NUESTROS SERVICIOS
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
                {activeService.leftTitleWhite}{" "}
                <span className="text-brand-orange">
                  {activeService.leftTitleOrange}
                </span>
              </h2>

              <p className="text-base leading-relaxed text-zinc-400">
                {activeService.leftDescription}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contacto"
              className="flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Solicitar cotización
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
        <div className="relative hidden h-[560px] lg:block">
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
                NUESTROS SERVICIOS
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
                  {activeService.leftTitleWhite}{" "}
                  <span className="text-brand-orange">
                    {activeService.leftTitleOrange}
                  </span>
                </h2>

                <p className="max-w-md text-base leading-relaxed text-zinc-400">
                  {activeService.leftDescription}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contacto"
                className="flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Solicitar cotización
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

      {/* right: card carousel, active service centered + enlarged */}
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, x: 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex h-[560px] w-full items-center justify-center overflow-hidden">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Servicio anterior"
            className="absolute left-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange text-white transition-opacity hover:opacity-90"
            style={{ transform: "translateX(-190px)" }}
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
            {services.map((service, i) => {
              const offset = i - active;
              const distance = Math.abs(offset);
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.label}
                  className={`absolute top-1/2 left-1/2 w-[240px] sm:w-[280px] ${
                    distance === 0 ? "" : "cursor-pointer"
                  }`}
                  style={{ zIndex: services.length - distance }}
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
                    className={`relative h-[420px] overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 ${
                      distance === 0 ? "ring-1 ring-brand-orange/60" : ""
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-zinc-600">
                        {/* imagen pendiente */}imagen aquí
                      </span>
                    </div>

                    <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                      <Icon className="h-3.5 w-3.5 text-brand-orange" />
                      {service.label}
                    </div>
                    {distance === 0 && (
                      <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur">
                        <MoreHorizontal className="h-4 w-4" />
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5">
                      {distance === 0 && (
                        <h3 className="mb-1 text-xl font-bold text-white">
                          {service.label}
                        </h3>
                      )}
                      <p
                        className={`text-zinc-300 ${
                          distance === 0 ? "text-sm" : "text-xs"
                        }`}
                      >
                        {service.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        className="mt-2 flex items-center gap-1 text-xs font-semibold text-brand-orange"
                      >
                        Ver más
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Siguiente servicio"
            className="absolute left-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange text-white transition-opacity hover:opacity-90"
            style={{ transform: "translateX(190px)" }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {services.map((service, i) => (
            <button
              key={service.label}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ir a ${service.label}`}
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
