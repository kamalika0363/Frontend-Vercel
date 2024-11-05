import {Navbar, NavbarContent} from "@nextui-org/react";
import React from "react";
import {BurguerButton} from "./burguer-button";

interface Props {
    children: React.ReactNode;
}

export const NavbarWrapper = ({children}: Props) => {
    return (
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Navbar>
                <NavbarContent className="md:hidden">
                    <BurguerButton/>
                </NavbarContent>
            </Navbar>
            {children}
        </div>
    );
};
