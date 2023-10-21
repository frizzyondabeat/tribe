import React from 'react';
import {Skeleton} from "@components/ui/skeleton";

const TransactionDetailSkeleton = () => {
    return (
        <div className="space-y-2 w-full">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-5 w-full" />
        </div>
    );
};

export default TransactionDetailSkeleton;