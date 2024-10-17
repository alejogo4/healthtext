import { ApiResponse, fake_token, httpRequest, httpRequestServer } from '@/config/axios.config';

export interface CountryTypes {
  id: number;
  name: string;
}

export const fetchCountries = async () => {
  try {
    const data = await httpRequestServer<ApiResponse<CountryTypes[]>>('/country', undefined, 'GET');
    return data.data as CountryTypes[];
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return []
  }
};
