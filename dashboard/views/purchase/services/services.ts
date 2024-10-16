import { ApiResponse, httpRequest } from '@/config/axios.config';
import { Master } from '@/views/types/master';


export const listSupplier = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplier`,
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
      `/supplycategory?destination=${destination}`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};



export const listSubCategory = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplysubcategory`,
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