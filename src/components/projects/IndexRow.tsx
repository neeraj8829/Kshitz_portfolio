"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/site";
import ProjectMockup from "./ProjectMockup";

interface IndexRowProps {
  project: Project;
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export default function IndexRow({
  project,
  index,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
}: IndexRowProps) {
  // If another row is hovered, dim this row to 25% opacity
  const dimOpacity = isAnyHovered && !isHovered ? 0.25 : 1;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-cursor="view"
      data-cursor-text="Open"
      className="w-full border-b border-[var(--border)] transition-opacity duration-300"
      style={{ opacity: dimOpacity }}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
        className="w-full py-6 sm:py-8 px-2 flex items-center justify-between gap-4 group cursor-pointer"
      >
        {/* Left: Number & Giant Title */}
        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
          <span className="font-sans font-bold text-xs sm:text-sm text-[var(--muted)] shrink-0 w-6">
            {project.number || `0${index + 1}`}
          </span>

          <h3
            className={`font-heading font-bold text-[clamp(1.5rem,5.5vw,4.5rem)] leading-none tracking-tight transition-all duration-300 ${
              isHovered
                ? "text-[var(--text)] translate-x-3 sm:translate-x-4"
                : "text-[var(--text)]/35"
            }`}
          >
            {project.title}
          </h3>
        </div>

        {/* Right side: Category, Year, Mobile Thumbnail & Arrow */}
        <div className="flex items-center gap-4 sm:gap-8 shrink-0">
          <div className="hidden md:flex flex-col items-end">
            <span className="font-sans font-semibold text-xs uppercase tracking-wider text-[var(--text)]">
              {project.category}
            </span>
            <span className="font-sans text-xs text-[var(--muted)]">
              {project.year}
            </span>
          </div>

          {/* Mobile Thumbnail (88x64) */}
          <div className="md:hidden w-[88px] h-[64px] rounded-xl overflow-hidden border border-[var(--border)] shrink-0">
            <ProjectMockup project={project} compact showPhone={false} />
          </div>

          {/* Arrow Icon */}
          <div
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] flex items-center justify-center transition-all duration-300 ${
              isHovered
                ? "bg-[var(--accent)] text-[var(--on-accent)] rotate-45 border-transparent"
                : "group-hover:border-[var(--accent)]/50"
            }`}
          >
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}

