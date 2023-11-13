import React from 'react';
import {CardContent, CardHeader} from "@components/ui/card";
import {Skeleton} from "@components/ui/skeleton";

const DashboardPieChartSkeleton = () => {
    return (
        <div className="w-full p-0 m-0">
            <CardHeader className="flex justify-start w-full">
                <Skeleton className="h-6 w-1/3"/>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-3">
                <Skeleton className="h-[350px] w-[350px] rounded-full"/>
                <div className="flex justify-center w-[80%]">
                    <div className="flex gap-2 w-1/4">
                        <Skeleton className="h-5 w-5 rounded-full"/>
                        <Skeleton className="h-5 w-1/2"/>
                    </div>
                    <div className="flex gap-2 w-1/4">
                        <Skeleton className="h-5 w-5 rounded-full"/>
                        <Skeleton className="h-5 w-1/2"/>
                    </div>
                    <div className="flex gap-2 w-1/4">
                        <Skeleton className="h-5 w-5 rounded-full"/>
                        <Skeleton className="h-5 w-1/2"/>
                    </div>
                    <div className="flex gap-2 w-1/4">
                        <Skeleton className="h-5 w-5 rounded-full"/>
                        <Skeleton className="h-5 w-1/2"/>
                    </div>
                </div>
            </CardContent>
        </div>
    );
};

export default DashboardPieChartSkeleton;