"use client"
import React, {useEffect, useState} from 'react';
import {UsersProps} from "@app/(dashboard)/(routes)/users/_components/UserColumns";
import {fetchUser} from "@lib/userCalls";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {Button} from "@components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@components/ui/card";
import {Avatar, AvatarFallback} from "@components/ui/avatar";
import {Separator} from "@components/ui/separator";

const UserDetailsPage = ({params}: { params: { uuid: string } }) => {

    const {uuid} = params;

    const [user, setUser] = useState<UsersProps>();

    const axiosAuth = useAxiosAuth();

    const router = useRouter();

    useEffect(() => {
        console.log(params);
        fetchUser(axiosAuth, uuid).then((response) => {
            console.log(response);
            setUser(response);
        }).catch((error) => {
            console.log(error);
        });
    }, [axiosAuth, uuid]);

    return (
        <div className="flex flex-col min-h-screen py-2 px-5">
            <Button
                variant="ghost"
                onClick={() => {
                    router.back();
                }}
                className="flex items-center w-auto"
            >
                <ArrowLeft className="h-4 w-4"/>
                <p>Go back</p>
            </Button>
            <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <Card>
                    <CardContent>
                        <Avatar>
                            <AvatarFallback>
                                {
                                    user && `${user.firstName[0]}${user.lastName[0]}`
                                }
                            </AvatarFallback>
                        </Avatar>
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
                                user && user.enabled ? (
                                    <Button
                                        variant={"outline"}
                                        onClick={() => {
                                        }}
                                    >
                                        Disable User
                                    </Button>
                                ) : (
                                    <Button
                                        variant={"outline"}
                                        onClick={() => {
                                        }}
                                    >
                                        Enable User
                                    </Button>
                                )
                            }
                            <Button
                                variant={"destructive"}
                                onClick={() => {
                                }}
                            >
                                Delete User
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            User Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <h1 className="w-1/3">Full Name</h1>
                            <p className="w-full">{user && `${user.firstName} ${user.lastName}`}</p>
                        </div>
                        <Separator className="my-2"/>
                        <div className="flex items-center">
                            <h1 className="w-1/3">Email</h1>
                            <p className="w-full">{user && user.email}</p>
                        </div>
                        <Separator className="my-2"/>
                        <div className="flex items-center">
                            <h1 className="w-1/3">Address</h1>
                            <p className="w-full">{user && user.address}</p>
                        </div>
                        <Separator className="my-2"/>
                        <div className="flex items-center">
                            <h1 className="w-1/3">Phone Number</h1>
                            <p className="w-full">{user && user.phoneNumber}</p>
                        </div>
                        <Separator className="my-2"/>
                        <div className="flex items-center">
                            <h1 className="w-1/3">Country</h1>
                            <p className="w-full">{user && user.country}</p>
                        </div>
                        <Separator className="my-2"/>
                        <div className="flex items-center">
                            <h1 className="w-1/3">Created At</h1>
                            <p className="w-full">{user && new Date(user.createdAt).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}</p>
                        </div>
                        <Separator className="my-2"/>
                        <div className="flex items-center">
                            <h1 className="w-1/3">Updated At</h1>
                            <p className="w-full">{user && new Date(user.updatedAt).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserDetailsPage;