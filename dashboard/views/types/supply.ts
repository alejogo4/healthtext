type SupplyData = {
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


type Inventory = {
  id: number;
  supply_id: number;
  supply_color_supplier_id: number | null;
  cloth_color_supplier_id: number | null;
  supply_color_id: number;
  supply_inventory_storage_id: number;
  supply_code: string;
  quantity: number;
  last_price: number;
  unit_value: number;
  observation: string | null;
  created_at: string;
  updated_at: string;
};

type SupplyType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
  type: number;
};

type SupplyCategory = {
  id: number;
  name: string;
  destination: string;
  created_at: string;
  updated_at: string | null;
};

type SupplySubcategory = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
};

type SupplyPresentation = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
};

type SupplyLine = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
};

type SupplyUnitOfMeasure = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
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
  type_service: string; // Consider parsing JSON strings to arrays if necessary
  type_third_parties: string; // Same as above
  is_self_retaining: number;
  nationality: string;
  url_website: string | null;
  url_facebook: string | null;
  url_twitter: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};

export type Supply = {
  id: number;
  supply_type_id: number;
  supply_category_id: number;
  supply_subcategory_id: number;
  supply_presentation_id: number;
  supply_line_id: number;
  supply_unit_of_measure_id: number;
  supplier_id: number;
  width: number;
  heigth: number;
  path_photo: string;
  created_at: string;
  updated_at: string;
  iva: number;
  supply_type: SupplyType;
  supply_category: SupplyCategory;
  supply_subcategory: SupplySubcategory;
  supply_presentation: SupplyPresentation;
  supply_line: SupplyLine;
  supply_unit_of_measure: SupplyUnitOfMeasure;
  supplier: Supplier;
  inventories: Inventory[];
};


export const mapFormToSupplyCreate = (formData: any): SupplyData => {
  const {
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

  const mappedInventories: InventoryData[] = inventories.map((inventory: any) => ({
    supply_id: inventory.supply_id,
    supply_color_supplier_id: inventory.supply_color_supplier_id,
    cloth_color_supplier_id: inventory.cloth_color_supplier_id,
    supply_color_id: inventory.supply_color_id,
    supply_code: inventory.supply_code,
    quantity: inventory.quantity,
    last_price: inventory.last_price,
    unit_value: inventory.unit_value,
    observation: inventory.observation,
    supply_inventory_storage_id: supply_inventory_storage_id?.value,
  }));

  return {
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
