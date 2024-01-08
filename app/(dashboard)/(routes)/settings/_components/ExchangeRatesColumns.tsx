import {ExchangeRateProps, ExchangeRateSchema} from "@models/ExchangeRate";
import {ColumnDef, Row} from "@tanstack/react-table";
import {useToast} from "@components/ui/use-toast";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {useFetch} from "@lib/hooks/useSWR";
import {useForm} from "@node_modules/react-hook-form";
import {zodResolver} from "@node_modules/@hookform/resolvers/zod";
import React, {useState} from "react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import {MoreHorizontal} from "@node_modules/lucide-react";
import {Button} from "@components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form";
import {Input} from "@components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@components/ui/popover";
import {cn} from "@lib/utils";
import {CaretSortIcon, CheckIcon} from "@node_modules/@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@components/ui/command";
import {deleteExchangeRate, updateExchangeRate} from "@lib/exchangeCurrencyCalls";

export const ExchangeRatesActionCell = ({row}: {
    row: Row<ExchangeRateProps>
}) => {
    const {id, uuid, rate, fromCurrency, toCurrency, createdAt, updatedAt} = row.original

    const {toast} = useToast()

    const axiosAuth = useAxiosAuth()

    const {GetAllExchangeRates, GetAllCurrency} = useFetch()

    const {data: exchangeRates, mutate} = GetAllExchangeRates()

    const {data: currencies} = GetAllCurrency()

    const allExchangeRates = exchangeRates ?? []

    const handleDelete = () => {
        console.log("Deleting rate: ", row.original)
        mutate(
            deleteExchangeRate(axiosAuth, row.original).then((response) => {
                if (response) {
                    return allExchangeRates.filter((rate) => rate.id !== row.original.id)
                }
            }),
            {
                optimisticData: allExchangeRates.filter((rate) => rate.id !== row.original.id),
                rollbackOnError: true,
                revalidate: false,
                populateCache: true
            }
        )
            .then(() => {
                toast({
                    variant: "default",
                    title: "Rate deleted.",
                    description: "Rate has been deleted.",
                    className: "bg-green-500 text-white"
                })
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Rate not deleted.",
                    description: "Rate has not been deleted."
                })
            })
    }

    const onSubmit = (data: ExchangeRateProps) => {
        console.log("Updating rate: ", data)
        mutate(
            updateExchangeRate(axiosAuth, data).then((response) => {
                if (response) {
                    return allExchangeRates.map((rate) => {
                        if (rate.id === response.id) {
                            return response
                        }
                        return rate
                    })
                }
            }),
            {
                optimisticData: allExchangeRates.map((rate) => {
                    if (rate.id === data.id) {
                        return data
                    }
                    return rate
                }),
                rollbackOnError: true,
                revalidate: false,
                populateCache: true
            }
        )
            .then(() => {
                toast({
                    variant: "default",
                    title: "Rate updated.",
                    description: "Rate has been updated.",
                    className: "bg-green-500 text-white"
                })
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Rate not updated.",
                    description: "Rate has not been updated."
                })
            })
    }

    const form = useForm<ExchangeRateProps>({
        resolver: zodResolver(ExchangeRateSchema),
        defaultValues: {
            id: id,
            uuid: uuid,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            rate: rate,
            createdAt: createdAt,
            updatedAt: updatedAt
        }
    })

    const {isSubmitting, isValid} = form.formState

    const [open, setOpen] = useState(false);

    const [isDropdown, setIsDropdown] = useState(false);
    const [openCurrencyTo, setOpenCurrencyTo] = useState(false);
    const [openCurrencyFrom, setOpenCurrencyFrom] = useState(false);

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
                        className={"text-xs"}
                        onClick={() => {
                            setIsDropdown(false)
                            setOpen(true)
                        }}
                    >
                        <DialogTrigger
                            onClick={() => setOpen(true)}
                            className={"text-xs"}
                        >
                            Edit Rate
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem
                        className={"text-xs text-destructive"}
                        onClick={() => {
                            setIsDropdown(false)
                            handleDelete()
                        }}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent
                className="sm:max-w-[425px]"
            >
                <DialogTitle>
                    Edit Exchange Rate
                </DialogTitle>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={"space-y-5"}
                    >
                        <FormField
                            control={form.control}
                            name={"id"}
                            render={
                                ({field, formState: {errors}}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={true}
                                                placeholder="e.g 1"
                                                {...field}
                                                type={"text"}
                                                className="text-xs"
                                            />
                                        </FormControl>
                                        <FormMessage>
                                            {errors?.root?.message}
                                        </FormMessage>
                                    </FormItem>
                                )
                            }
                        />
                        <FormField
                            control={form.control}
                            name={"uuid"}
                            render={
                                ({field, formState: {errors}}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">UUID</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={true}
                                                placeholder="e.g 1"
                                                {...field}
                                                type={"text"}
                                                className="text-xs"
                                            />
                                        </FormControl>
                                        <FormMessage>
                                            {errors?.uuid?.message}
                                        </FormMessage>
                                    </FormItem>
                                )
                            }
                        />
                        <FormField
                            control={form.control}
                            name="fromCurrency"
                            render={({field, formState: {errors}}) => (
                                <FormItem
                                    className="flex flex-col gap-2"
                                >
                                    <FormLabel className="text-xs">From Currency</FormLabel>
                                    <Popover open={openCurrencyFrom} onOpenChange={setOpenCurrencyFrom}>
                                        <PopoverTrigger asChild className="w-full">
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    disabled={true}
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between text-xs",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {currencies && field.value
                                                        ? currencies.find(
                                                            (currency) => currency.code === field.value
                                                        )?.name
                                                        : "Select currency"}
                                                    <CaretSortIcon
                                                        className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className={`w-full p-0 text-xs ${openCurrencyFrom ? "block" : "hidden"}`}
                                            side="bottom"
                                        >
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search currencies..."
                                                    className="h-9 text-xs"
                                                />
                                                <CommandEmpty>No country found.</CommandEmpty>
                                                <CommandGroup>
                                                    {currencies && currencies.map((currency) => (
                                                        <CommandItem
                                                            value={currency.code}
                                                            key={currency.code}
                                                            onSelect={() => {
                                                                form.setValue("fromCurrency", currency.code)
                                                                setOpenCurrencyFrom(false)
                                                            }}
                                                            className={"text-xs"}
                                                        >
                                                            {currency.name}
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    currency.code === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage>
                                        {errors?.fromCurrency?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="toCurrency"
                            render={({field, formState: {errors}}) => (
                                <FormItem
                                    className="flex flex-col gap-2"
                                >
                                    <FormLabel className="text-xs">To Currency</FormLabel>
                                    <Popover open={openCurrencyTo} onOpenChange={setOpenCurrencyTo}>
                                        <PopoverTrigger asChild className="w-full">
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    disabled={true}
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between text-xs",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {currencies && field.value
                                                        ? currencies.find(
                                                            (currency) => currency.code === field.value
                                                        )?.name
                                                        : "Select currency"}
                                                    <CaretSortIcon
                                                        className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className={`w-full p-0 text-xs ${openCurrencyTo ? "block" : "hidden"}`}
                                            side="bottom"
                                        >
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search currencies..."
                                                    className="h-9 text-xs"
                                                />
                                                <CommandEmpty>No country found.</CommandEmpty>
                                                <CommandGroup>
                                                    {currencies && currencies.map((currency) => (
                                                        <CommandItem
                                                            value={currency.code}
                                                            key={currency.code}
                                                            onSelect={() => {
                                                                form.setValue("toCurrency", currency.code)
                                                                setOpenCurrencyTo(false)
                                                            }}
                                                            className={"text-xs"}
                                                        >
                                                            {currency.name}
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    currency.code === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage>
                                        {errors?.toCurrency?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"rate"}
                            render={
                                ({field, formState: {errors}}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Rate</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="e.g 1"
                                                {...field}
                                                type={"number"}
                                                className="text-xs"
                                            />
                                        </FormControl>
                                        <FormMessage>
                                            {errors?.rate?.message}
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
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export const ExchangeRatesColumns: ColumnDef<ExchangeRateProps>[] = [
    {
        id: "actions",
        cell: ExchangeRatesActionCell
    },
    {
        accessorKey: "fromCurrency",
        header: () =>
            <p
                className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
            >
                From Currency
            </p>,
        cell: ({row}) => {
            return (
                <span className="text-xs whitespace-nowrap flex justify-center">
                    {row.original.fromCurrency}
                </span>
            )
        },
    },
    {
        accessorKey: "toCurrency",
        header: () =>
            <p
                className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
            >
                To Currency
            </p>,
        cell: ({row}) => {
            return (
                <span className="text-xs whitespace-nowrap flex justify-center">
                    {row.original.toCurrency}
                </span>
            )
        }
    },
    {
        accessorKey: "rate",
        header: () =>
            <p
                className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
            >
                Rate
            </p>,
        cell: ({row}) => {
            return (
                <span className="text-xs whitespace-nowrap flex justify-center">
                    {row.original.rate.toLocaleString("en-US")}
                </span>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: () => {
            return (
                <Button
                    variant="ghost"
                    // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    Created At
                    {/*<ArrowUpDown className="ml-2 h-4 w-4"/>*/}
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
        header: () => {
            return (
                <Button
                    variant="ghost"
                    // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    Updated At
                    {/*<ArrowUpDown className="ml-2 h-4 w-4"/>*/}
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
        header: () => {
            return (
                <Button
                    variant="ghost"
                    // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    ID
                    {/*<ArrowUpDown className="ml-2 h-4 w-4"/>*/}
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <p className="text-xs whitespace-nowrap flex justify-center">{row.original.id}</p>
            )
        }
    },
    {
        accessorKey: "uuid",
        header: () => {
            return (
                <Button
                    variant="ghost"
                    // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-semibold text-xs flex justify-center whitespace-nowrap w-full"
                >
                    UUID
                    {/*<ArrowUpDown className="ml-2 h-4 w-4"/>*/}
                </Button>
            )
        },
        cell: ({row}) => {
            return (
                <p className="text-xs whitespace-nowrap flex justify-center">{row.original.uuid}</p>
            )
        }
    }
]