import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteData } from "@/data/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/ui/PageTransition";
import MagneticButton from "@/components/ui/MagneticButton";
import { GithubIcon } from "@/components/ui/SocialIcons";
import ProjectMockup from "@/components/projects/ProjectMockup";
import ProjectMetrics from "@/components/projects/ProjectMetrics";
import TechChip from "@/components/projects/TechChip";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Briefcase,
  Layers,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return siteData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = siteData.projects.find((p) => p.slug === params.slug);
  if (!project) return { title: `Project Not Found — ${siteData.profile.name}` };

  return {
    title: `${project.title} — ${siteData.profile.name} Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${project.tagline}`,
      description: project.description,
    },
  };
}

export default function ProjectDetail({ params }: ProjectPageProps) {
  const currentIndex = siteData.projects.findIndex((p) => p.slug === params.slug);
  if (currentIndex === -1) notFound();

  const project = siteData.projects[currentIndex];
  const nextProject = siteData.projects[(currentIndex + 1) % siteData.projects.length];

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto font-sans">
          {/* Back button */}
          <div className="mb-10">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Project Header Block */}
          <div className="space-y-4 mb-8">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--surface)] text-xs font-sans font-semibold text-[var(--muted)] border border-[var(--border)]">
              <span className="font-heading font-bold text-[var(--accent)]">{project.number}</span>
              <span>•</span>
              <span className="capitalize">{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] tracking-tight">
              {project.title} — {project.tagline}
            </h1>

            <p className="text-base sm:text-lg text-[var(--muted)] max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            {project.links?.live && (
              <MagneticButton strength={0.25} as="a" href={project.links.live} target="_blank">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--accent)] text-[var(--on-accent)] font-sans font-semibold text-sm shadow-md hover:opacity-90 transition-opacity">
                  <span>View Live Demo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </MagneticButton>
            )}

            {project.links?.github && (
              <MagneticButton strength={0.25} as="a" href={project.links.github} target="_blank">
                <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] font-sans font-semibold text-sm transition-colors">
                  <GithubIcon className="w-4 h-4 text-[var(--muted)]" />
                  <span>Source Code</span>
                </span>
              </MagneticButton>
            )}
          </div>

          {/* Hero Mockup Stage */}
          <div className="w-full h-[320px] sm:h-[460px] lg:h-[560px] rounded-[32px] overflow-hidden border border-[var(--border)] shadow-2xl mb-14 bg-[var(--surface)]">
            <ProjectMockup project={project} className="w-full h-full" />
          </div>

          {/* Metrics Row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)]">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--muted)] mb-3 block">
                Key Performance Impact
              </span>
              <ProjectMetrics metrics={project.metrics} />
            </div>
          )}

          {/* Metadata Grid (Role, Timeline, Client, Duration) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-[var(--surface)]/80 border border-[var(--border)] mb-16">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-sans font-semibold uppercase mb-1">
                <Briefcase className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Role</span>
              </div>
              <span className="text-sm font-sans font-semibold text-[var(--text)]">{project.role}</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-sans font-semibold uppercase mb-1">
                <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Duration</span>
              </div>
              <span className="text-sm font-sans font-semibold text-[var(--text)]">{project.duration}</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-sans font-semibold uppercase mb-1">
                <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Year</span>
              </div>
              <span className="text-sm font-sans font-semibold text-[var(--text)]">{project.year}</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-sans font-semibold uppercase mb-1">
                <Layers className="w-3.5 h-3.5 text-[var(--accent-2)]" />
                <span>Client</span>
              </div>
              <span className="text-sm font-sans font-semibold text-[var(--text)]">{project.caseStudy?.client || "Production"}</span>
            </div>
          </div>

          {/* Case Study Breakdown (Overview, Challenge, Solution, Results) */}
          {project.caseStudy && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-4">
                <h2 className="font-heading text-2xl font-bold text-[var(--text)] mb-3">
                  The Narrative
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed font-sans">
                  A closer look at the architecture, design rationale, and technical hurdles encountered.
                </p>

                {/* Technologies */}
                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <div className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
                    Technologies Used
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <TechChip key={t} name={t} index={idx} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-10">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[var(--text)] mb-3">
                    Overview
                  </h3>
                  <p className="text-base text-[var(--muted)] leading-relaxed">
                    {project.caseStudy.overview}
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-[var(--surface)]/60 border border-[var(--border)]">
                  <h3 className="font-heading text-xl font-bold text-[var(--text)] mb-2">
                    The Core Challenge
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                    {project.caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-[var(--text)] mb-3">
                    The Solution &amp; Engineering
                  </h3>
                  <p className="text-base text-[var(--muted)] leading-relaxed">
                    {project.caseStudy.solution}
                  </p>
                </div>

                {/* Measurable Results */}
                {project.caseStudy.results && (
                  <div className="pt-6 border-t border-[var(--border)]">
                    <h3 className="font-heading text-xl font-bold text-[var(--text)] mb-4">
                      Measurable Results
                    </h3>
                    <div className="space-y-3">
                      {project.caseStudy.results.map((res, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm sm:text-base text-[var(--text)]">{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Project Link Card */}
          <div className="pt-12 border-t border-[var(--border)]">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[var(--muted)] block mb-4">
              Next Project in Sequence
            </span>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="font-heading font-bold text-lg text-[var(--accent)]">
                  {nextProject.number}
                </span>
                <div>
                  <h4 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {nextProject.title}
                  </h4>
                  <p className="font-sans text-sm text-[var(--muted)] mt-1">
                    {nextProject.tagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-24 h-16 rounded-xl overflow-hidden border border-[var(--border)] hidden sm:block">
                  <ProjectMockup project={nextProject} compact showPhone={false} />
                </div>
                <div className="w-12 h-12 rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] group-hover:bg-[var(--accent)] group-hover:text-[var(--on-accent)] flex items-center justify-center transition-all group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
