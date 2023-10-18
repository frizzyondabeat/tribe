import React from 'react';
import {cn} from "@lib/utils";
import Link from "next/link";
import {Dot} from "lucide-react";

const footerLinks = [
    {
        label: '©Tribe',
        href: '/',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
    {
        label: 'Privacy',
        href: '/privacy',
    },
];

const LoginFooter = ({className, ...props}: React.HTMLAttributes<HTMLElement>) => {
    return (
        <footer
            className={cn("flex justify-center items-center w-full space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {
                footerLinks.map(({label, href}, index) => (
                    <React.Fragment key={index}>
                        <Link href={href} className="hover:text-primary">
                            {label}
                        </Link>
                        {index !== footerLinks.length - 1 && <Dot size={12} />}
                    </React.Fragment>
                ))
            }
        </footer>
    );
};

export default LoginFooter;