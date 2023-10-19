import {z} from "zod";
import {TransactionSchema} from "@models/Transaction";
import {ColumnDef, Row} from "@tanstack/react-table";
import {useRouter} from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import {Button} from "@components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "@node_modules/lucide-react";
import React from "react";

export type TransactionsProps = z.infer<typeof TransactionSchema>

export const TransactionActionCell = ({row}: {
    row: Row<TransactionsProps>
}) => {
    const {uuid, userId} = row.original

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
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(uuid)}
                >
                    Copy Transaction UUID
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    onClick={
                        () => {
                            router.push(`/transactions/${uuid}`)
                        }
                    }
                >
                    View Transaction
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const transactionColumns: ColumnDef<TransactionsProps>[] = [
    {
        id: "actions",
        cell: TransactionActionCell,
    },
    {
        accessorKey: "id",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "uuid",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Transaction UUID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "userId",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "amount",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {amount} = row.original
            return (
                <span>
                    ₦{`${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString()}
                </span>
            )
        }
    },
    {
        accessorKey: "activityStatus",
        header: "Activity Status",
    },
    {
        accessorKey: "dateCreated",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date Created
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const date = new Date(row.original.dateCreated)
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
        accessorKey: "sourceAccount",
        header: "Source Account",
    },
    {
        accessorKey: "sourceCurrency",
        header: "Source Currency",
    }
]