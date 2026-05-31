import { z } from 'zod'

/**
 * Supported image MIME types and their extensions.
 */
export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const

/**
 * Supported video MIME types and their extensions.
 */
export const SUPPORTED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
] as const

/**
 * All supported media MIME types.
 */
export const SUPPORTED_MEDIA_TYPES = [
  ...SUPPORTED_IMAGE_TYPES,
  ...SUPPORTED_VIDEO_TYPES,
] as const

/** Maximum image file size: 5MB */
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB in bytes

/** Maximum video file size: 50MB */
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024 // 50MB in bytes

/**
 * Determine if a MIME type is an image type.
 */
export function isImageType(mimeType: string): boolean {
  return (SUPPORTED_IMAGE_TYPES as readonly string[]).includes(mimeType)
}

/**
 * Determine if a MIME type is a video type.
 */
export function isVideoType(mimeType: string): boolean {
  return (SUPPORTED_VIDEO_TYPES as readonly string[]).includes(mimeType)
}

/**
 * Get the maximum allowed file size for a given MIME type.
 * Returns null if the MIME type is not supported.
 */
export function getMaxSizeForType(mimeType: string): number | null {
  if (isImageType(mimeType)) return MAX_IMAGE_SIZE
  if (isVideoType(mimeType)) return MAX_VIDEO_SIZE
  return null
}

/**
 * Validate a media file (format and size) before upload.
 * This validation is designed to run client-side to reject files
 * before any network transfer begins.
 *
 * Returns an object with `valid` and optional `error` message.
 */
export function validateMediaFile(file: { type: string; size: number }): {
  valid: boolean
  error?: string
} {
  const { type, size } = file

  // Check if the format is supported
  if (!(SUPPORTED_MEDIA_TYPES as readonly string[]).includes(type)) {
    return {
      valid: false,
      error: `Formato no soportado. Formatos permitidos: JPG, PNG, WebP (imágenes) y MP4, WebM (videos).`,
    }
  }

  // Check size based on type
  if (isImageType(type)) {
    if (size > MAX_IMAGE_SIZE) {
      return {
        valid: false,
        error: `La imagen excede el tamaño máximo de 5MB.`,
      }
    }
  } else if (isVideoType(type)) {
    if (size > MAX_VIDEO_SIZE) {
      return {
        valid: false,
        error: `El video excede el tamaño máximo de 50MB.`,
      }
    }
  }

  return { valid: true }
}

/**
 * Zod schema for media file validation.
 * Validates format (MIME type) and size constraints.
 */
export const mediaFileSchema = z.object({
  type: z.string().refine(
    (type) => (SUPPORTED_MEDIA_TYPES as readonly string[]).includes(type),
    {
      message: 'Formato no soportado. Formatos permitidos: JPG, PNG, WebP (imágenes) y MP4, WebM (videos).',
    }
  ),
  size: z.number().positive(),
}).refine(
  (file) => {
    if (isImageType(file.type)) return file.size <= MAX_IMAGE_SIZE
    if (isVideoType(file.type)) return file.size <= MAX_VIDEO_SIZE
    return false
  },
  {
    message: 'El archivo excede el tamaño máximo permitido (5MB imágenes, 50MB videos).',
  }
)
