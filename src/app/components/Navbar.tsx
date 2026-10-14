"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import { useLocale } from "../i18n/LocaleProvider";

/** Equivalent page in the other language ("/aprende" only exists in Spanish, so it falls back to the English home). */
function alternatePath(pathname: string, locale: "es" | "en") {
  if (locale === "es") return pathname === "/" ? "/en" : pathname === "/cv" ? "/en/cv" : "/en";
  return pathname === "/en" ? "/" : pathname.replace(/^\/en/, "") || "/";
}

export default function Navbar() {
  const { locale, t, path } = useLocale();
  const pathname = usePathname();
  const links = [
    { href: path("/#sobre-mi"), label: t.nav.about },
    { href: path("/#trayectoria"), label: t.nav.career },
    { href: path("/#proyectos"), label: t.nav.projects },
    { href: path("/#simulacion"), label: t.nav.lab },
    { href: path("/#cursos"), label: t.nav.courses },
    { href: path("/cv"), label: t.nav.cv },
  ];
  const switchHref = alternatePath(pathname, locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`no-print sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b-2 border-[#1B1B1B] bg-[#F6F1E4]/90 backdrop-blur-md" : "border-b-2 border-transparent bg-[#F6F1E4]"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={path("/")} className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-[#1B1B1B] bg-[#F4C21B] font-mono text-sm font-black shadow-[2px_2px_0_#1B1B1B]">
            CC
          </span>
          <span className="hidden font-bold leading-tight sm:block md:hidden lg:block">
            Cristian Javier Cano <span className="font-normal text-[#1B1B1B]/60">Mogollón</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#1B1B1B]/[0.06]">
              {l.label}
            </Link>
          ))}
          <Link
            href={path("/#conectar")}
            className="ml-2 rounded-lg border-2 border-[#1B1B1B] bg-[#1B1B1B] px-4 py-1.5 text-sm font-semibold text-[#F4C21B] transition-transform hover:-translate-y-0.5"
          >
            {t.nav.talk}
          </Link>
          <Link
            href={switchHref}
            hrefLang={locale === "es" ? "en" : "es"}
            aria-label={t.nav.switchLabel}
            className="ml-1 inline-flex items-center gap-1 rounded-lg border-2 border-[#1B1B1B] px-2.5 py-1.5 font-mono text-xs font-bold transition-colors hover:bg-[#F4C21B]"
          >
            <Languages className="h-3.5 w-3.5" /> {t.nav.switchTo}
          </Link>
        </div>

        <button className="rounded-lg border-2 border-[#1B1B1B] p-1.5 md:hidden" onClick={() => setOpen((o) => !o)} aria-label={t.nav.menu} aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-4">
              {[...links, { href: path("/#conectar"), label: t.nav.talk }, { href: switchHref, label: `${t.nav.switchTo} · ${t.nav.switchLabel}` }].map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-lg font-bold hover:bg-[#F4C21B]">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
