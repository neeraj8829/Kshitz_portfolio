"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExpertiseSkill } from "@/data/site";
import LevelPill from "./LevelPill";
import {
  Code,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  Maximize,
  PenTool,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Type,
  Wind,
  Zap,
  Box,
  Cloud,
  Compass,
} from "lucide-react";

interface SkillTileProps {
  skill: ExpertiseSkill;
  index?: number;
}

function getSkillIcon(iconKey: string) {
  switch (iconKey.toLowerCase()) {
    case "react":
      return Code2;
    case "typescript":
      return Code;
    case "tailwind":
      return Wind;
    case "framer":
      return Sparkles;
    case "node":
      return Server;
    case "database":
      return Database;
    case "network":
      return Globe;
    case "zap":
      return Zap;
    case "docker":
      return Box;
    case "figma":
      return PenTool;
    case "layers":
      return Layers;
    case "type":
      return Type;
    case "compass":
      return Compass;
    case "maximize":
      return Maximize;
    case "git":
      return GitBranch;
    case "shield":
      return ShieldCheck;
    case "gauge":
      return Gauge;
    case "terminal":
      return Terminal;
    case "cloud":
      return Cloud;
    default:
      return PenTool;
  }
}

export default function SkillTile({ skill, index = 0 }: SkillTileProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const IconComponent = getSkillIcon(skill.icon);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="view"
      data-cursor-text={skill.level}
      style={{
        backgroundColor: "var(--surface)",
        borderColor: isHovered
          ? "color-mix(in srgb, var(--accent) 50%, transparent)"
          : "var(--border)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: isHovered
          ? "0 12px 28px color-mix(in srgb, var(--text) 8%, transparent)"
          : "none",
      }}
      className="relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
    >
      {/* Soft Cursor-Following Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 -z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Top Row: Icon Chip & Level Pill */}
      <div className="flex items-start justify-between gap-2 mb-2.5 relative z-10">
        <motion.div
          animate={isHovered ? { scale: 1.08, rotate: 4 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          className="w-9 h-9 rounded-xl bg-bg border border-warmBorder flex items-center justify-center text-accent shrink-0 shadow-xs"
        >
          <IconComponent className="w-4 h-4 stroke-[2]" />
        </motion.div>

        <LevelPill level={skill.level} />
      </div>

      {/* Content: Skill Name & Context Note */}
      <div className="relative z-10">
        <div className="font-body font-semibold text-[14px] sm:text-[15px] text-primaryText leading-snug group-hover:text-accent transition-colors">
          {skill.name}
        </div>
        <p className="font-body text-[12px] sm:text-[13px] text-muted mt-1 leading-normal line-clamp-2">
          {skill.note}
        </p>
      </div>
    </motion.div>
  );
}
