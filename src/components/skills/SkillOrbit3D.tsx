"use client";

import React, { useState, useEffect, useRef } from "react";
import { SkillDetail } from "@/data/site";
import { SkillIcon } from "./SkillIcons";
import { motion, AnimatePresence } from "framer-motion";

interface SkillOrbit3DProps {
  skills: SkillDetail[];
}

interface OrbitRingConfig {
  radiusX: number;
  radiusY: number;
  speed: number; // degrees per frame
  direction: 1 | -1;
  skills: SkillDetail[];
}

export default function SkillOrbit3D({ skills }: SkillOrbit3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillDetail | null>(null);
  const [hoveredRingIndex, setHoveredRingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [angles, setAngles] = useState<[number, number, number]>([0, 120, 240]);
  const anglesRef = useRef<[number, number, number]>([0, 120, 240]);
  const rafIdRef = useRef<number | null>(null);

  // Group skills into 3 concentric orbits
  const innerSkills = skills.slice(0, 4);
  const midSkills = skills.slice(4, 9);
  const outerSkills = skills.slice(9, 15);

  const [ringRadii, setRingRadii] = useState({
    inner: { rx: 140, ry: 65 },
    mid: { rx: 230, ry: 105 },
    outer: { rx: 330, ry: 155 },
  });

  // Responsive radii
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRingRadii({
          inner: { rx: 100, ry: 45 },
          mid: { rx: 160, ry: 75 },
          outer: { rx: 230, ry: 110 },
        });
      } else if (w < 1024) {
        setRingRadii({
          inner: { rx: 120, ry: 55 },
          mid: { rx: 190, ry: 90 },
          outer: { rx: 280, ry: 130 },
        });
      } else {
        setRingRadii({
          inner: { rx: 150, ry: 70 },
          mid: { rx: 250, ry: 115 },
          outer: { rx: 360, ry: 165 },
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation frame loop for continuous orbit rotation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.666, 2.5);
      lastTime = time;

      if (!isPaused) {
        // Inner faster (0.28 deg/frame), mid (0.18 deg/frame, reverse), outer (0.12 deg/frame)
        anglesRef.current[0] = (anglesRef.current[0] + 0.28 * delta) % 360;
        anglesRef.current[1] = (anglesRef.current[1] - 0.18 * delta + 360) % 360;
        anglesRef.current[2] = (anglesRef.current[2] + 0.12 * delta) % 360;
        setAngles([...anglesRef.current]);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isPaused]);

  const rings: OrbitRingConfig[] = [
    {
      radiusX: ringRadii.inner.rx,
      radiusY: ringRadii.inner.ry,
      speed: 0.28,
      direction: 1,
      skills: innerSkills,
    },
    {
      radiusX: ringRadii.mid.rx,
      radiusY: ringRadii.mid.ry,
      speed: -0.18,
      direction: -1,
      skills: midSkills,
    },
    {
      radiusX: ringRadii.outer.rx,
      radiusY: ringRadii.outer.ry,
      speed: 0.12,
      direction: 1,
      skills: outerSkills,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[660px] flex items-center justify-center overflow-hidden select-none rounded-3xl"
      aria-label="Concentric 3D Orbit View of Skills"
      role="region"
    >
      {/* Background Particles drifting softly */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 6 + (i % 5) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 6) * 0.7,
            }}
            className="absolute rounded-full"
            style={{
              width: 3 + (i % 4),
              height: 3 + (i % 4),
              backgroundColor: i % 2 === 0 ? "var(--accent)" : "var(--accent-2)",
              top: `${15 + (i * 17) % 70}%`,
              left: `${10 + (i * 23) % 80}%`,
            }}
          />
        ))}
      </div>

      {/* Center Sun / Core Badge: Monogram K */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent text-onAccent flex items-center justify-center font-heading font-extrabold text-2xl sm:text-3xl shadow-card ring-4 ring-accent/20 cursor-default"
        >
          K
        </motion.div>
        <span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-muted">
          Core Skills
        </span>
      </div>

      {/* Orbit Rings Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {rings.map((ring, ringIndex) => {
          const isRingLit = hoveredRingIndex === ringIndex;
          const currentBaseAngle = angles[ringIndex];
          const count = ring.skills.length;
          const step = 360 / count;

          return (
            <React.Fragment key={ringIndex}>
              {/* Elliptical dashed SVG orbit ring */}
              <svg
                className="absolute pointer-events-none transition-colors duration-500"
                style={{
                  width: ring.radiusX * 2 + 30,
                  height: ring.radiusY * 2 + 30,
                }}
              >
                <ellipse
                  cx={ring.radiusX + 15}
                  cy={ring.radiusY + 15}
                  rx={ring.radiusX}
                  ry={ring.radiusY}
                  fill="none"
                  stroke={isRingLit ? "var(--accent)" : "var(--border)"}
                  strokeWidth={isRingLit ? 2 : 1}
                  strokeDasharray={isRingLit ? "none" : "4 6"}
                  opacity={isRingLit ? 0.9 : 0.65}
                />
              </svg>

              {/* Orbiting Skill Chips */}
              {ring.skills.map((skill, itemIndex) => {
                const itemAngle = (currentBaseAngle + itemIndex * step) % 360;
                const rad = (itemAngle * Math.PI) / 180;
                // Parametric ellipse calculation
                const x = ring.radiusX * Math.cos(rad);
                const y = ring.radiusY * Math.sin(rad);

                // Depth perception: top of ellipse is farther (scale down slightly, lower z-index)
                const isBottomHalf = y >= 0;
                const depthScale = isBottomHalf ? 1.04 : 0.88;
                const zIndex = isBottomHalf ? 25 : 10;
                const isItemHovered = hoveredSkill?.id === skill.id;

                return (
                  <div
                    key={skill.id}
                    onMouseEnter={() => {
                      setIsPaused(true);
                      setHoveredSkill(skill);
                      setHoveredRingIndex(ringIndex);
                    }}
                    onMouseLeave={() => {
                      setIsPaused(false);
                      setHoveredSkill(null);
                      setHoveredRingIndex(null);
                    }}
                    role="listitem"
                    aria-label={`${skill.name}, ${skill.level}% proficiency`}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{
                      transform: `translate(${x}px, ${y}px) scale(${
                        isItemHovered ? 1.25 : depthScale
                      })`,
                      zIndex: isItemHovered ? 50 : zIndex,
                      transition: isItemHovered
                        ? "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s"
                        : "none",
                    }}
                  >
                    <div
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                        isItemHovered
                          ? "bg-surface border-2 border-accent shadow-card-hover text-accent -translate-y-2"
                          : "bg-surface/85 border border-warmBorder shadow-subtle text-primaryText hover:text-accent"
                      }`}
                    >
                      <SkillIcon name={skill.name} className="w-6 h-6 sm:w-7 sm:h-7" />

                      {/* Tooltip on hover */}
                      <AnimatePresence>
                        {isItemHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-surface shadow-float border border-warmBorder whitespace-nowrap z-50 text-center"
                          >
                            <span className="font-heading font-bold text-xs text-primaryText block leading-tight">
                              {skill.name}
                            </span>
                            <span className="text-[10px] font-mono text-accent font-semibold">
                              {skill.level}% • {skill.years}+ yrs
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-warmBorder text-[11px] font-mono text-muted shadow-subtle flex items-center gap-2 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-2" />
        <span>Hover any orbiting chip to pause and inspect proficiency</span>
      </div>
    </div>
  );
}

