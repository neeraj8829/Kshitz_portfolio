"use client";

import React from "react";
import { SkillLevel } from "@/data/site";

interface LevelPillProps {
  level: SkillLevel;
  className?: string;
}

export default function LevelPill({ level, className = "" }: LevelPillProps) {
  let style: React.CSSProperties = {};
  let borderClass = "";

  if (level === "Daily") {
    style = {
      backgroundColor: "var(--accent)",
      color: "var(--on-accent)",
    };
  } else if (level === "Strong") {
    style = {
      backgroundColor: "color-mix(in srgb, var(--accent-2) 22%, transparent)",
      color: "var(--text)",
    };
  } else {
    // Familiar
    style = {
      backgroundColor: "transparent",
      borderColor: "var(--border)",
      color: "var(--muted)",
    };
    borderClass = "border";
  }

  return (
    <span
      style={style}
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-body font-semibold uppercase tracking-[0.08em] whitespace-nowrap select-none ${borderClass} ${className}`}
    >
      {level}
    </span>
  );
}

