import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z.string().email('Ingrese un email válido').max(254, 'El email no puede exceder 254 caracteres'),
  phone: z.string().max(20, 'El teléfono no puede exceder 20 caracteres').optional(),
  subject: z.string().min(1, 'El asunto es obligatorio').max(150, 'El asunto no puede exceder 150 caracteres'),
  message: z.string().min(1, 'El mensaje es obligatorio').max(2000, 'El mensaje no puede exceder 2000 caracteres'),
})

export type ContactFormData = z.infer<typeof contactSchema>
