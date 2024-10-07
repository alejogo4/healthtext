import { ApiResponse, httpRequestServer } from '@/config/axios.config';

export interface PersonTypes {
  id: number;
  name: string;
  created_at: null;
  updated_at: null;
}

export const fetchPersonTypes = async () => {
  try {
    const data = await httpRequestServer<ApiResponse<PersonTypes[]>>('/persontype', undefined, 'GET');
    return data.data as PersonTypes[];
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return []
  }
};
