"use client";

import React, { useRef, useState, useEffect } from "react";
import { SkillDetail } from "@/data/site";
import SkillCard3D from "./SkillCard3D";
import { useSkillsRotation } from "./useSkillsRotation";

interface SkillRing3DProps {
  skills: SkillDetail[];
}

export default function SkillRing3D({ skills }: SkillRing3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState<number>(420);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // We display 12 skills on the ring
  const ringSkills = skills.slice(0, 12);
  const count = ringSkills.length;
  const angleStep = 360 / count;

  // Responsive radius calculation
  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setRadius(230);
      } else if (width < 1024) {
        setRadius(320);
      } else {
        setRadius(420);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const {
    rotation,
    tilt,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleMouseEnter,
    handleMouseLeave,
    rotateTo,
  } = useSkillsRotation({
    baseSpeed: 0.16,
    containerRef,
    dragSensitivity: 0.35,
  });

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      rotateTo(rotation + angleStep);
    } else if (e.key === "ArrowRight") {
      rotateTo(rotation - angleStep);
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={isDragging ? "drag" : "view"}
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[660px] flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-3xl"
      aria-label="Interactive rotating skills showcase. Drag or use arrow keys to rotate."
      role="region"
    >
      {/* 3D Perspective Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: 1400,
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Soft Elliptical Glow / Shadow Beneath the Ring */}
        <div
          className="pointer-events-none absolute bottom-8 sm:bottom-12 w-[480px] sm:w-[650px] lg:w-[800px] h-[90px] rounded-full blur-3xl opacity-25"
          style={{
            background: "radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)",
            transform: "rotateX(75deg) translateZ(-60px)",
          }}
          aria-hidden="true"
        />

        {/* The Rotating Ring Cylinder (Direct RAF-driven 3D transform with hardware acceleration) */}
        <div
          className="relative w-0 h-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            transform: `rotateX(${-8 + tilt.x}deg) rotateY(${rotation + tilt.y}deg)`,
          }}
        >
          {ringSkills.map((skill, index) => {
            const cardAngle = index * angleStep;
            // Compute current normalized angle facing viewer (0deg = direct front facing)
            const currentAngle = (cardAngle + rotation + tilt.y) % 360;
            const normalizedAngle = ((currentAngle % 360) + 360) % 360; // 0 to 360
            const rad = (normalizedAngle * Math.PI) / 180;
            // cos(rad): 1 = facing front, -1 = facing back
            const cosVal = Math.cos(rad);

            // Compute depth-based opacity and scale
            // Front: opacity 1, scale 1; Back: opacity ~0.42, scale 0.88
            const opacity = Math.max(0.42, 0.42 + ((cosVal + 1) / 2) * 0.58);
            const scale = 0.88 + ((cosVal + 1) / 2) * 0.14;
            const isFront = cosVal > 0.25;

            return (
              <div
                key={skill.id}
                role="listitem"
                aria-label={`${skill.name}, ${skill.level}% proficiency`}
                style={{
                  position: "absolute",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "visible",
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  opacity,
                  pointerEvents: isFront ? "auto" : "none",
                }}
                className="flex items-center justify-center"
              >
                <SkillCard3D
                  skill={skill}
                  compact={radius < 320}
                  active={selectedIndex === index}
                  onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Drag Hint & Instruction Badge at Bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-warmBorder text-[11px] font-mono text-muted shadow-subtle flex items-center gap-2 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
        <span>Drag horizontally to rotate • Arrow keys supported</span>
      </div>
    </div>
  );
}

