import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
} from "@nextui-org/react";
import {users} from "./data";
import {Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";

// @ts-ignore
export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
};

const columns = [
    {key: "franchiseeLocation", label: "FRANCHISEE LOCATION"},
    {key: "managerName", label: "MANAGER NAME"},
    {key: "dateEstablished", label: "DATE ESTABLISHED"},
    {key: "email", label: "EMAIL"},
    {key: "actions", label: "ACTIONS"},
];

export default function FranchiseInfoTable() {
    const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 8;

    const [locationFilter, setLocationFilter] = React.useState("");
    const [managerFilter, setManagerFilter] = React.useState("");
    const [emailFilter, setEmailFilter] = React.useState("");

    const filteredUsers = React.useMemo(() => {
        return users.filter((user) => {
            return (
                user.franchiseeLocation.toLowerCase().includes(locationFilter.toLowerCase()) &&
                user.managerName.toLowerCase().includes(managerFilter.toLowerCase()) &&
                user.email.toLowerCase().includes(emailFilter.toLowerCase())
            );
        });
    }, [locationFilter, managerFilter, emailFilter, users]);

    const pages = Math.ceil(filteredUsers.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredUsers.slice(start, end);
    }, [page, filteredUsers]);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex space-x-4 mb-4">
                <Input
                    placeholder="Search by Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    isClearable
                />
                <Input
                    placeholder="Search by Manager Name"
                    value={managerFilter}
                    onChange={(e) => setManagerFilter(e.target.value)}
                    isClearable
                />
                <Input
                    placeholder="Search by Email"
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    isClearable
                />
            </div>
            <Table
                radius="sm"
                aria-label="Franchise information table with pagination"
                selectionMode="multiple"
                selectionBehavior={selectionBehavior}
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => (
                                <TableCell>
                                    {columnKey === "actions" ? (
                                        <div className="flex space-x-2">
                                            <button aria-label="Edit">
                                                <Pencil1Icon color="#1e8255" className="border p-1 bg-[#e6f6eb] border-[#1e8255] rounded-full h-6 w-6"/>
                                            </button>
                                            <button aria-label="Delete">
                                                <TrashIcon color="#ce292e" className="border p-1 bg-[#feebec] border-[#ce292e] rounded-full h-6 w-6"/>
                                            </button>
                                        </div>
                                    ) : columnKey === "dateEstablished" ? (
                                        formatDate(item.dateEstablished)
                                    ) : (
                                        item[columnKey]
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* Uncomment the Pagination if needed */}
            {/* <div className="flex justify-center"> */}
            {/*     <Pagination */}
            {/*         isCompact */}
            {/*         showControls */}
            {/*         showShadow */}
            {/*         color="secondary" */}
            {/*         page={page} */}
            {/*         total={pages} */}
            {/*         onChange={(page) => setPage(page)} */}
            {/*     /> */}
            {/* </div> */}
        </div>
    );
}
