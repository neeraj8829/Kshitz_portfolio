"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Code2, Rocket, LucideIcon } from "lucide-react";
import { ProcessStep } from "@/data/site";

interface ProcessCenterBadgeProps {
  step: ProcessStep;
  currentStepIndex: number;
  totalSteps: number;
}

const iconMap: Record<string, LucideIcon> = {
  search: Search,
  "pen-tool": PenTool,
  "code-2": Code2,
  rocket: Rocket,
};

export default function ProcessCenterBadge({
  step,
  currentStepIndex,
  totalSteps,
}: ProcessCenterBadgeProps) {
  const IconComponent = iconMap[step.icon] || Search;

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 pointer-events-none select-none z-10 flex items-center justify-center">
      {/* 190px Outer Container */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full flex items-center justify-center">
        {/* Slow Concentric Dashed Ring Rotating (30s) */}
        <div
          className="absolute inset-0 rounded-full border border-dashed border-[var(--border)] opacity-60 animate-[spin_30s_linear_infinite]"
          aria-hidden="true"
        />

        {/* Faint Inner Glow Ring */}
        <div
          className="absolute inset-3 rounded-full bg-[var(--surface)]/90 backdrop-blur-sm border border-[var(--border)] shadow-xl flex flex-col items-center justify-center p-4 text-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step.number}
              initial={{ opacity: 0, scale: 0.75, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center gap-1.5"
            >
              {/* Active Step Icon (~64px max container, 36px icon) */}
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shadow-xs">
                <IconComponent className="w-6 h-6 text-[var(--accent)]" />
              </div>

              {/* Step Counter "2 / 4" */}
              <div className="font-heading font-bold text-base sm:text-lg text-[var(--text)] tracking-tight">
                {currentStepIndex + 1} / {totalSteps}
              </div>

              {/* Active Duration */}
              <span className="font-sans text-[11px] font-semibold text-[var(--muted)] px-2 py-0.5 rounded-full bg-[var(--surface-2)]">
                {step.duration}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

