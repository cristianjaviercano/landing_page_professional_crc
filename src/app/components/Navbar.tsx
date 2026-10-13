"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#trayectoria", label: "Trayectoria" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#simulacion", label: "Laboratorio" },
  { href: "/#cursos", label: "Cursos" },
  { href: "/cv", label: "CV" },
];

export default function Navbar() {
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
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-[#1B1B1B] bg-[#F4C21B] font-mono text-sm font-black shadow-[2px_2px_0_#1B1B1B]">
            CC
          </span>
          <span className="hidden font-bold leading-tight sm:block">
            Cristian Cano <span className="font-normal text-[#1B1B1B]/60">Mogollón</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#1B1B1B]/[0.06]">
              {l.label}
            </Link>
          ))}
          <Link
            href="/#conectar"
            className="ml-2 rounded-lg border-2 border-[#1B1B1B] bg-[#1B1B1B] px-4 py-1.5 text-sm font-semibold text-[#F4C21B] transition-transform hover:-translate-y-0.5"
          >
            Hablemos
          </Link>
        </div>

        <button className="rounded-lg border-2 border-[#1B1B1B] p-1.5 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menú" aria-expanded={open}>
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
              {[...links, { href: "/#conectar", label: "Hablemos" }].map((l) => (
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
