'use client'

import React, {Key, useMemo, useState} from "react";
import {Button, Input, Switch} from "@nextui-org/react";
import {Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";
import {Product, products as productData} from "./data";
import CustomPagination from "@/components/CustomPagination/page";
import ReusableTable from "@/components/table/reusable-table";
import {useSortedFilteredItems} from "@/components/hooks/useSortedFilteredItems";
import EditActiveProductsModal from "@/components/modals/EditActiveProductsModal";
import DeleteActiveProductModal from "@/components/modals/DeleteActiveProductModal";

type CustomSortDescriptor = {
    column: string; direction: "ascending" | "descending";
};

const columns = [{key: "productName", label: "PRODUCT NAME", sortable: true}, {
    key: "stock", label: "STOCK", sortable: true
}, {key: "sku", label: "SKU", sortable: true}, {
    key: "availability", label: "AVAILABILITY", sortable: true
}, {key: "actions", label: "ACTIONS"},];

export default function ActiveProductsTable() {
    const [products, setProducts] = useState<Product[]>(productData);
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set());
    const [sortDescriptor, setSortDescriptor] = useState<CustomSortDescriptor>({
        column: 'productName', direction: 'ascending',
    });
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const [nameFilter, setNameFilter] = useState("");
    const [skuFilter, setSkuFilter] = useState("");

    const [editModalProduct, setEditModalProduct] = useState<Product | null>(null);
    const [deleteModalProduct, setDeleteModalProduct] = useState<Product | null>(null);

    const filters = {
        productName: nameFilter, sku: skuFilter,
    };

    const sortedItems = useSortedFilteredItems(products, filters, sortDescriptor, ["productName", "sku"]);

    const pages = Math.ceil(sortedItems.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return sortedItems.slice(start, end);
    }, [page, sortedItems]);

    const handleEdit = (product: Product) => {
        setEditModalProduct(product);
    };

    const handleDelete = (product: Product) => {
        setDeleteModalProduct(product);
    };

    const handleSaveEdit = (editedProduct: Product) => {
        setProducts(prevProducts => prevProducts.map(product => product.sku === editedProduct.sku ? editedProduct : product));
        setEditModalProduct(null);
    };

    const handleConfirmDelete = (product: Product) => {
        setProducts(prevProducts => prevProducts.filter(p => p.sku !== product.sku));
        setDeleteModalProduct(null);
    };

    const handleSelectionChange = (keys: Set<Key>) => {
        setSelectedKeys(keys);
    };

    const handleStockToggle = (product: Product) => {
        setProducts(prevProducts => prevProducts.map(p => p.sku === product.sku ? {
            ...p, stock: p.stock === "In-Stock" ? "Out-of-Stock" : "In-Stock"
        } : p));
    };

    const renderCell = (product: Product, columnKey: React.Key) => {
        switch (columnKey) {
            case "actions":
                return (<div className="flex space-x-2">
                    <Button
                        isIconOnly
                        aria-label="Edit"
                        onClick={() => handleEdit(product)}
                        className="bg-[#e6f6eb] text-[#1e8255] border-[#1e8255]"
                    >
                        <Pencil1Icon className="h-4 w-4"/>
                    </Button>
                    <Button
                        isIconOnly
                        aria-label="Delete"
                        onClick={() => handleDelete(product)}
                        className="bg-[#feebec] text-[#ce292e] border-[#ce292e]"
                    >
                        <TrashIcon className="h-4 w-4"/>
                    </Button>
                </div>);
            case "stock":
                return (<Switch
                    size="sm"
                    color="secondary"
                    isSelected={product.stock === "In-Stock"}
                    onValueChange={() => handleStockToggle(product)}
                >
                    {product.stock}
                </Switch>);
            default:
                return product[columnKey as keyof Product];
        }
    };

    return (<div className="flex flex-col gap-3">
        <div className="flex space-x-4 mb-4">
            <Input
                placeholder="Search by Product Name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
            />
            <Input
                placeholder="Search by SKU"
                value={skuFilter}
                onChange={(e) => setSkuFilter(e.target.value)}
            />
        </div>

        <ReusableTable
            columns={columns}
            items={items}
            selectedKeys={selectedKeys}
            handleSelectionChange={handleSelectionChange}
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
            renderCell={renderCell}
        />

        <CustomPagination
            page={page}
            pages={pages}
            rowsPerPage={rowsPerPage}
            totalItems={sortedItems.length}
            onPageChange={setPage}
        />

        {/*TODO: Fix EditProductModal and DeleteProductModal */}
        <EditActiveProductsModal
            product={editModalProduct}
            onClose={() => setEditModalProduct(null)}
            onSave={handleSaveEdit}
        />
        <DeleteActiveProductModal
            product={deleteModalProduct}
            onClose={() => setDeleteModalProduct(null)}
            onDelete={handleConfirmDelete}
        />
    </div>);
}
