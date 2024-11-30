import axios from "axios";
import { OrderHistory } from "@/lib/franchiserStore/data";
import { InvoiceOrder } from "@/lib/franchiseeStore/data";
import { ProductOrder } from "@/lib/franchiseeStore/data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "API_BASE_URL";
// typically recent placed orders must be fetched
// franchisee/order-history or franchiser/order-history
export const franchiseeOrderHistoryService = {
  getFranchiseeOrderHistory: async (): Promise<OrderHistory[]> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/franchisee/order-history`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching franchisee order history:", error);
      throw error;
    }
  },
};

export const franchiseeOrdersService = {
  getInvoiceOrders: async (): Promise<InvoiceOrder[]> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/franchisee/invoice-orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching invoice orders:", error);
      throw error;
    }
  },
};

export const franchiseePlaceOrderService = {
  placeOrder: async (): Promise<ProductOrder[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/franchisee/place-order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.map((order: any) => ({
        key: order.id.toString(),
        product: order.name,
        quantity: 0,
        sku: order.sku,
        pricePerUnit: order.price,
        stockStatus: order.stock === "in-stock" ? "In-Stock Item" : "Out of Stock"
      }));
    } catch (error) {
      console.error("Error fetching place order data:", error);
      throw error;
    }
  },
};
