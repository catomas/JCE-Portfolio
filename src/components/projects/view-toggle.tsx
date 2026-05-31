"use client";

import { LayoutGrid, GalleryHorizontal } from "lucide-react";

interface ViewToggleProps {
  activeView: "grid" | "carousel";
  onViewChange: (view: "grid" | "carousel") => void;
}

/**
 * ViewToggle renders grid/carousel view mode buttons with visual indicator of active mode.
 * Ensures 44x44px minimum touch targets and accessible aria attributes.
 *
 * Validates: Requirements 4.1
 */
export function ViewToggle({ activeView, onViewChange }: Readonly<ViewToggleProps>) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
      <button
        type="button"
        onClick={() => onViewChange("grid")}
        aria-label="Vista de cuadrícula"
        aria-pressed={activeView === "grid"}
        className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors duration-200
          ${
            activeView === "grid"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
      >
        <LayoutGrid className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => onViewChange("carousel")}
        aria-label="Vista de carrusel"
        aria-pressed={activeView === "carousel"}
        className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors duration-200
          ${
            activeView === "carousel"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
      >
        <GalleryHorizontal className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
