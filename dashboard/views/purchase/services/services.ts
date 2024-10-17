import { ApiResponse, httpRequest } from '@/config/axios.config';
import { Master } from '@/views/types/master';

export interface SearchSuppliesI {
  supplier_id: string | number
  supply_type_id: string | number
  supply_category_id: string | number
  supply_subcategory_id: string | number
  supply_line_id: string | number
  supply_color_id: string | number
}

export interface ListSuppliesI {
  supply_type: string
  supply_category: string
  supply_subcategory: string
  supply_line: string
  supply_unit_of_measure: string
  width: number
  heigth: number
  supply_inventory_id: number
  supply_color_supplier: string
  cloth_color_supplier: string
  supply_color: string
  supply_code: string
  quantity: number
  last_price: number
  observation: string
  supply_inventory_storage: string
}


export const listSupplier = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplierlist`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listTypeSupply = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplytype`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listCategory = async (destination: string) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplycategorylist/${destination}`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listSubCategory = async (destination: string) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplysubcategorylist/${destination}`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listLinea = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplyline`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listColor = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplycolor`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listColorCloth = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supply/listclothcolor`,
      body,
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listColorSupplier = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supply/listcolorsupplier`,
      body,
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};


export const searchSupplies = async (body: SearchSuppliesI) => {
  try {
    const data = await httpRequest<ApiResponse<ListSuppliesI[]>>(
      `/supply/listsuppliesbysupplier`,
      body,
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};
