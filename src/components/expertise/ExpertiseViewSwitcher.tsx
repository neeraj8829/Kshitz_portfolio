"use client";

import React from "react";
import { motion } from "framer-motion";
import { Columns, LayoutGrid } from "lucide-react";

export type ExpertiseViewType = "explorer" | "bento";

interface ExpertiseViewSwitcherProps {
  currentView: ExpertiseViewType;
  onViewChange: (view: ExpertiseViewType) => void;
}

export default function ExpertiseViewSwitcher({
  currentView,
  onViewChange,
}: ExpertiseViewSwitcherProps) {
  const options: { id: ExpertiseViewType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "explorer", label: "Explorer", icon: Columns },
    { id: "bento", label: "Bento", icon: LayoutGrid },
  ];

  return (
    <div
      role="tablist"
      aria-label="Expertise Display Mode"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
      className="inline-flex items-center p-1 rounded-full border shadow-xs select-none"
    >
      {options.map((opt) => {
        const isActive = currentView === opt.id;
        const Icon = opt.icon;

        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onViewChange(opt.id)}
            className={`relative px-3.5 py-1.5 rounded-full text-xs font-body font-semibold transition-colors duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer ${
              isActive ? "text-primaryText" : "text-muted hover:text-primaryText"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeExpertiseView"
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                style={{ backgroundColor: "var(--bg)" }}
                className="absolute inset-0 rounded-full shadow-xs border border-warmBorder"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

