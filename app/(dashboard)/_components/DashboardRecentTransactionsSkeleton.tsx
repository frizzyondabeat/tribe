import React from 'react';
import {CardContent, CardHeader} from "@components/ui/card";
import {Skeleton} from "@components/ui/skeleton";

const DashboardRecentTransactionsSkeleton = () => {
    return (
        <div className="w-full p-0 m-0">
            <CardHeader className="flex justify-start w-full">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-5 w-3/4" />
            </CardHeader>
            <CardContent className="flex flex-col h-[370px] items-start justify-center gap-3">
                <div className="flex gap-x-5 w-full">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div className="flex flex-col w-full space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-1/2" />
                    </div>
                </div>
                <div className="flex gap-x-5 w-full">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div className="flex flex-col w-full space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-3/5" />
                    </div>
                </div>
                <div className="flex gap-x-5 w-full">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div className="flex flex-col w-full space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-1/3" />
                    </div>
                </div>
                <div className="flex gap-x-5 w-full">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div className="flex flex-col w-full space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-4/6" />
                    </div>
                </div>
                <div className="flex gap-x-5 w-full">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div className="flex flex-col w-full space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-1/2" />
                    </div>
                </div>
            </CardContent>
        </div>
    );
};

export default DashboardRecentTransactionsSkeleton;