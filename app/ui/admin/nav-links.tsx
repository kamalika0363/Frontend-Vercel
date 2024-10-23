"use client";

import {usePathname} from "next/navigation";
import {BackpackIcon, CubeIcon, DashboardIcon, LayersIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {clsx} from "clsx";

const links = [
    {name: "Orders", href: "/admin/dashboard/orders", icon: LayersIcon},
    {name: "Franchises", href: "/admin/dashboard/franchises", icon: BackpackIcon},
    {name: "Products", href: "/admin/dashboard/products", icon: CubeIcon},
]
export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center text-[#676767] justify-center gap-2 text-md font-medium md:flex-none md:justify-start ",
                            {
                                "text-black": pathname === link.href,
                            }
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}