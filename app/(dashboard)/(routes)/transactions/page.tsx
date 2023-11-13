"use client"

import React from 'react';
import TransactionsList from "@app/(dashboard)/(routes)/transactions/_components/TransactionsList";
import {useFetch} from "@lib/hooks/useSWR";

const TransactionsPage = () => {

    const {GetAllTransactions} = useFetch()

    const {data: transactions} = GetAllTransactions()

    return (
        <div className="flex flex-col min-h-screen">
            <TransactionsList transactions={transactions}/>
        </div>
    );
};

export default TransactionsPage;