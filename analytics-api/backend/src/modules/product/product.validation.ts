import { z } from "zod"

export const addProductSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(1)
            .max(100),
        description: z
            .string()
            .trim()
            .max(100)
            .optional(),
        price: z
            .coerce
            .number()
            .int()
            .min(1),
        stock: z
            .coerce
            .number()
            .int()
            .min(0),
        brand: z
            .string()
            .trim()
            .min(1)
            .max(50),
        category: z
            .string()
            .trim()
            .min(1)
            .max(100),
    })
})
export const updateProductSchema = z.object({
    params: z.object({
        id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
    }),
    body: z.object({
        name: z
            .string()
            .trim()
            .min(1)
            .max(100)
            .optional,
        description: z
            .string()
            .trim()
            .max(100)
            .optional(),
        price: z
            .coerce
            .number()
            .int()
            .min(1)
            .optional,
        stock: z
            .coerce
            .number()
            .int()
            .min(0)
            .optional,
        brand: z
            .string()
            .trim()
            .min(1)
            .max(50)
            .optional,
        category: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .optional,
    })
})

export const productIdSchema = z.object({
    params: z.object({
        id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
    }),
})
export type productIdInputs = z.infer<typeof productIdSchema>
export type addProductInput = z.infer<typeof addProductSchema>
export type updateProductInput = z.infer<typeof updateProductSchema>