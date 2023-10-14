import React from 'react';
import {Sidebar} from "@app/(dashboard)/_components";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full">
            <aside className="hidden md:flex h-full w-1/5 flex-col z-20 fixed inset-y-0">
                <Sidebar />
            </aside>
            <main className="md:pl-[20%] pt-20 h-full">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;