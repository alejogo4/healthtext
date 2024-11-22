import { ApiResponse, httpRequest } from '@/config/axios.config';
import { Master } from '@/views/types/master';

export const createBootType = async (name: string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/boot-type',
      { name },
      'POST'
    );

    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { status: false, message: 'Error al obtener datos' };
  }
};

export const listBootType = async () => {
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

export const deleteBootType = async (id: string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      `/boot-type/${id}`,
      undefined,
      'DELETE'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { status: false, message: 'Error al obtener datos' };
  }
};
