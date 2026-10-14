import Image from "next/image";
import { useLocale } from "../../i18n/LocaleProvider";

const links = [
  { key: "projects", target: "proyectos" },
  { key: "lab", target: "simulacion" },
  { key: "courses", target: "cursos" },
  { key: "contact", target: "conectar" },
] as const;

/** Static stand-in for the 3D plant: used when WebGL is unavailable or the scene fails. */
export default function SceneFallback() {
  const { t, path } = useLocale();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <Image src="/hero-fallback.webp" alt="" width={991} height={889} priority className="max-h-[78%] w-auto max-w-full object-contain" />
      <ul className="flex flex-wrap justify-center gap-2">
        {links.map((l) => (
          <li key={l.key}>
            <a
              href={path(`/#${l.target}`)}
              className="font-hand inline-block rounded-md border-2 border-[#1B1B1B] bg-[#F7F3EA] px-3 py-0.5 text-xl leading-tight shadow-[3px_3px_0_#1B1B1B] transition-colors hover:bg-[#F4C21B]"
            >
              {t.hero.stations[l.key]} ↘
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
