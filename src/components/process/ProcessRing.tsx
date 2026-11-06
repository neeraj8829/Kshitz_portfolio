"use client";

import React, { useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ProcessStep } from "@/data/site";
import ProcessNode from "./ProcessNode";
import ProcessCenterBadge from "./ProcessCenterBadge";

interface ProcessRingProps {
  steps: ProcessStep[];
  activeStep: number;
  progress: number;
  onSelectStep: (index: number) => void;
}

export default function ProcessRing({
  steps,
  activeStep,
  progress,
  onSelectStep,
}: ProcessRingProps) {
  const totalSteps = steps.length;
  const radius = 330;
  const cx = 540;
  const cy = 380;
  const arcLength = Math.PI * radius; // ~1036.726

  // Mouse parallax for outer decorative arcs (±8px)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 180 });

  const parallaxX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Node positions along the semicircle (rounded to 2 decimal places to avoid SSR hydration mismatches)
  const nodePositions = useMemo(() => {
    return steps.map((_, i) => {
      const fraction = (i + 0.5) / totalSteps;
      const angle = fraction * Math.PI;
      const x = Number((cx - radius * Math.sin(angle)).toFixed(2));
      const y = Number((cy - radius * Math.cos(angle)).toFixed(2));
      return { x, y, fraction };
    });
  }, [steps, totalSteps, cx, cy, radius]);

  // Current knob position based on progress
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const knobAngle = clampedProgress * Math.PI;
  const knobX = Number((cx - radius * Math.sin(knobAngle)).toFixed(2));
  const knobY = Number((cy - radius * Math.cos(knobAngle)).toFixed(2));

  // 40 tiny tick marks along main arc (rounded to 2 decimal places)
  const ticks = useMemo(() => {
    const list: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const count = 40;
    const r1 = radius - 6;
    const r2 = radius + 6;
    for (let k = 0; k <= count; k++) {
      const f = k / count;
      const a = f * Math.PI;
      list.push({
        x1: Number((cx - r1 * Math.sin(a)).toFixed(2)),
        y1: Number((cy - r1 * Math.cos(a)).toFixed(2)),
        x2: Number((cx - r2 * Math.sin(a)).toFixed(2)),
        y2: Number((cy - r2 * Math.cos(a)).toFixed(2)),
      });
    }
    return list;
  }, [cx, cy, radius]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[560px] h-[720px] lg:h-[760px] flex items-center justify-end select-none"
    >
      {/* Center Badge positioned inside the right side of the arc */}
      {steps[activeStep] && (
        <ProcessCenterBadge
          step={steps[activeStep]}
          currentStepIndex={activeStep}
          totalSteps={totalSteps}
        />
      )}

      {/* SVG Stage */}
      <svg
        viewBox="0 0 560 760"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Soft Glow Radial Gradient centered at C */}
          <radialGradient id="ring-center-glow" cx="96%" cy="50%" r="55%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Progress Arc Glow Filter */}
          <filter id="progress-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="6"
              floodColor="var(--accent)"
              floodOpacity="0.38"
            />
          </filter>
        </defs>

        {/* Layer B: Soft glow centered at (540, 380) */}
        <circle
          cx={cx}
          cy={cy}
          r={radius + 60}
          fill="url(#ring-center-glow)"
          pointerEvents="none"
        />

        {/* Layer A: Parallax Outer Decorative Arcs */}
        <motion.g
          style={{
            x: parallaxX,
            y: parallaxY,
          }}
        >
          {/* Outer arc 2: R+56 (386), dashed 2 8 */}
          <path
            d="M 540 -6 A 386 386 0 0 0 540 766"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="2 8"
            opacity="0.6"
          />

          {/* Outer arc 1: R+28 (358), solid 1px */}
          <path
            d="M 540 22 A 358 358 0 0 0 540 738"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            opacity="0.45"
          />
        </motion.g>

        {/* 40 tiny tick marks along main arc */}
        <g opacity="0.35">
          {ticks.map((t, idx) => (
            <line
              key={idx}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="var(--muted)"
              strokeWidth="1.2"
            />
          ))}
        </g>

        {/* Layer C: TRACK - Main Semicircular Arc (Stroke-width 10, round caps, var(--surface-2)) */}
        <path
          d="M 540 50 A 330 330 0 0 0 540 710"
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Layer D: PROGRESS Arc (Stroke-width 10, var(--accent), drop-shadow, stroke-dashoffset) */}
        <path
          d="M 540 50 A 330 330 0 0 0 540 710"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={arcLength * (1 - clampedProgress)}
          filter="url(#progress-glow)"
          className="transition-[stroke-dashoffset] duration-75 ease-linear"
        />

        {/* Layer G: Trailing Knob Blur Shadow */}
        <circle
          cx={knobX}
          cy={knobY}
          r="16"
          fill="var(--accent)"
          opacity="0.25"
          filter="blur(4px)"
        />

        {/* Layer G: Travelling KNOB (22px circle in var(--accent) with 4px var(--bg) border) */}
        <circle
          cx={knobX}
          cy={knobY}
          r="11"
          fill="var(--accent)"
          stroke="var(--bg)"
          strokeWidth="4"
          className="transition-all duration-75 ease-linear"
          filter="drop-shadow(0 2px 6px color-mix(in srgb, var(--text) 25%, transparent))"
        />
      </svg>

      {/* Layer E & F: Nodes and Labels rendered as interactive HTML overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {nodePositions.map((pos, idx) => {
          const step = steps[idx];
          const isNodeActive = activeStep === idx;
          const isNodeCompleted = activeStep > idx;

          return (
            <div key={step.number} className="pointer-events-auto">
              <ProcessNode
                step={step}
                index={idx}
                x={pos.x}
                y={pos.y}
                isActive={isNodeActive}
                isCompleted={isNodeCompleted}
                onClick={() => onSelectStep(idx)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
