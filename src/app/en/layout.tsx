import "../globals.css";
import SiteShell, { siteMetadata } from "../components/SiteShell";

export const metadata = siteMetadata("en");

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
