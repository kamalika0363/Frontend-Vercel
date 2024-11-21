'use client'

import React, {Key, useMemo} from "react"
import {Button, Input,} from "@nextui-org/react"
import {Pencil1Icon, TrashIcon} from "@radix-ui/react-icons"
import EditFranchiseModal from "@/components/modals/EditFranchiseModal"
import DeleteFranchiseModal from "@/components/modals/DeleteFranchiseModal"
import {useFranchiseStore} from "@/lib/franchiserStore/store";
import {useSortedFilteredItems} from "@/components/hooks/useSortedFilteredItems";
import ReusableTable from "@/components/table/reusable-table";

const columns = [{key: "franchiseeLocation", label: "FRANCHISEE LOCATION", sortable: true}, {
    key: "managerName", label: "MANAGER NAME", sortable: true
}, {key: "dateEstablished", label: "DATE ESTABLISHED", sortable: true}, {
    key: "email", label: "EMAIL", sortable: true
}, {key: "actions", label: "ACTIONS"},]

interface Franchise {
    key: string;
    franchiseeLocation: string;
    managerName: string;
    dateEstablished: string;
    email: string;
}

export default function FranchiseInfoTable() {
    const {
        franchises,
        selectedKeys,
        locationFilter,
        managerFilter,
        emailFilter,
        editModalFranchise,
        deleteModalFranchise,
        sortDescriptor,
        page,
        setSelectedKeys,
        setLocationFilter,
        setManagerFilter,
        setEmailFilter,
        setEditModalFranchise,
        setDeleteModalFranchise,
        setSortDescriptor,
        handleSaveEdit,
        handleConfirmDelete
    } = useFranchiseStore();

    const rowsPerPage = 5;

    // @ts-expect-error
    const sortedItems = useSortedFilteredItems(franchises, {
        locationFilter,
        managerFilter,
        emailFilter
    }, sortDescriptor, ["franchiseeLocation", "managerName", "email"]);

    Math.ceil(sortedItems.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedItems.slice(start, end);
    }, [page, sortedItems]);

    const handleSelectionChange = (keys: Set<Key>) => {
        setSelectedKeys(keys);
    };

    const handleEdit = (franchise: Franchise) => {
        setEditModalFranchise(franchise);
    };

    const handleDelete = (franchise: Franchise) => {
        setDeleteModalFranchise(franchise);
    };


    const renderCell = (franchisee: Franchise, columnKey: string) => {
        switch (columnKey) {
            case 'actions':
                return (<div className="flex space-x-2">
                    <Button
                        isIconOnly
                        aria-label="Edit"
                        onClick={() => handleEdit(franchisee)}
                        className="bg-[#e6f6eb] text-[#1e8255] border-[#1e8255]"
                    >
                        <Pencil1Icon className="h-4 w-4"/>
                    </Button>
                    <Button
                        isIconOnly
                        aria-label="Delete"
                        onClick={() => handleDelete(franchisee)}
                        className="bg-[#feebec] text-[#ce292e] border-[#ce292e]"
                    >
                        <TrashIcon className="h-4 w-4"/>
                    </Button>
                </div>);
            default:
                return franchisee[columnKey as keyof Franchise];
        }
    };

    return (<div className="flex flex-col gap-3">
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

        <ReusableTable
            columns={columns}
            items={items}
            selectedKeys={selectedKeys}
            handleSelectionChange={handleSelectionChange}
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
            renderCell={renderCell}
        />

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
    </div>);
}
