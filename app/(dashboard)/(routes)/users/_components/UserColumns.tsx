"use client"

import {ColumnDef, Row} from "@tanstack/react-table"
import {Button} from "@components/ui/button";
import {ArrowUpDown, MoreHorizontal, Shield, ShieldHalf, User, Verified} from "lucide-react";
import {z} from "zod";
import {UserSchema} from "@models/User";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import React from "react";
import {useRouter} from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UsersProps = z.infer<typeof UserSchema>

export const UserActionCell = ({ row }: {
    row: Row<UsersProps>
}) => {
    const {uuid} = row.original

    //@ts-ignore
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(uuid)}
                >
                    Copy UUID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={
                        () => {
                            router.push(`/users/${uuid}`)
                        }
                    }
                >
                    View User
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const userColumns: ColumnDef<UsersProps>[] = [
    {
        id: "actions",
        cell: UserActionCell,
    },
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
        accessorKey: "userType",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User Type
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {

            const {userType} = row.original

            if (userType === "SUPER_ADMIN") {
                return (
                    <Button variant="default" className="w-full uppercase flex gap-x-5 cursor-auto">
                        <Shield className="h-4 w-4 fill-red-500"/>
                        {userType}
                    </Button>
                )
            } else if (userType === "INSTITUTION_ADMIN") {
                return (
                    <Button variant="secondary" className="w-full uppercase flex gap-x-5 cursor-auto">
                        <ShieldHalf className="h-4 w-4 fill-amber-500"/>
                        {userType}
                    </Button>
                )
            } else {
                return (
                    <Button variant="ghost" className="w-full uppercase flex gap-x-5 cursor-auto">
                        <User className="h-4 w-4"/>
                        {userType}
                    </Button>
                )
            }
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
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({row}) => {
            const date = new Date(row.original.createdAt)
            const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            return (
                <p>{formattedDate}</p>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({row}) => {
            const date = new Date(row.original.updatedAt)
            const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            return (
                <p>{formattedDate}</p>
            )
        }
    },
    {
        accessorKey: "uuid",
        header: "UUID",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "enabled",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Enabled
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {

                const {enabled} = row.original

                if (enabled) {
                    return (
                        <Button variant="ghost" className="w-full uppercase flex gap-x-5 cursor-auto">
                            <Verified className="h-4 w-4 fill-green-500"/>
                        </Button>
                    )
                } else {
                    return (
                        <Button variant="ghost" className="w-full uppercase flex gap-x-5 cursor-auto">
                            <Verified className="h-4 w-4 fill-red-500"/>
                        </Button>
                    )
                }
        }
    }
]
