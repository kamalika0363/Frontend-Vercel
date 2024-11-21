'use client'

import React, {useMemo} from "react";
import {Chip} from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import {useOrderStore} from "@/lib/franchiseeStore/store";

import CustomPagination from "@/components/CustomPagination/page";
import {useSortedFilteredItems} from "@/components/hooks/useSortedFilteredItems";
import ReusableTable from "@/components/table/reusable-table";

type ChipColor = "primary" | "warning" | "secondary" | "default" | "danger" | "success";

const columns = [
    {key: "orderInvoice", label: "ORDER INVOICE", sortable: true},
    {key: "orderStatus", label: "ORDER STATUS", sortable: true},
    {key: "date", label: "DATE", sortable: true},
    {key: "amount", label: "AMOUNT", sortable: true},
];

// TODO: Status configuration for chip colors
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
    const {
        orders,
        selectedKeys,
        sortDescriptor,
        page,
        invoiceFilter,
        statusFilter,
        setSelectedKeys,
        setSortDescriptor,
        setPage,
        setInvoiceFilter,
        setStatusFilter
    } = useOrderStore();

    const rowsPerPage = 5;

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

    const renderCell = (order: any, columnKey: React.Key) => {
        switch (columnKey) {
            case "orderStatus":
                const status = order.orderStatus?.toLowerCase();
                const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.queued;
                return (
                    <Chip className={config.className} size="sm" color={config.color}>
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
            case "product":
                return order.product || "-";
            case "quantity":
                return order.quantity || "-";
            default:
                return order[columnKey as keyof typeof order] || "-";
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
            <ReusableTable
                columns={columns}
                items={items}
                selectedKeys={selectedKeys}
                handleSelectionChange={(keys: Set<React.Key>) => setSelectedKeys(keys)}
                sortDescriptor={sortDescriptor}
                setSortDescriptor={(descriptor: { column: string; direction: "ascending" | "descending" }) => {
                    setSortDescriptor(descriptor);
                }}
                renderCell={renderCell}
            />

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
