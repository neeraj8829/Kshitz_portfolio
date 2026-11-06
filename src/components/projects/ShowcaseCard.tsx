"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Project } from "@/data/site";
import ProjectMockup from "./ProjectMockup";
import TechChip from "./TechChip";
import ProjectMetrics from "./ProjectMetrics";
import MagneticButton from "@/components/ui/MagneticButton";
import { GithubIcon } from "@/components/ui/SocialIcons";

interface ShowcaseCardProps {
  project: Project;
  index: number;
}

export default function ShowcaseCard({
  project,
  index,
}: ShowcaseCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 1; // Alternating layout

  // Stacking scroll effect on desktop: scale down to 0.94 and opacity to 0.7
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.6, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.7]);

  // Index-based top offset: top: 100px + index * 20px
  const stickyTop = 100 + index * 20;

  return (
    <div
      ref={containerRef}
      className="w-full lg:sticky transition-all duration-300 mb-8 lg:mb-16"
      style={{
        top: `clamp(80px, ${stickyTop}px, 220px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        data-cursor="view"
        data-cursor-text="View"
        className="w-full max-w-[1200px] mx-auto min-h-auto lg:min-h-[560px] rounded-[28px] sm:rounded-[36px] bg-[var(--surface)] border border-[var(--border)] p-4 sm:p-5 lg:p-6 shadow-xl relative overflow-hidden group hover:border-[var(--accent)]/30 transition-all duration-300"
      >
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}>
          {/* Content Column (~44% width: col-span-5) */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between py-2 sm:py-4 px-2 sm:px-4 lg:px-6 gap-5 sm:gap-6 ${
              isEven ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {/* Top row: Number, Divider, Category, Year Pill */}
            <div className="flex items-center gap-3">
              <span className="font-heading font-bold text-sm tracking-wider text-[var(--accent)]">
                {project.number || `0${index + 1}`}
              </span>
              <div className="w-px h-3.5 bg-[var(--border)]" aria-hidden="true" />
              <span className="font-sans font-semibold text-xs sm:text-[13px] text-[var(--muted)] capitalize">
                {project.category}
              </span>
              <div className="w-px h-3.5 bg-[var(--border)]" aria-hidden="true" />
              <span className="px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--bg)] text-[11px] font-sans font-medium text-[var(--muted)]">
                {project.year}
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`View case study: ${project.title}`}
                className="group/link inline-block"
              >
                <h3 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[42px] leading-[1.1] tracking-tight text-[var(--text)] group-hover/link:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>
              </Link>
              <p className="font-sans font-medium text-base sm:text-[17px] text-[var(--text)]/80 mt-1.5">
                {project.tagline}
              </p>
            </div>

            {/* Description (max 3 lines clamp) */}
            <p className="font-sans text-sm sm:text-base text-[var(--muted)] line-clamp-3 leading-relaxed max-w-[52ch]">
              {project.description}
            </p>

            {/* Metrics Row */}
            {project.metrics && project.metrics.length > 0 && (
              <ProjectMetrics metrics={project.metrics} />
            )}

            {/* Tech Chips */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <TechChip key={t} name={t} index={i} />
              ))}
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <MagneticButton strength={0.2} as="a" href={`/projects/${project.slug}`}>
                <span className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--text)] text-[var(--bg)] font-sans font-semibold text-sm hover:opacity-90 transition-all group/btn shadow-md">
                  <span>View case study</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </MagneticButton>

              {project.links?.live && (
                <MagneticButton strength={0.2} as="a" href={project.links.live} target="_blank">
                  <span className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] font-sans font-semibold text-sm hover:border-[var(--accent)] transition-colors shadow-xs">
                    <span>Live site</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--muted)]" />
                  </span>
                </MagneticButton>
              )}

              {project.links?.github && (
                <MagneticButton strength={0.2} as="a" href={project.links.github} target="_blank">
                  <span
                    aria-label="View source on GitHub"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors shadow-xs"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </span>
                </MagneticButton>
              )}
            </div>
          </div>

          {/* Mockup Stage Column (~56% width: col-span-7) */}
          <div
            className={`lg:col-span-7 w-full h-[280px] sm:h-[380px] lg:h-[500px] ${
              isEven ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block w-full h-full"
              tabIndex={-1}
              aria-hidden="true"
            >
              <ProjectMockup project={project} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
