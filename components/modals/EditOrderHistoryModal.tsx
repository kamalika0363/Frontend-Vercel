'use client'

import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import {OrderHistory} from "@/lib/franchiserStore/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
                        name="location"
                        value={editedOrder.location}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="orderId"
                        value={editedOrder.orderId}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="orderStatus"
                        value={editedOrder.orderStatus}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="orderFulfilled"
                        value={editedOrder.orderFulfilled}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="amount"
                        value={editedOrder.amount}
                        onChange={handleInputChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant="delete" onClick={onClose}>Cancel</Button>
                    <Button variant="save" onClick={handleSave}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
