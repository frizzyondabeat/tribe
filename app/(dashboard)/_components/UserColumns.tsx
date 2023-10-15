"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Button} from "@components/ui/button";
import {ArrowUpDown, Shield, User} from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
    id: string
    firstName: string
    lastName: string
    status: "admin" | "user"
    email: string
}

export const userColumns: ColumnDef<Users>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {

            const {status} = row.original

            return status === "admin"
                ? (
                    <Button variant="default" className="w-full uppercase flex gap-x-5 cursor-auto">
                        <Shield className="h-4 w-4"/>
                        {status}
                    </Button>
                ) : (
                    <Button variant="ghost" className="w-full uppercase flex gap-x-5 cursor-auto">
                        <User className="h-4 w-4"/>
                        {status}
                    </Button>
                )
        },
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    }
]
