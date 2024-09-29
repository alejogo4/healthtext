import { z } from 'zod';


const contactSchema = z.object({
  name_contact: z
    .string()
    .min(1, 'El nombre del contacto es obligatorio'),
  extension: z.string().optional(),
  phone: z
    .string()
    .regex(/^\d{7,10}$/, 'El teléfono debe ser un número válido de 7 a 10 dígitos'),
  mobile: z
    .string()
    .min(1, 'El número de celular es obligatorio')
    .regex(/^\d{10}$/, 'El celular debe tener 10 dígitos'),
  email: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido'),
  alternate_email: z.string().optional(),
  position: z.string().min(1, 'El cargo es obligatorio'),
});

export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),

  document_type_id: z.any(),

  document_number: z
    .string()
    .min(1, 'El número de documento es obligatorio')
    .min(5, 'El número de documento debe tener al menos 5 caracteres'),

  url_website: z.string().optional(),
  url_facebook: z.string().optional(),
  url_twitter: z.string().optional(),

  country: z.string().min(1, 'El país es obligatorio'),

  department: z.string().min(1, 'El departamento es obligatorio'),

  city: z.string().min(1, 'La ciudad es obligatoria'),

  neighborhood: z.string().optional(),

  postal_code: z.string().regex(/^\d+$/, 'El código postal debe ser numérico'),

  full_address: z.string().min(1, 'La dirección completa es obligatoria'),

  tax_regime: z.string().min(1, 'El régimen fiscal es obligatorio'),

  type_account: z.any(),

  bank: z.string().min(1, 'El banco es obligatorio'),

  account_number: z
    .string()
    .min(1, 'El número de cuenta es obligatorio')
    .regex(/^\d+$/, 'El número de cuenta debe ser numérico'),

  nationality: z.string().min(1, 'La nacionalidad es obligatoria'),

  attached_documents: z.string().optional(),

  payment_option: z.object({
    value: z.string().min(1, 'La opción de pago es obligatoria')
  }),

  invoice_deadline: z.object({
    value: z.string().min(1, 'El plazo de facturación es obligatorio')
  }),

  type_service: z
    .array(
      z.object({
        value: z.string().min(1, 'El tipo de servicio es obligatorio')
      })
    )
    .min(1, 'Debe haber al menos un tipo de servicio'),

  contact_info: z
    .array(contactSchema)
    .optional(),

  registered_simple_tax_regime: z.boolean().optional(),
  big_contributor: z.boolean().optional(),
  vat_responsible: z.boolean().optional(),
  reteiva_not_registered_simple_regimen: z.boolean().optional(),
  reteiva_registered_simple_regimen: z.boolean().optional(),
  cause_retefuente_for_income_tax: z.boolean().optional(),
  cause_retefuente_for_ica: z.boolean().optional()
});

export type FormSchema = z.infer<typeof formSchema>;
