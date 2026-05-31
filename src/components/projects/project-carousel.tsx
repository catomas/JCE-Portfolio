"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Project } from "@/lib/data/types";
import { ProjectCard } from "./project-card";

interface ProjectCarouselProps {
  projects: Project[];
  priorityCount?: number;
}

/**
 * ProjectCarousel renders projects in a horizontal carousel using embla-carousel-react.
 *
 * - Loop infinite with autoplay (5000ms interval)
 * - Pauses on hover/touch/controls, resumes after 3000ms inactivity
 * - Responsive slides: 1 visible mobile, 2 tablet (md), 2.5 desktop (lg)
 * - Progress dots indicate current position
 * - Prev/next controls visible on desktop only (lg breakpoint)
 * - Swipe support with 30px drag threshold
 * - Keyboard arrow navigation when focused
 * - Transition duration ≤ 300ms
 * - Respects prefers-reduced-motion (disables autoplay)
 * - Passes priority to first N cards for LCP optimization
 *
 * Validates: Requirements 4.2, 4.3, 4.4, 4.5, 4.6, 9.6
 */
export function ProjectCarousel({ projects, priorityCount = 3 }: Readonly<ProjectCarouselProps>) {
  const prefersReducedMotion = useReducedMotion();

  const autoplayPlugin = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragThreshold: 30,
      duration: 20, // ~300ms transition
      align: "start",
      slidesToScroll: 1,
    },
    prefersReducedMotion ? [] : [autoplayPlugin]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Re-initialize embla when projects change (e.g., category filter)
  useEffect(() => {
    if (!emblaApi) return;
    // Small delay to let DOM update with new slides
    const timer = setTimeout(() => {
      emblaApi.reInit();
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(0);
      emblaApi.scrollTo(0, true);
    }, 50);
    return () => clearTimeout(timer);
  }, [emblaApi, projects]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

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
    <section
      className="relative"
      aria-roledescription="carousel"
      aria-label="Proyectos"
    >
      {/* Carousel viewport */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-static-element-interactions */}
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-xl"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-live="polite"
      >
        <div className="flex gap-4">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="min-w-0 shrink-0 basis-full md:basis-1/2 lg:basis-[40%]"
              aria-roledescription="slide"
              aria-label={`Proyecto ${index + 1} de ${projects.length}: ${project.title}`}
            >
              <ProjectCard
                project={project}
                index={index}
                priority={index < priorityCount}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 40vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next controls - desktop only */}
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute top-1/2 left-2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition-opacity hover:bg-background disabled:opacity-30 lg:flex"
        aria-label="Proyecto anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute top-1/2 right-2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition-opacity hover:bg-background disabled:opacity-30 lg:flex"
        aria-label="Proyecto siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Progress dots */}
      <div
        className="mt-4 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Indicadores de posición del carrusel"
      >
        {scrollSnaps.map((_, snapIndex) => (
          <button
            key={`dot-${snapIndex}`}
            type="button"
            onClick={() => scrollTo(snapIndex)}
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
              snapIndex === selectedIndex
                ? "bg-foreground"
                : "bg-foreground/25 hover:bg-foreground/50"
            }`}
            role="tab"
            aria-selected={snapIndex === selectedIndex}
            aria-label={`Ir al grupo de proyectos ${snapIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
