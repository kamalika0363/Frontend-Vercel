'use client';
import React from "react";
import {Sidebar} from "./sidebar.styles";
import {SidebarItem} from "./sidebar-item";
import {SidebarMenu} from "./sidebar-menu";
import {useSidebarContext} from "../layout/layout-context";
import {usePathname} from "next/navigation";
import Image from "next/image";
import logo from "../../public/logo.svg";
import {ClipboardIcon, CodeSandboxLogoIcon, CubeIcon, LayersIcon, Pencil2Icon, PersonIcon} from "@radix-ui/react-icons";
import {Button} from "@nextui-org/react";

export const SidebarWrapper = () => {
    const pathname = usePathname();
    const {collapsed, setCollapsed} = useSidebarContext();
    const isFranchiser = pathname.startsWith('/franchisee');

    return (
        <aside className="h-screen z-[20] sticky top-0">
            {collapsed ? (
                <div className={Sidebar.Overlay()} onClick={setCollapsed}/>
            ) : null}
            <div
                className={Sidebar({
                    collapsed: collapsed,
                })}
            >
                <div className={Sidebar.Header()}>
                    <Image src={logo} alt="logo"/>
                </div>
                <div className="flex flex-col justify-between h-full">
                    <div className={Sidebar.Body()}>
                        <SidebarMenu title="Main Menu">
                            {isFranchiser ? (
                                <>
                                    <SidebarItem
                                        isActive={pathname === "/franchisee/orders"}
                                        title="Orders"
                                        icon={<CubeIcon/>}
                                        href="/franchisee/orders"/>
                                    <SidebarItem
                                        isActive={pathname === "/franchisee/place-order"}
                                        title="Place Order"
                                        icon={<LayersIcon/>}
                                        href="/franchisee/place-order"/>
                                    <SidebarItem
                                        isActive={pathname === "/franchisee/order-history"}
                                        title="Order History"
                                        icon={<Pencil2Icon/>}
                                        href="/franchisee/order-history"/>
                                </>
                            ) : (
                                <>
                                    <SidebarItem
                                        isActive={pathname === "/orders"}
                                        title="Orders"
                                        icon={<CubeIcon/>}
                                        href="/franchiser/orders"
                                    />
                                    <SidebarItem
                                        isActive={pathname === "/order-history"}
                                        title="Orders History"
                                        icon={<ClipboardIcon/>}
                                        href="/franchiser/order-history"
                                    />
                                    <SidebarItem
                                        isActive={pathname === "/franchise-info"}
                                        title="Franchise Information"
                                        icon={<PersonIcon/>}
                                        href="/franchiser/franchise-info"
                                    />
                                    <SidebarItem
                                        isActive={pathname === "/active-products"}
                                        title="Active Products"
                                        icon={<CodeSandboxLogoIcon/>}
                                        href="/franchiser/active-products"
                                    />
                                </>
                            )}
                        </SidebarMenu>
                    </div>
                </div>
                <Button className='bg-slate-700 text-gray-100 font-semibold text-md rounded-md'>
                    Logout
                </Button>
            </div>
        </aside>
    )
        ;
};