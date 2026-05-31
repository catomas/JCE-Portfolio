import { z } from 'zod'

export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'La plataforma es obligatoria'),
  url: z.string().url('Ingrese una URL válida'),
})

export const profileSchema = z.object({
  fullName: z.string().min(1, 'El nombre completo es obligatorio').max(100, 'El nombre no puede exceder 100 caracteres'),
  professionalTitle: z.string().min(1, 'El título profesional es obligatorio').max(120, 'El título profesional no puede exceder 120 caracteres'),
  biography: z.string().min(1, 'La biografía es obligatoria').max(2000, 'La biografía no puede exceder 2000 caracteres'),
  email: z.string().email('Ingrese un email válido').max(254, 'El email no puede exceder 254 caracteres'),
  phone: z.string().max(20, 'El teléfono no puede exceder 20 caracteres').optional(),
  address: z.string().max(200, 'La dirección no puede exceder 200 caracteres').optional(),
  whatsappLink: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).max(6, 'Máximo 6 enlaces de redes sociales').optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
export type SocialLinkFormData = z.infer<typeof socialLinkSchema>
