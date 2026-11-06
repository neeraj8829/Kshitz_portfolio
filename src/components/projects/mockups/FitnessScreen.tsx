"use client";

import React from "react";
import { motion } from "framer-motion";

interface FitnessScreenProps {
  compact?: boolean;
}

export default function FitnessScreen({ compact = false }: FitnessScreenProps) {
  // SVG circular ring calculations: r = 26, perimeter = 2 * pi * 26 ~= 163.36
  const perimeter = 163.36;
  const strokeDashoffset = perimeter * (1 - 0.78); // 78% completed

  return (
    <div className={`w-full h-full bg-[var(--bg)] text-[var(--text)] flex flex-col overflow-hidden select-none font-sans ${compact ? "p-2 gap-2" : "p-3 sm:p-4 gap-2.5"}`}>
      {/* Fitness Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-[var(--muted)] font-semibold">Today&apos;s Target</span>
          <div className="font-bold text-xs sm:text-sm text-[var(--text)]">Kinetic Activity</div>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-[10px] font-bold">
          🔥 14-Day Streak
        </div>
      </div>

      {/* Progress Ring & Weekly Bars */}
      <div className="flex-1 grid grid-cols-2 gap-2 items-center">
        {/* Circular Progress Ring */}
        <div className="h-full p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center justify-center relative">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 -rotate-90" viewBox="0 0 64 64">
            {/* Background ring */}
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="var(--border)"
              strokeWidth="5"
            />
            {/* Animated foreground ring */}
            <motion.circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="5"
              strokeDasharray={perimeter}
              initial={{ strokeDashoffset: perimeter }}
              whileInView={{ strokeDashoffset }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs sm:text-sm font-bold text-[var(--text)]">78%</span>
            <span className="text-[8px] text-[var(--muted)]">Goal</span>
          </div>
        </div>

        {/* Weekly Activity Bars */}
        <div className="h-full p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[9px] text-[var(--muted)]">
            <span className="font-semibold">Weekly Burn</span>
            <span className="text-[var(--accent)] font-bold">1,840 kcal</span>
          </div>
          <div className="flex items-end justify-between gap-1 h-14 sm:h-16 pt-2">
            {[
              { d: "M", h: 45 },
              { d: "T", h: 70 },
              { d: "W", h: 85 },
              { d: "T", h: 60 },
              { d: "F", h: 90 },
              { d: "S", h: 75 },
              { d: "S", h: 50 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className={`w-full rounded-t-sm ${i === 4 ? "bg-[var(--accent)]" : "bg-[var(--text)]/20"}`}
                  style={{ height: `${bar.h}%` }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                />
                <span className="text-[8px] text-[var(--muted)]">{bar.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        <div className="p-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">
          <div className="text-[8px] text-[var(--muted)]">Steps</div>
          <div className="text-[10px] sm:text-xs font-bold text-[var(--text)]">8,420</div>
        </div>
        <div className="p-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">
          <div className="text-[8px] text-[var(--muted)]">Active Min</div>
          <div className="text-[10px] sm:text-xs font-bold text-[var(--accent)]">48m</div>
        </div>
        <div className="p-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">
          <div className="text-[8px] text-[var(--muted)]">BPM Avg</div>
          <div className="text-[10px] sm:text-xs font-bold text-[var(--text)]">72</div>
        </div>
      </div>
    </div>
  );
}

