"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "../../i18n/LocaleProvider";
import QueueLab from "../home/QueueLab";
import EoqTool from "./EoqTool";
import KingmanTool from "./KingmanTool";
import OeeTool from "./OeeTool";

const toolIds = ["mm1", "eoq", "kingman", "oee"] as const;

type ToolId = (typeof toolIds)[number];

export default function LabTabs() {
  const { t } = useLocale();
  const [tool, setTool] = useState<ToolId>("mm1");
  const active = t.lab.tools[tool];

  return (
    <div>
      <div role="tablist" aria-label={t.lab.tabsLabel} className="mb-6 flex flex-wrap gap-2">
        {toolIds.map((id) => (
          <button
            key={id}
            role="tab"
            aria-selected={tool === id}
            onClick={() => setTool(id)}
            className={`relative rounded-xl border-2 border-[#1B1B1B] px-4 py-2 text-sm font-bold transition-colors ${
              tool === id ? "text-[#F4C21B]" : "bg-[#F7F3EA] hover:bg-[#F4C21B]"
            }`}
          >
            {tool === id && <motion.span layoutId="lab-tab" className="absolute inset-0 rounded-[10px] bg-[#1B1B1B]" />}
            <span className="relative">{t.lab.tools[id].label}</span>
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
