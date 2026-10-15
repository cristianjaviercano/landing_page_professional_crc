"use client";

import dynamic from "next/dynamic";
import { Component, useSyncExternalStore, type ReactNode } from "react";
import { useLocale } from "../../i18n/LocaleProvider";
import SceneFallback from "./SceneFallback";
import { hasWebGL } from "./webgl";

function SceneLoading() {
  const { t } = useLocale();
  return (
    <div className="flex h-full items-center justify-center">
      <span className="font-hand animate-pulse text-2xl text-[#1B1B1B]/65">{t.hero.loading}</span>
    </div>
  );
}

const FactoryScene = dynamic(() => import("./FactoryScene"), { ssr: false, loading: () => <SceneLoading /> });

/** Keeps a failure inside the 3D canvas (context creation, lost context) from taking the whole page down. */
class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("3D scene unavailable, showing static illustration:", error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const subscribe = () => () => {};

export default function SceneGuard({ animate }: { animate: boolean }) {
  const { t } = useLocale();
  // null on the server and during hydration, then the real answer on the client
  const webgl = useSyncExternalStore<boolean | null>(subscribe, hasWebGL, () => null);

  if (webgl === null) return <SceneLoading />;
  if (!webgl) return <SceneFallback />;

  return (
    <SceneBoundary fallback={<SceneFallback />}>
      <FactoryScene animate={animate} />
      <p className="font-hand pointer-events-none absolute bottom-2 right-4 rotate-[-3deg] text-xl text-[#1B1B1B]/70">{t.hero.hint}</p>
    </SceneBoundary>
  );
}
