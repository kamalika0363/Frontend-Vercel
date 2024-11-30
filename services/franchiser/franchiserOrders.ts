import axios from "axios";
import { Info, Order, OrderHistory, Product } from "@/lib/franchiserStore/data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "API_BASE_URL";

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/franchiser/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  updateOrderStatus: async (
    orderId: number,
    status: string,
  ): Promise<Order> => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/franchiser/orders/${orderId}`,
        {
          orderStatus: status,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },
};

export const franchiserInfoService = {
  getFranchiserInfo: async (): Promise<Info[]> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/franchiser/franchise-info`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching franchise info:", error);
      throw error;
    }
  },
};

export const franchiserOrderHistoryService = {
  getFranchiserOrderHistory: async (): Promise<OrderHistory[]> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/franchiser/franchisee-order-history`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data.map((order: Order) => ({
        ...order,
        key: order.id.toString(),
        orderId: order.id,
        orderFulfilled: order.date,
        actions: "",
        orderInvoice: `INV-${order.id}`,
      }));
    } catch (error) {
      console.error("Error fetching franchisee order history:", error);
      throw error;
    }
  },
};

export const franchiserActiveProductsService = {
  getFranchiserActiveProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/franchiser/active-products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching active products:", error);
      throw error;
    }
  },

  updateProductStatus: async (
    productId: number,
    status: string,
  ): Promise<Product> => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/franchiser/products/${productId}`,
        {
          status: status,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product status:", error);
      throw error;
    }
  },
};
