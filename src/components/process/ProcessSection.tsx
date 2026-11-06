"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/data/site";
import ProcessStage from "./ProcessStage";
import ProcessTimelineMobile from "./ProcessTimelineMobile";

export default function ProcessSection() {
  const steps = siteData.processSteps || siteData.process;
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    media.addEventListener("change", handleMediaChange);
    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <section
      id="process"
      aria-label="Process and Methodology"
      className="w-full relative border-t border-[var(--border)] overflow-visible"
    >
      {/* Visually Hidden List of Steps for Screen Readers */}
      <div className="sr-only">
        <h2>Our 4-Step Process</h2>
        <ol>
          {steps.map((s, idx) => (
            <li key={s.number}>
              <h3>
                Step {idx + 1}: {s.title} ({s.duration})
              </h3>
              <p>{s.summary}</p>
              <ul>
                {s.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
              <p>Deliverables: {s.deliverables.join(", ")}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop Pinned Scroll Stage (Hidden when prefers-reduced-motion) */}
      {!isReducedMotion ? (
        <>
          <ProcessStage steps={steps} />
          <ProcessTimelineMobile steps={steps} />
        </>
      ) : (
        /* Reduced motion fallback: show clean unpinned vertical timeline on all screen sizes */
        <ProcessTimelineMobile steps={steps} />
      )}
    </section>
  );
}

