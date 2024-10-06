import { httpRequest } from '@/config/axios.config';

export interface PersonTypes {
  id: number;
  name: string;
  created_at: null;
  updated_at: null;
}

export interface LoginResponse {
  access_token: string;
  token_type:   string;
  expires_in:   number;
}

export interface Login {
  email:    string;
  password: string;
}



export const loginService = async (data:Login): Promise<LoginResponse | null> => {
  try {
    const response = await httpRequest<LoginResponse, Login>('/login', data, 'POST');
    return response;
  } catch (error) {
    console.error('Error Login:', error);
    return null
  }
};
