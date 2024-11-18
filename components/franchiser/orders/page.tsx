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
import {columns, users} from "./data"
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

export default function OrdersTable() {
    const initialUsers: {
        date: string;
        amount: string;
        orderStatus: string;
        location: string;
        id: number;
        email: string
    }[] = users.map((user) => ({
        ...user,
        orderStatus: user.orderStatus.toLowerCase(),
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
    // @ts-expect-error
    const [usersData, setUsersData] = React.useState<User[]>(initialUsers)

    const statusOptions = ["All", "Ready for Pickup", "Queue", "In Preparation"]

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...usersData]

        if (locationFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.location.toLowerCase().includes(locationFilter.toLowerCase())
            )
        }

        if (dateFilter) {
            filteredUsers = filteredUsers.filter((user) => user.date === dateFilter)
        }

        if (statusFilter !== "All") {
            filteredUsers = filteredUsers.filter(
                (user) => user.orderStatus === statusFilter.toLowerCase()
            )
        }
        return filteredUsers
    }, [usersData, locationFilter, dateFilter, statusFilter])

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

    const handleApprove = (userId: string) => {
        setUsersData((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? {...user, orderStatus: "approved"} : user
            )
        )
    }

    const renderCell = React.useCallback(
        (user: User, columnKey: React.Key) => {
            const cellValue = user[columnKey as keyof User]

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
                                            onPress={() => handleApprove(user.id)}
                                        >
                                            Approve
                                        </DropdownItem>
                                    ] : []),
                                    <DropdownItem key="view">
                                        <Link href={`/franchiser/orders/${user.id}`}>
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
                    return formatDate(cellValue as any)
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
                aria-label="Franchise Info Table"
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
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
