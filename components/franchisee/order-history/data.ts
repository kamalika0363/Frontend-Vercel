export interface Order {
    key: any;
    orderInvoice: string;
    orderStatus: string;
    date: string;
    amount: string;
}

export const orders: Order[] = [
    {
        key: "1",
        orderInvoice: "#F-INV-0987711",
        orderStatus: "Queued",
        date: "13/11/2024",
        amount: "$200"
    },
    {
        key: "2",
        orderInvoice: "#F-INV-0987712",
        orderStatus: "Shipped",
        date: "14/11/2024",
        amount: "$150"
    },
    {
        key: "3",
        orderInvoice: "#F-INV-0987713",
        orderStatus: "Delivered",
        date: "15/11/2024",
        amount: "$300"
    },
    {
        key: "4",
        orderInvoice: "#F-INV-0987714",
        orderStatus: "Processing",
        date: "16/11/2024",
        amount: "$250"
    },
    {
        key: "5",
        orderInvoice: "#F-INV-0987715",
        orderStatus: "Cancelled",
        date: "17/11/2024",
        amount: "$100"
    },
    {
        key: "6",
        orderInvoice: "#F-INV-0987716",
        orderStatus: "Queued",
        date: "18/11/2024",
        amount: "$175"
    },
    {
        key: "7",
        orderInvoice: "#F-INV-0987717",
        orderStatus: "Shipped",
        date: "19/11/2024",
        amount: "$225"
    },
    {
        key: "8",
        orderInvoice: "#F-INV-0987718",
        orderStatus: "Delivered",
        date: "20/11/2024",
        amount: "$275"
    },
    {
        key: "9",
        orderInvoice: "#F-INV-0987719",
        orderStatus: "Processing",
        date: "21/11/2024",
        amount: "$200"
    },
    {
        key: "10",
        orderInvoice: "#F-INV-0987720",
        orderStatus: "Cancelled",
        date: "22/11/2024",
        amount: "$150"
    }
];
