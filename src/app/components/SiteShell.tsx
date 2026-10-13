import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getProfile, getUi, type Locale } from "../i18n";
import { LocaleProvider } from "../i18n/LocaleProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

/** Site-wide metadata for a locale; `/` is Spanish and `/en` is English. */
export function siteMetadata(locale: Locale): Metadata {
  const t = getUi(locale).meta;
  const { siteUrl, headline } = getProfile(locale);
  const home = locale === "en" ? "/en" : "/";
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.title, template: "%s" },
    description: t.description,
    alternates: { canonical: home, languages: { es: "/", en: "/en", "x-default": "/" } },
    openGraph: {
      type: "profile",
      locale: locale === "en" ? "en_US" : "es_CO",
      alternateLocale: locale === "en" ? "es_CO" : "en_US",
      siteName: "Cristian Javier Cano Mogollón",
      title: t.ogTitle,
      description: headline,
      url: home,
    },
    twitter: { card: "summary_large_image", title: t.ogTitle, description: headline },
  };
}

export default function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable}`}>
      <body className="min-h-screen">
        <LocaleProvider locale={locale}>
          <Navbar />
          <main>{children}</main>
          <Footer locale={locale} />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
