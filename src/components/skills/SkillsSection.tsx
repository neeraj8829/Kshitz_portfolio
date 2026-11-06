"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { siteData } from "@/data/site";
import HighlightText from "@/components/ui/HighlightText";
import SkillCard3D from "./SkillCard3D";
import { Sparkles } from "lucide-react";

// Lazy-load the interactive showcase component for peak performance
const SkillRing3D = dynamic(() => import("./SkillRing3D"), {
  ssr: false,
  loading: () => <StageLoadingSkeleton />,
});

function StageLoadingSkeleton() {
  return (
    <div className="w-full h-[520px] sm:h-[600px] lg:h-[660px] flex items-center justify-center rounded-3xl bg-surface/40 border border-warmBorder animate-pulse">
      <div className="flex flex-col items-center gap-2 text-muted">
        <div className="w-12 h-12 rounded-full border-2 border-accent/40 border-t-accent animate-spin" />
        <span className="text-xs font-mono uppercase tracking-wider">Loading Showcase...</span>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <section
      id="skills"
      className="pt-24 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden bg-bg"
      aria-label="Skills & Technologies"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="eyebrow-label mb-3 flex items-center gap-2 text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 — SKILLS</span>
          </div>

          <h2 className="section-h2 text-primaryText tracking-tight mb-4">
            The tools I <HighlightText>build</HighlightText> with.
          </h2>

          <p className="body-large text-muted max-w-2xl">
            A curated showcase of the technologies, frameworks, and design systems I leverage to craft tactile, production-grade applications.
          </p>
        </div>

        {/* Visually Hidden Accessible List for Screen Readers */}
        <div className="sr-only" role="region" aria-label="List of technical skills">
          <h3>All Core Technologies for Kshitiz</h3>
          <ul>
            {siteData.skills.map((skill) => (
              <li key={skill.id}>
                {skill.name} - {skill.category} ({skill.level}% proficiency, {skill.years}+ years experience): {skill.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Circular Showcase or Reduced-Motion Fallback Grid */}
        <div>
          {prefersReducedMotion ? (
            /* Reduced Motion Fallback: Responsive Static Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {siteData.skills.map((skill) => (
                <SkillCard3D key={skill.id} skill={skill} compact />
              ))}
            </div>
          ) : (
            /* Interactive Circular Skills Showcase */
            <div className="relative w-full rounded-3xl bg-surface/30 border border-warmBorder/70 shadow-subtle p-2 sm:p-4 backdrop-blur-xs">
              <SkillRing3D skills={siteData.skills} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
