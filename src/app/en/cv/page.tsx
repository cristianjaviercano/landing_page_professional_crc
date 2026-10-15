import type { Metadata } from "next";
import CvPage from "../../components/cv/CvPage";
import { getProfile, getUi } from "../../i18n";

export const metadata: Metadata = {
  title: getUi("en").meta.cvTitle,
  description: getProfile("en").headline,
  alternates: { canonical: "/en/cv", languages: { es: "/cv", en: "/en/cv" } },
};

export default function Page() {
  return <CvPage locale="en" />;
}
