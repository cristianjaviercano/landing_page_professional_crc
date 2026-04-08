import Link from "next/link";
import { ArrowLeft, GraduationCap, Award, BookOpen, Users } from "lucide-react";

const education = [
  {
    type: "pregrado",
    title: "Ingeniería Industrial",
    institution: "Universidad",
    period: "2015 - 2020",
    description: "Formación integral en gestión de procesos, producción, operaciones y logística. Projetos de grado en optimización de cadenas de suministro.",
    highlights: ["Gestión de Producción", "Logística y Cadena de Suministro", "Optimización de Procesos"]
  },
  {
    type: "posgrado",
    title: "Especialización en Logística",
    institution: "Universidad",
    period: "2021 - 2022",
    description: "Posgrado especializado en gestión logística, distribución, almacenaje y tecnologías de información aplicadas a operaciones.",
    highlights: ["Gestión de Almacenes", "Transporte y Distribución", "Sistemas Logísticos"]
  }
];

const certifications = [
  {
    title: "Certificación en Gestión de Cadena de Suministro",
    issuer: "Institución",
    year: "2023",
    icon: Award
  },
  {
    title: "Certificación en Liderazgo y Gestión de Equipos",
    issuer: "Institución",
    year: "2022",
    icon: Award
  },
  {
    title: "Certificación en Análisis de Datos para Operaciones",
    issuer: "Institución",
    year: "2022",
    icon: Award
  }
];

const experience = [
  {
    role: "Docente Universitario",
    organization: "Universidad",
    period: "2022 - Presente",
    description: "Docencia en cursos de logística, gestión de operaciones e investigación de operaciones. Desarrollo de material académico y plataformas educativas.",
    type: "Docencia"
  },
  {
    role: "Coordinador de Operaciones",
    organization: "Sector Industrial",
    period: "2020 - 2022",
    description: "Gestión de operaciones logísticas, control de inventarios y optimización de procesos de distribución.",
    type: "Profesional"
  }
];

export default function FormacionPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold mb-4">Formación y Experiencia</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Trayectoria académica y profesional enfocada en ingeniería industrial y logística
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            Formación Académica
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        edu.type === 'pregrado' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {edu.type === 'pregrado' ? 'Pregrado' : 'Posgrado'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{edu.title}</h3>
                    <p className="text-lg text-slate-600 mb-4">{edu.institution}</p>
                    <p className="text-slate-600 leading-relaxed mb-4">{edu.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((h) => (
                        <span key={h} className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-sm">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right flex-shrink-0">
                    <p className="text-slate-500 font-medium">{edu.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-green-600" />
            Experiencia Profesional
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-2 inline-block">
                      {exp.type}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{exp.role}</h3>
                    <p className="text-lg text-slate-600 mb-3">{exp.organization}</p>
                    <p className="text-slate-600">{exp.description}</p>
                  </div>
                  <div className="md:text-right flex-shrink-0">
                    <p className="text-slate-500 font-medium">{exp.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <Award className="w-8 h-8 text-purple-600" />
            Certificaciones
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                <cert.icon className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{cert.title}</h3>
                <p className="text-slate-600 text-sm mb-1">{cert.issuer}</p>
                <p className="text-slate-500 text-sm">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Interesado en trabajar juntos?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Estoy disponible para colaboraciones, proyectos y oportunidades profesionales en logística y gestión de operaciones.
          </p>
          <Link 
            href="/contacto" 
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Contactar <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}