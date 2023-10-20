"use client"

import React, {useEffect, useState} from 'react';
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {fetchAllTransactions, TransactionArray} from "@lib/transactionsCalls";
import {toast} from "@components/ui/use-toast";
import TransactionsList from "@app/(dashboard)/(routes)/transactions/_components/TransactionsList";

const TransactionsPage = () => {

    const axiosAuth = useAxiosAuth();

    const [transactions, setTransactions] = useState<TransactionArray | undefined>();

    useEffect(() => {
        fetchAllTransactions(axiosAuth)
            .then((response) => {
                console.log("Fetched transactions: ", response)
                setTransactions(response);
            }).catch((error) => {
            console.log("Error fetching transactions: ", error)
            if (error?.response?.status === 404) {
                return toast(
                    {
                        variant: "destructive",
                        title: "Network error.",
                        description: "Please check your internet connection and try again."
                    }
                )
            } else {
                return toast(
                    {
                        variant: "destructive",
                        title: "Something went wrong.",
                        description: "Token expired. Please login again.",
                    }
                )
            }
        });
    }, [axiosAuth]);


    return (
        <div className="flex flex-col min-h-screen">
            <TransactionsList transactions={transactions}/>
        </div>
    );
};

export default TransactionsPage;