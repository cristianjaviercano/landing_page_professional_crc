import * as es from "./profile";
import type { CaseStudy, CvItem } from "./profile";

/** Overlay translated text onto the Spanish records, so URLs, covers and dates stay single-sourced. */
function overlay<T extends object>(base: T[], text: Partial<T>[]): T[] {
  if (base.length !== text.length) throw new Error("profile.en: translation count does not match profile.ts");
  return base.map((item, i) => ({ ...item, ...text[i] }));
}

export const { siteUrl } = es;

export const services = overlay(es.services, [
  {
    title: "Operations & logistics consulting",
    description: "Diagnosis and redesign of production, procurement, inventory and dispatch processes, with clear KPIs: OEE, scrap and service level.",
    tags: ["MPS/MRP", "Inventory", "KPIs"],
    subject: "Operations & logistics consulting",
  },
  {
    title: "Simulation & analytics",
    description: "Simulation and optimization models, and control dashboards, to decide with data before investing in or changing the plant.",
    tags: ["AnyLogic", "GAMS", "Power BI"],
    subject: "Simulation & analytics",
  },
  {
    title: "Corporate training & teaching",
    description: "Workshops, diplomas and courses in logistics, project management, innovation and applied AI, for teams and universities.",
    tags: ["Logistics", "Projects", "Applied AI"],
    subject: "Corporate training",
  },
  {
    title: "Open innovation & applied AI",
    description: "From industrial challenge to prototype with the HIS methodology, planned by technology readiness levels (TRL 1–9).",
    tags: ["HIS", "TRL 1–9", "Prototyping"],
    subject: "Open innovation & applied AI",
  },
]);

export const { bookingUrl } = es;

export const contact = { ...es.contact, location: "Montería, Córdoba — Colombia" };

export const caseStudies: CaseStudy[] = overlay(es.caseStudies, [
  {
    title: "RCA Audit & Statistical Process Control",
    description: "EWMA charts, Cp/Cpk capability and a quantitative root-cause ranking for distribution networks.",
    tags: ["SPC", "Python", "Quality"],
    metric: { value: "87%", label: "of complaints explained by 4 root causes" },
  },
  {
    title: "Last-Mile Performance Platform",
    description: "Route and inventory performance for delivery fleets: theoretical vs. actual time per dispatch.",
    tags: ["Logistics", "Streamlit", "Routing"],
    metric: { value: "24%", label: "better last-mile delivery timeliness" },
  },
  {
    title: "ZERO — Academic Platform",
    description: "Course management, grading and early academic-risk alerts.",
    tags: ["EdTech", "Analytics", "Alerts"],
  },
  {
    title: "HIS Model — Open Innovation",
    description: "Industrial Solutions Hub: AI-guided prototyping for applied R&D with industry.",
    tags: ["Innovation", "AI", "TRL"],
    metric: { value: "48–72 h", label: "from concept to working prototype" },
  },
]);

export const apps = overlay(es.apps, [
  { description: "Advanced inventory management", tag: "Inventory" },
  { description: "Lightweight stock control", tag: "Inventory" },
  { description: "Textile capacity leveling", tag: "Capacity" },
  { title: "RAS System", description: "Recirculating aquaculture control", tag: "Agribusiness" },
]);

export const courses = overlay(es.courses, [
  { title: "Logistics", description: "Complete logistics management course." },
  { title: "Network Optimization", description: "Interactive course and lab on logistics networks." },
  { title: "Advanced Dispatch — GitBook", description: "Logistics management and dispatch information systems." },
  { title: "Building AI Agents", description: "A multi-agent production-line methodology." },
]);

export const anylogic = overlay(es.anylogic, [
  { title: "Mocarí Roundabout" },
  { title: "Montería Routes" },
  { title: "Shoe Factory" },
  { title: "Maintenance" },
  { title: "Inventory Management" },
]);

export const games = overlay(es.games, [
  { title: "Mini-games: queues and flow shop", description: "M/M/1 systems and production sequencing" },
  { title: "Simulation Challenges", description: "Discrete-event simulation exercises in HTML" },
]);

// Story and playlist titles are the works' own (Spanish) titles.
export const stories = overlay(es.stories, [
  { description: "A flame that never goes out" },
  { description: "A story of love and recognition" },
  { description: "The galleon that keeps the sea's secrets" },
  { description: "What goes unsaid also speaks" },
  { description: "Chasing what the soul asks for" },
  { description: "Words that come alive" },
]);

export const { music } = es;

/* ---------- CV ---------- */

export const headline = "Industrial Engineer · MSc in Innovation Management · Specialized studies in progress";

export const summary =
  "16+ years bridging operations and manufacturing leadership with university teaching, applied research and innovation management. Founder of the HIS (Industrial Solutions Hub) open-innovation methodology and leader of student research groups. Specialist in technology-readiness-based project design (TRL 1–9), operations and logistics optimization, predictive analytics and AI integration for industry and academia.";

export const industry: CvItem[] = overlay(es.industry, [
  {
    role: "Head of Operations",
    points: [
      "End-to-end management of production, in-plant logistics and procurement at a multinational plant.",
      "MPS/MRP planning and scrap control with SAP ERP and Power BI.",
      "Led teams of 30+ people against productivity, OEE, cost and safety KPIs.",
    ],
    impact: [{ value: "30+", label: "direct reports" }],
  },
  {
    role: "Production Coordinator — Raw Materials",
    points: [
      "Raw-material supply for export-grade profile and architectural glass lines.",
      "Critical inventory synchronized with purchase orders and production schedules.",
    ],
  },
  {
    role: "Operations & Logistics Coordinator",
    points: [
      "Liquid-fuel dispatch, specialized fleet monitoring and routing.",
      "Quality, industrial safety and inventory control at a storage terminal.",
    ],
  },
  {
    role: "Operations coordination — earlier experience",
    points: [
      "Product logistics and activation for a special sales channel (Bavaria).",
      "Receiving, sorting and dispatching food donations.",
      "Process supervision and control as junior operations lead.",
    ],
  },
]);

export const academia: CvItem[] = overlay(es.academia, [
  {
    period: "2025 – present",
    role: "Industrial Engineering & UPB Tec Lecturer · Research Lead",
    points: [
      "Founder and lead of the HIS (Industrial Solutions Hub) open-innovation methodology.",
      "Coordinator of the SILOGE research group (Logistics and Operations Management).",
      "Courses: Logistics Management, Capstone Project (TRL 1–3) and Technology Management.",
    ],
  },
  {
    role: "Graduate Lecturer",
    org: "Universidad de Sucre — MSc in Project Management",
    points: ["Open innovation, technology transformation and AI for project governance."],
  },
  {
    role: "Undergraduate and Graduate Lecturer",
    points: [
      "MSc programs in Project Design & Management and Process Engineering.",
      "Operations scheduling, work measurement, logistics and project control (MS Project, Power BI).",
      "Lead of the SIPROI research group: gamification, 3D warehouse modeling and biomass.",
    ],
  },
  {
    role: "Industrial Engineering & Continuing Education Lecturer",
    points: [
      "Logistics Management, Project Management, Operations, Plant Layout and Technology Watch.",
      "Logistics Management diploma and thesis advising.",
    ],
  },
]);

export const education: CvItem[] = overlay(es.education, [
  { period: "In progress", role: "Specialized studies in progress", points: [] },
  { role: "MSc in Innovation Management" },
  { role: "Diploma in University Teaching" },
  { role: "B.Sc. Industrial Engineering" },
]);

export const skills = overlay(es.skills, [
  { group: "AI, analytics & optimization", items: ["Artificial Intelligence", "Python / Colab", "Jupyter", "AnyLogic", "GAMS", "Mathematical modeling"] },
  { group: "Operations & ERP", items: ["Logistics & SCM", "SAP ERP (PP/MM)", "Power BI / Looker Studio", "Advanced Excel", "SPC", "ISO 9001:2015"] },
  { group: "Innovation & projects", items: ["TRL 1–9 readiness", "MS Project", "Open innovation", "Technology watch", "Research methodology"] },
  { group: "Design & prototyping", items: ["SketchUp (3D warehouses)", "TinkerCAD / CAD", "AppSheet", "3D printing"] },
]);

export const languages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "C1/C2 · IELTS 6.5 · EF SET C1" },
];
