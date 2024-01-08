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
import {signIn, SignInResponse, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {ModeToggle} from "@components/ui/toggle-mode";

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

    const {data: session} = useSession()

    if (session) {
        router.push("/")
    }

    const onSubmit = async (data: z.infer<typeof schema>) => {
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: "/"
        }).then(
            (value) => {
                const {ok, error, status} = value as SignInResponse;
                if (ok) {
                    console.log("Sign-in successful.")
                    router.push("/")
                } else if (!ok && error?.includes("401") && status === 401) {
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
        <div className="flex flex-col justify-center items-center w-screen h-screen relative">
            <div className="w-[350px] text-slate-600 dark:text-primary-foreground">
                <h1 className="font-extrabold flex justify-center px-6 text-3xl">
                    <strong className="text-primary">3</strong>
                    ribe
                </h1>
                <p className="text-[12px] text-slate-500 text-center font-light mb-6 dark:text-white">Management Portal</p>
                <Card className="shadow-lg w-[350px] h-auto dark:shadow-slate-800 overflow-y-auto text-slate-600 dark:text-primary-foreground">
                    <CardHeader>
                        <CardTitle className="text-[20px]">
                            Sign in
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
                                                <FormLabel className="text-sm">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isSubmitting}
                                                        placeholder="e.g john.doe@gmail.com"
                                                        {...field}
                                                        type={"email"}
                                                        className="text-sm"
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
                                                    <FormLabel className="text-sm">Password</FormLabel>
                                                    <Link
                                                        href={"/forgot-password"}
                                                        className="h-auto"
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
                                                            className="pr-10 text-sm"
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
                <LoginFooter className="text-xs justify-center lg:space-x-2 space-x-2 mt-5 px-6 font-semibold text-slate-400"/>
            </div>
            <div className="absolute top-0 right-0 mt-5 mr-5">
                <ModeToggle />
            </div>
        </div>
    );
};

export default SignInPage;