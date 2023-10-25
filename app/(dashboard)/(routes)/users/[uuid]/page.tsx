"use client"
import React, {useEffect, useState} from 'react';
import {UsersProps} from "@app/(dashboard)/(routes)/users/_components/UserColumns";
import {activateOrDeactivateAppUser, fetchUser, VIEW_ONE_USER_URL} from "@lib/userCalls";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {Button} from "@components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@components/ui/card";
import {Avatar, AvatarFallback} from "@components/ui/avatar";
import {Separator} from "@components/ui/separator";
import {toast} from "@components/ui/use-toast";
import UserCardSkeleton from "@app/(dashboard)/(routes)/users/_components/UserCardSkeleton";
import UserDetailsSkeleton from "@app/(dashboard)/(routes)/users/_components/UserDetailsSkeleton";
import useSWR from "@node_modules/swr";
import {useSession} from "next-auth/react";


const UserDetailsPage = ({params}: { params: { uuid: string } }) => {

    const {uuid} = params;

    const axiosAuth = useAxiosAuth();

    const router = useRouter();

    const {data: user, mutate} = useSWR(VIEW_ONE_USER_URL,() => fetchUser(axiosAuth, uuid))

    const {data: session} = useSession();


    return (
        <div className="flex flex-col min-h-screen py-2 px-5 gap-4">
            <Button
                variant="ghost"
                onClick={() => {
                    router.back();
                }}
                className="flex items-center w-fit"
            >
                <ArrowLeft className="h-4 w-4"/>
                <p>Go back</p>
            </Button>
            <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
                <Card className="md:col-span-1 col-span-full items-center justify-center flex flex-col">
                    {
                        user
                            ? (
                                <React.Fragment>
                                    <CardHeader>
                                        <Avatar className="h-20 w-20">
                                            <AvatarFallback>
                                                {
                                                    user && `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
                                                }
                                            </AvatarFallback>
                                        </Avatar>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center justify-center gap-3">
                                        <h1 className="text-2xl font-bold">
                                            {user && `${user.firstName} ${user.lastName}`}
                                        </h1>
                                        <p className="text-xs text-slate-500 font-light">
                                            {user && user.uuid}
                                        </p>
                                        <p className="text-sm text-slate-500 font-semibold">
                                            {user && user.userType}
                                        </p>
                                        <div className="flex space-x-4">
                                            {
                                                session?.user?.role === "SUPER_ADMIN" && user && user.userType === "APP_USER" ?
                                                    (user && user.status === "ACTIVATED" ? (
                                                        <Button
                                                            variant={"outline"}
                                                            onClick={() => {
                                                                activateOrDeactivateAppUser(axiosAuth, uuid, "DEACTIVATED").then((response) => {
                                                                    mutate(response, {
                                                                        optimisticData: response,
                                                                        populateCache: true,
                                                                        rollbackOnError: true,
                                                                        revalidate: false
                                                                    });
                                                                    return toast({
                                                                        variant: "default",
                                                                        title: "User disabled.",
                                                                        description: "User has been disabled.",
                                                                        className: "bg-amber-500 text-white"
                                                                    })
                                                                })
                                                            }}
                                                        >
                                                            Disable User
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant={"outline"}
                                                            onClick={() => {
                                                                activateOrDeactivateAppUser(axiosAuth, uuid, "ACTIVATED").then((response) => {
                                                                    mutate(response, {
                                                                        optimisticData: response,
                                                                        populateCache: true,
                                                                        rollbackOnError: true,
                                                                        revalidate: false
                                                                    });
                                                                    return toast({
                                                                        variant: "default",
                                                                        title: "User activated.",
                                                                        description: "User has been activated.",
                                                                        className: "bg-green-500 text-white"
                                                                    })
                                                                })
                                                            }}
                                                        >
                                                            Enable User
                                                        </Button>
                                                    )) : null
                                            }
                                            {session?.user?.role === "SUPER_ADMIN"  && user && user.userType === "APP_USER" && <Button
                                                variant={"destructive"}
                                                onClick={() => {
                                                }}
                                            >
                                                Delete User
                                            </Button>}
                                        </div>
                                    </CardContent>
                                </React.Fragment>
                            ) : (
                                <UserCardSkeleton/>
                            )
                    }
                </Card>
                <Card className="md:col-span-2 col-span-full">
                    {
                        user
                            ? (
                                <React.Fragment>
                                    <CardHeader>
                                        <CardTitle className="text-[16px]">
                                            Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs">
                                        <div className="flex items-center">
                                            <h1 className="w-1/3 font-semibold">Full Name</h1>
                                            <p className="w-full">{user && `${user.firstName} ${user.lastName}`}</p>
                                        </div>
                                        <Separator className="my-2"/>
                                        <div className="flex items-center">
                                            <h1 className="w-1/3 font-semibold">Email</h1>
                                            <p className="w-full">{user && user.email}</p>
                                        </div>
                                        <Separator className="my-2"/>
                                        <div className="flex items-center">
                                            <h1 className="w-1/3 font-semibold">Address</h1>
                                            <p className="w-full">{user && user.address}</p>
                                        </div>
                                        <Separator className="my-2"/>
                                        <div className="flex items-center">
                                            <h1 className="w-1/3 font-semibold">Phone Number</h1>
                                            <p className="w-full">{user && user.phoneNumber}</p>
                                        </div>
                                        <Separator className="my-2"/>
                                        <div className="flex items-center">
                                            <h1 className="w-1/3 font-semibold">Country</h1>
                                            <p className="w-full">{user && user.country}</p>
                                        </div>
                                        <Separator className="my-2"/>
                                        <div className="flex items-center">
                                            <h1 className="w-1/3 font-semibold">Status</h1>
                                            <p className={`w-full ${user?.status === "ACTIVATED" ? "text-[#2fa406]" : "text-red-400"}`}>{user && user.status}</p>
                                        </div>

                                        <Separator className="my-2"/>
                                        <div className="flex items-center">
                                            <h1 className="w-1/3 font-semibold">KYC Completed</h1>
                                            <p className={`w-full uppercase ${user?.kycCompleted ? "text-[#2fa406]" : "text-red-400"}`}>{user && user.kycCompleted.toString()}</p>
                                        </div>

                                        <Separator className="my-2"/>
                                        <div className="flex items-center">
                                            <h1 className="w-1/3 font-semibold">Created At</h1>
                                            <p className="w-full">{user && new Date(user.createdAt).toLocaleDateString("en-US", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}</p>
                                        </div>
                                        <Separator className="my-2"/>
                                        <div className="flex items-center">
                                            <h1 className="w-1/3 font-semibold">Updated At</h1>
                                            <p className="w-full">{user && new Date(user.updatedAt).toLocaleDateString("en-US", {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}</p>
                                        </div>
                                    </CardContent>
                                </React.Fragment>
                            )
                            : (
                                <UserDetailsSkeleton />
                            )
                    }
                </Card>
            </div>
        </div>
    );
};

export default UserDetailsPage;