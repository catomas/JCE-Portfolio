import { z } from 'zod'

export const statisticSchema = z.object({
  value: z.number().int('El valor debe ser un número entero').min(0, 'El valor no puede ser negativo').max(999999, 'El valor no puede exceder 999,999'),
  label: z.string().min(1, 'La etiqueta es obligatoria').max(50, 'La etiqueta no puede exceder 50 caracteres'),
  order: z.number().int('El orden debe ser un número entero').min(0, 'El orden no puede ser negativo').optional(),
})

export type StatisticFormData = z.infer<typeof statisticSchema>
