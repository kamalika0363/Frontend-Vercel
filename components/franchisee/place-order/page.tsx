"use client";

import React, { Key, useEffect, useMemo, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Popover,
    PopoverContent,
    PopoverTrigger,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { ChevronDownIcon, ChevronUpIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Order, orders } from "./data";
import CustomPagination from "@/components/CustomPagination/page";
import { useSortedFilteredItems } from "@/components/hooks/useSortedFilteredItems";
import { Badge } from "@nextui-org/badge";
import { CartIcon } from "@nextui-org/shared-icons";
import Receipt from "@/components/receipts/page";

const columns = [
    { key: "product", label: "PRODUCT", sortable: true },
    { key: "quantity", label: "QUANTITY", sortable: true },
    { key: "sku", label: "SKU", sortable: true },
    { key: "pricePerUnit", label: "PRICE PER UNIT", sortable: true },
    { key: "stockStatus", label: "STOCK STATUS", sortable: true },
];

const statusConfig = {
    "In-Stock Item": { color: "success", variant: "solid", className: "bg-[#e4ffe4] text-[#1fac1c]" },
    "Out of Stock": { color: "danger", variant: "solid", className: "bg-[#feebec] text-[#ce292e]" },
};

export default function PlaceOrderTable() {
    const [orderList, setOrderList] = useState<Order[]>(orders);
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
    const [page, setPage] = useState(1);
    const [productFilter, setProductFilter] = useState("");
    const [skuFilter, setSkuFilter] = useState("");
    const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [orderId, setOrderId] = useState<string>("");
    const [currentDate, setCurrentDate] = useState<string>("");
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [modalTimer, setModalTimer] = useState(10);
    const [showNoItemsPopover, setShowNoItemsPopover] = useState(false);

    useEffect(() => {
        setOrderId(new Date().getTime().toString().slice(-6));
        setCurrentDate(new Date().toLocaleDateString());
    }, []);

    // TODO: Timer for modal auto-close
    useEffect(() => {
        if (showOrderModal) {
            const timer = setInterval(() => {
                setModalTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setShowOrderModal(false);
                        return 10;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [showOrderModal]);

    const handlePlaceOrder = () => {
        if (selectedOrders.length > 0) {
            setShowOrderModal(true);
            setModalTimer(10);
            setShowNoItemsPopover(false);
        } else {
            setShowNoItemsPopover(true);
        }
    };

    const handleCloseModal = () => {
        setShowOrderModal(false);
        setModalTimer(10);
    };

    const handleSelectionChange = (keys: Set<Key>) => {
        setSelectedKeys(keys);
        const selected = orderList.filter(
            (order) => keys.has(order.key) && order.stockStatus !== "Out of Stock"
        );
        setSelectedOrders(selected);
        setCartCount(selected.reduce((total, order) => total + order.quantity, 0));
    };

    const handleQuantityChange = (key: string, increment: boolean) => {
        setOrderList((prevOrders) =>
            prevOrders.map((order) =>
                order.key === key && order.stockStatus !== "Out of Stock"
                    ? { ...order, quantity: Math.max(0, order.quantity + (increment ? 1 : -1)) }
                    : order
            )
        );

        setSelectedOrders((prevSelected) =>
            prevSelected.map((order) =>
                order.key === key
                    ? { ...order, quantity: Math.max(0, order.quantity + (increment ? 1 : -1)) }
                    : order
            )
        );

        setCartCount((prevCount) =>
            increment ? prevCount + 1 : Math.max(0, prevCount - 1)
        );
    };

    const filters = { product: productFilter, sku: skuFilter };
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "product",
        direction: "ascending",
    });
    // @ts-expect-error
    const sortedItems = useSortedFilteredItems(orderList, filters, sortDescriptor, ["product", "sku"]);

    const rowsPerPage = 5;
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
                            <MinusIcon className="w-4 h-4" />
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
                            <PlusIcon className="w-4 h-4" />
                        </Button>
                    </div>
                );
            case "stockStatus":
                const config = statusConfig[order.stockStatus] || statusConfig["In-Stock Item"];
                return <Chip className={config.className} size="sm">{order.stockStatus}</Chip>;
            default:
                return order[columnKey as keyof Order];
        }
    };

    return (
        <div className="flex gap-6 flex-col md:flex-row">
            <Card className="flex-1">
                <CardHeader className="mt-6">
                    <div className="flex space-x-4 mx-6">
                        <Badge color="primary" content={cartCount} shape="circle">
                            <CartIcon size={30} />
                        </Badge>
                        <Input
                            placeholder="Search by Product"
                            value={productFilter}
                            onChange={(e) => setProductFilter(e.target.value)}
                        />
                        <Input
                            placeholder="Search by SKU"
                            value={skuFilter}
                            onChange={(e) => setSkuFilter(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardBody>
                    {/*TODO: use Reusable Table*/}
                    <Table
                        aria-label="Place Order table with pagination"
                        selectionMode="multiple"
                        selectedKeys={selectedKeys}
                        onSelectionChange={handleSelectionChange}
                        sortDescriptor={sortDescriptor}
                        onSortChange={setSortDescriptor as any}
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.key} allowsSorting={column.sortable}>
                                    {column.label}
                                    {column.sortable && column.key === sortDescriptor.column && (
                                        sortDescriptor.direction === "ascending" ? (
                                            <ChevronUpIcon className="hidden ml-1" />
                                        ) : (
                                            <ChevronDownIcon className="inline ml-1" />
                                        )
                                    )}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={items}>
                            {(item) => (
                                <TableRow key={item.key}>
                                    {columns.map((column) => (
                                        // @ts-expect-error
                                        <TableCell key={column.key}>{renderCell(item, column.key)}</TableCell>
                                    ))}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
                <Divider />
                <CardBody>
                    <div className="flex justify-between items-center">
                        <CustomPagination
                            page={page}
                            pages={pages}
                            rowsPerPage={rowsPerPage}
                            totalItems={sortedItems.length}
                            onPageChange={setPage}
                        />

                        <Popover isOpen={showNoItemsPopover && selectedOrders.length === 0} onOpenChange={(open) => setShowNoItemsPopover(open)}>
                            <PopoverTrigger>
                                <Button color="primary" size="sm" onClick={handlePlaceOrder}>Place Order</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                    <div className="text-small font-semibold">No Items Selected</div>
                                    <div className="text-tiny">Please select items before placing an order.</div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Modal isOpen={showOrderModal} onClose={handleCloseModal}>
                            <ModalContent>
                                <ModalHeader>Order Placed Successfully</ModalHeader>
                                <ModalBody>
                                    Your order has been placed. You can view it on the Order History page.
                                    This message will close in {modalTimer} seconds.
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" radius="sm" onPress={handleCloseModal}>Close</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </div>
                </CardBody>
            </Card>

            <Receipt orderId={orderId} currentDate={currentDate} selectedOrders={selectedOrders} />
        </div>
    );
}
