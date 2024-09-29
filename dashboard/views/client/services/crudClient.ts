import { ApiResponse, fake_token, httpRequest } from '@/config/axios.config';
import { ClientCreate } from '@/views/types/client';

export const createClient = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/client',
      body,
      'POST',
      fake_token
    );
    console.log(data);
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listClient = async () => {
  try {
    const data = await httpRequest<ApiResponse<ClientCreate[]>>(
      '/client',
      undefined,
      'GET',
      fake_token
    );
    console.log(data);
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};
