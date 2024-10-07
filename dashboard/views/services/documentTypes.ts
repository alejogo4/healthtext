import { ApiResponse, fake_token, httpRequest, httpRequestServer } from '@/config/axios.config';

export interface DocumentTypes {
  id: number;
  name: string;
  created_at: null;
  updated_at: null;
}

export const fetchDocumentTypes = async () => {
  try {
    const data = await httpRequestServer<ApiResponse<DocumentTypes[]>>('/documenttype', undefined, 'GET');
    return data.data as DocumentTypes[];
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return []
  }
};
