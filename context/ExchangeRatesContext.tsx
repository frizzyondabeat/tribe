"use client"

import React, {createContext, useContext} from 'react';
import {ExchangeRateArray} from "@lib/exchangeCurrencyCalls";

export type ExchangeRatesContextProps = {
    exchangeRates: ExchangeRateArray | undefined,
    setExchangeRates: React.Dispatch<React.SetStateAction<ExchangeRateArray | undefined>>
}

export const ExchangeRatesContext = createContext<ExchangeRatesContextProps>({
    exchangeRates: undefined,
    setExchangeRates: () => undefined
})

export const ExchangeRatesContextProvider = ({children}: {children: React.ReactNode}) => {

        const [exchangeRates, setExchangeRates] = React.useState<ExchangeRateArray | undefined>(undefined)

        return (
            <ExchangeRatesContext.Provider value={{exchangeRates, setExchangeRates}}>
                {children}
            </ExchangeRatesContext.Provider>
        );
}

export const useExchangeRatesContext = () => useContext(ExchangeRatesContext);