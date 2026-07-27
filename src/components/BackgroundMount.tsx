"use client";

import dynamic from "next/dynamic";

// three.js + @react-three/fiber are heavy — split out of the main bundle and
// mount only on the client, after hydration, so they never block first paint
// or interaction.
const MolecularBackground = dynamic(() => import("./MolecularBackground"), {
  ssr: false,
});

export default function BackgroundMount() {
  return <MolecularBackground />;
}
