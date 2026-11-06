"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProjectCategory } from "@/data/site";

export type FilterCategory = "all" | ProjectCategory;

interface ProjectFilterProps {
  activeCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
}

const filterOptions: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "design", label: "Design" },
  { id: "apps", label: "Apps" },
];

export default function ProjectFilter({
  activeCategory,
  onSelectCategory,
  counts,
}: ProjectFilterProps) {
  return (
    <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
      <div
        role="group"
        aria-label="Filter projects by category"
        className="inline-flex items-center gap-1 p-1 rounded-full bg-[var(--surface)] border border-[var(--border)] shrink-0 whitespace-nowrap"
      >
        {filterOptions.map((opt) => {
          const isActive = activeCategory === opt.id;
          const count = counts[opt.id] || 0;

          return (
            <button
              key={opt.id}
              onClick={() => onSelectCategory(opt.id)}
              aria-pressed={isActive}
              className={`relative px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-full text-sm font-sans font-semibold transition-colors duration-200 flex items-center gap-2 select-none shrink-0 ${
                isActive
                  ? "text-[var(--bg)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-filter-indicator"
                  className="absolute inset-0 bg-[var(--text)] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
              <span
                className={`relative z-10 text-xs px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? "bg-[var(--bg)]/20 text-[var(--accent)]"
                    : "bg-[var(--surface-2)] text-[var(--muted)]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

