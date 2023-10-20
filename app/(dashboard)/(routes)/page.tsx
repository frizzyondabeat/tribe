"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@components/ui/card";
import {Overview, RecentSales} from "@app/(dashboard)/_components";
import {Shield} from "lucide-react";
import {useEffect, useState} from "react";
import {fetchTotalCountOfUsers} from "@lib/userCalls";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {
    fetchDailyTransactionCount, fetchMonthlyTransaction,
    fetchTopTransactions,
    fetchTotalTransactionAmount, MonthlyTransactionCountProps, TotalTransactionValueProps,
    TransactionArray
} from "@lib/transactionsCalls";

const UserTypes = ["APP_USER", "INSTITUTION_ADMIN", "SUPER_ADMIN"];


export default function RootPage() {

    const axiosAuth = useAxiosAuth();

    const {data: session} = useSession()

    const router = useRouter();

    const currentMonth = new Date().toLocaleString('default', { month: 'long' })

    const [totalAdminUsers, setTotalAdminUsers] = useState<number>(0);
    const [totalAppUsers, setTotalAppUsers] = useState<number>(0);
    const [dailyTransactionCount, setDailyTransactionCount] = useState<number>(0);
    const [totalTransactions, setTotalTransactions] = useState<TotalTransactionValueProps>();
    const [topTransactions, setTopTransactions] = useState<TransactionArray>();
    const [transactionIndex, setTransactionIndex] = useState<number>(0);
    const [monthlyTransactions, setMonthlyTransactions] = useState<MonthlyTransactionCountProps>();

    useEffect(() => {
        if (!session) {
            router.push("/sign-in");
        } else {
            UserTypes.filter((userType) => userType !== "SUPER_ADMIN").forEach((userType) => {
                fetchTotalCountOfUsers(axiosAuth, userType)
                    .then((response) => {
                        if (response) {
                            if (userType === "APP_USER") {
                                setTotalAppUsers(response);
                            } else if (userType === "INSTITUTION_ADMIN") {
                                setTotalAdminUsers(response);
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
            fetchDailyTransactionCount(axiosAuth)
                .then((response) => {
                    if (response) {
                        setDailyTransactionCount(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            fetchTotalTransactionAmount(axiosAuth)
                .then((response) => {
                    if (response) {
                        console.log("TotalTransactionValue: ",response);
                        setTotalTransactions(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            fetchTopTransactions(axiosAuth)
                .then((response) => {
                    if (response) {
                        setTopTransactions(response)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            fetchMonthlyTransaction(axiosAuth)
                .then((response) => {
                    if (response) {
                        console.log("MonthlyTransactionCount: ",response)
                        setMonthlyTransactions(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [axiosAuth]);

    useEffect(() => {
        if (totalTransactions && totalTransactions?.length > 1) {
            const interval = setInterval(() => {
                setTransactionIndex((prevIndex) => {
                    // Move to the next currency, and loop back to the first currency if necessary
                    // @ts-ignore
                    return (prevIndex + 1) % totalTransactions?.length;
                });
            }, 10000); // Change currency every 3 seconds

            return () => clearInterval(interval);
        }
    }, [totalTransactions]);

    return (
        <div className="flex flex-col min-h-screen py-2 px-5">
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="fixed">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger value="reports">
                        Reports
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        Notifications
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 pt-8">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Transactions
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">{totalTransactions && totalTransactions[transactionIndex]?.totalAmount}</div>
                                <p className="text-xs text-muted-foreground">
                                    {totalTransactions && totalTransactions[transactionIndex]?.currency}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Daily Transactions
                                </CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <rect width="20" height="14" x="2" y="5" rx="2"/>
                                    <path d="M2 10h20"/>
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">{dailyTransactionCount}</div>
                                {/*<p className="text-xs text-muted-foreground">*/}
                                {/*    +180.1% from last month*/}
                                {/*</p>*/}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">App Users</CardTitle>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="h-4 w-4 text-muted-foreground"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">{totalAppUsers}</div>
                                {/*<p className="text-xs text-muted-foreground">*/}
                                {/*    +19% from last month*/}
                                {/*</p>*/}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Admin Users
                                </CardTitle>
                                <Shield size={16} className="text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">{totalAdminUsers}</div>
                                {/*<p className="text-xs text-muted-foreground">*/}
                                {/*    +21 since last hour*/}
                                {/*</p>*/}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 h-[60%]">
                        <Card className="md:col-span-full lg:col-span-4 h-[65%] col-span-full">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="items-center justify-center flex h-full w-full flex-shrink ">
                                <div className="h-full w-full">
                                    <Overview data={monthlyTransactions}/>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-full lg:col-span-3 h-[65%] col-span-full">
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                                <CardDescription>
                                    {monthlyTransactions && `You have ${monthlyTransactions?.filter(transaction => transaction.month === currentMonth)[0].count} transactions this month`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="h-[70%] overflow-y-auto">
                                <RecentSales transactions={topTransactions}/>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
