"use client"

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@components/ui/card";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@components/ui/form";
import {useToast} from "@components/ui/use-toast";
import {ToastAction} from "@components/ui/toast";
import {Input} from "@components/ui/input";
import {Eye, EyeOff} from "@node_modules/lucide-react";

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

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {

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
                        />
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
                        />
                })
            }
        }
    }


    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <div className="w-[350px]">
                <h1 className="font-bold flex justify-start mb-5">tribe</h1>
                <Card className="shadow-lg w-[350px] h-full dark:shadow-slate-800">
                    <CardHeader>
                        <CardTitle>
                            Sign in to your account
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
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
                                                        type={"email"}
                                                    />
                                                </FormControl>
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
                                                <FormLabel>Password</FormLabel>
                                                <FormControl className="f">

                                                    <div className="md:flex relative w-full h-full items-center hidden">
                                                        <Input
                                                            disabled={isSubmitting}
                                                            type={showPassword ? "text" : "password"}
                                                            className="pr-10"
                                                        />
                                                        {
                                                            !showPassword ? (
                                                                <Eye
                                                                    size={18}
                                                                    className="text-slate-500 absolute right-3 cursor-pointer"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                />
                                                            ) : (
                                                                <EyeOff
                                                                    size={18}
                                                                    className="text-slate-500 absolute right-3 cursor-pointer"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                />
                                                            )
                                                        }
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }
                                />
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignInPage;