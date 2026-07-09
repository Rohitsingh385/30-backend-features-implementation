import {z} from "zod"

export const registerSchema = z.object({
    name: z
        .string("User name is required")
        .trim()
        .min(2, "Name must be atleast 2 char")
        .max(50, "Name cannot exceed 50 char"),
    email: z
        .string("Email is required")
        .trim()
        .toLowerCase(),
    password: z
        .string("Password is required")
        .trim()
        .min(8, "Password must be at least 8 char")
        .max(72, "Password cannot exceed 72 characters")
})

export const loginSchema = z.object({
    email: z
        .string("email is required")
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(1, "password is required")
})
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>