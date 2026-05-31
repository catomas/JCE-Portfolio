"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

// --- Animation Variants ---

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedMotionVariants = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 1, scale: 1 },
};

// --- Zoom Helpers ---

/** Clamp zoom level between 1x and 3x */
function clampZoom(value: number): number {
  return Math.min(3, Math.max(1, value));
}

/**
 * Lightbox component for fullscreen image viewing with navigation, zoom, and swipe.
 *
 * Built on Radix Dialog for focus trap, portal rendering, and ARIA.
 * Supports keyboard arrows, prev/next buttons, touch swipe gestures,
 * pinch-to-zoom (touch) and scroll-to-zoom (desktop).
 *
 * Validates: Requirements 7.2, 7.3, 7.4, 7.5, 7.6, 7.7
 */
export function Lightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: Readonly<LightboxProps>) {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [zoom, setZoom] = React.useState(1);

  // Touch gesture tracking
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const pinchStartDistRef = React.useRef<number | null>(null);
  const pinchStartZoomRef = React.useRef<number>(1);

  // Sync currentIndex when initialIndex changes (e.g., opening at a different image)
  React.useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoom(1);
    }
  }, [initialIndex, isOpen]);

  const activeContentVariants = prefersReducedMotion
    ? reducedMotionVariants
    : contentVariants;

  const activeOverlayVariants = prefersReducedMotion
    ? reducedMotionVariants
    : overlayVariants;

  const total = images.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  // --- Navigation ---

  function goToPrev() {
    if (!isFirst) {
      setCurrentIndex((prev) => prev - 1);
      setZoom(1);
    }
  }

  function goToNext() {
    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
      setZoom(1);
    }
  }

  // --- Keyboard Navigation ---

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  }

  // --- Scroll Zoom (Desktop) ---

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom((prev) => clampZoom(prev + delta));
  }

  // --- Touch Gestures (Swipe + Pinch Zoom) ---

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      // Single touch — track for swipe
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    } else if (e.touches.length === 2) {
      // Two fingers — track for pinch zoom
      touchStartRef.current = null;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStartDistRef.current = Math.hypot(dx, dy);
      pinchStartZoomRef.current = zoom;
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchStartDistRef.current !== null) {
      // Pinch zoom
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      const scale = currentDist / pinchStartDistRef.current;
      setZoom(clampZoom(pinchStartZoomRef.current * scale));
    }
  }

  function handleTouchEnd(e: React.TouchEvent) {
    // Pinch end
    if (pinchStartDistRef.current !== null) {
      pinchStartDistRef.current = null;
      return;
    }

    // Swipe detection (single finger)
    if (touchStartRef.current && e.changedTouches.length === 1) {
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - touchStartRef.current.x;
      const threshold = 30;

      if (Math.abs(diffX) >= threshold) {
        if (diffX > 0) {
          goToPrev();
        } else {
          goToNext();
        }
      }
      touchStartRef.current = null;
    }
  }

  if (total === 0) return null;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* Overlay */}
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/90"
                variants={activeOverlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>

            {/* Content */}
            <DialogPrimitive.Content
              asChild
              forceMount
              aria-label={`Imagen ${currentIndex + 1} de ${total}`}
              onKeyDown={handleKeyDown}
              onOpenAutoFocus={(e) => {
                e.preventDefault();
                const content = e.currentTarget as HTMLElement;
                content?.focus();
              }}
            >
              <motion.div
                className={cn(
                  "fixed inset-0 z-50 flex flex-col items-center justify-center",
                  "focus:outline-none"
                )}
                variants={activeContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                tabIndex={-1}
              >
                {/* Visually hidden title for accessibility (required by Radix) */}
                <DialogPrimitive.Title className="sr-only">
                  Visor de imágenes - Imagen {currentIndex + 1} de {total}
                </DialogPrimitive.Title>

                {/* Top bar: indicator + close button */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
                  {/* Position indicator */}
                  <span className="rounded-full bg-black/50 px-3 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
                    {currentIndex + 1} de {total}
                  </span>

                  {/* Close button */}
                  <DialogPrimitive.Close
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full",
                      "bg-black/50 text-white backdrop-blur-sm",
                      "transition-colors hover:bg-black/70",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    )}
                    aria-label="Cerrar"
                  >
                    <X className="h-6 w-6" />
                  </DialogPrimitive.Close>
                </div>

                {/* Image area with touch/scroll handlers */}
                <div
                  className="relative flex h-full w-full items-center justify-center overflow-hidden"
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Previous button */}
                  <button
                    type="button"
                    onClick={goToPrev}
                    disabled={isFirst}
                    className={cn(
                      "absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full",
                      "bg-black/50 text-white backdrop-blur-sm transition-colors",
                      "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      "disabled:pointer-events-none disabled:opacity-30"
                    )}
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  {/* Current image */}
                  <div
                    className="relative h-[70vh] w-[90vw] max-w-4xl sm:h-[80vh]"
                    style={{
                      transform: `scale(${zoom})`,
                      transition: "transform 0.1s ease-out",
                    }}
                  >
                    <Image
                      src={images[currentIndex]}
                      alt={`Imagen ${currentIndex + 1} de ${total}`}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      priority
                      draggable={false}
                    />
                  </div>

                  {/* Next button */}
                  <button
                    type="button"
                    onClick={goToNext}
                    disabled={isLast}
                    className={cn(
                      "absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full",
                      "bg-black/50 text-white backdrop-blur-sm transition-colors",
                      "hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      "disabled:pointer-events-none disabled:opacity-30"
                    )}
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Hidden description for accessibility */}
                <DialogPrimitive.Description className="sr-only">
                  Visor de imágenes a pantalla completa. Use las flechas del teclado para navegar entre imágenes.
                </DialogPrimitive.Description>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
