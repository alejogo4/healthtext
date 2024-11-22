import { z } from 'zod';

// Esquema de validación para el formulario principal
export const formSchema = z.object({
  base_id: z.any(),
  
  typeConf: z.array(
    z.any()
  ),
  //OnlyUtil
  type_base: z.any(),
  type_base_id: z.any(),
});

export type FormSchema = z.infer<typeof formSchema>;
