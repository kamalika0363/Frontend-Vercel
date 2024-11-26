"use client";

import OrdersTable from "@/components/franchisee/order-table/page";

export default function Orders() {
  return (
    <div className="my-4 px-4 max-w-[95rem] w-full flex flex-col gap-4">
      <OrdersTable />
    </div>
  );
}
