"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/site";
import HighlightText from "../ui/HighlightText";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto border-t border-warmBorder"
    >
      {/* Section Eyebrow */}
      <div className="flex items-center gap-3 mb-6">
        <span className="eyebrow-label">
          08 — FREQUENT QUESTIONS
        </span>
        <div className="h-px bg-warmBorder flex-1 max-w-[120px]" />
      </div>

      <div className="mb-14">
        <h2 className="section-h2 text-primaryText tracking-tight">
          Everything you need to know about <HighlightText>collaborating.</HighlightText>
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {siteData.faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="rounded-3xl bg-surface/70 border border-warmBorder overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full p-6 sm:p-7 flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="font-heading text-base sm:text-lg font-bold text-primaryText group-hover:text-accent transition-colors pr-4">
                  {faq.question}
                </span>
                <span
                  className={`w-9 h-9 rounded-full bg-bg border border-warmBorder flex items-center justify-center text-primaryText shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-accent text-bg" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 text-sm sm:text-base text-muted font-body leading-relaxed border-t border-warmBorder/50 mt-1 max-w-[65ch]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
