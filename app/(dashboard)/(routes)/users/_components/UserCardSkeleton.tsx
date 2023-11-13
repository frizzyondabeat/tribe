import React from 'react';
import {Skeleton} from "@components/ui/skeleton";
import {CardContent, CardHeader} from "@components/ui/card";

const UserCardSkeleton = () => {
    return (
        <div className="w-full p-0 m-0">
            <CardHeader className="flex justify-center w-full items-center">
                <Skeleton className="h-20 w-20 rounded-full" />
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-1/2" />
            </CardContent>
        </div>
    );
};

export default UserCardSkeleton;