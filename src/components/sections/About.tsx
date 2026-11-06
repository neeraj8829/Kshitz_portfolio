"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { siteData } from "@/data/site";
import { RevealParagraph } from "../ui/RevealText";
import MagneticButton from "../ui/MagneticButton";
import HighlightText from "../ui/HighlightText";
import AboutPhotoFrame from "../about/AboutPhotoFrame";
import {
  Code2,
  Palette,
  Zap,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  ArrowUpRight,
} from "lucide-react";

const WARM_EASE = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={containerRef}
      aria-label="About section"
      className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-visible"
    >
      {/* Section Eyebrow */}
      <div className="flex items-center gap-3 mb-12 sm:mb-16">
        <span className="eyebrow-label">
          01 — ABOUT
        </span>
        <div className="h-px bg-warmBorder flex-1 max-w-[120px]" />
      </div>

      {/* Main 2-column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start overflow-visible">
        {/* Left: Stacked Notch Card Frame */}
        <div className="lg:col-span-5 relative flex justify-center items-center overflow-visible py-4 sm:py-6 lg:py-2">
          <AboutPhotoFrame
            imageSrc={siteData.profile.aboutImage}
            insetImageSrc={siteData.profile.aboutInsetImage}
          />
        </div>

        {/* Right: Bio with Scrubbed Opacity Reveal & Quick Facts */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h2 className="section-h2 text-primaryText tracking-tight mb-6">
            Building digital products that feel{" "}
            <HighlightText>tactile,</HighlightText> intuitive, and resilient.
          </h2>

          {/* Scrubbed Opacity Paragraph */}
          <div className="text-base sm:text-lg text-primaryText leading-relaxed font-body mb-4 max-w-[65ch]">
            <RevealParagraph>
              {siteData.profile.aboutParagraphs.lead}
            </RevealParagraph>
          </div>

          <p className="body-normal text-muted mb-4">
            {siteData.profile.aboutParagraphs.body1}
          </p>

          <p className="body-normal text-muted mb-8">
            {siteData.profile.aboutParagraphs.body2}
          </p>

          {/* Quick Facts List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-warmBorder mb-8 font-body">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center shrink-0 text-accent">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-muted uppercase font-mono tracking-wider">Location</span>
                <span className="text-sm font-heading font-semibold text-primaryText">{siteData.profile.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center shrink-0 text-accent">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-muted uppercase font-mono tracking-wider">Experience</span>
                <span className="text-sm font-heading font-semibold text-primaryText">{siteData.profile.experienceYears}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center shrink-0 text-accent">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-muted uppercase font-mono tracking-wider">Education</span>
                <span className="text-sm font-heading font-semibold text-primaryText">{siteData.profile.educationDegree}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center shrink-0 text-accent">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-muted uppercase font-mono tracking-wider">Languages</span>
                <span className="text-sm font-heading font-semibold text-primaryText">{siteData.profile.languages}</span>
              </div>
            </div>
          </div>

          {/* "More about me" CTA Button */}
          <div>
            <MagneticButton strength={0.25} as="a" href="#skills">
              <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primaryText text-bg text-sm font-heading font-semibold hover:bg-accent hover:text-onAccent transition-colors duration-300 shadow-sm">
                <span>Explore Technical Stack</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* "What I do" row of 3 cards */}
      <div className="mt-20 pt-16 border-t border-warmBorder">
        <div className="eyebrow-label mb-6">
          Core Pillars of Expertise
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteData.whatIDo.map((item, index) => {
            const Icon = index === 0 ? Code2 : index === 1 ? Palette : Zap;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: WARM_EASE }}
                className="p-7 sm:p-8 rounded-3xl bg-surface/70 hover:bg-surface border border-warmBorder transition-all duration-300 group hover:shadow-card"
              >
                <div className="w-12 h-12 rounded-2xl bg-bg border border-warmBorder flex items-center justify-center text-accent mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="card-h3 font-bold text-primaryText mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed font-body">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
