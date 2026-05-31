'use server'

import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import prisma, { withRetry } from '@/lib/prisma'
import type { ActionResult } from '@/lib/types'

/**
 * Mark a contact message as read.
 * Updates the message status from UNREAD to READ.
 */
export async function markMessageAsRead(id: string): Promise<ActionResult<void>> {
  try {
    if (!id) {
      return { success: false, error: 'El ID del mensaje es requerido.' }
    }

    await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.contactMessage.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('MESSAGE_NOT_FOUND')
        }

        await tx.contactMessage.update({
          where: { id },
          data: { status: 'READ' },
        })
      })
    )

    revalidatePath('/admin/messages')
    revalidatePath('/admin')

    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof Error && error.message === 'MESSAGE_NOT_FOUND') {
      return { success: false, error: 'El mensaje no fue encontrado.' }
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { success: false, error: 'El mensaje no fue encontrado.' }
      }
    }
    return { success: false, error: 'Error al marcar el mensaje como leído. Intente nuevamente.' }
  }
}

/**
 * Delete a contact message.
 */
export async function deleteMessage(id: string): Promise<ActionResult<void>> {
  try {
    if (!id) {
      return { success: false, error: 'El ID del mensaje es requerido.' }
    }

    await withRetry(() =>
      prisma.$transaction(async (tx) => {
        const existing = await tx.contactMessage.findUnique({ where: { id } })
        if (!existing) {
          throw new Error('MESSAGE_NOT_FOUND')
        }

        await tx.contactMessage.delete({ where: { id } })
      })
    )

    revalidatePath('/admin/messages')
    revalidatePath('/admin')

    return { success: true, data: undefined }
  } catch (error) {
    if (error instanceof Error && error.message === 'MESSAGE_NOT_FOUND') {
      return { success: false, error: 'El mensaje no fue encontrado.' }
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { success: false, error: 'El mensaje no fue encontrado.' }
      }
    }
    return { success: false, error: 'Error al eliminar el mensaje. Intente nuevamente.' }
  }
}
