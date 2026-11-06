"use client";

import React from "react";
import { motion } from "framer-motion";

interface PortfolioScreenProps {
  compact?: boolean;
}

export default function PortfolioScreen({ compact = false }: PortfolioScreenProps) {
  return (
    <div className={`w-full h-full bg-[var(--bg)] text-[var(--text)] flex flex-col overflow-hidden select-none font-sans ${compact ? "p-2 gap-2" : "p-3 sm:p-4 gap-2.5"}`}>
      {/* Minimal Nav */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]">
        <span className="font-serif font-bold text-xs sm:text-sm tracking-tight text-[var(--text)] italic">
          Folio — Studio
        </span>
        <div className="flex items-center gap-3 text-[9px] sm:text-[10px] text-[var(--muted)]">
          <span className="text-[var(--text)] font-medium">Selected</span>
          <span>Archive</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Large Title */}
      <div className="py-1">
        <h3 className="font-serif text-sm sm:text-base md:text-lg font-light tracking-tight leading-tight text-[var(--text)]">
          Concrete &amp; Light: <span className="italic text-[var(--accent-2)]">Modernist Geometry</span>
        </h3>
        <p className="text-[9px] text-[var(--muted)] max-w-xs mt-0.5">
          Architectural monograph series, 2020–2024.
        </p>
      </div>

      {/* Masonry of 5 Tinted Image Blocks with Different Heights */}
      <div className="flex-1 grid grid-cols-3 gap-2 overflow-hidden items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full h-16 sm:h-20 rounded-lg border border-[var(--border)] flex flex-col justify-end p-1.5"
            style={{
              background: "linear-gradient(180deg, color-mix(in srgb, var(--accent-2) 30%, var(--surface)), var(--surface-2))",
            }}
          >
            <span className="text-[8px] font-sans font-medium text-[var(--text)]/80">01 / Facade</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full h-12 sm:h-14 rounded-lg border border-[var(--border)] flex flex-col justify-end p-1.5"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 15%, var(--surface)), var(--surface))",
            }}
          >
            <span className="text-[8px] font-sans font-medium text-[var(--text)]/80">02 / Shadow</span>
          </motion.div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="w-full h-24 sm:h-32 rounded-lg border border-[var(--border)] flex flex-col justify-end p-1.5"
            style={{
              background: "linear-gradient(210deg, color-mix(in srgb, var(--accent-2) 40%, var(--surface)), var(--surface-2))",
            }}
          >
            <span className="text-[8px] font-sans font-medium text-[var(--text)]/80">03 / Cantilever</span>
          </motion.div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="w-full h-14 sm:h-16 rounded-lg border border-[var(--border)] flex flex-col justify-end p-1.5"
            style={{
              background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-2) 20%, var(--surface)), var(--surface-2))",
            }}
          >
            <span className="text-[8px] font-sans font-medium text-[var(--text)]/80">04 / Atrium</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-full h-14 sm:h-18 rounded-lg border border-[var(--border)] flex flex-col justify-end p-1.5"
            style={{
              background: "linear-gradient(180deg, color-mix(in srgb, var(--accent-2) 25%, var(--surface-2)), var(--surface))",
            }}
          >
            <span className="text-[8px] font-sans font-medium text-[var(--text)]/80">05 / Skylight</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
