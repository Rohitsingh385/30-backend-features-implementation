import { z } from "zod"

export const ProductValidateSchema = z.object({
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

export type ProductValidateInput = z.infer<typeof ProductValidateSchema>