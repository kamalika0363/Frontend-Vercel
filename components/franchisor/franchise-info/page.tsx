'use client'

import React, { useState, useMemo } from "react"
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
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import EditFranchiseModal from "@/components/modals/EditFranchiseModal"
import DeleteFranchiseModal from "@/components/modals/DeleteFranchiseModal"
import { users as franchiseData } from "./data";

export const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
}

const columns = [
    { key: "franchiseeLocation", label: "FRANCHISEE LOCATION" },
    { key: "managerName", label: "MANAGER NAME" },
    { key: "dateEstablished", label: "DATE ESTABLISHED" },
    { key: "email", label: "EMAIL" },
    { key: "actions", label: "ACTIONS" },
]

interface Franchise {
    key: string;
    franchiseeLocation: string;
    managerName: string;
    dateEstablished: string;
    email: string;
}

export default function FranchiseInfoTable() {
    const [franchises, setFranchises] = useState<Franchise[]>(franchiseData) // Set state using imported data

    const [page, setPage] = useState(1)
    const rowsPerPage = 8

    const [locationFilter, setLocationFilter] = useState("")
    const [managerFilter, setManagerFilter] = useState("")
    const [emailFilter, setEmailFilter] = useState("")

    const [editModalFranchise, setEditModalFranchise] = useState<Franchise | null>(null)
    const [deleteModalFranchise, setDeleteModalFranchise] = useState<Franchise | null>(null)

    const filteredFranchises = useMemo(() => {
        return franchises.filter((franchise) => {
            return (
                franchise.franchiseeLocation.toLowerCase().includes(locationFilter.toLowerCase()) &&
                franchise.managerName.toLowerCase().includes(managerFilter.toLowerCase()) &&
                franchise.email.toLowerCase().includes(emailFilter.toLowerCase())
            )
        })
    }, [franchises, locationFilter, managerFilter, emailFilter])

    const pages = Math.ceil(filteredFranchises.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return filteredFranchises.slice(start, end)
    }, [page, filteredFranchises])

    const handleEdit = (franchise: Franchise) => {
        setEditModalFranchise(franchise)
    }

    const handleDelete = (franchise: Franchise) => {
        setDeleteModalFranchise(franchise)
    }

    const handleSaveEdit = (editedFranchise: Franchise) => {
        setFranchises(prevFranchises =>
            prevFranchises.map(franchise =>
                franchise.key === editedFranchise.key ? editedFranchise : franchise
            )
        )
        setEditModalFranchise(null)
    }

    const handleConfirmDelete = (franchise: Franchise) => {
        setFranchises(prevFranchises =>
            prevFranchises.filter(f => f.key !== franchise.key)
        )
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
                                                <Pencil1Icon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                isIconOnly
                                                aria-label="Delete"
                                                onClick={() => handleDelete(item)}
                                                className="bg-[#feebec] text-[#ce292e] border-[#ce292e]"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : columnKey === "dateEstablished" ? (
                                        formatDate(item[columnKey])
                                    ) : (
                                        item[columnKey as keyof Franchise] || ""
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
