"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpertiseDomain } from "@/data/site";
import SkillTile from "./SkillTile";
import { Layout, Server, Palette, Wrench, ArrowUpRight } from "lucide-react";

interface DomainPanelProps {
  domain: ExpertiseDomain;
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

export default function DomainPanel({ domain }: DomainPanelProps) {
  const DomainIcon = getDomainIcon(domain.icon);

  const handleRelatedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsEl = document.getElementById("projects");
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      role="tabpanel"
      id={`domain-panel-${domain.id}`}
      aria-labelledby={`domain-tab-${domain.id}`}
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border)",
      }}
      className="w-full rounded-[24px] border p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xs overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={domain.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col h-full justify-between"
        >
          {/* Header Row */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-3.5 sm:gap-4">
                {/* 56px Rounded-Square Icon Tile */}
                <div
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)",
                    color: "var(--accent)",
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                >
                  <DomainIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-primaryText leading-snug">
                    {domain.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-muted mt-1 leading-relaxed max-w-[55ch]">
                    {domain.fullDesc}
                  </p>
                </div>
              </div>

              {/* Far Right "X skills" Pill */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                }}
                className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-semibold border shrink-0"
              >
                {domain.skills.length} skills
              </div>
            </div>

            {/* Skills Grid: 2 Columns on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-8">
              {domain.skills.map((skill, index) => (
                <SkillTile key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Footer Row Separated by 1px border line */}
          <div
            style={{ borderColor: "var(--border)" }}
            className="pt-5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm"
          >
            {/* Left: "Currently exploring" line */}
            <div className="flex items-center gap-2 text-muted font-body">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-semibold text-primaryText">Exploring:</span>
              <span className="truncate max-w-[280px] sm:max-w-none">{domain.exploring}</span>
            </div>

            {/* Right: "See related projects" link */}
            <a
              href="#projects"
              onClick={handleRelatedClick}
              className="inline-flex items-center gap-1.5 font-body font-semibold text-accent hover:text-accent-hover transition-colors group self-start sm:self-auto cursor-pointer"
            >
              <span>See related projects</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

