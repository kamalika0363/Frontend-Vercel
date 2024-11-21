'use client'

import {useEffect, useState} from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

interface Order {
    key: string;
    orderInvoice: string;
    orderStatus: string;
    date: string;
    amount: string;
}

interface EditProductModalProps {
    order: Order | null;
    onClose: () => void;
    onSave: (editedOrder: Order) => void;
}

export default function EditProductModal({order, onClose, onSave}: EditProductModalProps) {
    const [editedOrder, setEditedOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (order) {
            setEditedOrder({...order});
        }
    }, [order]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedOrder(prev => prev ? {...prev, [name]: value} : null);
    };

    const handleSave = () => {
        if (editedOrder) {
            onSave(editedOrder);
        }
        onClose();
    };

    if (!order || !editedOrder) return null;

    return (<Modal isOpen={!!order} onClose={onClose}>
        <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Edit Order</ModalHeader>
            <ModalBody>
                <Input
                    name="orderInvoice"
                    value={editedOrder.orderInvoice}
                    onChange={handleInputChange}
                />
                <Input
                    name="orderStatus"
                    value={editedOrder.orderStatus}
                    onChange={handleInputChange}
                />
                <Input
                    name="date"
                    value={editedOrder.date}
                    onChange={handleInputChange}
                />
                <Input
                    name="amount"
                    value={editedOrder.amount}
                    onChange={handleInputChange}
                />
            </ModalBody>
            <ModalFooter>
                <Button variant="cancel" onClick={onClose}>Cancel</Button>
                <Button variant="save" onClick={handleSave}>Save</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>);
}
