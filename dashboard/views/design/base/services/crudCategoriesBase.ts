import { ApiResponse, httpRequest } from '@/config/axios.config';
import { CategoryBase } from './categoriesBase';


export const listBaseCategory = async () => {
  try {
    const data = await httpRequest<ApiResponse<CategoryBase[]>>(
      '/category-base',
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const deleteBaseCategory = async (id: string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      `/category-base/${id}`,
      undefined,
      'DELETE'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { status: false, message: 'Error al obtener datos' };
  }
};

export const editBaseCategory = async (body: CategoryBase) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      `/category-base/${body.id}`,
      {...body},
      'PUT'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { status: false, message: 'Error al obtener datos' };
  }
};
