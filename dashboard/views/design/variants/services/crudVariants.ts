import { ApiResponse, httpRequest } from '@/config/axios.config';
import { BaseType } from '../../base/services/crudBase';
import { Master } from '@/views/types/master';

export interface VariantPayload {
  pattern_base_id: number;
  silhouette: Silhouette[];
  boot_type: BootType[];
  size_ids: number[];
  length_ids: number[];
  supply_line_id: number;
}

export interface VariantResponse {
  id: number
  mold_path: any
  technical_draw_path: any
  special_draw_path: any
  cut_layout_path: any
  pattern_base_id: number
  created_at: string
  updated_at: string
  supply_line_id: number
  silhouettes: Silhouette[]
  sizes: Size[]
  lenghts: Lenght[]
  embroideries: any[]
  boot_types: any[]
}

export interface Silhouette {
  id: number
  silhouette_id: number
  garment_variant_id: number
  technical_draw_path: any
  special_draw_path: any
  cut_layout_path: any
  created_at: string
  updated_at: string
  has_zipper: boolean
}

export interface Size {
  id: number
  size_id: number
  garment_variant_id: number
  created_at: string
  updated_at: string
}

export interface Lenght {
  id: number
  length_id: number
  garment_variant_id: number
  created_at: string
  updated_at: string
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
