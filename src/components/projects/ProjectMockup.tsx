"use client";

import React, { useState, useRef, useId } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "@/data/site";
import DashboardScreen from "./mockups/DashboardScreen";
import StoreScreen from "./mockups/StoreScreen";
import TravelScreen from "./mockups/TravelScreen";
import FitnessScreen from "./mockups/FitnessScreen";
import PortfolioScreen from "./mockups/PortfolioScreen";
import ChatScreen from "./mockups/ChatScreen";

interface ProjectMockupProps {
  project: Project;
  compact?: boolean;
  className?: string;
  showPhone?: boolean;
}

export default function ProjectMockup({
  project,
  compact = false,
  className = "",
  showPhone = true,
}: ProjectMockupProps) {
  const [imgError, setImgError] = useState(false);
  const [mobileImgError, setMobileImgError] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dotPatternId = useId();

  // Mouse hover tilt physics for desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Browser tilt max 6deg
  const browserRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const browserRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  // Screen content scroll translateY max 30px
  const contentTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [0, -28]);

  // Phone parallax moves opposite direction
  const phoneX = useTransform(smoothMouseX, [-0.5, 0.5], [12, -12]);
  const phoneY = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current || compact) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Tint mapping
  const tintVar =
    project.tint === "accent"
      ? "var(--accent)"
      : project.tint === "accent-2"
      ? "var(--accent-2)"
      : "var(--surface-2)";

  // Render coded screen component
  const renderScreen = (isCompact = false) => {
    switch (project.mockup) {
      case "dashboard":
        return <DashboardScreen compact={isCompact} />;
      case "store":
        return <StoreScreen compact={isCompact} />;
      case "travel":
        return <TravelScreen compact={isCompact} />;
      case "fitness":
        return <FitnessScreen compact={isCompact} />;
      case "portfolio":
        return <PortfolioScreen compact={isCompact} />;
      case "chat":
        return <ChatScreen compact={isCompact} />;
      default:
        return <DashboardScreen compact={isCompact} />;
    }
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full rounded-[24px] sm:rounded-[28px] overflow-hidden flex items-center justify-center p-3 sm:p-6 lg:p-8 select-none transition-shadow ${className}`}
      style={{
        backgroundColor: `color-mix(in srgb, ${tintVar} 14%, var(--surface))`,
      }}
      aria-label={`Preview of the ${project.title} ${project.tagline}`}
    >
      {/* Background Dot Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={dotPatternId}
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="var(--text)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${dotPatternId})`} />
      </svg>

      {/* Soft Radial Glow */}
      <div
        className="absolute w-3/4 h-3/4 rounded-full pointer-events-none blur-3xl opacity-30"
        style={{
          background: `radial-gradient(circle, ${tintVar} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Main Browser Window */}
      <motion.div
        className="relative w-full max-w-[540px] aspect-[16/10] rounded-[12px] sm:rounded-[14px] bg-[var(--bg)] border border-[var(--border)] overflow-hidden flex flex-col z-10"
        style={{
          rotateX: browserRotateX,
          rotateY: browserRotateY,
          transformPerspective: 1000,
          boxShadow: "0 28px 65px color-mix(in srgb, var(--text) 16%, transparent)",
        }}
      >
        {/* Top Browser Bar */}
        <div className="h-6 sm:h-7 bg-[var(--surface)] border-b border-[var(--border)] px-2.5 sm:px-3 flex items-center justify-between shrink-0">
          {/* Neutral 3 Dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-[var(--border)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--muted)]/40" />
            <span className="w-2 h-2 rounded-full bg-[var(--muted)]/40" />
          </div>

          {/* URL Pill */}
          <div className="px-3 sm:px-4 py-0.5 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[9px] sm:text-[10px] text-[var(--muted)] truncate max-w-[170px] sm:max-w-[220px] font-sans font-medium">
            {project.slug}.kshitiz.dev
          </div>

          <div className="w-8 shrink-0" />
        </div>

        {/* Content Area */}
        <div className="relative flex-1 overflow-hidden bg-[var(--bg)]">
          <motion.div
            style={{ y: contentTranslateY }}
            className="w-full h-full"
          >
            {project.screenshot && !imgError ? (
              <Image
                src={project.screenshot}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover object-top"
                onError={() => setImgError(true)}
              />
            ) : (
              renderScreen(compact)
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Secondary Phone Frame (Overlapping bottom right) */}
      {showPhone && !compact && (
        <motion.div
          className="absolute right-3 sm:right-6 bottom-3 sm:bottom-5 w-[24%] min-w-[90px] max-w-[130px] aspect-[9/18] rounded-[20px] sm:rounded-[24px] bg-[var(--bg)] border-[4px] sm:border-[5px] border-[var(--text)] overflow-hidden shadow-2xl z-20 hidden xs:flex flex-col rotate-[3deg]"
          style={{
            x: phoneX,
            y: phoneY,
          }}
          aria-hidden="true"
        >
          {/* Notch */}
          <div className="h-3 w-10 sm:w-12 bg-[var(--text)] rounded-b-md mx-auto shrink-0" />

          {/* Phone Screen */}
          <div className="flex-1 overflow-hidden relative bg-[var(--bg)]">
            {project.mobileScreenshot && !mobileImgError ? (
              <Image
                src={project.mobileScreenshot}
                alt={`${project.title} mobile screenshot`}
                fill
                className="object-cover object-top"
                onError={() => setMobileImgError(true)}
              />
            ) : (
              renderScreen(true)
            )}
          </div>

          {/* Home indicator bar */}
          <div className="h-2 w-full flex items-center justify-center shrink-0 bg-[var(--bg)]">
            <span className="w-8 h-0.5 rounded-full bg-[var(--text)]/40" />
          </div>
        </motion.div>
      )}
    </div>
  );
}

