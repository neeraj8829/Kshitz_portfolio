"use client";

import React from "react";
import { motion } from "framer-motion";

interface HighlightTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  drawOnView?: boolean;
}

export default function HighlightText({
  children,
  delay = 0.6,
  className = "",
  drawOnView = true,
}: HighlightTextProps) {
  return (
    <span className={`relative inline-block font-heading font-bold text-accent ${className}`}>
      <span className="relative z-10">{children}</span>

      {/* Modern hand-drawn style animated SVG underline */}
      <svg
        className="absolute left-0 -bottom-1.5 sm:-bottom-2 w-full h-[7px] sm:h-[9px] overflow-visible pointer-events-none z-0"
        viewBox="0 0 100 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 2 7.5 C 28 3.5, 68 2.5, 98 7"
          stroke="var(--accent)"
          strokeWidth="3.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={!drawOnView ? { pathLength: 1, opacity: 1 } : undefined}
          whileInView={drawOnView ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{
            duration: 0.85,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </svg>
    </span>
  );
}
