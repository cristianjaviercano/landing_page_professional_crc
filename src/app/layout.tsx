import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { headline, siteUrl } from "./data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Ingeniero Industrial, MSc. en Gestión de la Innovación y candidato a Doctor en IA. Proyectos, simulación, cursos y trayectoria en logística y operaciones.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cristian Javier Cano Mogollón | Operaciones, Logística e IA",
    template: "%s",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "es_CO",
    siteName: "Cristian Javier Cano Mogollón",
    title: "Cristian Javier Cano Mogollón — Operaciones, Logística e IA",
    description: headline,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristian Javier Cano Mogollón — Operaciones, Logística e IA",
    description: headline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable}`}>
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}