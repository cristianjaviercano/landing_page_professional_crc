import { ArrowUpRight, CalendarCheck, Factory, Lightbulb, LineChart, Presentation } from "lucide-react";
import type { Service } from "../../data/profile";
import { getProfile, getUi, type Locale } from "../../i18n";
import Reveal from "./Reveal";
import SectionHeading, { titleWithMark } from "./SectionHeading";

const icons: Record<Service["id"], typeof Factory> = {
  ops: Factory,
  sim: LineChart,
  training: Presentation,
  innovation: Lightbulb,
};

export default function Services({ locale, index }: { locale: Locale; index: string }) {
  const t = getUi(locale).services;
  const { services, contact, bookingUrl } = getProfile(locale);

  const mailto = (s: Service) =>
    `mailto:${contact.email}?subject=${encodeURIComponent(s.subject)}&body=${encodeURIComponent(t.mailBody)}`;

  return (
    <section id="servicios" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading index={index} kicker={t.kicker} title={titleWithMark(t.title)}>
        {t.lead}
      </SectionHeading>

      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = icons[s.id];
          return (
            <Reveal key={s.id} delay={i * 0.06} className="h-full">
              <article className="group flex h-full flex-col rounded-2xl border-2 border-[#1B1B1B] bg-[#F7F3EA] p-6 shadow-[5px_5px_0_#1B1B1B] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_#F4C21B]">
                <div className="mb-4 flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-[#1B1B1B] bg-[#F4C21B]">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-3xl font-black text-[#1B1B1B]/15">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold leading-tight">{s.title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-[#1B1B1B]/75">{s.description}</p>
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-[#1B1B1B]/[0.07] px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={mailto(s)}
                    className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#1B1B1B] bg-[#1B1B1B] px-4 py-2 text-sm font-semibold text-[#F4C21B] transition-transform hover:-translate-y-0.5"
                  >
                    {t.cta} <ArrowUpRight className="h-4 w-4" />
                  </a>
                  {bookingUrl && (
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#1B1B1B] bg-white/70 px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#F4C21B]"
                    >
                      <CalendarCheck className="h-4 w-4" /> {t.book}
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
