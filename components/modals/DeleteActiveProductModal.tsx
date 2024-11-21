'use client';
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import { Button } from "@/components/ui/button";

interface Product {
    key: string;
    productName: string;
    stock: string;
    sku: string;
    availability: string;
    actions: string;
}

interface DeleteActiveProductModalProps {
    product: Product | null;
    onClose: () => void;
    onDelete: (product: Product) => void;
}

export default function DeleteProductModal({product, onClose, onDelete}: DeleteActiveProductModalProps) {
    if (!product) return null;

    const handleDelete = () => {
        onDelete(product);
        onClose();
    };

    return (
        <Modal isOpen={!!product} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
                <ModalBody>
                    <p>
                        Are you sure you want to delete the product: <strong>{product.productName}</strong>?
                        This action cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="cancel" onClick={onClose}>Cancel</Button>
                    <Button color="delete" onClick={handleDelete}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
