import { ApiResponse, httpRequest } from '@/config/axios.config';
import { Master } from '@/views/types/master';

export interface SearchSuppliesI {
  supplier_id: string | number;
  supply_type_id: string | number;
  supply_category_id: string | number;
  supply_subcategory_id: string | number;
  supply_line_id: string | number;
  supply_color_id: string | number;
}

export interface ListSuppliesI {
  supply_type: string;
  supply_category: string;
  supply_subcategory: string;
  supply_line: string;
  supply_unit_of_measure: string;
  width: number;
  heigth: number;
  supply_inventory_id: number;
  supply_color_supplier: string;
  cloth_color_supplier: string;
  supply_color: string;
  supply_code: string;
  quantity: number;
  last_price: number;
  observation: string;
  supply_inventory_storage: string;
}

export interface Order {
  supplier_id: number;
  items_order: ItemsOrder[];
}

export interface ItemsOrder {
  supply_inventory_id: number;
  quantity: number;
}

export interface OrderItemDetail {
  supply_type: string;
  supply_category: string;
  supply_subcategory: string;
  supply_line: string;
  supply_unit_of_measure: string;
  width: number;
  heigth: number;
  supply_inventory_id: number;
  supply_inventory_supplier_purchase_id: number,
  supply_color_supplier: string;
  cloth_color_supplier: string;
  supply_color: string;
  supply_code: string;
  quantity: number;
  unit_value: number;
  state: string;
  selected?: boolean;
  observations?: string;
}

export interface Purchase {
  id: number;
  supplier_id: number;
  date_purchase: null;
  purchase_value: null;
  created_by: number;
  approved_by: null;
  date_approved: null;
  disapproved_by: null;
  date_disapproved: null;
  received_by: null;
  date_received: null;
  observation: null;
  state: string;
  created_at: Date;
  updated_at: Date;
  purchase_order_items: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: number;
  supply_inventory_id: number;
  supplier_purchase_id: number;
  quantity: number;
  state: string;
  created_at: Date;
  updated_at: Date;
}

export interface FinishOrder {
  supplier_id: string;
  state:string;
  items_order: ItemsOrder[];
}

export interface FinishOrderItem {
  supply_inventory_supplier_purchase_id?: number;
  supply_inventory_id: number;
  quantity: number;
  unit_value?: string;
  observations?: string;
  state?: string;
}

export const listSupplier = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplierlist`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listTypeSupply = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplytype`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listCategory = async (destination: string) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplycategorylist/${destination}`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listSubCategory = async (destination: string) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplysubcategorylist/${destination}`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listLinea = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplyline`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listColor = async () => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supplycolor`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listColorCloth = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supply/listclothcolor`,
      body,
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const listColorSupplier = async (body: any) => {
  try {
    const data = await httpRequest<ApiResponse<Master[]>>(
      `/supply/listcolorsupplier`,
      body,
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const searchSupplies = async (body: SearchSuppliesI) => {
  try {
    const data = await httpRequest<ApiResponse<ListSuppliesI[]>>(
      `/supply/listsuppliesbysupplier`,
      body,
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const createSupplyPurchase = async (body: Order) => {
  try {
    const data = await httpRequest<ApiResponse<ListSuppliesI[]>>(
      `/supplierpurchase`,
      body,
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getPurchaseOrder = async (status: string) => {
  try {
    const data = await httpRequest<ApiResponse<Purchase>>(
      `/supplierpurchase/state/${status}`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getAllPurchases = async () => {
  try {
    const data = await httpRequest<ApiResponse<Purchase>>(
      `/supplierpurchase`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const getDetailItems = async (id: string) => {
  try {
    const data = await httpRequest<ApiResponse<OrderItemDetail[]>>(
      `/supplierpurchase/list-item-order/${id}`,
      undefined,
      'GET'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const approveOrNotOrder = async (
  idOrder: string,
  state: string,
  observation: string
) => {
  try {
    const data = await httpRequest<ApiResponse<ListSuppliesI[]>>(
      `/supplierpurchase/approveorder/${idOrder}`,
      { state, observation },
      'POST'
    );
    return data.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};

export const finishOrder = async (body: FinishOrder, id: string) => {
  try {
    const data = await httpRequest<ApiResponse<any>>(
      `/supplierpurchase/${id}`,
      body,
      'PUT'
    );
    return data as ApiResponse<any>;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
};
