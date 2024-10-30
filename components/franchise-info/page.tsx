'use client'

import React, {useState, useMemo} from "react"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
} from "@nextui-org/react"
import {users} from "./data"
import {Pencil1Icon, TrashIcon} from "@radix-ui/react-icons"
import EditFranchiseModal from "@/components/modals/EditFranchiseModal"
import DeleteFranchiseModal from "@/components/modals/DeleteFranchiseModal"

export const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
}

const columns = [
    {key: "franchiseeLocation", label: "FRANCHISEE LOCATION"},
    {key: "managerName", label: "MANAGER NAME"},
    {key: "dateEstablished", label: "DATE ESTABLISHED"},
    {key: "email", label: "EMAIL"},
    {key: "actions", label: "ACTIONS"},
]

export default function FranchiseInfoTable() {
    const [page, setPage] = useState(1)
    const rowsPerPage = 8

    const [locationFilter, setLocationFilter] = useState("")
    const [managerFilter, setManagerFilter] = useState("")
    const [emailFilter, setEmailFilter] = useState("")

    const [editModalFranchise, setEditModalFranchise] = useState(null)
    const [deleteModalFranchise, setDeleteModalFranchise] = useState(null)

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            return (
                user.franchiseeLocation.toLowerCase().includes(locationFilter.toLowerCase()) &&
                user.managerName.toLowerCase().includes(managerFilter.toLowerCase()) &&
                user.email.toLowerCase().includes(emailFilter.toLowerCase())
            )
        })
    }, [locationFilter, managerFilter, emailFilter])

    const pages = Math.ceil(filteredUsers.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return filteredUsers.slice(start, end)
    }, [page, filteredUsers])

    const handleEdit = (franchise: any) => {
        setEditModalFranchise(franchise)
    }

    const handleDelete = (franchise: any) => {
        setDeleteModalFranchise(franchise)
    }

    const handleSaveEdit = (editedFranchise: any) => {
        // Implement the logic to save the edited franchise
        console.log("Saving edited franchise:", editedFranchise)
        setEditModalFranchise(null)
    }

    const handleConfirmDelete = (franchise: any) => {
        // Implement the logic to delete the franchise
        console.log("Deleting franchise:", franchise)
        setDeleteModalFranchise(null)
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex space-x-4 mb-4">
                <Input
                    placeholder="Search by Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                />
                <Input
                    placeholder="Search by Manager Name"
                    value={managerFilter}
                    onChange={(e) => setManagerFilter(e.target.value)}
                />
                <Input
                    placeholder="Search by Email"
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                />
            </div>
            <Table
                aria-label="Franchise information table with pagination"
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
                                            <Button
                                                isIconOnly
                                                aria-label="Edit"
                                                onClick={() => handleEdit(item)}
                                                className="bg-[#e6f6eb] text-[#1e8255] border-[#1e8255]"
                                            >
                                                <Pencil1Icon className="h-4 w-4"/>
                                            </Button>
                                            <Button
                                                isIconOnly
                                                aria-label="Delete"
                                                onClick={() => handleDelete(item)}
                                                className="bg-[#feebec] text-[#ce292e] border-[#ce292e]"
                                            >
                                                <TrashIcon className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    ) : columnKey === "dateEstablished" ? (
                                        formatDate(item[columnKey])
                                    ) : (
                                        item[columnKey] || ""
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <EditFranchiseModal
                franchise={editModalFranchise}
                onClose={() => setEditModalFranchise(null)}
                onSave={handleSaveEdit}
            />
            <DeleteFranchiseModal
                franchise={deleteModalFranchise}
                onClose={() => setDeleteModalFranchise(null)}
                onDelete={handleConfirmDelete}
            />
        </div>
    )
}