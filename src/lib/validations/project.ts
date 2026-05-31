import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio').max(100, 'El título no puede exceder 100 caracteres'),
  description: z.string().min(1, 'La descripción es obligatoria').max(2000, 'La descripción no puede exceder 2000 caracteres'),
  status: z.enum(['published', 'draft']).default('draft'),
  order: z.number().int('El orden debe ser un número entero').min(0, 'El orden no puede ser negativo').optional(),
})

export type ProjectFormData = z.infer<typeof projectSchema>
