"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { siteData } from "@/data/site";

interface AboutPhotoFrameProps {
  imageSrc?: string;
  insetImageSrc?: string;
}

const WARM_EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutPhotoFrame({
  imageSrc = siteData.profile.aboutImage,
  insetImageSrc = siteData.profile.aboutInsetImage || "/images/kshitiz-workspace.jpg",
}: AboutPhotoFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mainImg, setMainImg] = useState(imageSrc);
  const [insetImg, setInsetImg] = useState(insetImageSrc);
  const [isHovered, setIsHovered] = useState(false);
  const [isInsetHovered, setIsInsetHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const touchQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(touchQuery.matches);
    const handleTouchChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    touchQuery.addEventListener("change", handleTouchChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      touchQuery.removeEventListener("change", handleTouchChange);
    };
  }, []);

  // Scroll parallax inside section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const photoParallaxY = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const insetParallaxY = useTransform(scrollYProgress, [0, 1], [-26, 26]);
  const dotGridParallaxY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  // Desktop mouse parallax coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springTilt = { damping: 24, stiffness: 140 };
  const smoothMouseX = useSpring(mouseX, springTilt);
  const smoothMouseY = useSpring(mouseY, springTilt);

  // 3D Tilt angles (max 6deg)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  // Opposite parallax for inset circle (~14px)
  const insetOppositeX = useTransform(smoothMouseX, [-0.5, 0.5], [14, -14]);
  const insetOppositeY = useTransform(smoothMouseY, [-0.5, 0.5], [14, -14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative isolation-isolate w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] aspect-[4/5] mx-auto select-none overflow-visible"
      style={{ perspective: 1200 }}
    >
      {/* =========================================================
          LAYER F (Decorations): VERTICAL LABEL (Left Edge, Desktop)
          ========================================================= */}
      <div
        className="hidden md:flex items-center gap-2.5 absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-center pointer-events-none z-10"
        aria-hidden="true"
      >
        <span className="w-6 h-px bg-muted opacity-40 shrink-0" />
        <span
          className="text-[11px] font-body font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
          style={{ color: "var(--muted)" }}
        >
          KSHITIZ — PORTFOLIO
        </span>
      </div>

      {/* =========================================================
          LAYER F (Decorations): 5x4 DOT GRID (Behind Bottom-Left)
          ========================================================= */}
      <motion.div
        style={{ y: reducedMotion ? 0 : dotGridParallaxY }}
        className="pointer-events-none absolute -bottom-7 -left-7 sm:-bottom-9 sm:-left-9 w-24 h-20 grid grid-cols-5 gap-2.5 -z-30 opacity-35"
        aria-hidden="true"
      >
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: "var(--muted)" }}
          />
        ))}
      </motion.div>

      {/* =========================================================
          LAYER F (Decorations): ROTATING CROSSHAIR MARKS
          ========================================================= */}
      {/* Crosshair 1: Top-Left */}
      <div
        className="pointer-events-none absolute -top-5 -left-5 sm:-top-7 sm:-left-7 z-10 animate-crosshair"
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="7" y1="0" x2="7" y2="14" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Crosshair 2: Bottom-Right Offset */}
      <div
        className="pointer-events-none absolute -bottom-5 right-20 sm:right-24 z-10 animate-crosshair"
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="7" y1="0" x2="7" y2="14" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* =========================================================
          LAYER F (Decorations): ACCENT-2 STAR / ASTERISK (Top-Left)
          ========================================================= */}
      <motion.div
        animate={reducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute top-4 left-4 z-20 text-accent-2 opacity-80"
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
        </svg>
      </motion.div>

      {/* =========================================================
          LAYER A: FANNED BACK CARDS (THE "STACK")
          ========================================================= */}
      {/* Back Card 1: Shifted Left & Down, Rotated -6deg (-10deg on hover) */}
      <motion.div
        initial={reducedMotion ? false : { x: 0, y: 0, rotate: 0 }}
        whileInView={
          reducedMotion
            ? {}
            : isHovered
            ? { x: -20, y: 12, rotate: -10 }
            : { x: -14, y: 10, rotate: -6 }
        }
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        style={{
          backgroundColor: "var(--surface-2)",
          borderColor: "var(--border)",
          boxShadow: "0 20px 50px color-mix(in srgb, var(--text) 10%, transparent)",
        }}
        className="pointer-events-none absolute inset-0 rounded-[40px] border -z-20 origin-center transition-all duration-500 ease-out"
        aria-hidden="true"
      />

      {/* Back Card 2: Shifted Right & Down, Rotated +4deg (+8deg on hover), Blueprint Dashed Border */}
      <motion.div
        initial={reducedMotion ? false : { x: 0, y: 0, rotate: 0 }}
        whileInView={
          reducedMotion
            ? {}
            : isHovered
            ? { x: 18, y: 18, rotate: 8 }
            : { x: 12, y: 14, rotate: 4 }
        }
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.12 }}
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          boxShadow: "0 20px 50px color-mix(in srgb, var(--text) 10%, transparent)",
        }}
        className="pointer-events-none absolute inset-0 rounded-[40px] border -z-10 origin-center transition-all duration-500 ease-out"
        aria-hidden="true"
      >
        {/* Thin Blueprint Dashed Outline in var(--accent) */}
        <div
          className="absolute inset-2.5 rounded-[32px] border-[1.5px] border-dashed border-accent pointer-events-none opacity-75"
          aria-hidden="true"
        />
      </motion.div>

      {/* =========================================================
          LAYER B: MAIN PHOTO CARD (FRONT) WITH 3D TILT
          ========================================================= */}
      <motion.div
        style={
          isTouchDevice || reducedMotion
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        className="relative w-full h-full"
      >
        {/* Main Card Shell: 40px radius, masked notched corner, shadow */}
        <div
          data-cursor="view"
          data-cursor-text="View"
          style={{
            borderColor: "var(--border)",
            boxShadow: "0 30px 70px color-mix(in srgb, var(--text) 16%, transparent)",
            WebkitMask: "radial-gradient(circle 46px at 100% 100%, transparent 98%, #000 100%)",
            mask: "radial-gradient(circle 46px at 100% 100%, transparent 98%, #000 100%)",
          }}
          className="relative w-full h-full rounded-[40px] overflow-hidden border bg-surface cursor-pointer"
        >
          {/* Scroll Parallax Image Carrier with Clip-Path Wipe */}
          <motion.div
            initial={reducedMotion ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={reducedMotion ? {} : { clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: WARM_EASE }}
            className="relative w-full h-full overflow-hidden"
          >
            <motion.div
              style={{ y: reducedMotion ? 0 : photoParallaxY }}
              initial={reducedMotion ? false : { scale: 1.15 }}
              whileInView={reducedMotion ? {} : { scale: isHovered ? 1.04 : 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: WARM_EASE }}
              className="relative w-full h-[115%] -top-[7%]"
            >
              <Image
                src={mainImg}
                alt="Kshitiz at work"
                fill
                priority
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 400px, 460px"
                className="object-cover transition-all duration-700 ease-out"
                style={{
                  objectPosition: "center 25%",
                  filter: isHovered ? "grayscale(0%)" : "grayscale(18%)",
                }}
                onError={() => setMainImg("/images/kshitiz-placeholder.svg")}
              />

              {/* Theme Blend 1: 8% var(--accent) overlay with mix-blend-mode: soft-light */}
              <div
                className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light opacity-80"
                style={{ backgroundColor: "var(--accent)" }}
                aria-hidden="true"
              />

              {/* Theme Blend 2: Bottom Gradient to var(--text) at 20% */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in srgb, var(--text) 20%, transparent) 0%, transparent 45%)",
                }}
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* =========================================================
            LAYER C: NOTCH BUTTON (Sits concentric inside the cut-out corner)
            Centered at bottom-right (100% 100%) with 6px concentric gap
            ========================================================= */}
        <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 z-30">
          {/* Tooltip: "Let's talk" (Fades in above on button hover) */}
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={
              isBtnHovered
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 6, scale: 0.9 }
            }
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute bottom-full mb-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-surface border border-warmBorder text-primaryText shadow-card text-[11px] font-heading font-semibold whitespace-nowrap z-40"
            aria-hidden="true"
          >
            Let&apos;s talk
          </motion.div>

          {/* Soft Pulsing Ring behind the button */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-accent animate-notch-pulse"
            aria-hidden="true"
          />

          {/* Concentric 72px Circular CTA Button */}
          <motion.button
            onClick={handleContactClick}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 360, damping: 20 }}
            aria-label="Go to contact section"
            className="relative w-[72px] h-[72px] rounded-full bg-accent text-onAccent flex items-center justify-center shadow-card hover:bg-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer group"
          >
            <motion.div
              animate={{ rotate: isBtnHovered ? 45 : 0 }}
              transition={{ duration: 0.3, ease: WARM_EASE }}
            >
              <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
            </motion.div>
          </motion.button>
        </div>

        {/* =========================================================
            LAYER D: INSET CIRCULAR PHOTO (OVERLAPPING TOP-RIGHT)
            ========================================================= */}
        <motion.div
          style={{
            y: reducedMotion ? 0 : insetParallaxY,
          }}
          initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
          whileInView={reducedMotion ? {} : { scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3, ease: WARM_EASE }}
          onMouseEnter={() => setIsInsetHovered(true)}
          onMouseLeave={() => setIsInsetHovered(false)}
          className="absolute -top-7 -right-7 sm:-top-11 sm:-right-11 z-20 cursor-pointer"
        >
          {/* Outer Thin Dashed Rotating Circle (30s linear infinite, speeds up on hover) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: isInsetHovered ? 10 : 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-2.5 sm:-inset-3 pointer-events-none"
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
            </svg>
          </motion.div>

          {/* Inset Photo Disc: 150px desktop, 110px mobile, 6px border bg, 1.5px ring accent */}
          <motion.div
            style={
              isTouchDevice || reducedMotion
                ? {
                    boxShadow: "0 16px 36px color-mix(in srgb, var(--text) 14%, transparent)",
                  }
                : {
                    x: insetOppositeX,
                    y: insetOppositeY,
                    boxShadow: "0 16px 36px color-mix(in srgb, var(--text) 14%, transparent)",
                  }
            }
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="relative w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] rounded-full border-[6px] border-bg ring-1 sm:ring-[1.5px] ring-accent overflow-hidden bg-surface"
          >
            <Image
              src={insetImg}
              alt="Kshitiz's workspace"
              fill
              sizes="(max-width: 640px) 110px, 150px"
              className="object-cover transition-transform duration-500 ease-out hover:scale-110"
              onError={() => setInsetImg("/images/kshitiz-workspace.svg")}
            />
          </motion.div>
        </motion.div>

        {/* =========================================================
            LAYER E: CAPTION CHIP (SOLID, READABLE, REPLACES OLD GLASS CHIP)
            Position: bottom-left, overlapping bottom edge by ~40%
            Clearance: guaranteed >= 24px from bottom-right notch button
            ========================================================= */}
        <motion.div
          initial={reducedMotion ? false : { y: 20, opacity: 0 }}
          whileInView={reducedMotion ? {} : { y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4, ease: WARM_EASE }}
          style={{
            backgroundColor: "color-mix(in srgb, var(--surface) 96%, transparent)",
            borderColor: "var(--border)",
            boxShadow: "0 12px 32px color-mix(in srgb, var(--text) 14%, transparent)",
          }}
          className="animate-float-gentle absolute -bottom-5 sm:-bottom-6 left-2 sm:left-4 z-20 px-3.5 sm:px-4.5 py-2.5 sm:py-3 rounded-full border flex items-center gap-2 sm:gap-2.5 max-w-[calc(100%-88px)] sm:max-w-[290px]"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent shrink-0" />
          <span className="text-xs sm:text-sm font-body font-semibold text-primaryText leading-snug break-words">
            Human Craft &amp; Engineering Scalability
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
