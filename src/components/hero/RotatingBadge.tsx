"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface RotatingBadgeProps {
  targetSectionId?: string;
  className?: string;
}

export default function RotatingBadge({
  targetSectionId = "about",
  className = "",
}: RotatingBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(targetSectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative z-30 select-none ${className}`}
    >
      {/* Outer Rotating Disc (136px desktop, 104px mobile) */}
      <div className="relative w-[104px] h-[104px] sm:w-[136px] sm:h-[136px] flex items-center justify-center filter drop-shadow-card">
        {/* Rotating SVG Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: isHovered ? 36 : 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-full h-full"
        >
          <svg
            viewBox="0 0 136 136"
            className="w-full h-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {/* Circular Path with exact radius 54 centered at 68,68 */}
              <path
                id="rotatingCirclePath"
                d="M 68, 14 a 54,54 0 1,1 0,108 a 54,54 0 1,1 0,-108"
                fill="none"
              />
            </defs>

            {/* Solid Backing Disc: Guarantees 100% legibility over any photo background */}
            <circle
              cx="68"
              cy="68"
              r="66"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />

            {/* Circular Text with exact circumference 339.3 and spacing adjustment */}
            <text
              fill="var(--text)"
              style={{
                fontFamily: "var(--font-body, 'Inter', sans-serif)",
                fontSize: "9.5px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <textPath
                href="#rotatingCirclePath"
                textLength="339.3"
                lengthAdjust="spacing"
              >
                SCROLL TO EXPLORE <tspan fill="var(--accent)" fontSize="12px">•</tspan> SCROLL TO EXPLORE <tspan fill="var(--accent)" fontSize="12px">•</tspan>{" "}
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Center Static Clickable CTA Button (52px diameter on desktop, 42px on mobile) */}
        <motion.button
          onClick={handleClick}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          aria-label="Scroll to next section"
          title="Scroll down"
          className="absolute inset-0 m-auto w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full bg-accent text-onAccent flex items-center justify-center shadow-card hover:bg-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}

