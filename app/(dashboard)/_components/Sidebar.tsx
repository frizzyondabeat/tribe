"use client"
import React from 'react';
import {Logo} from "@app/(dashboard)/_components";
import {Layout, LucideUsers, Settings, LogOut} from "@node_modules/lucide-react";
import SidebarItem from "@app/(dashboard)/_components/SidebarItem";

const sidebarRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: LucideUsers,
        label: "Users",
        href: "/users"
    },
    {
        icon: Settings,
        label: "Settings",
        href: "/settings"
    },
    {
        icon: LogOut,
        label: "Sign Out",
        href: "/sign-out"
    }

]

const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-6 flex justify-center items-center">
                <Logo className="text-primary"/>
            </div>
            <div className="flex flex-col w-full">
                {
                    sidebarRoutes.map((route, index) => (
                        <SidebarItem icon={route.icon} label={route.label} href={route.href} key={index}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Sidebar;