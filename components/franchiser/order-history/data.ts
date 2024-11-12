export interface OrderHistory {
    key: string;
    location: string;
    orderId: string;
    orderStatus: string;
    orderFulfilled: string;
    amount: string;
    actions: string;
    orderInvoice: string;
    date: string;
}

export const orderHistories: OrderHistory[] = [
    {
        key: "1",
        location: "1250 Brant Street, Burlington",
        orderId: "ORD-2024",
        orderStatus: "Completed",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "2",
        location: "117 Cross ave, Oakville",
        orderId: "ORD-2024",
        orderStatus: "Pending",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "3",
        location: "17 Queen Street North, Mississauga",
        orderId: "ORD-2024",
        orderStatus: "Queued",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "4",
        location: "723 Lakeshore Road, Mississauga",
        orderId: "ORD-2024",
        orderStatus: "Completed",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "5",
        location: "1140 Winston Churchill, Oakville",
        orderId: "ORD-2024",
        orderStatus: "Completed",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "6",
        location: "2501 Third Line, Oakville",
        orderId: "ORD-2024",
        orderStatus: "Pending",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "7",
        location: "2504 Third Line, Oakville",
        orderId: "ORD-2024",
        orderStatus: "Queued",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "8",
        location: "2507 Third Line, Oakville",
        orderId: "ORD-2024",
        orderStatus: "Cancelled",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "9",
        location: "2510 Third Line, Oakville",
        orderId: "ORD-2024",
        orderStatus: "Completed",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "10",
        location: "2513 Third Line, Oakville",
        orderId: "ORD-2024",
        orderStatus: "Pending",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "11",
        location: "2516 Third Line, Oakville",
        orderId: "ORD-2024",
        orderStatus: "Queued",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    },
    {
        key: "12",
        location: "2519 Third Line, Oakville",
        orderId: "ORD-2024",
        orderStatus: "Cancelled",
        orderFulfilled: "12/11/2024",
        amount: "$200",
        actions: "Paid on 15/12/2024",
        orderInvoice: "Invoice-2024",
        date: "12/11/2024"
    }
];
