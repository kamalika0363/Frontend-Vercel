'use client';
import {useEffect, useState} from "react";
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

interface Product {
    key: string;
    productName: string;
    stock: string;
    sku: string;
    availability: string;
    actions: string;
}

interface ActiveProductModalProps {
    product: Product | null;
    onClose: () => void;
    onSave: (editedProduct: Product) => void;
}

export default function ActiveProductModal({product, onClose, onSave}: ActiveProductModalProps) {
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
                <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
                <ModalBody>
                    <Input
                        label="Product Name"
                        name="productName"
                        value={editedProduct.productName}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Stock"
                        name="stock"
                        value={editedProduct.stock}
                        onChange={handleInputChange}
                    />
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
                    <Button color='danger' variant="light" onPress={onClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
