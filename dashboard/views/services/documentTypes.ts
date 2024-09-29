import { ApiResponse, fake_token, httpRequest } from '@/config/axios.config';

export interface DocumentTypes {
  id: number;
  name: string;
  created_at: null;
  updated_at: null;
}

export const fetchDocumentTypes = async () => {
  try {
    const data = await httpRequest<ApiResponse<DocumentTypes[]>>('/documenttype', undefined, 'GET', fake_token);
    console.log(data);
    return data.data as DocumentTypes[];
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return []
  }
};
