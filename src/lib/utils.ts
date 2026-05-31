import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a URL-friendly slug from a string.
 * Handles accented characters, special chars, and normalizes whitespace.
 */
export function generateSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric chars
    .replace(/[\s_]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

/**
 * Format a date to a localized string.
 * Defaults to Spanish locale with medium date format.
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_OPTIONS
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-CO', options)
}

/**
 * Truncate text to a maximum length, adding an ellipsis if truncated.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Get initials from a full name (first letter of first and last name).
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0 || parts[0] === '') return ''
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  const lastPart = parts.at(-1) ?? ''
  return (parts[0].charAt(0) + lastPart.charAt(0)).toUpperCase()
}
