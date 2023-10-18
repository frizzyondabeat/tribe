"use client"
import React, {useEffect, useState} from 'react';
import {UsersProps} from "@app/(dashboard)/_components/UserColumns";
import {fetchUser} from "@lib/fetchUsers";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {Button} from "@components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";

const UserDetailsPage = ({params}: { params: { uuid: string } }) => {

    const [user, setUser] = useState<UsersProps>();

    const axiosAuth = useAxiosAuth();

    const router = useRouter();

    useEffect(() => {
        console.log(params);
        fetchUser(axiosAuth, params.uuid).then((response) => {
            console.log(response);
            setUser(response);
        }).catch((error) => {
            console.log(error);
        });
    });

    return (
        <div>
            <Button
                variant="ghost"
                onClick={() => {
                    router.back();
                }}
            >
                <ArrowLeft className="h-4 w-4"/>
                <p>Go back</p>
            </Button>
            <p>{user?.firstName}</p>
        </div>
    );
};

export default UserDetailsPage;