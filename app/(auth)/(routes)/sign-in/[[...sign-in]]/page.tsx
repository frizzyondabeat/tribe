"use client"

import React, {useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@components/ui/card";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form";
import {useToast} from "@components/ui/use-toast";
import {ToastAction} from "@components/ui/toast";
import {Input} from "@components/ui/input";
import {Eye, EyeOff} from "@node_modules/lucide-react";
import {Button} from "@components/ui/button";
import axios from "@app/api/axios";
import Link from "next/link";

const schema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"})
});

const SignInPage = () => {

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const {isSubmitting, isValid} = form.formState;

    const {toast} = useToast()

    const [showPassword, setShowPassword] = useState<boolean>(false);
    // const [isTypingPwd, setIsTypingPwd] = useState<boolean>(false);

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await axios.post('/api/auth/sign-in', data)
        } catch (error) {
            if (error?.response?.status === 404) {
                return toast({
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
                })
            } else {
                return toast({
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
                })
            }
        }
    }


    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <div className="w-[350px]">
                <h1 className="font-extrabold flex justify-start mb-5 px-6 text-2xl">tribe</h1>
                <Card className="shadow-lg w-[350px] h-auto dark:shadow-slate-800 overflow-y-auto">
                    <CardHeader>
                        <CardTitle>
                            Sign in to your account
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <FormField
                                    control={form.control}
                                    name={"email"}
                                    render={
                                        ({field, formState: {errors}}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isSubmitting}
                                                        placeholder="e.g john.doe@gmail.com"
                                                        {...field}
                                                        type={"email"}
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
                                    name={"password"}
                                    render={
                                        ({field, formState: {errors}}) => (
                                            <FormItem>
                                                <div className="flex justify-between items-center">
                                                    <FormLabel>Password</FormLabel>
                                                    <Link
                                                        href={"/auth/forgot-password"}
                                                    >
                                                        <Button
                                                            variant={"link"}
                                                            className={"text-primary text-xs font-light m-0 p-0 h-auto"}
                                                        >
                                                            Forgot your password?
                                                        </Button>
                                                    </Link>
                                                </div>
                                                <FormControl>
                                                    <div className="relative w-full h-full items-center flex">
                                                        <Input
                                                            disabled={isSubmitting}
                                                            {...field}
                                                            type={showPassword ? "text" : "password"}
                                                            className="pr-10"
                                                            // onKeyDown={
                                                            //     () => {
                                                            //         console.log(field.value.length)
                                                            //         if (field.value.length >= 0) {
                                                            //             setIsTypingPwd(true)
                                                            //         } else {
                                                            //             setIsTypingPwd(false)
                                                            //         }
                                                            //     }
                                                            // }
                                                        />
                                                        {
                                                            !showPassword ? (
                                                                <Eye
                                                                    size={18}
                                                                    className={`dark:text-slate-500 absolute right-3 cursor-pointer`}
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                />
                                                            ) : (
                                                                <EyeOff
                                                                    size={18}
                                                                    className={`dark:text-slate-500 absolute right-3 cursor-pointer`}
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                />
                                                            )
                                                        }
                                                    </div>
                                                </FormControl>
                                                <FormMessage>
                                                    {errors?.password?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )
                                    }
                                />
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            variant={"default"}
                            className={"w-full cursor-pointer"}
                        >
                            Continue
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default SignInPage;