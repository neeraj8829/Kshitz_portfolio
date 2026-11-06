"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/site";
import HighlightText from "../ui/HighlightText";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = siteData.testimonials.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const testimonial = siteData.testimonials[current];

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto"
    >
      {/* Section Eyebrow */}
      <div className="flex items-center gap-3 mb-6">
        <span className="eyebrow-label">
          07 — ENDORSEMENTS
        </span>
        <div className="h-px bg-warmBorder flex-1 max-w-[120px]" />
      </div>

      <div className="max-w-xl mb-12">
        <h2 className="section-h2 text-primaryText tracking-tight">
          What partners say about collaborating with <HighlightText>{siteData.profile.name}.</HighlightText>
        </h2>
      </div>

      {/* Main Carousel Card */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        data-cursor="drag"
        className="relative p-8 sm:p-14 lg:p-16 rounded-4xl bg-surface border border-warmBorder shadow-card select-none"
      >
        <Quote className="w-12 h-12 text-accent/40 mb-6" />

        <div className="min-h-[220px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-heading font-medium text-lg sm:text-xl lg:text-2xl text-primaryText leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-warmBorder bg-bg">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-primaryText leading-snug">
                    {testimonial.name}
                  </h4>
                  <p className="caption-small text-muted font-body">
                    {testimonial.role} • <span className="text-accent font-heading font-semibold">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls (Arrows + Dots) */}
        <div className="mt-10 pt-8 border-t border-warmBorder flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {siteData.testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i ? "w-8 bg-accent" : "w-2 bg-muted/30 hover:bg-muted/60"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-bg hover:bg-primaryText hover:text-bg border border-warmBorder flex items-center justify-center text-primaryText transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-bg hover:bg-primaryText hover:text-bg border border-warmBorder flex items-center justify-center text-primaryText transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
