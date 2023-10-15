import React from 'react';
import {MobileSidebar, NavbarRoutes} from "@app/(dashboard)/_components/index";

const Navbar = () => {
    return (
        <div className="p-4 h-full flex items-center justify-between border-b shadow-sm backdrop-blur-sm">
            <MobileSidebar/>
            <NavbarRoutes/>
        </div>
    );
};

export default Navbar;