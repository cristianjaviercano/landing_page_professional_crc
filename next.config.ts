import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts (es / en) leave no single layout to compose a 404 from.
    globalNotFound: true,
  },
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
