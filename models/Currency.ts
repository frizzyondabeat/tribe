import {z} from 'zod';

export const CurrencySchema = z.object({
    id: z.number(),
    uuid: z.string(),
    name: z.string(),
    code: z.string(),
    symbol: z.string().min(1, "Symbol is required"),
    country: z.string().min(1, "Country is required"),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const CurrencyDtoSchema = CurrencySchema.omit({
    createdAt: true,
    updatedAt: true,
    id: true,
    uuid: true,
    name: true,
    code: true,
}).extend(
    {
        currencyCode: z.string().min(1, "Currency code is required"),
    }
)

export const ResponseCurrencySchema = z.object({
    currencyCode: z.string(),
    numericCode: z.number(),
    numericCodeAsString: z.string(),
    displayName: z.string(),
    symbol: z.string(),
    defaultFractionDigits: z.number(),
})