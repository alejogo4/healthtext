import { ApiResponse, httpRequest } from "@/config/axios.config";
import { Supply } from "@/views/types/supply";

export const createSupply = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      '/supply',
      body,
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listSupply = async (type: number) => {
  try {
    const data = await httpRequest<ApiResponse<Supply[]>>(
      `/supply?type=${type}`,
      undefined,
      "GET"
    );
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
};

