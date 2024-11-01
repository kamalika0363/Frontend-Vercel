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
