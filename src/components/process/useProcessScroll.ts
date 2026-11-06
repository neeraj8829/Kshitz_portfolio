"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UseProcessScrollProps {
  trackRef: React.RefObject<HTMLDivElement>;
  stageRef: React.RefObject<HTMLDivElement>;
  totalSteps: number;
}

export function useProcessScroll({
  trackRef,
  stageRef,
  totalSteps,
}: UseProcessScrollProps) {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  // Check prefers-reduced-motion and screen width
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    media.addEventListener("change", handleMediaChange);
    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    // Only pin on desktop (>=1024px) and without reduced motion
    if (isReducedMotion || typeof window === "undefined") return;

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop || !trackRef.current || !stageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Calculate snap points corresponding to step centers or starts
    // For N steps: intervals are [i/N, (i+1)/N]. Centers are (i + 0.5) / N
    const snapPoints: number[] = [];
    for (let i = 0; i < totalSteps; i++) {
      snapPoints.push(i / (totalSteps - 1));
    }

    const trigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: stageRef.current,
      pinSpacing: false,
      scrub: 0.2,
      snap: {
        snapTo: (value: number) => {
          // Find closest snap point
          let closest = snapPoints[0];
          let minDiff = Math.abs(value - closest);
          for (const pt of snapPoints) {
            const diff = Math.abs(value - pt);
            if (diff < minDiff) {
              minDiff = diff;
              closest = pt;
            }
          }
          return closest;
        },
        duration: 0.4,
        ease: "power2.inOut",
        delay: 0.1,
      },
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        // Map progress p [0, 1] to activeStep [0, totalSteps - 1]
        // Step boundaries: 0 <= p < 1/N -> 0, etc.
        const step = Math.min(
          totalSteps - 1,
          Math.max(0, Math.floor(p * totalSteps))
        );
        setActiveStep(step);
      },
    });

    triggerRef.current = trigger;

    // Refresh after fonts and layout settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };
  }, [trackRef, stageRef, totalSteps, isReducedMotion]);

  // Smooth scroll to a specific step
  const scrollToStep = useCallback(
    (stepIndex: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const trackHeight = trackRef.current.offsetHeight - window.innerHeight;

      // Fraction along track
      const fraction = stepIndex / (totalSteps - 1);
      const targetY = scrollTop + fraction * trackHeight;

      // Use window scrollTo or Lenis if available
      const lenisInstance = (window as unknown as { lenis?: { scrollTo: (y: number, opts?: unknown) => void } }).lenis;
      if (lenisInstance) {
        lenisInstance.scrollTo(targetY, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      }
    },
    [trackRef, totalSteps]
  );

  return {
    progress,
    activeStep,
    scrollToStep,
    isReducedMotion,
  };
}
