'use client'

import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {Button} from "@/components/ui/button";
interface Order {
    key: string;
    orderInvoice: string;
    orderStatus: string;
    date: string;
    amount: string;
}

interface DeleteOrderModalProps {
    order: Order | null;
    onClose: () => void;
    onDelete: (order: Order) => void;
}

export default function DeleteOrderModal({order, onClose, onDelete}: DeleteOrderModalProps) {
    if (!order) return null;

    const handleDelete = () => {
        onDelete(order);
        onClose();
    };

    return (<Modal isOpen={!!order} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
                <ModalBody>
                    <p>
                        Are you sure you want to delete the order with invoice
                        number: <strong>{order.orderInvoice}</strong>?
                        This action cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="cancel" onClick={onClose}>Cancel</Button>
                    <Button variant="delete"  onClick={handleDelete}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>);
}
