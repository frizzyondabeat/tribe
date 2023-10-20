import {z} from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    uuid: z.string().uuid("Invalid UUID"),
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    email: z.string().trim().toLowerCase(),
    country: z.string(),
    address: z.string(),
    phoneNumber: z
        .string(),
        // .min(11, "Phone number must be at least 11 digits")
        // .transform(
        //     (val) => `+234 ${val.slice(1, 4)} ${val.slice(4, 7)} ${val.slice(7)}`,
        // ),
    userType: z.enum(["APP_USER", "INSTITUTION_ADMIN", "SUPER_ADMIN"]),
    createdAt: z.string(),
    updatedAt: z.string(),
    enabled: z.boolean(),
    status: z.enum(["ACTIVATED", "DEACTIVATED"]),
    kycCompleted: z.boolean(),
})