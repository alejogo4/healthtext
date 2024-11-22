import { ApiResponse, httpRequest } from '@/config/axios.config';
import { BaseType } from '../../base/services/crudBase';
import { Master } from '@/views/types/master';




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

export const getLenght = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      '/length',
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getSizeCategory = async (category_base_id:number) => {
  console.log(category_base_id);
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      'size/by-category-id',
      {
        category_base_id
      },
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};



