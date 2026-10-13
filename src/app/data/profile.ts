export const siteUrl = "https://landing-page-professional-crc.vercel.app";

export const contact = {
  email: "cristianjaviercano@gmail.com",
  linkedin: "https://www.linkedin.com/in/msccristianjcanom/",
  instagram: "https://www.instagram.com/crcjm11/",
  location: "Montería, Córdoba — Colombia",
};

/**
 * Public booking page (Google Calendar appointment schedule, Cal.com, etc.).
 * While null, the "book a call" button is hidden and only the email CTA is shown.
 */
export const bookingUrl: string | null = null;

export type Service = {
  id: "ops" | "sim" | "training" | "innovation";
  title: string;
  description: string;
  tags: string[];
  /** Subject line for the pre-filled email. */
  subject: string;
};

export const services: Service[] = [
  {
    id: "ops",
    title: "Consultoría en operaciones y logística",
    description: "Diagnóstico y rediseño de procesos de producción, abastecimiento, inventarios y despacho, con KPIs claros: OEE, mermas y nivel de servicio.",
    tags: ["MPS/MRP", "Inventarios", "KPIs"],
    subject: "Consultoría en operaciones y logística",
  },
  {
    id: "sim",
    title: "Simulación y analítica",
    description: "Modelos de simulación y optimización, y tableros de control, para decidir con datos antes de invertir o cambiar la planta.",
    tags: ["AnyLogic", "GAMS", "Power BI"],
    subject: "Simulación y analítica",
  },
  {
    id: "training",
    title: "Formación corporativa y docencia",
    description: "Talleres, diplomados y cátedras en logística, gestión de proyectos, innovación e IA aplicada, para equipos y universidades.",
    tags: ["Logística", "Proyectos", "IA aplicada"],
    subject: "Formación corporativa",
  },
  {
    id: "innovation",
    title: "Innovación abierta e IA aplicada",
    description: "Del reto industrial al prototipo con la metodología HIS, planificado por niveles de madurez tecnológica (TRL 1–9).",
    tags: ["HIS", "TRL 1–9", "Prototipado"],
    subject: "Innovación abierta e IA aplicada",
  },
];

export type CaseStudy = {
  title: string;
  description: string;
  url: string;
  cover: string;
  tags: string[];
  /** Headline result taken from the case-study page itself. */
  metric?: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Auditoría RCA & Control Estadístico",
    description: "Cartas EWMA, capacidad Cp/Cpk y ranking cuantitativo de causas raíz para redes de distribución.",
    url: "/proyectos/rca-quality-control/index.html",
    cover: "/proyectos/rca-quality-control/cover.png",
    tags: ["SPC", "Python", "Calidad"],
    metric: { value: "87%", label: "de las quejas explicadas por 4 causas raíz" },
  },
  {
    title: "Plataforma de Última Milla",
    description: "Rendimiento de rutas e inventario para flotas de reparto: tiempo teórico vs. real por despacho.",
    url: "/proyectos/last-mile-performance/index.html",
    cover: "/proyectos/last-mile-performance/cover.png",
    tags: ["Logística", "Streamlit", "Rutas"],
    metric: { value: "24%", label: "más puntualidad en entregas de última milla" },
  },
  {
    title: "ZERO — Plataforma Académica",
    description: "Gestión de cursos, calificación y alertas tempranas de riesgo académico.",
    url: "/proyectos/zero-academic-platform/index.html",
    cover: "/proyectos/zero-academic-platform/cover.png",
    tags: ["EdTech", "Analítica", "Alertas"],
  },
  {
    title: "Modelo HIS — Innovación Abierta",
    description: "Hub de Soluciones Industriales: prototipado guiado por IA para I+D aplicada con la industria.",
    url: "/proyectos/his-innovation-model/index.html",
    cover: "/proyectos/his-innovation-model/cover.png",
    tags: ["Innovación", "IA", "TRL"],
    metric: { value: "48–72 h", label: "del concepto al prototipo funcional" },
  },
];

export const apps = [
  { title: "OptiStock Pro 3.0", description: "Gestión avanzada de inventarios", url: "https://optistockpro3-0.vercel.app", tag: "Inventarios" },
  { title: "OptiStock Lite 2.0", description: "Control de stock ligero", url: "https://optistock-lite.vercel.app", tag: "Inventarios" },
  { title: "Textil App", description: "Nivelador de capacidad textil", url: "https://textilapp.vercel.app/dashboard", tag: "Capacidad" },
  { title: "Sistema RAS", description: "Control de recirculación acuícola", url: "https://pisiculture-app.vercel.app", tag: "Agroindustria" },
];

export const courses = [
  {
    title: "Logística",
    description: "Curso completo de gestión logística.",
    url: "https://logiticcourse.vercel.app",
  },
  {
    title: "Optimización en Redes",
    description: "Curso y laboratorio interactivo de redes logísticas.",
    url: "https://technology-presentation.vercel.app",
  },
  {
    title: "Despacho Avanzado — GitBook",
    description: "Gestión logística y sistemas de información de despacho.",
    url: "https://crcbookshell.gitbook.io/cristian-s-bookshell/logistics-management/technical-in-advanced-dispatch-operations/session-1-foundations-of-dispatch-management-and-dispatch-information-systems-dis/task-session-1",
  },
  {
    title: "Fabricación de Agentes de IA",
    description: "Metodología de línea de producción multi-agente.",
    url: "/cursos/agentes-ia/index.html",
  },
];

export const anylogic = [
  { title: "Glorieta Mocarí", url: "https://cloud.anylogic.com/model/8ec15dce-ada1-449a-ae1e-caae624f7881" },
  { title: "Rutas de Montería", url: "https://cloud.anylogic.com/model/e9b4aa43-d156-4291-b597-99d64b942e69" },
  { title: "Zapatería", url: "https://cloud.anylogic.com/model/6b72d628-dfef-4d0b-8e46-9167ff0aa3f7" },
  { title: "Mantenimiento", url: "https://cloud.anylogic.com/model/68ec5281-f0dc-4958-9d0a-f515a90fdb43" },
  { title: "Gestión de Inventario", url: "https://cloud.anylogic.com/model/64808b15-d471-4a56-891e-78a596fea899" },
];

export const games = [
  { title: "Minijuegos: colas y flowshop", description: "Sistemas M/M/1 y secuenciación de producción", url: "https://cristianjaviercano.github.io/minijuegos/" },
  { title: "Retos de Simulación", description: "Ejercicios de simulación discreta en HTML", url: "https://cristianjaviercano.github.io/Retos/" },
];

export const stories = [
  { title: "El Cirio", description: "Una llama que no se apaga", url: "/historias/el_cirio/index.html", ready: true },
  { title: "Fuiste Tú", description: "Una historia de amor y reconocimiento", url: "/historias/Fuiste_tu/index.html", ready: true },
  { title: "Ecos del San José", description: "El galeón que guarda secretos del mar", url: "/historias/ecos_del_San_jose/index.html", ready: true },
  { title: "El Silencio", description: "Lo que no se dice también habla", url: "/historias/Elsidelsilencio/index.html", ready: true },
  { title: "El Sueño de Mi Vida", description: "Perseguir lo que el alma pide", url: "/historias/index.html", ready: false },
  { title: "Lo que las Letras Sienten", description: "Palabras que cobran vida propia", url: "/historias/index.html", ready: false },
];

export const music = [
  { title: "Música para Orar", url: "https://suno.com/playlist/85fb4b22-d87e-4603-bfd1-c6e0bd68f138" },
  { title: "Para Escuchar y Compartir", url: "https://suno.com/playlist/89655a90-f031-4a94-9ff0-6cda579d8259" },
];

/* ---------- CV ---------- */

export const headline =
  "Ingeniero Industrial · Magíster en Gestión de la Innovación · Candidato a Doctor en IA y Ciencia de Datos";

export const summary =
  "Más de 16 años articulando la dirección operativa y de manufactura industrial con la docencia universitaria, la investigación aplicada y la gestión de la innovación. Fundador de la metodología de innovación abierta HIS (Hub de Soluciones Industriales) y líder de semilleros de investigación. Especialista en formulación de proyectos por madurez tecnológica (TRL 1–9), optimización de operaciones y logística, analítica predictiva e integración de IA en el sector productivo y académico.";

export type CvItem = {
  period: string;
  role: string;
  org: string;
  place?: string;
  points: string[];
  /** Quantified results; add more as they are confirmed. */
  impact?: { value: string; label: string }[];
};

export const industry: CvItem[] = [
  {
    period: "2018 – 2022",
    role: "Head of Operations",
    org: "Deceuninck Colombia S.A.S.",
    place: "Cartagena",
    points: [
      "Gestión integral de producción, logística interna y abastecimiento de planta multinacional.",
      "Planeación MPS/MRP y control de mermas con SAP ERP y Power BI.",
      "Dirección de equipos de 30+ personas con KPIs de productividad, OEE, costos y seguridad.",
    ],
    impact: [{ value: "30+", label: "personas a cargo" }],
  },
  {
    period: "2016 – 2018",
    role: "Coordinador de Producción — Materia Prima",
    org: "C.I. Energía Solar S.A.S. — Grupo Tecnoglass",
    place: "Barranquilla",
    points: [
      "Abastecimiento de materias primas para líneas de perfiles y vidrio arquitectónico de exportación.",
      "Inventarios críticos sincronizados con órdenes de compra y programas de producción.",
    ],
  },
  {
    period: "2015 – 2016",
    role: "Coordinador de Operaciones & Logística",
    org: "Inv. Combas S.A.S. / Petromil",
    place: "Cartagena",
    points: [
      "Despacho de combustibles líquidos, monitoreo y ruteo de flota especializada.",
      "Calidad, seguridad industrial e inventarios en terminal de almacenamiento.",
    ],
  },
  {
    period: "2010 – 2015",
    role: "Coordinación operativa — experiencia previa",
    org: "Bavaria S.A. · Banco Arquidiocesano de Alimentos · Arismendy Andrade y Cía.",
    points: [
      "Logística de producto y activación en canal comercial especial (Bavaria).",
      "Recepción, clasificación y despacho de donaciones alimentarias.",
      "Supervisión y control de procesos como jefe de operaciones junior.",
    ],
  },
];

export const academia: CvItem[] = [
  {
    period: "2025 – presente",
    role: "Docente de Ingeniería Industrial & UPB Tec · Líder de investigación",
    org: "Universidad Pontificia Bolivariana",
    place: "Montería",
    points: [
      "Fundador y líder de la metodología de innovación abierta HIS (Hub de Soluciones Industriales).",
      "Coordinador del semillero SILOGE (Logística y Gestión de Operaciones).",
      "Cátedras: Gestión Logística, Proyecto Integrador (TRL 1–3) y Gestión Tecnológica.",
    ],
  },
  {
    period: "2026 – 2",
    role: "Docente de posgrado",
    org: "Universidad de Sucre — Maestría en Gestión de Proyectos",
    place: "Sincelejo",
    points: ["Innovación abierta, transformación tecnológica e IA aplicada a la gobernanza de proyectos."],
  },
  {
    period: "2023 – 2026",
    role: "Docente de pregrado y posgrado",
    org: "Universidad de San Buenaventura",
    place: "Cartagena",
    points: [
      "Maestrías en Formulación y Gestión de Proyectos e Ingeniería de Procesos.",
      "Programación de operaciones, métodos y tiempos, logística y control de proyectos (MS Project, Power BI).",
      "Líder del semillero SIPROI: gamificación, modelado 3D de bodegas y biomasa.",
    ],
  },
  {
    period: "2019 – 2023",
    role: "Docente de Ingeniería Industrial & Educación Continua",
    org: "Unicolombo",
    place: "Cartagena",
    points: [
      "Logistics Management, Project Management, Operaciones, Diseño de Planta y Vigilancia Tecnológica.",
      "Diplomado en Gestión Logística y asesoría de proyectos de grado.",
    ],
  },
];

export const education: CvItem[] = [
  {
    period: "En curso",
    role: "Doctorado (c) en Inteligencia Artificial y Ciencia de Datos",
    org: "Universidad Americana de Europa (UNADE)",
    points: ["Investigación doctoral en progreso."],
  },
  {
    period: "2016",
    role: "Magíster en Gestión de la Innovación",
    org: "Universidad Tecnológica de Bolívar",
    place: "Cartagena",
    points: [],
  },
  {
    period: "2015",
    role: "Diplomado en Docencia Universitaria",
    org: "Universidad Tecnológica de Bolívar",
    place: "Cartagena",
    points: [],
  },
  {
    period: "2013",
    role: "Ingeniero Industrial",
    org: "Universidad Tecnológica de Bolívar",
    place: "Cartagena",
    points: [],
  },
];

export const skills = [
  {
    group: "IA, analítica y optimización",
    items: ["Inteligencia Artificial", "Python / Colab", "Jupyter", "AnyLogic", "GAMS", "Modelado matemático"],
  },
  {
    group: "Operaciones y ERP",
    items: ["Logística & SCM", "SAP ERP (PP/MM)", "Power BI / Looker Studio", "Excel avanzado", "SPC", "ISO 9001:2015"],
  },
  {
    group: "Innovación y proyectos",
    items: ["Madurez TRL 1–9", "MS Project", "Innovación abierta", "Vigilancia tecnológica", "Metodología de investigación"],
  },
  {
    group: "Diseño y prototipado",
    items: ["SketchUp (bodegas 3D)", "TinkerCAD / CAD", "AppSheet", "Impresión 3D"],
  },
];

export const languages = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "C1/C2 · IELTS 6.5 · EF SET C1" },
];
