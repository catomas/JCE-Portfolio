"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/data/types";

interface ServiceDetailPanelProps {
  readonly service: Service;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly triggerRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Parses the details text to extract numbered list items.
 * Returns an object with the introductory text and an array of category items.
 */
function parseServiceDetails(details: string): {
  intro: string;
  categories: string[];
} {
  const lines = details.split("\n");
  const introLines: string[] = [];
  const categories: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Match numbered list items like "1. Item text"
    const match = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (match) {
      categories.push(match[1]);
    } else if (trimmed.length > 0) {
      introLines.push(trimmed);
    }
  }

  return {
    intro: introLines.join("\n"),
    categories,
  };
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedMotionVariants = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 1, scale: 1 },
};

export function ServiceDetailPanel({
  service,
  isOpen,
  onClose,
  triggerRef,
}: ServiceDetailPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const { intro, categories } = parseServiceDetails(service.details);
  const titleId = `service-detail-title-${service.title.replace(/\s+/g, "-").toLowerCase()}`;

  const activeContentVariants = prefersReducedMotion
    ? reducedMotionVariants
    : contentVariants;

  const activeOverlayVariants = prefersReducedMotion
    ? reducedMotionVariants
    : overlayVariants;

  // Return focus to trigger element on close
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      // Radix handles focus return natively when using controlled open,
      // but we ensure it via a timeout as a fallback
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* Overlay */}
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
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
              aria-labelledby={titleId}
              onOpenAutoFocus={(e) => {
                // Prevent Radix from focusing the close button by default;
                // let focus go to the dialog content itself for screen readers
                e.preventDefault();
                const content = e.currentTarget as HTMLElement;
                content?.focus();
              }}
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                triggerRef.current?.focus();
              }}
            >
              <motion.div
                className={cn(
                  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg",
                  "max-h-[85vh] overflow-y-auto",
                  "-translate-x-1/2 -translate-y-1/2",
                  "rounded-xl border border-border bg-background p-6 shadow-2xl",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
                variants={activeContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                tabIndex={-1}
              >
                {/* Close button */}
                <DialogPrimitive.Close
                  className={cn(
                    "absolute right-4 top-4 z-10",
                    "flex h-11 w-11 items-center justify-center rounded-full",
                    "text-muted-foreground transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </DialogPrimitive.Close>

                {/* Header: Icon + Title */}
                <header className="mb-6 flex items-center gap-4 pr-12">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${service.accentColor}20` }}
                  >
                    <Image
                      src={service.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8"
                      aria-hidden="true"
                    />
                  </div>
                  <DialogPrimitive.Title
                    id={titleId}
                    className="text-xl font-bold leading-tight sm:text-2xl"
                  >
                    {service.title}
                  </DialogPrimitive.Title>
                </header>

                {/* Body */}
                <div className="space-y-5">
                  {/* Description section */}
                  {intro && (
                    <section>
                      <h3 className="mb-2 text-base font-semibold text-foreground">
                        Descripción
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                        {intro}
                      </p>
                    </section>
                  )}

                  {/* Categories as badges/chips */}
                  {categories.length > 0 && (
                    <section>
                      <h3 className="mb-3 text-base font-semibold text-foreground">
                        Categorías
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <span
                            key={category}
                            className={cn(
                              "inline-flex items-center rounded-full px-3 py-1.5",
                              "text-xs font-medium",
                              "border border-border bg-muted text-foreground",
                              "transition-colors"
                            )}
                            style={{
                              borderColor: `${service.accentColor}40`,
                              backgroundColor: `${service.accentColor}10`,
                            }}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* If no categories were parsed, show full details as body text */}
                  {categories.length === 0 && !intro && (
                    <section>
                      <h3 className="mb-2 text-base font-semibold text-foreground">
                        Detalles
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                        {service.details}
                      </p>
                    </section>
                  )}
                </div>

                {/* Hidden description for accessibility */}
                <DialogPrimitive.Description className="sr-only">
                  Información detallada sobre el servicio de {service.title}
                </DialogPrimitive.Description>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
