import {z} from "zod";

export const AuditLogSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    userEmail: z.string(),
    action: z.string(),
    dateCreated: z.string().nullable(),
})

export type AuditLogProps = z.infer<typeof AuditLogSchema>
