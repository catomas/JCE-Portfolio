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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedMotionVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
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
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                variants={activeOverlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>

            {/* Content */}
            <DialogPrimitive.Content
              forceMount
              aria-labelledby={titleId}
              className={cn(
                "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl",
                "max-h-[90vh] overflow-hidden",
                "-translate-x-1/2 -translate-y-1/2",
                "rounded-2xl bg-background shadow-2xl",
                "focus:outline-none"
              )}
              onOpenAutoFocus={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLElement)?.focus();
              }}
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                triggerRef.current?.focus();
              }}
            >
              {/* DialogTitle - required by Radix, must be direct child of Content */}
              <DialogPrimitive.Title id={titleId} className="sr-only">
                {service.title}
              </DialogPrimitive.Title>

              <DialogPrimitive.Description className="sr-only">
                Información detallada sobre el servicio de {service.title}
              </DialogPrimitive.Description>

              <motion.div
                variants={activeContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col max-h-[90vh]"
              >
                {/* Colored header banner */}
                <div
                  className="relative flex items-center gap-5 px-8 py-8 sm:py-10"
                  style={{ backgroundColor: `${service.accentColor}15` }}
                >
                  {/* Decorative accent bar at top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: service.accentColor }}
                  />

                  {/* Large icon */}
                  <div
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl shadow-sm sm:h-24 sm:w-24"
                    style={{ backgroundColor: `${service.accentColor}25` }}
                  >
                    <Image
                      src={service.icon}
                      alt=""
                      width={56}
                      height={56}
                      className="h-12 w-12 sm:h-14 sm:w-14"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      Servicio profesional
                    </p>
                  </div>

                  {/* Close button */}
                  <DialogPrimitive.Close
                    className={cn(
                      "absolute right-4 top-4",
                      "flex h-11 w-11 items-center justify-center rounded-full",
                      "text-muted-foreground transition-colors",
                      "hover:bg-black/10",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    )}
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5" />
                  </DialogPrimitive.Close>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto px-8 py-6 space-y-6">
                  {/* Description */}
                  {intro && (
                    <section>
                      <h3 className="mb-3 text-lg font-semibold text-foreground">
                        Descripción
                      </h3>
                      <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                        {intro}
                      </p>
                    </section>
                  )}

                  {/* Divider */}
                  {intro && categories.length > 0 && (
                    <hr className="border-border" />
                  )}

                  {/* Categories as styled chips */}
                  {categories.length > 0 && (
                    <section>
                      <h3 className="mb-4 text-lg font-semibold text-foreground">
                        Categorías que manejamos
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {categories.map((category) => (
                          <span
                            key={category}
                            className={cn(
                              "inline-flex items-center rounded-lg px-4 py-2",
                              "text-sm font-medium",
                              "border bg-card text-foreground shadow-sm",
                              "transition-colors"
                            )}
                            style={{
                              borderColor: `${service.accentColor}30`,
                              borderLeftWidth: "3px",
                              borderLeftColor: service.accentColor,
                            }}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Fallback if no structured content */}
                  {categories.length === 0 && !intro && (
                    <section>
                      <h3 className="mb-3 text-lg font-semibold text-foreground">
                        Detalles del servicio
                      </h3>
                      <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                        {service.details}
                      </p>
                    </section>
                  )}
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
