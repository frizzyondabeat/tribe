"use client"

import React, {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@components/ui/tabs";
import CurrencyList from "@app/(dashboard)/(routes)/settings/_components/CurrencyList";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {useToast} from "@components/ui/use-toast";
import {ToastAction} from "@components/ui/toast";
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
    const {data: exchangeRates} = GetAllExchangeRates()


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

    const onConfigureExchangeRatesSubmit = async (data: z.infer<typeof ConfigureRate>) => {
        console.log("Configuring exchange rate: ", data)
        configureExchangeRate(axiosAuth, data)
            .then((response) => {
                console.log("Configured exchange rate: ", response)
                configureExchangeRatesForm.reset()
                return toast(
                    {
                        variant: "default",
                        title: "Exchange rate configured.",
                        description: "Exchange rate configured successfully.",
                        className: "bg-green-500 text-white"
                    }
                )
            })
            .catch(
                (error) => {
                    console.log("Error configuring exchange rate: ", error)
                    if (error?.response?.status === 404) {
                        return toast(
                            {
                                variant: "destructive",
                                title: "Network error.",
                                description: "Please check your internet connection and try again.",
                                action:
                                    <ToastAction
                                        altText={"Try again"}
                                        onClick={() => onConfigureExchangeRatesSubmit(data)}
                                        className={"cursor-pointer hover:underline outline-none border-none"}
                                    >
                                        Try again
                                    </ToastAction>
                            }
                        )
                    } else if (error?.response?.status === 401) {
                        console.log("Error configuring exchange rate: ", error)
                        router.push("/sign-in")
                        return toast(
                            {
                                variant: "destructive",
                                title: "Something went wrong.",
                                description: "Token expired. Please login again.",
                            }
                        )
                    } else {
                        console.log("Error configuring exchange rate: ", error)
                        return toast(
                            {
                                variant: "destructive",
                                title: "Something went wrong.",
                                description: "Please try again.",
                                action:
                                    <ToastAction
                                        altText={"Try again"}
                                        onClick={() => router.refresh()}
                                        className={"cursor-pointer hover:underline outline-none border-none"}
                                    >
                                        Try again
                                    </ToastAction>
                            }
                        )
                    }
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
                        Exchange Rates
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
                                    <h1>Exchange Rates</h1>
                                    <div
                                        className="border w-full h-20 rounded-lg p-5 text-2xl text-primary flex items-center font-calculator">{rate ? rate : ""}</div>
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
                                                                        {currencies && currencies.map((currency) => (
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
                                                                        {currencies && currencies.map((currency) => (
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
                                                                            (currency) => currency.uuid === field.value
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
                                                                    {currencies && currencies.map((currency) => (
                                                                        <CommandItem
                                                                            value={currency.uuid}
                                                                            key={currency.uuid}
                                                                            onSelect={() => {
                                                                                configureExchangeRatesForm.setValue("fromUUid", currency.uuid)
                                                                                setOpenConfigFrom(false)
                                                                            }}
                                                                            className={"text-xs"}
                                                                        >
                                                                            {currency.name}
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    currency.uuid === field.value
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
                                                                            (currency) => currency.uuid === field.value
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
                                                                    {currencies && currencies.map((currency) => (
                                                                        <CommandItem
                                                                            value={currency.uuid}
                                                                            key={currency.uuid}
                                                                            onSelect={() => {
                                                                                configureExchangeRatesForm.setValue("toUUid", currency.uuid)
                                                                                setOpenConfigTo(false)
                                                                            }}
                                                                            className={"text-xs"}
                                                                        >
                                                                            {currency.name}
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    currency.uuid === field.value
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
                                            disabled={!isConfigureExchangeRatesFormValid || isConfigureExchangeRatesFormSubmitting}
                                            variant={"default"}
                                            className={"w-full cursor-pointer flex justify-center text-xs mt-4"}
                                        >
                                            Configure
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsPage;