import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookHeart, Boxes, Gamepad2, Mail, Music } from "lucide-react";
import Hero from "../hero/Hero";
import About from "./About";
import Career from "./Career";
import Projects from "./Projects";
import Services from "./Services";
import LabTabs from "../lab/LabTabs";
import Reveal from "./Reveal";
import SectionHeading, { titleWithMark } from "./SectionHeading";
import LangChip from "../LangChip";
import PersonJsonLd from "../PersonJsonLd";
import { InstagramIcon, LinkedInIcon } from "../SocialIcons";
import { getProfile, getUi, type Locale } from "../../i18n";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = getUi(locale);
  const { anylogic, contact, courses, games, music, stories } = getProfile(locale);
  return (
    <>
      <PersonJsonLd locale={locale} />
      <Hero />
      <About locale={locale} />

      <section id="trayectoria" className={`${shell} scroll-mt-20 py-24`}>
        <SectionHeading index="02" kicker={t.career.kicker} title={titleWithMark(t.career.title)}>
          {t.career.lead}
        </SectionHeading>
        <Career />
      </section>

      <section id="proyectos" className="scroll-mt-20 border-y-2 border-[#1B1B1B] bg-[#F4C21B]/10 py-24">
        <div className={shell}>
          <SectionHeading index="03" kicker={t.projects.kicker} title={titleWithMark(t.projects.title)}>
            {t.projects.lead}
          </SectionHeading>
          <Projects />
        </div>
      </section>

      <section id="simulacion" className={`${shell} scroll-mt-20 py-24`}>
        <SectionHeading index="04" kicker={t.lab.kicker} title={titleWithMark(t.lab.title)}>
          {t.lab.lead}
        </SectionHeading>
        <Reveal>
          <LabTabs />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
              <Boxes className="h-4 w-4" /> {t.lab.anylogic}
            </h3>
            <ul className="divide-y-2 divide-[#1B1B1B]/10 rounded-2xl border-2 border-[#1B1B1B] bg-[#F7F3EA]">
              {anylogic.map((m) => (
                <li key={m.url}>
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-[#F4C21B]">
                    <span className="font-semibold">{m.title}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
              <Gamepad2 className="h-4 w-4" /> {t.lab.games}
            </h3>
            <div className="space-y-4">
              {games.map((g) => (
                <a
                  key={g.url}
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-[#1B1B1B] bg-[#1B1B1B] p-5 text-[#F7F3EA] shadow-[4px_4px_0_#F4C21B] transition-transform hover:-translate-y-1"
                >
                  <span>
                    <span className="block text-lg font-bold">{g.title}</span>
                    <span className="text-sm text-[#F7F3EA]/65">{g.description}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-[#F4C21B]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Services locale={locale} index="05" />

      <section id="cursos" className="scroll-mt-20 border-y-2 border-[#1B1B1B] bg-[#F7F3EA] py-24">
        <div className={shell}>
          <SectionHeading index="06" kicker={t.courses.kicker} title={titleWithMark(t.courses.title)}>
            {t.courses.lead}
          </SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((c, i) => (
              <Reveal key={c.url} delay={i * 0.06} className="h-full">
                <a
                  href={c.url}
                  target={c.url.startsWith("/") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border-2 border-[#1B1B1B] bg-white/60 p-5 transition-all hover:-translate-y-1 hover:bg-[#F4C21B] hover:shadow-[6px_6px_0_#1B1B1B]"
                >
                  <span className="mb-8 font-mono text-4xl font-black text-[#1B1B1B]/20 transition-colors group-hover:text-[#1B1B1B]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-1 text-lg font-bold leading-tight">
                    {c.title}
                    <LangChip lang={c.lang} />
                  </h3>
                  <p className="flex-1 text-sm text-[#1B1B1B]/70">{c.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                    {t.courses.open} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link
              href="/aprende"
              hrefLang="es"
              className="group flex flex-col items-start justify-between gap-4 rounded-2xl border-2 border-[#1B1B1B] bg-[#1B1B1B] p-6 text-[#F7F3EA] sm:flex-row sm:items-center"
            >
              <span>
                <span className="font-hand block text-2xl text-[#F4C21B]">{t.courses.resourcesKicker}</span>
                <span className="text-xl font-bold">{t.courses.resourcesTitle}</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-[#F4C21B] px-4 py-2 font-semibold text-[#1B1B1B]">
                {t.courses.resourcesCta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="creativo" className="scroll-mt-20 bg-[#1B1B1B] py-24 text-[#F7F3EA]">
        <div className={shell}>
          <SectionHeading invert index="07" kicker={t.creative.kicker} title={t.creative.title}>
            {t.creative.lead}
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05} className="h-full">
                {s.ready ? (
                  <a
                    href={s.url}
                    className="group flex h-full items-start gap-4 rounded-2xl border-2 border-[#F7F3EA]/15 p-5 transition-all hover:-translate-y-1 hover:border-[#F4C21B]"
                  >
                    <BookHeart className="mt-1 h-5 w-5 flex-shrink-0 text-[#F4C21B]" />
                    <span>
                      <span className="block text-lg font-bold group-hover:text-[#F4C21B]">
                        {s.title}
                        <LangChip lang={s.lang} />
                      </span>
                      <span className="text-sm text-[#F7F3EA]/60">{s.description}</span>
                    </span>
                  </a>
                ) : (
                  <div className="flex h-full items-start gap-4 rounded-2xl border-2 border-dashed border-[#F7F3EA]/15 p-5 opacity-60">
                    <BookHeart className="mt-1 h-5 w-5 flex-shrink-0" />
                    <span>
                      <span className="block text-lg font-bold">
                        {s.title} <span className="font-hand ml-1 text-xl text-[#F4C21B]">{t.creative.soon}</span>
                      </span>
                      <span className="text-sm text-[#F7F3EA]/60">{s.description}</span>
                    </span>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {music.map((m) => (
              <a
                key={m.url}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#F4C21B] px-4 py-2 text-sm font-semibold text-[#F4C21B] transition-colors hover:bg-[#F4C21B] hover:text-[#1B1B1B]"
              >
                <Music className="h-4 w-4" /> {m.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="conectar" className="scroll-mt-20 bg-[#F4C21B] py-24">
        <div className={`${shell} text-center`}>
          <Reveal>
            <p className="font-hand text-3xl">{t.contact.kicker}</p>
            <h2 className="mx-auto mt-2 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">
              {t.contact.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#1B1B1B]/75">{t.contact.lead}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#1B1B1B] bg-[#1B1B1B] px-6 py-3.5 font-semibold text-[#F4C21B] shadow-[4px_4px_0_#F7F3EA] transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-5 w-5" /> {contact.email}
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#1B1B1B] bg-[#F7F3EA] px-5 py-3.5 font-semibold shadow-[4px_4px_0_#1B1B1B] transition-transform hover:-translate-y-0.5"
              >
                <LinkedInIcon className="h-5 w-5" /> LinkedIn
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#1B1B1B] bg-[#F7F3EA] px-5 py-3.5 font-semibold shadow-[4px_4px_0_#1B1B1B] transition-transform hover:-translate-y-0.5"
              >
                <InstagramIcon className="h-5 w-5" /> @crcjm11
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
