import { ApiResponse, httpRequest } from '@/config/axios.config';
import { Master } from '@/views/types/master';

export interface SupplySizeCost {
  supply_size_variants?: SupplySizeVariant[]
  bias_variants?: SupplySizeVariant[]
  seam_variants?: SupplySizeVariant[]
  cloth_variants?: SupplySizeVariant[]
}

export interface SupplySizeVariant {
  supply_id: number
  proccess_id: number
  size_variant_id?: number
  boot_type_variant_id?: number
  silhouette_variant_id: any
  quantity: number
  price: number
}


export const saveSupplyCost = async (body: SupplySizeCost) => {
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

export const saveBiaCost = async (body: SupplySizeCost) => {
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

export const saveSeamCost = async (body: SupplySizeCost) => {
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

export const saveClothCost = async (body: SupplySizeCost) => {
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

export const getSupplyTypes = async (type:string) => {
    try {
      const data = await httpRequest<ApiResponse<Master[]>>(
        `supplytype?type=${type}`,
        undefined,
        'GET'
      );
      return data.data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return [];
    }
};
