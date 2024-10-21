import { ApiResponse, httpRequest } from "@/config/axios.config";
import { Master } from "@/views/types/master";

export const listSupplier = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplierlist`,
      undefined,
      "GET"
    );
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
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

export const listCategory = async (destination: string) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplycategorylist/${destination}`,
      undefined,
      "GET"
    );
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
};

export const listSubCategory = async (destination: string) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplysubcategorylist/${destination}`,
      undefined,
      "GET"
    );
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
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

export const listColorCloth = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supply/listclothcolor`,
      body,
      "POST"
    );
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
};

export const listColorSupplier = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supply/listcolorsupplier`,
      body,
      "POST"
    );
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
};
