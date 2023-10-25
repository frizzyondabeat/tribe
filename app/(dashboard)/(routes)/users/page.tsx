"use client"
import React from 'react';
import {UsersList} from "@app/(dashboard)/_components";
import {useFetch} from "@lib/hooks/useSWR";


const UsersPage = () => {

    const {getAllUsers} = useFetch()

    const {data: users} = getAllUsers()

    return (
        <div className="flex flex-col min-h-screen">
            <UsersList users={users}/>
        </div>
    );
};

export default UsersPage;

