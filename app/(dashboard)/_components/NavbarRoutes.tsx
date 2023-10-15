"use client"

import React from 'react';
import {usePathname} from "next/navigation";
import Link from "next/link"
import {Button} from "@components/ui/button";
import {Input} from "@components/ui/input";
import {Search} from "@node_modules/lucide-react";
import {SelectLanguagePrompt} from "@components/ui/select-language";
import {ModeToggle} from "@components/ui/toggle-mode";
import {UserNav} from "@components/ui/user-nav";



const NavbarRoutes = () => {

    const pathname = usePathname();

    let actualLink

    pathname?.startsWith('/') ? actualLink = "Dashboard" : actualLink = pathname?.split("/")[0]

    return (
        <div className="flex gap-x-2 justify-between items-center w-full">
            <Link href={`/${actualLink}`} className={"w-1/2"}>
                <Button variant="ghost" size="sm">
                    {actualLink}
                </Button>
            </Link>

            <div className="flex relative w-full h-full items-center justify-end">
                <Input placeholder="Search" variant="outline" className="px-10" />
                <Search size={18} className="text-slate-500 absolute left-3" />
            </div>

            <div className="flex w-full gap-x-5 justify-end">
                <SelectLanguagePrompt />
                <ModeToggle />
                <UserNav />
            </div>
        </div>
    );
};

export default NavbarRoutes;