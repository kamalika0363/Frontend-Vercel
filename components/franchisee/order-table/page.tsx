'use client'

import React, {useState, useMemo, Key} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Chip,
    SortDescriptor
} from "@nextui-org/react";
import {Pencil1Icon, TrashIcon, ChevronUpIcon, ChevronDownIcon} from "@radix-ui/react-icons";

import {orders as orderData, Order} from "./data";

import CustomPagination from "@/components/CustomPagination/page";
import EditProductModal from "@/components/modals/EditProductModal";
import DeleteProductModal from "@/components/modals/DeleteProductModal";
import DeleteOrderModal from "@/components/modals/DeleteProductModal";

type ChipColor = "primary" | "warning" | "secondary" | "default" | "danger" | "success";

const columns = [
    {key: "orderInvoice", label: "ORDER INVOICE", sortable: true},
    {key: "orderStatus", label: "ORDER STATUS", sortable: true},
    {key: "date", label: "DATE", sortable: true},
    {key: "amount", label: "AMOUNT", sortable: true},
    {key: "actions", label: "ACTIONS"},
];

const statusConfig: Record<string, { color: ChipColor, variant: string, className: string }> = {
    "queued": {
        color: "primary",
        variant: "solid",
        className: "bg-[#f3f3f3] text-[#676767]"
    },
    "shipped": {
        color: "warning",
        variant: "solid",
        className: "bg-[#ffeccc] text-[#965e00]"
    },
    "delivered": {
        color: "secondary",
        variant: "solid",
        className: "bg-[#e6e6f2] text-[#4a4aff]"
    },
    "processing": {
        color: "default",
        variant: "solid",
        className: "bg-[#e4ffe4] text-[#1fac1c]"
    },
    "cancelled": {
        color: "danger",
        variant: "solid",
        className: "bg-[#feebec] text-[#ce292e]"
    }
};

export default function OrderHistoryTable() {
    const [orders, setOrders] = useState<Order[]>(orderData);
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        direction: "ascending",
    });

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const [invoiceFilter, setInvoiceFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [editModalOrder, setEditModalOrder] = useState<Order | null>(null);
    const [deleteModalOrder, setDeleteModalOrder] = useState<Order | null>(null);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            return (
                order.orderInvoice.toLowerCase().includes(invoiceFilter.toLowerCase()) &&
                order.orderStatus.toLowerCase().includes(statusFilter.toLowerCase())
            );
        });
    }, [orders, invoiceFilter, statusFilter]);

    const sortedItems = useMemo(() => {
        return [...filteredOrders].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof Order];
            const second = b[sortDescriptor.column as keyof Order];
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

    const handleEdit = (order: Order) => {
        setEditModalOrder(order);
    };

    const handleDelete = (order: Order) => {
        setDeleteModalOrder(order);
    };

    const handleSaveEdit = (editedOrder: Order) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.key === editedOrder.key ? editedOrder : order
            )
        );
        setEditModalOrder(null);
    };


    const handleConfirmDelete = (order: Order) => {
        setOrders(prevOrders =>
            prevOrders.filter(o => o.key !== order.key)
        );
        setDeleteModalOrder(null);
    };


    const renderCell = (order: Order, columnKey: React.Key) => {
        switch (columnKey) {
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
            case "orderStatus":
                const status = order.orderStatus.toLowerCase();
                const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.queued;
                return (
                    <Chip
                        className={config.className}
                        size="sm"
                        color={config.color}
                    >
                        {order.orderStatus}
                    </Chip>
                );
            case "amount":
                return (
                    <div className="flex flex-col">
                        <span>{order.amount}</span>
                        <span className="text-xs text-gray-500">Paid on {order.date}</span>
                    </div>
                );
            default:
                return order[columnKey as keyof Order];
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex space-x-4 mb-4">
                <Input
                    placeholder="Search by Order Invoice"
                    value={invoiceFilter}
                    onChange={(e) => setInvoiceFilter(e.target.value)}
                />
                <Input
                    placeholder="Search by Order Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                />
            </div>
            <Table
                aria-label="Order information table with pagination"
                selectionMode="multiple"
                radius="xs"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys: Set<Key>) => setSelectedKeys(keys)}
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor as any}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            allowsSorting={column.sortable}
                        >
                            {column.label}
                            {column.sortable && column.key === sortDescriptor.column && (
                                sortDescriptor.direction === "ascending" ? (
                                    <ChevronUpIcon className="inline ml-1"/>
                                ) : (
                                    <ChevronDownIcon className="inline ml-1"/>
                                )
                            )}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <CustomPagination
                page={page}
                pages={pages}
                rowsPerPage={rowsPerPage}
                totalItems={filteredOrders.length}
                onPageChange={setPage}
            />

            <EditProductModal
                order={editModalOrder}
                onClose={() => setEditModalOrder(null)}
                onSave={handleSaveEdit}
            />

            <DeleteOrderModal
                order={deleteModalOrder}
                onClose={() => setDeleteModalOrder(null)}
                onDelete={handleConfirmDelete}
            />

        </div>
    );
}
