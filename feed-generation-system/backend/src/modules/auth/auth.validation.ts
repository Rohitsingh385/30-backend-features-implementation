import {z} from "zod"

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, 'username must be atleast 3 characters'),

    email: z
        .email('Invalid email address')
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(8, "password must be at least 8 characters")
        .max(100)
})
export const loginSchema = z.object({
    email: z
        .email('Invalid email address')
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(8, "password must be at least 8 characters")
        .max(100)
})
export type RegisterInput = z.infer<typeof registerSchema>

export type LoginInput = z.infer<typeof loginSchema>