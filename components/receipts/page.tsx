"use client";

import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { Order } from "../franchisee/place-order/data";

interface ReceiptProps {
    orderId: string;
    currentDate: string;
    selectedOrders: Order[];
}

export default function Receipt({ orderId, currentDate, selectedOrders }: ReceiptProps) {
    const calculateTotal = () => {
        return selectedOrders.reduce((total, order) => {
            return total + (order.quantity * parseFloat(order.pricePerUnit.replace('$', '')));
        }, 0);
    };

    return (
        <Card className="w-80 h-fit sticky top-4">
            <CardHeader className="flex flex-col gap-2">
                <div className="flex justify-between w-full">
                    <h3 className="text-lg font-semibold">Order Details</h3>
                    <span className="text-sm text-default-500">
                        #{orderId}
                    </span>
                </div>
                <div className="flex justify-between w-full text-sm text-default-500">
                    <span>Date:</span>
                    <span>{currentDate}</span>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                {selectedOrders.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {selectedOrders.map((order) => (
                            <div key={order.key} className="flex flex-col gap-1">
                                <div className="flex justify-between">
                                    <span className="font-medium">{order.product}</span>
                                    <span className="font-medium">
                                        ${(parseFloat(order.pricePerUnit.replace('$', '')) * order.quantity).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-default-500">
                                    <span>Quantity: {order.quantity}</span>
                                    <span>{order.pricePerUnit} each</span>
                                </div>
                            </div>
                        ))}
                        <Divider/>
                        <div className="flex justify-between font-semibold">
                            <span>Total Amount</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-default-500 py-4">
                        No items selected
                    </div>
                )}
            </CardBody>
        </Card>
    );
}