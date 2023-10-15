import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ThemeProvider} from "@components/theme-provider";
import React from "react";
import {Toaster} from "@components/ui/toaster";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Tribe',
    description: 'A super admin dashboard built with Next.js and Tailwind CSS.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ThemeProvider
            attribute={'class'}
            defaultTheme={'system'}
            enableSystem={true}
            //
        >
            {children}
        </ThemeProvider>
        <Toaster />
        </body>
        </html>
    )
}
