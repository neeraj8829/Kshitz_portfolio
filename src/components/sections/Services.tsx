"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteData } from "@/data/site";
import HighlightText from "../ui/HighlightText";
import { Code2, Palette, ShoppingBag, Gauge } from "lucide-react";

const WARM_EASE = [0.22, 1, 0.36, 1] as const;

export default function Services() {
  const iconMap: Record<string, React.ElementType> = {
    Code2,
    Palette,
    ShoppingBag,
    Gauge,
  };

  return (
    <section
      id="services"
      aria-label="Services section"
      className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Section Eyebrow */}
      <div className="flex items-center gap-3 mb-6">
        <span className="eyebrow-label">
          05 — SERVICES
        </span>
        <div className="h-px bg-warmBorder flex-1 max-w-[120px]" />
      </div>

      <div className="max-w-2xl mb-16">
        <h2 className="section-h2 text-primaryText tracking-tight">
          Comprehensive capabilities for <HighlightText>ambitious</HighlightText> founders.
        </h2>
      </div>

      {/* 4 Service Cards Grid with Hover Fill-Wipe Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {siteData.services.map((service, index) => {
          const Icon = iconMap[service.icon] || Code2;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: WARM_EASE }}
              className="group relative p-8 sm:p-10 rounded-3xl bg-surface/70 border border-warmBorder overflow-hidden transition-all duration-500 hover:shadow-card-hover"
            >
              {/* Hover Fill-Wipe Curtain */}
              <div
                className="absolute inset-0 bg-primaryText translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-expo -z-0"
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-accent group-hover:text-accent-light transition-colors">
                      {service.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-bg border border-warmBorder flex items-center justify-center text-primaryText group-hover:bg-accent group-hover:text-bg transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="card-h3 font-bold text-primaryText group-hover:text-bg transition-colors duration-300 mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted group-hover:text-bg/80 transition-colors duration-300 font-body leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-6 border-t border-warmBorder group-hover:border-bg/20 transition-colors duration-300">
                  <div className="eyebrow-label group-hover:text-bg/70 mb-3 transition-colors">
                    Key Deliverables
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {service.deliverables.map((item) => (
                      <div
                        key={item}
                        className="text-xs font-body text-primaryText/90 group-hover:text-bg flex items-center gap-1.5 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 group-hover:bg-bg" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
