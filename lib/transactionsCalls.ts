import { z } from "zod";
import {AxiosInstance} from "axios";
import {TransactionSchema} from "@models/Transaction";
import {TransactionsProps} from "@app/(dashboard)/(routes)/transactions/_components/TransactionColumns";

const TransactionResults = z.array(TransactionSchema);

export type TransactionArray = z.infer<typeof TransactionResults>;

export type TotalTransactionValueProps = [{
    currency: string,
    totalAmount: number
}]

export type MonthlyTransactionCountProps = [{
    month: string,
    count: number,
    totalAmount: number
}]

export const VIEW_ALL_TRANSACTIONS_URL = "/api/v1/admin/transactions/view-all";

export async function fetchAllTransactions(axiosAuth: AxiosInstance) {
    try {
        const res = await axiosAuth.get(VIEW_ALL_TRANSACTIONS_URL);

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

export const VIEW_ONE_TRANSACTION_URL = "/api/v1/admin/transactions/view-one";

export async function fetchTransactionByUUIDAndUserId(axiosAuth: AxiosInstance, UUID: string, UserId: string) {
    try {
        const res = await axiosAuth.get(VIEW_ONE_TRANSACTION_URL,
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

export async function fetchDailyTransactionCount(axiosAuth: AxiosInstance) {
    try {
        const res = await axiosAuth.get(`/api/v1/dashboard/daily-transaction-count`);
        console.log(res.data);

        const dailyTransactionCount: number = res.data?.data;
        console.log("Daily count: ",dailyTransactionCount)
        return `${dailyTransactionCount}`;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function fetchTotalTransactionAmount(axiosAuth: AxiosInstance) {
try {
        const res = await axiosAuth.get(`/api/v1/dashboard/daily-transaction-value`);
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const totalTransactionAmount: TotalTransactionValueProps = res.data?.data;
        return totalTransactionAmount;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function fetchTopTransactions(axiosAuth: AxiosInstance) {
    try {
        const res = await axiosAuth.get(`/api/v1/dashboard/get-top-transactions`);
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const topTransactions: TransactionArray = res.data?.data;
        return TransactionResults.parse(topTransactions);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function fetchMonthlyTransaction(axiosAuth: AxiosInstance) {
    try {
        const res = await axiosAuth.get(`/api/v1/dashboard/monthly-transaction`);
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const monthlyTransactionCount: MonthlyTransactionCountProps = res.data?.data
        return monthlyTransactionCount;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
