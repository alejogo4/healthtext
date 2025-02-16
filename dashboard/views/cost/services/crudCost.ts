import { ApiResponse, httpRequest } from '@/config/axios.config';
import { Master } from '@/views/types/master';

export interface SupplySize {
  supply_size_variants: SupplySizeVariant[];
}

export interface BiasSize {
  bias_variants: SupplySizeVariant[];
}

export interface SeamSize {
  seam_variants: SupplySizeVariant[];
}

export interface ClothSize {
  cloth_variants: SupplySizeVariant[];
}

export interface SupplySizeVariant {
  supply_id: number;
  proccess_id?: number;
  size_variant_id?: number;
  boot_type_variant_id?: number;
  silhouette_variant_id: any;
  quantity: number;
  price: number;
}

export interface Size {
  id: number;
  size_id: number;
  name: string;
  supplies: Supplies[];
}

export interface Supplies {
  supply_id: number;
  supply_name: string;
  proccess_id?: number;
  boot_type_variant_id?: number;
  silhouette_variant_id?: any;
  quantity: number;
  price: number;
}

export const getProcess = async (type: string) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `process`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const saveBiaSize = async (body: BiasSize) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/bias-variant',
      { ...body },
      'POST'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};

export const saveSeamSize = async (body: SeamSize) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/seam-variant',
      { ...body },
      'POST'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};

export const saveClothSize = async (body: ClothSize) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/cloth-variant',
      { ...body },
      'POST'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};

export const saveSupplySize = async (body: SupplySize) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/supply-size-variant',
      { ...body },
      'POST'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};
