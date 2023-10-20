import React from 'react';
import {Sheet, SheetContent, SheetTrigger} from "@components/ui/sheet";
import {Menu} from "lucide-react";
import {Sidebar} from "@app/(dashboard)/_components";

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-80 transition-all duration-300 ease-in-out">
                <Menu className="dark:text-primary-foreground text-slate-700"/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-1/2">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;