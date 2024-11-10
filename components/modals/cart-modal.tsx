'use client'

import React from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
} from '@nextui-org/react'
import {Order} from "@/components/franchisee/place-order/data"

interface CartModalProps {
    orders: Order[]
    onClose: () => void
}

export default function CartModal({orders = [], onClose}: CartModalProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    const totalAmount = orders.reduce((sum, order) => {
        return sum + (order.quantity * Number(order.pricePerUnit.replace('$', '')))
    }, 0)

    return (
        <div>
            <Button
                onPress={onOpen}
                className="ml-auto w-[fit-content] bg-slate-700 text-white font-semibold rounded-md"
            >
                Add to Cart ({orders.length})
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h3 className="text-lg font-semibold">Order Details</h3>
                                <p className="text-sm text-muted-foreground">
                                    117 Cross ave, Oakville
                                </p>
                                <p className="text-sm text-muted-foreground">#F-0120124-68</p>
                            </ModalHeader>
                            <ModalBody className="gap-6">
                                {orders.length > 0 ? (
                                    <>
                                        <div className="space-y-4">
                                            {orders.map((order, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center py-2 border-b"
                                                >
                                                    <div>
                                                        <p className="font-medium">{order.product}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Quantity: {order.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="font-medium">
                                                        ${(Number(order.pricePerUnit.replace('$', '')) * order.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t">
                                            <p className="font-semibold">Total Amount</p>
                                            <p className="font-semibold">${totalAmount.toFixed(2)}</p>
                                        </div>
                                    </>
                                ) : (
                                    <p>No items selected. Please select items from the table.</p>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}