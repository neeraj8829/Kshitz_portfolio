"use client";

import React from "react";
import { motion } from "framer-motion";

interface StoreScreenProps {
  compact?: boolean;
}

export default function StoreScreen({ compact = false }: StoreScreenProps) {
  const products = [
    { name: "Monstera Deliciosa", price: "$48", tag: "Indoor" },
    { name: "Ficus Elastica", price: "$34", tag: "Easy Care" },
    { name: "Calathea Orbifolia", price: "$29", tag: "Shade" },
    { name: "Sansevieria Moon", price: "$38", tag: "Hardy" },
  ];

  return (
    <div className={`w-full h-full bg-[var(--bg)] text-[var(--text)] flex flex-col overflow-hidden select-none font-sans ${compact ? "p-2 gap-2" : "p-3 sm:p-4 gap-2.5 sm:gap-3"}`}>
      {/* Header with Search Pill */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[var(--accent-2)]/30 text-[var(--accent-2)] flex items-center justify-center font-bold text-[10px]">
            ✽
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-tight text-[var(--text)]">Bloom Botanics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[9px] text-[var(--muted)] flex items-center gap-1">
            <svg className="w-2.5 h-2.5 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search plants...</span>
          </div>
          <div className="relative">
            <div className="w-5 h-5 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[10px]">
              🛒
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--accent-2)] text-[var(--on-accent)] text-[8px] flex items-center justify-center font-bold">
              2
            </span>
          </div>
        </div>
      </div>

      {/* 2x2 Product Grid */}
      <div className="flex-1 grid grid-cols-2 gap-2 overflow-hidden">
        {products.slice(0, compact ? 2 : 4).map((p, i) => (
          <div
            key={i}
            className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col justify-between group hover:border-[var(--accent-2)]/50 transition-colors"
          >
            {/* Visual gradient botanical block */}
            <div
              className="w-full aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, var(--accent-2) ${25 + i * 10}%, var(--surface)), var(--surface-2))`,
              }}
            >
              <span className="text-xl sm:text-2xl filter drop-shadow opacity-80">
                {i === 0 ? "🌿" : i === 1 ? "🪴" : i === 2 ? "🌱" : "🍃"}
              </span>
              <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md text-[8px] bg-[var(--bg)]/80 text-[var(--text)] font-semibold backdrop-blur-sm">
                {p.tag}
              </span>
            </div>

            {/* Info row */}
            <div className="mt-1.5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-[10px] sm:text-xs text-[var(--text)] truncate max-w-[85px] sm:max-w-[120px]">
                  {p.name}
                </div>
                <div className="text-[9px] font-bold text-[var(--accent-2)]">{p.price}</div>
              </div>

              {/* Pulsing cart button on first item */}
              {i === 0 ? (
                <motion.button
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
                  className="px-2 py-1 rounded-md bg-[var(--accent-2)] text-[var(--on-accent)] text-[9px] font-bold shrink-0 shadow-sm"
                >
                  Add +
                </motion.button>
              ) : (
                <div className="w-5 h-5 rounded-md bg-[var(--surface-2)] flex items-center justify-center text-[10px] text-[var(--muted)] group-hover:bg-[var(--accent-2)] group-hover:text-[var(--on-accent)] transition-colors">
                  +
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

