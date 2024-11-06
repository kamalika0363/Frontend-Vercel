import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from '@nextui-org/react';
import {Order} from "@/components/franchisee/place-order/data";

interface CartModalProps {
    visible: boolean;
    onClose: () => void;
    orders: Order[];
}

const CartModal: React.FC<CartModalProps> = ({visible, onClose, orders}) => {
    const totalAmount = orders.reduce((acc, order) => acc + order.quantity * parseFloat(order.pricePerUnit.replace('$', '')), 0);
    const [modalPlacement, setModalPlacement] = React.useState("right");

    return (
        <Modal
            open={visible}
            onClose={onClose}
            closeButton
            aria-labelledby="cart-modal"
            width="600px"
            value={modalPlacement}
        >
            <ModalHeader>
                <div id="cart-modal" h2>
                    Cart Details
                </div>
            </ModalHeader>
            <ModalBody>
                {orders.map((order) => (
                    <div key={order.key} className="flex justify-between mb-2">
                        <div>{`${order.product} x${order.quantity}`}</div>
                        <div>{`$${(order.quantity * parseFloat(order.pricePerUnit.replace('$', ''))).toFixed(2)}`}</div>
                    </div>
                ))}
                <div className="flex justify-between font-bold mt-4">
                    <div>Total Amount:</div>
                    <div>{`$${totalAmount.toFixed(2)}`}</div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button auto flat onClick={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CartModal;
