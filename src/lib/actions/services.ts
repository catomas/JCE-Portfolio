'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Prisma } from '@prisma/client'
import prisma, { withRetry } from '@/lib/prisma'
import { serviceSchema } from '@/lib/validations/service'
import type { ActionResult } from '@/lib/types'
import type { Service } from '@prisma/client'

/**
 * Create a new service.
 * Validates input and persists to the database with auto-incremented order.
 */
export async function createService(formData: FormData): Promise<ActionResult<Service>> {
  try {
    const rawData = {
      title: formData.get('title'),
      shortDescription: formData.get('shortDescription'),
      detailedDescription: formData.get('detailedDescription'),
      iconSvg: formData.get('iconSvg'),
    }

    const parsed = serviceSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const service = await withRetry(() =>
      prisma.$transaction(async (tx) => {
        // Get the next order value
        const maxOrder = await tx.service.aggregate({ _max: { order: true } })
        const nextOrder = (maxOrder._max.order ?? -1) + 1

        return tx.service.create({
          data: {
            title: parsed.data.title,
            shortDescription: parsed.data.shortDescription,
            detailedDescription: parsed.data.detailedDescription,
            iconSvg: parsed.data.iconSvg,
            order: nextOrder,
          },
        })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/services')
    revalidateTag('services')

    return { success: true, data: service }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Ya existe un servicio con esos datos. Por favor, verifique.',
          fieldErrors: { title: ['Ya existe un servicio con ese título'] },
        }
      }
    }
    return { success: false, error: 'Error al crear el servicio. Intente nuevamente.' }
  }
}

/**
 * Update an existing service.
 * Validates input and persists changes.
 */
export async function updateService(id: string, formData: FormData): Promise<ActionResult<Service>> {
  try {
    const rawData = {
      title: formData.get('title'),
      shortDescription: formData.get('shortDescription'),
      detailedDescription: formData.get('detailedDescription'),
      iconSvg: formData.get('iconSvg'),
    }

    const parsed = serviceSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const service = await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.service.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('SERVICE_NOT_FOUND')
        }

        return tx.service.update({
          where: { id },
          data: {
            title: parsed.data.title,
            shortDescription: parsed.data.shortDescription,
            detailedDescription: parsed.data.detailedDescription,
            iconSvg: parsed.data.iconSvg,
          },
        })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/services')
    revalidateTag('services')

    return { success: true, data: service }
  } catch (error) {
    if (error instanceof Error && error.message === 'SERVICE_NOT_FOUND') {
      return { success: false, error: 'El servicio no fue encontrado.' }
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Ya existe un servicio con esos datos. Por favor, verifique.',
          fieldErrors: { title: ['Ya existe un servicio con ese título'] },
        }
      }
    }
    return { success: false, error: 'Error al actualizar el servicio. Intente nuevamente.' }
  }
}

/**
 * Delete a service by ID.
 */
export async function deleteService(id: string): Promise<ActionResult<void>> {
  try {
    await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.service.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('SERVICE_NOT_FOUND')
        }

        await tx.service.delete({ where: { id } })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/services')
    revalidateTag('services')

    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof Error && error.message === 'SERVICE_NOT_FOUND') {
      return { success: false, error: 'El servicio no fue encontrado.' }
    }
    return { success: false, error: 'Error al eliminar el servicio. Intente nuevamente.' }
  }
}

/**
 * Reorder services by persisting a new order based on an array of service IDs.
 * The position in the array determines the new order value.
 */
export async function reorderServices(orderedIds: string[]): Promise<ActionResult<void>> {
  try {
    if (!orderedIds || orderedIds.length === 0) {
      return { success: false, error: 'La lista de IDs no puede estar vacía.' }
    }

    await withRetry(() =>
      prisma.$transaction(
        orderedIds.map((id, index) =>
          prisma.service.update({
            where: { id },
            data: { order: index },
          })
        )
      )
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/services')
    revalidateTag('services')

    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { success: false, error: 'Uno o más servicios no fueron encontrados.' }
      }
    }
    return { success: false, error: 'Error al reordenar los servicios. Intente nuevamente.' }
  }
}
