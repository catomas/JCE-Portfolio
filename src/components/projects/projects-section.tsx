"use client";

import { useState, useMemo } from "react";
import { ViewToggle } from "./view-toggle";
import { CategoryFilter } from "./category-filter";
import { ProjectGrid } from "./project-grid";
import { ProjectCarousel } from "./project-carousel";
import type { Project } from "@/lib/data/types";

interface ProjectsSectionProps {
  readonly initialProjects: Project[];
  readonly categories: string[];
}

/**
 * ProjectsSection orchestrates the projects view, managing state for
 * active view mode (grid/carousel), active category filter, and filtered projects.
 *
 * - Renders ViewToggle + CategoryFilter in a header row
 * - Conditionally renders ProjectGrid or ProjectCarousel based on activeView
 * - Filters projects by category (or shows all when "Todos" is selected)
 * - Passes priority count to child components for LCP optimization
 * - Handles empty data state with informative message
 * - Respects useReducedMotion
 *
 * Validates: Requirements 3.1, 4.1, 5.2, 5.3, 8.4, 9.6, 10.2, 10.6
 */
export function ProjectsSection({
  initialProjects,
  categories,
}: ProjectsSectionProps) {
  const [activeView, setActiveView] = useState<"grid" | "carousel">("grid");
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todos") {
      return initialProjects;
    }
    return initialProjects.filter(
      (project) => project.category === activeCategory
    );
  }, [initialProjects, activeCategory]);

  // Number of cards to mark as priority for LCP optimization
  // Grid: first 3 cards (1 row on desktop), Carousel: first 3 visible slides
  const priorityCount = activeView === "grid" ? 3 : 3;

  // Empty state when no projects are provided at all
  if (initialProjects.length === 0) {
    return (
      <section
        className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8"
        aria-label="Proyectos"
      >
        <p className="text-center text-muted-foreground">
          No hay proyectos disponibles en este momento.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Proyectos">
      {/* Header: ViewToggle + CategoryFilter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <ViewToggle activeView={activeView} onViewChange={setActiveView} />
      </div>

      {/* Project display: Grid or Carousel */}
      {activeView === "grid" ? (
        <ProjectGrid projects={filteredProjects} priorityCount={priorityCount} />
      ) : (
        <ProjectCarousel projects={filteredProjects} priorityCount={priorityCount} />
      )}
    </section>
  );
}
