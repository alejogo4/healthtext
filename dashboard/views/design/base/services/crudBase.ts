import { ApiResponse, fake_token, httpRequest, httpRequestServer } from '@/config/axios.config';


export interface BaseType {
  id: number
  name: string
  description: string
  gender_type_id: number
  category_base_id: number
  created_at: string
  updated_at: string
  gender_types: GenderTypes
  category_bases: CategoryBases
}

export interface GenderTypes {
  id: number
  name: string
  created_at: any
  updated_at: any
}

export interface CategoryBases {
  id: number
  name: string
  packing_instructions: string
  packing_photo: string
  created_at: string
  updated_at: string
  code: any
}


export const createBase = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/pattern-base',
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

export const listBaseClient = async () => {
  try {
    const data = await httpRequest<ApiResponse<BaseType[]>>(
      '/pattern-base',
      undefined,
      'GET'
    );
    return data.data as BaseType[];
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listBase = async () => {
  try {
    const data = await httpRequestServer<ApiResponse<BaseType[]>>(
      '/pattern-base',
      undefined,
      'GET'
    );
    return data.data as BaseType[];
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};


