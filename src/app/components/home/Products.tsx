import { ArrowUpRight, CalendarCheck, Check, Rocket } from "lucide-react";
import { getProfile, getUi, type Locale } from "../../i18n";
import Reveal from "./Reveal";
import SectionHeading, { titleWithMark } from "./SectionHeading";

export default function Products({ locale, index }: { locale: Locale; index: string }) {
  const t = getUi(locale).products;
  const { products, contact, bookingUrl } = getProfile(locale);

  const mailto = (subject: string) =>
    `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(t.mailBody)}`;

  return (
    <section id="producto" className="scroll-mt-20 border-y-2 border-[#1B1B1B] bg-[#1B1B1B] py-24 text-[#F7F3EA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading invert index={index} kicker={t.kicker} title={titleWithMark(t.title)}>
          {t.lead}
        </SectionHeading>

        {products.map((p) => (
          <Reveal key={p.id}>
            <article className="grid gap-8 rounded-2xl border-2 border-[#F4C21B] bg-[#1B1B1B] p-6 shadow-[8px_8px_0_#F4C21B] sm:p-8 lg:grid-cols-[1.1fr_1fr]">
              <div className="flex flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-[#F4C21B] bg-[#F4C21B] text-[#1B1B1B]">
                    <Rocket className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span className="rounded-full border-2 border-[#F4C21B] px-3 py-0.5 font-mono text-xs font-bold uppercase tracking-wide text-[#F4C21B]">
                    {p.status}
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-black leading-tight sm:text-3xl">{p.name}</h3>
                <p className="mb-4 text-[15px] leading-relaxed text-[#F7F3EA]/80">{p.summary}</p>
                <p className="mb-5 text-sm font-semibold text-[#F4C21B]">{p.offer}</p>
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-[#F7F3EA]/10 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  <a
                    href={mailto(p.subject)}
                    className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#F4C21B] bg-[#F4C21B] px-4 py-2 text-sm font-semibold text-[#1B1B1B] transition-transform hover:-translate-y-0.5"
                  >
                    {t.cta} <ArrowUpRight className="h-4 w-4" />
                  </a>
                  {bookingUrl && (
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#F7F3EA]/40 px-4 py-2 text-sm font-semibold transition-colors hover:border-[#F4C21B] hover:text-[#F4C21B]"
                    >
                      <CalendarCheck className="h-4 w-4" /> {t.book}
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#F4C21B]">{t.includes}</h4>
                <ul className="space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px] leading-snug">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F4C21B]" strokeWidth={3} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-[#F7F3EA]/15 pt-4 text-xs leading-relaxed text-[#F7F3EA]/60">{p.note}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
