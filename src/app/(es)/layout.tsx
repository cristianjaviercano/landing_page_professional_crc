import "../globals.css";
import SiteShell, { siteMetadata } from "../components/SiteShell";

export const metadata = siteMetadata("es");

export default function SpanishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="es">{children}</SiteShell>;
}
