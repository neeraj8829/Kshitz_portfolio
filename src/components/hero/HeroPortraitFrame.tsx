"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import RotatingBadge from "./RotatingBadge";

interface HeroPortraitFrameProps {
  imageSrc?: string;
  hasAnimated?: boolean;
}

const WARM_EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroPortraitFrame({
  imageSrc = "/images/kshitiz-portrait.jpg",
  hasAnimated = true,
}: HeroPortraitFrameProps) {
  const [currentImg, setCurrentImg] = useState(imageSrc);

  // Desktop mouse parallax coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax tilt transforms (max 5deg)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-4, 4]);

  // Layer parallax depths
  const offsetGlowX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const offsetGlowY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);
  const offsetFrameX = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const offsetFrameY = useTransform(smoothMouseY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] aspect-[3/4] flex items-center justify-center select-none"
      style={{ isolation: "isolate" }}
    >
      {/* =========================================================
          LAYER A: GLOW BLOB (Morphing gradient of accent to accent-2)
          ========================================================= */}
      <motion.div
        style={{ x: offsetGlowX, y: offsetGlowY }}
        className="pointer-events-none absolute -inset-6 sm:-inset-10 -z-30 rounded-full blur-[60px] opacity-25 animate-morph-glow"
        aria-hidden="true"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle at 45% 45%, var(--accent) 0%, var(--accent-2) 60%, transparent 80%)",
          }}
        />
      </motion.div>

      {/* =========================================================
          LAYER B: 6x6 DOT GRID (Behind top-right, offset by 28px)
          ========================================================= */}
      <div
        className="pointer-events-none absolute -top-7 -right-7 sm:-top-8 sm:-right-8 w-28 h-28 grid grid-cols-6 gap-2.5 -z-20 opacity-40"
        aria-hidden="true"
      >
        {[...Array(36)].map((_, i) => (
          <span
            key={i}
            className="w-[5px] h-[5px] rounded-full"
            style={{ backgroundColor: "var(--muted)" }}
          />
        ))}
      </div>

      {/* =========================================================
          LAYER C: OFFSET OUTLINE ARCH (1.5px solid var(--accent), 20px right & down)
          ========================================================= */}
      <div
        className="pointer-events-none absolute inset-0 translate-x-5 translate-y-5 rounded-t-[999px] rounded-b-[36px] border-[1.5px] -z-10"
        style={{ borderColor: "var(--accent)", opacity: 0.85 }}
        aria-hidden="true"
      />

      {/* =========================================================
          LAYER H (Partial): ACCENT-2 HALF-CIRCLE (Bottom-left peek)
          ========================================================= */}
      <div
        className="pointer-events-none absolute -bottom-3 -left-3 w-14 h-7 rounded-t-full -rotate-45 -z-10 opacity-70"
        style={{ backgroundColor: "var(--accent-2)" }}
        aria-hidden="true"
      />

      {/* =========================================================
          LAYER D, E, F, G: MAIN COMPOSITION WITH 3D TILT
          ========================================================= */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: offsetFrameX,
          y: offsetFrameY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Layer D: Rotating Gradient Border Wrapper (padding 4px, same arch radius) */}
        <div className="relative w-full h-full p-1 rounded-t-[999px] rounded-b-[36px] hero-gradient-border shadow-card hover:shadow-card-hover transition-shadow duration-300">
          {/* Layer E: Inner Mat (10px padding, background var(--bg)) */}
          <div className="w-full h-full p-2.5 rounded-t-[999px] rounded-b-[32px] bg-bg flex items-center justify-center">
            {/* Layer F: Photo Container (Arch Radius + overflow:hidden touches all edges) */}
            <motion.div
              initial={{ clipPath: "inset(0% 0% 100% 0% round 999px 999px 28px 28px)" }}
              animate={hasAnimated ? { clipPath: "inset(0% 0% 0% 0% round 999px 999px 28px 28px)" } : {}}
              transition={{ duration: 1.1, delay: 0.15, ease: WARM_EASE }}
              className="relative w-full h-full rounded-t-[999px] rounded-b-[28px] overflow-hidden bg-surface"
            >
              <motion.div
                initial={{ scale: 1.15 }}
                animate={hasAnimated ? { scale: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.2, ease: WARM_EASE }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImg}
                  alt="Portrait of Kshitiz"
                  fill
                  priority
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 400px, 440px"
                  className="object-cover"
                  style={{ objectPosition: "center 25%" }}
                  onError={() => setCurrentImg("/images/kshitiz-placeholder.svg")}
                />

                {/* Layer G: Bottom Fade Overlay on Photo */}
                <div
                  className="pointer-events-none absolute inset-0 z-10"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in srgb, var(--text) 25%, transparent) 0%, transparent 45%)",
                  }}
                  aria-hidden="true"
                />

                {/* Subtle Warm Overlay to blend photo with active theme */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light opacity-60"
                  style={{ backgroundColor: "var(--accent)" }}
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* =========================================================
            LAYER H: DECORATIONS
            ========================================================= */}
        {/* Top-Left Accent Circle Sticker (56px) with Sparkle Icon */}
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent text-onAccent flex items-center justify-center shadow-card border-2 border-bg"
          aria-hidden="true"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </motion.div>

        {/* Top-Right Curved Line Accent SVG (Draw on load) */}
        <div
          className="pointer-events-none absolute -top-8 -right-4 sm:-top-10 sm:-right-6 w-24 h-24 z-10"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
            <motion.path
              d="M 10 90 Q 75 80 85 15"
              stroke="var(--accent-2)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={hasAnimated ? { pathLength: 1, opacity: 0.85 } : {}}
              transition={{ duration: 1.4, delay: 0.6, ease: WARM_EASE }}
            />
          </svg>
        </div>

        {/* =========================================================
            REQUIREMENT 3: SOLID FLOATING CHIPS (Readable over any photo)
            ========================================================= */}
        {/* Chip 1: "5+ Years Experience" (Middle-Right Edge, 40% overlap) */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{
            backgroundColor: "color-mix(in srgb, var(--surface) 94%, transparent)",
            boxShadow: "0 12px 32px color-mix(in srgb, var(--text) 14%, transparent)",
            backdropFilter: "blur(8px)",
          }}
          className="absolute top-1/3 -right-6 sm:-right-10 z-20 px-4 py-2.5 rounded-2xl border border-warmBorder flex flex-col text-left"
        >
          <span className="font-heading text-base sm:text-lg font-bold text-primaryText leading-tight">
            5+ Years
          </span>
          <span className="text-[10px] uppercase font-mono tracking-wider text-muted font-semibold">
            Experience
          </span>
        </motion.div>

        {/* Chip 2: "40+ Projects Shipped Worldwide" (Bottom-Left Edge, 40% overlap) */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          style={{
            backgroundColor: "color-mix(in srgb, var(--surface) 94%, transparent)",
            boxShadow: "0 12px 32px color-mix(in srgb, var(--text) 14%, transparent)",
            backdropFilter: "blur(8px)",
          }}
          className="absolute bottom-8 -left-6 sm:-left-10 z-20 px-4 py-2.5 rounded-2xl border border-warmBorder flex items-center gap-2.5"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
          <div className="flex flex-col text-left">
            <span className="font-heading text-sm sm:text-base font-bold text-primaryText leading-none">
              40+ Projects
            </span>
            <span className="text-[9px] uppercase font-mono tracking-wider text-muted font-semibold mt-0.5">
              Shipped worldwide
            </span>
          </div>
        </motion.div>

        {/* =========================================================
            REQUIREMENT 4: ROTATING CIRCULAR TEXT BADGE
            Position: bottom-right, disc center ON the frame corner
            (~60% hangs outside the photo)
            ========================================================= */}
        <div className="absolute -bottom-8 -right-8 sm:-bottom-10 sm:-right-10 z-30">
          <RotatingBadge targetSectionId="about" />
        </div>
      </motion.div>
    </div>
  );
}
