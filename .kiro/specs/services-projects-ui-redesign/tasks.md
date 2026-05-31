# Implementation Plan: Services & Projects UI Redesign

## Overview

Implementación incremental del rediseño de las secciones de Servicios y Proyectos del portafolio. Se comienza con la capa de datos y utilidades, luego los componentes de servicios, seguido por los componentes de proyectos (grid, carrusel, filtros), la página de detalle con galería/lightbox, y finalmente la integración completa con animaciones y accesibilidad.

## Tasks

- [-] 1. Set up data layer, interfaces, and utilities
  - [ ] 1.1 Create shared type interfaces (Project, Service) in `src/lib/data/types.ts`
    - Define `Project` interface with slug, title, description, images, category, location, date fields
    - Define `Service` interface with title, description, details, icon, accentColor fields
    - Include index signature `[key: string]: unknown` on Project for forward compatibility
    - _Requirements: 10.3, 10.4_

  - [ ] 1.2 Implement `slugify` utility function in `src/lib/utils.ts`
    - Handle accented characters (NFD normalization + diacritic removal)
    - Replace non-alphanumeric with hyphens, trim leading/trailing hyphens
    - Ensure no consecutive hyphens in output
    - _Requirements: 6.1_

  - [ ] 1.3 Create data abstraction layer for services in `src/lib/data/services.ts`
    - Implement `getServices(): Promise<Service[]>` reading from static data
    - Migrate existing service data adding `accentColor` field with unique values per service
    - _Requirements: 10.1, 10.4, 1.5_

  - [ ] 1.4 Create data abstraction layer for projects in `src/lib/data/projects.ts`
    - Implement `getProjects(): Promise<Project[]>` reading from static data
    - Implement `getProjectBySlug(slug: string): Promise<Project | null>`
    - Implement `getProjectCategories(): Promise<string[]>` extracting unique non-empty categories
    - Migrate existing project data adding slug, category, location, date fields
    - _Requirements: 10.1, 10.2, 10.5_

  - [ ] 1.5 Create `useReducedMotion` hook in `src/hooks/use-reduced-motion.ts`
    - Use `window.matchMedia('(prefers-reduced-motion: reduce)')` with listener for changes
    - Return boolean indicating if reduced motion is preferred
    - _Requirements: 8.4_

  - [ ]* 1.6 Write property test for slugify (Property 4: Slug Generation URL-Safety)
    - **Property 4: Slug Generation URL-Safety**
    - Verify output contains only lowercase ASCII letters, digits, and hyphens
    - Verify no leading/trailing hyphens and no consecutive hyphens
    - Use `fc.string()` and Spanish text arbitraries
    - **Validates: Requirements 6.1**

  - [ ]* 1.7 Write property test for data model validation (Property 9: Data Model Validation)
    - **Property 9: Data Model Validation**
    - Verify Project field constraints (title ≤ 200, description ≤ 2000, images 1-20, etc.)
    - Verify Service field constraints (title ≤ 200, description ≤ 500, details ≤ 5000, icon ends .svg)
    - **Validates: Requirements 10.3, 10.4**

- [ ] 2. Checkpoint - Ensure data layer tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Implement Services section components
  - [ ] 3.1 Create `ServiceCard` component in `src/components/services/service-card.tsx`
    - Render icon with accent color background, title, truncated description (120 chars), "Saber más" button
    - Implement staggered entry animation with `motion.div` (fadeIn + translateY) using index-based delay
    - Implement hover micro-interaction: translateY -4px, shadow increase, scale 1.03 (200-300ms)
    - Show full info on touch devices without hover dependency
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 1.6_

  - [ ] 3.2 Create `ServiceDetailPanel` component in `src/components/services/service-detail-panel.tsx`
    - Build on Radix Dialog with role="dialog", aria-modal, aria-labelledby
    - Render header with icon + large title, body with typographic hierarchy (h3 sections, p body)
    - Render categories as individual badge/chip elements
    - Implement focus trap (native Radix), close on Escape/click outside/X button
    - Return focus to trigger element on close
    - Animate entry/exit with Framer Motion (scale + opacity, 200-500ms)
    - Block background scroll while open
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ] 3.3 Create `ServicesSection` orchestrator in `src/components/services/services-section.tsx`
    - Consume data via `getServices()` abstraction layer
    - Render responsive grid: 1 col mobile, 2 cols tablet, 2 cols desktop with uniform gap
    - Trigger staggered animations when section enters viewport (20% threshold, once)
    - Respect `useReducedMotion` — skip animations if preferred
    - Handle empty data state with informative message
    - _Requirements: 1.3, 1.4, 8.1, 8.2, 8.4, 10.1, 10.6_

  - [ ]* 3.4 Write property test for unique accent colors (Property 1: Unique Accent Colors)
    - **Property 1: Unique Accent Colors**
    - Verify all accentColor values in services data are pairwise distinct
    - **Validates: Requirements 1.5**

- [ ] 4. Implement Projects section components (Grid, Carousel, Filters)
  - [ ] 4.1 Create `ProjectCard` component in `src/components/projects/project-card.tsx`
    - Render Next.js Image with aspect-ratio 4:3, blur placeholder, responsive sizes
    - Implement overlay with gradient on hover: title + location + "Ver proyecto" (200-400ms opacity)
    - Show overlay permanently on touch devices
    - Link to `/projects/[slug]`
    - Support `priority` prop for LCP images (first visible cards)
    - _Requirements: 3.3, 3.4, 3.5, 3.6, 6.1, 9.2, 9.4_

  - [ ] 4.2 Create `CategoryFilter` component in `src/components/projects/category-filter.tsx`
    - Render "Todos" button + buttons for each unique category
    - Differentiate active style (solid background vs outline)
    - Animate active indicator with `motion.div` layoutId
    - Ensure 44x44px minimum touch targets on mobile/tablet
    - _Requirements: 5.1, 5.2, 5.4, 9.7_

  - [ ] 4.3 Create `ViewToggle` component in `src/components/projects/view-toggle.tsx`
    - Render grid/carousel icons with visual indicator of active mode
    - Ensure 44x44px minimum touch targets
    - _Requirements: 4.1_

  - [ ] 4.4 Create `ProjectGrid` component in `src/components/projects/project-grid.tsx`
    - Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop
    - Implement `AnimatePresence` + `LayoutGroup` for filter transitions (300-600ms)
    - Animate exit of non-matching projects (opacity + scale, 200-400ms)
    - Staggered entry animation (50-100ms delay between cards)
    - Show "No hay proyectos en esta categoría" when filtered result is empty
    - _Requirements: 3.1, 3.2, 3.5, 5.3, 5.5, 5.6_

  - [ ] 4.5 Create `ProjectCarousel` component in `src/components/projects/project-carousel.tsx`
    - Use embla-carousel-react with autoplay plugin (5000ms interval)
    - Configure loop infinite, pause on hover/touch/controls, resume after 3000ms inactivity
    - Responsive slides: 1 visible mobile, 2 tablet, 2.5 desktop (50% third slide)
    - Render progress dots and prev/next controls (desktop only)
    - Support swipe (30px threshold) and keyboard arrow navigation
    - Transition duration ≤ 300ms
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ] 4.6 Create `ProjectsSection` orchestrator in `src/components/projects/projects-section.tsx`
    - Manage state: activeView (grid/carousel), activeCategory, filtered projects
    - Consume data via `getProjects()` and `getProjectCategories()`
    - Render ViewToggle + CategoryFilter + (ProjectGrid | ProjectCarousel)
    - Apply category filtering logic
    - Handle empty data state
    - Respect `useReducedMotion`
    - _Requirements: 3.1, 4.1, 5.2, 5.3, 8.4, 10.2, 10.6_

  - [ ]* 4.7 Write property test for category filter generation (Property 2: Category Filter Generation)
    - **Property 2: Category Filter Generation**
    - Verify generated filter options equal unique non-empty categories + "Todos"
    - **Validates: Requirements 5.1, 10.5**

  - [ ]* 4.8 Write property test for category filtering correctness (Property 3: Category Filtering Correctness)
    - **Property 3: Category Filtering Correctness**
    - Verify filtered result contains exactly projects matching selected category
    - Verify "Todos" returns all projects unfiltered
    - **Validates: Requirements 5.3**

- [ ] 5. Checkpoint - Ensure services and projects components work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement Project Detail Page with Gallery and Lightbox
  - [ ] 6.1 Create project detail page at `src/app/projects/[slug]/page.tsx`
    - Use `generateStaticParams` for SSG with all project slugs
    - Fetch project via `getProjectBySlug(slug)`
    - Return `notFound()` if project is null
    - Render title, full description, location, category, and ProjectGallery
    - Include back link to projects list
    - Include prev/next navigation (disabled at boundaries)
    - Page transition animation (300-600ms)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6_

  - [ ] 6.2 Generate SEO metadata for project detail page
    - Export `generateMetadata` function deriving title and description from project data
    - Title contains project title, description derived from project description
    - _Requirements: 6.5_

  - [ ] 6.3 Create `ProjectGallery` component in `src/components/projects/project-gallery.tsx`
    - Responsive thumbnail grid: 2 cols mobile, 3 cols tablet, 4 cols desktop
    - Aspect ratio 4:3 for all thumbnails
    - Lazy loading for images not in initial viewport
    - Click on thumbnail opens Lightbox at that index
    - _Requirements: 7.1, 9.3_

  - [ ] 6.4 Create `Lightbox` component in `src/components/projects/lightbox.tsx`
    - Build on Radix Dialog for focus trap, portal, ARIA
    - Navigation: keyboard arrows, prev/next buttons, swipe gestures
    - Disable prev at first image, next at last image
    - Zoom: pinch (touch) or scroll (desktop), clamped 1x-3x, reset on navigate
    - Show "N de M" indicator and close button (44x44px min)
    - Block background scroll, capture keyboard focus
    - Entry animation: expansion from thumbnail (200-400ms)
    - Exit animation: contraction to thumbnail (200-400ms)
    - Close on Escape or click outside image
    - _Requirements: 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [ ]* 6.5 Write property test for boundary navigation (Property 5: Boundary Navigation Disabling)
    - **Property 5: Boundary Navigation Disabling**
    - Verify prev disabled iff index == 0, next disabled iff index == N-1
    - **Validates: Requirements 6.3, 7.3**

  - [ ]* 6.6 Write property test for SEO metadata derivation (Property 6: SEO Metadata Derivation)
    - **Property 6: SEO Metadata Derivation**
    - Verify generated title contains project title, description derived from project description
    - **Validates: Requirements 6.5**

  - [ ]* 6.7 Write property test for zoom level clamping (Property 7: Zoom Level Clamping)
    - **Property 7: Zoom Level Clamping**
    - Verify zoom clamped to [1.0, 3.0] for any input delta
    - Verify zoom resets to 1.0 on navigation
    - **Validates: Requirements 7.4**

- [ ] 7. Checkpoint - Ensure detail page and lightbox work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Integration, accessibility, and forward compatibility
  - [ ] 8.1 Wire services section into existing page layout
    - Replace current services implementation with new ServicesSection
    - Ensure ErrorBoundary wraps the section
    - Verify keyboard navigation (Tab, Enter, Escape)
    - _Requirements: 1.1, 9.5, 10.6_

  - [ ] 8.2 Wire projects section into existing page layout and create `/projects` route
    - Replace current projects implementation with new ProjectsSection
    - Create `src/app/projects/page.tsx` if not existing
    - Ensure ErrorBoundary wraps the section
    - Verify keyboard navigation (Tab, Enter, Escape, arrows)
    - _Requirements: 3.1, 4.1, 9.5, 10.6_

  - [ ] 8.3 Implement performance optimizations
    - Configure `priority` prop on first visible ProjectCards for LCP
    - Verify responsive `sizes` attribute on all Next.js Images
    - Ensure blur placeholders are generated for all project images
    - Target LCP ≤ 2500ms on simulated 4G
    - _Requirements: 9.2, 9.4, 9.6_

  - [ ]* 8.4 Write property test for forward-compatible rendering (Property 8: Forward-Compatible Rendering)
    - **Property 8: Forward-Compatible Rendering**
    - Verify components render without errors when Project objects include unknown extra fields
    - **Validates: Requirements 10.2**

- [ ] 9. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Technical stack: TypeScript, Framer Motion, embla-carousel-react, Radix Dialog, Next.js Image, fast-check
- Test runner: Vitest with React Testing Library for component tests
- All animations must respect `useReducedMotion` hook (Requirement 8.4)
- All interactive elements must have 44x44px minimum touch targets (Requirement 9.7)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.5"] },
    { "id": 1, "tasks": ["1.3", "1.4"] },
    { "id": 2, "tasks": ["1.6", "1.7"] },
    { "id": 3, "tasks": ["3.1", "3.2", "4.1", "4.2", "4.3"] },
    { "id": 4, "tasks": ["3.3", "3.4", "4.4", "4.5"] },
    { "id": 5, "tasks": ["4.6", "4.7", "4.8"] },
    { "id": 6, "tasks": ["6.1", "6.2", "6.3"] },
    { "id": 7, "tasks": ["6.4", "6.5", "6.6", "6.7"] },
    { "id": 8, "tasks": ["8.1", "8.2", "8.3"] },
    { "id": 9, "tasks": ["8.4"] }
  ]
}
```
