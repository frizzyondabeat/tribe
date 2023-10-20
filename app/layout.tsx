import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ThemeProvider} from "@components/theme-provider";
import React from "react";
import {Toaster} from "@components/ui/toaster";
import {getServerSession} from "next-auth"
import SessionProvider from "@components/SessionProvider";
import {SkeletonTheme} from "@node_modules/react-loading-skeleton";

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
                <SkeletonTheme baseColor="#e2e8f0" highlightColor="#edf2f7">
                    {children}
                </SkeletonTheme>
            </SessionProvider>
        </ThemeProvider>
        <Toaster />
        </body>
        </html>
    )
}
