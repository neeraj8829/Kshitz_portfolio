"use client";

import React from "react";

interface TechChipProps {
  name: string;
  index?: number;
  className?: string;
}

export default function TechChip({ name, index = 0, className = "" }: TechChipProps) {
  const dotColor = index % 2 === 0 ? "var(--accent)" : "var(--accent-2)";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[12px] sm:text-[13px] font-sans font-semibold text-[var(--text)] select-none shrink-0 transition-colors hover:border-[var(--accent)]/40 ${className}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: dotColor }}
        aria-hidden="true"
      />
      <span>{name}</span>
    </span>
  );
}

