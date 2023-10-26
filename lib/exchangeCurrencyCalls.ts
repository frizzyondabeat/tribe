import {z} from 'zod';
import {ConfigureRate, ExchangeForCurrencyPair, ExchangeRateProps, ExchangeRateSchema} from '@models/ExchangeRate';
import {AxiosInstance} from "axios";

export const ExchangeRateResults = z.array(ExchangeRateSchema)

export type ExchangeRateArray = z.infer<typeof ExchangeRateResults>

export type ConfigureRateProps = z.infer<typeof ConfigureRate>

export type ExchangeForCurrencyPairProps = z.infer<typeof ExchangeForCurrencyPair>

export const VIEW_ALL_EXCHANGE_RATES_URL = "/api/v1/currency/view-all-exchange-rates";

export async function fetchAllExchangeRates(axiosAuth: AxiosInstance) {
    try {
        const res = await axiosAuth.get(VIEW_ALL_EXCHANGE_RATES_URL);
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const exchangeRatesJson: ExchangeRateArray = res.data?.data;
        return ExchangeRateResults.parse(exchangeRatesJson);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function configureExchangeRate(axiosAuth: AxiosInstance, configureRateDto: ConfigureRateProps) {


    try {
        const res = await axiosAuth.post("/api/v1/currency/configure-rates", configureRateDto);
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const exchangeRate: ExchangeRateProps = res.data?.data;
        return ExchangeRateSchema.parse(exchangeRate);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function getExchangeForCurrencyPair(axiosAuth: AxiosInstance, exchangeForCurrencyPairDto: ExchangeForCurrencyPairProps) {
    try {
        const res = await axiosAuth.post("/api/v1/currency/get-exchange-for-currency-pair", exchangeForCurrencyPairDto);
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const exchangeRate: ExchangeRateProps = res.data?.data;
        return ExchangeRateSchema.parse(exchangeRate);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function updateExchangeRate(axiosAuth: AxiosInstance, exchangeRateDto: ExchangeRateProps) {

    // await new Promise(resolve => setTimeout(resolve, 30000));

    try {
        const res = await axiosAuth.post("/api/v1/currency/update-rates", exchangeRateDto);
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const exchangeRate: ExchangeRateProps = res.data?.data;
        return ExchangeRateSchema.parse(exchangeRate);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function deleteExchangeRate(axiosAuth: AxiosInstance, exchangeRateDTO: ExchangeRateProps) {
    try {
        const res = await axiosAuth.post(`/api/v1/currency/delete-rates`, exchangeRateDTO);
        console.log("Delete API call completed: ", res.data);

        if (!res.data) {
            return undefined;
        }

        return true
    } catch (err) {
        console.log(err);
        throw err;
    }
}

