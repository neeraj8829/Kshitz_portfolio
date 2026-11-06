"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/site";
import MagneticButton from "../ui/MagneticButton";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Scroll spy
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "experience", "testimonials", "contact"];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-4 transition-transform duration-500 ease-out-expo ${
          isVisible ? "translate-y-0" : "-translate-y-28"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-6 py-3 rounded-full bg-cream/80 backdrop-blur-md border border-espresso/10 shadow-subtle">
          {/* Logo "Kshitiz." */}
          <a
            href="#hero"
            className="flex items-center gap-0.5 group focus-visible:outline-none"
            aria-label={`${siteData.profile.name} Home`}
          >
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-primaryText group-hover:text-accent transition-colors">
              {siteData.profile.name}
            </span>
            <span className="font-heading text-2xl font-bold text-accent leading-none">
              .
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const linkId = link.href.replace("#", "");
              const isActive = activeSection === linkId;
              const isHovered = hoveredLink === link.name;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-3.5 py-1.5 text-xs sm:text-sm font-medium text-espresso/80 hover:text-espresso transition-colors rounded-full"
                >
                  <span className="relative z-10">{link.name}</span>

                  {/* Hover capsule */}
                  {isHovered && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-sand rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  {/* Active Link terracotta indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-terracotta"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Let's Talk CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <MagneticButton strength={0.25} as="a" href="#contact">
              <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-espresso text-cream hover:bg-terracotta transition-colors duration-300 shadow-sm">
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-full text-espresso hover:bg-sand transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu with Staggered Links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 pt-28 px-6 pb-12 bg-cream/95 backdrop-blur-xl flex flex-col justify-between lg:hidden"
          >
            <div className="flex flex-col space-y-3">
              <span className="text-xs uppercase font-mono tracking-widest text-taupe mb-2">
                Navigation
              </span>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                  className="font-heading text-3xl font-bold text-primaryText hover:text-accent py-2 border-b border-warmBorder flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-muted" />
                </motion.a>
              ))}
            </div>

            <div className="pt-6 border-t border-espresso/15 flex flex-col gap-4">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded-full bg-terracotta text-cream font-medium text-base shadow-card"
              >
                Let&apos;s Talk
              </a>
              <div className="text-center text-xs text-taupe font-mono">
                {siteData.profile.email} • {siteData.profile.location.split("(")[0].trim()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
