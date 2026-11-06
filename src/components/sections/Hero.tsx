"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { siteData } from "@/data/site";
import MagneticButton from "../ui/MagneticButton";
import Counter from "../ui/Counter";
import HighlightText from "../ui/HighlightText";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "../ui/SocialIcons";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import HeroPortraitFrame from "../hero/HeroPortraitFrame";

interface HeroProps {
  hasAnimated?: boolean;
}

const WARM_EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({ hasAnimated = true }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Hero section"
      className="relative min-h-screen flex flex-col justify-between pt-32 sm:pt-36 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-x-clip overflow-y-visible"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 w-[500px] h-[500px] rounded-full bg-sand-dark/25 blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-20 w-[450px] h-[450px] rounded-full bg-terracotta/8 blur-3xl -z-10"
      />

      {/* Main 2-column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1 my-auto">
        {/* Left Column: Eyebrow, Giant Kinetic Headline, Intro, CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow Label */}
          <div className="overflow-hidden pb-1 mb-4">
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={hasAnimated ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: WARM_EASE }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-warmBorder eyebrow-label"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>{siteData.profile.eyebrow}</span>
            </motion.div>
          </div>

          {/* Kinetic Headline with Clean Modern Typography & Hand-Drawn SVG Underline */}
          <div className="space-y-1 sm:space-y-2">
            {/* Line 1: Hi, I'm Kshitiz. */}
            <div className="overflow-hidden pb-1.5 sm:pb-2">
              <motion.h1
                initial={{ y: "-115%", opacity: 0 }}
                animate={hasAnimated ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.85, delay: 0.15, ease: WARM_EASE }}
                className="hero-h1 text-primaryText"
              >
                {siteData.profile.heroHeadline.line1}
              </motion.h1>
            </div>

            {/* Line 2 & Highlight: I design & build digital */}
            <div className="overflow-hidden pb-1.5 sm:pb-2">
              <motion.div
                initial={{ y: "-115%", opacity: 0 }}
                animate={hasAnimated ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.85, delay: 0.25, ease: WARM_EASE }}
                className="hero-h1 text-primaryText flex flex-wrap items-baseline gap-x-3 sm:gap-x-4"
              >
                <span>{siteData.profile.heroHeadline.line2}</span>
                <HighlightText delay={0.8} drawOnView={false}>
                  {siteData.profile.heroHeadline.highlightWord}
                </HighlightText>
              </motion.div>
            </div>

            {/* Line 3: experiences. */}
            <div className="overflow-hidden pb-2 sm:pb-3">
              <motion.div
                initial={{ y: "-115%", opacity: 0 }}
                animate={hasAnimated ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.85, delay: 0.35, ease: WARM_EASE }}
                className="hero-h1 text-primaryText"
              >
                {siteData.profile.heroHeadline.line3}
              </motion.div>
            </div>
          </div>

          {/* Short Intro Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: -25 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: WARM_EASE }}
            className="mt-6 sm:mt-8 body-large"
          >
            {siteData.profile.intro}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65, ease: WARM_EASE }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5"
          >
            {/* Primary: View My Work */}
            <MagneticButton strength={0.3} as="a" href="#projects">
              <span className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-onAccent font-medium text-sm sm:text-base tracking-wide shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
                <span className="relative z-10 font-semibold">View My Work</span>
                <span className="relative z-10 w-6 h-6 rounded-full bg-onAccent/20 flex items-center justify-center group-hover:translate-y-0.5 transition-transform duration-300">
                  <ArrowDown className="w-3.5 h-3.5" />
                </span>
                <div className="absolute inset-0 bg-accent-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
              </span>
            </MagneticButton>

            {/* Secondary: Download CV */}
            <MagneticButton strength={0.3} as="a" href={siteData.profile.cvUrl} target="_blank">
              <span className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-surface/80 hover:bg-surface border border-warmBorder text-primaryText font-medium text-sm sm:text-base transition-colors duration-300">
                <Download className="w-4 h-4 text-muted" />
                <span>Download CV</span>
              </span>
            </MagneticButton>
          </motion.div>

          {/* Social Icons Row */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease: WARM_EASE }}
            className="mt-8 flex items-center gap-3"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-muted mr-1">
              Connect:
            </span>
            {[
              { icon: GithubIcon, href: siteData.profile.socials.github, label: "GitHub" },
              { icon: LinkedinIcon, href: siteData.profile.socials.linkedin, label: "LinkedIn" },
              { icon: TwitterIcon, href: siteData.profile.socials.twitter, label: "Twitter" },
              { icon: InstagramIcon, href: siteData.profile.socials.instagram, label: "Instagram" },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <MagneticButton key={social.label} strength={0.4} as="a" href={social.href} target="_blank" rel="noopener noreferrer">
                  <span
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-surface/80 hover:bg-accent hover:text-onAccent border border-warmBorder flex items-center justify-center text-primaryText transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                </MagneticButton>
              );
            })}
          </motion.div>
        </div>

        {/* Right Column: Refactored 8-Layer Hero Portrait Composition */}
        <div className="lg:col-span-5 relative flex justify-center items-center mt-10 lg:mt-0 overflow-visible">
          <HeroPortraitFrame
            imageSrc={siteData.profile.heroImage}
            hasAnimated={hasAnimated}
          />
        </div>
      </div>

      {/* Stats Row with Animated Counters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.9, ease: WARM_EASE }}
        className="mt-16 pt-8 border-t border-warmBorder grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
      >
        {siteData.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <div className="stat-number text-3xl sm:text-4xl lg:text-5xl text-primaryText tracking-tight">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-primaryText mt-1">
              {stat.label}
            </div>
            <div className="text-xs text-muted mt-0.5 font-body">
              {stat.description}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
