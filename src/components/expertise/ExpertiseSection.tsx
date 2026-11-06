"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/site";
import ExpertiseHeader from "./ExpertiseHeader";
import DomainExplorer from "./DomainExplorer";
import ExpertiseBento from "./ExpertiseBento";
import ExpertiseViewSwitcher, { ExpertiseViewType } from "./ExpertiseViewSwitcher";

export default function ExpertiseSection() {
  const [currentView, setCurrentView] = useState<ExpertiseViewType>("explorer");

  useEffect(() => {
    // Check URL query param first
    const params = new URLSearchParams(window.location.search);
    const paramView = params.get("expertise") as ExpertiseViewType | null;

    if (paramView === "explorer" || paramView === "bento") {
      setCurrentView(paramView);
      return;
    }

    // Check localStorage
    try {
      const saved = localStorage.getItem("kshitiz-expertise-view") as ExpertiseViewType | null;
      if (saved === "explorer" || saved === "bento") {
        setCurrentView(saved);
        return;
      }
    } catch {}

    // Fallback to config default
    setCurrentView(siteData.config.defaultExpertiseView || "explorer");
  }, []);

  const handleViewChange = (view: ExpertiseViewType) => {
    setCurrentView(view);
    try {
      localStorage.setItem("kshitiz-expertise-view", view);
    } catch {}

    // Update URL param without page reload
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("expertise", view);
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <section
      id="expertise"
      aria-label="Expertise & Core Domains"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <ExpertiseHeader />

        {/* View Switcher Controls (if enabled in siteData.config) */}
        {siteData.config.showExpertiseViewSwitcher && (
          <div className="flex items-center justify-end mb-6 sm:mb-8">
            <ExpertiseViewSwitcher
              currentView={currentView}
              onViewChange={handleViewChange}
            />
          </div>
        )}

        {/* Dynamic View Display: Explorer vs Bento */}
        <AnimatePresence mode="wait">
          {currentView === "explorer" ? (
            <motion.div
              key="explorer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <DomainExplorer domains={siteData.expertiseDomains} />
            </motion.div>
          ) : (
            <motion.div
              key="bento"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ExpertiseBento domains={siteData.expertiseDomains} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

