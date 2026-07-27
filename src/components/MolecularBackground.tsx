"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/components/ThemeProvider";

const STEPS = 90;
const TURNS = 4.5;
const HEIGHT = 16;
// wider cylinder — a thin helix rotates through near edge-on angles where its
// silhouette collapses to a sliver, leaving half the screen empty. A wider
// radius keeps real screen coverage at every rotation angle.
const RADIUS = 3.4;
const RUNG_EVERY = 4;
const SPHERE_RADIUS = 0.14;

const dummy = new THREE.Object3D();

function DnaHelix({ dark }: { dark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const spheres = useRef<THREE.InstancedMesh>(null);

  const { positions, backbonePositions, rungPositions } = useMemo(() => {
    const strandA: THREE.Vector3[] = [];
    const strandB: THREE.Vector3[] = [];

    for (let i = 0; i < STEPS; i++) {
      const t = i / (STEPS - 1);
      const angle = t * TURNS * Math.PI * 2;
      const y = (t - 0.5) * HEIGHT;
      strandA.push(new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS));
      strandB.push(
        new THREE.Vector3(Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS)
      );
    }

    const positions = [...strandA, ...strandB];

    const backbone: number[] = [];
    for (let i = 0; i < STEPS - 1; i++) {
      backbone.push(...strandA[i].toArray(), ...strandA[i + 1].toArray());
      backbone.push(...strandB[i].toArray(), ...strandB[i + 1].toArray());
    }

    const rungs: number[] = [];
    for (let i = 0; i < STEPS; i += RUNG_EVERY) {
      rungs.push(...strandA[i].toArray(), ...strandB[i].toArray());
    }

    return {
      positions,
      backbonePositions: new Float32Array(backbone),
      rungPositions: new Float32Array(rungs),
    };
  }, []);

  // real sphere geometry, positioned per-instance — sidesteps point-sprite/texture
  // quirks entirely, guaranteed round regardless of GPU/driver.
  useEffect(() => {
    if (!spheres.current) return;
    positions.forEach((p, i) => {
      dummy.position.copy(p);
      dummy.updateMatrix();
      spheres.current!.setMatrixAt(i, dummy.matrix);
    });
    spheres.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.15;
    // smaller wobble amplitude — the old 0.15 rad tipped the helix far enough
    // toward edge-on to exaggerate the near-empty-screen moments.
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[backbonePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={dark ? "#38bdf8" : "#3c81e7"}
          transparent
          opacity={dark ? 0.65 : 0.55}
        />
      </lineSegments>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rungPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={dark ? "#93c5fd" : "#8fb6f0"}
          transparent
          opacity={dark ? 0.45 : 0.35}
        />
      </lineSegments>

      <instancedMesh ref={spheres} args={[undefined, undefined, positions.length]}>
        <sphereGeometry args={[SPHERE_RADIUS, 8, 8]} />
        <meshStandardMaterial
          color={dark ? "#0ea5e9" : "#1d5fd6"}
          roughness={0.3}
          metalness={0.2}
          emissive={dark ? "#22d3ee" : "#0a3ba8"}
          emissiveIntensity={dark ? 0.45 : 0.2}
        />
      </instancedMesh>
    </group>
  );
}

export default function MolecularBackground() {
  const { dark } = useTheme();

  useEffect(() => {
    // `right:0` on a `position:fixed` element spans the true browser window,
    // INCLUDING the reserved desktop scrollbar gutter — while normal document
    // content is measured against `clientWidth`, which EXCLUDES it. That
    // mismatch is what left a strip of background showing past the (narrower)
    // page content on desktop/DevTools (real phones use overlay scrollbars
    // with zero reserved width, so this never showed there). Pin an explicit
    // pixel width from the same measurement normal layout uses instead of
    // relying on `right:0`/`100vw`, which both include the gutter.
    const setWidth = () => {
      document.documentElement.style.setProperty(
        "--safe-vw",
        `${document.documentElement.clientWidth}px`
      );
    };
    setWidth();
    window.addEventListener("resize", setWidth);
    return () => window.removeEventListener("resize", setWidth);
  }, []);

  return (
    <div
      className="molecular-bg pointer-events-none fixed top-0 left-0 -z-10 transition-[background] duration-500"
      style={{
        width: "var(--safe-vw, 100vw)",
        background: dark
          ? "radial-gradient(circle at 20% 15%, #0d1526 0%, #070b14 55%, #03050a 100%)"
          // no near-white stops — this is what read as a "blank white" patch
          // wherever the (thin, rotating) helix wasn't covering the screen.
          : "radial-gradient(circle at 20% 15%, #dce8fb 0%, #c3d9f7 55%, #aecbf3 100%)",
        // own compositor layer so scroll doesn't force the browser to repaint
        // this full-viewport WebGL canvas on every frame. Height is pinned to `lvh`
        // (large viewport height — static, ignores the mobile toolbar show/hide, so
        // no mid-scroll canvas resize/rejank) instead of live `dvh`/`inset-0`. Uses
        // `lvh` rather than `svh` specifically so it covers the FULL viewport once
        // the toolbar collapses on scroll — `svh` is the smallest case and left a
        // gap (plain body background showing) at the bottom once the toolbar hid.
        transform: "translateZ(0)",
        contain: "paint",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 11], fov: 55 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={1}
        style={{ opacity: dark ? 0.85 : 0.6 }}
      >
        <ambientLight intensity={dark ? 0.4 : 0.7} />
        <directionalLight position={[5, 5, 8]} intensity={dark ? 0.9 : 1.2} />
        <DnaHelix dark={dark} />
      </Canvas>
    </div>
  );
}
