import React from 'react';
import {CurrencyArray} from "@lib/currencyCalls";
import {DataTable} from "@components/ui/data-table";
import {CurrencyColumns} from "@app/(dashboard)/(routes)/settings/_components/CurrencyColumns";

const visibleFields = ["name", "code", "symbol", "country", "actions"]

const CurrencyList = ({currencies}: {currencies: CurrencyArray | undefined}) => {
    return (
        <div className="p-1">
            <DataTable columns={CurrencyColumns} data={currencies} visibleFields={visibleFields} action={"ADD_CURRENCY"} enableExport={false}/>
        </div>
    );
};

export default CurrencyList;