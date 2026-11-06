"use client";

import React from "react";
import { motion } from "framer-motion";
import { CircleDot, Orbit, Globe2 } from "lucide-react";
import { siteData } from "@/data/site";

export type SkillsViewType = "ring" | "orbit" | "sphere";

interface SkillsViewSwitcherProps {
  currentView: SkillsViewType;
  onViewChange: (view: SkillsViewType) => void;
}

export default function SkillsViewSwitcher({
  currentView,
  onViewChange,
}: SkillsViewSwitcherProps) {
  if (!siteData.config.showSkillsViewSwitcher) return null;

  const views: { id: SkillsViewType; label: string; icon: React.ElementType }[] = [
    { id: "ring", label: "Ring", icon: CircleDot },
    { id: "orbit", label: "Orbit", icon: Orbit },
    { id: "sphere", label: "Sphere", icon: Globe2 },
  ];

  return (
    <div
      role="tablist"
      aria-label="3D Skills Animation View Options"
      className="inline-flex items-center p-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-warmBorder shadow-subtle select-none"
    >
      {views.map((v) => {
        const isActive = currentView === v.id;
        const Icon = v.icon;

        return (
          <button
            key={v.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`skills-view-${v.id}`}
            onClick={() => onViewChange(v.id)}
            className={`relative px-4 py-2 rounded-full text-xs font-heading font-semibold transition-colors duration-200 flex items-center gap-1.5 ${
              isActive ? "text-onAccent" : "text-muted hover:text-primaryText"
            }`}
          >
            {/* Sliding Pill Indicator */}
            {isActive && (
              <motion.div
                layoutId="skills-tab-indicator"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="absolute inset-0 rounded-full bg-accent shadow-xs"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" />
              <span>{v.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

