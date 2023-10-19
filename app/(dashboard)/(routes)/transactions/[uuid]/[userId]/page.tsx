"use client"

import React from 'react';
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "@node_modules/lucide-react";
import {Button} from "@components/ui/button";

const TransactionDetailsPage = ({params}: { params: { uuid: string, userId: string } }) => {

    const axiosAuth = useAxiosAuth();

    const router = useRouter();

    const {uuid, userId} = params;

    return (
        <div>
            <Button
                variant="ghost"
                onClick={() => {
                    router.back();
                }}
            >
                <ArrowLeft className="h-4 w-4"/>
                <p>Go back</p>
            </Button>
            <span>{`Transaction Details Page: ${uuid} ${userId}`}</span>
        </div>
    );
};

export default TransactionDetailsPage;