"use client"
import React from 'react';
import {UsersList} from "@app/(dashboard)/_components";
import {fetchAllUsers, UserArray, VIEW_ALL_USERS_URL} from "@lib/userCalls";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";
import {toast} from "@components/ui/use-toast";
import {useRouter} from "next/navigation";
import {ToastAction} from "@components/ui/toast";
import useSWR from "@node_modules/swr";
import {useFetch} from "@lib/hooks/useSWR";


const UsersPage = () => {

    const axiosAuth = useAxiosAuth();

    const router = useRouter()

    const {getAllUsers} = useFetch()

    const {data: users} = getAllUsers()

    // const [users, setUsers] = useState<UserArray | undefined>();

    // useEffect(() => {
    //     fetchAllUsers(axiosAuth)
    //         .then((response) => {
    //             console.log("Fetched users: ",response)
    //             setUsers(response);
    //         }).catch((error) => {
    //         if (error?.response?.status === 404) {
    //             return toast(
    //                 {
    //                     variant: "destructive",
    //                     title: "Network error.",
    //                     description: "Please check your internet connection and try again.",
    //                     action:
    //                         <ToastAction
    //                             altText={"Try again"}
    //                             onClick={() => router.refresh()}
    //                             className={"cursor-pointer hover:underline outline-none border-none"}
    //                         >
    //                             Try again
    //                         </ToastAction>
    //                 }
    //             )
    //         } else if (error?.response?.status === 401) {
    //             router.push("/sign-in")
    //             return toast(
    //                 {
    //                     variant: "destructive",
    //                     title: "Something went wrong.",
    //                     description: "Token expired. Please login again.",
    //                 }
    //             )
    //         } else {
    //             return toast(
    //                 {
    //                     variant: "destructive",
    //                     title: "Something went wrong.",
    //                     description: "Please try again.",
    //                     action:
    //                         <ToastAction
    //                             altText={"Try again"}
    //                             onClick={() => router.refresh()}
    //                             className={"cursor-pointer hover:underline outline-none border-none"}
    //                         >
    //                             Try again
    //                         </ToastAction>
    //                 }
    //             )
    //         }
    //     });
    // }, [axiosAuth, router]);

    return (
        <div className="flex flex-col min-h-screen">
            <UsersList users={users}/>
        </div>
    );
};

export default UsersPage;

