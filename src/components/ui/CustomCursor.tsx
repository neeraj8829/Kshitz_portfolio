"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag" | "text">("default");
  const [cursorText, setCursorText] = useState("");

  // Raw mouse coordinates for zero-latency pinpoint dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for trailing follower ring (about 0.15s lag, instant settle to same center)
  const springConfig = { damping: 28, stiffness: 350, mass: 0.12 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide on touch devices or fine pointer absent
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isCoarse || prefersReducedMotion) return;

    document.body.classList.add("has-custom-cursor");

    const moveCursor = (e: MouseEvent) => {
      // Check if mouse is within viewport
      if (
        e.clientX < 0 ||
        e.clientY < 0 ||
        e.clientX > window.innerWidth ||
        e.clientY > window.innerHeight
      ) {
        setIsVisible(false);
        return;
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Text inputs
      if (target.closest("input, textarea")) {
        setCursorType("text");
        setCursorText("");
        return;
      }

      // "View" / "Open" case study elements
      const viewElement = target.closest("[data-cursor='view']");
      if (viewElement) {
        setCursorType("view");
        setCursorText(viewElement.getAttribute("data-cursor-text") || "View");
        return;
      }

      // "Drag" carousel elements
      const dragElement = target.closest("[data-cursor='drag']");
      if (dragElement) {
        setCursorType("drag");
        setCursorText("Drag");
        return;
      }

      // Standard interactive elements
      const interactive = target.closest("a, button, [role='button'], summary, select");
      if (interactive) {
        setCursorType("hover");
        setCursorText("");
        return;
      }

      setCursorType("default");
      setCursorText("");
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleMouseLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible || cursorType === "text") return null;

  const isExpanded = cursorType === "view" || cursorType === "drag";
  const isHovered = cursorType === "hover";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* 1. Precision Center Dot (Follows pointer exactly with 0 lag, centered on cursor) */}
      {!isExpanded && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--text)] pointer-events-none z-20"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: isVisible ? 1 : 0,
          }}
        />
      )}

      {/* 2. Trailing Follower Ring (Follows with gentle 0.15s spring, centered exactly on same point) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none font-sans select-none z-10"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isExpanded ? 76 : isHovered ? 48 : 32,
          height: isExpanded ? 76 : isHovered ? 48 : 32,
          backgroundColor: isExpanded
            ? "var(--accent)"
            : isHovered
            ? "color-mix(in srgb, var(--accent) 16%, transparent)"
            : "transparent",
          borderColor: isExpanded
            ? "var(--accent)"
            : isHovered
            ? "var(--accent)"
            : "var(--border)",
          borderWidth: isExpanded ? 0 : 1.5,
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 24,
          mass: 0.15,
        }}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              key={cursorText || cursorType}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--on-accent)] select-none text-center"
            >
              {cursorText || (cursorType === "drag" ? "Drag" : "View")}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
