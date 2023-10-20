import {TransactionArray} from "@lib/transactionsCalls";
import {DataTable} from "@components/ui/data-table";
import React from "react";
import {transactionColumns} from "@app/(dashboard)/(routes)/transactions/_components/TransactionColumns";


const TransactionsList = ({transactions}: { transactions: TransactionArray | undefined }) => {

    return (
        <div className="container mx-auto py-2 overflow-x-auto">
            <DataTable columns={transactionColumns} data={transactions} />
        </div>
    );
};

export default TransactionsList;