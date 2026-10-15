import { ogSize, renderOgImage } from "../components/OgImage";

export const alt = "Cristian Javier Cano Mogollón — Operaciones, Logística e IA";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("es");
}
