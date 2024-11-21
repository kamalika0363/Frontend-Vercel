export interface Product {
    key: string;
    productName: string;
    stock: string;
    sku: string;
    availability: string;
    actions: string;
}

export const products: Product[] = [
    {
        key: "1",
        productName: "Product A",
        stock: "In-Stock",
        sku: "SKU001",
        availability: "35/50",
        actions: "Edit | Delete"
    },
    {
        key: "2",
        productName: "Product B",
        stock: "Out-Stock",
        sku: "SKU002",
        availability: "0/30",
        actions: "Edit | Delete"
    },
    {
        key: "3",
        productName: "Product C",
        stock: "In-Stock",
        sku: "SKU003",
        availability: "20/20",
        actions: "Edit | Delete"
    },
    {
        key: "4",
        productName: "Product D",
        stock: "In-Stock",
        sku: "SKU004",
        availability: "5/10",
        actions: "Edit | Delete"
    },
    {
        key: "5",
        productName: "Product E",
        stock: "Out-Stock",
        sku: "SKU005",
        availability: "0/50",
        actions: "Edit | Delete"
    },
    {
        key: "6",
        productName: "Product F",
        stock: "In-Stock",
        sku: "SKU006",
        availability: "50/75",
        actions: "Edit | Delete"
    },
    {
        key: "7",
        productName: "Product G",
        stock: "In-Stock",
        sku: "SKU007",
        availability: "10/15",
        actions: "Edit | Delete"
    },
    {
        key: "8",
        productName: "Product H",
        stock: "In-Stock",
        sku: "SKU008",
        availability: "45/60",
        actions: "Edit | Delete"
    },
    {
        key: "9",
        productName: "Product I",
        stock: "In-Stock",
        sku: "SKU009",
        availability: "2/5",
        actions: "Edit | Delete"
    },
    {
        key: "10",
        productName: "Product J",
        stock: "In-Stock",
        sku: "SKU010",
        availability: "40/40",
        actions: "Edit | Delete"
    }
];

export interface Info {
    key: string;
    franchiseeLocation: string;
    managerName: string;
    dateEstablished: string;
    email: string;
    actions: string;
}

export const info: Info[] = [
    {
        key: "1",
        franchiseeLocation: "New York",
        managerName: "Alice Johnson",
        dateEstablished: "2015-03-15",
        email: "tony.reichert@example.com",
        actions: "Edit | Delete"
    },
    {
        key: "2",
        franchiseeLocation: "Los Angeles",
        managerName: "Bob Smith",
        dateEstablished: "2018-06-20",
        email: "zoey.lang@example.com",
        actions: "Edit | Delete"
    },
    {
        key: "3",
        franchiseeLocation: "Chicago",
        managerName: "Charlie Brown",
        dateEstablished: "2020-01-10",
        email: "jane.fisher@example.com",
        actions: "Edit | Delete"
    },
    {
        key: "4",
        franchiseeLocation: "Houston",
        managerName: "Diana Prince",
        dateEstablished: "2017-09-05",
        email: "william.howard@example.com",
        actions: "Edit | Delete"
    },
    {
        key: "5",
        franchiseeLocation: "Phoenix",
        managerName: "Ethan Hunt",
        dateEstablished: "2019-11-11",
        email: "emily.collins@example.com",
        actions: "Edit | Delete"
    },
    {
        key: "6",
        franchiseeLocation: "Philadelphia",
        managerName: "Fiona Green",
        dateEstablished: "2016-05-25",
        email: "brian.kim@example.com",
        actions: "Edit | Delete"
    },
    {
        key: "7",
        franchiseeLocation: "San Antonio",
        managerName: "George White",
        dateEstablished: "2021-08-30",
        email: "laura.thompson@example.com",
        actions: "Edit | Delete"
    },
    {
        key: "8",
        franchiseeLocation: "San Diego",
        managerName: "Hannah Black",
        dateEstablished: "2014-02-18",
        email: "michael.stevens@example.com",
        actions: "Edit | Delete"
    },
    {
        key: "9",
        franchiseeLocation: "Dallas",
        managerName: "Ian Grey",
        dateEstablished: "2022-07-01",
        email: "sophia.nguyen@example.com",
        actions: "Edit | Delete"
    },
    {
        key: "10",
        franchiseeLocation: "San Jose",
        managerName: "Julia Adams",
        dateEstablished: "2015-10-10",
        email: "james.wilson@example.com",
        actions: "Edit | Delete"
    }
];

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

export interface Order {
    id: number;
    location: string;
    orderStatus: string;
    date: string;
    amount: string;
    email: string;
}

export const order: Order[] = [
    {
        id: 1,
        location: "New York",
        orderStatus: "completed",
        date: "2024-10-23",
        amount: "$150.00",
        email: "customer1@example.com"
    },
    {
        id: 2,
        location: "Los Angeles",
        orderStatus: "queue",
        date: "2024-10-22",
        amount: "$200.00",
        email: "customer2@example.com"
    },
    {
        id: 3,
        location: "Chicago",
        orderStatus: "in preparation",
        date: "2024-10-21",
        amount: "$75.00",
        email: "customer3@example.com"
    },
    {
        id: 4,
        location: "Houston",
        orderStatus: "completed",
        date: "2024-10-20",
        amount: "$100.00",
        email: "customer4@example.com"
    },
    {
        id: 5,
        location: "Phoenix",
        orderStatus: "queue",
        date: "2024-10-19",
        amount: "$125.00",
        email: "customer5@example.com"
    },
    {
        id: 6,
        location: "Philadelphia",
        orderStatus: "in preparation",
        date: "2024-10-18",
        amount: "$50.00",
        email: "customer4@example.com"
    },
    {
        id: 7,
        location: "San Antonio",
        orderStatus: "completed",
        date: "2024-10-17",
        amount: "$75.00",
        email: "customer4@example.com"
    },
    {
        id: 8,
        location: "San Diego",
        orderStatus: "completed",
        date: "2024-10-16",
        amount: "$130.00",
        email: "customer8@example.com"
    },
    {
        id: 9,
        location: "Dallas",
        orderStatus: "queue",
        date: "2024-10-15",
        amount: "$180.00",
        email: "customer9@example.com"
    },
    {
        id: 10,
        location: "San Jose",
        orderStatus: "in preparation",
        date: "2024-10-14",
        amount: "$60.00",
        email: "customer10@example.com"
    },
    {
        id: 11,
        location: "Austin",
        orderStatus: "completed",
        date: "2024-10-13",
        amount: "$200.00",
        email: "customer11@example.com"
    },
    {
        id: 12,
        location: "Jacksonville",
        orderStatus: "queue",
        date: "2024-10-12",
        amount: "$90.00",
        email: "customer12@example.com"
    },
    {
        id: 13,
        location: "San Francisco",
        orderStatus: "completed",
        date: "2024-10-11",
        amount: "$210.00",
        email: "customer13@example.com"
    },
    {
        id: 14,
        location: "Columbus",
        orderStatus: "in preparation",
        date: "2024-10-10",
        amount: "$40.00",
        email: "customer14@example.com"
    },
    {
        id: 15,
        location: "Fort Worth",
        orderStatus: "completed",
        date: "2024-10-09",
        amount: "$170.00",
        email: "customer15@example.com"
    },
    {
        id: 16,
        location: "Indianapolis",
        orderStatus: "queue",
        date: "2024-10-08",
        amount: "$110.00",
        email: "customer16@example.com"
    },
    {
        id: 17,
        location: "Charlotte",
        orderStatus: "in preparation",
        date: "2024-10-07",
        amount: "$30.00",
        email: "customer17@example.com"
    },
    {
        id: 18,
        location: "Seattle",
        orderStatus: "completed",
        date: "2024-10-06",
        amount: "$220.00",
        email: "customer18@example.com"
    },
    {
        id: 19,
        location: "Denver",
        orderStatus: "queue",
        date: "2024-10-05",
        amount: "$125.00",
        email: "customer19@example.com"
    },
    {
        id: 20,
        location: "Washington D.C.",
        orderStatus: "completed",
        date: "2024-10-04",
        amount: "$160.00",
        email: "customer20@example.com"
    }
];

export const allOrders = {
    products,
    info,
    orderHistories,
    order
}