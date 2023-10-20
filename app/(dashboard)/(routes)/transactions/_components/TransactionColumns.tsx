import {z} from "zod";
import {TransactionSchema} from "@models/Transaction";
import {ColumnDef, Row} from "@tanstack/react-table";
import {useRouter} from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import {Button} from "@components/ui/button";
import {ArrowUpDown, MoreHorizontal} from "@node_modules/lucide-react";
import React from "react";
import {toast} from "@components/ui/use-toast";

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
                <DropdownMenuLabel className={"text-xs"}>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() =>
                        navigator.clipboard.writeText(uuid)
                            .then(
                                () => {
                                    return toast(
                                        {
                                            variant: "default",
                                            title: "Copied to clipboard",
                                            description: "Copied transaction UUID to clipboard.",
                                            className: "bg-green-500",
                                        }
                                    )
                                }
                            )
                    }
                    className={"text-xs"}
                >
                    Copy Transaction UUID
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem
                    onClick={
                        () => {
                            router.push(`/transactions/${uuid}/${userId}`)
                        }
                    }
                    className={"text-xs"}
                >
                    View Transaction
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const statusColors = {
    SUCCESSFUL: "text-[#2fa406]",
    PENDING: "text-yellow-500",
    FAILED: "text-red-500",
    ONGOING: "text-amber-500",
    REFUNDED: "text-primary"
}


export const transactionColumns: ColumnDef<TransactionsProps>[] = [
    {
        id: "actions",
        cell: TransactionActionCell,
    },
    {
        accessorKey: "transactionReference",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    Transaction Reference
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {transactionReference} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {transactionReference}
                </span>
            )
        }
    },
    {
        accessorKey: "sourceCurrency",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs flex justify-center whitespace-nowrap"
                >
                    Source Currency
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {sourceCurrency} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {sourceCurrency}
                </span>
            )
        }
    },
    {
        accessorKey: "amount",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs justify-center flex "
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {amount, sourceCurrency} = row.original
            return (
                <span className="text-xs whitespace-nowrap flex justify-center">
                    {sourceCurrency}{`${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString()}
                </span>
            )
        }
    },
    {
        accessorKey: "sourceAccount",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`font-semibold text-xs whitespace-nowrap`}
                >
                    Source Account
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {sourceAccount} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {sourceAccount}
                </span>
            )
        }
    },
    {
        accessorKey: "destinationCurrency",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs whitespace-nowrap flex justify-center"
                >
                    Destination Currency
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {destinationCurrency} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {destinationCurrency}
                </span>
            )
        }
    },
    {
        accessorKey: "transactionStatus",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs whitespace-nowrap flex justify-center"
                >
                    Transaction Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {transactionStatus} = row.original
            return (
                <span className={`${statusColors[transactionStatus]} text-xs whitespace-nowrap flex justify-center`}>
                    {transactionStatus}
                </span>
            )
        }
    },
    {
        accessorKey: "userId",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs whitespace-nowrap flex justify-center w-full"
                >
                    User ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {userId} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {userId}
                </span>
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
                    className="font-semibold text-xs whitespace-nowrap flex justify-center w-full"
                >
                    Transaction UUID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {uuid} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {uuid}
                </span>
            )
        }
    },

    {
        accessorKey: "activityStatus",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs whitespace-nowrap flex justify-center w-full"
                >
                    Activity Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {activityStatus} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {activityStatus}
                </span>
            )
        }
    },
    {
        accessorKey: "dateCreated",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs whitespace-nowrap flex justify-center w-full"
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
                <p className="text-xs whitespace-nowrap flex justify-center">{formattedDate}</p>
            )
        }
    },
    {
        accessorKey: "sourceProcessor",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs whitespace-nowrap flex justify-center w-full"
                >
                    Source Processor
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {sourceProcessor} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {sourceProcessor}
                </span>
            )
        }
    },
    {
        accessorKey: "sourceStatus",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`font-semibold text-xs whitespace-nowrap flex justify-center`}
                >
                    Source Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {sourceStatus} = row.original
            return (
                <span className={`${statusColors[sourceStatus]} text-xs whitespace-nowrap flex justify-center`}>
                    {sourceStatus}
                </span>
            )
        }
    },
    {
        accessorKey: "destinationAccount",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`font-semibold text-xs whitespace-nowrap flex justify-center`}
                >
                    Destination Account
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {destinationAccount} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {destinationAccount}
                </span>
            )
        }
    },
    {
        accessorKey: "destinationProcessor",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
                    className={`font-semibold text-xs whitespace-nowrap flex justify-center`}
                >
                    Destination Processor
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {destinationProcessor} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {destinationProcessor}
                </span>
            )
        }
    },
    {
        accessorKey: "destinationStatus",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`font-semibold text-xs whitespace-nowrap flex justify-center`}
                >
                    Destination Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {destinationStatus} = row.original
            return (
                <span className={`${statusColors[destinationStatus]} text-xs whitespace-nowrap flex justify-center`}>
                    {destinationStatus}
                </span>
            )
        }
    },
    {
        accessorKey: "institutionId",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
                    className={`font-semibold text-xs whitespace-nowrap flex justify-center`}
                >
                    Institution ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {institutionId} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap justify-center flex">
                    {institutionId}
                </span>
            )
        }
    },
    {
        accessorKey: "recipientName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`font-semibold text-xs whitespace-nowrap flex justify-center w-full`}
                >
                    Recipient Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {recipientName} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap justify-center flex">
                    {recipientName}
                </span>
            )
        }
    },
    {
        accessorKey: "paymentType",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`font-semibold text-xs whitespace-nowrap flex justify-center`}
                >
                    Payment Type
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {paymentType} = row.original
            return (
                <Button
                    variant="secondary"
                    className={`text-xs justify-center`}
                >
                    {paymentType}
                </Button>
            )
        }
    },
    {
        accessorKey: "id",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs"
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {id} = row.original
            return (
                <span className="text-[12px] flex justify-center">
                    {id}
                </span>
            )
        }
    },
    {
        accessorKey: "narration",
        header: "Narration",
        cell: ({row}) => {
            const {narration} = row.original
            return (
                <span className="text-[12px] whitespace-nowrap flex justify-center">
                    {narration}
                </span>
            )
        }
    }
]