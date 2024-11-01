'use client'

import {useEffect, useState} from "react";
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch} from "@nextui-org/react";

interface Product {
    key: string;
    productName: string;
    stock: string;
    sku: string;
    availability: string;
    actions: string;
}

interface EditProductModalProps {
    product: Product | null;
    onClose: () => void;
    onSave: (editedProduct: Product) => void;
}

export default function EditProductModal({product, onClose, onSave}: EditProductModalProps) {
    const [editedProduct, setEditedProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (product) {
            setEditedProduct({...product});
        }
    }, [product]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedProduct(prev => prev ? {...prev, [name]: value} : null);
    };

    const handleStockToggle = () => {
        setEditedProduct(prev => prev ? {
            ...prev,
            stock: prev.stock === "In-Stock" ? "Out-of-Stock" : "In-Stock"
        } : null);
    };

    const handleSave = () => {
        if (editedProduct) {
            onSave(editedProduct);
        }
        onClose();
    };

    if (!product || !editedProduct) return null;

    return (
        <Modal isOpen={!!product} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Product Name"
                                name="productName"
                                value={editedProduct.productName}
                                onChange={handleInputChange}
                            />
                            <div className="flex items-center space-x-4">
                                <label>Stock</label>
                                <Switch
                                    size="sm"
                                    color="secondary"
                                    isSelected={editedProduct.stock === "In-Stock"}
                                    onValueChange={handleStockToggle}
                                >
                                    {editedProduct.stock}
                                </Switch>
                            </div>
                            <Input
                                label="SKU"
                                name="sku"
                                value={editedProduct.sku}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Availability"
                                name="availability"
                                value={editedProduct.availability}
                                onChange={handleInputChange}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color='danger' variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
