"use client"

import React, {createContext, useContext} from 'react';
import {CurrencyArray} from "@lib/currencyCalls";

export type CurrencyContextProps = {
    currencies: CurrencyArray | undefined,
    setCurrencies: React.Dispatch<React.SetStateAction<CurrencyArray | undefined>>
}

export const CurrencyContext = createContext<CurrencyContextProps>({
    currencies: undefined,
    setCurrencies: () => undefined
})

export const CurrencyContextProvider = ({children}: {children: React.ReactNode}) => {

        const [currencies, setCurrencies] = React.useState<CurrencyArray | undefined>(undefined)

        return (
            <CurrencyContext.Provider value={{currencies, setCurrencies}}>
                {children}
            </CurrencyContext.Provider>
        );
}

export const useCurrencyContext = () => useContext(CurrencyContext);
