"use client"

import React, {useEffect, useState} from 'react';
import {usePathname} from "next/navigation";
import Link from "next/link"
import {Button} from "@components/ui/button";
import {Input} from "@components/ui/input";
import {Search} from "@node_modules/lucide-react";
import {ModeToggle} from "@components/ui/toggle-mode";
import {UserNav} from "@components/ui/user-nav";
import {Skeleton} from "@components/ui/skeleton";



const NavbarRoutes = () => {

    const pathname = usePathname();

    const [navHeader, setNavHeader] = useState<string>();

    useEffect(() => {
        setNavHeader(pathname === "/" ? "Dashboard" : pathname.split("/")[1]);
    }, [pathname]);

    return (
        <div className="flex gap-x-5 justify-between items-center w-full">
            {
                navHeader
                    ? (
                        <Link href={`/${navHeader === "Dashboard" ? "" : navHeader}`} className={"w-1/2"}>
                            <Button variant="ghost" size="sm" className="capitalize">
                                {navHeader && navHeader}
                            </Button>
                        </Link>
                    )
                    : (
                        <Skeleton className="h-5 w-1/2" />
                    )
            }

            <div className="md:flex relative w-full h-full items-center justify-center hidden">
                <Input placeholder="Search" className="px-10" />
                <Search size={18} className="text-slate-500 absolute left-3" />
            </div>

            <div className="flex gap-x-5 w-full justify-end">
                {/*<SelectLanguagePrompt />*/}
                <ModeToggle />
                <UserNav />
            </div>
        </div>
    );
};

export default NavbarRoutes;