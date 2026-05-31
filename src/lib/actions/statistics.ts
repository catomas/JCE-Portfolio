'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Prisma } from '@prisma/client'
import prisma, { withRetry } from '@/lib/prisma'
import { statisticSchema } from '@/lib/validations/statistic'
import type { ActionResult } from '@/lib/types'
import type { Statistic } from '@prisma/client'

/**
 * Create a new statistic counter.
 * Validates that value is 0-999999 and label is 1-50 chars.
 * Auto-assigns the next order value.
 */
export async function createStatistic(formData: FormData): Promise<ActionResult<Statistic>> {
  try {
    const rawValue = formData.get('value')
    const rawOrder = formData.get('order')
    const rawData = {
      value: rawValue === null ? undefined : Number(rawValue),
      label: formData.get('label'),
      order: rawOrder === null ? undefined : Number(rawOrder),
    }

    const parsed = statisticSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const statistic = await withRetry(() =>
      prisma.$transaction(async (tx) => {
        // Get the next order value
        const maxOrder = await tx.statistic.aggregate({ _max: { order: true } })
        const nextOrder = parsed.data.order ?? (maxOrder._max.order ?? -1) + 1

        return tx.statistic.create({
          data: {
            value: parsed.data.value,
            label: parsed.data.label,
            order: nextOrder,
          },
        })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/statistics')
    revalidateTag('statistics')

    return { success: true, data: statistic }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Ya existe una estadística con esos datos.',
        }
      }
    }
    return { success: false, error: 'Error al crear la estadística. Intente nuevamente.' }
  }
}

/**
 * Update an existing statistic counter.
 * Validates that value is 0-999999 and label is 1-50 chars.
 */
export async function updateStatistic(id: string, formData: FormData): Promise<ActionResult<Statistic>> {
  try {
    const rawValue = formData.get('value')
    const rawOrder = formData.get('order')
    const rawData = {
      value: rawValue === null ? undefined : Number(rawValue),
      label: formData.get('label'),
      order: rawOrder === null ? undefined : Number(rawOrder),
    }

    const parsed = statisticSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const statistic = await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.statistic.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('STATISTIC_NOT_FOUND')
        }

        return tx.statistic.update({
          where: { id },
          data: {
            value: parsed.data.value,
            label: parsed.data.label,
            ...(parsed.data.order !== undefined && { order: parsed.data.order }),
          },
        })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/statistics')
    revalidateTag('statistics')

    return { success: true, data: statistic }
  } catch (error) {
    if (error instanceof Error && error.message === 'STATISTIC_NOT_FOUND') {
      return { success: false, error: 'La estadística no fue encontrada.' }
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Ya existe una estadística con esos datos.',
        }
      }
    }
    return { success: false, error: 'Error al actualizar la estadística. Intente nuevamente.' }
  }
}

/**
 * Delete a statistic counter by ID.
 */
export async function deleteStatistic(id: string): Promise<ActionResult<void>> {
  try {
    await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.statistic.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('STATISTIC_NOT_FOUND')
        }

        await tx.statistic.delete({ where: { id } })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/statistics')
    revalidateTag('statistics')

    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof Error && error.message === 'STATISTIC_NOT_FOUND') {
      return { success: false, error: 'La estadística no fue encontrada.' }
    }
    return { success: false, error: 'Error al eliminar la estadística. Intente nuevamente.' }
  }
}
