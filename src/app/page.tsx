import Image from "next/image";
import { ExternalLink, BookOpen, Code, GraduationCap, Mail, MapPin, Briefcase, ShoppingCart, DollarSign, Activity, Music } from "lucide-react";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const links = {
  products: [
    {
      title: "OptiStock Pro - Gestión de Inventarios",
      description: "Sistema completo de gestión de inventarios para empresas",
      url: "https://cristianjcanom.gumroad.com/l/Optistock",
      icon: ShoppingCart,
    },
  ],
  academic: [
    {
      title: "Logística - Curso",
      description: "Curso completo de gestión logística",
      url: "https://logiticcourse.vercel.app",
      icon: BookOpen,
    },
    {
      title: "Optimización en Redes - Curso y Laboratorio",
      description: "Technology Presentation - Material académico interactivo",
      url: "https://technology-presentation.vercel.app",
      icon: BookOpen,
    },
    {
      title: "Contenidos Académicos - GitBook",
      description: "Gestión Logística y Operaciones de Despacho",
      url: "https://crcbookshell.gitbook.io/cristian-s-bookshell/logistics-management/technical-in-advanced-dispatch-operations/session-1-foundations-of-dispatch-management-and-dispatch-information-systems-dis/task-session-1",
      icon: GraduationCap,
    },
  ],
  projects: [
    {
      title: "OptiStock Pro 3.0",
      description: "Sistema avanzado de gestión de inventarios",
      url: "https://optistockpro3-0.vercel.app",
      icon: Code,
    },
    {
      title: "OptiStock Lite 2.0",
      description: "Versión ligera de control de stock",
      url: "https://optistock-lite.vercel.app",
      icon: Code,
    },
    {
      title: "Textil App",
      description: "Nivelador de capacidad textil",
      url: "https://textilapp.vercel.app",
      icon: Code,
    },
    {
      title: "Sistema RAS - Pisicultura",
      description: "Control de sistema de recirculación acuática",
      url: "https://pisiculture-app.vercel.app",
      icon: Code,
    },
  ],
  social: [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/msccristianjcanom/",
      icon: LinkedInIcon,
    },
    {
      title: "Instagram",
      url: "https://www.instagram.com/crcjm11/",
      icon: InstagramIcon,
    },
    {
      title: "Email",
      url: "mailto:msccristianjcanom@gmail.com",
      icon: Mail,
    },
  ],
  anylogic: [
    { title: "Glorieta Mocari", url: "https://cloud.anylogic.com/model/8ec15dce-ada1-449a-ae1e-caae624f7881" },
    { title: "Rutas de Montería", url: "https://cloud.anylogic.com/model/e9b4aa43-d156-4291-b597-99d64b942e69" },
    { title: "Zapatería", url: "https://cloud.anylogic.com/model/6b72d628-dfef-4d0b-8e46-9167ff0aa3f7" },
    { title: "Simulación de Mantenimiento", url: "https://cloud.anylogic.com/model/68ec5281-f0dc-4958-9d0a-f515a90fdb43" },
    { title: "Gestión de Inventario", url: "https://cloud.anylogic.com/model/64808b15-d471-4a56-891e-78a596fea899" }
  ],
  music: [
    { title: "Música para Orar", description: "Suno Playlist", url: "https://suno.com/playlist/85fb4b22-d87e-4603-bfd1-c6e0bd68f138" },
    { title: "Para Escuchar y Compartir", description: "Suno Playlist", url: "https://suno.com/playlist/89655a90-f031-4a94-9ff0-6cda579d8259" }
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image
              src="/amarillo.png"
              alt="Cristian Javier Cano Mogollón"
              fill
              className="rounded-full object-cover border-4 border-slate-700"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-1">Cristian Javier Cano Mogollón</h1>
          
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>Colombia</span>
          </div>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Ingeniero Industrial • Magister en Gestión de la Innovación<br />
            Universidad Tecnológica de Bolívar
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium border border-blue-600/30">
              +16 años experiencia profesional
            </span>
            <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs font-medium border border-purple-600/30">
              +6 años experiencia académica
            </span>
            <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs font-medium border border-green-600/30">
              Manufactura • Logística • Consumo Masivo
            </span>
          </div>
          
          <p className="text-slate-400 text-sm">
            Profesional bilingue especializado en gestión logística, gestión de operaciones, 
            desarrollo de procesos y formulación de proyectos operativos.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Productos
            </h2>
            <div className="space-y-3">
              {links.products.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-amber-600/20 to-orange-600/20 hover:from-amber-600/30 hover:to-orange-600/30 border border-amber-600/30 hover:border-amber-500/50 rounded-xl p-4 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/30 transition-colors">
                      <link.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate">{link.title}</h3>
                      <p className="text-amber-200/70 text-xs truncate">{link.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Cursos Académicos
            </h2>
            <div className="space-y-3">
              {links.academic.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 rounded-xl p-4 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors">
                      <link.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate">{link.title}</h3>
                      <p className="text-slate-400 text-xs truncate">{link.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Proyectos Operativos
            </h2>
            <div className="space-y-3">
              {links.projects.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 rounded-xl p-4 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600/30 transition-colors">
                      <link.icon className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate">{link.title}</h3>
                      <p className="text-slate-400 text-xs truncate">{link.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Simulación con AnyLogic
            </h2>
            <div className="space-y-3">
              {links.anylogic.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-purple-600/50 rounded-xl p-4 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600/30 transition-colors">
                      <Activity className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate">{link.title}</h3>
                      <p className="text-slate-400 text-xs truncate">Ver modelo interactivo</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Music className="w-4 h-4" />
              Música
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {links.music.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-pink-600/50 rounded-xl p-4 transition-all group text-left"
                >
                  <div className="w-8 h-8 bg-pink-600/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-pink-600/30 transition-colors">
                    <Music className="w-4 h-4 text-pink-400" />
                  </div>
                  <h3 className="text-white font-medium text-sm truncate">{link.title}</h3>
                  <p className="text-slate-400 text-xs truncate mt-1">{link.description}</p>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Conectar
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {links.social.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 rounded-xl p-4 transition-all group"
                  >
                    <IconComponent className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-white text-xs font-medium">{link.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        <footer className="mt-12 text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} Cristian Javier Cano Mogollón</p>
        </footer>
      </div>
    </div>
  );
}