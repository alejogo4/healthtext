type SupplyData = {
  quantity_by_presentation: number;
  supply_type_id: number;
  supply_category_id: number;
  supply_subcategory_id: number;
  supply_presentation_id: number;
  supply_line_id: number;
  supply_unit_of_measure_id: number;
  supplier_id: number;
  width: number;
  heigth: number;
  iva: number;
  inventories: InventoryData[];
  base64: string;
};

type InventoryData = {
  supply_id: number;
  supply_color_supplier_id: number;
  cloth_color_supplier_id: number;
  supply_color_id: number;
  supply_code: number;
  quantity: number;
  last_price: number;
  unit_value: number;
  observation: string;
  supply_inventory_storage_id: number;
};

type Supplier = {
  id: number;
  person_type_id: number;
  document_type_id: number;
  document_number: string;
  name: string;
  country: string;
  department: string;
  city: string;
  neighborhood: string | null;
  postal_code: string;
  full_address: string;
  registered_simple_tax_regime: number;
  big_contributor: number;
  vat_responsible: number;
  reteiva_not_registered_simple_regimen: number;
  reteiva_registered_simple_regimen: number;
  cause_retefuente_for_income_tax: number;
  cause_retefuente_for_ica: number;
  tax_regime: string;
  type_account: string;
  account_number: string;
  bank: string;
  payment_option: string;
  invoice_deadline: string;
  type_service: string;
  type_third_parties: string;
  is_self_retaining: number;
  nationality: string;
  url_website: string | null;
  url_facebook: string | null;
  url_twitter: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type SupplyDetails = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
};

type ColorSupplier = {
  id: number;
  name: string;
  supply_color_id: number;
  suppliers_id: number;
  supply_categories_id?: number;
  supply_types_id?: number;
  created_at: string;
  updated_at: string;
  code: string | null;
};

export type Inventory = {
  id: number;
  supply_id: number;
  supply_color_supplier_id: number | null;
  cloth_color_supplier_id: number | null;
  supply_color_id: number;
  supply_inventory_storage_id: number;
  supply_code: string;
  quantity: number;
  observation: string | null;
  created_at: string;
  updated_at: string;
  real_price: number;
  commercial_price: number;
  supply_color: SupplyDetails;
  supply_inventory_storage: SupplyDetails;
  supply_color_supplier: ColorSupplier | null;
  cloth_color_supplier: ColorSupplier | null;
};

export type Supply = {
  id: number;
  quantity_by_presentation: number;
  supply_type_id: number;
  supply_category_id: number;
  supply_subcategory_id: number | null;
  supply_presentation_id: number;
  supply_line_id: number;
  supply_unit_of_measure_id: number;
  supplier_id: number;
  width: number;
  heigth: number;
  path_photo: string | null;
  created_at: string;
  updated_at: string;
  iva: number;
  supply_type: SupplyDetails;
  supply_category: SupplyDetails;
  supply_subcategory: SupplyDetails | null;
  supply_presentation: SupplyDetails;
  supply_line: SupplyDetails;
  supply_unit_of_measure: SupplyDetails;
  supplier: Supplier;
  inventories: Inventory[];
};

export const mapFormToSupplyCreate = (formData: any): SupplyData => {
  const {
    quantity_by_presentation,
    supply_type_id,
    supply_category_id,
    supply_subcategory_id,
    supply_presentation_id,
    supply_line_id,
    supply_unit_of_measure_id,
    supply_inventory_storage_id,
    supplier_id,
    width,
    heigth,
    iva,
    inventories,
    base64,
  } = formData;

  const mappedInventories: InventoryData[] = inventories.map(
    (inventory: any) => ({
      supply_id: inventory.supply_id,
      supply_color_supplier_id: inventory.supply_color_supplier_id,
      cloth_color_supplier_id: inventory.cloth_color_supplier_id,
      supply_color_id: inventory.supply_color_id,
      supply_code: inventory.supply_code,
      quantity: inventory.quantity,
      real_price: inventory.real_price,
      commercial_price: inventory.commercial_price,
      observation: inventory.observation,
      supply_inventory_storage_id: supply_inventory_storage_id?.value,
    })
  );

  return {
    quantity_by_presentation: Number(quantity_by_presentation),
    supply_type_id: Number(supply_type_id?.value),
    supply_category_id: Number(supply_category_id?.value),
    supply_subcategory_id: Number(supply_subcategory_id?.value),
    supply_presentation_id: Number(supply_presentation_id?.value),
    supply_line_id: Number(supply_line_id?.value),
    supply_unit_of_measure_id: Number(supply_unit_of_measure_id?.value),
    supplier_id: Number(supplier_id?.value),
    width: Number(width),
    heigth: Number(heigth),
    iva: Number(iva),
    inventories: mappedInventories,
    base64,
  };
};
