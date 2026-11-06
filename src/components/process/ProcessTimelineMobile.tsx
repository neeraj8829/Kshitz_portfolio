"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  Search,
  PenTool,
  Code2,
  Rocket,
  ArrowRight,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";
import { ProcessStep } from "@/data/site";
import ProcessHeader from "./ProcessHeader";

interface ProcessTimelineMobileProps {
  steps: ProcessStep[];
}

const iconMap: Record<string, LucideIcon> = {
  search: Search,
  "pen-tool": PenTool,
  "code-2": Code2,
  rocket: Rocket,
};

export default function ProcessTimelineMobile({
  steps,
}: ProcessTimelineMobileProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress along the mobile timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const miniArcLength = Math.PI * 70; // Mini half-ring radius = 70
  const miniDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [miniArcLength, 0]
  );

  return (
    <div
      ref={containerRef}
      className="w-full lg:hidden py-16 px-4 sm:px-8 max-w-3xl mx-auto select-none"
    >
      {/* Top Header with Decorative 160px Half-Ring at top right */}
      <div className="relative mb-12 flex items-start justify-between">
        <div className="flex-1 pr-4">
          <ProcessHeader />
        </div>

        {/* Small Decorative Half-Ring (~160px) at Top-Right */}
        <div className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 relative -mt-2">
          <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
            {/* Track */}
            <path
              d="M 140 10 A 70 70 0 0 0 140 150"
              fill="none"
              stroke="var(--surface-2)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Animated progress arc */}
            <motion.path
              d="M 140 10 A 70 70 0 0 0 140 150"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={miniArcLength}
              style={{ strokeDashoffset: miniDashoffset }}
            />
          </svg>
        </div>
      </div>

      {/* Vertical Rail + Step Blocks */}
      <div className="relative pl-8 sm:pl-12 space-y-12 sm:space-y-16">
        {/* Background Vertical 2px Track Line */}
        <div className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 w-[2px] bg-[var(--border)]" />

        {/* Dynamic Foreground Progress Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-[19px] sm:left-[23px] top-6 w-[2px] bg-[var(--accent)] origin-top z-0"
        />

        {steps.map((step) => {
          const IconComponent = iconMap[step.icon] || Search;

          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative z-10"
            >
              {/* 40px Numbered Node on the Rail */}
              <div className="absolute -left-8 sm:-left-12 top-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[var(--surface)] border-2 border-[var(--border)] flex items-center justify-center font-heading font-bold text-xs sm:text-sm text-[var(--muted)] shadow-sm">
                <span>{step.number}</span>
              </div>

              {/* Step Block Content */}
              <div className="pt-1 flex flex-col gap-4">
                {/* Duration Pill + Step label */}
                <div className="flex items-center gap-2.5">
                  <span className="font-sans font-semibold text-xs tracking-wider uppercase text-[var(--accent)]">
                    STEP {step.number}
                  </span>
                  <div className="w-px h-3 bg-[var(--border)]" />
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)] font-sans text-[11px] font-semibold text-[var(--muted)]">
                    <Clock className="w-3 h-3 text-[var(--accent)]" />
                    <span>{step.duration}</span>
                  </span>
                </div>

                {/* Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-[var(--text)]">
                    {step.title}
                  </h3>
                </div>

                {/* Summary */}
                <p className="font-sans text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                  {step.summary}
                </p>

                {/* 3 Points */}
                <div className="flex flex-col gap-2 pt-1">
                  {step.points.map((pt, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-sans font-medium text-[var(--text)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Deliverables */}
                <div className="pt-2">
                  <span className="block font-sans text-xs uppercase tracking-wider font-semibold text-[var(--muted)] mb-2">
                    You receive
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.deliverables.map((deliv, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-sans font-semibold text-[var(--text)]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)]" />
                        <span>{deliv}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Closing CTA Row */}
      <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-heading font-bold text-lg sm:text-xl text-[var(--text)]">
            Ready to start step one?
          </h4>
          <p className="font-sans text-xs text-[var(--muted)] mt-0.5">
            Let&apos;s turn your vision into a production-grade digital experience.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="#contact"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] font-sans font-semibold text-sm shadow-md"
          >
            <span>Let&apos;s talk</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/#projects"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] font-sans font-semibold text-sm"
          >
            <span>Projects</span>
            <ArrowUpRight className="w-4 h-4 text-[var(--muted)]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
