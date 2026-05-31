/**
 * Shared type interfaces for the Services & Projects UI.
 * These interfaces define the data contracts consumed by presentation components
 * through the data abstraction layer.
 */

export interface Project {
  slug: string;              // URL-friendly identifier (generado desde título)
  title: string;             // Máximo 200 caracteres
  description: string;       // Máximo 2000 caracteres
  images: string[];          // Rutas de imagen, 1-20 elementos
  category: string;          // Máximo 100 caracteres (Fincas, Hoteles, etc.)
  location: string;          // Máximo 100 caracteres (ciudad/región)
  date: string;              // ISO 8601 format
  [key: string]: unknown;    // Forward compatibility
}

export interface Service {
  title: string;             // Máximo 200 caracteres
  description: string;       // Máximo 500 caracteres
  details: string;           // Máximo 5000 caracteres (puede incluir listas)
  icon: string;              // Ruta al recurso SVG
  accentColor: string;       // Valor CSS válido (hex, hsl, etc.)
}
