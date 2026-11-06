"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { Project } from "@/data/site";
import ShowcaseCard from "./ShowcaseCard";

interface ShowcaseViewProps {
  projects: Project[];
}

export default function ShowcaseView({ projects }: ShowcaseViewProps) {
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
    <div className="relative pb-12">
      <AnimatePresence mode="popLayout">
        {projects.map((project, idx) => (
          <motion.div
            key={project.slug}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <ShowcaseCard
              project={project}
              index={idx}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
