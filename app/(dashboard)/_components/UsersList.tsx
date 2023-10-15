"use client"

import React from 'react';
import {userColumns, Users} from "@app/(dashboard)/_components/UserColumns";
import {DataTable} from "@components/ui/data-table";

// TODO: Fetch data from API
const getTableData:Users[] = () => {

    return [
        {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            status: "admin",
            email: "john.doe@gmail.com"
        },
        {
            id: "2",
            firstName: "Jane",
            lastName: "Doe",
            status: "user",
            email: "maryjane@rocketmail.com"
        },
        {
            id: "3",
            firstName: "Leslie",
            lastName: "Enyinnia",
            status: "admin",
            email: "leslie.e@yahoo.com"
        },
        {
            id: "4",
            firstName: "Mayowa",
            lastName: "Yusuf",
            status: "admin",
            email: "mayowa.yusuf@outlook.com"
        }
    ];
}

const UsersList = () => {

    // TODO: Fetch data from API

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={userColumns} data={getTableData()} />
        </div>
    );
};

export default UsersList;