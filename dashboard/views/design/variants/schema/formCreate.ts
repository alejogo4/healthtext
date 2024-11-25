import { z } from 'zod';

// Esquema de validación para el formulario principal
export const formSchema = z.object({
  base_id: z.any().optional(),

  typeConfig: z.array(z.any()).optional(),
  typeConfigServices: z.array(z.any()).optional(),
  typeLenght: z.array(z.any()).optional(),
  typeSize: z.array(z.any()).optional(),
  measurementCategory: z.array(z.any()).optional(),
  embroideries: z.array(z.any()).optional(),
  line_id: z.any().optional(),
  variant_id: z.any().optional(),
  //OnlyUtil
  category_bases_code: z.any().optional(),
  category_base_id: z.any().optional(),
  mold_file: z.any().optional()
});

export type FormSchema = z.infer<typeof formSchema>;
