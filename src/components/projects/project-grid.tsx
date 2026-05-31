"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Project } from "@/lib/data/types";
import { ProjectCard } from "./project-card";

interface ProjectGridProps {
  projects: Project[];
  priorityCount?: number;
}

/**
 * ProjectGrid renders a responsive grid of ProjectCards with animated
 * filter transitions using Framer Motion's AnimatePresence and LayoutGroup.
 *
 * - Responsive: 1 col mobile, 2 cols tablet (md), 3 cols desktop (lg)
 * - AnimatePresence handles exit animations when projects are filtered out
 * - LayoutGroup coordinates layout repositioning when items change
 * - Each card wrapper has `layout` prop for smooth repositioning
 * - Empty state shows "No hay proyectos en esta categoría"
 * - Respects prefers-reduced-motion
 * - Passes priority to first N cards for LCP optimization
 *
 * Validates: Requirements 3.1, 3.2, 3.5, 5.3, 5.5, 5.6, 9.6
 */
export function ProjectGrid({ projects, priorityCount = 3 }: Readonly<ProjectGridProps>) {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  if (projects.length === 0) {
    return (
      <output className="flex min-h-[200px] items-center justify-center">
        <p className="text-center text-lg text-muted-foreground">
          No hay proyectos en esta categoría
        </p>
      </output>
    );
  }

  return (
    <LayoutGroup>
      <motion.div
        layout={!prefersReducedMotion}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout={!prefersReducedMotion}
              variants={prefersReducedMotion ? undefined : itemVariants}
              initial={prefersReducedMotion ? false : "initial"}
              animate="animate"
              exit={prefersReducedMotion ? undefined : "exit"}
              transition={{
                layout: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                delay: prefersReducedMotion ? 0 : index * 0.06,
              }}
            >
              <ProjectCard
                project={project}
                index={index}
                priority={index < priorityCount}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
