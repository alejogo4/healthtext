import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL + "/api"; 

export const api = axios.create({
  baseURL,
});


/**
 * Función utilitaria para hacer peticiones HTTP.
 *
 * @param {string} url - La URL de la solicitud (ruta específica).
 * @param {T} [data] - Datos a enviar con la solicitud (para métodos como POST, PUT, etc.).
 * @param {AxiosRequestConfig['method']} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {string} [token] - Token de autorización para rutas protegidas (opcional).
 * @returns {Promise<T>} - Promesa que se resuelve con la respuesta de la solicitud.
 */
export const httpRequest = async <T>(
  url: string,
  data?: T,
  method: AxiosRequestConfig['method'] = "GET",
  token?: string
): Promise<T> => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};


  try {
    const response = await api({
      url,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
   
    if (axios.isAxiosError(error) && error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado
      // que cae fuera del rango de 2xx
      console.error("Error en la respuesta del servidor:", error.response.data);
      throw new Error(error.response.data.message || "Error en la solicitud");
    } else if (axios.isAxiosError(error) && error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      console.error("Error en la solicitud:", error.request);
      throw new Error("No se recibió respuesta del servidor");
    } else {
      // Algo pasó al configurar la solicitud
      console.error("Error:", error);
      throw new Error("Error en la configuración de la solicitud");
    }
  }
};

export type ApiResponse<T> = {
  data: T; 
  message: string; 
  status: boolean; 
};

export const fake_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzI3NjU3Nzc4LCJleHAiOjE3MjgwMTc3NzgsIm5iZiI6MTcyNzY1Nzc3OCwianRpIjoiU0hBYmRiU2xVTnBpZmN2eCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.RCCktiHabYJeeA1NOy-iQr7zDLkpTkYJVsbgksO-FIc'