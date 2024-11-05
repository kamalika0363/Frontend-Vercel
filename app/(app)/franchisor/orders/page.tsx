"use client";

import OrdersTable from "../../../../components/franchisor/order-table";

export default function Orders() {
    return (
        <div className="my-4 px-4 lg:px-12 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="font-bold text-gray-500 text-2xl">Order Details</div>
            <OrdersTable/>
        </div>
    )
}