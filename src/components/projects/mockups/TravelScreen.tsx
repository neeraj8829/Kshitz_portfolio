"use client";

import React from "react";
import { motion } from "framer-motion";

interface TravelScreenProps {
  compact?: boolean;
}

export default function TravelScreen({ compact = false }: TravelScreenProps) {
  return (
    <div className={`w-full h-full bg-[var(--bg)] text-[var(--text)] flex flex-col overflow-hidden select-none font-sans ${compact ? "p-2 gap-2" : "p-3 sm:p-4 gap-2.5"}`}>
      {/* Travel App Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-[var(--muted)] font-semibold">Active Trip</span>
          <div className="font-bold text-xs sm:text-sm text-[var(--text)]">Kyoto &amp; Tokyo Route</div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[10px] text-[var(--text)]">
          <span>7 Days</span>
          <span className="text-[var(--muted)]">•</span>
          <span className="font-semibold text-emerald-500">Offline Ready</span>
        </div>
      </div>

      {/* Stylised Map Stage with route */}
      <div className="flex-1 min-h-[90px] sm:min-h-[120px] rounded-xl bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden flex flex-col">
        {/* Soft blob contours */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-[var(--surface-2)] blur-md" />
          <div className="absolute bottom-2 right-4 w-40 h-28 rounded-full bg-[var(--surface-2)] blur-md" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
        </div>

        {/* Map SVG with dotted drawing line & 3 Pins */}
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 240 100" preserveAspectRatio="none">
          <motion.path
            d="M 30,70 Q 75,25 125,50 T 210,30"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* Pin 1 - Kyoto */}
          <circle cx="30" cy="70" r="5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.5" />
          <circle cx="30" cy="70" r="2" fill="var(--accent)" />

          {/* Pin 2 - Hakone */}
          <circle cx="125" cy="50" r="5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.5" />
          <circle cx="125" cy="50" r="2" fill="var(--accent)" />

          {/* Pin 3 - Tokyo */}
          <circle cx="210" cy="30" r="5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2.5" />
          <circle cx="210" cy="30" r="2" fill="var(--accent)" />
        </svg>

        {/* Pin Labels overlaid */}
        <div className="absolute left-4 bottom-1 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--bg)]/90 border border-[var(--border)] shadow-sm">
          📍 Kyoto
        </div>
        <div className="absolute left-[45%] top-4 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--bg)]/90 border border-[var(--border)] shadow-sm">
          📍 Hakone
        </div>
        <div className="absolute right-3 top-2 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--bg)]/90 border border-[var(--border)] shadow-sm">
          📍 Tokyo
        </div>
      </div>

      {/* Itinerary Cards Below */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[8px] text-[var(--accent)] font-bold">DAY 01</span>
            <div className="font-semibold text-[10px] text-[var(--text)] truncate">Fushimi Inari Trail</div>
          </div>
          <span className="text-[10px] text-[var(--muted)] shrink-0">08:30</span>
        </div>
        <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[8px] text-[var(--accent)] font-bold">DAY 02</span>
            <div className="font-semibold text-[10px] text-[var(--text)] truncate">Shinkansen Transit</div>
          </div>
          <span className="text-[10px] text-[var(--muted)] shrink-0">11:15</span>
        </div>
      </div>
    </div>
  );
}

