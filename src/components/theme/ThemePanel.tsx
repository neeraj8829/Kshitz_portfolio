"use client";

import React, { useState, useMemo } from "react";
import { useTheme } from "./ThemeProvider";
import { THEMES, ThemeCategory, DEFAULT_THEME_ID } from "@/data/themes";
import { siteData } from "@/data/site";
import ThemeCard from "./ThemeCard";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";
import {
  X,
  Palette,
  Play,
  Share2,
  Sparkles,
  RotateCcw,
  ExternalLink,
  Type,
  Check,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemePanel() {
  const {
    isPanelOpen,
    setIsPanelOpen,
    theme,
    themeId,
    setTheme,
    favorites,
    togglePresentation,
    setFinalTheme,
    font,
    setFont,
    copyThemeLink,
  } = useTheme();

  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<ThemeCategory>("all");
  const [activeTab, setActiveTab] = useState<"themes" | "typography">("themes");

  // Prevent background scrolling and lock wheel to drawer when panel is open
  React.useEffect(() => {
    if (isPanelOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isPanelOpen]);

  // Filter themes
  const filteredThemes = useMemo(() => {
    if (selectedCategory === "all") return THEMES;
    if (selectedCategory === "favorites") {
      return THEMES.filter((t) => favorites.includes(t.id));
    }
    return THEMES.filter((t) => t.category === selectedCategory);
  }, [selectedCategory, favorites]);

  const handleCopyLink = async () => {
    await copyThemeLink();
    showToast(`Direct link copied: ?theme=${themeId}`, "success");
  };

  const handleFinalise = () => {
    setFinalTheme(themeId);
    showToast(`Theme finalized: ${theme.name}!`, "success");
  };

  const handleReset = () => {
    setTheme(DEFAULT_THEME_ID, true);
    showToast("Reset to default Warm Beige theme", "info");
  };

  const handleStartPresentation = () => {
    setIsPanelOpen(false);
    togglePresentation();
    showToast("Starting presentation mode (auto-cycling every 4s)", "info");
  };

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Theme Customizer">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPanelOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          {/* Sliding Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10 h-full">
            <motion.div
              data-lenis-prevent="true"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-screen max-w-2xl h-full max-h-screen bg-surface shadow-float border-l border-warmBorder flex flex-col justify-between overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-warmBorder bg-surface sticky top-0 z-10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-primaryText leading-tight">
                        Color Themes (9 Light Palettes)
                      </h3>
                      <p className="text-xs text-muted">
                        Pick a palette to preview the entire website live
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Presentation Mode Button */}
                    <button
                      onClick={handleStartPresentation}
                      title="Play all themes auto-cycling"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-onAccent text-xs font-heading font-semibold hover:bg-accent-hover transition-colors shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Play All</span>
                    </button>

                    {/* Close Button */}
                    <button
                      onClick={() => setIsPanelOpen(false)}
                      aria-label="Close panel"
                      className="p-2 rounded-full hover:bg-bg text-muted hover:text-primaryText transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Subnav Tabs: Themes vs Typography (if enabled) */}
                {siteData.config.showFontSwitcher && (
                  <div className="flex items-center gap-2 pt-1 border-t border-warmBorder/60">
                    <button
                      onClick={() => setActiveTab("themes")}
                      className={`px-3 py-1 rounded-full text-xs font-heading font-semibold transition-colors ${
                        activeTab === "themes"
                          ? "bg-accent text-onAccent"
                          : "text-muted hover:text-primaryText bg-bg"
                      }`}
                    >
                      Themes (9)
                    </button>
                    <button
                      onClick={() => setActiveTab("typography")}
                      className={`px-3 py-1 rounded-full text-xs font-heading font-semibold transition-colors flex items-center gap-1.5 ${
                        activeTab === "typography"
                          ? "bg-accent text-onAccent"
                          : "text-muted hover:text-primaryText bg-bg"
                      }`}
                    >
                      <Type className="w-3.5 h-3.5" />
                      <span>Typography (3)</span>
                    </button>
                  </div>
                )}

                {/* Category Filter Pills (Themes View) */}
                {activeTab === "themes" && (
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                    {[
                      { id: "all", label: `All (${THEMES.length})` },
                      { id: "warm", label: "Warm" },
                      { id: "cool", label: "Cool" },
                      { id: "neutral", label: "Neutral" },
                      {
                        id: "favorites",
                        label: `Favorites (${favorites.length})`,
                        icon: Heart,
                      },
                    ].map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id as ThemeCategory)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-heading font-medium transition-colors whitespace-nowrap ${
                            isSelected
                              ? "bg-primaryText text-bg"
                              : "bg-surface-2/80 hover:bg-surface-2 text-primaryText border border-warmBorder"
                          }`}
                        >
                          {Icon && (
                            <Icon
                              className={`w-3 h-3 ${
                                favorites.length > 0 ? "fill-current text-accent" : ""
                              }`}
                            />
                          )}
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Scrollable Content Body */}
              <div
                data-lenis-prevent="true"
                className="p-5 sm:p-6 overflow-y-auto overscroll-contain flex-1 space-y-6"
              >
                {activeTab === "themes" ? (
                  <>
                    {filteredThemes.length === 0 ? (
                      <div className="p-8 text-center bg-surface-2/40 rounded-3xl border border-warmBorder">
                        <Heart className="w-8 h-8 text-muted mx-auto mb-2 opacity-50" />
                        <h4 className="font-heading font-bold text-sm text-primaryText mb-1">
                          No favorites marked yet
                        </h4>
                        <p className="text-xs text-muted mb-4">
                          Tap the heart icon on any theme card to save it here for comparison.
                        </p>
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className="px-4 py-1.5 rounded-full bg-accent text-onAccent text-xs font-heading font-semibold"
                        >
                          View all themes
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredThemes.map((t) => (
                          <ThemeCard
                            key={t.id}
                            theme={t}
                            onSelect={() => {}}
                            showApplyButton
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* Typography System Switcher */
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-surface-2/60 border border-warmBorder">
                      <p className="text-xs text-muted leading-relaxed">
                        Typography operates independently of color themes. All 3 options use modern, clean sans fonts (no decorative serifs).
                      </p>
                    </div>

                    <div className="space-y-3">
                      {siteData.fontOptions.map((f) => {
                        const isSelected = font === f.id;
                        return (
                          <button
                            key={f.id}
                            onClick={() => setFont(f.id)}
                            className={`w-full p-5 rounded-3xl border text-left transition-all relative ${
                              isSelected
                                ? "bg-bg border-accent shadow-card ring-2 ring-accent"
                                : "bg-surface-2/60 hover:bg-surface-2 border-warmBorder"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-heading font-bold text-base text-primaryText">
                                {f.name}
                              </span>
                              {isSelected && (
                                <span className="w-6 h-6 rounded-full bg-accent text-onAccent flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted mb-3">{f.description}</p>
                            <div className="p-3 rounded-xl bg-surface border border-warmBorder flex items-center justify-between text-xs font-mono">
                              <span className="font-heading font-bold text-primaryText">
                                The quick brown fox jumps
                              </span>
                              <span className="text-muted text-[10px]">
                                {f.headingFont}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="p-4 sm:p-5 border-t border-warmBorder bg-surface sticky bottom-0 z-10 space-y-3">
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    title="Copy direct URL with ?theme="
                    className="flex-1 py-2.5 px-3 rounded-full bg-surface-2 hover:bg-surface-2/80 border border-warmBorder text-xs font-heading font-semibold text-primaryText flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-accent" />
                    <span>Copy Link</span>
                  </button>

                  {/* Finalise */}
                  <button
                    onClick={handleFinalise}
                    title="Mark this as the finalised client theme"
                    className="flex-1 py-2.5 px-3 rounded-full bg-accent hover:bg-accent-hover text-xs font-heading font-semibold text-onAccent flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Finalise</span>
                  </button>

                  {/* Reset */}
                  <button
                    onClick={handleReset}
                    title="Reset to default Warm Beige"
                    className="p-2.5 rounded-full bg-surface-2 hover:bg-bg border border-warmBorder text-muted hover:text-primaryText transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Footer link to /themes page */}
                <div className="flex items-center justify-between text-[11px] font-mono text-muted pt-1">
                  <span>Press <kbd className="px-1 py-0.5 rounded bg-bg border border-warmBorder">T</kbd> or <kbd className="px-1 py-0.5 rounded bg-bg border border-warmBorder">Esc</kbd></span>
                  <Link
                    href="/themes"
                    onClick={() => setIsPanelOpen(false)}
                    className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
                  >
                    <span>Full showcase page</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
