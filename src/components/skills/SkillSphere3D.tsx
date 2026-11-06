"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { SkillDetail } from "@/data/site";
import { SkillIcon } from "./SkillIcons";

interface SkillSphere3DProps {
  skills: SkillDetail[];
}

interface Point3D {
  skill: SkillDetail;
  x: number;
  y: number;
  z: number;
}

export default function SkillSphere3D({ skills }: SkillSphere3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillDetail | null>(null);
  const [radius, setRadius] = useState<number>(240);

  // Rotation angles around X and Y
  const rotRef = useRef<{ x: number; y: number }>({ x: 15, y: 0 });
  const velRef = useRef<{ x: number; y: number }>({ x: 0.1, y: 0.22 });
  const isDraggingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const rafIdRef = useRef<number | null>(null);

  // Render tick state
  const [, setTick] = useState<number>(0);

  // Responsive sphere radius
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(140);
      else if (w < 1024) setRadius(190);
      else setRadius(240);
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Fibonacci Sphere points distribution
  const points: Point3D[] = useMemo(() => {
    const N = skills.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    return skills.map((skill, i) => {
      // Golden spiral distribution on sphere
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      return { skill, x, y, z };
    });
  }, [skills]);

  // Main 3D rotation frame loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.666, 2.5);
      lastTime = time;

      if (!isDraggingRef.current) {
        if (isHoveredRef.current) {
          // Slow down smoothly when hovering an item
          velRef.current.x *= 0.92;
          velRef.current.y *= 0.92;
        } else {
          // Ease toward idle rotation speed
          velRef.current.x += (0.08 - velRef.current.x) * 0.05 * delta;
          velRef.current.y += (0.24 - velRef.current.y) * 0.05 * delta;
        }

        rotRef.current.x = (rotRef.current.x + velRef.current.x * delta) % 360;
        rotRef.current.y = (rotRef.current.y + velRef.current.y * delta) % 360;
        setTick((prev) => prev + 1);
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Mouse / Pointer drag trackball handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastMouseRef.current.x;
    const deltaY = e.clientY - lastMouseRef.current.y;
    const now = performance.now();
    const dt = Math.max(now - lastMouseRef.current.time, 1);

    // Trackball speed
    velRef.current.y = (deltaX / dt) * 12;
    velRef.current.x = (-deltaY / dt) * 12;

    rotRef.current.y += deltaX * 0.45;
    rotRef.current.x -= deltaY * 0.45;

    lastMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
    setTick((prev) => prev + 1);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  // Compute 3D projection for each point given current angles
  const projectedPoints = useMemo(() => {
    const radX = (rotRef.current.x * Math.PI) / 180;
    const radY = (rotRef.current.y * Math.PI) / 180;

    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);

    return points.map((p) => {
      // 1. Rotate around Y axis
      const x1 = p.x * cosY + p.z * sinY;
      const y1 = p.y;
      const z1 = -p.x * sinY + p.z * cosY;

      // 2. Rotate around X axis
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      // Projected coordinates
      const projX = x2 * radius;
      const projY = y2 * radius;
      // z2 goes from -1 (back) to 1 (front)
      const depth = (z2 + 1) / 2; // 0 to 1

      const scale = 0.72 + depth * 0.48; // 0.72 to 1.2
      const opacity = Math.max(0.28, 0.28 + depth * 0.72);
      const isFront = z2 > 0;

      return {
        ...p,
        projX,
        projY,
        z: z2,
        scale,
        opacity,
        isFront,
      };
    });
  }, [points, radius]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      data-cursor="drag"
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[660px] flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-3xl"
      aria-label="3D Interactive Tag-Cloud Sphere of Skills. Drag to spin."
      role="region"
    >
      {/* Background Soft Glow */}
      <div
        className="pointer-events-none absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, var(--accent-2) 60%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Projected Items */}
      <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
        {projectedPoints.map((item) => {
          const isItemHovered = hoveredSkill?.id === item.skill.id;
          const isAnyHovered = hoveredSkill !== null;
          const dimmedOpacity = isAnyHovered && !isItemHovered ? item.opacity * 0.4 : item.opacity;

          return (
            <div
              key={item.skill.id}
              role="listitem"
              aria-label={`${item.skill.name}, ${item.skill.level}% proficiency`}
              onMouseEnter={() => {
                isHoveredRef.current = true;
                setHoveredSkill(item.skill);
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
                setHoveredSkill(null);
              }}
              className="absolute pointer-events-auto cursor-pointer flex items-center justify-center transition-all duration-200"
              style={{
                transform: `translate(${item.projX}px, ${item.projY}px) scale(${
                  isItemHovered ? item.scale * 1.3 : item.scale
                })`,
                opacity: isItemHovered ? 1 : dimmedOpacity,
                zIndex: isItemHovered ? 100 : Math.round((item.z + 1) * 50),
              }}
            >
              <div
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                  isItemHovered
                    ? "bg-surface border-2 border-accent shadow-float ring-2 ring-accent/30 text-accent"
                    : "bg-surface/80 border border-warmBorder shadow-subtle text-primaryText hover:text-accent"
                }`}
              >
                <SkillIcon name={item.skill.name} className="w-5 h-5 shrink-0" />
                <span className="font-heading font-bold text-xs sm:text-sm whitespace-nowrap">
                  {item.skill.name}
                </span>

                {/* Accent Underline indicator */}
                {isItemHovered && (
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-warmBorder text-[11px] font-mono text-muted shadow-subtle flex items-center gap-2 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        <span>Drag sphere in any direction • Trackball inertia rotation</span>
      </div>
    </div>
  );
}

