import {z} from 'zod';

export const ExchangeRateSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    fromCurrency: z.string(),
    toCurrency: z.string(),
    rate: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type ExchangeRateProps = z.infer<typeof ExchangeRateSchema>

export const ConfigureRate = z.object({
    fromUUid: z.string().min(1, "From currency is required"),
    toUUid: z.string().min(1, "To currency is required"),
    rate: z.coerce.number().min(0.0001, "Rate must be greater than 0"),
})

export const ExchangeForCurrencyPair = z.object({
    from: z.string(),
    to: z.string()
})