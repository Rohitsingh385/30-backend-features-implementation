import {z} from "zod"

export const searchUsersQuerySchema = z.object({
    q: z  
        .string()
        .trim()
        .min(1, "search query is required")
        .max(50, "query too long"),
    page: z 
        .coerce
        .number()
        .int()
        .min(1)
        .default(1),
    limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(50)
        .default(10)
})