import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Caveat, Geist } from "next/font/google";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 | Cristian Javier Cano Mogollón",
  robots: { index: false },
};

/** Global 404: with two root layouts there is no single layout to compose it from, so it carries its own shell. */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${geist.variable} ${caveat.variable}`}>
      <body className="hero-paper grid min-h-screen place-items-center px-4 text-[#1B1B1B]">
        <main className="max-w-lg text-center">
          <p className="font-hand text-3xl">404</p>
          <h1 className="mt-1 text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl">Esta página no existe.</h1>
          <p className="mt-4 text-lg text-[#1B1B1B]/75">
            El enlace puede estar roto o la página cambió de lugar.
            <br />
            <span lang="en">This page does not exist. The link may be broken, or the page has moved.</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl border-2 border-[#1B1B1B] bg-[#1B1B1B] px-5 py-3 font-semibold text-[#F4C21B] shadow-[4px_4px_0_#F4C21B] transition-transform hover:-translate-y-0.5"
            >
              Volver al inicio
            </Link>
            <Link
              href="/en"
              hrefLang="en"
              className="rounded-xl border-2 border-[#1B1B1B] bg-[#F7F3EA] px-5 py-3 font-semibold shadow-[4px_4px_0_#1B1B1B] transition-transform hover:-translate-y-0.5"
            >
              <span lang="en">Back to home</span>
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
