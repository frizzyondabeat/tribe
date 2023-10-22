import {z} from "zod";
import {UserDtoSchema, UserSchema} from "@models/User";
import {AxiosInstance} from "axios";
import {UsersProps} from "@app/(dashboard)/(routes)/users/_components/UserColumns";

const UserResults = z.array(UserSchema);

export type UserArray = z.infer<typeof UserResults>;

export type UserDto = z.infer<typeof UserDtoSchema>;

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

export async function deleteUserById(axiosAuth: AxiosInstance, userId: string) {
    try {
        const res = await axiosAuth.delete(`/api/v1/admin/users/delete`,
            {
                headers: {
                    "Content-Type": "application/json",
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

export async function activateOrDeactivateAppUser(axiosAuth: AxiosInstance, userUUID: string, status: "ACTIVATED" | "DEACTIVATED") {
    try {
        const res = await axiosAuth.post(`/api/v1/admin/users/app-user/activate-deactivate`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status,
                userUUID,
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

export async function fetchTotalCountOfUsers(axiosAuth: AxiosInstance, userType: string) {
    try {
        const res = await axiosAuth.get(`/api/v1/dashboard/total-users/${userType}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const userCount: number = res.data?.data;
        return userCount
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function createUser(axiosAuth: AxiosInstance, userDto: UserDto) {

    const dto = {
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        email: userDto.email,
        phoneNumber: userDto.phoneNumber,
        address: userDto.address,
        postalCode: userDto.postalCode,
        country: userDto.country,
    }

    try {
        const res = await axiosAuth.post(
            `/api/v1/admin/users/create`,
            dto,
            {
                headers: {
                    "Content-Type": "application/json",
                },
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

