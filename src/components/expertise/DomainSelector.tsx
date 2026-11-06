"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExpertiseDomain } from "@/data/site";
import { ArrowUpRight } from "lucide-react";

interface DomainSelectorProps {
  domains: ExpertiseDomain[];
  activeIndex: number;
  onSelect: (index: number, manualClick?: boolean) => void;
  isAutoAdvancing: boolean;
  progressPercent: number; // 0 to 100
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export default function DomainSelector({
  domains,
  activeIndex,
  onSelect,
  isAutoAdvancing,
  progressPercent,
  onHoverStart,
  onHoverEnd,
}: DomainSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % domains.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + domains.length) % domains.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = domains.length - 1;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(index, true);
      return;
    } else {
      return;
    }

    onSelect(nextIndex, true);
    // Focus corresponding button
    const btn = document.getElementById(`domain-tab-${domains[nextIndex].id}`);
    if (btn) btn.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Expertise Domains"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocusCapture={onHoverStart}
      onBlurCapture={onHoverEnd}
      className="flex flex-col gap-2 relative w-full select-none"
    >
      {domains.map((domain, index) => {
        const isActive = index === activeIndex;
        const isHovered = index === hoveredIndex;

        return (
          <button
            key={domain.id}
            id={`domain-tab-${domain.id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`domain-panel-${domain.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(index, true)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden cursor-pointer"
          >
            {/* Sliding Highlight Background for Active Tab */}
            {isActive && (
              <motion.div
                layoutId="activeDomainHighlight"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                style={{ backgroundColor: "var(--bg)" }}
                className="absolute inset-0 rounded-2xl shadow-subtle border border-warmBorder"
              />
            )}

            {/* 3px Left Vertical Accent Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeDomainIndicator"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                style={{ backgroundColor: "var(--accent)" }}
                className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
              />
            )}

            {/* Row Content */}
            <div
              className={`relative z-10 flex items-center justify-between gap-3 transition-transform duration-200 ${
                !isActive && isHovered ? "translate-x-1.5" : "translate-x-0"
              }`}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2.5 mb-1">
                  <span
                    className={`font-mono text-xs font-semibold tracking-wider transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    {domain.number}
                  </span>
                  <h4
                    className={`font-heading font-semibold text-lg sm:text-xl lg:text-2xl transition-colors duration-200 ${
                      isActive ? "text-primaryText" : "text-muted group-hover:text-primaryText"
                    }`}
                  >
                    {domain.title}
                  </h4>
                </div>
                <p
                  className={`font-body text-xs sm:text-[13px] line-clamp-1 transition-colors duration-200 ${
                    isActive ? "text-muted" : "text-muted/70 group-hover:text-muted"
                  }`}
                >
                  {domain.shortDesc}
                </p>
              </div>

              {/* Arrow Up Right Icon */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isActive
                    ? "opacity-100 text-accent translate-x-0"
                    : isHovered
                    ? "opacity-80 text-muted translate-x-0"
                    : "opacity-0 -translate-x-2 pointer-events-none"
                }`}
              >
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>

            {/* Auto-Advance Hairline Progress Indicator under Active Item */}
            {isActive && isAutoAdvancing && (
              <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-warmBorder/40 rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: "var(--accent)",
                  }}
                  className="h-full rounded-full transition-all duration-75 ease-linear"
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
