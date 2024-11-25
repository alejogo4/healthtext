
  export interface ItemVariantDetail {
    id: number
    mold_path: string
    technical_draw_path: any
    special_draw_path: any
    cut_layout_path: any
    pattern_base_id: number
    created_at: string
    updated_at: string
    supply_line_id: number
    supply_line: SupplyLine
    pattern_base: PatternBase
    silhouettes: Silhouette[]
    sizes: Size[]
    lenghts: Lenght[]
    embroideries: Embroidery[]
    boot_types: any[]
  }
  
  export interface SupplyLine {
    id: number
    name: string
    created_at: string
    updated_at: any
  }
  
  export interface PatternBase {
    id: number
    name: string
    description: string
    gender_type_id: number
    category_base_id: number
    created_at: string
    updated_at: string
    category_bases: CategoryBases
  }
  
  export interface CategoryBases {
    id: number
    name: string
    packing_instructions: string
    packing_photo: string
    created_at: string
    updated_at: string
    code: string
  }
  
  export interface Silhouette {
    id: number
    silhouette_id: number
    garment_variant_id: number
    technical_draw_path: string
    special_draw_path: string
    cut_layout_path: string
    created_at: string
    updated_at: string
    has_zipper: number
    silhouettes: Silhouettes
  }
  
  export interface Silhouettes {
    id: number
    name: string
    created_at: string
    updated_at: string
  }
  
  export interface Size {
    id: number
    size_id: number
    garment_variant_id: number
    created_at: string
    updated_at: string
    sizes: Sizes
  }
  
  export interface Sizes {
    id: number
    name: string
    group: string
    category_base_id: number
    created_at: string
    updated_at: string
  }
  
  export interface Lenght {
    id: number
    length_id: number
    garment_variant_id: number
    created_at: string
    updated_at: string
    length: any
  }
  
  export interface Embroidery {
    id: number
    embroidery_id: number
    garment_variant_id: number
    description: string
    created_at: string
    updated_at: string
    embroidery: Embroidery2
  }
  
  export interface Embroidery2 {
    id: number
    name: string
    category_base_id: number
    created_at: any
    updated_at: any
  }
  