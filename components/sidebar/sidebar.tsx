import React from "react";
import {Sidebar} from "./sidebar.styles";
import {SidebarItem} from "./sidebar-item";
import {SidebarMenu} from "./sidebar-menu";
import {useSidebarContext} from "../layout/layout-context";
import {usePathname} from "next/navigation";
import Image from "next/image";
import logo from "../../public/logo.svg";
import {ClipboardIcon, CodeSandboxLogoIcon, CubeIcon, PersonIcon} from "@radix-ui/react-icons";
import {Button} from "@nextui-org/react";

export const SidebarWrapper = () => {
    const pathname = usePathname();
    const {collapsed, setCollapsed} = useSidebarContext();

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
                            <SidebarItem
                                isActive={pathname === "/orders"}
                                title="Orders"
                                icon={<CubeIcon />}
                                href="orders"
                            />
                            <SidebarItem
                                isActive={pathname === "/franchise-info-history"}
                                title="Orders History"
                                icon={<ClipboardIcon />}
                                href="franchise-info-history"
                            />
                            <SidebarItem
                                isActive={pathname === "/franchise-info"}
                                title="Franchise Information"
                                icon={<PersonIcon />}
                                href="franchise-info"
                            />
                            <SidebarItem
                                isActive={pathname === "/active-products"}
                                title="Active Products"
                                icon={<CodeSandboxLogoIcon/>}
                                href="active-products"
                            />
                        </SidebarMenu>
                    </div>
                </div>
                <Button className='bg-slate-700 text-gray-100 font-semibold text-md rounded-md'>
                    Logout
                </Button>
            </div>
        </aside>
    );
};
