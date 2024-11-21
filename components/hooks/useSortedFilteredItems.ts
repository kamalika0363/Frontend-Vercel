import {useMemo} from "react";
import {ProductOrder} from "@/lib/franchiseeStore/data";
import {Product} from "@/lib/franchiserStore/data";

interface SortDescriptor {
    column: string;
    direction: "ascending" | "descending";
}

export function useSortedFilteredItems<T extends Record<string, any>>(
    items: Product[],
    filters: Record<string, string>,
    sortDescriptor,
    filterColumns: string[]
) {
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            return filterColumns.every((column) => {
                const filterValue = filters[column]?.toLowerCase();
                return !filterValue || item[column]?.toString().toLowerCase().includes(filterValue);
            });
        });
    }, [items, filters, filterColumns]);

    return useMemo(() => {
        return [...filteredItems].sort((a, b) => {
            // @ts-ignore
            const first = a[sortDescriptor.column as keyof T];
            // @ts-ignore
            const second = b[sortDescriptor.column as keyof T];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [filteredItems, sortDescriptor]);
}
