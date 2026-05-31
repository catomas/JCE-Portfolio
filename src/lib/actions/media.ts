'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import prisma, { withRetry } from '@/lib/prisma'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'
import {
  validateMediaFile,
  isImageType,
} from '@/lib/validations/media'
import type { ActionResult, PaginatedResult } from '@/lib/types'
import type { Media } from '@prisma/client'

/**
 * Represents a project that uses a specific media item.
 */
export type MediaUsage = {
  projectId: string
  projectTitle: string
  imageId: string
}

/**
 * Upload a media file to Cloudinary and save the reference in the database.
 * Validates format and size before uploading.
 * For images, auto-generates optimized WebP versions: thumbnail (150px), medium (600px), large (1200px).
 */
export async function uploadMedia(formData: FormData): Promise<ActionResult<Media>> {
  try {
    const file = formData.get('file') as File | null

    if (!file || !(file instanceof File) || file.size === 0) {
      return {
        success: false,
        error: 'No se proporcionó un archivo válido.',
        fieldErrors: { file: ['El archivo es requerido'] },
      }
    }

    // Validate format and size
    const validation = validateMediaFile({ type: file.type, size: file.size })
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error!,
        fieldErrors: { file: [validation.error!] },
      }
    }

    // Determine media type
    const mediaType = isImageType(file.type) ? 'IMAGE' : 'VIDEO'
    const resourceType = isImageType(file.type) ? 'image' : 'video'

    // Convert file to buffer for upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, {
      resourceType,
    })

    // Save reference in database
    const media = await withRetry(() =>
      prisma.media.create({
        data: {
          filename: file.name,
          url: uploadResult.url,
          thumbnailUrl: uploadResult.thumbnailUrl || null,
          mediumUrl: uploadResult.mediumUrl || null,
          largeUrl: uploadResult.largeUrl || null,
          mimeType: file.type,
          size: file.size,
          type: mediaType,
          cloudinaryId: uploadResult.publicId,
        },
      })
    )

    revalidatePath('/admin/media')
    revalidateTag('media')

    return { success: true, data: media }
  } catch (error) {
    console.error('Error uploading media:', error)
    return { success: false, error: 'Error al subir el archivo. Intente nuevamente.' }
  }
}

/**
 * Delete a media item from Cloudinary and the database.
 * Checks if the media is in use by any project before allowing deletion.
 * If the media is in use, returns an error with the list of projects using it.
 */
export async function deleteMedia(id: string): Promise<ActionResult<void>> {
  try {
    if (!id) {
      return { success: false, error: 'ID de medio no proporcionado.' }
    }

    // Find the media record
    const media = await withRetry(() =>
      prisma.media.findUnique({
        where: { id },
        include: {
          projectImages: {
            include: {
              project: { select: { id: true, title: true } },
            },
          },
        },
      })
    )

    if (!media) {
      return { success: false, error: 'El medio no fue encontrado.' }
    }

    // Check if media is in use by any project
    const activeUsages = media.projectImages.filter((pi) => pi.project !== null)
    if (activeUsages.length > 0) {
      const projectNames = activeUsages
        .map((pi) => pi.project!.title)
        .join(', ')
      return {
        success: false,
        error: `No se puede eliminar. El medio está en uso por los siguientes proyectos: ${projectNames}. Desasócielo primero antes de eliminar.`,
      }
    }

    // Delete from Cloudinary if cloudinaryId exists
    if (media.cloudinaryId) {
      const resourceType = media.type === 'IMAGE' ? 'image' : 'video'
      await deleteFromCloudinary(media.cloudinaryId, resourceType)
    }

    // Delete from database
    await withRetry(() =>
      prisma.media.delete({ where: { id } })
    )

    revalidatePath('/admin/media')
    revalidateTag('media')

    return { success: true, data: undefined }
  } catch (error) {
    console.error('Error deleting media:', error)
    return { success: false, error: 'Error al eliminar el medio. Intente nuevamente.' }
  }
}

/**
 * Get the usage information for a media item.
 * Returns a list of projects that reference this media through ProjectImage.
 */
export async function getMediaUsage(id: string): Promise<ActionResult<MediaUsage[]>> {
  try {
    if (!id) {
      return { success: false, error: 'ID de medio no proporcionado.' }
    }

    const media = await withRetry(() =>
      prisma.media.findUnique({
        where: { id },
        include: {
          projectImages: {
            include: {
              project: { select: { id: true, title: true } },
            },
          },
        },
      })
    )

    if (!media) {
      return { success: false, error: 'El medio no fue encontrado.' }
    }

    const usages: MediaUsage[] = media.projectImages
      .filter((pi) => pi.project !== null)
      .map((pi) => ({
        projectId: pi.project!.id,
        projectTitle: pi.project!.title,
        imageId: pi.id,
      }))

    return { success: true, data: usages }
  } catch (error) {
    console.error('Error getting media usage:', error)
    return { success: false, error: 'Error al consultar el uso del medio. Intente nuevamente.' }
  }
}

/**
 * Get paginated list of media items.
 * Returns items sorted by upload date (most recent first).
 */
export async function getMediaList(
  page: number = 1,
  pageSize: number = 20
): Promise<ActionResult<PaginatedResult<Media>>> {
  try {
    const skip = (page - 1) * pageSize

    const [items, total] = await withRetry(() =>
      prisma.$transaction([
        prisma.media.findMany({
          skip,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.media.count(),
      ])
    )

    const totalPages = Math.ceil(total / pageSize)

    return {
      success: true,
      data: {
        items,
        total,
        page,
        pageSize,
        totalPages,
      },
    }
  } catch (error) {
    console.error('Error getting media list:', error)
    return { success: false, error: 'Error al obtener la lista de medios. Intente nuevamente.' }
  }
}
