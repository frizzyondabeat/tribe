import { z } from "zod";
import {AxiosInstance} from "axios";
import {TransactionSchema} from "@models/Transaction";

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
