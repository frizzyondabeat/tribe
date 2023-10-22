import React from 'react';
import {usePathname} from "next/navigation";
import Link from "next/link"
import {Button} from "@components/ui/button";
import {Input} from "@components/ui/input";
import {PlusIcon, Search} from "@node_modules/lucide-react";
import {ModeToggle} from "@components/ui/toggle-mode";
import {UserNav} from "@components/ui/user-nav";


const NavbarRoutes = () => {

    const pathname = usePathname();

    const navHeader = pathname.split("/")[1] ? pathname.split("/")[1] : "dashboard"

    return (
        <div className="flex gap-x-5 justify-between items-center w-full">
            <Link href={pathname.split("/")[1] ? `/${pathname.split("/")[1]}` : "/"} className={"w-1/2"}>
                <Button variant="ghost" size="sm" className="capitalize">
                    {navHeader}
                </Button>
            </Link>
            <div className="md:flex relative w-full h-full items-center justify-center hidden">
                <Input placeholder="Search" className="px-10" />
                <Search size={18} className="text-slate-500 absolute left-3" />
            </div>

            <div className="flex gap-x-5 w-full justify-end">
                {/*<SelectLanguagePrompt />*/}
                {
                    navHeader === "users" && !pathname.includes("create") && (
                        <Link href={`/${navHeader}/create`}>
                            <Button variant="default" size="sm" className="capitalize">
                                Create
                                <PlusIcon size={18} className="ml-2" />
                            </Button>
                        </Link>
                    )
                }
                <ModeToggle />
                <UserNav />
            </div>
        </div>
    );
};

export default NavbarRoutes;