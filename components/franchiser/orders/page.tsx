'use client'

import React from "react"
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react"
import {order as orders, Order} from "@/lib/franchiserStore/data"
import {formatDate} from "@/lib/utils"
import {SortDescriptor} from "@nextui-org/table"
import CustomPagination from "@/components/CustomPagination/page"
import Link from "next/link"

const statusConfig = {
    "completed": {
        color: "secondary",
        variant: "solid",
        className: "bg-[#e6e6f2] text-[#4a4aff]",
    },
    "queue": {
        color: "primary",
        variant: "solid",
        className: "bg-[#f3f3f3] text-[#676767]",
    },
    "ready for pickup": {
        color: "warning",
        variant: "solid",
        className: "bg-[#ffeccc] text-[#965e00]",
    },
    "in preparation": {
        color: "default",
        variant: "solid",
        className: "bg-[#e4ffe4] text-[#1fac1c]",
    },
}

interface StatusConfig {
    color: string
    variant: string
    className: string
}

const getStatusConfig = (status: string): StatusConfig => {
    const normalizedStatus = status.toLowerCase()
    return statusConfig[normalizedStatus] || statusConfig["in preparation"]
}

const formatStatus = (status: string) => {
    return status
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

interface User {
    id: string
    location: string
    orderStatus: string
    amount: string
    date: string
}

const columns = [
    {key: "Location", label: "location", sortable: true},
    {key: "Order Status", label: "orderStatus", sortable: true},
    {key: "Date", label: "date", sortable: true},
    {key: "Amount", label: "amount", sortable: true},
];

export default function OrdersTable() {
    const initialOrders: Order[] = orders.map((order) => ({
        ...order,
        orderStatus: order.orderStatus.toLowerCase(),
    }))

    const [locationFilter, setLocationFilter] = React.useState("")
    const [dateFilter, setDateFilter] = React.useState("")
    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set())
    const [statusFilter, setStatusFilter] = React.useState("All")
    const [rowsPerPage] = React.useState(5)
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "date",
        direction: "ascending",
    })
    const [page, setPage] = React.useState(1)
    const [ordersData, setOrdersData] = React.useState<Order[]>(initialOrders)

    const statusOptions = ["All", "Completed", "Queue", "In Preparation"]

    const filteredItems = React.useMemo(() => {
        let filteredOrders = [...ordersData]

        if (locationFilter) {
            filteredOrders = filteredOrders.filter((order) =>
                order.location.toLowerCase().includes(locationFilter.toLowerCase())
            )
        }

        if (dateFilter) {
            filteredOrders = filteredOrders.filter((order) => order.date === dateFilter)
        }

        if (statusFilter !== "All") {
            filteredOrders = filteredOrders.filter(
                (order) => order.orderStatus === statusFilter.toLowerCase()
            )
        }
        return filteredOrders
    }, [ordersData, locationFilter, dateFilter, statusFilter])

    const pages = Math.ceil(filteredItems.length / rowsPerPage)
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return filteredItems.slice(start, end)
    }, [page, filteredItems, rowsPerPage])

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof User] as string
            const second = b[sortDescriptor.column as keyof User] as string
            return sortDescriptor.direction === "descending"
                ? second.localeCompare(first)
                : first.localeCompare(second)
        })
    }, [sortDescriptor, items])

    const handleApprove = (orderId: number) => {
        setOrdersData((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? {...order, orderStatus: "completed"} : order
            )
        )
    }

    const renderCell = React.useCallback(
        (order: Order, columnKey: React.Key) => {
            const cellValue = order[columnKey as keyof Order]

            switch (columnKey) {
                case "location":
                    return cellValue
                case "orderStatus":
                    const status = cellValue as string
                    const {className} = getStatusConfig(status)

                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Chip
                                    className={`${className} cursor-pointer flex items-center`}
                                    variant="flat"
                                >
                                    {formatStatus(status)}
                                </Chip>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Order Actions"
                            >
                                {[
                                    ...(status === "queue" ? [
                                        <DropdownItem
                                            key="approve"
                                            onPress={() => handleApprove(order.id)}
                                        >
                                            Approve
                                        </DropdownItem>
                                    ] : []),
                                    <DropdownItem key="view">
                                        <Link href={`/franchiser/orders/${order.id}`}>
                                            View Details
                                        </Link>
                                    </DropdownItem>
                                ]}
                            </DropdownMenu>
                        </Dropdown>
                    )
                case "amount":
                    return cellValue
                case "date":
                    // @ts-ignore
                    return formatDate(cellValue as string)
                default:
                    return cellValue
            }
        },
        [handleApprove]
    )
    return (
        <div className="space-y-4">
            <div className="flex space-x-4">
                <Input
                    placeholder="Search by Location"
                    value={locationFilter}
                    radius="sm"
                    onChange={(e) => setLocationFilter(e.target.value)}
                    isClearable
                />
                <Input
                    placeholder="Search by Date"
                    type="date"
                    value={dateFilter}
                    radius="sm"
                    onChange={(e) => setDateFilter(e.target.value)}
                    isClearable
                />
            </div>
            <div className="flex space-x-4">
                {statusOptions.map((option) => (
                    <Button
                        key={option}
                        variant={statusFilter === option ? "solid" : "light"}
                        size="sm"
                        radius="sm"
                        onPress={() => setStatusFilter(option)}
                    >
                        {option}
                    </Button>
                ))}
            </div>
            <Table
                radius="sm"
                aria-label="Orders Table"
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.label}
                            align={column.label === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.key}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <CustomPagination
                page={page}
                pages={pages}
                rowsPerPage={rowsPerPage}
                totalItems={filteredItems.length}
                onPageChange={setPage}
            />
        </div>
    )
}
