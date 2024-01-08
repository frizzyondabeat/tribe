"use client"
import {LucideIcon} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@lib/utils";
import {signOut} from "@node_modules/next-auth/react";
import {AnimatePresence, motion} from "framer-motion";

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

    const handleSubCategoryClick = (href: string) => {
        router.push(href)
    }

    const handleSignOut = () => {
        signOut().then(() => {
            router.push("/sign-in")
        })
    }

    return (
        <div className="flex flex-col">
            <motion.button
                {...props}
                transition={{duration: 0.3}}
                onClick={label === "Sign Out" ? handleSignOut : handleClick}
                type={"button"}
                className={cn("flex items-center gap-x-2 text-slate-500 text-[13px] font-[500] pl-6 transition-all hover:dark:text-primary-foreground/90 hover:text-primary hover:bg-primary/5", isActive && "text-slate-800 dark:text-primary-foreground bg-primary/20 hover:bg-primary/30 hover:dark:text-primary-foreground")}
            >
                <motion.div
                    transition={{duration: 0.3}}
                    animate={{scale: isActive ? 1.05 : 1}}
                    className="flex items-center gap-x-4 py-4">
                    <Icon size={22}
                          className={cn("text-slate-500", isActive && "dark:text-primary-foreground text-slate-800")}/>
                    {label}
                </motion.div>
                <div
                    className={cn("w-1 h-full justify-end ml-auto rounded-tl-full rounded-bl-full transition-all", isActive ? "bg-primary" : "bg-transparent")}
                />
            </motion.button>
            <AnimatePresence>
                {
                    isActive && subCategory &&
                    <motion.div
                        key="userSub"
                        initial={{height: 0, opacity: 0}}
                        animate={{height: isActive && subCategory ? "auto" : 0, opacity: isActive && subCategory ? 1 : 0}}
                        transition={{duration: 0.2}}
                        exit={{height: 0, opacity: 0}}
                        className={"flex flex-col w-full border-b"}
                    >
                        {
                            subCategory.map((category, index) => {
                                Icon = category.icon

                                const isSubCategory =
                                    pathname === "/" && category.href === "/" ||
                                    pathname === category.href ||
                                    pathname?.includes(`${category.href}`)

                                return <motion.button
                                    transition={{duration: 0.1}}
                                    animate={{scale: isSubCategory ? 1.05 : 1}}
                                    key={index}
                                    onClick={() => handleSubCategoryClick(category.href)}
                                    className={cn("flex items-center gap-x-2 duration-300 ease-in-out text-slate-500 text-[13px] font-[500] pl-6 transition-all hover:dark:text-primary-foreground/90 hover:text-primary hover:bg-primary/5", isSubCategory && "text-slate-800 dark:text-primary-foreground bg-primary/5 hover:bg-primary/10 hover:dark:text-primary-foreground")}
                                >
                                    <div className="flex items-center gap-x-4 py-4 text-[13px]">
                                        <Icon size={22}
                                              className={cn("text-slate-500", isSubCategory && "dark:text-primary-foreground text-slate-800")}/>
                                        {category.label}
                                    </div>
                                </motion.button>
                            })
                        }
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};

export default SidebarItem;