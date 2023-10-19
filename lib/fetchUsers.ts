import { z } from "zod";
import { UserSchema } from "@models/User";
import {AxiosInstance} from "axios";
import {UsersProps} from "@app/(dashboard)/_components/UserColumns";

const UserResults = z.array(UserSchema);

export type UserArray = z.infer<typeof UserResults>;

export async function fetchAllUsers(axiosAuth: AxiosInstance) {
    try {
        const res = await axiosAuth.get("/api/v1/admin/users/view-all");
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const usersJson: UserArray = res.data?.data;
        return UserResults.parse(usersJson);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function fetchUser(axiosAuth: AxiosInstance, id: string) {
    try {
        const res = await axiosAuth.get(`/api/v1/admin/users/view`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "userUUID": id
                }
            });
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const usersJson: UsersProps = res.data?.data;
        return UserSchema.parse(usersJson);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function fetchAppUsers(axiosAuth: AxiosInstance) {
    try {
        return fetchAllUsers(axiosAuth).then((users) => {
            if (users) {
                return users.filter(user =>
                     user.userType === "APP_USER"
                );
            }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function fetchAdminUsers(axiosAuth: AxiosInstance) {
    try {
        return fetchAllUsers(axiosAuth).then((users) => {
            if (users) {
                return users.filter(user =>
                    user.userType === "INSTITUTION_ADMIN" || user.userType === "SUPER_ADMIN"
                );
            }
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}
