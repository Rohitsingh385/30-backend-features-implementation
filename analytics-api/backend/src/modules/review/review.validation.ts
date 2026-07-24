import { z } from "zod"

export const addReviewSchema = z.object({
    params: z.object({
        reviewId: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/),
    }),
    body: z.object({
        reviewerName: z
            .string()
            .trim()
            .min(1)
            .max(100),
        rating: z
            .coerce
            .number()
            .int()
            .min(1)
            .max(5),
        comment: z
            .string()
            .trim()
            .min(1)
            .max(100)
    })
})
export const updateReviewSchema = z.object({
    params: z.object({
        reviewId: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/),
    }),
    body: z.object({
        reviewerName: z
            .string()
            .trim()
            .min(1)
            .max(100)
            .optional(),
        rating: z
            .coerce
            .number()
            .int()
            .min(1)
            .max(5)
            .optional(),
        comment: z
            .string()
            .trim()
            .min(1)
            .max(100)
            .optional()
    })
})

export const ReviewIdSchema = z.object({
    params: z.object({
        reviewId: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/),
    })
})
export type ReviewIdInput = z.infer<typeof ReviewIdSchema>
export type addReviewInput = z.infer<typeof addReviewSchema>
export type updateReviewInput = z.infer<typeof updateReviewSchema>