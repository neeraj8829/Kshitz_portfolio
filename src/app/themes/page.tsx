"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/ui/PageTransition";
import HighlightText from "@/components/ui/HighlightText";
import { THEMES } from "@/data/themes";
import { siteData } from "@/data/site";
import { useTheme } from "@/components/theme/ThemeProvider";
import ThemePreviewMini from "@/components/theme/ThemePreviewMini";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import {
  Palette,
  Type,
  Check,
  Sparkles,
  ArrowRight,
  Heart,
  Share2,
} from "lucide-react";

export default function ThemesPage() {
  const {
    themeId,
    setTheme,
    toggleFavorite,
    isFavorite,
    finalTheme,
    setFinalTheme,
    font,
    setFont,
    copyThemeLink,
  } = useTheme();

  const { showToast } = useToast();
  const router = useRouter();

  const handleApplyAndGoHome = (id: string, name: string) => {
    setTheme(id);
    showToast(`Theme applied: ${name}. Returning home...`, "success");
    setTimeout(() => {
      router.push("/");
    }, 350);
  };

  const handleCopyHex = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    showToast(`Copied ${label}: ${hex}`, "info");
  };

  const handleCopyDirectLink = async (id: string) => {
    await copyThemeLink(id);
    showToast(`Direct theme URL copied!`, "success");
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen pt-36 pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="eyebrow-label mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THEME OPTIONS &amp; PRESENTATION</span>
            </div>
            <h1 className="hero-h1 text-primaryText tracking-tight mb-4">
              Explore light palettes for <HighlightText>Kshitiz</HighlightText>.
            </h1>
            <p className="body-large">
              Review all 9 custom light themes designed with strict token mapping, WCAG AA contrast compliance, and warm minimalism. Click &quot;Apply to website&quot; on any theme to preview it live.
            </p>
          </div>

          {/* Section 1: 9 Theme Options Large Showcase */}
          <div className="mb-24">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-accent" />
                <h2 className="section-h2 text-primaryText">Theme Options (9 Light Themes)</h2>
              </div>
              <div className="text-xs font-mono text-muted">
                Active Theme: <span className="font-bold text-accent">{THEMES.find((t) => t.id === themeId)?.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {THEMES.map((t) => {
                const isActive = themeId === t.id;
                const isFav = isFavorite(t.id);
                const isFinal = finalTheme === t.id;

                const swatches = [
                  { label: "Background", color: t.tokens.bg },
                  { label: "Surface", color: t.tokens.surface },
                  { label: "Surface 2", color: t.tokens.surface2 },
                  { label: "Text", color: t.tokens.text },
                  { label: "Muted", color: t.tokens.muted },
                  { label: "Accent", color: t.tokens.accent },
                  { label: "Accent 2", color: t.tokens.accent2 },
                  { label: "On Accent", color: t.tokens.onAccent },
                ];

                return (
                  <div
                    key={t.id}
                    className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 relative ${
                      isActive
                        ? "bg-surface border-accent shadow-card ring-2 ring-accent"
                        : "bg-surface/60 hover:bg-surface border-warmBorder hover:shadow-subtle"
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {isActive && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-onAccent text-xs font-heading font-semibold shadow-xs">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Active</span>
                            </span>
                          )}
                          {isFinal && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-2 text-white text-xs font-heading font-semibold shadow-xs">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Selected</span>
                            </span>
                          )}
                          <span className="text-[11px] uppercase font-mono px-2 py-0.5 rounded-md bg-bg border border-warmBorder text-muted">
                            {t.category}
                          </span>
                        </div>

                        {/* Favorite & Share Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleCopyDirectLink(t.id)}
                            title="Copy link to this theme"
                            className="p-1.5 rounded-full text-muted hover:text-accent hover:bg-bg transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleFavorite(t.id)}
                            aria-label={isFav ? "Unfavorite theme" : "Favorite theme"}
                            className={`p-1.5 rounded-full transition-colors ${
                              isFav
                                ? "text-accent bg-accent/10"
                                : "text-muted hover:text-accent hover:bg-bg"
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                          </button>
                        </div>
                      </div>

                      {/* Large Preview */}
                      <div className="mb-5">
                        <ThemePreviewMini theme={t} size="lg" />
                      </div>

                      {/* Theme Meta */}
                      <div className="space-y-2 mb-6">
                        <h3 className="card-h3 font-bold text-primaryText">
                          {t.name}
                        </h3>
                        <div className="text-xs font-mono text-muted uppercase tracking-wider">
                          Mood: <span className="text-primaryText font-semibold capitalize">{t.mood}</span>
                        </div>
                        <p className="text-xs text-muted font-body leading-relaxed">
                          <strong className="text-primaryText/80 font-semibold">Best for:</strong> {t.bestFor}
                        </p>
                      </div>

                      {/* Swatches Grid with Hex values */}
                      <div className="mb-6 p-4 rounded-2xl bg-bg border border-warmBorder space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                          <span>Palette Tokens</span>
                          <span className="text-[10px] opacity-75">Click to copy</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {swatches.map((s) => (
                            <button
                              key={s.label}
                              onClick={() => handleCopyHex(s.color, s.label)}
                              title={`${s.label}: ${s.color}`}
                              className="group/item flex flex-col items-center p-1.5 rounded-xl hover:bg-surface transition-colors"
                            >
                              <div
                                className="w-7 h-7 rounded-full border border-black/10 shadow-xs mb-1 transition-transform group-hover/item:scale-110"
                                style={{ backgroundColor: s.color }}
                              />
                              <span className="text-[9px] font-mono text-primaryText font-semibold">
                                {s.color}
                              </span>
                              <span className="text-[8px] font-body text-muted truncate max-w-full">
                                {s.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-warmBorder flex items-center gap-2">
                      <button
                        onClick={() => handleApplyAndGoHome(t.id, t.name)}
                        className={`flex-1 py-3 px-4 rounded-full text-xs font-heading font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                          isActive
                            ? "bg-surface-2 text-primaryText hover:bg-surface-2/80"
                            : "bg-accent text-onAccent hover:bg-accent-hover"
                        }`}
                      >
                        <span>{isActive ? "Currently Applied" : "Apply to website"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setFinalTheme(t.id);
                          showToast(`Theme finalized: ${t.name}`, "success");
                        }}
                        title="Mark as final client choice"
                        className="py-3 px-3 rounded-full text-xs font-heading font-medium bg-bg hover:bg-surface-2 border border-warmBorder text-primaryText transition-colors"
                      >
                        Finalise
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Typography Options (if enabled) */}
          {siteData.config.showFontSwitcher && (
            <div className="mb-20 pt-16 border-t border-warmBorder">
              <div className="flex items-center gap-3 mb-6">
                <Type className="w-5 h-5 text-accent" />
                <h2 className="section-h2 text-primaryText">Typography Systems</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {siteData.fontOptions.map((f) => {
                  const isActive = font === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        setFont(f.id);
                        showToast(`Typography set to ${f.name}`, "info");
                      }}
                      className={`p-8 rounded-3xl border text-left transition-all duration-300 relative ${
                        isActive
                          ? "bg-surface border-accent shadow-card ring-2 ring-accent"
                          : "bg-surface/60 hover:bg-surface border-warmBorder"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-accent text-onAccent text-xs font-heading font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Active</span>
                        </span>
                      )}

                      <div className="text-xs uppercase font-mono text-accent font-semibold tracking-wider mb-2">
                        Option {f.id === "jakarta" ? "1 (Default)" : f.id === "manrope" ? "2" : "3"}
                      </div>
                      <h3 className="card-h3 font-bold text-primaryText mb-2">
                        {f.name}
                      </h3>
                      <p className="caption-small text-muted mb-6">
                        {f.description}
                      </p>

                      <div className="p-4 rounded-2xl bg-bg border border-warmBorder space-y-1">
                        <div className="font-heading font-bold text-lg text-primaryText">
                          Aa Bb Cc 123
                        </div>
                        <div className="font-body text-xs text-muted">
                          Headings: {f.headingFont} • Body: {f.bodyFont}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Return Home Link */}
          <div className="text-center pt-8 border-t border-warmBorder">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-onAccent font-heading font-semibold text-sm shadow-card hover:bg-accent-hover transition-colors"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
