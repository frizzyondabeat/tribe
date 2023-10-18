"use client"

import React from 'react';
import {userColumns} from "@app/(dashboard)/_components/UserColumns";
import {DataTable} from "@components/ui/data-table";
import {UserArray} from "@lib/fetchUsers";


const UsersList = ({users}: {users: UserArray | undefined}) => {

    return (
        <div className="container mx-auto py-10 overflow-x-auto">
            <DataTable columns={userColumns} data={users} />
        </div>
    );
};

export default UsersList;