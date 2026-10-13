import * as THREE from "three";

export const PALETTE = {
  yellow: "#F4C21B",
  white: "#F7F3EA",
  ink: "#1B1B1B",
};

// Mulberry32: deterministic noise so the brush pattern is identical on every load.
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let cache: { brush: THREE.Texture; gradient: THREE.Texture } | null = null;

/**
 * Shared textures for the hand-painted look:
 * - brush: near-white canvas with translucent strokes; used as `map` it modulates
 *   each material's flat colour like visible gouache strokes.
 * - gradient: 3-step ramp for MeshToonMaterial (light / mid / shadow bands).
 */
export function getPaint() {
  if (cache) return cache;

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const g = canvas.getContext("2d")!;
  const r = rng(7);
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, size, size);
  g.lineCap = "round";
  for (let i = 0; i < 260; i++) {
    const x = r() * size;
    const y = r() * size;
    const len = 25 + r() * 70;
    const ang = -0.6 + r() * 0.35;
    const shade = Math.round(205 + r() * 45);
    g.strokeStyle = `rgba(${shade},${shade},${shade - 8},${0.25 + r() * 0.3})`;
    g.lineWidth = 3 + r() * 12;
    g.beginPath();
    g.moveTo(x, y);
    g.quadraticCurveTo(
      x + Math.cos(ang) * len * 0.5 + (r() - 0.5) * 14,
      y + Math.sin(ang) * len * 0.5 + (r() - 0.5) * 14,
      x + Math.cos(ang) * len,
      y + Math.sin(ang) * len,
    );
    g.stroke();
  }
  const brush = new THREE.CanvasTexture(canvas);
  brush.wrapS = brush.wrapT = THREE.RepeatWrapping;
  brush.colorSpace = THREE.SRGBColorSpace;
  brush.anisotropy = 4;

  const ramp = new Uint8Array([90, 175, 255]);
  const gradient = new THREE.DataTexture(ramp, ramp.length, 1, THREE.RedFormat);
  gradient.minFilter = gradient.magFilter = THREE.NearestFilter;
  gradient.generateMipmaps = false;
  gradient.needsUpdate = true;

  cache = { brush, gradient };
  return cache;
}
