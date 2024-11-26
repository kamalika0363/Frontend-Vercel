import { create } from "zustand";
import {
  info as franchiseData,
  Order,
  orderHistories,
  OrderHistory,
  Product,
  products as productData,
} from "@/lib/franchiserStore/data";

import React from "react";
import { persist } from "zustand/middleware";

type CustomSortDescriptor = {
  column: string;
  direction: "ascending" | "descending";
};

type OrderHistoryStore = {
  orderList: OrderHistory[];
  selectedKeys: Set<React.Key>;
  editModalOrder: OrderHistory | null;
  deleteModalOrder: OrderHistory | null;
  locationFilter: string;
  statusFilter: string;
  page: number;
  sortDescriptor: { column: string; direction: "ascending" | "descending" };
  setOrderList: (orders: OrderHistory[]) => void;
  setSelectedKeys: (keys: Set<React.Key>) => void;
  setEditModalOrder: (order: OrderHistory | null) => void;
  setDeleteModalOrder: (order: OrderHistory | null) => void;
  setLocationFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  setPage: (page: number) => void;
  setSortDescriptor: (descriptor: {
    column: string;
    direction: "ascending" | "descending";
  }) => void;
  handleSaveEdit: (editedOrder: OrderHistory) => void;
  handleConfirmDelete: (order: OrderHistory) => void;
};

export const useOrderHistoryStore = create<OrderHistoryStore>()(
  persist(
    (set) => ({
      orderList: orderHistories,
      selectedKeys: new Set(),
      editModalOrder: null,
      deleteModalOrder: null,
      locationFilter: "",
      statusFilter: "",
      page: 1,
      sortDescriptor: { column: "orderId", direction: "ascending" },
      setOrderList: (orders) => set({ orderList: orders }),
      setSelectedKeys: (keys) => set({ selectedKeys: keys }),
      setEditModalOrder: (order) => set({ editModalOrder: order }),
      setDeleteModalOrder: (order) => set({ deleteModalOrder: order }),
      setLocationFilter: (filter) => set({ locationFilter: filter }),
      setStatusFilter: (filter) => set({ statusFilter: filter }),
      setPage: (page) => set({ page }),
      setSortDescriptor: (descriptor) => set({ sortDescriptor: descriptor }),
      handleSaveEdit: (editedOrder) =>
        set((state) => ({
          orderList: state.orderList.map((order) =>
            order.key === editedOrder.key ? editedOrder : order,
          ),
          editModalOrder: null,
        })),
      handleConfirmDelete: (order) =>
        set((state) => ({
          orderList: state.orderList.filter((o) => o.key !== order.key),
          deleteModalOrder: null,
        })),
    }),
    {
      name: "franchiser-order-history-store",
      partialize: (state) => ({
        orderList: state.orderList,
        selectedKeys: Array.from(state.selectedKeys),
        sortDescriptor: state.sortDescriptor,
        page: state.page,
        locationFilter: state.locationFilter,
        statusFilter: state.statusFilter,
      }),
      onRehydrateStorage: (state) => {
        if (state?.selectedKeys) {
          state.selectedKeys = new Set(state.selectedKeys);
        }
      },
    },
  ),
);

interface Franchise {
  key: string;
  franchiseeLocation: string;
  managerName: string;
  dateEstablished: string;
  email: string;
}

interface FranchiseStore {
  franchises: Franchise[];
  selectedKeys: Set<React.Key>;
  locationFilter: string;
  managerFilter: string;
  page: number;
  emailFilter: string;
  editModalFranchise: Franchise | null;
  deleteModalFranchise: Franchise | null;
  sortDescriptor: CustomSortDescriptor;
  setFranchises: (franchises: Franchise[]) => void;
  setSelectedKeys: (keys: Set<React.Key>) => void;
  setLocationFilter: (filter: string) => void;
  setManagerFilter: (filter: string) => void;
  setEmailFilter: (filter: string) => void;
  setEditModalFranchise: (franchise: Franchise | null) => void;
  setDeleteModalFranchise: (franchise: Franchise | null) => void;
  setSortDescriptor: (descriptor: CustomSortDescriptor) => void;
  handleSaveEdit: (editedFranchise: Franchise) => void;
  handleConfirmDelete: (franchise: Franchise) => void;
}

export const useFranchiseStore = create<FranchiseStore>()(
  persist(
    (set) => ({
      franchises: franchiseData,
      selectedKeys: new Set(),
      page: 1,
      locationFilter: "",
      managerFilter: "",
      emailFilter: "",
      editModalFranchise: null,
      deleteModalFranchise: null,
      sortDescriptor: { column: "franchiseeLocation", direction: "ascending" },
      setFranchises: (franchises) => set({ franchises }),
      setSelectedKeys: (keys) => set({ selectedKeys: keys }),
      setLocationFilter: (filter) => set({ locationFilter: filter }),
      setManagerFilter: (filter) => set({ managerFilter: filter }),
      setEmailFilter: (filter) => set({ emailFilter: filter }),
      setEditModalFranchise: (franchise) =>
        set({ editModalFranchise: franchise }),
      setDeleteModalFranchise: (franchise) =>
        set({ deleteModalFranchise: franchise }),
      setSortDescriptor: (descriptor) => set({ sortDescriptor: descriptor }),
      handleSaveEdit: (editedFranchise) =>
        set((state) => ({
          franchises: state.franchises.map((franchise) =>
            franchise.key === editedFranchise.key ? editedFranchise : franchise,
          ),
          editModalFranchise: null,
        })),
      handleConfirmDelete: (franchise) =>
        set((state) => ({
          franchises: state.franchises.filter((f) => f.key !== franchise.key),
          deleteModalFranchise: null,
        })),
    }),
    {
      name: "franchiser-store",
      partialize: (state) => ({
        franchises: state.franchises,
        selectedKeys: Array.from(state.selectedKeys),
        sortDescriptor: state.sortDescriptor,
        page: state.page,
        locationFilter: state.locationFilter,
        managerFilter: state.managerFilter,
        emailFilter: state.emailFilter,
      }),
      onRehydrateStorage: (state) => {
        if (state?.selectedKeys) {
          state.selectedKeys = new Set(state.selectedKeys);
        }
      },
    },
  ),
);

interface ActiveProductsStore {
  products: Product[];
  selectedKeys: Set<React.Key>;
  sortDescriptor: CustomSortDescriptor;
  page: number;
  nameFilter: string;
  skuFilter: string;
  editModalProduct: Product | null;
  deleteModalProduct: Product | null;
  setProducts: (products: Product[]) => void;
  setSelectedKeys: (keys: Set<React.Key>) => void;
  setSortDescriptor: (descriptor: CustomSortDescriptor) => void;
  setPage: (page: number) => void;
  setNameFilter: (filter: string) => void;
  setSkuFilter: (filter: string) => void;
  setEditModalProduct: (product: Product | null) => void;
  setDeleteModalProduct: (product: Product | null) => void;
  handleSaveEdit: (editedProduct: Product) => void;
  handleConfirmDelete: (product: Product) => void;
  handleStockToggle: (product: Product) => void;
}

export const useActiveProductsStore = create<ActiveProductsStore>()(
  persist(
    (set) => ({
      products: productData,
      selectedKeys: new Set(),
      sortDescriptor: { column: "productName", direction: "ascending" },
      page: 1,
      nameFilter: "",
      skuFilter: "",
      editModalProduct: null,
      deleteModalProduct: null,
      setProducts: (products) => set({ products }),
      setSelectedKeys: (keys) => set({ selectedKeys: keys }),
      setSortDescriptor: (descriptor) => set({ sortDescriptor: descriptor }),
      setPage: (page) => set({ page }),
      setNameFilter: (filter) => set({ nameFilter: filter }),
      setSkuFilter: (filter) => set({ skuFilter: filter }),
      setEditModalProduct: (product) => set({ editModalProduct: product }),
      setDeleteModalProduct: (product) => set({ deleteModalProduct: product }),
      handleSaveEdit: (editedProduct) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.sku === editedProduct.sku ? editedProduct : product,
          ),
          editModalProduct: null,
        })),
      handleConfirmDelete: (product) =>
        set((state) => ({
          products: state.products.filter((p) => p.sku !== product.sku),
          deleteModalProduct: null,
        })),
      handleStockToggle: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.sku === product.sku
              ? {
                  ...p,
                  stock: p.stock === "In-Stock" ? "Out-of-Stock" : "In-Stock",
                }
              : p,
          ),
        })),
    }),
    {
      name: "franchiser-active-products-store",
      partialize: (state) => ({
        products: state.products,
        selectedKeys: Array.from(state.selectedKeys),
        sortDescriptor: state.sortDescriptor,
        page: state.page,
        nameFilter: state.nameFilter,
        skuFilter: state.skuFilter,
      }),
      onRehydrateStorage: (state) => {
        if (state?.selectedKeys) {
          state.selectedKeys = new Set(state.selectedKeys);
        }
      },
    },
  ),
);

interface OrdersState {
  orders: Order[];
  filteredOrders: Order[];
  locationFilter: string;
  dateFilter: string;
  statusFilter: string;
  selectedKeys: Set<string>;
  sortDescriptor: CustomSortDescriptor;
  page: number;
  rowsPerPage: number;
  setLocationFilter: (filter: string) => void;
  setDateFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  setSortDescriptor: (sort: CustomSortDescriptor) => void;
  setSelectedKeys: (keys: Set<string>) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
  setOrders: (orders: Order[]) => void;
  handleApprove: (orderId: number) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      filteredOrders: [],
      locationFilter: "",
      dateFilter: "",
      statusFilter: "All",
      selectedKeys: new Set(),
      sortDescriptor: { column: "date", direction: "ascending" },
      page: 1,
      rowsPerPage: 5,
      setLocationFilter: (filter) => set({ locationFilter: filter }),
      setDateFilter: (filter) => set({ dateFilter: filter }),
      setStatusFilter: (filter) => set({ statusFilter: filter }),
      setSortDescriptor: (sort) => set({ sortDescriptor: sort }),
      setSelectedKeys: (keys) => set({ selectedKeys: keys }),
      setPage: (page) => set({ page }),
      setRowsPerPage: (rows) => set({ rowsPerPage: rows }),
      setOrders: (orders) => set({ orders, filteredOrders: orders }),
      handleApprove: (orderId: number) => {
        const orders = get().orders;
        set({
          orders: orders.map((order) =>
            order.id === orderId
              ? { ...order, orderStatus: "completed" }
              : order,
          ),
        });
      },
    }),
    {
      name: "franchiser-orders-store",
      partialize: (state) => ({
        orders: state.orders,
        filteredOrders: state.filteredOrders,
        locationFilter: state.locationFilter,
        dateFilter: state.dateFilter,
        statusFilter: state.statusFilter,
        selectedKeys: Array.from(state.selectedKeys),
        sortDescriptor: state.sortDescriptor,
        page: state.page,
        rowsPerPage: state.rowsPerPage,
      }),
      onRehydrateStorage: (state) => {
        if (state?.selectedKeys) {
          state.selectedKeys = new Set(state.selectedKeys);
        }
      },
    },
  ),
);
