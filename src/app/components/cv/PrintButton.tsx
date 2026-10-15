"use client";

import { Download } from "lucide-react";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl border-2 border-[#1B1B1B] bg-[#1B1B1B] px-5 py-2.5 font-semibold text-[#F4C21B] shadow-[4px_4px_0_#F4C21B] transition-transform hover:-translate-y-0.5"
    >
      <Download className="h-4 w-4" /> {label}
    </button>
  );
}
