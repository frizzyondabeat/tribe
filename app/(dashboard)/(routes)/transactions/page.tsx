"use client"

import React, {useEffect, useState} from 'react';
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {fetchAllTransactions, TransactionArray} from "@lib/transactionsCalls";
import {toast} from "@components/ui/use-toast";
import TransactionsList from "@app/(dashboard)/(routes)/transactions/_components/TransactionsList";
import {useFetch} from "@lib/hooks/useSWR";

const TransactionsPage = () => {

    const {getAllTransactions} = useFetch()

    const {data: transactions} = getAllTransactions()

    return (
        <div className="flex flex-col min-h-screen">
            <TransactionsList transactions={transactions}/>
        </div>
    );
};

export default TransactionsPage;