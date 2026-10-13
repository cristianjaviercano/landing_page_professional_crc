import type { Metadata } from "next";
import CvPage from "../../components/cv/CvPage";
import { getProfile, getUi } from "../../i18n";

export const metadata: Metadata = {
  title: getUi("es").meta.cvTitle,
  description: getProfile("es").headline,
  alternates: { canonical: "/cv", languages: { es: "/cv", en: "/en/cv" } },
};

export default function Page() {
  return <CvPage locale="es" />;
}
