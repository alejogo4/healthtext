import { ApiResponse, httpRequestServer } from '@/config/axios.config';

export interface CategoryBase {
  id: string;
  name: string;
  packing_instructions: string;
  packing_photo: string;
  extension: string;
}

export const fetchCategoriesBase = async () => {
  try {
    const data = await httpRequestServer<ApiResponse<CategoryBase[]>>('/category-base', undefined, 'GET');
    return data.data as CategoryBase[];
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return []
  }
};
