"use client";

import React from "react";
import { motion } from "framer-motion";

interface DashboardScreenProps {
  compact?: boolean;
}

export default function DashboardScreen({ compact = false }: DashboardScreenProps) {
  return (
    <div className={`w-full h-full bg-[var(--bg)] text-[var(--text)] flex overflow-hidden select-none font-sans ${compact ? "p-2 gap-2" : "p-3 sm:p-4 gap-3 sm:gap-4"}`}>
      {/* Mini Sidebar */}
      {!compact && (
        <div className="w-10 sm:w-12 shrink-0 border-r border-[var(--border)] flex flex-col items-center py-2 gap-3">
          <div className="w-6 h-6 rounded-lg bg-[var(--accent)] text-[var(--on-accent)] flex items-center justify-center font-bold text-xs">
            L
          </div>
          <div className="w-4 h-4 rounded bg-[var(--surface-2)]" />
          <div className="w-4 h-4 rounded bg-[var(--accent)]/20" />
          <div className="w-4 h-4 rounded bg-[var(--surface-2)]" />
          <div className="mt-auto w-4 h-4 rounded-full bg-[var(--border)]" />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-2 sm:gap-3 min-w-0">
        {/* Header / Metric Cards */}
        <div className="flex items-center justify-between pb-1 sm:pb-2 border-b border-[var(--border)]">
          <div>
            <div className={`font-bold tracking-tight text-[var(--text)] ${compact ? "text-[10px]" : "text-xs sm:text-sm"}`}>
              Telemetry Overview
            </div>
            {!compact && <div className="text-[10px] text-[var(--muted)]">Real-time throughput</div>}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-[var(--muted)]">Live</span>
          </div>
        </div>

        {/* 3 KPI Cards */}
        <div className={`grid ${compact ? "grid-cols-2" : "grid-cols-3"} gap-1.5 sm:gap-2`}>
          <div className="p-1.5 sm:p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
            <div className="text-[9px] sm:text-[10px] text-[var(--muted)]">Throughput</div>
            <div className="font-bold text-[11px] sm:text-xs text-[var(--accent)]">2.4M /s</div>
          </div>
          <div className="p-1.5 sm:p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
            <div className="text-[9px] sm:text-[10px] text-[var(--muted)]">Latency</div>
            <div className="font-bold text-[11px] sm:text-xs text-[var(--text)]">14.2ms</div>
          </div>
          {!compact && (
            <div className="p-1.5 sm:p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
              <div className="text-[9px] sm:text-[10px] text-[var(--muted)]">Uptime</div>
              <div className="font-bold text-[11px] sm:text-xs text-emerald-500">99.98%</div>
            </div>
          )}
        </div>

        {/* SVG Drawing Line Chart */}
        <div className="flex-1 min-h-[70px] sm:min-h-[100px] p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between z-10">
            <span className="text-[10px] font-semibold text-[var(--muted)]">Market Depth (Ticks)</span>
            <span className="text-[9px] font-bold text-[var(--accent)]">+18.4%</span>
          </div>

          <svg className="w-full h-14 sm:h-20 overflow-visible my-auto" viewBox="0 0 200 60" preserveAspectRatio="none">
            {/* Horizontal grid lines */}
            <line x1="0" y1="15" x2="200" y2="15" stroke="var(--border)" strokeDasharray="3 3" strokeWidth="0.8" />
            <line x1="0" y1="35" x2="200" y2="35" stroke="var(--border)" strokeDasharray="3 3" strokeWidth="0.8" />

            {/* Area Fill */}
            <polygon
              points="0,55 0,38 35,42 70,22 105,32 140,12 175,20 200,6 200,55"
              fill="var(--accent)"
              fillOpacity="0.12"
            />

            {/* Animated Path */}
            <motion.path
              d="M 0,38 Q 20,40 35,42 T 70,22 T 105,32 T 140,12 T 175,20 T 200,6"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>

          {/* Staggered mini bars */}
          <div className="flex items-end gap-1 sm:gap-1.5 h-6 pt-1 border-t border-[var(--border)]">
            {[40, 65, 30, 85, 45, 95, 70, 55, 80, 60, 90, 75].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm bg-[var(--text)]/20 hover:bg-[var(--accent)] transition-colors"
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

