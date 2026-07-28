"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import LocationMap from "@/components/LocationMap";

// mirror of the other sections' card cut: straight top/right/bottom, cut+rounded LEFT edge.
// rounded corners on all 4 vertices via quadratic arcs (objectBoundingBox fractions).
const MAP_PATH =
  "M 0.085,0 L 0.975,0 Q 1,0 1,0.025 L 1,0.975 Q 1,1 0.975,1 L 0.265,1 Q 0.24,1 0.235569,0.975395 L 0.064431,0.024605 Q 0.06,0 0.085,0 Z";

const info = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Honda Vista #118-A, Col. Linda Vista, Guadalupe, N.L.",
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: "Lunes a Viernes de 8:00 a.m. a 6:00 p.m.",
  },
  {
    icon: Phone,
    label: "Teléfono",
    phones: [
      { value: "+(81) 1354-9309", href: "tel:+528113549309" },
      { value: "+(81) 8021-8702", href: "tel:+528180218702" },
    ],
  },
  {
    icon: Mail,
    label: "Email",
    value: "gerencia@comercializadoramerek.com",
    href: "mailto:gerencia@comercializadoramerek.com",
  },
];

export default function Location() {
  return (
    <section
      id="ubicacion"
      className="mx-6 mb-16 grid grid-cols-1 gap-10 sm:mx-10 lg:mx-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-6"
    >
      {/* left: plain text block, no card/border */}
      <motion.div
        className="relative flex min-h-[560px] flex-col justify-center gap-6 rounded-3xl bg-white px-8 py-12 shadow-xl ring-1 ring-black/5 sm:px-10 lg:py-16 dark:bg-zinc-900 dark:ring-white/10"
        initial={{ opacity: 0, x: -70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-8 bg-brand-orange" />
          <span className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
            NUESTRA UBICACIÓN
          </span>
        </div>

          <h2 className="max-w-md text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl dark:text-white">
            Siempre cerca
            <br />
            para entregarte
            <br />
            <span className="text-brand-orange">lo mejor.</span>
          </h2>

          <p className="max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Contamos con una ubicación estratégica que nos permite garantizar entregas
            rápidas, seguras y eficientes en toda la región.
          </p>

          <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
            {info.map(({ icon: Icon, label, value, href, phones }) => (
              <div key={label} className="flex items-start gap-4 py-3 first:pt-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-orange text-brand-orange">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{label}</p>
                  {phones ? (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {phones.map(({ value: pValue, href: pHref }, i) => (
                        <span key={pValue} className="flex items-center gap-3">
                          <a
                            href={pHref}
                            className="text-sm text-zinc-600 transition-colors hover:text-brand-orange dark:text-zinc-400"
                          >
                            {pValue}
                          </a>
                          {i < phones.length - 1 && (
                            <span className="text-zinc-300 dark:text-zinc-700">|</span>
                          )}
                        </span>
                      ))}
                    </div>
                  ) : href ? (
                    <a href={href} className="text-sm text-zinc-600 transition-colors hover:text-brand-orange dark:text-zinc-400">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
          Cómo llegar
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>

      {/* right: map placeholder, mirrored trapezoid, same border treatment as the card */}
      <motion.div
        className="relative min-h-[400px]"
        initial={{ opacity: 0, x: 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* rounded clip path shared by both layers below (objectBoundingBox: supports the
            curves a plain % polygon can't, without the SVG-stroke distortion bug) */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="mapClip" clipPathUnits="objectBoundingBox">
              <path d={MAP_PATH} />
            </clipPath>
          </defs>
        </svg>

        {/* orange "border": bg layer clipped to the shape, real CSS clip-path (not SVG
            stroke — that distorts/vanishes on wide, short boxes like this one) */}
        <div
          className="h-full bg-brand-orange p-[2px]"
          style={{ clipPath: "url(#mapClip)" }}
        >
          <div
            className="relative h-full overflow-hidden bg-gradient-to-br from-zinc-900 to-black"
            style={{ clipPath: "url(#mapClip)" }}
          >
            <LocationMap />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
