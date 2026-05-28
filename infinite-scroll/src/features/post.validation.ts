import {z} from "zod"

export const postPaginationQuery = z.object({
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
        .max(20)
        .default(1),
    sortBy: z  
        .enum(["newest", "oldest"])
        .default("newest"),

})