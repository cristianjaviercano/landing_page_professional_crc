import * as es from "../data/profile";
import type { CaseStudy, ContentLang, CvItem, Product, Service } from "../data/profile";
import * as en from "../data/profile.en";
import { ui } from "./ui";

export type Locale = "es" | "en";

export const locales: Locale[] = ["es", "en"];

export type Profile = {
  siteUrl: string;
  contact: { email: string; linkedin: string; instagram: string; location: string };
  caseStudies: CaseStudy[];
  services: Service[];
  products: Product[];
  bookingUrl: string | null;
  apps: { title: string; description: string; url: string; tag: string }[];
  courses: { title: string; description: string; url: string; lang?: ContentLang }[];
  anylogic: { title: string; url: string }[];
  games: { title: string; description: string; url: string }[];
  stories: { title: string; description: string; url: string; ready: boolean; lang?: ContentLang }[];
  music: { title: string; url: string }[];
  headline: string;
  summary: string;
  industry: CvItem[];
  academia: CvItem[];
  education: CvItem[];
  skills: { group: string; items: string[] }[];
  languages: { name: string; level: string }[];
};

export const getProfile = (locale: Locale): Profile => (locale === "en" ? en : es);

export const getUi = (locale: Locale) => ui[locale];

/** Locale-prefixed internal path: ("en", "/cv") -> "/en/cv", ("es", "/#x") -> "/#x". */
export function localePath(locale: Locale, path: string) {
  if (locale === "es") return path;
  if (path === "/") return "/en";
  return path.startsWith("/#") ? `/en${path.slice(1)}` : `/en${path}`;
}

export const numberLocale = (locale: Locale) => (locale === "en" ? "en-US" : "es-CO");
