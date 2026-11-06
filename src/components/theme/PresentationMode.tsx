"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { THEMES } from "@/data/themes";
import { Play, Pause, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PresentationMode() {
  const {
    isPresentationPlaying,
    togglePresentation,
    stopPresentation,
    presentationProgress,
    currentThemeIndex,
    theme,
    nextTheme,
    prevTheme,
  } = useTheme();

  if (!isPresentationPlaying) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -25, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-md bg-surface/95 backdrop-blur-md rounded-2xl border border-warmBorder shadow-float p-3 sm:p-4 text-primaryText"
        role="region"
        aria-label="Theme Presentation Mode Controls"
      >
        {/* Top Info Row */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Theme {currentThemeIndex + 1}/{THEMES.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Prev */}
            <button
              onClick={prevTheme}
              aria-label="Previous theme"
              className="p-1.5 rounded-lg hover:bg-bg text-primaryText transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePresentation}
              aria-label={isPresentationPlaying ? "Pause presentation" : "Play presentation"}
              className="p-1.5 rounded-lg bg-accent text-onAccent hover:bg-accent-hover transition-colors"
            >
              {isPresentationPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={nextTheme}
              aria-label="Next theme"
              className="p-1.5 rounded-lg hover:bg-bg text-primaryText transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Exit */}
            <button
              onClick={stopPresentation}
              aria-label="Exit presentation mode"
              className="p-1.5 rounded-lg hover:bg-bg text-muted hover:text-primaryText transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Theme Name & Mood */}
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-heading font-bold text-sm text-primaryText truncate max-w-[220px]">
            {theme.name}
          </span>
          <span className="text-[11px] font-body text-muted italic">
            {theme.mood}
          </span>
        </div>

        {/* Animated 4s Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-bg border border-warmBorder overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${presentationProgress}%` }}
          />
        </div>

        {/* Keyboard shortcut hint */}
        <div className="mt-2 text-[10px] font-mono text-muted/70 text-center">
          Left/Right arrows change theme • Esc stops
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

