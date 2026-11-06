"use client";

import React, { useState } from "react";
import { siteData } from "@/data/site";
import { useToast } from "../ui/Toast";
import MagneticButton from "../ui/MagneticButton";
import HighlightText from "../ui/HighlightText";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "../ui/SocialIcons";
import confetti from "canvas-confetti";
import {
  ArrowUpRight,
  Copy,
  Check,
  Phone,
  MapPin,
  Send,
  Loader2,
} from "lucide-react";

export default function Contact() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteData.profile.email);
      setCopied(true);
      showToast("Email address copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast("Unable to copy email automatically.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      showToast("Message sent! Kshitiz will reply shortly.", "success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Celebration confetti using active theme colors
      const rootStyles = getComputedStyle(document.documentElement);
      const accent = rootStyles.getPropertyValue("--accent").trim() || "#D96C4A";
      const accent2 = rootStyles.getPropertyValue("--accent-2").trim() || "#8A9A78";
      const text = rootStyles.getPropertyValue("--text").trim() || "#2B2420";
      const surface = rootStyles.getPropertyValue("--surface").trim() || "#EFE6D8";

      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 },
        colors: [accent, accent2, text, surface],
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred.";
      setStatus("error");
      setErrorMessage(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact section"
      className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Section Eyebrow */}
      <div className="flex items-center gap-3 mb-6">
        <span className="eyebrow-label">
          09 — GET IN TOUCH
        </span>
        <div className="h-px bg-warmBorder flex-1 max-w-[120px]" />
      </div>

      {/* Huge Headline with Hover-Reactive Arrow */}
      <div className="mb-16 sm:mb-20">
        <a
          href={`mailto:${siteData.profile.email}`}
          className="group inline-flex items-baseline gap-4 sm:gap-6 flex-wrap"
        >
          <h2 className="hero-h1 text-primaryText tracking-tight group-hover:text-accent transition-colors">
            Let&apos;s work <HighlightText>together.</HighlightText>
          </h2>
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-surface group-hover:bg-accent group-hover:text-bg border border-warmBorder flex items-center justify-center text-primaryText transition-all duration-300 shadow-subtle group-hover:scale-110">
            <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </a>
      </div>

      {/* Main 2-column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Contact Info, Click to copy, Socials */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
          <div>
            <h3 className="card-h3 font-bold text-primaryText mb-3">
              Have an idea, project, or role in mind?
            </h3>
            <p className="body-normal text-muted mb-8 max-w-[60ch]">
              I am always keen to discuss new ventures, design engineering challenges, or architectural consulting. Reach out directly or complete the form.
            </p>

            {/* Email Click-To-Copy Box */}
            <div className="mt-8 p-6 rounded-3xl bg-sand/80 border border-espresso/15 shadow-subtle">
              <div className="text-xs uppercase font-mono tracking-wider text-taupe mb-2">
                Primary Communication
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-base sm:text-lg font-semibold text-espresso">
                  {siteData.profile.email}
                </span>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="px-3.5 py-2 rounded-full bg-cream hover:bg-terracotta hover:text-cream text-espresso text-xs font-semibold flex items-center gap-1.5 border border-espresso/10 transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-sage" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Phone & Location */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-espresso font-sans">
                <div className="w-9 h-9 rounded-full bg-sand flex items-center justify-center text-terracotta shrink-0 border border-espresso/10">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{siteData.profile.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-espresso font-sans">
                <div className="w-9 h-9 rounded-full bg-sand flex items-center justify-center text-terracotta shrink-0 border border-espresso/10">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{siteData.profile.location}</span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-taupe mb-3">
              Connect Across Platforms
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: GithubIcon, href: siteData.profile.socials.github, label: "GitHub" },
                { icon: LinkedinIcon, href: siteData.profile.socials.linkedin, label: "LinkedIn" },
                { icon: TwitterIcon, href: siteData.profile.socials.twitter, label: "Twitter" },
                { icon: InstagramIcon, href: siteData.profile.socials.instagram, label: "Instagram" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <MagneticButton key={s.label} strength={0.35} as="a" href={s.href} target="_blank">
                    <span
                      aria-label={s.label}
                      className="w-11 h-11 rounded-full bg-sand hover:bg-terracotta hover:text-cream border border-espresso/10 flex items-center justify-center text-espresso transition-colors duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                  </MagneticButton>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Working Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-4xl bg-sand/70 border border-espresso/15 shadow-card space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-taupe">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maya Chen"
                  className="w-full px-5 py-3.5 rounded-2xl bg-cream border border-espresso/15 text-espresso placeholder:text-taupe/50 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all text-sm font-sans"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-taupe">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. maya@company.com"
                  className="w-full px-5 py-3.5 rounded-2xl bg-cream border border-espresso/15 text-espresso placeholder:text-taupe/50 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all text-sm font-sans"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs font-mono uppercase tracking-wider text-taupe">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Next.js Architecture Project"
                className="w-full px-5 py-3.5 rounded-2xl bg-cream border border-espresso/15 text-espresso placeholder:text-taupe/50 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all text-sm font-sans"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-taupe">
                Project Details or Message *
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell Kshitiz about your goals, timeline, and scope..."
                className="w-full px-5 py-3.5 rounded-2xl bg-cream border border-espresso/15 text-espresso placeholder:text-taupe/50 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-all text-sm font-sans resize-none"
              />
            </div>

            {/* Status Messages */}
            {status === "error" && (
              <div className="p-4 rounded-2xl bg-terracotta/10 border border-terracotta/30 text-xs text-terracotta font-sans">
                {errorMessage}
              </div>
            )}
            {status === "success" && (
              <div className="p-4 rounded-2xl bg-sage/20 border border-sage/40 text-xs text-espresso font-sans flex items-center gap-2">
                <Check className="w-4 h-4 text-sage" />
                <span>Message delivered successfully! Kshitiz will follow up shortly.</span>
              </div>
            )}

            {/* Submit Button */}
            <MagneticButton strength={0.25} as="button">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-terracotta hover:bg-terracotta-hover text-cream font-medium text-sm sm:text-base tracking-wide shadow-card transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
}
