"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ProcessStep } from "@/data/site";
import { useProcessScroll } from "./useProcessScroll";
import ProcessHeader from "./ProcessHeader";
import ProcessStepContent from "./ProcessStepContent";
import ProcessRing from "./ProcessRing";
import MagneticButton from "@/components/ui/MagneticButton";

interface ProcessStageProps {
  steps: ProcessStep[];
}

export default function ProcessStage({ steps }: ProcessStageProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const { progress, activeStep, scrollToStep } = useProcessScroll({
    trackRef,
    stageRef,
    totalSteps: steps.length,
  });

  // Keyboard navigation when stage is focused
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      if (activeStep < steps.length - 1) {
        scrollToStep(activeStep + 1);
      }
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      if (activeStep > 0) {
        scrollToStep(activeStep - 1);
      }
    }
  };

  // Check if we are near the end of the track (last 15% of scroll) to fade in closing CTA
  const isEnding = progress >= 0.85;

  return (
    <div
      ref={trackRef}
      className="relative w-full hidden lg:block"
      style={{
        // ~100vh per step + 30vh tail
        height: `${steps.length * 100 + 30}vh`,
      }}
    >
      {/* 100vh Pinned Stage Container */}
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="Process steps interactive showcase"
        className="w-full h-screen sticky top-0 flex flex-col justify-between px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto py-8 lg:py-12 outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] select-none overflow-hidden"
      >
        {/* Header at the top */}
        <ProcessHeader />

        {/* 12-Column Stage Body */}
        <div className="grid grid-cols-12 gap-8 items-center flex-1 min-h-0">
          {/* Left Column (5-6 cols): Step Content */}
          <div className="col-span-5 xl:col-span-6 h-full flex items-center min-h-0">
            {steps[activeStep] && (
              <ProcessStepContent
                step={steps[activeStep]}
                stepIndex={activeStep}
                totalSteps={steps.length}
              />
            )}
          </div>

          {/* Right Column (6-7 cols): Semicircular Ring */}
          <div className="col-span-7 xl:col-span-6 h-full flex items-center justify-end">
            <ProcessRing
              steps={steps}
              activeStep={activeStep}
              progress={progress}
              onSelectStep={scrollToStep}
            />
          </div>
        </div>

        {/* Closing CTA Bar - Fades in near end of the pin */}
        <div
          className={`pt-4 border-t border-[var(--border)] flex items-center justify-between transition-all duration-500 ${
            isEnding
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <span className="font-heading font-bold text-lg text-[var(--text)]">
            Ready to start step one?
          </span>

          <div className="flex items-center gap-4">
            <MagneticButton strength={0.25} as="a" href="#contact">
              <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--text)] text-[var(--bg)] font-sans font-semibold text-sm hover:opacity-90 transition-opacity shadow-md">
                <span>Let&apos;s talk</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </MagneticButton>

            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] font-sans font-semibold text-sm hover:border-[var(--accent)] transition-colors"
            >
              <span>See my projects</span>
              <ArrowUpRight className="w-4 h-4 text-[var(--muted)]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

