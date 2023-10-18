"use client"

import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {axiosAuth} from "@lib/axios";
import {useRouter} from "next/navigation";

const useAxiosAuth = () => {
    const {data: session} = useSession()

    const router = useRouter()

    useEffect(() => {

        const requestInterceptor = axiosAuth.interceptors.request.use(
            async (config) => {
                if (!session?.accessToken) {
                    router.push("/sign-in")
                }
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${session?.accessToken}`
                }
                return config
            },
            error => Promise.reject(error)
        )

        const responseInterceptor = axiosAuth.interceptors.response.use(
            async (response) => response,
            async (error) => {
                const originalRequest = error.config

                if (error?.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true

                //     redirect to login page
                    router.push("/sign-in")
                }

                return Promise.reject(error)
            }
        )

        return () => {
            axiosAuth.interceptors.request.eject(requestInterceptor)
            axiosAuth.interceptors.response.eject(responseInterceptor)
        }

    }, [session, router])

    return axiosAuth
}

export default useAxiosAuth