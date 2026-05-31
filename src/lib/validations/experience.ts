import { z } from 'zod'

export const experienceSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio').max(100, 'El título no puede exceder 100 caracteres'),
  location: z.string().min(1, 'La ubicación es obligatoria').max(150, 'La ubicación no puede exceder 150 caracteres'),
  date: z.string().min(1, 'La fecha es obligatoria'),
  description: z.string().min(1, 'La descripción es obligatoria').max(500, 'La descripción no puede exceder 500 caracteres'),
  category: z.enum(['Educación', 'Certificación', 'Trabajo'], {
    errorMap: () => ({ message: 'La categoría debe ser Educación, Certificación o Trabajo' }),
  }),
})

export type ExperienceFormData = z.infer<typeof experienceSchema>
