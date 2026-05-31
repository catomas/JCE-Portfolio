'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Prisma } from '@prisma/client'
import prisma, { withRetry } from '@/lib/prisma'
import { experienceSchema } from '@/lib/validations/experience'
import type { ActionResult } from '@/lib/types'
import type { Experience, ExperienceCategory } from '@prisma/client'

/**
 * Map user-facing category string to Prisma ExperienceCategory enum.
 */
function mapCategory(category: string): ExperienceCategory {
  switch (category) {
    case 'Educación':
      return 'EDUCACION'
    case 'Certificación':
      return 'CERTIFICACION'
    case 'Trabajo':
      return 'TRABAJO'
    default:
      return 'EDUCACION'
  }
}

/**
 * Parse a date string into a sortDate for chronological ordering.
 * Handles formats like:
 * - "2020" (just a year)
 * - "2007 - Actualidad" (range with current)
 * - "1989 - 1994" (year range)
 * - "Enero 2020" (month year)
 * - "Marzo 2018 - Actualidad" (month year range)
 *
 * Uses the last/most recent part of the range for sorting.
 */
function parseSortDate(dateStr: string): Date {
  // Handle ranges like "2007 - Actualidad" or "1989 - 1994"
  const parts = dateStr.split('-').map((s) => s.trim())
  const lastPart = parts.at(-1) ?? ''

  // If the last part is "Actualidad" or similar, use current date
  if (lastPart.toLowerCase() === 'actualidad') {
    return new Date()
  }

  // Try to parse month + year (e.g., "Enero 2020", "Marzo 2018")
  const monthYearMatch = /^(\w+)\s+(\d{4})$/.exec(lastPart)
  if (monthYearMatch) {
    const monthNames: Record<string, number> = {
      enero: 0, febrero: 1, marzo: 2, abril: 3,
      mayo: 4, junio: 5, julio: 6, agosto: 7,
      septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
    }
    const monthNum = monthNames[monthYearMatch[1].toLowerCase()]
    const year = Number.parseInt(monthYearMatch[2], 10)
    if (monthNum !== undefined && !Number.isNaN(year)) {
      return new Date(year, monthNum, 1)
    }
  }

  // If it's just a year like "2013" or "2020"
  const year = Number.parseInt(lastPart, 10)
  if (!Number.isNaN(year) && year > 1900 && year < 2200) {
    return new Date(year, 0, 1)
  }

  // Fallback: use current date
  return new Date()
}

/**
 * Create a new experience entry.
 * Validates input, calculates sortDate for chronological ordering, and persists to the database.
 */
export async function createExperience(formData: FormData): Promise<ActionResult<Experience>> {
  try {
    const rawData = {
      title: formData.get('title'),
      location: formData.get('location'),
      date: formData.get('date'),
      description: formData.get('description'),
      category: formData.get('category'),
    }

    const parsed = experienceSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const sortDate = parseSortDate(parsed.data.date)
    const category = mapCategory(parsed.data.category)

    const experience = await withRetry(() =>
      prisma.$transaction(async (tx) => {
        return tx.experience.create({
          data: {
            title: parsed.data.title,
            location: parsed.data.location,
            date: parsed.data.date,
            description: parsed.data.description,
            category,
            sortDate,
          },
        })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/experience')
    revalidateTag('experience')

    return { success: true, data: experience }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Ya existe una entrada de experiencia con esos datos.',
        }
      }
    }
    return { success: false, error: 'Error al crear la entrada de experiencia. Intente nuevamente.' }
  }
}

/**
 * Update an existing experience entry.
 * Validates input, recalculates sortDate if date changed, and persists changes.
 */
export async function updateExperience(id: string, formData: FormData): Promise<ActionResult<Experience>> {
  try {
    const rawData = {
      title: formData.get('title'),
      location: formData.get('location'),
      date: formData.get('date'),
      description: formData.get('description'),
      category: formData.get('category'),
    }

    const parsed = experienceSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const sortDate = parseSortDate(parsed.data.date)
    const category = mapCategory(parsed.data.category)

    const experience = await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.experience.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('EXPERIENCE_NOT_FOUND')
        }

        return tx.experience.update({
          where: { id },
          data: {
            title: parsed.data.title,
            location: parsed.data.location,
            date: parsed.data.date,
            description: parsed.data.description,
            category,
            sortDate,
          },
        })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/experience')
    revalidateTag('experience')

    return { success: true, data: experience }
  } catch (error) {
    if (error instanceof Error && error.message === 'EXPERIENCE_NOT_FOUND') {
      return { success: false, error: 'La entrada de experiencia no fue encontrada.' }
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Ya existe una entrada de experiencia con esos datos.',
        }
      }
    }
    return { success: false, error: 'Error al actualizar la entrada de experiencia. Intente nuevamente.' }
  }
}

/**
 * Delete an experience entry by ID.
 */
export async function deleteExperience(id: string): Promise<ActionResult<void>> {
  try {
    await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.experience.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('EXPERIENCE_NOT_FOUND')
        }

        await tx.experience.delete({ where: { id } })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/experience')
    revalidateTag('experience')

    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof Error && error.message === 'EXPERIENCE_NOT_FOUND') {
      return { success: false, error: 'La entrada de experiencia no fue encontrada.' }
    }
    return { success: false, error: 'Error al eliminar la entrada de experiencia. Intente nuevamente.' }
  }
}
