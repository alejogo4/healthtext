import { ApiResponse, httpRequest } from '@/config/axios.config';
import { Master } from '@/views/types/master';

export interface LongType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  category_base_id: number;
  category_bases: CategoryBases;
}

export interface CategoryBases {
  id: number;
  name: string;
  packing_instructions?: string;
  packing_photo?: string;
  created_at?: string;
  updated_at?: string;
  code: string;
}

export const createLong = async (name: string, idCategory: string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/length',
      { name, category_base_id: idCategory },
      'POST'
    );

    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { status: false, message: 'Error al obtener datos' };
  }
};

export const listLong = async () => {
  try {
    const data = await httpRequest<ApiResponse<LongType[]>>(
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

export const deleteLong = async (id: string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      `/length/${id}`,
      undefined,
      'DELETE'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { status: false, message: 'Error al obtener datos' };
  }
};
