import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { CvItem } from "../../data/profile";
import { getProfile, getUi, localePath, type Locale } from "../../i18n";
import PrintButton from "./PrintButton";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 print:mb-2 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em]">
        <span className="h-3 w-3 rounded-sm bg-[#F4C21B] ring-2 ring-[#1B1B1B]" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Items({ items }: { items: CvItem[] }) {
  return (
    <div className="space-y-5 print:space-y-2.5">
      {items.map((it) => (
        <article key={it.role + it.period} className="grid gap-1 break-inside-avoid sm:grid-cols-[130px_1fr] sm:gap-5 print:grid-cols-[110px_1fr]">
          <p className="font-mono text-xs font-bold text-[#1B1B1B]/65 sm:pt-1">{it.period}</p>
          <div>
            <h3 className="font-bold leading-snug">{it.role}</h3>
            <p className="text-sm text-[#1B1B1B]/70">
              {it.org}
              {it.place && ` · ${it.place}`}
            </p>
            {it.points.length > 0 && (
              <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-sm leading-relaxed text-[#1B1B1B]/80 marker:text-[#1B1B1B]/40">
                {it.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function CvPage({ locale }: { locale: Locale }) {
  const t = getUi(locale).cv;
  const { academia, contact, education, headline, industry, languages, skills, summary } = getProfile(locale);
  return (
    <div className="px-4 py-10 sm:px-6 print:p-0">
      <div className="no-print mx-auto mb-6 flex max-w-4xl items-center justify-between gap-4">
        <Link href={localePath(locale, "/#trayectoria")} className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">
          <ArrowLeft className="h-4 w-4" /> {t.back}
        </Link>
        <PrintButton label={t.download} />
      </div>

      <article className="mx-auto max-w-4xl space-y-9 rounded-2xl print:space-y-4 print:text-[9.5pt] print:leading-snug border-2 border-[#1B1B1B] bg-white p-6 shadow-[8px_8px_0_#1B1B1B] sm:p-10 print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none">
        <header className="border-b-2 border-[#1B1B1B] pb-6">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl print:text-4xl">
            Cristian Javier <span className="bg-[#F4C21B] px-1">Cano Mogollón</span>
          </h1>
          <p className="mt-3 font-semibold">{headline}</p>
          <p className="mt-2 font-mono text-xs text-[#1B1B1B]/70">
            {contact.email} · {contact.linkedin.replace("https://www.", "")} · {contact.location}
          </p>
        </header>

        <Section title={t.profile}>
          <p className="leading-relaxed text-[#1B1B1B]/85">{summary}</p>
        </Section>

        <Section title={t.industry}>
          <Items items={industry} />
        </Section>

        <Section title={t.academia}>
          <Items items={academia} />
        </Section>

        <Section title={t.education}>
          <Items items={education} />
        </Section>

        <Section title={t.skills}>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group}>
                <p className="text-sm font-bold">{s.group}</p>
                <p className="text-sm text-[#1B1B1B]/75">{s.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={t.languages}>
          <p className="text-sm">
            {languages.map((l, i) => (
              <span key={l.name}>
                {i > 0 && " · "}
                <strong>{l.name}</strong> — {l.level}
              </span>
            ))}
          </p>
          <p className="mt-6 text-xs text-[#1B1B1B]/65">{t.references}</p>
        </Section>
      </article>
    </div>
  );
}
