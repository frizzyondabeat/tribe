"use client"

import React, {useState} from 'react';
import {ColumnDef, Row} from "@tanstack/react-table";
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
import {useToast} from "@components/ui/use-toast";
import {z} from "zod";
import {CurrencySchema} from "@models/Currency";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@components/ui/dialog";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {deleteCurrency} from "@lib/currencyCalls";
import {useRouter} from "next/navigation";
import {useCurrencyContext} from "@context/CurrencyContext";

export type CurrencyProps = z.infer<typeof CurrencySchema>

export const CurrencyActionCell = ({row}: {
    row: Row<CurrencyProps>
}) => {
    const {uuid} = row.original

    const {toast} = useToast();

    const axiosAuth = useAxiosAuth();

    const [open, setOpen] = useState(false);

    const router = useRouter()

    const {setCurrencies} = useCurrencyContext()

    const handleDelete = () => {
        console.log("Delete currency with UUID: ", uuid)
        deleteCurrency(axiosAuth, uuid)
            .then(
                (response) => {
                    console.log("Deleted currency: ", response)
                    setOpen(false)
                    setCurrencies(prevState => {
                        if (prevState) {
                            return prevState.filter(currency => currency.uuid !== uuid)
                        }
                    })
                    return toast(
                        {
                            variant: "default",
                            title: "Currency deleted.",
                            description: "Currency deleted successfully.",
                            className: "bg-green-500 text-white",
                        }
                    )
                }
            )
            .catch(
                (error) => {
                    console.log("Error deleting currency: ", error)
                    return toast(
                        {
                            variant: "default",
                            title: "Something went wrong.",
                            description: "Please try again.",
                            className: "bg-red-500 text-white",
                        }
                    )
                }
            )
            .finally(
                () => {
                    router.refresh()
                }
            )
    }

    const [isDropdown, setIsDropdown] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu open={isDropdown} onOpenChange={setIsDropdown}>
                <DropdownMenuTrigger>
                    <Button
                        variant={"ghost"}
                        className="h-8 w-8 p-0"
                        onClick={() => setIsDropdown(false)}
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={"end"}>
                    <DropdownMenuLabel className={"text-xs"}>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            setIsDropdown(false)
                            navigator.clipboard.writeText(uuid)
                                .then(
                                    () => {
                                        return toast(
                                            {
                                                variant: "default",
                                                title: "Copied to clipboard",
                                                description: "Copied Currency UUID to clipboard.",
                                                className: "bg-green-500 text-white",
                                            }
                                        )
                                    }
                                )
                        }
                        }
                        className={"text-xs"}
                    >
                        Copy Currency UUID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem
                        className={"text-xs"}
                        onClick={() => {
                            setIsDropdown(false)
                            setOpen(true)
                        }}
                    >
                        <DialogTrigger
                            onClick={() => setOpen(true)}
                            className={"text-xs text-destructive"}
                        >
                            Delete Currency
                        </DialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                        Do you really want to delete this currency? This process cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="max-sm:gap-3">
                    <Button
                        variant={"outline"}
                        className={"text-xs"}
                        onClick={() => {
                            setOpen(false)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={"destructive"}
                        className={"text-xs"}
                        onClick={handleDelete}
                    >
                        Delete Currency
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const CurrencyColumns: ColumnDef<CurrencyProps>[] = [
    {
        id: "actions",
        cell: CurrencyActionCell
    },
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <span className="text-xs whitespace-nowrap flex justify-center">
                    {row.original.name}
                </span>
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
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    Country
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <span className="text-xs whitespace-nowrap flex justify-center">
                    {row.original.country}
                </span>
            )
        }
    },
    {
        accessorKey: "code",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    Country Code
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <span className="text-xs whitespace-nowrap flex justify-center">
                    {row.original.code}
                </span>
            )
        }
    },
    {
        accessorKey: "symbol",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    Symbol
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <span className="text-xs whitespace-nowrap flex justify-center">
                    {row.original.symbol}
                </span>
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
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    UUID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <span className="text-xs whitespace-nowrap flex justify-center">
                    {row.original.uuid}
                </span>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
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
                <p className="text-xs whitespace-nowrap flex justify-center">{formattedDate}</p>
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
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
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
                <p className="text-xs whitespace-nowrap flex justify-center">{formattedDate}</p>
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
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <p className="text-xs whitespace-nowrap flex justify-center">{row.original.id}</p>
            )
        }
    }
]