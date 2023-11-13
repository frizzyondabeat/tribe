import React from 'react';
import {CardContent, CardHeader} from "@components/ui/card";
import {Skeleton} from "@components/ui/skeleton";

const DashboardCardSkeleton = () => {
    return (
        <div className="w-full p-0 m-0">
            <CardHeader className="w-full">
                <div className="flex justify-between w-full">
                    <Skeleton className="h-5 w-[80%]" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col items-start justify-center gap-2">
                {/*<Skeleton className="h-5 w-full" />*/}
                <Skeleton className="h-5 w-3/5" />
            </CardContent>
        </div>
    );
};

export default DashboardCardSkeleton;