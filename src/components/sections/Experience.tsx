"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { siteData, ExperienceItem } from "@/data/site";
import HighlightText from "../ui/HighlightText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, MapPin, CheckCircle2 } from "lucide-react";

const WARM_EASE = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current && lineRef.current) {
      const lineAnim = gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      return () => {
        lineAnim.kill();
      };
    }
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      aria-label="Experience & Education section"
      className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto relative"
    >
      {/* Section Eyebrow */}
      <div className="flex items-center gap-3 mb-6">
        <span className="eyebrow-label">
          04 — EXPERIENCE &amp; EDUCATION
        </span>
        <div className="h-px bg-warmBorder flex-1 max-w-[120px]" />
      </div>

      <div className="max-w-2xl mb-16 sm:mb-20">
        <h2 className="section-h2 text-primaryText tracking-tight">
          A track record of <HighlightText>shipping</HighlightText> value and continuous study.
        </h2>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Background Track Line */}
        <div
          className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-warmBorder -z-0"
          aria-hidden="true"
        />

        {/* Animated Drawing Line (Accent) */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-accent origin-top -z-0"
          aria-hidden="true"
        />

        {/* Timeline Items */}
        <div className="space-y-12 sm:space-y-16">
          {siteData.experience.map((item, index) => {
            const isEven = index % 2 === 0;
            return <TimelineCard key={item.id} item={item} isEven={isEven} />;
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  item,
  isEven,
}: {
  item: ExperienceItem;
  isEven: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  const isWork = item.type === "work";
  const Icon = isWork ? Briefcase : GraduationCap;

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Center Marker Dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full bg-surface border-2 border-accent flex items-center justify-center text-accent shadow-subtle">
        <Icon className="w-4 h-4" />
      </div>

      {/* Card Content Box */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.1, ease: WARM_EASE }}
        className={`ml-12 md:ml-0 md:w-1/2 ${
          isEven ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"
        } w-full`}
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-surface/80 hover:bg-surface border border-warmBorder shadow-subtle transition-all duration-300">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-bg border border-warmBorder text-primaryText font-semibold">
              {item.period}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted font-mono">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>{item.location}</span>
            </div>
          </div>

          <h3 className="card-h3 font-bold text-primaryText mt-1">
            {item.role}
          </h3>
          <div className="text-sm font-heading font-semibold text-accent mb-3">
            {item.company}
          </div>

          <p className="caption-small text-muted leading-relaxed font-body mb-4">
            {item.description}
          </p>

          {/* Bullets */}
          <div className="space-y-2 mb-4">
            {item.bullets.map((bullet, bIdx) => (
              <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-primaryText font-body">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-2 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          {/* Skills tags */}
          <div className="pt-3 border-t border-warmBorder flex flex-wrap gap-1.5">
            {item.skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-bg text-muted border border-warmBorder"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
