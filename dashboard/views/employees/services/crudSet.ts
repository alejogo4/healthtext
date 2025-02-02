import { ApiResponse, httpRequest } from '@/config/axios.config';

export interface RequestCreateSet {
  set_name: string;
  shirt_variant_id: number;
  pant_variant_ids: number[];
}

export const ListSet = async () => {
  try {
    const data = await httpRequest<ApiResponse<RequestCreateSet[]>>(
      '/sets',
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const createSet = async (body: RequestCreateSet) => {
  try {
    const data = await httpRequest<ApiResponse<RequestCreateSet[]>>(
      '/sets',
      { ...body },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};
