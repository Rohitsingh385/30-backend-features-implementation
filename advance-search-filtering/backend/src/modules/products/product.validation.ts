import { z } from "zod"

export const ProductCreateSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(2, "name is required")
            .max(50, "max length is 50"),
        description: z
            .string()
            .trim()
            .min(2, "name is required")
            .max(100, "max length is 100"),
        category: z
            .string()
            .trim(),
        brand: z
            .string()
            .trim(),
        price: z
            .coerce
            .number()
            .int()
            .min(0),
        rating: z
            .coerce
            .number()
            .int()
            .min(1)
            .max(5),
        stock: z
            .coerce
            .number()
            .int()
            .min(0),

    })
})

export const ProductQuerySchema = z.object({
    query: z.object({
        brand: z
            .string()
            .trim()
            .toLowerCase()
            .optional(),
        minPrice: z
            .coerce
            .number()
            .int()
            .min(0)
            .optional(),
        maxPrice: z
            .coerce
            .number()
            .int()
            .min(0)
            .optional(),
        search: z
            .string()
            .trim()
            .toLowerCase()
            .optional(),
        category: z
            .string()
            .trim()
            .toLowerCase()
            .optional(),
        minRating: z
            .coerce
            .number()
            .int()
            .min(1)
            .max(5)
            .optional(),
        maxRating: z
            .coerce
            .number()
            .int()
            .min(1)
            .max(5)
            .optional(),
        sort: z
            .enum(["priceAsc", "priceDesc", "rating", "newest"])
            .optional(),
        limit: z
            .coerce
            .number()
            .int()
            .min(1)
            .max(100)
            .optional(),

    })
})

export type ProductQueryInput = z.infer<typeof ProductQuerySchema>

export type ProductCreateInput = z.infer<typeof ProductCreateSchema>