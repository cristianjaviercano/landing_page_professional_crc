import Link from "next/link";
import { ExternalLink, BookOpen, Wrench, GraduationCap, Gift, ArrowLeft, Gamepad2, FileText, Download, Lock } from "lucide-react";

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

const gameColorMap: Record<string, { bg: string; border: string; badge: string; btn: string; tag: string; accent: string }> = {
  orange: {
    bg: "bg-orange-950/30",
    border: "border-orange-700/40",
    badge: "bg-orange-700/40 text-orange-300",
    btn: "bg-orange-600 hover:bg-orange-500",
    tag: "bg-orange-900/40 text-orange-400",
    accent: "text-orange-400",
  },
  cyan: {
    bg: "bg-cyan-950/30",
    border: "border-cyan-700/40",
    badge: "bg-cyan-700/40 text-cyan-300",
    btn: "bg-cyan-600 hover:bg-cyan-500",
    tag: "bg-cyan-900/40 text-cyan-400",
    accent: "text-cyan-400",
  },
};

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
    url: "/historias/",
    icon: BookOpen,
    tag: "Gratis",
  },
  {
    title: "Curso: Fabricación de Agentes de IA",
    description: "Curso completo interactivo — metodología de Línea de Producción Multi-Agente, desde primeros pasos hasta orquestación con MCP y casos prácticos.",
    url: "/cursos/agentes-ia/",
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

const colorMap: Record<string, { bg: string; border: string; badge: string; badgeText: string; btn: string; tag: string; tagText: string }> = {
  blue: {
    bg: "bg-blue-950/30",
    border: "border-blue-800/40",
    badge: "bg-blue-800/40 text-blue-300",
    badgeText: "",
    btn: "bg-blue-600 hover:bg-blue-500",
    tag: "bg-blue-900/40 text-blue-400",
    tagText: "",
  },
  purple: {
    bg: "bg-purple-950/30",
    border: "border-purple-800/40",
    badge: "bg-purple-800/40 text-purple-300",
    badgeText: "",
    btn: "bg-purple-600 hover:bg-purple-500",
    tag: "bg-purple-900/40 text-purple-400",
    tagText: "",
  },
  indigo: {
    bg: "bg-indigo-950/30",
    border: "border-indigo-800/40",
    badge: "bg-indigo-800/40 text-indigo-300",
    badgeText: "",
    btn: "bg-indigo-600 hover:bg-indigo-500",
    tag: "bg-indigo-900/40 text-indigo-400",
    tagText: "",
  },
  green: {
    bg: "bg-green-950/30",
    border: "border-green-800/40",
    badge: "bg-green-800/40 text-green-300",
    badgeText: "",
    btn: "bg-green-600 hover:bg-green-500",
    tag: "bg-green-900/40 text-green-400",
    tagText: "",
  },
};

export default function AprendePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-10">

        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white mb-2">Aprende &amp; Apoya</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Recursos para seguir aprendiendo — libros, herramientas y contenido gratuito en logística, simulación y narrativa.
            Al adquirir un producto apoyas la creación de más contenido libre.
          </p>
        </div>

        {/* Libros */}
        <section className="mb-10">
          <h2 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-orange-400" />
            Libros y Novelas
            <span className="ml-auto text-xs text-slate-500">disponibles en Hotmart</span>
          </h2>
          <div className="space-y-4">
            {libros.map((libro, i) => {
              const c = colorMap[libro.color];
              const Icon = libro.icon;
              return (
                <div key={i} className={`rounded-2xl border p-5 ${c.bg} ${c.border}`}>
                  <div className="flex items-start gap-4">
                    {libro.cover && (
                      <img
                        src={libro.cover}
                        alt={libro.title}
                        className="w-16 h-20 object-cover rounded-lg flex-shrink-0 shadow-lg"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>{libro.badge}</span>
                        <span className="text-xs text-slate-500">{libro.platform}</span>
                      </div>
                      <h3 className="text-white font-bold text-base leading-tight">{libro.title}</h3>
                      <p className="text-slate-400 text-xs mt-0.5 mb-2">{libro.subtitle}</p>
                      <p className="text-slate-400 text-xs leading-relaxed mb-3">{libro.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {libro.tags.map((tag) => (
                          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${c.tag}`}>{tag}</span>
                        ))}
                      </div>
                      <a
                        href={libro.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${c.btn}`}
                      >
                        Adquirir <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Herramientas */}
        <section className="mb-10">
          <h2 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-green-400" />
            Herramientas Profesionales
            <span className="ml-auto text-xs text-slate-500">disponibles en Gumroad</span>
          </h2>
          <div className="space-y-4">
            {herramientas.map((h, i) => {
              const c = colorMap[h.color];
              const Icon = h.icon;
              return (
                <div key={i} className={`rounded-2xl border p-5 ${c.bg} ${c.border}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.badge}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>{h.badge}</span>
                        <span className="text-xs text-slate-500">{h.platform}</span>
                      </div>
                      <h3 className="text-white font-bold text-base">{h.title}</h3>
                      <p className="text-slate-400 text-xs mt-0.5 mb-2">{h.subtitle}</p>
                      <p className="text-slate-400 text-xs leading-relaxed mb-3">{h.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {h.tags.map((tag) => (
                          <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${c.tag}`}>{tag}</span>
                        ))}
                      </div>
                      <a
                        href={h.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${c.btn}`}
                      >
                        Adquirir <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Juegos / Simuladores */}
        <section className="mb-10">
          <h2 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-orange-400" />
            Simuladores de Producción
            <span className="ml-auto text-xs text-slate-500">Python / Pygame · Demo gratis</span>
          </h2>
          <div className="space-y-4">
            {juegos.map((j, i) => {
              const c = gameColorMap[j.color];
              return (
                <div key={i} className={`rounded-2xl border p-5 ${c.bg} ${c.border}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.badge}`}>
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>{j.badge}</span>
                        <span className="text-xs text-slate-500">{j.platform}</span>
                      </div>
                      <h3 className="text-white font-bold text-base">{j.title}</h3>
                      <p className="text-slate-400 text-xs mt-0.5">{j.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">{j.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {j.tags.map((tag) => (
                      <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${c.tag}`}>{tag}</span>
                    ))}
                  </div>
                  <div className={`text-xs mb-3 flex items-center gap-1 ${c.accent}`}>
                    <Download className="w-3 h-3" />
                    {j.demoLevels}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={j.hotmartUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${c.btn}`}
                    >
                      <Lock className="w-3 h-3" /> Versión Completa
                    </a>
                    <a
                      href={j.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-300 text-xs px-3 py-2 rounded-lg border border-slate-700 hover:border-slate-500 hover:text-white transition-colors"
                    >
                      <Download className="w-3 h-3" /> Demo gratis
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gratuitos */}
        <section>
          <h2 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <Gift className="w-4 h-4 text-yellow-400" />
            Recursos Gratuitos
          </h2>
          <div className="space-y-3">
            {gratuitos.map((r, i) => {
              const Icon = r.icon;
              return (
                <a
                  key={i}
                  href={r.url}
                  target={r.url.startsWith("/") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:border-yellow-500/30 rounded-xl p-4 transition-all group"
                >
                  <div className="w-9 h-9 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                    <Icon className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium text-sm truncate">{r.title}</h3>
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full flex-shrink-0">{r.tag}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 truncate">{r.description}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-yellow-400 transition-colors flex-shrink-0" />
                </a>
              );
            })}
          </div>
        </section>

        <div className="mt-12 text-center text-slate-600 text-xs">
          <p>© {new Date().getFullYear()} Cristian Javier Cano Mogollón</p>
        </div>
      </div>
    </div>
  );
}
