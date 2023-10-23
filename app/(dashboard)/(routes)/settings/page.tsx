"use client"

import React, {useEffect, useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@components/ui/tabs";
import CurrencyList from "@app/(dashboard)/(routes)/settings/_components/CurrencyList";
import {CurrencyArray, fetchAllCurrencies} from "@lib/currencyCalls";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {useToast} from "@components/ui/use-toast";
import {ToastAction} from "@components/ui/toast";
import {useRouter} from "next/navigation";
import {useCurrencyContext} from "@context/CurrencyContext";

const SettingsPage = () => {

   const {currencies, setCurrencies} = useCurrencyContext()

    const axiosAuth = useAxiosAuth();

    const {toast} = useToast();

    const router = useRouter()

    useEffect(() => {
        fetchAllCurrencies(axiosAuth)
            .then((response) => {
                console.log("Fetched currencies: ", response)
                setCurrencies(response);
            }).catch((error) => {
            console.log("Error fetching currencies: ", error)
            if (error?.response?.status === 404) {
                return toast(
                    {
                        variant: "destructive",
                        title: "Network error.",
                        description: "Please check your internet connection and try again.",
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
            } else if (error?.response?.status === 401) {
                console.log("Error fetching currencies: ", error)
                router.push("/sign-in")
                return toast(
                    {
                        variant: "destructive",
                        title: "Something went wrong.",
                        description: "Token expired. Please login again.",
                    }
                )
            } else {
                console.log("Error fetching currencies: ", error)
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
        })
    }, [axiosAuth, router]);

    return (
        <div className="flex flex-col min-h-screen py-2 px-5">
            <Tabs defaultValue="currency" className="space-y-4">
                <TabsList className="fixed z-50">
                    <TabsTrigger value="currency">Currency</TabsTrigger>
                    <TabsTrigger value="exchangeRates">
                        Exchange Rates
                    </TabsTrigger>
                    <TabsTrigger value="paymentMethods">
                        Payment Methods
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="currency" className="space-y-4 pt-8">
                    <CurrencyList currencies={currencies} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsPage;