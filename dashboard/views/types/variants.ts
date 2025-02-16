export interface ItemVariantDetail {
  id: number;
  technical_photo_path: any;
  commercial_photo_path: any;
  has_zipper: any;
  photoBiaVariant: PhotoVariant[];
  photoSeamsVariant: PhotoVariant[];
  photoClothVariant: PhotoVariant[];
  photo_bia_variant: PhotoVariantDetail[];
  photo_seams_variant: PhotoVariantDetail[];
  photo_cloth_variant: PhotoVariantDetail[];
  mold_path: string;
  technical_draw_path: any;
  special_draw_path: any;
  cut_layout_path: any;
  pattern_base_id: number;
  created_at: string;
  updated_at: string;
  supply_line_id: number;
  supply_line: SupplyLine;
  pattern_base: PatternBase;
  silhouettes: Silhouette[];
  sizes: Size[];
  lenghts: Lenght[];
  embroideries: Embroidery[];
  boot_types: BootType[];
}

export interface PhotoVariant {
  id: number
  supply_inventory_id: number
  garment_variant_id: number
  silhouettes_variant_id: number
  boot_type_variant_id: any
  path?: string
  created_at: string
  updated_at: string
  supply: Supply
}

export interface PhotoVariantDetail {
  id: number
  supply_inventory_id: number
  garment_variant_id: number
  silhouettes_variant_id: number
  boot_type_variant_id: any
  path: string
  created_at: string
  updated_at: string
}

export interface Supply {
  supply_type: string
  supply_category: string
  supply_subcategory: string
  supply_line: string
  supply_unit_of_measure: string
  width: number
  heigth: number
  supply_inventory_id: number
  supply_color_supplier: any
  cloth_color_supplier: any
  supply_color: string
  supply_code: string
  quantity: number
  last_price: number
  observation: any
}



export interface BootType {
  id: number;
  boot_type_id: number;
  garment_variant_id: number;
  technical_draw_path: any;
  special_draw_path: any;
  cut_layout_path: any;
  created_at: string;
  updated_at: string;
  has_zipper: number;
  boot_type: BootType2;
}

export interface BootType2 {
  id: number;
  name: string;
  created_at: any;
  updated_at: any;
}

export interface SupplyLine {
  id: number;
  name: string;
  created_at: string;
  updated_at: any;
}

export interface PatternBase {
  id: number;
  name: string;
  description: string;
  gender_type_id: number;
  category_base_id: number;
  created_at: string;
  updated_at: string;
  category_bases: CategoryBases;
}

export interface CategoryBases {
  id: number;
  name: string;
  packing_instructions: string;
  packing_photo: string;
  created_at: string;
  updated_at: string;
  code: string;
}

export interface Silhouette {
  id: number;
  silhouette_id: number;
  garment_variant_id: number;
  technical_draw_path: string;
  special_draw_path: string;
  cut_layout_path: string;
  created_at: string;
  updated_at: string;
  has_zipper: number;
  silhouettes: Silhouettes;
}

export interface Silhouettes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Size {
  id: number;
  size_id: number;
  garment_variant_id: number;
  created_at: string;
  updated_at: string;
  sizes: Sizes;
}

export interface Sizes {
  id: number;
  name: string;
  group: string;
  category_base_id: number;
  created_at: string;
  updated_at: string;
}

export interface Lenght {
  id: number;
  length_id: number;
  garment_variant_id: number;
  created_at: string;
  updated_at: string;
  length: any;
}

export interface Embroidery {
  id: number;
  embroidery_id: number;
  garment_variant_id: number;
  description: string;
  created_at: string;
  updated_at: string;
  embroidery: Embroidery2;
}

export interface Embroidery2 {
  id: number;
  name: string;
  category_base_id: number;
  created_at: any;
  updated_at: any;
}
