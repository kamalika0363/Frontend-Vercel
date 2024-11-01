'use client'

import React, {useState, useMemo} from "react"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Switch,
    Checkbox,
    SortDescriptor
} from "@nextui-org/react"
import {Pencil1Icon, TrashIcon, ChevronUpIcon, ChevronDownIcon} from "@radix-ui/react-icons"

import {products as productData, Product} from "./data"
import EditProductModal from "@/components/modals/EditProductModal";
import DeleteProductModal from "@/components/modals/DeleteProductModal";

const columns = [
    {key: "productName", label: "PRODUCT NAME", sortable: true},
    {key: "stock", label: "STOCK", sortable: true},
    {key: "sku", label: "SKU", sortable: true},
    {key: "availability", label: "AVAILABILITY", sortable: true},
    {key: "actions", label: "ACTIONS"},
]

export default function ActiveProductsTable() {
    const [products, setProducts] = useState<Product[]>(productData)
    const [selectedKeys, setSelectedKeys] = useState(new Set([]))
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        direction: "ascending",
    })

    const [page, setPage] = useState(1)
    const rowsPerPage = 5

    const [nameFilter, setNameFilter] = useState("")
    const [skuFilter, setSkuFilter] = useState("")

    const [editModalProduct, setEditModalProduct] = useState<Product | null>(null)
    const [deleteModalProduct, setDeleteModalProduct] = useState<Product | null>(null)

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            return (
                product.productName.toLowerCase().includes(nameFilter.toLowerCase()) &&
                product.sku.toLowerCase().includes(skuFilter.toLowerCase())
            )
        })
    }, [products, nameFilter, skuFilter])

    const sortedItems = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            const first = a[sortDescriptor.column as keyof Product]
            const second = b[sortDescriptor.column as keyof Product]
            const cmp = first < second ? -1 : first > second ? 1 : 0

            return sortDescriptor.direction === "descending" ? -cmp : cmp
        })
    }, [filteredProducts, sortDescriptor])

    const pages = Math.ceil(sortedItems.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return sortedItems.slice(start, end)
    }, [page, sortedItems])

    const handleEdit = (product: Product) => {
        setEditModalProduct(product)
    }

    const handleDelete = (product: Product) => {
        setDeleteModalProduct(product)
    }

    const handleSaveEdit = (editedProduct: Product) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.key === editedProduct.key ? editedProduct : product
            )
        )
        setEditModalProduct(null)
    }

    const handleConfirmDelete = (product: Product) => {
        setProducts(prevProducts =>
            prevProducts.filter(p => p.key !== product.key)
        )
        setDeleteModalProduct(null)
    }

    const handleStockToggle = (product: Product) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.key === product.key
                    ? {...p, stock: p.stock === "In-Stock" ? "Out-of-Stock" : "In-Stock"}
                    : p
            )
        )
    }


    const renderCell = (product: Product, columnKey: React.Key) => {
        switch (columnKey) {
            case "actions":
                return (
                    <div className="flex space-x-2">
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
                    </div>
                )
            case "stock":
                return (
                    <Switch
                        size="sm"
                        color="secondary"
                        isSelected={product.stock === "In-Stock"}
                        onValueChange={() => handleStockToggle(product)}
                    >
                        {product.stock}
                    </Switch>
                )
            default:
                return product[columnKey as keyof Product]
        }
    }


    return (
        <div className="flex flex-col gap-3">
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
            <Table
                aria-label="Product information table with pagination"
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => setSelectedKeys(keys)}
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor as any}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            allowsSorting={column.sortable}
                        >
                            {column.label}
                            {column.sortable && column.key === sortDescriptor.column && (
                                sortDescriptor.direction === "ascending" ? (
                                    <ChevronUpIcon className="inline ml-1"/>
                                ) : (
                                    <ChevronDownIcon className="inline ml-1"/>
                                )
                            )}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <EditProductModal
                product={editModalProduct}
                onClose={() => setEditModalProduct(null)}
                onSave={handleSaveEdit}
            />
            <DeleteProductModal
                product={deleteModalProduct}
                onClose={() => setDeleteModalProduct(null)}
                onDelete={handleConfirmDelete}
            />
        </div>
    )
}