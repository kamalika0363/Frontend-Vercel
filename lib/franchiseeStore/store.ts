import {create} from 'zustand'
import {allOrders, InvoiceOrder, ProductOrder} from "@/lib/franchiseeStore/data"
import {persist} from 'zustand/middleware'
import React from "react";

type CustomSortDescriptor = {
    column: string;
    direction: "ascending" | "descending";
};

interface OrderState {
    orders: any[]
    selectedKeys: Set<React.Key>
    page: number
    invoiceFilter: string
    statusFilter: string
    setOrders: (orders: any[]) => void
    setSelectedKeys: (keys: Set<React.Key>) => void
    sortDescriptor: CustomSortDescriptor;
    setSortDescriptor: (descriptor: CustomSortDescriptor) => void;
    setPage: (page: number) => void
    setInvoiceFilter: (filter: string) => void
    setStatusFilter: (filter: string) => void
}

interface OrderHistoryState {
    orderList: InvoiceOrder[]
    selectedKeys: Set<React.Key>
    sortDescriptor: { column: string; direction: "ascending" | "descending" }
    page: number
    filters: { orderInvoice: string; orderStatus: string }
    editModalOrder: InvoiceOrder | null
    deleteModalOrder: InvoiceOrder | null
    setOrderList: (orders: InvoiceOrder[]) => void
    setSelectedKeys: (keys: Set<React.Key>) => void
    setSortDescriptor: (descriptor: { column: string; direction: "ascending" | "descending" }) => void
    setPage: (page: number) => void
    setFilters: (filters: { orderInvoice: string; orderStatus: string }) => void
    setEditModalOrder: (order: InvoiceOrder | null) => void
    setDeleteModalOrder: (order: InvoiceOrder | null) => void
    handleSaveEdit: (editedOrder: InvoiceOrder) => void
    handleConfirmDelete: (order: InvoiceOrder) => void
}

interface PlaceOrderState {
    orderList: ProductOrder[]
    selectedKeys: Set<React.Key>
    page: number
    productFilter: string
    skuFilter: string
    selectedOrders: ProductOrder[]
    cartCount: number
    orderId: string
    currentDate: string
    showOrderModal: boolean
    modalTimer: number
    showNoItemsPopover: boolean
    sortDescriptor: { column: string; direction: "ascending" | "descending" }
    setOrderList: (orders: ProductOrder[]) => void
    setSelectedKeys: (keys: Set<React.Key>) => void
    setPage: (page: number) => void
    setProductFilter: (filter: string) => void
    setSkuFilter: (filter: string) => void
    setSelectedOrders: (orders: ProductOrder[]) => void
    setCartCount: (count: number) => void
    setOrderId: (id: string) => void
    setCurrentDate: (date: string) => void
    setShowOrderModal: (show: boolean) => void
    setModalTimer: (timer: (prev: number) => (number | number)) => void
    setShowNoItemsPopover: (show: boolean) => void
    setSortDescriptor: (descriptor: { column: string; direction: "ascending" | "descending" }) => void
    handleQuantityChange: (key: string, increment: boolean) => void
    handleSelectionChange: (keys: Set<React.Key>) => void
    handlePlaceOrder: () => void
    handleCloseModal: () => void
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            orders: [...allOrders.invoiceOrders, ...allOrders.productOrders],
            selectedKeys: new Set(),
            sortDescriptor: {column: "orderInvoice", direction: "ascending"},
            page: 1,
            invoiceFilter: "",
            statusFilter: "",
            setOrders: (orders) => set({orders}),
            setSelectedKeys: (keys) => set({selectedKeys: keys}),
            setSortDescriptor: (descriptor) => set({sortDescriptor: descriptor}),
            setPage: (page) => set({page}),
            setInvoiceFilter: (filter) => set({invoiceFilter: filter}),
            setStatusFilter: (filter) => set({statusFilter: filter}),
        }),
        {
            name: 'order-store', // localStorage
            partialize: (state) => ({
                orders: state.orders,
                selectedKeys: Array.from(state.selectedKeys),
                sortDescriptor: state.sortDescriptor,
                page: state.page,
                invoiceFilter: state.invoiceFilter,
                statusFilter: state.statusFilter,
            }),
        }
    )
);

export const useOrderHistoryStore = create<OrderHistoryState>()(
    persist(
        (set) => ({
            orderList: allOrders.invoiceOrders,
            selectedKeys: new Set(),
            sortDescriptor: {column: "orderInvoice", direction: "ascending"},
            page: 1,
            filters: {orderInvoice: "", orderStatus: ""},
            editModalOrder: null,
            deleteModalOrder: null,
            setOrderList: (orders) => set({orderList: orders}),
            setSelectedKeys: (keys) => set({selectedKeys: keys}),
            setSortDescriptor: (descriptor) => set({sortDescriptor: descriptor}),
            setPage: (page) => set({page}),
            setFilters: (filters) => set({filters}),
            setEditModalOrder: (order) => set({editModalOrder: order}),
            setDeleteModalOrder: (order) => set({deleteModalOrder: order}),
            handleSaveEdit: (editedOrder) =>
                set((state) => ({
                    orderList: state.orderList.map((order) =>
                        order.key === editedOrder.key ? editedOrder : order
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
            name: "order-history-storage", // localStorage
            partialize: (state) => ({
                orderList: state.orderList,
                selectedKeys: Array.from(state.selectedKeys),
                sortDescriptor: state.sortDescriptor,
                page: state.page,
                filters: state.filters,
            }),
        }
    )
);

export const usePlaceOrderStore = create<PlaceOrderState>()(
    persist(
        (set, get) => ({
            orderList: allOrders.productOrders,
            selectedKeys: new Set(),
            page: 1,
            productFilter: "",
            skuFilter: "",
            selectedOrders: [],
            cartCount: 0,
            orderId: "",
            currentDate: "",
            showOrderModal: false,
            modalTimer: 10,
            showNoItemsPopover: false,
            sortDescriptor: {column: "product", direction: "ascending"},
            setOrderList: (orders) => set({orderList: orders}),
            setSelectedKeys: (keys) => set({selectedKeys: keys}),
            setPage: (page) => set({page}),
            setProductFilter: (filter) => set({productFilter: filter}),
            setSkuFilter: (filter) => set({skuFilter: filter}),
            setSelectedOrders: (orders) => set({selectedOrders: orders}),
            setCartCount: (count) => set({cartCount: count}),
            setOrderId: (id) => set({orderId: id}),
            setCurrentDate: (date) => set({currentDate: date}),
            setShowOrderModal: (show) => set({showOrderModal: show}),
            setModalTimer: (timer: (prev: number) => number) => set((state) => ({modalTimer: timer(state.modalTimer)})),
            setShowNoItemsPopover: (show) => set({showNoItemsPopover: show}),
            setSortDescriptor: (descriptor) => set({sortDescriptor: descriptor}),
            handleQuantityChange: (key, increment) => {
                const {orderList, selectedOrders, cartCount} = get()
                const newOrderList = orderList.map((order) =>
                    order.key === key && order.stockStatus !== "Out of Stock"
                        ? {...order, quantity: Math.max(0, order.quantity + (increment ? 1 : -1))}
                        : order
                )
                const newSelectedOrders = selectedOrders.map((order) =>
                    order.key === key
                        ? {...order, quantity: Math.max(0, order.quantity + (increment ? 1 : -1))}
                        : order
                )
                const newCartCount = increment ? cartCount + 1 : Math.max(0, cartCount - 1)
                set({
                    orderList: newOrderList,
                    selectedOrders: newSelectedOrders,
                    cartCount: newCartCount
                })
            },
            handleSelectionChange: (keys) => {
                const {orderList} = get()
                const selected = orderList.filter(
                    (order) => keys.has(order.key) && order.stockStatus !== "Out of Stock"
                )
                set({
                    selectedKeys: keys,
                    selectedOrders: selected,
                    cartCount: selected.reduce((total, order) => total + order.quantity, 0)
                })
            },
            handlePlaceOrder: () => {
                const {selectedOrders} = get()
                if (selectedOrders.length > 0) {
                    set({
                        showOrderModal: true,
                        modalTimer: 10,
                        showNoItemsPopover: false
                    })
                } else {
                    set({showNoItemsPopover: true})
                }
            },
            handleCloseModal: () => {
                set({
                    showOrderModal: false,
                    modalTimer: 10
                })
            }
        }),
        {
            name: 'place-order-storage', // localStorage
            partialize: (state) => ({
                orderList: state.orderList,
                selectedKeys: Array.from(state.selectedKeys), // Array for serialization
                page: state.page,
                selectedOrders: state.selectedOrders,
                cartCount: state.cartCount,
                sortDescriptor: state.sortDescriptor
            })
        }
    )
)