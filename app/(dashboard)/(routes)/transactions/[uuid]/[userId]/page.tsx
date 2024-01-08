"use client"

import React from 'react';
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "@node_modules/lucide-react";
import {Button} from "@components/ui/button";
import {statusColors} from "@app/(dashboard)/(routes)/transactions/_components/TransactionColumns";
import {fetchTransactionByUUIDAndUserId, VIEW_ONE_TRANSACTION_URL} from "@lib/transactionsCalls";
import {Card, CardContent, CardHeader, CardTitle} from "@components/ui/card";
import TransactionDetailSkeleton from "@app/(dashboard)/(routes)/transactions/_components/TransactionDetailSkeleton";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import useSWR from "@node_modules/swr";

const TransactionDetailsPage = ({params}: { params: { uuid: string, userId: string } }) => {

    const axiosAuth = useAxiosAuth();

    const router = useRouter();

    const {uuid, userId} = params;


    const {data: transaction} = useSWR(VIEW_ONE_TRANSACTION_URL, () => fetchTransactionByUUIDAndUserId(axiosAuth, uuid, userId))


    const generateReceipt = () => {
        const capture = document.getElementById("receipt");
        if (capture) {
            html2canvas(capture)
                .then(
                    (canvas) => {
                        const dataURL = canvas.toDataURL("img/png");
                        const pdf = new jsPDF("p", "mm", "a4");
                        const width = pdf.internal.pageSize.getWidth();

                        const imgProps = pdf.getImageProperties(dataURL);
                        const pdfWidth = (imgProps.width * width) / imgProps.width;
                        const pdfHeight = (imgProps.height * width) / imgProps.width;
                        pdf.addImage(dataURL, "PNG", 0, 0, pdfWidth, pdfHeight);
                        pdf.save("receipt.pdf");
                    }
                )
        }
    }

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
            <div className="grid gap-4 grid-cols-1" id="receipt">
                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle>
                            Transaction Detail
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 grid-cols-2">
                        {
                            transaction
                                ? (
                                    <React.Fragment>
                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Transaction ID</h1>
                                            <p className="w-full text-sm">{transaction && transaction.uuid}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Transaction Status</h1>
                                            <p className={`w-full text-sm ${transaction && statusColors[transaction.transactionStatus]}`}>{transaction && transaction.transactionStatus}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Transaction Reference</h1>
                                            <p className="w-full text-sm">{transaction && transaction.transactionReference}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Source Account</h1>
                                            <p className="w-full text-sm">{transaction && transaction.sourceAccount}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Source Status</h1>
                                            <p className={`w-full text-sm ${transaction && statusColors[transaction.sourceStatus]}`}>{transaction && transaction.sourceStatus}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Source Processor</h1>
                                            <p className="w-full text-sm">{transaction && transaction.sourceProcessor}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Source Currency</h1>
                                            <p className="w-full text-sm">{transaction && transaction.sourceCurrency}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Destination Account</h1>
                                            <p className="w-full text-sm">{transaction && transaction.destinationAccount}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Destination Status</h1>
                                            <p className={`w-full text-sm ${transaction && statusColors[transaction?.destinationStatus]}`}>{transaction && transaction.destinationStatus}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Destination Processor</h1>
                                            <p className="w-full text-sm">{transaction && transaction.destinationProcessor}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Destination Currency</h1>
                                            <p className="w-full text-sm">{transaction && transaction.destinationCurrency}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Recipient Name</h1>
                                            <p className="w-full text-sm">{transaction && transaction.recipientName}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Payment Type</h1>
                                            <p className="w-full text-sm">{transaction && transaction.paymentType}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Amount</h1>
                                            <p className="w-full text-sm">{transaction && transaction.amount}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">User ID</h1>
                                            <p className="w-full text-sm">{transaction && transaction.userId}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Institution ID</h1>
                                            <p className="w-full text-sm">{transaction && transaction.institutionId}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Activity Status</h1>
                                            <p className="w-full text-sm">{transaction && transaction.activityStatus}</p>
                                        </div>

                                        <div className="flex items-center flex-col gap-1">
                                            <h1 className="w-full font-bold text-sm">Narration</h1>
                                            <p className="w-full text-sm">{transaction && transaction.narration}</p>
                                        </div>

                                        <div className="flex items-center flex-col">
                                            <h1 className="w-full font-bold text-sm">Date Created</h1>
                                            <p className="w-full text-sm">{transaction && new Date(transaction?.dateCreated).toLocaleDateString("en-US", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}</p>
                                        </div>

                                        <Button
                                            variant="default"
                                            onClick={generateReceipt}
                                            className="w-fit whitespace-nowrap"
                                        >
                                            Generate Receipt
                                        </Button>
                                    </React.Fragment>
                                ) : Array(20).fill(0).map((_, index) => {
                                        return (
                                            <TransactionDetailSkeleton key={index} />
                                        )
                                    }
                                )
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TransactionDetailsPage;