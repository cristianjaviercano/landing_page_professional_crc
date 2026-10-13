import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy standalone pages were folded into the home page sections and /cv.
  async redirects() {
    return [
      { source: "/proyectos", destination: "/#proyectos", permanent: false },
      { source: "/contacto", destination: "/#conectar", permanent: false },
      { source: "/formacion", destination: "/cv", permanent: false },
      { source: "/productos", destination: "/aprende", permanent: false },
    ];
  },
};

export default nextConfig;
