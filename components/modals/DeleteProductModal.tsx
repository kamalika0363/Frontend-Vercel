'use client'

import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

interface Product {
    key: string;
    productName: string;
    stock: string;
    sku: string;
    availability: string;
    actions: string;
}

interface DeleteProductModalProps {
    product: Product | null;
    onClose: () => void;
    onDelete: (product: Product) => void;
}

export default function DeleteProductModal({product, onClose, onDelete}: DeleteProductModalProps) {
    if (!product) return null

    const handleDelete = () => {
        onDelete(product)
        onClose()
    }

    return (
        <Modal isOpen={!!product} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
                        <ModalBody>
                            <p>
                                Are you sure you want to delete the product {product.productName}?
                                This action cannot be undone.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="danger" onPress={handleDelete}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}