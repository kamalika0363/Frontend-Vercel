'use client'

import React, {useState, useMemo, useCallback, Key} from "react";
import {
    Input,
    Button,
    Chip,
    SortDescriptor,
} from "@nextui-org/react";
import {Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";
import {orderHistories, OrderHistory} from "./data";
import CustomPagination from "@/components/CustomPagination/page";
import EditProductModal from "@/components/modals/EditProductModal";
import DeleteProductModal from "@/components/modals/DeleteProductModal";
import ReusableTable from "@/components/table/reusable-table";
import {Order} from "@/components/franchisee/order-history/data";

type ChipColor = "primary" | "warning" | "secondary" | "default" | "danger" | "success";
type CustomSortDescriptor = {
    column: string;
    direction: "ascending" | "descending";
};
const columns = [
    {key: "location", label: "LOCATION", sortable: true},
    {key: "orderId", label: "ORDER ID", sortable: true},
    {key: "orderStatus", label: "ORDER STATUS", sortable: true},
    {key: "orderFulfilled", label: "ORDER FULFILLED", sortable: true},
    {key: "amount", label: "AMOUNT", sortable: true},
    {key: "actions", label: "ACTIONS"},
];

const statusConfig: Record<string, { color: ChipColor, variant: string, className: string }> = {
    "Completed": {
        color: "success",
        variant: "solid",
        className: "bg-[#e8f5e9] text-[#4caf50]"
    },
    "Pending": {
        color: "warning",
        variant: "solid",
        className: "bg-[#fff4e5] text-[#ff9800]"
    },
    "Cancelled": {
        color: "danger",
        variant: "solid",
        className: "bg-[#feebec] text-[#ce292e]"
    },
    "Default": {
        color: "default",
        variant: "solid",
        className: "bg-[#e0e0e0] text-[#757575]"
    }
};

export default function OrderHistoryTable() {
    const [orderList, setOrderList] = useState<OrderHistory[]>(orderHistories);
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
    const [sortDescriptor, setSortDescriptor] = useState<CustomSortDescriptor>({
        column: "orderId",
        direction: "ascending",
    });

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const [locationFilter, setLocationFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [editModalOrder, setEditModalOrder] = useState<Order | null>(null);
    const [deleteModalOrder, setDeleteModalOrder] = useState<Order | null>(null);

    const handleSelectionChange = (keys: Set<Key>) => {
        setSelectedKeys(keys);
    };

    const handleEdit = (order: OrderHistory) => {
        setEditModalOrder(order);
    };

    const handleDelete = (order: OrderHistory) => {
        setDeleteModalOrder(order);
    };

    const handleSaveEdit = (editedOrder: Order) => {
        setOrderList((prevOrders) =>
            prevOrders.map((order) =>
                order.key === editedOrder.key ? editedOrder : order
            )
        );
        setEditModalOrder(null);
    };

    const handleConfirmDelete = (order: Order) => {
        setOrderList((prevOrders) =>
            prevOrders.filter((o) => o.key !== order.key)
        );
        setDeleteModalOrder(null);
    };

    const filteredOrders = useMemo(() => {
        return orderList.filter((order) => {
            return (
                order.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
                order.orderStatus.toLowerCase().includes(statusFilter.toLowerCase())
            );
        });
    }, [orderList, locationFilter, statusFilter]);

    const sortedItems = useMemo(() => {
        return [...filteredOrders].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof OrderHistory];
            const second = b[sortDescriptor.column as keyof OrderHistory];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [filteredOrders, sortDescriptor]);

    const pages = Math.ceil(sortedItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedItems.slice(start, end);
    }, [page, sortedItems]);

    const renderCell = useCallback((order: OrderHistory, columnKey: React.Key) => {
        switch (columnKey) {
            case "orderStatus":
                const config = statusConfig[order.orderStatus] || statusConfig["Default"];
                return (
                    <Chip
                        className={config.className}
                        size="sm"
                        color={config.color}
                    >
                        {order.orderStatus}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex space-x-2">
                        <Button
                            isIconOnly
                            aria-label="Edit"
                            onClick={() => handleEdit(order)}
                            className="bg-[#e6f6eb] text-[#1e8255] border-[#1e8255]"
                        >
                            <Pencil1Icon className="h-4 w-4"/>
                        </Button>
                        <Button
                            isIconOnly
                            aria-label="Delete"
                            onClick={() => handleDelete(order)}
                            className="bg-[#feebec] text-[#ce292e] border-[#ce292e]"
                        >
                            <TrashIcon className="h-4 w-4"/>
                        </Button>
                    </div>
                );
            default:
                return order[columnKey as keyof OrderHistory];
        }
    }, [handleEdit, handleDelete]);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex space-x-4 mb-4">
                <Input
                    placeholder="Search by Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    aria-label="Search by Location"
                />
                <Input
                    placeholder="Search by Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Search by Status"
                />
            </div>
            <ReusableTable
                columns={columns}
                items={items}
                selectedKeys={selectedKeys}
                handleSelectionChange={handleSelectionChange}
                sortDescriptor={sortDescriptor}
                setSortDescriptor={setSortDescriptor}
                renderCell={renderCell}
            />

            <EditProductModal
                order={editModalOrder}
                onClose={() => setEditModalOrder(null)}
                onSave={handleSaveEdit}
            />
            <DeleteProductModal
                order={deleteModalOrder}
                onClose={() => setDeleteModalOrder(null)}
                onDelete={handleConfirmDelete}
            />

            <CustomPagination
                page={page}
                pages={pages}
                rowsPerPage={rowsPerPage}
                totalItems={filteredOrders.length}
                onPageChange={setPage}
            />
        </div>
    );
}
