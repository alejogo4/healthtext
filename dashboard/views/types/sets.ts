export interface SetList {
  id: number;
  name: string;
  garment_variant_id: number;
  created_at: string;
  updated_at: string;
  garment_variant: GarmentVariant;
  pant_set: any[];
}

export interface GarmentVariant {
  id: number;
  mold_path: any;
  technical_draw_path: any;
  special_draw_path: any;
  cut_layout_path: any;
  pattern_base_id: number;
  created_at: string;
  updated_at: string;
  supply_line_id: number;
  technical_photo_path: any;
  commercial_photo_path: any;
  has_zipper: any;
  supply_line: SupplyLine;
  pattern_base: PatternBase;
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
  gender_types: GenderTypes;
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

export interface GenderTypes {
  id: number;
  name: string;
  created_at: any;
  updated_at: any;
}
