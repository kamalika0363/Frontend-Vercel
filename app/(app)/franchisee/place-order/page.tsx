import PlaceOrderTable from "@/components/franchisee/place-order/page";

export default function PlaceOrder() {
    return (
        <div className="my-4 px-4 lg:px-12 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="font-bold text-gray-500 text-2xl">Place Order</div>
            <PlaceOrderTable/>
        </div>
    )
}