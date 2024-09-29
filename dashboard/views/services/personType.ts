import { ApiResponse, fake_token, httpRequest } from '@/config/axios.config';

export interface PersonTypes {
  id: number;
  name: string;
  created_at: null;
  updated_at: null;
}

export const fetchPersonTypes = async () => {
  try {
    const data = await httpRequest<ApiResponse<PersonTypes[]>>('/persontype', undefined, 'GET', fake_token);
    return data.data as PersonTypes[];
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return []
  }
};
