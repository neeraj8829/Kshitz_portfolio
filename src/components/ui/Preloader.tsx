"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/site";

const WARM_EASE = [0.22, 1, 0.36, 1] as const;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user already saw preloader in this session
    const seen = sessionStorage.getItem("kshitiz_preloader_seen");
    if (seen) {
      setIsDone(true);
      onComplete();
      return;
    }

    const duration = 2100; // ~2.1 seconds
    const intervalTime = 20;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(100, Math.round((step / totalSteps) * 100));
      setCount(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        sessionStorage.setItem("kshitiz_preloader_seen", "true");
        setTimeout(() => {
          setIsDone(true);
          onComplete();
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const nameLetters = siteData.profile.name.split("");

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="kshitiz-preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.95,
              ease: WARM_EASE,
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-cream text-espresso p-8 md:p-16 select-none pointer-events-auto"
        >
          {/* Top Eyebrow */}
          <div className="w-full flex items-center justify-between text-xs tracking-widest uppercase text-taupe font-mono">
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
                    duration: 0.7,
                    delay: 0.15 + index * 0.08,
                    ease: WARM_EASE,
                  }}
                  className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-primaryText inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 + nameLetters.length * 0.08, duration: 0.4 }}
                className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold text-accent inline-block"
              >
                .
              </motion.span>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-3 text-taupe text-sm tracking-widest uppercase font-mono"
            >
              Portfolio &amp; Selected Works
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="w-full max-w-5xl mx-auto flex items-end justify-between font-mono">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sage animate-ping" />
              <span className="text-xs uppercase tracking-wider text-taupe">
                Loading Interface &amp; Projects
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl sm:text-6xl font-bold tabular-nums tracking-tighter text-primaryText font-heading">
                {count}
              </span>
              <span className="text-accent font-heading text-2xl font-bold">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
