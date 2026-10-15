import type { MetadataRoute } from "next";
import { siteUrl } from "./data/profile";

const page = (es: string, en: string | null, priority: number): MetadataRoute.Sitemap[number] => ({
  url: `${siteUrl}${es === "/" ? "" : es}`,
  changeFrequency: "monthly",
  priority,
  ...(en && { alternates: { languages: { es: `${siteUrl}${es === "/" ? "" : es}`, en: `${siteUrl}${en}` } } }),
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", "/en", 1),
    { ...page("/en", "/en", 0.9), url: `${siteUrl}/en`, alternates: { languages: { es: siteUrl, en: `${siteUrl}/en` } } },
    page("/cv", "/en/cv", 0.8),
    { ...page("/en/cv", "/en/cv", 0.7), url: `${siteUrl}/en/cv`, alternates: { languages: { es: `${siteUrl}/cv`, en: `${siteUrl}/en/cv` } } },
    page("/aprende", null, 0.6),
  ];
}
