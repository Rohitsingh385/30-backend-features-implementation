import { z } from "zod"

export const createPostSchema = z.object({
    body: z.object({
        title: z
            .string({ required_error: 'title is required' })
            .min(6, 'title is too small'),
        content: z
            .string({ required_error: 'content is required' })
            .min(20, 'body content is too small')
    })
})

export const updatePostSchema = z.object({
    params: z.object({
        postId: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid mongoDB ID')
    }),
    body: z.object({
        title: z
            .string()
            .min(6, 'title is too small'),
        content: z
            .string()
            .min(20, 'body content is too small ')
    }).partial()
})

export const deletePostSchema = z.object({
    params: z.object({
        postId: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid mongoDB ID')
    })
})
export const getPostSchema = z.object({
    params: z.object({
        postId: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, 'Invalid mongoDB ID')

    })
})

export type createPostInput = z.infer<typeof createPostSchema> 
export type updatePostInput = z.infer<typeof updatePostSchema>
export type deletePostInput = z.infer<typeof deletePostSchema>
export type getPostInput = z.infer<typeof getPostSchema>