'use client'

import React from "react"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem, User
} from "@nextui-org/react"
import {columns, users} from "./data"
import {formatDate} from "./utils"
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown} from "lucide-react"
import type {SortDescriptor} from "@nextui-org/table"

const statusConfig = {
    "completed": {
        color: "secondary",
        variant: "solid",
        className: "bg-[#e6e6f2] text-[#4a4aff]"
    },
    "queue": {
        color: "primary",
        variant: "solid",
        className: "bg-[#f3f3f3] text-[#676767]"
    },
    "ready for pickup": {
        color: "warning",
        variant: "solid",
        className: "bg-[#ffeccc] text-[#965e00]"
    },
    "in preparation": {
        color: "default",
        variant: "solid",
        className: "bg-[#e4ffe4] text-[#1fac1c]"
    }
}

const formatStatus = (status: string) => {
    return status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const getStatusConfig = (status: string) => {
    const normalizedStatus = status.toLowerCase()
    return statusConfig[normalizedStatus] || statusConfig["in preparation"]
}

function CustomPagination({
                              page,
                              pages,
                              rowsPerPage,
                              totalItems,
                              onPageChange
                          }: {
    page: number
    pages: number
    rowsPerPage: number
    totalItems: number
    onPageChange: (page: number) => void
}) {
    const start = (page - 1) * rowsPerPage + 1
    const end = Math.min(page * rowsPerPage, totalItems)

    return (
        <div className="flex items-center justify-center space-x-2 p-2 rounded-lg">
            <Button isIconOnly size="sm" variant="light" onPress={() => onPageChange(1)} isDisabled={page === 1}>
                <ChevronsLeft className="h-4 w-4"/>
            </Button>
            <Button isIconOnly size="sm" variant="light" onPress={() => onPageChange(page - 1)} isDisabled={page === 1}>
                <ChevronLeft className="h-4 w-4"/>
            </Button>
            <span className="text-small text-default-500">
        Showing {start} to {end} of {totalItems} incoming orders
      </span>
            <Button isIconOnly size="sm" variant="light" onPress={() => onPageChange(page + 1)}
                    isDisabled={page === pages}>
                <ChevronRight className="h-4 w-4"/>
            </Button>
            <Button isIconOnly size="sm" variant="light" onPress={() => onPageChange(pages)}
                    isDisabled={page === pages}>
                <ChevronsRight className="h-4 w-4"/>
            </Button>
        </div>
    )
}

export default function OrdersTable() {
    const initialUsers = users.map(user => ({
        ...user,
        orderStatus: user.orderStatus.toLowerCase()
    }))

    const [locationFilter, setLocationFilter] = React.useState("")
    const [dateFilter, setDateFilter] = React.useState("")
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]))
    const [statusFilter, setStatusFilter] = React.useState("All")
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "date",
        direction: "ascending"
    })
    const [page, setPage] = React.useState(1)
    const [usersData, setUsersData] = React.useState(initialUsers)

    const statusOptions = ["All", "Ready for Pickup", "Queue", "In Preparation"]

    const handleStatusChange = (userId: string, newStatus: string) => {
        setUsersData(prevUsers => prevUsers.map(user =>
            user.id === userId ? {...user, orderStatus: newStatus.toLowerCase()} : user
        ))
    }

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...usersData]

        if (locationFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.location.toLowerCase().includes(locationFilter.toLowerCase())
            )
        }

        if (dateFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.date === dateFilter
            )
        }

        if (statusFilter !== "All") {
            filteredUsers = filteredUsers.filter((user) =>
                user.orderStatus === statusFilter.toLowerCase()
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
        return [...items].sort((a: User, b: User) => {
            const first = a[sortDescriptor.column as keyof User] as string
            const second = b[sortDescriptor.column as keyof User] as string
            return sortDescriptor.direction === "descending"
                ? second.localeCompare(first)
                : first.localeCompare(second)
        })
    }, [sortDescriptor, items])

    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
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
                            <Button
                                size="sm"
                                className={`${className} flex items-center`}
                            >
                                {formatStatus(status)}
                                <ChevronDown className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Order Status"
                            selectionMode="single"
                            selectedKeys={[status]}
                            onAction={(key) => handleStatusChange(user.id, key as string)}
                        >
                            <DropdownItem
                                key="completed"
                                className={statusConfig["completed"].className}
                            >
                                {formatStatus("completed")}
                            </DropdownItem>
                            <DropdownItem
                                key="queue"
                                className={statusConfig["queue"].className}
                            >
                                {formatStatus("queue")}
                            </DropdownItem>
                            <DropdownItem
                                key="ready for pickup"
                                className={statusConfig["ready for pickup"].className}
                            >
                                {formatStatus("ready for pickup")}
                            </DropdownItem>
                            <DropdownItem
                                key="in preparation"
                                className={statusConfig["in preparation"].className}
                            >
                                {formatStatus("in preparation")}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )
            case "amount":
                return cellValue
            case "date":
                return formatDate(cellValue as string)
            default:
                return cellValue
        }
    }, [])

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
