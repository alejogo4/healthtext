import { ApiResponse, httpRequest } from '@/config/axios.config';
import { Master } from '@/views/types/master';

export const createLong = async (name: string, group: string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/length',
      { name, group },
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
