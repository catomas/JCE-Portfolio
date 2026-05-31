'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Prisma } from '@prisma/client'
import prisma, { withRetry } from '@/lib/prisma'
import { testimonialSchema } from '@/lib/validations/testimonial'
import type { ActionResult } from '@/lib/types'
import type { Testimonial } from '@prisma/client'

/**
 * Create a new testimonial.
 * Validates input and persists to the database with default status 'draft'.
 */
export async function createTestimonial(formData: FormData): Promise<ActionResult<Testimonial>> {
  try {
    const rawData = {
      clientName: formData.get('clientName'),
      clientRole: formData.get('clientRole'),
      text: formData.get('text'),
      status: formData.get('status') || 'draft',
    }

    const parsed = testimonialSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const clientPhotoUrl = formData.get('clientPhotoUrl') as string | null

    const testimonial = await withRetry(() =>
      prisma.testimonial.create({
        data: {
          clientName: parsed.data.clientName,
          clientRole: parsed.data.clientRole,
          text: parsed.data.text,
          clientPhotoUrl: clientPhotoUrl || null,
          status: parsed.data.status === 'published' ? 'PUBLISHED' : 'DRAFT',
        },
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/testimonials')
    revalidateTag('testimonials')

    return { success: true, data: testimonial }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: 'Error de base de datos al crear el testimonio. Intente nuevamente.' }
    }
    return { success: false, error: 'Error al crear el testimonio. Intente nuevamente.' }
  }
}

/**
 * Update an existing testimonial.
 * Validates input and persists changes.
 */
export async function updateTestimonial(id: string, formData: FormData): Promise<ActionResult<Testimonial>> {
  try {
    const rawData = {
      clientName: formData.get('clientName'),
      clientRole: formData.get('clientRole'),
      text: formData.get('text'),
      status: formData.get('status'),
    }

    const parsed = testimonialSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    const clientPhotoUrl = formData.get('clientPhotoUrl') as string | null

    const testimonial = await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.testimonial.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('TESTIMONIAL_NOT_FOUND')
        }

        return tx.testimonial.update({
          where: { id },
          data: {
            clientName: parsed.data.clientName,
            clientRole: parsed.data.clientRole,
            text: parsed.data.text,
            clientPhotoUrl: clientPhotoUrl === undefined ? existing.clientPhotoUrl : (clientPhotoUrl || null),
            status: parsed.data.status === 'published' ? 'PUBLISHED' : 'DRAFT',
          },
        })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/testimonials')
    revalidateTag('testimonials')

    return { success: true, data: testimonial }
  } catch (error) {
    if (error instanceof Error && error.message === 'TESTIMONIAL_NOT_FOUND') {
      return { success: false, error: 'El testimonio no fue encontrado.' }
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: 'Error de base de datos al actualizar el testimonio. Intente nuevamente.' }
    }
    return { success: false, error: 'Error al actualizar el testimonio. Intente nuevamente.' }
  }
}

/**
 * Delete a testimonial and its associated photo reference.
 */
export async function deleteTestimonial(id: string): Promise<ActionResult<void>> {
  try {
    await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.testimonial.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('TESTIMONIAL_NOT_FOUND')
        }

        await tx.testimonial.delete({ where: { id } })
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/testimonials')
    revalidateTag('testimonials')

    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof Error && error.message === 'TESTIMONIAL_NOT_FOUND') {
      return { success: false, error: 'El testimonio no fue encontrado.' }
    }
    return { success: false, error: 'Error al eliminar el testimonio. Intente nuevamente.' }
  }
}

/**
 * Toggle a testimonial's status between published and draft.
 * Published testimonials are shown in the public portfolio.
 * Draft testimonials are hidden from visitors.
 */
export async function toggleTestimonialStatus(
  id: string,
  status: 'published' | 'draft'
): Promise<ActionResult<Testimonial>> {
  try {
    if (status !== 'published' && status !== 'draft') {
      return { success: false, error: 'Estado inválido. Use "published" o "draft".' }
    }

    const testimonial = await withRetry(() =>
      prisma.testimonial.update({
        where: { id },
        data: { status: status === 'published' ? 'PUBLISHED' : 'DRAFT' },
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/testimonials')
    revalidateTag('testimonials')

    return { success: true, data: testimonial }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { success: false, error: 'El testimonio no fue encontrado.' }
      }
    }
    return { success: false, error: 'Error al cambiar el estado del testimonio. Intente nuevamente.' }
  }
}
