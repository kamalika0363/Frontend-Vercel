'use client'

import { useEffect, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

interface Order {
    key: string;
    orderInvoice: string;
    orderStatus: string;
    date: string;
    amount: string;
}

interface EditProductModalProps {
    order: Order | null; // Change to Order
    onClose: () => void;
    onSave: (editedOrder: Order) => void; // Change to Order
}

export default function EditProductModal({ order, onClose, onSave }: EditProductModalProps) {
    const [editedOrder, setEditedOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (order) {
            setEditedOrder({ ...order });
        }
    }, [order]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedOrder(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSave = () => {
        if (editedOrder) {
            onSave(editedOrder); // Call onSave with editedOrder
        }
        onClose();
    };

    if (!order || !editedOrder) return null;

    return (
        <Modal isOpen={!!order} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Order</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Order Invoice"
                                name="orderInvoice"
                                value={editedOrder.orderInvoice}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Order Status"
                                name="orderStatus"
                                value={editedOrder.orderStatus}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Date"
                                name="date"
                                value={editedOrder.date}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Amount"
                                name="amount"
                                value={editedOrder.amount}
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
