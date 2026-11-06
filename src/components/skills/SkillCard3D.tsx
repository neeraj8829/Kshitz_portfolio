"use client";

import React, { useRef, useState } from "react";
import { SkillDetail } from "@/data/site";
import { SkillIcon } from "./SkillIcons";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SkillCard3DProps {
  skill: SkillDetail;
  compact?: boolean;
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function SkillCard3D({
  skill,
  compact = false,
  active = false,
  onClick,
  style = {},
}: SkillCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Mouse coords for 3D tilt & glare
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs
  const springConfig = { stiffness: 170, damping: 18, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Tilt transforms (±12 deg max)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  // Magnetic translation (up to 8px)
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-6, 6]);

  // Glare position in percentages
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const widthClass = compact
    ? "w-44 sm:w-48 h-56 sm:h-60 p-4"
    : "w-52 sm:w-60 h-64 sm:h-72 p-5 sm:p-6";

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        x: isHovered ? translateX : 0,
        y: isHovered ? translateY : 0,
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={`relative rounded-3xl select-none transition-shadow duration-300 ${widthClass} ${
        isHovered
          ? "shadow-[0_24px_60px_rgba(43,36,32,0.14)] z-30 ring-1 ring-accent/30"
          : "shadow-card hover:shadow-card-hover"
      }`}
    >
      {/* Solid warm card background */}
      <div
        className="absolute inset-0 rounded-3xl bg-surface/95 border border-warmBorder overflow-hidden transition-colors duration-300"
        style={{
          boxShadow: isHovered
            ? "inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 20px 40px rgba(43, 36, 32, 0.12)"
            : "inset 0 1px 1px rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Soft Radial Glare / Spotlight following cursor */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 120px at ${glarePos.x}% ${glarePos.y}%, var(--accent-light, rgba(217, 108, 74, 0.16)), transparent 75%)`,
          }}
        />

        {/* Animated Gradient Border on Hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            padding: "1px",
            background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>

      {/* Card Content (Elevated in 3D with translateZ) */}
      <div
        className="relative z-10 flex flex-col justify-between h-full"
        style={{
          transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Top Header: Category Tag & Level Badge */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-accent px-2 py-0.5 rounded-full bg-accent/10 border border-accent/15">
            {skill.category}
          </span>
          <span className="text-xs font-mono font-bold text-muted tabular-nums">
            {skill.level}%
          </span>
        </div>

        {/* Center: Skill Icon (scales & rotates slightly) & Name */}
        <div className="my-auto text-center flex flex-col items-center">
          <motion.div
            animate={
              isHovered
                ? { scale: 1.15, rotate: 6, y: -4 }
                : { scale: 1, rotate: 0, y: 0 }
            }
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-bg border border-warmBorder flex items-center justify-center text-primaryText shadow-subtle mb-3 group-hover:text-accent"
          >
            <SkillIcon name={skill.name} className="w-8 h-8 sm:w-9 sm:h-9" />
          </motion.div>

          <h4 className="font-heading font-bold text-base sm:text-lg text-primaryText tracking-tight">
            {skill.name}
          </h4>
          <p className="text-[11px] text-muted font-body mt-0.5 line-clamp-1">
            {skill.description}
          </p>
        </div>

        {/* Bottom: Info Reveal (slides up on hover) */}
        <div className="pt-2 border-t border-warmBorder/60">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-1.5">
            <span>Experience:</span>
            <span className="font-bold text-primaryText">{skill.years}+ Years</span>
          </div>

          {/* Animated Proficiency Bar */}
          <div className="w-full h-1.5 rounded-full bg-bg border border-warmBorder/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isHovered || active ? `${skill.level}%` : "30%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-accent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

