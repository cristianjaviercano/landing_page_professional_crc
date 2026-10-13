"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Outlines } from "@react-three/drei";
import { PALETTE, getPaint } from "./paint";

const { yellow, white, ink } = PALETTE;
const OUTLINE = 0.035;

type Vec3 = [number, number, number];

function Paint({ color }: { color: string }) {
  const { brush, gradient } = getPaint();
  return <meshToonMaterial color={color} map={brush} gradientMap={gradient} />;
}

type BlockProps = ThreeElements["mesh"] & {
  size: Vec3;
  color: string;
  outline?: boolean;
};

function Block({ size, color, outline = true, ...props }: BlockProps) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={size} />
      <Paint color={color} />
      {outline && <Outlines thickness={OUTLINE} color={ink} />}
    </mesh>
  );
}

type CylProps = ThreeElements["mesh"] & {
  radius: number;
  height: number;
  color: string;
  segments?: number;
};

function Cyl({ radius, height, color, segments = 12, ...props }: CylProps) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <cylinderGeometry args={[radius, radius, height, segments]} />
      <Paint color={color} />
      <Outlines thickness={OUTLINE} color={ink} />
    </mesh>
  );
}

/* ---------- interactive hotspot ---------- */

const STATIONS = [
  { label: "Proyectos", target: "proyectos", anchor: [-3, 4.1, -0.6] },
  { label: "Simulación", target: "simulacion", anchor: [2.1, 3.6, -1.4] },
  { label: "Cursos", target: "cursos", anchor: [-3.6, 3.3, 2.2] },
  { label: "Contacto", target: "conectar", anchor: [4.2, 2.5, 2.5] },
] as const;

const goTo = (target: string) => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });

type HoverProps = { hovered: number | null; setHovered: (i: number | null) => void };

function Station({ index, hovered, setHovered, children }: HoverProps & { index: number; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const active = hovered === index;

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, active ? 1.06 : 1, 10, dt));
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(index);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(null);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        goTo(STATIONS[index].target);
      }}
    >
      {children}
    </group>
  );
}

/* ---------- props ---------- */

function Prism({ width, height, depth, color, ...props }: ThreeElements["mesh"] & { width: number; height: number; depth: number; color: string }) {
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-width / 2, 0);
    s.lineTo(width / 2, 0);
    s.lineTo(width / 2, height);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false });
    g.translate(0, 0, -depth / 2);
    return g;
  }, [width, height, depth]);
  return (
    <mesh geometry={geo} castShadow receiveShadow {...props}>
      <Paint color={color} />
      <Outlines thickness={OUTLINE} color={ink} />
    </mesh>
  );
}

function Smoke({ origin, animate }: { origin: Vec3; animate: boolean }) {
  const puffs = useRef<THREE.Mesh[]>([]);
  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.elapsedTime;
    puffs.current.forEach((m, i) => {
      if (!m) return;
      const p = (t * 0.35 + i / 5) % 1;
      m.position.set(origin[0] + p * 0.9, origin[1] + p * 2.6, origin[2] - p * 0.4);
      m.scale.setScalar(0.25 + p * 0.55 - (p > 0.85 ? (p - 0.85) * 5 : 0));
    });
  });
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (m) puffs.current[i] = m;
          }}
          position={[origin[0], origin[1] + i * 0.5, origin[2]]}
          scale={0.3 + i * 0.1}
        >
          <icosahedronGeometry args={[1, 0]} />
          <Paint color={white} />
          <Outlines thickness={OUTLINE * 1.4} color={ink} />
        </mesh>
      ))}
    </>
  );
}

/* ---------- factory building ---------- */

function Factory({ animate }: { animate: boolean }) {
  return (
    <group position={[-3, 0, -2]}>
      <Block size={[5, 2.4, 3.2]} color={white} position={[0, 1.2, 0]} />
      {/* sawtooth roof */}
      {[-1.66, 0, 1.66].map((x) => (
        <Prism key={x} width={1.66} height={0.9} depth={3.2} color={ink} position={[x, 2.4, 0]} />
      ))}
      {/* windows */}
      {[-1.7, -0.6, 0.5].map((x) => (
        <Block key={x} size={[0.7, 0.55, 0.05]} color={ink} position={[x, 1.6, 1.62]} outline={false} />
      ))}
      <Block size={[1.1, 1.5, 0.06]} color={yellow} position={[1.65, 0.75, 1.62]} />
      {/* chimney with warning stripes */}
      <group position={[-1.8, 0, -1]}>
        <Cyl radius={0.35} height={4.2} color={white} position={[0, 2.1, 0]} />
        <Cyl radius={0.37} height={0.3} color={ink} position={[0, 3.5, 0]} />
        <Cyl radius={0.37} height={0.3} color={yellow} position={[0, 3.9, 0]} />
      </group>
      <Smoke origin={[-1.8, 4.6, -1]} animate={animate} />
    </group>
  );
}

/* ---------- conveyor + press ---------- */

const BELT_START = -0.4;
const BELT_END = 4.6;
const BELT_Z = -1.4;
const BELT_Y = 0.85;

function Conveyor({ animate }: { animate: boolean }) {
  const boxes = useRef<THREE.Group[]>([]);
  const piston = useRef<THREE.Group>(null);
  const N = 5;
  const len = BELT_END - BELT_START;

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.elapsedTime;
    boxes.current.forEach((b, i) => {
      if (!b) return;
      const p = (t * 0.12 + i / N) % 1;
      b.position.x = BELT_START + p * len;
      // grow out of the factory wall, shrink at the end of the line
      const s = Math.min(1, p * 12, (1 - p) * 12);
      b.scale.setScalar(Math.max(0.001, s));
    });
    if (piston.current) {
      const cycle = (t * 0.6) % 1;
      piston.current.position.y = 2.15 - Math.max(0, Math.sin(cycle * Math.PI * 2)) * 0.55;
    }
  });

  return (
    <group>
      <Block size={[len, 0.18, 1]} color={ink} position={[(BELT_START + BELT_END) / 2, BELT_Y - 0.09, BELT_Z]} />
      {[0.4, 2.1, 3.8].map((x) => (
        <Block key={x} size={[0.15, BELT_Y - 0.18, 0.9]} color={ink} position={[x, (BELT_Y - 0.18) / 2, BELT_Z]} outline={false} />
      ))}
      <Cyl radius={0.12} height={1.05} color={yellow} position={[BELT_END, BELT_Y - 0.09, BELT_Z]} rotation={[Math.PI / 2, 0, 0]} />

      {Array.from({ length: N }).map((_, i) => (
        <group
          key={i}
          ref={(g) => {
            if (g) boxes.current[i] = g;
          }}
          position={[BELT_START + (i / N) * len, BELT_Y + 0.25, BELT_Z]}
        >
          <Block size={[0.5, 0.5, 0.5]} color={yellow} />
          <Block size={[0.52, 0.08, 0.52]} color={ink} outline={false} position={[0, 0.1, 0]} />
        </group>
      ))}

      {/* stamping press */}
      <group position={[2.1, 0, BELT_Z]}>
        <Block size={[0.3, 2.6, 0.3]} color={white} position={[0, 1.3, -0.75]} />
        <Block size={[0.3, 2.6, 0.3]} color={white} position={[0, 1.3, 0.75]} />
        <Block size={[0.7, 0.4, 1.9]} color={ink} position={[0, 2.75, 0]} />
        <group ref={piston} position={[0, 2.15, 0]}>
          <Cyl radius={0.08} height={0.7} color={white} position={[0, 0.25, 0]} />
          <Block size={[0.6, 0.18, 0.6]} color={yellow} position={[0, -0.1, 0]} />
        </group>
      </group>
    </group>
  );
}

/* ---------- warehouse rack ---------- */

function Rack() {
  const levels = [0.15, 1.05, 1.95];
  const fill = [
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 1],
  ];
  return (
    <group position={[-3.6, 0, 2.2]}>
      {[-1.2, 1.2].flatMap((x) =>
        [-0.45, 0.45].map((z) => <Block key={`${x}${z}`} size={[0.1, 2.8, 0.1]} color={ink} position={[x, 1.4, z]} outline={false} />),
      )}
      {levels.map((y, li) => (
        <group key={y}>
          <Block size={[2.5, 0.08, 1]} color={white} position={[0, y, 0]} />
          {fill[li].map((on, bi) =>
            on ? <Block key={bi} size={[0.6, 0.6, 0.6]} color={yellow} position={[-0.8 + bi * 0.8, y + 0.34, 0]} /> : null,
          )}
        </group>
      ))}
    </group>
  );
}

/* ---------- forklift shuttling rack -> truck ---------- */

function Forklift({ animate }: { animate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const cargo = useRef<THREE.Group>(null);
  useFrame(({ clock }, dt) => {
    if (!ref.current || !animate) return;
    const t = clock.elapsedTime * 0.25;
    const p = (Math.sin(t * Math.PI * 2 - Math.PI / 2) + 1) / 2; // 0 rack, 1 truck
    ref.current.position.x = THREE.MathUtils.lerp(-1.9, 1.6, p);
    const goingRight = Math.cos(t * Math.PI * 2 - Math.PI / 2) > 0;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, goingRight ? 0 : Math.PI, 6, dt);
    if (cargo.current) cargo.current.visible = goingRight;
  });
  return (
    <group ref={ref} position={[-1.9, 0, 2.5]}>
      <Block size={[1.1, 0.5, 0.75]} color={yellow} position={[0, 0.45, 0]} />
      <Block size={[0.5, 0.55, 0.7]} color={white} position={[-0.2, 0.95, 0]} />
      <Block size={[0.06, 0.05, 0.7]} color={ink} position={[-0.2, 1.25, 0]} outline={false} />
      <Block size={[0.08, 1.4, 0.6]} color={ink} position={[0.6, 0.75, 0]} />
      <Block size={[0.6, 0.05, 0.5]} color={white} position={[0.95, 0.35, 0]} />
      <group ref={cargo}>
        <Block size={[0.45, 0.45, 0.45]} color={yellow} position={[0.95, 0.6, 0]} />
      </group>
      {[-0.3, 0.3].flatMap((x) =>
        [-0.4, 0.4].map((z) => (
          <Cyl key={`${x}${z}`} radius={0.17} height={0.12} color={ink} position={[x, 0.18, z]} rotation={[Math.PI / 2, 0, 0]} />
        )),
      )}
    </group>
  );
}

/* ---------- delivery truck ---------- */

function Truck() {
  return (
    <group position={[4, 0, 2.5]}>
      <Block size={[2.6, 1.5, 1.3]} color={white} position={[-0.2, 1.05, 0]} />
      <Block size={[2.62, 0.25, 1.32]} color={yellow} position={[-0.2, 1.3, 0]} outline={false} />
      <Block size={[0.9, 1.0, 1.25]} color={yellow} position={[1.55, 0.8, 0]} />
      <Block size={[0.05, 0.4, 1.0]} color={ink} position={[2.01, 1.05, 0]} outline={false} />
      {[-1, 0, 1.55].flatMap((x) =>
        [-0.62, 0.62].map((z) => (
          <Cyl key={`${x}${z}`} radius={0.25} height={0.15} color={ink} position={[x, 0.25, z]} rotation={[Math.PI / 2, 0, 0]} />
        )),
      )}
    </group>
  );
}

/* ---------- scene ---------- */

function Base() {
  return (
    <group>
      <Block size={[12.6, 0.35, 9.4]} color={ink} position={[0, -0.95, 0]} />
      <Block size={[12, 0.8, 8.8]} color={yellow} position={[0, -0.4, 0]} />
      {/* painted floor lanes */}
      {[-3, -1, 1, 3].map((x) => (
        <Block key={x} size={[1, 0.02, 0.18]} color={ink} position={[x, 0.01, 1.2]} outline={false} />
      ))}
      {/* safety cones */}
      {[[5.3, -3.6], [5.3, -2.6], [-5.4, 0.4]].map(([x, z]) => (
        <group key={`${x}${z}`} position={[x, 0, z]}>
          <mesh castShadow position={[0, 0.3, 0]}>
            <coneGeometry args={[0.22, 0.6, 8]} />
            <Paint color={yellow} />
            <Outlines thickness={OUTLINE} color={ink} />
          </mesh>
          <Cyl radius={0.14} height={0.08} color={ink} position={[0, 0.35, 0]} />
        </group>
      ))}
    </group>
  );
}

const projected = new THREE.Vector3();

function Rig({
  animate,
  labels,
  children,
}: {
  animate: boolean;
  labels: React.RefObject<(HTMLButtonElement | null)[]>;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock, camera, size }, dt) => {
    // responsive orthographic framing + zoom-in as the hero scrolls away
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    const fit = Math.min(size.width / 16, size.height / 12.5);
    const cam = camera as THREE.OrthographicCamera;
    cam.zoom = THREE.MathUtils.damp(cam.zoom, fit * (1 + scroll * 0.35), 6, dt);
    cam.updateProjectionMatrix();

    if (!ref.current) return;
    const idle = animate ? Math.sin(clock.elapsedTime * 0.3) * 0.04 : 0;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, pointer.x * 0.25 + idle + scroll * 0.6, 4, dt);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -pointer.y * 0.06, 4, dt);

    // pin the DOM labels to their station anchors
    ref.current.updateMatrixWorld();
    STATIONS.forEach((st, i) => {
      const el = labels.current[i];
      if (!el) return;
      projected.fromArray(st.anchor).applyMatrix4(ref.current!.matrixWorld).project(camera);
      const x = ((projected.x + 1) / 2) * size.width;
      const y = ((1 - projected.y) / 2) * size.height;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      el.style.opacity = "1";
    });
  });

  return <group ref={ref}>{children}</group>;
}

export default function FactoryScene({ animate = true }: { animate?: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const labels = useRef<(HTMLButtonElement | null)[]>([]);
  const hover = { hovered, setHovered };

  return (
    <div className="relative h-full w-full">
      <Canvas
        orthographic
        shadows
        dpr={[1, 2]}
        camera={{ position: [10, 8.5, 10], zoom: 50, near: -50, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        fallback={null}
      >
        <ambientLight intensity={1.1} />
        <directionalLight
          position={[5, 12, 7]}
          intensity={2.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={9}
          shadow-camera-bottom={-9}
          shadow-bias={-0.0008}
        />
        <Rig animate={animate} labels={labels}>
          <Base />
          <Station index={0} {...hover}>
            <Factory animate={animate} />
          </Station>
          <Station index={1} {...hover}>
            <Conveyor animate={animate} />
          </Station>
          <Station index={2} {...hover}>
            <Rack />
          </Station>
          <Forklift animate={animate} />
          <Station index={3} {...hover}>
            <Truck />
          </Station>
        </Rig>
      </Canvas>

      {STATIONS.map((st, i) => (
        <button
          key={st.target}
          ref={(el) => {
            labels.current[i] = el;
          }}
          onClick={() => goTo(st.target)}
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(null)}
          style={{ opacity: 0 }}
          className="absolute left-0 top-0 transition-opacity duration-500"
        >
          <span
            className={`font-hand block whitespace-nowrap rounded-md border-2 border-[#1B1B1B] px-3 py-0.5 text-xl leading-tight shadow-[3px_3px_0_#1B1B1B] transition-all duration-200 ${
              hovered === i ? "-translate-y-1 -rotate-2 bg-[#F4C21B]" : "rotate-1 bg-[#F7F3EA]"
            }`}
          >
            {st.label} ↘
          </span>
        </button>
      ))}
    </div>
  );
}
