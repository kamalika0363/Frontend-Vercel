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
    SortDescriptor,
} from "@nextui-org/react";
import {ChevronUpIcon, ChevronDownIcon, Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";
import {orders, Order} from "./data";
import CustomPagination from "@/components/CustomPagination/page";
import EditProductModal from "@/components/modals/EditProductModal";
import DeleteProductModal from "@/components/modals/DeleteProductModal";

type ChipColor = "primary" | "warning" | "secondary" | "default" | "danger" | "success";

const columns = [
    {key: "orderInvoice", label: "ORDER INVOICE", sortable: true},
    {key: "orderStatus", label: "ORDER STATUS", sortable: true},
    {key: "date", label: "DATE", sortable: true},
    {key: "amount", label: "AMOUNT", sortable: true},
    {key: "actions", label: "ACTIONS"},
];

const statusConfig: Record<string, { color: ChipColor, variant: string, className: string }> = {
    "Queued": {
        color: "warning",
        variant: "solid",
        className: "bg-[#fff4e5] text-[#ff9800]"
    },
    "Shipped": {
        color: "primary",
        variant: "solid",
        className: "bg-[#e3f2fd] text-[#2196f3]"
    },
    "Delivered": {
        color: "success",
        variant: "solid",
        className: "bg-[#e8f5e9] text-[#4caf50]"
    },
    "Processing": {
        color: "secondary",
        variant: "solid",
        className: "bg-[#ede7f6] text-[#673ab7]"
    },
    "Cancelled": {
        color: "danger",
        variant: "solid",
        className: "bg-[#feebec] text-[#ce292e]"
    }
};

export default function OrderHistoryTable() {
    const [orderList, setOrderList] = useState<Order[]>(orders);
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        direction: "ascending",
    });

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const [invoiceFilter, setInvoiceFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // State for edit and delete modals
    const [editModalOrder, setEditModalOrder] = useState<Order | null>(null);
    const [deleteModalOrder, setDeleteModalOrder] = useState<Order | null>(null);

    const handleSelectionChange = (keys: Set<Key>) => {
        setSelectedKeys(keys);
    };

    // Handlers for edit and delete actions
    const handleEdit = (order: Order) => {
        setEditModalOrder(order);
    };

    const handleDelete = (order: Order) => {
        setDeleteModalOrder(order);
    };

    const handleSaveEdit = (editedOrder: Order) => {
        setOrderList(prevOrders =>
            prevOrders.map(order =>
                order.key === editedOrder.key ? editedOrder : order
            )
        );
        setEditModalOrder(null);
    };

    const handleConfirmDelete = (order: Order) => {
        setOrderList(prevOrders =>
            prevOrders.filter(o => o.key !== order.key)
        );
        setDeleteModalOrder(null);
    };

    const filteredOrders = useMemo(() => {
        return orderList.filter((order) => {
            return (
                order.orderInvoice.toLowerCase().includes(invoiceFilter.toLowerCase()) &&
                order.orderStatus.toLowerCase().includes(statusFilter.toLowerCase())
            );
        });
    }, [orderList, invoiceFilter, statusFilter]);

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

    const renderCell = (order: Order, columnKey: React.Key) => {
        switch (columnKey) {
            case "orderStatus":
                const config = statusConfig[order.orderStatus];
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
                    placeholder="Search by Invoice"
                    value={invoiceFilter}
                    onChange={(e) => setInvoiceFilter(e.target.value)}
                    aria-label="Search by Invoice"
                />
                <Input
                    placeholder="Search by Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Search by Status"
                />
            </div>
            <Table
                aria-label="Order history table with pagination"
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}
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