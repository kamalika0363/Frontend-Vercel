'use client'

import { usePathname } from 'next/navigation'
import React from "react"
import { BurguerButton } from "./burguer-button"

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

export const NavbarWrapper = ({ children }: Props) => {
    const pathname = usePathname()
    let pageTitle = routeTitles[pathname]

    if (pathname?.startsWith('/franchiser/orders/') && !pageTitle) {
        pageTitle = 'Order Details'
    }

    pageTitle = pageTitle || 'Dashboard'

    return (
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden my-4 px-4 max-w-[95rem] mx-auto w-full gap-4">
            <div className="md:hidden m-4">
                <BurguerButton />
            </div>
            <div className="px-4 py-6 md:flex justify-start">
                <p className="font-bold text-gray-500 text-2xl">{pageTitle}</p>
            </div>
            {children}
        </div>
    )
}
