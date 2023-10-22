"use client"
import {LucideIcon} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@lib/utils";
import {signOut} from "@node_modules/next-auth/react";

type SidebarItemProps = {
    icon: LucideIcon
    label: string
    href: string
    subCategory?: {
        icon: LucideIcon
        label: string
        href: string
    }[]
}

const SidebarItem = ({icon: Icon, label, href, subCategory, ...props}: SidebarItemProps) => {
    const pathname = usePathname()
    const router = useRouter()

    const isActive =
        pathname === "/" && href === "/" ||
        pathname === href ||
        pathname?.startsWith(`${href}/`)


    const handleClick = () => {
        router.push(href)
    }

    const handleSubCategoryClick = (href:string) => {
        router.push(href)
    }

    const handleSignOut = () => {
        signOut().then(() => {
            router.push("/sign-in")
        })
    }

    return (
        <div className="flex flex-col">
            <button
                {...props}
                onClick={label === "Sign Out" ? handleSignOut : handleClick}
                type={"button"}
                className={cn("flex items-center gap-x-2 text-slate-500 text-xs font-[500] pl-6 transition-all hover:dark:text-primary-foreground/90 hover:text-primary hover:bg-primary/5", isActive && "text-slate-800 dark:text-primary-foreground bg-primary/20 hover:bg-primary/30 hover:dark:text-primary-foreground")}
            >
                <div className="flex items-center gap-x-4 py-4">
                    <Icon size={22}
                          className={cn("text-slate-500", isActive && "dark:text-primary-foreground text-slate-800")}/>
                    {label}
                </div>
                <div
                    className={cn("w-0.5 h-full justify-end ml-auto rounded-tl-full rounded-bl-full transition-all", isActive ? "bg-primary" : "bg-transparent")}
                />
            </button>
            {
                isActive && subCategory && subCategory.map((category, index) => {
                    Icon = category.icon

                    const isSubCategory =
                        pathname === "/" && category.href === "/" ||
                        pathname === category.href ||
                        pathname?.includes(`${category.href}`)

                    return <button
                        key={index}
                        onClick={() => handleSubCategoryClick(category.href)}
                        className={cn("flex bg-muted items-center gap-x-2 duration-300 ease-in-out text-slate-500 text-sm font-[500] pl-6 transition-all hover:dark:text-primary-foreground/90 hover:text-primary hover:bg-primary/5", isSubCategory && "text-slate-800 dark:text-primary-foreground bg-primary/5 hover:bg-primary/10 hover:dark:text-primary-foreground")}
                    >
                        <div className="flex items-center gap-x-4 py-4 text-xs">
                            <Icon size={22}
                                  className={cn("text-slate-500", isSubCategory && "dark:text-primary-foreground text-slate-800")}/>
                            {category.label}
                        </div>
                    </button>
                })
            }
        </div>
    );
};

export default SidebarItem;