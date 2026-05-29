import {z} from "zod"

export const cursorPaginationQuery = z.object({
    cursor: z   
        .string()
        .optional(),
    limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(10)
        .default(10)
})