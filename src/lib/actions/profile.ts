'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Prisma } from '@prisma/client'
import prisma, { withRetry } from '@/lib/prisma'
import { profileSchema } from '@/lib/validations/profile'
import type { ActionResult } from '@/lib/types'
import type { Profile } from '@prisma/client'

/**
 * Validate WhatsApp number in international format.
 * Must be digits only (after removing + prefix), between 10 and 15 digits total.
 * Format: country code + number (e.g., +573001234567 or 573001234567).
 */
function validateWhatsappNumber(number: string): { valid: boolean; error?: string } {
  if (!number || number.trim() === '') {
    return { valid: true } // Optional field, empty is valid
  }

  // Remove + prefix and spaces/dashes for validation
  const cleaned = number.replace(/[\s\-+]/g, '')

  // Must be only digits after cleaning
  if (!/^\d+$/.test(cleaned)) {
    return {
      valid: false,
      error: 'El número de WhatsApp solo debe contener dígitos (y opcionalmente el prefijo +)',
    }
  }

  // Must be between 10 and 15 digits
  if (cleaned.length < 10 || cleaned.length > 15) {
    return {
      valid: false,
      error: 'El número de WhatsApp debe tener entre 10 y 15 dígitos (código de país + número)',
    }
  }

  return { valid: true }
}

/**
 * Update the profile.
 * Since there's only one profile, this finds the first profile and updates it.
 * If no profile exists, it creates one.
 * Validates input including WhatsApp number format (international: 10-15 digits).
 * Handles social links by replacing all existing links with the new set.
 */
export async function updateProfile(formData: FormData): Promise<ActionResult<Profile>> {
  try {
    // Parse social links from FormData
    const socialLinksRaw = formData.get('socialLinks')
    let socialLinks: { platform: string; url: string }[] | undefined

    if (socialLinksRaw && typeof socialLinksRaw === 'string') {
      try {
        socialLinks = JSON.parse(socialLinksRaw)
      } catch {
        return {
          success: false,
          error: 'Validación fallida',
          fieldErrors: { socialLinks: ['Formato de enlaces sociales inválido'] },
        }
      }
    }

    const rawData = {
      fullName: formData.get('fullName'),
      professionalTitle: formData.get('professionalTitle'),
      biography: formData.get('biography'),
      email: formData.get('email'),
      phone: formData.get('phone') || undefined,
      address: formData.get('address') || undefined,
      whatsappLink: formData.get('whatsappLink') || undefined,
      socialLinks,
    }

    const parsed = profileSchema.safeParse(rawData)
    if (!parsed.success) {
      return {
        success: false,
        error: 'Validación fallida',
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      }
    }

    // Validate WhatsApp number format (international: 10-15 digits)
    if (parsed.data.whatsappLink) {
      const whatsappValidation = validateWhatsappNumber(parsed.data.whatsappLink)
      if (!whatsappValidation.valid) {
        return {
          success: false,
          error: 'Validación fallida',
          fieldErrors: { whatsappLink: [whatsappValidation.error ?? 'Número de WhatsApp inválido'] },
        }
      }
    }

    const profile = await withRetry(() =>
      prisma.$transaction(async (tx) => {
        // Find existing profile (there should be only one)
        const existing = await tx.profile.findFirst()

        const profileData = {
          fullName: parsed.data.fullName,
          professionalTitle: parsed.data.professionalTitle,
          biography: parsed.data.biography,
          email: parsed.data.email,
          phone: parsed.data.phone ?? null,
          address: parsed.data.address ?? null,
          whatsappNumber: parsed.data.whatsappLink ?? null,
        }

        let updatedProfile: Profile

        if (existing) {
          // Update existing profile
          updatedProfile = await tx.profile.update({
            where: { id: existing.id },
            data: profileData,
          })

          // Replace social links: delete all existing, then create new ones
          await tx.socialLink.deleteMany({ where: { profileId: existing.id } })

          if (parsed.data.socialLinks && parsed.data.socialLinks.length > 0) {
            await tx.socialLink.createMany({
              data: parsed.data.socialLinks.map((link) => ({
                platform: link.platform,
                url: link.url,
                profileId: existing.id,
              })),
            })
          }
        } else {
          // Create new profile
          updatedProfile = await tx.profile.create({
            data: {
              ...profileData,
              socialLinks: {
                create: parsed.data.socialLinks?.map((link) => ({
                  platform: link.platform,
                  url: link.url,
                })) ?? [],
              },
            },
          })
        }

        return updatedProfile
      })
    )

    revalidatePath('/(public)')
    revalidatePath('/admin/profile')
    revalidateTag('profile')

    return { success: true, data: profile }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          error: 'Error de datos duplicados. Verifique la información ingresada.',
        }
      }
    }
    return { success: false, error: 'Error al actualizar el perfil. Intente nuevamente.' }
  }
}
