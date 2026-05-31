import { z } from 'zod'

export const testimonialSchema = z.object({
  clientName: z.string().min(1, 'El nombre del cliente es obligatorio').max(100, 'El nombre no puede exceder 100 caracteres'),
  clientRole: z.string().min(1, 'El cargo es obligatorio').max(100, 'El cargo no puede exceder 100 caracteres'),
  text: z.string().min(1, 'El texto del testimonio es obligatorio').max(500, 'El texto no puede exceder 500 caracteres'),
  status: z.enum(['published', 'draft']).default('draft'),
})

export type TestimonialFormData = z.infer<typeof testimonialSchema>
