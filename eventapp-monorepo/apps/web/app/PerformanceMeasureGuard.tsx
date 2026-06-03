"use client";

import { useEffect } from "react";

function createSafeMeasure(original: Performance["measure"]) {
  return function safeMeasure(name?: string, startMark?: string, endMark?: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (original as any)(name, startMark, endMark);
    } catch (err) {
      // This happens in some Next.js/Turbopack versions when duration becomes negative.
      // Swallow to prevent a hard runtime crash.
      return undefined;
    }
  };
}

export default function PerformanceMeasureGuard() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const perf = window.performance;
    if (!perf) return;

    // Only patch once.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.__performanceMeasureGuardApplied) return;
    w.__performanceMeasureGuardApplied = true;

    const original = perf.measure.bind(perf);
    perf.measure = createSafeMeasure(original);

    // Also guard against the case where libs use marks + measures.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _perf = perf as any;
    if (typeof _perf.mark === "function") {
      const originalMark = _perf.mark.bind(perf);
      _perf.mark = function safeMark() {
        try {
          // eslint-disable-next-line prefer-rest-params
          return originalMark.apply(perf, arguments as unknown as [unknown, unknown, unknown]);
        } catch {
          return undefined;
        }
      };
    }
  }, []);

  return null;
}

