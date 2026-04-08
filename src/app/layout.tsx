import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cristian Cano Mogollón | Link in Bio",
  description: "Portafolio profesional - Proyectos de Logística, Optimización y Gestión de Operaciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen">
        <div className="rainbow-container">
          <div className="rainbow"></div>
          <div className="rainbow"></div>
          <div className="rainbow"></div>
          <div className="rainbow"></div>
          <div className="rainbow"></div>
        </div>
        <div className="glow-overlay"></div>
        <div className="content-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}