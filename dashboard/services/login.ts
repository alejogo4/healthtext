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

export interface Profile {
  id: number
  name: string
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
  deleted_at: any
}


export interface Login {
  email:    string;
  password: string;
}

const baseURL = process.env.NEXT_PUBLIC_SITE_URL + "/api";

export const loginService = async (data:Login): Promise<LoginResponse | null> => {
  try {
    const response = await httpRequest<LoginResponse, Login>('/login', data, 'POST');
    return response;
  } catch (error) {
    console.error('Error Login:', error);
    return null
  }
};


export const getProfile = async (token: string): Promise<Profile | null> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`); 

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

  
    const response = await fetch(`${baseURL}/me`, requestOptions);

   
    if (!response.ok) {
      console.error(`Error HTTP: ${response.status} - ${response.statusText}`);
      return null;
    }

    const result: Profile = await response.json();
    return result;
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    return null;
  }
};

