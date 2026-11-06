"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ProjectMetric } from "@/data/site";

interface ProjectMetricsProps {
  metrics: ProjectMetric[];
  className?: string;
}

function parseMetricValue(raw: string) {
  // Regex to extract prefix (<, +, -), float/integer number, and suffix (ms, M, %, s, k, +, x, etc.)
  const match = raw.match(/^([<+\-]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", target: 0, suffix: raw, isNumeric: false, decimals: 0 };
  }
  const prefix = match[1] || "";
  const numStr = match[2];
  const suffix = match[3] || "";
  const target = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, target, suffix, isNumeric: true, decimals };
}

function MetricCounter({ rawValue }: { rawValue: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [currentVal, setCurrentVal] = useState<string>(rawValue);

  useEffect(() => {
    const { prefix, target, suffix, isNumeric, decimals } = parseMetricValue(rawValue);
    if (!isNumeric) {
      setCurrentVal(rawValue);
      return;
    }

    if (!isInView) {
      setCurrentVal(`${prefix}0${decimals > 0 ? "." + "0".repeat(decimals) : ""}${suffix}`);
      return;
    }

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCurrentVal(rawValue);
      return;
    }

    let start: number | null = null;
    const duration = 1400; // 1.4s

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = ease * target;
      setCurrentVal(`${prefix}${val.toFixed(decimals)}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrentVal(rawValue);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, rawValue]);

  return (
    <span ref={ref} className="font-heading font-bold text-2xl sm:text-[26px] text-[var(--text)] tabular-nums">
      {currentVal}
    </span>
  );
}

export default function ProjectMetrics({ metrics, className = "" }: ProjectMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 sm:gap-6 py-2 ${className}`}>
      {metrics.map((m, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && (
            <div className="w-px h-8 sm:h-10 bg-[var(--border)] shrink-0" aria-hidden="true" />
          )}
          <div className="flex flex-col min-w-0">
            <MetricCounter rawValue={m.value} />
            <span className="font-sans font-medium text-xs sm:text-[13px] text-[var(--muted)] truncate">
              {m.label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

