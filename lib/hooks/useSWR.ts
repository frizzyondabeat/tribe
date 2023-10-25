import useSWR from "swr";
import {fetchAllUsers, VIEW_ALL_USERS_URL} from "@lib/userCalls";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {fetchAllTransactions, VIEW_ALL_TRANSACTIONS_URL} from "@lib/transactionsCalls";
import {fetchAllCurrencies, VIEW_ALL_CURRENCIES_URL} from "@lib/currencyCalls";
import {fetchAllExchangeRates, VIEW_ALL_EXCHANGE_RATES_URL} from "@lib/exchangeCurrencyCalls";

export const useFetch = () => {

    const axiosAuth = useAxiosAuth();

    return {
        getAllUsers:
            () => {
                return useSWR(VIEW_ALL_USERS_URL, () => fetchAllUsers(axiosAuth))
            },
        getAllTransactions:
            () => {
                return useSWR(VIEW_ALL_TRANSACTIONS_URL, () => fetchAllTransactions(axiosAuth))
            },
        getAllCurrency:
            () => {
                return useSWR(VIEW_ALL_CURRENCIES_URL, () => fetchAllCurrencies(axiosAuth))
            },
        getAllExchangeRates:
            () => {
                return useSWR(VIEW_ALL_EXCHANGE_RATES_URL, () => fetchAllExchangeRates(axiosAuth))
            },
    }
}