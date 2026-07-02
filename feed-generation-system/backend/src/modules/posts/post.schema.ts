import {z} from "zod"

export const createPostSchema  = z.object({
    content: z
        .string()
        .trim()
        .min(1, "Content is required")
        .max(1000, "Content cannot exceed 1000 characters")
})

export type CreatePostInput = z.infer<typeof createPostSchema>