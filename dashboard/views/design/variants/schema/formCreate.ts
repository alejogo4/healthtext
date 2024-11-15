import { z } from 'zod';

// Esquema de validación para el formulario principal
export const formSchema = z.object({
  category_id: z
    .union([
      z.object({
        value: z
          .string({ required_error: 'La categoría es requerida' })
          .min(1, 'La categoría es requerida'),
        label: z.string().optional()
      }),
      z.null(),
      z.undefined()
    ])
    .refine(val => val !== null && val !== undefined, {
      message: 'La categoría es requerida'
    }),
  gender_id: z
    .union([
      z.object({
        value: z
          .string({ required_error: 'El género es requerido' })
          .min(1, 'El género es requerido'),
        label: z.string().optional()
      }),
      z.null(),
      z.undefined()
    ])
    .refine(val => val !== null && val !== undefined, {
      message: 'El género es requerido'
    }),
  description: z.string().optional(),
  name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
});

export type FormSchema = z.infer<typeof formSchema>;
