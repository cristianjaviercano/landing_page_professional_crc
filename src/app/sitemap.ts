import type { MetadataRoute } from "next";
import { siteUrl } from "./data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/cv`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/aprende`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
