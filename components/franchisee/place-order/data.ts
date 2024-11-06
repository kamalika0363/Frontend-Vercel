export interface Order {
    key: string;
    product: string;
    quantity: number;
    sku: string;
    pricePerUnit: string;
    stockStatus: string;
}

export const orders: Order[] = [
    {
        key: "1",
        product: "Whole chicken",
        quantity: 2,
        sku: "FR-2984-PRD",
        pricePerUnit: "$8.00",
        stockStatus: "In-Stock Item"
    },
    {
        key: "2",
        product: "Sausage",
        quantity: 2,
        sku: "FR-2984-PRD",
        pricePerUnit: "$8.00",
        stockStatus: "In-Stock Item"
    },
    {
        key: "3",
        product: "Pork ribs",
        quantity: 1,
        sku: "FR-2953-PRD",
        pricePerUnit: "$12.00",
        stockStatus: "In-Stock Item"
    },
    {
        key: "4",
        product: "Beef steak",
        quantity: 3,
        sku: "FR-2038-PRD",
        pricePerUnit: "$15.00",
        stockStatus: "Out of Stock"
    },
    {
        key: "5",
        product: "Lamb chops",
        quantity: 5,
        sku: "FR-9847-PRD",
        pricePerUnit: "$20.00",
        stockStatus: "In-Stock Item"
    },
    {
        key: "6",
        product: "Ground beef",
        quantity: 4,
        sku: "FR-1745-PRD",
        pricePerUnit: "$10.00",
        stockStatus: "In-Stock Item"
    },
    {
        key: "7",
        product: "Chicken wings",
        quantity: 10,
        sku: "FR-0987-PRD",
        pricePerUnit: "$6.00",
        stockStatus: "In-Stock Item"
    },
    {
        key: "8",
        product: "Salmon fillet",
        quantity: 2,
        sku: "FR-1932-PRD",
        pricePerUnit: "$18.00",
        stockStatus: "In-Stock Item"
    },
    {
        key: "9",
        product: "Turkey breast",
        quantity: 1,
        sku: "FR-3847-PRD",
        pricePerUnit: "$25.00",
        stockStatus: "Out of Stock"
    },
    {
        key: "10",
        product: "Bacon",
        quantity: 3,
        sku: "FR-0982-PRD",
        pricePerUnit: "$5.00",
        stockStatus: "In-Stock Item"
    }
];
