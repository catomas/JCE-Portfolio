"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ServiceCard } from "./service-card";
import { ServiceDetailPanel } from "./service-detail-panel";
import type { Service } from "@/lib/data/types";

interface ServicesSectionProps {
  readonly services: Service[];
}

/**
 * ServicesSection orchestrates the services grid layout, staggered animations,
 * detail panel state, and empty state handling.
 *
 * - Renders a responsive grid: 1 col mobile, 2 cols tablet, 2 cols desktop
 * - Triggers staggered animations when section enters viewport (20% threshold, once)
 * - Respects useReducedMotion — skips animations if preferred
 * - Handles empty data state with informative message
 *
 * Validates: Requirements 1.3, 1.4, 8.1, 8.2, 8.4, 10.1, 10.6
 */
export function ServicesSection({ services }: ServicesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // State for the detail panel
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Ref for the trigger button that opened the panel (for focus return)
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Ref for viewport detection on the section
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handleLearnMore = useCallback((service: Service) => {
    // Capture the currently focused/clicked button for focus return
    const activeEl = document.activeElement;
    if (activeEl instanceof HTMLButtonElement) {
      triggerRef.current = activeEl;
    }
    setSelectedService(service);
    setIsPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  // Container animation variants for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Empty state
  if (services.length === 0) {
    return (
      <section
        className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8"
        aria-label="Servicios"
      >
        <p className="text-center text-muted-foreground">
          No hay servicios disponibles en este momento.
        </p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-label="Servicios">
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={prefersReducedMotion || isInView ? "visible" : "hidden"}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            service={service}
            index={index}
            accentColor={service.accentColor}
            onLearnMore={() => handleLearnMore(service)}
          />
        ))}
      </motion.div>

      {/* Detail Panel */}
      {selectedService && (
        <ServiceDetailPanel
          service={selectedService}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          triggerRef={triggerRef}
        />
      )}
    </section>
  );
}
