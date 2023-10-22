import {z} from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    uuid: z.string().uuid("Invalid UUID"),
    firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
    lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
    email: z.string().trim().toLowerCase().min(5, "Email must be at least 5 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
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

export const UserDtoSchema = UserSchema.omit({
    enabled: true,
    status: true,
    kycCompleted: true,
    createdAt: true,
    updatedAt: true,
    id: true,
    uuid: true,
    userType: true,
}).extend(
    {
        postalCode: z.string().min(1, "Postal code required"),
    }
)