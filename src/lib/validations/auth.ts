import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Ingrese un email válido').max(254, 'El email no puede exceder 254 caracteres'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').max(128, 'La contraseña no puede exceder 128 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>
