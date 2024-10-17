import { ApiResponse, httpRequest } from '@/config/axios.config';

export interface ResponseLocation {
  id: number;
  name: string;
}

export const listStates = async (stateId: string) => {
  try {
    const data = await httpRequest<ApiResponse<ResponseLocation[]>>(
      `/state/${stateId}`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listCities = async (cityId: string) => {
    try {
      const data = await httpRequest<ApiResponse<ResponseLocation[]>>(
        `/cities/${cityId}`,
        undefined,
        'GET'
      );
      return data.data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return [];
    }
  };
