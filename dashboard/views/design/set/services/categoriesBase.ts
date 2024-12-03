import { ApiResponse, httpRequestServer } from '@/config/axios.config';

export interface CategoryResponse {
  category_id: number;
  category_name: string;
  base_id: number;
  base_name: string;
  gender: string;
  variant_id: number;
}

export const fetchVariantsCategory = async (id: string) => {
  try {
    const data = await httpRequestServer<ApiResponse<CategoryResponse[]>>(
      `/variant/category-by/${id}`,
      undefined,
      'GET'
    );
    return data.data as CategoryResponse[];
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};
