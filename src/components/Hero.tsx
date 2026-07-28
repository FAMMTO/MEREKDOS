"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Award, ArrowUpRight, ShieldCheck, Truck } from "lucide-react";

const stats = [
  { icon: ShieldCheck, label: "Calidad", value: "Garantizada" },
  { icon: Award, label: "Cumplimiento", value: "Normativo" },
  { icon: Truck, label: "Logística", value: "Especializada" },
];

// rounded trapezoid: straight top/left/bottom, cut+rounded right edge.
// coords in objectBoundingBox fractions (0-1), corner radius baked in via quadratic arcs.
const CARD_PATH =
  "M 0.06,0 L 0.94,0 Q 1,0 0.98937,0.05906 L 0.83063,0.94095 Q 0.82,1 0.76,1 L 0.06,1 Q 0,1 0,0.94 L 0,0.06 Q 0,0 0.06,0 Z";

// image trapezoid: mirrors the card's cut, rounded corners on all 4 vertices too.
const IMAGE_PATH =
  "M 0.328,0 L 0.975,0 Q 1,0 1,0.025 L 1,0.975 Q 1,1 0.975,1 L 0.196,1 Q 0.171,1 0.1743,0.9752 L 0.2997,0.0248 Q 0.303,0 0.328,0 Z";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative mx-6 mb-16 overflow-hidden rounded-2xl sm:mx-10 lg:mx-16 lg:min-h-[760px]"
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="cardClip" clipPathUnits="objectBoundingBox">
            <path d={CARD_PATH} />
          </clipPath>
          <clipPath id="imageClip" clipPathUnits="objectBoundingBox">
            <path d={IMAGE_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* ---- mobile (<lg): big single-corner "scoop" via per-corner border-radius —
          reads as the same diagonal-cut language without the SVG viewBox distortion
          the skewed trapezoid hits on a tall/narrow box. ---- */}
      <div className="flex flex-col lg:hidden">
        <div className="relative overflow-hidden rounded-tl-3xl rounded-tr-[110px] rounded-br-3xl rounded-bl-3xl bg-gradient-to-b from-zinc-900 to-black">
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-tl-3xl rounded-tr-[110px] rounded-br-3xl rounded-bl-3xl"
            animate={{
              boxShadow: [
                "inset 0 0 0 2px var(--brand-orange), 0 0 8px var(--brand-orange), 0 0 16px var(--brand-orange)",
                "inset 0 0 0 2px var(--brand-orange), 0 0 14px var(--brand-orange), 0 0 26px var(--brand-orange)",
                "inset 0 0 0 2px var(--brand-orange), 0 0 8px var(--brand-orange), 0 0 16px var(--brand-orange)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col gap-1 px-6 py-4 pr-16">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 bg-brand-orange" />
              <span className="text-xs font-semibold tracking-widest text-zinc-300">
                COMERCIALIZACIÓN FARMACÉUTICA
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white">
              Transportamos salud,{" "}
              <span className="text-brand-orange">entregamos confianza.</span>
            </h1>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#servicios"
                className="flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Nuestros servicios
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

        <div className="relative mt-4 h-64 overflow-hidden rounded-tl-[90px] rounded-tr-3xl rounded-br-3xl rounded-bl-3xl ring-2 ring-brand-orange sm:h-80">
          <Image
            src="/cajasalud.png"
            alt="Camión Merek Comercializadora"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-zinc-800">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 bg-zinc-950 px-2 py-4 text-center">
              <Icon className="h-5 w-5 text-brand-orange" />
              <p className="text-xs font-semibold text-white">{label}</p>
              <p className="text-[11px] text-zinc-400">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---- desktop (lg+): original side-by-side layout ---- */}
      <div className="hidden h-full lg:block">
        <div
          className="absolute inset-y-0 right-0 left-[35%] bg-zinc-950"
          style={{ clipPath: "url(#imageClip)" }}
        >
          <Image
            src="/cajasalud.png"
            alt="Camión Merek Comercializadora"
            fill
            priority
            className="object-cover object-center scale-100"
            sizes="65vw"
          />
        </div>

        <div className="relative h-full w-[53%]">
          <svg
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <path d={CARD_PATH} fill="#0a0a0a" />
            <path d={CARD_PATH} fill="none" stroke="var(--brand-orange)" strokeWidth="0.005" />
          </svg>

          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: "url(#cardClip)", boxShadow: "inset 0 0 0 2px var(--brand-orange)" }}
            animate={{
              filter: [
                "drop-shadow(0 0 3px var(--brand-orange)) drop-shadow(0 0 8px var(--brand-orange)) drop-shadow(0 0 16px var(--brand-orange))",
                "drop-shadow(0 0 5px var(--brand-orange)) drop-shadow(0 0 14px var(--brand-orange)) drop-shadow(0 0 26px var(--brand-orange))",
                "drop-shadow(0 0 3px var(--brand-orange)) drop-shadow(0 0 8px var(--brand-orange)) drop-shadow(0 0 16px var(--brand-orange))",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div
            className="relative flex h-full flex-col justify-center gap-34 px-8 py-12 sm:px-12 lg:pr-28 lg:py-16"
            style={{ clipPath: "url(#cardClip)" }}
          >
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 bg-brand-orange" />
              <span className="text-xs font-semibold tracking-widest text-zinc-300">
                COMERCIALIZACIÓN FARMACÉUTICA
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Transportamos salud,{" "}
              <span className="text-brand-orange">entregamos confianza.</span>
            </h1>

            <p className="max-w-md text-base leading-relaxed text-zinc-400">
              Comercializamos y transportamos medicamentos con los más altos
              estándares de calidad, seguridad y cumplimiento.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#servicios"
                className="flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Nuestros servicios
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#nosotros"
                className="flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Conocer más
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
