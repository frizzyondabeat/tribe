import {z} from 'zod';

export const TransactionSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    paymentType: z.enum(["SEND_MONEY", "CONVERT_MONEY", "PAY_BILLS"]),
    amount: z.number(),
    sourceCurrency: z.string(),
    sourceAccount: z.string(),
    sourceStatus: z.enum(["PENDING", "SUCCESSFUL", "FAILED", "ONGOING", "REFUNDED"]),
    sourceProcessor: z.string(),
    destinationCurrency: z.string(),
    destinationAccount: z.string(),
    destinationStatus: z.enum(["PENDING", "SUCCESSFUL", "FAILED", "ONGOING", "REFUNDED"]),
    destinationProcessor: z.string(),
    recipientName: z.string(),
    userId: z.string(),
    institutionId: z.string(),
    transactionReference: z.string(),
    narration: z.string(),
    activityStatus: z.string(),
    dateCreated: z.string(),
})