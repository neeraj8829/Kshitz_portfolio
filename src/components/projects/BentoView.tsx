"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { Project } from "@/data/site";
import BentoCard from "./BentoCard";

interface BentoViewProps {
  projects: Project[];
}

export default function BentoView({ projects }: BentoViewProps) {
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

  // Exact 12-column spans when 6 projects are present:
  // Row 1: 7, 5
  // Row 2: 5, 7
  // Row 3: 6, 6
  const getColSpan = (index: number, total: number) => {
    if (total === 6) {
      if (index === 0) return "lg:col-span-7";
      if (index === 1) return "lg:col-span-5";
      if (index === 2) return "lg:col-span-5";
      if (index === 3) return "lg:col-span-7";
      if (index === 4) return "lg:col-span-6";
      if (index === 5) return "lg:col-span-6";
    }
    if (total === 2) return "lg:col-span-6";
    if (total === 4) return "lg:col-span-6";
    if (total === 3) {
      if (index === 0) return "lg:col-span-12";
      return "lg:col-span-6";
    }
    if (total === 1) return "lg:col-span-12 max-w-2xl mx-auto";
    return "lg:col-span-6";
  };

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 pb-12"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, idx) => (
          <motion.div
            key={project.slug}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            className={`w-full ${getColSpan(idx, projects.length)}`}
          >
            <BentoCard project={project} colSpanClass="w-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

