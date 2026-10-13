import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, Download, FileText, Gamepad2, Gift, GraduationCap, Lock, Wrench } from "lucide-react";
import Reveal from "../components/home/Reveal";
import SectionHeading, { Mark } from "../components/home/SectionHeading";

export const metadata: Metadata = {
  title: "Aprende & Apoya | Cristian Javier Cano Mogollón",
  description: "Libros, herramientas, simuladores y recursos gratuitos de logística, simulación y narrativa.",
};

const libros = [
  {
    title: "Logistic Book",
    subtitle: "Cuaderno de Logística para Ingeniería Industrial",
    description:
      "Guía práctica de gestión logística: modelos de inventario (EOQ, ABC), transporte, localización y Supply Chain. Escrito para estudiantes y profesionales de ingeniería industrial con enfoque en aplicación real.",
    tags: ["Logística", "EOQ", "Supply Chain", "Ingeniería"],
    url: "https://pay.hotmart.com/R101270360M",
    platform: "Hotmart",
    badge: "Libro Técnico",
    color: "blue",
    icon: BookOpen,
    cover: "/covers/logistic_book.jpg",
  },
  {
    title: "The Requiem of the Sea",
    subtitle: "Novela épica — El misterio del galeón San José",
    description:
      "Una historia épica que entrelaza el tesoro más valioso del Caribe con personajes que luchan entre el honor, la codicia y la redención. Una novela para quienes disfrutan de la historia y la aventura.",
    tags: ["Novela", "Histórica", "Aventura", "Caribe"],
    url: "https://pay.hotmart.com/Q100177044E",
    platform: "Hotmart",
    badge: "Novela",
    color: "purple",
    icon: BookOpen,
    cover: "/covers/requiem_sea.jpg",
  },
  {
    title: "Ecos del San José",
    subtitle: "Historia interactiva de fantasía y memoria",
    description:
      "La historia que da vida a los ecos del galeón San José. Una narrativa inmersiva que combina historia, ficción y experiencia interactiva. También disponible como historia visual gratuita en este sitio.",
    tags: ["Narrativa", "Interactiva", "Fantasía", "Historia"],
    url: "https://pay.hotmart.com/C100167402Y",
    platform: "Hotmart",
    badge: "Novela + Experiencia",
    color: "indigo",
    icon: BookOpen,
    cover: "/covers/ecos_san_jose.jpg",
  },
];

const herramientas = [
  {
    title: "OptiStock Pro",
    subtitle: "Sistema avanzado de gestión de inventarios",
    description:
      "Aplicación web con IA para optimización de inventarios, análisis ABC automático, cálculo de EOQ y reportes visuales. Ideal para empresas y estudiantes de logística.",
    tags: ["Inventarios", "EOQ", "IA", "React"],
    url: "https://cristianjcanom.gumroad.com/l/Optistock",
    platform: "Gumroad",
    badge: "Herramienta Web",
    color: "green",
    icon: Wrench,
  },
];

const juegos = [
  {
    title: "TOC FACTORY — Jobshop",
    subtitle: "Simulador de producción Job Shop con Teoría de Restricciones",
    description:
      "Gestiona una fábrica de 6 máquinas, identifica cuellos de botella y optimiza la producción bajo restricciones reales. Demo gratuita de 2 semanas. Incluye KPIs, logros y exportación de reportes PDF.",
    tags: ["TOC", "Job Shop", "Pygame", "Ingeniería Industrial"],
    demoLevels: "2 semanas gratis · 3 niveles completos",
    color: "orange",
    platform: "Python / Pygame",
    hotmartUrl: "https://pay.hotmart.com/R101270360M",
    repoUrl: "https://toc-factory-simuladores-9jlwiw6zw.vercel.app/",
    badge: "Demo Gratis",
  },
  {
    title: "TOC FACTORY — Flowshop",
    subtitle: "Planta embotelladora con gestión económica y setup de máquinas",
    description:
      "Produce botellas de bebidas en una línea flowshop. El reto es minimizar setups y maximizar utilidad neta. Demo: Nivel 1 completo gratis. Versión full incluye 4 niveles con nuevos productos y restricciones.",
    tags: ["Flow Shop", "Setup", "Pygame", "Simulación"],
    demoLevels: "Nivel 1 completo gratis · 4 niveles en versión full",
    color: "cyan",
    platform: "Python / Pygame",
    hotmartUrl: "https://pay.hotmart.com/R101270360M",
    repoUrl: "https://toc-factory-simuladores-9jlwiw6zw.vercel.app/",
    badge: "Demo Gratis",
  },
];

const gratuitos = [
  {
    title: "GitBook — Cuaderno de Logística",
    description: "141 páginas de contenido técnico en logística, simulación y gestión de proyectos. Acceso libre y continuo.",
    url: "https://crcbookshell.gitbook.io/cristian-s-bookshell/",
    icon: GraduationCap,
    tag: "Gratis",
  },
  {
    title: "Simulador EOQ Interactivo",
    description: "Calcula el lote económico de pedido en tiempo real con visualización gráfica.",
    url: "https://logiticcourse.vercel.app",
    icon: FileText,
    tag: "Gratis",
  },
  {
    title: "Mini-juegos de Ingeniería",
    description: "3 juegos interactivos: teoría de colas, simulación flowshop y retos de simulación discreta.",
    url: "https://cristianjaviercano.github.io/minijuegos/",
    icon: Gamepad2,
    tag: "Gratis",
  },
  {
    title: "Historias Narradas por el Viento",
    description: "4 historias visuales interactivas con música. Narrativa gótica, fantasía y memoria.",
    url: "/historias/index.html",
    icon: BookOpen,
    tag: "Gratis",
  },
  {
    title: "Curso: Fabricación de Agentes de IA",
    description: "Curso completo interactivo — metodología de Línea de Producción Multi-Agente, desde primeros pasos hasta orquestación con MCP y casos prácticos.",
    url: "/cursos/agentes-ia/index.html",
    icon: GraduationCap,
    tag: "Gratis",
  },
  {
    title: "Diapositivas: Fabricación de Agentes de IA",
    description: "Presentación interactiva Reveal.js del curso, con diagramas, código y fórmulas navegables.",
    url: "/cursos/agentes-ia/slides.html",
    icon: FileText,
    tag: "Gratis",
  },
];

const card = "rounded-2xl border-2 border-[#1B1B1B] bg-[#F7F3EA] shadow-[5px_5px_0_#1B1B1B]";
const tagCls = "rounded-md bg-[#1B1B1B]/[0.07] px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide";
const badgeCls = "rounded-full border-2 border-[#1B1B1B] bg-[#F4C21B] px-2.5 py-0.5 text-xs font-bold";
const primaryBtn =
  "inline-flex items-center gap-1.5 rounded-xl border-2 border-[#1B1B1B] bg-[#1B1B1B] px-4 py-2 text-sm font-semibold text-[#F4C21B] transition-transform hover:-translate-y-0.5";
const secondaryBtn =
  "inline-flex items-center gap-1.5 rounded-xl border-2 border-[#1B1B1B] bg-white/70 px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#F4C21B]";

export default function AprendePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/#cursos" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold hover:underline">
        <ArrowLeft className="h-4 w-4" /> Volver al inicio
      </Link>

      <SectionHeading index="→" kicker="aprende & apoya" title={<>Recursos para seguir <Mark>aprendiendo</Mark>.</>}>
        Libros, herramientas y contenido gratuito en logística, simulación y narrativa. Al adquirir un producto apoyas la creación de
        más contenido libre.
      </SectionHeading>

      <section className="mb-20">
        <h2 className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Libros y novelas <span className="font-normal normal-case text-[#1B1B1B]/55">· Hotmart</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {libros.map((libro, i) => (
            <Reveal key={libro.title} delay={i * 0.06} className="h-full">
              <article className={`${card} flex h-full flex-col overflow-hidden`}>
                <div className="relative flex h-56 items-center justify-center border-b-2 border-[#1B1B1B] bg-[#F4C21B]/30">
                  <Image src={libro.cover} alt={libro.title} width={130} height={200} className="h-44 w-auto rounded-md border-2 border-[#1B1B1B] object-cover shadow-[4px_4px_0_#1B1B1B]" />
                  <span className={`${badgeCls} absolute left-3 top-3`}>{libro.badge}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-tight">{libro.title}</h3>
                  <p className="mb-2 text-sm font-semibold text-[#1B1B1B]/60">{libro.subtitle}</p>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-[#1B1B1B]/75">{libro.description}</p>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {libro.tags.map((t) => (
                      <span key={t} className={tagCls}>{t}</span>
                    ))}
                  </div>
                  <a href={libro.url} target="_blank" rel="noopener noreferrer" className={`${primaryBtn} self-start`}>
                    Adquirir <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mb-20 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            <Wrench className="h-4 w-4" /> Herramientas <span className="font-normal normal-case text-[#1B1B1B]/55">· Gumroad</span>
          </h2>
          {herramientas.map((h) => (
            <Reveal key={h.title}>
              <article className="rounded-2xl border-2 border-[#1B1B1B] bg-[#1B1B1B] p-6 text-[#F7F3EA] shadow-[5px_5px_0_#F4C21B]">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-[#F4C21B]">{h.badge}</span>
                <h3 className="mt-2 text-2xl font-black">{h.title}</h3>
                <p className="mb-3 text-sm text-[#F7F3EA]/60">{h.subtitle}</p>
                <p className="mb-5 text-sm leading-relaxed text-[#F7F3EA]/80">{h.description}</p>
                <a href={h.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-[#F4C21B] px-4 py-2 text-sm font-semibold text-[#1B1B1B]">
                  Adquirir <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <div>
          <h2 className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            <Gamepad2 className="h-4 w-4" /> Simuladores de producción <span className="font-normal normal-case text-[#1B1B1B]/55">· Python / Pygame</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {juegos.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.06} className="h-full">
                <article className={`${card} flex h-full flex-col p-5`}>
                  <span className={`${badgeCls} self-start`}>{j.badge}</span>
                  <h3 className="mt-3 text-lg font-bold leading-tight">{j.title}</h3>
                  <p className="mb-2 text-sm font-semibold text-[#1B1B1B]/60">{j.subtitle}</p>
                  <p className="mb-3 flex-1 text-sm leading-relaxed text-[#1B1B1B]/75">{j.description}</p>
                  <p className="mb-4 flex items-center gap-1.5 text-xs font-semibold">
                    <Download className="h-3.5 w-3.5" /> {j.demoLevels}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a href={j.hotmartUrl} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                      <Lock className="h-3.5 w-3.5" /> Versión completa
                    </a>
                    <a href={j.repoUrl} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
                      Demo gratis
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
          <Gift className="h-4 w-4" /> Recursos gratuitos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gratuitos.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={i * 0.04} className="h-full">
                <a
                  href={r.url}
                  target={r.url.startsWith("/") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-4 rounded-2xl border-2 border-[#1B1B1B] bg-white/60 p-5 transition-all hover:-translate-y-1 hover:bg-[#F4C21B] hover:shadow-[5px_5px_0_#1B1B1B]"
                >
                  <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">
                    <span className="block font-bold leading-tight">{r.title}</span>
                    <span className="mt-1 block text-sm text-[#1B1B1B]/70">{r.description}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
