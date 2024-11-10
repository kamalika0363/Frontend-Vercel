'use client'

import React, {useState, useMemo, Key} from 'react';
import {
    Input,
    Button,
    Chip,
} from '@nextui-org/react';
import {Pencil1Icon, TrashIcon} from '@radix-ui/react-icons';
import {orders, Order} from './data';
import CustomPagination from '@/components/CustomPagination/page';
import EditProductModal from '@/components/modals/EditProductModal';
import DeleteProductModal from '@/components/modals/DeleteProductModal';
import ReusableTable from '@/components/table/reusable-table';
import {useSortedFilteredItems} from "@/components/hooks/useSortedFilteredItems";

type ChipColor = 'primary' | 'warning' | 'secondary' | 'default' | 'danger' | 'success';
type CustomSortDescriptor = {
    column: string;
    direction: "ascending" | "descending";
};

const columns = [
    {key: 'orderInvoice', label: 'ORDER INVOICE', sortable: true},
    {key: 'orderStatus', label: 'ORDER STATUS', sortable: true},
    {key: 'date', label: 'DATE', sortable: true},
    {key: 'amount', label: 'AMOUNT', sortable: true},
    {key: 'actions', label: 'ACTIONS'},
];

const statusConfig: Record<string, { color: ChipColor, variant: string, className: string }> = {
    'Queued': {
        color: 'warning',
        variant: 'solid',
        className: 'bg-[#fff4e5] text-[#ff9800]',
    },
    'Shipped': {
        color: 'primary',
        variant: 'solid',
        className: 'bg-[#e3f2fd] text-[#2196f3]',
    },
    'Delivered': {
        color: 'success',
        variant: 'solid',
        className: 'bg-[#e8f5e9] text-[#4caf50]',
    },
    'Processing': {
        color: 'secondary',
        variant: 'solid',
        className: 'bg-[#ede7f6] text-[#673ab7]',
    },
    'Cancelled': {
        color: 'danger',
        variant: 'solid',
        className: 'bg-[#feebec] text-[#ce292e]',
    },
};

export default function OrderHistoryTable() {
    const [orderList, setOrderList] = useState<Order[]>(orders);
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
    const [sortDescriptor, setSortDescriptor] = useState<CustomSortDescriptor>({
        column: 'orderInvoice',
        direction: "ascending",
    });

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const [filters, setFilters] = useState({
        orderInvoice: '',
        orderStatus: ''
    });

    const [editModalOrder, setEditModalOrder] = useState<Order | null>(null);
    const [deleteModalOrder, setDeleteModalOrder] = useState<Order | null>(null);

    const handleFilterChange = (field: keyof typeof filters, value: string) => {
        setFilters(prev => ({...prev, [field]: value}));
    };

    const handleSelectionChange = (keys: Set<Key>) => {
        setSelectedKeys(keys);
    };

    const handleEdit = (order: Order) => {
        setEditModalOrder(order);
    };

    const handleDelete = (order: Order) => {
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

    const sortedItems = useSortedFilteredItems(orderList, filters, sortDescriptor, ["orderInvoice", "orderStatus"]);

    const pages = Math.ceil(sortedItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedItems.slice(start, end);
    }, [page, sortedItems]);

    const renderCell = (order: Order, columnKey: string) => {
        switch (columnKey) {
            case 'orderStatus':
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
            case 'actions':
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
            case 'amount':
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
                    value={filters.orderInvoice}
                    onChange={(e) => handleFilterChange('orderInvoice', e.target.value)}
                    aria-label="Search by Invoice"
                />
                <Input
                    placeholder="Search by Status"
                    value={filters.orderStatus}
                    onChange={(e) => handleFilterChange('orderStatus', e.target.value)}
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
                totalItems={orderList.length}
                onPageChange={setPage}
            />
        </div>
    );
}
