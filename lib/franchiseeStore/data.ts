// franchisee/orders
// franchisee/place-order
export interface InvoiceOrder {
  key: string;
  orderInvoice: string;
  orderStatus: string;
  date: string;
  amount: string;
}

export const invoiceOrders: InvoiceOrder[] = [
  {
    key: "1",
    orderInvoice: "#F-INV-0987711",
    orderStatus: "Queued",
    date: "13/11/2024",
    amount: "$200",
  },
  {
    key: "2",
    orderInvoice: "#F-INV-0987712",
    orderStatus: "Shipped",
    date: "14/11/2024",
    amount: "$150",
  },
  {
    key: "3",
    orderInvoice: "#F-INV-0987713",
    orderStatus: "Delivered",
    date: "15/11/2024",
    amount: "$300",
  },
  {
    key: "4",
    orderInvoice: "#F-INV-0987714",
    orderStatus: "Processing",
    date: "16/11/2024",
    amount: "$250",
  },
  {
    key: "5",
    orderInvoice: "#F-INV-0987715",
    orderStatus: "Cancelled",
    date: "17/11/2024",
    amount: "$100",
  },
  {
    key: "6",
    orderInvoice: "#F-INV-0987716",
    orderStatus: "Queued",
    date: "18/11/2024",
    amount: "$175",
  },
  {
    key: "7",
    orderInvoice: "#F-INV-0987717",
    orderStatus: "Shipped",
    date: "19/11/2024",
    amount: "$225",
  },
  {
    key: "8",
    orderInvoice: "#F-INV-0987718",
    orderStatus: "Delivered",
    date: "20/11/2024",
    amount: "$275",
  },
  {
    key: "9",
    orderInvoice: "#F-INV-0987719",
    orderStatus: "Processing",
    date: "21/11/2024",
    amount: "$200",
  },
  {
    key: "10",
    orderInvoice: "#F-INV-0987720",
    orderStatus: "Cancelled",
    date: "22/11/2024",
    amount: "$150",
  },
];

// franchisee/place-order
export interface ProductOrder {
  key: string;
  product: string;
  quantity: number;
  sku: string;
  pricePerUnit: string;
  stockStatus: string;
}

export const productOrders: ProductOrder[] = [
  {
    key: "1",
    product: "Whole chicken",
    quantity: 2,
    sku: "FR-2984-PRD",
    pricePerUnit: "$8.00",
    stockStatus: "In-Stock Item",
  },
  {
    key: "2",
    product: "Sausage",
    quantity: 2,
    sku: "FR-2984-PRD",
    pricePerUnit: "$8.00",
    stockStatus: "In-Stock Item",
  },
  {
    key: "3",
    product: "Pork ribs",
    quantity: 1,
    sku: "FR-2953-PRD",
    pricePerUnit: "$12.00",
    stockStatus: "In-Stock Item",
  },
  {
    key: "4",
    product: "Beef steak",
    quantity: 3,
    sku: "FR-2038-PRD",
    pricePerUnit: "$15.00",
    stockStatus: "Out of Stock",
  },
  {
    key: "5",
    product: "Lamb chops",
    quantity: 5,
    sku: "FR-9847-PRD",
    pricePerUnit: "$20.00",
    stockStatus: "In-Stock Item",
  },
  {
    key: "6",
    product: "Ground beef",
    quantity: 4,
    sku: "FR-1745-PRD",
    pricePerUnit: "$10.00",
    stockStatus: "In-Stock Item",
  },
  {
    key: "7",
    product: "Chicken wings",
    quantity: 10,
    sku: "FR-0987-PRD",
    pricePerUnit: "$6.00",
    stockStatus: "In-Stock Item",
  },
  {
    key: "8",
    product: "Salmon fillet",
    quantity: 2,
    sku: "FR-1932-PRD",
    pricePerUnit: "$18.00",
    stockStatus: "In-Stock Item",
  },
  {
    key: "9",
    product: "Turkey breast",
    quantity: 1,
    sku: "FR-3847-PRD",
    pricePerUnit: "$25.00",
    stockStatus: "Out of Stock",
  },
  {
    key: "10",
    product: "Bacon",
    quantity: 3,
    sku: "FR-0982-PRD",
    pricePerUnit: "$5.00",
    stockStatus: "In-Stock Item",
  },
];

export const allOrders = {
  invoiceOrders,
  productOrders,
};
