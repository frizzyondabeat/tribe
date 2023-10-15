import React from 'react';
import {UsersList} from "@app/(dashboard)/_components";

const UsersPage = () => {
    return (
        <div className="flex flex-col min-h-screen py-2 px-5">
            <UsersList />
        </div>
    );
};

export default UsersPage;