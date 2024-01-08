"use client"
import React from 'react';
import {Logo} from "@app/(dashboard)/_components";
import {
    BarChart2Icon, CheckCircle2Icon,
    Layout,
    LogOut,
    LucideUsers,
    Settings,
    ShieldIcon,
    StickyNoteIcon,
    UsersIcon
} from "@node_modules/lucide-react";
import SidebarItem from "@app/(dashboard)/_components/SidebarItem";
import {User} from "lucide-react";

const sidebarRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: LucideUsers,
        label: "Users",
        href: "/users",
        subCategories: [
            {
                icon: ShieldIcon,
                label: "Admin Users",
                href: "/users/admin"
            },
            {
                icon: User,
                label: "App Users",
                href: "/users/app"
            }
        ]
    },
    {
        icon: BarChart2Icon,
        label: "Transactions",
        href: "/transactions"
    },
    {
        icon: Settings,
        label: "Settings",
        href: "/settings"
    },
    {
        icon: CheckCircle2Icon,
        label: "Approvals",
        href: "/approvals"
    },
    {
        icon: StickyNoteIcon,
        label: "Audit Logs",
        href: "/audit-logs"
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
                {/*@ts-ignore*/}
                <Logo className="dark:text-primary-foreground font-bold"/>
            </div>
            <div className="flex flex-col w-full">
                {
                    sidebarRoutes.map((route, index) => (
                        <SidebarItem icon={route.icon} label={route.label} href={route.href} key={index} subCategory={route?.subCategories}/>
                    ))
                }
            </div>
        </div>
    );
};

export default Sidebar;