"use client"

import React, {useEffect, useState} from 'react';
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "@node_modules/lucide-react";
import {Button} from "@components/ui/button";
import {TransactionsProps} from "@app/(dashboard)/(routes)/transactions/_components/TransactionColumns";
import {fetchTransactionByUUIDAndUserId} from "@lib/transactionsCalls";
import {Card, CardContent, CardHeader, CardTitle} from "@components/ui/card";
import Skeleton from "@node_modules/react-loading-skeleton";

const TransactionDetailsPage = ({params}: { params: { uuid: string, userId: string } }) => {

    const axiosAuth = useAxiosAuth();

    const router = useRouter();

    const {uuid, userId} = params;

    const [transaction, setTransaction] = useState<TransactionsProps>();

    useEffect(() => {
        fetchTransactionByUUIDAndUserId(axiosAuth, uuid, userId)
            .then((response) => {
                console.log(response);
                setTransaction(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [axiosAuth, uuid, userId]);

    return (
        <div className="flex flex-col min-h-screen py-2 px-5 gap-4">
            <Button
                variant="ghost"
                onClick={() => {
                    router.back();
                }}
                className="flex items-center w-fit"
            >
                <ArrowLeft className="h-4 w-4"/>
                <p>Go back</p>
            </Button>
            <div className="grid gap-4 grid-cols-1">
                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle>
                            Transactions Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 grid-cols-2">
                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Transaction ID</h1>
                            <p className="w-full">{transaction && transaction.uuid}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Transaction Status</h1>
                            <p className="w-full">{transaction && transaction.transactionStatus}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Transaction Reference</h1>
                            <p className="w-full">{transaction && transaction.transactionReference}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Source Account</h1>
                            <p className="w-full">{transaction && transaction.sourceAccount}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Source Status</h1>
                            <p className="w-full">{transaction && transaction.sourceStatus}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Source Processor</h1>
                            <p className="w-full">{transaction && transaction.sourceProcessor}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Source Currency</h1>
                            <p className="w-full">{transaction && transaction.sourceCurrency}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Destination Account</h1>
                            <p className="w-full">{transaction && transaction.destinationAccount}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Destination Status</h1>
                            <p className="w-full">{transaction && transaction.destinationStatus}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Destination Processor</h1>
                            <p className="w-full">{transaction && transaction.destinationProcessor}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Destination Currency</h1>
                            <p className="w-full">{transaction && transaction.destinationCurrency}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Recipient Name</h1>
                            <p className="w-full">{transaction && transaction.recipientName}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Payment Type</h1>
                            <p className="w-full">{transaction && transaction.paymentType}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Amount</h1>
                            <p className="w-full">{transaction && transaction.amount}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">User ID</h1>
                            <p className="w-full">{transaction && transaction.userId}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Institution ID</h1>
                            <p className="w-full">{transaction && transaction.institutionId}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Activity Status</h1>
                            <p className="w-full">{transaction && transaction.activityStatus}</p>
                        </div>

                        <div className="flex items-center flex-col gap-1">
                            <h1 className="w-full font-semibold">Narration</h1>
                            <p className="w-full">{transaction && transaction.narration}</p>
                        </div>

                        <div className="flex items-center flex-col">
                            <h1 className="w-full font-semibold">Date Created</h1>
                            <p className="w-full">{transaction && new Date(transaction?.dateCreated).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}</p>
                        </div>

                        <Button
                            variant="default"
                            onClick={() => {}}
                            className="w-1/2"
                            >
                            Generate Receipt
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TransactionDetailsPage;