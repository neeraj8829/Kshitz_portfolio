"use client";

import React from "react";
import HighlightText from "@/components/ui/HighlightText";
import Counter from "@/components/ui/Counter";

export default function ExpertiseHeader() {
  return (
    <div className="mb-10 sm:mb-14">
      {/* Section Eyebrow: Matches other sections */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <span className="eyebrow-label">
          04 — EXPERTISE
        </span>
        <div className="h-px bg-warmBorder flex-1 max-w-[120px]" />
      </div>

      {/* Main Header Layout: Left Title & Description, Right Compact Stats Strip */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
        {/* Left Column */}
        <div className="max-w-2xl">
          <h2 className="section-h2 text-primaryText tracking-tight mb-4">
            What I bring to <HighlightText>every</HighlightText> project.
          </h2>

          <p className="body-large text-muted max-w-[60ch] leading-relaxed">
            From pixel-perfect interfaces to reliable backends, here is where I spend my time and what I can be trusted with.
          </p>
        </div>

        {/* Right Column: Compact Stats Strip */}
        <div
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
          className="self-start lg:self-auto inline-flex items-center p-3 sm:p-4 rounded-2xl border shadow-subtle divide-x divide-warmBorder shrink-0"
        >
          {/* Stat 1 */}
          <div className="px-3.5 sm:px-5 first:pl-2 last:pr-2 flex flex-col items-center sm:items-start">
            <span className="font-heading font-bold text-2xl sm:text-3xl text-primaryText tracking-tight leading-none">
              <Counter value={5} suffix="+" />
            </span>
            <span className="text-[11px] font-body text-muted mt-1 uppercase tracking-wider font-semibold">
              Years
            </span>
          </div>

          {/* Stat 2 */}
          <div className="px-3.5 sm:px-5 first:pl-2 last:pr-2 flex flex-col items-center sm:items-start">
            <span className="font-heading font-bold text-2xl sm:text-3xl text-primaryText tracking-tight leading-none">
              <Counter value={40} suffix="+" />
            </span>
            <span className="text-[11px] font-body text-muted mt-1 uppercase tracking-wider font-semibold">
              Projects
            </span>
          </div>

          {/* Stat 3 */}
          <div className="px-3.5 sm:px-5 first:pl-2 last:pr-2 flex flex-col items-center sm:items-start">
            <span className="font-heading font-bold text-2xl sm:text-3xl text-primaryText tracking-tight leading-none">
              <Counter value={4} />
            </span>
            <span className="text-[11px] font-body text-muted mt-1 uppercase tracking-wider font-semibold">
              Domains
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

