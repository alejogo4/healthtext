import { ApiResponse, httpRequest } from '@/config/axios.config';

export interface MinuteType {
  id: string;
  real: string;
  comercial: string;
}

export const createMinuteValue = async (real: string, comercial:string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/minute-value',
      { real, commercial:comercial },
      'POST'
    );

    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { status: false, message: 'Error al obtener datos' };
  }
};

export const listMinuteValue = async () => {
  try {
    const data = await httpRequest<ApiResponse<MinuteType[]>>(
      '/minute-value',
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const deleteMinuteValue = async (id: string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      `/minute-value/${id}`,
      undefined,
      'DELETE'
    );
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return { status: false, message: 'Error al obtener datos' };
  }
};
