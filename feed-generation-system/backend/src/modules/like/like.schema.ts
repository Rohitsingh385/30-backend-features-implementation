import {z} from "zod"

export const likePostSchema = z.object({
    id: z   
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid post ID")
})

export type likePostInput = z.infer< typeof likePostSchema>