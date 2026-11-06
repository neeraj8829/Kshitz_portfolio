"use client";

import React from "react";
import HighlightText from "@/components/ui/HighlightText";

export default function ProcessHeader() {
  return (
    <div className="mb-8 sm:mb-12">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-4">
        <span className="eyebrow-label text-xs tracking-wider uppercase font-sans font-semibold text-[var(--accent)]">
          06 — METHODOLOGY &amp; PROCESS
        </span>
        <div className="h-px bg-[var(--border)] flex-1 max-w-[120px]" />
      </div>

      {/* Heading */}
      <h2 className="section-h2 text-[var(--text)] tracking-tight leading-[1.12] mb-3">
        From first idea to <HighlightText>flawless</HighlightText> launch.
      </h2>

      {/* Subtitle */}
      <p className="font-sans text-sm sm:text-base text-[var(--muted)] max-w-[56ch] leading-relaxed">
        A clear four-step process, so you always know what is happening, what you will get and when.
      </p>
    </div>
  );
}

