import OrderHistoryTable from "@/components/franchiser/order-history/page";

export default function OrderHistory() {
    return (
        <div className="my-4 px-4 lg:px-12 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <OrderHistoryTable/>
        </div>
    )
}