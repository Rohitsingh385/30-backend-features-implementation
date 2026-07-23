import { z } from "zod"

export const createProductSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .toLowerCase(),
        description: z
            .string()
            .trim()
            .toLowerCase(),
        brand: z
            .string()
            .trim()
            .toLowerCase(),
        category: z
            .string()
            .trim()
            .toLowerCase(),
        price: z
            .coerce
            .number()
            .int()
            .min(1),
        rating: z
            .coerce
            .number()
            .min(1)
            .max(5)
            .default(0),
        stock: z
            .coerce
            .number()
            .int()
            .min(0)
            .default(0),
        discount: z
            .coerce
            .number()
            .int()
            .min(0)
            .max(100)
            .default(0),
        isPublished: z
            .boolean()
    })
})

export const updateProductSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .toLowerCase(),
        description: z
            .string()
            .trim()
            .toLowerCase(),
        brand: z
            .string()
            .trim()
            .toLowerCase(),
        category: z
            .string()
            .trim()
            .toLowerCase(),
        price: z
            .coerce
            .number()
            .int()
            .min(1),
        rating: z
            .coerce
            .number()
            .int()
            .min(1)
            .max(5)
            .default(0),
        stock: z
            .coerce
            .number()
            .int()
            .min(0),
        discount: z
            .coerce
            .number()
            .int()
            .min(0)
            .max(100),
        isPublished: z
            .boolean()
    }).partial()
})

export const getProductByIdSchema = z.object({
    params: z.object({
        productId: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, "invalid Id")
    })
})

export const getProductsSchema = z.object({
    query: z.object({
        category: z 
            .string()
            .trim()
            .toLowerCase()
            .optional()
    })
})
export type getProductByIdInput = z.infer<typeof getProductByIdSchema>
export type createProductInput = z.infer<typeof createProductSchema>
export type updateProductInput = z.infer<typeof updateProductSchema>