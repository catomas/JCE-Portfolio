"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Tag } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { Project } from "@/lib/data/types";

interface ProjectDetailContentProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

/**
 * Client component that renders the project detail page content with
 * Framer Motion page transition animation (300-600ms).
 *
 * Renders: title, full description, location, category, ProjectGallery,
 * back link to projects list, and prev/next navigation (disabled at boundaries).
 *
 * Validates: Requirements 6.2, 6.3, 6.4
 */
export function ProjectDetailContent({
  project,
  prevProject,
  nextProject,
}: Readonly<ProjectDetailContentProps>) {
  const prefersReducedMotion = useReducedMotion();

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageVariants}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate="visible"
      className="mx-auto max-w-5xl px-4 py-8"
    >
      {/* Back link */}
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver a proyectos
      </Link>

      {/* Project header */}
      <header className="mb-8">
        <h1 className="font-vollkorn text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          {project.title}
        </h1>

        {/* Metadata: location and category */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {project.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {project.location}
            </span>
          )}
          {project.category && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Tag className="h-3 w-3" aria-hidden="true" />
              {project.category}
            </span>
          )}
        </div>
      </header>

      {/* Full description */}
      <section className="mb-10">
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {project.description}
        </p>
      </section>

      {/* Project Gallery */}
      <section className="mb-12">
        <h2 className="mb-4 font-vollkorn text-xl font-semibold text-foreground">
          Galería
        </h2>
        <ProjectGallery images={project.images} />
      </section>

      {/* Prev/Next Navigation */}
      <nav
        className="flex items-center justify-between border-t border-border pt-6"
        aria-label="Navegación entre proyectos"
      >
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{prevProject.title}</span>
            <span className="sm:hidden">Anterior</span>
          </Link>
        ) : (
          <span
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground/40 cursor-not-allowed"
            aria-disabled="true"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Anterior</span>
            <span className="sm:hidden">Anterior</span>
          </span>
        )}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span className="hidden sm:inline">{nextProject.title}</span>
            <span className="sm:hidden">Siguiente</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <span
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground/40 cursor-not-allowed"
            aria-disabled="true"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <span className="sm:hidden">Siguiente</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </nav>
    </motion.div>
  );
}
