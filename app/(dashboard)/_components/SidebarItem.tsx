"use client"
import {LucideIcon} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@lib/utils";

type SidebarItemProps = {
    icon: LucideIcon
    label: string
    href: string
}

const SidebarItem = ({icon: Icon, label, href, ...props}: SidebarItemProps) => {
    const pathname = usePathname()
    const router = useRouter()

    const isActive =
        pathname === "/" && href === "/" ||
        pathname === href ||
        pathname?.startsWith(`${href}/`)

    const handleClick = () => {
        router.push(href)
    }

    const handleSignOut = () => {
        localStorage.removeItem("token")
        router.push("/sign-in")
    }

    return (
        <button
            {...props}
            onClick={label === "Sign Out" ? handleSignOut : handleClick}
            type={"button"}
            className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:dark:text-primary-foreground/90 hover:text-primary hover:bg-slate-300/5", isActive && "text-slate-800 dark:text-primary-foreground bg-primary/20 hover:bg-primary/30 hover:dark:text-primary-foreground")}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn("text-slate-500", isActive && "dark:text-primary-foreground text-slate-800")}/>
                {label}
            </div>
            <div
                className={cn("w-0.5 h-full justify-end ml-auto rounded-tl-full rounded-bl-full transition-all", isActive ? "bg-primary" : "bg-transparent")}
            />
        </button>
    );
};

export default SidebarItem;