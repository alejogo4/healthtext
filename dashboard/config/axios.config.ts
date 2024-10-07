import { authOptions } from "@/lib/auth";
import axios, { AxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth/next";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL + "/api";
const authUrl = process.env.NEXT_PUBLIC_URL

export const api = axios.create({
  baseURL,
});


/**
 * Función utilitaria para hacer peticiones HTTP.
 *
 * @param {string} url - La URL de la solicitud (ruta específica).
 * @param {TData} [data] - Datos a enviar con la solicitud (para métodos como POST, PUT, etc.).
 * @param {AxiosRequestConfig['method']} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {string} [token] - Token de autorización para rutas protegidas (opcional).
 * @returns {Promise<TResponse>} - Promesa que se resuelve con la respuesta de la solicitud.
 */
export const httpRequest = async <TResponse, TData = undefined>(
  url: string,
  data?: TData,
  method: AxiosRequestConfig['method'] = 'GET',
  token?: string
): Promise<TResponse> => {  

  const authSession = await fetch(`${authUrl}/api/auth/session`);


  const authJson = await authSession.json();
  const headers = authJson && authJson.accessToken ? { Authorization: `Bearer ${authJson?.accessToken}` } : {};


  try {
    const response = await api({
      url,
      method,
      data,
      headers,
    });

    return response.data as TResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado
      // que cae fuera del rango de 2xx
      console.error('Error en la respuesta del servidor:', error.response.data);
      throw new Error(error.response.data.message || 'Error en la solicitud');
    } else if (axios.isAxiosError(error) && error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      console.error('Error en la solicitud:', error.request);
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Algo pasó al configurar la solicitud
      console.error('Error:', error);
      throw new Error('Error en la configuración de la solicitud');
    }
  }
};



export const httpRequestServer = async <TResponse, TData = undefined>(
  url: string,
  data?: TData,
  method: AxiosRequestConfig['method'] = 'GET',
  token?: string
): Promise<TResponse> => {  

  const session =  await getServerSession(authOptions)

  const headers = session && session.accessToken ? { Authorization: `Bearer ${session?.accessToken}` } : {};


  try {
    const response = await api({
      url,
      method,
      data,
      headers,
    });

    return response.data as TResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado
      // que cae fuera del rango de 2xx
      console.error('Error en la respuesta del servidor:', error.response.data);
      throw new Error(error.response.data.message || 'Error en la solicitud');
    } else if (axios.isAxiosError(error) && error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      console.error('Error en la solicitud:', error.request);
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Algo pasó al configurar la solicitud
      console.error('Error:', error);
      throw new Error('Error en la configuración de la solicitud');
    }
  }
};



export type ApiResponse<T> = {
  data: T; 
  message: string; 
  status: boolean; 
};

export const fake_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzI4MjQ1MDc0LCJleHAiOjE3Mjg2MDUwNzQsIm5iZiI6MTcyODI0NTA3NCwianRpIjoiZmZFT0tyWDZTcnhpeGw2VCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.7KFBNer7exqvpOCsTeEtqnioz1vt40Uq5w8Sov51s3Y'