"use client"

import React, {useEffect, useState} from 'react';
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {fetchAdminUsers, UserArray} from "@lib/userCalls";
import {toast} from "@components/ui/use-toast";
import {UsersList} from "@app/(dashboard)/_components";

const AdminUsersPage = () => {


    const axiosAuth = useAxiosAuth();

    const [users, setUsers] = useState<UserArray | undefined>();

    useEffect(() => {
        fetchAdminUsers(axiosAuth)
            .then((response) => {
                console.log("Fetched users: ", response)
                setUsers(response);
            }).catch((error) => {
            if (error?.response?.status === 404) {
                return toast(
                    {
                        variant: "destructive",
                        title: "Network error.",
                        description: "Please check your internet connection and try again."
                    }
                )
            } else {
                return toast(
                    {
                        variant: "destructive",
                        title: "Something went wrong.",
                        description: "Token expired. Please login again.",
                    }
                )
            }
        });
    }, [axiosAuth]);

    return (
        <div className="flex flex-col min-h-screen">
            <UsersList users={users}/>
        </div>
    );
};

export default AdminUsersPage;