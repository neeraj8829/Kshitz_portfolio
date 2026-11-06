"use client";

import React from "react";
import HighlightText from "@/components/ui/HighlightText";
import ProjectFilter, { FilterCategory } from "./ProjectFilter";
import ProjectsViewSwitcher, { ProjectsViewMode } from "./ProjectsViewSwitcher";

interface ProjectsHeaderProps {
  activeCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
  categoryCounts: Record<FilterCategory, number>;
  currentView: ProjectsViewMode;
  onViewChange: (view: ProjectsViewMode) => void;
  showViewSwitcher?: boolean;
}

export default function ProjectsHeader({
  activeCategory,
  onSelectCategory,
  categoryCounts,
  currentView,
  onViewChange,
  showViewSwitcher = true,
}: ProjectsHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
      {/* Left side: Eyebrow, Heading, Subtitle */}
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="eyebrow-label text-xs tracking-wider uppercase font-sans font-semibold text-[var(--accent)]">
            03 — SELECTED WORK
          </span>
          <div className="h-px bg-[var(--border)] flex-1 max-w-[120px]" />
        </div>

        <h2 className="section-h2 text-[var(--text)] tracking-tight leading-[1.15] mb-3">
          Work that <HighlightText>ships</HighlightText>, scales and delights.
        </h2>

        <p className="font-sans text-sm sm:text-base text-[var(--muted)] max-w-[56ch] leading-relaxed">
          A selection of products I have designed and built end to end, from first sketch to production.
        </p>
      </div>

      {/* Right side: Filter pills + View Switcher */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
        <ProjectFilter
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
          counts={categoryCounts}
        />

        {showViewSwitcher && (
          <ProjectsViewSwitcher
            currentView={currentView}
            onViewChange={onViewChange}
          />
        )}
      </div>
    </div>
  );
}

