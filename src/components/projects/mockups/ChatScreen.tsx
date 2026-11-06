"use client";

import React from "react";
import { motion } from "framer-motion";

interface ChatScreenProps {
  compact?: boolean;
}

export default function ChatScreen({ compact = false }: ChatScreenProps) {
  const avatars = ["👩‍💻", "👨‍🎨", "🧑‍🔬", "🤖"];

  return (
    <div className={`w-full h-full bg-[var(--bg)] text-[var(--text)] flex overflow-hidden select-none font-sans ${compact ? "p-2 gap-2" : "p-3 sm:p-4 gap-2.5 sm:gap-3"}`}>
      {/* Sidebar of Avatars */}
      {!compact && (
        <div className="w-10 sm:w-12 shrink-0 border-r border-[var(--border)] flex flex-col items-center py-1 gap-2.5">
          {avatars.map((emoji, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs relative ${
                i === 0
                  ? "bg-[var(--accent)] text-[var(--on-accent)] ring-2 ring-[var(--accent)]/40"
                  : "bg-[var(--surface-2)] text-[var(--text)]"
              }`}
            >
              <span>{emoji}</span>
              {i === 0 && (
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-[var(--bg)]" />
              )}
            </div>
          ))}
          <div className="mt-auto w-5 h-5 rounded-full border border-dashed border-[var(--border)] flex items-center justify-center text-[10px] text-[var(--muted)]">
            +
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm text-[var(--text)]"># engineering-sync</span>
            <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/15 text-emerald-600 font-semibold">
              Live WS
            </span>
          </div>
          <div className="text-[10px] text-[var(--muted)]">4 members</div>
        </div>

        {/* Staggered Message Bubbles */}
        <div className="flex-1 flex flex-col justify-end gap-2 py-2 overflow-hidden">
          {/* Incoming Message 1 */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-1.5 max-w-[85%]"
          >
            <div className="w-5 h-5 rounded-full bg-[var(--surface-2)] shrink-0 flex items-center justify-center text-[10px]">
              👩‍💻
            </div>
            <div className="p-2 rounded-xl rounded-tl-none bg-[var(--surface)] border border-[var(--border)] text-[9px] sm:text-[10px] text-[var(--text)] shadow-xs">
              Deployed v2.4 with WebSocket channels. Latency is &lt;20ms worldwide! 🚀
            </div>
          </motion.div>

          {/* Outgoing Message 2 */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-start justify-end gap-1.5 max-w-[85%] self-end"
          >
            <div className="p-2 rounded-xl rounded-tr-none bg-[var(--accent)] text-[var(--on-accent)] text-[9px] sm:text-[10px] shadow-xs font-medium">
              Verified! Memory footprint down 34% with the new buffer pools.
            </div>
          </motion.div>

          {/* Typing indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] w-fit"
          >
            <span className="text-[8px] text-[var(--muted)] mr-1">Sarah typing</span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
            />
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
            />
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0.4 }}
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
            />
          </motion.div>
        </div>

        {/* Input Bar Pill */}
        <div className="p-1 sm:p-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between text-[9px] text-[var(--muted)]">
          <span>Message #engineering-sync...</span>
          <div className="w-5 h-5 rounded-md bg-[var(--surface-2)] text-[var(--accent)] flex items-center justify-center font-bold">
            ↑
          </div>
        </div>
      </div>
    </div>
  );
}

