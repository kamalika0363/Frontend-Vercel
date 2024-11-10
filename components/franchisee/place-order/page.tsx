"use client";
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
import {ChevronUpIcon, ChevronDownIcon, MinusIcon, PlusIcon} from "@radix-ui/react-icons";
import {orders, Order} from "./data";
import CustomPagination from "@/components/CustomPagination/page";
import CartModal from "@/components/modals/cart-modal";
import {useSortedFilteredItems} from "@/components/hooks/useSortedFilteredItems";

const columns = [
    {key: "product", label: "PRODUCT", sortable: true},
    {key: "quantity", label: "QUANTITY", sortable: true},
    {key: "sku", label: "SKU", sortable: true},
    {key: "pricePerUnit", label: "PRICE PER UNIT", sortable: true},
    {key: "stockStatus", label: "STOCK STATUS", sortable: true},
];

const statusConfig: Record<string, { color: string, variant: string, className: string }> = {
    "In-Stock Item": {
        color: "success",
        variant: "solid",
        className: "bg-[#e4ffe4] text-[#1fac1c]"
    },
    "Out of Stock": {
        color: "danger",
        variant: "solid",
        className: "bg-[#feebec] text-[#ce292e]"
    }
};

export default function PlaceOrderTable() {
    const [orderList, setOrderList] = useState<Order[]>(orders);
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const [productFilter, setProductFilter] = useState("");
    const [skuFilter, setSkuFilter] = useState("");
    const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);

    const handleSelectionChange = (keys: Set<Key>) => {
        setSelectedKeys(keys);
        const selected = orderList.filter(order => keys.has(order.key) && order.stockStatus !== "Out of Stock");
        setSelectedKeys(new Set(selected.map(order => order.key)));
        setSelectedOrders(selected);
    };

    const handleQuantityChange = (key: string, increment: boolean) => {
        setOrderList(prevOrders =>
            prevOrders.map(order => {
                if (order.key === key && order.stockStatus !== "Out of Stock") {
                    const newQuantity = increment ? order.quantity + 1 : Math.max(0, order.quantity - 1);
                    return {...order, quantity: newQuantity};
                }
                return order;
            })
        );

        setSelectedOrders((prevSelected) =>
            prevSelected.map((order) =>
                order.key === key
                    ? {
                        ...order,
                        quantity: increment ? order.quantity + 1 : Math.max(0, order.quantity - 1),
                    }
                    : order
            )
        );
    };

    const filters = {
        product: productFilter,
        sku: skuFilter
    };

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "product",
        direction: "ascending",
    });

    const sortedItems = useSortedFilteredItems(
        orderList,
        filters,
        sortDescriptor,
        ["product", "sku"]
    );

    const pages = Math.ceil(sortedItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedItems.slice(start, end);
    }, [page, sortedItems]);

    const renderCell = (order: Order, columnKey: React.Key) => {
        switch (columnKey) {
            case "quantity":
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            isIconOnly
                            size="sm"
                            radius="sm"
                            variant="light"
                            onClick={() => handleQuantityChange(order.key, false)}
                            className="min-w-6 w-6 h-6 border border-default-200"
                        >
                            <MinusIcon className="w-4 h-4"/>
                        </Button>
                        <span className="w-8 text-center">{order.quantity}</span>
                        <Button
                            isIconOnly
                            size="sm"
                            radius="sm"
                            variant="light"
                            onClick={() => handleQuantityChange(order.key, true)}
                            className="min-w-6 w-6 h-6 border border-default-200"
                        >
                            <PlusIcon className="w-4 h-4"/>
                        </Button>
                    </div>
                );
            case "stockStatus":
                const config = statusConfig[order.stockStatus] || statusConfig["In-Stock Item"];
                return (
                    <Chip
                        className={config.className}
                        size="sm"
                    >
                        {order.stockStatus}
                    </Chip>
                );
            default:
                return order[columnKey as keyof Order];
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex space-x-4 mb-4">
                <Input
                    placeholder="Search by Product"
                    value={productFilter}
                    onChange={(e) => setProductFilter(e.target.value)}
                    aria-label="Search by Product"
                />
                <Input
                    placeholder="Search by SKU"
                    value={skuFilter}
                    onChange={(e) => setSkuFilter(e.target.value)}
                    aria-label="Search by SKU"
                />
            </div>
            <Table
                aria-label="Order information table with pagination"
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

            <CartModal orders={selectedOrders} onClose={() => setSelectedKeys(new Set())}/>

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
