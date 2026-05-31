import { z } from 'zod'

export const serviceSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio').max(100, 'El título no puede exceder 100 caracteres'),
  shortDescription: z.string().min(1, 'La descripción corta es obligatoria').max(200, 'La descripción corta no puede exceder 200 caracteres'),
  detailedDescription: z.string().min(1, 'La descripción detallada es obligatoria').max(2000, 'La descripción detallada no puede exceder 2000 caracteres'),
  iconSvg: z.string().min(1, 'El icono SVG es obligatorio'),
  order: z.number().int('El orden debe ser un número entero').min(0, 'El orden no puede ser negativo').optional(),
})

export type ServiceFormData = z.infer<typeof serviceSchema>
