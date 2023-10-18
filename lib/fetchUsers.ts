import { z } from "zod";
import { UserSchema } from "@models/User";
import {AxiosInstance} from "axios";
import {UsersProps} from "@app/(dashboard)/_components/UserColumns";

const UserResults = z.array(UserSchema);

export type UserArray = z.infer<typeof UserResults>;

export async function fetchUsers(axiosAuth: AxiosInstance) {
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
