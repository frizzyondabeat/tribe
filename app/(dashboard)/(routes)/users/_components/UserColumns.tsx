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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import React from "react";
import {useRouter} from "next/navigation";
import {toast} from "@components/ui/use-toast";
import {BsClipboardCheckFill, BsFillClipboardXFill, BsPersonFillCheck, BsPersonFillX} from "react-icons/bs";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UsersProps = z.infer<typeof UserSchema>

const statusColor = {
    ACTIVATED: "bg-green-100",
    DEACTIVATED: "bg-red-100",
}

export const UserActionCell = ({row}: {
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
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-[13px]">Actions</DropdownMenuLabel>
                {/*<DropdownMenuItem*/}
                {/*    onClick={() =>*/}
                {/*        navigator.clipboard.writeText(uuid)*/}
                {/*            .then(*/}
                {/*                () => {*/}
                {/*                    return toast(*/}
                {/*                        {*/}
                {/*                            variant: "default",*/}
                {/*                            title: "Copied to clipboard",*/}
                {/*                            description: "Copied UUID to clipboard.",*/}
                {/*                            className: "bg-green-500 text-white",*/}
                {/*                        }*/}
                {/*                    )*/}
                {/*                }*/}
                {/*            )*/}
                {/*    }*/}
                {/*    className={"text-[13px]"}*/}
                {/*>*/}
                {/*    Copy UUID*/}
                {/*</DropdownMenuItem>*/}
                {/*<DropdownMenuSeparator/>*/}
                <DropdownMenuItem
                    className={"text-[13px]"}
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
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold"
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {id} = row.original
            return (
                <p className="flex justify-center text-[13px]">{id}</p>
            )
        },
        // @ts-ignore
        // show: false,
    },
    {
        accessorKey: "firstName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
                >
                    First Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {firstName} = row.original
            return (
                <p className="flex justify-center text-[13px]">{firstName}</p>
            )
        }
    },
    {
        accessorKey: "lastName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
                >
                    Last Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {lastName} = row.original
            return (
                <p className="flex justify-center text-[13px]">{lastName}</p>
            )
        }
    },
    {
        accessorKey: "userType",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
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
                    <Button variant="default" className="w-full uppercase flex gap-x-5 cursor-auto text-[13px]">
                        <Shield className="h-4 w-4 fill-red-500"/>
                        {userType}
                    </Button>
                )
            } else if (userType === "INSTITUTION_ADMIN") {
                return (
                    <Button variant="secondary" className="w-full uppercase flex gap-x-5 cursor-auto text-[13px]">
                        <ShieldHalf className="h-4 w-4 fill-amber-500"/>
                        {userType}
                    </Button>
                )
            } else {
                return (
                    <Button variant="ghost" className="w-full uppercase flex gap-x-5 cursor-auto text-[13px]">
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
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {email} = row.original
            return (
                <p className="flex justify-center text-[13px]">{email}</p>
            )
        }
    },
    {
        accessorKey: "phoneNumber",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
                >
                    Phone Number
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {phoneNumber} = row.original
            return (
                <p className="flex justify-center text-[13px]">{phoneNumber}</p>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const date = new Date(row.original.createdAt)
            const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            return (
                <p className={"flex justify-center whitespace-nowrap text-[13px]"}>{formattedDate}</p>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
                >
                    Updated At
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const date = new Date(row.original.updatedAt)
            const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            return (
                <p className="text-[13px] flex justify-center whitespace-nowrap">{formattedDate}</p>
            )
        }
    },
    {
        accessorKey: "uuid",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
                >
                    UUID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {uuid} = row.original
            return (
                <p className="flex justify-center text-[13px] whitespace-nowrap">{uuid}</p>
            )
        }
    },
    {
        accessorKey: "address",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
                >
                    Address
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
                const {address} = row.original
                return (
                    <p className="flex justify-center text-[13px] whitespace-nowrap">{address}</p>
                )
        }
    },
    {
        accessorKey: "country",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
                >
                    Country
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {

                const {country} = row.original

                return (
                    <p className="flex justify-center text-[13px]">{country}</p>
                )
        }
    },
    {
        accessorKey: "enabled",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
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
                        <BsPersonFillCheck className="h-4 w-4 fill-green-500"/>
                    </Button>
                )
            } else {
                return (
                    <Button variant="ghost" className="w-full uppercase flex gap-x-5 cursor-auto">
                        <BsPersonFillX className="h-4 w-4 fill-red-500"/>
                    </Button>
                )
            }
        }
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap`}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {

            const {status} = row.original

            return (
                <Button variant="ghost" className={`w-full uppercase text-[13px] flex gap-x-5 cursor-auto ${statusColor[status]} ${status === "ACTIVATED" ? "text-[#2fa406]" : "text-red-600"}`}>
                    {status}
                </Button>
            )
        }
    },
    {
        accessorKey: "kycCompleted",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-center gap-x-1 justify-center w-full text-[13px]
                     font-semibold whitespace-nowrap"
                >
                    KYC Completed
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {

                const {kycCompleted} = row.original

                if (kycCompleted) {
                    return (
                        <Button variant="ghost" className="w-full uppercase flex gap-x-5 cursor-auto">
                            <BsClipboardCheckFill className="h-4 w-4 text-green-500"/>
                        </Button>
                    )
                } else {
                    return (
                        <Button variant="ghost" className="w-full uppercase flex gap-x-5 cursor-auto">
                            <BsFillClipboardXFill className="h-4 w-4 text-red-500"/>
                        </Button>
                    )
                }
        }
    }
]
