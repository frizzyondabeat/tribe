"use client"

import React, {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@components/ui/tabs";
import CurrencyList from "@app/(dashboard)/(routes)/settings/_components/CurrencyList";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {useToast} from "@components/ui/use-toast";
import {useRouter, useSearchParams} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@components/ui/card";
import {useForm} from "@node_modules/react-hook-form";
import {z} from "zod"
import {ConfigureRate, ExchangeForCurrencyPair} from "@models/ExchangeRate";
import {zodResolver} from "@node_modules/@hookform/resolvers/zod";
import {configureExchangeRate, getExchangeForCurrencyPair} from "@lib/exchangeCurrencyCalls";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@components/ui/popover";
import {Button} from "@components/ui/button";
import {cn} from "@lib/utils";
import {CaretSortIcon, CheckIcon} from "@node_modules/@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@components/ui/command";
import {Input} from "@components/ui/input";
import {useFetch} from "@lib/hooks/useSWR";
import ExchangeRatesList from "@app/(dashboard)/(routes)/settings/_components/ExchangeRatesList";
import {uuid} from "uuidv4";
import {Oval} from "react-loader-spinner";

const SettingsPage = () => {

    const [rate, setRate] = useState<number>();
    const [openFrom, setFromOpen] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    const [openConfigTo, setOpenConfigTo] = useState(false);
    const [openConfigFrom, setOpenConfigFrom] = useState(false);


    const searchParams = useSearchParams();

    const selectedTab = searchParams.get("tab") || "currency";

    const axiosAuth = useAxiosAuth();

    const {toast} = useToast();

    const router = useRouter()

    const {GetAllCurrency, GetAllExchangeRates} = useFetch()

    const {data: currencies} = GetAllCurrency()
    const {data: exchangeRates, mutate} = GetAllExchangeRates()
    const [isLoading, setIsLoading] = useState(false);


    const getExchangeForCurrencyPairForm = useForm<z.infer<typeof ExchangeForCurrencyPair>>(
        {
            resolver: zodResolver(ExchangeForCurrencyPair),
            defaultValues: {
                from: "",
                to: ""
            }
        }
    )

    const configureExchangeRatesForm = useForm<z.infer<typeof ConfigureRate>>(
        {
            resolver: zodResolver(ConfigureRate),
            defaultValues: {
                fromUUid: "",
                toUUid: "",
                rate: 0
            }
        }
    )

    const isConfigureExchangeRatesFormValid = configureExchangeRatesForm.formState.isValid;
    const isConfigureExchangeRatesFormSubmitting = configureExchangeRatesForm.formState.isSubmitting;

    const isExchangeRateFormValid = getExchangeForCurrencyPairForm.formState.isValid;
    const isExchangeRateFormSubmitting = getExchangeForCurrencyPairForm.formState.isSubmitting;

    const allExchangeRates = exchangeRates ?? []

    const onGetExchangeRateSubmit = async (data: z.infer<typeof ExchangeForCurrencyPair>) => {
        console.log("Fetching exchange rate for: ", data)
        getExchangeForCurrencyPair(axiosAuth, data)
            .then((response) => {
                console.log("Fetched exchange rate: ", response)
                setRate(response?.rate)
            })
            .catch(
                (error) => {
                    setRate(undefined)
                    console.log("Error fetching exchange rate: ", error)
                    return toast(
                        {
                            variant: "destructive",
                            title: "Something went wrong.",
                            description: "Exchange rate not found. Please try again.",
                        }
                    )
                }
            )
    }

    const getRandomId: () => (number) = () => {
        const maxIdInExchangeRateArray = Math.max(...allExchangeRates.map((rate) => rate.id))
        const maxIdValue = 10000000000
        let randomId = Math.floor(Math.random() * (maxIdValue - maxIdInExchangeRateArray) + maxIdInExchangeRateArray);
        if (allExchangeRates.some((rate) => rate.id === randomId)) {
            return getRandomId()
        } else {
            return randomId
        }
    }

    const onConfigureExchangeRatesSubmit = async (data: z.infer<typeof ConfigureRate>) => {
        console.log("Configuring exchange rate: ", data)
        setIsLoading(true)
        mutate(
            configureExchangeRate(axiosAuth, data).then((response) => {
                if (response) {
                    return [...allExchangeRates, response]
                }
            }),
            {
                optimisticData: [
                    ...allExchangeRates,
                    {
                        id: getRandomId(),
                        fromCurrency: data.fromUUid,
                        toCurrency: data.toUUid,
                        rate: data.rate,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        uuid: uuid()
                    }
                ],
                revalidate: true,
                populateCache: true,
                rollbackOnError: true
            }
        )
            .then(
                (response) => {
                    console.log("Configured exchange rate: ", response)
                    setIsLoading(false)
                    configureExchangeRatesForm.reset()
                    return toast(
                        {
                            variant: "default",
                            title: "Exchange rate configured.",
                            description: "Exchange rate configured successfully.",
                            className: "bg-green-500 text-white"
                        }
                    )
                }
            )
            .catch(
                (error) => {
                    console.log("Error configuring exchange rate: ", error)
                    setIsLoading(false)
                    return toast(
                        {
                            variant: "destructive",
                            title: "Something went wrong.",
                            description: "Exchange rate not configured. Please try again.",
                        }
                    )
                }
            )
    }


    return (
        <div className="flex flex-col min-h-screen py-2 px-5">
            <Tabs value={selectedTab} onValueChange={value => router.push(
                `?tab=${value}`,
                {
                    scroll: false,
                }
            )} className="space-y-4">
                <TabsList className="fixed z-50">
                    <TabsTrigger
                        value="currency">Currency</TabsTrigger>
                    <TabsTrigger value="exchangeRates">
                        Exchange-Rates
                    </TabsTrigger>
                    <TabsTrigger value="paymentMethods">
                        Payment Methods
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="currency" className="space-y-4 pt-8">
                    <CurrencyList currencies={currencies}/>
                </TabsContent>
                <TabsContent value={"exchangeRates"} className="space-y-4 pt-8">
                    <div className={"grid gap-4 md:grid-cols-2 grid-cols-1"}>
                        <Card>
                            <CardHeader
                                className="flex"
                            >
                                <CardTitle className={"text-sm flex flex-col w-full gap-2"}>
                                    <h1>Convert</h1>
                                    <div
                                        className="border w-full h-20 rounded-lg p-5 text-2xl text-primary flex items-center font-calculator">{rate ? rate.toLocaleString("en-US") : ""}</div>
                                </CardTitle>
                                <CardContent className="px-0 pb-0 pt-2">
                                    <Form {...getExchangeForCurrencyPairForm}>
                                        <form
                                            onSubmit={getExchangeForCurrencyPairForm.handleSubmit(onGetExchangeRateSubmit)}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full"
                                        >
                                            <FormField
                                                control={getExchangeForCurrencyPairForm.control}
                                                name="from"
                                                render={({field, formState: {errors}}) => (
                                                    <FormItem
                                                        className="flex flex-col gap-2"
                                                    >
                                                        <FormLabel className="text-xs">From Currency</FormLabel>
                                                        <Popover open={openFrom} onOpenChange={setFromOpen}>
                                                            <PopoverTrigger asChild className="w-full">
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        className={cn(
                                                                            "w-full justify-between text-xs",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {currencies && field.value
                                                                            ? currencies.find(
                                                                                (currency) => currency.code === field.value
                                                                            )?.name
                                                                            : "Select currency"}
                                                                        <CaretSortIcon
                                                                            className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent
                                                                className={`w-full p-0 text-xs ${openFrom ? "block" : "hidden"}`}
                                                                side="bottom"
                                                            >
                                                                <Command>
                                                                    <CommandInput
                                                                        placeholder="Search currencies..."
                                                                        className="h-9 text-xs"
                                                                    />
                                                                    <CommandEmpty>No country found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {exchangeRates && currencies && currencies
                                                                            .filter((currency) => {
                                                                            //     Show only currencies that have exchange rates
                                                                                return exchangeRates.some(
                                                                                    (rate) => rate.fromCurrency === currency.code
                                                                                ) && currency.code !== getExchangeForCurrencyPairForm.getValues("to");
                                                                            })
                                                                            .map((currency) => (
                                                                            <CommandItem
                                                                                value={currency.code}
                                                                                key={currency.code}
                                                                                onSelect={() => {
                                                                                    getExchangeForCurrencyPairForm.setValue("from", currency.code)
                                                                                    setFromOpen(false)
                                                                                }}
                                                                                className={"text-xs"}
                                                                            >
                                                                                {currency.name}
                                                                                <CheckIcon
                                                                                    className={cn(
                                                                                        "ml-auto h-4 w-4",
                                                                                        currency.code === field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage>
                                                            {errors?.from?.message}
                                                        </FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={getExchangeForCurrencyPairForm.control}
                                                name="to"
                                                render={({field, formState: {errors}}) => (
                                                    <FormItem
                                                        className="flex flex-col gap-2"
                                                    >
                                                        <FormLabel className="text-xs">To Currency</FormLabel>
                                                        <Popover open={openTo} onOpenChange={setOpenTo}>
                                                            <PopoverTrigger asChild className="w-full">
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        className={cn(
                                                                            "w-full justify-between text-xs",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {currencies && field.value
                                                                            ? currencies.find(
                                                                                (currency) => currency.code === field.value
                                                                            )?.name
                                                                            : "Select currency"}
                                                                        <CaretSortIcon
                                                                            className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent
                                                                className={`w-full p-0 text-xs ${openTo ? "block" : "hidden"}`}
                                                                side="bottom"
                                                            >
                                                                <Command>
                                                                    <CommandInput
                                                                        placeholder="Search currencies..."
                                                                        className="h-9 text-xs"
                                                                    />
                                                                    <CommandEmpty>No currency found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {exchangeRates && currencies && currencies
                                                                            .filter((currency) => {
                                                                                // Check if there are exchange rates for this currency
                                                                                return exchangeRates.some(
                                                                                    (rate) => rate.fromCurrency === getExchangeForCurrencyPairForm.getValues("from") && rate.toCurrency === currency.code
                                                                                ) && currency.code !== getExchangeForCurrencyPairForm.getValues("from");

                                                                            })
                                                                            .map((currency) => (
                                                                            <CommandItem
                                                                                value={currency.code}
                                                                                key={currency.code}
                                                                                onSelect={() => {
                                                                                    getExchangeForCurrencyPairForm.setValue("to", currency.code)
                                                                                    setOpenTo(false)
                                                                                }}
                                                                                className={"text-xs"}
                                                                            >
                                                                                {currency.name}
                                                                                <CheckIcon
                                                                                    className={cn(
                                                                                        "ml-auto h-4 w-4",
                                                                                        currency.code === field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage>
                                                            {errors?.from?.message}
                                                        </FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                disabled={!isExchangeRateFormValid || isExchangeRateFormSubmitting}
                                                variant={"default"}
                                                className={"w-full cursor-pointer flex justify-center text-xs mt-4"}
                                            >
                                                Get Exchange Rate
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader
                                className="flex"
                            >
                                <CardTitle className={"text-sm flex flex-col w-full gap-2"}>
                                    Configure Exchange Rates
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Form {...configureExchangeRatesForm}>
                                    <form
                                        onSubmit={configureExchangeRatesForm.handleSubmit(onConfigureExchangeRatesSubmit)}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full"
                                    >
                                        <FormField
                                            control={configureExchangeRatesForm.control}
                                            name="fromUUid"
                                            render={({field, formState: {errors}}) => (
                                                <FormItem
                                                    className="flex flex-col gap-2"
                                                >
                                                    <FormLabel className="text-xs">From Currency</FormLabel>
                                                    <Popover open={openConfigFrom} onOpenChange={setOpenConfigFrom}>
                                                        <PopoverTrigger asChild className="w-full">
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between text-xs",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {currencies && field.value
                                                                        ? currencies.find(
                                                                            (currency) => currency.code === field.value
                                                                        )?.name
                                                                        : "Select currency"}
                                                                    <CaretSortIcon
                                                                        className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className={`w-full p-0 text-xs ${openConfigFrom ? "block" : "hidden"}`}
                                                            side="bottom"
                                                        >
                                                            <Command>
                                                                <CommandInput
                                                                    placeholder="Search currencies..."
                                                                    className="h-9 text-xs"
                                                                />
                                                                <CommandEmpty>No country found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {exchangeRates && currencies && currencies
                                                                        .filter((currency) => {
                                                                            // Check if there are currencies that don't have exchange rates with the to-currency

                                                                            return !exchangeRates.some(
                                                                                (rate) => rate.fromCurrency === currency.code && rate.toCurrency === configureExchangeRatesForm.getValues("toUUid")
                                                                            ) && currency.code !== configureExchangeRatesForm.getValues("toUUid");
                                                                        })
                                                                        .map((currency) => (
                                                                        <CommandItem
                                                                            value={currency.code}
                                                                            key={currency.code}
                                                                            onSelect={() => {
                                                                                configureExchangeRatesForm.setValue("fromUUid", currency.code)
                                                                                setOpenConfigFrom(false)
                                                                            }}
                                                                            className={"text-xs"}
                                                                        >
                                                                            {currency.name}
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    currency.code === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage>
                                                        {errors?.fromUUid?.message}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={configureExchangeRatesForm.control}
                                            name="toUUid"
                                            render={({field, formState: {errors}}) => (
                                                <FormItem
                                                    className="flex flex-col gap-2"
                                                >
                                                    <FormLabel className="text-xs">To Currency</FormLabel>
                                                    <Popover open={openConfigTo} onOpenChange={setOpenConfigTo}>
                                                        <PopoverTrigger asChild className="w-full">
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between text-xs",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {currencies && field.value
                                                                        ? currencies.find(
                                                                            (currency) => currency.code === field.value
                                                                        )?.name
                                                                        : "Select currency"}
                                                                    <CaretSortIcon
                                                                        className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className={`w-full p-0 text-xs ${openConfigTo ? "block" : "hidden"}`}
                                                            side="bottom"
                                                        >
                                                            <Command>
                                                                <CommandInput
                                                                    placeholder="Search currencies..."
                                                                    className="h-9 text-xs"
                                                                />
                                                                <CommandEmpty>No country found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {exchangeRates && currencies && currencies
                                                                        .filter((currency) => {
                                                                            // Check if there are no exchange rates for this currency

                                                                            return !exchangeRates.some(
                                                                                (rate) => rate.fromCurrency === configureExchangeRatesForm.getValues("fromUUid") && rate.toCurrency === currency.code
                                                                            ) && currency.code !== configureExchangeRatesForm.getValues("fromUUid");
                                                                        })
                                                                        .map((currency) => (
                                                                        <CommandItem
                                                                            value={currency.code}
                                                                            key={currency.code}
                                                                            onSelect={() => {
                                                                                configureExchangeRatesForm.setValue("toUUid", currency.code)
                                                                                setOpenConfigTo(false)
                                                                            }}
                                                                            className={"text-xs"}
                                                                        >
                                                                            {currency.name}
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    currency.code === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage>
                                                        {errors?.toUUid?.message}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={configureExchangeRatesForm.control}
                                            name="rate"
                                            render={
                                                ({field, formState: {errors}}) => (
                                                    <FormItem className="col-span-full">
                                                        <FormLabel className="text-xs">Rate</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={isConfigureExchangeRatesFormSubmitting}
                                                                placeholder="Rate"
                                                                {...field}
                                                                type={"number"}
                                                                className="text-xs"
                                                            />
                                                        </FormControl>
                                                        <FormMessage>
                                                            {errors?.rate?.message}
                                                        </FormMessage>
                                                    </FormItem>
                                                )
                                            }
                                        />
                                        <Button
                                            type="submit"
                                            disabled={!isConfigureExchangeRatesFormValid || isConfigureExchangeRatesFormSubmitting || isLoading}
                                            variant={"default"}
                                            className={"w-full cursor-pointer flex justify-center text-xs mt-4"}
                                        >
                                            <p className={`${isLoading ? "hidden" : "block"}`}>Configure</p>
                                            {
                                                isLoading && (
                                                    <Oval height={20} width={20} color={"#fff"} secondaryColor={"rgba(198,172,246,0.6)"}/>
                                                )
                                            }
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                        <Card className="col-span-full">
                            <CardHeader
                                className="flex"
                            >
                                <CardTitle className={"text-sm flex flex-col w-full"}>
                                    Exchange Rates
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ExchangeRatesList exchangeRates={exchangeRates} />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsPage;