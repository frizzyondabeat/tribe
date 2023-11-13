"use client"
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@components/ui/tabs";
import {useRouter, useSearchParams} from "next/navigation";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {useToast} from "@components/ui/use-toast";

const ApprovalsPage = () => {

    const searchParams = useSearchParams();

    const axiosAuth = useAxiosAuth();

    const {toast} = useToast();

    const router = useRouter()

    const selectedTab = searchParams.get("tab") || "tier";

    return (
        <div className="flex flex-col min-h-screen py-2 px-5">
            <Tabs
                className="space-y-4"
                value={selectedTab}
                onValueChange={value => router.push(
                    `?tab=${value}`,
                    {
                        scroll: false,
                    }
                )}
            >
                <TabsList className={"fixed z-50"}>
                    <TabsTrigger value={"tier"}>
                        Tier
                    </TabsTrigger>
                    <TabsTrigger
                        value="currency">Currency</TabsTrigger>
                    <TabsTrigger value="exchangeRates">
                        Exchange-Rates
                    </TabsTrigger>
                    <TabsTrigger value={"users"}>
                        Users
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value={"tier"}
                    className={"space-y-4 pt-8"}
                >
                    <h1>Tiers</h1>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ApprovalsPage;