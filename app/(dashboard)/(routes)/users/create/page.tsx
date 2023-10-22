"use client"

import React, {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@components/ui/card";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useToast} from "@components/ui/use-toast";
import {useRouter} from "next/navigation";
import {UserDtoSchema} from "@models/User";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form";
import {Input} from "@components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,} from "@/components/ui/command"
import {cn} from "@lib/utils";
import {Button} from "@components/ui/button";
import {CaretSortIcon, CheckIcon} from "@node_modules/@radix-ui/react-icons";
import {ArrowLeft, PlusIcon} from "@node_modules/lucide-react";
import {createUser} from "@lib/userCalls";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {ToastAction} from "@components/ui/toast";

const countries = [
    {label: "Nigeria", value: "Nigeria"},
    {label: "Canada", value: "Canada"},
] as const;

const CreateUserPage = () => {

    const form = useForm<z.infer<typeof UserDtoSchema>>(
        {
            resolver: zodResolver(UserDtoSchema),
            defaultValues: {
                firstName: "",
                lastName: "",
                email: "",
                country: "",
                address: "",
                postalCode: "",
                phoneNumber: ""
            }
        }
    )

    const {isSubmitting, isValid} = form.formState;

    const {toast} = useToast();

    const router = useRouter();

    const axiosAuth = useAxiosAuth();

    const [open, setOpen] = useState(false);

    const onSubmit = (data: z.infer<typeof UserDtoSchema>) => {
        console.log("Creating user: ", data)
        createUser(axiosAuth, data).then((response) => {
            console.log("User created: ", response)
            toast(
                {
                    variant: "default",
                    title: "User created.",
                    description: "User was successfully created.",
                    className: "bg-green-500 text-white"
                }
            )
            router.push("/users")
        }).catch((error) => {
            console.log("Error creating user: ", error)
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
    }

    const preventNonNumericalInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = e.key;
        // Allow backspace and plus and minus keys
        if (charCode !== "Backspace" && isNaN(Number(charCode))) {
            e.preventDefault();
        }
    }

    return (
        <div className="flex flex-col w-full py-2 px-5 min-h-screen gap-4">
            <Button
                variant="ghost"
                onClick={() => {
                    router.back();
                }}
                className="flex items-center w-fit"
            >
                <ArrowLeft className="h-4 w-4"/>
                <p>Go back</p>
            </Button>
            <Card
                className="w-full text-slate-600 h-fit dark:text-primary-foreground">
                <CardHeader>
                    <CardTitle className={`text-lg text-slate-800 dark:text-primary-foreground`}>
                        Create User
                    </CardTitle>
                    <CardDescription className={`text-sm text-slate-600 dark:text-primary-foreground`}>
                        Create a new user
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full"
                        >
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={
                                    ({field, formState: {errors}}) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">First name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="First name"
                                                    {...field}
                                                    type={"text"}
                                                    className="text-xs"
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.firstName?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )
                                }
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={
                                    ({field, formState: {errors}}) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Last name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Last name"
                                                    {...field}
                                                    type={"text"}
                                                    className="text-xs"
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.lastName?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )
                                }
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={
                                    ({field, formState: {errors}}) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Email"
                                                    {...field}
                                                    type={"email"}
                                                    className="text-xs"
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.email?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )
                                }
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={
                                    ({field, formState: {errors}}) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel className="text-xs">Country</FormLabel>
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild className="w-full">
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-full justify-between text-xs",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? countries.find(
                                                                    (country) => country.value === field.value
                                                                )?.label
                                                                : "Select country"}
                                                            <CaretSortIcon
                                                                className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className={`w-full p-0 text-xs ${open ? "block" : "hidden"}`}
                                                    side="bottom"
                                                >
                                                    <Command>
                                                        <CommandInput
                                                            placeholder="Search countries..."
                                                            className="h-9 text-xs"
                                                        />
                                                        <CommandEmpty>No country found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {countries.map((country) => (
                                                                <CommandItem
                                                                    value={country.label}
                                                                    key={country.value}
                                                                    onSelect={() => {
                                                                        form.setValue("country", country.value)
                                                                        setOpen(false)
                                                                    }}
                                                                    className={"text-xs"}
                                                                >
                                                                    {country.label}
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            "ml-auto h-4 w-4",
                                                                            country.value === field.value
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
                                                {errors?.country?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )
                                }
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={
                                    ({field, formState: {errors}}) => (
                                        <FormItem className="col-span-full">
                                            <FormLabel className="text-xs">Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Address"
                                                    {...field}
                                                    type={"text"}
                                                    className="text-xs"
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.address?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )
                                }
                            />
                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={
                                    ({field, formState: {errors}}) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Postal code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Postal code"
                                                    {...field}
                                                    type={"text"}
                                                    className="text-xs"
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.postalCode?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )
                                }
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={
                                    ({field, formState: {errors}}) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Phone number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Phone number"
                                                    {...field}
                                                    type={"tel"}
                                                    className="text-xs"
                                                    onKeyDown={(e) => {
                                                        preventNonNumericalInput(e)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage>
                                                {errors?.phoneNumber?.message}
                                            </FormMessage>
                                        </FormItem>
                                    )
                                }
                            />
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                variant={"default"}
                                className={"md:w-1/2 w-full cursor-pointer flex justify-center text-xs mt-4"}
                            >
                                Create
                                <PlusIcon className="ml-2 h-4 w-4"/>
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateUserPage;