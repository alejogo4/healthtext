import { z } from 'zod';

// Esquema de validación para el contacto
const contactSchema = z.object({
  name_contact: z.string().min(1, 'El nombre del contacto es obligatorio'),
  extension: z.string().optional(),
  phone: z
    .string()
    .regex(
      /^\d{7,10}$/,
      'El teléfono debe ser un número válido de 7 a 10 dígitos'
    ),
  mobile: z
    .string()
    .min(1, 'El número de celular es obligatorio')
    .regex(/^\d{10}$/, 'El celular debe tener 10 dígitos'),
  email_contact: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido'),
  alternate_email: z.string().optional(),
  job_title: z.string().min(1, 'El cargo es obligatorio')
});

// Esquema de validación para el formulario principal
export const formSchema = z.object({
  document_type_id: z.any(),
  document_number: z
    .string()
    .min(1, 'El número de documento es obligatorio')
    .min(5, 'El número de documento debe tener al menos 5 caracteres'),
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  payment_currency: z.any(),
  country: z.string().min(1, 'El país es obligatorio'),
  department: z.string().min(1, 'El departamento es obligatorio'),
  city: z.string().min(1, 'La ciudad es obligatoria'),
  neighborhood: z.string().optional(),
  postal_code: z.string().regex(/^\d+$/, 'El código postal debe ser numérico'),
  full_address: z.string().min(1, 'La dirección completa es obligatoria'),
  email: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido'),
  where_authorize: z.any(),
  way_to_meet_them: z.any(),
  profession_specialty: z
    .string()
    .min(1, 'La especialidad profesional es obligatoria'),
  authorizes_receive_information: z.boolean(),
  date_birth: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
  contact_info: z
    .array(contactSchema)
    .optional()
});


export type FormSchema = z.infer<typeof formSchema>;
