"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/site";

const WARM_EASE = [0.22, 1, 0.36, 1] as const;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    const duration = 1600; // 1.6s smooth cinematic counter

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic progression
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.min(100, Math.round(ease * 100));
      setCount(currentVal);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setCount(100);
        setTimeout(() => {
          setIsDone(true);
          onCompleteRef.current?.();
        }, 320);
      }
    };

    // Start counter animation
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []); // Run once on mount; never re-trigger on parent re-renders

  const nameLetters = siteData.profile.name.split("");

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="kshitiz-preloader"
          initial={{ y: 0 }}
          exit={{
            y: "100%",
            transition: {
              duration: 0.85,
              ease: WARM_EASE,
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[var(--bg)] text-[var(--text)] p-8 md:p-16 select-none pointer-events-auto"
        >
          {/* Top Eyebrow */}
          <div className="w-full flex items-center justify-between text-xs tracking-widest uppercase text-[var(--muted)] font-sans font-semibold">
            <span>{siteData.profile.eyebrow}</span>
            <span>{siteData.profile.location.split("(")[0].trim()}</span>
          </div>

          {/* Letter by Letter Name Reveal */}
          <div className="my-auto text-center">
            <div className="overflow-hidden flex justify-center items-center">
              {nameLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + index * 0.06,
                    ease: WARM_EASE,
                  }}
                  className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-[var(--text)] inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + nameLetters.length * 0.06, duration: 0.4 }}
                className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold text-[var(--accent)] inline-block"
              >
                .
              </motion.span>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-3 text-[var(--muted)] text-xs sm:text-sm tracking-widest uppercase font-sans font-semibold"
            >
              Portfolio &amp; Selected Works
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-3 font-sans">
            {/* Smooth hairline progress track */}
            <div className="w-full h-[2px] bg-[var(--surface-2)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-75 ease-out rounded-full"
                style={{ width: `${count}%` }}
              />
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-2)] animate-pulse" />
                <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold">
                  Loading Interface &amp; Projects
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-6xl font-bold tabular-nums tracking-tighter text-[var(--text)] font-heading">
                  {count}
                </span>
                <span className="text-[var(--accent)] font-heading text-2xl font-bold">%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
