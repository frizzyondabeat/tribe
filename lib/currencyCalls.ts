import { z } from "zod";
import {AxiosInstance} from "axios";
import {CurrencyDtoSchema, CurrencySchema, ResponseCurrencySchema} from "@models/Currency";

const CurrencyResults = z.array(CurrencySchema);

export type CurrencyArray = z.infer<typeof CurrencyResults>;

export type CurrencyDtoProps = z.infer<typeof CurrencyDtoSchema>

export type ResponseCurrencyProps = z.infer<typeof ResponseCurrencySchema>

export const VIEW_ALL_CURRENCIES_URL = "/api/v1/currency/view-all-currency";
export async function fetchAllCurrencies(axiosAuth: AxiosInstance) {
    try {
        const res = await axiosAuth.get(VIEW_ALL_CURRENCIES_URL);
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const currenciesJson: CurrencyArray = res.data?.data;
        return CurrencyResults.parse(currenciesJson);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function addCurrency(axiosAuth: AxiosInstance, currencyDto: CurrencyDtoProps) {
    // await new Promise(resolve => setTimeout(resolve, 20000));
    try {
        const res = await axiosAuth.post("/api/v1/currency/add-currency", currencyDto);
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const responseCurrency: ResponseCurrencyProps | string = res.data?.data;
        if (typeof responseCurrency === "string") {
            return responseCurrency;
        } else {
            return ResponseCurrencySchema.parse(responseCurrency);
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function deleteCurrency(axiosAuth: AxiosInstance, currencyUUID: string) {
    // await new Promise(resolve => setTimeout(resolve, 20000));
    try {

        const res = await axiosAuth.delete(`/api/v1/currency/delete-currency/${currencyUUID}`);
        console.log("Delete API call completed: ",res.data);

        if (!res.data) {
            return undefined;
        }

        return true
    } catch (err) {
        console.log(err);
        throw err;
    }
}