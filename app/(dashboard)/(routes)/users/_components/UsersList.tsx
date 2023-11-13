"use client"

import React from 'react';
import {userColumns} from "@app/(dashboard)/(routes)/users/_components/UserColumns";
import {DataTable} from "@components/ui/data-table";
import {UserArray} from "@lib/userCalls";


const UsersList = ({users}: {users: UserArray | undefined}) => {

    return (
        <div className="container mx-auto py-2 overflow-x-auto">
            <DataTable columns={userColumns} data={users} filename={"users.csv"} />
        </div>
    );
};

export default UsersList;