"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpertiseDomain } from "@/data/site";
import DomainSelector from "./DomainSelector";
import DomainPanel from "./DomainPanel";
import SkillTile from "./SkillTile";
import { ChevronDown, ArrowUpRight } from "lucide-react";

interface DomainExplorerProps {
  domains: ExpertiseDomain[];
}

const AUTO_ADVANCE_DURATION = 7000; // 7 seconds
const UPDATE_INTERVAL = 100; // 100ms update tick

export default function DomainExplorer({ domains }: DomainExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteractedManually, setHasInteractedManually] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mobile Accordion state: index of open accordion item
  const [openMobileIndex, setOpenMobileIndex] = useState<number>(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  // Auto-advance timer (Desktop only, if not manually cancelled and not reduced motion)
  useEffect(() => {
    if (reducedMotion || hasInteractedManually || isPaused) {
      setProgressPercent(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / AUTO_ADVANCE_DURATION) * 100, 100);
      setProgressPercent(pct);

      if (elapsed >= AUTO_ADVANCE_DURATION) {
        setActiveIndex((prev) => (prev + 1) % domains.length);
      }
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, hasInteractedManually, reducedMotion, domains.length]);

  const handleSelectDomain = (index: number, manualClick = false) => {
    setActiveIndex(index);
    setProgressPercent(0);
    if (manualClick) {
      setHasInteractedManually(true);
    }
  };

  const handleToggleMobile = (index: number) => {
    setOpenMobileIndex(openMobileIndex === index ? -1 : index);
  };

  return (
    <div className="w-full">
      {/* =========================================================
          DESKTOP (1024px+): SPLIT TWO-COLUMN VIEW
          ========================================================= */}
      <div
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          boxShadow: "0 24px 60px color-mix(in srgb, var(--text) 5%, transparent)",
        }}
        className="hidden lg:grid grid-cols-12 gap-8 p-3.5 rounded-[32px] border items-stretch"
      >
        {/* Left Column: Domain Selector (~38%) */}
        <div className="col-span-5 flex flex-col justify-center p-3">
          <DomainSelector
            domains={domains}
            activeIndex={activeIndex}
            onSelect={handleSelectDomain}
            isAutoAdvancing={!hasInteractedManually && !reducedMotion && !isPaused}
            progressPercent={progressPercent}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
          />
        </div>

        {/* Right Column: Detail Panel (~62%) */}
        <div className="col-span-7 flex">
          <DomainPanel domain={domains[activeIndex]} />
        </div>
      </div>

      {/* =========================================================
          MOBILE / TABLET (< 1024px): EXPANDABLE ACCORDION
          ========================================================= */}
      <div className="lg:hidden flex flex-col gap-3.5 w-full">
        {domains.map((domain, index) => {
          const isOpen = openMobileIndex === index;

          return (
            <div
              key={domain.id}
              style={{
                backgroundColor: "var(--surface)",
                borderColor: isOpen
                  ? "color-mix(in srgb, var(--accent) 40%, transparent)"
                  : "var(--border)",
              }}
              className="rounded-2xl border overflow-hidden transition-colors duration-200"
            >
              {/* Accordion Trigger Row */}
              <button
                type="button"
                onClick={() => handleToggleMobile(index)}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${domain.id}`}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer min-h-[52px]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-accent">
                    {domain.number}
                  </span>
                  <h4 className="font-heading font-semibold text-base sm:text-lg text-primaryText">
                    {domain.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-body text-muted hidden sm:inline-block">
                    {domain.skills.length} skills
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-7 h-7 rounded-full bg-bg border border-warmBorder flex items-center justify-center text-primaryText"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>
              </button>

              {/* Accordion Collapsible Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`accordion-panel-${domain.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-warmBorder/60">
                      <p className="font-body text-xs sm:text-sm text-muted mb-4 leading-relaxed">
                        {domain.fullDesc}
                      </p>

                      {/* Skills Grid: 1 col on mobile, 2 col above 520px */}
                      <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-2.5 mb-5">
                        {domain.skills.map((skill, sIdx) => (
                          <SkillTile key={skill.name} skill={skill} index={sIdx} />
                        ))}
                      </div>

                      {/* Footer Row */}
                      <div className="pt-3 border-t border-warmBorder/60 flex flex-col gap-2 text-xs">
                        <div className="flex items-center gap-2 text-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="font-semibold text-primaryText">Exploring:</span>
                          <span className="truncate">{domain.exploring}</span>
                        </div>

                        <a
                          href="#projects"
                          className="inline-flex items-center gap-1 font-semibold text-accent pt-1"
                        >
                          <span>See related projects</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
