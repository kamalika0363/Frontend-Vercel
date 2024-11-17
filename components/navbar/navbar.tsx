'use client'

import {usePathname} from 'next/navigation'
import React from "react"
import {BurguerButton} from "./burguer-button"

interface Props {
    children: React.ReactNode
}

const routeTitles: { [key: string]: string } = {
    '/franchisee/place-order': 'Place Order',
    '/franchisee/order-history': 'Order History',
    '/franchisee/orders': 'Orders',
    '/franchiser/active-products': 'Active Products',
    '/franchiser/products': 'Products',
    '/franchiser/orders': 'Orders',
    '/franchiser/order-history': 'Order History',
    '/franchiser/franchise-info': 'Franchise Info',
}

export const NavbarWrapper = ({children}: Props) => {
    const pathname = usePathname()
    const pageTitle = routeTitles[pathname] || 'Dashboard'

    return (
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="md:hidden m-4">
                <BurguerButton/>
            </div>
            <div className="px-4 md:px-12 py-6 md:flex justify-start">
                <div>
                    <p className="font-bold text-gray-500 text-2xl">{pageTitle}</p>
                </div>
            </div>
            {children}
        </div>
    )
}
