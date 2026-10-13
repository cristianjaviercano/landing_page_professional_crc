import { ogSize, renderOgImage } from "../components/OgImage";

export const alt = "Cristian Javier Cano Mogollón — Operations, Logistics & AI";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("en");
}
