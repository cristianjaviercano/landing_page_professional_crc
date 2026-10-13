import Image from "next/image";
import { Factory, GraduationCap, BrainCircuit, MapPin } from "lucide-react";
import { contact, summary } from "../../data/profile";
import SectionHeading, { Mark } from "./SectionHeading";
import Reveal from "./Reveal";

const pillars = [
  {
    icon: Factory,
    title: "Operaciones & Logística",
    text: "Planeación MPS/MRP, abastecimiento, inventarios, despacho y KPIs de planta en manufactura multinacional.",
  },
  {
    icon: GraduationCap,
    title: "Docencia & Investigación",
    text: "Pregrado y maestría en cuatro universidades; semilleros SILOGE y SIPROI; proyectos por madurez TRL.",
  },
  {
    icon: BrainCircuit,
    title: "IA & Innovación abierta",
    text: "Metodología HIS, analítica predictiva, simulación y agentes de IA aplicados a retos reales de la industria.",
  },
];

export default function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-[#1B1B1B] bg-[#1B1B1B]" />
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border-2 border-[#1B1B1B] bg-[#F4C21B]">
            <Image src="/amarillo.png" alt="Cristian Javier Cano Mogollón" fill sizes="(min-width: 1024px) 384px, 90vw" className="object-cover" />
          </div>
          <p className="font-hand absolute -bottom-10 left-2 rotate-[-4deg] text-2xl">
            <MapPin className="mr-1 inline h-5 w-5" />
            {contact.location}
          </p>
        </Reveal>

        <div>
          <SectionHeading index="01" kicker="sobre mí" title={<>De la planta al aula, <Mark>con datos</Mark>.</>}>
            {summary}
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl border-2 border-[#1B1B1B] bg-[#F7F3EA] p-5 shadow-[4px_4px_0_#1B1B1B] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_#F4C21B]">
                  <p.icon className="mb-3 h-7 w-7" strokeWidth={1.8} />
                  <h3 className="mb-1 font-bold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-[#1B1B1B]/70">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
