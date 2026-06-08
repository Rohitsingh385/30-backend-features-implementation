import z from "zod"

export const querySchema = z.object({
    limit: z 
        .coerce
        .number()
        .int()
        .min(5)
        .max(20)
        .default(10),
    page: z
        .coerce
        .number()
        .int()
        .min(1)
        .default(10)
})