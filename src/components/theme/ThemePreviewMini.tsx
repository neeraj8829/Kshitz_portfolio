"use client";

import React from "react";
import { ThemeOption } from "@/data/themes";

interface ThemePreviewMiniProps {
  theme: ThemeOption;
  size?: "sm" | "md" | "lg";
}

export default function ThemePreviewMini({ theme, size = "md" }: ThemePreviewMiniProps) {
  const { tokens } = theme;

  const heightClass =
    size === "sm" ? "h-28" : size === "lg" ? "h-48 sm:h-56" : "h-36 sm:h-40";

  return (
    <div
      style={{
        backgroundColor: tokens.bg,
        borderColor: tokens.border,
      }}
      className={`w-full ${heightClass} rounded-2xl border overflow-hidden p-3 sm:p-4 flex flex-col justify-between relative shadow-inner select-none transition-transform duration-300 group-hover:scale-[1.01]`}
    >
      {/* Mini Browser Bar */}
      <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: tokens.border }}>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent, opacity: 0.8 }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.accent2, opacity: 0.8 }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tokens.muted, opacity: 0.4 }} />
        </div>
        <div
          className="text-[9px] font-heading font-bold tracking-tight"
          style={{ color: tokens.text }}
        >
          Kshitiz<span style={{ color: tokens.accent }}>.</span>
        </div>
        <div
          className="text-[8px] font-mono px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: tokens.surface, color: tokens.muted }}
        >
          {theme.mood.split(",")[0]}
        </div>
      </div>

      {/* Mini Hero Snippet */}
      <div className="my-auto py-1 space-y-1.5">
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: tokens.accent2 }}
          />
          <span
            className="text-[8px] font-mono uppercase tracking-wider font-semibold"
            style={{ color: tokens.accentText || tokens.accent }}
          >
            AVAILABLE FOR WORK
          </span>
        </div>

        <div className="space-y-0.5">
          <div
            className="text-xs sm:text-sm font-heading font-bold leading-tight"
            style={{ color: tokens.text }}
          >
            I design &amp;{" "}
            <span
              className="relative inline-block"
              style={{ color: tokens.accentText || tokens.accent }}
            >
              build
              <span
                className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full"
                style={{ backgroundColor: tokens.accent }}
              />
            </span>
          </div>
          <div
            className="text-[9px] font-body line-clamp-1 opacity-80"
            style={{ color: tokens.muted }}
          >
            tactile web applications &amp; fluid UI
          </div>
        </div>

        {/* Mini CTA Buttons */}
        <div className="flex items-center gap-1.5 pt-1">
          <div
            className="px-2.5 py-1 rounded-full text-[9px] font-heading font-semibold shadow-xs flex items-center gap-1"
            style={{
              backgroundColor: tokens.accent,
              color: tokens.onAccent,
            }}
          >
            <span>View Work</span>
          </div>
          <div
            className="px-2 py-1 rounded-full text-[9px] font-heading font-medium border"
            style={{
              backgroundColor: tokens.surface,
              borderColor: tokens.border,
              color: tokens.text,
            }}
          >
            <span>Contact</span>
          </div>
        </div>
      </div>

      {/* Mini Card / Tag Row */}
      <div
        className="pt-1.5 flex items-center justify-between border-t text-[8px] font-mono"
        style={{ borderColor: tokens.border }}
      >
        <span
          className="px-2 py-0.5 rounded-md"
          style={{ backgroundColor: tokens.surface2, color: tokens.text }}
        >
          Next.js + GSAP
        </span>
        <span style={{ color: tokens.muted }}>
          kshitiz.dev
        </span>
      </div>
    </div>
  );
}

