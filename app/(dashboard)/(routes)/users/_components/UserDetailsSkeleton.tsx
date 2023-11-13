import React from 'react';
import {Skeleton} from "@components/ui/skeleton";
import {CardContent, CardHeader} from "@components/ui/card";

const UserDetailsSkeleton = () => {
    return (
        <div className="w-full p-0 m-0">
            <CardHeader>
                <Skeleton className="h-8 w-1/2"/>
            </CardHeader>
            <CardContent className="flex flex-col items-start justify-center gap-3">
                <Skeleton className={`h-5 w-full`}/>
                <Skeleton className={`h-5 w-full`}/>
                <Skeleton className={`h-5 w-full`}/>
                <Skeleton className={`h-5 w-3/4`}/>
                <Skeleton className={`h-5 w-1/2`}/>
                <Skeleton className={`h-5 w-1/5`}/>
                <Skeleton className={`h-5 w-2/5`}/>
                <Skeleton className={`h-5 w-3/5`}/>
                <Skeleton className={`h-5 w-1/4`}/>
            </CardContent>
        </div>
    );
};

export default UserDetailsSkeleton;