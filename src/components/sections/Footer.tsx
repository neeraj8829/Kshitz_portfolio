"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/data/site";
import MagneticButton from "../ui/MagneticButton";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST / Indian Standard Time formatter
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).format(now);
      setLocalTime(`${formatted} IST (Bengaluru)`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="pt-20 pb-12 px-4 sm:px-8 lg:px-12 border-t border-espresso/15 bg-sand/40 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-16 border-b border-warmBorder">
          <div>
            <span className="font-heading text-2xl font-bold text-primaryText">
              {siteData.profile.name}
              <span className="text-accent">.</span>
            </span>
            <p className="caption-small text-muted mt-1">
              {siteData.profile.role}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm font-heading font-semibold text-primaryText/80">
            <a href="#hero" className="hover:text-accent transition-colors">Home</a>
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
            <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
            <a href="#experience" className="hover:text-accent transition-colors">Experience</a>
            <a href="#testimonials" className="hover:text-accent transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
            {siteData.config.showThemeSwitcher && (
              <a href="/themes" className="hover:text-accent transition-colors text-accent font-semibold">
                Theme options
              </a>
            )}
          </div>

          {/* Back to Top */}
          <MagneticButton strength={0.3} onClick={scrollToTop}>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface hover:bg-accent hover:text-onAccent text-primaryText text-xs font-heading font-semibold border border-warmBorder transition-colors group shadow-subtle"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </MagneticButton>
        </div>

        {/* Giant "Kshitiz" Wordmark in Heading Font, Weight 800, Tight Tracking */}
        <div className="py-12 sm:py-16 text-center select-none overflow-hidden">
          <span className="font-heading font-extrabold text-[18vw] leading-none tracking-tighter text-primaryText/8 block select-none">
            {siteData.profile.name}
          </span>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-warmBorder flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <div>
            &copy; 2026 {siteData.profile.name}. All rights reserved.
          </div>

          {/* Realtime Local Time */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
            <span>Local Time: {localTime || "10:30:00 AM IST"}</span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a href={siteData.profile.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              GitHub
            </a>
            <a href={siteData.profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              LinkedIn
            </a>
            <a href={siteData.profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              Twitter
            </a>
            <a href={siteData.profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
