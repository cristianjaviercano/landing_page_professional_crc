"use client";

import type { ContentLang } from "../data/profile";
import { useLocale } from "../i18n/LocaleProvider";

/** Marks linked content that is not in the visitor's language. Renders nothing for matching or bilingual content. */
export default function LangChip({ lang }: { lang?: ContentLang }) {
  const { locale, t } = useLocale();
  if (!lang || lang === "both" || lang === locale) return null;
  return (
    <span
      title={t.langLabel[lang]}
      aria-label={t.langLabel[lang]}
      className="ml-2 inline-block rounded border border-current px-1 py-px align-middle font-mono text-[10px] font-bold uppercase leading-none"
    >
      {lang}
    </span>
  );
}
