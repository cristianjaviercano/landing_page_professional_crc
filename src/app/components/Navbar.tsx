import Link from "next/link";
import { Package2, User, FolderOpen, Mail, GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Package2 className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl text-slate-800">Cano Mogollón</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Sobre Mí</span>
            </Link>
            <Link href="/proyectos" className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors">
              <FolderOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Proyectos</span>
            </Link>
            <Link href="/productos" className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors">
              <Package2 className="w-4 h-4" />
              <span className="text-sm font-medium">Productos</span>
            </Link>
            <Link href="/formacion" className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">Formación</span>
            </Link>
            <Link href="/contacto" className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">Contacto</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}