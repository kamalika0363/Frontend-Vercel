'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import {users} from '@/components/franchiser/orders/data';
import {Card, CardBody, CardHeader, Chip, Divider} from "@nextui-org/react";

const statusConfig = {
    "completed": {
        color: "secondary",
        variant: "solid",
        className: "bg-[#e6e6f2] text-[#4a4aff]",
    },
    "queue": {
        color: "primary",
        variant: "solid",
        className: "bg-[#f3f3f3] text-[#676767]",
    },
    "ready for pickup": {
        color: "warning",
        variant: "solid",
        className: "bg-[#ffeccc] text-[#965e00]",
    },
    "in preparation": {
        color: "default",
        variant: "solid",
        className: "bg-[#e4ffe4] text-[#1fac1c]",
    },
}

const getStatusConfig = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    return statusConfig[normalizedStatus] || statusConfig["in preparation"];
}

export default function OrderDetails() {
    const {id} = useParams();
    const parsedOrderId = parseInt(id as string);
    const order = users.find(user => user.id === parsedOrderId);

    if (!order) {
        return <div>Order not found</div>;
    }

    const {className} = getStatusConfig(order.orderStatus);

    return (
        <Card className="my-6 w-80">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <div>{`Order #${order.id}`}</div>
                    <div color="primary">{order.location}</div>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className="space-y-4">
                    <div>
                        <div className="font-bold">
                            Order Status: <Chip className={`${className} w-full`} variant="solid">
                            {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                        </Chip>
                        </div>
                    </div>
                    <div>Date: {order.date}</div>
                    <div>Amount: {order.amount}</div>
                    <div>Email: {order.email}</div>
                </div>
            </CardBody>
        </Card>
    );
}
