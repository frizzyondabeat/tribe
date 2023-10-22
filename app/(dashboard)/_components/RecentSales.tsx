"use client"

import {TransactionArray} from "@lib/transactionsCalls";
import {statusColors} from "@app/(dashboard)/(routes)/transactions/_components/TransactionColumns";

const RecentSales = ({transactions}: { transactions: TransactionArray | undefined }) => {
    return (
        <div className="space-y-5 text-xs h-full py-5">
            {
                transactions &&
                transactions.map(
                    (transaction,  index) => {
                        return (
                            <div key={index} className={`flex items-start text-xs justify-between`}>
                                <div className="space-y-1 w-1/2">
                                    <p className="text-xs font-medium leading-none">{transaction.recipientName}</p>
                                    <p className="text-muted-foreground text-[10px] leading-tight">
                                        {transaction.transactionReference}
                                    </p>
                                </div>
                                <div className="flex space-x-6">
                                    <div className="ml-auto font-medium text-start">{`${transaction.sourceCurrency}${transaction.amount}`}</div>
                                    <div className={`ml-2 text-xs ${statusColors[transaction.transactionStatus]}`}>{transaction.transactionStatus}</div>
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default RecentSales