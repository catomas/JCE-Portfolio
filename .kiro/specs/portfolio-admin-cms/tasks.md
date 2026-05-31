# Implementation Plan: Portfolio Admin CMS

## Overview

Este plan transforma el portafolio estático de Next.js en un CMS completo con panel de administración, base de datos PostgreSQL + Prisma, almacenamiento en Cloudinary, autenticación con Auth.js, y un portafolio público modernizado. Las tareas están organizadas para construir la infraestructura primero, luego las entidades de contenido, y finalmente la integración del portafolio público.

## Tasks

- [ ] 1. Configuración del proyecto y actualización del stack
  - [x] 1.1 Actualizar dependencias core y configurar Next.js 15 + React 19
    - Actualizar `package.json` con Next.js 15, React 19, Tailwind CSS 4
    - Eliminar dependencias obsoletas: react-reveal, react-hot-toast, react-awesome-reveal
    - Agregar nuevas dependencias: @auth/prisma-adapter, @prisma/client, prisma, next-auth, cloudinary, @upstash/ratelimit, @upstash/redis, framer-motion@11+, @dnd-kit/core, @dnd-kit/sortable
    - Actualizar embla-carousel a versión estable
    - Configurar `next.config.js` para Next.js 15 App Router
    - Actualizar `postcss.config.js` y configuración de Tailwind CSS 4
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8_

  - [x] 1.2 Configurar estructura de directorios y archivos base
    - Crear estructura `src/app/(public)/`, `src/app/admin/`, `src/app/api/`
    - Crear directorios `src/components/public/`, `src/components/admin/`, `src/components/ui/`
    - Crear directorios `src/lib/actions/`, `src/lib/validations/`
    - Crear `src/lib/utils.ts`, `src/lib/prisma.ts`, `src/lib/cloudinary.ts`
    - Crear root layout `src/app/layout.tsx` y `src/app/globals.css`
    - _Requirements: 15.1_

  - [x] 1.3 Configurar Prisma schema y base de datos PostgreSQL
    - Crear `prisma/schema.prisma` con todos los modelos: User, Session, Profile, SocialLink, Project, ProjectImage, Service, Experience, Statistic, Testimonial, Media, ContactMessage
    - Definir enums: ContentStatus, ExperienceCategory, MediaType, MessageStatus
    - Configurar relaciones y constraints (unique, cascade delete, etc.)
    - Crear `src/lib/prisma.ts` con singleton pattern y retry logic (3 reintentos, 2s intervalo)
    - Generar migración inicial con `prisma migrate dev`
    - _Requirements: 9.1, 9.2, 9.5_

  - [x] 1.4 Crear script de seed idempotente
    - Crear `prisma/seed.ts` que migre el contenido actual de `data.ts` y `data_experience.tsx` a la base de datos
    - Implementar lógica de upsert para garantizar idempotencia (ejecutar múltiples veces sin duplicados)
    - Incluir datos de perfil, proyectos, servicios, experiencia y estadísticas
    - Configurar script en `package.json` como `prisma:seed`
    - _Requirements: 9.6_

  - [ ]* 1.5 Write property test for seed idempotency
    - **Property 9: Seed Idempotency**
    - **Validates: Requirements 9.6**

- [x] 2. Autenticación y middleware de seguridad
  - [x] 2.1 Configurar Auth.js v5 con Credentials provider
    - Crear `src/lib/auth.ts` con configuración de NextAuth v5
    - Implementar Credentials provider con verificación bcrypt
    - Configurar sesiones en base de datos con TTL de 24 horas
    - Implementar callbacks de sesión y JWT
    - Crear `src/app/api/auth/[...nextauth]/route.ts`
    - _Requirements: 1.2, 1.4, 1.6_

  - [x] 2.2 Implementar middleware de protección de rutas y rate limiting
    - Crear `src/middleware.ts` que proteja todas las rutas `/admin/*` excepto `/admin/login`
    - Implementar verificación de sesión Auth.js
    - Redirigir a `/admin/login?callbackUrl=...` si no autenticado
    - Configurar rate limiting con @upstash/ratelimit: 5 intentos/15min en `/admin/login`
    - Configurar rate limiting: 5 mensajes/15min en `/api/contact`
    - _Requirements: 1.5, 1.7, 13.7_

  - [x] 2.3 Crear página de login del panel admin
    - Crear `src/app/admin/login/page.tsx` con formulario de email y contraseña
    - Implementar validación client-side con Zod (loginSchema)
    - Mostrar mensaje de error genérico en credenciales inválidas (sin revelar qué campo falló)
    - Implementar redirect a callbackUrl tras login exitoso
    - Crear `src/lib/validations/auth.ts` con loginSchema
    - _Requirements: 1.1, 1.2, 1.3, 1.8_

  - [ ]* 2.4 Write property test for authenticated route protection
    - **Property 10: Authenticated Route Protection**
    - **Validates: Requirements 1.5**

  - [ ]* 2.5 Write property test for rate limiting enforcement
    - **Property 11: Rate Limiting Enforcement**
    - **Validates: Requirements 1.7, 13.7**

  - [ ]* 2.6 Write property test for login error message uniformity
    - **Property 20: Login Error Message Uniformity**
    - **Validates: Requirements 1.3**

- [x] 3. Schemas de validación y tipos compartidos
  - [x] 3.1 Crear schemas de validación Zod para todas las entidades
    - Crear `src/lib/validations/project.ts` (title max 100, description max 2000, status enum)
    - Crear `src/lib/validations/service.ts` (title max 100, shortDescription max 200, detailedDescription max 2000, iconSvg)
    - Crear `src/lib/validations/experience.ts` (title max 100, location max 150, date, description max 500, category enum)
    - Crear `src/lib/validations/profile.ts` (fullName max 100, professionalTitle max 120, biography max 2000, email, phone, address, whatsappLink, socialLinks max 6)
    - Crear `src/lib/validations/statistic.ts` (value 0-999999, label max 50)
    - Crear `src/lib/validations/testimonial.ts` (clientName max 100, clientRole max 100, text max 500, status enum)
    - Crear `src/lib/validations/contact.ts` (name max 100, email max 254, phone max 20, subject max 150, message max 2000)
    - _Requirements: 2.2, 2.4, 3.2, 3.4, 4.2, 4.6, 5.1, 5.5, 6.2, 6.3, 6.5, 8.1, 8.6, 13.1, 13.4_

  - [x] 3.2 Crear tipos compartidos y utilidades
    - Crear `src/lib/types.ts` con ActionResult<T> y PaginatedResult<T>
    - Crear utilidades en `src/lib/utils.ts`: generateSlug, formatDate, truncateText, getInitials
    - Crear `src/lib/validations/media.ts` con validación de formato y tamaño (5MB imágenes, 50MB videos)
    - _Requirements: 9.4_

  - [ ]* 3.3 Write property test for content entity validation
    - **Property 1: Content Entity Validation**
    - **Validates: Requirements 2.2, 2.4, 3.2, 3.4, 4.2, 4.6, 5.5, 6.2, 6.3, 6.5, 8.1, 8.6, 13.4**

  - [ ]* 3.4 Write property test for media upload validation
    - **Property 6: Media Upload Validation**
    - **Validates: Requirements 2.8, 2.9, 7.2, 7.3, 7.4, 16.4**

- [x] 4. Checkpoint - Verificar infraestructura base
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Server Actions - Gestión de contenido
  - [x] 5.1 Implementar Server Actions de proyectos
    - Crear `src/lib/actions/projects.ts` con: createProject, updateProject, deleteProject, reorderProjects, toggleProjectStatus
    - Implementar validación con projectSchema, transacciones Prisma, generación de slug
    - Implementar revalidación de caché con revalidatePath/revalidateTag
    - Manejar errores de constraint (slug duplicado) y conexión
    - _Requirements: 2.2, 2.3, 2.5, 2.6, 2.7, 9.3, 9.4_

  - [x] 5.2 Implementar Server Actions de servicios
    - Crear `src/lib/actions/services.ts` con: createService, updateService, deleteService, reorderServices
    - Implementar validación con serviceSchema, transacciones Prisma
    - Implementar revalidación de caché
    - _Requirements: 3.2, 3.3, 3.5, 3.6, 9.3, 9.4_

  - [x] 5.3 Implementar Server Actions de experiencia
    - Crear `src/lib/actions/experience.ts` con: createExperience, updateExperience, deleteExperience
    - Implementar validación con experienceSchema, cálculo de sortDate para ordenamiento
    - Implementar revalidación de caché
    - _Requirements: 4.2, 4.3, 4.4, 9.3, 9.4_

  - [x] 5.4 Implementar Server Actions de perfil y estadísticas
    - Crear `src/lib/actions/profile.ts` con: updateProfile
    - Crear `src/lib/actions/statistics.ts` con: createStatistic, updateStatistic, deleteStatistic
    - Implementar validación con profileSchema y statisticSchema
    - Validar formato internacional de WhatsApp (10-15 dígitos)
    - Implementar revalidación de caché
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 6.2, 6.3, 6.4, 9.3, 9.4_

  - [x] 5.5 Implementar Server Actions de testimonios
    - Crear `src/lib/actions/testimonials.ts` con: createTestimonial, updateTestimonial, deleteTestimonial, toggleTestimonialStatus
    - Implementar validación con testimonialSchema
    - Implementar revalidación de caché
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 9.3, 9.4_

  - [x] 5.6 Implementar Server Actions de medios
    - Crear `src/lib/actions/media.ts` con: uploadMedia, deleteMedia, getMediaUsage
    - Configurar `src/lib/cloudinary.ts` con upload, destroy, y transformaciones automáticas (thumbnail 150px, medium 600px, large 1200px)
    - Implementar detección de uso antes de eliminar (consultar ProjectImage)
    - Generar URLs públicas vía CDN de Cloudinary
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 16.2, 16.5_

  - [x] 5.7 Implementar Server Actions de mensajes y API de contacto
    - Crear `src/lib/actions/messages.ts` con: markMessageAsRead, deleteMessage
    - Crear `src/app/api/contact/route.ts` con validación, rate limiting, almacenamiento en DB y envío de email con Nodemailer
    - _Requirements: 13.2, 13.3, 13.5, 13.6, 13.7_

  - [ ]* 5.8 Write property test for content update round-trip
    - **Property 2: Content Update Round-Trip**
    - **Validates: Requirements 2.3, 3.3, 4.3, 5.2, 5.4, 8.2**

  - [ ]* 5.9 Write property test for draft content exclusion
    - **Property 3: Draft Content Exclusion**
    - **Validates: Requirements 2.7, 8.5, 11.5**

  - [ ]* 5.10 Write property test for ordering persistence
    - **Property 4: Ordering Persistence**
    - **Validates: Requirements 2.6, 3.6**

  - [ ]* 5.11 Write property test for experience chronological ordering
    - **Property 5: Experience Chronological Ordering**
    - **Validates: Requirements 4.1, 4.5**

  - [ ]* 5.12 Write property test for media usage detection
    - **Property 7: Media Usage Detection**
    - **Validates: Requirements 7.6**

  - [ ]* 5.13 Write property test for pagination correctness
    - **Property 8: Pagination Correctness**
    - **Validates: Requirements 7.1, 13.6**

- [-] 6. Checkpoint - Verificar Server Actions y propiedades
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Panel de administración - Layout y Dashboard
  - [ ] 7.1 Crear layout del panel admin con sidebar de navegación
    - Crear `src/app/admin/layout.tsx` con sidebar lateral
    - Crear `src/components/admin/sidebar.tsx` con links a: Dashboard, Proyectos, Servicios, Experiencia, Perfil, Estadísticas, Testimonios, Medios, Mensajes
    - Implementar responsive design (colapsable en móvil, 320px mínimo)
    - Incluir botón de cerrar sesión
    - _Requirements: 14.3, 14.4, 1.6_

  - [ ] 7.2 Implementar página de Dashboard
    - Crear `src/app/admin/page.tsx` con contadores: proyectos publicados, servicios activos, mensajes no leídos, testimonios publicados
    - Crear `src/components/admin/dashboard-card.tsx` para tarjetas de contadores
    - Mostrar últimos 5 mensajes de contacto con nombre, asunto, fecha y estado
    - Implementar manejo de error con opción de reintentar
    - _Requirements: 14.1, 14.2, 14.5_

  - [ ]* 7.3 Write property test for dashboard counters accuracy
    - **Property 14: Dashboard Counters Accuracy**
    - **Validates: Requirements 14.1**

- [ ] 8. Panel de administración - CRUD de entidades
  - [ ] 8.1 Implementar gestión de proyectos en admin
    - Crear `src/app/admin/projects/page.tsx` con lista de proyectos (título, imagen, estado)
    - Crear `src/app/admin/projects/new/page.tsx` con formulario de creación
    - Crear `src/app/admin/projects/[id]/edit/page.tsx` con formulario de edición
    - Crear `src/components/admin/sortable-list.tsx` con drag-and-drop (@dnd-kit)
    - Implementar toggle de estado publicado/borrador
    - Implementar confirmación antes de eliminar
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ] 8.2 Implementar gestión de servicios en admin
    - Crear `src/app/admin/services/page.tsx` con lista de servicios (título, descripción corta, icono)
    - Implementar formulario de creación/edición con campos: título, descripción corta, descripción detallada, icono SVG
    - Implementar reordenamiento con drag-and-drop
    - Implementar confirmación antes de eliminar
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ] 8.3 Implementar gestión de experiencia en admin
    - Crear `src/app/admin/experience/page.tsx` con lista ordenada por fecha descendente
    - Implementar formulario de creación/edición con campos: título, ubicación, fecha (mes/año), descripción, categoría (Educación/Certificación/Trabajo)
    - Implementar confirmación antes de eliminar
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.6_

  - [ ] 8.4 Implementar gestión de perfil en admin
    - Crear `src/app/admin/profile/page.tsx` con formulario de edición de perfil
    - Campos: nombre completo, título profesional, biografía, foto de perfil, email, teléfono, dirección, WhatsApp, redes sociales (hasta 6)
    - Validar formato internacional de WhatsApp
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 8.5 Implementar gestión de estadísticas en admin
    - Crear `src/app/admin/statistics/page.tsx` con lista de contadores (máximo 20)
    - Implementar formulario inline de creación/edición con valor numérico y etiqueta
    - Implementar confirmación antes de eliminar
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ] 8.6 Implementar gestión de testimonios en admin
    - Crear `src/app/admin/testimonials/page.tsx` con lista de testimonios
    - Implementar formulario de creación/edición con campos: nombre, cargo, texto, foto opcional
    - Implementar toggle de estado publicado/borrador
    - Implementar confirmación antes de eliminar
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ] 8.7 Implementar galería de medios en admin
    - Crear `src/app/admin/media/page.tsx` con galería paginada (20 por página)
    - Crear `src/components/admin/image-upload.tsx` con drag-and-drop, preview, barra de progreso
    - Crear `src/app/api/upload/route.ts` para manejar subidas a Cloudinary
    - Mostrar vista previa, nombre y fecha de subida
    - Implementar detección de uso antes de eliminar con lista de proyectos asociados
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_

  - [ ] 8.8 Implementar gestión de mensajes en admin
    - Crear `src/app/admin/messages/page.tsx` con lista paginada (20 por página)
    - Mostrar fecha, nombre del remitente, asunto y estado (leído/no leído)
    - Ordenar por fecha descendente
    - Implementar marcar como leído y eliminar
    - _Requirements: 13.6_

- [ ] 9. Checkpoint - Verificar panel de administración completo
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Portafolio público - Componentes y páginas
  - [ ] 10.1 Crear layout público con navbar, footer y theme toggle
    - Crear `src/app/(public)/layout.tsx` con navegación y footer
    - Crear `src/components/public/theme-toggle.tsx` con toggle dark/light mode (aria-label, operable por teclado)
    - Implementar persistencia de tema en localStorage
    - Respetar `prefers-reduced-motion: reduce` para desactivar animaciones
    - _Requirements: 10.7, 10.8_

  - [ ] 10.2 Implementar Hero Section y página principal
    - Crear `src/app/(public)/page.tsx` como página principal
    - Crear `src/components/public/hero-section.tsx` con video de fondo, imagen de respaldo (fallback a 5s), nombre, título profesional y CTA
    - Crear `src/components/public/section-animation.tsx` wrapper con Framer Motion (300-600ms, trigger al 20% visible)
    - Implementar transiciones entre secciones (200-400ms, easing no lineal)
    - _Requirements: 10.1, 10.3, 10.4, 10.5_

  - [ ] 10.3 Implementar secciones de servicios y proyectos públicos
    - Crear `src/components/public/services-grid.tsx` con grid de servicios y modal de detalles
    - Crear `src/components/public/projects-carousel.tsx` con embla-carousel (solo proyectos publicados)
    - Crear `src/app/(public)/projects/[slug]/page.tsx` para detalle de proyecto
    - Crear `src/components/public/statistics-counter.tsx` con contadores animados (react-countup)
    - _Requirements: 2.7, 10.1, 10.2_

  - [ ] 10.4 Implementar sección de experiencia y testimonios públicos
    - Crear `src/components/public/experience-timeline.tsx` con línea de tiempo vertical ordenada por fecha descendente
    - Crear `src/components/public/testimonials-section.tsx`: grid estático si ≤3, carrusel si >3 (autoplay 5s, pausa en hover/focus)
    - Implementar avatar con iniciales si no hay foto del cliente
    - Implementar truncamiento a 500 caracteres con indicador
    - Ocultar sección si no hay testimonios publicados
    - _Requirements: 4.5, 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ] 10.5 Implementar formulario de contacto público
    - Crear `src/components/public/contact-form.tsx` con campos: nombre, email, teléfono (opcional), asunto, mensaje
    - Implementar validación client-side con Zod (contactSchema)
    - Mostrar mensaje de confirmación en envío exitoso
    - Mostrar errores por campo en validación fallida
    - Preservar datos en caso de error de red/servidor
    - Crear `src/components/public/whatsapp-fab.tsx` botón flotante de WhatsApp
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ] 10.6 Implementar responsive design para todos los breakpoints
    - Verificar y ajustar todos los componentes públicos para: móvil (320px-767px), tablet (768px-1023px), escritorio (1024px+)
    - Asegurar que no haya superposición de elementos ni desbordamiento horizontal
    - Optimizar LCP para < 2.5s en conexiones 4G
    - _Requirements: 10.2, 10.6_

  - [ ]* 10.7 Write property test for theme preference persistence
    - **Property 18: Theme Preference Persistence**
    - **Validates: Requirements 10.7**

  - [ ]* 10.8 Write property test for testimonial text truncation
    - **Property 16: Testimonial Text Truncation**
    - **Validates: Requirements 11.1**

  - [ ]* 10.9 Write property test for avatar initials generation
    - **Property 17: Avatar Initials Generation**
    - **Validates: Requirements 11.4**

  - [ ]* 10.10 Write property test for WhatsApp link format validation
    - **Property 15: WhatsApp Link Format Validation**
    - **Validates: Requirements 5.3**

- [ ] 11. SEO y metadatos dinámicos
  - [ ] 11.1 Implementar generación de metadatos dinámicos y sitemap
    - Implementar `generateMetadata` en cada página pública con title (≤60 chars), description (≤160 chars), Open Graph
    - Crear `src/app/sitemap.ts` que genere sitemap.xml con solo contenido publicado
    - Implementar canonical URLs para cada página pública
    - Usar valores por defecto del perfil si campos están vacíos
    - _Requirements: 12.1, 12.2, 12.4, 12.5, 12.6_

  - [ ] 11.2 Implementar datos estructurados JSON-LD
    - Generar JSON-LD con schema Person para el perfil profesional
    - Generar JSON-LD con schema Service para cada servicio
    - Validar contra especificación schema.org
    - _Requirements: 12.3_

  - [ ]* 11.3 Write property test for metadata generation with constraints
    - **Property 12: Metadata Generation with Constraints**
    - **Validates: Requirements 12.1, 12.5**

  - [ ]* 11.4 Write property test for sitemap reflects published content
    - **Property 13: Sitemap Reflects Published Content**
    - **Validates: Requirements 12.2**

  - [ ]* 11.5 Write property test for JSON-LD schema validity
    - **Property 19: JSON-LD Schema Validity**
    - **Validates: Requirements 12.3**

- [ ] 12. Configuración de testing y setup
  - [ ] 12.1 Configurar Vitest y fast-check para el proyecto
    - Instalar y configurar vitest, @testing-library/react, fast-check, msw
    - Crear `vitest.config.ts` con path aliases y setup
    - Crear `tests/setup.ts` con configuración global de tests
    - Crear estructura de directorios: `tests/properties/`, `tests/unit/`, `tests/integration/`
    - _Requirements: 15.1_

- [ ] 13. Final checkpoint - Verificar integración completa
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- **Package manager: yarn (NOT npm)**. All install/add/remove commands must use `yarn` or `yarn add`.
- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document (20 properties total)
- Unit tests validate specific examples and edge cases
- The implementation uses TypeScript throughout, matching the design document
- All Server Actions follow the ActionResult<T> pattern for consistent error handling
- Cloudinary handles image optimization automatically (thumbnail/medium/large)
- Rate limiting uses @upstash/ratelimit for serverless compatibility

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "12.1"] },
    { "id": 2, "tasks": ["1.3", "3.1", "3.2"] },
    { "id": 3, "tasks": ["1.4", "2.1", "3.3", "3.4"] },
    { "id": 4, "tasks": ["1.5", "2.2", "2.3"] },
    { "id": 5, "tasks": ["2.4", "2.5", "2.6"] },
    { "id": 6, "tasks": ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7"] },
    { "id": 7, "tasks": ["5.8", "5.9", "5.10", "5.11", "5.12", "5.13"] },
    { "id": 8, "tasks": ["7.1", "7.2"] },
    { "id": 9, "tasks": ["7.3", "8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8"] },
    { "id": 10, "tasks": ["10.1"] },
    { "id": 11, "tasks": ["10.2", "10.3", "10.4", "10.5"] },
    { "id": 12, "tasks": ["10.6", "10.7", "10.8", "10.9", "10.10"] },
    { "id": 13, "tasks": ["11.1", "11.2"] },
    { "id": 14, "tasks": ["11.3", "11.4", "11.5"] }
  ]
}
```
