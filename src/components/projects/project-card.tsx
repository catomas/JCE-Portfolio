"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Project } from "@/lib/data/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * ProjectCard renders a project thumbnail with hover overlay showing title,
 * location, and "Ver proyecto" text. Links to the project detail page.
 *
 * - Uses Next.js Image with 4:3 aspect ratio, blur placeholder, responsive sizes
 * - Overlay with gradient appears on hover (200-400ms opacity transition)
 * - On touch devices (no hover support), overlay is permanently visible
 * - Supports `priority` prop for LCP optimization on first visible cards
 * - Supports custom `sizes` prop for context-specific responsive sizing
 *
 * Validates: Requirements 3.3, 3.4, 3.5, 3.6, 6.1, 9.2, 9.4
 */
export function ProjectCard({ project, index, priority = false, sizes }: Readonly<ProjectCardProps>) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.075,
        ease: "easeOut",
      },
    },
  };

  const coverImage = project.images[0] ?? "";

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : cardVariants}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative overflow-hidden rounded-xl shadow-sm"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={`Ver proyecto: ${project.title}`}
      >
        {/* Image container with 4:3 aspect ratio */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
          {coverImage && (
            <Image
              src={coverImage}
              alt={project.title}
              fill
              sizes={sizes ?? "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
            />
          )}
        </div>

        {/* Overlay with gradient - visible on hover (desktop) or permanently (touch) */}
        <div
          className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/20 to-transparent p-4
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
            [@media(hover:none)]:opacity-100"
          aria-hidden="true"
        >
          <h3 className="text-lg font-semibold text-white">
            {project.title}
          </h3>
          {project.location && (
            <p className="mt-1 text-sm text-white/80">
              {project.location}
            </p>
          )}
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-white/90">
            Ver proyecto
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
