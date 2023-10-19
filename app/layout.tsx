import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ThemeProvider} from "@components/theme-provider";
import React from "react";
import {Toaster} from "@components/ui/toaster";
import {getServerSession} from "next-auth"
import SessionProvider from "@components/SessionProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Tribe',
    description: 'A super admin dashboard built with Next.js and Tailwind CSS.',
}

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    const session = await getServerSession()

    return (
        <html lang="en">
        <body className={inter.className}>
        <ThemeProvider
            attribute={'class'}
            defaultTheme={'system'}
            enableSystem={true}
            //
        >
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </ThemeProvider>
        <Toaster />
        </body>
        </html>
    )
}
