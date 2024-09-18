import * as z from 'zod';

export const supplierSchema = [
    // Paso 0: Datos Básicos
    // z.object({
    //   type_supplier: z.string().min(1, "Tipo de proveedor es obligatorio."),
    //   document_number: z.string().min(1, "NIT/Documento es obligatorio."),
    //   name: z.string().min(1, "Nombre/Razón Social es obligatorio."),
    // }),
    // // Paso 1: Dirección
    // z.object({
    //   country: z.string().min(1, "País es obligatorio."),
    //   department: z.string().min(1, "Departamento es obligatorio."),
    //   city: z.string().min(1, "Ciudad es obligatorio."),
    //   postal_code: z.string().min(1, "Código Postal es obligatorio."),
    //   address: z.string().min(1, "Dirección Empresa es obligatoria."),
    // }),
    // // Paso 2: Datos Fiscales
    // z.object({
    //   tax_regime: z.string().min(1, "Régimen Tributario es obligatorio."),
    //   bank_details: z.string().min(1, "Datos Bancarios son obligatorios."),
    // }),
    // // Paso 3: Contactos
    // z.object({
    //   contact_name: z.string().min(1, "Nombre es obligatorio."),
    //   contact_email: z.string().email("Correo no es válido."),
    //   contact_phone: z.string().min(1, "Teléfono es obligatorio."),
    // }),
  ];

