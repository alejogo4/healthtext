import { ApiResponse, httpRequest } from '@/config/axios.config';
import { Master } from '@/views/types/master';

export interface ListSuppliesI {
  supply_type: string;
  supply_category: string;
  supply_subcategory: string;
  supply_line: string;
  supply_unit_of_measure: string;
  width: number;
  heigth: number;
  supply_inventory_id: number;
  supply_color_supplier: string;
  cloth_color_supplier: string;
  supply_color: string;
  supply_code: string;
  quantity: number;
  last_price: number;
  observation: string;
  supply_inventory_storage: string;
  photoBase64?: string;
  extension?:string;
}

export interface ClothPhoto {
  supply_inventory_id: number;
  silhouettes?: Silhouette[];
  boot_types?: BootType[];
  others?: Other[];
}

export interface Silhouette {
  garment_variant_id: number;
  silhouettes_variant_id: number;
  photoBase64: string;
  extension: string;
}

export interface BootType {
  boot_type_variant_id: number;
  photoBase64: string;
  extension: string;
}

export interface Other {
  garment_variant_id: number;
  photoBase64: string;
  extension: string;
}


export interface Insumo {
  id: string; 
  name: string; 
  color: string;
  photoBase64?: string;
  extension?:string;
}

export interface Variant {
  id: string; 
  garment_variant_id: string;
  name: string; 
  insumos: Insumo[] | []; 
}

export const saveClothPhoto = async (body: ClothPhoto) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/photo-variants-cloth',
      { ...body },
      'POST'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};

export const saveBiaPhoto = async (body: ClothPhoto) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/photo-variants-bia',
      { ...body },
      'POST'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};

export const saveSeamPhoto = async (body: ClothPhoto) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/photo-variants-seam',
      { ...body },
      'POST'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return null;
  }
};

export const getSupplyTypes = async (type: string) => {
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

const convertToClothPhoto = (
  supply: ListSuppliesI,
  options: {
    silhouettes?: Silhouette[];
    boot_types?: BootType[];
    others?: Other[];
  }
): ClothPhoto => {
  return {
    supply_inventory_id: supply.supply_inventory_id,
    silhouettes: options.silhouettes || [],
    boot_types: options.boot_types || [],
    others: options.others || []
  };
};
