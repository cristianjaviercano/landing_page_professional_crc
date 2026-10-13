import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookHeart, Boxes, Gamepad2, Mail, Music } from "lucide-react";
import Hero from "./components/hero/Hero";
import About from "./components/home/About";
import Career from "./components/home/Career";
import Projects from "./components/home/Projects";
import QueueLab from "./components/home/QueueLab";
import Reveal from "./components/home/Reveal";
import SectionHeading, { Mark } from "./components/home/SectionHeading";
import PersonJsonLd from "./components/PersonJsonLd";
import { InstagramIcon, LinkedInIcon } from "./components/SocialIcons";
import { anylogic, contact, courses, games, music, stories } from "./data/profile";

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <About />

      <section id="trayectoria" className={`${shell} scroll-mt-20 py-24`}>
        <SectionHeading index="02" kicker="trayectoria" title={<>16 años entre <Mark>planta</Mark> y aula.</>}>
          Operaciones en manufactura multinacional, docencia de pregrado y maestría, e investigación aplicada con la industria.
        </SectionHeading>
        <Career />
      </section>

      <section id="proyectos" className="scroll-mt-20 border-y-2 border-[#1B1B1B] bg-[#F4C21B]/10 py-24">
        <div className={shell}>
          <SectionHeading index="03" kicker="proyectos" title={<>Herramientas que ya <Mark>operan</Mark>.</>}>
            Casos de estudio documentados y aplicaciones en producción para inventarios, calidad, última milla y gestión académica.
          </SectionHeading>
          <Projects />
        </div>
      </section>

      <section id="simulacion" className={`${shell} scroll-mt-20 py-24`}>
        <SectionHeading index="04" kicker="laboratorio" title={<>Juega con una <Mark>cola</Mark>.</>}>
          Ajusta la tasa de llegadas λ y de servicio μ y compara la teoría M/M/1 con lo que ocurre en la simulación. Acerca ρ a 1 y
          observa por qué la capacidad ociosa no es desperdicio.
        </SectionHeading>
        <Reveal>
          <QueueLab />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
              <Boxes className="h-4 w-4" /> Modelos en AnyLogic Cloud
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
              <Gamepad2 className="h-4 w-4" /> Minijuegos y retos
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

      <section id="cursos" className="scroll-mt-20 border-y-2 border-[#1B1B1B] bg-[#F7F3EA] py-24">
        <div className={shell}>
          <SectionHeading index="05" kicker="cursos" title={<>Aprende <Mark>gratis</Mark>.</>}>
            Material académico abierto: logística, redes, despacho y fabricación de agentes de IA.
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
                  <h3 className="mb-1 text-lg font-bold leading-tight">{c.title}</h3>
                  <p className="flex-1 text-sm text-[#1B1B1B]/70">{c.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                    Abrir curso <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link
              href="/aprende"
              className="group flex flex-col items-start justify-between gap-4 rounded-2xl border-2 border-[#1B1B1B] bg-[#1B1B1B] p-6 text-[#F7F3EA] sm:flex-row sm:items-center"
            >
              <span>
                <span className="font-hand block text-2xl text-[#F4C21B]">aprende & apoya</span>
                <span className="text-xl font-bold">Libros, herramientas y recursos de logística y simulación</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-[#F4C21B] px-4 py-2 font-semibold text-[#1B1B1B]">
                Ver recursos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="creativo" className="scroll-mt-20 bg-[#1B1B1B] py-24 text-[#F7F3EA]">
        <div className={shell}>
          <SectionHeading invert index="06" kicker="el otro lado" title="Historias narradas por el viento.">
            Narrativa visual interactiva — ficción, fantasía y memoria — y música original.
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
                      <span className="block text-lg font-bold group-hover:text-[#F4C21B]">{s.title}</span>
                      <span className="text-sm text-[#F7F3EA]/60">{s.description}</span>
                    </span>
                  </a>
                ) : (
                  <div className="flex h-full items-start gap-4 rounded-2xl border-2 border-dashed border-[#F7F3EA]/15 p-5 opacity-60">
                    <BookHeart className="mt-1 h-5 w-5 flex-shrink-0" />
                    <span>
                      <span className="block text-lg font-bold">
                        {s.title} <span className="font-hand ml-1 text-xl text-[#F4C21B]">pronto</span>
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
            <p className="font-hand text-3xl">¿hablamos?</p>
            <h2 className="mx-auto mt-2 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">
              Optimicemos tu operación.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#1B1B1B]/75">
              Consultoría en logística y operaciones, formación corporativa, proyectos de innovación e investigación aplicada.
            </p>
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
