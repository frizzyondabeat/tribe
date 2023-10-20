import { z } from "zod";
import {AxiosInstance} from "axios";
import {TransactionSchema} from "@models/Transaction";
import {TransactionsProps} from "@app/(dashboard)/(routes)/transactions/_components/TransactionColumns";

const TransactionResults = z.array(TransactionSchema);

export type TransactionArray = z.infer<typeof TransactionResults>;

export async function fetchAllTransactions(axiosAuth: AxiosInstance) {
    try {
        const res = await axiosAuth.get("/api/v1/admin/transactions/view-all");
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const transactionsJson: TransactionArray = res.data?.data;
        return TransactionResults.parse(transactionsJson);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function fetchTransactionByUUIDAndUserId(axiosAuth: AxiosInstance, UUID: string, UserId: string) {
    try {
        const res = await axiosAuth.get(`/api/v1/admin/transactions/view-one`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "transactionUUID": UUID,
                    "userId": UserId
                }
            });
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const transactionsJson: TransactionsProps = res.data?.data;
        return TransactionSchema.parse(transactionsJson);
    } catch (err) {
        console.log(err);
        throw err;
    }
}
