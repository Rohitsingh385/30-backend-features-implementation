import {z} from "zod"

export const createPostSchema  = z.object({
    content: z
        .string()
        .trim()
        .min(1, "Content is required")
        .max(1000, "Content cannot exceed 1000 characters")
})
export const DeletePostSchema = z.object({
    id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid post ID")

})

export const getPostsQuerySchema = z.object({
    cursor: z
        .string()
        .datetime()
        .optional(),
    limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(20)
        .default(10)
})

export type GetPostInputs = z.infer<typeof getPostsQuerySchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
export type DeletePostInput = z.infer<typeof DeletePostSchema>