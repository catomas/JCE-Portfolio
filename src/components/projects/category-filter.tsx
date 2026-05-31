"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * CategoryFilter renders a horizontal bar of filter buttons for project categories.
 * Includes a "Todos" option (always first) plus one button per unique category.
 * The active category is visually differentiated with a solid background and an
 * animated indicator using Framer Motion's layoutId for smooth transitions.
 *
 * Validates: Requirements 5.1, 5.2, 5.4, 9.7
 */
export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: Readonly<CategoryFilterProps>) {
  const prefersReducedMotion = useReducedMotion();

  const allOptions = ["Todos", ...categories];

  return (
    <nav
      className="flex flex-wrap gap-2"
      aria-label="Filtrar proyectos por categoría"
    >
      {allOptions.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              relative min-h-[44px] min-w-[44px] rounded-full px-5 py-2
              text-sm font-medium transition-colors duration-200
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
              ${
                isActive
                  ? "text-primary-foreground"
                  : "border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              }
            `}
            aria-pressed={isActive}
            aria-label={
              category === "Todos"
                ? "Mostrar todos los proyectos"
                : `Filtrar por categoría: ${category}`
            }
          >
            {/* Animated active indicator background */}
            {isActive && (
              <motion.div
                layoutId={prefersReducedMotion ? undefined : "category-active-indicator"}
                className="absolute inset-0 rounded-full bg-primary"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 30 }
                }
              />
            )}

            {/* Button label (above the animated background) */}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </nav>
  );
}
