"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteData, ProjectCategory } from "@/data/site";
import ProjectsHeader from "./ProjectsHeader";
import { FilterCategory } from "./ProjectFilter";
import { ProjectsViewMode } from "./ProjectsViewSwitcher";
import ShowcaseView from "./ShowcaseView";
import BentoView from "./BentoView";
import IndexView from "./IndexView";
import MagneticButton from "@/components/ui/MagneticButton";

const STORAGE_KEY = "kshitiz-projects-view";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [currentView, setCurrentView] = useState<ProjectsViewMode>(
    siteData.config.defaultProjectsView || "showcase"
  );

  // Sync with URL query parameters and localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam && ["all", "web", "design", "apps"].includes(categoryParam.toLowerCase())) {
      setActiveCategory(categoryParam.toLowerCase() as FilterCategory);
    }

    const projectsParam = params.get("projects");
    if (projectsParam && ["showcase", "bento", "index"].includes(projectsParam.toLowerCase())) {
      setCurrentView(projectsParam.toLowerCase() as ProjectsViewMode);
    } else {
      const savedView = localStorage.getItem(STORAGE_KEY) as ProjectsViewMode | null;
      if (savedView && ["showcase", "bento", "index"].includes(savedView)) {
        setCurrentView(savedView);
      }
    }
  }, []);

  // Handler for category change with URL sync
  const handleSelectCategory = (cat: FilterCategory) => {
    setActiveCategory(cat);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", cat);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Handler for view change with localStorage & URL sync
  const handleViewChange = (view: ProjectsViewMode) => {
    setCurrentView(view);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, view);
      const url = new URL(window.location.href);
      url.searchParams.set("projects", view);
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return siteData.projects;
    return siteData.projects.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  // Counts for all categories
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      all: siteData.projects.length,
      web: 0,
      design: 0,
      apps: 0,
    };
    siteData.projects.forEach((p) => {
      const cat = p.category.toLowerCase() as ProjectCategory;
      if (counts[cat] !== undefined) {
        counts[cat] += 1;
      }
    });
    return counts;
  }, []);

  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Section Header with single-row filter & view switcher */}
      <ProjectsHeader
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        categoryCounts={categoryCounts}
        currentView={currentView}
        onViewChange={handleViewChange}
        showViewSwitcher={siteData.config.showProjectsViewSwitcher}
      />

      {/* Main Views Container with Cross-Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === "showcase" && (
            <ShowcaseView projects={filteredProjects} />
          )}
          {currentView === "bento" && (
            <BentoView projects={filteredProjects} />
          )}
          {currentView === "index" && (
            <IndexView projects={filteredProjects} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* GitHub Callout / More Repositories */}
      <div className="mt-12 sm:mt-16 text-center">
        <MagneticButton strength={0.25} as="a" href={siteData.profile.socials.github} target="_blank">
          <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--surface)] hover:bg-[var(--text)] text-[var(--text)] hover:text-[var(--bg)] border border-[var(--border)] text-sm font-sans font-semibold transition-all duration-300 shadow-md">
            <span>Explore 30+ More Repositories on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </MagneticButton>
      </div>
    </section>
  );
}
