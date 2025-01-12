import { z } from "zod";

export const schema = z.object({
  supply_type_id: z.object({ value: z.string(), label: z.string() }).required(),
  supply_category_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supply_subcategory_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supply_presentation_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supply_line_id: z.object({ value: z.string(), label: z.string() }).required(),
  supply_unit_of_measure_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supplier_id: z.object({ value: z.string(), label: z.string() }).required(),
  supply_inventory_storage_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  base64: z.any().optional(),
  iva: z.preprocess((value: any) => Number(value), z.number()),
  observation: z.string().optional(),
});

export const schemaCloth = z.object({
  supply_type_id: z.object({ value: z.string(), label: z.string() }).required(),
  supply_category_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supply_presentation_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supply_line_id: z.object({ value: z.string(), label: z.string() }).required(),
  supply_unit_of_measure_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  supplier_id: z.object({ value: z.string(), label: z.string() }).required(),
  supply_inventory_storage_id: z
    .object({ value: z.string(), label: z.string() })
    .required(),
  base64: z.any().optional(),
  iva: z.preprocess((value: any) => Number(value), z.number()),
  width: z.preprocess((value: any) => Number(value), z.number()),
  heigth: z.preprocess((value: any) => Number(value), z.number()),
  observation: z.string().optional(),
});

export type FormSchema = z.infer<typeof schema>;
export type FormSchemaCloth = z.infer<typeof schemaCloth>;
