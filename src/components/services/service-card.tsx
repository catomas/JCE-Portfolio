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
 * Truncates text to a maximum length, appending ellipsis if needed.
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * ServiceCard renders an individual service with icon, title, truncated description,
 * and a "Saber más" button. Implements staggered entry animation and hover micro-interactions.
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
          : { y: -4, scale: 1.03, boxShadow: "0 12px 24px rgba(0,0,0,0.12)" }
      }
      transition={hoverTransition}
      className="group flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow
        touch-manipulation
        max-sm:[&]:translate-y-0 max-sm:[&]:scale-100 max-sm:[&]:shadow-md"
    >
      {/* Icon with accent color background */}
      <div
        className="flex h-20 w-20 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${accentColor}25` }}
      >
        <Image
          src={service.icon}
          alt=""
          width={48}
          height={48}
          aria-hidden="true"
          className="h-12 w-12"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-card-foreground">
        {service.title}
      </h3>

      {/* Truncated description (120 chars) */}
      <p className="text-base leading-relaxed text-muted-foreground">
        {truncateText(service.description, 120)}
      </p>

      {/* "Saber más" button */}
      <button
        onClick={onLearnMore}
        className="mt-auto inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors
          min-h-[44px] min-w-[44px]
          hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        style={{
          backgroundColor: accentColor,
          color: "#ffffff",
        }}
        aria-label={`Saber más sobre ${service.title}`}
      >
        Saber más
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
      </button>
    </motion.div>
  );
}
