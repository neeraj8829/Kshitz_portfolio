"use client";

import React, { useState } from "react";
import { ThemeOption } from "@/data/themes";
import { useTheme } from "./ThemeProvider";
import ThemePreviewMini from "./ThemePreviewMini";
import { Check, Heart, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface ThemeCardProps {
  theme: ThemeOption;
  onSelect?: () => void;
  showApplyButton?: boolean;
}

export default function ThemeCard({
  theme,
  onSelect,
  showApplyButton = false,
}: ThemeCardProps) {
  const { themeId, setTheme, isFavorite, toggleFavorite, finalTheme, setFinalTheme } = useTheme();
  const { showToast } = useToast();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const isActive = themeId === theme.id;
  const isFav = isFavorite(theme.id);
  const isFinal = finalTheme === theme.id;

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTheme(theme.id);
    if (onSelect) onSelect();
  };

  const handleCopyHex = (e: React.MouseEvent, hex: string, label: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    showToast(`Copied ${label} color: ${hex}`, "info");
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(theme.id);
    showToast(
      isFav ? `Removed ${theme.name} from favorites` : `Saved ${theme.name} to favorites ❤️`,
      "info"
    );
  };

  const handleSetFinal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTheme(theme.id);
    setFinalTheme(theme.id);
    showToast(`Theme finalized: ${theme.name}`, "success");
  };

  const swatches = [
    { label: "Background", color: theme.tokens.bg },
    { label: "Surface", color: theme.tokens.surface },
    { label: "Surface 2", color: theme.tokens.surface2 },
    { label: "Text", color: theme.tokens.text },
    { label: "Muted", color: theme.tokens.muted },
    { label: "Accent", color: theme.tokens.accent },
    { label: "Accent 2", color: theme.tokens.accent2 },
    { label: "On Accent", color: theme.tokens.onAccent },
  ];

  return (
    <div
      onClick={handleSelect}
      className={`group relative rounded-3xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        isActive
          ? "bg-surface border-accent shadow-card ring-2 ring-accent"
          : "bg-surface/60 hover:bg-surface border-warmBorder hover:shadow-subtle"
      }`}
    >
      {/* Top Bar with Badges & Favorite Heart */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {isActive && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent text-onAccent text-[11px] font-heading font-semibold shadow-xs">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Active</span>
            </span>
          )}
          {isFinal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-2 text-white text-[11px] font-heading font-semibold shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>Selected</span>
            </span>
          )}
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-bg border border-warmBorder text-muted">
            {theme.category}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleToggleFavorite}
          aria-label={isFav ? "Unfavorite theme" : "Favorite theme"}
          className={`p-1.5 rounded-full transition-colors ${
            isFav
              ? "text-accent bg-accent/10 hover:bg-accent/20"
              : "text-muted hover:text-accent hover:bg-bg"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
              isFav ? "fill-current" : ""
            }`}
          />
        </button>
      </div>

      {/* Mini Browser Live Preview */}
      <div className="mb-4">
        <ThemePreviewMini theme={theme} size="md" />
      </div>

      {/* Details: Title, Mood, Best For */}
      <div className="space-y-1.5 mb-4">
        <h4 className="font-heading font-bold text-base text-primaryText group-hover:text-accent transition-colors">
          {theme.name}
        </h4>
        <div className="flex items-center gap-2 text-xs text-muted font-body">
          <span className="font-medium text-primaryText/80 italic">{theme.mood}</span>
        </div>
        <p className="text-[11px] text-muted font-body leading-relaxed">
          <span className="font-semibold text-primaryText/70">Best for:</span> {theme.bestFor}
        </p>
      </div>

      {/* Interactive Color Swatches Row with Tooltips */}
      <div className="pt-3 border-t border-warmBorder">
        <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-2">
          <span>Palette Swatches</span>
          <span className="text-[9px] opacity-75">Click to copy hex</span>
        </div>
        <div className="flex items-center gap-1.5 justify-between">
          {swatches.map((s) => (
            <button
              key={s.label}
              onClick={(e) => handleCopyHex(e, s.color, s.label)}
              title={`${s.label}: ${s.color} (Click to copy)`}
              className="relative group/swatch w-6 h-6 rounded-full border border-black/10 transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              style={{ backgroundColor: s.color }}
            >
              {copiedHex === s.color && (
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-white bg-black/60 rounded-full">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Optional Apply / Finalise Button Row */}
      {showApplyButton && (
        <div className="mt-4 pt-3 border-t border-warmBorder flex items-center gap-2">
          <button
            onClick={handleSelect}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-heading font-semibold transition-all ${
              isActive
                ? "bg-surface-2 text-primaryText border border-warmBorder"
                : "bg-accent text-onAccent hover:bg-accent-hover shadow-xs"
            }`}
          >
            {isActive ? "Currently Active" : "Apply to Website"}
          </button>
          <button
            onClick={handleSetFinal}
            title="Mark as final client choice"
            className="py-2 px-3 rounded-full text-xs font-heading font-medium bg-bg hover:bg-surface-2 border border-warmBorder text-primaryText transition-colors"
          >
            Finalise
          </button>
        </div>
      )}
    </div>
  );
}
