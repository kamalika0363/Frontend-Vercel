'use client'

import React, { useEffect, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import {OrderHistory} from "@/components/franchiser/order-history/data";

interface EditOrderHistoryModalProps {
    order: OrderHistory | null;
    onClose: () => void;
    onSave: (editedOrder: OrderHistory) => void;
}

export default function EditOrderHistoryModal({ order, onClose, onSave }: EditOrderHistoryModalProps) {
    const [editedOrder, setEditedOrder] = useState<OrderHistory | null>(null);

    useEffect(() => {
        if (order) {
            setEditedOrder({ ...order });
        }
    }, [order]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedOrder((prev) => (prev ? { ...prev, [name]: value } : null));
    };

    const handleSave = () => {
        if (editedOrder) {
            onSave(editedOrder); // Send back the edited `OrderHistory`
        }
        onClose();
    };

    if (!order || !editedOrder) return null;

    return (
        <Modal isOpen={!!order} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Edit Order</ModalHeader>
                <ModalBody>
                    <Input
                        label="Location"
                        name="location"
                        value={editedOrder.location}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Order ID"
                        name="orderId"
                        value={editedOrder.orderId}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Order Status"
                        name="orderStatus"
                        value={editedOrder.orderStatus}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Order Fulfilled"
                        name="orderFulfilled"
                        value={editedOrder.orderFulfilled}
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
                    <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
