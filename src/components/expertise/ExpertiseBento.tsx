"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExpertiseDomain } from "@/data/site";
import { Layout, Server, Palette, Wrench, ArrowUpRight } from "lucide-react";

interface ExpertiseBentoProps {
  domains: ExpertiseDomain[];
}

function getDomainIcon(icon: string) {
  switch (icon) {
    case "layout":
      return Layout;
    case "server":
      return Server;
    case "palette":
      return Palette;
    case "wrench":
      return Wrench;
    default:
      return Layout;
  }
}

interface BentoCardProps {
  domain: ExpertiseDomain;
  colSpanClass: string;
  index: number;
}

function BentoCard({ domain, colSpanClass, index }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const DomainIcon = getDomainIcon(domain.icon);

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="view"
      data-cursor-text={domain.title}
      style={{
        backgroundColor: "var(--surface)",
        borderColor: isHovered
          ? "color-mix(in srgb, var(--accent) 45%, transparent)"
          : "var(--border)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: isHovered
          ? "0 20px 48px color-mix(in srgb, var(--text) 8%, transparent)"
          : "none",
      }}
      className={`relative rounded-[28px] border p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 ${colSpanClass}`}
    >
      {/* Large Faint Domain Number in Corner (120px) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -right-2 font-heading font-black text-7xl sm:text-8xl lg:text-9xl leading-none select-none opacity-5"
        style={{ color: "var(--text)" }}
      >
        {domain.number}
      </span>

      {/* Cursor-Following Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 -z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div
            style={{
              backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)",
              color: "var(--accent)",
            }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
          >
            <DomainIcon className="w-6 h-6 stroke-[2.2]" />
          </div>

          <span className="font-mono text-xs font-semibold text-muted">
            {domain.number}
          </span>
        </div>

        <h3 className="font-heading font-bold text-xl sm:text-2xl text-primaryText mb-1.5">
          {domain.title}
        </h3>
        <p className="font-body text-xs sm:text-sm text-muted leading-relaxed mb-6">
          {domain.fullDesc}
        </p>

        {/* Compact Skill Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {domain.skills.map((skill, sIdx) => {
            return (
              <motion.div
                key={skill.name}
                animate={isHovered ? { y: [0, -2, 0] } : {}}
                transition={{ duration: 0.3, delay: sIdx * 0.03 }}
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-body font-semibold text-primaryText shadow-xs"
              >
                {/* Level Dot Indicator */}
                {skill.level === "Daily" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" title="Daily" />
                )}
                {skill.level === "Strong" && (
                  <span
                    className="w-1.5 h-1.5 rounded-full border border-accent shrink-0"
                    title="Strong"
                  />
                )}
                <span>{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div
        style={{ borderColor: "var(--border)" }}
        className="relative z-10 pt-4 border-t flex items-center justify-between text-xs text-muted font-body"
      >
        <span className="truncate max-w-[200px] sm:max-w-none">
          <strong className="text-primaryText font-semibold">Exploring:</strong> {domain.exploring}
        </span>
        <a
          href="#projects"
          className="inline-flex items-center gap-1 text-accent font-semibold hover:underline shrink-0 ml-2"
        >
          <span>Projects</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

export default function ExpertiseBento({ domains }: ExpertiseBentoProps) {
  // 12-column grid mapping:
  // Domain 0: Frontend -> col-span-12 lg:col-span-7
  // Domain 1: Backend -> col-span-12 lg:col-span-5
  // Domain 2: Design -> col-span-12 lg:col-span-5
  // Domain 3: Tools -> col-span-12 lg:col-span-7
  const colSpans = [
    "col-span-12 lg:col-span-7 min-h-[360px]",
    "col-span-12 lg:col-span-5 min-h-[360px]",
    "col-span-12 lg:col-span-5 min-h-[360px]",
    "col-span-12 lg:col-span-7 min-h-[360px]",
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-5 sm:gap-6">
        {domains.map((domain, index) => (
          <BentoCard
            key={domain.id}
            domain={domain}
            colSpanClass={colSpans[index % colSpans.length]}
            index={index}
          />
        ))}
      </div>

      {/* Legend below the grid */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-body text-muted select-none">
        <span className="font-semibold text-primaryText uppercase tracking-wider text-[11px]">
          Proficiency Indicator:
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>Daily (Production core)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full border border-accent" />
          <span>Strong (Deep specialized)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full border border-warmBorder bg-transparent" />
          <span>Familiar (Active practical)</span>
        </div>
      </div>
    </div>
  );
}
