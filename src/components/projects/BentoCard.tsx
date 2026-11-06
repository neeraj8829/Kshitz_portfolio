"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/site";
import ProjectMockup from "./ProjectMockup";
import TechChip from "./TechChip";

interface BentoCardProps {
  project: Project;
  colSpanClass?: string;
}

export default function BentoCard({ project, colSpanClass = "lg:col-span-6" }: BentoCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const spotlightX = useMotionValue(-500);
  const spotlightY = useMotionValue(-500);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const visibleTech = project.tech.slice(0, 3);
  const remainingTechCount = project.tech.length - visibleTech.length;

  return (
    <motion.div
      layout
      className={`w-full ${colSpanClass} flex flex-col`}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        data-cursor="view"
        data-cursor-text="View"
        className="w-full h-[400px] sm:h-[440px] rounded-[32px] bg-[var(--surface)] border border-[var(--border)] p-3 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[var(--accent)]/40"
      >
        {/* Spotlight Follower */}
        <motion.div
          className="pointer-events-none absolute w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            left: spotlightX,
            top: spotlightY,
            background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 70%)",
          }}
        />

        {/* Mockup Stage (~62% height) */}
        <div className="relative w-full h-[62%] rounded-[24px] overflow-hidden z-10">
          <ProjectMockup project={project} compact showPhone={false} />

          {/* Solid Top-Right Circular Arrow Button */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-[var(--on-accent)] group-hover:border-transparent group-hover:rotate-45 shadow-sm z-20">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Content Area (~38% height) */}
        <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 z-10">
          {/* Title Row: Title left, Year pill right */}
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-heading font-bold text-xl sm:text-2xl text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
              {project.title}
            </h4>
            <span className="px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--bg)] text-[11px] font-sans font-medium text-[var(--muted)] shrink-0">
              {project.year}
            </span>
          </div>

          {/* Tagline: Single-line ellipsis */}
          <p className="font-sans text-xs sm:text-sm text-[var(--muted)] truncate max-w-full">
            {project.tagline}
          </p>

          {/* Tech chips row: up to 3 chips + remaining counter */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {visibleTech.map((t, i) => (
              <TechChip key={t} name={t} index={i} className="py-1 px-2.5 text-[11px]" />
            ))}
            {remainingTechCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[11px] font-sans font-semibold text-[var(--muted)]">
                +{remainingTechCount}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
