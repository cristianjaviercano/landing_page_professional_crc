import Link from "next/link";
import { ArrowLeft, ExternalLink, Package, TrendingUp, BarChart3 } from "lucide-react";

const projects = [
  {
    id: "logistica-suite",
    title: "Logística Suite",
    description: "Plataforma educativa completa para la gestión de almacenaje, control de inventarios y optimización de procesos logísticos. Incluye módulos de进货, almacenamiento y distribución.",
    tags: ["React", "TypeScript", "Logística", "Educación"],
    icon: "L",
    color: "blue",
    demoUrl: "#",
    features: ["Gestión de Almacenamiento", "Control de Inventarios", "Módulos Educativos"]
  },
  {
    id: "optimizacion-redes",
    title: "Optimización en Redes",
    description: "Material académico interactivo para la enseñanza de optimización de redes logísticas. Incluye teoría, ejemplos y ejercicios prácticos sobre flujos, rutas y distribución.",
    tags: ["React", "Optimización", "Redes", "Educación"],
    icon: "O",
    color: "green",
    demoUrl: "#",
    features: ["Teoría de Grafos", "Optimización de Rutas", "Ejercicios Interactivos"]
  },
  {
    id: "gestion-almacenamiento",
    title: "Gestión de Almacenamiento",
    description: "Sistema de gestión para profundización en logística de almacenamiento. Laboratorio virtual con herramientas para análisis ABC, Layout, EOQ y KPIs.",
    tags: ["React", "Gestión", "Almacenamiento", "Laboratorio"],
    icon: "G",
    color: "purple",
    demoUrl: "#",
    features: ["Análisis ABC", "Layout de Almacén", "Cálculo de EOQ", "KPIs Logísticos"]
  },
  {
    id: "plataforma-cedi",
    title: "Plataforma CEDI",
    description: "Plataforma integral para la gestión de Centros de Distribución (CEDI). Sistema de información para control de operaciones logísticas.",
    tags: ["Gestión", "CEDI", "Operaciones"],
    icon: "C",
    color: "orange",
    demoUrl: "#",
    features: ["Control de Operaciones", "Gestión de Pedidos", "Reportes"]
  }
];

export default function ProyectosPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold mb-4">Proyectos</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Desarrollo de plataformas educativas y herramientas para la gestión logística y de operaciones
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow border border-slate-100">
                <div className={`bg-${project.color}-600 p-8`}>
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{project.icon}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">{project.title}</h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Características:</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-slate-600 text-sm">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline">
                      <ExternalLink className="w-4 h-4" /> Ver Demo
                    </button>
                    <button className="inline-flex items-center gap-2 text-slate-500 font-medium hover:text-slate-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg> Código
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">¿Interesado en colaboración?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Estoy siempre abierto a nuevos proyectos y oportunidades de colaboración en el ámbito de la logística y gestión de operaciones.
          </p>
          <Link 
            href="/contacto" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contactar <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}