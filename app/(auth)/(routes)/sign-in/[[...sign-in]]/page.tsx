"use client"

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@components/ui/card";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form";
import {useToast} from "@components/ui/use-toast";
import {ToastAction} from "@components/ui/toast";
import {Input} from "@components/ui/input";
import {Eye, EyeOff} from "lucide-react";
import {Button} from "@components/ui/button";
import Link from "next/link";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@components/ui/tooltip";
import {LoginFooter} from "@app/(dashboard)/_components";
import {signIn, SignInResponse} from "next-auth/react";
import {useRouter} from "next/navigation";

const schema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(1, {message: "Password is required"})
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

    const router = useRouter()

    const [showPassword, setShowPassword] = useState<boolean>(false);
    // const [isTypingPwd, setIsTypingPwd] = useState<boolean>(false);

    const onSubmit = async (data: z.infer<typeof schema>) => {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: "/"
        }).then(
            (value) => {
                const {ok, error} = value as SignInResponse;
                if (ok) {
                    router.push("/")
                }
                if (error?.includes("401")) {
                    toast(
                        {
                            variant: "destructive",
                            title: "Invalid credentials.",
                            description: "Please try again",
                        }
                    )
                } else {
                    toast(
                        {
                            variant: "destructive",
                            title: "Something went wrong.",
                            description: "Server error occurred.",
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
            }
        )
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
                                                <div className="flex justify-between items-center h-full">
                                                    <FormLabel>Password</FormLabel>
                                                    <Link
                                                        href={"/auth/forgot-password"}
                                                    >
                                                        <Button
                                                            variant={"link"}
                                                            className={"text-primary text-xs font-light m-0 p-0 h-full"}
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
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger className="flex items-center">
                                                                            <Eye
                                                                                size={18}
                                                                                className={`dark:text-slate-500 absolute right-3 cursor-pointer`}
                                                                                onClick={(e) => {
                                                                                    e.preventDefault()
                                                                                    setShowPassword(!showPassword)
                                                                                }}
                                                                            />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            Show password
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            ) : (
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger className="flex items-center">
                                                                            <EyeOff
                                                                                size={18}
                                                                                className={`dark:text-slate-500 absolute right-3 cursor-pointer`}
                                                                                onClick={(e) => {
                                                                                    e.preventDefault()
                                                                                    setShowPassword(!showPassword)
                                                                                }}
                                                                            />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            Hide password
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
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
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    variant={"default"}
                                    className={"w-full cursor-pointer"}
                                >
                                    Continue
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <LoginFooter className="text-sm justify-start lg:space-x-2 space-x-2 mt-5 px-6 font-semibold"/>
            </div>
        </div>
    );
};

export default SignInPage;