import React from 'react';
import {ExchangeRateArray} from "@lib/exchangeCurrencyCalls";
import {DataTable} from "@components/ui/data-table";
import {ExchangeRatesColumns} from "@app/(dashboard)/(routes)/settings/_components/ExchangeRatesColumns";

const visibleFields = ["fromCurrency", "toCurrency", "rate", "actions"]

const ExchangeRatesList = ({exchangeRates}: { exchangeRates: ExchangeRateArray | undefined }) => {
    return (
        <div>
            <DataTable columns={ExchangeRatesColumns} data={exchangeRates} visibleFields={visibleFields}
                       enableExport={false}/>
        </div>
    );
};

export default ExchangeRatesList;