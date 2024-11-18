"use client";

import ActiveProductsTable from "@/components/franchiser/active-products/page";

export default function ActiveProducts() {
    return (
        <div className="my-4 px-4 lg:px-12 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <ActiveProductsTable/>
        </div>
    )
}