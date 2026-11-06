"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { Project } from "@/data/site";
import IndexRow from "./IndexRow";
import ProjectMockup from "./ProjectMockup";

interface IndexViewProps {
  projects: Project[];
}

export default function IndexView({ projects }: IndexViewProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for floating preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Velocity-based rotation for organic feel
  const xVelocity = useVelocity(smoothX);
  const rotatePreview = useTransform(xVelocity, [-1500, 1500], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const activeProject = projects.find((p) => p.slug === hoveredSlug);

  if (projects.length === 0) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)]">
        <FolderGit2 className="w-12 h-12 text-[var(--muted)] mb-3 opacity-60" />
        <h4 className="font-heading font-bold text-lg text-[var(--text)] mb-1">
          No projects in this category yet
        </h4>
        <p className="font-sans text-sm text-[var(--muted)]">
          Please check back soon or select another category above.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full border-t border-[var(--border)] pb-16 select-none"
    >
      {/* List of project rows */}
      {projects.map((project, idx) => (
        <IndexRow
          key={project.slug}
          project={project}
          index={idx}
          isHovered={hoveredSlug === project.slug}
          isAnyHovered={hoveredSlug !== null}
          onHover={() => setHoveredSlug(project.slug)}
          onLeave={() => setHoveredSlug(null)}
        />
      ))}

      {/* Floating Cursor Preview on Desktop (320x220) */}
      <div className="hidden lg:block pointer-events-none absolute inset-0 overflow-visible z-30">
        <AnimatePresence>
          {hoveredSlug && activeProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                x: smoothX,
                y: smoothY,
                rotate: rotatePreview,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="absolute top-0 left-0 w-[320px] h-[220px] rounded-[20px] overflow-hidden shadow-2xl border border-[var(--border)] pointer-events-none"
            >
              <ProjectMockup project={activeProject} compact showPhone={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

