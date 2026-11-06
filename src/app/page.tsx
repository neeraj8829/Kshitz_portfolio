"use client";

import { useState, useCallback } from "react";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SkillsSection from "@/components/skills/SkillsSection";
import ExpertiseSection from "@/components/expertise/ExpertiseSection";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {/* A. Preloader Curtain */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* B. Sticky Glass-Blur Navbar */}
      <Navbar />

      {/* Main Page Flow with Semantic Anchors */}
      <main id="main-content" className="relative flex flex-col min-h-screen">
        {/* C. Hero Section */}
        <Hero hasAnimated={preloaderDone} />

        {/* D. About Section */}
        <About />

        {/* E. Circular Skills Carousel */}
        <SkillsSection />

        {/* F. Expertise & Core Domains (Domain Explorer / Bento) */}
        <ExpertiseSection />

        {/* G. Selected Projects Bento Grid */}
        <Projects />

        {/* G. Experience & Education Timeline */}
        <Experience />

        {/* H. Services Cards with Hover Fill-Wipe */}
        <Services />

        {/* I. 4-Step Process & Methodology */}
        <Process />

        {/* J. Testimonials Slider */}
        <Testimonials />

        {/* K. FAQ Accordion */}
        <FAQ />

        {/* L. Contact & Inquiry Form */}
        <Contact />
      </main>

      {/* M. Footer with Giant Kshitiz Wordmark & Realtime Local Clock */}
      <Footer />
    </>
  );
}
