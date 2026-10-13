"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QueueLab from "../home/QueueLab";
import EoqTool from "./EoqTool";
import KingmanTool from "./KingmanTool";
import OeeTool from "./OeeTool";

const tools = [
  { id: "mm1", label: "Cola M/M/1", sub: "simulación de eventos discretos" },
  { id: "eoq", label: "EOQ & reorden", sub: "lote económico y stock de seguridad" },
  { id: "kingman", label: "Kingman", sub: "variabilidad × utilización" },
  { id: "oee", label: "OEE", sub: "eficiencia global del equipo" },
] as const;

type ToolId = (typeof tools)[number]["id"];

export default function LabTabs() {
  const [tool, setTool] = useState<ToolId>("mm1");
  const active = tools.find((t) => t.id === tool)!;

  return (
    <div>
      <div role="tablist" aria-label="Herramientas del laboratorio" className="mb-6 flex flex-wrap gap-2">
        {tools.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tool === t.id}
            onClick={() => setTool(t.id)}
            className={`relative rounded-xl border-2 border-[#1B1B1B] px-4 py-2 text-sm font-bold transition-colors ${
              tool === t.id ? "text-[#F4C21B]" : "bg-[#F7F3EA] hover:bg-[#F4C21B]"
            }`}
          >
            {tool === t.id && <motion.span layoutId="lab-tab" className="absolute inset-0 rounded-[10px] bg-[#1B1B1B]" />}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      {tool === "mm1" ? (
        <QueueLab />
      ) : (
        <div className="overflow-hidden rounded-3xl border-2 border-[#1B1B1B] bg-[#F7F3EA] shadow-[8px_8px_0_#1B1B1B]">
          <div className="border-b-2 border-[#1B1B1B] bg-[#1B1B1B] px-5 py-3 font-mono text-sm font-semibold text-[#F7F3EA]">
            <span className="text-[#F4C21B]">{active.label}</span> · {active.sub}
          </div>
          <div className="p-5">
            {tool === "eoq" && <EoqTool />}
            {tool === "kingman" && <KingmanTool />}
            {tool === "oee" && <OeeTool />}
          </div>
        </div>
      )}
    </div>
  );
}
