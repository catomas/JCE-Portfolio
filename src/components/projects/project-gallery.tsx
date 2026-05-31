"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/projects/lightbox";

interface ProjectGalleryProps {
  images: string[];
}

/**
 * ProjectGallery renders a responsive grid of image thumbnails with lazy loading.
 * Clicking a thumbnail opens the Lightbox at that image's index.
 *
 * - Responsive grid: 2 cols mobile, 3 cols tablet (md), 4 cols desktop (lg)
 * - All thumbnails maintain 4:3 aspect ratio
 * - First 4 images load eagerly (likely in viewport), rest use lazy loading
 * - Click opens Lightbox at the selected image index
 *
 * Validates: Requirements 7.1, 9.3
 */
export function ProjectGallery({ images }: Readonly<ProjectGalleryProps>) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  function handleThumbnailClick(index: number) {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => handleThumbnailClick(index)}
            className="group relative overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label={`Ver imagen ${index + 1} de ${images.length}`}
          >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
              <Image
                src={src}
                alt={`Imagen ${index + 1}`}
                fill
                sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading={index < 4 ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
              />
            </div>

            {/* Hover overlay indicating clickability */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/20"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden="true"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
                <path d="M11 8v6" />
                <path d="M8 11h6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        initialIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
