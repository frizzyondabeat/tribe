import {z} from "zod";

export const AuditLogSchema = z.object({
    id: z.any(),
    userId: z.any(),
    userEmail: z.any(),
    action: z.any(),
    dateCreated: z.any(),
})

export type AuditLogProps = z.infer<typeof AuditLogSchema>
