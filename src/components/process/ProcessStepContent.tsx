"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  Search,
  PenTool,
  Code2,
  Rocket,
  ArrowDown,
  LucideIcon,
} from "lucide-react";
import { ProcessStep } from "@/data/site";

interface ProcessStepContentProps {
  step: ProcessStep;
  stepIndex: number;
  totalSteps: number;
}

const iconMap: Record<string, LucideIcon> = {
  search: Search,
  "pen-tool": PenTool,
  "code-2": Code2,
  rocket: Rocket,
};

export default function ProcessStepContent({
  step,
  stepIndex,
  totalSteps,
}: ProcessStepContentProps) {
  const IconComponent = iconMap[step.icon] || Search;

  return (
    <div className="relative w-full h-full flex flex-col justify-between py-6 lg:py-10 select-none">
      {/* Odometer Rolling Watermark Number in background */}
      <div
        className="absolute -left-6 sm:-left-10 -top-8 sm:-top-12 pointer-events-none select-none overflow-hidden h-[130px] sm:h-[180px] z-0"
        aria-hidden="true"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={step.number}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 0.07 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-extrabold text-[clamp(6rem,12vw,11rem)] leading-none text-[var(--text)]"
          >
            {step.number}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Step Information - Animated on Step Change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col gap-5 sm:gap-6 max-w-xl"
        >
          {/* Top Row: STEP 01 / 04 + Duration Pill */}
          <div className="flex items-center gap-3">
            <span className="font-sans font-semibold text-xs tracking-[0.14em] uppercase text-[var(--accent)]">
              STEP {step.number} / 0{totalSteps}
            </span>
            <div className="w-px h-3.5 bg-[var(--border)]" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] font-sans text-xs font-semibold text-[var(--muted)]">
              <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>{step.duration}</span>
            </span>
          </div>

          {/* Icon Tile + Title Row */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.06, duration: 0.3 }}
              className="w-14 h-14 rounded-2xl bg-[var(--accent)]/12 flex items-center justify-center shrink-0 border border-[var(--accent)]/20 shadow-xs"
            >
              <IconComponent className="w-7 h-7 text-[var(--accent)]" />
            </motion.div>

            <h3 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] tracking-tight text-[var(--text)]">
              {step.title}
            </h3>
          </div>

          {/* Summary */}
          <p className="font-sans text-base sm:text-[18px] text-[var(--muted)] leading-relaxed max-w-[48ch]">
            {step.summary}
          </p>

          {/* 3 Core Points */}
          <div className="flex flex-col gap-2.5 pt-1">
            {step.points.map((pt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.3 }}
                className="flex items-center gap-2.5 text-sm sm:text-base font-sans font-medium text-[var(--text)]"
              >
                <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>{pt}</span>
              </motion.div>
            ))}
          </div>

          {/* Deliverables Section */}
          <div className="pt-2">
            <span className="block font-sans text-xs uppercase tracking-wider font-semibold text-[var(--muted)] mb-2.5">
              You receive
            </span>
            <div className="flex flex-wrap gap-2">
              {step.deliverables.map((deliv, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-[13px] font-sans font-semibold text-[var(--text)] select-none shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)]" />
                  <span>{deliv}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slim vertical scroll hint at bottom-left on step 1 */}
      <AnimatePresence>
        {stepIndex === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-xs font-sans font-semibold text-[var(--muted)] pt-6"
          >
            <span className="animate-bounce">
              <ArrowDown className="w-4 h-4 text-[var(--accent)]" />
            </span>
            <span>Scroll to continue</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

