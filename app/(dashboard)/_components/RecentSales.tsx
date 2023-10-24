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
                            <div key={index} className={`text-xs grid grid-cols-4 gap-3`}>
                                <div className="space-y-1 col-span-2">
                                    <p className="text-xs font-medium leading-none">{transaction.recipientName}</p>
                                    <p className="text-muted-foreground text-[10px] leading-tight">
                                        {transaction.transactionReference}
                                    </p>
                                </div>
                                <div className="text-xs text-start">{`${transaction.sourceCurrency}${transaction.amount}`}</div>
                                <div className={`text-xs ${statusColors[transaction.transactionStatus]}`}>{transaction.transactionStatus}</div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default RecentSales