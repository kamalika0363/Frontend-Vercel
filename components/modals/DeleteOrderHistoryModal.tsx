'use client'

import React from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import {OrderHistory} from "@/lib/franchiserStore/data";

interface DeleteOrderHistoryModalProps {
    order: OrderHistory | null;
    onClose: () => void;
    onDelete: (order: OrderHistory) => void;
}

export default function DeleteOrderHistoryModal({ order, onClose, onDelete }: DeleteOrderHistoryModalProps) {
    if (!order) return null;

    const handleDelete = () => {
        onDelete(order);
        onClose();
    };

    return (
        <Modal isOpen={!!order} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Confirm Deletion</ModalHeader>
                <ModalBody>
                    <p>
                        Are you sure you want to delete the order with invoice number: <strong>{order.orderId}</strong>? This action cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" variant="light" onPress={onClose}>Cancel</Button>
                    <Button color="danger" onPress={handleDelete}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
