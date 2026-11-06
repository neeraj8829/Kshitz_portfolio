"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { siteData } from "@/data/site";

export default function ThemeSwitcherButton() {
  const { theme, togglePanel, isPanelOpen } = useTheme();

  // Support config toggle & NEXT_PUBLIC_SHOW_THEME_SWITCHER override
  const envDisabled =
    process.env.NEXT_PUBLIC_SHOW_THEME_SWITCHER === "false" ||
    process.env.NEXT_PUBLIC_SHOW_THEME_SWITCHER === "0";
  const isEnabled = siteData.config.showThemeSwitcher && !envDisabled;

  if (!isEnabled) return null;

  return (
    <button
      onClick={togglePanel}
      aria-label="Change color theme (Press T)"
      title="Change theme (T)"
      className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 flex items-center gap-2 sm:gap-2.5 px-3 py-3 sm:px-4 sm:py-2.5 rounded-full bg-surface/95 hover:bg-surface-2 text-primaryText border border-warmBorder shadow-card hover:shadow-card-hover transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group ${
        isPanelOpen ? "ring-2 ring-accent" : ""
      }`}
    >
      {/* 3 Color Dots representing active theme */}
      <div className="flex items-center -space-x-1.5" aria-hidden="true">
        <span
          className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-xs"
          style={{ backgroundColor: theme.tokens.bg }}
        />
        <span
          className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-xs ring-1 ring-surface"
          style={{ backgroundColor: theme.tokens.accent }}
        />
        <span
          className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-xs ring-1 ring-surface"
          style={{ backgroundColor: theme.tokens.accent2 }}
        />
      </div>

      {/* Text Label on desktop, hidden on tiny mobile screens */}
      <span className="hidden sm:inline-block text-xs font-heading font-bold uppercase tracking-wider text-primaryText">
        Theme
      </span>

      {/* Tiny keyboard hint */}
      <kbd className="hidden md:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono text-muted bg-bg border border-warmBorder rounded group-hover:text-primaryText">
        T
      </kbd>
    </button>
  );
}
