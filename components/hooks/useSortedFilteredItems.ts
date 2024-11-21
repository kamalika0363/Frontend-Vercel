import { useMemo } from "react";

interface SortDescriptor {
    column: string;
    direction: "ascending" | "descending";
}

export function useSortedFilteredItems<T extends Record<string, any>>(
    items: T[],  // Array of items (can be Product, Order, etc.) (Solves most the errors)
    filters: Record<string, string>,  // Filters to apply (e.g. { product: 'laptop', sku: '123' })
    sortDescriptor: SortDescriptor,  // Sorting descriptor to specify which column and direction to sort
    filterColumns: string[]  // Columns to filter on (e.g. ["product", "sku"] or ["orderId", "status"])
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
