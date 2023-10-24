import useSWR from "swr";
import {fetchAllUsers, VIEW_ALL_USERS_URL} from "@lib/userCalls";
import useAxiosAuth from "@lib/hooks/useAxiosAuth";

export const useFetch = () => {

    const axiosAuth = useAxiosAuth();

    return {
        getAllUsers:
            () => useSWR(VIEW_ALL_USERS_URL,  () => fetchAllUsers(axiosAuth)),
        getAllTransactions:
            () => useSWR(VIEW_ALL_USERS_URL,  () => fetchAllUsers(axiosAuth)),
    }
}