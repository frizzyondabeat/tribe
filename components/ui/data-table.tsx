"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@components/ui/button";
import React, {useEffect, useState} from "react";
import {Input} from "@components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import {ChevronDownIcon} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form";
import {PlusIcon, Search} from "@node_modules/lucide-react";
import {useForm} from "@node_modules/react-hook-form";
import {addCurrency, CurrencyDtoProps} from "@lib/currencyCalls";
import {zodResolver} from "@node_modules/@hookform/resolvers/zod";
import {CurrencyDtoSchema} from "@models/Currency";
import {useToast} from "@components/ui/use-toast";
import {useRouter} from "@node_modules/next/navigation";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {ToastAction} from "@components/ui/toast";
import {useFetch} from "@lib/hooks/useSWR";
import {DataTablePagination} from "@components/ui/data-table-pagination";
import {json2csv} from "json-2-csv";
import {exportToCSV} from "@lib/utils/exportToCSV";
import {Popover, PopoverContent, PopoverTrigger} from "@components/ui/popover";
import {FaFileDownload} from "@node_modules/react-icons/fa";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] | undefined,
    visibleFields?: string[],
    action?: "ADD_CURRENCY" | "EXCHANGE",
    enableExport?: boolean
    filename?: string
}

const usersVisibleFields = ["email", "firstName", "lastName", "userType", "actions"]

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             visibleFields = usersVisibleFields,
                                             action,
                                             enableExport = true,
                                             filename = "data.csv"
                                         }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    data = data ?? []

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const [filterBy, setFilterBy] = useState<string>(table.getAllColumns()[1].id);

    const form = useForm<CurrencyDtoProps>({
        resolver: zodResolver(CurrencyDtoSchema),
        defaultValues: {
            country: "",
            currencyCode: "",
            symbol: ""
        }
    })

    const {isSubmitting, isValid} = form.formState;

    const {toast} = useToast();

    const router = useRouter();

    const axiosAuth = useAxiosAuth();

    const {GetAllCurrency} = useFetch()

    const {mutate} = GetAllCurrency()

    const [open, setOpen] = useState(false);


    const onSubmit = (data: CurrencyDtoProps) => {
        console.log("Creating currency: ", data)
        addCurrency(axiosAuth, data)
            .then((response) => {
                console.log("Currency created: ", response)
                mutate()
                toast(
                    {
                        variant: "default",
                        title: "Currency created.",
                        description: "Currency was successfully created.",
                        className: "bg-green-500 text-white"
                    }
                )
            })
            .catch((error) => {
                console.log("Error creating currency: ", error)
                if (error?.response?.status === 404) {
                    return toast(
                        {
                            variant: "destructive",
                            title: "Network error.",
                            description: "Please check your internet connection and try again.",
                            action:
                                <ToastAction
                                    altText={"Try again"}
                                    onClick={() => onSubmit(data)}
                                    className={"cursor-pointer hover:underline outline-none border-none"}
                                >
                                    Try again
                                </ToastAction>
                        }
                    )
                } else if (error?.response?.status === 401) {
                    router.push("/sign-in")
                    return toast(
                        {
                            variant: "destructive",
                            title: "Something went wrong.",
                            description: "Token expired. Please login again.",
                        }
                    )
                } else {
                    return toast(
                        {
                            variant: "destructive",
                            title: "Something went wrong.",
                            description: "Please try again.",
                            action:
                                <ToastAction
                                    altText={"Try again"}
                                    onClick={() => onSubmit(data)}
                                    className={"cursor-pointer hover:underline outline-none border-none"}
                                >
                                    Try again
                                </ToastAction>
                        }
                    )
                }
            })
            .finally(
                () => {
                    router.refresh()
                }
            )
    }

    const [csvData, setCsvData] = useState<any>();

    useEffect(() => {
        table.getAllColumns().filter(
            (column) => {
                return !visibleFields.includes(column.id)
            }
        ).forEach((column) => {
            column.toggleVisibility(false)
        })
        if (data) {
            json2csv(data as any).then(
                (csv) => {
                    setCsvData(csv)
                }
            )
        }
    }, [data, columns, visibleFields, table]);

    return (
        <div>
            <div className="flex items-center py-4 justify-between gap-x-2 w-full">
                <Input
                    placeholder={`Filter by ${filterBy ?? "email"}`}
                    value={(table.getColumn(filterBy ?? "email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(filterBy ?? "email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm text-[13px] hidden md:block"
                />
                <Popover>
                    <PopoverTrigger className="md:hidden justify-start" asChild>
                        <Button variant="outline" className=" text-xs">
                            <Search className="h-4 w-4 text-slate-500"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side={"bottom"}
                        sideOffset={10}
                        className="flex max-w-sm p-0 ml-8">
                        <Input
                            placeholder={`Filter by ${filterBy ?? "email"}`}
                            value={(table.getColumn(filterBy ?? "email")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn(filterBy ?? "email")?.setFilterValue(event.target.value)
                            }
                            className="w-full text-xs"
                        />
                    </PopoverContent>
                </Popover>
                <div className="flex space-x-2 items-center">
                    {
                        enableExport &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="default" className="ml-auto text-xs">
                                    <p className="hidden md:flex">Export</p>
                                    <FaFileDownload className="h-4 w-4 flex md:hidden"/>
                                    <ChevronDownIcon className="ml-2 h-4 w-4 hidden md:flex"/>
                                </Button>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                                <DropdownMenuLabel className="text-xs">File Formats</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => exportToCSV(csvData, filename)}
                                    className="text-xs capitalize"
                                >
                                    CSV
                                </DropdownMenuItem>
                                {/*<DropdownMenuSeparator/>*/}
                                {/*<DropdownMenuItem*/}
                                {/*    className="text-xs capitalize"*/}
                                {/*    onClick={() => exportToExcel(table, "users")}*/}
                                {/*>*/}
                                {/*    Excel*/}
                                {/*</DropdownMenuItem>*/}
                                {/*<DropdownMenuSeparator/>*/}
                                {/*<DropdownMenuItem className="text-xs capitalize">*/}
                                {/*    PDF*/}
                                {/*</DropdownMenuItem>*/}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                    {
                        action === "ADD_CURRENCY" &&
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger onClick={() => setOpen(true)}>
                                <Button variant="default" className="ml-auto text-xs">
                                    Add
                                    <PlusIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogTitle>Add Currency</DialogTitle>
                                <DialogDescription>
                                    Add a new currency to the database.
                                </DialogDescription>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className={"space-y-5"}
                                    >
                                        <FormField
                                            control={form.control}
                                            name={"country"}
                                            render={
                                                ({field, formState: {errors}}) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs">Country</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={isSubmitting}
                                                                placeholder="e.g Nigeria"
                                                                {...field}
                                                                type={"text"}
                                                                className="text-xs"
                                                            />
                                                        </FormControl>
                                                        <FormMessage>
                                                            {errors?.country?.message}
                                                        </FormMessage>
                                                    </FormItem>
                                                )
                                            }
                                        />
                                        <FormField
                                            control={form.control}
                                            name={"currencyCode"}
                                            render={
                                                ({field, formState: {errors}}) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs">Currency Code</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={isSubmitting}
                                                                placeholder="e.g NGN"
                                                                {...field}
                                                                type={"text"}
                                                                className="text-xs"
                                                            />
                                                        </FormControl>
                                                        <FormMessage>
                                                            {errors?.currencyCode?.message}
                                                        </FormMessage>
                                                    </FormItem>
                                                )
                                            }
                                        />
                                        <FormField
                                            control={form.control}
                                            name={"symbol"}
                                            render={
                                                ({field, formState: {errors}}) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs">Symbol</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                disabled={isSubmitting}
                                                                placeholder="e.g ₦"
                                                                {...field}
                                                                type={"text"}
                                                                className="text-xs"
                                                            />
                                                        </FormControl>
                                                        <FormMessage>
                                                            {errors?.symbol?.message}
                                                        </FormMessage>
                                                    </FormItem>
                                                )
                                            }
                                        />
                                        <Button
                                            type="submit"
                                            variant={"outline"}
                                            disabled={!isValid || isSubmitting}
                                            className={"text-xs"}
                                            onClick={
                                                () => {
                                                    setOpen(false)
                                                }
                                            }
                                        >
                                            Add Currency
                                        </Button>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    }
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto text-xs">
                                Filter <ChevronDownIcon className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanFilter())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            checked={filterBy === column.id}
                                            onCheckedChange={() => {
                                                setFilterBy(column.id);
                                                column.setFilterValue("")
                                            }}
                                            className="text-xs capitalize"
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto text-xs">
                                Columns <ChevronDownIcon className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(value)
                                            }
                                            className="text-xs capitalize"
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No Records Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/*<div className="flex items-center justify-end space-x-2 py-4">*/}
            {/*    <Button*/}
            {/*        variant="outline"*/}
            {/*        size="sm"*/}
            {/*        onClick={() => table.previousPage()}*/}
            {/*        disabled={!table.getCanPreviousPage()}*/}
            {/*    >*/}
            {/*        Previous*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        variant="outline"*/}
            {/*        size="sm"*/}
            {/*        onClick={() => table.nextPage()}*/}
            {/*        disabled={!table.getCanNextPage()}*/}
            {/*    >*/}
            {/*        Next*/}
            {/*    </Button>*/}
            {/*</div>*/}
            <DataTablePagination table={table}/>
        </div>
    )
}
