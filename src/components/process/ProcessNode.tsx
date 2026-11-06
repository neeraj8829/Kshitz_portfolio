"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { ProcessStep } from "@/data/site";

interface ProcessNodeProps {
  step: ProcessStep;
  index: number;
  x: number;
  y: number;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export default function ProcessNode({
  step,
  index,
  x,
  y,
  isActive,
  isCompleted,
  onClick,
}: ProcessNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Node Interactive Button with 56px circle */}
      <div className="relative flex items-center">
        {/* Node Label on the LEFT side of the node (toward content) */}
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`absolute right-full mr-4 text-right select-none transition-all duration-300 hidden md:flex flex-col items-end cursor-pointer group ${
            isActive ? "translate-x-2" : "translate-x-0"
          }`}
          aria-label={`Go to step ${index + 1}: ${step.title}`}
        >
          <span
            className={`font-sans font-semibold text-sm sm:text-[15px] whitespace-nowrap transition-colors duration-200 ${
              isActive
                ? "text-[var(--text)] font-bold"
                : isHovered
                ? "text-[var(--text)]"
                : "text-[var(--muted)]"
            }`}
          >
            {step.title}
          </span>
          <span className="font-sans text-xs text-[var(--muted)]">
            {step.duration}
          </span>

          {/* Hover Tooltip showing first deliverable */}
          <AnimatePresence>
            {isHovered && step.deliverables && step.deliverables[0] && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full mt-1.5 right-0 px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border)] text-[11px] font-sans font-medium text-[var(--text)] shadow-md z-30 whitespace-nowrap pointer-events-none"
              >
                Deliverable: {step.deliverables[0]}
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* The 56px Node Circle */}
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={`Step ${index + 1}: ${step.title}`}
          aria-current={isActive ? "step" : undefined}
          className="relative w-14 h-14 rounded-full flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer z-20 select-none"
        >
          {/* Active Pulsing Outer Ring (Scale 1 to 1.5, opacity 0.4 to 0, every 2s) */}
          {isActive && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[var(--accent)] pointer-events-none"
              animate={{
                scale: [1, 1.55],
                opacity: [0.55, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              aria-hidden="true"
            />
          )}

          {/* Circle Body */}
          <motion.div
            animate={{
              scale: isActive ? 1.15 : isHovered ? 1.08 : 1,
              backgroundColor:
                isActive || isCompleted ? "var(--accent)" : "var(--surface)",
              borderColor:
                isActive || isCompleted ? "var(--accent)" : "var(--border)",
              boxShadow: isActive
                ? "0 8px 24px color-mix(in srgb, var(--accent) 35%, transparent)"
                : "0 2px 8px color-mix(in srgb, var(--text) 8%, transparent)",
            }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="w-14 h-14 rounded-full border-[1.5px] flex items-center justify-center font-heading font-bold text-base transition-colors"
          >
            {isCompleted ? (
              <Check className="w-5 h-5 text-[var(--on-accent)] stroke-[2.5]" />
            ) : (
              <span
                className={
                  isActive ? "text-[var(--on-accent)]" : "text-[var(--muted)]"
                }
              >
                {step.number}
              </span>
            )}
          </motion.div>
        </button>
      </div>
    </div>
  );
}

