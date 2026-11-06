"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface RevealParagraphProps {
  children: string;
  className?: string;
}

export function RevealParagraph({ children, className = "" }: RevealParagraphProps) {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start 0.9", "start 0.4"],
  });

  const words = children.split(" ");

  return (
    <p ref={elementRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mr-2 mt-1 inline-block">
      <motion.span style={{ opacity }} className="transition-colors">
        {children}
      </motion.span>
    </span>
  );
}
