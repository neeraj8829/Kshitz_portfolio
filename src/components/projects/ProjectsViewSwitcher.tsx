"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, LayoutGrid, List } from "lucide-react";

export type ProjectsViewMode = "showcase" | "bento" | "index";

interface ProjectsViewSwitcherProps {
  currentView: ProjectsViewMode;
  onViewChange: (view: ProjectsViewMode) => void;
}

const views: { id: ProjectsViewMode; label: string; icon: React.ElementType }[] = [
  { id: "showcase", label: "Showcase", icon: Layers },
  { id: "bento", label: "Bento", icon: LayoutGrid },
  { id: "index", label: "Index", icon: List },
];

export default function ProjectsViewSwitcher({
  currentView,
  onViewChange,
}: ProjectsViewSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Switch project layout view"
      className="inline-flex items-center gap-1 p-1 rounded-full bg-[var(--surface)] border border-[var(--border)] shrink-0 self-start sm:self-center"
    >
      {views.map((v) => {
        const Icon = v.icon;
        const isActive = currentView === v.id;

        return (
          <button
            key={v.id}
            onClick={() => onViewChange(v.id)}
            title={v.label}
            aria-label={`View as ${v.label}`}
            aria-pressed={isActive}
            className={`relative p-2 sm:p-2.5 rounded-full transition-colors duration-200 select-none ${
              isActive
                ? "text-[var(--bg)]"
                : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-view-indicator"
                className="absolute inset-0 bg-[var(--text)] rounded-full z-0"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <Icon className="w-4 h-4 relative z-10" />
          </button>
        );
      })}
    </div>
  );
}

