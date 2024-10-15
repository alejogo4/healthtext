import { ApiResponse, httpRequest } from "@/config/axios.config";
import { Master } from "@/views/types/master";

export const createCategory = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      "/supplycategory",
      body,
      "POST"
    );
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return { message: "Error" };
  }
};

export const listCategory = async (destination: string) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplycategory?destination=${destination}`,
      undefined,
      "GET"
    );
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
};

export const createTypeSupply = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      "/supplytype",
      body,
      "POST"
    );
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return { message: "Error" };
  }
};

export const listTypeSupply = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplytype`,
      undefined,
      "GET"
    );
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
};

export const createLinea = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      "/supplyline",
      body,
      "POST"
    );
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return { message: "Error" };
  }
};

export const listLinea = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplyline`,
      undefined,
      "GET"
    );
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
};

export const createColor = async (body: any) => {
    try {
      const data = await httpRequest<ApiResponse<any>>(
        "/supplycolor",
        body,
        "POST"
      );
      return data;
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return { message: "Error" };
    }
  };
  
  export const listColor = async () => {
    try {
      const data = await httpRequest<ApiResponse<Master[]>>(
        `/supplycolor`,
        undefined,
        "GET"
      );
      return data.data;
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return [];
    }
  };
  

  export const createSubCategory = async (body: any) => {
    try {
      const data = await httpRequest<ApiResponse<any>>(
        "/supplysubcategory",
        body,
        "POST"
      );
      return data;
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return { message: "Error" };
    }
  };
  
  export const listSubCategory = async () => {
    try {
      const data = await httpRequest<ApiResponse<Master[]>>(
        `/supplysubcategory`,
        undefined,
        "GET"
      );
      return data.data;
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return [];
    }
  };
  