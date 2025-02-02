import { ApiResponse, httpRequest } from '@/config/axios.config';
import { BaseType } from '@/views/design/base/services/crudBase';

import { Master } from '@/views/types/master';
import { ItemVariantDetail } from '@/views/types/variants';

export interface VariantPayload {
  pattern_base_id: number;
  silhouette: Silhouette[];
  boot_type: BootType[];
  size_ids: number[];
  length_ids: number[];
  supply_line_id: number;
  has_zipper: boolean;
}

export interface VariantResponse {
  id: number;
  mold_path: any;
  technical_draw_path: any;
  special_draw_path: any;
  cut_layout_path: any;
  pattern_base_id: number;
  created_at: string;
  updated_at: string;
  supply_line_id: number;
  supply_line: SupplyLine;
  pattern_base: PatternBase;
  silhouettes: SilhouetteVariant[];
  sizes: Size[];
  lenghts: Lenght[];
  embroideries: any[];
  boot_types: any[];
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

export interface SilhouetteVariant {
  id: number;
  silhouette_id: number;
  garment_variant_id: number;
  technical_draw_path: any;
  special_draw_path: any;
  cut_layout_path: any;
  created_at: string;
  updated_at: string;
  has_zipper: boolean;
  silhouettes: Silhouettes;
  files: any[];
  selected?: boolean;
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

export interface Silhouette {
  silhouette_id: number;
  has_zipper: boolean;
}

export interface BootType {
  boot_type_id: number;
  has_zipper: boolean;
}

export interface EmbroideryRequest {
  embroidery_variant: EmbroideryVariant[];
}

export interface EmbroideryVariant {
  embroidery_id: number;
  garment_variant_id: number;
  description?: string;
}

export interface SilhouetteDrawRequest {
  silhouette_attachments: SilhouetteAttachment[];
}

export interface BootDrawRequest {
  boot_type_attachments: BootAttachment[];
}

export interface SilhouetteAttachment {
  silhouette_variant_id: number;
  attachments: Attachment[];
}

export interface BootAttachment {
  boot_type_variant_id: number;
  attachments: Attachment[];
}

export interface Attachment {
  name: string;
  technical_draw_base64?: string;
  extension: string;
  special_draw_base64?: string;
  cut_layout_base64?: string;
  technical_photo_base64?: string;
  commercial_photo_base64?: string;
  mold_base64?: string;
}

export interface MoldAttachmentVariantRequest {
  garment_variant_id: number;
  attachments: Attachment[];
}

export interface MeasurementRequest {
  sizes: SizeM[];
  lengths: Length[];
}

export interface SizeM {
  silhouettes_variant_id?: number;
  boot_type_variant_id?: number;
  garment_variant_id?: number;
  size_id: number;
  measurement_categories: MeasurementCategory[];
}

export interface MeasurementCategory {
  measurement_category_id: number;
  value: number;
}

export interface Length {
  silhouettes_variant_id: number;
  length_id: number;
  measurement_categories: MeasurementCategory[];
}

export const listVariant = async () => {
  try {
    const data = await httpRequest<ApiResponse<VariantResponse[]>>(
      '/variant',
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listBase = async () => {
  try {
    const data = await httpRequest<ApiResponse<BaseType[]>>(
      '/pattern-base',
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getSilhouette = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/silhouette',
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getBoot = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/boot-type',
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getLenght = async (category_base_id: number) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/length/by-category-id',
      {
        category_base_id
      },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getMeasurementCategory = async (category_base_id: number) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/measurement-category/by-category-id',
      {
        category_base_id
      },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getSizeCategory = async (category_base_id: number) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      'size/by-category-id',
      {
        category_base_id
      },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getLines = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/supplyline',
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getEmbroideries = async (category_base_id: number) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/embroidery/by-category-id',
      {
        category_base_id
      },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const saveBaseVariant = async (body: VariantPayload) => {
  try {
    const data = await httpRequest<ApiResponse<VariantResponse>>(
      '/variant',
      { ...body },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};

export const saveEmbroidery = async (body: EmbroideryRequest) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/embroideries-variant',
      { ...body },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const saveFilesVariant = async (body: MoldAttachmentVariantRequest) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/variant/add-attachment',
      { ...body },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const saveDrawSilhouette = async (body: SilhouetteDrawRequest) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/silhouette-variant/add-attachment',
      { ...body },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const saveDrawBoot = async (body: BootDrawRequest) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/boot-type-variant/add-attachment',
      { ...body },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getDetailVariant = async (variant_id: number) => {
  try {
    const data = await httpRequest<ApiResponse<ItemVariantDetail>>(
      `/variant/${variant_id}`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};

export const saveMeasurement = async (
  body: MeasurementRequest,
  type: string
) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/measurement',
      { ...body, type },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};
