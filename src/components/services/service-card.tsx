"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Service } from "@/lib/data/types";

interface ServiceCardProps {
  service: Service;
  index: number;
  accentColor: string;
  onLearnMore?: () => void;
}

/**
 * ServiceCard renders an individual service with a bold left accent stripe,
 * large icon, title, full description, and "Saber más" button.
 * Corporate/professional style with strong visual hierarchy and generous spacing.
 *
 * Validates: Requirements 1.1, 1.2, 1.4, 1.5, 1.6
 */
export function ServiceCard({ service, index, accentColor, onLearnMore }: Readonly<ServiceCardProps>) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      },
    },
  };

  const hoverTransition = { duration: 0.25, ease: "easeOut" };

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : cardVariants}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }
      }
      transition={hoverTransition}
      onClick={onLearnMore}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onLearnMore?.();
        }
      }}
      aria-label={`Ver detalles de ${service.title}`}
      className="group relative flex cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow
        touch-manipulation
        max-sm:[&]:translate-y-0 max-sm:[&]:shadow-md"
    >
      {/* Left accent stripe */}
      <div
        className="w-2 shrink-0 sm:w-2.5"
        style={{ backgroundColor: accentColor }}
      />

      {/* Card content - vertical layout for more height */}
      <div className="flex flex-1 flex-col p-7 sm:p-9">
        {/* Top row: Icon + Title */}
        <div className="flex items-center gap-5 mb-5">
          <div
            className="flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl shadow-sm sm:h-20 sm:w-20"
            style={{ backgroundColor: `${accentColor}18` }}
          >
            <Image
              src={service.icon}
              alt=""
              width={52}
              height={52}
              aria-hidden="true"
              className="h-11 w-11 sm:h-13 sm:w-13"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-card-foreground sm:text-2xl">
              {service.title}
            </h3>
            <p
              className="mt-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Servicio profesional
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mb-5 h-px w-full"
          style={{ backgroundColor: `${accentColor}20` }}
        />

        {/* Full description - no truncation */}
        <p className="flex-1 text-base leading-relaxed text-muted-foreground mb-6">
          {service.description}
        </p>

        {/* "Saber más" indicator */}
        <span
          className="inline-flex w-fit items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all
            group-hover:brightness-110 group-hover:shadow-lg"
          style={{
            backgroundColor: accentColor,
            color: "#ffffff",
          }}
          aria-hidden="true"
        >
          Saber más
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
    </motion.div>
  );
}
