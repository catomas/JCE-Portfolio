'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Prisma } from '@prisma/client'
import prisma, { withRetry } from '@/lib/prisma'
import { projectSchema } from '@/lib/validations/project'
import { generateSlug } from '@/lib/utils'
import type { ActionResult } from '@/lib/types'
import type { Project } from '@prisma/client'

/**
 * Create a new project.
 * Validates input, generates a slug from the title, and persists to the database.
 * Default status is 'draft'.
 */
export async function createProject(formData: FormData): Promise<ActionResult<Project>> {
  try {
    const rawData = {
      title: formData.get('title'),
      description: formData.get('description'),
      status: formData.get('status') || 'draft',
    }

    const parsed = projectSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const slug = generateSlug(parsed.data.title)

    const project = await withRetry(() =>
      prisma.$transaction(async (tx) => {
        // Get the next order value
        const maxOrder = await tx.project.aggregate({ _max: { order: true } })
        const nextOrder = (maxOrder._max.order ?? -1) + 1

        return tx.project.create({
          data: {
            title: parsed.data.title,
            description: parsed.data.description,
            status: parsed.data.status === 'published' ? 'PUBLISHED' : 'DRAFT',
            slug,
            order: nextOrder,
          },
        })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/projects')
    revalidateTag('projects')

    return { success: true, data: project }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Ya existe un proyecto con ese título. Por favor, use un título diferente.',
          fieldErrors: { title: ['Ya existe un proyecto con ese título'] },
        }
      }
    }
    return { success: false, error: 'Error al crear el proyecto. Intente nuevamente.' }
  }
}

/**
 * Update an existing project.
 * Validates input, regenerates slug if title changed, and persists changes.
 */
export async function updateProject(id: string, formData: FormData): Promise<ActionResult<Project>> {
  try {
    const rawData = {
      title: formData.get('title'),
      description: formData.get('description'),
      status: formData.get('status'),
    }

    const parsed = projectSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const project = await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.project.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('PROJECT_NOT_FOUND')
        }

        // Regenerate slug only if title changed
        const slug = parsed.data.title === existing.title
          ? existing.slug
          : generateSlug(parsed.data.title)

        return tx.project.update({
          where: { id },
          data: {
            title: parsed.data.title,
            description: parsed.data.description,
            status: parsed.data.status === 'published' ? 'PUBLISHED' : 'DRAFT',
            slug,
          },
        })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/projects')
    revalidateTag('projects')

    return { success: true, data: project }
  } catch (error) {
    if (error instanceof Error && error.message === 'PROJECT_NOT_FOUND') {
      return { success: false, error: 'El proyecto no fue encontrado.' }
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Ya existe un proyecto con ese título. Por favor, use un título diferente.',
          fieldErrors: { title: ['Ya existe un proyecto con ese título'] },
        }
      }
    }
    return { success: false, error: 'Error al actualizar el proyecto. Intente nuevamente.' }
  }
}

/**
 * Delete a project and its associated images (cascade).
 */
export async function deleteProject(id: string): Promise<ActionResult<void>> {
  try {
    await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.project.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('PROJECT_NOT_FOUND')
        }

        // Cascade delete handles ProjectImage records automatically
        await tx.project.delete({ where: { id } })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/projects')
    revalidateTag('projects')

    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof Error && error.message === 'PROJECT_NOT_FOUND') {
      return { success: false, error: 'El proyecto no fue encontrado.' }
    }
    return { success: false, error: 'Error al eliminar el proyecto. Intente nuevamente.' }
  }
}

/**
 * Reorder projects by persisting a new order based on an array of project IDs.
 * The position in the array determines the new order value.
 */
export async function reorderProjects(orderedIds: string[]): Promise<ActionResult<void>> {
  try {
    if (!orderedIds || orderedIds.length === 0) {
      return { success: false, error: 'La lista de IDs no puede estar vacía.' }
    }

    await withRetry(() =>
      prisma.$transaction(
        orderedIds.map((id, index) =>
          prisma.project.update({
            where: { id },
            data: { order: index },
          })
        )
      )
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/projects')
    revalidateTag('projects')

    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { success: false, error: 'Uno o más proyectos no fueron encontrados.' }
      }
    }
    return { success: false, error: 'Error al reordenar los proyectos. Intente nuevamente.' }
  }
}

/**
 * Toggle a project's status between published and draft.
 */
export async function toggleProjectStatus(
  id: string,
  status: 'published' | 'draft'
): Promise<ActionResult<Project>> {
  try {
    if (status !== 'published' && status !== 'draft') {
      return { success: false, error: 'Estado inválido. Use "published" o "draft".' }
    }

    const project = await withRetry(() =>
      prisma.project.update({
        where: { id },
        data: { status: status === 'published' ? 'PUBLISHED' : 'DRAFT' },
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/projects')
    revalidateTag('projects')

    return { success: true, data: project }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { success: false, error: 'El proyecto no fue encontrado.' }
      }
    }
    return { success: false, error: 'Error al cambiar el estado del proyecto. Intente nuevamente.' }
  }
}
