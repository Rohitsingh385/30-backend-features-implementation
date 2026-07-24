import { z } from "zod"

export const saveCategorySchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(1, "Category name is required")
            .max(100, "Category name cannot exceed 100 characters"),
        description: z
            .string()
            .trim()
            .max(500, "Description cannot exceed 500 characters")
            .optional()
    })
})
export const updateCategorySchema = z.object({
    params: z.object({
        id: z
            .string()
            .regex(/^[0-9-a-fA-F]{24}$/)
    }),
    body: z.object({
        name: z
            .string()
            .trim()
            .min(1, "Category name is required")
            .max(100, "Category name cannot exceed 100 characters")
            .optional(),
        description: z
            .string()
            .trim()
            .max(500, "Description cannot exceed 500 characters")
            .optional()
    })
})

export const validateObjectId = z.object({
    params: z.object({
        id: z
            .string()
            .regex(/^[0-9-a-fA-F]{24}$/)
    })
})

export type valiateObjectInput = z.infer<typeof validateObjectId>
export type saveCategoryInput = z.infer<typeof saveCategorySchema>
export type updateCategoryInput = z.infer<typeof updateCategorySchema>