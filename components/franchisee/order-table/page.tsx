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
    Chip,
    SortDescriptor
} from "@nextui-org/react";
import {ChevronUpIcon, ChevronDownIcon} from "@radix-ui/react-icons";

// TODO: API Integration
import {orders as orderData, Order} from "./data";

import CustomPagination from "@/components/CustomPagination/page";
import {useSortedFilteredItems} from "@/components/hooks/useSortedFilteredItems";

type ChipColor = "primary" | "warning" | "secondary" | "default" | "danger" | "success";

const columns = [
    {key: "orderInvoice", label: "ORDER INVOICE", sortable: true},
    {key: "orderStatus", label: "ORDER STATUS", sortable: true},
    {key: "date", label: "DATE", sortable: true},
    {key: "amount", label: "AMOUNT", sortable: true},
];

// TODO: Put it to component folder (Modularity)
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

export default function OrderTable() {
    const [orders] = useState<Order[]>(orderData);
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "orderInvoice",
        direction: "ascending",
    });

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const [invoiceFilter, setInvoiceFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filters = {
        orderInvoice: invoiceFilter,
        orderStatus: statusFilter,
    };

    const sortedItems = useSortedFilteredItems(orders, filters, sortDescriptor, ["orderInvoice", "orderStatus"]);

    const pages = Math.ceil(sortedItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedItems.slice(start, end);
    }, [page, sortedItems]);


    const renderCell = (order: Order, columnKey: React.Key) => {
        switch (columnKey) {
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
                                    <ChevronUpIcon className="hidden ml-1"/>
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
                totalItems={sortedItems.length}
                onPageChange={setPage}
            />

        </div>
    );
}
