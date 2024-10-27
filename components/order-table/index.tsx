'use client'

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Chip
} from "@nextui-org/react";
import {columns, users} from "./data";
import {formatDate} from "./utils";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import {ChipProps} from "@nextui-org/react";
import {SortDescriptor} from "@nextui-org/table";
import {cn} from "tailwind-variants";

const statusColorMap: Record<"Completed" | "Queue" | "Ready for Pickup", ChipProps['color']> = {
    Completed: "success",
    Queue: "warning",
    "Ready for Pickup": "danger"
};

const INITIAL_VISIBLE_COLUMNS = ["location", "orderStatus", "date", "amount"];

type User = typeof users[0];

function CustomPagination({
                              page,
                              pages,
                              rowsPerPage,
                              totalItems,
                              onPageChange
                          }: {
    page: number;
    pages: number;
    rowsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}) {
    const start = (page - 1) * rowsPerPage + 1;
    const end = Math.min(page * rowsPerPage, totalItems);

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
    );
}

export default function OrdersTable() {
    const [locationFilter, setLocationFilter] = React.useState("");
    const [dateFilter, setDateFilter] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("All");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "date",
        direction: "ascending"
    });
    const [page, setPage] = React.useState(1);

    const statusOptions = ["All", "Ready for Pickup", "Queue", "In Preparation"];

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (locationFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.location.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        if (dateFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.date === dateFilter
            );
        }

        // @ts-ignore
        if (statusFilter !== "All") {
            const statusMapping = {
                "Ready for Pickup": "completed",
                "Queue": "pending",
                "In Preparation": "pending",
            };
            // @ts-ignore
            const statusToCheck = statusMapping[statusFilter];
            filteredUsers = filteredUsers.filter((user) =>
                user.orderStatus === statusToCheck
            );
        }

        return filteredUsers;
    }, [users, locationFilter, dateFilter, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: User, b: User) => {
            const first = a[sortDescriptor.column as keyof User] as string;
            const second = b[sortDescriptor.column as keyof User] as string;
            return sortDescriptor.direction === "descending"
                ? second.localeCompare(first)
                : first.localeCompare(second);
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];

        switch (columnKey) {
            case "location":
                return cellValue;
            case "orderStatus":
                return (
                    <Chip
                        size="sm"
                        radius="sm"
                        color="default"
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                );
            case "amount":
                return cellValue;
            case "date":
                // @ts-ignore
                return formatDate(cellValue as string);
            default:
                return cellValue;
        }
    }, []);

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
                <TableBody
                    isLoading
                    items={sortedItems}>
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
    );
}
