import Link from "next/link";
import { ArrowLeft, Package, FileSpreadsheet, BookOpen, Calculator, BarChart } from "lucide-react";

const products = [
  {
    id: "material-educativo",
    title: "Material Educativo",
    description: "Presentaciones, guías y recursos didácticos para la enseñanza de logística, gestión de operaciones y optimización de procesos.",
    icon: BookOpen,
    color: "blue",
    items: [
      "Presentaciones interactivas",
      "Guías de estudio",
      "Ejercicios prácticos",
      "Casos de estudio"
    ]
  },
  {
    id: "herramientas-calculo",
    title: "Herramientas de Cálculo",
    description: "Calculadoras y herramientas para análisis logístico: EOQ, análisis ABC, Layout de almacén, KPIs y más.",
    icon: Calculator,
    color: "green",
    items: [
      "Calculadora de EOQ",
      "Análisis ABC automático",
      "Cálculo de layout",
      "Indicadores KPI"
    ]
  },
  {
    id: "plantillas-excel",
    title: "Plantillas Excel",
    description: "Plantillas profesionales para gestión de inventarios, control de almacén y análisis de operaciones.",
    icon: FileSpreadsheet,
    color: "purple",
    items: [
      "Control de inventarios",
      "Gestión de almacén",
      "Análisis de demanda",
      "Reportes operativos"
    ]
  },
  {
    id: "plataformas-web",
    title: "Plataformas Web",
    description: "Aplicaciones y sistemas web para gestión logística, simulación de operaciones y seguimiento de procesos.",
    icon: Package,
    color: "orange",
    items: [
      "Sistemas de gestión",
      "Plataformas educativas",
      "Dashboards operativos",
      "Simuladores logísticos"
    ]
  }
];

export default function ProductosPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold mb-4">Productos</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Recursos, herramientas y materiales para la educación y gestión logística
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-slate-100">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-${product.color}-100 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <product.icon className={`w-8 h-8 text-${product.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">{product.title}</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">{product.description}</p>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-slate-800">Incluye:</h3>
                      {product.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-slate-600">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas un producto personalizado?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Desarrollo herramientas y materiales adaptados a tus necesidades específicas. 
            Contáctame para discutir tu proyecto.
          </p>
          <Link 
            href="/contacto" 
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Solicitar información <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}