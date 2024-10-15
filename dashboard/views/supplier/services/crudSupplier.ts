import { ApiResponse, fake_token, httpRequest } from '@/config/axios.config';
import { SupplierCreate } from '@/views/types/supplier';

export const createSupplier = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/supplier',
      body,
      'POST'
    );
    console.log(data);
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listSupplier = async () => {
  try {
    const data = await httpRequest<ApiResponse<SupplierCreate[]>>(
      '/supplier',
      undefined,
      'GET'
    );
    console.log(data);
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};
