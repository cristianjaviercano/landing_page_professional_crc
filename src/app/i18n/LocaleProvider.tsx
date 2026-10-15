"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getProfile, getUi, localePath, numberLocale, type Locale } from "./index";

const LocaleContext = createContext<Locale>("es");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Client-side access to the active locale, its UI strings and profile data. */
export function useLocale() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    t: getUi(locale),
    profile: getProfile(locale),
    path: (p: string) => localePath(locale, p),
    nf: numberLocale(locale),
  };
}
