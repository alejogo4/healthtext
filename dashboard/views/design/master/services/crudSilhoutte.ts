import { ApiResponse, httpRequest } from '@/config/axios.config';
import { Master } from '@/views/types/master';

export const createSilhoutte = async (name: string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/silhouette',
      { name },
      'POST'
    );

    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { status: false, message: 'Error al obtener datos' };
  }
};

export const listSilhoutte = async () => {
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

export const deleteSilhoutte = async (id: string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      `/silhouette/${id}`,
      undefined,
      'DELETE'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { status: false, message: 'Error al obtener datos' };
  }
};
