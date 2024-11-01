import {Button} from "@nextui-org/react";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import React from "react";

export default function CustomPagination({
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
    )
}